import IllArticles from "./ill-articles.component";
const MAX_ARTICLES_TO_DISPLAY = new IllArticles.controller().maxDisplay;

describe("ILL Articles Component", () => {
  let element, scope, $q, $compile, $window, illiadService, articles;

  beforeEach(() => {
    angular.mock.module("ill");
    angular.mock.inject(($injector) => {
      scope = $injector.get("$rootScope").$new();
      illiadService = $injector.get("illiad");
      $compile = $injector.get("$compile");
      $window = $injector.get("$window");
      $q = $injector.get("$q");
    });
  });

  it("should have a clickable title", () => {
    stubArticles(0);
    spyOn($window, "open");

    initializeComponent();

    const title = element.find("h2");
    title.triggerHandler("click");
    expect($window.open).toHaveBeenCalledWith(
      illiadService.getArticlePageUrl(),
      "_blank"
    );
  });

  it("should list articles", () => {
    const articleCount = 2;
    stubArticles(articleCount);

    initializeComponent();

    const listItems = element.find("md-list-item");
    expect(listItems.length).toEqual(articleCount);
  });

  it("should link to full-text", () => {
    const articleCount = 2;
    stubArticles(articleCount);
    spyOn($window, "open");

    initializeComponent();

    const listItems = element.find("md-list-item");
    for (let i = 0; i < articleCount; i++) {
      const article = articles[i];
      listItems[i].click();
      expect($window.open).toHaveBeenCalledWith(
        illiadService.getArticlePageUrl(article.txnNum),
        "_blank"
      );
    }
  });

  it("should display a link to ILLiad when then number of articles exceeds the display threshold", () => {
    const articleCount = MAX_ARTICLES_TO_DISPLAY + 1;
    stubArticles(articleCount);
    spyOn($window, "open");

    initializeComponent();

    const listItems = element.find("md-list-item");
    expect(listItems.length).toEqual(MAX_ARTICLES_TO_DISPLAY);
    const button = element.find("md-button");
    expect(button.text().trim()).toEqual(`View all ${articleCount} articles`);
    button.triggerHandler("click");
    expect($window.open).toHaveBeenCalledWith(
      illiadService.getArticlePageUrl(),
      "_blank"
    );
  });

  it("should display a message if there are no articles", () => {
    const articleCount = 0;
    stubArticles(articleCount);

    initializeComponent();

    const content = element.text().trim();
    expect(content).toContain("There are no documents");
  });

  function initializeComponent() {
    const html = "<ill-articles></ill-articles>";
    element = $compile(html)(scope);
    scope.$apply();
  }

  /**
   *
   * @param {number} n number of articles to create
   */
  function stubArticles(n = 1) {
    articles = Array.from({ length: n }, (_, i) => ({
      txnNum: i,
      title: `Tets Title ${i}`,
      author: `Test Author ${0}`,
    }));
    spyOn(illiadService, "getArticles").and.returnValue($q.resolve(articles));
  }
});
