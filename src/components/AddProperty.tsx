import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./AddProperty.css";

// Define the property type
interface Property {
  name: string;
  cost: number | "";
  address: string;
  area: number | "";
  areaUnit: string;
  type: string;
  details: string;
  imageUrl: string;
}

const AddProperty: React.FC = () => {
  const [property, setProperty] = useState<Property>({
    name: "",
    cost: "",
    address: "",
    area: "",
    areaUnit: "sq ft",
    type: "",
    details: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"success" | "failure" | "">("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/add-property", property);
      setMessage(response.data.message || "Property added successfully!");
      setStatus("success");
      setProperty({
        name: "",
        cost: "",
        address: "",
        area: "",
        areaUnit: "sq ft",
        type: "",
        details: "",
        imageUrl: "",
      });
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred.");
      setStatus("failure");
    }
  };

  return (
    <div className="add-property-container">
      <h1>Add New Property</h1>
      {message && (
        <div className={`message ${status}`}>{message}</div>
      )}
      <form onSubmit={handleSubmit} className="add-property-form">
        <label>
          Property Name:
          <input
            type="text"
            name="name"
            value={property.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Cost (₹):
          <input
            type="number"
            name="cost"
            value={property.cost}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Area:
          <input
            type="number"
            name="area"
            value={property.area}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Area Unit:
          <select
            name="areaUnit"
            value={property.areaUnit}
            onChange={handleChange}
          >
            <option value="sq.ft.">Square Feet</option>
            <option value="sq.m.">Square Meters</option>
          </select>
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={property.type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Details:
          <textarea
            name="details"
            value={property.details}
            onChange={handleChange}
            rows={4}
            required
          ></textarea>
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={property.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
