Ext.define('Fallfor.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: "main",

    requires: [
        'Fallfor.view.HomeView',
        'Ext.navigation.View'
    ],

    config: {
        fullscreen: true,
        navigationBar:false,
        autoDestroy:false,
        ui: 'light',
        items: [
            {
                title: 'Explore FallFor',
                menu: "opening",
                xtype: 'homeview',
            }
        ]
    }
});