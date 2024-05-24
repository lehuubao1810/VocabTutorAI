// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import breadcrumbsData from 'src/store/apps/breadcrumbs'

export const store = configureStore({
  reducer: {
    breadcrumbsData
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
