import React, {useState} from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function AuthForm(props) {
  const cn = bem('AuthForm');

  // Состояние полей ввода
  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  // Изменение полей ввода
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, ...{[name]: value}}));
  }

  // Отправка данных формы
  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(form);
    setForm({
      login: '',
      password: '',
    })
  }

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>{props.t('authForm.title')}</h2>
      <form className={cn('form')} onSubmit={(e) => handleSubmit(e)}>
        <label>
          <span>{props.t('authForm.name')}</span>
          <input
            className={cn('input-field')}
            type={'text'}
            name={'login'}
            required
            value={form.login}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          <span>{props.t('authForm.password')}</span>
          <input
            className={cn('input-field')}
            type={'text'}
            name={'password'}
            required
            value={form.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        {props.error && <span className={cn('error')}>{props.error}</span>}
        <button>{props.t('authForm.action')}</button>
      </form>
    </div>
  );
}

export default React.memo(AuthForm);


AuthForm.propTypes = {
  t: propTypes.func.isRequired,
  login: propTypes.func.isRequired,
}