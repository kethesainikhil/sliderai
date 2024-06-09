'use client'
import React from 'react'


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DetailsComponent = ({id}) => {
  const [emailDetails, setEmailDetails] = useState(null);

  useEffect(() => {
    // Retrieve email details from local storage
    const storedEmails = JSON.parse(localStorage.getItem('emails'));
    if (storedEmails) {
      const emailDetail = storedEmails.find((email) => email.emailId === id);
      setEmailDetails(emailDetail);
    }
  }, [id]);

  if (!emailDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='sm:mx-auto  flex flex-col justify-center items-center'>
      <h1>Email Details</h1>
      <div>
        <strong>From:</strong> {emailDetails.sender}
      </div>
      <div>
        <strong>Subject:</strong> {emailDetails.subject}
      </div>
      <div>
        <strong>Body:</strong>
        <div className=' w-fit mx-auto'  dangerouslySetInnerHTML={{ __html: emailDetails.body }} />
      </div>
    </div>
  );
};



export default DetailsComponent