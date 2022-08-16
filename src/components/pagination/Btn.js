import React from "react";
import propTypes from 'prop-types';


function Btn ({ num, bl, setNumPege }) {
    return (
        <>
            <div
                className={!!bl ? `Btn-active` : 'Btn'}
                onClick={() => setNumPege(num - 1)}>
                {num}
            </div>
        </>
    )
}

Btn.propTypes = {
    num: propTypes.number,
    bl: propTypes.bool,  
    setNumPege: propTypes.func,
};

Btn.defaultProps = {
    num: 0,
    bl: false,
    setNumPege: () => { }
};


export default React.memo(Btn);