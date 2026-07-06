import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { questionSchema } from '../../validation/questionSchema';
import { useCreateAdminQuestion, useUpdateAdminQuestion, useAdminQuestion } from '../../api/useAdmin';
import { useDiseases, useCategories } from '../../api/useQuestions';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';

const STAGES = ['Diagnosis', 'Treatment', 'Survivorship', 'Palliative'];

const AdminQuestionFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: diseases } = useDiseases();
  const { data: categories } = useCategories();
  const { data: question, isLoading: loadingQuestion } = useAdminQuestion(id);
  const { mutate: create, isPending: creating } = useCreateAdminQuestion();
  const { mutate: update, isPending: updating } = useUpdateAdminQuestion();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: { active: true, order: 0 },
  });

  useEffect(() => {
    if (question) {
      reset({
        text: question.text,
        diseaseId: question.diseaseId,
        stage: question.stage,
        categoryId: question.categoryId,
        active: question.active,
        order: question.order,
      });
    }
  }, [question, reset]);

  const onSubmit = (data) => {
    const action = isEdit ? (d) => update({ id, ...d }) : create;
    action(data, {
      onSuccess: () => {
        toast.success(isEdit ? 'Question updated' : 'Question created');
        navigate('/admin/questions');
      },
      onError: (err) => toast.error(err.response?.data?.error || 'Failed to save question'),
    });
  };

  if (isEdit && loadingQuestion) {
    return (
      <PageWrapper>
        <Spinner size="lg" className="py-20" />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/questions" className="btn btn-ghost btn-sm"><ChevronLeft className="w-4 h-4" /></Link>
        <h1 className="section-title">{isEdit ? 'Edit Question' : 'New Question'}</h1>
      </div>

      <div className="glass p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="label">Question Text *</label>
            <textarea
              className={`input min-h-[120px] resize-y ${errors.text ? 'input-error' : ''}`}
              placeholder="Enter the full question text..."
              {...register('text')}
            />
            {errors.text && <p className="error-text">{errors.text.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Disease *</label>
              <select className={`input bg-surface-700 ${errors.diseaseId ? 'input-error' : ''}`} {...register('diseaseId')}>
                <option value="">Select disease...</option>
                {diseases?.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
              {errors.diseaseId && <p className="error-text">{errors.diseaseId.message}</p>}
            </div>

            <div>
              <label className="label">Stage *</label>
              <select className={`input bg-surface-700 ${errors.stage ? 'input-error' : ''}`} {...register('stage')}>
                <option value="">Select stage...</option>
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.stage && <p className="error-text">{errors.stage.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category *</label>
              <select className={`input bg-surface-700 ${errors.categoryId ? 'input-error' : ''}`} {...register('categoryId')}>
                <option value="">Select category...</option>
                {categories?.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              {errors.categoryId && <p className="error-text">{errors.categoryId.message}</p>}
            </div>

            <div>
              <label className="label">Display Order</label>
              <input type="number" className="input" min="0" {...register('order', { valueAsNumber: true })} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="active" className="w-4 h-4 rounded" {...register('active')} defaultChecked />
            <label htmlFor="active" className="text-gray-300 text-sm cursor-pointer">Active (visible to patients)</label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={creating || updating}>
              {isEdit ? 'Save Changes' : 'Create Question'}
            </Button>
            <Link to="/admin/questions" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AdminQuestionFormPage;
