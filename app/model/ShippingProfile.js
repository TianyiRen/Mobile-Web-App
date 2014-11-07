Ext.define('Fallfor.model.ShippingProfile', {
    extend: 'Ext.data.Model',
    config: 
    {
        idProperty: 'id',
        fields: 
        [
            {name: "id", type: "int"},
            {name: "free_shipping_gate",  type: "int"},
            {name: "cost", type:'int'},
            {name: "location", type: "string"},
        ]
    }
});