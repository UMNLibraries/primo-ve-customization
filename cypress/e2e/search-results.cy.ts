import { SearchPage } from "../pages/search";

describe("search results", () => {
  let page: SearchPage;

  before(() => {
    page = new SearchPage("01UMN_INST:TWINCITIES");
    page.visit();
  });

  it("displays search suggestions", () => {
    page.searchFor("test");
    cy.get("prm-search-result-list-after").contains(
      "Haven't found what you're looking for?"
    );
  });
});
