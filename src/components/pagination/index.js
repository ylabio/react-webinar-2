import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './styles.css';

function Pagination(props) {
    let items = [];
    //Общее количество страниц
    const length = Math.ceil(props.count / Math.max(1, props.limit));
    //центральный сегмент (...x-1,x,x+1... || x-1,x,x+1||x(,x+1)... || ...x-1,x,x+1)
    const start = Math.max(props.page - 1, 1);  //x-1 || x
    const end = Math.min(start + 2, length);    //x+1 || x+2

    //первая страница, null=пропуск
    if (start > 1) {
        items.push(1);
        if (start > 2) items.push(null)
    }

    //заполнение центрального сегмента x-1,x,x+1
    for (let page = start; page <= end; page++) items.push(page);

    //последняя страница, null=пропуск
    if (end < length) {
        if (end < length - 1) items.push(null);
        items.push(length)
    }

    const cn = bem('Pagination');

    return (
        <ul className={cn()}>
            {items.map((number, index) => (
                <li key={index}
                    className={cn('item', {active: number === props.page, split: !number})}
                    onClick={()=>props.onChange(number)}
                >
                    {number || '...'}
                </li>
            ))}
        </ul>
    )
}

Pagination.propTypes ={
    page: propTypes.number,
    limit: propTypes.number,
    count: propTypes.number,
};
Pagination.defaultProps = {
    page: 1,        //номер страницы
    limit: 10,      //количество аписей на странице
    count: 99,      //общее количество записей
    onChange: () => {},
};
export default React.memo(Pagination)