import { ViewCode } from "../support/view-code";

describe("Search", () => {
  context("Twin Cities", () => {
    before(() => {
      cy.visit(`/search?vid=${ViewCode.TWINCITIES}`);
    });

    describe("Chat", () => {
      it("displays a chat dialog when clicked", () => {
        cy.get("a[show-chat-on-click]").click();
        cy.get(".qpoint-chat iframe")
          .its("0.contentDocument.body")
          .should("not.be.empty")
          .then(cy.wrap)
          .find("iframe") // the chat widget is in a weird nested iframe
          .its("0.contentDocument.body")
          .should("not.be.empty")
          .then(cy.wrap)
          .contains("h2", /libraries.*chat/i);

        //close the dialog
        cy.get(".qpoint-chat").find("md-dialog-actions button").click();
        cy.get(".qpoint-chat").should("not.exist");
      });
    });
  });
});
