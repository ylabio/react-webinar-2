import React, { useRef } from "react";
import './style.css';
import {cn as bem, cn} from "@bem-react/classname";

function PaginationItem({content, onChangePage, selected}){
    const cn = bem('ItemPaginate');

    return (
        <div>
          {content === '...' 
            ? <div className={cn(null, ['Dots'])}>{content}</div> 
            : <div className={selected === content? cn(null, ['Selected']) : cn()} onClick={() => onChangePage(content)}><a href='#'>{content}</a></div>
          }
        </div>    
    )
}

export default React.memo(PaginationItem)