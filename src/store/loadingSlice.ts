import { createSlice } from '@reduxjs/toolkit'

interface LoadingState {
  active: boolean
}

const initialState: LoadingState = { active: false }

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state) => { state.active = true },
    hideLoading: (state) => { state.active = false },
  },
})

export const { showLoading, hideLoading } = loadingSlice.actions
export default loadingSlice.reducer
