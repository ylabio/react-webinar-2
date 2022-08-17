import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'
import propTypes from "prop-types";

const Pagination = ({count, pagination, currentPage}) => {
    const cn = bem('pagination');
    const pages = []
    // в рамках данного задания нет необходимости выносить переменную limit так как пользователь не может
    // с ней взаимодействовать

    const lastPage = Math.ceil(count / 10)

    const dots = '...'

    if (currentPage < 3 ) {
        for (let i = 1; i < 4; i++) {
            pages.push(i)
        }
        pages.push(dots)
        pages.push(lastPage)
    }
if( currentPage === 3) {
    for (let i = 1; i <=4; i++) {
        pages.push(i)
    }
    pages.push(dots)
    pages.push(lastPage)
}

    if (currentPage > 3 && currentPage < 12) {
        pages.push(1)
        pages.push(dots)
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pages.push(i)
            }
            pages.push(dots)
        pages.push(lastPage)

    }
    if (currentPage >= 12) {
            pages.push(1)
        pages.push(dots)
            for (let i = lastPage - 2; i<= lastPage; i++) {
                pages.push(i)
            }
    }


    return (
        <div>
            <ul className={cn()}>
                {pages.map((page, index) => {
                    return(

                    <li key={index}>{page !== '...' ? <button className={cn(currentPage === page ? 'active' : 'not-active')} onClick={()=>pagination({page })}>{page}</button> : <span>{page}</span>}</li>

                    )
                })}
            </ul>

        </div>
    );
};

Pagination.propTypes = {
    count: propTypes.number,
    pagination: propTypes.func,
    currentPage: propTypes.number
}

Pagination.defaultProps = {
    count: 0,
    pagination: ()=> {},
    currentPage: 1
}

export default React.memo(Pagination);