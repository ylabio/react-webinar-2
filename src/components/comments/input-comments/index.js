import React, { useState } from 'react'
import './style.css'
import propTypes from 'prop-types';
function FormComment({ additComponents, submitComment, type, id, close }) {
  const [text, setText] = useState('');
  console.log(id)
  console.log(type)
  const playoad = {

    text,
    parent: {
      _id: id,
      _type: type,
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    submitComment(playoad)
    console.log(playoad)
    close()
    setText('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='FormComment'>
        <p className='NewComment'>{type === 'article' ? 'Новый комментарий' : 'Новый ответ'}</p>
        <textarea
          name="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        >
        </textarea>
        <div className='FormComment-button'>
          <button type='submit' disabled={!text}>Отправить</button>
          {additComponents}
        </div>
      </div>
    </form>

  )
}
FormComment.propTypes = {
  additComponents: propTypes.node,
  submitComment: propTypes.func,
  close: propTypes.func
}
FormComment.defaultProps = {
  submitComment: () => { },
  close: () => { }
}
export default FormComment