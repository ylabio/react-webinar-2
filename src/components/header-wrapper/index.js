import React from 'react'
import { cn as bem } from '@bem-react/classname'
import './styles.css'
import BasketSimple from '../basket-simple'

function HeaderWrpapper({ children }) {
  const cn = bem('HeaderWrpapper')
  return <div className={cn()}>{children}</div>
}

HeaderWrpapper.propTypes = {}

HeaderWrpapper.defaultProps = {}

export default React.memo(HeaderWrpapper)
