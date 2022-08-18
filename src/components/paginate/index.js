import React, { Fragment } from 'react';
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



    return (<div key="324" className='btn-container'>
        {pages.map((page, index) => {
            let className;
            if (page === 0 || page === totalCount - 1) className = "showAlways";
            else className = "";


            if (page === 1 || page === 2 || page === 2 && props.position === 10) className = "Next"
            if (page === 0 && props.position === 0) className = "showAlways Active";
            if (props.position > 20 && page === 1) return (<span key={index + 128} className='points'>...</span>)
            if (props.position < 100 && page === 12) return (<Fragment key={index + 64}><span key={index + 256} className='points'>...</span><button key={index + Math.PI} className={`page- showAlways`} onClick={pageTransfer} data-selected={page}>{page + 1}</button></Fragment>)
            return (<button key={index} className={`page- ${className}`} onClick={pageTransfer} data-selected={page}>{page + 1}</button>)
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