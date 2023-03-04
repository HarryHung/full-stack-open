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

    const found = persons.find(person => person.name === newName)
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...found, number: newNumber}
        phonebookService
          .update(found.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.id !== found.id ? n : returnedPerson))
          })
          .catch(error => {
            alert(
              `'${newName}' was already deleted from server`
            )
            setPersons(persons.filter(n => n.id !== found.id))
          })
      }
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

  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const handleDel = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      phonebookService
        .del(id)
        .then(resp => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          alert(
            `'${name}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handle={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} onSubmit={addNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} handleDel={handleDel}/>
    </div>
  )
}

export default App