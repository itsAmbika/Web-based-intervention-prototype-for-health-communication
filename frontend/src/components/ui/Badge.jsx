const variants = {
  primary: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  default: 'badge bg-surface-600 text-gray-300 border border-white/10',
};

const Badge = ({ children, variant = 'default', className = '' }) => (
  <span className={`${variants[variant]} ${className}`}>{children}</span>
);

export default Badge;
