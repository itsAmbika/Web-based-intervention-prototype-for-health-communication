require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Disease = require('../models/Disease');
const Category = require('../models/Category');
const Question = require('../models/Question');

// ─── Data ──────────────────────────────────────────────────────────────────

const DISEASES = [
  { _id: 'BR', name: 'Breast Cancer', icon: '🎗️', color: '#ec4899', description: 'Cancer originating in breast tissue' },
  { _id: 'LU', name: 'Lung Cancer', icon: '🫁', color: '#3b82f6', description: 'Cancer originating in lung tissue' },
  { _id: 'CO', name: 'Colorectal Cancer', icon: '🔵', color: '#10b981', description: 'Cancer of the colon or rectum' },
  { _id: 'PR', name: 'Prostate Cancer', icon: '🔷', color: '#6366f1', description: 'Cancer of the prostate gland' },
  { _id: 'LE', name: 'Leukemia', icon: '🩸', color: '#ef4444', description: 'Cancer of blood-forming tissues' },
  { _id: 'LY', name: 'Lymphoma', icon: '🔴', color: '#f97316', description: 'Cancer of the lymphatic system' },
  { _id: 'OV', name: 'Ovarian Cancer', icon: '🟣', color: '#8b5cf6', description: 'Cancer of the ovaries' },
  { _id: 'PA', name: 'Pancreatic Cancer', icon: '🟡', color: '#eab308', description: 'Cancer of the pancreas' },
];

const CATEGORIES = [
  { _id: 'cat_diagnosis', name: 'Diagnosis & Staging', order: 1, icon: '🔍' },
  { _id: 'cat_tests', name: 'Tests & Imaging', order: 2, icon: '🧪' },
  { _id: 'cat_treatment', name: 'Treatment Options', order: 3, icon: '💊' },
  { _id: 'cat_sideeffects', name: 'Side Effects & Management', order: 4, icon: '⚠️' },
  { _id: 'cat_support', name: 'Support & Lifestyle', order: 5, icon: '🤝' },
  { _id: 'cat_followup', name: 'Follow-up & Monitoring', order: 6, icon: '📋' },
];

const STAGES = ['Diagnosis', 'Treatment', 'Survivorship', 'Palliative'];

