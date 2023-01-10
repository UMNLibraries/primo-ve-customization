# UMN Libraries Primo VE Customization Packages

University of Minnesota's [webpack](https://webpack.js.org/)-based toolkit for building Primo VE customization packages.

## Overview

When planning our migration from Primo to Primo VE, we discovered that VE does not support central packages in single-institution, multi-campus Alma environments. To work around this limitation, we are using a custom build tool for our Primo customization packages.

## Usage

### Installation

1. Make sure [Node.js](https://nodejs.org) version 18+ is installed.
2. Clone this repository.
3. From the project's root directory, run `npm install`.

### Local Development

Run `npm start` to launch a development proxy server and preview the customization packages in the UMN Libraries production server. To preview a view, go to `http://localhost:8080/discovery/search?vid={view_code}` (e.g. http://localhost:8080/discovery/search?vid=01UMN_INST:TWINCITIES).

Set the `PROXY_TARGET` environment variable to preview the customizations in a different Primo environment (e.g. `PROXY_TARGET=umn.primo.exlibrisgroup.com npm start`).

### Color Theme

The color theme is generated with the [primo-color-theme tool](https://github.com/UMNLibraries/primo-color-theme). To modify the color theme, edit `src/shared/color-theme/colors.json` and then run `npm run color-theme`. This will rebuild the `src/shared/color-theme/generated-theme.css` file. It's a good practice to regenerate the color theme whenever Primo VE is upgraded.

_Note_: The color variables defined in `src/shared/color-theme/colors.js` are available globally in any sass/scss file.

### Deployment

Run `npm run build` to create production-ready deployment packages. A zip file for each view will be created under `dist/packages/`. To deploy a package, upload its zip file in the Manage Customization Package tab in Alma (under Discovery > Manage Views > {view_code}).

### Testing

#### Type Checking (TypeScript)

This project uses [Babel](https://babeljs.io/) to compile TypeScript. Babel is a fast compiler, but it doesn't perform type checking. Run `npm test:types` to perform type checking on all TypeScript files using the standard tcs compiler.

#### Unit Tests (Karma)

Run `npm run test:unit` to execute the unit tests using headless [Karma](https://karma-runner.github.io/latest/index.html). The Karma configuration file is `karma.config.cjs`.

You could also use `npm test` to run type checking and unit tests in one step.

Per angular convention, unit tests (spec files) are located in the same directory as the implementation. For instance:

```
src/
  ...
    foo/
      foo.component.ts
      foo.component.spec.ts
```

#### End-to-end Tests (Cypress)

_Note: we're now using [Cypress](https://www.cypress.io/) instead of Protractor for end-to-end tests._

Run `npm run test:e2e` to launch the local dev server and execute the end-to-end tests. The Cypress configuration and test files are in the `cypress/` directory.

If you care to use the [Cypress GUI](https://docs.cypress.io/guides/core-concepts/cypress-app#What-you-ll-learn), you can launch it with `npm cy:open`.

## Structure & Build Process

The files under `src/shared/` are intended to be shared across all views. Any view-specific customizations belong under `src/views/`.

```
src
├── @types
├── shared
│  ├── color-theme
│  ├── components
│  ├── filters
│  ├── html
│  ├── img
│  └── services
└── views
    ├── 01UMN_INST-CROOKSTON
    │  ├── html
    │  └── img
    ├── 01UMN_INST-DULUTH
    │  ├── components
    │  ├── html
    │  └── img
    ├── 01UMN_INST-MORRIS
    │  ├── components
    │  ├── html
    │  └── img
    └── 01UMN_INST-TWINCITIES
       ├── components
       ├── html
       └── img
```

At build time, a Primo customization package is created for each view. Each view's TypeScript/JavaScript files are bundled into a single `js/custom.js` file, and each view's SCSS/CSS files are bundled into a single `css/custom1.css` file. All assets from the following directories are copied to the package as-is:

- `src/shared/html/`
- `src/shared/img/`
- `src/views/*/html/`
- `src/views/*/img/`

Build output:

```
dist
├── 01UMN_INST-CROOKSTON
│  ├── css
│  ├── html
│  ├── img
│  └── js
├── 01UMN_INST-DULUTH
│  ├── css
│  ├── html
│  ├── img
│  └── js
├── 01UMN_INST-MORRIS
│  ├── css
│  ├── html
│  ├── img
│  └── js
├── 01UMN_INST-TWINCITIES
│  ├── css
│  ├── html
│  ├── img
│  └── js
└── packages
   ├── 01UMN_INST-CROOKSTON.zip
   ├── 01UMN_INST-DULUTH.zip
   ├── 01UMN_INST-MORRIS.zip
   └── 01UMN_INST-TWINCITIES.zip
```

### Managing Browser Compatibility

This project uses [Browserslist](https://browsersl.ist/) to target JavaScript and CSS compatibility. This helps to reduce bundle bloat by omitting polyfills for unsupported browsers such as Internet Explorer 11. The targeted browsers are defined in `.browserslistrc`.

## Resources

- [Primo VE Customization Package Documentation](<https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/020Primo_VE/Primo_VE_(English)/030Primo_VE_User_Interface/010Primo_VE_Customization_-_Best_Practices>)
- [#primodev Slack Chanel](https://igelu-eluna-siwg.slack.com/messages/primodev)
- [Primo Email List](https://el-una.org/about/mailing-lists/primo-email-list/)
