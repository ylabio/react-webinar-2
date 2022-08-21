import {cn as bem} from "@bem-react/classname";
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

function LayoutError() {
  const cn = bem('page404');

  return (
    <div className={cn()}>
      <h1>error 404 ...</h1>
    </div>
  )
}

LayoutError.propTypes = {
 };
  
LayoutError.defaultProps = {
 };

export default React.memo(LayoutError);
