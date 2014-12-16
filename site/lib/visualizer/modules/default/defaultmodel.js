define(["src/main/entrypoint","src/util/datatraversing","src/util/api","src/util/debug","src/util/util"],function(a,b,c,d,e){return{setModule:function(a){this.module=a},init:function(){this.module.model=this,this.data={},this.triggerChangeCallbacksByRels={},this.mapVars(),this.resetListeners(),this.initImpl()},initImpl:function(){this.resolveReady()},inDom:e.noop,resetListeners:function(){this.sourceMap=null,this.mapVars(),c.getRepositoryActions().unListen(this.getActionNameList(),this._actionlisten);for(var a=this.getVarNameList(),b=0,d=a.length;d>b;b++)c.getVar(a[b]).listen(this.module,this.onVarChange.bind(this));this._actionlisten=c.getRepositoryActions().listen(this.getActionNameList(),this.onActionTrigger.bind(this))},mapVars:function(){var a=this.module.vars_in(),b=[],c=[],d={};if(Array.isArray(a))for(var e=a.length,f=e-1;f>=0;f--)b.push(a[f].name),c.push(a[f].rel),d[a[f].name]=a[f];this.sourceMap=d,this.listNames=b,this.listRels=c},getVarNameList:function(){return this.listNames},getActionNameList:function(){var a,b,c=this.module.actions_in(),d=[];if(!c)return d;for(b=c.length,a=b-1;a>=0;a--)d.push(c[a].name);return d},onVarChange:function(a){var b,c,e,f,g,h=this,i=a.getName();this.stopVarChange&&this.stopVarChange(),this.module.onReady().then(function(){h.module.blankVariable(i)});var j,k=new Promise(function(a,b){var c=setTimeout(a,500);j=function(){clearTimeout(c),h.module.endLoading(i),b()}});Promise.all([this.module.onReady(),k]).then(function(){h.module.startLoading(i)},function(){}),Promise.all([this.module.onReady(),a.onReady()]).then(function(){var k=a.getValue();if(!(i&&h.sourceMap&&h.sourceMap[i]&&h.module.controller.references[h.sourceMap[i].rel]))return j();var l=h.buildData(k,h.module.controller.references[h.sourceMap[i].rel].type);if(!l)return j();g=h.module.getDataRelFromName(i),b=0,c=g.length,e=0;var m=h.module.vars_in();for(j(),f=m.length;f>e;e++)m[e].name==i&&h.module.view.update[m[e].rel]&&null!==k&&!function(a){new Promise(function(b,c){m[a].filter?require([m[a].filter],function(a){return a.filter?a.filter(k,b,c):void c("No filter function defined")}):b(k)}).then(function(b){h.setData(m[a].rel,i,b),h.removeAllChangeListeners(m[a].rel),h.module.view.update[m[a].rel].call(h.module.view,b,i)},function(a){d.error("Error while filtering the data",a)})["catch"](function(a){d.error("Error while updating module",a)})}(e)},function(){j()})["catch"](function(a){j(),d.error("Error while updating variable",a)})},onActionTrigger:function(a,b){var c=this.module.getActionRelFromName(b[0]);this.module.view.onActionReceive&&this.module.view.onActionReceive[c]&&this.module.view.onActionReceive[c].call(this.module.view,a,b)},buildData:function(a,b){if(!a)return!1;var c={};if(!b)return a;Array.isArray(b)||(b=[b]);var d=a.getType(),e=!1;if(0==b.length)return a;for(var f=0;f<b.length;f++)if(b[f]==d)return a;return e?c:!1},getValue:function(){return this.data},setData:function(a,b,c){this.data[a]||(this.data[a]={}),this.data[a][b]=c},getData:function(a,b){return this.data[a]?this.data[a][b]:void 0},getAllDataFromRel:function(a){return this.data[a]},getjPath:function(a,b){return this._getjPath(a,b)},_getjPath:function(a,c){var d=this.module.getDataFromRel(a);return d&&void 0!==c&&(d=d.getChildSync(c)),b.getJPathsFromElement(d)},resolveReady:function(){this.module._resolveModel()},dataListenChange:function(a,b,c){if(a){var e=this,f=function(c,d){d!=e.module.getId()&&b.call(a,c)};this.addChangeListener(c,a,f)?a.onChange(f):(d.setDebugLevel(1),d.error("Adding the change callback is forbidden as no rel has been defined ! Aborting callback binding to prevent leaks"))}},dataTriggerChange:function(a){a.triggerChange(!1,[this.module.getId()])},dataSetChild:function(a,b,c){return a.setChild(b,c,this.module.getId())},dataSetChildSync:function(a,b,c){return a.setChildSync(b,c,this.module.getId())},addChangeListener:function(a,b,c){return a?-1===this.listRels.indexOf(a)?!1:(this.triggerChangeCallbacksByRels[a]=this.triggerChangeCallbacksByRels[a]||[],this.triggerChangeCallbacksByRels[a].push({data:b,callback:c}),!0):!1},removeAllChangeListeners:function(a){if(this.triggerChangeCallbacksByRels[a])for(var b=0,c=this.triggerChangeCallbacksByRels[a].length;c>b;b++)this.removeChangeListener(this.triggerChangeCallbacksByRels[a][b].data,this.triggerChangeCallbacksByRels[a][b].callback)},removeChangeListener:function(a,b){a.unbindChange(b)}}});