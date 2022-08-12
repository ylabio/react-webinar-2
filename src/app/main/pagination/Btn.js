import React from "react";


export const Btn = (props) => {



    return(
        <>
        <div
        className={!!props.bl ? `Btn-active`: 'Btn' } 
        onClick={()=> props.setNumPege(props.num - 1)}>
            {props.num}
        </div>
        </>
    )
}
