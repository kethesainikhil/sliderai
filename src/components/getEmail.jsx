'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const GetEmail = () => {
  const router = useRouter();
  const [emails, setEmails] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [emailsPerPage, setEmailsPerPage] = useState(15);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const storeEmailsInLocalStorage = (emails) => {
    localStorage.setItem('emails', JSON.stringify(emails));
  };

  useEffect(() => {
    async function fetchEmails() {
      try {
        if (session) {
          const { accessToken } = session.user;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/email-details?limit=${emailsPerPage}`, {
            headers,
          });
          setEmails(response.data);
          storeEmailsInLocalStorage(response.data);
          setLoading(true);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    }

    if (!loading) {
      fetchEmails();
    }
  }, [session, loading, emailsPerPage]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };
  const handleClassify = () =>{
    router.push('/classify')
  }
  return (
    <div>
      {loading ? (
        <div>
          <h1>Emails</h1>
          <div className='flex justify-between sm:px-20'>
            <div className='flex items-center justify-center gap-2'>

            <label htmlFor="emailsPerPage">Emails per page:</label>
            <select
              className="dark:bg-black px-3 py-2 border-2"
              id="emailsPerPage"
              value={emailsPerPage}
              onChange={(e) => {
                setEmailsPerPage(parseInt(e.target.value));
                setLoading(false);
              }}
            >
              {[15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            </div>
            <div>
              <button onClick={handleClassify}
  className="dark:bg-black px-3 mb-2 py-2 hover:bg-green-400 border-2 hover:animate-pulse"
>
  Classify
</button>
            </div>
          </div>
          {emails?.length > 0 ? (
            <div className="">
              {emails.map((email, index) => (
                <div className="hover:bg-gray-500 email-card" key={index} onClick={() => handleEmailClick(email)}>
                  <div className="email-header">
                    <strong>Subject:</strong> {email.subject}
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
            <p>No emails found</p>
          )}
        </div>
      ) : (
        <div>{session ? <div className='flex flex-col items-center text-3xl'>Getting Email details<div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-transparent">
          <svg className="h-8 w-8 text-gray-300" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 7C9.43 7 7 9.43 7 12C7 14.57 9.43 17 12 17C14.57 17 17 14.57 17 12C17 9.43 14.57 7 12 7ZM12 15C9.43 15 7 12.57 7 12C7 11.43 9.43 9 12 9C14.57 9 17 11.43 17 12C17 12.57 14.57 15 12 15Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div> </div> : <div>Please login</div>}</div>
      )}
      {showDetails && (
        <div
          className={`email-details-container my-4 ${showDetails ? 'show' : 'hide'}`}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '40%',
            height: 'calc(100vh - 50px)',
            background: 'rgba(0, 0, 0, 0.5)',
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
            <h2>Subject: {selectedEmail.subject}</h2>
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
  );
};

export default GetEmail;