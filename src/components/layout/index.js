import React from 'react';
import {Outlet} from "react-router";
import Header from "../header";
import SubHeader from "../sub-header";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Layout({title, onOpen, sum, amount}) {
    const cn = bem('Layout');
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

Layout.propTypes = {
    title: propTypes.string.isRequired,
    onOpen: propTypes.func,
    amount: propTypes.number,
    sum: propTypes.number,
}

export default React.memo(Layout);
