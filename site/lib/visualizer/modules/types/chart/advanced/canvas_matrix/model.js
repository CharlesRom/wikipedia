define(["modules/default/defaultmodel","src/util/datatraversing"],function(a,b){function c(){}function d(a){if(null==a)return[];var c=[];return b.getJPathsFromElement(a,c),c}return c.prototype=$.extend(!0,{},a,{getValue:function(){return this.dataValue},getjPath:function(a,b){var c=this.module.getDataFromRel("matrix");if(c&&(c=c.value))switch(a){case"row":return c=c.yLabel[0],d(c,b);case"col":return c=c.xLabel[0],d(c,b);case"intersect":return c=c.data[0][0],d(c,b);default:return!1}}}),c});