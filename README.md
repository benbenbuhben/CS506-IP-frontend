# Tic Tac Toe Frontend

This is the frontend for a Tic Tac Toe game built with React and styled with Material-UI. It connects to the backend via WebSocket using Socket.io client.

## Prerequisites

Before running this project, you should have the following installed:

- Node.js (preferably the latest stable version)
- npm or Yarn (npm comes bundled with Node.js)

## Installation

1. Clone the repository to your local machine:

   `git clone https://github.com/benbenbuhben/CS506-IP-frontend.git`

   `cd CS506-IP-frontend`

2. Install the dependencies:

   `npm install`

   or if you are using Yarn:

   `yarn install`

## Configuration

1. Set up the environment variables:

   Create a .env.local file in the root of the project and define your backend server URL:

    ```  
    REACT_APP_API_URL=http://localhost:5001
    REACT_APP_SOCKET_URL=http://localhost:5001
    REACT_APP_FRONTEND_URL=http://localhost:3000
    ```

   Adjust the URLs based on your backend configuration and the port your frontend is running on.

## Running the Application

1. Start the development server:

   `npm start`

   or if you are using Yarn:

   `yarn start`

   This will start the React development server and open the application in your default web browser.

## Deployment

Refer to the backend README.md for instructions on how to deploy the backend server.
