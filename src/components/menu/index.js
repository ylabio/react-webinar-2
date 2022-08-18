import propTypes from 'prop-types';
import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';

function Menu({text, onSetPage}){
   return( <Link to={'/'} onClick={onSetPage} className="link"> 
    {text.home}  
    </Link>); 
}

Menu.propTypes = {
    text: propTypes.object.isRequired,
    onSetPage: propTypes.func.isRequired
};

Menu.defaultProps = {
    text:"Main",
    onSetPage:()=>{}
};


export default React.memo(Menu);