import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "./item";
import "./styles.css";

const Pagination = ({currentPage, totalPages, setCurrentPage}) => {
    const cn = bem('Pagination');
    let pageArr = [];

    const onClick = (e) => {
        setCurrentPage(Number(e.target.innerText))
    }
    if(currentPage === 1) {
        pageArr = [1, 2, 3];
    } else if(currentPage === totalPages) {
        pageArr = [totalPages-2, totalPages-1, totalPages]
    } else {
        pageArr = [currentPage-1, currentPage, currentPage+1]
    }
    return <>
        <div className={cn()}>
                {(!pageArr.includes(1)) ?
                <>
                <Item item={1} onClick={onClick} />
                {currentPage !== 3 ?
                <div className={cn("dots")}> ... </div> :
                <></>}
                </>
                :
                <></>}
                {pageArr.map(page => <Item key={page} item={page} onClick={onClick} current={page === currentPage} />)}
                {(!pageArr.includes(totalPages)) ?
                <>
                {currentPage !== totalPages - 2 ?
                <div className={cn("dots")}> ... </div> :
                <></>}
                <Item item={totalPages} onClick={onClick} />
                </>
                :
                <></>}
        </div>
    </>
}

Pagination.propTypes = {
    currentPage: propTypes.number,
    totalPages: propTypes.number,
    setCurrentPages: propTypes.func
}

export default React.memo(Pagination);