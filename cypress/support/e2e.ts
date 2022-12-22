// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";
import ViewCode from "../../src/view-code";

type View = typeof ViewCode[keyof typeof ViewCode];
type ViewCallback = (view: View) => void;

export const inView = (view: View, fn: ViewCallback) =>
  context(`In the ${view} view, `, () => fn(view));

export const inAllViews = (fn: ViewCallback) =>
  Object.values(ViewCode).forEach((v: View) => inView(v, fn));
