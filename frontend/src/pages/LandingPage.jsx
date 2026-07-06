import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ClipboardList, Download, ArrowRight, Star, ShieldCheck, Smartphone } from 'lucide-react';

const features = [
  {
    icon: ClipboardList,
    title: 'Guided Question Wizard',
    description: 'Step-by-step wizard tailored to your specific cancer type and stage, with 600+ expert-curated questions.',
    color: 'from-primary-500 to-primary-700',
  },
  {
    icon: Star,
    title: 'Prioritize What Matters',
    description: 'Mark your top 3 most important questions so doctors know exactly where to focus your limited appointment time.',
    color: 'from-accent-500 to-accent-700',
  },
  {
    icon: Download,
    title: 'Download as PDF',
    description: 'Generate a beautifully formatted PDF of your question list to bring to every appointment. Never forget a question again.',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    icon: ClipboardList,
    title: 'Consultation History',
    description: 'Keep a complete chronological record of all your past consultation question lists for easy reference.',
    color: 'from-amber-500 to-amber-700',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description: 'Your health data is protected with industry-standard encryption. We follow GDPR and India\'s DPDP guidelines.',
    color: 'from-rose-500 to-rose-700',
  },
  {
    icon: Smartphone,
    title: 'Works on Any Device',
    description: 'Fully responsive design works seamlessly on your phone, tablet, or desktop — wherever you prepare.',
    color: 'from-cyan-500 to-cyan-700',
  },
];

const stats = [
  { value: '8+', label: 'Cancer Types' },
  { value: '600+', label: 'Expert Questions' },
  { value: '4', label: 'Journey Stages' },
  { value: '100%', label: 'Free to Use' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-surface-900 overflow-hidden">
      {/* ─── Header ──────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-900/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-900/50">
              Q
            </div>
            <span className="font-bold text-white text-lg">QLP</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn btn-ghost btn-sm text-gray-300">
              Log In
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero Section ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-primary mb-6 inline-flex text-sm px-4 py-1.5">
              ✨ Empowering patients to ask the right questions
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Never Leave a{' '}
            <span className="gradient-text">Doctor's Appointment</span>{' '}
            Without Asking What Matters
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            QLP helps cancer patients and caregivers build personalized question lists using expert-curated questions — then download them as a PDF to bring to every consultation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/signup" className="btn btn-primary btn-lg group">
              Start Preparing — It's Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Log In to Your Account
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={item} className="glass p-4 rounded-xl text-center">
                <div className="text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Everything you need to prepare
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From diagnosis to survivorship, QLP guides you through every stage of your cancer journey.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={item} className="glass-hover p-6 group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────── */}
      <section className="py-24 bg-surface-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">How it works</h2>
            <p className="text-gray-400 text-lg">Six simple steps to your personalized question list</p>
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Select Your Cancer Type', desc: 'Choose from 8 cancer types. Your question bank is filtered immediately.' },
              { step: '02', title: 'Choose Your Stage', desc: 'Diagnosis, Treatment, Survivorship, or Palliative — questions are tailored to where you are.' },
              { step: '03', title: 'Pick Questions by Category', desc: 'Browse curated questions organized into Diagnosis, Tests, Treatment, Side Effects, and more.' },
              { step: '04', title: 'Mark Your Top 3', desc: 'Flag your three most critical questions so the doctor knows what you\'re most worried about.' },
              { step: '05', title: 'Add Custom Questions', desc: 'Add any personal questions that aren\'t in the list.' },
              { step: '06', title: 'Download Your PDF', desc: 'Generate a beautifully formatted PDF to bring to your appointment.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                className="flex items-start gap-6 glass p-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                  <span className="text-primary-400 font-black text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            className="glass p-12 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-accent-600/10" />
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4">
                Ready to take control of your appointments?
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Join patients who go into every consultation fully prepared.
              </p>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Create Your Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">Q</div>
            <span className="text-gray-400 text-sm">QLP — Question List Preparation</span>
          </div>
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} QLP. For patients, by design.</p>
          <div className="flex gap-4 text-gray-500 text-sm">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
