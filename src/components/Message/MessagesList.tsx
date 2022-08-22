import React, {FC, useEffect, useRef} from 'react';
import Message from "./Message";
import {MessageContentType} from "../../types/types";
import Placeholder from "../Placeholder";

interface MessagesListType {
    messages: MessageContentType[]
}

const MessagesList:FC<MessagesListType> = ({messages}) => {
    const messagesRef = useRef<HTMLDivElement>(document.createElement('div')) ;
    useEffect(()=>{
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    },[messages]);
    return (
        <div className={'messages'} ref={messagesRef}>
            {
                messages.length > 0 ?
                    messages.map((item)=> <Message key={item.id} image={item.picture} content={item.message} date={item.date} isMy={item.senderID === -1}/>)
                    :
                    <Placeholder header={'Messages not found'} message={'Send message to start dialog'}/>
            }
        </div>
    );
};

export default MessagesList;