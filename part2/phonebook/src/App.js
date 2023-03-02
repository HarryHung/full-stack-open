import { useState } from 'react'

const Display = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(
        [...persons,
        { name: newName, number: newNumber }]
      )
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange =(event) => setNewNumber(event.target.value)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person =>
        <Display key={person.name} person={person}/>
      )}
    </div>
  )
}

export default App