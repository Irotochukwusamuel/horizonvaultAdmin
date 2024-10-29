import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Expression {
  PCC_LEKKI = 'pcc_lekki',
  TEC_MARYLAND = 'tec_maryland',
  TEC_IKOYI = 'tec_ikoyi',
  TEC_GREATER_IKOYI = 'tec_greater_ikoyi',
}


export function generateRandomString(length: number) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
}

export const expressions = [
  {
    value: Expression.PCC_LEKKI,
    label: 'PCC, Lekki',
  },
  {
    value: Expression.TEC_MARYLAND,
    label: 'TEC, Maryland',
  },
  {
    value: Expression.TEC_IKOYI,
    label: 'TEC, Ikoyi',
  },
  {
    value: Expression.TEC_GREATER_IKOYI,
    label: 'TEC, Greater Ikoyi',
  },
];


export const LessonCategory = [
  { value: 'reading', label: 'Reading' },
  { value: 'psychometric_test', label: 'Psychometric Test' },
  { value: 'video_lesson', label: 'Video Lesson' },
];

export const QuizCategory = [
  { value: 'MCQ', label: 'Multiple Choice' },
  { value: 'Essay', label: 'Essay' },
];


export enum Role {
  BRIDE = 'bride',
  GROOM = 'groom',
  ADMIN = 'admin',
}
export enum Resource_type {
  video = 'video',
  audio = 'audio',
}


export enum BucketName {
  Lesson = "lesson-videos",
  Audio = "lesson-audios"
}

export enum Course {
  PREPARATORY = 'preparatory',
  EHNANCEMENT = 'enhancement',
}

export function formatAmount(
  amount: number,
  format: string,
  country = 'en-NG',
  space = false,
) {
  const formattedAmount = new Intl.NumberFormat(country, {
    style: 'currency',
    currency: format,
  }).format(amount);

  return space
    ? formattedAmount.replace(/\s*([\d.,]+)\s*/, ' $1 ')
    : formattedAmount;
}
