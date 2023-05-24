# movie-api - myFlix

## Project Description
This API provides users access to information about different movies, directors, and genres. Users can sign up, update their personal information, and create a list of their favorite movies on myFlix.

This server-side of the myFlix application is built using:
 - JavaScript
 - Node.js
 - Express
 - MongoDB

## Project Capabilities
Using Mongoose request methods and endpoints, users can use this API to:
 - Get a list of all movies
 - Get data about a specific movie, by title
 - Get data about a genre
 - Get data about a director
 - Get a list of all users
 - Get a specific user, by username
 - Register a new user
 - Update user information
 - Add a movie to user's list of favorites
 - Remove a movie from user's list of favorites
 - Delete a user, by username

## Getting Started
To get started with the myFlix API, you need to have Node.js and MongoDB installed on your machine. Once they are installed, you can clone this repository (https://github.com/jordanl412/movie-api/) to your local machine and run `npm install`. 

Start the server by running `npm start`. The server will start on port 8080 by default. HTTP requests to the API's URL endpoints can be sent using a tool such as Postman. Refer to the documentation for information on how to use the endpoint.s

## Project Dependencies
 - Express
 - Body-parser
 - Morgan
 - uuid
 - Mongoose
 - Passport
 - Passport-jwt
 - Passport-local
 - jsonwebtoken
 
