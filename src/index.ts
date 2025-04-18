import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './Routes/UserRoutes';
import blogRoutes from './Routes/BRoutes';

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    'https://blog-it-page.vercel.app',
    'http://localhost:5173' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());


app.use('/api/auth', userRoutes);
app.use('/api/blogs', blogRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
