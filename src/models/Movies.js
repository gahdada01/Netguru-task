const {model, Schema} = require('mongoose');

// eslint-disable-next-line new-cap
const movieSchema = Schema({
  title: {
    type: String,
  },
  releasedDate: {
    type: Date,
  },
  genre: {
    type: String,
  },
  director: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: Number,
  },
}, {versionKey: false});

const Movies = model('Movies', movieSchema);

const getMovieCount = async (userId, month) => {
  const movies = await Movies.aggregate(
    [
      {
        $project: {
          month: {$month: '$createdAt'},
          creator: '$creator',
        },
      },
      {
        $match: {creator: userId, month: month},
      },
    ],
  );

  return movies.length;
};

module.exports = {
  Movies,
  getMovieCount,
};
