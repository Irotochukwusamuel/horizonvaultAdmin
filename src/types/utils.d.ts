import { AppwriteUser, AppwriteUserPayment, UserPayment } from '@/types/user';

export type OverviewResult = { total_users: number, total_payments: number, total_courses: number }

export type UserOverviewResult = {
  recent_registrations: AppwriteUser[],
  total_users: number,
  total_preparatory_course: number,
  total_enhancement_course: number
}
export type PaymentOverviewResult = {
  recent_payments: AppwriteUserPayment[],
  total_psychometric_test: number,
  total_video_lesson: number,
  total_audio_lesson: number,
  total_quizz: number,
  total_reading_lesson: number,
  total_modules: number,
}