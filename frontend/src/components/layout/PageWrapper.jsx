import Navbar from './Navbar';

const PageWrapper = ({ children, className = '', showNav = true }) => {
  return (
    <div className="min-h-screen bg-surface-900">
      {showNav && <Navbar />}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
