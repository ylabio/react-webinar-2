import React, { useCallback } from 'react'
import './styles.css'

function Languages({langs, onClick}) {
  const callbacks = {
    onChangeLang: useCallback((lang) => onClick(lang), [langs, onClick])
  }

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

export default React.memo(Languages)