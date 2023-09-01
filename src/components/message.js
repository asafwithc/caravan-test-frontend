import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import jwt_decode from "jwt-decode";

const socket = io('http://localhost:3010'); // Adjust the URL accordingly

function Messaging({token}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  useEffect(() => {
    const data = new Object({
      senderToken: token,
    })
    socket.emit('add-user', data);
  }, []);

  useEffect(() => {
    socket.on('receive-msg', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = () => {
    var decoded = jwt_decode(token);
    console.log(decoded)
    const sender = "64e4c4096cff1d18dae45c01"; // Replace with actual sender ID
    const receiver = "64e4c078858869ef47effc06"; // Replace with actual receiver ID

    const messageData = {
      senderId: sender,
      receiverId: receiver,
      content: newMessage
    };

    socket.emit('send-msg', messageData);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Messaging App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Messaging;
