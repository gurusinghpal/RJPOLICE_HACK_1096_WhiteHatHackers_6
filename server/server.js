const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
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

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch Camera Information
// app.get('/Camera_Information', (req, res) => {
//     const sql = 'SELECT * FROM Camera_Information';
//     db.query(sql, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

// // Fetch Owner Information
// app.get('/Owner_Information', (req, res) => {
//     const sql = 'SELECT * FROM Owner_Information';
//     db.query(sql, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/data`);
});
