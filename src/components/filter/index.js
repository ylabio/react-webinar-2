import React, {useCallback} from 'react'
import propTypes from "prop-types";
import './style.css';

function Filter(props) {

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  /**
   * Рекурсивно рендерим список
   */
  const renderOptions = (options, delimiter = '') => {
    return options.map(item => {
      const nestedDelimiter = delimiter + '-' + ' '

      return (
        <React.Fragment key={item._id}>
          <option value={item._id}>{delimiter+' '}{item.title}</option>
          {item.children && renderOptions(item.children, nestedDelimiter)}
        </React.Fragment>
      )
    })
  }

  return (
    <select className="Filter" onChange={onSelect} value={props.value}>
      {renderOptions(props.options)}
    </select>
  )
}

export default React.memo(Filter)

Filter.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func
}

Filter.defaultProps = {
  onChange: () => {}
}