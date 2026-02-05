import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuth } from './../composables/auth';

const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/set-password'
];

export default defineNuxtRouteMiddleware(async (to) => {
  const { path } = to;
  
  // بررسی اینکه آیا مسیر فعلی جزو مسیرهای عمومی است
  const isPublicPage = publicRoutes.some(publicPath => 
    path === publicPath || path.startsWith(publicPath + '/')
  );
  
  // اگر در صفحه عمومی هستیم، میدلور را متوقف کن
  if (isPublicPage) {
    return;
    console.log('public page ali')
  }
  
  // اگر کاربر وجود ندارد، سعی کن اطلاعاتش را بگیر
  if (!useAuth.user) {
    try {
      await useAuth.apiGetCurrentUser();
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // اگر گرفتن اطلاعات کاربر شکست خورد، به لاگین هدایت کن
      return navigateTo('/auth/login');
    }
  }
  
  // اگر هنوز کاربری وجود ندارد (بعد از تلاش برای گرفتن اطلاعات)
  if (!useAuth.user) {
    return navigateTo('/auth/login');
  }
  
  // اگر کاربر لاگین کرده است و سعی می‌کند به صفحه عمومی برود
  if (useAuth.user && isPublicPage) {
    return navigateTo('/');
  }
});