'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassifyComponents = () => {
  const [emails, setEmails] = useState([]);
  const [predictedEmails, setPredictedEmails] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('emails'));
      if(storedEmails?.length > 0){
        setEmails(storedEmails);

      }
  }, []);
  const truncateEmailBody = (email) => {
    const tokenLimit = 20000;
    if (email.body.length > tokenLimit) {
        // Split the body into tokens by whitespace
        const tokens = email.body.split(/\s+/);
        // Truncate the tokens to the token limit
        const truncatedTokens = tokens.slice(0, tokenLimit);
        // Join the truncated tokens back into a string
        email.body = truncatedTokens.join(' ');
    }
    return email;
};

const classifyEmails = async () => {
    // Truncate the body of each email in the emails array if it exceeds 20000 tokens
    const truncatedEmails = emails.map(truncateEmailBody);

    // Check if there are any truncated emails
    if (truncatedEmails.length > 0){
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/classify-emails?Google_Api_Key=${localStorage.getItem('apikey')}`, { emails: truncatedEmails });
        setPredictedEmails(response.data);
    }
};
const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowDetails(true);
  };
  const handleClose = () => {
    setShowDetails(false);
  };
const getColorForCategory = (category) => {
    switch (category) {
        case 'Important':
            return 'green';
        case 'Spam':
            return 'red';
        case 'Marketing':
            return 'orange';
        case 'Promotions':
            return 'yellow';
        case 'General':
            return 'blue';
        case 'Social':
            return 'purple';
        default:
            return 'black'; // default color
    }
};
  useEffect(()=>{
      classifyEmails();
  },[emails])



  return (
    <div>
        
      {predictedEmails?.length > 0 ? (
        <div className="">
          {emails.map((email, index) => (
            <div className="hover:bg-gray-500 email-card" key={index} onClick={() => handleEmailClick(email)}>
              <div className="email-header">
               <div className='flex justify-between'>
               Subject: {email.subject}
               <div key={email.emailId} className='rounded-2xl sm:h-8 h-1/2 px-2 py-1' style={{ backgroundColor: getColorForCategory(predictedEmails?.find(predEmail => predEmail.emailId === email.emailId)?.category || 'General') }}>
    <strong></strong> {(predictedEmails?.find(predEmail => predEmail.emailId === email.emailId)?.category === 'Error') ? 'General' : (predictedEmails?.find(predEmail => predEmail.emailId === email.emailId)?.category || 'General')}
</div>

               </div>
                <br />

                <strong>From:</strong> {email.sender}
              </div>
              <div>
                <strong>Snippet:</strong> {email.snippet}
              </div>
            
            </div>
          ))}

      {showDetails && (
        <div
          className={`email-details-container my-4 ${showDetails ? 'show' : 'hide'}`}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '40%',
            height: 'calc(100vh - 50px)',
            background: 'gray',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            overflowY: 'auto',
            opacity: showDetails ? 1 : 0,
            transform: showDetails ? 'translateX(0)' : 'translateX(100%)',
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
          }}
        >
          <div className="email-details-header">
            <button className='hover:text-red-500 ml-auto flex items-end justify-end hover:bg-gray-500 px-2 py-2' onClick={handleClose}>X</button>
          </div>
          <div className="email-details-body">
<div className='flex justify-between'>
<h2>Subject: {selectedEmail.subject}</h2>

<div key={selectedEmail.emailId} className='rounded-2xl px-2 py-1' style={{ backgroundColor: getColorForCategory(predictedEmails?.find(predEmail => predEmail.emailId === selectedEmail.emailId)?.category || 'General') }}>
    <strong></strong> {(predictedEmails?.find(predEmail => predEmail.emailId === selectedEmail.emailId)?.category === 'Error') ? 'General' : (predictedEmails?.find(predEmail => predEmail.emailId === selectedEmail.emailId)?.category || 'General')}
</div>
</div>
            <p>From: {selectedEmail.sender}</p>
            <div
              className="email-body"
              dangerouslySetInnerHTML={{
                __html: selectedEmail.body,
              }}
            />
          </div>
        </div>
      )}
        </div>
      ) : (
        <div className='flex flex-col items-center text-3xl'>Classifying Emails Please wait for some time<div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-transparent">
          <svg className="h-8 w-8 text-gray-300" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 7C9.43 7 7 9.43 7 12C7 14.57 9.43 17 12 17C14.57 17 17 14.57 17 12C17 9.43 14.57 7 12 7ZM12 15C9.43 15 7 12.57 7 12C7 11.43 9.43 9 12 9C14.57 9 17 11.43 17 12C17 12.57 14.57 15 12 15Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div> </div>
      )}
    </div>
  );
};

export default ClassifyComponents;
