import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useNavigate, useLocation } from "react-router-dom";
import "./PropertySearch.css";

interface CategorizedResults {
  city: string[];
  state: string[];
  locality: string[];
  country: string[];
  pincode: string[];
}

const PropertySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CategorizedResults>({
    city: [],
    state: [],
    locality: [],
    country: [],
    pincode: [],
  });
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]); // Store filtered properties here
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Debounced search function (defined outside useEffect for better performance)
  const debouncedSearch = debounce(async (query: string) => {
    if (!query.trim()) {
      setSearchResults({
        city: [],
        state: [],
        locality: [],
        country: [],
        pincode: [],
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<CategorizedResults>(
        "http://localhost:8080/api/search", // Adjust the API endpoint accordingly
        { params: { query: query } }
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch search results. Please try again.");
      setSearchResults({
        city: [],
        state: [],
        locality: [],
        country: [],
        pincode: [],
      });
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // Effect to trigger search when searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm);

    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]); // Only search term is the dependency

  // Effect to fetch filtered properties based on URL params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const value = queryParams.get("value");

    if (category && value) {
      setIsLoading(true);
      setError(null);

      // Fetch filtered properties
      axios
        .get("http://localhost:8080/api/properties", { params: { [category]: value } })
        .then((response) => {
          console.log("Filtered Properties:", response.data);
          setFilteredProperties(response.data); // Store the filtered properties
        })
        .catch((err) => {
          console.error("Error fetching filtered properties:", err);
          setError("Failed to fetch properties. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [location.search]); // Fetch properties when the search params change

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectResult = (category: string, value: string) => {
    setSearchTerm(value);
    setSearchResults({
      city: [],
      state: [],
      locality: [],
      country: [],
      pincode: [],
    });

    // Construct the URL with the desired query parameters
    const queryParams = new URLSearchParams();
    queryParams.set("category", category);
    queryParams.set("value", value);

    // Use the navigate function to redirect to the new URL
    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <div className="property-search-container">
      <input
        type="text"
        placeholder="Search by city, state, locality, country, or pincode"
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
        aria-label="Property Search"
      />
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {searchTerm && (
        <div className="search-results-dropdown">
          {Object.entries(searchResults).map(([category, values]) => (
            values.length > 0 && (
              <div key={category} className="search-category">
                <h4 className="category-title">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <ul>
                  {values.map((value, index) => (
                    <li
                      key={index}
                      className="search-result-item"
                      onClick={() => handleSelectResult(category, value)}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      )}

      {/* Display filtered properties */}
      {filteredProperties.length > 0 && (
        <div className="filtered-properties">
          <h3>Filtered Properties</h3>
          <div className="properties-list">
            {filteredProperties.map((property) => (
              <div key={property.id} className="property-card">
                <img src={property.image} alt={property.name} />
                <h4>{property.name}</h4>
                <p>{property.description}</p>
                <span>{property.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
