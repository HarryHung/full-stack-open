import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

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
            setMessage(`Changed number of ${newName} to ${newNumber}`)
            setMessageType('info')
            setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from server`)
            setMessageType('error')
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
        setMessage(`Added ${newName}`)
        setMessageType('info')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
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
          setMessage(`Information of ${newName} has already been removed from server`)
          setMessageType('error')
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter handle={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} onSubmit={addNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} handleDel={handleDel}/>
    </div>
  )
}

export default App