import React from 'react'
import { cn as bem } from '@bem-react/classname'
import { Link } from 'react-router-dom'
import './styles.css'

function Menu(props) {
  const cn = bem('Menu')
  return (
    <div className={cn()}>
      <div className={cn('link')}>
        <Link to='/'>Главная</Link>
      </div>
    </div>
  )
}

Menu.propTypes = {}

Menu.defaultProps = {}

export default React.memo(Menu)
