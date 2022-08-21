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

  const handleInputChange = event => {
    const {name, value} = event.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('form');
  };

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Логин
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Пароль
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Войти</button>
      </form>
      <p className={cn('error')}>Некая ошибка от сервера</p>
    </div>
  );
}

LoginForm.propTypes = {};

export default React.memo(LoginForm);
