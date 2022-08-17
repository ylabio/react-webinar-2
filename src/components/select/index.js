import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Select({ options, currentValue, defaultValue, changeOption }) {
  const cn = bem("Select");

  return (
    <select
      className={cn()}
      value={currentValue}
      onChange={(event) => changeOption(event.target.value)}
    >
      {defaultValue && (
        <option disabled value="">
          {defaultValue}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: propTypes.array.isRequired,
  defaultValue: propTypes.string,
  changeOption: propTypes.func.isRequired,
};

export default React.memo(Select);
