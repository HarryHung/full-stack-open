const Display = ({ person }) => {
    return (
      <div>{person.name} {person.number}</div>
    )
  } 

const Persons = ( { persons, filter }) => {
    return (
        persons
            .filter( person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map( person => <Display key={person.name} person={person}/> )
    )
}

export default Persons