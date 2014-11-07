
Ext.define('Fallfor.view.ContactUs', {
    extend: 'Ext.Container',
    xtype: 'contactus',
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
        title: 'Contact Us',
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
        this.add(this.getContactUs());
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
    getContactUs: function() {
        if(!this._contactUs) {
            this._contactUs = Ext.create("Ext.Container", {
                xtype: "container",
                layout: 'vbox',
                items: [
                {
                    html: '<div style="padding:10px; font-size:15px;">Have comments, suggestions or questions? Chat us up in the widget at the bottom of the page, email or call.</div>'
                },
                {
                    xtype: 'button',
                    text:'<div class="email" style="width:95px; height:24px;font-size:14px; text-align:center;background-color:#A3DEFE;color:white;margin-left: 10px;">&nbsp;&nbsp;Email Us</div>',
                    action: 'email-us'

                },
                {
                    html: '<div style="padding:10px; font-size:15px;">Having problems with the site?</div>'
                },
                {
                    xtype: 'button',
                    text:'<div class="email" style="width:95px; height:24px;font-size:14px; text-align:center;background-color:#A3DEFE;color:white;margin-left: 10px;">&nbsp;&nbsp;Email Us</div>',
                    action: 'email-us'

                }]
            });
        }
        return this._contactUs;
    }
});






