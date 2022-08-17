import React from 'react'
import Layout from '../layout'
import Header from '../header'
import './styles.css'
import propTypes from 'prop-types'

function LayoutWithHeader({head, children, basketControls, translate}) {
  return (
    <Layout head={head}>
      <Header basketControls={basketControls} translate={translate}/>
      {children}
    </Layout>
  )
}

LayoutWithHeader.propTypes = {
  head: propTypes.element.isRequired,
  children: propTypes.node,
  basketControls: propTypes.object.isRequired,
  translate: propTypes.object
}

LayoutWithHeader.defaultProps = {
  /// Не требуется, так как у всех прокинутых компонентов есть свои дефолтные пропсы
}

export default React.memo(LayoutWithHeader)