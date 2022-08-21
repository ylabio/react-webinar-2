import React from 'react';
import LayoutFlex from '../../components/layout-flex';

function LoginTools() {
  return (
    <LayoutFlex flex="end">
      <button>Вход</button>
    </LayoutFlex>
  );
}

export default React.memo(LoginTools);
