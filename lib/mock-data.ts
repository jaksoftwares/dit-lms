import { User, Course, Enrollment, Certificate } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@dit.edu',
    name: 'Alex Johnson',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-12-20')
  },
  {
    id: '2',
    email: 'instructor@dit.edu',
    name: 'Dr. Sarah Chen',
    role: 'instructor',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2023-09-01'),
    lastLogin: new Date('2024-12-20')
  },
  {
    id: '3',
    email: 'admin@dit.edu',
    name: 'Michael Rodriguez',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date('2024-12-20')
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description: 'Master modern web development with React, Node.js, and MongoDB. Build real-world applications from scratch.',
    shortDescription: 'Learn full-stack development with modern technologies',
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '12 weeks',
    instructorId: '2',
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Senior Software Engineer with 10+ years experience'
    },
    modules: [
      {
        id: '1',
        title: 'Frontend Fundamentals',
        description: 'HTML, CSS, and JavaScript basics',
        order: 1,
        lessons: [
          {
            id: '1',
            title: 'Introduction to HTML5',
            description: 'Learn the structure of modern web pages',
            order: 1,
            type: 'video',
            content: {
              url: 'https://example.com/video1',
              duration: '45 minutes'
            },
            materials: [
              {
                id: '1',
                name: 'HTML5 Cheat Sheet',
                type: 'pdf',
                url: '/materials/html5-cheat-sheet.pdf',
                downloadable: true
              }
            ]
          },
          {
            id: '2',
            title: 'CSS Grid and Flexbox',
            description: 'Modern CSS layout techniques',
            order: 2,
            type: 'video',
            content: {
              url: 'https://example.com/video2',
              duration: '1 hour'
            },
            materials: []
          }
        ]
      },
      {
        id: '2',
        title: 'React Development',
        description: 'Component-based frontend development',
        order: 2,
        lessons: [
          {
            id: '3',
            title: 'React Components',
            description: 'Building reusable UI components',
            order: 1,
            type: 'video',
            content: {
              url: 'https://example.com/video3',
              duration: '50 minutes'
            },
            materials: []
          }
        ]
      }
    ],
    price: 299,
    rating: 4.8,
    studentsEnrolled: 156,
    createdAt: new Date('2024-01-01'),
    isPublished: true
  },
  {
    id: '2',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts, threat analysis, and defensive strategies for modern organizations.',
    shortDescription: 'Essential cybersecurity skills for IT professionals',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Cybersecurity',
    level: 'Beginner',
    duration: '8 weeks',
    instructorId: '2',
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Cybersecurity expert with industry certifications'
    },
    modules: [
      {
        id: '3',
        title: 'Security Fundamentals',
        description: 'Basic security concepts and principles',
        order: 1,
        lessons: [
          {
            id: '4',
            title: 'Introduction to Cybersecurity',
            description: 'Overview of cybersecurity landscape',
            order: 1,
            type: 'video',
            content: {
              url: 'https://example.com/security1',
              duration: '40 minutes'
            },
            materials: []
          }
        ]
      }
    ],
    price: 199,
    rating: 4.6,
    studentsEnrolled: 89,
    createdAt: new Date('2024-02-01'),
    isPublished: true
  },
  {
    id: '3',
    title: 'Data Science with Python',
    description: 'Master data analysis, visualization, and machine learning using Python, pandas, and scikit-learn.',
    shortDescription: 'Python-based data science and analytics',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Data Science',
    level: 'Advanced',
    duration: '16 weeks',
    instructorId: '2',
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Data scientist with machine learning expertise'
    },
    modules: [
      {
        id: '4',
        title: 'Python for Data Science',
        description: 'Essential Python libraries and tools',
        order: 1,
        lessons: [
          {
            id: '5',
            title: 'NumPy and Pandas',
            description: 'Data manipulation with Python',
            order: 1,
            type: 'video',
            content: {
              url: 'https://example.com/data1',
              duration: '1.5 hours'
            },
            materials: []
          }
        ]
      }
    ],
    price: 399,
    rating: 4.9,
    studentsEnrolled: 73,
    createdAt: new Date('2024-03-01'),
    isPublished: true
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    enrolledAt: new Date('2024-01-20'),
    progress: {
      lessonsCompleted: ['1', '2'],
      quizzesCompleted: [],
      currentModule: 1,
      currentLesson: 2,
      percentageComplete: 25
    },
    completed: false
  },
  {
    id: '2',
    userId: '1',
    courseId: '2',
    enrolledAt: new Date('2024-02-15'),
    progress: {
      lessonsCompleted: ['4'],
      quizzesCompleted: [],
      currentModule: 1,
      currentLesson: 1,
      percentageComplete: 100
    },
    completed: true,
    completedAt: new Date('2024-04-20'),
    certificateId: '1'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    userId: '1',
    courseId: '2',
    courseName: 'Cybersecurity Fundamentals',
    studentName: 'Alex Johnson',
    completedAt: new Date('2024-04-20'),
    certificateUrl: '/certificates/cert-1.pdf'
  }
];