import {cn as bem} from '@bem-react/classname';
import propTypes from "prop-types";
import React, {useCallback} from 'react';
import './style.css';

function TextField(props) {
  const cn = bem('TextField');

  // Обработчик изменений в поле
  const onChange = useCallback(event => {
    props.onChange(event.target.value);
  }, []);

  return (
    <div className={cn()}>
      <label className={cn('label')}>{props.label}
        <input
          value={props.value}
          type={props.type}
          placeholder={props.placeholder}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

TextField.propTypes = {
  value: propTypes.string,
  type: propTypes.string,
  label: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
}

TextField.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: '',

}

export default React.memo(TextField);
