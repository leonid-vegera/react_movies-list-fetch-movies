/* eslint-disable */
const BASE_URL = 'http://www.omdbapi.com/?apikey=9d04d26f&t=';

export const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw `{${response.status}}`
      }
      
      return response.json()
    });
};
