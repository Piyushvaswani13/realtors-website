import React, { useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../types/propertySlice.ts";
import "./PropertySearch.css";

interface Property {
  propertyId: number;
  name: string;
  address: string;
  details: string;
}

const PropertySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Property[]>([]);
//   const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const debouncedSearch = debounce(async (query: string) => {
    if (query.trim().length > 0) {
      try {
        const response = await axios.get<Property[]>(
          `http://localhost:8080/api/search?query=${query}`
        );
        console.log(response.data);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search suggestions", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };


  const handleSelectProperty = (property: Property) => {
    setSearchTerm(property.name);
    setSuggestions([]);
    dispatch(setSelectedProperty(property));  
    navigate(`/property-details/${property.propertyId}`);
  };

//   const handleSearchButtonClick = () => {
//     const selectedProperty = suggestions.find((prop) =>
//       prop.name.toLowerCase().includes(searchTerm.toLowerCase())  // Allow for partial matches (case-insensitive)
//     );
  
//     if (selectedProperty) {
//       dispatch(setSelectedProperty(selectedProperty));  // Dispatch selected property
//       navigate(`/property-details/${selectedProperty.propertyId}`);
//     } else {
//       alert("No property found with the specified search term");
//     }
//   };
const handleSearchButtonClick = () => {
    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }
  
    const filteredProperties = suggestions.filter((prop) =>
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) // Allow for partial matches (case-insensitive)
    );
  
    if (filteredProperties.length > 0) {
      // If there's at least one matching property, dispatch the selected property
      const selectedProperty = filteredProperties[0];  // Choose the first match, or provide a UI for selecting
      dispatch(setSelectedProperty(selectedProperty));
      navigate(`/property-details/${selectedProperty.propertyId}`);
    } else {
      // No matching properties found, display a user-friendly message
      alert("No property found with the specified search term.");
    }
  };
  
  return (
    <div className="property-search">
      <input
        type="text"
        placeholder="Search properties..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <button
        onClick={handleSearchButtonClick}
        disabled={!searchTerm}
        className="search-button"
      >
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((property) => (
            <li
              key={property.propertyId}
              className="suggestion-item"
              onClick={() => handleSelectProperty(property)}
            >
              {property.name} - {property.details} ({property.address})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertySearch;
