import { readFile } from 'fs/promises';

const convertPropPair = (scss, pair) =>
  scss + `$${pair.join(': ')};`;

const convertable = {
  toScss: function() {
    return Object.entries(this).reduce(convertPropPair, '');
  }
}

const colorTheme = await readFile(
  new URL(
    './shared/color-theme/colors.json', 
    import.meta.url)
).then(JSON.parse);

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
