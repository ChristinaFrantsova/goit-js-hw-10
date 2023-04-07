import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1';
export function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url)
    .then(response => {
      //   console.log(response);
      if (!response.ok) {
        throw 'Ой ой, країни з такою назвою не існує!';
      }
      return response.json();
    })
    .catch(error => {
      //   console.log(error);
      Notify.failure('Ой ой, країни з такою назвою не існує!');
    });
}
