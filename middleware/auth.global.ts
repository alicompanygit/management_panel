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

  // بررسی مسیر عمومی
  const isPublicPage = publicRoutes.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath + '/')
  );
  if (isPublicPage) return;

  // اگر کاربر لاگین نیست، تلاش کن از API اطلاعات بگیری
  if (!auth.user) {
    try {
      await auth.apiGetCurrentUser();
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return navigateTo('/auth/login');
    }
  }

  // بعد از fetch، اگر هنوز user null بود → ریدایرکت
  if (!auth.user) return navigateTo('/auth/login');
});
