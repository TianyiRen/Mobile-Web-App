
Ext.define('Fallfor.view.AboutFallfor', {
    extend: 'Ext.Container',
    xtype: 'aboutfallfor',
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
        title: 'About Fallfor',
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
        this.add(this.getAboutFallfor());
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
    // getAboutFallfor: function() {
    //     if(!this._aboutFallfor) {
    //         this._aboutFallfor = Ext.create("Ext.Container", {
    //             xtype: "container",
    //             layout: 'vbox',
    //             items: [
    //             {   
    //                 html: '<div style="padding:15px;"></div>'+
    //                 '<center><img src="http://d3ltqlcsk1pxob.cloudfront.net/img/aboutus.png"></center>'
    //             }]
    //         });
    //     }
    //     return this._aboutFallfor;
    // }
    getAboutFallfor: function() {
        if(!this._aboutFallfor) {
            this._aboutFallfor = Ext.create("Ext.Container", {
                xtype: "container",
                html: 'About Fallfor'
            });
        }
        return this._aboutFallfor;
    }
});






