import React from 'react';

const LayoutProduct = () => {
    return (

            <div className={cn()}>
                <div className={cn('head')}>
                    {head}
                </div>
                <div className={cn('content')}>
                    {children}
                </div>
            </div>
    );
};

export default LayoutProduct;