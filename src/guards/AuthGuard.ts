import { useAuthStore } from 'src/stores/auth.store';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/login' });
  }
  next();
}

export { authGuard };
