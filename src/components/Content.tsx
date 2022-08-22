import React, {FC} from 'react';
import Avatar from "./Avatar";
import MessagesList from "./Message/MessagesList";
import {selectMessagesData, selectUserData} from "../redux/selectors/selectors";
import {useDispatchEx, useSelectorEx} from "../hook/redux";
import Preloader from "./Preloader";
import Placeholder from "./Placeholder";
import SendForm from "./Forms/SendForm";
import {
    asyncAddMessageAction,
    asyncResolveMessageAction,
    setCurrentDialog
} from "../redux/slices/messagesSlice";
import {asyncAddDialogAction} from "../redux/slices/dialogsSlice";

const Content:FC = () => {
    const dispatch = useDispatchEx();
    const messages = useSelectorEx(selectMessagesData);
    const {isLoading,currentDialog} = useSelectorEx(state => state.messagesReducer);
    const dialogs = useSelectorEx(state => state.dialogsReducer.dialogs);
    const [user] = useSelectorEx(selectUserData);

    const handleSubmit = (value:string)=>{
        const haveDialog = dialogs.filter(dialog => dialog.id === currentDialog);
        if(haveDialog.length <= 0){
            dispatch(asyncAddDialogAction(currentDialog));
        }
        const newMessage = {
            dialogID: currentDialog,
            message: value
        };
        dispatch(asyncAddMessageAction(newMessage));
        dispatch(asyncResolveMessageAction(currentDialog));
    };

    if(isLoading) return <div className={'content'}><Preloader/></div>;
    return (
        <div className={'content ' + (currentDialog > 0 ? "active" : "")}>
            {user ?
                <>
                    <div className="content__header">
                        <div className="content__back" onClick={()=>dispatch(setCurrentDialog(0))}><i className="fa fa-arrow-left" aria-hidden="true"/></div>
                        <Avatar image={user?.picture} />
                        <div className="content__name">{user?.name}</div>
                    </div>
                    <MessagesList messages={messages}/>
                    <SendForm handleSubmit={handleSubmit}/>
                </> : <Placeholder header={'Dialogs not found'} message={'Select on the left dialog or contact'}/>
            }
        </div>
    );
};

export default Content;