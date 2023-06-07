import { illiadApiInterceptor } from "./illiad-api.interceptor";
import { JwtService } from "./jwt.service";

let interceptor: ng.IHttpInterceptor;
const jwtService = {
  getJwt: () => "FAKE_TOKEN",
} as JwtService;

beforeEach(() => {
  interceptor = illiadApiInterceptor(jwtService);
});

describe("illiadApiInterceptor", () => {
  it("does not alter non-illiad requests", () => {
    const pre = { method: "GET", url: "example.com/foo" };
    const post = interceptor.request(pre);
    expect(post).toEqual(pre);
  });

  it("adds an authorization header to illiad requests", () => {
    [
      "https://pralma.lib.umn.edu/ill/requests",
      "https://pralma.lib.umn.edu/ill/articles",
      "https://pralma-dev.lib.umn.edu/ill/requests",
      "https://pralma-dev.lib.umn.edu/ill/articles",
    ].forEach((url) => {
      const request = interceptor.request({
        url,
        method: "GET",
      }) as ng.IRequestConfig;
      expect(request.headers["Authorization"]).toBe("Bearer " + "FAKE_TOKEN");
    });
  });
});
