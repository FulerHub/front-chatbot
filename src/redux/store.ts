import {combineReducers,configureStore} from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";
import dialogsSlice from "./slices/dialogsSlice";
import messagesSlice from "./slices/messagesSlice";
import contactsSlice from "./slices/contactsSlice";
const rootReducer = combineReducers({
    accountReducer: accountSlice,
    dialogsReducer: dialogsSlice,
    messagesReducer: messagesSlice,
    contactsReducer: contactsSlice
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch