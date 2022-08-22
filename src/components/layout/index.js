import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import Login from '../login';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function Layout({ head, children }) {
  const cn = bem('Layout');
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    user: state.auth.user,
    token: state.auth.token,
  }));

  const callbacks = {
    exit: React.useCallback(() => {
      store.get('auth').exit(select.token);
      navigate('../');
    }),
  };
  return (
    <div className={cn()}>
      <Login
        name={select.user == undefined ? undefined : select.user.profile.name}
        exit={callbacks.exit}
      />
      <div className={cn('head')}>{head}</div>
      <div className={cn('content')}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
};

Layout.defaultProps = {};

export default React.memo(Layout);
