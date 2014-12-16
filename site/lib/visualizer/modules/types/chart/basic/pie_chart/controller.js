define(["modules/default/defaultcontroller","src/util/datatraversing","src/util/api"],function(a,b,c){function d(){}return d.prototype=$.extend(!0,{},a),d.prototype.moduleInformation={moduleName:"Pie chart",description:"Display a pie chart based on flot",author:"",date:"07.01.2014",license:"MIT",cssClass:"pie_chart"},d.prototype.events={onHover:{label:"Hover a piece of pie",refVariable:["piece"]}},d.prototype.onHover=function(a){a&&this.setVarFromEvent("onHover",a,"piece")},d.prototype.references={chart:{type:["chart"],label:"A json describing a chart"},yArray:{type:"array",label:"1D Y array"}},d.prototype.elementHover=function(a){a&&(this._highlighted&&c.highlight(this._highlighted,0),c.highlight(a,1),this._highlighted=a)},d.prototype.elementOut=function(){this._highlighted&&c.highlight(this._highlighted,0)},d.prototype.variablesIn=["chart","yArray"],d.prototype.configurationStructure=function(){return{groups:{group:{options:{type:"list"},fields:{nodeType:{type:"combo",title:"Node Type","default":"circle",options:[{title:"Circle",key:"circle"},{title:"Triangle",key:"triangle"},{title:"Square",key:"squqre"},{title:"Star",key:"star"},{title:"Ellipse",key:"ellipse"},{title:"Rectangle",key:"rectangle"},{title:"Image",key:"image"}]},nodeSize:{type:"text",title:"Default node size"},nodeColor:{type:"color",title:"Default node color"},labelSize:{type:"text",title:"Default label size"},labelColor:{type:"color",title:"Default label color"},edgeWidth:{type:"text",title:"Default edge width"},edgeColor:{type:"color",title:"Default edge color"},strokeWidth:{type:"text",title:"Background line width"},strokeColor:{type:"color",title:"Background line color"}}}}}},d.prototype.configAliases={nodeType:["groups","group",0,"nodeType",0],nodeSize:["groups","group",0,"nodeSize",0],nodeColor:["groups","group",0,"nodeColor",0],labelSize:["groups","group",0,"labelSize",0],labelColor:["groups","group",0,"labelColor",0],edgeWidth:["groups","group",0,"edgeWidth",0],edgeColor:["groups","group",0,"edgeColor",0],strokeWidth:["groups","group",0,"strokeWidth",0],strokeColor:["groups","group",0,"strokeColor",0]},d});