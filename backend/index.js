import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import connectDB from './db-connect.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = new Set(process.env.ALLOWED_ORIGINS.split(','));

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        console.log(allowedOrigins);
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: Origin not allowed'), false);
    },
    credentials: true,
}));

app.use(express.json());


async function startServer() {
  try {
    // Connect to MongoDB and store the DB instance in app.locals
    const db = await connectDB();
    app.locals.db = db;

    // Mount routes
    app.use('/api/v1/users', usersRouter);
    
    // RENDER escucha todos los puertos - https://render.com/docs/web-services#port-binding
    // Agregar un environment variable en render de PORT: 10000
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit the process with failure code
  }
}

startServer();