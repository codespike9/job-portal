# JOB-PORTAL

A job board with features for recruiters to add their company and post jobs under it. Applicants can apply for the job and can maintain their profile. Also recruiters can see the applicants list under each job.
## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation)
4. [Documentation](#documentation)


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
-       PORT=8000
-       MONGODB_USER=dharmarajjena694
-       MONGODB_PASSWORD=glosity-silicon
-       MONGODB_CLUSTER=cluster0.9hi2hqu.mongodb.net
-       MONGODB_DATABASE=JobPortal
-       CORS_ORIGIN=*
-       JWT_SECRET=1234
-       JWT_EXPIRE=4d
- put the above in .env
- run the server using command ( npm run dev )
- Add a new terminal
- Enter into client
- run command npm install
- npm run dev
- make sure that port 8000 and 5173 are free

## Documentation

### EndPoints
#### Employer Endpoints
    -POST http://localhost:8000/api/employer-registration  
        For recruiters registration
    -POST http://localhost:8000/api/employer-login
        For recruiters login
    -PUT http://localhost:8000/api/add-company
        For add and updating company details
    -GET http://localhost:8000/api/view-applicants/:jobId
        For accessing applicants list for a particular job
    -POST http://localhost:8000/api/add-job
        For creating jobs under company
    -GET http://localhost:8000/api/get-jobs
        For accessing the jobs list
    -PUT http://localhost:8000/api/update-job-details/:jobId
        For updating job details
    -DELETE http://localhost:8000/api/delete-job/:jobId
        For deleting job details
    -GET http://localhost:8000/api/applied-jobs
        For accessing applied jobs, applicant specific( authroized end point for applicant only)

#### Applicant Endpoints
    -POST http://localhost:8000/api/user-registration
        For applicant registration
    -POST http://localhost:8000/api/user-login
        For applicant login
    -PUT http://localhost:8000/api/apply/:jobId
        For applying for a job
    -PUT http://localhost:8000/api/update-profile
        For updating user profiles
    -GET http://localhost:8000/api/view-profile
        For accessing profile details
    -POST http://localhost:8000/api/profile/education/add
        For adding education details
    -PUT http://localhost:8000/api/profile/education/:educationId/update
        For updating education details
    -DELETE http://localhost:8000/api/profile/education/:educationId/delete
        For deleting an education details

