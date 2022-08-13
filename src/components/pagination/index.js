import React, {useCallback, useId} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import useSelector from "../../utils/use-selector";
import './style.css';

function Pagination(props) {

    const select = useSelector(state => ({
        totalCount: state.catalog.totalCount,
        currentPage: state.catalog.currentPage,
        limit: state.catalog.limit
    }));

    const cn = bem('Pagination');

    const callbacks = {
        addPage: (id) => pagesWithEllipsis.push(
            <li onClick={() => props.loadPage(id)} 
                className={select.currentPage === id ? cn('active') : ''} 
                key={id}
            >{id}</li>),
        addEllipsis: (id) => pagesWithEllipsis.push(
            <li key={id} className={cn('ellipsis')} >...</li>)
    };

    const countOfPages = Math.ceil(select.totalCount / select.limit);

    let pages = [];
    let pagesWithEllipsis = [];

    const getPages = () => {

        for (let i = 1; i <= countOfPages; i++) {

            if (select.currentPage == countOfPages && i >= countOfPages - 2) { pages.push(i) } else
            if ( i == 1 || i == countOfPages) { pages.push(i) } else
            if ((select.currentPage == 1 || select.currentPage == 2)  && i <= 3) { pages.push(i) } else
            if (select.currentPage == 3  && i <= 4) { pages.push(i) } else
            if (i >= select.currentPage - 1 && i <= select.currentPage + 1) { pages.push(i) }

        }

        for (let i = 0; i < pages.length; i++) {

            if (pages[i] - 1 !== pages[i-1] && pages[i] - 1 !== 0) {
                callbacks.addEllipsis(`${i}n`);
            }
            callbacks.addPage(pages[i])
                    
        }

        return pagesWithEllipsis;
    };

  return (
    <div className={cn()}>
        
        { getPages() }
        
    </div>
  )
}

Pagination.propTypes = {
    loadPage: propTypes.func.isRequired,
}

Pagination.defaultProps = {
}

export default React.memo(Pagination);
