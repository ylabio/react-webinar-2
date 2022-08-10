import React from "react"
import Layout from "../layout"
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import "style.css"
import List from "../list";

function Modal ({changeShowModal ,btnTxt ,onItemAction ,items , cartCost}) {
    const cn = bem('Modal');

    return (
        <div className={cn()} onClick={() => changeShowModal()}>
            <div className={cn('content')} onClick={(e) => e.stopPropagation()}>
                <Layout head={<h1>Корзина</h1>}
                        headBtn={changeShowModal}
                >
                  {!items.length &&
                   <p className={cn('void-cart-message')}>Корзина пуста ! ...</p> || 
                   <List items={items}
                        onItemAction={onItemAction}
                        btnTxt ={btnTxt}
                        />
                   }
                   <div className={cn('footer')}>
                    <p>Итого</p>
                    <p>{cartCost.toLocaleString('ru-RU') + " ₽"}</p>
                   </div>
                </Layout>
            </div>
        </div>
    )
}

Modal.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    onItemAction: propTypes.func,
    btnTxt: propTypes.string.isRequired,
  }

Modal.defaultProps = {
    onItemAction: () => {}
  }

export default Modal