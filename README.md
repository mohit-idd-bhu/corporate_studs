# Project Title

An Interactive Dashboard made for visualization of network protocols.

## Description

The project was made for a 24 hr hackathon at Cisco, Bengaluru. This project helps in visualization of Cisco Trust Sec software, which is used in displaying network protocols and control.
It is a next app based upon express server. It uses MongoDB Atlas as its databse.

## Getting Started

### Installing

```
cd frontend && npm install
```
```
cd backend && npm install
```

This installs dependancies for both backend and frontend

This application uses a MongoDB Atlas Cluster as Database. Hence, URI need to be generated for that.
Generate the URI by creating an account.
Create a file named key.js. Save the file with following content

```
const uri = "YOUR GENERATED URI";
module.exports = uri;
```

### Executing program

From the home directory execute two commands

```
cd frontend && npm run dev
```

```
cd backend && npm run start
```
