import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stateType {
    isInit: boolean;
    accessToken: string;
}

const initialState: stateType = {
    isInit: false,
    accessToken: ''
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isInit = action.payload;
        }
    }
});

export const { actions: authAction } = authSlice;
export const { reducer: authReducer } = authSlice;
