import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

import './style.css';

function LoginRequired(props){
    const cn = bem('LoginRequired');
    return (
        <div className={cn()}>
            <span className={cn('login')} onClick={props.onSignIn}>
                Войдите
            </span>
            , чтобы иметь возможность комментировать.{' '}
            <span className={cn('cancel')} onClick={props.onCancel}>Отмена</span>
        </div>
    )
}

LoginRequired.propTypes = {
    onSignIn: propTypes.func,
    onCancel: propTypes.func
}

LoginRequired.defaultProps = {
    onSignIn: () => {},
    onCancel: () => {}
}

export default React.memo(LoginRequired);