Ext.define('Fallfor.model.Category', {
    extend: 'Ext.data.Model',
    config: 
    {
        fields: 
        [
            {name: "id",  type: "int"},
            {name: "slug",  type: "string"},
            {name: "name",  type: "string"}, 
            {name: "image", type: "string"},
            {name: "icon", type: "string"},
            {name: "is_mobile", type: "bool"}

        ]
    }
});