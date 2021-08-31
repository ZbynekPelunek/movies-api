require('dotenv').config()
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const db = require('./models');
db.sequelize.sync()

const PORT = process.env.PORT || 4001;

//Import and mount moviesRouter
const moviesRouter = require ('./routes/movies.js');
app.use('/movies', moviesRouter);


app.listen(PORT, () => {
    console.log('Server started and listening on port ' + PORT);
});

app.get('/', (req, res) => {
    //health check route
    res.status(200).send({message: 'Server runs just fine'});
});