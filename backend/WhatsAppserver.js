const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_NUMBER =process.env.TWILIO_FROM_NUMBER;
const TWILIO_TO_NUMBER=process.env.TWILIO_TO_NUMBER;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.get("/", (req, res) => {
  res.send("Hello from WhatsAppserver!");
});
app.post("/send-whatsapp", (req, res) => {
  const { message } = req.body;
  client.messages
    .create({
      body: message,
      from: `whatsapp:${TWILIO_FROM_NUMBER}`,
      to: `whatsapp:${TWILIO_TO_NUMBER}`,
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
app.listen(PORT, () => {
  console.log("Connnecte to ", PORT)
});
