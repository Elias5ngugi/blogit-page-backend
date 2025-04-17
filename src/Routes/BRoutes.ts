import express from 'express';
import { createPost, getUserPosts } from '../Controller/blogController';
import { authenticate } from '../Middlewares/authenticate';
import multer from 'multer';

const router = express.Router();

// Multer setup to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to create a post (with featured image upload)
router.post('/create', authenticate, upload.single('featuredImage'), createPost);

// Route to get posts of the authenticated user
router.get('/my-posts', authenticate, getUserPosts);

export default router;
