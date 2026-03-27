import React, { useState, useEffect, useContext } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const LikeButton = ({ post, onUpdate }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  useEffect(() => {
    const isLikedByMe = currentUser 
      ? post.likes?.some(like => like.userId === currentUser.id) 
      : false;
    setLiked(isLikedByMe);
    setLikesCount(post.likesCount ?? post.likes?.length ?? 0);
  }, [post, currentUser]);
  const handleToggleLike = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    try {
      setLiked(!liked);
      setLikesCount(prev => liked ? prev - 1 : prev + 1);
      const res = await axiosClient.post(`/posts/${post._id}/like`);
      if (onUpdate) {
        const updatedPost = {
          ...res.data,
          likesCount: res.data.likes.length,
          commentsCount: res.data.comments.length
        };
        onUpdate(post._id, updatedPost);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      const isLikedByMe = currentUser 
        ? post.likes?.some(like => like.userId === currentUser.id) 
        : false;
      setLiked(isLikedByMe);
      setLikesCount(post.likesCount ?? post.likes?.length ?? 0);
    }
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
      <IconButton onClick={handleToggleLike} sx={{ color: liked ? '#ff0000' : '#0A0A0A', transition: 'transform 0.1s', '&:active': { transform: 'scale(0.8)' } }}>
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography variant="body2" sx={{ fontWeight: '800', color: '#0A0A0A' }}>
        {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
      </Typography>
    </Box>
  );
};
export default LikeButton;