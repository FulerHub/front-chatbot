import {createSlice} from "@reduxjs/toolkit";
import {UserType} from "../../types/types";




export interface ContactsState {
    contacts: UserType[];
    isLoading: boolean;
    error: string
}

const initialState: ContactsState = {
    contacts: [
        {
            id: 1,
            name: 'Alice Freeman',
            picture: 'https://i.pravatar.cc/150?u=fake1',
            online: true
        },
        {
            id: 2,
            name: 'Josefina',
            picture: 'https://i.pravatar.cc/150?u=fake2',
            online: true
        },
        {
            id: 3,
            name: 'Velazquez',
            picture: 'https://i.pravatar.cc/150?u=fake3',
            online: true
        },
        {
            id: 4,
            name: 'Barrera',
            picture: 'https://i.pravatar.cc/150?u=fake4',
            online: true
        },
        {
            id: 5,
            name: 'Freeman',
            picture: 'https://i.pravatar.cc/150?u=fake5',
            online: true
        },
        {
            id: 6,
            name: 'River Fuller',
            picture: 'https://i.pravatar.cc/150?u=fake6',
            online: true
        },
        {
            id: 7,
            name: 'Bart Messy',
            picture: 'https://i.pravatar.cc/150?u=fake7',
            online: true
        },
        {
            id: 8,
            name: 'Atir Rita',
            picture: 'https://i.pravatar.cc/150?u=fake8',
            online: true
        },
        {
            id: 9,
            name: 'Pavel Durov',
            picture: 'https://icdn.lenta.ru/images/2017/03/21/10/20170321101719238/detail_c0fb15a088b8b3b6f56da2fb6ab44922.jpg',
            online: true
        },
    ],
    isLoading: false,
    error: ''
};

const contactsSlice = createSlice({
    name:'contactsSlice',
    initialState,
    reducers:{
        loadContacts(state,action){
            state.contacts = action.payload;
        }
    },
    extraReducers: {
    }
});

export const {loadContacts} = contactsSlice.actions;
export default contactsSlice.reducer;