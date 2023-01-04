import { FiltersModule } from ".";

describe("uniqByKeys Filter", () => {
  let $filter: ng.IFilterService;

  beforeEach(() => {
    angular.mock.module(FiltersModule);
    angular.mock.inject(($injector) => {
      $filter = $injector.get("$filter");
    });
  });

  it("should remove duplicate objects based on matching properties", () => {
    type User = { firstName: string; lastName: string };
    const users: User[] = [
      { firstName: "Carl", lastName: "Carlson" },
      { firstName: "Carl", lastName: "Carlson" },
      { firstName: "Lenny", lastName: "Lenard" },
      { firstName: "Lenny", lastName: "Simpson" },
    ];
    const uniqByKeys: (input: User[], keys: string[]) => User[] =
      $filter("uniqByKeys");
    const filteredUsers: User[] = uniqByKeys(users, ["firstName", "lastName"]);
    expect(filteredUsers.length).toEqual(3);
    expect(
      filteredUsers.filter((user) => user.firstName === "Carl").length
    ).toEqual(1);
    expect(
      filteredUsers.filter((user) => user.firstName === "Lenny").length
    ).toEqual(2);
  });
});
