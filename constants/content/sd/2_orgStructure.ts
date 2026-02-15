
import type { Chapter } from '../../../types';

export const CHAPTER_2_ORG_STRUCTURE: Chapter = {
  id: 'ch2',
  title: '2. SD Organization Structure',
  lessons: [
    {
        id: 'l2-1',
        title: 'Sales Organization',
        duration: 15,
        details: {
            tCode: 'OVX5',
            sproPath: 'Enterprise Structure > Definition > Sales and Distribution > Define, copy, delete, check Sales Organization',
            definition: 'A Sales Organization is the central organizational unit in SD. It is responsible for the sale and distribution of goods and services, and for negotiating terms and conditions of sale.',
            purpose: 'To represent a selling unit within the company. It is assigned to a Company Code, and all sales documents (orders, deliveries, invoices) belong to one Sales Organization.',
            configurationSteps: ['Define a 4-character key, name, and assign a currency.'],
            integrationNotes: 'A Sales Organization must be assigned to one Company Code. This link determines which legal entity is making the sale, which is crucial for FI postings.',
            updatesS4HANA: 'The concept and configuration are unchanged in S/4HANA.',
        },
    },
    {
        id: 'l2-2',
        title: 'Distribution Channel',
        duration: 15,
        details: {
            tCode: 'OVXI',
            sproPath: 'Enterprise Structure > Definition > Sales and Distribution > Define, copy, delete, check distribution channel',
            definition: 'A Distribution Channel represents the way in which products or services reach the customer.',
            purpose: 'To differentiate sales strategies. Examples include Wholesale, Retail, E-Commerce, etc. You can have different pricing, master data, and statistics for each channel.',
            configurationSteps: ['Define a 2-character key and a description.'],
            integrationNotes: 'A Sales Organization can have multiple Distribution Channels. This is a key field for determining pricing and other sales conditions.',
            updatesS4HANA: 'The concept and configuration are unchanged in S/4HANA.',
        },
    },
    {
        id: 'l2-3',
        title: 'Division',
        duration: 15,
        details: {
            tCode: 'OVXB',
            sproPath: 'Enterprise Structure > Definition > Logistics - General > Define, copy, delete, check division',
            definition: 'A Division is used to group materials or services, representing a product line or business segment.',
            purpose: 'To allow for product-group-specific sales management and reporting. For example, a company might have divisions for "Electronics" and "Appliances".',
            configurationSteps: ['Define a 2-character key and a description.'],
            integrationNotes: 'A Division can be assigned across multiple Sales Organizations. It is also used in MM for material master organization.',
            updatesS4HANA: 'The concept and configuration are unchanged in S/4HANA.',
        },
    },
    {
        id: 'l2-4',
        title: 'Sales Area',
        duration: 10,
        details: {
            tCode: 'OVXG (Setup Sales Area)',
            sproPath: 'Enterprise Structure > Assignment > Sales and Distribution > Set up sales area',
            definition: 'A Sales Area is a unique combination of Sales Organization, Distribution Channel, and Division. All sales documents are assigned to one Sales Area.',
            purpose: 'This combination defines the sales strategy for a particular product group in a specific region or channel. It is the primary organizational structure for all sales processes.',
            configurationSteps: ['This structure is formed by assigning Distribution Channels to Sales Orgs, and Divisions to Sales Orgs. The valid combinations form the Sales Areas.'],
            integrationNotes: 'Customer master data and pricing conditions are maintained at the Sales Area level, making it a critical structure.',
            updatesS4HANA: 'The concept and configuration are unchanged in S/4HANA.',
        },
    },
    {
        id: 'l2-5',
        title: 'Plant and Shipping Point',
        duration: 20,
        details: {
            tCode: 'OX10 (Plant), OVXD (Shipping Point)',
            sproPath: 'Enterprise Structure > Definition > Logistics - General / Logistics Execution',
            definition: 'A Plant is a location where materials are produced or stored. A Shipping Point is a fixed location within a plant from which goods are shipped.',
            purpose: 'The Plant is essential for determining stock availability. The Shipping Point is responsible for organizing all shipping activities, such as creating deliveries and scheduling shipments.',
            configurationSteps: ['Define the Plant and assign it to a Company Code. Define the Shipping Point and assign it to a Plant.'],
            integrationNotes: 'The Plant is a central organizational unit in Logistics, used by MM, PP, and SD. The combination of Shipping Point, Loading Group (from material master), and Plant determines the Shipping Point in a sales order.',
            updatesS4HANA: 'The concept and configuration are unchanged in S/4HANA.',
        },
    },
  ],
   quiz: {
    id: 'sd-q2',
    title: 'SD Organization Structure Quiz',
    questions: [
      { question: 'What three elements make up a Sales Area?', options: ['Company Code, Plant, Division', 'Sales Org, Distribution Channel, Division', 'Sales Org, Plant, Shipping Point'], correctAnswer: 1 },
      { question: 'To which FI organizational unit must a Sales Organization be assigned?', options: ['Controlling Area', 'Company Code', 'Business Area'], correctAnswer: 1 },
      { question: 'Which organizational unit is responsible for the physical act of shipping goods?', options: ['Plant', 'Sales Office', 'Shipping Point'], correctAnswer: 2 },
      { question: 'What is the purpose of a Distribution Channel?', options: ['To group product lines', 'To represent the way products reach the customer', 'To define a legal entity'], correctAnswer: 1 },
    ]
  }
};
