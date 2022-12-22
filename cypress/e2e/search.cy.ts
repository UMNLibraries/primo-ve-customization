import { SearchPage } from "../pages/search";
import { inAllViews, inView } from "../support/e2e";

describe("Search", () => {
  let searchPage: SearchPage;

  inView("01UMN_INST:TWINCITIES", (view) => {
    beforeEach(() => {
      searchPage = new SearchPage(view);
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
  });

  inAllViews((view) => {
    beforeEach(() => {
      searchPage = new SearchPage(view);
      searchPage.visit();
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
