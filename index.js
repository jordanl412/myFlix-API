let express = require('express');
const { default: mongoose } = require('mongoose');
    morgan = require('morgan');
    bodyParser = require('body-parser');
    uuid = require('uuid');
    //mongoose = require('mongoose');
    Models = require('./models.js');
let app = express();

let Movies = Models.Movie;
let Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
    useNewUrlParser: true, useUnifiedTopology: true
});

/*let users = [
    {
        id: 1,
        name: 'Kim',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Joe',
        favoriteMovies: ['Interstellar']
    },
]

let movies = [
    {
        title: 'Interstellar',
        description: 'Set in a dystopian future where humanity is struggling to survive, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for mankind.',
        genre: {
            name: 'Science Fiction',
            description: 'Science Fiction is a fictionalized story wherein the setting and plot are centered around technology, time travel, outer space, or scientific principles, with or without the presence of aliens. Story elements are not found in the known universe and explained by scientific means.'
        },
        imageURL: 'Interstellar.jpeg',
        director: {
            name: 'Christopher Nolan',
            birthYear: '1970',
            deathYear: '',
            bio: 'Christopher Nolan CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations.'
        },
    },
    {
        title: 'Burlesque',
        description: 'The film tells the story of Ali (Aguilera), an aspiring singer who leaves her small hometown for Los Angeles, where she becomes a dancer at a struggling burlesque lounge owned by Tess (Cher).',
        genre: {
            name: 'Musical Drama',
            description: 'Musical film is a film genre in which songs by the characters are interwoven into the narrative, sometimes accompanied by dancing. The songs usually advance the plot or develop the film\'s characters, but in some cases, they serve merely as breaks in the storyline, often as elaborate "production numbers".'
        },
        imageURL: 'Burlesque.jpeg',
        director: {
            name: 'Steven Antin',
            birthYear: '1958',
            deathYear: '',
            bio: 'Steven Antin (born April 19, 1958) is an American actor, stunt performer, screenwriter, producer, and director.'
        },
    },
    {
        title: 'The Notebook',
        description: 'The film stars Ryan Gosling and Rachel McAdams as a young couple who fall in love in the 1940s. Their story is read from a notebook in the present day by an elderly man (played by James Garner), telling the tale to a fellow nursing home resident (played by Gena Rowlands, the director Cassavetes\' mother).',
        genre: {
            name: 'Romantic Drama',
            description: 'Romantic Drama film is a genre that explores the complex side of love. The plot usually centers around an obstacle that is preventing love between two people. The obstacles in Romantic Drama film can range from a family\'s disapproval, to forbidden love, to one\'s own psychological restraints.'
        },
        imageURL: 'TheNotebook.jpeg',
        director: {
            name: 'Nick Cassavetes',
            birthYear: '1959',
            deathYear: '',
            bio: 'Nicholas David Rowland Cassavetes is an American actor, director, and writer. He has directed such films as She\'s So Lovely, John Q., The Notebook, Alpha Dog, and My Sister\'s Keeper.'
        },
    },
    {
        title: 'LaLaLand',
        description: 'It stars Ryan Gosling and Emma Stone as a struggling jazz pianist and an aspiring actress, respectively, who meet and fall in love while pursuing their dreams in Los Angeles.',
        genre: {
            name: 'Musical Drama',
            description: 'Musical film is a film genre in which songs by the characters are interwoven into the narrative, sometimes accompanied by dancing. The songs usually advance the plot or develop the film\'s characters, but in some cases, they serve merely as breaks in the storyline, often as elaborate "production numbers".'
        },
        imageURL: 'LaLaLand.jpeg',
        director: {
            name: 'Damien Chazelle',
            birthYear: '1985',
            deathYear: '',
            bio: 'Damien Sayre Chazelle is a French-American film director, screenwriter and producer. He is known for his films Whiplash, La La Land, and First Man.'
        },
    },
    {
        title: 'Crazy, Stupid, Love',
        description: 'Follows a recently separated man who seeks to rediscover his manhood and is taught how to pick up women at bars.',
        genre: {
            name: 'Romantic Comedy',
            description: 'Romantic comedy (also known as romcom or rom-com) is a subgenre of comedy and slice of life fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.'
        },
        imageURL: 'CrazyStupidLove.jpeg',
        director: {
            name: 'John Requa',
            birthYear: '1967',
            deathYear: '',
            bio: 'John Requa (born January 1, 1967) is an American screenwriter (with Glenn Ficarra) of Cats & Dogs, Bad Santa and the 2005 remake Bad News Bears.'
        },
    },
    {
        title: 'Bridesmaids',
        description: 'The plot centers on Annie, who suffers a series of misfortunes after being asked to serve as maid of honor for her best friend, Lillian, played by Maya Rudolph.',
        genre: {
            name: 'Romantic Comedy',
            description: 'Romantic comedy (also known as romcom or rom-com) is a subgenre of comedy and slice of life fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.'
        },
        imageURL: 'Bridesmaids.jpeg',
        director: {
            name: 'Paul Feig',
            birthYear: '1962',
            deathYear: '',
            bio: 'Paul Samuel Feig is an American actor, film director, comedian and filmmaker. He is known for directing films starring frequent collaborator Melissa McCarthy, including Bridesmaids, The Heat, Spy, and Ghostbusters.'
        },
    },
    {
        title: 'My Sister\'s Keeper',
        description: 'Conceived as a marrow donor for her gravely ill sister, Anna Fitzgerald (Abigail Breslin) has undergone countless surgeries and medical procedures in her short life. Though their older daughter\'s life has no doubt been prolonged, the unorthodox decision of Anna\'s parents has cracked the entire family\'s foundation. When Anna sues her parents for emancipation, it sets off a court case that threatens to destroy the family for good.',
        genre: {
            name: 'Drama',
            description: 'The drama genre features stories with high stakes and many conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
        },
        imageURL: 'MySistersKeeper.jpeg',
        director: {
            name: 'Nick Cassavetes',
            birthYear: '1959',
            deathYear: '',
            bio: 'Nicholas David Rowland Cassavetes is an American actor, director, and writer. He has directed such films as She\'s So Lovely, John Q., The Notebook, Alpha Dog, and My Sister\'s Keeper.'
        },
    },
    {
        title: 'Me Before You',
        description: 'Young and quirky Louisa "Lou" Clark (Emilia Clarke) moves from one job to the next to help her family make ends meet. Her cheerful attitude is put to the test when she becomes a caregiver for Will Traynor (Sam Claflin), a wealthy young banker left paralyzed from an accident two years earlier. Will\'s cynical outlook starts to change when Louisa shows him that life is worth living. As their bond deepens, their lives and hearts change in ways neither one could have imagined.',
        genre: {
            name: 'Romantic Drama',
            description: 'Romantic Drama film is a genre that explores the complex side of love. The plot usually centers around an obstacle that is preventing love between two people. The obstacles in Romantic Drama film can range from a family\'s disapproval, to forbidden love, to one\'s own psychological restraints.'
        },
        imageURL: 'MeBeforeYou.jpeg',
        director: {
            name: 'Thea Sharrock',
            birthYear: '1976',
            deathYear: '',
            bio: 'Thea Sharrock is an English theatre and film director. In 2001, when at age 24 she became artistic director of London\'s Southwark Playhouse, she was the youngest artistic director in British theatre.'
        },
    },
    {
        title: 'Avengers: Endgame',
        description: 'The surviving members of the Avengers and their allies attempt to reverse the destruction caused by Thanos in Infinity War.',
        genre: {
            name: 'Action',
            description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
        },
        imageURL: 'AvengersEndgame.jpeg',
        director: {
            name: 'Anothony Russo & Joe Russo',
            birthYear: '1970 and 1971, respectively',
            deathYear: '',
            bio: 'Anthony Russo (born February 3, 1970) and Joseph Russo (born July 18, 1971), collectively known as the Russo brothers (ROO-so), are American directors, producers, and screenwriters. They direct most of their work together.'
        },
    },
    {
        title: 'Divergent',
        description: 'The story takes place in a dystopian and post-apocalyptic Chicago[7] where people are divided into distinct factions based on human virtues. Beatrice Prior is warned that she is Divergent and thus will never fit into any one of the factions. She soon learns that a sinister plot is brewing in the seemingly perfect society.',
        genre: {
            name: 'Dystopian',
            description: 'The dystopian genre imagines worlds or societies where life is extremely bad because of deprivation or oppression or terror, and human society is characterized by human misery, such as squalor, oppression, disease, overcrowding, environmental destruction, or war.'
        },
        imageURL: 'Divergent.jpeg',
        director: {
            name: 'Neil Burger',
            birthYear: '1963',
            deathYear: '',
            bio: 'Neil Norman Burger is an American filmmaker. He is known for the fake-documentary Interview with the Assassin, the period drama The Illusionist, Limitless, and the sci-fi action film Divergent.'
        },
    }
];*/

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

//GET requests
//Return a list of all movies
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Return data about a movie, by title;
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({Title: req.params.Title})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Return data about a genre by name
app.get('/movies/genres/:genreName', (req, res) => {
    Movies.findOne({'Genre.Name': req.params.genreName})
        .then((movie) => {
            res.status(200).json(movie.Genre);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Return data about a director by name
app.get('/movies/directors/:directorName', (req, res) => {
    Movies.findOne({'Director.Name': req.params.directorName})
        .then((movie) => {
            res.status(200).json(movie.Director);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Get all users
app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Get a user by username
app.get('/users/:Username', (req, res) => {
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
//Allow new users to register
app.post('/users', (req, res) => {
    Users.findOne({Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users.create({
                    Username: req.body.Username,
                    Password: req.body.Password,
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

//Allow users to update their user info
app.put('/users/:Username', (req, res) => {
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


//Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
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
//Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
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

//Delete a user by username
app.delete('/users/:Username', (req, res) => {
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



app.get('/', (req, res) => {
    res.send('Welcome to the myFlix API!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

//Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});