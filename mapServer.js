const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// MySQL Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'gt_numbers'
});

app.get('/', (req, res) => {
    return res.json("Hey, it's working!");
});

// Fetch data for Google Maps
app.get('/data', (req, res) => {
    const sql = `
        SELECT c.*, o.Owner_name
        FROM Camera_Information c
        JOIN Owner_Information o ON c.Camera_IPaddress = o.Camera_IPaddress
    `;

    // Use the pool.getConnection method to get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection:', err);
            return res.json(err);
        }

        // Use the acquired connection for your database query
        connection.query(sql, (queryErr, data) => {
            // Release the connection back to the pool when done
            connection.release();

            if (queryErr) {
                console.error('Error executing query:', queryErr);
                return res.json(queryErr);
            }

            return res.json(data);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/data`);
});
