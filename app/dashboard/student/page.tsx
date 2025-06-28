'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CourseCard } from '@/components/ui/course-card';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp,
  Calendar,
  Bell,
  Download
} from 'lucide-react';
import { authService } from '@/lib/auth';
import { mockCourses, mockEnrollments, mockCertificates } from '@/lib/mock-data';
import { User, Course, Enrollment } from '@/lib/types';

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<(Course & { progress: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    if (currentUser.role !== 'student') {
      router.push(`/dashboard/${currentUser.role}`);
      return;
    }

    setUser(currentUser);
    
    // Get student's enrolled courses with progress
    const studentEnrollments = mockEnrollments.filter(e => e.userId === currentUser.id);
    const coursesWithProgress = studentEnrollments.map(enrollment => {
      const course = mockCourses.find(c => c.id === enrollment.courseId);
      return course ? { ...course, progress: enrollment.progress.percentageComplete } : null;
    }).filter(Boolean) as (Course & { progress: number })[];
    
    setEnrolledCourses(coursesWithProgress);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50"><Navbar /><div className="flex items-center justify-center h-96"><div className="text-center">Loading...</div></div></div>;
  }

  if (!user) {
    return null;
  }

  const completedCourses = enrolledCourses.filter(course => course.progress === 100);
  const inProgressCourses = enrolledCourses.filter(course => course.progress > 0 && course.progress < 100);
  const totalStudyHours = enrolledCourses.length * 40; // Mock calculation
  const certificates = mockCertificates.filter(cert => cert.userId === user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-1">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                {inProgressCourses.length} in progress
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                {certificates.length} certificates earned
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudyHours}</div>
              <p className="text-xs text-muted-foreground">
                This month: 12 hours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            {inProgressCourses.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {inProgressCourses.slice(0, 2).map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      showEnrollButton={false}
                      progress={course.progress}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Enrolled Courses */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                <Button variant="outline" asChild>
                  <a href="/courses">Browse More</a>
                </Button>
              </div>
              
              {enrolledCourses.length === 0 ? (
                <Card className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
                  <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                  <Button asChild>
                    <a href="/courses">Browse Courses</a>
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      showEnrollButton={false}
                      progress={course.progress}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certificates */}
            {certificates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>Certificates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{cert.courseName}</div>
                        <div className="text-xs text-gray-600">
                          {cert.completedAt.toLocaleDateString()}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span>Upcoming</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <div className="flex-1">
                      <div className="font-medium text-sm">Quiz: React Components</div>
                      <div className="text-xs text-gray-600">Due in 2 days</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex-1">
                      <div className="font-medium text-sm">Assignment: Security Analysis</div>
                      <div className="text-xs text-gray-600">Due in 5 days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-green-500" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Completed lesson: HTML5 Basics</div>
                    <div className="text-gray-600 text-xs">2 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Quiz passed: CSS Fundamentals</div>
                    <div className="text-gray-600 text-xs">1 day ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Started: React Development</div>
                    <div className="text-gray-600 text-xs">3 days ago</div>
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