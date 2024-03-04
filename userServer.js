const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Your MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'gt_numbers',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Add this route to your existing Express server code
app.post('/login', (req, res) => {
    const { Email, Password } = req.body;

    // Query the database to check if the user with the provided credentials exists
    const sql = 'SELECT * FROM registered_users WHERE Email = ? AND password = ?';
    const values = [Email, Password];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // User exists, redirect to another webpage (change the URL accordingly)
                res.redirect('http://127.0.0.1:5502/code/index.html');
            } else {
                // User does not exist or credentials are incorrect
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    });
});


// Simple route handler for the root URL
app.get('/', (req, res) => {
    res.send('Hello, this is the root page!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
