import React, {useEffect} from 'react';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
    const cn = bem('List');

    return (
        <div className={cn()}>{props.items.map((item, index) => {
                if (item === undefined) {
                    return;
                }
                return (
                    <div key={index} className={cn('item')}>
                        <Item item={item} onSelect={props.onItemSelect}/>
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
}

export default React.memo(List);
