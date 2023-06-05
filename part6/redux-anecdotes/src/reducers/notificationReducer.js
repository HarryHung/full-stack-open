import { createSlice } from '@reduxjs/toolkit'

const initialState = 'test notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer