import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const ocrSlice = createSlice({
  name: 'ocr',
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

export const { displayNavHeader, hideNavHeader } = ocrSlice.actions

export default ocrSlice.reducer