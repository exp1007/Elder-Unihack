import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

function Contact() {
  const [messages, setMessages] = useState([]); // To store chat messages
  const [input, setInput] = useState(''); // To manage the input value
  const chatBoxRef = useRef(null); // Ref for the chat box

  // Function to handle sending a message
  const sendMessage = async () => {
    if (input.trim() === '') return; // Prevent sending empty messages

    // Add the user's message to the chat
    const newMessages = [...messages, { sender: 'user1', text: input }];
    setMessages(newMessages);

    // Clear the input field
    setInput('');

    try {
      const response = await fetch(`http://localhost:8081/openai?prompt=${encodeURIComponent(input)}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch bot reply');
      }
  
      const data = await response.json();
  
      // Extract the content field from the response
      const botReply = data.choices?.[0]?.message?.content || "Error: Unable to get reply";
  
      // Add the bot's reply to the chat
      setMessages((prevMessages) => [...prevMessages, { sender: 'user2', text: botReply }]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'user2', text: 'Error: Unable to fetch reply.' }]);
    }
  };

  // Handle Enter key press in the input box
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]); // Trigger scrolling when the `messages` array changes

  return (
    <div className="Main-container">
      <div className="chat-container">
        <div className="chat-header">
          <p>ChatBOT - virtual medical assistant</p>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            placeholder="Message..."
            type="text"
            className="chat-custom-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="chat-custom-button"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
