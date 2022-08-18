import React from "react";
import propTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Page({ className, page, setCurrentPage, disabled }) {
  const cn = bem("Page");

  return (
    <button
      disabled={disabled}
      className={cn(className)}
      onClick={() => setCurrentPage(page)}
    >
      {page}
    </button>
  );
}

Page.propTypes = {
  className: propTypes.string,
  page: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  setCurrentPage: propTypes.func.isRequired,
  disabled: propTypes.bool,
};

Page.defaultProps = {
  className:"",
  setCurrentPage: () => {},
  disabled: false,
};

export default React.memo(Page);
