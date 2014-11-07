Ext.define('Fallfor.model.Promotion', {
    extend: 'Ext.data.Model',
    config: 
    {
        idProperty: 'id',
        fields: 
        [
            {name: "id", type: "int"},
            {name: "image",  type: "string"},
            {name: "category", type:'string'}
        ]
    }
});