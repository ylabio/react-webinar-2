import React from 'react';
import PropTypes from 'prop-types';
import Menu from "../menu";
import BasketSimple from "../basket-simple";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import {NavLink} from "react-router-dom";
import './style.css';

const SubHeader = ({links, openModal, amount, sum}) => {
    const cn = bem('Subheader');
    return (
        <div className={cn()}>
            <Menu>
                {links.map((i, index) => {
                    return <NavLink key={index} to={i.link} className={cn('link')}>
                        {i.title}
                    </NavLink>
                })}
            </Menu>
            <BasketSimple onOpen={openModal} amount={amount} sum={sum}/>
        </div>
    );
};

SubHeader.propTypes = {
    links: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    amount: PropTypes.number,
    sum: PropTypes.number
};

export default React.memo(SubHeader);