import React from 'react'
import propTypes from 'prop-types';

export const OpenModalButton = ({openModal,setOpenModal}) => {
  return (
    <div>
      {
        !openModal &&
        <button onClick={() => setOpenModal(true)}>Перейти</button>
      }
    </div>
  )
}
OpenModalButton.propTypes = {
  setOpenModal: propTypes.func.isRequired,
  openModal: propTypes.func.isRequired,
 
}

OpenModalButton.defaultProps = {
  setOpenModal: () => { },
  openModal: () => { },
}
