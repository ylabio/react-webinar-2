import React from "react";
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";



function Pagination(props){

    console.log('Footer');
    const cn = bem('Pagination');
    const prevPage=props.currentPage-1;
    const nextPage=props.currentPage+1;
    const countPages=Math.ceil(props.count / 10);


    return (
        <div className={cn()}>
            <div className={cn('tabs')}>
                {prevPage > 1 &&
                <div className={cn('tab')} onClick={() => props.getItems(1)}>1</div>
                }
                {prevPage>=3 && <div>...</div>}
                {props.currentPage===countPages && <div className={cn('tab')} onClick={()=>props.getItems(countPages-2)}>{countPages-2}</div>}

                {prevPage >=1 &&
                <div className={cn('tab')} onClick={() => props.getItems(prevPage)}>{prevPage}</div>
                }
                <div className={cn('active')}>{props.currentPage}</div>
                {nextPage<=countPages &&
                <div className={cn('tab')} onClick={() => props.getItems(nextPage)}>{nextPage}</div>
                }
                {props.currentPage===1 && <div className={cn('tab')} onClick={()=>props.getItems(3)}>3</div>}
                {nextPage<countPages-1 && <div>...</div>}


                {nextPage < countPages &&
                <div className={cn('tab')}
                     onClick={() => props.getItems(countPages)}>{countPages}</div>
                }
            </div>
        </div>
    )
}

Pagination.propTypes = {
    count: propTypes.number.isRequired,
    getItems:propTypes.func,
    currentPage:propTypes.number
    // prevPage:propTypes.number,
    // nextPage:propTypes.number,
}

Pagination.defaultProps = {

}
export default React.memo(Pagination);