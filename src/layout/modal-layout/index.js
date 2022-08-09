import React, { useEffect, useRef } from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ModalLayout({ children, closeModal, modalRef, items }){
  const cn = bem('ModalLayout');
  const layoutRef = useRef();

  useEffect(() => {
    const applyMedia = (windowHeight, modaHeight) => {
      if (windowHeight <= modaHeight + 40 ) {
        layoutRef.current.classList.add('ModalLayout_media');
      } else {
        layoutRef.current.classList.remove('ModalLayout_media'); 
      }
    };

    const handleResize = (e) => {
      const windowHeight = e.target.innerHeight;
      const modalHeight = modalRef.current.offsetHeight;
      
      if (layoutRef.current) {
        applyMedia(windowHeight, modalHeight);
      }
    };
    
    applyMedia(window.innerHeight, modalRef.current.offsetHeight);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [items])

  return (
    <div 
      className={cn()} 
      onClick={closeModal}
      ref={layoutRef}
    >
      {children}
    </div>
  );
}

ModalLayout.propTypes = { 
  children: propTypes.node,
  closeModal: propTypes.func.isRequired,
  items: propTypes.array.isRequired,
  modalRef: propTypes.oneOfType([
    propTypes.func, 
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
};

ModalLayout.defaultProps = {
  closeModal: () => {},
  itmes: [],
};

export default React.memo(ModalLayout);
