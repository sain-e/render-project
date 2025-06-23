import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_URL = process.env.ALLOWED_URL;

// Middleware
app.use(cors({ origin: `${ALLOWED_URL}`, credentials: true }));  // specify ruta aqui
app.use(express.json());

// Dummy users data
const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 4, name: "Alex", email: "alex@example.com" }
];

// Users route
app.get("/api/v1/users", (req, res) => {
    res.json(users);
});


// RENDER escucha todos los puertos - https://render.com/docs/web-services#port-binding
// Agregar un environment variable en render de PORT: 10000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});