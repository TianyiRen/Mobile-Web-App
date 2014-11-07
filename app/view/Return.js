
Ext.define('Fallfor.view.Return', {
    extend: 'Ext.Container',
    xtype: 'return',
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
        title: 'Our Return Policy',
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
        this.add(this.getReturnPolicy());
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
    getReturnPolicy: function() {
        if(!this._returnPolicy) {
            this._returnPolicy = Ext.create("Ext.Container", {
                xtype: "container",
                layout: 'vbox',
                items: [
                {
                    xtype: 'container',
                    style: 'padding: 15px;',
                    html: '<div style="font-size: 20px;"><b>Our Return Policy</b></div>'+
                        '<div class="list">'+
                        '<div class="decimal" style="font-size: 15px;">'+
                        '<ul>'+
                        '<li>We want you to be happy with your purchase. If for any reason you are unhappy, please contact our support team.</li>'+
                        '<li>You may return all products within 14 days of delivery for free.</li>'+
                        '<li>You can initiate a return on items from your My Orders page. FallFor will cover the return costs.</li>'+
                        '<li>Please contact us with your order number, your name, your address, product name, reason for return, and whether you require a refund or an exchange. We will then advise on how to proceed with the return.</li>'+
                        '</ul></div></div>'+
                        '<div style="font-size: 15px; padding-top: 15px;">Please note:</div>'+
                        '<div class="list">'+
                        '<div class="disc" style="font-size: 15px;">'+
                        '<ul>'+
                        '<li>Returns and exchanges are free.</li>'+
                        '<li>No returns on final sales unless specified by or arranged with Fallfor, Inc.</li>'+
                        '<li>Jewelry may be returned in its original packaging if unworn and undamaged.</li>'+
                        '<li>It takes 5 business days to process a return.</li>'+
                        '</ul></div></div>'+

                        '<div style="font-size: 20px; padding-top: 15px;"><b>Refund</b></div>'+
                        '<div style="font-size: 15px; padding-top: 8px;">Refunds are issued after returned items have been received, inspected, and processed. Refunds are issued back to the original form of payment.<div>'+
                        '<div class="list">'+
                        '<div class="disc" style="font-size: 15px;">'+
                        '<ul>'+
                        '<li>We will notify you once the refund is issued.</li>'+
                        '<li>It takes 1-2 billing cycles for the refund credit to appear on your account.</li>'
                }]
            });
        }
        return this._returnPolicy;
    }
    
});






