import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function SelectLang(props) {
  const changeLocale = (e) => {
    props.onChange(e.target.value);
    console.log('CHANGE', e.target.value)
  }

  return (
    <div className='select-lang-container'>
      <select
        className='select-lang'
        defaultValue="ru"
        name="select-lang"
        onChange={changeLocale}
      >
        <option value='ruLocale'>ru</option>
        <option value='enLocale'>en</option>
      </select>
    </div>
  )
}

SelectLang.propTypes = {
  onChange: propTypes.func,
}

export default React.memo(SelectLang);
