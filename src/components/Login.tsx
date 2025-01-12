import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import { setUser } from '../types/authSlice.ts';
import { useDispatch } from 'react-redux';
import "./Login.css";

// interface LoginProps {
//   setUser: React.Dispatch<React.SetStateAction<any>>;

// }
interface LoginResponse {
  id: string;
  role: string;
}


const Login: React.FC = () => {
 
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();  // Initialize navigate
  const dispatch = useDispatch();
  // const role = useSelector((state: RootState) => state.auth.role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>( `http://localhost:8080/api/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      
      const { role} = response.data;
      const userId = response.data.id;
      
      dispatch(setUser({ userId, role }));
     
      console.log('Login successful:', response.data);
      
      // localStorage.setItem('token', response.data.token);  // Optionally save token to localStorage
      if (role === 'ADMIN') {
        // Redirect to the admin dashboard if the role is ADMIN
        navigate('/admin/requests');
      } else {
        // Redirect to the user dashboard for other roles (CUSTOMER, BUILDER)
        navigate('/dashboard');
      }// Navigate to dashboard after successful login
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
    <h2 className="login-heading">Login</h2>
    {error && <div className="error-message">{error}</div>}
    <form onSubmit={handleSubmit} className="login-form">
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
      <button type="submit" className="submit-button">Login</button>
    </form>
  </div>
);
};

export default Login;
