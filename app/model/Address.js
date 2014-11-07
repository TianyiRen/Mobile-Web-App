Ext.define('Fallfor.model.Address', {
    extend: 'Ext.data.Model',
    config: 
    {
        idProperty: 'id',
        fields: 
        [
            {name: "id",  type: "int"},
            {name: "name", type: "string"},
            {name: "address", type: "string"},
            {name: "address2", type: "string"},
            {name: "zip_code", type: "int"},
            {name: "city", type: "string"},
            {name: "state", type: "string"},
            {name: "country_id", type: "int"},
            {name: "country", type: "string"}
          
        ]    
    }

});