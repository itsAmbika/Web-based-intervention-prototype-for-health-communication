import PageWrapper from '../components/layout/PageWrapper';
import { useAuthStore } from '../store/useAuthStore';
import { useUpdateMe } from '../api/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { demographicsSchema } from '../validation/demographicsSchema';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  const { mutate: updateMe, isPending } = useUpdateMe();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(demographicsSchema),
    defaultValues: user?.demographics || {},
  });

  const onSubmit = (data) => {
    updateMe({ demographics: data }, {
      onSuccess: () => toast.success('Profile updated!'),
      onError: () => toast.error('Update failed'),
    });
  };

  return (
    <PageWrapper>
      <h1 className="section-title mb-2">My Profile</h1>
      <p className="section-subtitle mb-8">Update your personal details</p>
      <div className="glass p-8 max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Date of Birth</label>
              <input type="date" className="input" {...register('dateOfBirth')} />
            </div>
            <div>
              <label className="label">Gender</label>
              <select className="input bg-surface-700" {...register('gender')}>
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Primary Language</label>
            <select className="input bg-surface-700" {...register('primaryLanguage')}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="ta">Tamil</option>
            </select>
          </div>
          <Input id="city" label="City" placeholder="Mumbai" {...register('city')} />
          <Button type="submit" loading={isPending} className="w-full">Save Changes</Button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
