import { databases, storage } from '@/appwrite';
import { DATABASE_ID } from '@/lib/constants';
import { Course, Lesson, Module } from '@/types/course';
import { ID, Query } from 'appwrite';
import { toast } from 'react-toastify';

export async function getCourses() {
  try {
    const courses = await databases.listDocuments(DATABASE_ID, 'courses', [
      Query.equal('is_deleted', false),
    ]);
    return courses?.documents as Array<Course>;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function createFile(bucket_name: string, fileData: any) {
  try {
    return await storage.createFile(
      bucket_name,
      ID.unique(),
      fileData,
    );
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Creating File: ' + error);
  }
}

export async function getFileStorageLink(bucket_name: string, fileId: string) {
  try {
    const file = storage.getFileView(bucket_name, fileId);

    return file.href;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Fetching File: ' + error?.message);
  }
}

export async function deleteFileStorage(bucket_name: string, fileId: string) {
  try {
    return storage.deleteFile(bucket_name, fileId);
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Fetching File: ' + error?.message);
  }
}

export async function updateFile(old_bucket : string, bucket_name: string, fileData: any, fileId: string) {
  try {

    await deleteFileStorage(old_bucket, fileId);
    return await storage.createFile(
      bucket_name,
      ID.unique(),
      fileData,
    );
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Creating File: ' + error?.message);
  }
}



export async function getStorageFile(bucket_name: string, file_id: any) {
  try {
    return await storage.getFile(
      bucket_name,
      file_id,
    );
  } catch (error: any) {
    console.log('error', error);
  }
}

// Note: pass in ID for any related documents (e.g course, lesson, etc.)
export async function createCourse(data: Partial<Course>) {
  try {
    const course = await databases.createDocument(
      DATABASE_ID,
      'courses',
      ID.unique(),
      data,
    );
    return course as Course;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Creating Module: ' + error?.message);
  }
}

// todo: filter out modules where is_deleted is true (do this for all related documents that will be displayed)
export async function getCourseById(courseId: string) {
  try {
    const course = await databases.getDocument(
      DATABASE_ID,
      'courses',
      courseId,
    );
    return course as Course;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function updateCourse(documentId: string, data: Partial<Course>) {
  try {
    const updatedProgress = await databases.updateDocument(
      DATABASE_ID,
      'courses',
      documentId,
      data,
    );
    return updatedProgress;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Updating Progress: ' + error?.message);
  }
}

export async function deleteCourse(documentId: string) {
  try {
    // soft delete
    return await databases.updateDocument(DATABASE_ID, 'courses', documentId, {
      is_deleted: true,
    });
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Deleting Course: ' + error?.message);
  }
}

export async function createModule(data: Module) {
  try {
    const courseModule = await databases.createDocument(
      DATABASE_ID,
      'course-modules',
      ID.unique(),
      data,
    );
    return courseModule as Module;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Creating Module: ' + error?.message);
  }
}

export async function getModuleById(moduleId: string) {
  try {
    const mod = await databases.getDocument(
      DATABASE_ID,
      'course-modules',
      moduleId,
    );
    return mod as Module;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function getModules() {
  try {
    const mod = await databases.listDocuments(
      DATABASE_ID,
      'course-modules',
      [
        Query.equal('is_deleted', false),
        Query.limit(1000),
        Query.orderDesc('$createdAt'),
      ],
    );
    return mod.documents as Module[];
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function updateModule(documentId: string, data: Partial<Module>) {
  try {
    const updatedModule = await databases.updateDocument(
      DATABASE_ID,
      'course-modules',
      documentId,
      data,
    );
    return updatedModule as Module;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Updating Module: ' + error?.message);
  }
}

export async function deleteModule(documentId: string) {
  try {
    // soft delete
    return await databases.updateDocument(
      DATABASE_ID,
      'course-modules',
      documentId,
      { is_deleted: true },
    );
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Deleting Module: ' + error?.message);
  }
}

export async function createLesson(data: Lesson) {
  try {
    const lesson = await databases.createDocument(
      DATABASE_ID,
      'lessons',
      ID.unique(),
      data,
    );
    return lesson as Lesson;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Creating Lesson: ' + error?.message);
  }
}

export async function getLessonById(lessonId: string) {
  try {
    const lesson = await databases.getDocument(
      DATABASE_ID,
      'lessons',
      lessonId,
    );
    return lesson as Lesson;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function getLessons() {
  try {
    const lesson = await databases.listDocuments(
      DATABASE_ID,
      'lessons',
      [
        Query.equal('is_deleted', false),
        Query.limit(1000),
        Query.orderDesc('$createdAt'),
      ],
    );
    return lesson?.documents as Lesson[];
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function updateLesson(documentId: string, data: Partial<Lesson>) {
  try {
    const updatedLesson = await databases.updateDocument(
      DATABASE_ID,
      'lessons',
      documentId,
      data,
    );
    return updatedLesson as Lesson;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Updating Lesson: ' + error?.message);
  }
}

export async function deleteLesson(documentId: string) {
  try {
    // soft delete
    return await databases.updateDocument(DATABASE_ID, 'lessons', documentId, {
      is_deleted: true,
    });
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Deleting Lesson: ' + error?.message);
  }
}

// upload functions for audios and videos
export async function uploadLessonVideo(file: File) {
  try {
    const video = await storage.createFile('lesson-videos', ID.unique(), file);

    return await getVideoLink(video.$id);
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Uploading Video: ' + error?.message);
  }
}

export async function getVideoLink(fileId: string) {
  try {
    const file = storage.getFileView('lesson-videos', fileId);

    return file.href;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Fetching Video: ' + error?.message);
  }
}

export async function uploadLessonAudio(file: File) {
  try {
    const audio = await storage.createFile('lesson-audios', ID.unique(), file);

    return await getVideoLink(audio.$id);
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Uploading Audio: ' + error?.message);
  }
}

export async function getAudioLink(fileId: string) {
  try {
    const file = storage.getFileView('lesson-audios', fileId);

    return file.href;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Fetching Audio: ' + error?.message);
  }
}
