import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'

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


export default React.memo(Pagination)