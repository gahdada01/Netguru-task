const got = require('got');
const {OMDB_API_KEY} = require('./config');

const omdUrl = 'http://www.omdbapi.com';
const apiKey = OMDB_API_KEY;

module.exports.getMovieDetails = async (title) => {
  try {
    const details = await got({
      url: omdUrl,
      method: 'GET',
      searchParams: {
        t: title,
        apikey: apiKey,
      },
      responseType: 'json',
      resolveBodyOnly: true,
      retry: {
        limit: 3,
      },
    });

    return {
      title: details.Title,
      releasedDate: new Date(details.Released),
      genre: details.Genre,
      director: details.Director,
    };
  } catch (error) {
    throw new Error(error);
  }
};
