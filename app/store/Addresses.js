Ext.define("Fallfor.store.Addresses", {
 extend: "Ext.data.Store",
 
 config: {
    model: "Fallfor.model.Address",
    proxy: {
        type: 'jsonp',
        url: Fallfor.utils.Global.getApiDomain() + "/api/v1/addresses/",
        extraParams: {
            user_id: Fallfor.utils.Global.getUserID(),
            api_key: Fallfor.utils.Global.getApiKey()
        },
        reader: {
            type: "json",
            rootProperty: "addresses"
        }
    }
 }

});