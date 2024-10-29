import { databases } from '@/appwrite';
import { DATABASE_ID } from '@/lib/constants';
import { AppwriteQuestion, AppwriteQuiz, Question, Quiz } from '@/types/quiz';
import { ID, Query } from 'appwrite';
import { toast } from 'react-toastify';

// todo: filter out questions where is_deleted is true (do this for all related documents that will be displayed)

export async function createQuiz(data: Quiz) {
  try {
    const quiz = await databases.createDocument(
      DATABASE_ID,
      'quizzes',
      ID.unique(),
      data,
    );
    return quiz as AppwriteQuiz;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Creating Quiz: ' + error?.message);
  }
}



export async function getQuizById(quizId: string) {
  try {
    const quiz = await databases.getDocument(DATABASE_ID, 'quizzes', quizId);
    return quiz as AppwriteQuiz;
  } catch (error) {
    throw error;
  }
}

export async function getQuiz() {
  try {
    const quiz = await databases.listDocuments(DATABASE_ID, 'quizzes', [
      Query.equal('is_deleted', false),
      Query.limit(1000),
      Query.orderDesc('$createdAt'),
    ]);
    return quiz.documents as AppwriteQuiz[];
  } catch (error) {
    throw error;
  }
}

export async function updateQuiz(quizId: string, data: Partial<Quiz>) {
  try {
    const quiz = await databases.updateDocument(
      DATABASE_ID,
      'quizzes',
      quizId,
      data,
    );
    return quiz as AppwriteQuiz;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Updating Quiz: ' + error?.message);
  }
}

export async function deleteQuiz(quizId: string) {
  try {
    // soft delete
    return await databases.updateDocument(DATABASE_ID, 'quizzes', quizId, {
      is_deleted: true,
    });
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Deleting Quiz: ' + error?.message);
  }
}

export async function createQuestion(data: Question) {
  try {
    const question = await databases.createDocument(
      DATABASE_ID,
      'questions',
      ID.unique(),
      data,
    );
    return question as AppwriteQuestion;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Creating Question: ' + error?.message);
  }
}

export async function getQuestion(questionId: string) {
  try {
    const question = await databases.getDocument(
      DATABASE_ID,
      'questions',
      questionId,
    );
    return question as AppwriteQuestion;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
export async function getQuestionResponses(questionId: string) {
  try {
    const question = await databases.getDocument(
      DATABASE_ID,
      'question-responses',
      questionId,
    );
    return question as AppwriteQuestion;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
export async function getQuizzResponses(questionId: string) {
  try {
    const question = await databases.getDocument(
      DATABASE_ID,
      'quiz-responses',
      questionId,
    );
    return question as AppwriteQuestion;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function updateQuestion(
  questionId: string,
  data: Partial<Question>,
) {
  try {
    const question = await databases.updateDocument(
      DATABASE_ID,
      'questions',
      questionId,
      data,
    );
    return question as AppwriteQuestion;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Updating Question: ' + error?.message);
  }
}

export async function deleteQuestion(questionId: string) {
  try {
    // soft delete
    return await databases.updateDocument(
      DATABASE_ID,
      'questions',
      questionId,
      { is_deleted: true },
    );
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Deleting Question: ' + error?.message);
  }
}
