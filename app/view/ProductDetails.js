Ext.define('Fallfor.view.ProductDetails', {
    extend: 'Ext.Container',
    xtype: "productdetails",

    requires: ['Ext.Carousel',
               'Ext.carousel.Infinite',
               'Ext.Img',
               'Ext.field.Select',
               'Fallfor.view.ProductsListView',
               'Fallfor.store.Users',
               'Fallfor.proxy.ProductProxy',
               'Fallfor.view.SignupView',
               'Fallfor.view.MeView', 
               'Fallfor.view.CartView'
               ],

    config: {
       
        fullscreen: true,
        scrollable: true,
        cls: " productdetails",
        record: null,
        layout: {
                type: 'vbox',
                align: 'stretch'
        },
        enablePaging: false,
        autoLoad: false,
        proxy: {}
    },


    initialize: function() {

    },

    updateRecord: function() {
        this.removeAll(false);
        this.createView();
    },

    createView: function() {
        var record = this.getRecord(); 
        console.log("Get Product Details record: ");
        console.log(record.data);
        if(Ext.ComponentQuery.query("#selColor")[0]){
            Ext.ComponentQuery.query("#selColor")[0].destroy();
        } 
        if(Ext.ComponentQuery.query("#selSize")[0]) {
            Ext.ComponentQuery.query("#selSize")[0].destroy();
        }
        if(Ext.ComponentQuery.query("#selQty")[0]) {
            Ext.ComponentQuery.query("#selQty")[0].destroy();
        }
        if(Ext.ComponentQuery.query('#addtocart')[0]) {
            Ext.ComponentQuery.query("#addtocart")[0].destroy();
        }
        this.add(this.getHeader());
        this.add(this.getImageCarousel(record));
        this.add(this.getContent(record)); 
        this.add(this.getAddToCart(record));   
        this.add(this.getDescription(record));
        this.add(this.getMoreDetails(record));
        this.add(this.getShippingPaymentLabel(record));
        this.add(this.getShippingPayment(record));
        this.add(this.getRecommend(record));
        this.add(this.getRecommendImages(record));
    },
    getStore: function() {
        if (!this._store) {
            this._store = Ext.create("Ext.data.Store", {
                model: "Fallfor.model.Product",
                autoLoad: this.getAutoLoad() === true,
                remoteFilter: true,
                pageSize: 20,
                proxy: this.getProxy()
            });
        }    
        return this._store;
    },

    getHeader: function(){
        if(!this._header){
            this._header = Ext.create('Ext.TitleBar',{
                docked: 'top',
                title: 'FallFor',
                style: 'border: 1px solid #D5D5D5;',
                items: [
                    {
                        xtype:'button',
                        iconCls: 'back',
                        align: 'left',
                        action: "go-back",
                        style:'background-color:transparent;'
                    },
                    
                    {   
                        xtype:'button',
                        iconCls: 'cart',
                        align: 'right',
                        action: "detail-to-cart",
                        style:'background-color:transparent;'
                    }
                    
                ]
            });
        }
        return this._header;

    },
    getImageCarousel: function(record){
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
        var carousel =  Ext.create('Ext.Carousel', {
                flex: 2,
                width:width,
                minHeight: width,
                defaults: {
                    styleHtmlContent: true
                },
            });
        var items = []
        Ext.each(record.data.images,function(image){
            items.push({xtype:'image',src:image,width:width,height:width})
        });
        carousel.setItems(items);
        carousel.setActiveItem(0);
        return carousel;
    },
    getContentTemplate: function() {
        if (!this._contentTemplate) {
            this._contentTemplate = new Ext.XTemplate(
                '<div class="title"><b>{title}</b></div>',
                '<div class="price"><b>${price}</b></div>'       
            )
        }
        return this._contentTemplate;
    },
    getContent: function(record) {
        this._content = Ext.create("Ext.Panel", {
                cls: "content",
                layout: 'vbox',
                defaults: {
                    height: 47
                },
                style: 'margin-left: 0px;'
        });
        this._content.setHtml(this.getContentTemplate().apply(record.data));
        this._content.add(this.getSelector(record.data.color, record.data.size));
        return this._content;
    },
    getQty: function() {
        self = this;
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
        var options = Array();
        for(var i=1; i<11; i++){
            options.push({
                text: i, value: i
            });
        }
        var qty = Ext.create("Ext.Panel", {
            items: [
            {
                xtype: 'fieldset',
                layout: 'hbox',
                items: [
                {
                    html: 'Qty:',
                    width: 50,
                },
                {
                    xtype: 'selectfield',
                    itemId: 'selQty',
                    usePicker: true,
                    width: 50,
                    height: 40,
                    options: options,
                    baseCls: 'selectField',
                    inputCls: 'selectField-input',
                    listeners: {
                        initialize: function() {
                            this.setValue(1);
                        }
                    }
                }]
            }]
        })
        return qty; 
    },
    getColor: function(color) {
            var options=Array();
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            self = this;
            // options.push({text: 'Color', value: 'color'});
            for(var i = 0; i < color.length; i++)
            {   
                options.push({
                text: color[i], value: color[i]
                });

            }
            this._color = Ext.create("Ext.Panel", {
                items: [
                {  
                    xtype: 'fieldset',
                    layout: 'hbox',                   
                    items: [
                    {
                        html: 'Color:',
                        width: 50
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'selColor',
                        width: 50,
                        height: 40, 
                        usePicker: true,
                        baseCls: 'selectField',
                        inputCls: 'selectField-input',
                        options: options
                    }]  
                }]  
            }); 
        return this._color;         
    },
    getSize: function(size) {
            self = this; 
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            var options=Array();
            for(var i = 0; i < size.length; i++)
            {   options.push({
                text: size[i], value: size[i]
            });

            }
            this._size = Ext.create("Ext.Panel", {
                items: [
                {  
                    xtype: 'fieldset',
                    layout: 'hbox',
                    items: [
                    {
                        html: 'Size:',
                        width: 50,
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'selSize',
                        width: 50,
                        height: 40,
                        usePicker: true,
                        baseCls: 'selectField',
                        inputCls: 'selectField-input',
                        options: options
                    }]    
              }]  
            }); 
        return this._size;         
    },

    getSelector:function(color,size){
        this._selector = Ext.create("Ext.Panel", {
            layout: 'hbox',
            style: 'margin-left: 0px;'
        });
        if(color) {
            this._selector.add(this.getColor(color));
        }
        if(size) {
            this._selector.add(this.getSize(size));
        }
       this._selector.add(this.getQty());
        return this._selector;
    },
    getDescriptionTemplate: function() {
        if (!this._descriptionTemplate) {
            this._descriptionTemplate = new Ext.XTemplate(
                '<div class="desc">{desc}</div>'          
            )
        }
        return this._descriptionTemplate;
    },
    getDescription: function(record) {
        this._description = Ext.create("Ext.Panel", {
                cls: "content",
                layout: 'vbox',
                defaults: {
                    height: 47
                },
                style: 'margin-left: 0px;'
        });
        this._description.setHtml(this.getDescriptionTemplate().apply(record.data));
        return this._description;
    },
     getAddToCart: function(record){
        var _addtoCart = Ext.create('Ext.Button',{
            itemId: 'addtocart',
            text: 'ADD TO CART',
            ui: 'my-confirm',
            width: '95%',
            height: '35px',
            action:'addtocart',
            style:'margin-top:10px;',
            listeners: {
                painted: function() {
                    if(record.data.quantity) {
                        this.setText('In Cart');
                        this.setUi('my-info');
                    }
                }
            }                        
        })
        return _addtoCart;

    },

     getMoreDetailsLabel: function(){
        if (!this._moreDetailsLabel) {
            this._moreDetailsLabel = Ext.create("Ext.Container", {
                xtype: 'container',
                style: 'margin-top: 10px; margin-bottom: 10px;margin-left:8px; margin-right: 8px;',
                items: [
                {
                    html:'<div style="padding:2px;background-color:#bdc3c7;font-size:18px">More Details:</div>'
                }]
        });
        
    }
    return this._moreDetailsLabel;
},
    getMoreDetails: function(record) {
            this._moreDetails = Ext.create("Ext.Container", {
                layout: 'vbox'
            });
            if(record.data.color || record.data.size) {
                this.add(this.getMoreDetailsLabel());
            }
            if(record.data.color) {
                this._moreDetails.add(this.getColorDetails(record.data.color));
            }
            if(record.data.size) {
                this._moreDetails.add(this.getSizeDetails(record.data.size));
            }
            return this._moreDetails;
    },
    getColorDetails: function(color) {
        if(!this._colorDetails) {
            this._colorDetails = Ext.create("Ext.Container", {
                style: 'margin-right: 10px; margin-left: 3.5px;',
                items: [
                {
                    xtype: 'textfield',
                    itemId: 'colorfield',
                    label: 'Color',
                    readOnly: true,
                    labelCls: 'moredetail-label',
                    inputCls: 'moredetail-text',
                    height: 20,
                    value: color
                }]
            });
        }
        return this._colorDetails;
    },
    getSizeDetails: function(size) {
        if(!this._sizeDetails) {
            this._sizeDetails = Ext.create("Ext.Container", {
                style: 'margin-right: 10px; margin-left: 4px;',
                items: [
                {
                    xtype: 'textfield',
                    itemId: 'sizefield',
                    label: 'Size',
                    readOnly: true,
                    labelCls: 'moredetail-label',
                    inputCls: 'moredetail-text',
                    height: 50,
                    value: size
                }]
            });
        }
        return this._sizeDetails;
    },
   

     getShippingPaymentLabel: function(record){
        if (!this._shippingPaymentlabel) {
            this._shippingPaymentlabel = Ext.create("Ext.Container", {
                xtype: 'container',
                style: 'margin-top: 10px; margin-bottom: 10px;margin-left: 8px; margin-right: 8px;',
                items: [
                {
                    html:'<div style="padding:2px;background-color:#bdc3c7;font-size:18px">Shipping Info:</div>'
                }]
            });
        
        }
        return this._shippingPaymentlabel;
    },
    getShippingPayment: function(record) {
    if (!this._shippingPayment) {
            this._shippingPayment = Ext.create("Ext.Container",{
                style: 'margin-right: 10px; margin-left: 3.5px;',
                layout: 'vbox',
                items: [
                {
                    xtype: 'textfield',
                    label: 'Estimated Arrival',
                    readOnly: true,
                    value: '2 - 3 Days',
                    labelWrap: true,
                    labelCls: 'moredetail-label',
                    inputCls: 'moredetail-text',
                    height: 50,
                },
                {
                    xtype: 'textareafield',
                    label: 'Shipping Info',
                    labelWrap: true,
                    readOnly: true,
                    value: 'This item is in stock and ships immediately.',
                    labelCls: 'moredetail-label',
                    inputCls: 'moredetail-text',
                     height: 50,
                },
                {
                    xtype: 'textareafield',
                    label: 'Return Policy',
                    labelWrap: true,
                    maxRows: 1,
                    readOnly: true,
                    value: 'We will gladly accept returns for any reason within 14 days of receipt of delivery.',
                    labelCls: 'moredetail-label',
                    inputCls: 'moredetail-text',
                     height: 70,
                },
                {
                    xtype: 'textfield',
                    label: 'Availability',
                    labelWrap: true,
                    readOnly: true,
                    value: 'Ships to U.S.',
                    labelCls: 'moredetail-label',
                    inputCls: 'moredetail-text',
                }
                ]
            });
        }
        return this._shippingPayment;

   },
    getRecommendTemplate: function() {
        if (!this._recommendTemplate) {
            this._recommendTemplate = new Ext.XTemplate(
                '<div class="bythelook"><b>Recommend</b></div>'
            )
        }
        return this._recommendTemplate;
    },
    
    getRecommend: function(record) {
        if (!this._recommend) {
            this._recommend = Ext.create("Ext.Container", {
                style:'height: 50px;',
                cls: "content"
            });
            this._recommend.setHtml(this.getRecommendTemplate().apply(record.data));
        }
        return this._recommend;
    },
    getRecommendImagesTemplate: function() {
            if (!this._recommendImagesTemplate) {
            this._recommendImagesTemplate = new Ext.XTemplate(
                '<div class="productdetails">',
                '<div class="img" style="background-image: url(\'{image}\'); background-size: 110px 160px;"></div>',
                '<div><span style="float:left;color: black; font-size:1em;">${price}</span></div>',
                '</div>',
                '</div>' 
            )}
            return this._recommendImagesTemplate;
    },
    getRecommendImages: function(record){

        var store = this.getStore();
        if(record.data.bythelook) {
            Ext.Array.each(record.data.bythelook, function(product) {
            var product = Ext.create('Fallfor.model.Product', product);
            store.add(product);
            store.sync();                
            });
            var recommend = Ext.create('Ext.Container', {
            items: [
            {
                    xtype: 'dataview',
                    itemId: 'bythelookimages',
                    height: 250,
                    scrollable: 'horizontal',
                    inline: {
                        wrap: false
                    },
                    store: this.getStore(),
                    itemTpl: this.getRecommendImagesTemplate(),           
            }]

        });
        }      
        return recommend;
    },
});