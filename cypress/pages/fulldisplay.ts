import { PrimoPage, ViewCode } from "./primo";

export class FullDisplayPage extends PrimoPage {
  readonly docid;

  constructor(view: ViewCode, docid: string) {
    super(view);
  }

  override visit() {
    super.visit("/fulldisplay", { qs: { docid: this.docid } });
  }
}
