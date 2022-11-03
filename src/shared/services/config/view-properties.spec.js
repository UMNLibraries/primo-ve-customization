import ViewProperties from './view-properties';

describe('ViewProperties', () => {
  const fakeProperties = [
    { source1: 'TWINCITIES', source2: 'property-name-1', target: 'true' },
    { source1: 'TWINCITIES', source2: 'property-name-2', target: 'true' },
    { source1: 'TWINCITIES', source2: 'property-name-3', target: 'false' },
  ];

  const viewProperties = ViewProperties.of(fakeProperties);

  it('retrieves property values by name', () => {
    expect(viewProperties.getValue('property-name-1')).toEqual('true');
    expect(viewProperties.getValue('property-name-3')).toEqual('false');
  });

  it('returns undefined when a property name does not exist', () => {
    expect(viewProperties.getValue('NONEXISTENT_PROPERTY')).not.toBeDefined();
  });
});
