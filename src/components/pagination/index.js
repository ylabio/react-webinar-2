import React, {useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom"; 
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import useSelector from "../../utils/use-selector";
import './style.css';
import Page from "../item-pagination"

function Pagination(props) {

    const page = useParams().page;

    const select = useSelector(state => ({
        currentPage: state.catalog.currentPage,
        totalCount: state.catalog.totalCount, 
        limit: state.catalog.limit,
    }));

    const cn = bem('Pagination');

    useEffect(() => {
        props.loadPage(+page)
    }, [page, props.loadPage])

    // возвращает список страниц для отрисовки
    const getPages = () => {
        const countOfPages = Math.ceil(select.totalCount / select.limit);
        let pages = [];
    
        for (let i = 1; i <= countOfPages; i++) {
    
            if (select.currentPage == countOfPages && i >= countOfPages - 2) { pages.push(i) } else
            if ( i == 1 || i == countOfPages) { pages.push(i) } else
            if ((select.currentPage == 1 || select.currentPage == 2)  && i <= 3) { pages.push(i) } else
            if (select.currentPage == 3  && i <= 4) { pages.push(i) } else
            if (i >= select.currentPage - 1 && i <= select.currentPage + 1) { pages.push(i) }
    
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
                                         currentPage={select.currentPage} />)
                    
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
    loadPage: propTypes.func.isRequired,
}

Pagination.defaultProps = {
}

export default React.memo(Pagination);

