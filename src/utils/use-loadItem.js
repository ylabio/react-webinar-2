import { useState, useEffect, useCallback } from "react";
import {useParams} from 'react-router-dom';

export default function useLoadItem( ){
    const {id} = useParams();
    const [data, setData] = useState(null);



    useEffect(()=>{fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
    .then(res => res.json())
    .then(item => {
        setData(item.result)
    })}, [])

    return ({data, id})
}