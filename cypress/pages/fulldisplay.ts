import { PrimoPage, ViewCode } from "./primo";

export class FullDisplayPage extends PrimoPage {
  readonly docid: string;

  constructor(view: ViewCode, docid: string) {
    super(view);
    this.docid = docid;
  }

  override visit() {
    super.visit("/fulldisplay", { qs: { docid: this.docid } });
  }
}
