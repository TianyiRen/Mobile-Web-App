Ext.define('Fallfor.view.HomeView', {
    extend: 'Ext.Container',
    xtype: "homeview",

    requires: ['Ext.Carousel',
    'Ext.carousel.Infinite',
    'Ext.Img',
    'Ext.field.Select',
    'Fallfor.view.ProductsListView',
    'Fallfor.store.Users',
    'Ext.Button',
    'Ext.SegmentedButton'
    ],

    config: {
        fullscreen: true,
        record: null,
        layout:'vbox',
        scrollable : false,
        title: null,
        header: {
            iconCls: "list",
            ui: "plain",
            action: "toggle-menu",
            left: 0,
            style:'background-color:transparent;border:none;'
        },
        enablePaging: false,
        autoLoad: false,
        proxy: {}
    },


    initialize: function() {
        this.createView();
    },

    createView: function() {      
        var product_list = this.getList();
        var docked_panel = this.getDockedPanel();
        docked_panel.add(this.getHeaderBar());
        docked_panel.add(this.getPromotionCarousel());
        docked_panel.add(this.getBannerLabel())
        docked_panel.add(this.getTabArea())
        docked_panel.add(this.getCategoryList())
        docked_panel.add(this.getNowTrending())
        product_list.add(docked_panel);
        this.add(product_list);
        this.getStore().load();
    },

    getDockedPanel: function(){
        if(!this._dockedpanel){
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._dockedpanel = Ext.create("Ext.Panel", {
                docked:'top',
                scrollDock:'top',
                layout: 'vbox',
                height: width*1.50,
            });

        }
        return this._dockedpanel;
    },

    getHeaderBar: function() {
        if (!this._headerBar) {
            this._headerBar = Ext.create("Ext.Toolbar", {
                xtype: "toolbar",
                cls: 'toptoolbar',
                style: 'border: 1px solid #D5D5D5;',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                title: this.getTitle(),
                items: this.getHeader()
            });
        }
        return this._headerBar;
    },

    getPromotionCarousel: function(){
        var promotions = Ext.getStore("Promotions");
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
        var carousel =  Ext.create('Ext.Carousel', {
                store: 'Promotions',
                flex: 1,
                width:width,
                maxHeight: '100%',
                defaults: {
                    styleHtmlContent: true
                },
            });
        promotions.load(function(pictures){
            var items = []
            Ext.each(pictures,function(promotion){
                items.push({xtype:'image',src:promotion.data.image,width:width,height:width*0.583,style:'background-size:contain;'})
            });

            carousel.setItems(items);
            carousel.setActiveItem(0);
        });
        return carousel;
    },

    getBannerLabel:function(record) {
        if (!this._bannerLabel) {
            this._bannerLabel = Ext.create("Ext.Container", {
                style: 'border: 1px solid #D5D5D5; height:36px; background-color:#DCDCDC; padding-top: 8px; padding-bottom:8px; ',
                html:'<div style="text-align:center;font-size:15px; color:#808080; ">Free Shipping. Free Return.</div>'
            });
        }
        return this._bannerLabel;
    },
    getTabArea: function() {
        var segmentedButton = Ext.create("Ext.SegmentedButton",{
            allowMultiple: false,
            itemId:'new-sale-button',
            items: [
            {
                html:'<div class="star" style="width:150px;height:20px;font-size:16px;">&nbsp;New Arrivals</div>',
                data: 'new',
                style: 'border: 1px solid #D5D5D5;',
                flex: 1
            }, 
            {
                html:'<div class="tags" style="width:150px;height:20px;font-size:16px;">&nbsp;On Sale</div>',
                data: 'sale',
                style: 'border: 1px solid #D5D5D5;',
                flex: 1
            }]
        });
        return segmentedButton;
    },   

    getCategoryList: function() {
        if (!this._categorylist) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            alert(width)
            this._categorylist = Ext.create("Ext.dataview.List", {
                flex: 1,
                emptyText: 'No categories found.',
                loadingText: "Loading Categories",
                cls: 'icon-category-grid',
                style:'margin-top:20px;width:'+width+'height:150px;text-align:center;',
                itemId:'categorylist',
                store: Ext.getStore("Categories"),
                maxHeight: "100%",
                mode: "simple",
                scrollable: false,
                itemTpl: this.getCategoryItemTemplate()
            });
        }
        return this._categorylist;
    },

    getCategoryItemTemplate: function() {
        if (!this._categoryItemTemplate) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._categoryItemTemplate = new Ext.XTemplate(
                '<div>',
                '<center><img  src="{icon}" style="width:'+width*0.15+'px;height:'+width*0.15+'px;"></center>',
                '<p style="text-align:center;font-size:15px;">{name}</p>',
                '</div>'
            )
        }
        return this._categoryItemTemplate;
    },
    getNowTrending:function() {
        if(!this._nowTrending) {
            this._nowTrending = Ext.create("Ext.Container", {
                style: 'padding-bottom: 5px;',
                html: '<p style="text-align:left;padding-left:10px;font-size:20px;">Now Trending</p>'
            })
        }
        return this._nowTrending;
    },

    getList: function() {
        if (!this._list) {
            this._list = Ext.create("Ext.dataview.List", {
                flex: 1,
                emptyText: 'No products found.',
                loadingText: "Loading Products",
                cls: 'grid',
                height:'100%',
                itemId: 'productlist',
                plugins:{
                    xclass: 'Ext.plugin.ListPaging',
                    autoPaging: true
                },
                mode: "simple",
                store: this.getStore(),
                itemTpl: this.getItemTemplate(),
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
                '<div class="title" style="width:'+width*0.43+'px;height:'+width*0.06+'px;">{title}</div>',
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