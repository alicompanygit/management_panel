// --- CONFIG ---
const iconSets = [
  {
    prefix: 'solar',
    package: '@iconify-json/solar/icons.json',
    regex: /["'`]solar:(.*?)['"`]/g,
  },
  {
    prefix: 'material-symbols-light',
    package: '@iconify-json/material-symbols-light/icons.json',
    regex: /["'`]material-symbols-light:(.*?)['"`]/g,
  },
];

const customList = [
  'solar:phone-calling-rounded-bold',
  'solar:align-top-outline',
  'solar:hamburger-menu-outline',
  'solar:money-bag-outline',
  'solar:server-linear',
  'solar:history-linear',
  'solar:add-square-outline',
  'solar:download-minimalistic-outline',
  'solar:filter-outline',
  'solar:magnifer-linear',
  'solar:settings-linear',
];

export default {
  iconSets,
  customList,
};
