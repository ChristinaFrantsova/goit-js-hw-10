import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
  let countryName = evt.target.value.trim();
  console.log(countryName);
  if (countryName !== '') {
    fetchCountries(countryName)
      .then(data => renderMarkupOnPage(data))
      .catch(console.log);
  } else {
    clearPage();
  }
}

function renderMarkupOnPage(countries) {
  if (countries.length > 10) {
    clearPage();
    Notify.info('Too many matches found. Please, enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    clearPage();
    markupOfCountryList(countries);
  } else {
    clearPage();
    markupOfOneCountry(countries);
  }
}

function markupOfCountryList(countries) {
  const markupOfAllCountries = countries
    .map(({ flags, name }) => {
      return `<li class="country-card">
      <div class="country-img"><img src="${flags.svg}" alt="${name.official}"></div>
         <p><b>${name.official}</b></p>
            </li>`;
    })
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', markupOfAllCountries);
}

function markupOfOneCountry(countries) {
  const markupOfOneCountry = countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<div class="country-card">
      <div class="country-img"><img src="${flags.svg}" alt="${
        name.official
      }" class="country-img"></div>
    <p><b>${name.official}</b></p></div>
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${Object.values(languages)} </p>`;
    })
    .join('');
  refs.countryInfo.insertAdjacentHTML('beforeend', markupOfOneCountry);
}

export function clearPage() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
