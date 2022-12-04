let express = require('express');
    morgan = require('morgan');
    bodyParser = require('body-parser');
    uuid = require('uuid');
let app = express();

let users = [
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
        imageURL: 'https://en.wikipedia.org/wiki/Interstellar_(film)#/media/File:Interstellar_film_poster.jpg',
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
        imageURL: 'https://en.wikipedia.org/wiki/Burlesque_(2010_American_film)#/media/File:Burlesque_poster.jpg',
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
        imageURL: 'https://en.wikipedia.org/wiki/The_Notebook#/media/File:Posternotebook.jpg',
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
        imageURL: 'https://en.wikipedia.org/wiki/La_La_Land#/media/File:La_La_Land_(film).png',
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
        imageURL: 'https://en.wikipedia.org/wiki/Crazy,_Stupid,_Love#/media/File:CrazyStupidLovePoster.jpg',
        director: {
            name: 'Glenn Ficarra & John Requa',
            birthYear: '1969 and 1967, respectively',
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
        imageURL: 'https://en.wikipedia.org/wiki/Bridesmaids_(2011_film)#/media/File:BridesmaidsPoster.jpg',
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
        imageURL: 'https://en.wikipedia.org/wiki/Get_Out#/media/File:Get_Out_poster.png',
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
        imageURL: 'https://en.wikipedia.org/wiki/Me_Before_You_(film)#/media/File:Me_Before_You_(film).jpg',
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
        imageURL: 'https://en.wikipedia.org/wiki/Avengers:_Endgame#/media/File:Avengers_Endgame_poster.jpg',
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
        imageURL: 'https://en.wikipedia.org/wiki/Divergent_(film)#/media/File:Divergent.jpg',
        director: {
            name: 'Neil Burger',
            birthYear: '1963',
            deathYear: '',
            bio: 'Neil Norman Burger is an American filmmaker. He is known for the fake-documentary Interview with the Assassin, the period drama The Illusionist, Limitless, and the sci-fi action film Divergent.'
        },
    }
];

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

//GET requests
//Return a list of all movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

//Return data (description, genre, director, image URL, whether it’s featured or not) 
//about a single movie by title to the user;
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
    }
});

//Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.genre.name === genreName ).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre');
    }
});

//Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.director.name === directorName ).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director');
    }
});

//POST and PUT requests
//Allow new users to register
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('users need names');
    }
});

//Allow users to update their user info (username)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    
    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user');
    }
});

//Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`Successfully added ${movieTitle} to user ${id}'s Favorite Movies list`);
    } else {
        res.status(400).send('no such user');
    }
});

//DELETE requests
//Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`Successfully removed ${movieTitle} from user ${id}'s Favorite Movies list`);
    } else {
        res.status(400).send('no such user');
    };
});

//Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`User ${id} has been deleted.`);
    } else {
        res.status(400).send('no such user');
    }
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