import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import depthPadding from '../../utils/depthPadding'
import './styles.css'

function NewComment({
  text,
  edit,
  send,
  unreply,
  isLogged,
  depth,
  toLogin
}) {
  const valid = useMemo(() => {
    return text.trim()
  }, [text])

  return (
    <>
    {
      isLogged 
      ? <div className='NewComment' style={depthPadding(depth)}>
          <div className='NewComment-head'>{unreply ? 'Новый ответ' : 'Новый комментарий'}</div>
          <textarea onChange={(e) => edit(e.target.value)} value={text} className="NewComment-area"/>
          <div className='NewComment-actions'>
            <button onClick={valid && send} disabled={!valid}>Отправить</button>
            { unreply && <button onClick={unreply}>Отмена</button> }
          </div>
        </div>
      : <div className='NewCommentDefault' style={depthPadding(depth)}>
          <span className='NewCommentDefault-link' onClick={toLogin}>Войдите</span>, чтобы иметь возможность {unreply ? 'ответить' : 'комментировать'}. 
          {unreply && <span className='NewCommentDefault-unreply' onClick={unreply}>Отмена</span>}
        </div> 
    }
    </>
  )
}

NewComment.propTypes = {
  text: propTypes.string.isRequired,
  edit: propTypes.func.isRequired,
  send: propTypes.func,
  unreply: propTypes.func,
  isLogged: propTypes.bool,
  depth: propTypes.number,
  toLogin: propTypes.func
}
NewComment.defaultProps = {
  send: () => {},
  unreply: () => {},
  isLogged: false,
  depth: 0,
  toLogin: () => {}
}

export default React.memo(NewComment)