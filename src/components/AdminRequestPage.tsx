import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: number;
  username: string;
  role: string;  // Role will include CUSTOMER, ADMIN, or BUILDER
  approved: boolean;
}

const AdminRequestPage: React.FC = () => {
  const [builders, setBuilders] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingBuilders = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:8080/api/auth/pending-approvals');
        setBuilders(response.data);
      } catch (err) {
        setError('Error fetching pending builders.');
      }
    };
    fetchPendingBuilders();
  }, []);

  const approveBuilder = async (userId: number) => {
    try {
      await axios.post(`http://localhost:8080/api/auth/approve-builder?id=${userId}`);
      setBuilders(builders.filter(builder => builder.id !== userId));
      navigate('/dashboard');
    } catch (err) {
      setError('Error approving builder.');
    }
  };

  const rejectBuilder = (userId: number) => {
    setBuilders(builders.filter(builder => builder.id !== userId));
  };

  return (
    <div className="admin-request-page">
      <h2>Builder Registration Requests</h2>
      {error && <div className="error">{error}</div>}
      {builders.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul>
          {builders.map((builder) => (
            <li key={builder.id}>
              <span>{builder.username} - {builder.role}</span>
              {builder.role === 'BUILDER' && ( // Handle builders
                <>
                  <button onClick={() => approveBuilder(builder.id)}>Approve</button>
                  <button onClick={() => rejectBuilder(builder.id)}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button> 
    </div>
  );
};

export default AdminRequestPage;
