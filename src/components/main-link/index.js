import React from 'react';

import {Link} from 'react-router-dom';

import {cn as bem} from "@bem-react/classname";

import './style.css';

const cn = bem('MainLink');

function Menu(){

//const [main, setMain] = React.useState(true);

return (   
<Link to="/" className={cn('mainLink')}>Главная</Link>
)
}

export default React.memo(Menu);