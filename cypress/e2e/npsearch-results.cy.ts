import { NewspaperSearchPage } from "../pages";
import { inAllViews } from "../support/e2e";

describe("Newspaper Search Results", () => {
  let page: NewspaperSearchPage;

  inAllViews((view) => {
    before(() => {
      page = new NewspaperSearchPage(view);
      page.visit();
    });

    it("does not display the Rapido 'expand' link", () => {
      page.searchFor("lost cat");
      cy.get("prm-search-result-list").should("be.visible");
      cy.get("prm-ngrs-results-button button#global-search").should(
        "not.exist"
      );
    });
  });
});
