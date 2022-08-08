import React from 'react';
import propTypes from 'prop-types';

function ModalHead({headName, onAction}) {
  return (
    <>
      <h1>{headName}</h1>
      <button onClick={onAction}>Закрыть</button>
    </>
  );
}

ModalHead.propTypes = {
  headName: propTypes.string.isRequired,
  onAction: propTypes.func
};

export default React.memo(ModalHead);
