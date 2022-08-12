import React, {useEffect} from 'react'
import Layout from '../../components/layout'
import {useParams} from 'react-router-dom'
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ProductPage() {
  const cn = bem('Product');


  const store = useStore();
	let params = useParams();

	useEffect(() => {
    store.get('product').loadItem(params.id);
  }, []);

	const select = useSelector(state => ({
		item: state.product.item,
    title: state.product.title,
    description: state.product.description,
		price: state.product.price,
		madeInTitle: state.product.madeInTitle,
		madeInCode: state.product.madeInCode,
		category: state.product.category,
		edition: state.product.edition,
		price: state.product.price
  }));

  return (
		<Layout head={<h1>{select.title}</h1>}>
			
			<div className={cn()}>
				<p>{select.description}</p>
				<p>Страна производитель: <span className={cn('value')}>{`${select.madeInTitle} (${select.madeInCode})`}</span></p>
				<p>Категория: <span className={cn('value')}>{select.category}</span></p>
				<p>Год выпуска: <span className={cn('value')}>{select.edition}</span></p>
				<h2>{`Цена: ${(select.price).toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}`}</h2>
				<button>Добавить</button>
			</div>
		</Layout>
		);
}

export default React.memo(ProductPage);