import React from 'react';
import counterBtn from '../../utils/counter-btn';
import './style.css';
import { useCallback } from 'react';




function Pagination(props) {

    const totalCount = Math.round(props.totalSum / 10);

    const pages = [];


    const pageTransfer = useCallback(e => counterBtn(e, props.catalogLoad), [])

    for (let page = 0; page < totalCount; page++) {
        pages.push(page)
    }




    return (<div className='btn-container'>
        {pages.map(page => {
            let className;
            if (page === 0 || page === totalCount - 1 || page === 1) className = "showAlways";
            else className = "";

            if (page === 0 && props.position === 0) className = "showAlways Active";
            if (page === 2 && props.position < 40) className = "showAlways ";

            if (props.position > 20 && page === 1) return (<span className='points'>...</span>)
            if (props.position < 90 && page === 11) return (<span className='points'>...</span>)
            return (<button className={`page- ${className}`} onClick={pageTransfer} key={page} data-selected={page}>{page + 1}</button>)
        })}
    </div>)




    // // return (<ReactPaginate
    // //     pageCount={Math.round(props.totalSum / 10)}
    // //     pageRangeDisplayed={2.1}
    // //     marginPagesDisplayed={1}
    // //     breakLabel="..."
    // //     onPageChange={props.catalogLoad}
    // //     className={"pagination"}
    // //     pageClassName={"pagination-list"}
    // //     previousLabel={""}
    // //     nextLabel={""}
    // //     disabledLinkClassName={"disabled"}
    // //     renderOnZeroPageCount={null}
    // //     activeLinkClassName={'active-pagination'}
    // />)
}


export default React.memo(Pagination);