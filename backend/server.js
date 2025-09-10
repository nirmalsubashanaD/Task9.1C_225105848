const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001; // match frontend fetch()

app.use(cors());  //resourse share karanna denawa back end to frontend
app.use(express.json());   //data json file walata convert karanwa
app.use(express.static('public'));

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send('Email is required.');

  // Setup transporter
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "nirmalsubashana3@gmail.com",
      pass: "gwfh jevn vnzz wnva",  
    },
  });

  // Email options
  const mailOptions = {
    from: `"DEV@Deakin" <nirmalsubashana3@gmail.com>`,
    to: email,
    subject: 'Welcome to DEV@Deakin!',
    html: `
      <h3>Hi there!</h3>
      <p>Welcome to DEV@Deakin. We're thrilled to have you on board.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent!' });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
