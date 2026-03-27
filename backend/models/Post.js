const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post must be associated with an author (user objectId)'],
  },
  username: {
    type: String,
    required: [true, 'Username must be denormalized for efficient post rendering'],
  },
  text: {
    type: String, 
  },
  imageUrl: {
    type: String, 
  },
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      username: String,
      likedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), 
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      username: String,
      text: {
        type: String,
        required: [true, 'Comment text is required'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Post', postSchema);