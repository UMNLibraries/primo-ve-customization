import { JwtService } from "./jwt.service";

const ILLIAD_API_PATTERN = new RegExp("https://pralma.*.lib.umn.edu/ill/");

illiadApiInterceptor.$inject = ["jwtService"];
function illiadApiInterceptor(jwtService: JwtService) {
  return {
    request: (request: ng.IRequestConfig) => {
      if (request.url.match(ILLIAD_API_PATTERN)) {
        const headers = request.headers ?? {};
        headers["Authorization"] = `Bearer ${jwtService.getJwt()}`;
        request.headers = headers;
        //request.url = request.url.replace(ILLIAD_API_PATTERN, "http://localhost:8002/ill/")
      }
      return request;
    },
  };
}

export { illiadApiInterceptor };
