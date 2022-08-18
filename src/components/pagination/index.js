import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Page from "../item-pagination"

function Pagination(props) {
    const cn = bem('Pagination');

    // возвращает список страниц для отрисовки
    const getPages = () => {
        const countOfPages = Math.ceil(props.totalCount / props.limit);
        let pages = [];
    
        for (let i = 1; i <= countOfPages; i++) {
    
            if (props.currentPage == countOfPages && i >= countOfPages - 2) { pages.push(i) } else
            if ( i == 1 || i == countOfPages) { pages.push(i) } else
            if ((props.currentPage == 1 || props.currentPage == 2)  && i <= 3) { pages.push(i) } else
            if (props.currentPage == 3  && i <= 4) { pages.push(i) } else
            if (i >= props.currentPage - 1 && i <= props.currentPage + 1) { pages.push(i) }
    
        }
    
        return pages;
    };

    // добавляет "..." если прерывается последовательность страниц
    const addEllipsis = () => {

        const pages = getPages()
        let pagesWithEllipsis = [];
 
        for (let i = 0; i < pages.length; i++) {

            if (pages[i] - pages[i-1] !== 1 && i !== 0) {
                pagesWithEllipsis.push(<a key={`${i}n`} className={cn('ellipsis')}>...</a>);
            }
            pagesWithEllipsis.push(<Page key={pages[i]} 
                                         id={pages[i]}
                                         currentPage={props.currentPage} />)
                    
        }

        return pagesWithEllipsis;
    };

  return (
    <ul className={cn()}>
        
        { addEllipsis() }
        
    </ul>
  )
}

Pagination.propTypes = {
    currentPage: propTypes.number.isRequired,
    totalCount: propTypes.number,
    limit: propTypes.number.isRequired,
    page: propTypes.number,
}

Pagination.defaultProps = {
    totalCount: 0,
    page: 1,
}

export default React.memo(Pagination);

