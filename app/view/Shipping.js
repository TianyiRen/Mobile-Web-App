
Ext.define('Fallfor.view.Shipping', {
    extend: 'Ext.Container',
    xtype: 'shipping',
    requires: [
    'Ext.TitleBar',
    'Ext.form.*',
    'Ext.field.*',
    'Ext.Button',
    'Ext.form.Panel',
    'Ext.dataview.List',
    'Ext.form.FieldSet'
    ],
    config: {
        fullscreen: true,
        scrollable: true,
        layout: "vbox",
        title: 'Shipping Policy',
        header: {
            iconCls: 'back',
            ui: "plain",
            action: "toggle-menu",
            left: 0
        },
        menu: null
      
    }, //end of config
    
    _headerBar: null,
    _userInfoFormArea: null,
    _userInfo: null,

    initialize: function() {   
        this.create();
    },

    create: function() {
        this.removeAll(false);
        this.add(this.getHeaderBar());
        this.add(this.getShippingPolicy());
    },

    getHeaderBar: function() {
        if (!this._headerBar) {
            this._headerBar = Ext.create("Ext.Toolbar", {
                xtype: "toptoolbar",
                itemId: 'header',
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
    getShippingPolicy: function() {
        if(!this._shippingPolicy) {
            this._shippingPolicy = Ext.create("Ext.Container", {
                xtype: "container",
                layout: 'vbox',
                items: [
                {
                    xtype: 'container',
                    style: 'padding: 15px;',
                    html: '<div style="font-size: 20px;"><b>Our Shipping Policy</b></div>'+
                        '<div style="font-size: 15px; padding-top: 8px;">We provide free shipping anywhere in the U.S! For Australia, free shipping is available if you spend $59 or more. Free shipping is also available for those in Europe, Russia, and everywhere else if the merchandise totals to $69 or higher.<div>'+
                        '<div style="font-size: 15px; padding-top: 15px;">Please note:</div>'+
                        '<div class="list">'+
                        '<div class="disc" style="font-size: 15px;">'+
                        '<ul>'+
                        '<li>Free shipping applies to first class shipping.</li>'+
                        '<li>Free shipping applies to the merchandise subtotal before sales tax.</li>'+
                        '<li>Usually It takes us 1-3 days to process your order, but it depends on diffenent products，You can find the details on every product page.</li>'+
                        '<li>Customers will receive a shipping confirmation email with the tracking number used to follow the order status.</li>'+
                        '<li>First class shipping takes 3 days for the U.S and 7-15 days for Australia, Europe, Russia, and everywhere else.</li>'+
                        '</ul></div></div>'+
                        '<div style="font-size:14px; margin-top:20px; padding-top:8px; padding-bottom:8px; border-top:1.5px solid #D5D5D5;"><b>UNITED STATES(including Alaska & Hawaii)</div>'+
                        '<div class="shipping_info" style="border-bottom:1.5px solid #D5D5D5;">'+
                        '<div class="left">No minimum required</div>'+
                        '<div class="right">Free Shipping</div></div>'+
                        '<div style="font-size:14px; margin-top:20px; padding-top:8px; padding-bottom:8px;">CANADA</div>'+
                        '<div class="shipping_info" style="font-weight: normal;">'+
                        '<div class="left">Up to $49</div>'+
                        '<div class="right">$5.00</div></div>'+
                        '<div class="shipping_info" style="border-bottom:1.5px solid #D5D5D5;">'+
                        '<div class="left">$49 and up</div>'+
                        '<div class="right">Free Shipping</div></div>'+
                        '<div style="font-size:14px; margin-top:20px; padding-top:8px; padding-bottom:8px;">AUSTRALIA</div>'+
                        '<div class="shipping_info" style="font-weight: normal;">'+
                        '<div class="left">Up to $59</div>'+
                        '<div class="right">$8.00</div></div>'+
                        '<div class="shipping_info" style="border-bottom:1.5px solid #D5D5D5;">'+
                        '<div class="left">$59 and up</div>'+
                        '<div class="right">Free Shipping</div></div>'+
                        '<div style="font-size:14px; margin-top:20px; padding-top:8px; padding-bottom:8px;">EUROPE</div>'+
                        '<div class="shipping_info" style="font-weight: normal;">'+
                        '<div class="left">Up to $68</div>'+
                        '<div class="right">$9.00</div></div>'+
                        '<div class="shipping_info" style="border-bottom:1.5px solid #D5D5D5;">'+
                        '<div class="left">$69 and up</div>'+
                        '<div class="right">Free Shipping</div></div>'+
                        '<div style="font-size:14px; margin-top:20px; padding-top:8px; padding-bottom:8px;">RUSSIA</div>'+
                        '<div class="shipping_info" style="font-weight: normal;">'+
                        '<div class="left">Up to $68</div>'+
                        '<div class="right">$10.00</div></div>'+
                        '<div class="shipping_info" style="border-bottom:1.5px solid #D5D5D5;">'+
                        '<div class="left">$69 and up</div>'+
                        '<div class="right">Free Shipping</div></div>'+
                        '<div style="font-size:14px; margin-top:20px; padding-top:8px; padding-bottom:8px;">Other</div>'+
                        '<div class="shipping_info" style="font-weight: normal;">'+
                        '<div class="left">Up to $68</div>'+
                        '<div class="right">$10.00</div></div>'+
                        '<div class="shipping_info" style="border-bottom:1.5px solid #D5D5D5;">'+
                        '<div class="left">$69 and up</div>'+
                        '<div class="right">Free Shipping</div></div>'


                }]
            });
        }
        return this._shippingPolicy;
    }
    
});






