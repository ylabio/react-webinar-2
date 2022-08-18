import React from "react";
import propTypes from "prop-types";
import 'style.css';
import {cn as bem} from "@bem-react/classname";

const CatalogWrapper = ({children}) => {
  const cn = bem('Catalog-wrapper');

    return (
    <div className={cn()}>
      {children}
    </div>
    );
};

CatalogWrapper.propTypes = {
  children: propTypes.node.isRequired,
}

export default CatalogWrapper;
