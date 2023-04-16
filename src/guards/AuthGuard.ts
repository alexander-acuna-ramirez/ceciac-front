import { useAuthStore } from 'src/stores/auth.store';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useAuthStore();
  if (to.name === 'Login' && store.isAuthenticated) {
    next({ name: 'Feed' });
  } else {
    if (to.name !== 'Login' && !store.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  }
}

export { authGuard };
