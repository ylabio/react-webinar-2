import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination({count, itemLimit, selectPage, currentPage}) {

    const cn = bem('Pagination')
    let pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(count / itemLimit) - 1; i++) {
    //     pageNumbers.push(i)
    // }

    const pageCount = Math.ceil(count / itemLimit) 
    const dots = '...'

    
    if (currentPage === 1) {
        pageNumbers = [currentPage, currentPage + 1, currentPage + 2, dots, pageCount];
    }

    if (currentPage === 2) {
        pageNumbers = [currentPage - 1, currentPage, currentPage + 1, dots, pageCount];
    }

    if (currentPage === 3) {
        pageNumbers = [currentPage -2, currentPage - 1, currentPage, currentPage + 1, dots, pageCount];
    }

    if (currentPage > 3 ) {
        pageNumbers = [1, dots, currentPage - 1, currentPage, currentPage + 1, dots, pageCount];
    }

    if (currentPage === pageCount - 2 ) {
        pageNumbers = [1, dots, currentPage - 1, currentPage, currentPage + 1, pageCount];
    }

    if (currentPage === pageCount - 1 ) {
        pageNumbers = [1, dots, currentPage - 1, currentPage, pageCount];
    }

    if (currentPage === pageCount) {
        pageNumbers = [1, dots, currentPage - 2, currentPage - 1, currentPage]
    }

    return(
        <div className={cn()}>
            <ul className={cn('list')}>
                {pageNumbers.map((number, i) => (
                    typeof number === 'number' ?
                    <li className={cn(number === currentPage ? 'number-active' : 'number')} key={i} value={number} onClick={(e) => selectPage(e.target.value)}>
                        {number}
                    </li> :
                    <li className={cn('dots')} key={i}>
                        {number}
                    </li> 
                )) }
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    count: propTypes.number.isRequired,
    itemLimit: propTypes.number.isRequired,
    selectPage: propTypes.func.isRequired,
    currentPage: propTypes.number.isRequired
  }
  


export default React.memo(Pagination)