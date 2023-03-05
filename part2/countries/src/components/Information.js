const Information = ({ selectedCountries }) => {
    const count = selectedCountries.length
    if (count === 0)
    {
        return
    } else if ( count > 10 ) {
        return <div>Too many matches, specify another filter</div>
    } else if (count > 1 ){
        return <ListCountry selectedCountries={selectedCountries} />
    } else {
        return <CountryDetail country={selectedCountries[0]} />
    }
} 

const ListCountry = ({ selectedCountries }) => {
    const countryList = selectedCountries.map(country => country.name.common).sort()
    return countryList.map(country => <div key={country}>{country}</div>) 
}

const CountryDetail = ( {country} ) =>{
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