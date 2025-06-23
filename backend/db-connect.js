import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Load environment variables from a .env file if needed
const MONGODB_URI = process.env.MONGODB_URI;
           
const DB_NAME = 'test';

let client;
let db;

async function connectDB() {
    if (!client) {
        client = new MongoClient(MONGODB_URI);

        await client.connect();
        db = client.db(DB_NAME);
        console.log(`✅ Connected to MongoDB database: ${DB_NAME}`);
    }

    return db;
}

export default connectDB;