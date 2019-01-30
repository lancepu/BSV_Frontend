import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = `${apiUrl}/movies`;

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function saveMovie(movie) {
  //return http.post(apiEndpoint, movie);
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    console.log(body);
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}
