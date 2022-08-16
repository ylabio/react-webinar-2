import React from 'react';
import useLanguage from '../../utils/use-language';

function SelectBar(props) {
  const { handleSetLanguage, language } = useLanguage();
  return (
    <div>
      <select
        value={language}
        onChange={(e) => handleSetLanguage(e.target.value)}>
        <option value='English'>English</option>
        <option value='Russian'>Russian</option>
      </select>
    </div>
  );
}

export default React.memo(SelectBar);
