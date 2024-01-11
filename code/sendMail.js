const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '119367608078-aoqm6g1itnpp068dvprccgb2h9mdbm0f.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04MeKtsuk-CTQCgYIARAAGAQSNwF-L9Irdt4nYUY-h0iBw4rp_qyrfm-1LBG25wApc4ZmjMV-WaLlWRTMlEnBo2Y4Q5adqKBPr-k';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, otp) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'geoforce24x7@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'White Hat Hackers <geoforce24x7@gmail.com>',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${otp}`,
            html: `<h1>Your OTP is: ${otp}</h1>`,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = sendMail;