import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "home/Home";
import {ProductInfo} from "pages/product-info/Product-info";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-info" element={<ProductInfo />} />
        <Route path="/product-info/:id" element={<ProductInfo />} />
      </Routes>
    </>
  );
};

export {Routing};
