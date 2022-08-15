import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import "./style.css"
import { getPagesLength } from "../../api";

function Pagination(){

    const [numberArr , setNumberArr] = useState([]);

    useEffect(() => {
      getPagesLength().then((data) =>{
        let count = 0;
        if(data.result.count % 10){
          count = parseInt(data.result.count/10 + 1)
        }else{
          count = data.result.count/10
        }
        const arr = []
        for(let i = 1 ; i <= count ; i++){
        arr.push(i)
        }  
        setNumberArr(arr);          
        }
      )
    },[]);

    const cn = bem('Pagination');
    const navigate = useNavigate();
    const params = useParams();

    const handleClick = (e) => {
        navigate(`/${e.target.value}`)
    }

    if(!params.pageNumber || params.pageNumber == 1){
        return(
            <div className={cn()}>
              <button className={cn('btn selected')} value={1} onClick={(e)=>handleClick(e)}>1</button>
              <button className={cn('btn')} value={numberArr[1]} onClick={(e)=>handleClick(e)}>{numberArr[1]}</button>
              <button className={cn('btn')} value={numberArr[2]} onClick={(e)=>handleClick(e)}>{numberArr[2]}</button>
              <span className={cn('ellipsis')}>...</span>
              <button className={cn('btn')} value={numberArr[numberArr.length-1]} onClick={(e)=>handleClick(e)}>{numberArr.length}</button>
            </div>
        )
    }else if(params.pageNumber == 2){
        return(
            <div className={cn()}>
              <button className={cn('btn')} value={1} onClick={(e)=>handleClick(e)}>1</button>
              <button className={cn('btn selected')} value={numberArr[1]} onClick={(e)=>handleClick(e)}>{numberArr[1]}</button>
              <button className={cn('btn')} value={numberArr[2]} onClick={(e)=>handleClick(e)}>{numberArr[2]}</button>
              <span className={cn('ellipsis')}>...</span>
              <button className={cn('btn')} value={numberArr[numberArr.length-1]} onClick={(e)=>handleClick(e)}>{numberArr.length}</button>
            </div>
        )
    }else if(params.pageNumber == 3){
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
                if(item == Number(params.pageNumber)-1 || item == params.pageNumber || item == Number(params.pageNumber)+1 ){
                    if(item == params.pageNumber){
                        return <button className={cn('btn selected')} value={item} onClick={(e)=>handleClick(e)} key={item}>{item}</button>
                    }else {
                        return <button className={cn('btn')} value={item} onClick={(e)=>handleClick(e)} key={item}>{item}</button>
                    }
                }
              })}
              {params.pageNumber != numberArr.length-1 && params.pageNumber != numberArr.length && <span className={cn('ellipsis')}>...</span>}
              {params.pageNumber != numberArr.length-1 && params.pageNumber != numberArr.length &&<button className={cn('btn')} value={numberArr[numberArr.length-1]} onClick={(e)=>handleClick(e)}>{numberArr.length}</button>}
            </div>

            )
        }
    
}

export default React.memo(Pagination)

/*
return(
        <div className={cn()}>
            {numberArr.map((item , index) => {
                if(item == params.pageNumber){
                    return <button className={cn('btn selected')} value={item} onClick={(e)=>handleClick(e)} key={index}>{item}</button>
                }
               return <button className={cn('btn')} value={item} onClick={(e)=>handleClick(e)} key={index}>{item}</button>
            })}
        </div>
    )
    */