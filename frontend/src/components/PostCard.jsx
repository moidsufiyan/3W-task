import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardMedia, Typography, Avatar, Box, IconButton, Collapse } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
const PostCard = ({ post, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL 
    ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') 
    : 'http://localhost:5000';
  const imageUrl = post.imageUrl ? `${apiUrl}${post.imageUrl}` : null;
  const dateStr = new Date(post.createdAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ mb: 4, transition: 'all 0.1s ease-in-out', '&:hover': { transform: 'translate(-2px, -2px)', boxShadow: '8px 8px 0px #0A0A0A' } }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#0033CC', fontWeight: '900' }}>
            {post.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="body1" fontWeight="800">
            {post.username}
          </Typography>
        }
        subheader={
          <Typography variant="caption" fontWeight="600" color="text.secondary">
            {dateStr}
          </Typography>
        }
        sx={{ borderBottom: '2px solid #0A0A0A' }}
      />
      {post.text && (
        <CardContent sx={{ pt: 2, pb: imageUrl ? 2 : 3 }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontWeight: '600' }}>
            {post.text}
          </Typography>
        </CardContent>
      )}
      {imageUrl && (
        <Box sx={{ borderTop: post.text ? '2px solid #0A0A0A' : 'none', borderBottom: '2px solid #0A0A0A' }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt="User post image"
            sx={{ maxHeight: 500, objectFit: 'contain', bgcolor: '#FAFAFA' }}
          />
        </Box>
      )}
      <Box sx={{ px: 2, pt: 1, pb: 1, display: 'flex', alignItems: 'center', borderBottom: expanded ? '2px solid #0A0A0A' : 'none' }}>
        <LikeButton post={post} onUpdate={onUpdate} />
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleExpandClick}>
          <IconButton color={expanded ? "primary" : "default"} size="small" sx={{ mr: 0.5 }}>
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: '800', userSelect: 'none' }}>
            {post.comments?.length || 0} {post.comments?.length === 1 ? 'Comment' : 'Comments'}
          </Typography>
        </Box>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ px: 2, pb: 2, pt: 2, bgcolor: '#FAFAFA' }}>
          <CommentSection 
            postId={post._id} 
            comments={post.comments} 
            onUpdate={onUpdate} 
          />
        </Box>
      </Collapse>
    </Card>
  );
};
export default PostCard;