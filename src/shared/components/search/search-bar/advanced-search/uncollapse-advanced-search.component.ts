interface CollapsedStateChanges extends ng.IOnChangesObject {
  readonly collapsed: ng.IChangesObject<boolean>;
}

/**
 * Force the advanced search menu to always be uncollapsed by toggling
 * whenever its collapsed state is true.
 */
export const UncollapseAdvancedSearchComponent: ng.IComponentOptions = {
  bindings: { collapsed: "<" },
  require: { prmAdvancedSearchCtrl: "^prmAdvancedSearch" },
  controller: class implements ng.IOnChanges {
    private prmAdvancedSearchCtrl: ng.IComponentController;
    collapsed: boolean;

    $onInit() {
      if (this.collapsed) this.prmAdvancedSearchCtrl.toggleFilters();
    }

    $onChanges(changes: CollapsedStateChanges) {
      if (changes.collapsed.currentValue === true)
        this.prmAdvancedSearchCtrl.toggleFilters();
    }
  },
};
