const Display = ({ person, del}) => {
    return (
      <div>{person.name} {person.number} <button onClick={del}>delete</button></div>
    )
  } 

const Persons = ( { persons, filter, handleDel }) => {
    return (
        persons
            .filter( person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map( person => <Display key={person.id} person={person} del={() => handleDel(person.id, person.name)}/> )
    )
}

export default Persons