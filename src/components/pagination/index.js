import React from "react";
import {cn as bem} from "@bem-react/classname";
import useStore from "../../utils/use-store";
import './styles.css';

 const Pagination = ({numPege, setNumPege}) => {
    const cn = bem('Pagination');
    const store = useStore();
    const count = store.state.catalog.count

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
                    <Btn num={Math.ceil(count * 0.1)} bl={numPege == 3} setNumPege={setNumPege} />
                </>) :
                numPege < 3 ?
                (<>
                    <Btn num={1} bl={false} setNumPege={setNumPege} />
                    <Btn num={numPege} bl={false} setNumPege={setNumPege} />
                    <Btn num={numPege + 1} bl={true} setNumPege={setNumPege} />
                    <Btn num={numPege + 2} bl={false} setNumPege={setNumPege} />
                    <div className={cn("offset")} >...</div>
                    <Btn num={Math.ceil(count * 0.1)} bl={false} setNumPege={setNumPege} />
                </>)
                :
                numPege  ?
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



export default React.memo(Pagination);