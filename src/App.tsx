import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyList from "./components/PropertyList.tsx";
import PropertyDetails from "./components/propertyDetails.tsx";
import PropertySearch from "./components/PropertySearch.tsx";
import AddProperty from "./components/AddProperty.tsx";
import EditProperty from "./components/EditProperty.tsx";
import ContactPage from "./components/ContactPage.tsx";
import AboutUsPage from "./components/AboutUsPage.tsx";
import RequestSent from "./components/RequestSent.tsx";
import HomePage from "./components/HomePage.tsx";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import AdminRequestPage from "./components/AdminRequestPage.tsx";
import Dashboard from "./components/Dashboard.tsx";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PropertyList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-sent" element={<RequestSent />} />
        <Route path="/admin/requests" element={<AdminRequestPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/property-list" element={<PropertyList />} />
        <Route path="/property-details/:propertyId" element={<PropertyDetails />} />
        <Route path="/search" element={<PropertySearch />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:propertyId" element={<EditProperty />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
