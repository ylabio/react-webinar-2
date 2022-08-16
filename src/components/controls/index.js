import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import './style.css';

function Controls({children}){
	const cn = bem('Controls');

  return (
    <div className='Controls'>
      <div className={cn('link')}>
				<Link to="/">Главная</Link>
			</div>

			{children}
    </div>
  )
}

Controls.propTypes = {
}

Controls.defaultProps = {
}

export default React.memo(Controls);
