import React, { useState } from "react";
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
import FileUpload from "./components/FileUpload.tsx";
import FileList from "./components/FileList.tsx";
import BoxIntegration from "./components/BoxIntegration.tsx";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PropertyList />} />
      <Route path="/properties" element={<PropertyList />} />
      {/* <Route path="/properties/:filterType/:filterValue" element={<PropertyList />} /> */}
      {/* Add routes for categorized searches */}
      <Route path="/properties/city/:city" element={<PropertyList />} />
            <Route path="/properties/state/:state" element={<PropertyList />} />
            <Route path="/properties/locality/:locality" element={<PropertyList />} />
            <Route path="/properties/country/:country" element={<PropertyList />} />
            <Route path="/properties/pincode/:pincode" element={<PropertyList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login  />} />
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
        {/* box.com */}
        <Route path="/box" element={<BoxIntegration />} />
        <Route path="/upload" element={<FileUpload />} />
          <Route path="/list" element={<FileList />} />
      </Routes>
    </Router>
  );
}

export default App;
