import React from "react";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import 'style.css';
import propTypes from "prop-types";

const PagBtn = ({ page, to, active, ...props }) => {
  const cn = bem('Pag-button');

  return (
    <button {...props} className={cn({ active })}>
      <Link to={`${to}?page=${page}`} className={cn('link')}>
        {page}
      </Link>
    </button>
  );
};

PagBtn.propTypes = {
  page: propTypes.number.isRequired,
  to: propTypes.string,
}

PagBtn.defaultProps = {
  to: '',
}

export default React.memo(PagBtn);
