import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, BarChart3, ChevronRight } from 'lucide-react';
import { useAdminStats } from '../../api/useAdmin';
import PageWrapper from '../../components/layout/PageWrapper';
import Spinner from '../../components/ui/Spinner';

const AdminDashboardPage = () => {
  const { data: stats, isLoading } = useAdminStats();

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="section-title">Admin Dashboard</h1>
        <p className="section-subtitle">Manage questions, users, and content</p>
      </div>

      {isLoading ? <Spinner className="py-10" /> : (
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Patients', value: stats?.userCount ?? 0, icon: Users, color: 'text-primary-400' },
            { label: 'Consultations', value: stats?.consultationCount ?? 0, icon: BarChart3, color: 'text-accent-400' },
            { label: 'Active Questions', value: stats?.questionCount ?? 0, icon: MessageSquare, color: 'text-emerald-400' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass p-6 text-center">
                <Icon className={`w-8 h-8 ${s.color} mx-auto mb-3`} />
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { to: '/admin/questions', label: 'Manage Questions', desc: 'Create, edit, or deactivate questions in the bank', icon: MessageSquare },
          { to: '/admin/users', label: 'Manage Users', desc: 'View all users and their consultation activity', icon: Users },
        ].map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.to} to={link.to}>
              <div className="glass-hover p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{link.label}</div>
                  <div className="text-gray-400 text-sm">{link.desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </Link>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default AdminDashboardPage;
