import React from 'react';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';
import {ModalItem} from "../modal-item";
import PropTypes from "prop-types";

function List(props) {
    const cn = bem('List');

    return (
        <div className={cn()}>{props.items.map((item, index) => {
                if (item === undefined) {
                    return;
                }
                return (
                    <div key={index} className={cn('item')}>
                        {props.type === 'main' ?
                            <Item item={item} onSelect={props.onItemSelect}/>
                            : <ModalItem item={item} onSelect={props.onItemSelect}/>
                        }
                    </div>
                )
            }
        )}
        </div>
    )
}

List.propTypes = {
    type: PropTypes.oneOf(['main', 'modal']),
    onItemSelect: PropTypes.func.isRequired,
    items: PropTypes.func.isRequired
}

List.defaultProps = {
    type: 'main'
}

export default React.memo(List);
