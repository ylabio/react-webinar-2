import React, { useEffect, useMemo, useRef } from 'react'
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
  toLogin,
  parent
}) {
  const valid = useMemo(() => {
    return text.trim()
  }, [text])
  const ref = useRef(null)

  useEffect(() => {
    const obj = ref.current
    if (parent._type === 'comment') {
      const to = obj?.offsetTop + obj.offsetHeight - window.innerHeight > 0 ? obj?.offsetTop + obj.offsetHeight - window.innerHeight : 0;
      window.scrollTo({top: to, behavior: 'smooth'})
    }
  }, [parent])

  return (
    <>
    {
      isLogged 
      ? <div className='NewComment' style={depthPadding(depth)} ref={ref}>
          <div className='NewComment-head'>{unreply ? 'Новый ответ' : 'Новый комментарий'}</div>
          <textarea onChange={(e) => edit(e.target.value)} value={text} className="NewComment-area"/>
          <div className='NewComment-actions'>
            <button onClick={valid && send} disabled={!valid}>Отправить</button>
            { unreply && <button onClick={unreply}>Отмена</button> }
          </div>
        </div>
      : <div className='NewCommentDefault' style={depthPadding(depth)} ref={ref}>
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
  toLogin: propTypes.func,
  parent: propTypes.object
}
NewComment.defaultProps = {
  send: () => {},
  unreply: () => {},
  isLogged: false,
  depth: 0,
  toLogin: () => {},
  parent: {
    _id: '-1',
    _type: 'none'
  }
}

export default React.memo(NewComment)