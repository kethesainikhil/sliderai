# Project Setup Guide

For Backend Setup please visit this Link : https://github.com/kethesainikhil/slider_ai_backend.git


#FrontEnd Setup
This guide will help you set up the project locally on your machine.

## Step 1: Clone the Project

Clone the project repository from the GitHub repository using the following command:

```bash
git clone https://github.com/kethesainikhil/sliderai.git
```
step 2 : Navigate to the project directory and install dependencies

```bash
cd sliderai
npm install
```
Step 3: Set Up Environment Variables
Copy the .env.example file and rename it to .env.

Open the .env file in your preferred text editor.

Replace the placeholders with the appropriate values for the following variables:
```bash
GOOGLE_CLIENT_ID = <your_google_client_id>
GOOGLE_CLIENT_SECRET = <your_google_client_secret>
NEXTAUTH_SECRET = <your_nextauth_secret>
NEXT_PUBLIC_BACKEND_URL = Your_Own_Backend_Url(Might include in .env.local if .env doesnot work)
```
Step 4: Start the Development Server
Once you have set up the environment variables, you can start the development server using the following command:
```bash
npm run dev
```

step 5 : Access the Project at http:localhost:3000


step 6 : After Project Running 

Get Your own Gemini Ai Api Key by following these steps:

1: Go to [Gemini AI Studio](https://aistudio.google.com/app/apikey)

2: Click on Create API

3: Select your project

4: Finally, copy the generated API key and paste it here
