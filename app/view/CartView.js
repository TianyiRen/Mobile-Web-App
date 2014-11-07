Ext.define("Fallfor.view.CartView", {
   extend: 'Ext.Container',
   xtype:'cartview',

   requires: ["Ext.dataview.List",'Fallfor.store.Cart', 'Ext.plugin.SlideToRemove', 
   'Ext.plugin.ListPaging', 'Ext.plugin.PullRefresh'],

   config: {

        fullscreen: true,
        layout: 'vbox',
        enablePaging: false,
        autoLoad: false,
        autoDestroy: false,
        proxy: {}

    },
    initialize: function() {

    },
    create: function(subtotal, total, shipping, location_id) {
        this.removeAll(false);
        this.add(this.getHeader());  
        this.add(this.getList(subtotal, total, shipping, location_id));
        this.add(this.getCheckout());
    },
    create_empty_view:function(){
        this.removeAll();
        this.add(this.getHeader());
        this.add(this.getEmptyList());
    },
    getEmptyList: function() {
        if(!this._emptyList) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._emptyList = Ext.create("Ext.Container", {
                layout: 'vbox',
                flex: 1,
                items: [
                {   
                    html: '<div style="padding:15px;"></div>'+
                    '<center><img src="http://png-1.findicons.com/files/icons/1579/devine/256/cart.png" style="width:'+width*0.15+'px;height:'+width*0.15+'px;"></center>'+
                    '<center><p style="padding:5px;text-align:center;font-size:15px;">You have no items in your cart.</p></center>'
                },
                {   
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'spacer',
                        flex: 1
                    },
                    {
                        xtype: 'spacer',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        flex: 1,
                        text: 'Shop Now',
                        style: 'font-size: 13px; text-align:center;background-color:#A3DEFE;color:white',
                        action: 'shop-now'
                    },
                    {
                        xtype: 'spacer',
                        flex: 1
                    },
                    {
                        xtype: 'spacer',
                        flex: 1
                    }]

                }]
            })
        }
        return this._emptyList;

    },

    getList: function(subtotal, total, shipping, location_id) {
            this._list = Ext.create("Ext.List", {
                flex: 1,
                variableHeights: true,
                emptyText: 'No products found.',
                loadingText: "Loading Products",
                store: 'Cart',
                plugins: [
                    {
                        type: 'listpaging'
                    },
                    {
                        type: 'pullrefresh'
                    }   
                ],
                ui:'cartlist',
                itemTpl: this.getItemTemplate(),
                items: [
                {
                    xtype: 'panel',
                    docked: 'bottom',
                    scrollDock: 'bottom',
                    items: this.getOrderSummary(subtotal, total, shipping, location_id)
                }]
            });
        return this._list;
    },
    getItemTemplate: function() {
        if (!this._itemTemplate) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._itemTemplate = new Ext.XTemplate(
                '<div class="cart-product">',
                '<div class="img"><img src="{image}" style="height:'+width*0.22+'px;width:'+width*0.21+'px;"/></div>',
                '<div class="mid">',
                '<div class="title"><b>{name}</b></div>',
                '<div class="price">${price}</div>',
                '<tpl if="color != null">',
                    '<div class="title">Color:&nbsp;{color}</div>',
                '</tpl>',
                '<tpl if="size != null">',
                    '<div class="title">Size:&nbsp;{size}</div>',
                '</tpl>',
                '</div>',
                '<div class="cancel"></div>',
                '</div>'
              )  
        }
        return this._itemTemplate;
    },

    getHeader: function(){
        if(!this._header){
            this._header = Ext.create('Ext.TitleBar',{
                docked: 'top',
                title: 'Shopping Cart',
                style: 'border: 1px solid #D5D5D5;',
                items: [
                    {
                        xtype:'button',
                        iconCls: 'back',
                        ui: "plain",
                        align: 'left',
                        action: "go-back",
                        
                    }    
                ]
            });
        }
        return this._header;

    },

    getOrderSummaryLabel: function(){
        if (!this._orderSummaryLabel) {
            this._orderSummaryLabel = Ext.create("Ext.Container", {
                xtype: 'container',
                style: 'margin-top: 10px; margin-bottom:5px;margin-left:7px; margin-right:7px;',
                items: [
                {
                    html:'<div style="padding:2px;background-color:#bdc3c7;font-size:18px">Your Order:</div>'
                }]
            });
        }
        return this._orderSummaryLabel;
    },
    getOrderSummary:function(subtotal, total, shipping, location_id){
        var options = Array(); 
        var shippingprofiles = Ext.getStore("ShippingProfiles");
        if(location_id) {
            var i = shippingprofiles.find('id', location_id, 0, false,false,true);
            var location = shippingprofiles.getAt(i).data.location;
            options.push({
                text: location, value: location
            });

            shippingprofiles.each(function(item, index, length) {
                if(index != i) {
                    options.push({
                        text: item.data.location, value: item.data.location
                    });
                }  
            });
        }
        else {
            shippingprofiles.each(function(item, index, length) {
                    options.push({
                        text: item.data.location, value: item.data.location
                    }); 
            });
        }
        
        var orderSummary = Ext.create('Ext.Container', {
               layout: 'vbox',
               items: [
               {
                    xtype: 'container',
                    items: this.getOrderSummaryLabel()
               },
               {
                    html: '<div class="cart-total">'+
                        '<div class="left" style="margin-left:7px;margin-top:8px;">Subtotal:</div>'+
                        '<div class="right" style="margin-right:7px;margin-top:8px;">$'+subtotal+'</div>'
               },
               {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                    {
                        html: 'Shipping To:',
                        style: 'font-size: 15px;margin-top:7px;margin-left:7px; margin-right:3px;'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'selShippingProfile',
                        usePicker: true,
                        width: 80,
                        height: 3,
                        style: 'font-size: 13px;margin-left:2px;margin-top: 1px;',
                        options: options,
                    },
                    {
                        xtype: 'spacer',
                    },
                    {
                        flex:1,
                        html: '<div class="cart-total">'+
                        '<div class="right" style="margin-right:7px;margin-top: 7px;">$'+shipping+'</div>'
                    }]
                },
                {
                    html: '<div class="cart-total">'+
                        '<div class="left" style="margin-left:7px;"><b>Total:</b></div>'+
                        '<div class="right" style="margin-right:7px;"><b>$'+total+'</b></div>'
               },
               ]
            });
        
        return orderSummary;
    },

    getCheckout: function(){
        var _checkout = Ext.create('Ext.Button',{
                text: 'Checkout',
                ui: 'my-confirm',
                width: '96%',
                height: '35px',
                action:'checkout',
                style:'margin-top:10px; margin-bottom: 10px;'            
                         
        })
        return _checkout;
    },

});
