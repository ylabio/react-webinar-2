import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';

function Checker(props) {
    const focus = useRef();

    const scroll = (ref) => ref.current.scrollIntoView()

    useEffect(() => {
        focus.current && scroll(focus);
    }, [focus])

    return props.new ? (
        <>
            <div ref={focus}>
                {props.children}
            </div>
        </>

    ) :
        (
            <div>
                {props.children}
            </div>
        )
}

Checker.propTypes = {
    new: propTypes.bool,
    children: propTypes.node
}

Checker.defaultProps = {
    new: false
}

export default React.memo(Checker);
