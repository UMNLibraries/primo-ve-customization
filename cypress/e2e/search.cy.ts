import { SearchPage } from "../pages/search";

describe("Search", () => {
  let searchPage: SearchPage;

  context("Twin Cities", () => {
    before(() => {
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
  });
});
