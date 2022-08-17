import propTypes from 'prop-types'
import React from 'react'
import './styles.css'

function Languages({langs, onClick}) {

  // Здесь был callbacks, но что-то пошло не так

  return (
    <div className='Languages'>
      {langs.map(el => 
        <div className="Languages-lang" 
             onClick={() => onClick(el)} 
            key={el}>
              {el}
        </div>
      )}
    </div>
  )
}

Languages.propTypes = {
  langs: propTypes.arrayOf(propTypes.string).isRequired,
  onClick: propTypes.func
}

Languages.defaultProps = {
  onClick: () => {}
}

export default React.memo(Languages)