import { combineReducers } from 'redux';
import navigationSlice from './slices/navigationSlice'
import formTypeSlice from './slices/formTypeSlice'
import userSlice from './slices/userSlice'
import loginSlice from './slices/loginSlice';

const rootReducer = combineReducers({
   
        navigation : navigationSlice,
        formtype : formTypeSlice,
        user : userSlice,
        loginbit : loginSlice,

});

export default rootReducer;