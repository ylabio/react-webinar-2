import React from 'react';
import ReactDOM from 'react-dom';

import { Link, useParams } from "react-router-dom";


export const ProfileProduct =  () =>  {

    const {id} = useParams()


    return (
        
        <div>
            {id}
        </div>
        )
}