import React, {FC} from 'react';
import Avatar from "../Avatar";
import {DateToString} from "../../types/scripts";

interface ContactType {
    id: number;
    image: string;
    name: string;
    online?: boolean;
    message?: string;
    time?: number;
    views?: number;
    handleClick: (id:number)=>void
}

const Contact:FC<ContactType> = ({id,image,name,message,online,time,views=0,handleClick}) => {
    return (
        <div className={"contact " + (views > 0 ? "active" : "")} onClick={()=>handleClick(id)}>
            <Avatar image={image} online={online}/>
            <div className="contact__wrap">
                <div className="contact__name">{name}</div>
                <div className="contact__message">{message}</div>
                {time && <div className="contact__time">{DateToString(new Date(time),"MM/dd/yy hh:mm")}</div>}
                {views > 0 && <div className="contact__view">{views}</div>}
            </div>
        </div>
    );
};

export default Contact;