import React, { useEffect, useState , useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css"
import { getPagesLength } from "../../api";
import PaginationControls from "../../components/pagination-controls";

function Pagination(){

    const [numberArr , setNumberArr] = useState([]);

    useEffect(() => {
      getPagesLength().then((data) =>{
        let count = 0;
        if(data.result.count % 10){
          count = parseInt(data.result.count/10 + 1)
        }else{
          count = data.result.count/10
        }
        const arr = []
        for(let i = 1 ; i <= count ; i++){
        arr.push(i)
        }  
        setNumberArr(arr);          
        }
      ).catch(err => {
        console.log(err);
        alert('Что-то пошло не так , обновите страницу.');
    })
    },[params]);

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