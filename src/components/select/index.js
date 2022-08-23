import React, {useCallback} from 'react';
import propTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname'

function Select(props){
  const cn = bem('Select');

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value, props.options[0].type);
  }, [props.onChange])

  return (
    <select className={cn()} onChange={onSelect} value={props.value}>
      {props.options.map(item => (
        <option className={cn('option')} key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func
}

Select.defaultProps = {
  onChange: () => {}
}

export default React.memo(Select);
