Ext.define("Fallfor.store.Countries", {
 extend: "Ext.data.Store",

 config: {
   model: "Fallfor.model.Country",
 },

 populate: function()
 {
  var self = this;
  Ext.data.JsonP.request({
    url: Fallfor.utils.Global.getApiDomain() + '/api/v1/get-country-list/',
    callbackKey: 'jsoncallback',
    success: function(data,request) {
      if(data.success) {
        Ext.each(data.data, function(obj){ 
          newObj = Ext.create("Fallfor.model.Country", {
            id: obj.id,
            name: obj.name
        });
        self.add(newObj);
       });
        console.log("Country Count: " + self.getCount());

      } else {
        Ext.Msg.alert('Error', data.error);
      }
    },

    failure: function(response) {Ext.Msg.alert("Error!");}
  });
},
});