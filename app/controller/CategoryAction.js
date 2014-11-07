Ext.define('Fallfor.controller.CategoryAction', {
  extend: 'Ext.app.Controller',
  requires: [
              "Fallfor.view.CategoryView",
            ],
  config: {

    views: ['Fallfor.view.CategoryView'],
    
    refs: {
      main: 'main',
      categoryview:'categoryview'
    },
    control: {
      'categoryview > list': {
          itemtap: function(list, index, item, record, event) {
              //Ext.getCmp('productslisttitle').setTitle(record.data.name)
              this.redirectTo('category/'+record.data.slug)
          }
      }

    }

  }
});