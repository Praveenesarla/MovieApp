import axios from "axios";

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = "44e3fbfd";

export const fetchMovies = async (keyword = "squid") => {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${keyword}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Search: [] };
  }
};
