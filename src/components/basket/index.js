import React from 'react';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Button from '../button';



function Basket({ tPaP, modalVal = false, setModal, children, head }) {
    const cN = bem('Basket');
    const [quantity, price, word] = tPaP;

    return (
        <div className={modalVal ? "dark-background" : "dark-background-hidden"}>
            <div className={cN()}>
                <div className={cN("head")}>
                    {head}
                    <Button className={cN('button')} title={"закрыть"} onClick={() => setModal(!modalVal)} />
                </div>
                <div className={cN("body")}>
                    {children}
                </div>
                <strong> {typeof (price) === "number" ? `Итого ${'\u00A0'} ${price} ₽` : ``}</strong>
            </div>
        </div>);
}


export default React.memo(Basket)