import { IllModule } from ".";
import { IlliadService } from "./illiad.service";

describe("Illiad Service", () => {
  let illiad: IlliadService, $httpBackend: ng.IHttpBackendService;

  beforeEach(() => {
    angular.mock.module(IllModule);
    angular.mock.inject(($injector) => {
      illiad = $injector.get("illiad");
      $httpBackend = $injector.get("$httpBackend");
    });
  });

  it("should normalize ILLiad request DTOs", () => {
    // ILLiad API response objects have many more attributes,
    // but these are the only ones we care about.
    const apiResponse = `[
      {
        "TransactionNumber": 1290891,
        "LoanAuthor": "Hohpe, Gregor",
        "LoanTitle": "Enterprise integration patterns - designing, building, and deploying messaging solutions",
        "PhotoArticleAuthor": null,
        "PhotoArticleTitle": null
      },
      {
        "TransactionNumber": 1656181,
        "LoanAuthor": null,
        "LoanTitle": null,
        "PhotoArticleAuthor": "Jost, John T",
        "PhotoArticleTitle": "Working class conservatism: a system justification perspective"
      }
    ]`;
    const expected = JSON.parse(`[
      {
        "txnNum": 1290891,
        "title": "Enterprise integration patterns - designing, building, and deploying messaging solutions",
        "author": "Hohpe, Gregor"
      },
      {
        "txnNum": 1656181,
        "title": "Working class conservatism: a system justification perspective",
        "author": "Jost, John T"
      }
    ]`);
    $httpBackend.expectGET(illiad.requestsUrl).respond(apiResponse);
    illiad.getRequests().then((requestList) => {
      expect(requestList).toEqual(expected);
    });
    $httpBackend.flush();
  });

  it("should normalize ILLiad article DTOs", () => {
    // ILLiad API response objects have many more attributes,
    // but these are the only ones we care about.
    const apiResponse = `[
      {
        "TransactionNumber": 1582298,
        "PhotoArticleAuthor": "Name, Test",
        "PhotoArticleTitle": "Test Title"
      },
      {
        "TransactionNumber": 1656181,
        "PhotoArticleAuthor": "Jost, John T",
        "PhotoArticleTitle": "Working class conservatism: a system justification perspective"
      }
    ]`;
    const expected = JSON.parse(`[
      {
        "txnNum": 1582298,
        "title": "Test Title",
        "author": "Name, Test"
      },
      {
        "txnNum": 1656181,
        "title": "Working class conservatism: a system justification perspective",
        "author": "Jost, John T"
      }
    ]`);
    $httpBackend.expectGET(illiad.articlesUrl).respond(apiResponse);
    illiad.getArticles().then((requestList) => {
      expect(requestList).toEqual(expected);
    });
    $httpBackend.flush();
  });

  it("should handle empty ILLiad request responses", () => {
    const response = "[]";
    $httpBackend.expectGET(illiad.requestsUrl).respond(response);
    illiad.getRequests().then((requestList) => {
      expect(Array.isArray(requestList)).toBeTrue;
      expect(requestList.length).toBe(0);
    });
    $httpBackend.flush();
  });

  it("should handle empty ILLiad article responses", () => {
    const response = "[]";
    $httpBackend.expectGET(illiad.articlesUrl).respond(response);
    illiad.getArticles().then((articleList) => {
      expect(Array.isArray(articleList)).toBeTrue;
      expect(articleList.length).toBe(0);
    });
    $httpBackend.flush();
  });
});
