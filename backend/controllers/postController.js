const Post = require('../models/Post');
const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    if (!text && !imageUrl) {
      return res.status(400).json({ message: 'A post must contain either text content or an image.' });
    }
    const post = await Post.create({
      user: req.user.id,
      username: req.user.username,
      text: text || undefined,
      imageUrl: imageUrl || undefined
    });
    return res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Internal server error while creating post', error: error.message });
  }
};
const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const formattedPosts = posts.map(post => {
      const postObj = post.toObject();
      postObj.likesCount = postObj.likes.length;
      postObj.commentsCount = postObj.comments.length;
      return postObj;
    });
    return res.status(200).json({
      posts: formattedPosts,
      page,
      totalPages,
      totalPosts
    });
  } catch (error) {
    console.error('Error fetching feed:', error);
    return res.status(500).json({ message: 'Internal server error while fetching feed', error: error.message });
  }
};
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const existingLikeIndex = post.likes.findIndex(
      like => like.userId.toString() === req.user.id
    );
    if (existingLikeIndex > -1) {
      post.likes.splice(existingLikeIndex, 1);
    } else {
      post.likes.push({
        userId: req.user.id,
        username: req.user.username,
        likedAt: new Date() 
      });
    }
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.error('Error toggling like:', error);
    return res.status(500).json({ message: 'Internal server error while toggling like', error: error.message });
  }
};
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required.' });
    }
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const newComment = {
      userId: req.user.id,
      username: req.user.username,
      text,
      createdAt: new Date()
    };
    post.comments.push(newComment);
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Internal server error while adding comment', error: error.message });
  }
};
module.exports = {
  createPost,
  getFeed,
  toggleLike,
  addComment
};