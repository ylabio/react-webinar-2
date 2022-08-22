import React, {useCallback} from 'react';
import NavContent from "../../components/nav-content";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";


const Nav = () => {
    const store = useStore();
    const navigate = useNavigate();
    const select = useSelector(state => ({
        token: state.auth.token,
        name: state.auth.name
    }));

    const callbacks = {
        onExit: useCallback(() => {
            store.get('auth').exit().then(() => {
                navigate('/');
            });
        }, [])
    }
    return (
        <NavContent name={select.name} token={select.token} onExit={callbacks.onExit}/>
    );
};

export default Nav;