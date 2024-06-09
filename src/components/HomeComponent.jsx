'use client'
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const HomeComponent = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [showSteps, setShowSteps] = useState(false);
    const [apikey, setApikey] = useState('');
    const[isChecking,setChecking] = useState(false);
    const handleLogin = async () => {
      setChecking(true);
      try {
          
          // Make a POST request to the checkApiKey endpoint with the API key as a query parameter
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkApiKey?Google_Api_Key=${apikey}`);
          // Check the response to determine if the API key is valid or not
          if (response) {
            toast.success("API key is valid");
            localStorage.setItem('apikey', apikey);
            setTimeout(() => {
               signIn()
            }, 2000);
              // API key is valid
          } else {
            toast.error("API key is invalid");
              // API key is invalid
          }
      } catch (error) {
        setChecking(false);
        
        toast.error("API key is invalid");
        
          console.error('Error checking API key:', error);
      }
      finally{
        setChecking(false);
      }
  };

    const handleShowSteps = () => {
        setShowSteps(!showSteps); // Toggle showSteps state
    };

    const handleStep1Click = () => {
        window.open("https://aistudio.google.com/app/apikey", "_blank");
    };
    if(session){
        router.push('/getEmail')
    }

    return (
      
        <div className='text-xl flex flex-col items-center justify-center text-center'>
          <div><Toaster/></div>

            <h1>Classify Gmails Using Google API</h1>
            <input
                onChange={(e) => setApikey(e.target.value)}
                type="text"
                placeholder='Enter Your Google Api Key(required)'
                className='border-2 w-1/2 h-12 px-6 text-black darK:text-black text-sm border-black rounded-2xl'
            />
                <button
                className={`bg-green-500 hover:bg-black rounded-2xl px-4 py-2 ${isChecking && 'opacity-50 cursor-not-allowed'}`}
                onClick={handleLogin}
                disabled={isChecking}
            >
                {isChecking ? 'Checking...' : 'Add to Storage'}
            </button>
            <button
                className='mt-4 bg-blue-500 hover:bg-black rounded-2xl px-4 py-2'
                onClick={handleShowSteps}
            >
                {showSteps ? 'Hide Steps' : 'Show Steps'}
            </button>
            {showSteps && (
                <div className="mt-4 flex flex-col items-center justify-center text-center space-y-4">
                    <div  onClick={handleStep1Click} className="cursor-pointer text-blue-500 hover:text-green-400 hover:underline">Step 1: Go to Google Cloud Console</div>
                    <div>Step 2: Click on Create API</div>
                    <div>Step 3: Select your project</div>
                    <div>Step 4: Finally, copy the generated API key and paste it here</div>
                </div>
            )}
        </div>
    );
};

export default HomeComponent;
