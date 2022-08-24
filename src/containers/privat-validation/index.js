import React, {useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const PrivatValidation = ({children}) => {
    const navigate = useNavigate()
    const select = useSelector(state => ({
        isAuth: state.login.isAuth,
    }));

    useEffect(()=> {
        if(!select.isAuth){
            navigate('/login' )
        }
    },[select.isAuth])


    return(
    <>
        {children}
    </>
    )

};

export default PrivatValidation;