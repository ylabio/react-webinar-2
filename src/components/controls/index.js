import React from 'react'
import propTypes from 'prop-types'
import './style.css'

function Controls({ clickHandler, title }) {
  return (
    <div className='Controls'>
      <button onClick={clickHandler}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
  clickHandler: propTypes.func.isRequired, // Обязательное свойство - функция
  title: propTypes.string.isRequired,
}

Controls.defaultProps = {
  onClick: () => {}, // Значение по умолчанию - функция-заглушка
  title: 'Нажми',
}

export default React.memo(Controls)
