import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import { Link } from "react-router-dom";

function ItmPagination({ id, currentPage }) {
    return (
        <Link to={`/${id}`} className={currentPage === id ? 'Pagination-active' : ''}>
            { id }
        </Link>
    )
};

ItmPagination.propTypes = {
    id: propTypes.number.isRequired,
    currentPage: propTypes.number.isRequired,
}

ItmPagination.defaultProps = {
}

export default React.memo(ItmPagination);