import {cn as bem} from "@bem-react/classname";
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

function LayoutError(props) {
  const cn = bem('page404');

  return (
    <div className={cn()}>
      <h1>{props.errorText}</h1>
    </div>
  )
}

LayoutError.propTypes = {
    errorText: PropTypes.string
 };
  
LayoutError.defaultProps = {
    errorText: 'ошибка 404'
 };

export default React.memo(LayoutError);
