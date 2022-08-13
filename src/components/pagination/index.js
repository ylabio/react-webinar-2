import React, {useCallback, useId} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import useSelector from "../../utils/use-selector";
import './style.css';
import Page from "../item-pagination"

function Pagination(props) {

    console.log("Render Pagination");

    const select = useSelector(state => ({
        currentPage: state.catalog.currentPage,
        pages: state.catalog.paginationList,
    }));

    const cn = bem('Pagination');

    const getPages = () => {

        let pagesWithEllipsis = [];
 
        // если есть разрыв в последовательости страниц - добавляем троеточие
        for (let i = 0; i < select.pages.length; i++) {

            if (select.pages[i] - select.pages[i-1] !== 1 && i !== 0) {
                pagesWithEllipsis.push(<li key={`${i}n`} className={cn('ellipsis')}>...</li>);
            }
            pagesWithEllipsis.push(<Page key={select.pages[i]} 
                                         id={select.pages[i]} 
                                         loadPage={props.loadPage} 
                                         currentPage={select.currentPage} />)
                    
        }

        return pagesWithEllipsis;
    };

  return (
    <ul className={cn()}>
        
        { getPages() }
        
    </ul>
  )
}

Pagination.propTypes = {
    loadPage: propTypes.func.isRequired,
}

Pagination.defaultProps = {
}

export default React.memo(Pagination);

