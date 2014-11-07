Ext.define("Fallfor.store.Promotions", {
    extend: "Ext.data.Store",

    config: {
        model: "Fallfor.model.Promotion",
        proxy: {
            type: 'jsonp',
            url: Fallfor.utils.Global.getApiDomain() + "/api/v1/promotions/",
            reader: {
                type: "json",
                rootProperty: "promotions"
            }
        }
    }
});