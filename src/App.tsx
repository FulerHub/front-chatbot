import React, {FC, useEffect} from 'react';

import Home from "./pages/Home";
import './assets/vendor/font-awesome-4.7.0/css/font-awesome.min.css'
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import {withAuth} from "./hoc/withAuth";
import {useDispatchEx} from "./hook/redux";
import { loadMessages } from './redux/slices/messagesSlice';
import { loadDialogs } from './redux/slices/dialogsSlice';

const HomePage = withAuth(Home);

const App:FC = () => {
    const dispatch = useDispatchEx();
    useEffect(()=>{
        if(localStorage.getItem('messages')){
            let messages:string = localStorage.getItem('messages') as string;
            dispatch(loadMessages(JSON.parse(messages)));
        }
        if(localStorage.getItem('dialogs')){
            let dialogs:string = localStorage.getItem('dialogs') as string;
            dispatch(loadDialogs(JSON.parse(dialogs)));
        }

    },[]);
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={ <HomePage />}/>
            <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
