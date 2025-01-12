// Dashboard.tsx
import React, { useState } from "react";
import { Link} from "react-router-dom";
import "./Dashboard.css";
import PropertySearch from "./PropertySearch.tsx";
import AdminRequestPage from "./AdminRequestPage.tsx";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ role: string } | null>(null); // User state
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login"); // Redirect to login if no token is found
  //   }
  // }, [navigate]);

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="logo">
          <img src="/realtors.png" alt="Logo" />
        </div>
        <nav className="dashboard-nav">
          <Link to="/property-list" className="nav-link">Property List</Link>
          <Link to="/add-property" className="nav-link">Add Property</Link>
          <Link to="/about-us" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="dashboard-content">
        <PropertySearch />
      </main>

       {/* Additional content for admins */}
       {user && user.role === 'ADMIN' && (
        <div>
          <h3>Admin Specific Section</h3>
          <AdminRequestPage />
        </div>
      )}

    </div>
  );
};

export default Dashboard;
