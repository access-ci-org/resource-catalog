import React from "react";
import Filter from "./Filter";
const FilterCategory = ({ category }) => {
  return(
    <div className="row">
      <div className="col">
        <div className="fw-bold title-hover mb-1 mt-1" title={category.categoryDescription}>
          {category.categoryName}
        </div>
        {category.features.map((f) =>
          <Filter filter={f} key={f.featureId} />
        )}
      </div>
    </div>
  )
}

export default FilterCategory;