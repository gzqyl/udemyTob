import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const qrSlice = createSlice({
  name: 'qrcode',
  initialState: {nav_header: false},
  reducers: {
    displayNavHeader(state) {
      state.nav_header = true
    },
    hideNavHeader(state){
      state.nav_header = false
    }
  }
})

export const { displayNavHeader, hideNavHeader } = qrSlice.actions

export default qrSlice.reducer