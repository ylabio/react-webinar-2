import React from 'react'

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
