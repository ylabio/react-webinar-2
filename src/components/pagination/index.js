import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import item from "../item";
import propTypes from "prop-types";

const getPageNumbers = (pageCount, currentPage) => {
    const pageNumbers = [];
    const possiblePageNumbers = [0, pageCount - 1, currentPage - 1, currentPage, currentPage + 1];
    for (let i = 0; i < pageCount; i++) {
        if (possiblePageNumbers.includes(i)) {
            pageNumbers.push(i)
        }
    }
    return pageNumbers;
}

function Pagination ({onChange, pageCount, currentPage}) {
    const cn = bem('Pagination');

    return (
        <ul className={cn()}>
            {getPageNumbers(pageCount, currentPage).map((pageNumber, index, allPages) => {
                return (
                    <React.Fragment key={pageNumber}>
                      <li>
                          <a
                            className={cn('item', {active: pageNumber === currentPage})}
                            key={pageNumber}
                            onClick={() => onChange(pageNumber)}
                          >{pageNumber + 1}</a>
                      </li>
                      {index < allPages.length && allPages[index + 1] > (pageNumber + 1) && (
                        <li className={cn('three-dots')} key={'dots-' + pageNumber}>...</li>
                      )}
                  </React.Fragment>
                )
            })}
        </ul>
    )
}

Pagination.propTypes = {
    onChange: propTypes.func.isRequired,
    pageCount: propTypes.number.isRequired,
    currentPage: propTypes.number.isRequired
}


export default React.memo(Pagination);
