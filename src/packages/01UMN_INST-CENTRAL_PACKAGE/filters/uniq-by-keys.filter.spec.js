describe('uniqByKeys Filter', () => {
  let $filter;

  beforeEach(() => {
    angular.mock.module('filters');
    angular.mock.inject($injector => { 
      $filter = $injector.get('$filter');
    });
  });

  it('should remove duplicate objects based on matching properties', () => {
    const users = [
      { firstName: 'Carl', lastName: 'Carlson' },
      { firstName: 'Carl', lastName: 'Carlson' },
      { firstName: 'Lenny', lastName: 'Lenard' },
      { firstName: 'Lenny', lastName: 'Simpson' }
    ];
    const uniqByKeys = $filter('uniqByKeys'); 
    const filteredUsers = uniqByKeys(users, ['firstName', 'lastName']);
    expect(filteredUsers.length).toEqual(3);
    expect(filteredUsers.filter(user => user.firstName === 'Carl').length).toEqual(1);
    expect(filteredUsers.filter(user => user.firstName === 'Lenny').length).toEqual(2);
  });
});
