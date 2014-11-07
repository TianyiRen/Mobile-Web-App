Ext.define('Fallfor.model.CartProduct', {
    extend: 'Ext.data.Model',
    config: 
    {
        idProperty: 'id',
        fields: 
        [
            {name: "id",  type: "int"},
            {name: "product_id", type: "int"},
            {name: "name",  type: "string"}, 
            {name: "color",  type: "string"},
            {name: "size", type: "string"},
            {name: "quantity", type: "int"},
            {name: "image",  type: "string"},
            {name: "price",  type: "string"},
            {name: "desc", type:"string"} 
        ]    
    }
});