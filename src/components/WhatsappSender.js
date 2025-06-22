import { React, useRef, useState, useEffect } from "react";
import { Typography, Grid, Button } from "@mui/material"; // Importing components from @mui/material
import { URI } from "./Constants";
import './WhatsappSender.css'
const WhatsAppSender = ({ resultToWhatsapp }) => {
  const [buttonState, setButtonState] = useState('');
  const [status, setStatus] = useState("");
  const [lastSentTime, setLastSentTime] = useState(null);
  const isMounted = useRef(false);
  const hasSentMessage = useRef(false);

  const prevResultToWhatsapp = useRef(resultToWhatsapp); // Track previous value of resultToWhatsapp
  const sendMessage = () => {
    if (lastSentTime !== null) {
      // Check if sending another message exceeds the rate limit
      const elapsed = Date.now() - lastSentTime;
      if (elapsed < 1000) {
        // 1 second rate limit
        setTimeout(sendMessage, 1000 - elapsed);
        return;
      }
    }
    sendRequest();
  };
  const handleSendMessage = async () => {
    setButtonState('loading');
    setStatus('Sending message...');

    try {
      // Call the sendMessage function
      if (sendMessage) {
        await sendMessage();
      }

      // Simulate success
      setButtonState('success');
      setStatus('Message sent successfully!');

      // Reset after 2 seconds
      setTimeout(() => {
        setButtonState('');
        setStatus('Ready to send');
      }, 2000);

    } catch (error) {
      setButtonState('error');
      setStatus('Failed to send message');

      // Reset after 2 seconds
      setTimeout(() => {
        setButtonState('');
        setStatus('Ready to send');
      }, 2000);
    }
  };
  
  const sendRequest = () => {
    fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: resultToWhatsapp }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.success) {
          setStatus(data.message);
          
          setLastSentTime(Date.now()); // Update last sent time
        } else {
          
          setStatus(`Error sending message "${data.message}`);
        }
      })
      .catch((error) => {
        // alert("Error!!!");
        setStatus(`Error from whtsappSender : ${error.message}`);
      });
  };

  useEffect(() => {
    

    // Check if the component is mounted and resultToWhatsapp has changed
    if (
      isMounted.current &&
      !hasSentMessage.current

      // prevResultToWhatsapp.current !== resultToWhatsapp
    ) {
      
      hasSentMessage.current = true; // Mark that the message has been sent
    } else {
      isMounted.current = true;
    }
    // Update the previous value of resultToWhatsapp
    prevResultToWhatsapp.current = resultToWhatsapp;
    return () => {
      // Cleanup function
      setStatus("");
      setLastSentTime(null);
    };
  }, [resultToWhatsapp]);
  return (
    <div className="whatsapp-sender-container">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        className="whatsapp-grid-container"
      >
        <Grid item className="whatsapp-status-item">
          <Typography
            variant="body1"
            className="whatsapp-status-text"
          >
            {status}
          </Typography>
        </Grid>
        <Grid item className="whatsapp-button-item">
          <Button
            variant="contained"
            onClick={handleSendMessage}
            className={`whatsapp-send-button ${buttonState}`}
            disabled={buttonState === 'loading'}
          >
            {buttonState === 'loading' ? 'Sending...' :
              buttonState === 'success' ? 'Sent!' :
                buttonState === 'error' ? 'Failed' :
                  '📱 Send WhatsApp'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default WhatsAppSender;
