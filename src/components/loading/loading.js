import React from 'react'
import './style.css'
import { InfinitySpin } from 'react-loader-spinner';
function Loading() {
    return (
        <div className="Loading" >
            <InfinitySpin
                width='300'
                height='300'
                color="black"
                timeout={300}

            />
        </div>
    )
}

export default Loading