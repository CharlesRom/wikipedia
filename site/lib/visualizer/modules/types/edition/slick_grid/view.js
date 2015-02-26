require.config({paths:{dragevent:"components/slickgrid/lib/jquery.event.drag-2.2",dropevent:"components/slickgrid/lib/jquery.event.drop-2.2",slickcore:"components/slickgrid/slick.core",slickgrid:"modules/types/edition/slick_grid/slick.grid",slickdataview:"modules/types/edition/slick_grid/slick.dataview.custom",slickgroupitemmetadataprovider:"modules/types/edition/slick_grid/slick.groupitemmetadataprovider.custom"},shim:{dragevent:["jquery"],dropevent:["jquery"],slickcore:["jquery-ui/core","jquery-ui/sortable"],slickgrid:["slickcore","dragevent","dropevent","components/slickgrid/plugins/slick.cellrangedecorator","components/slickgrid/plugins/slick.cellrangeselector","components/slickgrid/plugins/slick.cellselectionmodel","components/slickgrid/plugins/slick.rowselectionmodel","components/slickgrid/slick.formatters","modules/types/edition/slick_grid/slick.editors.custom"],slickdataview:["lodash","slickgrid","slickgroupitemmetadataprovider"],slickgroupitemmetadataprovider:["slickgrid"]}}),define(["require","modules/default/defaultview","src/util/debug","lodash","src/util/util","src/util/api","src/util/typerenderer","slickgrid","slickdataview"],function(a,b,c,d,e,f,g){function h(){}function i(){return"..."}function j(){return'<div style="width:100%; height: 100%; display: table-cell"><a class="recycle-bin"></a></div>'}function k(a,b,c,d){if(!c.__group){this.module.data.traceSync([b]);var e=g.toScreen(c,this.module,{},d.jpath);e.always(function(b){$(a).html(b),e.build&&e.build()})}}var l=[];l.push(e.loadCss("./components/slickgrid/slick.grid.css"));var m=Promise.all(l),n={},o=0,p={typerenderer:i,"slick.text":Slick.Formatters.Text,"slick.percent":Slick.Formatters.PercentComplete,"slick.percentbar":Slick.Formatters.PercentCompleteBar,"slick.yesno":Slick.Formatters.YesNoSelect},q={boolean:Slick.Editors.Checkbox,mf:Slick.Editors.TextValue,color:Slick.Editors.ColorValue,string:Slick.Editors.TextValue,number:Slick.Editors.TextValue,DataString:Slick.Editors.SpecialNativeObject,DataNumber:Slick.Editors.DataNumberEditor,DataBoolean:Slick.Editors.DataBooleanEditor};h.prototype=$.extend(!0,{},b,{init:function(){var a=this;this.$dom||(this._id=e.getNextUniqueId(),this.$dom=$("<div>").attr("id",this._id).css({width:"100%",height:"100%"}),this.$rowHelp=$("<div>").attr("class","rowHelp"),this.module.getDomContent().html(this.$rowHelp),this.module.getDomContent().append(this.$dom)),this.$dom.on("mouseleave",function(){a.module.controller.lastHoveredItemId=null}),this.slick={},this.colConfig=this.module.getConfiguration("cols"),this.idPropertyName="_sgid",this.resolveReady()},getSlickColumns:function(){function a(a){var c,d=e.module.data.get(0).getChildSync(a);return c=d instanceof DataString?Slick.Editors.SpecialNativeObject:d instanceof DataNumber?Slick.Editors.DataNumberEditor:d instanceof DataBoolean?Slick.Editors.DataBooleanEditor:q[b(a)]}function b(a){var b,c=e.module.data.get(0).getChildSync(a);return c instanceof DataObject&&(b=c.type),b}var e=this,f=$.proxy(k,this),g=this.colConfig.map(function(d){var g,h;return"auto"===d.editor&&e.module.data?e.module.data.length?(g=a(d.jpath),h=b(d.jpath)):(g=Slick.Editors.SpecialNativeObject,c.warn("Slick grid: using editor based on type when the input variable is empty. Cannot determine type")):(g=q[d.editor],h=d.editor),{id:d.name,name:d.name,field:d.name,width:+d.width||void 0,minWidth:+d.minWidth||void 0,maxWidth:+d.maxWidth||void 0,resizable:!0,selectable:!0,focusable:!0,sortable:!0,defaultSortAsc:!0,editor:g,formatter:p[d.formatter],asyncPostRender:"typerenderer"===d.formatter?f:void 0,jpath:d.jpath,simpleJpath:1===d.jpath.length,dataType:h}});if(g=d.filter(g,function(a){return a.name}),d.isEmpty(g)){for(var h=[],i=0;i<e.module.data.length;i++)h=d(h).push(d.keys(e.module.data[i])).flatten().uniq().value();g=d(h).filter(function(a){return"_"!==a[0]}).map(function(c){return{id:c,name:c,field:c,resisable:!0,selectable:!0,focusable:!0,sortable:!1,editor:a([c]),dataType:b([c]),jpath:[c],formatter:p.typerenderer,asyncPostRender:f}}).value()}return this.module.getConfigurationCheckbox("slickCheck","rowDelete")&&g.unshift({id:"rowDeletion",width:30,field:"rowDeletion",selectable:!1,resizable:!1,focusable:!1,sortable:!1,formatter:j}),g},getSlickOptions:function(){var a=this;return{editable:a.module.getConfigurationCheckbox("slickCheck","editable"),enableAddRow:a.module.getConfigurationCheckbox("slickCheck","enableAddRow"),enableCellNavigation:a.module.getConfigurationCheckbox("slickCheck","enableCellNavigation"),autoEdit:a.module.getConfigurationCheckbox("slickCheck","autoEdit"),enableTextSelectionOnCells:!0,enableColumnReorder:!0,forceFitColumns:a.module.getConfigurationCheckbox("slickCheck","forceFitColumns"),multiColumnSort:!0,asyncEditorLoading:!0,asyncEditorLoadDelay:30,enableAsyncPostRender:!0,asyncPostRenderDelay:0,defaultColumnWidth:a.module.getConfiguration("slick.defaultColumnWidth")||80,dataItemColumnValueExtractor:function(a){return a},explicitInitialization:!0,rowHeight:a.module.getConfiguration("slick.rowHeight"),showHeaderRow:a.module.getConfigurationCheckbox("slickCheck","filterColumns"),headerRowHeight:30}},inDom:function(){},update:{list:function(a){function b(a){for(var b in n)if(void 0!==b&&""!==n[b]){var c=e.slick.data.getIdxById(a[e.idPropertyName]),f=e.grid.getColumns()[e.grid.getColumnIndex(b)],g=d.clone(f.jpath);if(g.unshift(c),!e.module.data.getChildSync(g)||!e.module.data.getChildSync(g).get().toString().match(n[b]))return!1}return!0}var e=this;this.module.data=a,this._highlights=d.pluck(this.module.data,"_highlight"),e.dataObjectsDone=!1,this.slick.columns=this.getSlickColumns(),this.slick.options=this.getSlickOptions(),this.generateUniqIds(),this.addRowAllowed=this.module.getConfigurationCheckbox("slickCheck","enableAddRow"),m.then(function(){return e.cssLoaded}).then(function(){e.slick.groupItemMetadataProvider=new Slick.Data.GroupItemMetadataProvider,e.slick.data=new Slick.Data.DataView({groupItemMetadataProvider:e.slick.groupItemMetadataProvider}),e.slick.data.setModule(e.module),e.$dom=$("#"+e._id),e.grid=new Slick.Grid("#"+e._id,e.slick.data,e.slick.columns,e.slick.options),e.grid.registerPlugin(e.slick.groupItemMetadataProvider),e.grid.setSelectionModel("row"===e.module.getConfiguration("slick.selectionModel")?new Slick.RowSelectionModel:new Slick.CellSelectionModel),e._activateHighlights(),e.grid.module=e.module,e.module.getConfigurationCheckbox("slickCheck","oneUncollapsed")&&e.slick.groupItemMetadataProvider.onGroupExpanded.subscribe(function(a,b){this.getData().collapseAllGroups(b.item.level),this.getData().expandGroup(b.item.groupingKey)}),e.slick.data.onRowCountChanged.subscribe(function(){e.grid.updateRowCount(),e.grid.render()}),e.slick.data.onRowsChanged.subscribe(function(a,b){e.grid.invalidateRows(b.rows),e.grid.render()}),e.grid.onAddNewRow.subscribe(function(){e.module.model.dataTriggerChange(e.module.data),e._resetDeleteRowListeners()}),e.grid.onViewportChanged.subscribe(function(){setTimeout(function(){e.lastViewport=e.grid.getViewport(),e._resetDeleteRowListeners(),e._jpathColor()},300),e.lastViewport=e.grid.getViewport(),e.module.getConfigurationCheckbox("slickCheck","rowNumbering")&&(e.$rowHelp.html((e.lastViewport.bottom-(e.addRowAllowed?2:1)).toString()+"/"+e.grid.getDataLength()),e.$rowHelp.fadeIn(),clearTimeout(e.lastRowHelp),e.lastRowHelp=setTimeout(function(){e.$rowHelp.fadeOut()},1e3)),e._jpathColor()}),e.grid.onMouseEnter.subscribe(function(a){e._hl&&f.highlightId(e._hl,0),e.count=void 0===e.count?0:e.count,e.count++,e.hovering=!0;var b=e._getItemInfoFromEvent(a);if(b){var c=b.item._highlight;e._hl=c,c&&(console.log("highlight id"),f.highlightId(c,1),r=c),e.module.controller.onHover(b.idx,b.item)}}),e.grid.onMouseLeave.subscribe(function(a){e._e=a,e.count--,e.hovering=!1;var b=e._getItemInfoFromEvent(a);if(b){var c=b.item._highlight;c?f.highlightId(c,0):r&&f.highlightId(r,0)}}),e.grid.onColumnsResized.subscribe(function(){for(var a=e.grid.getColumns(),b=0;b<a.length;b++)e.module.definition.configuration.groups.cols[0][b].width=a[b].width;e.grid.invalidate()}),e.grid.onCellChange.subscribe(function(a,b){var c=e._getItemInfoFromRow(b.row);c&&e.module.controller.onRowChange(c.idx,c.item)}),e.grid.onClick.subscribe(function(a,b){var c=e.grid.getColumns(),d=e._getItemInfoFromRow(b.row);d&&c[b.cell]&&"rowDeletion"!==c[b.cell].id&&e.module.controller.onClick(d.idx,d.item)}),e.grid.onActiveCellChanged.subscribe(function(a,b){e.lastActiveCell=b.cell,e.lastActiveRow=b.row;var c=e.grid.getColumns(),d=e._getItemInfoFromRow(b.row);d&&c[b.cell]&&"rowDeletion"!==c[b.cell].id&&e.module.controller.onActive(d.idx,d.item)}),e.grid.onColumnsReordered.subscribe(function(){var a=e.grid.getColumns(),b=e.module.definition.configuration.groups.cols[0],f=d.pluck(b,"name"),g=d.pluck(a,"id");if(f.concat().sort().join()!==g.concat().sort().join())return void c.warn("Something might be wrong, number of columns in grid and in configuration do not match");e.module.definition.configuration.groups.cols[0]=[];for(var h=0;h<a.length;h++){var i=f.indexOf(g[h]);i>-1&&e.module.definition.configuration.groups.cols[0].push(b[i])}}),e.grid.onSort.subscribe(function(a,b){e._makeDataObjects();var c=e.slick.data.getItems(),d=0;for(d=0;d<c.length;d++)c[d].__elementPosition=d;var f;for(f=b.sortCols?b.sortCols:[{sortCol:b.sortCol,sortAsc:b.sortAsc}],d=f.length-1;d>=0;d--)!function(a){var b=function(b,c){var d=b.getChildSync(f[a].sortCol.jpath).get(),e=c.getChildSync(f[a].sortCol.jpath).get();return e>d?-1:d>e?1:b.__elementPosition-c.__elementPosition};e.slick.data.sort(b,f[a].sortAsc)}(d);for(d=0;d<c.length;d++)delete c[d].__elementPosition;e._jpathColor()}),$(e.grid.getHeaderRow()).delegate(":input","change keyup",function(){var a=$(this).data("columnId");null!=a&&(n[a]=$.trim($(this).val()),e.slick.data.refresh())}),e.grid.onHeaderRowCellRendered.subscribe(function(a,b){$(b.node).empty(),$("<input type='text'>").css("width","100%").data("columnId",b.column.id).val(n[b.column.id]).appendTo(b.node)}),e.grid.init(),e.slick.data.beginUpdate();var a=d.chain(e.module.getConfiguration("groupings")).filter(function(a){return a&&a.groupName&&a.getter?!0:!1}).map(function(a){var b={};return a.getter&&a.getter.length>1?(b.getter=function(b){return b.getChildSync(a.getter)},e._makeDataObjects()):b.getter=a.getter[0],b.formatter=function(b){return a.groupName+": "+b.value+"  <span style='color:green'>("+b.count+" items)</span>"},b.aggregateCollapsed=!1,b.lazyTotalsCalculation=!0,b}).value();a.length&&(e.slick.data.setGrouping(a),e.module.getConfigurationCheckbox("slickCheck","collapseGroup")&&e.slick.data.collapseAllGroups(0)),e.module.getConfigurationCheckbox("slickCheck","filterColumns")&&e.slick.data.setFilter(b),e.slick.data.setItems(e.module.data,e.idPropertyName),e.slick.data.endUpdate(),e.lastViewport&&!e.module.getConfigurationCheckbox("slickCheck","backToTop")&&e.grid.scrollRowToTop(e.lastViewport.top),d.isUndefined(e.lastActiveRow)||e.module.getConfigurationCheckbox("slickCheck","forgetLastActive")||e.grid.setActiveCell(e.lastActiveRow,e.lastActiveCell),e.grid.render(),e._resetDeleteRowListeners(),e._setBaseCellCssStyle(),e.lastViewport=e.grid.getViewport(),e._jpathColor()})}},blank:{list:function(){this.$dom.html("")}},_setBaseCellCssStyle:function(){var a=this.grid.getColumns();this.baseCellCssStyle={};for(var b=0;b<a.length;b++)this.baseCellCssStyle[a[b].id]="highlighted-cell"},_resetDeleteRowListeners:function(){var a=this,b=a.$rb=$("#"+a._id).find("a.recycle-bin");b.off("click"),b.on("click",function(b){var c=a.grid.getColumns(),d=a._checkCellFromEvent(b);if(a.lastViewport=a.grid.getViewport(),c[d.cell]&&"rowDeletion"===c[d.cell].id){var e=a._getItemInfoFromRow(d.row);a.module.data.splice(e.idx,1),a.module.data.triggerChange()}})},_checkCellFromEvent:function(a){var b=this.grid.getCellFromEvent(a);return b.row>=this.module.data.length?null:b},_getItemInfoFromEvent:function(a){var b=this,c=this.grid.getCellFromEvent(a);if(!c)return null;var d=b.slick.data.mapRowsToIds([c.row])[0];return d?{id:d,idx:b.slick.data.getIdxById(d),item:b.slick.data.getItemById(d)}:null},_getItemInfoFromRow:function(a){var b=this;if(d.isUndefined(a))return null;var c=b.slick.data.mapRowsToIds([a])[0];return c?{id:c,idx:b.slick.data.getIdxById(c),item:b.slick.data.getItemById(c)}:null},_jpathColor:function(){var a=this;if(a.lastViewport){var b=a.module.getConfiguration("colorjPath"),c=a.grid.getColumns();if(b&&b.length>0){a._makeDataObjects();for(var d=a.lastViewport.top;d<=a.lastViewport.bottom;d++){var e=a.grid.getDataItem(d);if(e){var f=e.getChildSync(b);if(f)for(var g=0;g<c.length;g++){var h=a.grid.getCellNode(d,g);$(h).css("background-color",f.get())}}}}}},_selectHighlight:function(){if(!this.hovering){var a=this,b=d.findIndex(this._highlights,function(b){return b===a._highlighted[0]||b.indexOf&&b.indexOf(a._highlighted[0])>-1});if(this.lastViewport=this.grid.getViewport(),b>-1){var c=a.slick.data.getItemByIdx(b),e=a.slick.data.mapIdsToRows([c[a.idPropertyName]])[0];if(!e)return;(e<this.lastViewport.top||e>=this.lastViewport.bottom)&&this.grid.scrollRowToTop(e)}}},_drawHighlight:function(){var a=this;this.grid.removeCellCssStyles("highlight");var b={};this._selectHighlight(),this.lastViewport=this.grid.getViewport();for(var c=this.lastViewport.top;c<=this.lastViewport.bottom;c++){var e=this.grid.getDataItem(c);e&&d.any(a._highlighted,function(a){var b=e._highlight;return b instanceof Array||(b=[b]),b.indexOf(a)>-1})&&(b[c]=a.baseCellCssStyle)}this.grid.setCellCssStyles("highlight",b)},_activateHighlights:function(){var a=this,b=d(this.module.data).pluck("_highlight").flatten().filter(function(a){return!d.isUndefined(a)}).value();a._highlighted=[],f.killHighlight(this.module.getId());for(var c=0;c<b.length;c++)!function(c){f.listenHighlight({_highlight:b[c]},function(b,c){!c instanceof Array&&(c=[c]),a._highlighted=b?d(a._highlighted).push(c).flatten().uniq().value():d.filter(a._highlighted,function(a){return-1===c.indexOf(a)}),a._drawHighlight()},!1,a.module.getId())}(c)},_makeDataObjects:function(){if(!this.dataObjectsDone){for(var a=0;a<this.module.data.length;a++)this.module.data[a]=DataObject.check(this.module.data[a]);this.dataObjectsDone=!0}},onResize:function(){this.grid&&this.grid.resizeCanvas(),this.$rowHelp.css({bottom:0})},getNextIncrementalId:function(){return++o},generateUniqIds:function(){if(this.module.data)for(var a=0;a<this.module.data.length;a++)this.module.data[a][this.idPropertyName]||Object.defineProperty(this.module.data[a],this.idPropertyName,{value:"id_"+ ++o,writable:!1,configurable:!1,enumerable:!1})},exportToTabDelimited:function(){var a,b,c=this.grid.getColumns(),d="",e=[];for(a=0;a<c.length;a++)e.push(c[a].name||"");for(d+=e.join("	")+"\r\n",a=0;a<this.module.data.length;a++){for(e=[],b=0;b<c.length;b++){var f=c[b].jpath;f=f.slice(0),f.unshift(a);var g=this.module.data.getChildSync(f,!1);g=g?g.get():"","string"==typeof g&&(g=g.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")),e.push(g)}d+=e.join("	")+"\r\n"}return d},onActionReceive:{hoverRow:function(a){var b;if(b=d.isNumber(a)||a instanceof DataNumber?this.module.data[a]:a,b&&b[this.idPropertyName]){var c=this.slick.data.mapIdsToRows([b[this.idPropertyName]])[0],e=this.slick.data.getIdxById(b[this.idPropertyName]);this.module.controller.onHover(e,b),this.grid.scrollRowToTop(c)}},selectRow:function(a){var b;if(b=d.isNumber(a)||a instanceof DataNumber?this.module.data[a]:a,b&&b[this.idPropertyName]){var c=this.slick.data.mapIdsToRows([b[this.idPropertyName]])[0],e=this.slick.data.getIdxById(b[this.idPropertyName]);this.module.controller.onClick(e,b),d.isUndefined(c)||(this.grid.scrollRowToTop(c),this.grid.setActiveCell(c,0))}}}});var r="";return h});