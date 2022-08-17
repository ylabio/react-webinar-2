import React from "react";
import "./styles.css";
import { cn as bem } from "@bem-react/classname";

const Loader = () => {

    const cn = bem('Loader')

    return (
        <div classNames={cn()}>
            <div className={cn("lds-roller")}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default React.memo(Loader);