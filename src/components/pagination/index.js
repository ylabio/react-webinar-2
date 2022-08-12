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

//   const callbacks = {
//     clickPageHandler: useCallback((e) => props.loadPage(props.item._id), [props.onAdd, props.item])
//   };

    const countOfPages = Math.ceil(select.totalCount / select.limit);

    const getPages = () => {
        let pages = [];

        for (let i = 1; i <= countOfPages; i++) {

            if (select.currentPage == countOfPages && i >= countOfPages - 2) { pages.push(i) } else
            if ( i == 1 || i == countOfPages) { pages.push(i) } else
            if ((select.currentPage == 1 || select.currentPage == 2)  && i <= 3) { pages.push(i) } else
            if (select.currentPage == 3  && i <= 4) { pages.push(i) } else
            if (i >= select.currentPage - 1 && i <= select.currentPage + 1) { pages.push(i) }

        }

        let pagesWithEllipsis = [];

        const addPage = (id) => pagesWithEllipsis.push(
            <li onClick={() => props.loadPage(id)} 
                className={select.currentPage === id ? cn('active') : ''} 
                key={id}
            >{id}</li>);
        

        const addEllipsis = (id) => pagesWithEllipsis.push(
            <li key={id}
                className={cn('ellipsis')} >...</li>);

        
        for (let i = 0; i < pages.length; i++) {

            if (pages[i] - 1 !== pages[i-1] && pages[i] - 1 !== 0) {
                addEllipsis(`${i}n`);
            }
            addPage(pages[i])
                    
        }

        console.log("pagesWithEllipsis: ", pagesWithEllipsis);

        return pagesWithEllipsis;
    };

  return (
    <div className={cn()}>
        
        { getPages() }
        
    </div>
  )
}

Pagination.propTypes = {
//   onAdd: propTypes.func,
}

Pagination.defaultProps = {
}

export default React.memo(Pagination);
