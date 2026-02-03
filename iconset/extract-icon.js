import { IconSet } from '@iconify/tools';
import fg from 'fast-glob';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import config from './config.js';

// Load icon sets dynamically
const loadedSets = {};

for (const set of config.iconSets) {
  const pkgPath = resolve(process.cwd(), 'node_modules', set.package);
  const raw = JSON.parse(readFileSync(pkgPath, 'utf8'));

  loadedSets[set.prefix] = new IconSet({
    prefix: raw.prefix,
    icons: raw.icons,
    aliases: raw.aliases || {},
  });
}

const run = async () => {
  let used = new Set();

  const files = await fg('**/*.{vue,ts,js}', {
    cwd: resolve(process.cwd(), ''),
    absolute: true,
    ignore: [
      'node_modules',
      'dist',
      '.output',
      '.nuxt',
      '.git',
      '.vscode',
      '.idea',
      '.fleet',
      '.DS_Store',
    ],
  });

  console.clear();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const content = readFileSync(file, 'utf8');

    // for each pack
    for (const pack of config.iconSets) {
      // found icons
      for (const match of content.matchAll(pack.regex)) {
        // used.add(`${match[1]}:${match[2]}`);
        used.add(`${match[0]}`.replaceAll(`'`, '').replaceAll(`"`, ''));
      }

      if ((i + 1) % 10 === 0 || i === files.length - 1) {
        const percent = Math.floor(((i + 1) / files.length) * 100);
        process.stdout.write(`\rProcessed ${percent}%`);
      }
    }
  }

  used = [...used, ...config.customList];

  const finals = {}; // { solar: {...}, mdi: {...}, custom: {...} }
  for (const name of used) {
    const [prefix, iconName] = name.split(':');

    const set = loadedSets[prefix];
    if (!set) continue;

    const data = set.resolve(iconName);
    if (!data) continue;

    if (!finals[prefix]) {
      finals[prefix] = {
        prefix,
        icons: {},
        aliases: {},
      };
    }

    finals[prefix].icons[iconName] = {
      body: data.body,
    };
    finals[prefix].left = 0;
    finals[prefix].top = 0;
    finals[prefix].width = 24;
    finals[prefix].height = 24;
  }

  const out = resolve(process.cwd(), 'iconset/custom-icons.json');
  writeFileSync(out, JSON.stringify(finals, null, 2));
};

run();
