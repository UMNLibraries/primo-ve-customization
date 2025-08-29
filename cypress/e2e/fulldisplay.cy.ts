import { FullDisplayPage } from "../pages";
import { inAllViews, inView } from "../support/e2e";
import { View } from "@src/view-code";

describe("Full Display", () => {
  let page: FullDisplayPage;

  inAllViews((view) => {
    describe("LibKey", () => {
      const articleId =
        "cdi_pubmedcentral_primary_oai_pubmedcentral_nih_gov_4310632";

      beforeEach(() => {
        page = new FullDisplayPage(view, articleId);
        page.visit();
      });

      it("displays a PDF download link", () => {
        cy.get("a.browzine-direct-to-pdf-link").should("exist");
      });
    });
  });
});
