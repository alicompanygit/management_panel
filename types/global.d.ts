// Global reuseable types

import type { Fetching } from '~/plugins/fetching';

export {}; // ensure this file is treated as a module

declare global {
  // for globalThis.fetching
  var fetching: Fetching;

  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };

  type Required<T> = {
    [P in keyof T]-?: T[P];
  };
}
