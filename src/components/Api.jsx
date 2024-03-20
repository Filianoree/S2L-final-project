import axios from "axios";

const API_KEY = "14ce81e0a1dbb79c654956f07d3d68df";
const Api = {
  async searchMovies(query) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: API_KEY,
          query: query,
        },
      }
    );
    return response.data.results;
  },

  async getMovieDetails(movieId) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data;
  },

  async getMovieCredits(movieId) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data;
  },

  async getPersonDetails(personId) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${personId}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data;
  },

  async searchWatchSites(movieTitle) {
    const response = await axios.get(`https://api.example.com/watch-sites`, {
      params: {
        movie_title: movieTitle,
        api_key: API_KEY,
      },
    });
    return response.data;
  },
};

export default Api;
