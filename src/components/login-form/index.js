import React, { useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import useTranslate from "../../hooks/use-translate";
import './style.css';

function LoginForm(props) {
  const cn = bem('AuthForm');

  const { t } = useTranslate();
  // Состояние полей ввода
  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  // Изменение полей ввода
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, ...{ [name]: value } }));
  }

  // Отправка данных формы
  const onSubmit = (e) => {
    e.preventDefault();
    props.login(form);
    setForm({
      login: '',
      password: '',
    })
  }

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>{t('auth.title')}</h2>
      <form className={cn('form')} onSubmit={onSubmit}>
        <label>
          <span>{t('auth.name')}</span>
          <input
            className={cn('input')}
            type='text'
            name='login'
            required
            value={form.login}
            onChange={onChange}
          />
        </label>
        <label>
          <span>{t('auth.password')}</span>
          <input
            className={cn('input')}
            type='text'
            name='password'
            required
            value={form.password}
            onChange={onChange}
          />
        </label>
        {props.error && <span className={cn('error')}>{props.error}</span>}
        <button>{t('auth.action')}</button>
      </form>
    </div>
  );
}

export default React.memo(LoginForm);


LoginForm.propTypes = {
  login: propTypes.func.isRequired,
}