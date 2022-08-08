import React, {useEffect} from 'react';
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

List.defaultProps = {
    items: [],
    onItemSelect: () => {
    },
    type: 'main'
}

List.propTypes = {
    type: PropTypes.oneOf(['main','modal'])
}

export default React.memo(List);
