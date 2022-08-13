import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const types = ['start', 'start-dots', 'middle-dots', 'end-dots'];

const PagButton = ({ int, to = `?page=${int}` }) => {
  return <Link to={`${to}`}>{int}</Link>;
};

const Pagination = ({ counts, activeCount = 1 }) => {
  const [type] = useState(() => {
    if (counts <= 3) return types[0];
    else {
      if (activeCount >= counts - 1) return types[3];
      else if (activeCount > 2) return types[1];
      return types[2];
    }
  });

  const cb = {
    createStart: useCallback(() => {
      let body = [<div>start</div>];
      return <>{body}</>;
    }, [counts, activeCount]),
    createStartDots: useCallback(() => {
      let body = [<div>start dots</div>];
      return <>{body}</>;
    }, [counts, activeCount]),
    createMiddleDots: useCallback(() => {
      let body = [<div>middle dots</div>];
      return <>{body}</>;
    }, [counts, activeCount]),
    createEndDots: useCallback(() => {
      let body = [<div>end dots</div>];
      return <>{body}</>;
    }, [counts, activeCount]),
  };

  return (
    <div>
      {type === 'start' ? (
        cb.createStart()
      ) : type === 'start-dots' ? (
        cb.createStartDots()
      ) : type === 'middle-dots' ? (
        cb.createMiddleDots()
      ) : type === 'end-dots' ? (
        cb.createEndDots()
      ) : (
        <div>oops pagi !??!</div>
      )}
    </div>
  );
};

export default React.memo(Pagination);
