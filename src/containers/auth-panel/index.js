import React, {useCallback} from 'react';
import LayoutFlex from "../../components/layout-flex";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import {Link} from "react-router-dom";
import AuthPanelControls from "../../components/auth-panel-controls";
import useStore from "../../hooks/use-store";

const AuthPanel = () => {
    const store = useStore();

    useInit(async () => {
        await store.get('login').checkLogin();
    }, [], {backForward: true});

    const select = useSelector(state => ({
        token: state.login.token,
        isAuth: state.login.isAuth,
        user: state.login.user,
        waiting: state.login.waiting,
    }));

    const callbacks = {
        logOut: useCallback((token) => store.get('login').logOut(token), []),
    };

    return (
        <LayoutFlex flex='end' padding={true}>
            {select.isAuth ?
                <Spinner active={select.waiting}>
<AuthPanelControls
    logOut={callbacks.logOut}
    token={select.token}
    user={select.user.profile}
>

</AuthPanelControls>
                </Spinner>
            :
                <Link to='/login'>
                    <button>Вход</button>
                </Link>

            }
        </LayoutFlex>
    );
};

export default AuthPanel;