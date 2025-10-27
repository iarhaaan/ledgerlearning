
import type { Chapter } from '../../../types';

export const CHAPTER_9_CREDIT_MANAGEMENT: Chapter = {
  id: 'ch9',
  title: '9. Credit Management & Risk',
  lessons: [
    {
        id: 'l9-1',
        title: 'Credit Management Overview',
        duration: 10,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'Credit Management in SAP is the process of setting credit limits for customers and automatically checking sales orders against these limits to minimize the risk of financial loss from bad debts.',
            purpose: 'To control credit risk by preventing the company from selling to customers who have exceeded their credit limit or have a poor payment history.',
            configurationSteps: [],
            integrationNotes: 'Credit checks can be triggered at various points in the sales cycle, such as when creating or changing a sales order or delivery.',
            updatesS4HANA: 'S/4HANA introduces a completely new "SAP Credit Management" (FSCM) which replaces the classic SD Credit Management. It is much more powerful and flexible.',
        },
    },
    {
        id: 'l9-2',
        title: 'Classic vs. S/4HANA Credit Management',
        duration: 20,
        details: {
            tCode: 'N/A',
            sproPath: 'N/A',
            definition: 'Classic Credit Management (in ECC) was part of the SD module. S/4HANA Credit Management is part of Financial Supply Chain Management (FSCM) and is a separate, more advanced component.',
            purpose: 'To provide a more sophisticated and centralized approach to managing credit risk.',
            configurationSteps: [
                '<b>Classic (ECC):</b> Simple credit limit check based on open orders, deliveries, and billing documents. Configuration is in SD.',
                '<b>S/4HANA (FSCM):</b> Centralized credit management across systems. It allows for calculating an internal credit score for customers, defining complex credit check rules, and managing credit limit requests through a workflow.',
            ],
            integrationNotes: 'In S/4HANA, the credit data is stored in the Business Partner object, not in the separate tables used in ECC.',
            updatesS4HANA: 'Using the new SAP Credit Management is mandatory if you want credit checking capabilities in S/4HANA. The classic SD credit check is not available.',
        },
    },
    {
        id: 'l9-3',
        title: 'Configuration of Credit Management',
        duration: 25,
        details: {
            tCode: 'OVA8 (Classic Automatic Credit Control)',
            sproPath: 'Financial Supply Chain Management > Credit Management (for S/4HANA)',
            definition: 'Configuration involves defining the rules for the credit check. In classic SD, this is done in Automatic Credit Control.',
            purpose: 'To specify when and how the credit check is performed. You can define static checks (based on the credit limit) and dynamic checks (based on the age of open items).',
            configurationSteps: [
                'In classic SD (OVA8), you define a risk category and link it to a credit control area. You then define the checks (e.g., static, dynamic) and the system\'s reaction (e.g., warning, error, block delivery).',
                'In S/4HANA, you define Checking Rules, calculate credit scores, and assign them to the Business Partner.',
            ],
            integrationNotes: 'The credit check is linked to the Sales Document Type and the Item Category.',
            updatesS4HANA: 'The entire configuration for S/4HANA Credit Management is done in the FSCM section of the SPRO menu, not in the SD section.',
        },
    },
    {
        id: 'l9-4',
        title: 'Credit Block & Release Process',
        duration: 15,
        details: {
            tCode: 'VKM3',
            sproPath: 'N/A',
            definition: 'If a sales order fails the credit check, the system automatically blocks it. An authorized person (e.g., from the credit department) must then review the order and either release it for processing or reject it.',
            purpose: 'To provide a manual control point for managing credit exceptions, ensuring that risky orders are not processed without proper approval.',
            configurationSteps: ['In VKM3, a user with the correct authorization can view a list of all credit-blocked sales documents, analyze the reason for the block, and release them individually.'],
            integrationNotes: 'Releasing a blocked document allows it to proceed to the next step in the sales cycle, such as creating a delivery.',
            updatesS4HANA: 'VKM3 is still available. S/4HANA also provides Fiori apps like "Manage Credit Cases" and workflow capabilities that can automate the notification and approval process for releasing blocked documents.',
        },
    },
  ],
  quiz: {
    id: 'sd-q9',
    title: 'Credit Management Quiz',
    questions: [
      { question: 'In S/4HANA, the new Credit Management is part of which larger component?', options: ['SD', 'FICO', 'FSCM (Financial Supply Chain Management)'], correctAnswer: 2 },
      { question: 'Which transaction is used to release credit-blocked sales documents?', options: ['VA02', 'VK11', 'VKM3'], correctAnswer: 2 },
      { question: 'Is the classic SD Credit Management available in S/4HANA?', options: ['Yes, it runs in parallel with the new version', 'No, the new SAP Credit Management (FSCM) must be used', 'Only for certain countries'], correctAnswer: 1 },
      { question: 'What is the primary purpose of credit management?', options: ['To increase sales volume', 'To minimize the risk of bad debts', 'To set product prices'], correctAnswer: 1 },
    ]
  }
};
