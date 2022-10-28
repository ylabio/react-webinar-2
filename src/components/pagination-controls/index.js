import React from "react";
import "./style.css"
import {cn as bem} from "@bem-react/classname";

function PaginationControls({pageNumber , callback , numberArr}){
  
    const cn = bem('PaginationControls');

    const handleClick = (e) => {
        callback(`/${e.target.value}`)
    }

    if(!pageNumber || pageNumber == 1){
        return(
            <div className={cn()}>
              <button className={cn('btn selected')} value={1} onClick={(e)=>handleClick(e)}>1</button>
              <button className={cn('btn')} value={numberArr[1]} onClick={(e)=>handleClick(e)}>{numberArr[1]}</button>
              <button className={cn('btn')} value={numberArr[2]} onClick={(e)=>handleClick(e)}>{numberArr[2]}</button>
              <span className={cn('ellipsis')}>...</span>
              <button className={cn('btn')} value={numberArr[numberArr.length-1]} onClick={(e)=>handleClick(e)}>{numberArr.length}</button>
            </div>
        )
    }else if(pageNumber == 2){
        return(
            <div className={cn()}>
              <button className={cn('btn')} value={1} onClick={(e)=>handleClick(e)}>1</button>
              <button className={cn('btn selected')} value={numberArr[1]} onClick={(e)=>handleClick(e)}>{numberArr[1]}</button>
              <button className={cn('btn')} value={numberArr[2]} onClick={(e)=>handleClick(e)}>{numberArr[2]}</button>
              <span className={cn('ellipsis')}>...</span>
              <button className={cn('btn')} value={numberArr[numberArr.length-1]} onClick={(e)=>handleClick(e)}>{numberArr.length}</button>
            </div>
        )
    }else if(pageNumber == 3){
        return(
            <div className={cn()}>
              <button className={cn('btn')} value={1} onClick={(e)=>handleClick(e)}>1</button>
              <button className={cn('btn ')} value={numberArr[1]} onClick={(e)=>handleClick(e)}>{numberArr[1]}</button>
              <button className={cn('btn selected')} value={numberArr[2]} onClick={(e)=>handleClick(e)}>{numberArr[2]}</button>
              <button className={cn('btn ')} value={numberArr[3]} onClick={(e)=>handleClick(e)}>{numberArr[3]}</button>
              <span className={cn('ellipsis')}>...</span>
              <button className={cn('btn')} value={numberArr[numberArr.length-1]} onClick={(e)=>handleClick(e)}>{numberArr.length}</button>
            </div>
        )}else {
            return(
            <div className={cn()}>
                <button className={cn('btn')} value={1} onClick={(e)=>handleClick(e)}>1</button>
                <span className={cn('ellipsis')}>...</span>
              {numberArr.map((item) => {
                if(item == Number(pageNumber)-1 || item == pageNumber || item == Number(pageNumber)+1 ){
                    if(item == pageNumber){
                        return <button className={cn('btn selected')} value={item} onClick={(e)=>handleClick(e)} key={item}>{item}</button>
                    }else {
                        return <button className={cn('btn')} value={item} onClick={(e)=>handleClick(e)} key={item}>{item}</button>
                    }
                }
              })}
              {pageNumber != numberArr.length-1 && pageNumber != numberArr.length && <span className={cn('ellipsis')}>...</span>}
              {pageNumber != numberArr.length-1 && pageNumber != numberArr.length &&<button className={cn('btn')} value={numberArr[numberArr.length-1]} onClick={(e)=>handleClick(e)}>{numberArr.length}</button>}
            </div>

            )
        }

}

export default React.memo(PaginationControls)