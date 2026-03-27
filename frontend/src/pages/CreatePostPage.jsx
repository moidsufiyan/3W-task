import React, { useState } from 'react';
import { Typography, TextField, Button, Alert, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
const CreatePostPage = () => {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !imageFile) {
      setError('You must provide either text or an image.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      if (text) formData.append('text', text);
      if (imageFile) formData.append('image', imageFile);
      await axiosClient.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-container">
      <Box sx={{ p: 4, width: '100%', maxWidth: '600px', bgcolor: '#FFFFFF', border: '2px solid #0A0A0A', boxShadow: '6px 6px 0px #0A0A0A' }}>
        <Typography variant="h4" fontWeight="900" mb={4} sx={{ letterSpacing: '-1px' }}>
          CREATE POST
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 3, border: '2px solid #d32f2f', borderRadius: 0 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <TextField
            label="What's happening?"
            multiline
            rows={5}
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share an update or some thoughts..."
          />
          <Box sx={{ p: 3, border: '2px dashed #0A0A0A', bgcolor: '#FAFAFA' }}>
            <Typography variant="subtitle1" fontWeight="800" mb={2} color="text.primary">
              Attach an Image (optional):
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ fontWeight: '600' }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => navigate('/feed')} variant="outlined" disabled={loading} sx={{ py: 1.5, px: 3 }}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              size="large" 
              disabled={loading}
              sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
            >
              {loading ? 'Posting...' : 'Publish Post'}
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};
export default CreatePostPage;