import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {MessageType} from "../../types/types";
import axios from "axios";
import {createSound} from "../../types/scripts";


export interface MessagesState {
    messages: MessageType[];
    currentDialog: number;
    isLoading: boolean;
    error: string
}
const initialState: MessagesState = {
    messages: [
        {
            id: 1,
            message: 'Quickly come to the meeting room 1B, we have a big server issue',
            senderID: 1,
            dialogID: 1,
            isView: true,
            date: 1661002340000
        },
        {
            id: 2,
            message: 'Im having breakfast right now, cant you wait for 10 minutes',
            senderID: -1,
            dialogID: 1,
            isView: true,
            date: 1661002340001
        },
        {
            id: 3,
            message: 'We are losing money! Quick!',
            senderID: 1,
            dialogID: 1,
            isView: true,
            date: 1661002340002
        },
        {
            id: 4,
            message: 'Ok',
            senderID: 1,
            dialogID: 1,
            isView: true,
            date: 1661002340003
        },
        {
            id: 5,
            message: 'Quickly come to the meeting room 1B, we have a big server issue',
            senderID: 2,
            dialogID: 2,
            isView: true,
            date: 1661002340004
        },
        {
            id: 6,
            message: 'Im having breakfast right now, cant you wait for 10 minutes',
            senderID: -1,
            dialogID: 2,
            isView: true,
            date: 1661002340005
        },
        {
            id: 7,
            message: 'We are losing money! Quick!',
            senderID: 2,
            dialogID: 2,
            isView: true,
            date: 1661002340006
        },
        {
            id: 8,
            message: 'Ok',
            senderID: 2,
            dialogID: 2,
            isView: true,
            date: 1661002340007
        },
        {
            id: 9,
            message: 'Quickly come to the meeting room 1B, we have a big server issue',
            senderID: 3,
            dialogID: 3,
            isView: true,
            date: 1661002340008
        },
        {
            id: 10,
            message: 'Im having breakfast right now, cant you wait for 10 minutes',
            senderID: -1,
            dialogID: 3,
            isView: true,
            date: 1661002340009
        },
        {
            id: 11,
            message: 'We are losing money! Quick!',
            senderID: 3,
            dialogID: 3,
            isView: true,
            date: 1661002340010
        },
        {
            id: 12,
            message: 'Ok',
            senderID: 3,
            dialogID: 3,
            isView: true,
            date: 1661002340011
        },
        {
            id: 13,
            message: 'Quickly come to the meeting room 1B, we have a big server issue',
            senderID: 4,
            dialogID: 4,
            isView: true,
            date: 1661002340012
        },
        {
            id: 14,
            message: 'Im having breakfast right now, cant you wait for 10 minutes',
            senderID: -1,
            dialogID: 4,
            isView: true,
            date: 1661002340013
        },
        {
            id: 15,
            message: 'We are losing money! Quick!',
            senderID: 4,
            dialogID: 4,
            isView: true,
            date: 1661002340014
        },
        {
            id: 16,
            message: 'Ok',
            senderID: 4,
            dialogID: 4,
            isView: true,
            date: 1661002340015
        },
        {
            id: 17,
            message: 'Quickly come to the meeting room 1B, we have a big server issue',
            senderID: 5,
            dialogID: 5,
            isView: true,
            date: 1661002340016
        },
        {
            id: 18,
            message: 'Im having breakfast right now, cant you wait for 10 minutes',
            senderID: -1,
            dialogID: 5,
            isView: true,
            date: 1661002340017
        },
        {
            id: 19,
            message: 'We are losing money! Quick!',
            senderID: 5,
            dialogID: 5,
            isView: true,
            date: 1661002340018
        },
        {
            id: 20,
            message: 'Ok',
            senderID: -1,
            dialogID: 5,
            isView: true,
            date: 1661002340019
        }
    ],
    currentDialog: 0,
    isLoading: false,
    error: ''
};

export const asyncCurrentDialogAction = createAsyncThunk(
    'messages/loadMessages',
    async (id:number, thunkAPI)=>{
        try {
            let response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(id);
                }, 1000)
            });
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue("Can't load messages")
        }
    }
);

export const asyncResolveMessageAction = createAsyncThunk(
    'messages/addResolveMessage',
    async (dialogID:number, thunkAPI)=>{
        try {
            let response:any = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(axios.get('https://api.chucknorris.io/jokes/random'));
                }, 10000)
            });
            return {
                dialogID: dialogID,
                data:response?.data?.value
            }

        } catch (e) {
            return thunkAPI.rejectWithValue("Can't auth")
        }
    }
);

export const asyncAddMessageAction = createAsyncThunk(
    'messages/addMessage',
    async (message:any, thunkAPI)=>{
        try {
            return {
                id: Date.now(),
                message: message.message,
                senderID: -1,
                dialogID: message.dialogID,
                isView: true,
                date: Date.now()
            };
        } catch (e) {
            return thunkAPI.rejectWithValue("Can't add message")
        }
    }
);



const messagesSlice = createSlice({
    name:'messagesSlice',
    initialState,
    reducers:{
        loadMessages(state,action){
            state.messages = action.payload;
        },
        setCurrentDialog(state,action){
            state.currentDialog = action.payload;
        },
        viewMessages(state,action){
            state.messages = state.messages.map(item=>(!item.isView && item.dialogID === action.payload) ? {
                ...item,
                isView: true
            }: item);
        },
        resetMessages(state){
            Object.assign(state,initialState)
        }
    },
    extraReducers: {
        [asyncCurrentDialogAction.fulfilled.type]: (state, action: PayloadAction<any>) =>{
            state.isLoading = false;
            state.currentDialog = action.payload;
            state.error = ''
        },
        [asyncCurrentDialogAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncCurrentDialogAction.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [asyncAddMessageAction.fulfilled.type]: (state, action: PayloadAction<any>) =>{
            state.isLoading = false;
            state.messages.push(action.payload);
            localStorage.setItem('messages',JSON.stringify(state.messages));
            state.error = ''
        },
        [asyncAddMessageAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncAddMessageAction.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [asyncResolveMessageAction.fulfilled.type]: (state, action: PayloadAction<any>) =>{
            state.isLoading = false;
            const newMessage = {
                id: Date.now(),
                message: action.payload.data,
                senderID: action.payload.dialogID,
                dialogID: action.payload.dialogID,
                isView: state.currentDialog === action.payload.dialogID,
                date: Date.now()
            };

            state.messages.push(newMessage);
            createSound("/sounds/message_sound.wav");
            localStorage.setItem('messages',JSON.stringify(state.messages));
            state.error = ''
        },
        [asyncResolveMessageAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncResolveMessageAction.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export const {loadMessages,setCurrentDialog,viewMessages,resetMessages} = messagesSlice.actions;
export default messagesSlice.reducer;