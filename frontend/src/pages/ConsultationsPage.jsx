import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, ChevronRight, Calendar, Plus } from 'lucide-react';
import { useConsultations } from '../api/useConsultations';
import PageWrapper from '../components/layout/PageWrapper';
import Badge from '../components/ui/Badge';
import { SkeletonConsultationList } from '../components/ui/Skeleton';

const stageColors = { Diagnosis: 'primary', Treatment: 'warning', Survivorship: 'success', Palliative: 'default' };

const ConsultationsPage = () => {
  const { data: consultations, isLoading } = useConsultations();

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">My Consultations</h1>
          <p className="section-subtitle">A history of all your question lists</p>
        </div>
        <Link to="/wizard" className="btn btn-primary btn-sm">
          <Plus className="w-4 h-4" /> New
        </Link>
      </div>

      {isLoading ? (
        <SkeletonConsultationList count={6} />
      ) : !consultations?.length ? (
        <div className="glass p-16 text-center">
          <ClipboardList className="w-14 h-14 text-gray-600 mx-auto mb-4" />
          <p className="text-lg text-gray-400 mb-1">No consultations yet</p>
          <p className="text-gray-600 text-sm mb-6">Start your first one to build a question list</p>
          <Link to="/wizard" className="btn btn-primary">
            <Plus className="w-4 h-4" /> Start Now
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {consultations.map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={`/consultations/${c._id}`}>
                <div className="glass-hover p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white">{c.diseaseName}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-gray-400 text-sm">
                        {new Date(c.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge variant={stageColors[c.stage] || 'default'}>{c.stage}</Badge>
                    <div className="text-right hidden sm:block">
                      <div className="text-white text-sm font-medium">{c.questionCount} questions</div>
                      {c.topCount > 0 && (
                        <div className="text-amber-400 text-xs">⭐ {c.topCount} top</div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default ConsultationsPage;
