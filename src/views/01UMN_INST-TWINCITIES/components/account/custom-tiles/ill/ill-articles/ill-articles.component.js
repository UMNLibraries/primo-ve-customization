import template from "./ill-articles.html";

class IllArticlesController {
  constructor(illiad, $window) {
    this.illiad = illiad;
    this.$window = $window;
    this.articles = [];
  }

  /**
   * Maximum number of articles to display.
   */
  get maxDisplay() {
    return 3;
  }

  $onInit() {
    this.loadArticles();
  }

  hasArticles() {
    return Array.isArray(this.articles) && this.articles.length > 0;
  }

  loadArticles() {
    this.loading = true;
    this.illiad
      .getArticles()
      .then((articles) => (this.articles = articles))
      .finally(() => (this.loading = false));
  }

  goToArticlePage(txnNum) {
    this.$window.open(this.illiad.getArticlePageUrl(txnNum), "_blank");
  }
}

IllArticlesController.$inject = ["illiad", "$window"];

export default {
  controller: IllArticlesController,
  template: template,
};
