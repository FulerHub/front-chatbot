import React, {FC} from 'react';
import Avatar from "../Avatar";
import {DateToString} from "../../types/scripts";

interface MessageType {
    image: string;
    content: string;
    date: number;
    isMy?: boolean;
}

const Message:FC<MessageType> = ({image,content,date,isMy=false}) => {
    return (
        <div className={"message " + (isMy && "message-sender")}>
            {!isMy && <Avatar image={image} />}
            <div className="message__content">
                {content}
            </div>
            <div className="message__time">{DateToString(new Date(date),"MM/dd/yy hh:mm")}</div>
        </div>
    );
};

export default Message;