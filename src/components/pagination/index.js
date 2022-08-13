import React from "react";
import {cn as bem} from "@bem-react/classname";
import useStore from "../../utils/use-store";
import './styles.css';

 const Pagination = ({numPege, setNumPege}) => {
    const cn = bem('Pagination');
    const store = useStore();
    const count =  Math.ceil(store.state.catalog.count* 0.1)

    console.log('Pagination ==>')

    const Btn = (props) => {
        return(
            <>
            <div
            className={!!props.bl ? `Btn-active`: 'Btn' } 
            onClick={()=> props.setNumPege(props.num - 1)}>
                {props.num}
            </div>
            </>
        )
    }

    return (
        <div className={cn()}>

            {
                numPege < 2 ?
                (<>
                    <Btn num={1} bl={numPege == 0} setNumPege={setNumPege} />
                    <Btn num={2} bl={numPege == 1} setNumPege={setNumPege} />
                    <Btn num={3} bl={numPege == 2} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={count} bl={false} setNumPege={setNumPege} />
                </>) :
                numPege < 3 ?
                (<>
                    <Btn num={1} bl={false} setNumPege={setNumPege} />
                    <Btn num={numPege} bl={false} setNumPege={setNumPege} />
                    <Btn num={numPege + 1} bl={true} setNumPege={setNumPege} />
                    <Btn num={numPege + 2} bl={false} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={count} bl={false} setNumPege={setNumPege} />
                </>)
                :
                numPege < count - 3  ?
                (<>
                    <Btn num={1} bl={false} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={numPege} bl={false} setNumPege={setNumPege} />
                    <Btn num={numPege + 1} bl={true} setNumPege={setNumPege} />
                    <Btn num={numPege + 2} bl={false} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={count} bl={false} setNumPege={setNumPege} />
                </>) :
                  numPege >= count - 3  ?
                (<>
                    <Btn num={1} bl={false} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={count - 3 } bl={numPege == count - 4 } setNumPege={setNumPege} />
                    <Btn num={count - 2} bl={numPege == count - 3 } setNumPege={setNumPege} />
                    <Btn num={count - 1 } bl={numPege == count - 2 } setNumPege={setNumPege} />
                    <Btn num={count} bl={numPege == count - 1 } setNumPege={setNumPege} />
                </>) : ''  
            }

        </div>
    )
}



export default React.memo(Pagination);