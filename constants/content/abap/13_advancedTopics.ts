import type { Chapter } from '../../../types';

export const CHAPTER_13_ADVANCED_TOPICS: Chapter = {
  id: 'ch13',
  title: '13. Advanced Topics & RAP',
  lessons: [
    {
      id: 'l13-1',
      title: 'ABAP on Cloud',
      duration: 20,
      details: {
        definition: 'ABAP on Cloud refers to the ABAP development environment available on the SAP Business Technology Platform (BTP). It allows developers to build extensions and new applications in the cloud that run on an ABAP-based platform as a service.',
        purpose: 'To provide a way to build "Side-by-Side" extensions for S/4HANA Cloud or On-Premise systems, keeping custom code separate from the core system. This helps maintain a "clean core" and simplifies upgrades.',
        integrationNotes: 'This environment uses the ABAP RESTful Application Programming Model (RAP) as its primary programming model. It also has a restricted set of released SAP APIs that can be used to communicate with the backend system.',
        updatesS4HANA: 'This is a key part of SAP\'s extensibility strategy for the intelligent enterprise.',
      },
    },
    {
      id: 'l13-2',
      title: 'Cloud ABAP Constraints',
      duration: 15,
      details: {
        definition: 'The ABAP on Cloud environment is not the same as a classic ABAP system. It comes with a set of restrictions to ensure cloud readiness and stability.',
        purpose: 'To enforce a modern, API-based development style and prevent legacy coding practices that are not suitable for a cloud environment.',
        configurationSteps: [
          '<b>Key Restrictions:</b>',
          ' - No SAP GUI access. All development is done exclusively in ABAP Development Tools (ADT).',
          ' - No direct access to the underlying database or file system.',
          ' - No `CALL SCREEN` or classic Dynpro programming.',
          ' - Code can only call whitelisted, released SAP APIs. You cannot call any arbitrary function module.',
          ' - Only modern technologies like RAP, CDS, and AMDP are supported.',
        ],
        integrationNotes: 'These restrictions force developers to build robust, loosely coupled applications that are upgrade-safe.',
      },
    },
    {
      id: 'l13-3',
      title: 'ABAP RESTful Application Programming Model (RAP)',
      duration: 25,
      details: {
        tCode: 'ADT (Eclipse)',
        sproPath: 'N/A',
        definition: 'RAP is the modern, strategic programming model in S/4HANA for building enterprise-ready, Fiori-based applications and OData services efficiently and consistently.',
        purpose: 'To provide a standardized framework that covers the end-to-end development of services, from the data model and business logic to the service definition and exposure.',
        configurationSteps: [
          '<b>Core Components of RAP:</b>',
          '1. <b>Data Model (CDS Views):</b> The data model is defined using Core Data Services views.',
          '2. <b>Behavior Definition:</b> A new development object that defines the transactional behavior of the business object (e.g., what fields are read-only, what actions are available).',
          '3. <b>Business Logic (ABAP Classes):</b> The business logic is implemented in a special ABAP "handler" class.',
          '4. <b>Service Definition & Binding:</b> The final step is to define the OData service and bind it to the business object.',
        ],
        updatesS4HANA: 'RAP is the successor to the older "SAP Gateway-based" development model and is the standard for new S/4HANA application development, both On-Premise and in the Cloud.',
      },
    },
  ],
  quiz: {
    id: 'abap-q13',
    title: 'Advanced Topics Quiz',
    questions: [
      { question: 'What is the primary purpose of "ABAP on Cloud"?', options: ['To run old ECC systems in the cloud', 'To build side-by-side extensions while keeping the core clean', 'To provide SAP GUI access via a browser'], correctAnswer: 1 },
      { question: 'Which of the following is a key restriction of ABAP on Cloud?', options: ['You cannot use CDS Views', 'You can only use the SAP GUI', 'You can only call whitelisted, released SAP APIs'], correctAnswer: 2 },
      { question: 'What is the modern, strategic programming model for building Fiori apps in S/4HANA?', options: ['Web Dynpro', 'Module Pool Programming', 'ABAP RESTful Application Programming Model (RAP)'], correctAnswer: 2 },
    ]
  }
};