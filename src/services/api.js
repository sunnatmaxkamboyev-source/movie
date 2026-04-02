import axios from "axios";

const API_KEY = "SENING_API_KEY";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
    },
  });
  return res.data;
};

export const getMovieDetail = async (id) => {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });
  return res.data;
};