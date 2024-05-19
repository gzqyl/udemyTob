import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const cameraSlice = createSlice({
  name: 'cameraStatus',
  initialState: {qrcode: false, ocr: false},
  reducers: {
    setQRCode(state) {
      state.qrcode = true
    },
    setOcr(state){
        state.ocr = true
    }
  }
})

export const { setQRCode, setOcr } = cameraSlice.actions

export default cameraSlice.reducer