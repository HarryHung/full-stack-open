import { useState, useEffect } from 'react'
import countriesService from './services/countries'

import Filter from './components/Filter'
import Information from './components/Information'


function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [query, setQuery] = useState(null)

  useEffect(() => {
    countriesService
      .getCountries()
      .then(resp => {
        setCountries(resp)
      })
  }, [])

  useEffect(() => {
    const selected = countries.filter(country => query && country.name.common.toLowerCase().includes(query))
    setSelectedCountries(selected)
  }, [countries, query])

  const handleQueryChange = (event) => setQuery(event.target.value.toLowerCase())

  return (
    <div>
      <Filter handleQueryChange={ handleQueryChange }/>
      <Information selectedCountries={selectedCountries} handleQueryChange={handleQueryChange}/>
    </div>
  )
}

export default App;
