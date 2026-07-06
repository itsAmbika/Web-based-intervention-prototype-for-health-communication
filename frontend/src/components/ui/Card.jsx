import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, onClick, animate = true }) => {
  const Component = animate ? motion.div : 'div';
  const animProps = animate
    ? { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } }
    : {};

  return (
    <Component
      className={`${hover ? 'card-hover' : 'card'} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...animProps}
    >
      {children}
    </Component>
  );
};

export default Card;
