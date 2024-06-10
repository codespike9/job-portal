# JOB-PORTAL

A job board with features for recruiters to add their company and post jobs under it. Applicants can apply for the job and can maintain their profile. Also recruiters can see the applicants list under each job.
## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation)
5. [Documentation](#documentation)


## Tech Stack

- **Frontend:**
  - React
  - React Router
  - TailwindCSS
- **Backend:**
  - Node.js
  - Express
- **Database:**
  - MongoDB
  - Mongoose (ODM)
- **Other Tools:**
  - JWT for authentication
  - bcrypt for password hashing

## Features

- List out the key features of your project.
  - User authentication and authorization for recruiters and applicants using jwt
  - CRUD operations for JOB
  - Applying for jobs ( Feature for applicant)
  - Access job applicants details ( For recruiter)
  - Update profile information for Applicant
  - Access list of applied companies


## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Installation
- Clone the repository
- Enter into server folder using ( cd server )
- run command ( npm install ) in terminal
- Create a .env file inside server
-   PORT=8000
    MONGODB_USER=dharmarajjena694
    MONGODB_PASSWORD=glosity-silicon
    MONGODB_CLUSTER=cluster0.9hi2hqu.mongodb.net
    MONGODB_DATABASE=JobPortal
    CORS_ORIGIN=*
    JWT_SECRET=1234
    JWT_EXPIRE=4d

    put the above in .env
- run the server using command ( npm run dev )
- Add a new terminal
- Enter into client
- run command npm install
- npm run dev
- make sure that port 8000 and 5173 are free

## Documentation

## EndPoints
-
