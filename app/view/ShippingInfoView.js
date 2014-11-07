Ext.define('Fallfor.view.ShippingInfoView', {
    extend: 'Ext.Container',
    xtype: 'shippinginfoview',
    requires: [
    'Ext.TitleBar',
    'Ext.form.*',
    'Ext.field.*',
    'Ext.Button',
    'Ext.TabPanel',
    'Ext.dataview.List',
    'Ext.form.FieldSet',
    'Fallfor.store.Cart',
    'Fallfor.store.Countries'
    ],
    config: {
        fullscreen: true,
        layout: 'vbox',
        cls: "productdetails",
        hidden: true,
        title: 'Shipping Infomation',
        hideAnimation: {
            type: "slideOut",
            direction: "right",
            duration: 200
        },
        enablePaging: false,
        autoLoad: false,
        autoDestroy: false,
        proxy: {}
    }, //end of config
    
    initialize: function() {
        this.create();
    },

    updateRecord: function() {
        this.removeAll(false);
        this.create();
    },

    create: function() {
        this.removeAll(false);
        this.add(this.getHeader());
        var store = Ext.getStore("Addresses");
        if(Fallfor.utils.Global.getHasAddress()) {
            var docked_panel_bottom = this.getDockedPanelBottom();
            var docked_panel_top = this.getDockedPanelTop();
            docked_panel_top.add(this.getChooseAddressLabel());
            docked_panel_bottom.add(this.getAddNewAddressLabel());
            docked_panel_bottom.add(this.getAddNewAddress());
            var list = this.getAddresses();
            list.add(docked_panel_top)
            list.add(docked_panel_bottom);
            this.add(list);
        }
        else {
            this.add(this.getAddNewAddress());
        }
        this.add(this.getNextStep());
        

    },
    getDockedPanelBottom: function(){
        if(!this._dockedpanelBottom){
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._dockedpanelBottom = Ext.create("Ext.Panel", {
                docked:'bottom',
                scrollDock:'bottom',
                layout: 'vbox',
                height: width*1.01,
            });

        }
        return this._dockedpanelBottom;
    },
    getDockedPanelTop: function(){
        if(!this._dockedpanelTop){
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._dockedpanelTop = Ext.create("Ext.Panel", {
                docked:'top',
                scrollDock:'top',
                layout: 'vbox',
            });
        }
        return this._dockedpanelTop;
    },
    getHeader: function(){
        if(!this._header){
            this._header = Ext.create('Ext.TitleBar',{
                docked: 'top',
                title: 'Shipping Infomation',
                items: [
                    {
                        xtype:'button',
                        iconCls: 'back',
                        ui: "plain",
                        align: 'left',
                        action: "go-back",
                    }    
                ]
            });
        }
        return this._header

    },
    getChooseAddressLabel: function() {
        if(!this._chooseAddressLabel) {
            this._chooseAddressLabel = Ext.create("Ext.Container", {
                style: '',
                cls: 'content',
                items: [{
                    html: '<div style="padding:2px; background-color:#bdc3c7;font-size:18px">Choose A Shipping Address</div>'
                }
                ]
            });
        }
        return this._chooseAddressLabel;

    },
    getAddresses: function() {
        if (!this._addresses) {
            this._addresses = Ext.create("Ext.dataview.List", {
                cls: 'grid',
                mode: "simple",
                flex: 1,
                store: 'Addresses',
                itemTpl: this.getItemTemplate(),
            });
        }
        return this._addresses;
    },

    getAddNewAddressLabel: function() {
        if(!this._newAddressLabel) {
            this._newAddressLabel = Ext.create("Ext.Container", {
                style: '',
                cls: 'content',
                items: [{
                    html: '<div style="padding:2px; background-color:#bdc3c7;font-size:18px">Add New Address</div>'
                }
                ]
            });
        }    
        return this._newAddressLabel;
    },

     getItemTemplate: function() {
        if (!this._itemTemplate) {  
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
            this._itemTemplate = new Ext.XTemplate(
                '<div class="address">',
                '<div> <b>{address}</b> </div>',
                '<div> {address2} </div>',
                '<div> {city},&nbsp;{state}&nbsp;{zip_code}</div>',
                '<div><span style="float:center;"><button type="button">Ship Here</button></span></div>',
                '</div>'
                )
            }
            return this._itemTemplate;
        },
    getAddNewAddress: function() {
        var newAddr = Ext.create('Ext.Container', {
            xtype: 'container',
            layout: 'fit',
            flex: 1,
            items: this.getShippingInfoForm()
        });
        return newAddr;
    },
    getShippingInfoForm:function(){
        if(!this._shippingInfoForm) {
            alert("Form!")
            this._shippingInfoForm = Ext.create('Ext.Container', {
                title: 'Add New Address',
                xtype: 'container',
                layout: 'fit',
                items: [
                {
                    itemId: 'shippingInfoForm',
                    xtype: 'formpanel',
                    styleHtmlContent: true,
                    layout:{
                        pack: 'center'
                    },
                    scrollable: false,
                    items: [
                    {
                        xtype: 'fieldset',
                        style:'margin-bottom:10px;',
                        items: [
                            {
                                xtype: 'textfield',
                                store: 'Users',
                                itemId: 'user_name_shippinginfo',
                                name : 'user_name',
                                label: 'Name*'
                            },
                            {
                                xtype: 'selectfield',
                                label: 'Country*',
                                id: 'selCountry',
                                usePicker: true, 
                                store: 'Countries',
                                displayField: 'name',
                                valueField: 'id'
                            },
                            {
                                xtype: 'textfield',
                                name : 'address',
                                label: 'Address 1*'
                            },
                            {
                                xtype: 'textfield',
                                name : 'address2',
                                label: 'Address 2'
                            },
                            {
                                xtype: 'textfield',
                                name: 'city',
                                label: 'City*'
                            },
                            {
                                xtype: 'textfield',
                                name: 'state',
                                label: 'State*'
                            },
                            {
                                xtype: 'textfield',
                                name: 'zip_code',
                                label: 'Zipcode*'
                            }
                        ]
                    }]
                }]
            });
        }
       
        
        return this._shippingInfoForm;
    },
    getNextStep: function() {
        var form = Ext.ComponentQuery.query('#shippingInfoForm')[0];
        console.log(form.getValues());
        var nextStepButton = Ext.create('Ext.Container', {
            layout: 'fit',
            items: [
            {
                itemId: 'addNewAddress',
                xtype: 'button',
                text: 'Next Step',
                ui: 'my-info',
                width: '96%',
                action: 'addNewAddress'
            }]
        });
        return nextStepButton;
    }


});
