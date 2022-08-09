import React, { useEffect, useRef } from 'react';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';

function Modal({ children, closeModal }) {
  const cn = bem('UIModal');
  const layoutRef = useRef();
  const modalRef = useRef();
  let timeoutId;

  const clickHandler = () => {
    modalRef.current.style = 'transform: translateY(-200%)';
    timeoutId = setTimeout(() => {
      closeModal();
    }, 300);
  };

  useEffect(() => {
    const applyMedia = (windowHeight, modaHeight) => {
      if (windowHeight <= modaHeight + 40 ) {
        layoutRef.current.classList.add('UIModal_media');
      } else {
        layoutRef.current.classList.remove('UIModal_media'); 
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
      clearTimeout(timeoutId);
    };
  })

  useEffect(() => {
    modalRef.current.style = 'transform: translateY(0%)';
  }, [])

  return (
    <div 
      className={cn()}
      onClick={clickHandler}
      ref={layoutRef}
    >
      <div className={cn('content')} ref={modalRef}>
        <div className={cn('inner')}>
        { children }
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: propTypes.node.isRequired,
  closeModal: propTypes.func.isRequired,
};

Modal.defaultProps = {};

export default Modal;