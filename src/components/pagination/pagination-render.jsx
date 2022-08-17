import React from 'react';
import cn from 'classnames';
import cls from './pagination.module.css'
export const PaginationRender = ({ paginationRange,currentPage,changePage}) => {
  return (
    <ul className={cls.pagination}>
       {
         paginationRange.map((page, index) => {
           if (page === '...') {
             return <li key={`${page}${index}`}>{page}</li>;
           }
           return (
             <li className={cn({ [cls.selected]: currentPage === page }, cls.selectable)} key={page} 
                 onClick={() => changePage(page)}>
               {page}
             </li>
           )
         })
       }
     </ul>
  );
}


