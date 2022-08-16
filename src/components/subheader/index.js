import React from 'react'
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import propTypes from 'prop-types';
import { langVars } from '../../utils/localisation';
import BasketSimple from "../../components/basket-simple";
import { Link } from 'react-router-dom';

function Subheader(props) {
	const cn = bem('Subheader');
	return (
		<div className={cn()}>
			<Link className={cn('link')} to={props.link}>{langVars.basketSimple.main[props.lang]}</Link>
			<BasketSimple lang={props.lang} onOpen={props.callback} amount={props.amount} sum={props.sum}/>
		</div>
	)
}

Subheader.propTypes = {
  lang: propTypes.number.isRequired,
  link: propTypes.string.isRequired,
	amount: propTypes.number,
	sum: propTypes.number,
  callback: propTypes.func.isRequired,
}

Subheader.defaultProps = {
  lang: 0,
	link: '/',
	callback:()=>{}
}

export default React.memo(Subheader);