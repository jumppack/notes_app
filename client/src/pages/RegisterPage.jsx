import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
      e.preventDefault();
      setError(null);
      try {
        await axiosInstance.post('/auth/register', { username, email, password });
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
      }
    };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#1f2937' }}>Create Account</h2>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={submitHandler}>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontSize: '0.875rem' }}>Username</label>
            <input 
              type="text" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }} 
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontSize: '0.875rem' }}>Email</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }} 
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontSize: '0.875rem' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }} 
            />
          </div>

          <button 
            type="submit"
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              backgroundColor: (!email || !password || !username) ? '#93c5fd' : '#2563eb', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: '600', 
              cursor: (!email || !password || !username ) ? 'not-allowed' : 'pointer' 
            }}
          >
            Register
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#4b5563', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
