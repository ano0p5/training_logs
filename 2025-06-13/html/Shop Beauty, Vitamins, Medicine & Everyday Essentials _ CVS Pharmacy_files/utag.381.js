//~~tv:4049.20180108
//~~tc: Adding tag DoubleClick Search

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments)};
gtag('js', new Date());

//tealium universal tag - utag.sender.4049 ut4.0.202506091435, Copyright 2025 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {"id" : id};
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.41
    var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) { u.loader = function(o, a, b, c, l, m) { utag.DB(o); a = document; if (o.type == "iframe") { m = a.getElementById(o.id); if (m && m.tagName == "IFRAME") { b = m; } else { b = a.createElement("iframe"); } o.attrs = o.attrs || {}; utag.ut.merge(o.attrs, { "height": "1", "width": "1", "style": "display:none" }, 0); } else if (o.type == "img") { utag.DB("Attach img: " + o.src); b = new Image(); } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; } if (o.id) { b.id = o.id; } for (l in utag.loader.GV(o.attrs)) { b.setAttribute(l, o.attrs[l]); } b.setAttribute("src", o.src); if (typeof o.cb == "function") { if (b.addEventListener) { b.addEventListener("load", function() { o.cb(); }, false); } else { b.onreadystatechange = function() { if (this.readyState == "complete" || this.readyState == "loaded") { this.onreadystatechange = null; o.cb(); } }; } } if (o.type != "img" && !m) { l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    u.ev = {"view" : 1};
    u.initialized = false;
    u.scriptrequested = false;
    u.queue = [];

    u.map_func = function (arr, obj, item) {
      var i = arr.shift();
      obj[i] = obj[i] || {};
      if (arr.length > 0) {
        u.map_func(arr,obj[i], item);
      } else {
        obj[i] = item;
      }
    };

    u.hasOwn = function (o, a) {
      return o != null && Object.prototype.hasOwnProperty.call(o, a);
    };

    u.isEmptyObject = function (o, a) {
      for (a in o) { if (u.hasOwn(o, a)) {return false;}} return true;
    };


      u.map={"_sm_381_1:conversion":"conversion","shortenedUrl":"custom.u7","dc_cat_activity":"activity"};
  u.extend=[function(a,b){
try{b['_sm_381_1']="conversion";}catch(e){utag.DB(e);}
},
function(a,b,c,d,e,f,g){if(1){d=b['dom.pathname'];if(typeof d=='undefined')return;c=[{'/shop/merch/extra-big-deals':'e-com100'}];var m=false;for(e=0;e<c.length;e++){for(f in utag.loader.GV(c[e])){if(d==f){b['dc_cat_activity']=c[e][f];m=true};};if(m)break};if(!m)b['dc_cat_activity']='e-com003';   }},
function(a,b){ try{ if(1){
u.loader = function(o) {
    var b, c, l, a = document;
        if (o.type === "iframe") {
            b = a.createElement("iframe");
            o.attrs = o.attrs || {
                "height": "1",
                "width": "1",
                "style": "display:none"
            };
        for (l in utag.loader.GV(o.attrs)) {
            b.setAttribute(l, o.attrs[l]);
                }
            b.setAttribute("src", o.src); 
                } 
        else if (o.type == "img") {
            utag.DB("Attach img: " + o.src);
            b = new Image();
            b.src = o.src;
            return;
                } 
        else {
            b = a.createElement("script");
            b.language = "javascript";
            b.type = "text/javascript";
            b.defer = 1;
            b.charset = "utf-8";
                for (l in utag.loader.GV(o.attrs)) {
                    b[l] = o.attrs[l];
            }
            b.src = o.src;
        }
        if (o.id) {
            b.id = o.id
            };
        if (typeof o.cb == "function") {
            if (b.addEventListener) {
                b.addEventListener("load", function() {o.cb()}, false);
            } 
            else {
                b.onreadystatechange = function() {
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        this.onreadystatechange = null;
                        o.cb()
                }};
            }
        }
        l = o.loc || "head";
        c = a.getElementsByTagName(l)[0];
        if (c) {
            utag.DB("Attach to " + l + ": " + o.src);
            if (l == "script") {
                c.parentNode.insertBefore(b, c);
            } else {
                c.appendChild(b)
            }
        }
}
} } catch(e){ utag.DB(e) }  },
function(a,b,c,d){ try{ if(1){c=[b['dom.domain'],b['dom.pathname']];b['shortenedUrl']=c.join('')} } catch(e){ utag.DB(e); }  }];


    // Start Loader Callback
    u.loader_cb = function (a, b, c) {
      utag.DB("send:381:CALLBACK");
      u.initialized = true;
      var i, j, _event, p;

      for (i = 0; i < u.data.advertiser_id.length; i++) {
        gtag('config', u.data.advertiser_id[i]);
      }

      if (u.data.order_id) {
          // p is the flag for a purchase event present in the event list
          for (i = 0; i < u.data.event.length; i++) {
            if (u.data.event[i] === "purchase") {
              p = true;
            }
          }
          if (!p) {
            u.data.event.push("purchase");
          }
        }


      var total_qty = 1;
      if (typeof (u.data.product_quantity) === "number") {
        total_qty = u.data.product_quantity;
      } else if (u.data.product_quantity.length === 1) {
        total_qty = u.data.product_quantity[0];
      } else if (u.data.product_quantity.length > 1) {
        for (var i = 0; i < u.data.product_quantity.length; i++) {
          total_qty += parseInt(u.data.product_quantity[i], 10);
        }
      }

      for (i = 0; i < u.data.event.length; i++) {
        _event = u.data.event[i];

        for (j = 0; j < u.data.advertiser_id.length; j++) {
          var eventIdData = {};

          if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
            eventIdData.allow_custom_scripts = true;
          } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
            eventIdData.allow_custom_scripts = false;
          }

          if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
            eventIdData.session_id = u.data.session_id[0];
          } else if (u.data.session_id[j] !== "") {
            eventIdData.session_id = u.data.session_id[j];
          }

          if (u.data.order_total) {
            eventIdData.value = u.data.order_total;
            eventIdData.transaction_id = u.data.order_id;
          }
          if (u.data.product_quantity) {
            eventIdData.quantity = total_qty;
          }

          for (var key in u.data.custom) {
            eventIdData[key] = u.data.custom[key];
          }


          if (!u.isEmptyObject(u.data.dc_custom_params)) {
            eventIdData.dc_custom_params = {};
            for (var key in u.data.dc_custom_params) {
              eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
            }

          }

          eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j]  + "/" + u.data.activity[j]  + "+" + u.data.counting_method[j];
          if (_event === "purchase") {
            gtag("event", "purchase", eventIdData);
          }
          if (_event === "conversion") {
            gtag("event", "conversion", eventIdData);
          }
        }
      }

      utag.DB("send:381:CALLBACK:COMPLETE");
    };
    // End Loader Callback

    u.callBack = function () {
      var data = {};
      while (data = u.queue.shift()) {
        u.data = data.data;
        u.loader_cb(data.a, data.b, data.c);
      }
    };

    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        utag.DB("send:381");
        utag.DB(b);

        var c, d, e, f;

        u.data = {
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "base_url" : "https://www.googletagmanager.com/gtag/js",
          "advertiser_id" : "DC-6615255",
          "activity_group" : "cvsna0",
          "activity" : "",
          "counting_method" : "standard",
          "custom_scripts" :  "true",
          "session_id" : "",
          "product_quantity" : [],
          "dc_custom_params" : {},
          "event_name" : "",
          "event" : [],
          "custom" : {}
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};
        utag.DB("send:381:EXTENSIONS");
        utag.DB(b);
        // End tag-scoped extensions

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.map_func(e[f].split("."), u.data, b[d]);
            }
          } else {
            h = d.split(":");
            if (h.length === 2 && b[h[0]] === h[1]) {
              if (u.map[d]) {
                u.data.event = u.data.event.concat(u.map[d].split(","));
              }
            }
          }
        }
        utag.DB("send:381:MAPPINGS");
        utag.DB(u.data);
        // End Mapping

        // Pull E-Commerce extension values
        // Mappings override E-Commerce extension values
        u.data.order_id = u.data.order_id || b._corder || "";
        u.data.order_total = u.data.order_total || b._ctotal || "";
        if (u.data.product_quantity.length === 0 && b._cquan !== undefined) { u.data.product_quantity = b._cquan.slice(0); }

        if(typeof(u.data.advertiser_id) === "string"){ u.data.advertiser_id = u.data.advertiser_id.split(","); }
        if(typeof(u.data.activity_group) === "string"){ u.data.activity_group = u.data.activity_group.split(","); }
        if(typeof(u.data.activity) === "string"){ u.data.activity = u.data.activity.split(","); }
        if(typeof(u.data.counting_method) === "string"){ u.data.counting_method = u.data.counting_method.split(","); }
        if(typeof(u.data.session_id) === "string"){ u.data.session_id = u.data.session_id.split(","); }

        // Report required config is missing, and stop tag from firing.
        if (!u.data.advertiser_id) {
          utag.DB(u.id + ": Tag not fired: Required attribute not populated");
          return;
        }

        u.data.base_url += "?id=" + (u.data.advertiser_id[0]);

        if (u.initialized) {
          u.loader_cb(a, b, c);
        } else {
          // While waiting for the external library to load, queue up all of the events with their corresponding data objects.
          u.queue.push({"data" : u.data, "a" : a, "b" : b, "c" : c});
          if (!u.scriptrequested) {
            u.scriptrequested = true;
            u.loader({
              "type" : "script",
              "src" : u.data.base_url,
              "cb" : u.callBack,
              "loc" : "script",
              "id" : "utag_381",
              "attrs" : {}
            });
          }
        }

        utag.DB("send:381:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("381", "cvs.fs"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag
