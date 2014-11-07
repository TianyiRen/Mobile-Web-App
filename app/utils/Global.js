Ext.define('Fallfor.utils.Global', {
    singleton: true,
    alias: 'widget.global',
    config: {
        apiDomain: 'http://fallfor.com',
        email: null,
        userID: null,
        userName: null,
        apiKey: null,
        deviceID: null,
        cartID: null,
        hasAddress: false
    },
    constructor: function(config) {
        this.initConfig(config);
    },
    cleanAllData:function() {
        this.cleanCacheData();
        this.cleanLocalData();
    },
    cleanCacheData: function() {
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("api_key");
        window.localStorage.removeItem('cart_id')
        window.localStorage.removeItem("user_name");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("has_address");
    },
    cleanLocalData : function(){
        this.setUserID('');
        this.setApiKey('');
        this.setCartID('');
        this.setHasAddress(null);
        this.setUserName('');
    },
    loadUserData: function() {
        this.setUserID(window.localStorage.getItem('user_id'))
        this.setApiKey(window.localStorage.getItem('api_key'))
        this.setCartID(window.localStorage.getItem('cart_id'))
        this.setHasAddress(window.localStorage.getItem('has_address'))
        this.setUserName(window.localStorage.getItem('user_name'))

    },
    cacheAllData:function(){
        window.localStorage.setItem("user_id", this.getUserID());
        window.localStorage.setItem("api_key", this.getApiKey());
        window.localStorage.setItem("user_name", this.getUserName());
        window.localStorage.setItem("cart_id", this.getCartID());
        window.localStorage.setItem("email", this.getEmail());
        window.localStorage.setItem("has_address", this.getHasAddress());          
    },
    saveUserData: function(userId, apiKey, userName) {
        window.localStorage.setItem("user_id", userId);
        window.localStorage.setItem("api_key", apiKey);
        window.localStorage.setItem("user_name", userName);

    },
    updateData: function(key, data) {
        window.localStorage.setItem(key, data);
    },

})