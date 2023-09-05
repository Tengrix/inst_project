import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

interface stateType {
    isInit: boolean;
    token: string;
    trustDevice: boolean;
}

const initialState: stateType = {
    isInit: false,
    token: '',
    trustDevice: false
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
            state.isInit = true;
        },
        logOut: state => {
            state.isInit = false;
            state.token = '';
        },
        setCheckDevice: (state, action) => {
            state.trustDevice = action.payload;
        }
    }
});

export const { actions: authAction } = authSlice;
export const { reducer: authReducer } = authSlice;
