define([require,"../../field"],function(a,b){var c=function(a){this.name=a};return c.prototype=new b,c.prototype.getOptions=function(a){return a.getOptions()||this.options.options},c});