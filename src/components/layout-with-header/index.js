import React from 'react'
import Layout from '../layout'
import Header from '../header'
import './styles.css'

function LayoutWithHeader({head, children, basketControls}) {
  return (
    <Layout head={head}>
      <Header basketControls={basketControls}/>
      {children}
    </Layout>
  )
}

export default React.memo(LayoutWithHeader)