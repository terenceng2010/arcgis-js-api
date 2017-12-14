// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/Collection","../../core/Evented","../../core/HandleRegistry","../../core/Logger","../../core/watchUtils","./ListItem","./support/layerListUtils","dojo/debounce","dojo/has","../../core/accessorSupport/decorators"],function(t,e,i,n,o,r,s,a,c,p,l,u,d,h,m){var y="esri.widgets.LayerList.LayerListViewModel",f=c.getLogger(y),_=h("dojo-debug-messages"),v={map:"map",view:"view",layers:"layers",listItems:"list-items"},g="hide",w=r.ofType(l),I=function(t){function e(e){var i=t.call(this)||this;return i._actionsOpenMap=new Map,i._itemOpenMap=new Map,i._handles=new a,i.listItemCreatedFunction=null,i.operationalItems=new w,i.view=null,i._handles.add(p.init(i,"view",function(){return i._viewHandles()}),v.view),i._compileList=d(i._compileList,0),i}return i(e,t),e.prototype.destroy=function(){this._handles.destroy(),this._handles=null,this.view=null,this.operationalItems.removeAll()},Object.defineProperty(e.prototype,"createActionsFunction",{get:function(){return this._get("createActionsFunction")||null},set:function(t){_&&f.warn('"createActionsFunction" is deprecated, use "listItemCreatedFunction" instead'),this._set("createActionsFunction",t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){var t=this.get("view"),e=this.get("view.ready");return e?"ready":t?"loading":"disabled"},enumerable:!0,configurable:!0}),e.prototype.triggerAction=function(t,e){t&&this.emit("trigger-action",{action:t,item:e})},e.prototype._createMapHandles=function(t){var e=this;this._handles.remove(v.map);var i=t&&t.get("map.layers");if(i){var n=i.on("change",function(){return e._compileList(t)});this._handles.add(n,v.map)}},e.prototype._resetMapItems=function(t){this._actionsOpenMap.clear(),this._itemOpenMap.clear(),this._createMapHandles(t),this._compileList(t)},e.prototype._setUpChildActions=function(t){var e=this;t.forEach(function(t){return e._setupActions(t)})},e.prototype._watchItemProperties=function(t){var e=this;this._handles.add([p.watch(t,"actionsOpen",function(i){e._actionsOpenMap.set(t.layer,i)}),p.watch(t,"open",function(i){e._itemOpenMap.set(t.layer,i)}),t.children.on("change",function(){e._setUpChildActions(t.children)})],v.listItems)},e.prototype._modifyListItemChildren=function(t){var e=this;t.forEach(function(t){return e._modifyListItem(t)})},e.prototype._modifyListItem=function(t){if("function"==typeof this.listItemCreatedFunction){var e={item:t};this.listItemCreatedFunction.call(null,e)}this._modifyListItemChildren(t.children)},e.prototype._setupActions=function(t){if("function"==typeof this.createActionsFunction){var e={item:t},i=this.createActionsFunction.call(null,e);i&&i.length&&(t.actionsSections=i)}this._setUpChildActions(t.children)},e.prototype._createListItem=function(t){var e=!!this._actionsOpenMap.get(t),i=!!this._itemOpenMap.get(t),n=new l({actionsOpen:e,open:i,layer:t,view:this.view});return this._setupActions(n),this._watchItemProperties(n),this._modifyListItem(n),n},e.prototype._compileList=function(t){var e=this;if(!this.destroyed){this._handles.remove(v.listItems);var i=t&&t.get("map.layers"),n=[];i&&i.forEach(function(i){p.watch(i,"listMode",function(){return e._compileList(t)});var o=u.findLayerListMode(i);if(o!==g){var r=e._createListItem(i);n.unshift(r)}}),this.operationalItems.removeAll(),this.operationalItems.addMany(n)}},e.prototype._viewHandles=function(){var t=this,e=this.view;this._handles.remove(v.layers),this._resetMapItems(e),e&&e.when(function(){t._handles.add([p.init(e,"map",function(){return t._resetMapItems(e)}),e.layerViews.on("change",function(){return t._compileList(e)}),p.init(t,"createActionsFunction",function(){return t._compileList(e)}),p.init(t,"listItemCreatedFunction",function(){return t._compileList(e)})],v.layers)})},n([m.property()],e.prototype,"createActionsFunction",null),n([m.property()],e.prototype,"listItemCreatedFunction",void 0),n([m.property({type:w})],e.prototype,"operationalItems",void 0),n([m.property({dependsOn:["view.ready"],readOnly:!0})],e.prototype,"state",null),n([m.property()],e.prototype,"view",void 0),n([m.property()],e.prototype,"triggerAction",null),e=n([m.subclass(y)],e)}(m.declared(o,s));return I});