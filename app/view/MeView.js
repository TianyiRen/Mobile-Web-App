
Ext.define('Fallfor.view.MeView', {
    extend: 'Ext.Container',
    xtype: 'meview',
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
        layout: "vbox",
        title: 'Me',
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
        this.add(this.getUserInfo());
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

    getUserInfo: function() {
      if (!this._userInfo) {
            this._userInfo = Ext.create("Ext.Container",{
                xtype: 'container',
                layout: 'fit',
                flex: 1,
                items: this.getUserInfoFormArea()
            });
        }
        return this._userInfo;
    },

    getUserInfoFormArea:function(){
        if (!this._userInfoFormArea) {
            this._userInfoFormArea = Ext.create('Ext.Container', {
                title: 'User Info Area',
                xtype: 'container',         
                layout: 'fit',
                items: [
                {   
                    itemId: 'userInfoFormArea',
                    xtype: 'formpanel',
                    styleHtmlContent: true,
                    layout:{
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            style:'margin-bottom:10px;',
                            items: [
                            {
                                xtype: 'textfield',
                                itemId: 'user_name_me',
                                store: 'Users',
                                name : 'user_name',
                                label: 'Name'
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'user_email_me',
                                store: 'Users',
                                name : 'email',
                                label: 'Email'
                            }
                            ]
                        },
                        {
                            id: 'signoutButton',
                            xtype: 'button',
                            text: 'Sign Out',
                            ui: 'my-info',
                            width: '96%',
                        }
                    ]
                }]
            });
        }
        return this._userInfoFormArea;
    },
});






