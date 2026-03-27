import React, { useState, useContext } from 'react';
import { Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  if (currentUser) {
    return <Navigate to="/feed" replace />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axiosClient.post('/auth/signup', { username, email, password });
      const { token, ...userData } = res.data;
      login(userData, token);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-container">
      <div className="auth-box">
        <Typography variant="h3" fontWeight="900" align="center" mb={1} sx={{ letterSpacing: '-1px' }}>
          TaskPlanet
        </Typography>
        <Typography variant="subtitle1" align="center" mb={4} fontWeight="600" color="text.secondary">
          Create a new account
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 3, border: '2px solid #d32f2f', borderRadius: 0 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <TextField
            label="Username"
            required
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email Address"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="At least 6 characters"
            FormHelperTextProps={{ sx: { fontWeight: 600, color: '#0A0A0A' } }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            fullWidth
            disabled={loading}
            sx={{ py: 1.5, fontSize: '1.1rem' }}
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </Button>
        </form>
        <Typography align="center" mt={4} variant="body1" fontWeight="600">
          Already have an account? <Link to="/login" style={{ color: '#0033CC', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Log in here</Link>
        </Typography>
      </div>
    </div>
  );
};
export default SignupPage;