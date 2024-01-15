const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');
// These id's and secrets should come from .env file.
const CLIENT_ID = '119367608078-aoqm6g1itnpp068dvprccgb2h9mdbm0f.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04MeKtsuk-CTQCgYIARAAGAQSNwF-L9Irdt4nYUY-h0iBw4rp_qyrfm-1LBG25wApc4ZmjMV-WaLlWRTMlEnBo2Y4Q5adqKBPr-k';
const allowedEmails = ['kingakash1010@gmail.com', 'namanrao400@gmail.com', 'deepsinghjashan1313@gmail.com', 'gurusingh2585@gmail.com'];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'geoforce24x7@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'White Hat Hacker <geoforce24x7@gmail.com>',
      to: allowedEmails,
      subject: 'Weapon Detected',
      text: 'We Detected a Weapon in your area from your CCTV',
      html: '<h1>!! KINDLY BE AWARE !!</h1> <h3>  We detected a Weapon in your area from your CCTV! </h3> <h4>  (You can refer to the attachment below) </h4>',
      attachments: [{
        filename: 'snapshot.jpeg',
        path: "snapshot.jpeg",
        encoding: 'base64',
    }],
    };


    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
.then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));
