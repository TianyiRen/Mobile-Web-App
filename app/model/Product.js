Ext.define('Fallfor.model.Product', {
    extend: 'Ext.data.Model',
    config: 
    {
        idProperty: 'id',
        fields: 
        [
            {name: "id",  type: "int"},
            {name: "title",  type: "string"}, 
            {name: "price",  type: "float"},
            {name: "original_price",  type: "int"},
            {name: "desc",  type: "string"},
            {name: "image",  type: "string"},
            {name: "images", type: "auto"},
            {name: "color", type: "auto"},
            {name: "size", type: "auto"},
            {name: "bythelook", type: "auto"},
            {name: "extra-color", type: "string"},
            {name: "extra-size", type: "string"},
            {name: "quantity", type: "int"}
        ]
    }
});