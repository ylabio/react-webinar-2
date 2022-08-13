import React, { useState } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { useEffect } from 'react';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Navigation(props) {
    const cn = bem('Navigation');

    const store = useStore();
    
    const select = useSelector(state => ({
        pagesCount: state.catalog.navigationPagesCount,
        page: state.catalog.navigationPageSelected,
    }));

    return (
        <div className={cn()}>
            {select.page > 2 ? <div className={cn("selectable")} onClick={()=>{changePage(1)}}>1</div> : <></>}
            {select.page > 3 ? <div className={cn("separator")}>...</div> : <></>}
            {select.page > select.pagesCount + 1 ? <div className={cn("selectable")} onClick={()=>{changePage(select.page - 2)}}>{select.page - 2}</div> : <></>}
            {select.page == select.pagesCount - 1 ? <div className={cn("selectable")} onClick={()=>{changePage(select.page - 2)}}>{select.page - 2}</div> : <></>}
            {select.page == select.pagesCount ? <div className={cn("selectable")} onClick={()=>{changePage(select.page - 3)}}>{select.page - 3}</div> : <></>}
            {select.page == select.pagesCount ? <div className={cn("selectable")} onClick={()=>{changePage(select.page - 2)}}>{select.page - 2}</div> : <></>}
            {select.page != 1 ? <div className={cn("selectable")} onClick={()=>{changePage(select.page - 1)}}>{select.page - 1}</div> : <></>}
            <div className={cn("selected")}>{select.page}</div>
            {select.page < select.pagesCount + 2 && select.page < select.pagesCount - 1 ? <div className={cn("selectable")} onClick={()=>{changePage(select.page + 1)}}>{select.page + 1}</div> : <></>}
            {select.page < 2 ? <div className={cn("selectable")} onClick={()=>{changePage(select.page + 2)}}>{select.page + 2}</div> : <></>}
            {select.page < select.pagesCount - 2 ? <div className={cn("separator")}>...</div> : <></>}
            {select.page != select.pagesCount ? <div className={cn("selectable")} onClick={()=>{changePage(select.pagesCount)}}>13</div> : <></>}
        </div>
    )

    function changePage(pageNumber){
        props.onChangePage(pageNumber)
    }
}

Navigation.propTypes = {
    page: propTypes.number.isRequired,
    pagesCount: propTypes.number.isRequired,
}

Navigation.defaultProps = {
    page: 1,
    pagesCount: 1,
}

export default React.memo(Navigation);
