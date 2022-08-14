import React from 'react';
import {Route, Routes} from "react-router-dom";

import Main from "../app/main";
import ItemCard from "../components/item-card";




function AppRouter(){

    return (
        <Routes>
            <Route exact path="/" element={<Main/>} />
            <Route exact path="/:id" element={<ItemCard/>} />
        </Routes>
    );
}

export default AppRouter;