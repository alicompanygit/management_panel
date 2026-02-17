import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuth } from '~/composables/auth';

const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/',
  '/product',
  '/product/details',
];

export default defineNuxtRouteMiddleware(async (to) => {
  const { path } = to;
  const auth = useAuth;

  const isPublicPage = publicRoutes.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath + '/')
  );
  if (isPublicPage) {
    if (!auth.user) await auth.apiGetCurrentUser();
    return;
  }

  if (!auth.user) {
    try {
      await auth.apiGetCurrentUser();
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return navigateTo('/auth/login');
    }
  }

  if (!auth.user) return navigateTo('/auth/login');
});
