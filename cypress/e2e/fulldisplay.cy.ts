import { FullDisplayPage } from "../pages";
import { inAllViews, inView } from "../support/e2e";

describe("Full Display", () => {
  let page: FullDisplayPage;

  inView("01UMN_INST:TWINCITIES", (view) => {
    describe("Custom availability", () => {
      const recordId = "alma9982140111201701";

      beforeEach(() => {
        page = new FullDisplayPage(view, recordId);
        page.visit();
      });

      it("displays a custom availability statement for ArchivesSpace", () => {
        cy.get(".availability-status").should(
          "have.text",
          "View collection guide"
        );
      });
    });
  });

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
