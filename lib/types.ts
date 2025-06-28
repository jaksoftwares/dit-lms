export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructorId: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  modules: Module[];
  price: number;
  rating: number;
  studentsEnrolled: number;
  createdAt: Date;
  isPublished: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  type: 'video' | 'document' | 'interactive';
  content: {
    url?: string;
    duration?: string;
    fileSize?: string;
  };
  materials: Material[];
}

export interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'document' | 'link';
  url: string;
  size?: string;
  downloadable: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  progress: Progress;
  completed: boolean;
  completedAt?: Date;
  certificateId?: string;
}

export interface Progress {
  lessonsCompleted: string[];
  quizzesCompleted: string[];
  currentModule: number;
  currentLesson: number;
  percentageComplete: number;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  studentName: string;
  completedAt: Date;
  certificateUrl: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  dueDate: Date;
  submissions: Submission[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  content: string;
  fileUrl?: string;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
}