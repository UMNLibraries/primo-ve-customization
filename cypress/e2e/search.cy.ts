import { SearchPage } from "../pages";
import { inAllViews, inView } from "../support/e2e";

// TOOD: add topbar tags test?

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

  inView("01UMN_INST:DULUTH", (view) => {
    beforeEach(() => {
      searchPage = new SearchPage(view);
      searchPage.visit();
    });

    describe("QuestionPoint Chat", () => {
      it("displays a chat dialog when clicked", () => {
        searchPage.chatLink.click();
        searchPage.chatDialog.contains("h2", /chat with a librarian/i);
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

    describe("Logo", () => {
      it("is clickable", () => {
        cy.get("prm-logo a").should("exist");
      });
    });

    describe("Advanced Search", () => {
      it("is not collapsed", () => {
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
