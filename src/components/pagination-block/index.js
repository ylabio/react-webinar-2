import React, {useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes, { array } from 'prop-types';
import './style.css';
function PaginationBlock({paginate, count, num, getNum}) {

  const cn = bem('PaginationBlock');

    const [number, setNum] = useState(num)

    const arr = []
    
    for(let i = 0; i < Math.round(count / 10); i++) {
        arr.push(i+1)
    }

    const dots = '...'

    const cons = (num) => {
        setNum(num)
        paginate(`${num-1}0`)
        getNum(num)
    }

    const pagNum = (item) => (<span className={cn(item === number ? 'active' : 'start')}onClick={() => cons(item)}>{item}</span>)

    return (
        <div className={cn()}>
            {
                arr && arr.map(item => {
                    return (
                        <span key={item}>

                            {item === 1 ? pagNum(item) : null}

                            {number === 1 && item === 3? <>{pagNum(item)} {dots}</>  : null}

                            {number === 3 && item === 4? <>{pagNum(item)} {dots}</> : null}

                            {(number - 1) === item && item !== 1 && item !== 13 && number !== 1? number  !==3 &&  number !== arr.length  ? <>{dots} {pagNum(item)}</>  : pagNum(item) : null}

                            {number === item && item !== 1 && item !== arr.length ? pagNum(item) : null}

                            {(number + 1) === item && item !== 1 && item !== 4 && item !== 13 ? number  !==1 ? <>{pagNum(item)} {dots}</>: pagNum(item) : null}

                            {number === arr.length && item === number - 2 ? <>{dots} {pagNum(item)}</> : null}

                            {item === arr.length ? pagNum(item) : null}

                        </span>
                       
                    )
                })
            }
        </div>
    )
}

PaginationBlock.propTypes = {
   count: propTypes.number.isRequired,
   paginate: propTypes.func.isRequired,
   num: propTypes.number
}

PaginationBlock.defaultProps = {
    count: 0,
    num: 1,
    paginate: () => {}
}

export default React.memo(PaginationBlock);
