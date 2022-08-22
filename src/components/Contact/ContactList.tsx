import React, {FC} from 'react';
import Contact from "./Contact";
import {UserType} from "../../types/types";
import Placeholder from "../Placeholder";

interface ContactListType {
    contacts: UserType[];
    handleClick: (id:number)=>void
}

const ContactList:FC<ContactListType> = ({contacts,handleClick}) => {
    return (
        <div className={'contacts'}>
            {
                contacts.length > 0 ?
                    contacts.map((item,index)=> <Contact key={index+"_"+item.id} id={item.id} image={item.picture} name={item.name} message={item.message?.message} time={item.message?.date} views={item.unViews} online={item?.online} handleClick={handleClick}/>)
                    : <Placeholder header={"No matches found"} message={'Contacts or dialogs not found'} />
            }
        </div>
    );
};

export default ContactList;