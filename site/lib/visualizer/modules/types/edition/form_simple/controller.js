define(["modules/default/defaultcontroller","lib/formcreator/formcreator","src/util/datatraversing"],function(a,b,c){function d(){}function e(a){var b={},c=a.sections.main[0].groups.main[0];for(var d in c)b[d]=f(c[d]);return b}function f(a){return 1===a.length?a[0]:a}return d.prototype=$.extend(!0,{},a),d.prototype.moduleInformation={name:"Simple Form",description:"A simple module allowing one to display a form in the module",author:"Norman Pellet, Michaël Zasso",date:"01.09.2014",license:"MIT",cssClass:"form_simple"},d.prototype.references={input_object:{label:"Input object",type:"object"},output_object:{type:"object",label:"Output object"},formatted_output:{type:"object",label:"Formatted output object"}},d.prototype.events={onChange:{label:"Form has changed",refVariable:["output_object","formatted_output"],refAction:["output_object","formatted_output"]},formTriggered:{label:"Form is triggered",refAction:["output_object"],refVariable:["output_object","formatted_output"]}},d.prototype.variablesIn=["input_object"],d.prototype.configurationStructure=function(){var a=[],d=this.module.getDataFromRel("input_object");return d&&(d=d.get(),c.getJPathsFromElement(d,a)),{sections:{structure:b.makeConfig({jpaths:a,name:"Fill with"}),trigger:{options:{title:"Trigger"},groups:{trigger:{options:{type:"list"},fields:{triggerType:{type:"combo",title:"Trigger type",options:[{key:"btn",title:"Button"},{key:"change",title:"On change"}],displaySource:{btn:"btn",change:"change"}},buttonLabel:{type:"text",title:"Button label",default:"OK",displayTarget:["btn"]},debounce:{type:"float",title:"Debounce",default:0,displayTarget:["change"]}}}}},formdata:{options:{title:"Form data"},groups:{formdata:{options:{type:"list",multiple:!1},fields:{replaceEntryVar:{type:"checkbox",title:"Replace entry variable",options:{replace:""}}}}}},template:{options:{title:"Template"},groups:{template:{options:{type:"list",multiple:!1},fields:{file:{type:"text",title:"Template file"},html:{type:"jscode",title:"HTML template",mode:"html",default:'<span class="form-dyn" data-form-content="field:name:label"></span>\n<div class="form-dyn" data-form-content="field:name:dom"></div>'}}}}}}}},d.prototype.configFunctions={replaceObj:function(a){return"replace"==a}},d.prototype.configAliases={structure:["sections","structure"],tpl_file:["sections","template",0,"groups","template",0,"file",0],tpl_html:["sections","template",0,"groups","template",0,"html",0],trigger:["sections","trigger",0,"groups","trigger",0,"triggerType",0],debounce:["sections","trigger",0,"groups","trigger",0,"debounce",0],replaceObj:["sections","formdata",0,"groups","formdata",0,"replaceEntryVar",0,0],btnLabel:["sections","trigger",0,"groups","trigger",0,"buttonLabel",0]},d.prototype.valueChanged=function(a){if(this.module.getConfiguration("replaceObj"))this.setVarFromEvent("onChange","output_object","input_object",[]),this.sendAction("output_object",a,"onChange");else{var b=e(a);this.createDataFromEvent("onChange","formatted_output",b),this.createDataFromEvent("onChange","output_object",a),this.sendAction("formatted_output",b,"onChange")}},d.prototype.formTriggered=function(a){this.sendAction("formValue",a,"formTriggered")},d});