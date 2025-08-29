import { SearchPage } from "../pages";
import { inView, inViews, inAllViews } from "../support/e2e";
import { View } from "@src/view-code";

describe("Search Results", () => {
  let page: SearchPage;

  inAllViews((view) => {
    before(() => {
      page = new SearchPage(view);
      page.visit();
    });

    it("does not display the Rapido 'still not found' link", () => {
      page.searchFor("baseball");
      cy.get("prm-search-result-list").should("be.visible");
      cy.get("prm-ngrs-results-button button#ill-request-link").should(
        "not.exist"
      );
    });
  });

  inViews([View.TWINCITIES, View.DULUTH, View.MORRIS], (view) => {
    before(() => {
      page = new SearchPage(view);
      page.visit();
    });

    it("displays search suggestions", () => {
      page.searchFor("foo");
      cy.get("prm-search-result-list-after").contains(
        "Haven't found what you're looking for?"
      );
    });
  });

  inViews([View.TWINCITIES, View.DULUTH, View.CROOKSTON], (view) => {
    before(() => {
      page = new SearchPage(view);
      page.visit();
    });

    describe("Rapido exclude toggle", () => {
      it("filters out Rapido results", () => {
        page.searchFor("rna");
        cy.get("exclude-beyond-toggle").should("be.visible");
        cy.get("exclude-beyond-toggle md-switch").click();
        cy.location("search").should("include", "pcAvailability=false");
      });
    });
  });

  inView(View.TWINCITIES, (view) => {
    describe("Custom availability", () => {
      before(() => {
        cy.visit({
          url: "/search",
          qs: {
            vid: view,
            query: "prima_facet_source_code,exact,archivesspace",
          },
        });
      });

      it("displays a custom availability statement for ArchivesSpace", () => {
        cy.get(".availability-status")
          .first()
          .should("have.text", "View collection guide");
      });
    });
  });
});
