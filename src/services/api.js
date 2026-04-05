const BASE_URL = 'http://localhost:5000/api'

export const getPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies/popular`)
  const data = await res.json()
  return data.movies
}

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}/movies/search?q=${query}&page=${page}`)
  const data = await res.json()
  return data
}

export const getMovieById = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`)
  const data = await res.json()
  return data
}