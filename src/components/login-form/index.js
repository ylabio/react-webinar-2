import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const initialValues = {
  name: '',
  password: ''
};

function LoginForm(props) {
  const cn = bem('LoginForm');
  const [values, setValues] = useState(initialValues);

  const callbacks = {
    onChange: useCallback(
      event => {
        const {name, value} = event.target;

        setValues({
          ...values,
          [name]: value.trim()
        });
      },
      [values]
    ),
    onSubmit: useCallback(
      event => {
        event.preventDefault();
        props.onSubmit(values.name, values.password);
        setValues({
          name: '',
          password: ''
        });
      },
      [values]
    )
  };

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={callbacks.onSubmit}>
        <label>
          Логин
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={callbacks.onChange}
          />
        </label>

        <label>
          Пароль
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={callbacks.onChange}
          />
        </label>
        {props.error && <p className={cn('error')}>{props.error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: propTypes.func,
  error: propTypes.string
};

export default React.memo(LoginForm);
