import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Download, Calendar, ClipboardList } from 'lucide-react';
import { useConsultation, useDownloadPdf } from '../api/useConsultations';
import PageWrapper from '../components/layout/PageWrapper';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';

const stageColors = { Diagnosis: 'primary', Treatment: 'warning', Survivorship: 'success', Palliative: 'default' };

const ConsultationDetailPage = () => {
  const { id } = useParams();
  const { data: consultation, isLoading } = useConsultation(id);
  const { mutate: downloadPdf, isPending: pdfLoading } = useDownloadPdf();

  if (isLoading) return <PageWrapper><Spinner className="py-20" /></PageWrapper>;
  if (!consultation) return <PageWrapper><div className="text-gray-400 text-center py-20">Consultation not found.</div></PageWrapper>;

  // Group questions by category
  const grouped = {};
  consultation.questions.forEach((q) => {
    if (!grouped[q.categoryName]) grouped[q.categoryName] = [];
    grouped[q.categoryName].push(q);
  });

  const topQuestions = consultation.questions.filter((q) => q.isTop);

  return (
    <PageWrapper>
      {/* Back */}
      <Link to="/consultations" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to consultations
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{consultation.diseaseName}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Badge variant={stageColors[consultation.stage] || 'default'}>{consultation.stage}</Badge>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(consultation.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <ClipboardList className="w-3.5 h-3.5" />
                {consultation.questions.length} questions
              </div>
            </div>
          </div>
          <Button
            onClick={() => downloadPdf(id, {
              onError: () => toast.error('PDF generation failed. Please try again.'),
            })}
            loading={pdfLoading}
            className="flex-shrink-0"
          >
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      </motion.div>

      {/* Top Priority Questions */}
      {topQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 mb-6 border border-amber-500/20"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            Top Priority Questions
          </h2>
          <ol className="space-y-3">
            {topQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <p className="text-white text-sm leading-relaxed">{q.text}</p>
              </li>
            ))}
          </ol>
        </motion.div>
      )}

      {/* Questions by Category */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, questions], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className="glass p-6"
          >
            <h3 className="text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">{category}</h3>
            <ul className="space-y-2">
              {questions.map((q, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
                  <span className="text-primary-500 mt-1 flex-shrink-0">•</span>
                  {q.text}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Custom Questions */}
        {consultation.customQuestions?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6"
          >
            <h3 className="text-accent-400 text-xs font-semibold uppercase tracking-wider mb-4">My Custom Questions</h3>
            <ul className="space-y-2">
              {consultation.customQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
                  <span className="text-accent-400 mt-1 flex-shrink-0">•</span>
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ConsultationDetailPage;
