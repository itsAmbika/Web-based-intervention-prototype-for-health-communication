/**
 * Skeleton loader components for loading states
 */

/** Generic pulse shimmer block */
export const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
);

/** Skeleton for a consultation list item */
export const SkeletonConsultationItem = () => (
  <div className="glass p-4 flex items-center gap-4">
    <SkeletonBlock className="w-11 h-11 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <SkeletonBlock className="h-4 w-1/2" />
      <SkeletonBlock className="h-3 w-1/3" />
    </div>
    <SkeletonBlock className="h-5 w-20 rounded-full flex-shrink-0" />
  </div>
);

/** Skeleton list of N consultation items */
export const SkeletonConsultationList = ({ count = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonConsultationItem key={i} />
    ))}
  </div>
);

/** Skeleton for the dashboard stats cards */
export const SkeletonStatCards = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="glass p-6 space-y-3">
        <SkeletonBlock className="w-8 h-8 rounded-lg mx-auto" />
        <SkeletonBlock className="h-8 w-16 mx-auto" />
        <SkeletonBlock className="h-3 w-24 mx-auto" />
      </div>
    ))}
  </div>
);

/** Skeleton for the disease card grid */
export const SkeletonDiseaseGrid = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="glass p-6 space-y-3 text-center">
        <SkeletonBlock className="w-16 h-16 rounded-2xl mx-auto" />
        <SkeletonBlock className="h-4 w-28 mx-auto" />
        <SkeletonBlock className="h-3 w-20 mx-auto" />
      </div>
    ))}
  </div>
);

/** Skeleton for a question list */
export const SkeletonQuestionList = ({ count = 6 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="glass p-4 flex gap-3 items-center">
        <SkeletonBlock className="w-5 h-5 rounded flex-shrink-0" />
        <SkeletonBlock className={`h-4 ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/6'}`} />
      </div>
    ))}
  </div>
);
