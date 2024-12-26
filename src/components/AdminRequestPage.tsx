// AdminRequestPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminRequestPage.css';

const AdminRequestPage: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/requests");
        setPendingRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      }
    };
    fetchPendingRequests();
  }, []);

  const approveRequest = async (id: string) => {
    try {
      await axios.post(`http://localhost:8080/api/admin/approve/${id}`);
      setPendingRequests((prev) => prev.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Failed to approve request", error);
    }
  };

  return (
    <div className="admin-request-page">
      <h2>Pending Builder Requests</h2>
      {pendingRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul>
          {pendingRequests.map((request) => (
            <li key={request.id}>
              {request.name} ({request.email}) - Role: {request.role}
              <button onClick={() => approveRequest(request.id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminRequestPage;
