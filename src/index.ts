import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './Routes/UserRoutes';

dotenv.config();

const app = express();

app.use(cors()); 

app.use(express.json());


app.use('/api/auth', userRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
