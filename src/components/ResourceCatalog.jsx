import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResources, selecthasErrors, selectResourcesLoaded } from "../state/catalogSlice";
import ResourceList from "./ResourceList";
import Filters from "./Filters";
const ResourceCatalog = ({
  api_url, excluded_categories, excluded_filters, excluded_resources, allowed_categories, allowed_filters
}) => {
  const dispatch = useDispatch();
  const resourcesLoaded = useSelector( selectResourcesLoaded );
  const hasErrors = useSelector( selecthasErrors )

  useEffect(() => {
    const excludedCategories = excluded_categories ? excluded_categories : [];
    const excludedFilters = excluded_filters ? excluded_filters : [];
    const excludedResources = excluded_resources ? excluded_resources : [];
    const allowedCategories = allowed_categories ? allowed_categories : [];
    const allowedFilters = allowed_filters ? allowed_filters : [];

    dispatch( getResources({
      api_url,
      excludedCategories,
      excludedFilters,
      allowedCategories,
      allowedFilters,
      excludedResources
    }) );
  }, [])

  if(hasErrors){
    return (
      <div className="row">
        <div className="col text-center mt-2">
          <h4>Unable to Load Resources</h4>
        </div>
      </div>
    )
  }

  if(!resourcesLoaded){
    return(
      <div className="row">
        <div className="col" style={{ textAlign: "center" }}>
          <h2 className="mt-5">
            Loading... <i className="fa fa-circle-notch fa-spin fa-2xl"></i>
          </h2>
        </div>
      </div>
    )
  }

  return(
    <>
    <div className="row mt-3">
      <div className="col-sm-4">
        <Filters />
      </div>
      <div className="col-sm-8">
        <ResourceList />
      </div>
    </div>
    </>
  )
}

export default ResourceCatalog;