import template from "./ill-account-link.html";

class IllAccountLinkController {
  get illAccountLink() {
    return "http://ezproxy.lib.umn.edu/login?qurl=https%3A%2F%2Fumn.illiad.oclc.org%2Filliad%2FILLiad.dll";
  }
}

export const IllAccountLinkComponent = {
  controller: IllAccountLinkController,
  template: template,
};
