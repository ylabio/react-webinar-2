import React, { useMemo } from 'react';
import "./style.css"
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import PaginationItem from '../pagination-item';

function Pagination({ totalItems, pageId }) {
  const pageID = Number(pageId)
  const pages = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(totalItems / 10) },
        (_, i) => i + 1
      ),
    [totalItems]
  );
  const cn = bem('Pagination');
  return (
    <div className={cn('wrapper')}>
      {
        pages.map((value) => {
          console.log(pages.length)
          if (value == pageID) { return (<PaginationItem key={value} value={value} state={"active"} />) }
          else if (value === pages[0] || value === pages.length) { return (<PaginationItem key={value} value={value} state={"static"} />) }
          else if (pageID <= 3 && value < 3) { return (<PaginationItem key={value} value={value} state={"static"} />) }
          else if (pageID <= 3 && value === 3) { if (pages.length !== 4) { return (<PaginationItem key={value} value={value} state={"next"} />) } else { return (<PaginationItem key={value} value={value} state={"static"} />) } }
          else if (pageID === 3 && value === 4) { if (pages.length !== 5) { return (<PaginationItem key={value} value={value} state={"next"} />) } else { return (<PaginationItem key={value} value={value} state={"static"} />) } }
          else if (pageID >= pages.length - 2 && value > pages.length - 2) { return (<PaginationItem key={value} value={value} state={"static"} />) }
          else if (pageID >= pages.length - 2 && value === pages.length - 2) { { if (pages.length !== 4) { return (<PaginationItem key={value} value={value} state={"prev"} />) } else { return (<PaginationItem key={value} value={value} state={"static"} />) } } }
          else if (pageID === pages.length - 2 && value === pages.length - 3) { if (pages.length !== 5) { return (<PaginationItem key={value} value={value} state={"prev"} />) } else { return (<PaginationItem key={value} value={value} state={"static"} />) } }
          else if (value === pageID + 1) { return (<PaginationItem key={value} value={value} state={"next"} />) }
          else if (value === pageID - 1) { return (<PaginationItem key={value} value={value} state={"prev"} />) }
          else { return null }
        })
      }
    </div>
  )
}

Pagination.propTypes = {
  totalItems: propTypes.number.isRequired,
  pageId: propTypes.string
}

Pagination.defaultProps = {
  pageId: "1"
}


export default React.memo(Pagination)



// if (value == pageID) { return (<PaginationItem key={value} value={value} state={"active"} />) }
// else if (value === pages[0] || value === pages.length) { return (<PaginationItem key={value} value={value} state={"static"} />) }
// else if (pageID <= 3 && value < 3) { return (<PaginationItem key={value} value={value} state={"static"} />) }
// else if (pageID <= 3 && value === 3) { return (<PaginationItem key={value} value={value} state={"next"} />) }
// else if (pageID === 3 && value === 4) { if (pages.length !== 5) { return (<PaginationItem key={value} value={value} state={"next"} />) } else { return (<PaginationItem key={value} value={value} state={"static"} />) } }
// else if (pageID >= pages.length - 2 && value > pages.length - 2) { return (<PaginationItem key={value} value={value} state={"static"} />) }
// else if (pageID >= pages.length - 2 && value === pages.length - 2) { return (<PaginationItem key={value} value={value} state={"prev"} />) }
// else if (pageID === pages.length - 2 && value === pages.length - 3) { if (pages.length !== 5) { return (<PaginationItem key={value} value={value} state={"prev"} />) } else { return (<PaginationItem key={value} value={value} state={"static"} />) } }
// else if (value === pageID + 1) { return (<PaginationItem key={value} value={value} state={"next"} />) }
// else if (value === pageID - 1) { return (<PaginationItem key={value} value={value} state={"prev"} />) }
// else { return null }