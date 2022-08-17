import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useMemo } from 'react';
import json from '../../lang.json';
import './styles.css'
import {Link, useParams} from "react-router-dom";

function ChoseLang(props) {
  const cn = bem('ChoseLang');

  const array = useMemo(() => {
    const langs = [];
    Object.keys(json.languages).forEach((key) => {
      langs.push(key);
    });
    return langs;
  }, []);

  return (
    <ul className={cn()}>
      {array.map((value, index) => (
          <Link key={index} to={`/${value}/${useParams().id || ''}`}><li
            className={cn('item', {active: value === props.lang, split: !value})}
          >{value}</li></Link>
      ))}
    </ul>
  );
};

ChoseLang.propTypes = {
}

ChoseLang.defaultProps = {
}

export default React.memo(ChoseLang);