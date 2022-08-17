import React, { useEffect, useState , useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css"
import PaginationControls from "../../components/pagination-controls";

function Pagination({numberArr}){

    const navigate = useNavigate();
    const params = useParams();

    const callbacks = {
      // Переход на новую страницу
      goToPage: useCallback((path) => navigate(path), [])
    };

   return(
    <PaginationControls callback={callbacks.goToPage}
                        pageNumber={params.pageNumber}
                        numberArr={numberArr}
    />
   )

          
        
    
}

export default Pagination;