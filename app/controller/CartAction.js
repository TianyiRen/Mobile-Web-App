Ext.define('Fallfor.controller.CartAction', {
  extend: 'Ext.app.Controller',
  requires: [ 
              "Fallfor.view.ProductDetails", 
              "Fallfor.view.CategoryView",
              'Fallfor.view.CartView'

            ],
  config: {
    views: ['Fallfor.view.CartView'],
    refs: {
      main: 'main',
      cartview : 'cartview',
      selShippingProfile: 'cartview #selShippingProfile'
    },
    control: {
            'button[action="continueshopping"]': {
                tap: function(button) {
                    this.redirectTo('');  
                }
            },
            'button[action="shop-now"]': {
                tap: function(button) {
                    this.redirectTo('');
                }
            },
            'button[action="checkout"]' : {
                tap: function(button) {
                    this.redirectTo("shippinginfo");             
                }
            },

            'cartview > list': {
                itemtap: function(list, index, item, record, event) {
                    if(event.target.className=='cancel') {
                      record.data.quantity = 0;
                      Ext.data.JsonP.request({
                          url: Fallfor.utils.Global.getApiDomain() + '/api/v1/cart-update/',
                          params: {
                              device_id: Fallfor.utils.Global.getDeviceID(),
                              product_id: record.data.product_id,
                              cart_id: Fallfor.utils.Global.getCartID(),
                              api_key: Fallfor.utils.Global.getApiKey(),
                              quantity: record.data.quantity
                          },
                          callbackKey: 'jsoncallback',
                          success: function(data, request) {
                              if(data.success) {
                                  Fallfor.app.redirectTo('cart');
                                  console.log("Remove from db success!!");  
                              } else {
                                  Ext.Viewport.setMasked(false);
                                  Ext.Msg.alert('Error', data.error);
                              }
                          },
                          failure: function(response) {
                              Ext.Viewport.setMasked(false);
                              Ext.Msg.alert('Error', 'Remove Cart Error!');
                          }
                      });
                    }
                    else {
                      this.redirectTo('products/'+ record.data.product_id);
                    }
        
                },

            },
            'selShippingProfile': {
                change: function(select, newValue, oldValue) {
                  var country = Ext.getStore("ShippingProfiles");
                  var index = country.find('location', newValue, 0, false, false, true);
                  var location_id = country.getAt(index).data.id;
                  self = this;
                  Ext.data.JsonP.request({
                            url: Fallfor.utils.Global.getApiDomain() + '/api/v1/cart-update-location/',
                            params: {
                                user_id: Fallfor.utils.Global.getUserID(),
                                cart_id: Fallfor.utils.Global.getCartID(),
                                api_key: Fallfor.utils.Global.getApiKey(),
                                location_id: location_id
                            },
                            callbackKey: 'jsoncallback',
                            success: function(data, request) {
                                if(data.success) {
                                    console.log("Update Shipping fee Success!!");  
                                    Fallfor.app.redirectTo('cart');
                                } else {
                                    Ext.Viewport.setMasked(false);
                                    Ext.Msg.alert('Error', data.error);
                                }
                            },
                            failure: function(response) {
                                Ext.Viewport.setMasked(false);
                                console.log("Update Shipping Failed!");
                            }
                        });
                  
                }
            }
        }

  },
});