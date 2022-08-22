import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useForm } from 'react-hook-form';
import './styles.css';

function LoginForm({ auth, errorServer }) {
  const cn = bem('LoginForm');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (errors.login) {
      const timer = setTimeout(() => clearErrors('login'), 3000);
      return () => clearTimeout(timer);
    }
    if (errors.password) {
      const timer = setTimeout(() => clearErrors('password'), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors.login, errors.password]);

  const onSubmit = (data) => {
    auth(data);
    reset();
  };

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
        <label className={cn('label')}>
          Логин
          <input
            className={cn('input')}
            placeholder="login"
            {...register('login', {
              required: 'Поле обязательно к заполнению',
              onChange: () => clearErrors('login'),
            })}
          />
          {errors?.login && <p className={cn('error-message')}>{errors.login.message}</p>}
        </label>

        <label className={cn('label')}>
          Пароль
          <input
            type="password"
            className={cn('input', { error: errors?.password })}
            placeholder="password"
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              onChange: () => clearErrors('password'),
            })}
          />
          {errors?.password && <p className={cn('error-message')}>{errors.password.message}</p>}
        </label>

        {errorServer && <p className={cn('error-message')}>{errorServer}</p>}

        <input type="submit" value="Войти" />
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  auth: propTypes.func,
  errorServer: propTypes.string,
};

LoginForm.defaultProps = {
  auth: () => {},
};

export default React.memo(LoginForm);
