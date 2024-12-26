// EditProperty.tsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPropertyById } from "../types/propertySlice.ts";
import { RootState, AppDispatch } from "../types/store.ts";
import axios from "axios"; // Importing axios
import './EditProperty.css';

const EditProperty: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { propertyId } = useParams<{ propertyId: string }>();

  // Get the selected property from the Redux store
  const property = useSelector((state: RootState) =>
    state.properties.properties.find((p) => p.propertyId === Number(propertyId))
  );

  // Local state for form data
  const [formData, setFormData] = useState({
    name: property?.name || "",
    cost: property?.cost || 0,
    address: property?.address || "",
    area: property?.area || "",
    areaUnit: property?.areaUnit || "",
    type: property?.type || "",
    details: property?.details || "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "cost" ? Number(value) : value, // Convert cost to a number
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    // Send updated data to the backend API
    axios
      .put(`http://localhost:8080/api/edit-property/${property.propertyId}`, formData)
      .then((response) => {
        console.log('Property updated successfully:', response.data);
        // Dispatch update action and navigate
        dispatch(editPropertyById({ ...property, ...formData }));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating property:", error);
      });
  };

  if (!property) {
    return <p>Property not found!</p>;
  }

  return (
    <div className="edit-property-container">
      <h2>Edit Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Property Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Area</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Area Unit</label>
          <input
            type="text"
            name="areaUnit"
            value={formData.areaUnit}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
