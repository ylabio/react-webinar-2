import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css'

function Button({children, callback}) {
	const cn = bem('Button');

  return (
	<div className={cn()}>
    <button onClick={callback}>
        {children}
    </button>
	</div>
  )
}

Button.propTypes = {
	children: propTypes.node.isRequired,
	callback: propTypes.func.isRequired // Обяхательное свойство - функция
  }
  
Button.defaultProps = {
	callback: () => {} // Значение по умолчанию - функция-заглушка
  }

export default React.memo(Button);
