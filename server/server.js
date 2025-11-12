import express from 'express';
import cors from 'cors';
import { initDatabase, userOps, cvOps } from './database.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize database
initDatabase();

// Middleware to extract userId from headers
const getUserId = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'User ID required' });
  }
  req.userId = userId;
  next();
};

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim().length === 0) {
      return res.status(400).json({ error: 'Username is required' });
    }

    let user = userOps.findByUsername(username);

    if (!user) {
      // Create new user
      const userId = crypto.randomUUID();
      userOps.create(userId, username);
      user = userOps.findById(userId);
    }

    res.json({ user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// CV endpoints
app.get('/api/cvs', getUserId, (req, res) => {
  try {
    const cvs = cvOps.getAllByUser(req.userId);
    const parsedCvs = cvs.map(cv => ({
      ...JSON.parse(cv.data),
      savedAt: cv.updated_at
    }));
    res.json({ cvs: parsedCvs });
  } catch (error) {
    console.error('Get CVs error:', error);
    res.status(500).json({ error: 'Failed to fetch CVs' });
  }
});

app.get('/api/cvs/:id', getUserId, (req, res) => {
  try {
    const cv = cvOps.getById(req.params.id, req.userId);
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    res.json({ cv: JSON.parse(cv.data) });
  } catch (error) {
    console.error('Get CV error:', error);
    res.status(500).json({ error: 'Failed to fetch CV' });
  }
});

app.post('/api/cvs', getUserId, (req, res) => {
  try {
    const cv = req.body;

    if (!cv.id) {
      return res.status(400).json({ error: 'CV ID is required' });
    }

    // Check if CV exists
    const existing = cvOps.getById(cv.id, req.userId);

    if (existing) {
      // Update existing
      cvOps.update(cv, req.userId);
    } else {
      // Create new
      cvOps.create(cv, req.userId);
    }

    res.json({ success: true, cv });
  } catch (error) {
    console.error('Save CV error:', error);
    res.status(500).json({ error: 'Failed to save CV' });
  }
});

app.put('/api/cvs/:id', getUserId, (req, res) => {
  try {
    const cv = req.body;
    const result = cvOps.update(cv, req.userId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'CV not found' });
    }

    res.json({ success: true, cv });
  } catch (error) {
    console.error('Update CV error:', error);
    res.status(500).json({ error: 'Failed to update CV' });
  }
});

app.delete('/api/cvs/:id', getUserId, (req, res) => {
  try {
    const result = cvOps.delete(req.params.id, req.userId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'CV not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Delete CV error:', error);
    res.status(500).json({ error: 'Failed to delete CV' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`CV Maker server running on http://localhost:${PORT}`);
});
