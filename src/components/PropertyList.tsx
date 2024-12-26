// PropertyList.tsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties, setCurrentPage, setFilter, deletePropertyById } from "../types/propertySlice.ts";
import { useNavigate } from "react-router-dom";
import { setSelectedProperty } from "../types/propertySlice.ts";
import { RootState, AppDispatch } from "../types/store.ts";
import { MdEdit, MdDelete } from "react-icons/md";
import FilterComponent from "./FilterComponent.tsx";
import "./PropertyList.css";
import axios from "axios"; // Importing axios

const PropertyList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Select state from the Redux store
  const { properties, currentPage, totalPages, loading, error, filters } = useSelector(
    (state: RootState) => state.properties
  );
  console.log(properties);
  console.log("Error in Redux state:", error);

  // Fetch properties on component mount or when filters or page changes
  useEffect(() => {
    dispatch(fetchProperties(currentPage));
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = (name: string, value: string) => {
    dispatch(setFilter({ name, value }));
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1)); // Just update the page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1)); // Just update the page
    }
  };

  // Edit Property Click
  const handleEditClick = (property: any) => {
    dispatch(setSelectedProperty(property));
    navigate(`/edit-property/${property.propertyId}`);
  };

  // Delete Property
  const handleDeleteClick = (propertyId: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      axios
        .delete(`http://localhost:8080/api/delete-property/${propertyId}`)
        .then((response) => {
          dispatch(deletePropertyById(propertyId)); // Dispatching action after successful deletion
          navigate('/');
        })
        .catch((error) => {
          console.error("Error deleting property:", error);
        });
    }
  };

  return (
    <div className="property-list-container">
      <h1 className="heading">Property List</h1>

      {/* Filters Section */}
      <FilterComponent onFilterChange={handleFilterChange} />

      {/* Properties List Section */}
      {loading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <div className="error-message">
          <div className="error-title">Something Went Wrong</div>
          <div className="error-detail">{error}</div>
        </div>
      ) : properties.length > 0 ? (
        <div className="property-list">
          <ul className="unordered-list">
            {properties.map((property) => (
              <li key={property.propertyId} className="property-item">
                <div className="positioning">
                  <div className="property-image">
                    <img
                      src={`http://localhost:8080${property.imageUrl}`}
                      alt={property.name}
                    />
                  </div>
                  <div className="property-details">
                    <h2>{property.name}</h2>
                    <p>
                      <strong>Cost:</strong> ₹{property.cost.toLocaleString()}
                    </p>
                    <p>
                      <strong>Address:</strong> {property.address}
                    </p>
                    <p>
                      <strong>Area:</strong> {property.area} {property.areaUnit}
                    </p>
                    <p>
                      <strong>Type:</strong> {property.type}
                    </p>
                    <p>
                      <strong>Details:</strong> {property.details}
                    </p>
                  </div>
                  <div className="property-actions">
                    <button
                      className="icon-button edit-button"
                      onClick={() => handleEditClick(property)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="icon-button delete-button"
                      onClick={() => handleDeleteClick(property.propertyId)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No properties available.</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
