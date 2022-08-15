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
        pages: state.catalog.paginationList,
    }));

    const cn = bem('Pagination');

    useEffect(() => {
        props.loadPage(+page)
    }, [page, props.loadPage])

    const getPages = () => {

        let pagesWithEllipsis = [];
 
        // если прерывается последовательность страниц - добавляем троеточие
        for (let i = 0; i < select.pages.length; i++) {

            if (select.pages[i] - select.pages[i-1] !== 1 && i !== 0) {
                pagesWithEllipsis.push(<a key={`${i}n`} className={cn('ellipsis')}>...</a>);
            }
            pagesWithEllipsis.push(<Page key={select.pages[i]} 
                                         id={select.pages[i]}
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

