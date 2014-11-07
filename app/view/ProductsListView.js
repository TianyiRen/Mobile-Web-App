Ext.define('Fallfor.view.ProductsListView', {
    extend: 'Ext.Container',
    xtype: 'productslistview',
    requires: [
        'Ext.dataview.DataView',
        'Ext.dataview.List',
        'Fallfor.proxy.ProductProxy', 
        ],
    config: {
        fullscreen: true,
        layout: "vbox",
        title:null,
        menu: null,
        enablePaging: false,
        autoLoad: false,
        proxy: {}
    },
    _headerBar: null,
    _list: null,
    _store: null,
    _itemTemplate: null,

    initialize: function() {
        this.create();
    },

    create: function() {
        this.removeAll(false);
        this.add(this.getHeaderBar());
        this.add(this.getList());
        //this.down("list").getStore().load();
    },

    getHeaderBar: function() {
        if (!this._headerBar) {
            this._headerBar = Ext.create('Ext.TitleBar',{
                
                id: 'productslisttitle',
                docked: 'top',
                style: 'border: 1px solid #D5D5D5;',
                items: [
                    {
                        xtype:'button',
                        iconCls: 'back',
                        ui: 'plain',
                        align: 'left',
                        action: "go-back",
                        style:'background-color:transparent;'
                    },

                    {   
                        xtype:'button',
                        iconCls: 'cart',
                        align: 'right',
                        action: "list-to-cart",
                        style:'background-color:transparent;'
                    }
                ],            
            });
        }
        return this._headerBar;
    },

    getList: function() {
        if (!this._list) {
            this._list = Ext.create("Ext.dataview.List", {
                flex: 1,
                emptyText: 'No products found.',
                loadingText: "Loading Products",
                cls: 'grid',
                plugins:{
                    xclass: 'Ext.plugin.ListPaging',
                    autoPaging: true
                },
                mode: "simple",
                store: this.getStore(),
                itemTpl: this.getItemTemplate()
            });
        }
        return this._list;
    },

    getStore: function() {
        if (!this._store) {
            this._store = Ext.create("Ext.data.Store", {
                model: "Fallfor.model.Product",
                autoLoad: this.getAutoLoad() === true,
                remoteFilter: true,
                pageSize: 20,
                proxy: this.getProxy()
            });
        }
        return this._store;
    },

    getItemTemplate: function() {
        if (!this._itemTemplate) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._itemTemplate = new Ext.XTemplate(
                '<div class="product" style="width:'+width*0.48+'px">',
                '<div class="img" style="width:'+width*0.48+'px;height:'+width*0.45+'px;background-image: url(\'{image}\')"></div>',
                '<div class="info">',
                '<div class="title" style="width:'+width*0.40+'px;height:'+width*0.06+'px;">{title}</div>',
                '<div class="info">',
                '<div><span style="float:left;color:#78c042;font-size:7.em;">${price}',
                '<tpl if="original_price &gt; 1"><span class="original_price">${original_price}</span></tpl>',
                '</span></div>',
                '</div>',
                '</div>'
                )
            }
            return this._itemTemplate;
    },

    applyProxy: function(config) {
        if (Ext.isSimpleObject(config)) {
            return Ext.factory(config, 'Fallfor.proxy.ProductProxy')
        }
        return config;
    },

    updateProxy: function(value) {
        if (this._store) {
            this._store.setProxy(value);
            this._store.load();
        }
    },

    updateEnablePaging: function(currentValue, oldValue) {
        if (currentValue != oldValue && (currentValue != false && oldValue != undefined)) {
            this.create();
            this._store.load();
        }
        return currentValue;
    }
});
