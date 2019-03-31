({
  onInit : function(component, event, helper) {
    var entry = component.get("v.debugEntry")
    if($A.util.isUndefinedOrNull(entry)) {
      return;
    }
    helper.toggleExpand(component);
  },

  expandTree : function(component, event, helper) {
    helper.toggleExpand(component);
  }
})