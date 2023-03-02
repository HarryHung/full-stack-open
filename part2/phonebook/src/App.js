import { useState } from 'react'

const Display = ({ person }) => {
  return (
    <div>{person.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(
        [...persons,
        { name: newName }]
      )
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person =>
        <Display key={person.name} person={person}/>
      )}
    </div>
  )
}

export default App