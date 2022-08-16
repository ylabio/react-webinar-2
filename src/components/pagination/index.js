import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
// import useStore from "../../utils/use-store";
import Btn from "./Btn";
import './styles.css';

function Pagination ({ numPege, setNumPege, count }) {
    const cn = bem('Pagination');
    // const store = useStore();
    // const count = React.memo(Math.ceil(store.state.catalog.count * 0.1))

    console.log('Pagination ==>')

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
                        numPege < count - 3 ?
                            (<>
                                <Btn num={1} bl={false} setNumPege={setNumPege} />
                                <div className={cn("offset")} >...</div>
                                <Btn num={numPege} bl={false} setNumPege={setNumPege} />
                                <Btn num={numPege + 1} bl={true} setNumPege={setNumPege} />
                                <Btn num={numPege + 2} bl={false} setNumPege={setNumPege} />
                                <div className={cn("offset")} >...</div>
                                <Btn num={count} bl={false} setNumPege={setNumPege} />
                            </>) :
                            numPege >= count - 3 ?
                                (<>
                                    <Btn num={1} bl={false} setNumPege={setNumPege} />
                                    <div className={cn("offset")} >...</div>
                                    <Btn num={count - 3} bl={numPege == count - 4} setNumPege={setNumPege} />
                                    <Btn num={count - 2} bl={numPege == count - 3} setNumPege={setNumPege} />
                                    <Btn num={count - 1} bl={numPege == count - 2} setNumPege={setNumPege} />
                                    <Btn num={count} bl={numPege == count - 1} setNumPege={setNumPege} />
                                </>) : ''
            }

        </div>
    )
}

Pagination.propTypes = {
    count: propTypes.number,
    numPege: propTypes.number,
    setNumPege: propTypes.func,
};

Pagination.defaultProps = {
    numPege: 10,
    setNumPege: () => { }
};


export default React.memo(Pagination);