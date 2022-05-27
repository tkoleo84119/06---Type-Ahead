'use strict'

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

// fetch data & store data
const cities = []
fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data))

/**
 * This function will use the input word to filter the cities array.
 * @param {string} word input word
 * @param {array} cities cities Array
 * @returns Array
 */
const filterCities = (word, cities) => {
  return cities.filter(
    place => place.city.includes(word) || place.state.includes(word)
  )
}

/**
 * This function will add the commas inside the number.
 * @param {string} number populations
 * @returns string
 */
const addCommas = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') // \B 表示非文字邊界，(?=(\d{3})+(?!\d)) 表示至少有3個數字且後方無數字
}

/**
 * This function will display result on the DOM element.
 * @param {object} e Event object
 */
const displayResults = e => {
  const word = e.target.value
  const results = filterCities(word, cities)
  const html = results
    .map(place => {
      const regex = new RegExp(word, 'g')
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${word}</span>`
      )
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${word}</span>`
      )
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${addCommas(place.population)}</span>
      </li>
    `
    })
    .join('')
  suggestions.innerHTML = html
}

searchInput.addEventListener('change', displayResults)
searchInput.addEventListener('keyup', displayResults)
