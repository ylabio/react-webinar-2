import React from 'react';
import propTypes  from 'prop-types';
import './styles.css'

const CommentsCount = (props) => {
    return (
        <div className="Comments-count">
            {props.title} ({props.count})
        </div>
    );
};

CommentsCount.propTypes = {
    title: propTypes.string,
    count: propTypes.number
}

CommentsCount.defaultProps = {
    title: "Comments",
    count: 0
}

export default React.memo(CommentsCount);