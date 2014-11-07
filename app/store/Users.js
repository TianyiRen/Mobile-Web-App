Ext.define('Fallfor.store.Users', {
  
  extend: 'Ext.data.Store',
  
  requires: ['Fallfor.model.User'],
  
  config: {
    model: 'Fallfor.model.User',
    autoLoad: true,
    storeId: 'Users'
  }
});

