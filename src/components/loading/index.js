import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const Loading = () => {
    const cn = bem('Loading');
    return (
        <div className={cn('wrapper')}>
            <p>
                Загрузка
            </p>
        </div>
    );
};

export default Loading;