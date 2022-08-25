import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import Input from "../input";

function LoginForm(props) {
  // CSS классы по БЭМ
  const cn=bem('LoginForm');

  return (
    <form className={cn()} onSubmit={(event) => props.putForm(event)}>
      <h2 className={cn('Title')}>{props.title}</h2>
      <p className={cn('label')}>{props.login}</p>
      <Input
        onChange={props.onChangeLog}
        value={''}
      />
      <p className={cn('label')}>{props.password}</p>
      <Input
        onChange={props.onChangePas}
        type={'password'}
        value={''}
      />
      <p className={cn('error')}>{props.error}</p>
      <div className={cn('Button')}>
        <Input
          type={"submit"}
          value={props.title}
        />
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  onChangePas: propTypes.func,
  onChangeLog: propTypes.func,
  putForm: propTypes.func,
  error: propTypes.string,
}

LoginForm.defaultProps = {
}

export default React.memo(LoginForm);