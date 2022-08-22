import React, {FC, useEffect, useRef} from 'react';
import {asyncAccountAction} from "../redux/slices/accountSlice";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatchEx, useSelectorEx} from "../hook/redux";
import GsiButtonConfiguration = google.accounts.id.GsiButtonConfiguration;
const Login:FC = () => {
    const googleButtonRef = useRef<HTMLDivElement>(null) ;
    const dispatch = useDispatchEx();
    const {isAuth} = useSelectorEx(state => state.accountReducer);

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            window.google.accounts.id.initialize({
                client_id: "906284970002-tt4vu5bou01kujg5bpha41pfjd6j87ds.apps.googleusercontent.com",
                callback: data => dispatch(asyncAccountAction(data.credential))
            });
            let opts:GsiButtonConfiguration = {type:'standard',theme: "outline", size: "large"};
            window.google.accounts.id.renderButton(
                googleButtonRef.current as HTMLDivElement,
                opts
            )
        }
    },[]);

    let location = useLocation();
    if (isAuth || localStorage.getItem('token')) return <Navigate to="/" state={{ from: location }}/>;
    return (
        <div className="container">
            <div className={'login'}>
                <div className="login__wrap">
                    <div className="login__header">Login</div>
                    <div className="login__content">
                        <div ref={googleButtonRef }/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;