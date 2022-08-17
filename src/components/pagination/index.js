import React, {useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import PropTypes from 'prop-types';
import "./styles.css";

function Pagination({itemsCount, pageSize, onPageChange, currentPage}) {
    const cn = bem('Pagination');

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const renderBtn = useCallback(() => {
        return pages.map(page => {
            if (page === 1 && currentPage > 2) {
                return (
                    <div key={page}>
                        <button
                            className={cn('btn') + ' ' + (page === currentPage ? cn('active') : "")}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                        <span>...</span>
                    </div>
                )
            } else if ((page - currentPage) <= 1 && (currentPage - page) <= 1) {
                return (
                    <button
                        key={page}
                        className={cn('btn') + ' ' + (page === currentPage ? cn('active') : "")}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            } else if (page === pages.length) {
                return (
                    <div key={page}>
                        <span>...</span>
                        <button
                            className={cn('btn') + ' ' + (page === currentPage ? cn('active') : "")}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </div>
                )
            }
        })
    }, [pages, currentPage])

    return (
        <div className={cn()}>{renderBtn()}</div>
    )
}

Pagination.propTypes = {
    itemsCount: PropTypes.number,
    pageSize: PropTypes.number,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number,
}

export default React.memo(Pagination);