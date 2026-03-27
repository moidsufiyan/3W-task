import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import axiosClient from '../api/axiosClient';
import PostCard from '../components/PostCard';
const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadFeed = async (pageNumber) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosClient.get(`/posts/feed?page=${pageNumber}&limit=10`);
      if (pageNumber === 1) {
        setPosts(res.data.posts);
      } else {
        setPosts(prev => {
          const incomingPosts = res.data.posts;
          const distinctPosts = incomingPosts.filter(
            incoming => !prev.some(existing => existing._id === incoming._id)
          );
          return [...prev, ...distinctPosts];
        });
      }
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to load feed:', err);
      setError('Unable to fetch the latest feed. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadFeed(1);
  }, []);
  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadFeed(nextPage);
    }
  };
  const handleUpdatePost = (postId, updatedPost) => {
    setPosts(prevPosts => 
      prevPosts.map(p => p._id === postId ? updatedPost : p)
    );
  };
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Typography variant="h3" fontWeight="900" mb={5} color="text.primary" sx={{ letterSpacing: '-1px', textTransform: 'uppercase', borderBottom: '4px solid #0A0A0A', pb: 1 }}>
          Global Feed
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 4, border: '2px solid #d32f2f', borderRadius: 0 }}>{error}</Alert>}
        {posts.map(post => (
          <PostCard 
            key={post._id} 
            post={post} 
            onUpdate={handleUpdatePost} 
          />
        ))}
        {loading && (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress sx={{ color: '#0A0A0A' }} thickness={5} />
          </Box>
        )}
        {!loading && page < totalPages && !error && (
          <Box display="flex" justifyContent="center" my={5}>
            <Button variant="outlined" onClick={loadMore} size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem', borderWidth: '2px' }}>
              Load More Posts
            </Button>
          </Box>
        )}
        {!loading && posts.length === 0 && !error && (
          <Box sx={{ border: '2px solid #0A0A0A', bgcolor: '#FFFFFF', p: 4, boxShadow: '6px 6px 0px #0A0A0A' }}>
            <Typography align="center" variant="h5" fontWeight="800" color="text.primary">
              No posts found.
            </Typography>
            <Typography align="center" variant="body1" fontWeight="600" mt={2} color="text.secondary">
              Be the first to create one!
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
};
export default FeedPage;