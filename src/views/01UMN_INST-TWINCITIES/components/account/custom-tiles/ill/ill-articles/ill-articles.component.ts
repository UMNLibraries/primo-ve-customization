import { NormalizedIllTransaction } from "../illiad-api.model";
import { IlliadService } from "../illiad.service";
import template from "./ill-articles.html";

class IllArticlesController {
  private articles: NormalizedIllTransaction[] = [];
  private loading: boolean;

  static $inject = ["illiad", "$window"];
  constructor(
    private illiad: IlliadService,
    private $window: ng.IWindowService
  ) {}

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

  goToArticlePage(txnNum: number) {
    this.$window.open(this.illiad.getArticlePageUrl(txnNum), "_blank");
  }
}

export const IllArticlesComponent = {
  controller: IllArticlesController,
  template: template,
};
