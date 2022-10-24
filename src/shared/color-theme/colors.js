import { readFile } from 'fs/promises';

const colorTheme = 
  await readFile(new URL('./colors.json', import.meta.url))
  .then(JSON.parse);

const convertable = {
  toSass: function() {
    return Object.entries(this).reduce(
      (sass, entry) => sass + `$${entry.join(': ')};`, 
      '');
  }
}

/**
 * Defines a common set of color variables that can be shared between
 * JS/TS and Sass/SCSS. Includes Primo's built-in color theme variables 
 * (defined in colors.json) and any additional custom color variables.
 */
export default {
  __proto__: convertable,
  ...colorTheme,
  lightSecondary: '#ffd75f', // light gold from the Nokomis theme
}
