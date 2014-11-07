Ext.define("Fallfor.store.Cart", {
 extend: "Ext.data.Store",

 config: {
   model: "Fallfor.model.CartProduct",
 },

 populate: function(callback)
 {
  this.removeAll();
  var self = this;
  Ext.data.JsonP.request({
    url: Fallfor.utils.Global.getApiDomain() + '/api/v1/cart-get/',
    params: {
        user_id: Fallfor.utils.Global.getUserID(),
        api_key: Fallfor.utils.Global.getApiKey(),
        cart_id: Fallfor.utils.Global.getCartID(),
        device_id: Fallfor.utils.Global.getDeviceID(),
    },
    callbackKey: 'jsoncallback',
    success: function(data,request) {
      if(data.success) {
        Fallfor.utils.Global.setCartID(data.cart_id)
        Fallfor.utils.Global.updateData('cart_id',data.cart_id)
        Ext.each(data.data, function(obj){
              var extra = obj.extra;
              extra = Ext.decode(extra); 
              newObj = Ext.create("Fallfor.model.CartProduct", {
                        id: obj.id,
                        product_id: obj.product_id,
                        name: obj.name,
                        quantity: obj.quantity,
                        image: obj.image,
                        price: obj.price,
                        desc: obj.desc
                      });
            if(extra) {
              if(extra.color)newObj.set('color', extra.color); 
              if(extra.size) newObj.set('size', extra.size);
            }
            self.add(newObj);
        });
        var location_id = null;
        if(data.location_id) {
          location_id = data.location_id;
        }
        callback(data.data.length==0, data.subtotal, data.total, data.shipping,location_id);
      } else {
        Ext.Msg.alert('Error', data.error);
      }
    },

    failure: function(response) {Ext.Msg.alert("Error!");}
  });
},
});