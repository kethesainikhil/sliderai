'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const GetEmail = () => {
  const router = useRouter();
  const [emails, setEmails] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [emailsPerPage, setEmailsPerPage] = useState(15);
  const storeEmailsInLocalStorage = (emails) => {
    localStorage.setItem('emails', JSON.stringify(emails));
  }; // Default to 15 emails per page

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
    router.push(`/GetEmailDetails/${email.emailId}`);
    // Handle email click, e.g., open full email
  };

  return (
    <div>
      {loading ? (
        <div>
          <h1>Emails</h1>
          <div>
            <label htmlFor="emailsPerPage">Emails per page:</label>
            <select
              className="bg-black px-3 py-2 border-2"
              id="emailsPerPage"
              value={emailsPerPage}
              onChange={(e) => {
                setEmailsPerPage(parseInt(e.target.value));
                setLoading(false);
                console.log('email per page', emailsPerPage);
              }}
            >
              {[15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {emails.length > 0 ? (
            <div className="email-list">
              {emails.map((email, index) => (
                <div className="email-card" key={index} onClick={() => handleEmailClick(email)}>
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
        <div>{session ? <div>Getting Email details</div> : <div>Please login</div>}</div>
      )}
    </div>
  );
};

export default GetEmail;
