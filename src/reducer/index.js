import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../sclices/authSclice'
import profileReducer from '../sclices/profileSlice' 
import cartReducer from '../sclices/cartSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer

})

export default rootReducer;