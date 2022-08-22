import React from 'react';
import {Navigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const PrivatValidation = ({children}) => {


    const select = useSelector(state => ({
        isAuth: state.login.isAuth,
    }));
   if(select.isAuth) return (
            {children}
    )
   else return <Navigate to="/login" replace={true}/>
};

export default PrivatValidation;