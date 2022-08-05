import Basket from '../../components/basket';
import List from '../../components/list';
import Layout from '../../components/layout';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css'

const Catalog = ({ store }) => {
  const cn = bem('Catalog');

  return (
    <Layout head={<h1>Магазин</h1>}>
      <div className={cn()}>
        <Basket className={cn('basket')} />
        <List
          items={store.getState().items}
        />
      </div>
    </Layout>
  );
};

Catalog.propTypes = {
  store: propTypes.object.isRequired,
};

export default Catalog;
