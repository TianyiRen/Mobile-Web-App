Ext.define('Fallfor.controller.HomeAction', {
  extend: 'Ext.app.Controller',
  requires: [
              "Fallfor.view.HomeView",
            ],
  config: {

    views: ['Fallfor.view.HomeView'],
    
    refs: {
      main: 'main',
    },
    control: {
      'homeview #productlist': {
          itemtap: function(list, index, item, record, event) {
           if(event.target.nodeName=='DIV'){
              this.redirectTo('products/'+ record.data.id);   
           }
          }
      },
      'homeview #new-sale-button':{
           toggle: function (segBtn, btn, isPressed) {
                  var productlisttitle = Ext.getCmp('productslisttitle')
                  if(productlisttitle){
                      productlisttitle.setTitle(btn.getText())
                  }
                  this.redirectTo('category/'+ btn.getData());  
              }
      },
      'homeview #categorylist': {
          itemtap: function(list, index, item, record, event) {
              var productlisttitle = Ext.getCmp('productslisttitle')
              if(productlisttitle){
                  productlisttitle.setTitle(record.data.name)
              }
             this.redirectTo('category/'+record.data.slug)
          }
      }
    }

  }
});