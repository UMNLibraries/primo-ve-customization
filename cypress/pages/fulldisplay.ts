import { PrimoPage } from "./primo";

export class FullDisplayPage extends PrimoPage {
  override visit(
    url: string = "/fullview",
    options: { qs: { docid: string } }
  ): void {
    super.visit(url, options);
  }
}
