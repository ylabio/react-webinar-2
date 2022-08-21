import React from 'react';
import Layout from '../../components/layouts/layout';
import LayoutFlex from '../../components/layouts/layout-flex';
import LocaleSelect from '../locale-select';
import AuthNav from '../auth-nav';
import useTranslate from '../../hooks/use-translate';
import Tools from '../tools';
import propTypes from 'prop-types';

const CommonLayout = ({children, head}) => {
  const {t} = useTranslate();

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          {head ? head : <h1>{t('title')}</h1>}
            <LocaleSelect />
            </LayoutFlex>
          }
          nav={
          <LayoutFlex flex="end" py={'small'}>
            <AuthNav/>
          </LayoutFlex>
        }
          >
          <Tools/>
          {children}
        </Layout>
        );
      };

CommonLayout.propTypes = {
  children: propTypes.node.isRequired,
  head: propTypes.node,
};

  export default CommonLayout;
