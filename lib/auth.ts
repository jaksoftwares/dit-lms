import { User } from './types';
import { mockUsers } from './mock-data';

// Simple mock authentication system
export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User | null> {
    // Mock authentication - in production, this would validate against a real backend
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password123') {
      this.currentUser = user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('dit_user', JSON.stringify(user));
      }
      return user;
    }
    return null;
  }

  async register(email: string, password: string, name: string, role: 'student' | 'instructor' = 'student'): Promise<User | null> {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    mockUsers.push(newUser);
    this.currentUser = newUser;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('dit_user', JSON.stringify(newUser));
    }
    
    return newUser;
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dit_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      }
    }
    
    return null;
  }

  logout(): void {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dit_user');
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}

export const authService = AuthService.getInstance();