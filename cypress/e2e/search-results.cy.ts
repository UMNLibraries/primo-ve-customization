import { SearchPage } from "../pages";
import { inViews } from "../support/e2e";

// TODO: ArchivesSpace availability?

describe("Search Results", () => {
  let page: SearchPage;

  inViews(["01UMN_INST:TWINCITIES", "01UMN_INST:DULUTH"], (view) => {
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
