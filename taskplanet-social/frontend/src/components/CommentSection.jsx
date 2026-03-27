import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const CommentSection = ({ postId, comments, onUpdate }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (!newComment.trim()) return;
    try {
      setLoading(true);
      const res = await axiosClient.post(`/posts/${postId}/comment`, { text: newComment });
      if (onUpdate) {
        const updatedPost = {
          ...res.data,
          likesCount: res.data.likes?.length || 0,
          commentsCount: res.data.comments?.length || 0
        };
        onUpdate(postId, updatedPost);
      }
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ mt: 1, width: '100%' }}>
      {comments && comments.length > 0 ? (
        <List sx={{ maxHeight: 250, overflow: 'auto', bgcolor: '#FFFFFF', border: '2px solid #0A0A0A', mb: 3, p: 0 }}>
          {comments.map((c, i) => (
            <ListItem key={c._id || i} alignItems="flex-start" dense sx={{ px: 2, py: 1.5, borderBottom: i !== comments.length - 1 ? '2px solid #0A0A0A' : 'none' }}>
              <ListItemText
                primary={
                  <Typography variant="caption" fontWeight="900" color="#0033CC" sx={{ textTransform: 'uppercase' }}>
                    {c.username}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="#0A0A0A" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', fontWeight: '600', mt: 0.5 }}>
                    {c.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, ml: 1, fontWeight: '700' }}>
          No comments yet.
        </Typography>
      )}
      <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
        <TextField
          size="small"
          fullWidth
          placeholder={currentUser ? "Add a comment..." : "Log in to comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          variant="outlined"
          disabled={!currentUser || loading}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={!newComment.trim() || loading || !currentUser}
          size="small"
          sx={{ px: 3 }}
        >
          Post
        </Button>
      </form>
    </Box>
  );
};
export default CommentSection;