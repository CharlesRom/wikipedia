define(["modules/default/defaultcontroller"],function(a){function b(){}return b.prototype=$.extend(!0,{},a),b.prototype.moduleInformation={name:"X Nav",description:"X Nav",author:"Norman Pellet",date:"9.12.2014",license:"MIT",cssClass:"xnav"},b.prototype.references={xcoords:{label:"X Coords"}},b.prototype.events={onMove:{label:"Move",description:"",refVariable:["xcoords"],refAction:["xcoords"]}},b.prototype.move=function(a){this.createDataFromEvent("onMove","xcoords",a),this.sendAction("xcoords",a,"onMove")},b.prototype.variablesIn=["xcoords"],b.prototype.actionsIn={changeX:"Change X center value"},b.prototype.configurationStructure=function(){return{groups:{group:{options:{type:"list"},fields:{step:{type:"float",title:"Step",default:"1"}}}}}},b.prototype.configFunctions={},b.prototype.configAliases={step:["groups","group",0,"step",0]},b});