// Questions template — shared across all diseases for each stage+category
// Disease-specific questions are added per disease below
const SHARED_QUESTIONS = {
  Diagnosis: {
    cat_diagnosis: [
      'What type of cancer do I have and what does my diagnosis mean?',
      'What is the stage of my cancer and what does it mean for my prognosis?',
      'How certain is this diagnosis? Do I need a second opinion?',
      'Has the cancer spread to my lymph nodes or other organs?',
      'What are the risk factors that may have contributed to my cancer?',
    ],
    cat_tests: [
      'What tests or biopsies confirmed my diagnosis?',
      'Are there additional tests I need to fully understand my diagnosis?',
      'How soon will I get all the test results?',
      'Will I need genetic testing, and what would that tell us?',
      'What imaging scans are needed and how often?',
    ],
    cat_treatment: [
      'What are all the treatment options available for my type and stage?',
      'Which treatment do you recommend and why?',
      'Are there clinical trials I may be eligible for?',
      'What happens if I choose not to treat or delay treatment?',
      'Should I see other specialists before deciding on a treatment plan?',
    ],
    cat_support: [
      'Who else should be part of my care team?',
      'Are there support groups or counselors you recommend?',
      'How should I talk to my family about this diagnosis?',
      'Are there resources for financial assistance with treatment costs?',
      'How can a patient navigator help me?',
    ],
  },
  Treatment: {
    cat_treatment: [
      'What is the goal of my current treatment — cure, control, or comfort?',
      'How long will my treatment last and what does a typical schedule look like?',
      'How will I know if the treatment is working?',
      'What happens if this treatment does not work?',
      'Are there newer or alternative treatments I should consider?',
    ],
    cat_sideeffects: [
      'What are the most common side effects of this treatment?',
      'What side effects should prompt me to call you immediately?',
      'How can I manage nausea, fatigue, or pain during treatment?',
      'Will treatment affect my fertility or sexual health?',
      'How will treatment affect my daily life and ability to work?',
      'Are there medications to help manage side effects?',
    ],
    cat_tests: [
      'What monitoring tests will I need during treatment?',
      'How often will I have scans or blood tests?',
      'What results would indicate we need to change the treatment plan?',
    ],
    cat_support: [
      'What dietary changes should I make during treatment?',
      'Is it safe to exercise during treatment?',
      'Are there complementary therapies (acupuncture, massage) that might help?',
      'What mental health support is available during treatment?',
      'How can my caregivers best support me?',
    ],
  },
  Survivorship: {
    cat_followup: [
      'How often do I need follow-up appointments after treatment?',
      'What signs of cancer recurrence should I watch for?',
      'What long-term side effects might I experience from treatment?',
      'How long will it take to recover my energy and strength?',
      'What tests will I need during follow-up and how often?',
    ],
    cat_support: [
      'How can I reduce the risk of cancer coming back?',
      'Are there lifestyle changes (diet, exercise, weight) that will help?',
      'How do I cope with the fear of recurrence?',
      'Are there support groups for cancer survivors?',
      'When can I return to work and normal activities?',
    ],
    cat_treatment: [
      'Do I need to continue any medications after treatment ends?',
      'Are there hormonal or other therapies to take long-term?',
      'What happens if cancer returns — what are my options?',
    ],
    cat_sideeffects: [
      'Will I have permanent changes to my body after treatment?',
      'How do I manage chronic fatigue or brain fog ("chemo brain")?',
      'What can I do about changes in my weight or body image?',
    ],
  },
  Palliative: {
    cat_treatment: [
      'What is the goal of my care at this stage?',
      'How can we best manage my symptoms and maintain my quality of life?',
      'What are my options for palliative or hospice care?',
      'Can treatment still slow the cancer or relieve symptoms?',
      'When should we consider stopping treatment?',
    ],
    cat_sideeffects: [
      'How can my pain be better controlled?',
      'What medications can help with breathlessness or discomfort?',
      'How do I access 24-hour support if symptoms worsen?',
    ],
    cat_support: [
      'How should I prepare my family for what lies ahead?',
      'What advance care planning documents should I have?',
      'Is there a palliative care or hospice team I can be referred to?',
      'What emotional and spiritual support is available to me and my family?',
      'How do I express my wishes for end-of-life care?',
    ],
    cat_followup: [
      'How often should we meet and how do I reach you between appointments?',
      'Who is the best person to contact when I have urgent symptoms?',
    ],
  },
};

