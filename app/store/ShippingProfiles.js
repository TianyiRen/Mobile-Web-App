Ext.define("Fallfor.store.ShippingProfiles", {
    extend: "Ext.data.Store",

    config: {
        model: "Fallfor.model.ShippingProfile",
        proxy: {
            type: 'jsonp',
            url: Fallfor.utils.Global.getApiDomain() + "/api/v1/shipping-profile/",
            reader: {
                type: "json",
                rootProperty: "shipping_profiles"
            }
        }
    }
});