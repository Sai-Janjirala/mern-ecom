import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cart.js';
import addressRoutes from './routes/address.js';
import orderRoutes from './routes/order.js';

dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/order', orderRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const startServer = async () => {
  await connectDB();

  app.listen(5001, () => {
    console.log('Server is running on port 5001');
  });
};

startServer();
