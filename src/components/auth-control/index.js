import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import { Link } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from '../layout-flex';
import './style.css';

function AuthControl() {
    const cn = bem('AuthControl');
    const { t } = useTranslate();
    const navigate = useNavigate();
    const store = useStore();
    const { auth } = useSelector(state => ({
        auth: state.auth,
    }));

    const callbacks = {
        logout: useCallback(() => {
            const data = localStorage.getItem('token');
            if (data) {
                const { token } = JSON.parse(data);
                store.get('auth').logout(token);
                localStorage.removeItem('token');
                // localStorage.removeItem('login');
                navigate('/');
            }
        })
    }

    return (
        <LayoutFlex flex='end'>
            <div className={cn()}>
                {auth.isAuth && <Link className={cn('name')} to={'/profile'}>{auth.userInfo.name}</Link>}

                {auth.isAuth
                    ? <button onClick={() => callbacks.logout()}>{t('auth.logout')}</button>
                    : <Link to={'/login'}><button>{t('auth.signIn')}</button></Link>
                }
            </div>
        </LayoutFlex>
    )
}

export default React.memo(AuthControl);
