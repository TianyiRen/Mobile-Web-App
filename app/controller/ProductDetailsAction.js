Ext.define('Fallfor.controller.ProductDetailsAction', {
  extend: 'Ext.app.Controller',
  requires: [ 
              "Fallfor.view.ProductDetails", 
              "Fallfor.view.CategoryView",
              "Fallfor.view.ProductsListView",
            ],
  config: {

    views: ['Fallfor.view.ProductDetails'],
    
    refs: {
      main: 'main',
      productdetails : 'productdetails',
      selColor: 'productdetails #selColor',
      selSize: 'productdetails #selSize',
      selQty: 'productdetails #selQty',
    },
    enablePaging: false,
    autoLoad: false,
    proxy: {},
    control: {
            'productdetails' : {
                painted: function() {
                    alert(1111)
                    this.getProductdetails().scroller.srollTo({x:0, y:0});
                }
            },
            'button[action="detail-to-cart"]': {
                tap: function(button) {
                    this.redirectTo('cart');
                }
            },

            'productdetails > button[action=addtocart]': {
                tap: function(button) {
                    if(button.getText()=='In Cart'){
                        return
                    }
                    var productdetails = button.up('productdetails')
                    var record = productdetails.getRecord();

                    console.log("Add to cart : ");
                    console.log(record.data);
                 
                    var colorr = null;
                    if(record.data.color && !record.data.size) {    
                        colorr = Ext.ComponentQuery.query("#selColor")[0].getValue();
                        console.log("Chosen color: "+ colorr);               
                    }
                    var sizee = null;
                    if(record.data.size && !record.data.color)
                    {    
                        sizee = Ext.ComponentQuery.query("#selSize")[0].getValue();
                        console.log("Chosen size: " + sizee);   
                    }
                    if(record.data.size && record.data.color) {
                        
                        colorr = Ext.ComponentQuery.query("#selColor")[0].getValue();
                        sizee = Ext.ComponentQuery.query("#selSize")[0].getValue();
                        console.log("Chosen color: " + colorr);
                        console.log("Chosen size: " + sizee);    
                    }
                    var extra = {
                        color: colorr,
                        size: sizee
                    };
                    extra = Ext.encode(extra);
                    var quantity = Ext.ComponentQuery.query("#selQty")[0].getValue();
                    if(colorr == 'color') {
                        alert("Please select a color!");
                    }
                    else if(sizee == 'size') {
                        alert("Please select a size!");
                    }
                    else {
                        Ext.data.JsonP.request({
                        url: Fallfor.utils.Global.getApiDomain() + '/api/v1/cart-add/',
                        params: {
                            device_id: Fallfor.utils.Global.getDeviceID(),
                            product_id: record.data.id,
                            cart_id: Fallfor.utils.Global.getCartID(),
                            api_key: Fallfor.utils.Global.getApiKey(),
                            user_id: Fallfor.utils.Global.getUserID(),
                            quantity: quantity,
                            extra: extra

                        },
                        callbackKey: 'jsoncallback',
                        success: function(data, request) {
                            if(data.success) {     
                                Fallfor.utils.Global.setCartID(data.cart_id)
                                Fallfor.utils.Global.updateData('cart_id',data.cart_id)
                                button.setText('In Cart');
                                button.setUi('my-info');  
                            } else {
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('Error', data.error);
                            }
                        },
                        failure: function(response) {
                            Ext.Viewport.setMasked(false);
                            Ext.Msg.alert('Error', 'Add to Cart Error!');
                        }
                    });

                    }
                    
                }
            },

             'productdetails > container > dataview': {
                itemtap: function(list, index, item, r, e) {
                    var record = this.getProductdetails().getRecord();
                    if(record.data.bythelook) {
                        var store = this.getStore();
                        Ext.Array.each(record.data.bythelook, function(product) {
                            var product = Ext.create('Fallfor.model.Product', product);
                            store.add(product);
                            store.sync();   
                        });
                        product = store.getAt(index);
                        this.redirectTo('products/'+ product.data.id);
                    }
                      
                }
            },
            'selQty' : {
                change: function(select, newValue, oldValue) {
                    console.log("NewValue: " + newValue);
                    var record = this.getProductdetails().getRecord();
                    if(record.data.quantity) {
                        var color = null;
                        var size = null;
                        if(this.getSelColor()) {
                            color = this.getSelColor().getValue();
                        }
                        if(this.getSelSize()) {
                            size = this.getSelSize().getValue();
                        }
                        var extra = {
                            color: color,
                            size: size
                        }
                        extra = Ext.encode(extra);
                        Ext.data.JsonP.request({
                            url: Fallfor.utils.Global.getApiDomain() + '/api/v1/cart-update/',
                            params: {
                                device_id: Fallfor.utils.Global.getDeviceID(),
                                product_id: record.data.id,
                                cart_id: Fallfor.utils.Global.getCartID(),
                                api_key: Fallfor.utils.Global.getApiKey(),
                                quantity: newValue,
                                extra: extra
                            },
                            callbackKey: 'jsoncallback',
                            success: function(data, request) {
                                if(data.success) {
                                    console.log("Update Qty Success!!");  
                                } else {
                                    Ext.Viewport.setMasked(false);
                                    Ext.Msg.alert('Error', data.error);
                                }
                            },
                            failure: function(response) {
                                Ext.Viewport.setMasked(false);
                                console.log("Update Qty Failed!");
                            }
                        });
                        // this.getSelQty().setValue('Qty: '+ newValue);
                    }
                    
                }
            },
            'selColor' : {
                change: function(select, newValue, oldValue) {
                    console.log("NewColor: " + newValue);
                    var record = this.getProductdetails().getRecord();
                    if(record.data.quantity) {
                        var size = null;
                        if(this.getSelSize()) {
                            size = this.getSelSize().getValue();
                        }
                        var extra = {
                            color: newValue,
                            size: size
                        }
                        extra = Ext.encode(extra);
                        var quantity = this.getSelQty().getValue();
                        Ext.data.JsonP.request({
                            url: Fallfor.utils.Global.getApiDomain() + '/api/v1/cart-update/',
                            params: {
                                device_id: Fallfor.utils.Global.getDeviceID(),
                                product_id: record.data.id,
                                cart_id: Fallfor.utils.Global.getCartID(),
                                api_key: Fallfor.utils.Global.getApiKey(),
                                quantity: quantity,
                                extra: extra
                            },
                            callbackKey: 'jsoncallback',
                            success: function(data, request) {
                                if(data.success) {
                                    console.log("Update Color Success!!");  
                                } else {
                                    Ext.Viewport.setMasked(false);
                                    Ext.Msg.alert('Error', data.error);
                                }
                            },
                            failure: function(response) {
                                Ext.Viewport.setMasked(false);
                                console.log("Update Color Failed!");
                            }
                        });
                    }
                    
                }
            },

            'selSize' : {
                change: function(select, newValue, oldValue) {
                    console.log("NewValue: " + newValue);
                    var record = this.getProductdetails().getRecord();
                    if(record.data.quantity) {
                        var color = null;
                        if(this.getSelColor()) {
                            color = this.getSelColor().getValue();
                        }
                        var extra = {
                            color: color,
                            size: newValue
                        }
                        extra = Ext.encode(extra);
                        var quantity = this.getSelQty().getValue();
                        Ext.data.JsonP.request({
                            url: Fallfor.utils.Global.getApiDomain() + '/api/v1/cart-update/',
                            params: {
                                device_id: Fallfor.utils.Global.getDeviceID(),
                                product_id: record.data.id,
                                cart_id: Fallfor.utils.Global.getCartID(),
                                api_key: Fallfor.utils.Global.getApiKey(),
                                quantity: quantity,
                                extra: extra
                            },
                            callbackKey: 'jsoncallback',
                            success: function(data, request) {
                                if(data.success) {
                                    console.log("Update Size Success!!");  
                                } else {
                                    Ext.Viewport.setMasked(false);
                                    Ext.Msg.alert('Error', data.error);
                                }
                            },
                            failure: function(response) {
                                Ext.Viewport.setMasked(false);
                                console.log("Update Size Failed!");
                            }
                        });

                    }
                    
                }
            },
        }
    }, //end of config
    
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
});