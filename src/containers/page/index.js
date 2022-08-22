import React from 'react'
import Layout from '../../components/layouts/layout'
import LayoutFlex from '../../components/layouts/layout-flex'
import LocaleSelect from '../locale-select'
import propTypes from 'prop-types'
import LoginTool from '../login/tool'
import Tools from '../tools'

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
  children: propTypes.node,
  title: propTypes.string
}

Page.defaultProps = {
  title: 'Page'
}

export default React.memo(Page)