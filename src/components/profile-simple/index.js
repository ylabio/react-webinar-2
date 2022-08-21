import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';
import Button from "../button";

function ProfileSimple(props) {
  const cn = bem('ProfileSimple');

  return (
  <div className={cn()}>
    {props.authorisedUser ?
      <>
        <Link className={cn('link')} to={props.profileLink}>{props.linkText}</Link>
        <Button onClick={props.onClick}
                text={props.buttonText}
                type={'profileSimple'}/>
      </> :
      <Link to={props.loginLink}>
        <Button onClick={props.onClick}
                text={props.buttonText}
                type={'profileSimple'}/>
      </Link>
    }
  </div>
  )
}

ProfileSimple.propTypes = {
  linkText: propTypes.string,
  buttonText: propTypes.string,
  onClick: propTypes.func,
  authorisedUser: propTypes.string,
  profileLink: propTypes.string,
  loginLink: propTypes.string,
}

ProfileSimple.defaultProps = {
  linkText: '',
  buttonText: '',
  onClick: () => {},
  authorisedUser: '',
  profileLink: '',
  loginLink: '',
}

export default React.memo(ProfileSimple);
