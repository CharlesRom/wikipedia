define(["modules/default/defaultview","src/util/util","components/jquery/jquery-migrate.min","lib/biojs-1.0/src/main/javascript/Biojs.js","lib/biojs-1.0/src/main/javascript/Biojs.Tooltip.js","lib/biojs-1.0/src/main/javascript/Biojs.Sequence.js"],function(a,b){function c(){}return console.log("jquery: ",jQuery.fn.jquery),c.prototype=$.extend(!0,{},a,{init:function(){this.dom||(this._id=b.getNextUniqueId(),this.dom=$(' <div id="'+this._id+'"></div>').css("height","100%").css("width","100%"),this.module.getDomContent().html(this.dom),this.resolveReady())},blank:function(){this.dom.empty()},inDom:function(){var a=this,b="METLCQRLNVCQDKILTHYENDSTDLRDHIDYWKHMRLECAIYYKAREMGFKHINHQVVPTLAVSKNKALQAIELQLTLETIYNSQYSNEKWTLQDVSLEVYLTAPTGCIKKHGYTVEVQFDGDICNTMHYTNWTHIYICEEAojs SVTVVEGQVDYYGLYYVHEGIRTYFVQFKDDAEKYSKNKVWEVHAGGQVILCPTSVFSSNEVSSPEIIRQHLANHPAATHTKAVALGTEETQTTIQRPRSEPDTGNPCHTTKLLHRDSVDSAPILTAFNSSHKGRINCNSNTTPIVHLKGDANTLKCLRYRFKKHCTLYTAVSSTWHWTGHNVKHKSAIVTLTYDSEWQRDQFLSQVKIPKTITVSTGFMSI";console.log("init sequence");var c=new Biojs.Sequence({sequence:b,target:this.dom.attr("id"),format:"CODATA",id:"P918283",annotations:[{name:"CATH",color:"#F0F020",html:"Using color code #F0F020 ",regions:[{start:122,end:135}]},{name:"TEST",html:"<br> Example of <b>HTML</b>",color:"green",regions:[{start:285,end:292},{start:293,end:314,color:"#2E4988"}]}],highlights:[{start:30,end:42,color:"white",background:"green",id:"spin1"},{start:139,end:140},{start:631,end:633,color:"white",background:"blue"}]});c.onSelectionChange(function(b){console.log(b),a.module.controller.onSequenceSelectionChanged(b)})},onResize:function(){if(this.webgl){this.onReady.done(function(){})}},update:{"function":function(){}},getDom:function(){return this.dom}}),c});