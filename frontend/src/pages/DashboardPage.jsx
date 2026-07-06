import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ClipboardList, ChevronRight, ShieldCheck, User2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useConsultations } from '../api/useConsultations';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { SkeletonConsultationList } from '../components/ui/Skeleton';

const stageColors = {
  Diagnosis: 'primary',
  Treatment: 'warning',
  Survivorship: 'success',
  Palliative: 'default',
};

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);
  const { data: consultations, isLoading } = useConsultations();

  const recent = consultations?.slice(0, 3) || [];
  const totalCount = consultations?.length || 0;

  const getTimeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  return (
    <PageWrapper>
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-black text-white">
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-gray-400 mt-1">Ready to prepare your next consultation?</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* New Consultation — featured */}
        <Link to="/wizard" className="sm:col-span-2 group">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-hover h-full p-6 flex items-center gap-5 border-primary-500/20"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-900/50 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Start New Consultation</h2>
              <p className="text-gray-400 text-sm">Build a personalized question list for your next appointment</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 ml-auto group-hover:text-primary-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </motion.div>
        </Link>

        {/* My Consultations */}
        <Link to="/consultations">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-hover p-6 text-center"
          >
            <ClipboardList className="w-8 h-8 text-primary-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white">{totalCount}</div>
            <div className="text-gray-400 text-sm">Consultations</div>
          </motion.div>
        </Link>

        {/* Profile */}
        <Link to="/profile">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-hover p-6 text-center"
          >
            <User2 className="w-8 h-8 text-accent-400 mx-auto mb-3" />
            <div className="text-sm font-semibold text-white">My Profile</div>
            <div className="text-gray-400 text-xs mt-1">Edit your details</div>
          </motion.div>
        </Link>

        {/* Admin link — only for admins */}
        {user?.role === 'admin' && (
          <Link to="/admin">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="glass-hover p-6 text-center border border-amber-500/20"
            >
              <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <div className="text-sm font-semibold text-white">Admin Panel</div>
              <div className="text-gray-400 text-xs mt-1">Manage questions & users</div>
            </motion.div>
          </Link>
        )}
      </div>

      {/* Recent Consultations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title text-xl">Recent Consultations</h2>
          {consultations?.length > 3 && (
            <Link to="/consultations" className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {isLoading ? (
          <SkeletonConsultationList count={3} />
        ) : recent.length === 0 ? (
          <div className="glass p-10 text-center">
            <ClipboardList className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">No consultations yet</p>
            <p className="text-gray-600 text-sm">Start your first consultation to build your question list</p>
            <Link to="/wizard" className="btn btn-primary btn-sm mt-4">
              <Plus className="w-4 h-4" /> Start Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((c, i) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <Link to={`/consultations/${c._id}`}>
                  <div className="glass-hover p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <ClipboardList className="w-5 h-5 text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{c.diseaseName}</div>
                      <div className="text-gray-400 text-sm">{getTimeAgo(c.createdAt)}</div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge variant={stageColors[c.stage] || 'default'}>{c.stage}</Badge>
                      <span className="text-gray-500 text-xs">{c.questionCount}q</span>
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
