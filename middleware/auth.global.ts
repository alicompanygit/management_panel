import { defineNuxtRouteMiddleware } from 'nuxt/app';

const publicRoutes = [
  '/auth/login',
  '/auth/register',
];

export default defineNuxtRouteMiddleware(async (to) => {
  const { path } = to;
  
  // const isPublicPage = publicRoutes.some(publicPath => 
  //   path === publicPath || path.startsWith(publicPath + '/')
  // );
  
  // if (isPublicPage) {
  //   return;
  // }
  
  // if (!useAuth.user) {
  //   try {
  //     await useAuth.apiGetCurrentUser();
  //   } catch (error) {
  //     console.error('Failed to fetch user:', error);
  //     return navigateTo('/auth/login');
  //   }
  // }
  
  // if (!useAuth.user) {
  //   return navigateTo('/auth/login');
  // }
  
  // if (useAuth.user && isPublicPage) {
  //   return navigateTo('/');
  // }
});