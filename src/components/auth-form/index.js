import React, { useCallback } from "react"
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Input from "../input";
import { useForm } from "react-hook-form";
import propTypes from "prop-types";
import Error from '../error';

function AuthForm({error, onSubmit}) {
  const cn = bem('AuthForm');

  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    mode: 'onSubmit',
  });

  const callbacks = {
    onSubmit: useCallback((data) => {
      onSubmit(data),
      reset()
    }, [])
  }

  return (
    <form className={cn()} onSubmit={handleSubmit(callbacks.onSubmit)}>
      <h2 className={cn('title')}>Вход</h2>
      <div className={cn('container')}>
        <label>
          Логин
          <Input register={register("login", { required: true })}></Input>
        </label>
        <label>
          Пароль
          <Input type={'password'} register={register("password", { required: true })}></Input>
        </label>
        {error && <Error text={error} />}
        <button>Войти</button>
      </div>
    </form>
  )
}

AuthForm.propTypes = {
  error: propTypes.string,
  onSubmit: propTypes.func,
}

AuthForm.defaultProps = {
  onSubmit: () => {},
}

export default React.memo(AuthForm);
