import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../utils/use-store';
import propTypes from 'prop-types';
import ItemInfo from '../../components/item-info';
import useSelector from '../../utils/use-selector';

function ItemPage({ setTitle }) {
  const { id } = useParams();

  const store = useStore();

  const select = useSelector((state) => ({
    iteminfo: state.iteminfo,
  }));

  const callbacks = {
    loadItemInfoById: useCallback(() => store.get('iteminfo').getItemInfoById(id), [id]),
    addToBasket: useCallback(() => {
      if (select.iteminfo.item._id) {
        store.get('basket').addToBasket(select.iteminfo.item._id);
      }
    }, [select.iteminfo]),
  };

  useEffect(() => {
    callbacks.loadItemInfoById();
  }, [id]);

  useEffect(() => {
    if (select.iteminfo.item.title) {
      setTitle(select.iteminfo.item.title);
    }
  }, [select.iteminfo]);

  return (
    select.iteminfo?.item && (
      <ItemInfo
        item={select.iteminfo.item}
        country={select.iteminfo.country}
        category={select.iteminfo.category}
        addToBasket={callbacks.addToBasket}
      />
    )
  );
}

ItemPage.propTypes = {
  setTitle: propTypes.func.isRequired,
};

export default React.memo(ItemPage);
