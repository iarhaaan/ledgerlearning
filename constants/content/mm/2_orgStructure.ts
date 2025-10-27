import type { Chapter } from '../../../types';

export const CHAPTER_2_ORG_STRUCTURE: Chapter = {
  id: 'ch2',
  title: '2. MM Organization Structure',
  lessons: [
    {
      id: 'l2-1',
      title: 'Plant',
      duration: 15,
      details: {
        tCode: 'OX10',
        sproPath: 'Enterprise Structure > Definition > Logistics - General > Define, copy, delete, check Plant',
        definition: 'A Plant is an operational unit within a company. It can be a manufacturing facility, a distribution center, or a warehouse where goods and services are produced, stored, or distributed.',
        purpose: 'The Plant is the central organizational unit for production, procurement, maintenance, and materials planning. All material valuation occurs at the Plant level.',
        integrationNotes: 'A Plant must be assigned to a single Company Code. One Company Code can have multiple Plants.',
        updatesS4HANA: 'The concept and configuration are unchanged. Plants are fundamental to all logistics operations.',
      },
    },
    {
      id: 'l2-2',
      title: 'Storage Location',
      duration: 10,
      details: {
        tCode: 'OX09',
        sproPath: 'Enterprise Structure > Definition > Materials Management > Maintain storage location',
        definition: 'A Storage Location is an organizational unit that allows for the differentiation of material stocks within a Plant.',
        purpose: 'To manage inventory at a more granular level. For example, a plant can have separate storage locations for raw materials, finished goods, and scrap.',
        integrationNotes: 'A Storage Location is always assigned to a Plant. Inventory is managed at the Storage Location level for quantity, but not for value (valuation is at Plant level).',
        updatesS4HANA: 'The concept and configuration are unchanged.',
      },
    },
    {
      id: 'l2-3',
      title: 'Purchasing Organization',
      duration: 15,
      details: {
        tCode: 'OX08',
        sproPath: 'Enterprise Structure > Definition > Materials Management > Maintain purchasing organization',
        definition: 'A Purchasing Organization is an organizational unit responsible for procuring materials and services for one or more plants and for negotiating purchasing conditions with vendors.',
        purpose: 'To structure and manage all purchasing activities. It is responsible for all purchase orders.',
        integrationNotes: 'A Purchasing Organization can be assigned to a Company Code (company-specific), to Plants (plant-specific), or can be cross-company (centralized). This assignment determines its operational scope.',
        updatesS4HANA: 'The concept and configuration are unchanged.',
      },
    },
    {
      id: 'l2-4',
      title: 'Purchasing Group',
      duration: 10,
      details: {
        tCode: 'OME4',
        sproPath: 'Materials Management > Purchasing > Create Purchasing Groups',
        definition: 'A Purchasing Group is a key for a buyer or a group of buyers who are responsible for certain purchasing activities.',
        purpose: 'To represent the individual or team responsible for day-to-day procurement. It is used for reporting and can be used in approval workflows. It is independent of the other org structures.',
        integrationNotes: 'The Purchasing Group is assigned in the material master and purchase order and is a key contact point for vendors.',
        updatesS4HANA: 'The concept and configuration are unchanged.',
      },
    },
  ],
  quiz: {
    id: 'mm-q2',
    title: 'MM Organization Structure Quiz',
    questions: [
      { question: 'At which organizational level is material valuation performed?', options: ['Storage Location', 'Company Code', 'Plant'], correctAnswer: 2 },
      { question: 'Which organizational unit is responsible for negotiating prices with vendors?', options: ['Purchasing Group', 'Purchasing Organization', 'Plant'], correctAnswer: 1 },
      { question: 'A Storage Location is always assigned to which higher-level unit?', options: ['Company Code', 'Plant', 'Purchasing Organization'], correctAnswer: 1 },
    ]
  }
};
