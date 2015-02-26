requirejs.config({shim:{"components/leaflet/dist/leaflet":{exports:"L",init:function(){return this.L.noConflict()}}}}),define(["modules/default/defaultview","src/util/util","src/util/api","src/util/color","components/leaflet/dist/leaflet","components/leaflet-omnivore/leaflet-omnivore.min"],function(a,b,c,d,e,f){function g(){this.mapID=b.getNextUniqueId()}function h(a){return new m({marker:a,iconAnchor:a.center})}function i(a){var b=this.options=$.extend({},i.defaultOptions,a);switch(this.div=$("<div>"),this.kind=b.kind,b.kind){case"image":this.div=$('<img src="'+b.img+'">');break;case"circle":this.div.css("border-radius",b.size);default:this.div.css("background",b.color)}this.div.css({width:this.width,height:this.height})}function j(a){var b=a.feature.properties||{},d=this;this.module.data=b;var f;if(a instanceof e.Marker){var g={};b instanceof DataObject&&$.extend(g,b.getChildSync(this.markerjpath));var j=new i(g);f=h(j),a.setIcon(f)}c.listenHighlight(b,function(b){b?a instanceof e.Marker?f._marker.highlight(!0):a.setStyle({color:"#ff3300"}):a instanceof e.Marker?f._marker.highlight(!1):a.setStyle(a.feature&&a.feature.properties&&a.feature.properties.style?a.feature.properties.style:{color:"#0033ff"})},!1,this.module.getId()),a.addEventListener({mouseover:function(){d.module.controller.hoverElement(b)},click:function(){d.module.controller.clickElement(b)},mouseout:function(){c.highlight(b,0)}},this)}function k(a){this.mapLayers.hasOwnProperty(a)&&(this.mapLayers[a].clearLayers(),delete this.mapLayers[a]),this.mapBounds.hasOwnProperty(a)&&delete this.mapBounds[a],this.updateFit()}function l(a){return Math.floor(1e3*a)}b.loadCss("components/leaflet/dist/leaflet.css");var m=e.Icon.extend({createIcon:function(){this._marker=this.options.marker;var a=this._marker.div[0];return this._setIconStyles(a,"icon"),a},createShadow:function(){return null}});return i.defaultOptions={size:30,color:"rgba(1,1,1,0.5)",kind:"circle"},i.setDefaultOptions=function(a){$.extend(i.defaultOptions,a)},i.prototype={highlight:function(a){a?"image"===this.kind&&this.options.imgHighlight?this.div.attr("src",this.options.imgHighlight):this.div.css("border","solid"):"image"===this.kind&&this.options.imgHighlight?this.div.attr("src",this.options.img):this.div.css("border","none")},get center(){return"image"===this.kind?[this.width/2,this.height]:[this.width/2,this.height/2]},get width(){return this.options.width||this.options.height||this.options.size},get height(){return this.options.height||this.options.width||this.options.size}},g.prototype=$.extend(!0,{},a,{init:function(){this.mapLayers={},this.mapBounds={},this.dom=$('<div id="'+this.mapID+'"></div>').css({height:"100%",width:"100%"}),this.module.getDomContent().html(this.dom),c.killHighlight(this.module.getId()),i.setDefaultOptions({kind:this.module.getConfiguration("markerkind"),color:d.getColor(this.module.getConfiguration("markercolor")),size:parseInt(this.module.getConfiguration("markersize")),img:"components/leaflet/dist/images/marker-icon.png",imgHighlight:"modules/types/chart/maps/leaflet/marker-icon-red.png"}),this.markerjpath=this.module.getConfiguration("markerjpath")},inDom:function(){function a(){return c?void(c=!1):(b.module.controller.moveAction.call(b),void b.module.controller.zoomAction.call(b))}this.dom.empty();var b=this;this.map=e.map(this.mapID,{zoomAnimation:!1}),this.getTileLayer().addTo(b.map);var c=!0;this.map.on("drag",b.module.controller.moveAction,b),this.map.on("zoomend",a);var d,f=[46.522117,6.566144],g=this.module.getConfiguration("mapcenter");d=g?Promise.resolve(g):new Promise(function(a){window.navigator&&window.navigator.geolocation?navigator.geolocation.getCurrentPosition(function(b){a([b.coords.latitude,b.coords.longitude])},function(){a(f)}):a(f)}),d.then(function(a){var c=b.module.getConfiguration("mapzoom")||10;b.map.setView(a,c),b.resolveReady()})},blank:{geojson:k,csv:k,kml:k,gpx:k,wkt:k,topojson:k},update:{position:function(a){2===a.length&&this.map.setView(e.latLng(a[0],a[1]))},geojson:function(a,b){try{var c=a.get(),d=e.geoJson(c,{style:function(a){return a.properties&&a.properties.style}});this.addGeoJSON(d,b)}catch(a){}this.updateFit(b)},csv:function(a,b){try{this.addGeoJSON(f.csv.parse(a.get()),b)}catch(a){}this.updateFit(b)},kml:function(a,b){try{this.addGeoJSON(f.kml.parse(a.get()),b)}catch(a){}this.updateFit(b)},gpx:function(a,b){try{this.addGeoJSON(f.gpx.parse(a.get()),b)}catch(a){}this.updateFit(b)},wkt:function(a,b){try{this.addGeoJSON(f.wkt.parse(a.get()),b)}catch(a){}this.updateFit(b)},topojson:function(a,b){try{this.addGeoJSON(f.topojson.parse(a.get()),b)}catch(a){}this.updateFit(b)}},addGeoJSON:function(a,b){a.addTo(this.map),this.mapLayers[b]=a,this.mapBounds[b]=new e.LatLngBounds;var c=this;a.eachLayer(function(a){j.call(c,a),c.mapBounds[b].extend(a.getBounds?a.getBounds():a.getLatLng())})},updateFit:function(a){var b,c=this.module.getConfiguration("autofit");if("var"===c)b=this.mapBounds[a];else if("all"===c){b=new e.LatLngBounds;for(var d in this.mapBounds)b.extend(this.mapBounds[d])}b&&b.isValid()&&this.map.fitBounds(b)},onResize:function(){this.map.invalidateSize()},onActionReceive:{position:function(a){var b=this.map.getCenter();(l(a[0])!==l(b.lat)||l(a[1])!==l(b.lng))&&this.map.setView(e.latLng(a[0],a[1]))},zoom:function(a){var b=this.map.getMinZoom(),c=this.map.getMaxZoom();b>a?a=b:a>c&&(a=c),a!==this.map.getZoom()&&this.map.setZoom(a)}},getTileLayer:function(){var a=this.module.getConfiguration("maptiles")||"osm",b={parameters:{}};switch(a){case"hb":b.template="http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png";break;case"osm":default:b.template="http://{s}.tile.osm.org/{z}/{x}/{y}.png",b.parameters.attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}return e.tileLayer(b.template,b.parameters)}}),g});