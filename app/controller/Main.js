 Ext.define('Fallfor.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ["Fallfor.view.ProductDetails", 
               "Ext.util.InputBlocker",
               "Fallfor.store.Cart",
               "Fallfor.store.Users",
               "Fallfor.store.Addresses",
               "Fallfor.model.Address",
               "Fallfor.store.Countries",
               "Fallfor.view.CartView",
               "Fallfor.view.MeView",
               "Fallfor.view.CategoryView",
               "Fallfor.view.SignupView",
               "Fallfor.view.ProductsListView",
               "Fallfor.view.ShippingInfoView"
               ],

    config: {
        enablePaging: false,
        autoLoad: false,
        proxy: {},

        refs: {
            main: 'main',
        },
        routes: {
            'products/:id' : 'showProduct',
            'category/:id' : 'showCategoryProducts',
            'main': 'showHome',
            'signin': 'showSignIn',
            'me': 'showMe',
            'cart': 'showCart',
            'category': 'showCategoryView',
            'checkout': 'showCheckout',
            'shippinginfo': 'showShippingInfo',
            '': 'showHome'


        },
        control: {
            searchField: {
                action: 'onSearch'
            },
            'button[action="toggle-menu"]': {
                tap: function() {
                    Ext.Viewport.toggleMenu("left");
                }
            },

            'button[action="go-back"]': {
                tap: function(button) {
                   var main = this.getMain();
                   main.pop()
                }
            },

            'menu > button': {
                tap: function(btn) {
                    var view_name = btn.getMenu();
                    var mainview = this.getMain()              
                    

                    if(mainview.getActiveItem().xtype!=view_name){
                        //disable pop animation to avoid menu animation confilct
                        mainview.getActiveItem().hide();
                        mainview.getLayout().setAnimation(''); 
                        mainview.reset()
                        //re-enable 
                        mainview.getLayout().setAnimation('slide');
                    }else{
                        Ext.Viewport.hideAllMenus();
                        Ext.Viewport.setMasked(false);
                        return;
                    }
   
                    switch(view_name){
                        case 'categoryview':
                            var categoryview = this.getCategoryView();
                            mainview.push(categoryview);
                            break;
                        case 'signupview':
                            var signinview = this.getSigninView();
                            mainview.push(signinview);
                            break;
                        case 'homeview':
                            var homeview = this.getHome();
                            mainview.push(homeview);
                            break;
                        case 'meview':
                            var meview = this.getMeView();
                            mainview.push(meview);
                            break;
                        case 'shipping':
                            var shipping = this.getShipping();
                            mainview.push(shipping);
                            break;
                        case 'return': 
                            var returnview = this.getReturn();
                            mainview.push(returnview);
                            break;
                        case 'aboutfallfor':
                            var aboutfallfor = this.getAboutFallfor();
                            mainview.push(aboutfallfor);
                            break;
                        case 'contactus':
                            var contactus = this.getContactUs();
                            mainview.push(contactus);
                            break;
                    }
                    Ext.Viewport.hideAllMenus(); 
                }
            },

            'button[action="addNewAddress"]' : {
                tap: function(button) {
                    alert("Add New Address!")
                    var shippingInfoFormCount = Ext.ComponentQuery.query("#shippingInfoForm").length;
                    var shippingInfoForm = Ext.ComponentQuery.query("#shippingInfoForm")[shippingInfoFormCount-1];
                    FallforCache.loadUserData();
                    var countries = Ext.getStore('Countries');
                    var index = countries.find('id',Ext.ComponentQuery.query("#selCountry")[0].getValue(), 0, false, false, true);
                    if(name && address && address2 && zip_code && city && state && country && user_id && api_key) 
                    {
                        Ext.data.JsonP.request({
                            url: Fallfor.utils.Global.getApiDomain() + '/api/v1/add-shipping-address/',
                            params: {
                                name: name,
                                address: address,
                                address2: address2,
                                zip_code: zip_code,
                                city: city,
                                state: state,
                                country: country,
                                user_id: user_id,
                                api_key: api_key
                            },
                            callbackKey: 'jsoncallback',
                            success: function(data, request) {
                                if(data.success) {
                                    alert("Add Shipping Address Sucess!"); 
                                    console.log(data.address_id);
                                    var address = Ext.create('Fallfor.model.Address', {
                                        address_id: data.address_id,
                                        name: shippingInfoForm.getValues().user_name,
                                        address: shippingInfoForm.getValues().address,
                                        address2: shippingInfoForm.getValues().address2,
                                        zip_code: shippingInfoForm.getValues().zip_code,
                                        city: shippingInfoForm.getValues().city,
                                        state: shippingInfoForm.getValues().state,
                                        country_id: Ext.ComponentQuery.query("#selCountry")[0].getValue(),
                                        country: countries.getAt(index).data.name
                                    }); 
                                    console.log(address);
                                } else {
                                    Ext.Viewport.setMasked(false);
                                    Ext.Msg.alert('Error', data.error);
                                }
                            },
                            failure: function(response) {
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('Error', 'Add Shipping Address Failed!');
                            }
                        });
                    }
                }

            },

        }
    },

    onSearch: function() {
        var searchField = this.getSearchField();
        this.fireAction('search', [searchField.getValue()], 'doSearch');
    },

    doSearch: function(search) {
        search = search.replace(/^\s+|\s+$/g, '');
        if (search.length <= 0) return;
        var moviesList = this.getMoviesList(),
            moviesStore = moviesList.getStore();
        moviesStore.currentPage = 1;
        moviesStore.filter('query', search);

        moviesList.setScrollToTopOnRefresh(true);
        moviesStore.load();
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
    
    getShipping: function() {
        if(!this._shipping) {
            var shipping = Ext.ComponentQuery.query("shipping")[0];
            if(!shipping) {
                this._shipping = Ext.create("Fallfor.view.Shipping");
            }else {
                this._shipping = shipping;
            }
        }
        return this._shipping;
    },
    getReturn: function() {
        if(!this._return) {
            var returnview = Ext.ComponentQuery.query("return")[0];
            if(!returnview) {
                this._return = Ext.create("Fallfor.view.Return");
            }else {
                this._return = returnview;
            }
        }
        return this._return;

    },
    getAboutFallfor: function() {
        // alert(1111)
        if(!this._aboutFallfor) {
            var aboutfallforview = Ext.ComponentQuery.query("aboutfallfor")[0];
            if(!aboutfallforview) {
                this._aboutFallfor = Ext.create("Fallfor.view.AboutFallfor");
            }else {
                this._aboutFallfor = aboutfallforview;
            }
        }
        return this._aboutFallfor;
    },
    getContactUs: function() {
        if(!this._contactUs) {
            var contactusview = Ext.ComponentQuery.query("contactus")[0];
            if(!contactusview) {
                this._contactUs = Ext.create("Fallfor.view.ContactUs");
            }else {
                this._contactUs = contactusview;
            }
        }
        return this._contactUs;
    },
    getSigninView: function() {

        if(!this._signinview){
            var signupview = Ext.ComponentQuery.query("signupview")[0];
            if(!signupview){
                this._signinview = Ext.create("Fallfor.view.SignupView");
            }else{
                this._signinview = signupview
            }
        }
        return  this._signinview;
    },

    getMeView: function() {
        if(!this._meview){
            var meview = Ext.ComponentQuery.query("meview")[0];
            if(!meview) {
                this._meview = Ext.create("Fallfor.view.MeView");
            }
            else {
                this._meview = meview;
            }
        }
        return this._meview;
    },
    getCartView: function() {
        if(!this._cartview){
            var cartview = Ext.ComponentQuery.query("cartview")[0];
            if (!cartview) {
                this._cartview = Ext.create("Fallfor.view.CartView");
            }else{
                this._cartview = cartview;
            }
        }
        return this._cartview;
    },

    getProductDetails: function() {
        if (!this._productDetails) {
            var productDetails = Ext.ComponentQuery.query("productdetails")[0];
            if(!productDetails){
                this._productDetails = Ext.create("Fallfor.view.ProductDetails");
            }
            else{
                this._productDetails = productDetails
            }
        }
        return this._productDetails;
    },

    getProductListView: function() {
        if(!this._productlistview) {
            var productlistview = Ext.ComponentQuery.query("productlistview")[0];
            if(!productlistview){
                this._productlistview = Ext.create("Fallfor.view.ProductsListView");
            }else{
                this._productlistview = productlistview
            }
        }
        return this._productlistview;
    },

     getCategoryView: function() {
        if(!this._categoryview){
            var categoryview = Ext.ComponentQuery.query("categoryview")[0];
            if(!categoryview) {
                this._categoryview = Ext.create("Fallfor.view.CategoryView");
            }else{
                this._categoryview = categoryview;
            }
        }
        return this._categoryview;
    },


    getLoginForm: function(){
        if(!this._loginform){
            var loginform = Ext.ComponentQuery.query("#loginForm")[0];
            if(!loginform) {
                this._loginform = Ext.create("Fallfor.view.CategoryView");
            }else{
                this._loginform = categoryview;
            }
        
        }    
        return this._loginform;
    },

    getShippingInfoView: function() {
        if(!this._shippinginfoview){
            var shippinginfoview = Ext.ComponentQuery.query("shippinginfoview")[0];
            if(!shippinginfoview){
                this._shippinginfoview = Ext.create("Fallfor.view.ShippingInfoView");
            }else{
                this._shippinginfoview = shippinginfoview;
            }
        }
        return this._shippinginfoview;
    },

    getMain: function() {
        if(!this._mainview){
            var mainview = Ext.ComponentQuery.query("main")[0];
            if(!mainview) {
                this._mainview = Ext.create("Fallfor.view.Main");
            }else{
                this._mainview = mainview;
            }
        }
        return this._mainview;
    },
    getHome: function() {
        if(!this._homeview){
            var homeview = Ext.ComponentQuery.query("homeview")[0];
            if(!homeview) {
                this._homeview = Ext.create("Fallfor.view.HomeView");
            }else{
                this._homeview = homeview;
            }
        }
        return this._homeview;
    },

    showProduct: function(id) {
        Ext.Ajax.cors = true;
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Viewport.setMasked({ xtype: 'loadmask', message: 'Loading...', indicator:true});
        var store = this.getStore();
        var self  = this;
        var mainview = this.getMain();
        Ext.data.JsonP.request({
            url: Fallfor.utils.Global.getApiDomain() + '/api/v1/product-get/',
            params: {
                product_id: id,
                cart_id: Fallfor.utils.Global.getCartID()
            },
            callbackKey: 'jsoncallback',
            success: function(data, request) {
                if(data.success) {
                    var product = Ext.create('Fallfor.model.Product', {
                        id: data.data.id,
                        title: data.data.title,
                        price: data.data.price,
                        image: data.data.image,
                        images: data.data.images,
                        desc: data.data.desc,
                        bythelook: data.products
                    });
                    if(data['data']['var']) {
                        if(data['data']['var']['color']){
                            product.set('color',data['data']['var']['color']);
                        }
                        if(data['data']['var']['size']){
                            product.set('size',data['data']['var']['size']);
                        }
                    }
                    if(data.data.quantity) {

                        product.set('quantity', data.data.quantity);
                    }
                    if(data.data.extra) {
                        var extra = Ext.decode(data.data.extra); 
                        if(extra.color){
                            product.set('extra-color', extra.color);
                        }
                        if(extra.size){
                            product.set('extra-size', extra.size);
                        }
                    }

                    Ext.Viewport.setMasked(false);
                    var productdetails = self.getProductDetails();
                    productdetails.setRecord(product);
                    //mainview.push(productdetails);
                    mainview.setActiveItem(productdetails);
                    // Ext.ComponentQuery.query("#descriptionfield")[0].setValue(data.data.desc);
                    
                } else {
                    console.log('fail');
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('Error', data.error);
                }
            },
            failure: function(response) {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Error', 'Login failed!');
            }
        });// end of jsonp request
    },

    showMain: function() {
        console.log("Show Main!");
        var menubutton = Ext.ComponentQuery.query('menubutton');
        var mainview = menubutton[0].getMenu();
        Ext.Viewport.push(mainview);
        Ext.Viewport.hideAllMenus();

    },

    showCart: function() {
        Ext.Viewport.setMasked({ xtype: 'loadmask', message: 'Loading...', indicator:true});
        var cart = Ext.getStore("Cart");
        cartview = this.getCartView();
        var mainview = this.getMain();
        cart.populate(function(is_empty,subtotal,total, shipping,location_id){
            if(is_empty){
                cartview.create_empty_view()
            }
            else{
                cartview.create(subtotal,total,shipping, location_id)     
            }
            Ext.Viewport.setMasked(false);
            //mainview.push(cartview);
            mainview.setActiveItem(cartview);
        });
    },
        
    showSignIn: function() {
        var signinview = this.getSigninView();
        this.getMain().push(signinview);
    },

    showMe: function(){
        var meview = this.getMeView();
        var mainview = this.getMain();
        mainview.push(meview);
        var namefield = Ext.ComponentQuery.query("#user_name_me")[0];
        namefield.setValue(Fallfor.utils.Global.getUserName());
        Ext.Viewport.hideAllMenus();
 
    },
    
    showCategoryProducts:  function(slug){
        Ext.Viewport.setMasked({ xtype: 'loadmask', message: 'Loading...', indicator:true});
        var self = this;
        var newActiveItem = this.getProductListView()
        var list = newActiveItem.down("list"),store;
        store = list.getStore();
        var proxy = store.getProxy()
        store.getProxy()._extraParams.category_slug = slug
        store.load({
          callback : function(records, operation, success) {
              Ext.Viewport.setMasked(false);
              self.getMain().push(newActiveItem);
              
          }
        })
        list.refresh();
    },

    showCategoryView: function() {
        var categoryview = this.getCategoryView();
        this.getMain().push(categoryview);
            
    },
    showShippingInfo: function() {
        if(Fallfor.utils.Global.getUserID()) {
            var shippinginfoview = this.getShippingInfoView();
            var main = this.getMain();
            var store = Ext.getStore("Addresses");
            store.getProxy()._extraParams.user_id = Fallfor.utils.Global.getUserID();
            store.getProxy()._extraParams.api_key = Fallfor.utils.Global.getApiKey();
            store.load({callback:function(records, options, success){
                main.push(shippinginfoview);
            }}); 
        }
        else {
            var signinview = this.getSigninView();
            signinview._ifCheckout = true
            signinview.create();
            this.getMain().push(signinview);
        }

    },
    showHome: function() {
        var homeview = this.getHome();
        this.getMain().reset()
        this.getMain().push(homeview);
    }

});
