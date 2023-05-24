/**
 * @fileoverview Entry point of the myFlix application backend
 * @module app
 * @requires mongoose
 * @requires ./models.js
 * @requires express-validator
 * @requires find-config
 * @requires dotenv
 * @requires fs
 * @requires path
 * @requires body-parser
 * @requires uuid
 * @requires cors
 * @requires ./auth
 * @requires passport
 * @requires ./passport
 */

const express = require('express');
const { default: mongoose } = require('mongoose');
    morgan = require('morgan');
    bodyParser = require('body-parser');
    uuid = require('uuid');
    //mongoose = require('mongoose');
    Models = require('./models.js');
const app = express();

let Movies = Models.Movie;
let Users = Models.User;
let allowedOrigins = ['http://localhost:8080', 'http://localhost:4200', 'http://localhost:1234', 'https://jordan-myflix-app.netlify.app', 'https://jordanl412.github.io'];

const { check, validationResult } = require('express-validator');

/*mongoose.connect('mongodb://localhost:27017/myFlixDB', {
    useNewUrlParser: true, useUnifiedTopology: true
});*/

/**
 * Connect to online database using environmental variable
 */
mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const cors = require('cors');
app.use(cors({
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            let message = 'The CORS policy for this application doesn\'t allow access from origin ' 
            + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//GET requests
/**
 * Retrieves a list of all movies
 * @function
 * @method GET to endpoint '/movies'
 * @name getMovies
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - HTTP response object: a JSON object holding a list of all movies
 */
//Return a list of all movies
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

/**
 * Retrieves information about a movie, by title
 * @function
 * @method GET to endpoint '/movies/:title'
 * @name getMovieByTitle
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - HTTP response object: a JSON object holding data (title, description, genre, director, image URL, featured or not) about the specified movie title
 */
//Return data about a movie, by title;
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({Title: req.params.Title})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

/**
 * Retrieves information about a genre
 * @function
 * @method GET to endpoint '/movies/genre/:Name'
 * @name getGenreByName
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - HTTP repsonse object: a JSON object holding the name and description of the specified genre
 */
//Return data about a genre by name
app.get('/movies/genres/:genreName', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({'Genre.Name': req.params.genreName})
        .then((movie) => {
            res.status(200).json(movie.Genre);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

/**
 * Retrieves information about a movie's director by name
 * @function
 * @method GET to endpoint '/movies/directors/:directorName'
 * @name getDirectorByName
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - HTTP response object: a JSON object holding data (name, bio, birth year, death year) of the specified director
 */
//Return data about a director by name
app.get('/movies/directors/:directorName', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({'Director.Name': req.params.directorName})
        .then((movie) => {
            res.status(200).json(movie.Director);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

/**
 * Retrieves a list of all users
 * @function
 * @method GET to endpoint '/users'
 * @name getUsers
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - HTTP response object: a JSON object holding a list of all users
 */
//Get all users
app.get('/users', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

/**
 * Retrieves information about a specific user by username
 * @function
 * @method GET to endpoint '/users/:Username'
 * @name getUserByUsername
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - HTTP response object: a JSON object of the specified user
 */
//Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//POST and PUT requests

/**
 * Allows new users to register
 * Checks if all required fields are filled in correctly
 * Hashes the password before storing it in the database
 * Checks if the user already exists in the database
 * @function
 * @method POST to endpoint '/users'
 * @name addUser
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - A JSON object holding data about the user to be added, or a message that the user already exists
 */
//Allow new users to register
app.post('/users', 
    [
        check('Username', 'Username is required').isLength({min: 5}),
        check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid.').isEmail()
    ], (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({Username: req.body.Username})
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + ' already exists');
                } else {
                    Users.create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => {res.status(201).json(user)})
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

/**
 * Allows users to update their user information
 * @function
 * @method PUT to endpoint '/users/:Username'
 * @name updatedUser
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - A JSON object holding data about the updated user
 */
//Allow users to update their user info
app.put('/users/:Username', 
[
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid.').isEmail()
], passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
        { $set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
        { new: true }, 
        (err, updatedUser) => {
            if (err) {
                console.error(error);
                res.status(500).send('Error: ' + error);
            } else {
                res.status(201).json(updatedUser);
            }
        });
});

/**
 * Allows users to add a specific movie to their list of favorite movies
 * @function
 * @method POST to endpoint '/users/:Username/movies/:MovieID'
 * @name addFavoriteMovie
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - A JSON object of the updated user
 */
//Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, 
        {
            $push: {FavoriteMovies: req.params.MovieID}
        },
        {new: true}, 
        (error, updatedUser) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error: ' + error);
            } else {
                res.status(201).json(updatedUser);
            }
        });
});


//DELETE requests

/**
 * Allows users to remove a specific movie from their list of favorite movies
 * @function
 * @method DELETE to endpoint /users/:Username/movies/:MovieID'
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - A JSON object of the updated user
 */
//Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username},
    {
        $pull: {FavoriteMovies: req.params.MovieID}
    },
    {new: true},
    (error, updatedUser) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
        } else {
            res.status(200).json(updatedUser);
        }
    });
});

/**
 * Allows users to delete their account from the database
 * @function
 * @method DELETE to endpoint '/users/:Username'
 * @name deleteUser
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - A text message indicating that the user was successfully deleted, or that the user was not found<
 */
//Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndRemove({Username: req.params.Username})
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});


/**
 * Sends a welcome message on the main page
 * @function
 * @method GET to endpoint '/'
 * @name welcome
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - HTTP response object with a welcome message
 */
app.get('/', (req, res) => {
    res.send('Welcome to the myFlix API!');
});

/**
 * Retrieves the documentation file for this project
 * @function
 * @method GET to endpoint '/documentation'
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} - HTTP response object with the documentation file
 */
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

//Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});