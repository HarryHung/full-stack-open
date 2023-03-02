const PersonForm = ({ handleNameChange, handleNumberChange, onSubmit }) => {
    return (
    <form onSubmit={onSubmit}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
    </form>
    )
  } 

export default PersonForm