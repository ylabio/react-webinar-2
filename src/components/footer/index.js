import React, {useState} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";



function Footer(props){

    console.log('Footer');
    const cn = bem('Footer');
    const [page, setPage] = useState(1);

    const prevPage = page -1 ;
    const nextPage = page+1;

    function setCurrentPage(page){
        setPage(page);
        props.getItems((page-1)*10)
    }


    return (
        <div className={cn()}>
            <div className={cn('tabs')}>
                {prevPage > 1 &&
                    <div className={cn('tab')} onClick={() => setCurrentPage(1)}>1</div>
                }
                {prevPage>=3 && <div>...</div>}
                {page===props.countPages && <div className={cn('tab')} onClick={()=>setCurrentPage(props.countPages-2)}>{props.countPages-2}</div>}

                {prevPage >=1 &&
                    <div className={cn('tab')} onClick={() => setCurrentPage(prevPage)}>{prevPage}</div>
                }
                <div className={cn('active')}>{page}</div>
                {nextPage<=props.countPages &&
                    <div className={cn('tab')} onClick={() => setCurrentPage(nextPage)}>{nextPage}</div>
                }
                {page===1 && <div className={cn('tab')} onClick={()=>setCurrentPage(3)}>3</div>}
                {nextPage<props.countPages-1 && <div>...</div>}


                {nextPage < props.countPages &&
                <div className={cn('tab')}
                     onClick={() => setCurrentPage(props.countPages)}>{props.countPages}</div>
                }
            </div>
        </div>
    )
}

Footer.propTypes = {
    countPages: propTypes.number.isRequired,
    getItems:propTypes.func
}

Footer.defaultProps = {

}
export default React.memo(Footer);