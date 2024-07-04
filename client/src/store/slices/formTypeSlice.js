import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: 0,
}
  
//reducer
const formTypeSlice = createSlice({
  name: 'formtype',
  initialState,
  reducers: {
    setFormType: (state, action) => {
      state.data = action.payload
      console.log(state.data);
    },
  },
})


// Action creators are generated for each case reducer function
export default  formTypeSlice.reducer
export const { setFormType } = formTypeSlice.actions; 