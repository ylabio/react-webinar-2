import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Field({label, error, children}){
  const cn = bem('Field');

  return (
    <div className={cn()}>
      <label className={cn('label')}>{label}</label>
      <div className={cn('input')}>
        {children}
      </div>
      <div className={cn('error')}>
        {error}
      </div>
    </div>
  )
}

Field.propTypes = {
  label: propTypes.node,
  error: propTypes.node,
  children: propTypes.node,
}

Field.defaultProps = {
}

export default React.memo(Field);
