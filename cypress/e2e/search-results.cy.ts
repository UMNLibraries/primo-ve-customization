import { SearchPage } from "../pages";
import { inView } from "../support/e2e";

// TODO: ArchivesSpace availability?

describe("Search Results", () => {
  let page: SearchPage;

  inView("01UMN_INST:TWINCITIES", (view) => {
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
