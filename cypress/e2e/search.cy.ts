import { SearchPage } from "../pages";
import { inAllViews, inView } from "../support/e2e";
import { View } from "@src/view-code";

describe("Search", () => {
  let searchPage: SearchPage;

  inView(View.TWINCITIES, (view) => {
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

  inView(View.DULUTH, (view) => {
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