// Disease-specific additional questions
const DISEASE_SPECIFIC = {
  BR: {
    Diagnosis: {
      cat_diagnosis: [
        'Is my cancer hormone receptor positive (ER/PR) or HER2 positive?',
        'What does the Oncotype DX or similar genomic test show?',
      ],
      cat_treatment: [
        'Would I be a candidate for breast-conserving surgery (lumpectomy) vs mastectomy?',
        'Do I need to decide about breast reconstruction now?',
      ],
    },
    Treatment: {
      cat_treatment: [
        'Will I need chemotherapy before surgery (neoadjuvant) or after?',
        'Is targeted therapy (like trastuzumab for HER2+) part of my plan?',
      ],
      cat_sideeffects: [
        'How will chemotherapy affect my hair and when will it grow back?',
        'What can I do about arm swelling (lymphedema) after surgery?',
      ],
    },
  },
  LU: {
    Diagnosis: {
      cat_diagnosis: [
        'What is the type of lung cancer — non-small cell or small cell?',
        'Has my tumor been tested for EGFR, ALK, ROS1, or PD-L1 mutations?',
      ],
      cat_treatment: [
        'Am I a candidate for surgery, and what type?',
        'Is targeted therapy or immunotherapy an option based on my mutations?',
      ],
    },
    Treatment: {
      cat_treatment: [
        'What is the difference between targeted therapy and immunotherapy for my cancer?',
        'If I have EGFR or ALK mutation, what targeted drugs are available?',
      ],
    },
  },
  CO: {
    Diagnosis: {
      cat_diagnosis: [
        'Is my colorectal cancer hereditary (Lynch syndrome, FAP)?',
        'Should my family members be tested?',
      ],
      cat_treatment: [
        'Do I need surgery, and what type (colostomy, ileostomy)?',
        'Will I need a stoma and is it permanent?',
      ],
    },
    Treatment: {
      cat_sideeffects: [
        'How will treatment affect my bowel habits?',
        'What dietary changes are needed after surgery?',
      ],
    },
  },
  PR: {
    Diagnosis: {
      cat_diagnosis: [
        'What is my Gleason score and what does it mean?',
        'What is my PSA level and how does it guide treatment decisions?',
      ],
      cat_treatment: [
        'Is active surveillance an option for me instead of immediate treatment?',
        'What are the differences between surgery, radiation, and hormone therapy for my stage?',
      ],
    },
    Treatment: {
      cat_sideeffects: [
        'How will treatment affect my urinary function and continence?',
        'How will hormone therapy affect my sexual function, bone density, and mood?',
      ],
    },
  },
  LE: {
    Diagnosis: {
      cat_diagnosis: [
        'What type of leukemia do I have (ALL, AML, CLL, CML)?',
        'What specific chromosome or gene mutations are driving my leukemia?',
      ],
      cat_treatment: [
        'Is a bone marrow or stem cell transplant part of my treatment plan?',
        'Is targeted therapy (like imatinib for CML) an option?',
      ],
    },
    Treatment: {
      cat_sideeffects: [
        'How will chemotherapy affect my immune system and infection risk?',
        'How do I protect myself from infections during treatment?',
      ],
    },
  },
  LY: {
    Diagnosis: {
      cat_diagnosis: [
        'Do I have Hodgkin or Non-Hodgkin lymphoma, and what subtype?',
        'What does the PET/CT scan show about the extent of disease?',
      ],
      cat_treatment: [
        'What are the treatment options — chemotherapy, radiation, immunotherapy?',
        'Is CAR-T cell therapy or stem cell transplant an option?',
      ],
    },
  },
  OV: {
    Diagnosis: {
      cat_diagnosis: [
        'Do I have the BRCA1 or BRCA2 gene mutation?',
        'What stage is my ovarian cancer and what does it mean?',
      ],
      cat_treatment: [
        'Is surgery the first step, or chemotherapy first (neoadjuvant)?',
        'Am I eligible for PARP inhibitor maintenance therapy?',
      ],
    },
    Treatment: {
      cat_sideeffects: [
        'How will treatment affect my hormone levels and menopause symptoms?',
        'What can I do about peripheral neuropathy from platinum-based chemo?',
      ],
    },
  },
  PA: {
    Diagnosis: {
      cat_diagnosis: [
        'Is my pancreatic cancer resectable (operable), borderline, or unresectable?',
        'What does "locally advanced" mean for my prognosis?',
      ],
      cat_treatment: [
        'What is the Whipple procedure and am I a candidate?',
        'What chemotherapy regimen do you recommend (FOLFIRINOX, Gemcitabine)?',
      ],
    },
    Treatment: {
      cat_sideeffects: [
        'How can I manage weight loss and nutritional issues during treatment?',
        'Do I need pancreatic enzyme replacement therapy?',
      ],
    },
  },
};

// ─── Seed Function ──────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected');

  // Clear existing data
  await Promise.all([
    Disease.deleteMany({}),
    Category.deleteMany({}),
    Question.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing seed data');

  // Insert diseases
  await Disease.insertMany(DISEASES);
  console.log(`✅ Seeded ${DISEASES.length} diseases`);

  // Insert categories
  await Category.insertMany(CATEGORIES);
  console.log(`✅ Seeded ${CATEGORIES.length} categories`);

  // Build questions array
  const questions = [];

  for (const disease of DISEASES) {
    for (const stage of STAGES) {
      const sharedStage = SHARED_QUESTIONS[stage] || {};
      const specificStage = (DISEASE_SPECIFIC[disease._id] || {})[stage] || {};

      // All categories that appear in either shared or specific for this stage
      const allCategories = new Set([
        ...Object.keys(sharedStage),
        ...Object.keys(specificStage),
      ]);

      for (const catId of allCategories) {
        const sharedQs = sharedStage[catId] || [];
        const specificQs = specificStage[catId] || [];
        const combined = [...sharedQs, ...specificQs];

        combined.forEach((text, idx) => {
          questions.push({
            text,
            diseaseId: disease._id,
            stage,
            categoryId: catId,
            active: true,
            order: idx,
          });
        });
      }
    }
  }

  await Question.insertMany(questions);
  console.log(`✅ Seeded ${questions.length} questions`);

  // Summary
  console.log('\n📊 Seed Summary:');
  for (const disease of DISEASES) {
    const count = questions.filter((q) => q.diseaseId === disease._id).length;
    console.log(`   ${disease.icon} ${disease.name}: ${count} questions`);
  }

  await mongoose.disconnect();
  console.log('\n✅ Seeding complete! Disconnected from MongoDB.');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
