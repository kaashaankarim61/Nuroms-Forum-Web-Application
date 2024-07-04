import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: 0,
}
  
//reducer
const loginSlice = createSlice({
  name: 'loginbit',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.data = action.payload
      console.log("HUh = ",state.data);
    },
  },
})


// Action creators are generated for each case reducer function
export default  loginSlice.reducer
export const { setIsLogin } = loginSlice.actions; 