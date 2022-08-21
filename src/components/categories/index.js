import React, { useCallback } from "react";
import propTypes from "prop-types";
import "./style.css";

function Categories(props) {
  const onSelect = useCallback(
    (e) => {
      props.onChange(e.target.value);
    },
    [props.onChange]
  );

  return (
    <select className="Select" onChange={onSelect} value={props.value}>
      {props.options.map((item) => (
        <option key={item._id} value={item._id}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

Categories.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
};

Categories.defaultProps = {
  options: [],
  onChange: () => {},
};

export default React.memo(Categories);
