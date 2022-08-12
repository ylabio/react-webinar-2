import React, { useEffect, useLayoutEffect, useState } from "react";
import {cn as bem} from "@bem-react/classname";
import useStore from "../../../utils/use-store";

import { Btn } from "./Btn";

import './styles.css';

export const Pagination = () => {
    const cn = bem('Pagination');
    const store = useStore();
    const [numPege, setNumPege] = useState(0)

    const count = store.state.catalog.count

    useEffect( () => {
        store.get('catalog').load( numPege * 10, 10)

    },[numPege])

    return (
        <div className={cn()}>
            {store.state.catalog.items.length !== 0 &&
                numPege < 2 ?
                (<>
                    <Btn num={1} bl={numPege == 0} setNumPege={setNumPege} />
                    <Btn num={2} bl={numPege == 1} setNumPege={setNumPege} />
                    <Btn num={3} bl={numPege == 2} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={4} bl={numPege == 3} setNumPege={setNumPege} />
                </>) :
                numPege < 3 ?
                (<>
                    <Btn num={1} bl={false} setNumPege={setNumPege} />
                    <Btn num={numPege} bl={false} setNumPege={setNumPege} />
                    <Btn num={numPege + 1} bl={true} setNumPege={setNumPege} />
                    <Btn num={numPege + 2} bl={false} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={5} bl={false} setNumPege={setNumPege} />
                </>)
                :
                numPege ?
                (<>
                    <Btn num={1} bl={false} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={numPege} bl={false} setNumPege={setNumPege} />
                    <Btn num={numPege + 1} bl={true} setNumPege={setNumPege} />
                    <Btn num={numPege + 2} bl={false} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={ Math.ceil(count * 0.1)} bl={false} setNumPege={setNumPege} />

                    
                </>) : ''
            }

        </div>
    )
}



