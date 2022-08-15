import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function Select(props) {
  const cn = bem("Select");

  const onSelect = useCallback(
    (e) => {
      props.onChange(e.target.value);
    },
    [props.onChange]
  );
  return (
    <select className={cn()} onChange={onSelect} value={props.value}>
      {props.options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: propTypes.array.isRequired,
  value: propTypes.string,
  onChange: propTypes.func,
};

Select.defaultProps = {
  onChange: () => {},
};

export default React.memo(Select);
