Ext.define('Fallfor.controller.ProductsListAction', {
  extend: 'Ext.app.Controller',
  requires: [ 
              "Fallfor.view.ProductDetails", 
              "Fallfor.view.CategoryView",
              "Fallfor.view.ProductsListView",
            ],
  config: {

    views: ['Fallfor.view.ProductsListView'],
    
    refs: {
      main: 'main',
      productslistview : 'productslistview'
    },
    control: {

        'button[action="list-to-cart"]': {
            tap: function(button) {
                this.redirectTo('cart');
            }
        },
        'productslistview > list': {
            itemtap: function(list, index, item, record, event) {
                this.redirectTo('products/'+ record.data.id);   
            }
        }
    }

  }
});