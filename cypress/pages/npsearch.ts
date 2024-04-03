import { PrimoPage } from "./primo";

export class NewspaperSearchPage extends PrimoPage {
  override visit() {
    super.visit(`/npsearch`);
  }

  searchFor(query: string) {
    return cy.get("#searchBar").type(query + "{enter}");
  }
}
