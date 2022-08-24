import React, {FC, useEffect, useState} from 'react';
import Avatar from "./Avatar";
import ContactList from "./Contact/ContactList";
import SearchForm from "./Forms/SearchForm";
import {selectContacts, selectDialogsData, selectSearchMessagesData} from "../redux/selectors/selectors";
import {useDispatchEx, useSelectorEx} from "../hook/redux";
import {asyncCurrentDialogAction, viewMessages} from '../redux/slices/messagesSlice';
import {asyncLogoutAction} from "../redux/slices/accountSlice";

const Sidebar:FC = () => {
    const {name,picture} = useSelectorEx((state) => state.accountReducer.account);
    const {currentDialog} = useSelectorEx(state => state.messagesReducer);
    const contacts = useSelectorEx(selectContacts);
    const dialogs = useSelectorEx(selectDialogsData);
    const messages = useSelectorEx(selectSearchMessagesData);

    const dispatch = useDispatchEx();
    const [tab,setTab] = useState<number>(2);
    const [filter, setFilter] = useState<any>(contacts);

    useEffect(()=>{
        if(tab !== 2) setFilter(dialogs);
    },[dialogs]);

    const setTabEx = (id:number, data:any) =>{
        setTab(id);
        setFilter(data);
    };

    const handleClick = (id:number)=>{
        dispatch(viewMessages(id));
        dispatch(asyncCurrentDialogAction(id));
    };
    const handleChange = (search:string)=>{
        let filterContacts = [];
        if (search !== "") {
            let onlyContacts = contacts.filter(item => {
                return (item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            });
            let onlyMessages = messages.filter(item => {
                return (item.message.message.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            });
            filterContacts = [...onlyContacts,...onlyMessages]

        } else {
            filterContacts = (tab === 1) ? dialogs : contacts;
        }
        setFilter(filterContacts);
    };

    const handleLogout = ()=>{
        dispatch(asyncLogoutAction());
    };

    return (
        <aside className={'sidebar ' + (currentDialog > 0 ? "hidden" : "") }>
            <div className="sidebar__header">
                <Avatar image={picture} online={true}/>
                <div className="sidebar__name">{name}</div>
                <div className="sidebar__logout">
                    <a onClick={handleLogout}>Logout</a>
                </div>
                <SearchForm handleChange={handleChange} placeholder={'Search or start new chat'}/>
            </div>
            <div className="sidebar__wrap">
                <div className="tab">
                    <div className={"tabs__menu"}>
                        <a href="#" onClick={()=>{setTabEx(1, dialogs)}} className={"sidebar__h2 "+ (tab === 1 ? "active" : "")}>Chats</a>
                        <a href="#" onClick={()=>{setTabEx(2, contacts)}} className={"sidebar__h2 "+ (tab === 2 ? "active" : "")}>Contacts</a>
                    </div>
                    <div className="tabs__content">
                        {tab === 1 &&  <ContactList contacts={filter} handleClick={handleClick}/>}
                        {tab === 2 &&  <ContactList contacts={filter} handleClick={handleClick}/>}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;