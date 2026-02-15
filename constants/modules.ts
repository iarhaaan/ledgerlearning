import type { Module } from '../types';
import { FICO_CHAPTERS } from './content/fico/index';
import { SD_CHAPTERS } from './content/sd/index';
import { MM_CHAPTERS } from './content/mm/index';
import { ABAP_CHAPTERS } from './content/abap/index';


export const MODULES: Module[] = [
  {
    id: 'fico',
    title: 'SAP FICO',
    description: 'Master the core concepts of SAP Financial Accounting (FI) and Controlling (CO) from basics to advanced topics.',
    chapters: FICO_CHAPTERS,
  },
  {
    id: 'sd',
    title: 'SAP SD',
    description: 'Learn the complete order-to-cash cycle, from sales orders and pricing to shipping and billing.',
    chapters: SD_CHAPTERS,
  },
  {
    id: 'mm',
    title: 'SAP MM',
    description: 'Explore the end-to-end procurement and inventory management processes with the Materials Management module.',
    chapters: MM_CHAPTERS,
  },
  {
    id: 'abap',
    title: 'SAP ABAP',
    description: 'Dive into the technical side of SAP with ABAP programming, from basic syntax to advanced development concepts.',
    chapters: ABAP_CHAPTERS,
  },
];
