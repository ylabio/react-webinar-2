import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';
import Controls from '../controls';
import List from '../list';
import propTypes from 'prop-types';

const MainPage = (props) => {
  return (
      <Layout head={<h1>Магазин</h1>}>
        <Controls shoppingCart={props.shoppingCart} switchCart={props.switchCartCallback}/>
        <List items={props.items}
              onItemClickCallback={props.addItemToCartCallback}
              actionType={"Добавить"}
        />
      </Layout>
  );
};

MainPage.propTypes = {
  shoppingCart: PropTypes.arrayOf(propTypes.object).isRequired,
  switchCartCallback: propTypes.func.isRequired,
  items: propTypes.arrayOf(propTypes.object).isRequired,
  addItemToCartCallback: propTypes.func.isRequired
};

export default React.memo(MainPage);