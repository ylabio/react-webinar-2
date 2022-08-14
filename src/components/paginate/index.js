import React from 'react';
import ReactPaginate from 'react-paginate';
import './style.css';



function Pagination(props) {

    return (<ReactPaginate
        pageCount={Math.round(props.totalSum / 10)}
        pageRangeDisplayed={2.1}
        marginPagesDisplayed={1}
        breakLabel="..."
        onPageChange={props.catalogLoad}
        className={"pagination"}
        pageClassName={"pagination-list"}
        previousLabel={""}
        nextLabel={""}
        disabledLinkClassName={"disabled"}
        renderOnZeroPageCount={null}
        activeLinkClassName={'active-pagination'}
    />)
}


export default React.memo(Pagination);