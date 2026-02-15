
import type { Chapter } from '../../../types';

export const CHAPTER_7_PRICING: Chapter = {
  id: 'ch7',
  title: '7. Pricing & Condition Techniques',
  lessons: [
    {
        id: 'l7-1',
        title: 'Introduction to Condition Technique',
        duration: 15,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'The Condition Technique is a powerful and flexible method used in SAP to determine various results, most notably pricing. It is a structured process that searches for valid data from master data records based on the information in a transaction.',
            purpose: 'To allow for highly flexible and automatic price determination. The system can find prices, discounts, and taxes based on a wide variety of criteria (e.g., customer, material, region) without any manual input.',
            configurationSteps: [
                'The main components of the condition technique are:',
                '1. <b>Condition Tables:</b> Define the key fields for a condition record.',
                '2. <b>Access Sequences:</b> Define the search strategy the system uses to check condition tables.',
                '3. <b>Condition Types:</b> Represent a specific pricing element (e.g., price, discount).',
                '4. <b>Pricing Procedure:</b> A sequence of condition types that the system uses to calculate the final price.',
            ],
            integrationNotes: 'This technique is used not only in pricing but also in output determination, account determination, and material determination.',
            updatesS4HANA: 'The condition technique remains the core of pricing in S/4HANA. The underlying tables have been optimized for HANA performance.',
        },
    },
    {
        id: 'l7-2',
        title: 'Condition Tables',
        duration: 15,
        details: {
            tCode: 'V/03',
            sproPath: 'Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define Condition Tables',
            definition: 'A Condition Table defines the structure of a condition record. It specifies the combination of fields (the "key") that will be used to store and retrieve a condition record.',
            purpose: 'To create the specific key combinations for which you want to maintain pricing data. For example, you can create a table with the key "Sales Org / Customer / Material" to set a specific price for a material for a single customer.',
            configurationSteps: ['In V/03, you select fields from a predefined field catalog to create a new condition table (e.g., Table 990). The system then generates a physical database table in the background.'],
            integrationNotes: 'N/A',
            updatesS4HANA: 'The process of creating condition tables is the same.',
        },
    },
    {
        id: 'l7-3',
        title: 'Access Sequences',
        duration: 20,
        details: {
            tCode: 'V/07',
            sproPath: 'Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define Access Sequences',
            definition: 'An Access Sequence is a search strategy that tells the system in which order to check different condition tables to find a valid condition record.',
            purpose: 'To allow for flexible pricing strategies. For example, you can instruct the system to first search for a customer-specific price (most specific) and, if not found, then search for a general price list price (most general).',
            configurationSteps: ['In V/07, you create an access sequence and assign your condition tables to it in a specific sequence (e.g., Table 10, then Table 20, etc.). The "Exclusive" flag tells the system to stop searching once it finds a valid record.'],
            integrationNotes: 'An Access Sequence is assigned to a Condition Type.',
            updatesS4HANA: 'The configuration process is the same.',
        },
    },
    {
        id: 'l7-4',
        title: 'Condition Types',
        duration: 20,
        details: {
            tCode: 'V/06',
            sproPath: 'Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define Condition Types',
            definition: 'A Condition Type represents a specific type of pricing element in the pricing procedure.',
            purpose: 'To define the characteristics of a price, discount, surcharge, or tax. Examples: PR00 (Price), K007 (Customer Discount), MWST (Output Tax). It controls how the value is calculated (e.g., percentage, fixed amount) and its behavior.',
            configurationSteps: ['In V/06, you define a condition type and assign an access sequence to it. This links the pricing element to the search strategy.'],
            integrationNotes: 'Condition types are the building blocks of the pricing procedure.',
            updatesS4HANA: 'The configuration process is the same.',
        },
    },
    {
        id: 'l7-5',
        title: 'Pricing Procedure & Determination',
        duration: 25,
        details: {
            tCode: 'V/08 (Define), OVKK (Determine)',
            sproPath: 'Sales and Distribution > Basic Functions > Pricing > Pricing Control > Define And Assign Pricing Procedures',
            definition: 'The Pricing Procedure is a sequential list of condition types that the system uses to calculate the final net price for a sales document.',
            purpose: 'To bring all the pricing elements together in a structured calculation schema. It defines the base price, applies discounts and surcharges, calculates taxes, and arrives at the final value.',
            configurationSteps: [
                '1. <b>Define (V/08):</b> Create a procedure and arrange the condition types in the desired sequence. Use steps and counters to define the calculation logic (e.g., discount is based on the gross price from step 100).',
                '2. <b>Determine (OVKK):</b> The system determines which pricing procedure to use for a sales document based on the combination of: Sales Area + Document Pricing Procedure (from Sales Doc Type) + Customer Pricing Procedure (from Customer Master).',
            ],
            integrationNotes: 'The pricing procedure is the culmination of all pricing configuration. The values calculated here are what get passed to FI during billing.',
            updatesS4HANA: 'The configuration and determination logic are unchanged and remain central to SD functionality.',
        },
    },
  ],
  quiz: {
    id: 'sd-q7',
    title: 'Pricing Quiz',
    questions: [
      { question: 'Which component of the condition technique defines the search strategy?', options: ['Condition Table', 'Access Sequence', 'Condition Type'], correctAnswer: 1 },
      { question: 'PR00, K007, and MWST are examples of what?', options: ['Pricing Procedures', 'Access Sequences', 'Condition Types'], correctAnswer: 2 },
      { question: 'The system determines the Pricing Procedure based on Sales Area, Document Pricing Procedure, and what else?', options: ['Material Master Pricing Group', 'Customer Pricing Procedure', 'Shipping Point'], correctAnswer: 1 },
      { question: 'Which T-Code is used to define the pricing procedure itself?', options: ['V/06', 'V/07', 'V/08'], correctAnswer: 2 },
    ]
  }
};
