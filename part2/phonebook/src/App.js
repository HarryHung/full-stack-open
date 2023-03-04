import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber}

      phonebookService.create(personObject)
      .then(returnedPerson => {
        setPersons(
          [...persons, returnedPerson]
        )
      })
    }
  }

  const handleFilterChange =(event) => setNewFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange =(event) => setNewNumber(event.target.value)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handle={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} onSubmit={addNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App