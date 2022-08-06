import React, {useCallback} from 'react'
import './styles.css'

const CartComponent = ({cartStatus, setCartStatus, goodsInCart, price, setGoodsInCart}) => {

    const deleteItem = useCallback((title) => {
        setGoodsInCart([...goodsInCart.filter((item) => item.title !== title)])
    }, [goodsInCart, setGoodsInCart])

    return (
        <div className={cartStatus ? 'active' : 'inactive'}>
            <div className={cartStatus ? 'cartContentActive' : 'cartContentInActive'}>
                <div className='cart_header'>
                    <p>Корзина</p>
                    <button onClick={() => setCartStatus(false)}>Закрыть</button>
                </div>
                <div>
                    <div>
                        {goodsInCart.map((item) => {
                            return (
                                <div key={item.code} className='cart_items'>
                                    <p>{item.code}</p>
                                    <p>{item.title}</p>
                                    <p>{item.price} ₽</p>
                                    <p>{item.count} шт</p>
                                    <button onClick={() => deleteItem(item.title)}>Удалить</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className='cart_total_price'>
                        <strong>
                            <span>Итого</span>
                            <span>{price} ₽</span>
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default React.memo(CartComponent)