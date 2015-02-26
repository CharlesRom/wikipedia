define(["modules/default/defaultcontroller"],function(a){function b(){}return b.prototype=$.extend(!0,{},a),b.prototype.moduleInformation={name:"Two dimensional list",description:"Display an array of data in 2 dimensions using a table",author:"Norman Pellet",date:"24.12.2013",license:"MIT",cssClass:"2d_list"},b.prototype.references={cell:{label:"Data of the cell",type:"object"},list:{label:"The array of data to display",type:"array"}},b.prototype.events={onHover:{label:"Hover a cell",refVariable:["cell"]},onClick:{label:"Click a cell",refVariable:["cell"],refAction:["cell"]}},b.prototype.variablesIn=["list"],b.prototype.actionsIn={addElement:"Add an element"},b.prototype.configurationStructure=function(){var a=this.module.model.getjPath();return{groups:{group:{options:{type:"list"},fields:{colnumber:{type:"text",default:5,title:"Number of columns"},valjPath:{type:"combo",title:"Value jPath",options:a},colorjPath:{type:"combo",title:"Color jPath",options:a},width:{type:"text",title:"Cell width"},height:{type:"text",title:"Cell height"}}}}}},b.prototype.configAliases={colnumber:["groups","group",0,"colnumber",0],colorjpath:["groups","group",0,"colorjPath",0],valjpath:["groups","group",0,"valjPath",0]},b});