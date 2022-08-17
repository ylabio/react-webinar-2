import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'

const HeaderWrapper = ({children}) => {
    const cn = bem('HeaderWrapper');
    return (
        <div className={cn()}>
            {children}
        </div>
    );
};

export default HeaderWrapper;