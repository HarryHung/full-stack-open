import { useState, useEffect } from 'react'
import countriesService from './services/countries'

import Filter from './components/Filter'
import Information from './components/Information'


function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(resp => {
        setCountries(resp)
      })
  }, [])

  const handleValueChange = (event) => {
    const query = event.target.value.toLowerCase()   
    const selected = countries.filter(country => country.name.common.toLowerCase().includes(query))
    
    setSelectedCountries(selected)
  }

  return (
    <div>
      <Filter handleValueChange={ handleValueChange }/>
      <Information selectedCountries={selectedCountries}/>
    </div>
  );
}

export default App;
