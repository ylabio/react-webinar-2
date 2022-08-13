import React from 'react';
import {GridLoader} from 'react-spinners';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';

function LayoutSpinner({ children, isFetching }) {
  const cn = bem('LayoutSpinner')

  return (
    <div className={cn({fetching: isFetching})}>  
      <div className={cn('wrapper', {fetching: isFetching})}>
        {children}
      </div>
      <div className={cn('spinner')}>
          <GridLoader color='orange'
                      loading={isFetching}
          />
      </div>
    </div>
  );
}

LayoutSpinner.propTypes = {
  children: propTypes.node.isRequired,
  isFetching: propTypes.bool.isRequired,
};

export default React.memo(LayoutSpinner);