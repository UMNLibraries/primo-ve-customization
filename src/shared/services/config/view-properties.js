/**
 * lookup values in Primo's View Properties mapping table
 */
class ViewProperties {
  constructor(viewProperties = []) {
    this.viewProperties = viewProperties;
  }

  static of(viewProperties) {
    return new ViewProperties(viewProperties);
  }

  findProperty(propertyName) {
    return this.viewProperties.filter((prop) => prop.source2 === propertyName);
  }

  getValue(propertyName) {
    const property = this.findProperty(propertyName)[0];
    return property && property.target;
  }
}

export default ViewProperties;
