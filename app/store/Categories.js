Ext.define("Fallfor.store.Categories", {
 extend: "Ext.data.Store",

 config: {
      model: "Fallfor.model.Category",
      autoLoad: true,
      proxy : {
          type:'jsonp',
          url: Fallfor.utils.Global.getApiDomain() + "/api/v1/categories/",
          reader: {
              type: "json",
              rootProperty: "categories"
          }
        }
 }
});