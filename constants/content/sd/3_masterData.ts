import type { Chapter } from '../../../types';

export const CHAPTER_3_MASTER_DATA: Chapter = {
  id: 'ch3',
  title: '3. SD Master Data',
  lessons: [
    {
        id: 'l3-1',
        title: 'Customer Master (Business Partner)',
        duration: 20,
        details: {
            tCode: 'BP',
            sproPath: 'Cross-Application Components > SAP Business Partner',
            definition: 'The Customer Master contains all information about a customer. In S/4HANA, this is managed through the Business Partner (BP) object, which is the single point of entry.',
            purpose: 'To provide a single source of truth for all customer data. The data is organized into three main areas: General Data (address, name), Company Code Data (FI-related, e.g., reconciliation account), and Sales Area Data (SD-related, e.g., shipping conditions, pricing procedure).',
            integrationNotes: 'A single BP can be a customer, a vendor, or both, which eliminates data redundancy. The credit limit information is now stored in a dedicated "Credit Segment" within the BP master data for S/4HANA Credit Management.',
            updatesS4HANA: 'Using the BP transaction is mandatory. Classic customer master transactions (XD01, VD01, FD01) are obsolete and redirect to BP.',
        },
    },
    {
        id: 'l3-2',
        title: 'Material Master in SD Views',
        duration: 20,
        details: {
            tCode: 'MM01 / MM02 / MM03',
            sproPath: 'N/A',
            definition: 'The Material Master contains all information about a company\'s materials or services that are sold. For SD, the data is maintained in specific "Sales Views".',
            purpose: 'To centralize all material-specific data. For SD, the "Sales: Sales Org 1 & 2" and "Sales: General/Plant" views are critical. They contain data like the delivering plant, tax classifications, and the Item Category Group, which is key for determining how an item behaves in a sales order.',
            integrationNotes: 'The material master is used by many modules (MM, PP, SD, FI). The data is maintained in different "views" corresponding to each department.',
            updatesS4HANA: 'The transaction is the same, but the material number can now be extended to 40 characters (optional).',
        },
    },
    {
        id: 'l3-3',
        title: 'Pricing Master Data (Condition Records)',
        duration: 15,
        details: {
            tCode: 'VK11 / VK12 / VK13',
            sproPath: 'N/A',
            definition: 'Condition Master Data is used to store the pricing elements, such as prices, discounts, surcharges, and taxes.',
            purpose: 'To enable automatic pricing in sales documents. You create "condition records" for specific condition types (e.g., PR00 for price) and key combinations (e.g., for a specific customer and material).',
            integrationNotes: 'The system uses the condition technique to search for these condition records during sales order processing to determine the final price.',
            updatesS4HANA: 'VK11 is still available. S/4HANA also offers Fiori apps like "Manage Prices - Sales" for maintaining condition records.',
        },
    },
    {
        id: 'l3-4',
        title: 'Customer-Material Info Record',
        duration: 15,
        details: {
            tCode: 'VD51 / VD52 / VD53',
            sproPath: 'N/A',
            definition: 'The Customer-Material Info Record links a specific customer with a specific material.',
            purpose: 'To store customer-specific data for a material. A key use case is to map the customer\'s own material number to your internal material number. You can also define customer-specific delivery priorities or plants.',
            integrationNotes: 'When creating a sales order, if an info record exists, the system can automatically find your material number based on the customer\'s number and apply the specific data from the record.',
            updatesS4HANA: 'The functionality remains the same in S/4HANA.',
        },
    },
    {
        id: 'l3-5',
        title: 'Partner Functions & Partner Determination',
        duration: 20,
        details: {
            tCode: 'VOPAN (Configuration)',
            sproPath: 'Sales and Distribution > Basic Functions > Partner Determination',
            definition: 'Partner Functions describe the roles that a Business Partner can play in a business transaction. The four main partner functions in SD are Sold-to Party, Ship-to Party, Bill-to Party, and Payer.',
            purpose: 'To accurately represent the different parties involved in a sales transaction. For example, a headquarters (Sold-to) might place an order, but want the goods delivered to a warehouse (Ship-to) and the invoice sent to a central accounting office (Bill-to).',
            configurationSteps: ['The Partner Determination Procedure is configured in VOPAN. It defines which partner functions are allowed for a customer account group and how they are automatically proposed in a sales document.'],
            integrationNotes: 'These partner functions are maintained in the "Partner Functions" tab of the customer master (BP Sales Area data).',
            updatesS4HANA: 'The concept is fundamental and unchanged in S/4HANA.',
        }
    }
  ],
   quiz: {
    id: 'sd-q3',
    title: 'SD Master Data Quiz',
    questions: [
      { question: 'In S/4HANA, which transaction is mandatory for creating customer data?', options: ['XD01', 'BP', 'VD51'], correctAnswer: 1 },
      { question: 'Which master record is used to map a customer\'s material number to your internal material number?', options: ['Material Master', 'Condition Master', 'Customer-Material Info Record'], correctAnswer: 2 },
      { question: 'Which of the following is NOT one of the four main partner functions in SD?', options: ['Sold-to Party', 'Carrier', 'Ship-to Party'], correctAnswer: 1 },
      { question: 'VK11 is used to maintain what kind of master data?', options: ['Customer Master', 'Pricing Condition Records', 'Material Master'], correctAnswer: 1 },
    ]
  }
};