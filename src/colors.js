import { readFile } from 'fs/promises';

const jsonFile = './packages/01UMN_INST-CENTRAL_PACKAGE/color-theme/colors.json';
const colorTheme = await readFile(new URL(jsonFile, import.meta.url)).then(JSON.parse);

const colors = {
  ...colorTheme,
  lightSecondary: '#ffd75f', // light gold from the Nokomis theme
}

colors.toScss = function() {
  return Object.entries(this)
    .filter(entry => typeof (entry[1]) === 'string')
    .reduce((scss, entry) => scss += `$${entry.join(': ')};`, '');
}

export default colors;
