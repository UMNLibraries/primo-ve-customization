export type View =
  | "01UMN_INST:TWINCITIES"
  | "01UMN_INST:DULUTH"
  | "01UMN_INST:MORRIS"
  | "01UMN_INST:CROOKSTON";

export abstract class PrimoPage {
  constructor(readonly view: View) {}

  visit(path: string) {
    cy.visit(`${path}?vid=${this.view}`);
  }
}
