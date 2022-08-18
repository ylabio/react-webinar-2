import React from 'react';
import propTypes from 'prop-types';
import { Link } from "react-router-dom";

function ItemPagination({ id, currentPage }) {
    return (
        <Link to={`/${id}`} className={currentPage === id ? 'Pagination-active' : ''}>
            { id }
        </Link>
    )
};

ItemPagination.propTypes = {
    id: propTypes.number.isRequired,
    currentPage: propTypes.number.isRequired,
}

ItemPagination.defaultProps = {
}

export default React.memo(ItemPagination);