import { configureStore } from '@reduxjs/toolkit'
import testReducer from './reducer/testReducer'
import qrReducer from './reducer/qrReducer'
import geneqrReducer from './reducer/geneqrReducer'
import ocrReducer from './reducer/ocrReducer'
import cameraReducer from './reducer/cameraReducer'
import transferReducer from './reducer/transferReducer'

export const store = configureStore({
  reducer: {
    test: testReducer,
    qrcode: qrReducer,
    geneqr: geneqrReducer,
    ocr: ocrReducer,
    camera: cameraReducer,
    transfer: transferReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch