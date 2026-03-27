const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  createPost,
  getFeed,
  toggleLike,
  addComment
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only are supported!'), false);
  }
};
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});
router.post('/', protect, upload.single('image'), createPost);
router.get('/feed', getFeed);
router.post('/:postId/like', protect, toggleLike);
router.post('/:postId/comment', protect, addComment);
module.exports = router;