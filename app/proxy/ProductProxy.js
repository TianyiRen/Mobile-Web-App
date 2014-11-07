Ext.define('Fallfor.proxy.ProductProxy', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.productproxy',

    config: {
        url: Fallfor.utils.Global.getApiDomain() + "/api/v1/",
        extraParams: {
            category_slug: null
        },
        filterParam: "q",
        limitParam: "page_limit",
        service: "products/",
        reader: {
            type: "json",
            rootProperty: "products"
        }
    },
    getUrl: function() {
        return this._url + this.getService();
    },
    encodeFilters: function(filters) {
        if (Ext.isArray(filters) && filters.length > 0) return filters[0].getValue();
        return "";
    }
});