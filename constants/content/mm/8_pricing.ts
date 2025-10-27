import type { Chapter } from '../../../types';

export const CHAPTER_8_PRICING: Chapter = {
  id: 'ch8',
  title: '8. MM Pricing Procedure',
  lessons: [
    {
      id: 'l8-1',
      title: 'Condition Technique in Purchasing',
      duration: 15,
      details: {
        definition: 'Similar to SD, MM uses the condition technique to determine prices in purchasing documents. It is a structured process that searches for valid data to calculate the net price.',
        purpose: 'To allow for flexible and automatic determination of prices, discounts, freight costs, and taxes in a Purchase Order.',
        integrationNotes: 'The components are the same as in SD: Condition Tables, Access Sequences, Condition Types, and the Pricing Procedure (also called Calculation Schema in MM).',
        updatesS4HANA: 'S/4HANA introduces a simplified pricing model, but the underlying condition technique is still the foundation.',
      },
    },
    {
      id: 'l8-2',
      title: 'Pricing Procedure Determination',
      duration: 20,
      details: {
        definition: 'The system determines which pricing procedure (calculation schema) to use based on a combination of the Purchasing Organization and the Vendor Schema Group.',
        purpose: 'To ensure the correct calculation schema is used for different vendors or purchasing scenarios.',
        integrationNotes: 'The Vendor Schema Group is assigned in the vendor master record (Purchasing Data view).',
        updatesS4HANA: 'Determination logic remains the same.',
      },
    },
  ],
  quiz: {
    id: 'mm-q8',
    title: 'MM Pricing Quiz',
    questions: [
      { question: 'What is the name for the pricing procedure in MM terminology?', options: ['Pricing Schema', 'Calculation Schema', 'Valuation Schema'], correctAnswer: 1 },
      { question: 'The pricing procedure is determined based on the Purchasing Organization and what other factor?', options: ['Vendor Schema Group', 'Material Group', 'Purchasing Group'], correctAnswer: 0 },
    ]
  }
};
