import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    return () => {
      setLogin('');
      setPassword('');
      props.resetError();
    };
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(login, password);
    // console.log('currentpage', props.currentPage);
  };

  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={onHandleSubmit} className={cn('form')}>
        <label className={cn('form-item')}>
          <p>Логин</p>
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label className={cn('form-item')}>
          <p>Пароль</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {props.error && <p className={cn('form-error')}>{props.error}</p>}
        <input type="submit" value="Войти" />
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: propTypes.func,
  error: propTypes.string,
  currentPage: propTypes.string,
};

LoginForm.defaultProps = {
  error: '',
  onLogin: () => {},
};

export default React.memo(LoginForm);
