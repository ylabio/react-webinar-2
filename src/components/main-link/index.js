import React from "react";
import { Link } from "react-router-dom";

function MainLink({ link, title }) {
  return <Link to={link}>{title}</Link>;
}

export default React.memo(MainLink);
