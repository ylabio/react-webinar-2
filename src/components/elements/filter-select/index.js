import React from "react";
import Select from "../select";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

const FilterSelect = (props) => {
    const cn = bem('FilterSelect');
    return (
      <Select {...props} className={cn()}/>
    );
};

FilterSelect.propTypes = {
    options: propTypes.arrayOf(propTypes.object).isRequired,
    value: propTypes.any,
    onChange: propTypes.func,
}

export default FilterSelect;
