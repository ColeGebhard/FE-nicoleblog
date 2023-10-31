import React, { useState } from "react";
import { unsubscribeEmail } from "./api";
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import './DeleteEmail.css';

const DeleteEmail = () => {
    const [email, setEmail] = useState("");

    async function deleteEmail(email) {
  
      try {
          const response = await unsubscribeEmail({ email });
          
          if (response.error === 'Email field is required.') {
              NotificationManager.error("Failed to unsubscribe", 'Email field is required.');
          } else if (response.error === 'Failed to unsubscribe email' || response.error === 'Email not found') {
              NotificationManager.error("Failed to unsubscribe", 'Email not found in list');
          } else if (response.success === true) {
              setEmail("");
              NotificationManager.success('Check your email for confirmation', 'Successfully Unsubscribed');
          }
      } catch (e) {
          console.error(e);
      }
  }
  
  return (
    <div className="deleteEmailBody">
        <h1>Unsubsribe Form</h1>
        <h2>Sad to see you go! Just plug in your email and you will stop recieving emails from us.</h2>
        <form onSubmit={(e) => {
    e.preventDefault();
    deleteEmail(email);
}}>            <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button type="submit">Unsubsribe</button>
        </form>
    </div>
  )

};

export default DeleteEmail;
