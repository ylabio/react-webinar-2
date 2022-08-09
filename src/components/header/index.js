import React from 'react'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import propTypes from 'prop-types'
import Controls from '../controls'

function Header(props) {
  const cn = bem('Header')

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{props.title}</h1>
      {props.titleBtn && (
        <div className={cn('button')}>
          <Controls clickHandler={props.clickBtn} title={props.titleBtn} />
        </div>
      )}
    </div>
  )
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  titleBtn: propTypes.string,
  clickBtn: propTypes.func,
}

Header.defaultProps = {}

export default React.memo(Header)
