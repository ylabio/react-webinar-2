import './style.css';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import css from "../../utils/css";

function List({ children, className, spacing = 'normal' }) {
  const cn = bem('List');

  return (
    <div className={css(className, cn({'row_spacing': spacing}))}>
      {children}
    </div>
  );
}

List.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  className: propTypes.string,
  spacing: propTypes.oneOf(['small', 'normal', 'large'])
};

export default React.memo(List);
