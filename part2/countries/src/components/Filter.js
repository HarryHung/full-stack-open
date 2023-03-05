const Filter = ({ handleValueChange }) => {
    return (
        <div>
            
            <form>find countries <input onChange={handleValueChange}></input></form>
        </div>
    )
}

export default Filter