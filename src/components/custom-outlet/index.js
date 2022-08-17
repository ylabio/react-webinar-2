import React from "react";
import Header from "../header";
import SubHeader from "../sub-header";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {Outlet} from "react-router";
import './style.css';

const CustomOutlet = ({title, sum, onOpen, amount}) => {
    const cn = bem('Outlet');
    return (
        <div className={cn()}>
            <Header title={title}/>
            <SubHeader openModal={onOpen} links={[{link: '', title: 'Главная'}]} amount={amount} sum={sum}/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

CustomOutlet.propTypes = {
    title: propTypes.string.isRequired,
    onOpen: propTypes.func,
    amount: propTypes.number,
    sum: propTypes.number
}

export default React.memo(CustomOutlet);