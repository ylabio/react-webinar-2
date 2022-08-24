import React, {useCallback} from "react";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import {Link, useNavigate} from "react-router-dom";
import LayoutFlex from "../layout-flex";
import useStore from "../../hooks/use-store";

function TopBlock() {
    const history = useNavigate()
    const store = useStore()
    const select = useSelector(state => ({
        profile: state.user.profile
    }))

    const callbacks = {
        onLogin: useCallback(() => history('/login', {replace: false}), []),
        onLogout: useCallback(() => {
            store.get('auth').logout()
            store.get('user').cleanUserData()
            history('/', {replace: true})
        }, [select.profile])
    }

    return (
        <LayoutFlex flex="end">
            {select.profile.name && <Link to="/profile">{select.profile.name}</Link>}
            {
                select.profile.name
                    ? <button onClick={callbacks.onLogout}>Выйти</button>
                    : <button onClick={callbacks.onLogin}>Войти</button>
            }
        </LayoutFlex>
    )
}

export default React.memo(TopBlock)