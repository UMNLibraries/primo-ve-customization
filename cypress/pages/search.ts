import { PrimoPage } from "./primo";

export class SearchPage extends PrimoPage {
  override visit() {
    super.visit(`/search`);
  }

  searchFor(query: string) {
    return cy.get("#searchBar").type(query + "{enter}");
  }
}
