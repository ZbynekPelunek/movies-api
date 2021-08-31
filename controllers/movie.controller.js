const db = require('../models');
const Movie = db.movies;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
	let limit = size && !isNaN(size) && size <= 100 ? size : 100;

	const offset = page && !isNaN(page) ? page * limit : 0;

	return { limit, offset };
};

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: movies } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);

	return { totalItems, movies, totalPages, currentPage };
};

// Retrieve all Movies from the database
exports.findAll = async (req, res) => {
	const { page, size, title } = req.query;
	const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

	try {
		const { limit, offset } = getPagination(page, size);

		const data = await Movie.findAndCountAll({
			where: condition,
			limit,
			offset,
		});
		const response = getPagingData(data, page, limit);
		//console.log(response.movies.length);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			message:
				error.message ||
				'Uncaught error occurred while retrieving the movies. Please contact the dev.',
		});
	}
};

// Retrieve single movie by ID
exports.findByID = async (req, res) => {
	const movieId = req.params.id;

	try {
		if (isNaN(movieId))
			return res.status(400).json({ message: 'Movie ID must be a number' });
		const data = await Movie.findAll({
			where: {
				movieId,
			},
		});

		//console.log(data);
		if (data.length > 0) {
			return res.status(200).json(data);
		} else {
			return res
				.status(404)
				.json({ message: "Movie with that ID doesn't exist" });
		}
	} catch (error) {
		//console.log(error);
		return res.status(500).json({
			message:
				error.message ||
				'Uncaught error occurred while retrieving the movie. Please contact the dev.',
		});
	}
};

// Add new Movie
exports.add = async (req, res) => {
	const {
		title,
		genres,
		description,
		shortDescription,
		releaseDate,
		images,
		director,
	} = req.body;

	try {
		const movie = await Movie.create({
			title,
			genres,
			description,
			shortDescription,
			releaseDate,
			images,
			director,
		});

		return res.status(201).json(movie);
	} catch (error) {
		console.log(error);
		switch (error.name) {
			case 'SequelizeUniqueConstraintError':
				return res.status(400).json({
					message: error.errors[0].message,
					fields: error.fields,
				});
			case 'SequelizeValidationError':
				return res.status(400).json({
					message: error.errors[0].message,
				});
			case 'Error':
				return res.status(400).json({
					message: error.message,
				});
			default:
				return res.status(500).json({
					//message: 'Uncaught error occurred. Please contact the dev.'
					message: error, //DEV ONLY
				});
		}
	}
};

// Update a movie
exports.update = async (req, res) => {
	const movieId = req.params.id;
	const {
		title,
		genres,
		description,
		shortDescription,
		releaseDate,
		images,
		director,
	} = req.body;

	try {
		if (movieId === null)
			return res.status(400).json({ message: 'Movie ID cannot be empty' });
		if (isNaN(movieId))
			return res.status(400).json({ message: 'Movie ID must be a number' });
		const movie = await Movie.update(
			{
				title,
				genres,
				description,
				shortDescription,
				releaseDate,
				images,
				director,
			},
			{
				where: {
					movieId,
				},
			},
		);

		console.log(movie);
		if (movie[0] === 1) {
			return res.status(200).json({ message: 'Movie successfully updated' });
		} else {
			return res
				.status(400)
				.json({ message: "There was nothing to update" });
		}
	} catch (error) {
		console.log(error);
		switch (error.name) {
			case 'SequelizeUniqueConstraintError':
				return res.status(400).json({
					message: error.errors[0].message,
					fields: error.fields,
				});
			case 'SequelizeValidationError':
				return res.status(400).json({
					message: error.errors[0].message,
				});
			case 'Error':
				return res.status(400).json({
					message: error.message,
				});
			default:
				return res.status(500).json({
					//message: 'Uncaught error occurred. Please contact the dev.'
					message: error, //DEV ONLY
				});
		}
	}
};

// Delete a movie
exports.delete = async (req, res) => {
	const movieId = req.params.id;

	try {
		if (isNaN(movieId))
			return res.status(400).json({ message: 'Movie ID must be a number' });
		const data = await Movie.destroy({
			where: {
				movieId,
			},
		});

		//console.log(data);
		if (data === 1) {
			return res.status(200).json({ message: 'Movie successfully deleted' });
		} else {
			return res.status(404).json({ message: "Movie with that ID doesn't exist" });
		}
	} catch (error) {
		//console.log(error);
		return res.status(500).json({
			message:
				error.message ||
				'Uncaught error occurred while deleting the movie. Please contact the dev.',
		});
	}
};
