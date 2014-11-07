Ext.define('Fallfor.controller.ShippingInfoAction', {
  extend: 'Ext.app.Controller',
  requires: [ 
              "Fallfor.view.ProductDetails", 
              "Fallfor.view.CategoryView",
              "Fallfor.view.ProductsListView",
              'Fallfor.view.CartView',
              'Fallfor.view.ShippingInfoView'

            ],
  config: {

    views: ['Fallfor.view.ShippingInfoView'],
    
    refs: {
      main: 'main',
      shippinginfoview : 'shippinginfoview'
    },
    control: {
            'shippinginfoview > button[action=addNewAddress]': {
                tap: function(button) {
                    alert("Add New Address!")
                    // var shippingInfoFormCount = Ext.ComponentQuery.query("#shippingInfoForm").length;
                    // var shippingInfoForm = Ext.ComponentQuery.query("#shippingInfoForm")[shippingInfoFormCount-1];
                    // FallforCache.loadUserData();
                    // var countries = Ext.getStore('Countries');
                    // var index = countries.find('id',Ext.ComponentQuery.query("#selCountry")[0].getValue(), 0, false, false, true);
                    // if(name && address && address2 && zip_code && city && state && country && user_id && api_key) 
                    // {
                    //     Ext.data.JsonP.request({
                    //         url: Fallfor.app.api_domain + '/api/v1/add-shipping-address/',
                    //         params: {
                    //             name: name,
                    //             address: address,
                    //             address2: address2,
                    //             zip_code: zip_code,
                    //             city: city,
                    //             state: state,
                    //             country: country,
                    //             user_id: user_id,
                    //             api_key: api_key
                    //         },
                    //         callbackKey: 'jsoncallback',
                    //         success: function(data, request) {
                    //             if(data.success) {
                    //                 alert("Add Shipping Address Sucess!"); 
                    //                 console.log(data.address_id);
                    //                 var address = Ext.create('Fallfor.model.Address', {
                    //                     address_id: data.address_id,
                    //                     name: shippingInfoForm.getValues().user_name,
                    //                     address: shippingInfoForm.getValues().address,
                    //                     address2: shippingInfoForm.getValues().address2,
                    //                     zip_code: shippingInfoForm.getValues().zip_code,
                    //                     city: shippingInfoForm.getValues().city,
                    //                     state: shippingInfoForm.getValues().state,
                    //                     country_id: Ext.ComponentQuery.query("#selCountry")[0].getValue(),
                    //                     country: countries.getAt(index).data.name
                    //                 }); 
                    //                 console.log(address);
                    //             } else {
                    //                 Ext.Viewport.setMasked(false);
                    //                 Ext.Msg.alert('Error', data.error);
                    //             }
                    //         },
                    //         failure: function(response) {
                    //             Ext.Viewport.setMasked(false);
                    //             Ext.Msg.alert('Error', 'Add Shipping Address Failed!');
                    //         }
                    //     });
                    // }
                }

            },

    }

  }
  
});