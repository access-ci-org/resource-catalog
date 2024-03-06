import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash'

const initialState = {
  filters: [],
  resources: [],
  filteredResources: [],
  resourcesLoaded: false,
  hasErrors: false
}

export const getResources = createAsyncThunk(
  'resourceCatalog/getResources',
  async (params, { dispatch }) => {
    const response = await fetch(params.api_url);
    const data = await response.json();
    dispatch(handleResponse( {data, params}));
  }
);

const activeFilters = (filters) => {
  const selected = [];
  const categories = filters.filter((f) => f.features.filter((feat) => feat.selected).length > 0);

  filters
    .forEach((c) => {
      c.features.forEach((f) => {
        if(f.selected) selected.push(f.featureId);
      })
    })

  return categories.map((c) => {
    return {
      ...c,
      features: c.features.filter((feat) => feat.selected)
    }
  });
}

const useFilter = (allowed, excluded, item) => {
  if(allowed.length == 0 && excluded.length == 0) return true;

  // If users specified both allow and exclude lists
  // just use the allow list. Otherwise there's unresolvable conflicts.

  if(allowed.length > 0) {
    return allowed.find((el) => el == item)
  } else if(excluded.length > 0) {
    return !excluded.find((el) => el == item)
  }
}

export const catalogSlice = createSlice({
  name: 'resourceCatalog',
  initialState,
  reducers: {
    handleResponse: (state, { payload }) => {
      const apiResources = payload.data;
      const excludedCategories = payload.params.excludedCategories;
      const excludedFilters = payload.params.excludedFilters;
      const allowedCategories = payload.params.allowedCategories;
      const allowedFilters = payload.params.allowedFilters;

      const resources = [];
      const features = [];
      const categories = {};
      apiResources.forEach((r) => {
        const feature_list = [];

        r.featureCategories.filter(f => f.categoryIsFilter).forEach((category) => {
          const categoryId = category.categoryId;

          if(!categories[categoryId] && useFilter(allowedCategories, excludedCategories, category.categoryName) ){
            categories[categoryId] = {
              categoryId: categoryId,
              categoryName: category.categoryName,
              categoryDescription: category.categoryDescription,
              features: {}
            }
          }

          category.features.forEach((feat) => {
            const feature = {
              featureId: feat.featureId,
              name: feat.name,
              description: feat.description,
              categoryId: categoryId,
              selected: false
            };

            const filterIncluded = useFilter(allowedFilters, excludedFilters, feature.name)
            if(filterIncluded) feature_list.push(feature);

            if(categories[categoryId] && filterIncluded && !categories[categoryId].features[feat.featureId]) {
              categories[categoryId].features[feat.featureId] = feature;
            }
          })
        })

        const resource = {
          resourceName: r.resourceName,
          resourceId: r.resourceId,
          resourceType: r.resourceType,
          organization: r.organization,
          units: r.units,
          userGuideUrl: r.userGuideUrl,
          resourceDescription: r.resourceDescription,
          description: r.description,
          recommendedUse: r.recommendedUse,
          features: feature_list.map(f => f.name).sort((a,b) => a > b),
          featureIds: feature_list.map(f => f.featureId)
        }

        resources.push(resource);
      })

      for(const categoryId in categories){
        const category = categories[categoryId];
        const features = [];

        for(const featureId in category.features){
          features.push(category.features[featureId])
        };

        state.filters.push({
          ...category,
          features: features.sort((a,b) => a.name > b.name)
        });
      }

      state.filters = state.filters.sort((a,b) => a.categoryName > b.categoryName);
      state.resources = resources.sort((a,b) => a.resourceName > b.resourceName);
      state.filteredResources = _.cloneDeep(state.resources);
      state.resourcesLoaded = true;

    },
    resetFilters: (state) => {
      state.filters.forEach((c) => {
        c.features.forEach((f) => f.selected = false)
      })

      state.filteredResources = _.cloneDeep(state.resources);
    },
    toggleFilter: (state, { payload }) => {
      const filter = payload;

      const stateFilterCategory = state.filters
        .find((f) => f.categoryId == filter.categoryId);

      const stateFilter = stateFilterCategory.features
        .find((f) => f.featureId == filter.featureId);

      stateFilter.selected = !stateFilter.selected;

      const active = activeFilters(state.filters);

      if(active.length > 0){
        const selected = [];
        if(state.filters.length == 1){
          // If there's only one category, the features should use an AND join
          state.resources.forEach((r) => {
            const features = active.map((c) => c.features.map((f) => f.featureId)).flat();
            const found = r.featureIds.filter((id) => features.indexOf(id) >= 0)
            if(found.length == features.length) selected.push(r);
          })
        } else {
          // If there's more than one category,
          // the features should use an OR within the same category
          // different categories should be joined with AND

          const sets = active.map((c) => c.features.map((f) => f.featureId))

          state.resources.forEach((r) => {
            let checksPassed = 0;
            sets.forEach((set) => {
              let passed = false;
              r.featureIds.forEach((id) => {
                if(set.indexOf(id) >= 0) passed = true;
              });
              if(passed) checksPassed += 1;

            })
            if(checksPassed >= sets.length){
              selected.push(r);
            }
          })

        }

        state.filteredResources = selected;
      } else {
        state.filteredResources = _.cloneDeep(state.resources);
      }

    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getResources.pending, (state) => {
      })
      .addCase(getResources.fulfilled, (state, action) => {

      })
      .addCase(getResources.rejected, (state, data) => {
        state.hasErrors = true;
        console.log(data.error)
      })
  }
})

export const {
  handleResponse,
  processData,
  resetFilters,
  toggleFilter
} = catalogSlice.actions;

export const selectActiveFilters = (state) => {
  return activeFilters(state.resourceCatalog.filters)
};
export const selecthasErrors = (state) => state.resourceCatalog.hasErrors;
export const selectResourcesLoaded = (state) => state.resourceCatalog.resourcesLoaded;
export const selectFilters = (state) => state.resourceCatalog.filters;
export const selectResources = (state) => state.resourceCatalog.filteredResources;
export default catalogSlice.reducer;