import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetFilters, selectFilters } from "../state/catalogSlice";
import FilterCategory from "./FilterCategory";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector( selectFilters )
  const selected = filters.filter((f) => f.features.filter((fl) => fl.selected).length > 0);

  return(
    <div>
      <h4 className="mb-0">Filters</h4>
      {filters.map((f) =>
        <FilterCategory category={f} key={f.categoryId} />
      )}
      <button
        className="btn btn-warning mt-2 mb-2"
        onClick={() => dispatch( resetFilters() )}
        disabled={selected.length == 0}
      >
        Reset Filters
      </button>
    </div>

  )
}

export default Filters;