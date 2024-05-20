import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'


const testSlice = createSlice({
  name: 'test',
  initialState: [] as Array<{id: number, text: string, completed: boolean}>,
  reducers: {
    testAdded(state, action: PayloadAction<{id: number, text: string, completed: boolean}>) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },
    testToggled(state, action: PayloadAction<{id: number, text: string, completed: boolean}>) {
      const tt = state.find(ti => ti.id === action.payload.id)
      tt && (tt.completed = !tt.completed)
    }
  }
})

export const { testAdded, testToggled } = testSlice.actions

//api request
function waitFn(payload: {id: number, text: string, completed: boolean}): Promise<{id: number, text: string, completed: boolean}>{

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            resolve({...payload, text: `${payload.text} world`})

        },3000)

    })
}

export const testAddAsync = (payload: {id: number, text: string, completed: boolean}) => async (dispatch: AppDispatch) => {

    const res = await waitFn(payload)

    dispatch(testAdded(res))

}

export default testSlice.reducer