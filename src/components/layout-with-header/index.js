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



export default React.memo(LayoutWithHeader)