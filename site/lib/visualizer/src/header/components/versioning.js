define(["jquery","src/header/components/default","src/util/versioning","forms/button","src/util/util"],function(a,b,c,d,e){function f(){for(var a=["view","data"],b=0;b<a.length;b++)!function(b){var f=0==b?c.getView():c.getData(),g=0==b?c.getViewHandler():c.getDataHandler();h[a[b]].copyToLocal=new d("Copy to local",function(){g.serverCopy(f)},{color:"red"}),h[a[b]].snapshotLocal=new d("Snapshot",function(){g.localSnapshot(f)},{color:"blue"}),h[a[b]].autosaveLocal=new d("Autosave",function(a,b,c){g.localAutosave(b,function(){return f},function(){c.children().find("span").remove();var a=new Date;a=e.pad(a.getHours())+":"+e.pad(a.getMinutes()),c.children().append("<span> ("+a+")</span>")})},{checkbox:!0,color:"blue"}),h[a[b]].branchLocal=new d("Make branch",function(){require(["forms/formfactory","src/util/ui","forms/button"],function(a,b,c){var d=b.dialog({width:"80%",title:"Make branch"});d.parent().css("zIndex",1e4),a.newform(d,{sections:{cfg:{config:{multiple:!1,title:"Branch name"},groups:{general:{config:{type:"list"},fields:[{type:"Text",name:"name",multiple:!1,title:"Name"}]}}}}},function(a){var b=new c("Save",function(){a.dom.trigger("stopEditing");var b=a.getValue();g.localBranch(f,b.cfg[0].general[0].name[0]),a.getDom().dialog("close")});b.setColor("blue"),a.addButtonZone(b)})})},{color:"blue"}),h[a[b]].revertLocal=new d("Revert head",function(){g.localRevert(f)},{color:"blue"}),h[a[b]].localToServer=new d("Push to server",function(a,b,c){g.serverPush(f).done(function(){c.children().find("span").remove();var a=new Date;a=e.pad(a.getHours())+":"+e.pad(a.getMinutes()),c.children().append("<span> ("+a+")</span>")})},{color:"green"})}(b);return h}function g(){}var h={view:{},data:{}};return e.inherits(g,b,{getReady:function(){if(this.$_elToOpen)return this.$_elToOpen;this.$_elToOpen=a("<div />").attr("id","visualizer-dataviews"),this._ready=!0,f();var b=this.$_elToOpen;b.append("<h1>Data</h1>"),b.append(h.data.copyToLocal.render()),b.append(h.data.localToServer.render()),b.append(h.data.snapshotLocal.render()),b.append(h.data.autosaveLocal.render()),b.append(h.data.branchLocal.render()),b.append(h.data.revertLocal.render());var d=a('<div class="ci-dataview-path"><label>Data path : </label></div>');b.append(d);var e=a("<div />").appendTo(d);e.append(c.getDataHandler().getDom()),b.append("<br /><br />"),b.append("<h1>View</h1>"),b.append(h.view.copyToLocal.render()),b.append(h.view.localToServer.render()),b.append(h.view.snapshotLocal.render()),b.append(h.view.autosaveLocal.render()),b.append(h.view.branchLocal.render()),b.append(h.view.revertLocal.render());var d=a('<div class="ci-dataview-path"><label>View path : </label></div>');b.append(d);var e=a("<div />").appendTo(d);e.append(c.getViewHandler().getDom()),this._versionDiv=b,c.getViewHandler().updateButtons=this.updateButtons,c.getViewHandler().doUpdateButtons(),c.getDataHandler().updateButtons=this.updateButtons,c.getDataHandler().doUpdateButtons()},updateButtons:function(a,b,c){h[a].autosaveLocal&&("head"!==b||"local"!==c?h[a].autosaveLocal.disable():h[a].autosaveLocal.enable(),"local"==c?(h[a].copyToLocal.disable(),h[a].snapshotLocal.enable(),h[a].branchLocal.enable(),"head"==b?h[a].revertLocal.disable():h[a].revertLocal.enable()):(h[a].copyToLocal.enable(),h[a].snapshotLocal.disable(),h[a].branchLocal.disable(),h[a].revertLocal.disable()))},_onClick:function(){this.getReady();this.setStyleOpen(this._open),this._open?this.open():this.close()}}),g});