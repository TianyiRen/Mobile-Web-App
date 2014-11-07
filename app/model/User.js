Ext.define('Fallfor.model.User', {
  extend: 'Ext.data.Model',
  
  config: {
    idProperty: 'id',
    fields: [ 
      { name: 'user_id', type: 'int'},
      { name: 'user_name', type: 'string'},
      { name: 'api_key', type: 'string'},
      { name: 'email', type: 'string'},
      { name: 'has_address', type: 'boolean'},
      { name: 'cart_id', type: 'int'}
    ]

  }
  
});