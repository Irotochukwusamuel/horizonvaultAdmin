import { Models } from 'appwrite';
import { Module } from './course';
import { User } from './user';

export type Quiz = {
    module: Module | string;
    quiz_name: string;
    is_published?: boolean;
    questions: Question[];
    quiz_responses?: QuizResponse[];
    type: 'MCQ' | 'Essay';
    is_deleted?: boolean;
};

export type AppwriteQuiz = Models.Document & Quiz;

export type Question = {
    quiz: Quiz | string;
    question: string;
    options?: string[];
    correct_answer?: string;
    question_responses: QuestionResponse[];
    is_deleted?: boolean;
};

export type AppwriteQuestion = Models.Document & Question;

export type QuestionResponse = {
    question: string; // pass in question id
    response: string;
    response_submitted_by: string; //  pass in user id
    quiz: string; // pass in quiz id
    is_deleted?: boolean;
};

export type QuizResponse = {
    quiz?: string; // pass in quiz id
    module?: Module | string;
    submitted_by: string; // pass in user id
    score: number; // percentage score
    number_of_correct_responses: number;
    time_spent: string;
    question_responses?: QuestionResponse[];

    // true for most recent attempt
    is_recent: boolean;
    is_deleted?: boolean;
};

export type AppwriteQuizResponse = Models.Document & QuizResponse;
