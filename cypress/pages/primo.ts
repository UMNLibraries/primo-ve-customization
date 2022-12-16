type View =
  | "01UMN_INST:TWINCITIES"
  | "01UMN_INST:DULUTH"
  | "01UMN_INST:MORRIS"
  | "01UMN_INST:CROOKSTON";

type QueryString = {
  [key: string]: string;
};

export abstract class PrimoPage {
  constructor(readonly view: View) {}

  visit(url: string, options: { qs: QueryString } = { qs: {} }) {
    options.qs.vid ??= this.view;
    cy.visit(url, options);
  }
}
