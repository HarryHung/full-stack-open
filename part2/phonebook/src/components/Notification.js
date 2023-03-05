const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    } 

    const notificationStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };

    if (type === 'info') {
        notificationStyle.color = 'green'
    } else if (type === 'error') {
        notificationStyle.color = 'red'
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification