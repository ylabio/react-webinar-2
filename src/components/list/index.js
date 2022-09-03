import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import { AnimatePresence,motion } from 'framer-motion';

function List(props) {
  const cn = bem('List');

  return (
    <AnimatePresence>

      <div className={cn()}>{props.items.map(item =>
     
        <motion.div 
          key={item._id} 
          className={cn('item')}
          initial={{scale:0}}
          animate={{
            scale:1,
            transition:{delay:0.7,type:'just'}
          }}
          exit={{
            opacity:0,
            transition:{delay:0.5}
          }}
          layout
          >
          {props.renderItem(item)}
        </motion.div>
      )}
      </div>
    </AnimatePresence>

  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

List.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(List);
