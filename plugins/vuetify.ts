import '@mdi/font/css/materialdesignicons.css';
import VueTablerIcons from 'vue-tabler-icons';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
//Mock Api data
import '@/assets/scss/style.scss';
import { addCollection, Icon } from '@iconify/vue';
import Maska from 'maska';
import { h } from 'vue';
import 'vue3-carousel/dist/carousel.css';

import customIconSet from '@/iconset/custom-icons.json';

//DragScroll
import { VueDraggableNext } from 'vue-draggable-next';

import VueScrollTo from 'vue-scrollto';

// Table
import * as Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
//i18
import { SHARED_COLORS } from '@/theme/LightTheme';
import { defineNuxtPlugin } from 'nuxt/app';

import { addAPIProvider } from '@iconify/vue';

export default defineNuxtPlugin((nuxtApp) => {
  addAPIProvider('', { resources: [] });

  for (const prefix in customIconSet) {
    addCollection(customIconSet[prefix as keyof typeof customIconSet] as any);
  }

  const iconifyResolver = {
    component: (props) => h(Icon, { icon: props.icon }),
  };

  const vuetify = createVuetify({
    components: {
      draggable: VueDraggableNext,
    },
    directives,
    icons: {
      defaultSet: 'iconify',
      sets: {
        iconify: iconifyResolver,
      },
    },
    theme: {
      defaultTheme: 'SHARED_COLORS',
      themes: {
        shared: {
          dark: false,
          colors: SHARED_COLORS,
        },
      },
    },
    defaults: {
      VCard: {
        rounded: 'xl',
        elevation: 10,
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
      },
      VTextarea: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
      },
      VSelect: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
      },
      VListItem: {
        minHeight: '45px',
      },
      VTooltip: {
        location: 'top',
      },
      VBtn: {
        style: 'text-transform: capitalize; letter-spacing:0',
        rounded: 'md',
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
  nuxtApp.vueApp.component('EasyDataTable', Vue3EasyDataTable);
  nuxtApp.vueApp.use(PerfectScrollbar);
  nuxtApp.vueApp.use(VueTablerIcons);
  nuxtApp.vueApp.use(Maska);
  nuxtApp.vueApp.use(VueScrollTo, {
    duration: 1000,
    easing: 'ease',
    offset: -50,
  });
});
