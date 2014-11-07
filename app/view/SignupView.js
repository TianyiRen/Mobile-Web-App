Ext.define('Fallfor.view.SignupView', {
    extend: 'Ext.Container',
    xtype: 'signupview',
    requires: [
    'Ext.TitleBar',
    'Ext.form.*',
    'Ext.field.*',
    'Ext.Button',
    'Ext.TabPanel'
    ],
    config: {
        layout: "vbox",
        title: 'Sign In',
        header: {
            iconCls: 'back',
            ui: "plain",
            action: "toggle-menu",
            left: 0
        },
        menu: null
    }, //end of config
    
    _headerBar: null,
    _signinformarea: null,
    _registerformarea: null,
    _tabarea:null,
    _ifCheckout: null,

    initialize: function() {
        this.create();
    },

    create: function() {
        this.removeAll(false);
        this.add(this.getHeaderBar());
        if(this._ifCheckout) {
            this.add(this.getTabAreaRegister());
        }
        else{
            this.add(this.getTabAreaSignin());
        }
    },

    getTabAreaSignin: function(){
        if (!this._tabarea) {
            this._tabarea = Ext.create("Ext.TabPanel",{
                ui        : 'dark',
                sortable  : true,
                flex: 1,
                ui:'my-login-tab',
                items: [ 
                this.getSigninFormArea(),
                this.getRegisterFormArea()    
                ]
            });
        }
        return this._tabarea;
    },

    getTabAreaRegister: function() {
        if(!this._tabarea) {
            this._tabarea = Ext.create("Ext.TabPanel" , {
                ui: 'dark',
                sortable: true,
                flex: 1,
                ui:'my-login-tab',
                items: [
                this.getRegisterFormArea(),
                this.getSigninFormArea()
                ]
            });
        }
        return this._tabarea;
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


    getRegisterFormArea:function(){
        if (!this._registerformarea) {
            this._registerformarea = Ext.create('Ext.Container', {
                title: 'Register',
                xtype: 'container',         
                layout: 'fit',
                items: [
                {   
                    itemId: 'registerForm',
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
                                    id: 'register-name',
                                    name : 'name',
                                    label: 'Name'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'register-email',
                                    name : 'email',
                                    label: 'Email'
                                },
                                {
                                    xtype: 'passwordfield',
                                    itemId: 'register-pwd',
                                    name : 'password',
                                    label: 'Password'
                                },
                                {
                                    xtype: 'passwordfield',
                                    itemId: 'register-pwd-confirm',
                                    name : 'password',
                                    label: 'Confirm Password'
                                }
                            ]

                        },
                        {
                            id: 'registerButton',
                            xtype: 'button',
                            text: 'Register',
                            ui: 'my-info',
                            width: '96%',
                            //height: '35px'
                            
                        }

                    ]
                }
                ]
            });
        }
        return this._registerformarea;
    },

    getSigninFormArea:function(){
        if (!this._signinformarea) {
            this._signinformarea = Ext.create('Ext.Container', {
                title: 'Sign In',
                xtype: 'container',         
                layout: 'fit',
                items: [
                {   
                    itemId:'loginForm',
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
                                    itemId: 'login-email',
                                    xtype: 'textfield',
                                    name : 'email',
                                    label: 'Email',
                                },
                                {
                                    itemId: 'login-pass',
                                    xtype: 'passwordfield',
                                    name : 'password',
                                    label: 'Password'
                                }
                            ]

                        },
                        {
                            id: 'signinButton',
                            xtype: 'button',
                            text: 'Sign In',
                            ui: 'my-info',
                            width: '96%',
                            
                        }

                    ]
                }
                ]
            });
        }
        return this._signinformarea;
    },


});
