import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Button({children, onClick}){
	const cn = bem('Button');

	return (
		<>
            <button className={cn()} onClick={onClick}>
                {children}
            </button>
        </>
	)
}

Button.propTypes = {
    children: propTypes.node,
    onClick: propTypes.func.isRequired,
}

Button.defaultProps = {
    onClick: () => {}
}

export default React.memo(Button);
