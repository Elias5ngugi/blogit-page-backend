import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './Routes/UserRoutes';

dotenv.config();

const app = express();

// Update CORS settings to allow both local and deployed frontends
app.use(cors({
  origin: [
    'http://localhost:5173', // Local frontend
    'http://blog-it-page-shh9.vercel.app' // Deployed frontend (your Vercel URL)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Use the user routes for the authentication API
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
