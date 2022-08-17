import React, {useMemo} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'
import propTypes from "prop-types";

function Pagination({pages, currentPage,setCurrentPage,updateCatalog})  {

    const cn = bem('Pagination');
    return (
        <div className={cn()}>
            <div className={cn('content')}>
                {
                    pages.map((p) => {
                        return <span key={p} onClick={() => {
                            setCurrentPage(p)
                            updateCatalog(10, p * 10 - 10 )
                        }

                        } className={cn(currentPage === p ? 'content--item--active' : 'content--item')}>
                            {p}
                        </span>
                    })
                }
            </div>
        </div>
    );
};


Pagination.propTypes = {
    pages: propTypes.array,
    currentPage: propTypes.number,
    setCurrentPage: propTypes.func,
    updateCatalog: propTypes.func

}

export default React.memo(Pagination)