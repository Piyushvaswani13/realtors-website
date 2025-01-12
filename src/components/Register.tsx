import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

interface RegisterProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('CUSTOMER');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call with query parameters
      const response = await axios.post(
        `http://localhost:8080/api/auth/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`
      );
      setUser(response.data); // Assuming the response has user data
      navigate('/login'); // Navigate to login after successful registration
    } catch (err) {
      setError('Error registering user.');
    }
  };

  return (
    <div className="register-container">
    <h2 className="register-heading">Register</h2>
    {error && <div className="error-message">{error}</div>}
    <form onSubmit={handleSubmit} className="register-form">
      <div className="input-group">
        <label className="input-label">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input-field"
        >
          <option value="CUSTOMER">Customer</option>
          <option value="BUILDER">Builder</option>
        </select>
      </div>
      <button type="submit" className="submit-button">Register</button>
    </form>
  </div>
);
};

export default Register;
