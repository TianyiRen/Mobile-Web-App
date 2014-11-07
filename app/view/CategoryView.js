Ext.define('Fallfor.view.CategoryView', {
    extend: 'Ext.Container',
    xtype: 'categoryview',
    requires: [
        'Ext.dataview.List',
        'Fallfor.model.Category',
    ],
    config: {
        layout: 'vbox',
        title: 'Category',
        fullscreen: true,
        header: {
            iconCls: 'back',
            ui: "plain",
            action: "toggle-menu",
            left: 0
        },
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
    },

    getHeaderBar: function() {
        if (!this._headerBar) {
            this._headerBar = Ext.create("Ext.Toolbar", {
                xtype: "toptoolbar",
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                style: 'border: 1px solid #D5D5D5;',
                title: this.getTitle(),
                items: this.getHeader()
            });
        }
        return this._headerBar;
    },

    getList: function() {
        if (!this._list) {
            this._list = Ext.create("Ext.dataview.List", {
                flex: 1,
                emptyText: 'No categories found.',
                loadingText: "Loading Categories",
                cls: 'category-grid',

                store: Ext.getStore("Categories"),
                mode: "simple",
                itemTpl: this.getItemTemplate()
            });
        }
        return this._list;
    },
   
    getItemTemplate: function() {
        if (!this._itemTemplate) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._itemTemplate = new Ext.XTemplate(
                '<div class="category">',
                '<div class="img" style="width:'+width*0.42+'px;height:'+width*0.35+'px;background-image: url(\'{image}\')">',
                '<span class="title">{name}</span></div>',
                '</div>'
            )
        }
        return this._itemTemplate;
    }
});
