import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, ChevronLeft } from 'lucide-react';
import { useAdminQuestions, useDeleteAdminQuestion } from '../../api/useAdmin';
import { useDiseases, useCategories } from '../../api/useQuestions';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import toast from 'react-hot-toast';

const STAGES = ['Diagnosis', 'Treatment', 'Survivorship', 'Palliative'];

const AdminQuestionsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');

  const { data: questions, isLoading } = useAdminQuestions(filters);
  const { data: diseases } = useDiseases();
  const { data: categories } = useCategories();
  const { mutate: deleteQ, isPending: deleting } = useDeleteAdminQuestion();

  const handleDelete = (id, text) => {
    if (window.confirm(`Deactivate question: "${text.slice(0, 60)}..."?`)) {
      deleteQ(id, {
        onSuccess: () => toast.success('Question deactivated'),
        onError: () => toast.error('Failed to deactivate'),
      });
    }
  };

  const filtered = questions?.filter((q) =>
    search ? q.text.toLowerCase().includes(search.toLowerCase()) : true
  ) || [];

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="btn btn-ghost btn-sm"><ChevronLeft className="w-4 h-4" /></Link>
        <div className="flex-1">
          <h1 className="section-title">Question Bank</h1>
          <p className="section-subtitle">{questions?.length || 0} total questions</p>
        </div>
        <Button onClick={() => navigate('/admin/questions/new')} className="btn-sm">
          <Plus className="w-4 h-4" /> New Question
        </Button>
      </div>

      {/* Filters */}
      <div className="glass p-4 mb-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="input py-2 text-sm"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input py-2 text-sm w-auto bg-surface-700" onChange={(e) => setFilters((f) => ({ ...f, disease: e.target.value || undefined }))}>
          <option value="">All Diseases</option>
          {diseases?.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        <select className="input py-2 text-sm w-auto bg-surface-700" onChange={(e) => setFilters((f) => ({ ...f, stage: e.target.value || undefined }))}>
          <option value="">All Stages</option>
          {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="input py-2 text-sm w-auto bg-surface-700" onChange={(e) => setFilters((f) => ({ ...f, active: e.target.value === '' ? undefined : e.target.value }))}>
          <option value="">Active & Inactive</option>
          <option value="true">Active only</option>
          <option value="false">Inactive only</option>
        </select>
      </div>

      {isLoading ? <Spinner className="py-16" /> : (
        <div className="space-y-2">
          {filtered.map((q) => (
            <div key={q._id} className="glass p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm leading-relaxed">{q.text}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant={q.active ? 'success' : 'default'}>{q.active ? 'Active' : 'Inactive'}</Badge>
                  <span className="text-gray-500 text-xs">{q.diseaseId}</span>
                  <span className="text-gray-500 text-xs">{q.stage}</span>
                  <span className="text-gray-500 text-xs">{q.categoryId}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => navigate(`/admin/questions/${q._id}/edit`)}
                  className="btn btn-ghost btn-sm text-primary-400"
                  aria-label="Edit question"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(q._id, q.text)}
                  disabled={deleting || !q.active}
                  className="btn btn-ghost btn-sm text-red-400 disabled:opacity-30"
                  aria-label="Deactivate question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <div className="glass p-10 text-center text-gray-400">No questions match your filters.</div>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default AdminQuestionsPage;
