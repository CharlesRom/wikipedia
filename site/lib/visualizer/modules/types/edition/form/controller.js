define(["modules/default/defaultcontroller","lib/formcreator/formcreator"],function(a){function b(){}return b.prototype=$.extend(!0,{},a),b.prototype.moduleInformation={moduleName:"Form",description:"A complex module allowing one to display a templated form in the module",author:"Norman Pellet",date:"24.12.2013",license:"MIT",cssClass:"form"},b.prototype.references={},b.prototype.events={},b.prototype.variablesIn=[],b.prototype.configurationStructure=function(){return{sections:{structure:{options:{title:"Form structure"},groups:{group:{options:{type:"list"},fields:{json:{type:"textarea",title:"Form structure"}}}}},template:{options:{title:"Template"},groups:{template:{options:{type:"list",multiple:!1},fields:{file:{type:"text",title:"Template file"},html:{type:"textarea",title:"HTML template"}}}}}}}},b.prototype.configAliases={structure:["sections","structure",0,"groups","group",0,"json",0],tpl_file:["sections","template",0,"groups","template",0,"file",0],tpl_html:["sections","template",0,"groups","template",0,"html",0]},b});