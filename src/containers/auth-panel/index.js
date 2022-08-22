import React, {useCallback} from 'react';
import LayoutFlex from "../../components/layout-flex";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import AuthPanelControls from "../../components/auth-panel-controls";
import useStore from "../../hooks/use-store";

const AuthPanel = () => {
    const store = useStore();

    useInit(async () => {
        if (localStorage.getItem('token')) {
            await store.get('login').checkLogin(localStorage.getItem('token'));
        }
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
        <LayoutFlex flex='end' padding={false}>
<AuthPanelControls
    logOut={callbacks.logOut}
    token={select.token}
    user={select.user.profile}
    isAuth={select.isAuth}
    link='/login'
>

</AuthPanelControls>

        </LayoutFlex>
    );
};

export default AuthPanel;