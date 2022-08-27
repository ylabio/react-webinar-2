import React, { useCallback, useEffect, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";
import throttle from "lodash.throttle";

function CommentForm(props) {
  const cn = bem("CommentForm");
  const [value, change] = useState(props.value);

  //   const changeThrottle = useCallback(
  //     throttle((value) => props.onChange(value), 1000),
  //     [props.onChange]
  //   );

  //   const onChange = useCallback(
  //     (event) => {
  //       change(event.target.value);
  //       changeThrottle(event.target.value);
  //     },
  //     [change, changeThrottle]
  //   );

  useEffect(() => {
    change(props.value);
  }, [props.value]);

  return (
    <div>
      <h2>Новый комментарий</h2>
      <textarea
        className={cn()}
        value={value}
        placeholder="Напишите комментарий"
        onChange={onChange}
      />
      <button>Отправить</button>
    </div>
  );
}

// CommentForm.propTypes = {
//   value: propTypes.string,
//   placeholder: propTypes.string,
//   onChange: propTypes.func,
// };

// CommentForm.defaultProps = {
//   onChange: () => {},
//   type: "text",

// };

export default React.memo(CommentForm);
