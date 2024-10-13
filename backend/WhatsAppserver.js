// const console = require('./logger');
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
// const twilioNumber = '+12406509853';
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
      console.log(`Message sent with SID: ${message.sid}`);
      res
        .status(200)
        .json({
          success: true,
          message: `Message sent with SID: ${message.sid}`,
        });
    })
    .catch((error) => {
      console.log(`Error sending message: ${error.message}`);
      res
        .status(500)
        .json({
          success: false,
          message: `Error sending message: ${error.message}`,
        });
    });
});
app.listen(port, () => {
  console.log(`Server is running on port from whatsappserver ${port}`);
});
