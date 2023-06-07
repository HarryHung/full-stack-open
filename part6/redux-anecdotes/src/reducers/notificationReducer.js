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

export const setNotification = (message, time) => dispatch => {
  dispatch(addNotification(message))
  setTimeout(() => dispatch(removeNotification()), time * 1000)
}

export default notificationSlice.reducer
