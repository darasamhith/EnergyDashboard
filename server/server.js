const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


const summaryData = [
  {"sector": "Solar", "investment": 215},
  {"sector": "Wind", "investment": 120},
  {"sector": "Electric Vehicles", "investment": 80},
  {"sector": "Energy Storage", "investment": 45},
  {"sector": "Hydropower", "investment": 20},
  {"sector": "Geothermal", "investment": 10}
  ];
  
  // Sample data for the report chart
  const reportData = [
    {"year": 2014, "capacity": 177},
    {"year": 2015, "capacity": 220},
    {"year": 2016, "capacity": 310},
    {"year": 2017, "capacity": 400},
    {"year": 2018, "capacity": 450},
    {"year": 2019, "capacity": 500},
    {"year": 2020, "capacity": 580},
    {"year": 2021, "capacity": 650},
    {"year": 2022, "capacity": 720},
    {"year": 2023, "capacity": 800}
  ];


  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Register a new user (adds encrypted password to the database)
app.post('/register', async (req, res) => {
  const { username, password, full_name, email } = req.body;

  if (!username || !password || !full_name || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password
    const query = `INSERT INTO users (username, password, full_name, email) VALUES (?, ?, ?, ?)`;

    db.query(query, [username, hashedPassword, full_name, email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error inserting user into database' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = `SELECT * FROM users WHERE username = ?`;

  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ username }, 'Samhiths firwall', { expiresIn: '1h' });
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});



// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendStatus(403); // Forbidden
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'Samhiths firwall', (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

app.post('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

// Endpoint to get summary data (protected)
app.get('/api/summary-data', verifyToken,(req, res) => {
  db.query('SELECT * FROM investment_data', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results); // Send the data back as a JSON response
  });
    // res.json(summaryData);
    });
    
// Endpoint to get report data (protected)
app.get('/api/report-data', verifyToken, (req, res) => {
  db.query('SELECT * FROM report_data', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results); // Send the data back as a JSON response
  });});




// Example protected route
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You have accessed a protected route', user: req.user });
});

app.listen(3001, () => console.log('Server running on port 3001'));
