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
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} width="150px"/>
        </div>
    )
}

export default Information