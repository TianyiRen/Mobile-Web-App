Ext.define('Fallfor.view.MovieSearch', {
    extend: 'Fallfor.view.ProductsListView',
    xtype: 'moviesearch',
    requires: [
        'Ext.Toolbar', 'Ext.field.Text', 'Ext.field.Search', 'Ext.dataview.List',
        'Ext.form.Panel', 'Ext.plugin.ListPaging',
        'Fallfor.proxy.RottenTomatoes', 'Fallfor.model.Movie'],
    config: {
        enablePaging: true,
        autoLoad: false,
        cls: "moviesearch",
        header: [
            {
                iconCls: "list",
                ui: "plain",
                docked: "left",
                action: "toggle-menu",
            },
            {
                xtype: "formpanel",
                scrollable: null,
                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Movie Search..'
                    }
                ]
            }
        ]
    },
    getStore: function() {
        if (!this._store) {
            this.callParent();
            this._store.setRemoteFilter(true);

            this._store.load = Ext.Function.createInterceptor(this._store.load, function() {
                var filters = this.getFilters(),
                    len = filters.length,
                    filter;
                for (var i = 0; i < len; i++) {
                    filter = filters[i];
                    if (filter.getId() === "query" && filter.getValue().length > 0) return true;
                }
                return false;
            }, this._store)
        }
        return this._store;
    }
});
