const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,

  // discover/movie?api_key=${API_KEY}include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_companies=disney&with_genres=35%2C%2016&with_watch_providers=disney
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&with_genres=16`,
  fetchTopRated: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&with_genres=14`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=revenue.desc&with_companies=disney&with_genres=10751`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=revenue.desc&with_companies=disney&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&with_genres=16&with_companies=disney`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&with_genres=12`,
}

export default requests
