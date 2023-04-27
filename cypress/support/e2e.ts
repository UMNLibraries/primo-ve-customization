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
import { View, ViewCode } from "@src/view-code";

type ViewCallback = (view: ViewCode) => void;

export const inView = (view: ViewCode, fn: ViewCallback) =>
  context(`In the ${view} view, `, () => fn(view));

export const inViews = (views: ViewCode[], fn: ViewCallback) =>
  views.forEach((v: ViewCode) => inView(v, fn));

export const inAllViews = (fn: ViewCallback) =>
  inViews(Object.values(View), fn);
