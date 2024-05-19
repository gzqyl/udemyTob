import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const geneqrSlice = createSlice({
  name: 'geneQR',
  initialState: {qr_uri: ""},
  reducers: {
    updateQrURI(state, action: PayloadAction<string>) {
      state.qr_uri = action.payload
    }
  }
})

export const { updateQrURI } = geneqrSlice.actions

export default geneqrSlice.reducer