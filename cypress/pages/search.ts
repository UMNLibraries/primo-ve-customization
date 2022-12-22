import { PrimoPage } from "./primo";

export class SearchPage extends PrimoPage {
  override visit() {
    super.visit(`/search`);
  }

  searchFor(query: string) {
    return cy.get("#searchBar").type(query + "{enter}");
  }

  get chatLink() {
    return cy.get("a[show-chat-on-click]");
  }

  /**
   * returns the questionpoint chat widget (nested iframe)
   */
  get chatDialog() {
    return cy
      .get(".qpoint-chat iframe")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
      .find("iframe") // the chat widget is in a weird nested iframe
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap);
  }

  get chatCloseButton() {
    return cy.get(".qpoint-chat").find("md-dialog-actions button");
  }

  get advancedSearchInputFields() {
    return cy.get('#advanced-search input[ng-model="row.searchQuery"]');
  }

  get advancedSearchButton() {
    return cy.get('button[ng-click="$ctrl.switchAdvancedSearch()"]');
  }

  get advancedSearchSubmit() {
    return cy.get('#advanced-search button[type="submit"]');
  }

  get bloggerNotification() {
    return cy.get("md-toast.blogger-notification");
  }
}
