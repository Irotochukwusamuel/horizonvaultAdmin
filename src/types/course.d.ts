import { Models } from 'appwrite';
import { User } from './user';
import { Quiz } from './quiz';
import { Resource_type } from '@/lib/utils';

export type Course = Models.Document & {
    course_name: string;
    course_overview: string;
    course_language: string;
    course_modules: Module[];
    course_duration: string;
    how_this_course_helps_you?: string;
    number_of_audios?: number;
    number_of_videos?: number;
    slug: 'preparatory' | 'enhancement';
    is_deleted?: boolean;
};

export type Module = Models.Document & {
    module_title: string;
    module_description?: string;
    course: Course | string;
    lessons: (Lesson | string)[];
    quizzes: Quiz[];
    is_deleted?: boolean;
};

export type Lesson = Models.Document & {
    lesson_title: string;
    lesson_content_text?: string;
    lesson_content_audio: string | null;
    lesson_content_url: string | null;
    course_module: Module;
    assignment_submissions?: LessonAssignment[];
    case_studies: CaseStudy[];
    comments: Comment[];
    action_point_questions: string[];
    action_point_responses: ActionPointResponse[];
    is_psychometric_test?: boolean;
    is_video_lesson?: boolean;
    has_assignment?: boolean;
    is_deleted?: boolean;
    storage_id? : string
    resource_type? : 'video' | 'audio' | null
};

export type AppwriteLesson = Models.Document & Lesson;


export type LessonAssignment = {
    assignment_submitted_by: User | string; // pass in user id
    assignment_link: string;
    lesson: Lesson | string;
    is_deleted?: boolean;
    size: number;
    file_name: string;
};

export type AppwriteLessonAssignment = Models.Document & LessonAssignment;

export type ActionPointResponse = {
    action_point_question: string;
    action_point_response: string;
    response_submitted_by: string | (User & Models.Document); // pass in user id
    lesson?: Lesson | string;
    is_deleted?: boolean;
};

export type AppwriteActionPointResponse = Models.Document & ActionPointResponse;

export type CaseStudy = Models.Document & {
    lesson: Lesson;
    instruction: string;
    case_study_content: string;
    is_deleted?: boolean;
};

export type Comment = Models.Document & {
    posted_by: string; // pass in user id
    lesson: string; // pass in lesson id
    comment: string;
    is_deleted?: boolean;
};

export type CompleteLessonData = {
    user: string;
    course: string | Course;
    module: string;
    lesson?: string | Lesson;
    date_completed: string;
    is_deleted?: boolean;
};

export type CourseProgressData = Pick<CompleteLessonData, 'user' | 'course'> & {
    current_lesson: string;
    module: string;
    date_started?: string;
    is_deleted?: boolean;
};

export type CompleteModuleData = {
    user: string;
    course: string;
    module: string | Module;
    date_completed: string;
    is_deleted?: boolean;
};
