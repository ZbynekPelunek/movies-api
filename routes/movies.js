const express = require('express');

const movies = require('../controllers/movie.controller.js');

const moviesRouter = express.Router();

module.exports = moviesRouter;

//GET all
moviesRouter.get('/', movies.findAll);

//POST
moviesRouter.post('/', movies.add);

//GET by ID
moviesRouter.get('/:id', movies.findByID);

//PUT
moviesRouter.put('/:id', movies.update);

//DELETE
moviesRouter.delete('/:id', movies.delete);
