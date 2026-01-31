import { useCookie } from '@/composables/useCookie';
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useSettingsRAP } from '~/composables/settings/roles-and-permissions';
import { useSettingsUser } from '~/composables/settings/user';
import { EGlobalStoreEnums } from '~/composables/useGlobal';
import { parseJwtPayload } from '~/types/permission/Types';

const publicRoutes = ['auth/login', 'auth/forgot-password', 'set-password'];

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const { getCookie } = useCookie();
    const accessToken = getCookie('accessToken');

    const toPath = to.path.replace(/^\/|\/$/g, '');
    const isShortLink = /^[a-zA-Z0-9]{6}$/.test(toPath);
    const isPublicPage = publicRoutes.includes(toPath);
    const hasAccess = !!accessToken;

    const jwtData = parseJwtPayload();
    const tokenExpired = jwtData.exp && jwtData.exp < Date.now() / 1000;

    try {
      if (isShortLink) {
        return;
      }

      if (!hasAccess && !isPublicPage) {
        throw new Error('no access');
      }

      if (tokenExpired) {
        const accessToken = useCookie('accessToken');
        const adminNumber = useCookie('adminNumber');

        accessToken.value = null;
        adminNumber.value = null;

        localStorage.removeItem(EGlobalStoreEnums.RAP_USER_ROLES);

        throw new Error('token expired');
      }

      // must handle errors on private pages
      if (hasAccess && !isPublicPage) {
        await useSettingsUser.initUserData();
        await useSettingsRAP.initUserAccess();
      }

      if (hasAccess && isPublicPage) {
        return navigateTo('/');
      }
    } catch (err) {
      console.log(err);
      return navigateTo('/auth/login');
    }
  }
});
