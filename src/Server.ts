import express from 'express';
import blogRoutes from './Routes/BRoutes';  

const app = express();

app.use(express.json());  
app.use('/api/posts', blogRoutes);  

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
