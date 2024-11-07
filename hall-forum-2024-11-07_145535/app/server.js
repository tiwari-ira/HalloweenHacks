const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// SQLite database setup (stored in .data folder)
const db = new sqlite3.Database('.data/reviews.db', (err) => {
  if (err) console.error('Error opening database:', err);
  else console.log('Connected to SQLite database.');
});

// Create table if it doesn’t exist
db.run(
  `CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review TEXT NOT NULL
  )`
);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from public folder

// Route: Get all reviews
app.get('/reviews', (req, res) => {
  db.all('SELECT * FROM reviews ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching reviews:', err.message);
      res.status(500).json({ error: 'Failed to load reviews.' });
    } else {
      res.json(rows);
    }
  });
});

// Route: Submit a new review
app.post('/reviews', (req, res) => {
  const { company, rating, review } = req.body;

  if (!company || !review || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Invalid input.' });
  }

  db.run(
    'INSERT INTO reviews (company, rating, review) VALUES (?, ?, ?)',
    [company, rating, review],
    function (err) {
      if (err) {
        console.error('Error inserting review:', err.message);
        res.status(500).json({ error: 'Failed to submit review.' });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
