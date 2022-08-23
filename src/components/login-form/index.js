import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useForm } from 'react-hook-form';
import './styles.css';

function LoginForm({ auth, errorServer, t, disabledLogin }) {
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
      <h2 className={cn('title')}>{t('auth.login')}</h2>
      <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
        <label className={cn('label')}>
          {t('auth.login')}
          <input
            className={cn('input')}
            {...register('login', {
              required: 'Поле обязательно к заполнению',
              onChange: () => clearErrors('login'),
            })}
          />
          {errors?.login && <p className={cn('error-message')}>{errors.login.message}</p>}
        </label>

        <label className={cn('label')}>
          {t('auth.password')}
          <input
            type="password"
            className={cn('input', { error: errors?.password })}
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              onChange: () => clearErrors('password'),
            })}
          />
          {errors?.password && <p className={cn('error-message')}>{errors.password.message}</p>}
        </label>

        {errorServer && <p className={cn('error-message')}>{errorServer}</p>}

        <input type="submit" value={t('auth.login')} disabled={disabledLogin} />
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  auth: propTypes.func,
  errorServer: propTypes.string,
  t: propTypes.func,
  disabledLogin: propTypes.bool,
};

LoginForm.defaultProps = {
  auth: () => {},
  t: (text) => text,
  disabledLogin: false,
};

export default React.memo(LoginForm);
