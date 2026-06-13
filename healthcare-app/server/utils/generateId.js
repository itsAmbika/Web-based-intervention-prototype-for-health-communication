const Counter = require('../models/Counter');

/**
 * Generates a formatted ID for a patient or caregiver.
 * @param {'patient' | 'caregiver'} type
 * @returns {Promise<string>} e.g. 'PAT-00001' or 'CAR-00001'
 */
async function generateId(type) {
  const counter = await Counter.findOneAndUpdate(
    { name: type },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  const prefix = type === 'patient' ? 'PAT' : 'CAR';
  const paddedValue = String(counter.value).padStart(5, '0');

  return `${prefix}-${paddedValue}`;
}

module.exports = generateId;
