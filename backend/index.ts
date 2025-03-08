import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import masterRouter from "./src/routes/v1/masterRoute"

import { errorHandler } from './src/utils/errorHandler';
import { connectDB } from './src/initializers/mongoDb';
import { apiLimiter } from './src/middlewares/rateLimiter';

dotenv.config();
const app: Application = express();

// MongoDB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiLimiter, masterRouter)

app.use(errorHandler)

const port = process.env.APP_PORT || 4005;

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});