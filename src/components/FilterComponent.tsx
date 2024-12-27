import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types/store.ts"; // Path to your Redux store file
import { setFilter } from "../types/propertySlice.ts"; // Path to your actions

import './FilterComponent.css';

interface FilterComponentProps {
  onFilterChange: (name: string, value: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.properties.filters);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFilter({ name, value })); // Dispatch the filter change to Redux
  };

  return (
    <div className="filters">
      {/* Cost Filter */}
      <div className="filter-group">
        <label htmlFor="minCost">Min Cost (₹):</label>
        <select
          id="minCost"
          name="minCost"
          value={filters.minCost || ""}
          onChange={handleFilterChange}
        >
          <option value="0">₹ 0</option>
          <option value="250000">₹ 2.5 L</option>
          <option value="500000">₹ 5 L</option>
          <option value="1000000">₹ 10 L</option>
          <option value="2000000">₹ 20 L</option>
          <option value="5000000">₹ 50 L</option>
        </select>

        <label htmlFor="maxCost">Max Cost (₹):</label>
        <select
          id="maxCost"
          name="maxCost"
          value={filters.maxCost || ""}
          onChange={handleFilterChange}
        >
          <option value="5000000">₹ 50 L</option>
          <option value="2000000">₹ 20 L</option>
          <option value="1000000">₹ 10 L</option>
          <option value="500000">₹ 5 L</option>
          <option value="250000">₹ 2.5 L</option>
          <option value="0">₹ 0</option>
        </select>
      </div>

      {/* Area Filter */}
      <div className="filter-group">
        <label htmlFor="minArea">Min Area (sq.m.):</label>
        <select
          id="minArea"
          name="minArea"
          value={filters.minArea || ""}
          onChange={handleFilterChange}
        >
          <option value="0">0 sq.m.</option>
          <option value="50">50 sq.m.</option>
          <option value="100">100 sq.m.</option>
          <option value="150">150 sq.m.</option>
          <option value="200">200 sq.m.</option>
        </select>

        <label htmlFor="maxArea">Max Area (sq.m.):</label>
        <select
          id="maxArea"
          name="maxArea"
          value={filters.maxArea || ""}
          onChange={handleFilterChange}
        >
          <option value="200">200 sq.m.</option>
          <option value="150">150 sq.m.</option>
          <option value="100">100 sq.m.</option>
          <option value="50">50 sq.m.</option>
          <option value="0">0 sq.m.</option>
        </select>
      </div>

      {/* Property Type Filter */}
      <div className="filter-group">
        <label htmlFor="propertyType">Property Type:</label>
        <select
          id="propertyType"
          name="propertyType"
          value={filters.propertyType || ""}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Villa">Villa</option>
        </select>
      </div>

      {/* Details Filter */}
      <div className="filter-group">
        <label htmlFor="details">Details:</label>
        <select
          id="details"
          name="details"
          value={filters.details || ""}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
          <option value="4BHK">4 BHK</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
