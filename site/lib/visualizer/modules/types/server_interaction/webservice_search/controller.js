define(["modules/default/defaultcontroller","src/util/api","components/superagent/superagent","uri/URITemplate","src/util/debug","lodash"],function(Default,API,superagent,URITemplate,Debug,_){function Controller(){}return Controller.prototype=$.extend(!0,{},Default),Controller.prototype.moduleInformation={name:"Webservice search",description:"Performs a query to a server and returns the response",author:"Norman Pellet, Michaël Zasso",date:"29.07.2014",license:"MIT",cssClass:"webservice_search"},Controller.prototype.references={vartrigger:{label:"A variable to trigger the query"},varinput:{label:"A variable to add to the query"},results:{label:"Search results"},url:{label:"Lookup URL",type:"string"}},Controller.prototype.events={onSearchReturn:{label:"On search complete",refVariable:["results","url"],refAction:["results"]}},Controller.prototype.variablesIn=["vartrigger","url"],Controller.prototype.actionsIn={doSearch:"Trigger search",buttonColor:"Change button color"},Controller.prototype.configurationStructure=function(){return{groups:{group:{options:{type:"list"},fields:{url:{type:"text",title:"URL"},method:{type:"combo",title:"Query method",options:[{key:"GET",title:"GET"},{key:"POST",title:"POST"},{key:"PUT",title:"PUT"},{key:"DELETE",title:"DELETE"},{key:"HEAD",title:"HEAD"}],default:"POST"},dataType:{type:"combo",title:"Data type to send",options:[{key:"json",title:"JSON"},{key:"form",title:"Form data"}],default:"form"},showStatus:{type:"checkbox",title:"Show response status",options:{display:"Yes"}},button:{type:"checkbox",title:"Search button",options:{button:""},displaySource:{button:"b"}},buttonlabel:{type:"text",title:"Button text"},buttonlabel_exec:{type:"text",title:"Button text (executing)"},onloadsearch:{type:"checkbox",title:"Make one query on load",options:{button:""}},debounce:{type:"float",title:"Request debouncing",default:0},resultfilter:{type:"jscode",title:"Result data filter",default:"return data;"},askConfirm:{type:"checkbox",title:"Ask for confirmation",options:{yes:"Yes"},default:[],displaySource:{yes:"y"},displayTarget:["b"]},confirmText:{type:"jscode",mode:"html",title:"Confirmation text",default:"Are you sure?",displayTarget:["y"]}}},headers:{options:{type:"table",multiple:!0,title:"Request headers"},fields:{name:{type:"text",title:"Name"},value:{type:"text",title:"Value"}}},searchparams:{options:{type:"table",multiple:!0,title:"Form parameters"},fields:{name:{type:"text",title:"Parameter name"},destination:{type:"combo",title:"Destination",options:[{key:"url",title:"URL"},{key:"query",title:"Query string"},{key:"data",title:"Post data"}],default:"url"},label:{type:"text",title:"Field label"},defaultvalue:{type:"text",title:"Default value"},fieldtype:{type:"combo",title:"Field type",options:[{key:"text",title:"Text"},{key:"float",title:"Number"},{key:"textarea",title:"Textarea"},{key:"combo",title:"Combo"},{key:"checkbox",title:"Checkbox"}],default:"text"},fieldoptions:{type:"text",title:"Field options (a:b;)"}}}},sections:{postvariables:{options:{multiple:!1,title:"Variable parameters"},groups:{postvariables:{options:{type:"table",multiple:!0},fields:{name:{type:"text",title:"Parameter name"},destination:{type:"combo",title:"Destination",options:[{key:"url",title:"URL"},{key:"query",title:"Query string"},{key:"data",title:"Post data"}],default:"data"},variable:{type:"text",title:"Variable name"},filter:{type:"combo",title:"Filter",options:[{key:"none",title:"None"},{key:"value",title:"Only value"}],default:"none"}}}}}}}},Controller.prototype.configFunctions={button:function(a){return a.indexOf("button")>-1}},Controller.prototype.configAliases={button:["groups","group",0,"button",0],showStatus:["groups","group",0,"showStatus",0],url:["groups","group",0,"url",0],method:["groups","group",0,"method",0],searchparams:["groups","searchparams",0],buttonlabel:["groups","group",0,"buttonlabel",0],buttonlabel_exec:["groups","group",0,"buttonlabel_exec",0],onloadsearch:["groups","group",0,"onloadsearch",0,0],resultfilter:["groups","group",0,"resultfilter",0],postvariables:["sections","postvariables",0,"groups","postvariables",0],headers:["groups","headers",0],dataType:["groups","group",0,"dataType",0],debounce:["groups","group",0,"debounce",0],askConfirm:["groups","group",0,"askConfirm",0],confirmText:["groups","group",0,"confirmText",0]},Controller.prototype.initImpl=function(){this.queryValues={},this.urlValues={},this.dataValues={},this.method=this.module.getConfiguration("method")||"POST";for(var searchparams=this.module.getConfiguration("searchparams")||[],i=0;i<searchparams.length;i++)searchparams[i].name&&searchparams[i].defaultvalue&&this.addValue(searchparams[i],searchparams[i].defaultvalue);this.headers={};var headerList=this.module.getConfiguration("headers")||[];for(i=0;i<headerList.length;i++){var header=headerList[i];header.name&&header.value&&(this.headers[header.name]=header.value)}this.dataType=this.module.getConfiguration("dataType"),this.module.getConfiguration("resultfilter")?eval("this.module.resultfilter = function(data) { try { \n "+this.module.getConfiguration("resultfilter")+"\n } catch(_) { console.log(_); } }"):delete this.module.resultfilter;var debounce=this.module.getConfiguration("debounce");this.doSearch=this.debounce>0?this._doSearch:_.debounce(this._doSearch,debounce),this.module.getConfiguration("onloadsearch")&&this.doSearch(),this.resolveReady()},Controller.prototype.addValue=function(a,b){"function"==typeof b.resurrect&&(b=b.resurrect());var c="string"==typeof b;switch(a.destination){case"query":this.queryValues[a.name]=c?b:JSON.stringify(b);break;case"url":this.urlValues[a.name]=c?b:JSON.stringify(b);break;case"data":this.dataValues[a.name]=c?b:"form"===this.dataType?JSON.stringify(b):b}},Controller.prototype._doSearch=function(){for(var a=this,b=new URITemplate(this.module.view._url||this.module.getConfiguration("url")),c=this.module.getConfiguration("postvariables",[]),d=0,e=c.length;e>d;d++){var f=API.getVar(c[d].variable).getData();if(f){var g,h=f.getType();"string"===h||"number"===h||"boolean"===h?g=f.get():"value"===c[d].filter?(g=f.get(),g.resurrect&&(g=g.resurrect())):g=f.resurrect(),this.addValue(c[d],g)}}this.url=b.expand(this.urlValues),this.request&&this.request.abort&&this.request.abort(),this.request=superagent(this.method,this.url),this.request.set(this.headers).query(this.queryValues).send(this.dataValues).type(this.dataType),this.module.view.lock(),this.request.end(function(b,c){if(b)Debug.warn("Webservice search: request failed",b),a.module.view.showError();else{a.module.getConfigurationCheckbox("showStatus","display")&&a.module.view.showSuccess(c.status);var d=c.body;null==d&&(d=c.text),a.module.resultfilter&&(d=a.module.resultfilter(d)),a.onSearchDone(d)}a.module.view.unlock()})},Controller.prototype.onSearchDone=function(a){this.module.model._data=a,this.createDataFromEvent("onSearchReturn","results",a),this.createDataFromEvent("onSearchReturn","url",this.url),this.sendAction("results",a,"onSearchReturn")},Controller});