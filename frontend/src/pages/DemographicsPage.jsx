import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User2 } from 'lucide-react';
import { demographicsSchema } from '../validation/demographicsSchema';
import { useUpdateMe } from '../api/useAuth';
import { useAuthStore } from '../store/useAuthStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const DemographicsPage = () => {
  const navigate = useNavigate();
  const { mutate: updateMe, isPending } = useUpdateMe();
  const user = useAuthStore((s) => s.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(demographicsSchema),
    defaultValues: {
      relation: 'self',
      primaryLanguage: 'en',
    },
  });

  const onSubmit = (data) => {
    updateMe(
      { demographics: data },
      {
        onSuccess: () => {
          toast.success("Profile saved! Let's get started.");
          navigate('/dashboard');
        },
        onError: () => toast.error('Failed to save profile. Please try again.'),
      }
    );
  };

  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-600/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg"
      >
        <div className="glass p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
              <User2 className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Complete Your Profile</h1>
              <p className="text-gray-400 text-sm">Hi {user?.name?.split(' ')[0]}! A few details to personalize your experience.</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-8 mt-3 bg-surface-700/50 p-3 rounded-lg border border-white/5">
            🔒 This information is kept private and helps us tailor your question wizard experience.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Date of Birth</label>
                <input
                  type="date"
                  className="input"
                  {...register('dateOfBirth')}
                />
              </div>

              <div>
                <label className="label">Gender</label>
                <select className="input bg-surface-700" {...register('gender')}>
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">You are visiting for</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'self', label: 'Myself (Patient)' },
                  { value: 'caregiver', label: 'Someone I care for' },
                  { value: 'family', label: 'A family member' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="glass p-3 rounded-xl cursor-pointer text-center text-sm transition-all has-[:checked]:border-primary-500 has-[:checked]:bg-primary-600/10"
                  >
                    <input type="radio" value={opt.value} {...register('relation')} className="sr-only" />
                    <span className="text-gray-300">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Primary Language</label>
                <select className="input bg-surface-700" {...register('primaryLanguage')}>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="bn">Bengali</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="mr">Marathi</option>
                  <option value="gu">Gujarati</option>
                  <option value="kn">Kannada</option>
                </select>
              </div>

              <Input
                id="city"
                label="City (Optional)"
                placeholder="Mumbai"
                {...register('city')}
              />
            </div>

            <Button type="submit" loading={isPending} className="w-full mt-2">
              Save & Continue to Dashboard
            </Button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Skip for now
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default DemographicsPage;
