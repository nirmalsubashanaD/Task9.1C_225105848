import React, { useState } from 'react';
import "./EmailPart.css"

const EmailPart = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
  
    try {
        const res = await fetch('http://localhost:3001/subscribe', {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Use JSON here
        },
        body: JSON.stringify({ email }),        // Stringify your JSON body
      });
  
      if (res.ok) {
        setStatus('Success! Check your email!');
        setEmail('');
      } else {
        setStatus('Error sending email.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Network error. Try again.');
    }
  };
  

  return (
    <div className="container">
      <h2>SIGN UP FOR OUR DAILY INSIDER!</h2>
      <form className='formemail' onSubmit={handleSubmit}>
        <input
          type="email"
          className='emailfoot'
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='subButton' type="submit">Subscribe</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default EmailPart;
