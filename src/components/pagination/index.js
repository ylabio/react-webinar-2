import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import pages from "../../utils/pages";
import {NavLink} from "react-router-dom";
import {useParams} from "react-router";

function Pagination(props) {
  const cn = bem('Pagination');
  const pagesArr = pages(props.totalPage)
  const {page} = useParams()
  let pagination = []
  let [pagePagination, setPagePagination] = useState(+page)
  if (props.totalPage > 5) {
    if (pagePagination <= 2) {
      pagination = [...pagesArr.slice(0, 3), '...', props.totalPage]
    } else {
      if (pagePagination === 3) {
        pagination = [...pagesArr.slice(0, 4), '...', props.totalPage]
      } else {
        if (pagePagination > 3 && pagePagination < props.totalPage - 2) {
          pagination = [1, '...', ...pagesArr.slice(pagePagination - 2, pagePagination + 1), '...', props.totalPage]
        } else {
          if (pagePagination === props.totalPage) {
            pagination = [1, '...', ...pagesArr.slice(pagePagination - 3, props.totalPage)]
          } else {
            if (pagePagination >= props.totalPage - 2) {
              pagination = [1, '...', ...pagesArr.slice(pagePagination - 2, props.totalPage)]
            }
          }
        }
      }
    }
  }

  return (
    <div className={cn()}>{pagination.map((value, index) => {
        if (value !== '...') {
          return <div key={index} className={cn('value')} onClick={() => setPagePagination(value)}>
            <NavLink className={({isActive}) => isActive ? cn('link-active') : cn('link')} to={`/${value}`}>
              <span>{value}</span>
            </NavLink>
          </div>
        } else {
          return value
        }
      }
    )}
    </div>
  )
}

Pagination.propTypes = {
  totalPage: propTypes.number,
}

export default React.memo(Pagination);
