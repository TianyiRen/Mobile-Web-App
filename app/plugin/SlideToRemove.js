/*
Plugin: Ext.plugin.SlideToRemove
Version: 1.3.0
Tested: Sencha Touch 2.2
Author: OhmzTech (www.ohmztech.com)
*/

Ext.define('Ext.plugin.SlideToRemove', {
    extend: 'Ext.Component',
    alias: 'plugin.slidetoremove',

    config: {
        list: null,
        removeText: 'D',
        buttonWidth: '10%',
        removeAction:null
    },
    
    init: function(list) {
        this.setList(list);
        list.on({
            itemswipe: this.showDelete,
            itemtouchstart: this.checkDeletes, 
            hide: this.closeDeletes,
            scope: this
        });
    },

    showDelete: function(view, index, target, rec, e) {
        var element = (!target.dom ? target.innerElement : target);    
        

        if (e.direction == 'left' && element.down('.x-list-item-remove') === null) {
            Ext.DomHelper.append(element,'<div class="x-list-delete-comp"></div>');
            var button = this.createButton(element,rec);
            button.show({
                type: 'slide',
                duration: 10                            
            });      
        } else if (e.direction == 'right' && element.down('.x-list-item-remove')) {
            this.hideDelete(element.down('.x-list-item-remove'));
        }
    },

    hideDelete: function(n) {
        Ext.Anim.run(Ext.get(n), 'slide', {
            out: true,
            duration: 100,
            autoClear: false,
            direction: 'right',
            after: function(el) {
                var parentEl = el.up('.x-list-delete-comp');
                Ext.getCmp(el.getId()).destroy();
                parentEl.destroy();
            }
        });
    },

    closeDeletes: function(view) {
        Ext.DomQuery.select('div[class*=x-list-delete]', view.element.dom).forEach(function(node) {
            node.parentNode.style.removeProperty('-webkit-transform');
            node.parentNode.removeChild(node);
        });
    },
    
    checkDeletes: function(view,index,target,rec,e) {
        if(Ext.get(e.target).hasCls('x-button')) {
            view.suspendEvents();
        } 
    },
    
    createButton: function(element,record) {
            var self = this;
            return Ext.create('Ext.Button', {
                iconCls: 'trash',
                height: 2,
                margin: 1,
                width: this.getButtonWidth()-25,
                bottom: ((element.getHeight() - parseInt(element.getStyle('min-height'))) / 2-20),
                right: 5,
                hidden: true,
                style: {
                    'z-index': 10,
                    //'-webkit-box-shadow': '-15px 0px 15px -2px white'
                },
                showAnimation: {
                    type: 'slide',
                    duration: 100
                },
                renderTo: element.down('.x-list-delete-comp'),
                handler: function(btn,e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var removeAction = self.getRemoveAction();
                    removeAction(record,btn,e)
                    Ext.Function.createDelayed(function(){
                        this.getList().resumeEvents(false);
                        btn.hide();
                    },350,this)();
                },
                scope: this
            });       
    }
});