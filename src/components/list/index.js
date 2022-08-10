import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function List(props) {
	const cn = bem("List");

	return (
		props.items.length > 0
			? <div className={cn()}>
				{props.items.map(item =>
					<div key={item.code} className={cn("item")}>
						<Item item={item} onButtonEvent={props.onButtonEvent} textButton={props.textButton}/>
					</div>
				)}
			</div>
			: <div className={cn()}><h2>Лист пуст</h2></div>
	);
}

List.propTypes = {
	items: propTypes.arrayOf(propTypes.object).isRequired,
	onButtonEvent: propTypes.func,
	textButton: propTypes.string
};

List.defaultProps = {
	items: [],
	onButtonEvent: () => {},
	textButton: " "
};

export default React.memo(List);
