'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassifyComponents = () => {
  const [emails, setEmails] = useState([]);
  const [predictedEmails, setPredictedEmails] = useState(null);

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('emails'));
    console.log(storedEmails);
      if(storedEmails.length > 0){
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
    if (truncatedEmails.length > 0) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/classify-emails`, { emails: truncatedEmails });
        console.log(response.data, "response");
        setPredictedEmails(response.data);
    }
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
                <div key={email.emailId} className='rounded-2xl px-2 py-1' style={{ backgroundColor: getColorForCategory(predictedEmails?.find(predEmail => predEmail.emailId === email.emailId)?.category) }}>
        <strong></strong> {predictedEmails?.find(predEmail => predEmail.emailId === email.emailId)?.category || 'General'}
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
        </div>
      ) : (
        <p>Classifying emails It Might take some time please wait</p>
      )}
    </div>
  );
};

export default ClassifyComponents;
