import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuth } from './'


const publicRoutes = ['/auth/login', '/auth/forgot-password', '/set-password'];

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth;

  const toPath = to.path.replace(/^\/|\/$/g, '');
  const isPublicPage = publicRoutes.includes('/' + toPath);

  if (!auth.user) {
    await auth.apiGetCurrentUser().catch(() => {
      console.error('error in auth middleware file: user not found')
    });
  }

  const hasAccess = !!auth.user;

  if (!hasAccess && !isPublicPage) {
    return navigateTo('/auth/login');
  }

  if (hasAccess && isPublicPage) {
    return navigateTo('/');
  }

});
