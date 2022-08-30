import React from 'react';
import './styles.css'

const ShowMoreButton = ({showMore}) => {
    return (
        <div className='show-more-button'>
            <button  onClick={showMore}>Показать больше</button>
        </div>
    );
};

export default ShowMoreButton;