import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import jwtDecode from "jwt-decode";
import { AccountType } from "../../types/types";
import { resetDialogs } from "./dialogsSlice";
import { resetMessages } from "./messagesSlice";

export interface AccountState {
    isAuth: boolean;
    account: AccountType;
    isLoading: boolean;
    error: string
}

const initialState: AccountState = {
    isAuth: false,
    account: {},
    isLoading: false,
    error: ''
};

export const asyncAccountAction = createAsyncThunk(
    'account/loadAccount',
    async (token:string, thunkAPI)=>{
        try {
           if(!localStorage.getItem('token')) localStorage.setItem('token', token);
           return await jwtDecode(token);
        } catch (e) {
            return thunkAPI.rejectWithValue("Can't auth")
        }
    }
);


export const asyncLogoutAction = createAsyncThunk(
    'account/logoutAccount',
    async (_, thunkAPI)=>{
        try {
            await thunkAPI.dispatch(resetDialogs());
            await thunkAPI.dispatch(resetMessages());
            localStorage.removeItem('token');
            localStorage.removeItem('messages');
            localStorage.removeItem('dialogs');
            return {};
        } catch (e) {
            return thunkAPI.rejectWithValue("Can't logout")
        }
    }
);


const accountSlice = createSlice({
    name:'accountSlice',
    initialState,
    reducers:{
        loadAccount(state,action){
            state.account = action.payload;
        }
    },
    extraReducers: {
        [asyncAccountAction.fulfilled.type]: (state, action: PayloadAction<any>) =>{
            state.isLoading = false;
            state.isAuth = true;
            state.error = '';
            state.account = action.payload;
        },
        [asyncAccountAction.pending.type]: (state) => {
            state.isLoading = true;

        },
        [asyncAccountAction.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [asyncLogoutAction.fulfilled.type]: (state, action: PayloadAction<any>) =>{
            state.isLoading = false;
            state.isAuth = false;
            state.error = '';
            state.account = action.payload;
        },
        [asyncLogoutAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncLogoutAction.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export const {loadAccount} = accountSlice.actions;
export default accountSlice.reducer;