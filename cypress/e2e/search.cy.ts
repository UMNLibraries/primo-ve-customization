import { SearchPage } from "../pages/search";

describe("Search", () => {
  let searchPage: SearchPage;

  context("Twin Cities", () => {
    beforeEach(() => {
      searchPage = new SearchPage("01UMN_INST:TWINCITIES");
      searchPage.visit();
    });

    describe("QuestionPoint Chat", () => {
      it("displays a chat dialog when clicked", () => {
        searchPage.chatLink.click();
        searchPage.chatDialog.contains("h2", /libraries.*chat/i);
        searchPage.chatCloseButton.click();
        searchPage.chatDialog.should("not.exist");
      });
    });

    describe("Advanced Search", () => {
      it("should not be collapsed", () => {
        searchPage.advancedSearchButton.click();
        searchPage.advancedSearchInputFields.first().type("test");
        searchPage.advancedSearchSubmit.click();
        cy.get("#advancedSearchTabs").should(
          "not.have.class",
          "shrink-content"
        );
      });
    });
  });
});
