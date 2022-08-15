import React from 'react';
import { createUltimatePagination } from 'react-ultimate-pagination';
import './style.css';

const Button = ({ value, isActive, disabled, onClick }) => (
  <button
    className='pagination'
    style={isActive ? { backgroundColor: '#0087E9', color: 'white' } : null}
    onClick={onClick}
    disabled={disabled}>
    {value}
  </button>
);

const Pagination = createUltimatePagination({
  itemTypeToComponent: {
    PAGE: Button,
    ELLIPSIS: () => <Button value='...' />,
    FIRST_PAGE_LINK: () => <Button value='First' />,
    PREVIOUS_PAGE_LINK: () => <Button value='Prev' />,
    NEXT_PAGE_LINK: () => <Button value='Next' />,
    LAST_PAGE_LINK: () => <Button value='Last' />,
  },
});

export default React.memo(Pagination);
