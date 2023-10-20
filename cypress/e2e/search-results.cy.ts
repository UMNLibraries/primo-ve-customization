import { SearchPage } from "../pages";
import { inViews } from "../support/e2e";
import { View } from "@src/view-code";

// TODO: ArchivesSpace availability?

describe("Search Results", () => {
  let page: SearchPage;

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
