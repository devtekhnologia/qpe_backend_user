import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import path from 'path';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const app: Application = express();

// MongoDB connection
const mongoURI = process.env.MONGO_URI


if (!mongoURI) {
  console.error('MongoDB connection string (MONGO_URI) is not defined in environment variables.');
  process.exit(1); // Exit the process to prevent further execution
}

mongoose.connect(mongoURI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter configuration (Limit: 999 requests per minute per IP)
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 999, // Limit each IP to 999 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again later' },
  headers: true,
});

app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// Test route
app.get('/api/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'MongoDB connection successful' });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Set the port number
const port = process.env.PORT || 4005;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
