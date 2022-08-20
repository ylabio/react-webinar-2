import React from 'react';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './styles.css'
import propTypes from 'prop-types';

const ProfileControls = (props) => {
  const cn = bem("ProfileControls")
  return (
    <div className={cn()}>
      <Link to={props.link}>{props.userName}</Link>
      <button onClick={props.onClickCallback}>{props.buttonName}</button>
    </div>
  );
};

ProfileControls.propTypes = {
  link: propTypes.string,
  userName: propTypes.string,
  buttonName: propTypes.string,
  onClickCallback: propTypes.func

}

export default React.memo(ProfileControls);