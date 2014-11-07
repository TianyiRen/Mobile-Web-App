Ext.define('Fallfor.controller.UserAction', {
    extend: 'Ext.app.Controller',

    requires: [ 
                "Fallfor.view.HomeView",
                "Fallfor.view.SignupView", 
                "Ext.util.InputBlocker", 
                "Fallfor.view.MeView",
                "Fallfor.store.Addresses",
                "Fallfor.model.Address"],

    config: {

        meStore: null,
        views: ["Fallfor.view.HomeView",'Fallfor.view.MeView', 'Fallfor.view.SignupView'],

        refs: {
            main: 'main',
            meview: 'meview',
            userInfoForm: 'userInfoFormArea',
            signupview: 'signupview',
        },

        control: {
            '#registerButton': {
                tap: function() {
                    self = this;
                    var registerFormCount = Ext.ComponentQuery.query("#registerForm").length;
                    var registerForm = Ext.ComponentQuery.query("#registerForm")[registerFormCount-1];
                    var name = registerForm.getValues().name;
                    var email = registerForm.getValues().email;
                    var password = registerForm.getValues().password[0];  
                    var confirmpassword = registerForm.getValues().password[1];
                    if(!name) alert('Please input Name!');
                    if(!email) alert('Please input Email!');
                    if(password != confirmpassword) alert('Password not same!');
                    Ext.Ajax.cors = true;
                    Ext.Ajax.useDefaultXhrHeader = false;
                    Ext.Viewport.setMasked({ xtype: 'loadmask', message: 'Loading...', indicator:true});
                    Ext.data.JsonP.request({
                        url: Fallfor.utils.Global.getApiDomain() + '/api/v1/signup/',
                        params: 
                        {
                            name: name,
                            email: email,
                            password: password
                        },

                        callbackKey: 'jsoncallback',
                        success: function(data, request) {
                            if(data.success) {
                                Fallfor.utils.Global.cleanAllData()

                                Fallfor.utils.Global.setUserID(data.data.id)
                                Fallfor.utils.Global.setUserName(data.data.first_name)
                                Fallfor.utils.Global.setApiKey(data.data.token)

                                Fallfor.utils.Global.cacheAllData()

                                var signupview = self.getSignupview();
                                if(signupview._ifCheckout) {
                                    self.redirectTo('shippinginfo');
                                }
                                else {
                                    self.redirectTo('main');
                                }
                                Ext.Viewport.setMasked(false);
                            } else {
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('Error', data.error);
                            }
                        },

                        failure: function(response) {
                            Ext.Viewport.setMasked(false);
                            Ext.Msg.alert('Error', 'Register failed!');
                        }
                    });
                    
                }

            },
            
            '#signinButton': {
                tap: function() {
                    var self = this;
                    var loginForm = Ext.ComponentQuery.query("#loginForm")[0];
                    Ext.Ajax.cors = true;
                    Ext.Ajax.useDefaultXhrHeader = false;
                    Ext.Viewport.setMasked({ xtype: 'loadmask', message: 'Loading...', indicator:true});
                    Ext.data.JsonP.request({
                        url: Fallfor.utils.Global.getApiDomain() + '/api/v1/signin/',
                        params: loginForm.getValues(),
                        callbackKey: 'jsoncallback',
                        success: function(data, request) {
                            if(data.success) {
                                console.log("signin return data:")
                                console.log(data.data);
                                signin_menu = Ext.ComponentQuery.query("#signinmenu")[0];
                                me_menu = Ext.ComponentQuery.query("#memenu")[0];
                                signin_menu.hide();
                                me_menu.show();
                                Ext.Viewport.setMasked(false);

                                //clean existing data
                                Fallfor.utils.Global.cleanAllData()

                                Fallfor.utils.Global.setUserID(data.data.id)
                                Fallfor.utils.Global.setUserName(data.data.first_name)
                                Fallfor.utils.Global.setApiKey(data.data.token)
                                if(data.data.has_address){
                                    Fallfor.utils.Global.setHasAddress(data.data.has_address) 
                                }
                                Fallfor.utils.Global.cacheAllData()
                                var signupview = self.getSignupview();
                                if(signupview._ifCheckout) {
                                    self.redirectTo('shippinginfo');
                                }else {
                                    self.redirectTo('main');
                                }
                                Ext.Viewport.setMasked(false);
                                
                            } else {
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('Error', data.error);
                            }
                        },

                        failure: function(response) {
                            Ext.Viewport.setMasked(false);
                            Ext.Msg.alert('Error', 'Login failed!');
                        }
                    });
                    
                }
            },

            '#signoutButton': {
                tap: function() {
                    Ext.Viewport.setMasked({ xtype: 'loadmask', message: 'Loading...', indicator:true}); 
                    var signin_menu = Ext.ComponentQuery.query("#signinmenu")[0];
                    var me_menu = Ext.ComponentQuery.query("#memenu")[0];
                    Fallfor.utils.Global.cleanAllData();
                    signin_menu.show();
                    me_menu.hide();
                    Ext.Viewport.setMasked(false);   
                    this.redirectTo('main');
                }
            },
        }
    }
});
