import { Router } from 'express';

const router = Router();

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;