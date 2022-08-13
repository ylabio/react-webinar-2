import React, {useCallback} from 'react';
import propTypes from 'prop-types';

function ItmPagination({ id, loadPage, currentPage }) {

    const callbacks = {
        clickPageHandler: useCallback(() => loadPage(id), [loadPage, id])
    };

    return (
        <li onClick={callbacks.clickPageHandler} 
            className={currentPage === id ? 'Pagination-active' : ''}>
                { id }
        </li>
    )
};

ItmPagination.propTypes = {
    id: propTypes.number.isRequired,
    currentPage: propTypes.number.isRequired,
    loadPage: propTypes.func.isRequired,
}

ItmPagination.defaultProps = {
}

export default React.memo(ItmPagination);