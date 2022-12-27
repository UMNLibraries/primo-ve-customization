# UMN Libraries Primo VE Customization Packages

University of Minnesota's webpack-based toolkit for building Primo VE customization packages.

## Overview

When planning our migration from Primo to Primo VE, we discovered that VE does not support central packages in single-institution, multi-campus Alma environments. To work around this limitation, we are using a custom build tool for our Primo customization packages.

## Structure

All JavaScript, CSS, HTML, images, etc. in the `src/shared` directory are included in every view's customization package. View-specific customizations are under `src/views`:

- `src/views/01UMN_INST-TWINCITIES`
- `src/views/01UMN_INST-DULUTH`
- `src/views/01UMN_INST-MORRIS`
- `src/views/01UMN_INST-CROOKSTON`

## Usage

### Installation

1. Make sure [Node.js](https://nodejs.org) version 18+ is installed.
2. Clone this repository.
3. From the project's root directory, run `npm install`.

### Local Development

Run `npm start` to launch a development proxy server and preview the customization packages in the UMN Libraries production server. To preview a view, go to `http://localhost:8080/discovery/search?vid={view_code}` (e.g. http://localhost:8080/discovery/search?vid=01UMN_INST:TWINCITIES).

Set the `PROXY_TARGET` environment variable to preview the customizations in a different Primo environment (e.g. `PROXY_TARGET=umn.primo.exlibrisgroup.com npm start`).

### Color Theme

The color theme is defined in the central package and is generated with the [primo-color-theme tool](https://github.com/UMNLibraries/primo-color-theme). To modify the color theme, edit `src/shared/color-theme/colors.json` and then run `npm run color-theme`. This will rebuild the `src/shared/color-theme/generated-theme.css` file. It's a good practice to regenerate the color theme whenever Primo VE is upgraded.

### Deployment

Run `npm run build` to create production-ready deployment packages. A zip file for each view will be created under `dist/packages/`. To deploy a package, upload its zip file in the Manage Customization Package tab in Alma (under Discovery > Manage Views > {view_code}).

### Test

#### Unit Tests (Karma)

Run `npm test` to execute the unit tests. The Karma configuration file is `config/karma.config.cjs`.

#### End-to-end Tests (Cypress)

Run `npm run test:e2e` to launch the local dev server and execute the end-to-end tests. The Cypress config file is `config/cypress.config.js`. (Note: we're now using Cypress instead of Protractor for end-to-end tests.)
