import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import debounce from "lodash.debounce";
import './style.css';

function TextArea(props) {

  const [value, change] = useState(props.value);

  const changeThrottle = useCallback(
    debounce(value => props.changeText(value), 600),
    [props.onChange]
  );

  const onChange = useCallback(event => {
    change(event.target.value);
    changeThrottle(event.target.value);
  }, [change, changeThrottle]);

  useEffect(() => {
    change(props.value);
  }, [props.value]);

  return (
    <textarea
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
      rows="5"
    />
  )
}

TextArea.propTypes = {
  value: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
}

export default React.memo(TextArea);
