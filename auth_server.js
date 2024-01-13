const express = require('express');
const bodyParser = require('body-parser');
const sendMail = require('./code/sendMail');
const session = require('express-session');

const app = express();
const port = 3300;

const allowedEmails = ['kingakash1010@gmail.com', 'namanrao400@gmail.com', 'deepsinghjashan1313@gmail.com', 'gurusingh2585@gmail.com'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: '47e01e52a3d8af80404a098bf41d2e4495780e3db3275887485752fb04694df4',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.render('index', { retry: false, email: '', invalidEmail: false });
});

app.post('/sendOTP', async (req, res) => {
    const email = req.body.email;

    if (allowedEmails.includes(email)) {
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
    res.render('index', { retry: true, email, invalidEmail: true });
}
});

app.post('/verifyOTP', (req, res) => {
    const { email, otp: enteredOTP } = req.body;

    // Retrieve the stored OTP from the session
    const generatedOTP = req.session.generatedOTP;

    // Clear the stored OTP from the session to prevent reuse
    req.session.generatedOTP = null;

    // Compare the entered OTP with the generated OTP
    const isOTPValid = generatedOTP === enteredOTP;

    if (isOTPValid) {
        // Assuming OTP verification is successful, redirect to the link
        const redirectLink = 'https://www.playbook.com/s/forfree/dMbbWrVpsvdT2qTqFWUE3akh'; // Replace with your desired link
        res.redirect(redirectLink);
    } else {
        // OTP verification failed, you might want to handle this case
        res.send('Invalid OTP. Please try again.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
