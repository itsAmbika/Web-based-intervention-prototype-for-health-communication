import { Link } from 'react-router-dom';
import { ChevronLeft, User2, ShieldCheck, ShieldOff, ToggleLeft, ToggleRight } from 'lucide-react';
import { useAdminUsers, useUpdateAdminUser } from '../../api/useAdmin';
import PageWrapper from '../../components/layout/PageWrapper';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import toast from 'react-hot-toast';

const AdminUsersPage = () => {
  const { data: users, isLoading } = useAdminUsers();
  const { mutate: updateUser } = useUpdateAdminUser();

  const toggleActive = (user) => {
    updateUser({ id: user._id, active: !user.active }, {
      onSuccess: () => toast.success(`User ${user.active ? 'deactivated' : 'activated'}`),
      onError: () => toast.error('Failed to update user'),
    });
  };

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin" className="btn btn-ghost btn-sm"><ChevronLeft className="w-4 h-4" /></Link>
        <div>
          <h1 className="section-title">Users</h1>
          <p className="section-subtitle">{users?.length || 0} registered users</p>
        </div>
      </div>

      {isLoading ? <Spinner className="py-16" /> : (
        <div className="space-y-2">
          {users?.map((u) => (
            <div key={u._id} className="glass p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-600/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                <User2 className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">{u.name}</div>
                <div className="text-gray-400 text-sm truncate">{u.email}</div>
              </div>
              <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                <span className="text-gray-400 text-sm">{u.consultationCount} sessions</span>
                <Badge variant={u.role === 'admin' ? 'warning' : 'default'}>{u.role}</Badge>
                <Badge variant={u.active ? 'success' : 'default'}>{u.active ? 'Active' : 'Inactive'}</Badge>
              </div>
              <button
                onClick={() => toggleActive(u)}
                className="btn btn-ghost btn-sm text-gray-400 hover:text-white flex-shrink-0"
                aria-label={u.active ? 'Deactivate user' : 'Activate user'}
              >
                {u.active ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default AdminUsersPage;
