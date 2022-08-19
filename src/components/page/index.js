import React from 'react'
import Layout from '../layout'
import LayoutFlex from '../layout-flex'
import LocaleSelect from '../../containers/locale-select'
import propTypes from 'prop-types'
import LoginTool from '../../containers/login-tool'
import Tools from '../../containers/tools'

function Page({children, title}) {
  return (
    <Layout pre={
              <LoginTool />
            } 
            head={
              <LayoutFlex flex="between">
                <h1>{title}</h1>
                <LocaleSelect/>
              </LayoutFlex>
          }>
      <Tools />
      {children}
    </Layout>
  )
}

Page.propTypes = {
  children: propTypes.node
}

export default React.memo(Page)