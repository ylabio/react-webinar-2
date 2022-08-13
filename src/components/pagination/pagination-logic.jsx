import React from 'react';
import cls from './pagination.module.css'
const PaginationLogic = ({ pagesCount, page, changePage }) => {
  return (
    <div className={cls.pagination}>
      {page > 2 ? <div className={cls.selectable} onClick={() => { changePage(1) }}>1</div> : <></>}
      {page > 3 ? <div className={cls.separator}>...</div> : <></>}
      {page > pagesCount + 1 ? <div className={cls.selectable} onClick={() => { changePage(page - 2) }}>{page - 2}</div> : <></>}
      {page == pagesCount - 1 ? <div className={cls.selectable} onClick={() => { changePage(page - 2) }}>{page - 2}</div> : <></>}
      {page == pagesCount ? <div className={cls.selectable} onClick={() => { changePage(page - 3) }}>{page - 3}</div> : <></>}
      {page == pagesCount ? <div className={cls.selectable} onClick={() => { changePage(page - 2) }}>{page - 2}</div> : <></>}
      {page != 1 ? <div className={cls.selectable} onClick={() => { changePage(page - 1) }}>{page - 1}</div> : <></>}
      <div className={cls.selected}>{page}</div>
      {page < pagesCount + 2 && page < pagesCount - 1 ? <div className={cls.selectable} onClick={() => { changePage(page + 1) }}>{page + 1}</div> : <></>}
      {page < 2 ? <div className={cls.selectable} onClick={() => { changePage(page + 2) }}>{page + 2}</div> : <></>}
      {page < pagesCount - 2 ? <div className={cls.separator}>...</div> : <></>}
      {page != pagesCount ? <div className={cls.selectable} onClick={() => { changePage(pagesCount) }}>13</div> : <></>}
    </div>
  );
}

export default PaginationLogic;
