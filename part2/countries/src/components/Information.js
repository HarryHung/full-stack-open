import { useState } from 'react'

import countriesService from '../services/countries'

const Information = ({ selectedCountries, handleQueryChange }) => {
    const count = selectedCountries.length

    return (
        <div>
            {count > 10 && <Note/>}
            {count <= 10 && <Result selectedCountries={selectedCountries} handleQueryChange={handleQueryChange}/>}
        </div>
    )
} 

const Note = () => <div>Too many matches, specify another filter</div>

const Result = ({ selectedCountries, handleQueryChange }) => {
    const countriesList = selectedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common))
    return (
        <div>
            {selectedCountries.length > 1 && <ListCountry countriesList={countriesList} handleQueryChange={handleQueryChange}/>}
            {selectedCountries.length == 1 && <CountryDetail country={countriesList[0]}/>}
        </div>
    )
}

const ListCountry = ( {countriesList, handleQueryChange} ) => {
    return countriesList.map(
        country => 
            <div key={country.name.common}>
                {country.name.common}
                <button value={country.name.common} onClick={handleQueryChange}>show</button>
            </div>
        )
}

const CountryDetail = ( {country} ) => {
    const apiKey = process.env.REACT_APP_OW_API_KEY
    const [temp, setTemp] = useState(null)
    const [wind, setWind] = useState(null)
    const [icon, setIcon] = useState(null)

    countriesService
        .getGeo(country.capital[0], country.cca2, apiKey)
        .then(resp => {
            const lat = resp.data[0].lat
            const lon = resp.data[0].lon

            countriesService
                .getWeather(lat, lon, apiKey)
                .then (resp => {
                    setTemp((resp.data.main.temp - 273.15).toFixed(2))
                    setWind(resp.data.wind.speed.toFixed(2))
                    setIcon(`https://openweathermap.org/img/wn/${resp.data.weather[0].icon}@2x.png`)
                })
        })

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital.join(", ")}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} width="150px"/>
            <h2>Weather in {country.capital[0]}</h2>
            <div>temperature {temp} Celcius</div>
            <img src={icon} />
            <div>wind {wind} m/s</div>
        </div>
    )
}

export default Information