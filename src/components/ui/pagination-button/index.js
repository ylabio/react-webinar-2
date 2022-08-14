import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css';

export const PaginationButton = ({index, setPage, activeIndex}) => {
    const cn = bem('Pagination-button');
    useEffect(() => {
        console.log(activeIndex, index);
    }, [])
    if (activeIndex === index) {
        return (
            <button disabled onClick={() => setPage(index)} className={cn()}>
                {index}
            </button>
        )
    }
    return (
        <button onClick={() => setPage(index)} className={cn()}>
            {index}
        </button>
    )
}