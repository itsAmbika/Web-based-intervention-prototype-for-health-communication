require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Question = require('../models/Question');

const defaultQuestions = [
  {
    questionText: 'What is your biggest concern about your treatment?',
    category: 'Treatment',
    targetAudience: 'patient'
  },
  {
    questionText: 'What support do you need most right now?',
    category: 'Support',
    targetAudience: 'both'
  },
  {
    questionText: 'How has caregiving affected your daily routine?',
    category: 'Lifestyle',
    targetAudience: 'caregiver'
  },
  {
    questionText: 'What information would help you make treatment decisions?',
    category: 'Treatment',
    targetAudience: 'both'
  },
  {
    questionText: 'What are your main fears about the future?',
    category: 'Emotional',
    targetAudience: 'both'
  },
  {
    questionText: 'How are you coping with your diagnosis emotionally?',
    category: 'Emotional',
    targetAudience: 'patient'
  },
  {
    questionText: 'What challenges do you face in providing care?',
    category: 'Challenges',
    targetAudience: 'caregiver'
  },
  {
    questionText: 'What does a good day look like for you?',
    category: 'Wellbeing',
    targetAudience: 'both'
  },
  {
    questionText: 'How has your diagnosis affected your relationships?',
    category: 'Relationships',
    targetAudience: 'patient'
  },
  {
    questionText: 'What resources or services would help you most?',
    category: 'Support',
    targetAudience: 'caregiver'
  }
];

const seed = async () => {
  try {
    await connectDB();

    const count = await Question.countDocuments();
    if (count > 0) {
      console.log(`Skipping seed: ${count} question(s) already exist in the database.`);
      await mongoose.disconnect();
      return;
    }

    await Question.insertMany(defaultQuestions);
    console.log(`Successfully seeded ${defaultQuestions.length} default questions.`);
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seed();
