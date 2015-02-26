define(["modules/default/defaultcontroller","src/util/datatraversing","src/util/util"],function(a,b,c){function d(){}return d.prototype=$.extend(!0,{},a),d.prototype.moduleInformation={name:"Self-organizing map",description:"Display the result of a SOM analysis",author:"Michaël Zasso",date:"01.12.2014",license:"MIT"},d.prototype.references={model:{label:"The SOM model"},dataset:{label:"Projected dataset",type:"chart"},element:{label:"Dataset element"},elementList:{label:"Lists of dataset elements"},cellInfo:{label:"Cell information"},coords:{label:"Coordinates"}},d.prototype.events={onCellHover:{label:"Hover a cell",refVariable:["elementList","cellInfo"]},onElementHover:{label:"Hover a dataset element",refVariable:["element","coords"]}},d.prototype.variablesIn=["model","dataset"],d.prototype.onElementHover=function(a,b,c){this.createDataFromEvent("onElementHover","coords",[a,b]),this.createDataFromEvent("onElementHover","element",c)},d.prototype.onCellHover=function(a){var b=a.pos.x,c=a.pos.y,d=this.module.model.getAllDataFromRel("dataset"),e={};for(var f in d){var g=d[f].getChildSync(["data",0]);e[f]=[];for(var h=0,i=g.x.length;i>h;h++)Math.floor(g.x[h])===b&&Math.floor(g.y[h])===c&&e[f].push(g.info[h])}this.createDataFromEvent("onCellHover","elementList",e),this.createDataFromEvent("onCellHover","cellInfo",{x:b,y:c,info:a.info})},d.prototype.configurationStructure=function(){var a,d,e=[],f=this.module.getDataFromRel("model");if(f){var g=f.options.fields;if(0|g)for(a=0;g>a;a++)e.push({key:a,title:a});else for(a=0,d=g.length;d>a;a++)e.push({key:g[a].name,title:g[a].name})}var h=[],i=this.module.model.getAllDataFromRel("dataset");if(i)for(a in i)h.push({key:a,title:a});var j=[],k=this.module.getDataFromRel("dataset");if(k){var l=k.getChildSync(["data","0","info","0"]);b.getJPathsFromElement(l,j)}return{sections:{background:{options:{title:"Background (grid)",multiple:!1},groups:{group:{options:{type:"list"},fields:{colorType:{type:"combo",title:"Color type",options:[{key:"fixed",title:"Fixed color"},{key:"range",title:"Color range"},{key:"inter",title:"RGB interpolation"}],default:"fixed",displaySource:{inter:"i0",fixed:"f0",range:"r0"}},colorSpace:{type:"combo",title:"Color space",options:[{key:"rgb",title:"RGB"},{key:"hsl",title:"HSL"},{key:"hsv",title:"HSV"},{key:"lab",title:"CIELab"},{key:"lch",title:"CIELCH"}],default:"rgb",displayTarget:["r0"]},color1:{type:"spectrum",title:"Color",default:[255,255,255,1],displayTarget:["i0","r0","f0"]},color2:{type:"spectrum",title:"Color 2",default:[0,0,0,1],displayTarget:["i0","r0"]},field1:{type:"combo",title:"Field for color 1",options:e,default:e[0]?e[0].key:"",displayTarget:["r0","i0"]},field2:{type:"combo",title:"Field for color 2",options:e,default:e[1]?e[1].key:"",displayTarget:["i0"]},field3:{type:"combo",title:"Field for color 3",options:e,default:e[2]?e[2].key:"",displayTarget:["i0"]}}}}},dataset:{options:{title:"Dataset",multiple:!0},groups:{group:{options:{type:"list"},fields:{dataset:{type:"combo",title:"Variable",options:h},colorType:{type:"combo",title:"Color type",options:[{key:"fixed",title:"Fixed color"},{key:"range",title:"Color range"},{key:"inter",title:"RGB interpolation"},{key:"jpath",title:"Color jpath"}],default:"fixed",displaySource:{inter:"i0",fixed:"f0",range:"r0",jpath:"j0"}},colorSpace:{type:"combo",title:"Color space",options:[{key:"rgb",title:"RGB"},{key:"hsl",title:"HSL"},{key:"hsv",title:"HSV"},{key:"lab",title:"CIELab"},{key:"lch",title:"CIELCH"}],default:"rgb",displayTarget:["r0"]},color1:{type:"spectrum",title:"Color",default:[255,0,0,1],displayTarget:["i0","r0","f0"]},color2:{type:"spectrum",title:"Color 2",default:[0,0,0,1],displayTarget:["i0","r0"]},jpath1:{type:"combo",title:"jpath for color 1",options:j,extractValue:c.jpathToArray,insertValue:c.jpathToString,displayTarget:["r0","i0","j0"]},jpath2:{type:"combo",title:"jpath for color 2",options:j,extractValue:c.jpathToArray,insertValue:c.jpathToString,displayTarget:["i0"]},jpath3:{type:"combo",title:"jpath for color 3",options:j,extractValue:c.jpathToArray,insertValue:c.jpathToString,displayTarget:["i0"]}}}}}}}},d.prototype.configAliases={bgType:["sections","background",0,"groups","group",0,"colorType",0],bgColor1:["sections","background",0,"groups","group",0,"color1",0],bgColor2:["sections","background",0,"groups","group",0,"color2",0],bgSpace:["sections","background",0,"groups","group",0,"colorSpace",0],bgField1:["sections","background",0,"groups","group",0,"field1",0],bgField2:["sections","background",0,"groups","group",0,"field2",0],bgField3:["sections","background",0,"groups","group",0,"field3",0],datasets:["sections","dataset"]},d});