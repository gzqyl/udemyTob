import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const transferSlice = createSlice({
  name: 'filetransfer',
  initialState: {
    isWifi: false,
    isWait: true,
    ipAddr: "0.0.0.0",
    appPort: "*",
    started: false
  },
  reducers: {
    setIsWifi(state,action: PayloadAction<boolean>) {
      state.isWifi = action.payload
    },
    setIsWait(state,action: PayloadAction<boolean>) {
        state.isWait = action.payload
    },
    setIpAddr(state,action: PayloadAction<string>) {
        state.ipAddr = action.payload
    },
    setAppPort(state,action: PayloadAction<string>) {
        state.appPort = action.payload
    },
    setStarted(state,action: PayloadAction<boolean>){
        state.started = action.payload
    }
  }
})

export const { setIsWifi, setIsWait, setIpAddr, setAppPort, setStarted } = transferSlice.actions

export default transferSlice.reducer