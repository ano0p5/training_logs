//~~tv:12042.20210616
//~~tc: Remove default parameter "pdata=" if we have empty mapping object

//tealium universal tag - utag.sender.12042 ut4.0.202506091435, Copyright 2025 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {"id" : id};
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 35) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    u.ev = {"view" : 1};

    u.clearEmptyKeys = function (object) {
      for (var key in object) {
        if(object[key] === "" || object[key] === undefined) {
          delete object[key];
        }
      }
      return object;
    };

      u.map={"page_landing":"pdata.page_landing","conversion_sales":"pdata.conversion_sales","shop_category":"pdata.shop_category","pageHierarchy":"pdata.shop_hierarchy","qp.irclickid":"pdata.impact_click_id","cp.IR_PI":"pdata.IR_PI"};
  u.extend=[function(a,b){ try{ if(1){
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
function(a,b){ try{ if(1){
try {
    if (typeof b !== 'undefined') {
        b.page_landing = b.conversion_sales = b.shop_category = 'no';
        
        if (document.location.search !== '' && 
            document.location.search.toLowerCase().indexOf('cid=') > -1 && 
            document.location.search.toLowerCase().indexOf('icid=') <= -1) { //external campaign page, not internal campaigns
            b.page_landing = 'yes';
        }
        
        //not loading tag on order confirmation for priacy reasons
        //if (document.location.pathname.indexOf('/confirmation') > -1) { //order confirmation page
        //    b.conversion_sales = 'yes';
        //}   
      
        if (document.location.pathname.toLowerCase().indexOf('/shop/') > -1)  {
            var shop_cat = document.location.pathname.split('/');
	        if (shop_cat.length > 2) {b.shop_category = shop_cat[2];} //PLP and content pages
	        else {b.shop_category = 'shop';} //shop home
        }
    }
        if (document.location.pathname.toLowerCase().indexOf('/cart') > -1) { //cart
             b.lr_page = 'cart';
        }
        if (document.location.pathname.toLowerCase().indexOf('/checkout') > -1) { //checkout
            b.lr_page = 'checkout';
        }
        if (document.location.pathname.toLowerCase().indexOf('/receipt') > -1) { //receipt
            b.lr_page = 'receipt';
        }
} catch (e) {} 
} } catch(e){ utag.DB(e) }  }];


    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        utag.DB("send:483");
        utag.DB(b);

        var c, d, e, f;

        u.data = {
          //##UTVARconfig_<id from config>##
          "base_url" : "//di.rlcdn.com/",
          "tag_id" : "712618",
          // pdata vars
          "pdata" : {
            "timestamp" : "",
            "repeat_visitor" : "",
            "domain" : "",
            "device_type" : "",
            "traffic_source" : "",
            "referral_channel" : "",
            "referral_source" : "",
            "search_group" : "",
            "key_act_1" : "",
            "key_act_2" : "",
            "key_act_3" : "",
            "key_act_4" : "",
            "key_act_5" : "",
            "key_act_6" : "",
            "key_act_7" : "",
            "url_path" : ""
          }
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};
        // End tag-scoped extensions
        utag.DB("send:483:EXTENSIONS");
        utag.DB(b);
        c = [];
       
        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f].indexOf("pdata.") === 0) {
                u.data.pdata[e[f].substr(6)] = b[d];
              } else {
                u.data[e[f]] = b[d];
              }
            }
          }
        }
        utag.DB("send:483:MAPPINGS");
        utag.DB(u.data);
        // End Mapping

        if (!u.data.tag_id) {
          utag.DB(u.id + ": Tag not fired: Required attribute not populated");
          return;
        }

        //Legacy template pdata support
        u.data.pdata.timestamp = u.data.timestamp;
        u.data.pdata.repeatvisitor = u.data.repeat_visitor;
        u.data.pdata.domain = u.data.domain;
        u.data.pdata.devicetype = u.data.device_type;
        u.data.pdata.trafficsource = u.data.traffic_source;
        u.data.pdata.refferalchannel = u.data.referral_channel;
        u.data.pdata.refferalsource = u.data.referral_source;
        u.data.pdata.searchgroup = u.data.search_group;
        u.data.pdata.keyact1 = u.data.key_act_1;
        u.data.pdata.keyact2 = u.data.key_act_2;
        u.data.pdata.keyact3 = u.data.key_act_3;
        u.data.pdata.keyact4 = u.data.key_act_4;
        u.data.pdata.keyact5 = u.data.key_act_5;
        u.data.pdata.keyact6 = u.data.key_act_6;
        u.data.pdata.keyact7 = u.data.key_act_7;
        u.data.pdata.urlpath = u.data.url_path;

        u.data.pdata = u.clearEmptyKeys(u.data.pdata); // Remove unused pdata keys
        var paramstr = "";
        for (key in u.data.pdata) {
          paramstr += (key + "=" + u.data.pdata[key] + ",");
        }
        paramstr = paramstr.slice(0, -1);            // Remove trail
        paramstr = encodeURIComponent(paramstr);

        if (paramstr) {
          paramstr = 'pdata=' + paramstr;
        }

        u.data.base_url = u.data.base_url + "api/segment?pid=" + u.data.tag_id + "&" + paramstr;
        var attrs = {height:"1", width:"1", style:"display:none"} ;   
        u.loader({"type": "iframe", "src": u.data.base_url, "cb": null, "loc": "body", "id": "utag_483", "attrs" : attrs});

        utag.DB("send:483:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("483", "cvs.fs"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag
