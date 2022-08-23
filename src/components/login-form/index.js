import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './styles.css'
import propTypes from 'prop-types';
import Input from '../input';

const LoginForm = (props) => {
  const cn = bem('LoginForm');
  return (
    <div className={cn()}>
      <h2>{props.title}</h2>
      <div className={cn('forms')}>
        <div className={cn('form')}>
          <p>{props.loginTitle}</p>
          <Input value={""} onChange={props.handleLoginCallback}/>
        </div>
        <div className={cn('form')}>
          <p>{props.passwordTitle}</p>
          <Input value={""} onChange={props.handlePasswordCallback} type="password"/>
        </div>
      </div>

      <p className={cn('error')}>{props.status}</p>
      <button className={cn("button")} onClick={props.submitCallback}>{props.buttonTitle}</button>
    </div>
  );
};

LoginForm.propTypes = {
  title: propTypes.string,
  loginTitle: propTypes.string,
  passwordTitle: propTypes.string,
  status: propTypes.string,
  buttonTitle: propTypes.string,
  submitCallback: propTypes.func,
  handleLoginCallback: propTypes.func,
  handlePasswordCallback: propTypes.func
}

export default React.memo(LoginForm);