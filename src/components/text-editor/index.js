import {cn as bem} from '@bem-react/classname';
import propTypes from "prop-types";
import React, {useState} from 'react';
import './style.css';

function TextEditor({onBack, onChange, placeholder, value = ''}) {
  const cn = bem('TextEditor');

  const [textValue, change] = useState(value);

  const onChangeClick = () => {
    onChange(textValue);
  };

  const onChangeText = (event) => {
    change(event.currentTarget.value)
  };

  return (
    <div className={cn()}>
      <p className={cn('name')}>{onBack ? 'Новый ответ' : 'Новый комментарий'}</p>

      <textarea
        autoFocus={!!onBack}
        className={cn('textArea')}
        value={textValue}
        placeholder={placeholder}
        onChange={onChangeText}
      />

      <button disabled={textValue.trim().length===0} className={cn('button')} onClick={onChangeClick}>Отправить</button>
      {onBack ? <button className={cn('button')} onClick={onBack}>Отмена</button> : null}
    </div>
  )
}

TextEditor.propTypes = {
  value: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  onBack: propTypes.func,
  type: propTypes.string,
}

TextEditor.defaultProps = {
  onChange: () => {
  },
  type: 'text',
}

export default React.memo(TextEditor);
