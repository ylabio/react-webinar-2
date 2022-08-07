import React from 'react';
import 'style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types'

function Modal(props) {
    const cn = bem('modal');

    return (
        <div className={cn()}>
            <div className={cn('frame')}>
                <div className={cn('head')}>
                    <h1 className={cn('title')}>
                        {props.title}
                    </h1>
                    <button className={cn('close')} onClick={props.onClose}>Закрыть</button>
                </div>
                <div className={cn('content')}>
                    {props.children}
                </div>
                {/*возможно стоило бы вынести в отдельный компонент, но пока что на переиспользуемость не влияет*/}
                {props.total ? props.total : null}
            </div>
        </div>
    )

}
Modal.propTypes = {
    title: propTypes.string.isRequired,
    children: propTypes.node.isRequired,
    total: propTypes.node,
    onClose: propTypes.func,
};
Modal.defaultProps = {
    onClose: () => {},
}

export default React.memo(Modal);