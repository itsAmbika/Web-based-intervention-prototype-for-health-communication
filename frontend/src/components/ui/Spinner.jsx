import { Loader2 } from 'lucide-react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-primary-400`} />
    </div>
  );
};

export const PageSpinner = () => (
  <div className="min-h-screen bg-surface-900 flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export default Spinner;
