import React from "react";
import {Navigate} from "react-router";
import {connect} from "react-redux";
import {RootState} from "../redux/store";
import {asyncAccountAction} from "../redux/slices/accountSlice";
import Preloader from "../components/Preloader";

const mapStateToProps = (state:RootState) => ({
    isLoading: state.accountReducer.isLoading,
    isAuth: state.accountReducer.isAuth
});

interface WithAuthPropsType {
    isLoading: boolean;
    isAuth: boolean;
    checkAuth: (token:string) => void
}

export function withAuth(WrappedComponent: any) {
    class WithAuthComponent extends React.Component<WithAuthPropsType, WithAuthPropsType> {
        constructor(props:any){
            super(props);
        }
        componentDidMount() {
            if(localStorage.getItem('token')){
                this.props.checkAuth(localStorage.getItem('token') as string);
            }
        }
        render() {
            if (this.props.isLoading) return <Preloader/>;
            if (!this.props.isAuth) return <Navigate to="/login" />;

            return <WrappedComponent {...this.props} />;
        }
    }
    return connect(mapStateToProps, {checkAuth:asyncAccountAction})(WithAuthComponent);
}