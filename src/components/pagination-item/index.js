import React, { useRef } from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import { Link } from "react-router-dom";

function PaginationItem({content, selected}){
    const cn = bem('ItemPaginate');

    return (
        <div>
          {content === '...' 
            ? <div className={cn(null, ['Dots'])}>{content}</div> 
            : <div 
              className={selected === content? cn(null, ['Selected']) : cn()}>
              <Link to={`/?page=${content}`}>{content}</Link></div>
          }
        </div>    
    )
}

export default React.memo(PaginationItem)