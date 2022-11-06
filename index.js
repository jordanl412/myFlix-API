let express = require('express');
    morgan = require('morgan');
let app = express();

let topMovies = [
    {
        title: 'Interstellar',
        director: 'Christopher Nolan'
    },
    {
        title: 'Burlesque',
        director: 'Steven Antin',
    },
    {
        title: 'The Notebook',
        director: 'Nick Cassavetes',
    },
    {
        title: 'LaLaLand',
        director: 'Damien Chazelle',
    },
    {
        title: 'Crazy, Stupid, Love',
        director: 'Glenn Ficarra & John Requa',
    },
    {
        title: 'Bridesmaids',
        director: 'Paul Feig',
    },
    {
        title: 'Get Out',
        director: 'Jordan Peele',
    },
    {
        title: 'Me Before You',
        director: 'Thea Sharrock',
    },
    {
        title: 'Avengers: Endgame',
        director: 'Anthony Russo & Joe Russo',
    },
    {
        title: 'Divergent',
        director: 'Neil Burger',
    }
];

app.use(express.static('public'));
app.use(morgan('common'));

//GET requests
app.get('/movies', (req, res) => {
    res.json(topMovies);
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