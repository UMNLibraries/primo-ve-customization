interface CollapsedStateChanges extends ng.IOnChangesObject {
  readonly collapsed: ng.IChangesObject<boolean>;
}

/**
 * Force the advanced search menu to always be uncollapsed by toggling
 * whenever its collapsed state is true.
 */
export const UncollapseAdvancedSearchComponent = {
  bindings: { collapsed: "<" },
  require: { prmAdvancedSearchCtrl: "^prmAdvancedSearch" },
  controller: class {
    private prmAdvancedSearchCtrl: ng.IComponentController;
    $onChanges(changes: CollapsedStateChanges) {
      if (changes.collapsed.currentValue === true)
        this.prmAdvancedSearchCtrl.toggleFilters();
    }
  },
};
