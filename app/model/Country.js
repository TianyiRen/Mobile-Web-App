Ext.define('Fallfor.model.Country', {
    extend: 'Ext.data.Model',
    config: 
    {
        idProperty: 'id',
        fields: 
        [
            {name: "id",  type: "int"},
            {name: "name", type: "string"},
        ]
    }
});