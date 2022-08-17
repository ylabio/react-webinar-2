import React, { useMemo } from 'react';
import "./style.css"
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import PaginationItem from '../pagination-item';

function Pagination({ totalPages, pageId, callback }) {
  const pages = useMemo(
    () =>
      Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ),
    [totalPages]
  );
  const cn = bem('Pagination');
  return (
    <div className={cn('wrapper')}>
      {
        pages.map((value) => {
          if (value == pageId) { return (<PaginationItem key={value} value={value} state={"active"} />) }
          else if (value === pages[0] || value === pages.length) { return (<PaginationItem key={value} value={value} state={"static"} changePage={callback} />) }
          else if (pageId <= 3 && value < 3) { return (<PaginationItem key={value} value={value} state={"static"} changePage={callback} />) }
          else if (pageId <= 3 && value === 3) { if (pages.length !== 4) { return (<PaginationItem key={value} value={value} state={"next"} changePage={callback} />) } else { return (<PaginationItem key={value} value={value} state={"static"} changePage={callback} />) } }
          else if (pageId === 3 && value === 4) { if (pages.length !== 5) { return (<PaginationItem key={value} value={value} state={"next"} changePage={callback} />) } else { return (<PaginationItem key={value} value={value} state={"static"} changePage={callback} />) } }
          else if (pageId >= pages.length - 2 && value > pages.length - 2) { return (<PaginationItem key={value} value={value} state={"static"} changePage={callback} />) }
          else if (pageId >= pages.length - 2 && value === pages.length - 2) { { if (pages.length !== 4) { return (<PaginationItem key={value} value={value} state={"prev"} changePage={callback} />) } else { return (<PaginationItem key={value} value={value} state={"static"} changePage={callback} />) } } }
          else if (pageId === pages.length - 2 && value === pages.length - 3) { if (pages.length !== 5) { return (<PaginationItem key={value} value={value} state={"prev"} changePage={callback} />) } else { return (<PaginationItem key={value} value={value} state={"static"} changePage={callback} />) } }
          else if (value === pageId + 1) { return (<PaginationItem key={value} value={value} state={"next"} changePage={callback} />) }
          else if (value === pageId - 1) { return (<PaginationItem key={value} value={value} state={"prev"} changePage={callback} />) }
          else { return null }
        })
      }
    </div>
  )
}

Pagination.propTypes = {
  totalPages: propTypes.number,
  pageId: propTypes.number,
  callback: propTypes.func
}

Pagination.defaultProps = {
  totalPages: 1,
  pageId: 1,
  callback: () => { }
}


export default React.memo(Pagination)

