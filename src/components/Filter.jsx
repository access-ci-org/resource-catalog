import React from "react";
import { useDispatch } from "react-redux";
import { toggleFilter } from "../state/catalogSlice";
const Filter = ({ filter }) => {
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch( toggleFilter(filter) )
  }

  return (
    <div className="row">
      <div className="col">
        <div className="form-check">
          <label className="form-check-label" htmlFor={`filter_${filter.featureId}`}>
            {filter.name}
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            value={filter.featureId}
            id={`filter_${filter.featureId}`}
            checked={filter.selected}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>


  )
}

export default Filter;