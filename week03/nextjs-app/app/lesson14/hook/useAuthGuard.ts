import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/useAuthStore';

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  requiredRole?: 'admin' | 'user' | 'moderator';
  requiredPermission?: string;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const router = useRouter();
  const {
    isAuthenticated,
    user,
    isLoading,
    initializeAuth,
    isAdmin,
    hasPermission,
    hydrated,
  } = useAuthStore();

  const {
    redirectTo = '/lesson14/login',
    requireAuth = true,
    requiredRole,
    requiredPermission,
  } = options;

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!hydrated) return;
    if (isLoading) return;

    // Nếu yêu cầu đăng nhập mà chưa đăng nhập thì chuyển hướng
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }
    // Nếu không yêu cầu đăng nhập mà đã đăng nhập thì chuyển hướng về dashboard
    if (!requireAuth && isAuthenticated) {
      router.push('/lesson14/dashboard');
      return;
    }
    // Nếu yêu cầu role mà user không đủ quyền
    if (isAuthenticated && requiredRole && user?.role !== requiredRole) {
      router.push('/lesson14/dashboard');
      return;
    }
    // Nếu yêu cầu permission mà user không có
    if (isAuthenticated && requiredPermission && !hasPermission(requiredPermission)) {
      router.push('/lesson14/dashboard');
      return;
    }
  }, [hydrated, isAuthenticated, user, isLoading, router, redirectTo, requireAuth, requiredRole, requiredPermission, isAdmin, hasPermission]);

  return {
    hydrated,
    isAuthenticated,
    user,
    isLoading: isLoading || !hydrated,
    isAdmin: isAdmin(),
    hasPermission,
  };
};