import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/store.ts";
import { useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

const PropertyDetails: React.FC = () => {
  const selectedProperty = useSelector(
    (state: RootState) => state.properties.selectedProperty
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Selected Property:", selectedProperty);
  }, [selectedProperty]);

  const handleBackButtonClick = () => {
    navigate("/search"); // Navigate back to the property list
  };

  return selectedProperty ? (
    <div>
      <button
        className="back-button"
        onClick={handleBackButtonClick}
      >
        Back to Search
      </button>
    
    <div className="property-details-div">
      

      {/* Property Image */}
      <div className="property-img">
        <img
          src={`http://localhost:8080${selectedProperty.imageUrl}`} // Dynamic image URL
          alt={selectedProperty.name}
        />
      </div>

      {/* Property Details */}
      <h1>{selectedProperty.name}</h1>
      <p><strong>Cost:</strong> ₹{selectedProperty.cost.toLocaleString()}</p>
      <p><strong>Address:</strong> {selectedProperty.address}</p>
      <p><strong>Area:</strong> {selectedProperty.area} {selectedProperty.areaUnit}</p>
      <p><strong>Type:</strong> {selectedProperty.type}</p>
      <p><strong>Details:</strong> {selectedProperty.details}</p>
    </div>
    </div>
  ) : (
    <p>No property selected.</p>
  );
};

export default PropertyDetails;
