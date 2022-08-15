import React from "react";
import propTypes from 'prop-types';
import './style.css'
import {cn as bem} from "@bem-react/classname";
import PaginationItem from "../pagination-item";

function PaginationBar(props){
    const cn = bem('PagimationBar');

    return(
        <div className={cn()}>
        {Array.isArray(props.pagination)
          ? props.pagination.map((item, index) => <PaginationItem content={item} onChangePage={props.onChangePage} selected={props.selected} key={index}/>)
          : <>Loading...</>
        }
        </div>
    )
}



export default React.memo(PaginationBar)