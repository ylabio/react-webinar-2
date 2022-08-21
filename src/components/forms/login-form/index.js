import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import TextInput from '../../elements/text-input';
import ErrorMsg from '../../items/error-msg';
import { cn as bem } from '@bem-react/classname';
import Stack from '../../elements/stack';

const initState = {
  login: '',
  password: '',
};

const LoginForm = ({ t, onSubmit, waiting, errors }) => {
  const [state, setState] = useState(initState);
  const cn = bem('LoginForm');

  const cb = {
    onChange: useCallback((e) => {
      setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }, []),
    onSubmit: (e) => {
      e.preventDefault();
      onSubmit(state);
      setState(initState);
    },
  };

  return (
    <form onSubmit={cb.onSubmit} className={cn()}>
      <Stack px={'normal'} spacing={'normal'}>
        <h3>{t('login.title')}</h3>
        <label>
          <div>{t('login.login')}</div>
          <TextInput name={'login'} value={state.login} onChange={cb.onChange} />
        </label>
        <label>
          <div>{t('login.password')}</div>
          <TextInput
            type={'password'}
            name={'password'}
            value={state.password}
            onChange={cb.onChange}
          />
        </label>
        {errors && <ErrorMsg>{errors?.[0]?.message}</ErrorMsg>}
        <button type={'submit'} disabled={waiting}>
          {t('login.btn')}
        </button>
      </Stack>
    </form>
  );
};

LoginForm.propTypes = {
  t: propTypes.func,
  waiting: propTypes.bool,
  onSubmit: propTypes.func,
  errors: propTypes.array,
};

LoginForm.defaultProps = {
  t: (text) => text,
  waiting: false,
  onSubmit: () => {},
};

export default React.memo(LoginForm);
