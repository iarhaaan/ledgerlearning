import React from 'react';

export interface LessonDetails {
  tCode?: string;
  sproPath?: string;
  definition: string;
  purpose: string;
  configurationSteps?: string[];
  integrationNotes?: string;
  updatesS4HANA?: string;
}

export interface Lesson {
  id: string;
  title: string;
  details: LessonDetails;
  duration: number; // in minutes
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}