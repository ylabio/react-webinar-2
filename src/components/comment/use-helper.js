import React, { useEffect, useRef, useState } from "react";
import propTypes from 'prop-types';

function useHelper({
  lastCommentId,
   addCommentPosition, 
   lastCreatedId, 
   data
}) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    if (lastCommentId !== data._id) {
      setShowAnswerForm(false);
    }
  }, [lastCommentId])

  useEffect(() => {
    const fromTop = commentRef.current.getBoundingClientRect().top;
    addCommentPosition(data._id, fromTop);
  }, [])

  useEffect(() => {
    let id;

    if (lastCreatedId === data._id) {
      commentRef.current.style.backgroundColor = 'rgba(0, 255, 0, 0.25)';

      id = setTimeout(() => {
        commentRef.current.style.backgroundColor = 'white';
      }, 2000)
    }

    return () => clearTimeout(id);
  }, [lastCreatedId])

  return [showAnswerForm, setShowAnswerForm, commentRef];
}

export default useHelper;