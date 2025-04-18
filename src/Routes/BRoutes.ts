import express from 'express';
import { createPost, getUserPosts } from '../Controller/blogController';
import { authenticate } from '../Middlewares/authenticate';
import multer from 'multer';

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/create', authenticate, upload.single('featuredImage'), createPost);


router.get('/my-posts', authenticate, getUserPosts);

export default router;
