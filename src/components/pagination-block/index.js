import React, {useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes, { array } from 'prop-types';
import './style.css';
function PaginationBlock({paginate, count}) {

  const cn = bem('PaginationBlock');

    const [number, setNum] = useState(1)

    const arr = []
    
    for(let i = 0; i < Math.round(count / 10); i++) {
        arr.push(i+1)
    }

    const dots = '...'

    const cons = (num) => {
        setNum(num)
        paginate(`${num-1}0`)
    }

    return (
        <div className={cn()}>
            {
                number === 1 || number === 2
                    ? arr.map(item => {
                        if(item < 4) {
                                return (
                                <div className={cn(item === number ? 'active' : 'start')} onClick={() => cons(item)} key={item.toString()}>{item}</div>
                            )
                        } else if(item === arr.length){
                            return (
                                <>
                                    {dots}
                                    <div className={cn(item === number ? 'active' : 'start')}onClick={() => cons(item)} key={item.toString()}>{item}</div>
                                </>
                            )
                        }
                        })
                    : null
            }
            {
                number === 3
                ? arr.map(item => {
                    if(item <= 4 ) {
                            return (
                            <div className={cn(item === number ? 'active' : 'start')} onClick={() => cons(item)} key={item.toString()}>{item}</div>
                        )
                    } else if(item === arr.length){
                        return (
                            <>
                                {dots}
                                <div className={cn(item === number ? 'active' : 'start')}onClick={() => cons(item)} key={item.toString()}>{item}</div>
                            </>
                        )
                    }
                    })
                : null   
            }
            {
                number >=4 && number < arr.length && number - 1 < arr.length
                ? arr.map(item => {
                    if(item === 1 ) {
                        return (
                            <>
                                <div className={cn(item === number ? 'active' : 'start')} onClick={() => cons(item)} key={item.toString()}>{item}</div>{dots}
                            </>
                        )
                    } else if(item === number || (item + 1) === number || (item - 1) === number){
                        return <div className={cn(item === number ? 'active' : 'start')}onClick={() => cons(item)} key={item.toString()}>{item}</div>
                    }else if(item === arr.length){
                        return (
                            <> 
                                {dots}<div className={cn(item === number ? 'active' : 'start')}onClick={() => cons(item)} key={item.toString()}>{item}</div>
                            </>
                        )
                    }
                    })
                : null   
            }
            {
                number === arr.length 
                ? arr.map(item => {
                    if(item === 1 ) {
                        return (
                            <>
                                <div className={cn(item === number ? 'active' : 'start')} onClick={() => cons(item)} key={item.toString()}>{item}</div>{dots}
                            </>
                        )
                    } else if(item === number || (item + 1) === number || (item + 2) === number){
                        return (
                            <div className={cn(item === number ? 'active' : 'start')}onClick={() => cons(item)} key={item.toString()}>{item}</div>
                        )
                    }
                    })
                : null   
            }
        </div>
    )
}

PaginationBlock.propTypes = {
   count: propTypes.number.isRequired,
   paginate: propTypes.func.isRequired
}

PaginationBlock.defaultProps = {
    count: 0,
    paginate: () => {}
}

export default React.memo(PaginationBlock);
