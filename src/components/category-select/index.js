import React, { useCallback } from "react";
import propTypes from "prop-types";
import "./style.css";
import Select from "../select";

function CategorySelect({ onChange, currentCategory, categories }) {
  const onChangeCategory = useCallback(
    (currentCategory) => {
      onChange(currentCategory);
    },
    [onChange]
  );

  return (
    <div className="CategorySelect">
      <Select
        onChange={onChangeCategory}
        value={currentCategory}
        options={categories}
      />
    </div>
  );
}

CategorySelect.propTypes = {
  categories: propTypes.arrayOf(propTypes.object).isRequired,
  currentCategory: propTypes.any,
  onChange: propTypes.func,
};

CategorySelect.defaultProps = {
  onChange: () => {},
};

export default React.memo(CategorySelect);
