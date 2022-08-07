import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import ReactDOM from "react-dom";

function Modal(props) {
    const cn = bem('Modal');

    // const {isOpen, closeModal} = props;

    // if (!props.isOpen) {
    //     console.log(1);
    //     console.log(props.isOpen);
    //     console.log(1);
    //     return null;
    // }

    // constructor(props) {
    //     super(props);
    //     this.el = document.createElement('div');
    //   }
    
    //   componentDidMount() {
    //     modalRootEl.appendChild(this.el);
    //   }
    
    //   componentWillUnmount() {
    //     modalRootEl.removeChild(this.el);
    //   }

    

    // const modal =  (<>
    //     {/* <div className={isOpen ? "overlay" : "hide"} onClick={closeModal} />
    //     <div className={isOpen ? "modal" : "hide"}> */}
        // <div className={cn()}>
        //     <div className={cn('content')}>
        //         <div className={cn('header')}>
        //             <div className={cn('title')}>
        //                 <h1>Modal heading</h1>
        //             </div>
        //             <button onClick={closeModal}>Закрыть</button>
        //         </div>
        //         <div className={cn('body')}>
        //             <p>Modal content</p>
        //         </div>
        //     </div>
        // </div>
    // </>
    // )
    // return ReactDOM.createPortal(
    //     modal, document.getElementById("root"),
    //     this.props.children
    // );

    return (
        <Portal>
            <div className={cn()}>
                <div className={cn('content')}>
                    <div className={cn('header')}>
                        <div className={cn('title')}>
                            <h1>Modal heading</h1>
                        </div>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                    <div className={cn('body')}>
                        <p>Modal content</p>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

Modal.propTypes = {
    closeModal: propTypes.func.isRequired,
    isOpen: propTypes.bool.isRequired
}

Modal.defaultProps = {
    closeModal: () => {},
    isOpen: false
}

export default React.memo(Modal);
