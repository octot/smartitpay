const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const twilioNumber = "+14155238886";
app.post("/send-whatsapp", (req, res) => {
  const { message, to } = req.body;
  client.messages
    .create({
      body: message,
      from: `whatsapp:${twilioNumber}`,
      to: `whatsapp:${to}`,
    })
    .then((message) => {
      
      res.status(200).json({
        success: true,
        message: `Message sent with SID: ${message.sid}`,
      });
    })
    .catch((error) => {
      
      res.status(500).json({
        success: false,
        message: `Error sending message: ${error.message}`,
      });
    });
});
app.listen(port, () => {
  
});
