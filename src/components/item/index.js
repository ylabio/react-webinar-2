import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function Item(props) {
	const cn = bem("Item");

	return (
		<div className={cn()}>
			<div className={cn("number")}>
				{props.item.code}
			</div>
			<div className={cn("title")}>
				{props.item.title}
			</div>
			{props.item.details.map((elem, i) => (<div key={i} className={cn("details")}>{elem}</div>))}
			<div className={cn("actions")}>
				<button onClick={() => props.onButtonEvent(props.item.code)}>
					{props.textButton}
				</button>
			</div>
		</div>
	);
}

Item.propTypes = {
	item: propTypes.object.isRequired,
	onButtonEvent: propTypes.func.isRequired,
	textButton: propTypes.string
};

Item.defaultProps = {
	onButtonEvent: () => {},
	textButton: " "
};

export default React.memo(Item);
