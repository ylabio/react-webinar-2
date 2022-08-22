import React, { useCallback } from 'react';
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Select(props) {

  const cn = bem('Select');
  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  return (
    <select className={props.type ? cn({ [props.type]: true }) : cn()} onChange={onSelect} value={props.value}>
      {props.options.map(item => (
        <option className={cn('option')} key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  type: propTypes.string,
}

Select.defaultProps = {
  onChange: () => { },
  type: ''
}

export default React.memo(Select);
