import { SearchPage } from "../pages";
import { inAllViews } from "../support/e2e";

/**
 * stub the blogger feed jsonp response
 */
const stubFeed = () => {
  cy.fixture("blogger-feed").then((json) => {
    cy.intercept(
      {
        method: "GET",
        hostname: "umnprimonotifications.blogspot.com",
        pathname: "/feeds/posts/default",
        query: {
          alt: "json-in-script",
          callback: "*",
        },
      },
      (req) => {
        // because this is a jsonp request, we need to first get the
        // dynamically-generated callback function name in order to
        // format the response body
        const url = new URL(req.url);
        const callbackName = url.searchParams.get("callback");
        req.reply(`${callbackName}(${JSON.stringify(json)})`);
      }
    ).as("bloggerFeed");
  });
};

describe("Blogger Notifications", () => {
  let page: SearchPage;

  inAllViews((view) => {
    beforeEach(() => {
      stubFeed();
      page = new SearchPage(view);
      page.visit();
    });

    it("displays the first feed entry", () => {
      page.bloggerNotification.contains("Test Notification: This is a test.");
    });

    it("does not display dismissed notifications", () => {
      page.bloggerNotification.find("button").click();
      page.bloggerNotification.should("not.exist");
      // dismissed notifications shouldn't display on subsequent page loads too
      cy.reload(true);
      page.bloggerNotification.should("not.exist");
    });
  });
});
