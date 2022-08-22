import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

export interface DialogsType {
    id: number;
    userID: number;
}

export interface DialogsState {
    dialogs: DialogsType[];
    isLoading: boolean;
    error: string
}

const initialState: DialogsState = {
    dialogs: [
        {
            id: 1,
            userID:1,
        },
        {
            id: 2,
            userID:2,
        },
        {
            id: 3,
            userID:3,
        },
        {
            id: 4,
            userID:4,
        },
        {
            id: 5,
            userID:5,
        },
    ],
    isLoading: false,
    error: ''
};

export const asyncAddDialogAction = createAsyncThunk(
    'dialogs/addDialog',
    async (dialogID:number, thunkAPI)=>{
        try {
            return {
                id:dialogID,
                userID: dialogID
            };
        } catch (e) {
            return thunkAPI.rejectWithValue("Can't create dialog")
        }
    }
);

const dialogsSlice = createSlice({
    name:'dialogsSlice',
    initialState,
    reducers:{
        loadDialogs(state,action){
            state.dialogs = action.payload;
        },
        resetDialogs(state){
            Object.assign(state,initialState)
        }
    },
    extraReducers: {
        [asyncAddDialogAction.fulfilled.type]: (state, action: PayloadAction<any>) =>{
            state.isLoading = false;
            state.error = '';
            state.dialogs.push(action.payload);
            localStorage.setItem('dialogs',JSON.stringify(state.dialogs));
        },
        [asyncAddDialogAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncAddDialogAction.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export const {loadDialogs,resetDialogs} = dialogsSlice.actions;
export default dialogsSlice.reducer;