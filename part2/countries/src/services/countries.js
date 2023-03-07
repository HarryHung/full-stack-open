import axios from 'axios'

const countriesUrl = 'https://restcountries.com/v3.1/all'
const geoUrl = 'http://api.openweathermap.org/geo/1.0'
const weatherUrl = 'https://api.openweathermap.org/data/2.5'

const getCountries = () => axios.get(countriesUrl).then(response => response.data)
const getGeo = (city, countryCode, apiKey) => axios.get(`${geoUrl}/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`)
const getWeather = (lat, lon, apiKey) => axios.get(`${weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

export default { getCountries, getGeo, getWeather }