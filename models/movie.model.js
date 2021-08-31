// genres condition
const genres_allowedGenres = [
	'Action',
	'Adventure',
	'Animation',
	'Children',
	'Comedy',
	'Crime',
	'Documentary',
	'Drama',
	'Fantasy',
	'Film-Noir',
	'Horror',
	'IMAX',
	'Musical',
	'Mystery',
	'Romance',
	'Sci-Fi',
	'Thriller',
	'War',
	'Western',
];

// shortDesription condition
const shortDesc_maxLength = 40;

// releaseDate condition
const releaseDate_minYear = 1888;

module.exports = (sequelize, Sequelize) => {
	const Movie = sequelize.define(
		'movie',
		{
			movieId: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						msg: 'Title cannot be null',
					},
					notEmpty: {
						msg: 'Title cannot be empty',
					},
				},
			},
			genres: {
				type: Sequelize.STRING,
				defaultValue: '(no genres listed)',
				set(value) {
					if (value !== null) {
						if (!Array.isArray(value)) {
							throw new Error('Genres must be an array');
						}
						if (value.length === 0) {
							throw new Error("Genres array can't be an empty array");
						}
						const allowedGenres = genres_allowedGenres;
						if (value.length > 1) {
							let check = 0;
							value.forEach((genre) => {
								if (allowedGenres.includes(genre)) {
									check++;
								}
							});
							if (check !== value.length) {
								throw new Error('One of the genres is not allowed');
							}
						} else {
							if (!allowedGenres.includes(value[0])) {
								throw new Error('Genre not allowed');
							}
						}
						if (value.length > allowedGenres.length) {
							throw new Error(
								`Genres array is too big. Max length: ${allowedGenres.length}`,
							);
						}
						//console.log('set() ',value);
						const uniqueGenres = [...new Set(value)]; //remove duplicates
						this.setDataValue('genres', uniqueGenres.join('|'));
					}
				},
			},
			description: {
				type: Sequelize.TEXT,
			},
			shortDescription: {
				type: Sequelize.STRING(shortDesc_maxLength),
				field: 'short_description',
				validate: {
					len: {
						args: [0, shortDesc_maxLength],
						msg: `Short description can have at most ${shortDesc_maxLength} characters.`,
					},
				},
			},
			releaseDate: {
				type: Sequelize.INTEGER,
				field: 'release_date',
				validate: {
					min: {
						args: releaseDate_minYear,
						msg: `Release date must be year after ${releaseDate_minYear}.`,
					},
					isNumeric: {
						msg: 'Release date must be year as a number',
					},
				},
			},
			images: {
				type: Sequelize.STRING,
				set(value) {
					if (typeof value === 'object' && value !== null) {
						if (value.url) {
							this.setDataValue('images', value.url);
						} else {
							throw new Error(
								"Object images must contain parameter 'url' that cannot be empty",
							);
						}
					}
				},
			},
			director: {
				type: Sequelize.STRING,
			},
		},
		{
			timestamps: false,
		},
	);
	//forceSyncDb(sequelize);

	return Movie;
};

/*
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })();
*/

const forceSyncDb = async (sequelize) => {
	await sequelize.sync({ force: true });
	console.log('Database synced');
};
