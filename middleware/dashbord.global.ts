import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuth } from './../composables/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const { path } = to;

  const isDashboard = path === '/dashboard' || path.startsWith('/dashboard/');

  if (!isDashboard) {
    return;
  }

  if (!useAuth.user) {
    try {
      await useAuth.apiGetCurrentUser();
    } catch (error) {
      return navigateTo('/auth/login');
    }
  }

  if (!useAuth.user) return navigateTo('/auth/login');
  else if (!useAuth.user.is_god && !useAuth.user.is_super_user)
    return navigateTo('/auth/login');
});
