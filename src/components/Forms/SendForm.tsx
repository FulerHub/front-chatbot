import React, {FC} from 'react';
import {useInput} from "../../hook/useInput";

interface SendFormType {
    handleSubmit: (value:any)=>void
}

const SendForm:FC<SendFormType> = ({handleSubmit}) => {
    const {bind,value,reset} = useInput('');

    const handleSubmitForm = (event:React.SyntheticEvent)=>{
        event.preventDefault();
        handleSubmit(value);
        reset();
    };

    const handleKeyDownForm = (e:React.KeyboardEvent<HTMLTextAreaElement>) =>{
        if(e.keyCode === 13) {
            e.preventDefault();
            handleSubmit(value);
            reset();
        }
    };

    return (
        <div className="dialog-form">
            <form onSubmit={handleSubmitForm}>
                <textarea onKeyDown={handleKeyDownForm} {...bind} className={'input-textarea'} name={'message'} placeholder={'Type your message'}/>
                <button className={'btn-send'}><i className="fa fa-paper-plane" aria-hidden="true"/></button>
            </form>
        </div>
    );
};

export default SendForm;