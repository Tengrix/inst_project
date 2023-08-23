import {createSlice} from "@reduxjs/toolkit";

interface stateType {
    isInit:boolean;
}

const initialState:stateType = {
    isInit:false,

}
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth:(state, action)=>{
         state.isInit = action.payload
        }
    }
})

export const {actions:authAction} = authSlice
export const {reducer:authReducer} = authSlice
