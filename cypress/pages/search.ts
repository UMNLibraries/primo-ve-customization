import { PrimoPage } from "./primo";

export class SearchPage extends PrimoPage {
  visit() {
    super.visit(`/search`);
  }

  searchFor(query: string) {
    return cy.get("#searchBar").type(query + "{enter}");
  }
}
