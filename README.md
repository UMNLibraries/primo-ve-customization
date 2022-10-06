# UMN Libraries Primo VE Customization Packages
University of Minnesota's webpack-based toolkit for building Primo VE customization packages. 

## Overview
When planning our migration from Primo to Primo VE, we discovered that VE does not support central packages in single-institution, multi-campus Alma environments. To work around this limitation, we are using a custom build tool and deploying the central package as a Primo view. (Technically, the central package can be deployed anywhere; using Primo/Alma is just a convenience.) Other views will load JavaScript/CSS from the central package at runtime. 

## Structure

Shared JavaScript and CSS are defined in `src/packages/01UMN_INST-CENTRAL_PACKAGE`. Use `src/common-assets` to share images and html files among all views. All view-specific customizations should be defined in one of the following packages: 

- `src/packages/01UMN_INST-TWINCITIES`
- `src/packages/01UMN_INST-DULUTH`
- `src/packages/01UMN_INST-MORRIS`
- `src/packages/01UMN_INST-CROOKSTON`

### Installation

1. Make sure [Node.js](https://nodejs.org) 16+ is installed. 
2. Clone this repository.
3. From the project's root directory, run `npm install`.

### Local Development

Run `npm start` to launch a development proxy server and preview the customization packages in the UMN Libraries sandbox server. To preview a view, go to `http://localhost:8080/discovery/search?vid={view_code}` (e.g. http://localhost:8080/discovery/search?vid=01UMN_INST:TWINCITIES).

Set the `PROXY_TARGET` environment variable to preview the customizations in a different Primo environment (e.g. `PROXY_TARGET=umn.primo.exlibrisgroup.com npm start`).

*Note: A CENTRAL_PACKAGE view must exist in Primo for the development proxy to work.*

### Deployment
Run `npm run build` to create production-ready deployment packages. A zip file for each package will be created under `dist/packages/`. To deploy a package, upload its zip file in the Manage Customization Package tab in Alma (under Discovery > Manage Views > {view_code}).

### Test

