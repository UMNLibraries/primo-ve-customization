const proxyBaseUrl = "https://ezproxy.lib.umn.edu/login?qurl=";

class ILLiad {
  constructor($http) {
    this.$http = $http;
    this.requestsUrl = "/primo_library/libweb/umn/ill-requests.jsp";
    this.articlesUrl = "/primo_library/libweb/umn/ill-articles.jsp";
  }

  /**
   * Retrieves the current user's open ILL requests from ILLiad.
   * @returns {Array} List of objects with the following properties:
   *  - txnNum {number}
   *  - title {string}
   *  - author {string}
   */
  getRequests() {
    return this.$http.get(this.requestsUrl).then((resp) => {
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
  getArticles() {
    return this.$http.get(this.articlesUrl).then((resp) => {
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
  getRequestPageUrl(txnNum) {
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
  getArticlePageUrl(txnNum) {
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

ILLiad.$inject = ["$http"];

export default ILLiad;
