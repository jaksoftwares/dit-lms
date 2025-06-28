'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  Play,
  Download,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { mockCourses, mockEnrollments } from '@/lib/mock-data';
import { authService } from '@/lib/auth';
import { Course } from '@/lib/types';

interface CourseDetailProps {
  params: {
    id: string;
  };
}

export default function CourseDetail({ params }: CourseDetailProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const foundCourse = mockCourses.find(c => c.id === params.id);
    if (!foundCourse) {
      router.push('/courses');
      return;
    }

    setCourse(foundCourse);

    // Check if user is enrolled
    const user = authService.getCurrentUser();
    if (user) {
      const enrollment = mockEnrollments.find(
        e => e.userId === user.id && e.courseId === params.id
      );
      setIsEnrolled(!!enrollment);
    }

    setIsLoading(false);
  }, [params.id, router]);

  const handleEnroll = () => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Mock enrollment process
    alert('Enrollment successful! Redirecting to course...');
    router.push(`/courses/${params.id}/learn`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    <Play className="h-5 w-5 mr-2" />
                    Preview Course
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Badge variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}>
                  {course.level}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-gray-600">({course.studentsEnrolled} students)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                {course.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center space-x-4 mb-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                  <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">{course.instructor.name}</div>
                  <div className="text-gray-600">{course.instructor.bio}</div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.modules.map((module, moduleIndex) => (
                        <div key={module.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg">
                              Module {moduleIndex + 1}: {module.title}
                            </h3>
                            <Badge variant="outline">
                              {module.lessons.length} lessons
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">{module.description}</p>
                          
                          <div className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                                <div className="flex-shrink-0">
                                  {lesson.type === 'video' ? (
                                    <Play className="h-4 w-4 text-blue-600" />
                                  ) : (
                                    <BookOpen className="h-4 w-4 text-green-600" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{lesson.title}</div>
                                  <div className="text-xs text-gray-600">{lesson.description}</div>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {lesson.content.duration}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Mock Reviews */}
                      <div className="border-b pb-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <Avatar>
                            <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Excellent course! The instructor explains complex concepts in a very understandable way. 
                          The hands-on projects really helped solidify my understanding.
                        </p>
                      </div>

                      <div className="border-b pb-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <Avatar>
                            <AvatarImage src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" />
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Sarah Miller</div>
                            <div className="flex items-center">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              <Star className="h-4 w-4 text-gray-300" />
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Great content and structure. Would recommend to anyone starting their journey in web development.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{course.instructor.name}</h3>
                        <p className="text-gray-600 mb-4">{course.instructor.bio}</p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="font-semibold text-lg">10+</div>
                            <div className="text-sm text-gray-600">Years Experience</div>
                          </div>
                          <div>
                            <div className="font-semibold text-lg">5,000+</div>
                            <div className="text-sm text-gray-600">Students Taught</div>
                          </div>
                          <div>
                            <div className="font-semibold text-lg">4.9</div>
                            <div className="text-sm text-gray-600">Average Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${course.price}
                  </div>
                  <div className="text-gray-600">One-time payment</div>
                </div>

                {isEnrolled ? (
                  <Button asChild className="w-full mb-4">
                    <Link href={`/courses/${course.id}/learn`}>
                      Continue Learning
                    </Link>
                  </Button>
                ) : (
                  <Button onClick={handleEnroll} className="w-full mb-4">
                    Enroll Now
                  </Button>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.studentsEnrolled}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Modules:</span>
                    <span className="font-medium">{course.modules.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-medium">
                      {course.modules.reduce((total, module) => total + module.lessons.length, 0)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">This course includes:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Lifetime access</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Downloadable resources</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Mobile access</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Instructor support</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}