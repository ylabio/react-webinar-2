import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Navigation(props) {
    const cn = bem('Navigation');

    const [info, setInfo] = useState({
        pagesCount: Math.ceil(props.totalCount / 10),
        page: props.selectedPage,
    });

    useEffect(()=>{
        setInfo({
            ...info,
            pagesCount: Math.ceil(props.totalCount / 10),
            page: props.selectedPage,
        })
    }, [props])

    return (
        <div className={cn()}>
            {info.page > 2 ? <div className={cn("selectable")} onClick={()=>{changePage(1)}}>1</div> : <></>}
            {info.page > 3 ? <div className={cn("separator")}>...</div> : <></>}
            {info.page > info.pagesCount + 1 ? <div className={cn("selectable")} onClick={()=>{changePage(info.page - 2)}}>{info.page - 2}</div> : <></>}
            {info.page == info.pagesCount - 1 ? <div className={cn("selectable")} onClick={()=>{changePage(info.page - 2)}}>{info.page - 2}</div> : <></>}
            {info.page == info.pagesCount ? <div className={cn("selectable")} onClick={()=>{changePage(info.page - 3)}}>{info.page - 3}</div> : <></>}
            {info.page == info.pagesCount ? <div className={cn("selectable")} onClick={()=>{changePage(info.page - 2)}}>{info.page - 2}</div> : <></>}
            {info.page != 1 ? <div className={cn("selectable")} onClick={()=>{changePage(info.page - 1)}}>{info.page - 1}</div> : <></>}
            <div className={cn("selected")}>{info.page}</div>
            {info.page < info.pagesCount + 2 && info.page < info.pagesCount - 1 ? <div className={cn("selectable")} onClick={()=>{changePage(info.page + 1)}}>{info.page + 1}</div> : <></>}
            {info.page < 2 ? <div className={cn("selectable")} onClick={()=>{changePage(info.page + 2)}}>{info.page + 2}</div> : <></>}
            {info.page < info.pagesCount - 2 ? <div className={cn("separator")}>...</div> : <></>}
            {info.page != info.pagesCount ? <div className={cn("selectable")} onClick={()=>{changePage(info.pagesCount)}}>13</div> : <></>}
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
