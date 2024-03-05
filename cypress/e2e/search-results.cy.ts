import { SearchPage } from "../pages";
import { inViews, inAllViews } from "../support/e2e";
import { View } from "@src/view-code";

// TODO: ArchivesSpace availability?

describe("Search Results", () => {
  let page: SearchPage;

  inAllViews((view) => {
    before(() => {
      page = new SearchPage(view);
      page.visit();
    });

    it("does not display the Rapido 'still not found' link", () => {
      page.searchFor("baseball");
      cy.get("prm-search-result-list").should("be.visible");
      cy.get("prm-ngrs-results-button").should("not.be.visible");
    });
  });

  inViews([View.TWINCITIES, View.DULUTH, View.MORRIS], (view) => {
    before(() => {
      page = new SearchPage(view);
      page.visit();
    });

    it("displays search suggestions", () => {
      page.searchFor("test");
      cy.get("prm-search-result-list-after").contains(
        "Haven't found what you're looking for?"
      );
    });
  });
});
