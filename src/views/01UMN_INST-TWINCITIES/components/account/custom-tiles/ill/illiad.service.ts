import {
  IlliadApiResponse,
  NormalizedIllTransaction,
} from "./illiad-api.model";

const proxyBaseUrl = "https://ezproxy.lib.umn.edu/login?qurl=";

export class IlliadService {
  readonly baseUrl: string;
  private timeout = 10_000; // milliseconds
  static $inject = ["$http", "$location"];
  constructor(private $http: ng.IHttpService, $locaton: ng.ILocationService) {
    const host = $locaton.host();
    if (host.startsWith("primo-test") || host.startsWith("umn-psb")) {
      this.baseUrl = "https://pralma-dev.lib.umn.edu/ill";
    } else {
      this.baseUrl = "https://pralma.lib.umn.edu/ill";
    }
  }

  get requestsUrl() {
    return `${this.baseUrl}/requests`;
  }

  get articlesUrl() {
    return `${this.baseUrl}/articles`;
  }

  /**
   * Retrieves the current user's open ILL requests from ILLiad.
   * @returns {Array} List of objects with the following properties:
   *  - txnNum {number}
   *  - title {string}
   *  - author {string}
   */
  getRequests(): ng.IPromise<NormalizedIllTransaction[]> {
    return this.$http
      .get<IlliadApiResponse>(this.requestsUrl, { timeout: this.timeout })
      .then((resp) => {
        return resp.data.map((data) => ({
          txnNum: data.TransactionNumber,
          title: data.PhotoArticleTitle || data.LoanTitle,
          author: data.PhotoArticleAuthor || data.LoanAuthor,
        }));
      });
  }

  /**
   * Retrieves the current user's ILL digital delivery articles from ILLiad.
   * @returns {Array} List of objects with the following properties:
   *  - txnNum {number}
   *  - title {string}
   *  - author {string}
   */
  getArticles(): ng.IPromise<NormalizedIllTransaction[]> {
    return this.$http
      .get<IlliadApiResponse>(this.articlesUrl, { timeout: this.timeout })
      .then((resp) => {
        return resp.data.map((data) => ({
          txnNum: data.TransactionNumber,
          title: data.PhotoArticleTitle,
          author: data.PhotoArticleAuthor,
        }));
      });
  }

  /**
   * Returns the ILLiad URL for a given request (or the "all requests" page if no
   * transaction number is provided).
   * @param {number} txnNum (optional) An ILLiad transaction number for a request
   */
  getRequestPageUrl(txnNum?: number) {
    if (txnNum) {
      return (
        proxyBaseUrl +
        encodeURIComponent(
          `https://umn.illiad.oclc.org/illiad/illiad.dll?Action=10&Form=63&Value=${txnNum}`
        )
      );
    } else {
      return (
        proxyBaseUrl +
        encodeURIComponent(
          "https://umn.illiad.oclc.org/illiad/illiad.dll?Action=10&Form=62"
        )
      );
    }
  }

  /**
   * Returns the URL for a given article (or the "available online" page if no
   * transaction number is provided).
   * @param {number} txnNum (optional) An ILLiad transaction number for an article
   */
  getArticlePageUrl(txnNum?: number) {
    if (txnNum) {
      return (
        proxyBaseUrl +
        encodeURIComponent(
          `https://umn.illiad.oclc.org/illiad/illiad.dll?Action=10&Form=75&Value=${txnNum}`
        )
      );
    } else {
      return (
        proxyBaseUrl +
        encodeURIComponent(
          "https://umn.illiad.oclc.org/illiad/illiad.dll?Action=10&Form=64"
        )
      );
    }
  }
}
