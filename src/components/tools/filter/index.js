import React, {useCallback} from 'react';
import propTypes from "prop-types";
import './style.css';

function Filter(props){

  const onFilter = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  return (
    <select className="Filter" onChange={onFilter} value={props.value}>
      <option value="">{props.t('filter.all')}</option>
      {props.options.map(item => (
        <option key={item?._id} value={item?._id}>{item?.title}</option>
      ))}
    </select>
  )
}

Filter.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  t: propTypes.func
}

Filter.defaultProps = {
  onChange: () => {},
  t: () => {},
}

export default React.memo(Filter);
