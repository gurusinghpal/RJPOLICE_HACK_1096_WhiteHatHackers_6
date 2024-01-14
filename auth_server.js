const express = require('express');
const bodyParser = require('body-parser');
const sendMail = require('./code/sendMail');
const session = require('express-session');
const mysql = require('mysql');

const app = express();
const port = 3300;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: '47e01e52a3d8af80404a098bf41d2e4495780e3db3275887485752fb04694df4',
    resave: false,
    saveUninitialized: true,
}));

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'gt_numbers',
});

dbConnection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.render('index', { retry: false, email: '', invalidEmail: false });
});

app.post('/sendOTP', async (req, res) => {
    const email = req.body.email;

    // Check if the email exists in the database
    const query = 'SELECT * FROM access_email_db WHERE EmailId = ?';
    dbConnection.query(query, [email], async (error, results) => {
        if (error) {
            res.send(`Database error: ${error.message}`);
        } else if (results.length > 0) {
            // Generate random 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000);

            try {
                const result = await sendMail(email, otp);

                // Store the generated OTP in the session
                req.session.generatedOTP = otp.toString();

                // Render a page where the user enters the OTP
                res.render('verify', { email });
            } catch (error) {
                res.send(`Error: ${error.message}`);
            }
        } else {
            // Email not found in the database
            res.render('index', { retry: true, email, invalidEmail: true });
        }
    });
});

app.post('/verifyOTP', (req, res) => {
    const { email, otp: enteredOTP } = req.body;

    // Retrieve the stored OTP from the session
    const generatedOTP = req.session.generatedOTP;

    // Compare the entered OTP with the generated OTP
    const isOTPValid = generatedOTP === enteredOTP;

    if (isOTPValid) {
        // Assuming OTP verification is successful, redirect to the link
        const redirectLink = 'https://www.playbook.com/s/forfree/dMbbWrVpsvdT2qTqFWUE3akh'; // Replace with your desired link
        res.redirect(redirectLink);
    } else {
        // Invalid OTP. Render the verify page with an error message
        res.render('verify', { email, invalidOTP: true });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
