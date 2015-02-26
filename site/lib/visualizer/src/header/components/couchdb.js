define(["jquery","src/header/components/default","src/util/versioning","forms/button","src/util/util","lib/couchdb/jquery.couch","fancytree","components/ui-contextmenu/jquery.ui-contextmenu.min"],function(a,b,c,d,e){function f(){}function g(b){var c;switch(b){case 10:c="Colons are not allowed in the name.";break;case 11:c="Please select a folder";break;case 12:c="A folder with this name already exists.";break;case 401:c="Wrong username or password.";break;case 409:c="Conflict. An entry with the same name already exists.";break;case 503:c="Service Unavailable.";break;default:c="Unknown error."}a("#"+this.cssId("error")).text(c).show().delay(3e3).fadeOut()}function h(a){for(var b={data:{__folder:!0},view:{__folder:!0}},c={data:{__folder:!0},view:{__folder:!0}},d=0,e=a.length;e>d;d++){var f=a[d],g=f.id.split(":");g.shift(),"data"===g.shift()?i(b.data,g,f):i(b.view,g,f)}return c.data=k(b.data,""),c.view=k(b.view,""),c}function i(a,b,c){if(0===b.length)j(a,c);else{a.__folder=!0;var d=b.shift();a[d]||(a[d]={}),i(a[d],b,c)}}function j(a,b){a.__name=b.id,a.__rev=b.value.rev}function k(a,b){var c,d;b.length?c=d=[]:(d=[{key:"root",title:"root",folder:!0,children:[]}],c=d[0].children,b="root:");for(var e in a)if("__folder"!==e&&"__name"!==e&&"__rev"!==e){var f=a[e],g=b+e,h={title:e,key:g};f.__folder?(f.__name&&c.push({id:f.__name,lazy:!0,title:e,key:g,lastRev:f.__rev}),h.folder=!0,h.children=k(f,g+":")):(h.lazy=!0,h.id=f.__name,h.lastRev=f.__rev),c.push(h)}return d}function l(b){return a("#"+this.cssId(b)).val().trim()}return e.inherits(f,b,{initImpl:function(){this.ok=this.loggedIn=!1,this.id=e.getNextUniqueId(),this.options.url&&(a.couch.urlPrefix=this.options.url.replace(/\/$/,""));var b=this.options.database||"visualizer";this.database=a.couch.db(b),this.showError=a.proxy(g,this),this.getFormContent=a.proxy(l,this),this.checkDatabase()},checkDatabase:function(){var b=this;a.couch.info({success:function(){b.ok=!0},error:function(a,b,c){console.error("CouchDB header : database connection error. Code:"+a+".",c)}})},cssId:function(a){return"ci-couchdb-header-"+this.id+"-"+a},_onClick:function(){this.ok?(this.setStyleOpen(this._open),this._open?(this.createMenu(),this.open()):this.close()):(this.checkDatabase(),console.error("CouchDB header : unreachable database."))},createMenu:function(){if(this.$_elToOpen)return void this.$_elToOpen.html(this.loggedIn?this.getMenuContent():this.getLoginForm());var b=this;this.$_elToOpen=a("<div>"),this.errorP=a('<p id="'+this.cssId("error")+'" style="color: red;">'),a.couch.session({success:function(a){null===a.userCtx.name?b.$_elToOpen.html(b.getLoginForm()):(b.loggedIn=!0,b.username=a.userCtx.name,b.$_elToOpen.html(b.getMenuContent()))}})},load:function(a,b,d){var e={};e[a.toLowerCase()]={url:this.database.uri+b.data.id+(d?"?rev="+d:"")},c.switchView(e,!0)},save:function(a,b){if(!(b.length<1)){if(-1!==b.indexOf(":"))return this.showError(10);var d=JSON.parse(c["get"+a+"JSON"]()),e=this["last"+a+"Node"];if("undefined"==typeof e)return this.showError(11);var f,g;e.node.folder?(f=e.name+":"+b,g=e.node):(f=e.name.replace(/[^:]*$/,b),g=e.node.parent);for(var h=Object.keys(d),i=0,j=h.length;j>i;i++)"_"===h[i].charAt(0)&&delete d[h[i]];d._id=f;var k=!1;f===e.name&&(k=!0,d._rev=e.node.data.lastRev),this.database.saveDoc(d,{success:function(a){k?(e.node.data.lastRev=a.rev,e.node.children&&e.node.lazyLoad(!0)):(g.addNode({id:a.id,lazy:!0,title:b,key:g.key+":"+b,lastRev:a.rev}),g.expanded||g.toggleExpanded())},error:this.showError})}},mkdir:function(b,c){if(!(c.length<1)){if(-1!==c.indexOf(":"))return this.showError(10);var d=this["last"+b+"Node"];if("undefined"==typeof d)return this.showError(11);var e;e=d.node.folder?d.node:d.node.parent;var f=e.getChildren();if(f)for(var g=0;g<f.length;g++)if(f[g].title===c&&f[g].folder)return this.showError(12);var h=e.addNode({folder:!0,title:c,key:e.key+":"+c});e.expanded||e.toggleExpanded(),a(h.li).find(".fancytree-title").trigger("click")}},login:function(b,c){var d=this;a.couch.login({name:b,password:c,success:function(){d.loggedIn=!0,d.username=b,d.$_elToOpen.html(d.getMenuContent())},error:this.showError})},logout:function(){var b=this;a.couch.logout({success:function(){b.loggedIn=!1,b.username=null,b.$_elToOpen.html(b.getLoginForm())}})},getLoginForm:function(){function b(){return c.login(c.getFormContent("login-username"),c.getFormContent("login-password")),!1}var c=this,e=this.loginForm=a("<div>");return e.append("<h1>Login</h1>"),e.append('<label for="'+this.cssId("login-username")+'">Username </label><input type="text" id="'+this.cssId("login-username")+'" /><br>'),e.append('<label for="'+this.cssId("login-password")+'">Password </label><input type="password" id="'+this.cssId("login-password")+'" />'),e.append(new d("Login",b,{color:"green"}).render()),e.bind("keypress",function(a){return 13===a.charCode?b():void 0}),e.append(this.errorP),e},getMenuContent:function(){var b=this,c=this.menuContent=a("<div>"),e=a("<div>").append(a("<p>").css("display","inline-block").css("width","50%").append("Click on an element to select it. Double-click to load.")).append(a("<p>").append("Logged in as "+this.username+" ").css("width","50%").css("text-align","right").css("display","inline-block").append(a("<a>Logout</a>").on("click",function(){b.logout()}).css({color:"blue","text-decoration":"underline",cursor:"pointer"})));c.append(e);var f=a("<tr>").appendTo(a("<table>").appendTo(c)),g={"overflow-y":"auto",height:"200px",width:"300px"},h=a('<td valign="top">').appendTo(f);h.append("<h1>Data</h1>");var i=a("<div>").attr("id",this.cssId("datatree")).css(g);h.append(i),h.append('<p id="'+this.cssId("datadiv")+'">&nbsp;</p>'),h.append(a("<p>").append('<input type="text" id="'+this.cssId("data")+'"/>').append(new d("Save",function(){b.save("Data",b.getFormContent("data"))},{color:"red"}).render()).append(new d("Mkdir",function(){b.mkdir("Data",b.getFormContent("data"))},{color:"blue"}).render())),this.lastDataFolder={name:this.username+":data",node:null};var j=a('<td valign="top">').appendTo(f);j.append("<h1>View</h1>");var k=a("<div>").attr("id",this.cssId("viewtree")).css(g);return j.append(k),j.append('<p id="'+this.cssId("viewdiv")+'">&nbsp;</p>'),j.append(a("<p>").append('<input type="text" id="'+this.cssId("view")+'"/>').append(new d("Save",function(){b.save("View",b.getFormContent("view"))},{color:"red"}).render()).append(new d("Mkdir",function(){b.mkdir("View",b.getFormContent("view"))},{color:"blue"}).render())),this.lastViewFolder={name:this.username+":view",node:null},c.append(this.errorP),this.loadTree(),c},lazyLoad:function(b,c){var d=c.node.data.id,e=a.Deferred();c.result=e.promise(),this.database.openDoc(d,{revs_info:!0,success:function(a){for(var b=a._revs_info,c=b.length,d=[],f=0;c>f;f++){var g=b[f];if("available"===g.status){var h={title:"rev "+(c-f),id:a._id,rev:!0,key:g.rev};d.push(h)}}e.resolve(d)}})},clickNode:function(b,c,d){if("title"===d.targetType||"icon"===d.targetType){var e,f=d.node,g="",h=b.toLowerCase();if(f.folder){g+=f.key;var i=g.substring(5);e={name:this.username+":"+h+(i.length>0?":"+i:""),node:f}}else{var j;g+=f.key.replace(/:?[^:]*$/,""),f.data.rev&&(j=f.key,f=f.parent),a("#"+this.cssId(h)).val(f.title),e={name:f.data.id,node:f},"fancytreedblclick"===c.type&&this.load(b,f,j)}return this["last"+b+"Node"]=e,a("#"+this.cssId(h+"div")).html("&nbsp;"+g),"fancytreedblclick"!==c.type||f.folder?void 0:!1}},loadTree:function(){var b=a.proxy(this,"lazyLoad"),c=a.proxy(this,"clickNode","Data"),d=a.proxy(this,"clickNode","View"),e=this,f={delegate:"span.fancytree-title",menu:[{title:"Delete",cmd:"delete",uiIcon:"ui-icon-trash"}],beforeOpen:function(b,c){var d=a.ui.fancytree.getNode(c.target);return d.folder?!1:void d.setActive()},select:function(b,c){var d=a.ui.fancytree.getNode(c.target);e.contextClick(d,c.cmd)},createMenu:function(b){a(b.target).css("z-index",1e3)}};this.database.allDocs({startkey:this.username+":",endkey:this.username+":~",success:function(g){var i=h(g.rows),j=a("#"+e.cssId("datatree"));j.fancytree({toggleEffect:!1,source:i.data,lazyload:b,click:c,dblclick:c,debugLevel:0}).children("ul").css("box-sizing","border-box"),j.data("ui-fancytree").getNodeByKey("root").toggleExpanded(),j.contextmenu(f);var k=a("#"+e.cssId("viewtree"));k.fancytree({toggleEffect:!1,source:i.view,lazyload:b,click:d,dblclick:d,debugLevel:0}).children("ul").css("box-sizing","border-box"),k.data("ui-fancytree").getNodeByKey("root").toggleExpanded(),k.contextmenu(f)}})},contextClick:function(a,b){if("delete"===b&&!a.folder){a.data.rev&&(a=a.parent);var c={_id:a.data.id,_rev:a.data.lastRev};this.database.removeDoc(c,{success:function(){a.remove()},error:this.showError})}}}),f});