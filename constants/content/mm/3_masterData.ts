import type { Chapter } from '../../../types';

export const CHAPTER_3_MASTER_DATA: Chapter = {
  id: 'ch3',
  title: '3. MM Master Data',
  lessons: [
    {
      id: 'l3-1',
      title: 'Vendor Master (Business Partner)',
      duration: 20,
      details: {
        tCode: 'BP',
        definition: 'The Vendor Master contains all data about a supplier. It is divided into General Data, Company Code Data (FI), and Purchasing Organization Data (MM).',
        purpose: 'To provide a single source of truth for all vendor information, such as address, payment terms, and purchasing conditions.',
        updatesS4HANA: 'Using the Business Partner (BP) transaction is mandatory in S/4HANA. Classic vendor master transactions (XK01, MK01, FK01) are obsolete and redirect to BP.',
      },
    },
    {
      id: 'l3-2',
      title: 'Material Master',
      duration: 20,
      details: {
        tCode: 'MM01',
        definition: 'The Material Master contains all information about a company\'s materials. Data is organized into "views" for different departments (e.g., Purchasing, MRP, Sales).',
        purpose: 'To centralize all material data. The Purchasing view contains data like the Purchasing Group and Order Unit. The MRP views control how the material is planned.',
        updatesS4HANA: 'The Material Master transaction is the same, but the material number can now be extended to 40 characters.',
      },
    },
    {
      id: 'l3-3',
      title: 'Purchasing Info Record',
      duration: 15,
      details: {
        tCode: 'ME11',
        definition: 'The Purchasing Info Record links a specific material with a specific vendor, storing key procurement information.',
        purpose: 'To store vendor-specific data for a material, such as the current price, delivery lead time, and price history. The system uses this record as a default source of information when creating a purchase order.',
        updatesS4HANA: 'The transaction and functionality remain the same. S/4HANA offers simplified pricing configuration which can impact how prices are stored.',
      },
    },
    {
      id: 'l3-4',
      title: 'Source List',
      duration: 15,
      details: {
        tCode: 'ME01',
        definition: 'A Source List specifies the preferred sources (vendors) for a material within a plant for a given period.',
        purpose: 'To control procurement sources. You can define a vendor as a "fixed" source, block a vendor, or link a vendor to a specific purchasing contract. The MRP run can use the source list to automatically assign a vendor to a purchase requisition.',
        updatesS4HANA: 'The functionality remains the same.',
      },
    },
  ],
  quiz: {
    id: 'mm-q3',
    title: 'MM Master Data Quiz',
    questions: [
      { question: 'In S/4HANA, which transaction is mandatory for creating vendor master data?', options: ['XK01', 'BP', 'ME11'], correctAnswer: 1 },
      { question: 'Which master record links a specific material to a specific vendor?', options: ['Source List', 'Material Master', 'Purchasing Info Record'], correctAnswer: 2 },
      { question: 'The purchasing data for a material is maintained in which master record view?', options: ['Purchasing View (Material Master)', 'General Data (Vendor Master)', 'Sales View (Material Master)'], correctAnswer: 0 },
    ]
  }
};
