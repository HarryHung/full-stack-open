import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  display: false,
  message: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return {
        displayNotification: true,
        message: action.payload
      }
    },
    removeNotification(state, action) {
      return {
        displayNotification: false,
        message: ''
      }
    }
  }
})

const { addNotification, removeNotification } = notificationSlice.actions

const setNotification = message => dispatch => {
  dispatch(addNotification(message))
  setTimeout(() => dispatch(removeNotification()), 5000)
}

export default notificationSlice.reducer
export { setNotification }