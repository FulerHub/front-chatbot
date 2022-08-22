import {createSelector} from "reselect";
import {RootState} from "../store";
import {MessageType} from "../../types/types";

export const selectContacts = (state:RootState) => state.contactsReducer.contacts;
export const selectDialogs = (state:RootState) => state.dialogsReducer.dialogs;
export const selectMessages = (state:RootState) => state.messagesReducer.messages;
export const selectCurrentDialog = (state:RootState) => state.messagesReducer.currentDialog;
export const selectAccount = (state:RootState) => state.accountReducer.account;

export const selectUserData = createSelector(selectContacts,selectCurrentDialog, (contacts,currentDialog)=>{
    return contacts.filter(item=>item.id === currentDialog)
});

export const selectDialogsData = createSelector(selectContacts,selectDialogs,selectMessages, (contacts,dialogs,messages)=>{
    const usersNames:any = {};
    const usersPictures:any = {};
    const usersOnline:any = {};
    contacts.forEach((item)=>{
        usersNames[item.id] = item.name;
        usersPictures[item.id] = item.picture;
        usersOnline[item.id] = item.online;
     });
    const newDialogs =  dialogs.map((item:any)=>{
        return{
            ...item,
            name:usersNames[item.userID],
            picture: usersPictures[item.userID],
            online: usersOnline[item.userID],
            message: messages.filter(mess=>item.id === mess.dialogID).reduce((prev, current) => prev.date > current.date ? prev : current),
            unViews: messages.filter(mess=>(item.id === mess.dialogID && mess.isView === false)).length
        }
    });

    return newDialogs.sort((x,y) => {
        if (x.message.date < y.message.date) return 1;
        if (x.message.date > y.message.date) return -1;
        return 0;
    });
});

export const selectMessagesData = createSelector(selectContacts,selectMessages,selectCurrentDialog, (contacts,messages,currentDialog)=>{
    const usersNames:any = {};
    const usersPictures:any = {};
    contacts.forEach((item)=>{
        usersNames[item.id] = item.name;
        usersPictures[item.id] = item.picture;
    });
    const filterMessages = messages.filter(item=>item.dialogID === currentDialog);
    return filterMessages.map((item:any)=>{
        return{
            ...item,
            name:usersNames[item.senderID],
            picture: usersPictures[item.senderID]
        }
    });
});

export const selectSearchMessagesData = createSelector(selectContacts,selectMessages,selectAccount, (contacts,messages,account)=>{
    const usersNames:any = {};
    const usersPictures:any = {};
    contacts.forEach((item)=>{
        usersNames[item.id] = item.name;
        usersPictures[item.id] = item.picture;
    });
    return messages.map((item:MessageType)=>{
        return{
            ...item,
            id: item.dialogID,
            name:(item.senderID !== -1) ? usersNames[item.senderID] : account.name,
            picture:(item.senderID !== -1) ? usersPictures[item.senderID] : account.picture,
            message: {
                id: item.id,
                date: item.date,
                message: item.message
            },
        }
    });
});