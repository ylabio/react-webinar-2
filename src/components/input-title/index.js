import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css'

function InputTitle(props){

    const cn = bem('InputTitle')

    return(
        <div className={cn()}>{props.title}</div>
    )
}

export default React.memo(InputTitle)