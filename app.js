
//<debug>
Ext.Loader.setPath({
    'Fallfor': 'app',
    'Ext.plugin.SlideToRemove': 'app/plugin/SlideToRemove.js'
});
//</debug>

Ext.require('Ext.plugin.SlideToRemove');
Ext.application({
    name: 'Fallfor',

    requires: [
               'Fallfor.utils.Global',
               'Ext.device.Storage',
               'Ext.Menu',
               'Fallfor.components.MenuButton',
               'Ext.MessageBox',
               'Ext.form.Panel'
               ],
    
    controllers: [
       'Fallfor.controller.Main',
       'Fallfor.controller.UserAction',
       'Fallfor.controller.CategoryAction',
       'Fallfor.controller.ProductsListAction',
       'Fallfor.controller.ProductDetailsAction',
       'Fallfor.controller.CartAction',
       'Fallfor.controller.HomeAction'
    ],

    stores: [
        'Cart',
        'Users',
        'Countries',
        'Addresses',
        'Promotions',
        'Categories',
        'ShippingProfiles'
    ],


    models: [
        'Product', 
        'CartProduct',
        'Category',
        'User',
        'Country',
        'Address',
        'Promotion',
        'ShippingProfile'
    ],

    views: [
       'Fallfor.view.Main', 
       'Fallfor.view.WelcomeOverlay',
       'Fallfor.view.SignupView',
       'Fallfor.view.CartView',
       'Fallfor.view.ProductDetails',
       'Fallfor.view.CategoryView',
       'Fallfor.view.MeView',
       'Fallfor.view.ShippingInfoView',
       'Fallfor.view.HomeView',
       'Fallfor.view.Shipping',
       'Fallfor.view.Return',
       'Fallfor.view.AboutFallfor',
       'Fallfor.view.ContactUs'
    ],
    onReady: function() {

    },
    getProductImages: function() {
        return this.images;
    },
    setProductImages: function(arg) {
        this.images = arg;
    },


    launch: function() {
        Ext.getBody().removeCls('loading');
        Ext.fly('appLoadingIndicator').destroy();
        Ext.Viewport.add(Ext.create('Fallfor.view.Main'));


        /*
        if(Ext.browser.is.PhoneGap) {
            alert(device.uuid);
        } else {
            alert('Error: No PhoneGap.');
        }

        
        if (Ext.device.Storage.getItem('isFirstTime') !== "false") {
            Ext.device.Storage.setItem('isFirstTime', false);
            var overlay = Ext.create('Fallfor.view.Main');
            Ext.Viewport.add(overlay);
            overlay.show();
        }
        */
        
        var menu = Ext.create("Ext.Menu", {
            defaults: {
                xtype: "menubutton"
            },
            width: '80%',
            scrollable: 'vertical',
            items: [
                {
                    text: 'Explore',
                    iconCls: 'refresh',
                    menu: "homeview"
                },
                {
                    id:'signinmenu',
                    text: 'Sign In',
                    iconCls: 'user',
                    menu:"signupview"
                },
                {
                    id:'memenu',
                    text: 'Me',
                    iconCls: 'user',
                    hidden: true,
                    menu:"meview"
                },
                {
                    text: 'Category',
                    iconCls: 'tag',
                    menu:"categoryview"
                },
                {
                    text: 'Shipping',
                    iconCls: 'truck',
                    menu: "shipping"
                },
                {
                    text: 'Return',
                    iconCls: 'return',
                    menu: "return"
                },
                {
                    text: 'About Fallfor',
                    iconCls: 'smile',
                    menu: "aboutfallfor"
                },
                {
                    text: 'Contact us',
                    iconCls: 'phone',
                    menu: "contactus"
                }
            ]
        });

        Ext.Viewport.setMenu(menu, {
            side: 'left',
            reveal: true
        });
        
        Fallfor.utils.Global.loadUserData();

        if(Fallfor.utils.Global.getUserID() && Fallfor.utils.Global.getApiKey()){
            var signin_menu = Ext.ComponentQuery.query("#signinmenu")[0];
            var me_menu = Ext.ComponentQuery.query("#memenu")[0];
            signin_menu.hide();
            me_menu.show();
        }
        /*
        if (Ext.os.is.iOS && Ext.os.version.major >= 7) {
           Ext.select("body").applyStyles("padding-top: 20px;");
           menu.setStyle('margin-top: 20px;');
        }*/
        var countries = Ext.getStore("Countries");
        countries.populate();
        var shippingprofiles = Ext.getStore("ShippingProfiles");
        shippingprofiles.load();
        


    }
});

