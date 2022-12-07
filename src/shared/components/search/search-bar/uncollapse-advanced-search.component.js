/**
 * Force the advanced search menu to always be uncollapsed by toggling
 * whenever its collapsed state is true.
 */
export const UncollapseAdvancedSearchComponent = {
  bindings: { collapsed: "<" },
  require: { prmAdvancedSearchCtrl: "^prmAdvancedSearch" },
  controller: class {
    $onChanges(changes) {
      if (changes.collapsed.currentValue === true)
        this.prmAdvancedSearchCtrl.toggleFilters();
    }
  },
};
