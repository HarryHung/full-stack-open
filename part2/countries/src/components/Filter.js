const Filter = ({ handleQueryChange }) => {
    return (
        <div> 
            <form>find countries <input onChange={handleQueryChange}></input></form>
        </div>
    )
}

export default Filter