//tealium universal tag - utag.loader ut4.49.202506091435, Copyright 2025 Tealium.com Inc. All Rights Reserved.

if(typeof utag_err=='undefined')var utag_err=[];window._tealium_old_error=window._tealium_old_error || window.onerror || function(){};window.onerror=function(m,u,l){if(typeof u !== 'undefined' && u.indexOf('/utag.')>0 && utag_err.length < 5)utag_err.push({e:m,s:u,l:l,t:'js'});window._tealium_old_error(m,u,l)};
var utag_condload=false;try{(function(){function ul(src,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;a.getElementsByTagName('head')[0].appendChild(b)};var match = (""+document.cookie).match("(^|;\\s)utag_env_cvs_fs=(\/\/tags\.tiqcdn\.com\/utag\/cvs\/[a-z0-9\\.-]{1,30}\\/[^\\s;]*)");if(match){if(match[2].indexOf("/prod/") === -1) {var s = match[2];while(s.indexOf("%") != -1) {s = decodeURIComponent(s);}s = s.replace(/\.\./g,"");ul(s);utag_condload=true;__tealium_default_path='//tags.tiqcdn.com/utag/cvs/fs/prod/';}}})();}catch(e){};try{ try{
   
if(typeof document.location.href == "string" && document.location.href.indexOf("/mobile/") < 0){
   
    (function() { 
    let domainId = '283c7078-bb2e-4027-97d1-8495f534e7df';
    let language = 'true';
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
    script.setAttribute("data-domain-script", domainId);
    script.setAttribute("data-document-language", language);
    script.async = true;
    head.appendChild(script);
})();
}
} catch(e){ console.log(e) } }catch(e){console.log(e);}

if(!utag_condload){try{ try{
// Type your JavaScript code here...
window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
window.utag_cfg_ovrd.split_cookie = false;
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if(!utag_condload){try{ try{
// This function to be called from onBeforeEventSend callback.
window.adobeWebSdkBeforeEventSend = function (content) {
    if (content.xdm.hasOwnProperty('eventType') && content.xdm.eventType != "web.cmxImpressionTracking.linkClicks") {
        if (content.hasOwnProperty('data') && typeof content.data.productstring == 'string') {
            content.xdm = content.xdm || {};
            content.xdm._experience = content.xdm._experience || {};
            content.xdm._experience.analytics = content.xdm._experience.analytics || {};
            content.xdm._experience.analytics.customDimensions = content.xdm._experience.analytics.customDimensions || {};
            content.xdm._experience.analytics.customDimensions.props = content.xdm._experience.analytics.customDimensions.props || {};

            if (typeof content.xdm._experience.analytics.customDimensions.props.prop3 == 'string' && content.xdm._experience.analytics.customDimensions.props.prop3.indexOf("rxd: order confirmation") > -1) {
                content.data.__adobe = content.data.__adobe || {};
                content.data.__adobe.analytics = content.data.__adobe.analytics || {};
                content.data.__adobe.analytics.products = content.data.productstring;
                content.data.__adobe.analytics.events = content.data.events || undefined;
                content.data.__adobe.analytics.events = content.data.__adobe.analytics.events + ",purchase"
            }
            if (content.xdm.web.hasOwnProperty('webInteraction') && content.xdm.web.webInteraction.name.indexOf('rxd') > -1) {
                content.data.__adobe = content.data.__adobe || {};
                content.data.__adobe.analytics = content.data.__adobe.analytics || {};
                content.data.__adobe.analytics.products = content.data.productstring;
                content.data.__adobe.analytics.events = content.data.events || undefined;
                content.data.__adobe.analytics.events = content.data.__adobe.analytics.events + ",event34"
                
            }
        }
    }
}
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if(!utag_condload){try{ try{
// Clear window object for QuantumMetric
window.ttMETA = '';

// Add callbacks for Web SDK Target finished.
window.__alloyMonitors = window.__alloyMonitors || [];

window.__alloyMonitors.push({
    onNetworkResponse(data) {
        // Validate data and its structure before accessing properties
        if (data && data.parsedBody && Array.isArray(data.parsedBody.handle)) {
            data.parsedBody.handle.forEach(function (handleItem) {
                let matchedExperiences = [];

                if (handleItem && handleItem.type === 'personalization:decisions' && Array.isArray(handleItem.payload)) {
                    handleItem.payload.forEach(function (payloadItem) {
                        if (payloadItem && Array.isArray(payloadItem.items)) {
                            payloadItem.items.forEach(function (item) {
                                // Validate item.meta before accessing properties
                                if (item && item.meta && item.meta['activity.name'] && item.meta['experience.name']) {
                                    const activityName = item.meta['activity.name'];
                                    const experienceName = item.meta['experience.name'];

                                    if (activityName && experienceName) {
                                        const activityExperienceName = `${activityName} -> ${experienceName}`;
                                        if (!matchedExperiences.includes(activityExperienceName)) {
                                            matchedExperiences.push(activityExperienceName);
                                        }
                                    }
                                }
                            });
                        }
                    });
                }

                if (matchedExperiences.length > 0) {
                    let concatenatedExperiences = matchedExperiences.join('|');
                    window.ttMETA = concatenatedExperiences;
                }
            });
        }
    }
});
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if(!utag_condload){try{ try{
var globalPageName = "";
var globalHier = "";
var globalPageDetail = "";
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if(!utag_condload){try{ try{
window.__alloyMonitors = window.__alloyMonitors || [];
window.__alloyMonitors.push({
    onNetworkResponse: function(data) {
        if (sessionStorage.getItem("FBP-ECID")) {
            return;
        }

        if (data.body) {
            try {
                var parsedBody = JSON.parse(data.body);
                var id = parsedBody?.handle?.[0]?.payload?.[0]?.id;

                if (id) {
                    sessionStorage.setItem("FBP-ECID", id);
                    console.log("ECID stored in sessionStorage as FBP-ECID:", id);
                } else {
                    console.warn("ID not found in the parsed body");
                }
            } catch (error) {
                console.error("Failed to parse body:", error);
            }
        }
    }
});
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"cvs.fs",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    db_log : [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      lq: [],
      bq: {},
      bk: {},
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      ready_q : [], 
      sendq :{"pending":0},
      run_ready_q : function(){
        for(var i=0;i<utag.loader.ready_q.length;i++){
          utag.DB("READY_Q:"+i);
          try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};
        }
      },
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function(a, b, c, d, g) {
        utag.DB('WQ:' + utag.loader.wq.length);
        try {
          // this picks up a utag_data items added after utag.js was loaded
          // Gotcha: Data layer set after utag.js will not overwrite something already set via an extension.  Only "new" values are copied from utag_data
          // for case where utag_data is set after utag.js is loaded
          if(utag.udoname && utag.udoname.indexOf(".")<0){
            utag.ut.merge(utag.data,window[utag.udoname],0);
          }

          // TBD: utag.handler.RE('view',utag.data,"bwq");
          // process load rules again if this flag is set
          if(utag.cfg.load_rules_at_wait){
            utag.handler.LR(utag.data);
          }
        } catch (e) {utag.DB(e)};
	
	d=0;
        g=[]; 
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load == 4){
            //LOAD the bundled tag set to wait here
            this.f[b.id]=0;
            utag.loader.LOAD(b.id)
          }else if (b.load > 0) {
            g.push(b);
            //utag.loader.AS(b); // moved: defer loading until flags cleared
	    d++;
          }else{
            // clear flag for those set to wait that were not actually loaded
            this.f[b.id]=1;
          }
        }
        for (a = 0; a < g.length; a++) {
          utag.loader.AS(g[a]);
        }

	if(d==0){
	  utag.loader.END();
	}
      },
      AS: function(a, b, c, d) {
        utag.send[a.id] = a;
        if (typeof a.src == 'undefined' || !utag.ut.hasOwn(a,'src')) {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
        }
        a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v?utag.cfg.template+a.v:utag.cfg.v);
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        this.f[a.id]=0;
        if (a.load == 2) {
          utag.DB("Attach sync: "+a.src);
          a.uid=a.id;
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
          if(typeof a.cb!='undefined')a.cb();
        } else if(a.load==1 || a.load==3) {
          if (b.createElement) {
            c = 'utag_cvs.fs_'+a.id;
            if (!b.getElementById(c)) {
	      d = {
	        src:a.src,
		id:c,
                uid:a.id,
		loc:a.loc
              }
              if(a.load == 3){d.type="iframe"};
	      if(typeof a.cb!='undefined')d.cb=a.cb;
              utag.ut.loader(d);
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      OU: function(tid, tcat, a, b, c, d, f, g) {
        g = {};
        utag.loader.RDcp(g);
        try {
          if (typeof g['cp.OPTOUTMULTI'] != 'undefined') {
            c = utag.loader.cfg;
            a = utag.ut.decode(g['cp.OPTOUTMULTI']).split('|');
            for (d = 0; d < a.length; d++) {
              b = a[d].split(':');
              if (b[1] * 1 !== 0) {
                if (b[0].indexOf('c') == 0) {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tcat == b[0].substring(1)) c[f].load = 0;
                    // if we know the tid but don't know the category and this is a category opt out...
                    if (c[f].tid == tid && c[f].tcat == b[0].substring(1)) return true; 
                  }
                  if (tcat == b[0].substring(1)) return true;
                } else if (b[0] * 1 == 0) {
                  utag.cfg.nocookie = true
                } else {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tid == b[0]) c[f].load = 0
                  }
                  if (tid == b[0]) return true;
                }
              }
            }
          }
        } catch (e) {utag.DB(e)}
        return false;
      },
      RDdom: function(o){
        var d = document || {}, l = location || {};
        o["dom.referrer"] = d.referrer;
        o["dom.title"] = "" + d.title;
        o["dom.domain"] = "" + l.hostname;
        o["dom.query_string"] = ("" + l.search).substring(1);
        o["dom.hash"] = ("" + l.hash).substring(1);
        o["dom.url"] = "" + d.URL;
        o["dom.pathname"] = "" + l.pathname;
        o["dom.viewport_height"] = window.innerHeight || (d.documentElement?d.documentElement.clientHeight:960);
        o["dom.viewport_width"] = window.innerWidth || (d.documentElement?d.documentElement.clientWidth:960);
      },
      RDcp: function(o, b, c, d){
        b = utag.loader.RC();
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
      },
      RDqp: function(o, a, b, c){
        a = location.search + (location.hash+'').replace("#","&");
        if(utag.cfg.lowerqp){a=a.toLowerCase()};
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            if(c.length>1){
              o["qp." + c[0]] = utag.ut.decode(c[1])
            }
          }
        }
      },
      RDmeta: function(o, a, b, h){
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          try{
            h = a[b].name || a[b].getAttribute("property") || ""; 
          }catch(e){h="";utag.DB(e)};
          if (utag.cfg.lowermeta){h=h.toLowerCase()};
          if (h != ""){o["meta." + h] = a[b].content}
        }
      },
      RDva: function(o){
        // Read visitor attributes in local storage
        var readAttr = function(o, l ){
          var a = "", b;
          a = localStorage.getItem(l);
          if(!a || a=="{}")return;
          b = utag.ut.flatten({va : JSON.parse(a)});
          utag.ut.merge(o,b,1);
        }
        try{
          readAttr(o, "tealium_va" );
          readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"] );
        }catch(e){ utag.DB(e) }
      },
      RDut: function(o, a){
        // Add built-in data types to the data layer for use in mappings, extensions and RDva function.
        var t = {};
        var d = new Date();
        var m = ( utag.ut.typeOf(d.toISOString) == "function" );
        o["ut.domain"] = utag.cfg.domain;
        o["ut.version"] = utag.cfg.v;
        // i.e. "view" or "link"
        t["tealium_event"] = o["ut.event"] = a || "view";
        t["tealium_visitor_id"] = o["ut.visitor_id"]=o["cp.utag_main_v_id"];
        t["tealium_session_id"] = o["ut.session_id"]=o["cp.utag_main_ses_id"];
        t["tealium_session_number"] = o["cp.utag_main__sn"];
        t["tealium_session_event_number"] = o["cp.utag_main__se"];
        try{
          t["tealium_datasource"] = utag.cfg.datasource;
          t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
          t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
          t["tealium_environment"] = o["ut.env"] = "prod";
        }catch(e){ utag.DB(e) }

        t["tealium_random"] = Math.random().toFixed(16).substring(2);
        t["tealium_library_name"] = "ut"+"ag.js";
        t["tealium_library_version"] = ( utag.cfg.template + "0" ).substring(2);
        t["tealium_timestamp_epoch"] = Math.floor( d.getTime() / 1000 );
        t["tealium_timestamp_utc"] = ( m ? d.toISOString() : "");
        // Adjust date to local time
        d.setHours( d.getHours() - ( d.getTimezoneOffset() / 60 ) );
        t["tealium_timestamp_local"] = ( m ? d.toISOString().replace( "Z","" ) : "" );

        // Any existing data elements with "tealium_" will not be overwritten
        utag.ut.merge( o, t, 0 );
      },
      RDses: function( o, a, c ) {
        a = (new Date()).getTime();
        c = ( a + parseInt( utag.cfg.session_timeout ) ) + "";

        // cp.utag_main_ses_id will not be in the data layer when it has expired or this is first page view of all time
	if ( !o["cp.utag_main_ses_id"] ) {
          o["cp.utag_main_ses_id"] = a + "";
          o["cp.utag_main__ss"] = "1";
          o["cp.utag_main__se"] = "1";
          o["cp.utag_main__sn"] = ( 1 + parseInt( o["cp.utag_main__sn"] || 0 ) ) + "";
        } else {
          o["cp.utag_main__ss"] = "0";
          o["cp.utag_main__se"] = ( 1 + parseInt( o["cp.utag_main__se"] || 0 ) ) + "";
        }

        o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
        o["cp.utag_main__st"] = c;

        utag.loader.SC( "utag_main", { "_sn": ( o["cp.utag_main__sn"] || 1 ), "_se": o["cp.utag_main__se"], "_ss": o["cp.utag_main__ss"], "_st": c, "ses_id": ( o["cp.utag_main_ses_id"] || a ) + ";exp-session", "_pn": o["cp.utag_main__pn"] + ";exp-session" } );
      },
      RDpv: function( o ) {
        if ( typeof utag.pagevars == "function" ) {
          utag.DB("Read page variables");
          utag.pagevars(o);
        }
      },
      RDlocalStorage: function(o) {
        if (utag.cfg.ignoreLocalStorage) {
          return;
        }
        Object.keys(window.localStorage).forEach(function(localStorageKey) {
          o["ls." + localStorageKey] = window.localStorage[localStorageKey];
        });
      },
      RDsessionStorage: function(o) {
        if (utag.cfg.ignoreSessionStorage) {
          return;
        }
        Object.keys(window.sessionStorage).forEach(function(sessionStorageKey) {
          o["ss." + sessionStorageKey] = window.sessionStorage[sessionStorageKey];
        });
      },
      RD: function( o, a ) {
        utag.DB("utag.loader.RD");
        utag.DB(o);

        utag.loader.RDcp(o);

        if ( !utag.loader.rd_flag ) {
          utag.loader.rd_flag = 1;
          o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
          o["cp.utag_main__pn"] = ( 1 + parseInt( o["cp.utag_main__pn"] || 0 ) ) + "";
          // the _st value is not-yet-set for first page view so we'll need wait to write in _pn value (which is exp-session)
          // The SC function expires (removes) cookie values that expired with the session
          utag.loader.SC( "utag_main", { "v_id": o["cp.utag_main_v_id"] } );
          utag.loader.RDses(o);
        }

        // first utag.track call for noview should not clear session start (_ss) value
        if(a && !utag.cfg.noview)utag.loader.RDses(o);
        utag.loader.RDqp(o);
        utag.loader.RDmeta(o);
        utag.loader.RDdom(o);
        utag.loader.RDut(o, a || "view");
        utag.loader.RDpv(o);
        utag.loader.RDva(o);
        utag.loader.RDlocalStorage(o);
        utag.loader.RDsessionStorage(o);
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        r = /^(.*?)=(.*)$/;
        s = /^(.*);exp-(.*)$/;
        t = (new Date()).getTime();
        for (c = 0; c < b.length; c++) {
          if (b[c].match(r)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
          e = utag.ut.decode(cv);
          if (typeof ck!="undefined"){
            if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
              e = cv.split("$");
              g = [];
              j = {};
              for (f = 0; f < e.length; f++) {
                try{
                  g = e[f].split(":");
                  if (g.length > 2) {
                    g[1] = g.slice(1).join(":");
                  }
                  v = "";
                  if (("" + g[1]).indexOf("~") == 0) {
                    h = g[1].substring(1).split("|");
                    for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                    v = h
                  } else v = utag.ut.decode(g[1]);
                  j[g[0]] = v;
                }catch(er){utag.DB(er)};
              }
              o[ck] = {};
              for (f in utag.loader.GV(j)) {
                if (utag.ut.typeOf(j[f]) == "array") {
                  n = [];
                  for (m = 0; m < j[f].length; m++) {
                    if (j[f][m].match(s)){
                      k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                      if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                    }
                  }
                  j[f] = n.join("|");
                } else {
                  j[f] = "" + j[f];
                  if (j[f].match(s)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                    j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                  }
                }
                if (j[f]) o[ck][f] = j[f];
              }
            } else if (utag.cl[ck] || utag.cl['_all_']) {
              o[ck] = e
            }
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        if (a=="utag_main" && utag.cfg.nocookie) return 0;
        v = "";
        var date = new Date();
        var exp = new Date();
        exp.setTime(date.getTime()+(365*24*60*60*1000));
        x = exp.toGMTString();
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (utag.ut.typeOf(d[e]) == "array") ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (utag.ut.typeOf(d[g]) == "array") {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push((g + ":").replace(/[\,\$\;\?]/g,"") + encodeURIComponent(d[g]))
          }
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x + (utag.cfg.secure_cookie?";secure":"");
        return 1
      },
      LOAD: function(a, b, c, d) {
        //utag.DB('utag.loader.LOAD:' + a);
        if(!utag.loader.cfg){
           return
        }
	if(this.ol==0){
          if(utag.loader.cfg[a].block && utag.loader.cfg[a].cbf){
            this.f[a] = 1;
	    delete utag.loader.bq[a];
          }
	  for(b in utag.loader.GV(utag.loader.bq)){
            if(utag.loader.cfg[a].load==4 && utag.loader.cfg[a].wait==0){
              utag.loader.bk[a]=1;
              utag.DB("blocked: "+ a);
            }
	    utag.DB("blocking: " + b);
	    return;
	  }
	  utag.loader.INIT();
	  return;
	}
        utag.DB('utag.loader.LOAD:' + a);

        if (this.f[a] == 0) {
          this.f[a] = 1;
      	
	  if(utag.cfg.noview!=true){
	    if(utag.loader.cfg[a].send){
              utag.DB("SENDING: "+a);
              try{
                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                  utag.DB("utag.loader.LOAD:sendq: "+a);
                  while( d = utag.loader.sendq[a].shift() ) {
                    utag.DB(d);
                    utag.sender[a].send(d.event, utag.handler.C(d.data));
                    utag.loader.sendq.pending--;
                  }
                } else {
                  utag.sender[a].send('view',utag.handler.C(utag.data));
                }
		utag.rpt['s_' + a] = 0;
	      } catch (e) {
                utag.DB(e);
	        utag.rpt['s_' + a] = 1;
	      }
	    }
	  }
	  if(utag.loader.rf==0)return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0 || this.f[b] == 2) return
          }
	  utag.loader.END();
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if(!utag.data){
            try {
              utag.cl = {'_all_': 1};
              utag.loader.initdata();    
              utag.loader.RD(utag.data);
            }catch(e){ utag.DB(e) };
          }
          if ( (document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading" ) setTimeout(c, 1);
          else {
            utag.loader.ready_q.push(c);
            var RH;

            if(utag.loader.ready_q.length<=1){
              if (document.addEventListener) {
                RH = function() {
                  document.removeEventListener("DOMContentLoaded", RH, false);
                  utag.loader.run_ready_q()
                };
                if(!utag.cfg.dom_complete)document.addEventListener("DOMContentLoaded", RH, false);
                window.addEventListener("load", utag.loader.run_ready_q, false);
              } else if (document.attachEvent) {
                RH = function() {
                  if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", RH);
                    utag.loader.run_ready_q()
                  }
                };
                document.attachEvent("onreadystatechange", RH);
                window.attachEvent("onload", utag.loader.run_ready_q);
              }
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      },
      END: function(b, c, d, e, v, w){
        if(this.ended){return};
        this.ended=1;
	utag.DB("loader.END");
        b = utag.data;
        // add the default values for future utag.link/view calls
	if(utag.handler.base && utag.handler.base!='*'){
          e = utag.handler.base.split(",");
          for (d = 0; d < e.length; d++) {
            if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
          }
        }else if (utag.handler.base=='*'){
           utag.ut.merge(utag.handler.df,b,1);
        }

        utag.rpt['r_0']="t";
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }

        utag.rpt.ts['s'] = new Date();
	(function(a,b,c,l){if(typeof utag_err!='undefined'&&utag_err.length>0){
                                                a='//uconnect.tealiumiq.com/ulog/_error?utid='+utag.cfg.utid;
                                                l=utag_err.length > 5 ? 5:utag_err.length;
                                                for(b=0;b<l;b++){
                                                    c=utag_err[b];
                                                    a+='&e'+b+'='+encodeURIComponent(c.t+'::'+c.l+'::'+c.s+'::'+c.e);
                                                }
                                                utag.dbi.push((new Image()).src=a);
                                            }})();

        v = utag.cfg.path;
        // both .tiqcdn.com and .tiqcdn.cn supported
        w = v.indexOf(".tiqcdn.");
        if(w>0 && b["cp.utag_main__ss"]==1 && !utag.cfg.no_session_count)utag.ut.loader({src:v.substring(0,v.indexOf("/ut"+"ag/")+6)+"tiqapp/ut"+"ag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
        
        if(utag.cfg.noview!=true)utag.handler.RE('view',b,"end");
	utag.handler.INIT();
      }
    },
    DB: function(a, b) {
      // return right away if we've already checked the cookie
      if(utag.cfg.utagdb===false){
        return;
      }else if(typeof utag.cfg.utagdb=="undefined"){
        b = document.cookie+'';
        utag.cfg.utagdb=((b.indexOf('utagdb=true') >= 0)?true:false);
      }
      if(utag.cfg.utagdb===true){
        var t;
        if(utag.ut.typeOf(a) == "object"){
          t=utag.handler.C(a)
        }else{
          t=a
        }
        utag.db_log.push(t);
        try{if(!utag.cfg.noconsole)console.log(t)}catch(e){}
      }
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]))
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
      }
    },
    view: function(a,c,d) {
      return this.track({event:'view', data:a || {}, cfg:{cb:c,uids:d}})
    },
    link: function(a,c,d) {
      return this.track({event:'link', data:a || {}, cfg:{cb:c,uids:d}})
    },
    track: function(a,b,c,d,e) {
      a = a || {};
      if (typeof a == "string") {
        a = { event: a, data: b || {}, cfg:{cb:c,uids:d} } 
      }

      // track called directly also supports a 3rd option where first param (a) is data layer and second param (b) is cb function
      for(e in utag.loader.GV(utag.o)){
        utag.o[e].handler.trigger(a.event || "view", a.data || a, a.cfg || {cb:b,uids:c})
      }
      a.cfg = a.cfg || {cb:b};
      if(typeof a.cfg.cb == "function")a.cfg.cb();

      return true
    },
    handler: {
      base: "page_name,page_category",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        utag.DB('utag.handler.INIT');
        if(utag.initcatch){
          utag.initcatch=0;
          return
        }
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          utag.DB("Loader queue");
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
            utag.handler.trigger(c.a, c.b, c.c)
          }
        }
        //##UTABSOLUTELAST##
      },
      test: function() {
        return 1
      },
      // reset and run load rules
      LR: function(b){
        utag.DB("Load Rules");
        for(var d in utag.loader.GV(utag.cond)){
          utag.cond[d]=false;
        }
        utag.DB(b);
        utag.loader.loadrules(b);
        utag.DB(utag.cond);
        utag.loader.initcfg();
        // use the OPTOUTMULTI cookie value to override load rules
        utag.loader.OU();
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }
      },
      // The third param "c" is a string that defines the location i.e. "blr" == before load rules
      RE:function(a,b,c,d,e,f,g){
        if(c!="alr" && !this.cfg_extend){
          return 0; 
        }
        utag.DB("RE: "+c);
        if(c=="alr")utag.DB("All Tags EXTENSIONS");
        utag.DB(b);
        if(typeof this.extend != "undefined"){
          g=0;
          for (d = 0; d < this.extend.length; d++) {
            try {
              /* Extension Attributes */
              e=0;
              if(typeof this.cfg_extend!="undefined"){
                f=this.cfg_extend[d];
                if(typeof f.count == "undefined")f.count=0;
                if(f[a]==0 || (f.once==1 && f.count>0) || f[c]==0){
                  e=1
                }else{
                  if(f[c]==1){g=1};
                  f.count++
                }
              }
              if(e!=1){
                this.extend[d](a, b);
                utag.rpt['ex_' + d] = 0
              }
            } catch (er) {
              utag.DB(er);
              utag.rpt['ex_' + d] = 1;
	      utag.ut.error({e:er.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});
            }
          }
          utag.DB(b);
          return g;
        }
      },
      trigger: function(a, b, c, d, e, f) {
        utag.DB('trigger:'+a+(c && c.uids?":"+c.uids.join(","):""));
        b = b || {};
        utag.DB(b);

        if (!this.iflag) {
          utag.DB("trigger:called before tags loaded");
          for (d in utag.loader.f) {
            if (!(utag.loader.f[d] === 1)) utag.DB('Tag '+d+' did not LOAD')
          }
          utag.loader.q.push({
            a: a,
            b: utag.handler.C(b),
            c: c
          });
          return;
        }

        // update all values for AJAX pages
        utag.ut.merge(b,this.df,0);
        utag.loader.RD( b, a );

        // clearing noview flag after the RD function call
        utag.cfg.noview = false;

        function sendTag(a, b, d){
          try {
            if(typeof utag.sender[d]!="undefined"){
              utag.DB("SENDING: "+d);
              utag.sender[d].send(a, utag.handler.C(b));
	      utag.rpt['s_' + d] = 0;
            }else if (utag.loader.cfg[d].load!=2){
              // utag.link calls can load in new tags
              utag.loader.sendq[d] = utag.loader.sendq[d] || [];
              utag.loader.sendq[d].push({"event":a, "data":utag.handler.C(b)});
              utag.loader.sendq.pending++;
              utag.loader.AS({id : d, load : 1}); 
            }
          }catch (e) {utag.DB(e)}
        }
        
        // utag.track( { event : "view", data: {myvar : "myval" }, cfg: { uids : [1,2,10] } } );
        if(c && c.uids){
          this.RE(a,b,"alr");
          for(f=0;f<c.uids.length;f++){
            d=c.uids[f];
            // bypass load rules, but still check the OPTOUTMULTI cookie before firing
            if (!utag.loader.OU(utag.loader.cfg[d].tid)) {
              sendTag(a, b, d);
            }
          }
        }else if(utag.cfg.load_rules_ajax){
          this.RE(a,b,"blr");
          // process load rules based on current data layer
          this.LR(b);
          this.RE(a,b,"alr");
          
          for(f = 0; f < utag.loader.cfgsort.length; f++){
            d = utag.loader.cfgsort[f];
            if(utag.loader.cfg[d].load && utag.loader.cfg[d].send){
              sendTag(a, b, d);
            }
          }
        }else{
          // legacy behavior
          this.RE(a,b,"alr");
          for (d in utag.loader.GV(utag.sender)) {
            sendTag(a, b, d);
          }
        }
        this.RE(a,b,"end");
      },
      // "sort-of" copy
      C: function(a, b, c) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if(utag.ut.typeOf(a[c]) == "array"){
            b[c] = a[c].slice(0)
          }else{
            // objects are still references to the original (not copies)
            b[c] = a[c]
          }
        }
        return b
      }
    },
    ut:{
      pad: function(a,b,c,d){
        a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return ""+d+a
      },
      vi: function(t,a,b){
        if(!utag.v_id){
          a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};utag.v_id=a;
        }
        return utag.v_id
      },
      hasOwn: function(o, a) {
        return o != null && Object.prototype.hasOwnProperty.call(o, a)
      },
      isEmptyObject: function(o, a) {
	for (a in o) {
          if (utag.ut.hasOwn(o,a))return false
        }
        return true
      },
      isEmpty: function(o) {
        var t = utag.ut.typeOf(o);
        if ( t == "number" ){
          return isNaN(o)
        }else if ( t == "boolean" ){
          return false
        }else if ( t == "string" ){
          return o.length === 0
        }else return utag.ut.isEmptyObject(o)
      },
      typeOf: function(e) {
        return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
      },
      flatten: function(o){
        // stop when arriving at a string, array, boolean, number (float or integer)
        var a = {}; 
        function r(c, p) {
          if (Object(c) !== c || utag.ut.typeOf(c) == "array") {
            a[p] = c;
          } else {
            if(utag.ut.isEmptyObject(c)){
              //a[p] = {};
            }else{
              for (var d in c) {
                r(c[d], p ? p+"."+d : d);
              }
            }
          }
        }
        r(o, "");

        return a;
      },
      merge: function(a, b, c, d) {
        if(c){
          for(d in utag.loader.GV(b)){
            a[d] = b[d]
          }
        }else{
          for(d in utag.loader.GV(b)){
            if(typeof a[d]=="undefined")a[d] = b[d]
          }
        }
      },
      decode: function(a, b) {
        b = "";
        try{b = decodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = unescape(a)};
        return b
      },
      encode: function(a, b) {
        b = "";
        try{b = encodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = escape(a)};
        return b
      },
      error: function(a, b, c){
        if(typeof utag_err!="undefined"){
          utag_err.push(a)
        }
      },
      loader: function(o, a, b, c, l, m) {
        utag.DB(o);
        a=document;
        if (o.type=="iframe") {
          // if an iframe of same id already exists, remove and add again (to keep DOM clean and avoid impacting browser history)
          m = a.getElementById( o.id );
          if ( m && m.tagName == "IFRAME" ) {
            m.parentNode.removeChild(m);
          }
          b = a.createElement("iframe");
          o.attrs = o.attrs || {};
          utag.ut.merge( o.attrs, { "height" : "1", "width" : "1", "style" : "display:none" } , 0 );
        }else if (o.type=="img"){
          utag.DB("Attach img: "+o.src);
          b = new Image();
        }else{
          b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";
        }
        if(o.id){b.id=o.id};
        for( l in utag.loader.GV(o.attrs) ){
          b.setAttribute( l, o.attrs[l] )
        }
        b.setAttribute("src", o.src);
        if (typeof o.cb=="function") {
          if(b.addEventListener) {
            b.addEventListener("load",function(){o.cb()},false);
          }else {
            // old IE support
            b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};
          }
        }
        if(typeof o.error=="function"){
          utag.loader.EV(b, "error", o.error);
        }
        if ( o.type != "img" ) {
          l = o.loc || "head";
          c = a.getElementsByTagName(l)[0];
          if (c) {
            utag.DB("Attach to "+l+": "+o.src);
            if (l == "script") {
              c.parentNode.insertBefore(b, c);
            } else {
              c.appendChild(b)
            }
          }
        }
      }
    }
  };
  utag.o['cvs.fs']=utag;
  utag.cfg = {
    template : "ut4.49.",
    // Enable load rules ajax feature by default
    load_rules_ajax: true,
    load_rules_at_wait: false,
    lowerqp: false,
    noconsole: false,
    //noview: ##UTNOVIEW##,
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    domain: utag.loader.lh(),
    datasource: "##UTDATASOURCE##".replace("##"+"UTDATASOURCE##",""),
    secure_cookie: ("##UTSECURECOOKIE##".replace("##"+"UTSECURECOOKIE##","")==="true")?true:false,
    path: "//tags.tiqcdn.com/utag/cvs/fs/prod/",
    utid: "cvs/fs/202506091435",
    ignoreSessionStorage: false,
    ignoreLocalStorage: false
  };
  utag.cfg.v = utag.cfg.template + "202506091435";
  utag.cond={129:0,132:0,139:0,151:0,154:0,172:0,173:0,195:0,210:0,214:0,219:0,221:0,222:0,230:0,233:0,234:0};
utag.loader.initdata = function() {   try {       utag.data = (typeof utag_data != 'undefined') ? utag_data : {};       utag.udoname='utag_data';    } catch (e) {       utag.data = {};       utag.DB('idf:'+e);   }};utag.loader.loadrules = function(_pd,_pc) {var d = _pd || utag.data; var c = _pc || utag.cond;for (var l in utag.loader.GV(c)) {switch(l){
case '129':try{c[129]|=(!/^\/otchs/i.test(d['dom.pathname']))||(!/^\/realms/i.test(d['dom.pathname']))||(!/^\/benefits/i.test(d['dom.pathname']))}catch(e){utag.DB(e)}; break;
case '132':try{c[132]|=(typeof d['device_type']!='undefined'&&d['device_type']!='cvs_iphone_app'&&d['device_type']!='cvs_android_app'&&d['device_type']!='linux')}catch(e){utag.DB(e)}; break;
case '139':try{c[139]|=(d['dom.pathname'].toString().toLowerCase().indexOf('/shop'.toLowerCase())>-1)||(d['dom.pathname'].toString().toLowerCase().indexOf('/checkout'.toLowerCase())>-1)||(d['dom.pathname'].toString().toLowerCase().indexOf('/search'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '151':try{c[151]|=(typeof d['cp.CCPA_OPT_OUT_USR']!='undefined'&&d['cp.CCPA_OPT_OUT_USR']!='true')||(typeof d['cp.CCPA_OPT_OUT_USR']=='undefined')}catch(e){utag.DB(e)}; break;
case '154':try{c[154]|=(/^\/shop/.test(d['dom.pathname']))||(d['dom.pathname'].toString().toLowerCase().indexOf('/shop'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '172':try{c[172]|=(d['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/cart'.toLowerCase())>-1&&d['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)||(d['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/checkout'.toLowerCase())>-1&&d['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)||(d['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/receipt'.toLowerCase())>-1&&d['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '173':try{c[173]|=(d['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/receipt'.toLowerCase())>-1&&d['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1&&d['page_name'].toString().toLowerCase()=='fs: order confirmation'.toLowerCase())}catch(e){utag.DB(e)}; break;
case '195':try{c[195]|=(typeof d['gpc']=='undefined')}catch(e){utag.DB(e)}; break;
case '210':try{c[210]|=(typeof d['pageHierarchy']!='undefined'&&d['pageHierarchy'].toString().toLowerCase().indexOf('sex'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('sexual'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('prenatal'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('fertility'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('pregnancy'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('cbd'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('alcohol'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('std'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('sti'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('hiv'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('incontinence'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('dripstick'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('erectile'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('fentanyl'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('narcan'.toLowerCase())<0&&d['pageHierarchy'].toString().toLowerCase().indexOf('feminine_care'.toLowerCase())<0)||(typeof d['pageHierarchy']=='undefined')}catch(e){utag.DB(e)}; break;
case '214':try{c[214]|=(d['dom.url'].toString().toLowerCase().indexOf('sex'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('sexual'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('prenatal'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('fertility'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('pregnancy'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('family_planning'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('libido'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('testosterone'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('desire'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('contraceptive'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('std'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('condoms'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('HIV'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('adult%20care'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('incontinence'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('cbd'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('alcohol'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('std'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('fentanyl'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('narcan'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('prescription-drug-abuse/save-a-life'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('sti'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('dripstick'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('erectile'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('eroxon'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('horny'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('weed'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('enhancement'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('prostate'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('performance'.toLowerCase())<0&&d['dom.url'].toString().toLowerCase().indexOf('feminine%20care'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '219':try{c[219]|=(d['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/cart'.toLowerCase())>-1&&d['dom.query_string'].toString().indexOf('flowType=FS')>-1)||(d['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/checkout'.toLowerCase())>-1&&d['dom.query_string'].toString().indexOf('flowType=FS')>-1)}catch(e){utag.DB(e)}; break;
case '221':try{c[221]|=(typeof d['tealium_cmx_event']!='undefined'&&d['tealium_cmx_event'].toString().indexOf('GAM')>-1)}catch(e){utag.DB(e)}; break;
case '222':try{c[222]|=(typeof d['tealium_cmx_event']!='undefined'&&d['tealium_cmx_event'].toString().indexOf('criteo')>-1)}catch(e){utag.DB(e)}; break;
case '230':try{c[230]|=(typeof d['link_name']!='undefined'&&d['link_name'].toString().indexOf('custom:trigger adobe target')>-1)}catch(e){utag.DB(e)}; break;
case '233':try{c[233]|=(typeof d['fulfillment_method']!='undefined'&&d['fulfillment_method'].toString().toLowerCase().indexOf('rxd'.toLowerCase())<0)||(typeof d['fulfillment_method']=='undefined')}catch(e){utag.DB(e)}; break;
case '234':try{c[234]|=(d['dom.pathname'].toString().indexOf('/mobile/')>-1)}catch(e){utag.DB(e)}; break;}}};utag.pre=function() {    utag.loader.initdata();    try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};    utag.loader.loadrules();    };utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b){
try{
  
  if (typeof b !== 'undefined' && typeof b.platform === 'undefined') { //only set platform when missing
    var screen_width = screen.width;
    b.platform = "dweb";
    if (screen_width!=null) {
      if (screen_width>0 && screen_width<768) {
	b.platform = "mweb";
      }
      else if (screen_width>=768 && screen_width<1024) {
	b.platform = "tweb";
      }
    }
  }
  if (navigator.userAgent) {
    var platform_check = navigator.userAgent;
    if (platform_check.toLowerCase().search("cvs_iphone_app") != -1) {
      b.platform = "mapp";
    }
    else if (platform_check.toLowerCase().search("cvs_android_app") != -1) {
      b.platform = "mapp";
    }
  }                               
}catch (e) {} 



},
function(a,b){
b.device_type = "other";
try {
  var platform_check = navigator.userAgent;
  if (platform_check.toLowerCase().search("android") !== -1) {
    if (platform_check.toLowerCase().search("cvs_android_app") === -1) {
      b.device_type = "android";
    }
    else {
      b.device_type = "cvs_android_app";
    }
  }
  else if (platform_check.toLowerCase().search("iphone") !== -1) {
    if (platform_check.toLowerCase().search("cvs_iphone_app") === -1) {
      b.device_type = "iphone";
    }
    else {
      b.device_type = "cvs_iphone_app";
    }
  }
  else if (platform_check.toLowerCase().search("linux") !== -1) {
      b.device_type = "linux"; //common device of bots
  }
} catch (e) {}
},
function(a,b,c,d,e,f,g){if(1){d=b['fulfillment_method'];if(typeof d=='undefined')return;c=[{'fs|stand':'STANDARD'},{'fs|bopis':'IN_STORE_PICK_UP'}];var m=false;for(e=0;e<c.length;e++){for(f in utag.loader.GV(c[e])){if(d==f){b['Fulfillment_Method_Set_BOPIS']=c[e][f];m=true};};if(m)break};if(!m)b['Fulfillment_Method_Set_BOPIS']='';   }},
function(a,b){ try{ if((typeof b['fulfillment_method']!='undefined'&&b['fulfillment_method'].toString().indexOf('bopis')>-1)){b['isBopis']='true'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
try {
   globalAdobeObjectWebSDK = {
	  
setAdobePageNameWebSDK: function (pageType) {
      try {
         if (typeof b !== 'undefined' && typeof b.link_name === 'undefined' && typeof b.page_name !== 'undefined') {
            //this logic is commented out because the MC profile uses a really old Tealium version that does not set ut.event in the data object
            //typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'view') { //only set pagename values on page tags

         var a_screen_width = screen.width;
         var a_experience = "dweb";
         if (a_screen_width!==null) {
            if (a_screen_width>0&&a_screen_width<768) {
               a_experience = "mweb";
            }
            else if (a_screen_width>=768&&a_screen_width<1024) {
               a_experience = "tweb";
            }
         }

         var l_pageName = "";
         var i = 1;
         l_pageName = "cvs";
         l_pageName = l_pageName + "|" + a_experience;
  
         var domPathname = document.location.pathname;
        //capture first URL folder
        if (domPathname.split('/')[i] !== '') {
            var dlp1 = domPathname.split('/')[i];
	        if (typeof dlp1 !== 'undefined') {
	           l_pageName = l_pageName + "|" + dlp1;			  
	        } 
	        //capture 2nd URL folder
            if (domPathname.split('/')[i+1] !== '') {
                var dlp2 = domPathname.split('/')[i+1];
                if (typeof dlp2 !== 'undefined') {
                    l_pageName = l_pageName + "|" + dlp2;
                }
                //capture 3rd URL folder
                if (domPathname.split('/')[i+2] !== '') {
                    var dlp3 = domPathname.split('/')[i+2];
                    if (typeof dlp3 !== 'undefined') {
                        l_pageName = l_pageName + "|" + dlp3;
                    } 
                    //capture 4th URL folder
                    if (domPathname.split('/')[i+3] !== '') {
                        var dlp4 = domPathname.split('/')[i+3];
                        if (typeof dlp4 !== 'undefined') {
            	        l_pageName = l_pageName + "|" + dlp4;
                        } 
                    } 
                }
            }
        } 
  
         if (b.page_name === '' || b.page_name === null) {
            if(document.title !== "") { 
               b.page_name = document.title;
            } 
			else if(document.title === "") {
               var re = /([\w\d_-]*)\.?[^\\\/]*$/i;
               var url = document.location.href;
               if (url.match(re)[0]) {
                  var sp1  = url.match(re)[0];
	                 b.page_name = sp1; 
               } 
	       else {
	          b.page_name = "no page_name set";
               }
            }
         } 
        globalPageDetail = b.page_name;
        globalHier = l_pageName;
        l_pageName = l_pageName + "|" + b.page_name;
        globalPageName = l_pageName.toLowerCase();

   } 
}
   catch (e) {
   }  
},

getParameterByNameWebSDK: function(name, url){
    try {
			if (!url) url = (window.location != window.parent.location) ? document.referrer : document.location.href;
			url = url.toLowerCase();
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?&]" + name.toLowerCase() + "(=([^&#]*)|&|#|$)")
			  , results = regex.exec(url);
			if (!results) return null ;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
    } catch (e) {
	}
},

setGetURLParameterWebSDK: function(paramName, paramValue, lurl) {
try{
    var url = lurl;
    var hash = location.hash;
    url = url.replace(hash, '');
    if (url.indexOf(paramName + "=") >= 0)
    {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
    {
    if (url.indexOf("?") < 0)
        url += "?" + paramName + "=" + paramValue;
    else
        url += "&" + paramName + "=" + paramValue;
    }
    return url + hash;
    } 
	catch (e) {
	}    
}
};
 
  globalAdobeObjectWebSDK.setAdobePageNameWebSDK('tealiumPage');  
   
} catch (e) {}  
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){

if(typeof b.tealium_cmx_event == "undefined" || (typeof b.tealium_cmx_event != "undefined" && b.tealium_cmx_event.indexOf("GAM") == -1) ){
    if(b.tealium_cmx_event != "criteo_on_page_load" && b.tealium_cmx_event != "criteo_on_view"){
        var  _experience = {
              "analytics" : {
                "customDimensions": {
                  "eVars" : {}, 
                  "lists" : {},
                  "props" : {},
                  "hierarchies" : {}
                },
                "event1to100": {},
                "event101to200": {},
                "event201to300": {},
                "event301to400": {}
              }
     };
     var web = {
            webPageDetails: {
                name: ""
            }
    }
    //var commerce = {};
 b.eVarsObj = _experience.analytics.customDimensions.eVars;
 b.propsObj = _experience.analytics.customDimensions.props;
 b.hierObj = _experience.analytics.customDimensions.hierarchies;
 b.eventobj1to100 = _experience.analytics.event1to100;
 b.eventobj101to200 = _experience.analytics.event101to200;
 b.eventobj201to300 = _experience.analytics.event201to300;
 b.eventobj301to400 = _experience.analytics.event301to400;
 b.listsobj = _experience.analytics.customDimensions.lists;
 b.webSDKPageName = web.webPageDetails.name;
// b.commerceObj = commerce;
  var marketing = {};
    let event_name_string = b.events;
            if(event_name_string){
            processInputString(event_name_string);
           }
    if(typeof  utag.data.link_name == "string" && (utag.data.link_name.indexOf("gam") >-1 || utag.data.link_name.indexOf("criteo") > -1)){
                return false;
            }
            webSDKGlobalEvents();
            setProductStringVariable();
            adobeWebSDKEvents();
            nullifyWebSDKData();
        }
    }

    function webSDKGlobalEvents(){
        try{

        if (typeof b !== 'undefined' && typeof b["ut.event"] !== 'undefined' && b['ut.event'] === 'view'){
            
            if(typeof globalPageName == "string" && globalPageName != ""){
             b.webSDKPageName = b.eVarsObj.eVar4 =  globalPageName;
            }
            if(typeof globalPageDetail == "string" && globalPageDetail != ""){
            b.propsObj.prop3 =   globalPageDetail;
            }
             b.eVarsObj.eVar38 = b['dom.domain'];
             b.eVarsObj.eVar41 = b.platform;
             b.eVarsObj.eVar49 = b['dom.domain'] + b['dom.pathname'];
             b.eVarsObj.eVar51 = b['dom.title'];
             b.eVarsObj.eVar52 = ((b['dom.query_string']==='') ? '' : '?') + b['dom.query_string'];
             if(typeof navigator.userAgent == "string") {b.eVarsObj.eVar53 =  navigator.userAgent;}
             b.eVarsObj.eVar57 = b.page_category;
             if (typeof b.state_extracare_link !== 'undefined') {b.eVarsObj.eVar59 = b.state_extracare_link;}
             if (typeof b.rx_store_id !== 'undefined') {b.eVarsObj.eVar97 = b.rx_store_id;}
             if (typeof b["cp.flipp2"] !== 'undefined') {b.eVarsObj.eVar144 = b.state_extracare_link;}
             if (typeof b["cp.ecFingerprintId"] !== 'undefined') {b.eVarsObj.eVar128 = b["cp.ecFingerprintId"];}
             if (typeof b["cp.ecFingerprintId"] !== 'undefined') {b.eVarsObj.eVar128 = "yes";} else {b.eVarsObj.eVar128 = "no";}
             if (typeof b["cp.aat1"] !== 'undefined') {b.eVarsObj.eVar137 = b["cp.aat1"];}
             
              if (typeof b !== 'undefined' && typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'link') {
                            b.eVarsObj.eVar34 = "web link|fs profile";
                }
                 if (globalAdobeObjectWebSDK.getParameterByNameWebSDK("WT.mc_id")) {
                 let campaignVal = globalAdobeObjectWebSDK.getParameterByNameWebSDK("WT.mc_id");
                 b.eVarsObj.eVar39 = b.eVarsObj.eVar45 = b.eVarsObj.eVar62 = b.campaignObj = campaignVal;
                    }
                else if (globalAdobeObjectWebSDK.getParameterByNameWebSDK("CID")) {
                    let campaignVal = globalAdobeObjectWebSDK.getParameterByNameWebSDK("CID");
                    b.eVarsObj.eVar39 = b.eVarsObj.eVar45 = b.eVarsObj.eVar62 = b.campaignObj = campaignVal;
                    } 
                else if (globalAdobeObjectWebSDK.getParameterByNameWebSDK("cid")) {
                let campaignVal = globalAdobeObjectWebSDK.getParameterByNameWebSDK("cid");
                    b.eVarsObj.eVar39 = b.eVarsObj.eVar45 = b.eVarsObj.eVar62 = b.campaignObj = campaignVal;
                    } 
                else if (globalAdobeObjectWebSDK.getParameterByNameWebSDK("WT.tsrc")) {
                let campaignVal = globalAdobeObjectWebSDK.getParameterByNameWebSDK("WT.tsrc");
                b.eVarsObj.eVar39 = b.eVarsObj.eVar45 = b.eVarsObj.eVar62 = b.campaignObj = campaignVal;
                } 
      
             if(b.hier2 !== "undefined"){
                b.hierObj.hier2 = {};
                b.hierObj.hier2.values = [];
                b.hierObj.hier2.values = b.hier2;
                }    
             //Props
             if (typeof b.page_category !== 'undefined') {b.propsObj.prop5 = b.page_category;}
             if (typeof b.platform !== 'undefined') {b.propsObj.prop11 = b.platform;}
             
                 var local_time = new Date();
                 b.propsObj.prop47 = local_time.getMonth()+1 + '/' + local_time.getDate() + '/' + local_time.getFullYear() + ' ' 
                               + (local_time.getHours()>12?local_time.getHours()-12:local_time.getHours()) + ':' + (local_time.getMinutes()<10?'0':'') + local_time.getMinutes()  + ' ' + (local_time.getHours()>11?'PM':'AM');	
            
                b.propsObj.prop48 = b["ut.env"];
                
                    
            }
            if (typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'link') {
                if(typeof navigator.userAgent !== "undefined") {b.eVarsObj.eVar53 =  navigator.userAgent;}
            }
           
   if (typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'link' || b['ut.event'] == 'view'){  
       
    if(typeof b.pageComponentDisplay !== 'undefined' && typeof b.component_name !== 'undefined'){
            b.listsobj.list3 = 
            {
                "list" :[{
               "value" : b.pageComponentDisplay + '|' + b.component_name}]
            };
    }  else if (typeof b.pageComponentDisplay !== 'undefined'){
            b.listsobj.list3 = 
            {
                "list" :[{
               "value" : b.pageComponentDisplay}]
            };
    } 
    else if (typeof b.component_name !== 'undefined'){
        b.listsobj.list3 = 
            {
                "list" :[{
               "value" : b.component_name}]
            };
    }
       if (typeof b.userSearchTerm !== 'undefined'){
           b.eVarsObj.eVar19 =  b.userSearchTerm;
       }
       else if (b.search_term_autocorrect !== 'undefined'){
            b.eVarsObj.eVar19 =  b.search_term_autocorrect;
       }
       else if (b.search_term_autocorrected !== 'undefined'){
            b.eVarsObj.eVar19 =  b.search_term_autocorrected;
       }
       if(typeof globalPageName == "string" && globalPageName !== ""){
             b.webSDKPageName = b.eVarsObj.eVar4 =  globalPageName;
            }
        if (typeof b.searchType !== 'undefined'){
           b.eVarsObj.eVar20 =  b.searchType;
       }
       else if (b.search_type !== 'undefined'){
            b.eVarsObj.eVar20 =  b.search_type;
       }
   }
       
            
        }catch(e){
           b.list_error = "Extension Error s_doPlugins fs profile "+ e.message; 
           b.listsobj.list1 = 
            {
                "list" :[{
               "value" : "Extension Error s_doPlugins fs profile "+ e.message}]
            };
                b.eventobj1to100.event4 = {
                "value" : 1
                };
        }
    
    }
    function setProductStringVariable(){
        try{
        if (typeof b !== 'undefined' && typeof b.events !== 'undefined') {
             if (typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'link') {
                 //var commerce = {};
     var productlistitems = {
     name: "",
     priceTotal: "",
     quantity: "",
     SKU: "",
     _experience: {
         analytics: {
             customDimensions: {
                 eVars: {}
             },
             event1to100: {},
             event201to300: {}
         }
     }
 };
 var eVars = productlistitems._experience.analytics.customDimensions.eVars;
 var event1to100 = productlistitems._experience.analytics.event1to100;
 b.prodratingObj = "";
 b.prodsectionObj = "";
 b.productcategorybj = "";
 b.product_price = [];
 b.product_quantity_webSDK = [];
 b.productprofileobj = "";
 b.price;
 b.product_array = b.products.split(',');
 b.ProdQuantity = "";
 b.productID = "";
 b.prodObj = [];
                 

if(typeof b.productListItemsSDK != "undefined" && b.productListItemsSDK instanceof Array) {
       b.prodObj = b.productListItemsSDK;
   }

//******************************************************************************************scremove ******************************************************
                else if (typeof b.events == "string" && b.events.indexOf('scRemove') > -1) {
                    /* commerce = {
            productListRemovals : {
                value: 1
            }
    };*/
            for(let i = 0; i < b.product_array.length; i++){ 
 b.productID = b.product_array[0].split(';')[1];
 ///////////////////////////////////////////////////quantity//////////////////////////////////////
 if (b.products !== undefined) {
     b.scraped_ProdQuantity = b.products.split('|')[1];
     b.scraped_product_Quantity = b.scraped_ProdQuantity.split('=')[1];
     b.product_quantity_webSDK = b.scraped_product_Quantity.split(';')[0];
 }
 ////////////////////////////////////price//////////////////////////////////////////////////////
if (b.products !== undefined) {
 b.scraped_product_price = b.products.split('|')[0];
 b.scraped_product_prices = b.scraped_product_price.split('=')[1];
 b.product_price = b.scraped_product_prices;
 } 
///////////////////////////////////product category /////////////////////////////////
if(b.products.split('|')[2] !== undefined){
b.scraped_product_categ = b.products.split('|')[2];
b.productcategorybj = b.scraped_product_categ.split('=')[1];
}
 }
 //productlistitem = productlistitems;
 productlistitems.SKU = b.productID;
 productlistitems.priceTotal =  b.product_price;
 productlistitems.quantity = b.product_quantity_webSDK;
 productlistitems._experience.analytics.customDimensions.eVars.eVar71 = b.productID;
 productlistitems._experience.analytics.customDimensions.eVars.eVar47 =  "fs";
 productlistitems._experience.analytics.customDimensions.eVars.eVar56 =  b.productcategorybj;
 productlistitems._experience.analytics.event201to300.event238 = {
     "value" : b.product_price
 };
 productlistitems._experience.analytics.event201to300.event239 = {
     "value" : b.product_quantity_webSDK
 };        
 
 b.prodObj.push(productlistitems);
                 
                 }
                 

 //******************************************************************************************product string ******************************************************
                else if (typeof b.events == "string" &&  b.events.indexOf('scAdd') > -1 || b.events.indexOf("scOpen") > -1) {
                  var  productStringArr = [];
    b.prodObj = [];
   
        var productListItems = [];
    var productChunks = b.products.split(",");
    for (var i = 0; i < productChunks.length; i++) {
        var chunk = productChunks[i].split(";");
        var SKU = chunk[1];
        var eVarsString = chunk[5];
        var eVarsPairs = eVarsString.split("|");
        var eventString = chunk[4];
        var eventsPairs = eventString.split("|");
        var eVars = {};
        var events = {};
        for (var j = 0; j < eVarsPairs.length; j++) {
            var pair = eVarsPairs[j].split("=");
            var key = pair[0];
            var value = pair[1];
           if (eventsPairs[0].length > 0) {
                eventsPairs.forEach(pair => {
                    p = pair.split('=');
                    var k = p[0];
                    var v = p[1];
                    events[k] = {
                        value: Number(v)
                    };
                });

            }
            if (value && value !== "null" && !(value.toLowerCase().indexOf('nan') > -1)) {
                eVars[key] = value;
            if (key.indexOf('event') === 0) {
                    events[key] = {
                        value: Number(value)
                    };
                }
            }     
        }

        productStringArr.push({
            SKU: SKU,
            _experience: {
                analytics: {
                    customDimensions: {
                        eVars: eVars
                    },
                     event1to100: events
                }
            }
        });
      b.prodObj = productStringArr;
      
    }
                 }
                 

if(typeof b.events != "undefined" && b.events.indexOf("scAdd") > -1){
     
    b.cartAdds =1;
   }
    
  if(typeof b.events == "string" && b.events.indexOf("scRemove") > -1){
     
    b.cartRemoves = 1;
  }
    
  if(typeof b.events == "string" && b.events.indexOf("scOpen") > -1){
     
     b.cartOpens = 1;
  }
 
             }}}catch(e){}

}
    function adobeWebSDKEvents(){
        try{
        
        if (typeof b.lcpTime !== 'undefined') {
        b.eventobj201to300.event280 = {
            "value" : 1
        }}
        
        if (typeof b.preciselyTypeAheadCount !== 'undefined') {
        b.eventobj201to300.event281 = {
            "value" : Number(b.preciselyTypeAheadCount)
        }}
        
        if (typeof b.savingsRemoved !== 'undefined') {
        b.eventobj201to300.event282 = {
            "value" : 1
        }}
        
        if (typeof b.autoAppliedSavings !== 'undefined') {
        b.eventobj201to300.event283 = {
            "value" : 1
        }}
        
        if (typeof b !== 'undefined' && typeof b.tool_type !== 'undefined') {
        b.eventobj1to100.event1 = {
            "value" : 1
        }}
        
        if (typeof b !== 'undefined' && typeof b.bopis_substitution_count !== 'undefined') {
        b.eventobj101to200.event176 = {
            "value" : 1
        }}
        
        if (typeof b !== 'undefined' && typeof b.ecsendalltocard !== 'undefined') {
        b.eventobj101to200.event157 = {
            "value" : b.ecsendalltocard
        }}
        
       if (typeof b.ec_error !== 'undefined') {
        b.eventobj1to100.event59 = {
            "value" : 1
        }}
        
        if (typeof b.eb_deals_failed_to_send !== 'undefined') {
        b.eventobj1to100.event71 = {
            "value" : b.eb_deals_failed_to_send
        }}
    
         if( typeof b.search_results !== 'undefined' && b.search_results !== '0' ){
           b.eventobj1to100.event6 = {
            "value" : 1
        };
       }

       if(typeof b.search_results !== 'undefined' && b.search_results == '0' ){
           b.eventobj1to100.event7 = {
            "value" : 1
        };
       }
       
      if( typeof b.account_creation_start !== 'undefined' && b.account_creation_start == '1' ){
           b.eventobj1to100.event54 = {
            "value" : 1
        };
       }
       if(typeof b.account_creation_complete == 'undefined' &&  b.account_creation_complete == '1' ){
           b.eventobj1to100.event55 = {
            "value" : 1
        };
       }
       
      if(typeof b.order_confirm_count !== 'undefined' ){
           b.eventobj101to200.event107 = {
            "value" : Number(b.order_confirm_count)
        };
       }
       
       if(typeof b.order_total !== 'undefined' ){
           b.eventobj1to100.event69 = {
            "value" : parseFloat(b.order_total)
        };
       }
       
      if(typeof b.reviews_shown !== 'undefined' && b.reviews_shown == '1' ){
           b.eventobj1to100.event45 = {
            "value" : 1
        };
       }
       
      if(typeof b.order_level_discount !== 'undefined' ){
           b.eventobj1to100.event35 = {
            "value" : parseFloat(b.order_level_discount)
        };
       }	
        
        if(typeof b.order_tax_amount !== 'undefined'){
           b.eventobj1to100.event37 = {
            "value" : parseFloat(b.order_tax_amount)
        };
       }
       
       if(typeof b.order_shipping_amount !== 'undefined' ){
           b.eventobj1to100.event38 = {
            "value" : parseFloat(b.order_shipping_amount)
        };
       }

       if(typeof b.order_pre_discount !== 'undefined' ){
           b.eventobj1to100.event69 = {
            "value" : parseFloat(b.order_pre_discount)
        };
       }
       
        if(typeof b.login_success !== 'undefined' && b.login_success == '1' ){
           b.eventobj1to100.event22 = {
            "value" : 1
        };
       }
       
       if(typeof b.form_complete !== 'undefined' && b.form_complete == '1' ){
           b.eventobj1to100.event11 = {
            "value" : 1
        };
       }
       
        if(typeof b.order_submit !== 'undefined' && b.order_submit == '1'){
                if(typeof b.productListItemsSDK != "undefined" && b.productListItemsSDK instanceof Array) {
       b.prodObj = b.productListItemsSDK;
       b.eventobj1to100.event34 = {
            "value" : 1
        };
    }
        else{
        // var commerce = {};
        var productlistitems = {
        name: "",
        priceTotal: "",
        quantity: "",
        SKU: "",
        _experience: {
            analytics: {
                customDimensions: {
                    eVars: {}
                },
                event1to100: {}
            }
        }
    };
    
    var eVars = productlistitems._experience.analytics.customDimensions.eVars;
    var event1to100 = productlistitems._experience.analytics.event1to100;
    b.prodshipObj = "";
    prodshippickupObj = "";
    b.prodratingObj = "";
    b.prodsectionObj = "";
    b.productcategorybj = "";
    b.product_price = [];
    b.product_quantity_webSDK = [];
    b.price;
    b.product_array = b.products.split(',');
    b.ProdQuantity = "";
    b.productID = "";
    b.prodObj = [];
   // b.commerceObj = {};   
            
     var  productStringArr = [];
    b.prodObj = [];
   
        var productListItems = [];
    var productChunks = b.products.split(",");
    for (var i = 0; i < productChunks.length; i++) {
        var chunk = productChunks[i].split(";");
        var SKU = chunk[1];
        var priceTotal = chunk[3];
        var quantity = chunk[2];
        var eVarsString = chunk[5];
        var eVarsPairs = eVarsString.split("|");
        var eventString = chunk[4];
        var eventsPairs = eventString.split("|");
        var eVars = {};
        var events = {};
        for (var j = 0; j < eVarsPairs.length; j++) {
            var pair = eVarsPairs[j].split("=");
            var key = pair[0];
            var value = pair[1];
           if (eventsPairs[0].length > 0) {
                eventsPairs.forEach(pair => {
                    p = pair.split('=');
                    var k = p[0];
                    var v = p[1];
                    events[k] = {
                        value: Number(v)
                    };
                });

            }
            
            if (value && value !== "null" && !(value.toLowerCase().indexOf('nan') > -1)) {
                eVars[key] = value;
            if (key.indexOf('event') === 0) {
                    events[key] = {
                        value: Number(value)
                    };
                }
            }     
        }

        productStringArr.push({
            SKU: SKU,
            priceTotal: priceTotal,
            quantity: quantity,
            _experience: {
                analytics: {
                    customDimensions: {
                        eVars: eVars
                    },
                     event1to100: events
                }
            }
        });
      b.prodObj = productStringArr;
      
    }
    b.eventobj1to100.event34 = {
            "value" : 1
        };
}
       }
       
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
       
       if(typeof b.rx_count !== 'undefined' ){
           b.eventobj1to100.event63 = {
            "value" : Number(b.rx_count)
        };
       }

       if(typeof b.carepass_coupon_discount !== 'undefined' ){
           b.eventobj1to100.event85 = {
            "value" : Number(b.carepass_coupon_discount)
        };
       }

       if(typeof b.free_shipping_savings !== 'undefined' ){
           b.eventobj1to100.event84 = {
            "value" : parseFloat(b.free_shipping_savings)
        };
       }

       if(typeof b.coupon_count !== 'undefined' ){
           b.eventobj1to100.event83 = {
            "value" : b.coupon_count
        };
       }

        if(typeof b.eb_balance_to_send !== 'undefined' ){
           b.eventobj1to100.event70 = {
            "value" : Number(b.eb_balance_to_send)
        };
       }

        if(typeof b.ecSend !== 'undefined' && b.ecSend == '1' ){
           b.eventobj1to100.event58 = {
            "value" : 1
        };
       }

       else if(typeof b.ec_s2c !== 'undefined' && b.ec_s2c == '1' ){
           b.eventobj1to100.event58 = {
            "value" : 1
        };
       }

       if(typeof b.site_error !== 'undefined' && b.site_error == '1' ){
           b.eventobj1to100.event4 = {
            "value" : 1
        };
       }

       if(typeof b.form_event !== 'undefined' && b.form_event == 'form start' ){
           b.eventobj1to100.event10 = {
            "value" : 1
        };
       }

       if(typeof b.couponsDisplayed !== 'undefined' ){
           b.eventobj1to100.event82 = {
            "value" : b.couponsDisplayed
        };
       }

       if(typeof b.ceb_total !== 'undefined' ){
           b.eventobj101to200.event178 = {
            "value" : b.ceb_total
        };
       }

       if(typeof b.ceb_threshold !== 'undefined' ){
           b.eventobj101to200.event179 = {
            "value" : b.ceb_threshold
        };
       }

       if(typeof b.search_suggestion_line_number !== 'undefined' ){
           b.eventobj101to200.event198 = {
            "value" : b.search_suggestion_line_number
        };
       }

       if(typeof b.banner_displayed !== 'undefined' && b.banner_displayed == '1' ){
           b.eventobj1to100.event51 = {
            "value" : 1
        };
       }

        if(typeof b.shipping_exposed_filter !== 'undefined' && b.shipping_exposed_filter == '1' ){
           b.eventobj101to200.event168 = {
            "value" : 1
           };
       }
  
        if(typeof b.pickup_exposed_filter !== 'undefined' && b.pickup_exposed_filter == '1' ){
           b.eventobj101to200.event169 = {
            "value" : 1
        };
       }

       if(typeof b.sms_opt_in !== 'undefined' && b.sms_opt_in == '1' ){
           b.eventobj101to200.event160 = {
            "value" : 1
        };
       }

       if(typeof b.bopis_eligible_stores !== 'undefined' && b.bopis_eligible_stores == '1' ){
           b.eventobj201to300.event212 = {
            "value" : 1
        };
       }

       if(typeof b.bopis_eligible_total !== 'undefined' && b.bopis_eligible_total == '1' ){
           b.eventobj201to300.event205 = {
            "value" : 1
        };
       }

       if(typeof b.bopis_eligible_only !== 'undefined' && b.bopis_eligible_only == '1' ){
           b.eventobj201to300.event206 = {
            "value" : 1
        };
       }

       if(typeof b.instock_total !== 'undefined' && b.instock_total == '1' ){
           b.eventobj201to300.event207 = {
            "value" : 1
        };
       }

       if(typeof b.delivery_total !== 'undefined' && b.delivery_total !== '' ){
           b.eventobj201to300.event208 = {
            "value" : Number(b.delivery_total)
        };
       }

       if(typeof b.delivery_only !== 'undefined' && b.delivery_only == '1' ){
           b.eventobj201to300.event209 = {
            "value" : 1
        };
       }

       if(typeof b.items_total !== 'undefined' && b.items_total == '1' ){
           b.eventobj201to300.event210 = {
            "value" : Number(b.items_total)
        };
       }

       if(typeof b.outofstock_total !== 'undefined' && b.outofstock_total == '1' ){
           b.eventobj201to300.event211 = {
            "value" : 1
        };
       }

       if(typeof b.medallia_custom_event !== 'undefined' && b.medallia_custom_event == 'MDigital_Invite_Displayed' ){
           b.eventobj101to200.event200 = {
            "value" : 1
        };
       }

       if(typeof b.medallia_custom_event !== 'undefined' && b.medallia_custom_event == 'MDigital_Form_Displayed' ){
           b.eventobj201to300.event201 = {
            "value" : 1
        };
       }

       if(typeof b.medallia_custom_event !== 'undefined' && b.medallia_custom_event == 'MDigital_Submit_Feedback' ){
           b.eventobj201to300.event202 = {
            "value" : 1
        };
       }

       if(typeof b.badge_count !== 'undefined' ){
           b.eventobj201to300.event240 = {
            "value" : b.badge_count
        };
       }

       if(typeof b.promocode_applied !== 'undefined' && b.promocode_applied == '1' ){
           b.eventobj201to300.event222 = {
            "value" : 1
        };
       }

       if(typeof b.deal_applied !== 'undefined' && b.deal_applied == '1' ){
           b.eventobj201to300.event223 = {
            "value" : 1
        };
       }

       if(typeof b.savings_applied !== 'undefined' && b.savings_applied == '1' ){
           b.eventobj201to300.event224 = {
            "value" : Number(b.savings_applied)
        };
       }

       if(typeof b.savings_displayed !== 'undefined' && b.savings_displayed == '1' ){
           b.eventobj201to300.event225 = {
            "value" : Number(b.savings_displayed)
        };
       }

       if(typeof b.savings_amount_applied !== 'undefined' ){
           b.eventobj201to300.event226 = {
            "value" : Number(b.savings_amount_applied)
        };
       }

       if(typeof b.bopis_sku_add !== 'undefined' && b.bopis_sku_add == '1' ){
           b.eventobj201to300.event214 = {
            "value" : 1
        };
       }

       if(typeof b.bopis_sku_remove !== 'undefined' && b.bopis_sku_remove == '1' ){
           b.eventobj201to300.event215 = {
            "value" : 1
        };
       }

       if(typeof b.flow !== 'undefined' && b.flow == 'complete' ){
           b.eventobj1to100.event57 = {
            "value" : 1
        };
       }

       if(typeof b.flow !== 'undefined' && b.flow == 'start' ){
           b.eventobj1to100.event56 = {
            "value" : 1
        };
       }

       if( typeof b.selfservice_complete !== 'undefined'){
           b.eventobj1to100.event29 = {
            "value" : 1
        };
       }

       if( typeof b.selfservice_start !== 'undefined'){
           b.eventobj1to100.event28 = {
            "value" : 1
        };
       }

       if( typeof b.nw_rx_pickup_count !== 'undefined'){
           b.eventobj101to200.event104 = {
            "value" : 1
        };
       }

       if(typeof b.videoComplete !== 'undefined' && b.videoComplete == '1' ){
           b.eventobj1to100.event31 = {
            "value" : 1
        };
       }

      if(typeof b.videoDisplayed !== 'undefined' && b.videoDisplayed == '1' ){
           b.eventobj1to100.event23 = {
            "value" : 1
        };
       }

       if(typeof b.videoMOne !== 'undefined' && b.videoMOne == '1' ){
           b.eventobj1to100.event25 = {
            "value" : 1
        };
       }

       if(typeof b.videoMThree !== 'undefined' && b.videoMThree == '1' ){
           b.eventobj1to100.event27 = {
            "value" : 1
        };
       }

       if(typeof b.videoMTwo !== 'undefined' && b.videoMTwo == '1' ){
           b.eventobj1to100.event26 = {
            "value" : 1
        };
       }

       if(typeof b.videoStart !== 'undefined' && b.videoStart == '1' ){
           b.eventobj1to100.event24 = {
            "value" : 1
        };
       }

       if( typeof b.locationPromptDisplayed !== 'undefined'){
           b.eventobj1to100.event62 = {
            "value" : 1
        };
       }

       if( typeof b.sddtotal !== 'undefined'){
           b.eventobj101to200.event139 = {
            "value" : 1
        };
       }

       if( typeof b.googleLiaMatched !== 'undefined'){
           b.eventobj101to200.event156 = {
            "value" : 1
        };
       }

       if( typeof b.googleLiaNotMatched !== 'undefined'){
           b.eventobj201to300.event251 = {
            "value" : 1
        };
       }

       if( typeof b.idenPage !== 'undefined'){
           b.eventobj201to300.event257 = {
            "value" : 1
        };
       }

       if( typeof b.nonidenPage !== 'undefined'){
           b.eventobj201to300.event258 = {
            "value" : 1
        };
       }

       if( typeof b.overlayDisplayed !== 'undefined'){
           b.eventobj1to100.event50 = {
            "value" : 1
        };
       }

       if( typeof b.nullSearches !== 'undefined'){
           b.eventobj1to100.event7 = {
            "value" : 1
        };
       }
       
       if( typeof b.internalSearches !== 'undefined'){
           b.eventobj1to100.event6 = {
            "value" : 1
        };
       }

       if(typeof b.clickCall !== 'undefined' ){
           b.eventobj1to100.event20 = {
            "value" : b.clickCall
        };
       }

        if( typeof b.smartBannerDisplayed !== 'undefined' && b.smartBannerDisplayed !== ""){
           b.eventobj201to300.event289 = {
            "value" : 1
        };
       }

       if( typeof b.exposedFilterSDD !== 'undefined' && b.exposedFilterSDD !== ""){
           b.eventobj301to400.event327 = {
            "value" : 1
        };
       }
       
       if( typeof b.clickstartersStopScroll !== 'undefined' && b.clickstartersStopScroll !== ""){
           b.eventobj301to400.event333 = {
            "value" : 1
        };
       }

       if( typeof b.targetICIDClick1 !== 'undefined' && b.targetICIDClick1 !== ""){
           b.eventobj301to400.event321 = {
            "value" : 1
        };
       }

       if( typeof b.targetICIDClick2 !== 'undefined' && b.targetICIDClick2 !== ""){
           b.eventobj301to400.event322 = {
            "value" : 1
        };
       }

       if( typeof b.targetICIDClick3 !== 'undefined' && b.targetICIDClick3 !== ""){
           b.eventobj301to400.event323 = {
            "value" : 1
        };
       }

       if( typeof b.targetICIDClick4 !== 'undefined' && b.targetICIDClick4 !== ""){
           b.eventobj301to400.event324 = {
            "value" : 1
        };
       }

       if( typeof b.targetICIDClick5 !== 'undefined' && b.targetICIDClick5 !== ""){
           b.eventobj301to400.event325 = {
            "value" : 1
        };
       }

        if( typeof b.smartBannerClicked !== 'undefined' && b.smartBannerClicked !== ""){
           b.eventobj201to300.event290 = {
            "value" : 1
        };
       }
      if( typeof b.otcAmountAvailable !== 'undefined' && b.otcAmountAvailable !== ""){
          b.eventobj301to400.event334 = {
            "value" : 1
        };
       }
               if( typeof b.link_name !== 'undefined' && b.link_name !== ""){
           b.eventobj1to100.event21 = {
            "value" : 1
        };
       }
               if( typeof b.typeaheadSearchAdDisplayed !== 'undefined' && b.typeaheadSearchAdDisplayed !== ""){
           b.eventobj201to300.event213 = {
            "value" : b.typeaheadSearchAdDisplayed
        };
       }
              if( typeof b.deliveredImageDisplayed !== 'undefined' && b.deliveredImageDisplayed !== ""){
           b.eventobj201to300.event253 = {
            "value" : 1
        };
       }
              if( typeof b.pageReloadCount !== 'undefined' && b.pageReloadCount !== ""){
           b.eventobj301to400.event338 = {
            "value" : 1
        };
       }
               if( typeof b.addToShoppingList !== 'undefined' && b.addToShoppingList !== ""){
           b.eventobj301to400.event340 = {
            "value" : b.addToShoppingList
        };
       }       
               if( typeof b.removeFromShoppingList !== 'undefined' && b.removeFromShoppingList !== ""){
           b.eventobj301to400.event341 = {
            "value" : b.removeFromShoppingList
        };
       }   
               if( typeof b.addToShoppingListCheckoutPage !== 'undefined' && b.addToShoppingListCheckoutPage !== ""){
           b.eventobj301to400.event342 = {
            "value" : b.addToShoppingListCheckoutPage
        };
       }
               if( typeof b.removeFromShoppingListCheckoutPage !== 'undefined' && b.removeFromShoppingListCheckoutPage !== ""){
           b.eventobj301to400.event343 = {
            "value" : b.removeFromShoppingListCheckoutPage
        };
       }          
               if( typeof b.countOfItemsOnShoppingList !== 'undefined' && b.countOfItemsOnShoppingList !== ""){
           b.eventobj301to400.event344 = {
            "value" : b.countOfItemsOnShoppingList
        };
       }
               if( typeof b.countOfFSShoppingLists !== 'undefined' && b.countOfFSShoppingLists !== ""){
           b.eventobj301to400.event347 = {
            "value" : b.countOfFSShoppingLists
        };
       }         
        }catch(e){}
}

function processInputString(input) {
    try {
        var events = {};
        var regex = /event(\d+)(?:=(\d*\.?\d+))?/g;
        var matches = input.match(regex) || [];
        for (var i = 0; i < matches.length; i++) {
            var match = matches[i].match(/event(\d+)(?:=(\d*\.?\d+))?/);
            var eventName = 'event' + match[1];
            var eventValue = match[2] === undefined ? 1 : Number(match[2]);
            if ((typeof eventValue == 'number') && (eventName != "event170" && eventName != "event214" && eventName != "event32" && eventName != "event33" && eventName != "event217" && eventName != "event238" && eventName != "event239")) {
                events[eventName] = eventValue;
            }
        }
        var experience = {
            event1to100: {},
            event101to200: {},
            event201to300: {}
        };
        for (var eventName in events) {
            var value = events[eventName];
            if (eventName.indexOf('event') === 0 && !isNaN(parseInt(eventName.substring(5), 10))) {
                var num = parseInt(eventName.substring(5), 10);
                if (num >= 1 && num <= 100) {
                    mergeEvent(experience.event1to100, eventName, value);
                } else if (num >= 101 && num <= 200) {
                    mergeEvent(experience.event101to200, eventName, value);
                } else if (num >= 201 && num <= 300) {
                    mergeEvent(experience.event201to300, eventName, value);
                }
            }
        }
        if (Object.keys(experience.event1to100).length > 0) {
            b.eventobj1to100 = experience['event1to100'];
        }
        if (Object.keys(experience.event101to200).length > 0) {
            b.eventobj101to200 = experience['event101to200'];
        }
        if (Object.keys(experience.event201to300).length > 0) {
            b.eventobj201to300 = experience['event201to300'];
        }
    } catch (e) {}
}
function mergeEvent(parent, eventName, value) {
    try {
        parent[eventName] = {
            value: value
        };
    } catch (e) {}
}
        
    function nullifyWebSDKData(){
        try{
            if (typeof b !== 'undefined' && typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'link') {
                    b.propsObj.prop75 = "web link|fs profile" ;
                    
                }
                if (typeof b !== 'undefined' && typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'view') {
                    b.propsObj.prop75 = "web view|fs profile" ;
                    
                }
                
                
                 //Clean up legacy values collected in state_logged_in to use consistent values of true/false/rememberme
        if (typeof b.state_logged_in != "undefined") {
                    b.eVarsObj.eVar35 = b.state_logged_in;
            if (typeof b.state_logged_in == "string") {
                if (b.state_logged_in.toLowerCase() == "loggedin" || b.state_logged_in.toLowerCase() == "logged in" || b.state_logged_in.toLowerCase() == "logged_in" || b.state_logged_in.toLowerCase() == "true") {
                    b.eVarsObj.eVar35 = "true";
                } else if (b.state_logged_in.toLowerCase() == "anonymous" || b.state_logged_in.toLowerCase() == "false") {
                    b.eVarsObj.eVar35 = "false";
                } else if (b.state_logged_in.toLowerCase() == "rememberme" || b.state_logged_in.toLowerCase() == "remembered" || b.state_logged_in.toLowerCase() == "recordado") {
                    b.eVarsObj.eVar35 = "rememberme";
                }
            } else if (typeof b.state_logged_in == "boolean") {
                if (b.state_logged_in == true) {
                    b.eVarsObj.eVar35 = "true";
                } else if (b.state_logged_in == false) {
                    b.eVarsObj.eVar35 = "false";

                }
            }
        }
        
    //  if(typeof utag.data != "undefined" && typeof utag.data["cp.st"] != "undefined" && typeof b != "undefined" && typeof b.eVarsObj != "undefined" && typeof b.eVarsObj.eVar35 != "undefined" ){
    //      b.eVarsObj.eVar35 = b.eVarsObj.eVar35 + "|" + utag.data["cp.st"];
    //  }
     
     
        if(Object.keys(b.listsobj).length == 0){
          b.listsobj = undefined;
           }
        if(Object.keys(b.eventobj1to100).length == 0){
         b.eventobj1to100 = undefined;
           }
         if(Object.keys(b.eventobj101to200).length == 0){
         b.eventobj101to200 = undefined;
           }
        if(Object.keys(b.eventobj201to300).length == 0){
         b.eventobj201to300 = undefined;
           }
        }catch(e){}
      }
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[768]=='undefined'){utag.runonce.ext[768]=1;if(1){
// Type your JavaScript code here...
if (typeof utag.data['qp.adobe_mc'] !== 'undefined') {
      b.identityMap_id = utag.data['qp.adobe_mc'].split('|')[1].split('=')[1].split();
      b.state = ['ambiguous'];
      b.primaryID = ['true'];
      b.id_namespace = ['ECID'];
} 
}}} catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[648]=='undefined'){utag.runonce.ext[648]=1;if(1){
try{
	window.addEventListener('MDigital_Invite_Displayed',function(mdEvent){
	    utag.link({
	    "medallia_custom_event": "MDigital_Invite_Displayed",
	    "medallia_formID": mdEvent.detail.Form_ID,
	    "link_name": "custom: medallia: MDigital_Invite_Displayed"         	            
		});
	});
	window.addEventListener('MDigital_Form_Displayed',function(mdEvent){
	    utag.link({
	    "medallia_custom_event": "MDigital_Form_Displayed",
	    "medallia_formID": mdEvent.detail.Form_ID,
	    "medallia_formType": mdEvent.detail.Form_Type,
	    "medallia_formID_formType": mdEvent.detail.Form_ID + '|' + mdEvent.detail.Form_Type,
	    "link_name": "custom: medallia: MDigital_Form_Displayed"         	            
		});
	});
	window.addEventListener('MDigital_Submit_Feedback',function(mdEvent){
	    utag.link({
	    "medallia_custom_event": "MDigital_Submit_Feedback",
	    "medallia_formID": mdEvent.detail.Form_ID,
	    "medallia_formType": mdEvent.detail.Form_Type,
	    "medallia_feedback_UUID": mdEvent.detail.Feedback_UUID,
	    "medallia_formID_formType": mdEvent.detail.Form_ID + '|' + mdEvent.detail.Form_Type,
	    "link_name": "custom: medallia: MDigital_Submit_Feedback"     
		});
	});

} catch (error){
	console.log('Medallia-error: ',error.message);
}
}}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
var enableSplitFulfillment = localStorage.getItem('enableSplitFulfillment');
if(typeof enableSplitFulfillment != "undefined" && localStorage.getItem('enableSplitFulfillment') != null ){
    b.enableSplitFulfillment = localStorage.getItem('enableSplitFulfillment');
}


var sf = localStorage.getItem('sf');
if(typeof sf != "undefined" && localStorage.getItem('sf') != null ){
    b.sf = localStorage.getItem('sf');
}
} } catch(e){ utag.DB(e) }  },
function(a,b,c,d){
  b._ccity=(typeof b['']!='undefined')?b['']:'';
  b._ccountry=(typeof b['']!='undefined')?b['']:'';
  b._ccurrency=(typeof b['']!='undefined')?b['']:'';
  b._ccustid=(typeof b['']!='undefined')?b['']:'';
  b._corder=(typeof b['order_id']!='undefined')?b['order_id']:'';
  b._cpromo=(typeof b['']!='undefined')?b['']:'';
  b._cship=(typeof b['']!='undefined')?b['']:'';
  b._cstate=(typeof b['']!='undefined')?b['']:'';
  b._cstore=(typeof b['']!='undefined')?b['']:'web';
  b._csubtotal=(typeof b['']!='undefined')?b['']:'';
  b._ctax=(typeof b['']!='undefined')?b['']:'';
  b._ctotal=(typeof b['']!='undefined')?b['']:'';
  b._ctype=(typeof b['']!='undefined')?b['']:'';
  b._czip=(typeof b['']!='undefined')?b['']:'';
  b._cprod=(typeof b['product_id']!='undefined'&&b['product_id'].length>0)?b['product_id']:[];
  b._cprodname=(typeof b['product_name']!='undefined'&&b['product_name'].length>0)?b['product_name']:[];
  b._cbrand=(typeof b['']!='undefined'&&b[''].length>0)?b['']:[];
  b._ccat=(typeof b['']!='undefined'&&b[''].length>0)?b['']:[];
  b._ccat2=(typeof b['']!='undefined'&&b[''].length>0)?b['']:[];
  b._cquan=(typeof b['product_quantity']!='undefined'&&b['product_quantity'].length>0)?b['product_quantity']:[];
  b._cprice=(typeof b['product_price']!='undefined'&&b['product_price'].length>0)?b['product_price']:[];
  b._csku=(typeof b['product_sku_id']!='undefined'&&b['product_sku_id'].length>0)?b['product_sku_id']:[];
  b._cpdisc=(typeof b['']!='undefined'&&b[''].length>0)?b['']:[];
  if(b._cprod.length==0){b._cprod=b._csku.slice()};
  if(b._cprodname.length==0){b._cprodname=b._csku.slice()};
  function tf(a){if(a=='' || isNaN(parseFloat(a))){return a}else{return (parseFloat(a)).toFixed(2)}};
  b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};
},
function(a,b){ try{ if(b['page_name'].toString().indexOf('shop: content shop:')>-1||b['page_name'].toString().toLowerCase().indexOf('shop: brand shop:'.toLowerCase())>-1){b['fs_pagetype_br']='thematic'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if((typeof b['link_name']!='undefined'&&b['link_name'].toString().toLowerCase()=='custom: shop: plp: refinement'.toLowerCase())){b['category_id']=b['cp.category_id'];b['br_breadcrumb']=b['cp.br_breadcrumb']} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){try{b['gpc']=navigator.globalPrivacyControl.toString()}catch(e){}} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
//website bot Filter https://experienceleague.adobe.com/docs/analytics/implementation/vars/plugins/websitebot.html?lang=en
document.addEventListener('mousemove', function detectMouseMove() {
    document.removeEventListener('mousemove', detectMouseMove, false);
       //bot_value will be passed to prop55 eVar79 in adobe tags
       b['bot_value'] = "false";
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
       b['bot_value'] = "true";
    }
})
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['linkName'].toString().indexOf('custom:shop:plp:add to basket button choose options')>-1){b['productID']=b['product_id'];b['ProdQuantity']='1';b['events']='scAdd'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if((typeof b['dom.pathname']!='undefined'&&b['dom.pathname']!=''&&b['dom.pathname'].toString().toLowerCase().indexOf('prodid'.toLowerCase())>-1)){
if (b.products !== undefined) {
b.scraped_product_price = b.products.split(';')[4];
b.scraped_product_price = b.scraped_product_price.split('=')[1];
b.product_price_cj = [b.scraped_product_price];
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if(b['ut.event'] == 'view'){
if(typeof b.tealium_cmx_event == "undefined" || (typeof b.tealium_cmx_event != "undefined" && b.tealium_cmx_event.indexOf("GAM") == -1) ){
    if(b.tealium_cmx_event != "criteos_on_page_load" && b.tealium_cmx_event != "criteo_on_view"){

        //var  productListItems = [];
       // var commerce = {};
        var productlistitems = {
        name: "",
        priceTotal: "",
        quantity: "",
        SKU: "",
        _experience: {
            analytics: {
                customDimensions: {
                    eVars: {}
                },
                event1to100: {}
            }
        }
    };
    var eVars = productlistitems._experience.analytics.customDimensions.eVars;
    var event1to100 = productlistitems._experience.analytics.event1to100;
    b.prodshipObj = "";
    prodshippickupObj = "";
    b.prodratingObj = "";
    b.pageproductdetailObj = "";
    b.prodsectionObj = "";
    b.productcategorybj = "";
    b.product_price = [];
    b.product_quantity_webSDK = [];
    b.price;
    //b.cartAdds = {};
    b.cartOpens;
    b.product_array = [];
    b.ProdQuantity = "";
    b.productID = "";
    b.prodObj = [];
    //b.commerceObj = {};
    if(typeof b.product_array !== "undefined"){
        b.product_array = b.products.split(',');
    }
    
    
   
   
   if(typeof b.productListItemsSDK != "undefined" && b.productListItemsSDK instanceof Array) {
       b.prodObj = b.productListItemsSDK;
   }
  
   
   else if((typeof b.events != "undefined" && b.events.indexOf("scAdd") > -1) || (typeof b.events == "string" && b.events.indexOf("scRemove") > -1) || (typeof b.events == "string" && b.events.indexOf("scOpen") > -1) || (typeof b.events == "string" && b.events.indexOf("scCheckout") > -1) || (typeof b.events == "string" &&( b.events.indexOf("prodView") > -1||b.events.indexOf("event210") > -1))){
       var  productStringArr = [];
    b.prodObj = [];
   
        var productListItems = [];
    var productChunks = b.products.split(",");
    for (var i = 0; i < productChunks.length; i++) {
        var chunk = productChunks[i].split(";");
        var SKU = chunk[1];
        var eVarsString = chunk[5];
        var eVarsPairs = eVarsString.split("|");
        var eventString = chunk[4];
        var eventsPairs = eventString.split("|");
        var eVars = {};
        var events = {};
        for (var j = 0; j < eVarsPairs.length; j++) {
            var pair = eVarsPairs[j].split("=");
            var key = pair[0];
            var value = pair[1];
           if (eventsPairs[0].length > 0) {
                eventsPairs.forEach(pair => {
                    p = pair.split('=');
                    var k = p[0];
                    var v = p[1];
                    events[k] = {
                        value: Number(v)
                    };
                });

            }
            if (value && value !== "null" && !(value.toLowerCase().indexOf('nan') > -1)) {
                eVars[key] = value;
            if (key.indexOf('event') === 0) {
                    events[key] = {
                        value: Number(value)
                    };
                }
            }     
        }

        productStringArr.push({
            SKU: SKU,
            _experience: {
                analytics: {
                    customDimensions: {
                        eVars: eVars
                    },
                     event1to100: events
                }
            }
        });
      b.prodObj = productStringArr;
      
    }
       
   }
   
   if(typeof b.events != "undefined" && b.events.indexOf("scAdd") > -1){
     
    b.cartAdds =1;
   }
    
  if(typeof b.events == "string" && b.events.indexOf("scRemove") > -1){
     
    b.cartRemoves = 1;
  }
    
  if(typeof b.events == "string" && b.events.indexOf("scOpen") > -1){
     
     b.cartOpens = 1;
  }
   if(typeof b.events == "string" && b.events.indexOf("scView") > -1){
      
    b.cartViews = 1;
   }
   if(typeof b.events == "string" && b.events.indexOf("scCheckout") > -1){ 
    
   
    b.checkouts = 1;
   }
  if(typeof b.events == "string" &&( b.events.indexOf("prodView") > -1||b.events.indexOf("event210") > -1)){
     
    b.productViews = 1;
  }
  
  
//***********************************************************************************sview******************************************************       
  if(typeof b.productListItemsSDK != "undefined" && b.productListItemsSDK instanceof Array) {
       b.prodObj = b.productListItemsSDK;
   }
      
else if(typeof b.events == "string" && b.events.indexOf("scView") > -1){
    var  productStringArr = [];
    b.prodObj = [];
   
    var productListItems = [];
    var productChunks = b.products.split(",");
    for (var i = 0; i < productChunks.length; i++) {
        var chunk = productChunks[i].split(";");
        var SKU = chunk[1];
        var eVarsString = chunk[5];
        var eVarsPairs = eVarsString.split("|");
        var eventString = chunk[4];
        var eventsPairs = eventString.split("|");
        var eVars = {};
        var event101to200 = {};
        var event201to300 = {};
        for (var j = 0; j < eVarsPairs.length; j++) {
            var pair = eVarsPairs[j].split("=");
            var key = pair[0];
            var value = pair[1];
            
            if(typeof eventsPairs != "undefined" && eventsPairs.indexOf("event170") > -1){
               event101to200.event170 = {};
               event101to200.event170.value = 1;
            }
            if(typeof eventsPairs != "undefined" && eventsPairs.indexOf("event214") > -1){
               event201to300.event214 = {};
               event201to300.event214.value = 1;
            }

            if (value && value !== "null" && !(value.toLowerCase().indexOf('nan') > -1)) {
                eVars[key] = value;
            }     
        }

        productStringArr.push({
            SKU: SKU,
            _experience: {
                analytics: {
                    customDimensions: {
                        eVars: eVars
                    },
                    event101to200: event101to200,
                    event201to300: event201to300
                }
            }
        });
      b.prodObj = productStringArr;
     
    }
}
  
    }}
   
   ///////////////////////////////////////////purchase////////////////////////////////////////////////
   if(typeof b.productListItemsSDK != "undefined" && b.productListItemsSDK instanceof Array && typeof b.order_id != 'undefined') {
       b.prodObj = b.productListItemsSDK;
       b.purchases = 1;
       b.purchaseID= b.order_id;
   }

  else if(typeof b.order_id != 'undefined'){
      
      if(typeof b.productListItemsSDK != "undefined" && b.productListItemsSDK instanceof Array) {
       b.prodObj = b.productListItemsSDK;
   }
    var  productStringArr = [];
    b.prodObj = [];
   
        var productListItems = [];
    var productChunks = b.products.split(",");
    for (var i = 0; i < productChunks.length; i++) {
        var chunk = productChunks[i].split(";");
        var SKU = chunk[1];
        var priceTotal = chunk[3];
        var quantity = chunk[2];
        var eVarsString = chunk[5];
        var eVarsPairs = eVarsString.split("|");
        var eventString = chunk[4];
        var eventsPairs = eventString.split("|");
        var eVars = {};
        var events = {};
        for (var j = 0; j < eVarsPairs.length; j++) {
            var pair = eVarsPairs[j].split("=");
            var key = pair[0];
            var value = pair[1];
           if (eventsPairs[0].length > 0) {
                eventsPairs.forEach(pair => {
                    p = pair.split('=');
                    var k = p[0];
                    var v = p[1];
                    events[k] = {
                        value: Number(v)
                    };
                });

            }
            if (value && value !== "null" && !(value.toLowerCase().indexOf('nan') > -1)) {
                eVars[key] = value;
            if (key.indexOf('event') === 0) {
                    events[key] = {
                        value: Number(value)
                    };
                }
            }     
        }

        productStringArr.push({
            SKU: SKU,
            priceTotal: priceTotal,
            quantity: quantity,
            _experience: {
                analytics: {
                    customDimensions: {
                        eVars: eVars
                    },
                     event1to100: events
                }
            }
        });
      b.prodObj = productStringArr;
      b.purchases = 1;
    b.purchaseID= b.order_id;
    }
}}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((b['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/checkout'.toLowerCase())>-1&&b['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)||b['dom.url'].toString().toLowerCase().indexOf('prodid'.toLowerCase())>-1||(b['dom.pathname'].toString().toLowerCase().indexOf('rx/dotm/cart'.toLowerCase())>-1&&b['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)||b['linkName'].toString().toLowerCase().indexOf('shop: plp: add to cart confirmation modal'.toLowerCase())>-1||/^;/i.test(b['products'])||b['events'].toString().indexOf('scAdd')>-1||b['events'].toString().indexOf('scRemove')>-1||b['events'].toString().indexOf('scCheckout')>-1){
b.product_price = [];
b.product_quantity = [];
b.price;
b.product_array = b.products.split(',');
b.ProdQuantity = "";
b.productID = "";

    //b.ProdQuantity = b.product_array[0].slice(b.product_array[0].indexOf("event33=")+8,b.product_array[0].indexOf("eVar56")-1);
    //b.productID = b.product_array[0].slice(b.product_array[0].indexOf("eVar71=")+7);
    //b.product_quantity.push(b.product_array[i].split(';')[2]);
    //b.price = parseInt(b.product_array[i].split(';')[2]) * parseFloat(b.product_array[i].split(';')[3]);
    //b.product_price.push(b.price.toFixed(2)); 
    
if(typeof b.events != "undefined" && b.events.indexOf("scAdd") > -1){
    for(let i = 0; i < b.product_array.length; i++){ 
    //b.ProdQuantity = b.product_array[0].slice(b.product_array[0].indexOf("event33=")+8,b.product_array[0].indexOf("eVar56")-1);
    //b.productID = b.product_array[0].slice(b.product_array[0].indexOf("eVar71=")+7);
    b.ProdQuantity = b.product_array[0].split(';')[2];
    b.productID = b.product_array[0].split(';')[1];
    b.product_quantity.push(b.product_array[i].split(';')[2]);
    b.price = parseInt(b.product_array[i].split(';')[2]) * parseFloat(b.product_array[i].split(';')[3]);
    b.product_price.push(b.price.toFixed(2));
} }else if(typeof b.events != "undefined" && b.events.indexOf("scRemove") > -1){
    for(let i = 0; i < b.product_array.length; i++){ 
    b.ProdQuantity = b.events.slice(b.events.indexOf("event91=")+8);
    b.productID = b.product_array[0].split(';')[1];
    b.product_quantity.push(b.product_array[i].split(';')[2]);
    b.price = parseInt(b.product_array[i].split(';')[2]) * parseFloat(b.product_array[i].split(';')[3]);
    b.product_price.push(b.price.toFixed(2));
    } 
}
    



               
               
                



} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['qp.cjevent']!='undefined'){
 document.cookie = "cj_ev=" + b['qp.cjevent'] + "; secure; path=/; domain=" + utag.cfg.domain + "; expires=" + (function() {
        var d = new Date();
        d.setTime(d.getTime() + (3 * 864e5));
        return d.toGMTString();
    }
    )() + "";
    b['cp.cj_ev'] = b['qp.cjevent'];

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (typeof alloy !== 'undefined' && !window.alloyFetchFired) {
    console.log('fetch');
    window.alloyFetchFired = true;
alloy("sendEvent", {
    renderDecisions: true,
    decisionScopes: ["__view__"],
    personalization:{
        sendDisplayEvent: false,
         "schemas":[
            "https://ns.adobe.com/personalization/default-content-item",
            "https://ns.adobe.com/personalization/html-content-item",
            "https://ns.adobe.com/personalization/json-content-item",
            "https://ns.adobe.com/personalization/redirect-item",
            "https://ns.adobe.com/personalization/dom-action"
         ],
       "surfaces": [ "web://" + window.location.host + window.location.pathname ],
    },
    xdm: {
        eventType: "decisioning.propositionFetch",
        web: {
            webPageDetails: {
                name: b['page_name'],
                URL: document.location.href
            }
        }
    }
})
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['tealium_cmx_event']!='undefined'&&b['tealium_cmx_event'].toString().indexOf('criteo')>-1)){
alloy("sendEvent", {
    xdm: {
        eventType: 'web.cmxImpressionTracking.linkClicks',
        web: {
            
            type:"other",
            webInteraction:{
                URL:document.location.href,
                linkClicks: {value:1},
                name: b['link_name']
            },
            webPageDetails: {
                name: b['page_name'],
            }
        },
        _cvs: {
            Criteo: {
                criteoCustomerID: b['criteoCustomerId'],
                criteoVisitorID: b['criteoVisitorId'],
                criteoProductDetails: b['criteoProductDetails']
                    },
            tealium_cmx_event: b['tealium_cmx_event'],
            cmxTimeStamp: Date.now().toString()
                }
    },
    edgeConfigOverrides: {
        datastreamId: "1e24809d-8a88-43c9-ba9a-0babf0fb08c7" // Can use another extension
    },
});
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['tealium_cmx_event']!='undefined'&&b['tealium_cmx_event'].toString().indexOf('GAM_AD_Received_Request')>-1)){
alloy("sendEvent", {
    xdm: {
        eventType: 'web.cmxImpressionTracking.linkClicks',
        web: {
            
            type:"other",
            webInteraction:{
                URL:document.location.href,
                linkClicks: {value:1},
                name: b['link_name']
            },
            webPageDetails: {
                name: b['page_name'],
            }
        },
        _cvs: {
            Gam: {
                gamAdDetails: b['gamAdDetails'],
                gamAdUnit: b['gamAdUnit'],
                gamAdsReceivedRequest: b["gamAdsReceivedRequest"],
                gamID: b['gamID'],
                gamPageTarget: b['gamPageTarget'],
                gamTimestamp: b['gamTimestamp'],
                    },
            tealium_cmx_event: b['tealium_cmx_event'],
            cmxTimeStamp: Date.now().toString()
                }
    },
    edgeConfigOverrides: {
        datastreamId: "1e24809d-8a88-43c9-ba9a-0babf0fb08c7" // Can use another extension
    },
});
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['tealium_cmx_event']!='undefined'&&b['tealium_cmx_event'].toString().toLowerCase()=='GAM_AD_Requested'.toLowerCase())){
alloy("sendEvent", {
    xdm: {
        eventType: 'web.cmxImpressionTracking.linkClicks',
        web: {
            
            type:"other",
            webInteraction:{
                URL:document.location.href,
                linkClicks: {value:1},
                name: b['link_name']
            },
            webPageDetails: {
                name: b['page_name'],
            }
        },
        _cvs: {
            Gam: {
                gamAdDetails: b['gamAdDetails'],
                gamAdUnit: b['gamAdUnit'],
                gamAdsRequested: b['gamAdsRequested'],
                gamID: b['gamID'],
                gamPageTarget: b['gamPageTarget'],
                gamTimestamp: b['gamTimestamp'],
                    },
            tealium_cmx_event: b['tealium_cmx_event'],
            cmxTimeStamp: Date.now().toString()
                }
    },
    edgeConfigOverrides: {
        datastreamId: "1e24809d-8a88-43c9-ba9a-0babf0fb08c7" // Can use another extension
    },
});
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['tealium_cmx_event']!='undefined'&&/GAM_AD_Received$/i.test(b['tealium_cmx_event']))){
alloy("sendEvent", {
    xdm: {
        eventType: 'web.cmxImpressionTracking.linkClicks',
        web: {
            
            type:"other",
            webInteraction:{
                URL:document.location.href,
                linkClicks: {value:1},
                name: b['link_name']
            },
            webPageDetails: {
                name: b['page_name'],
            }
        },
        _cvs: {
            Gam: {
                gamAdDetails: b['gamAdDetails'],
                gamAdUnit: b['gamAdUnit'],
                gamAdsReceived: b['gamAdsReceived'],
                gamID: b['gamID'],
                gamPageTarget: b['gamPageTarget'],
                gamTimestamp: b['gamTimestamp'],
                gamServedImp: b['gamServedImp'],
                gamUnfilledImp: b['gamUnfilledImp'],
                    },
            tealium_cmx_event: b['tealium_cmx_event'],
            cmxTimeStamp: Date.now().toString()
                }
    },
    edgeConfigOverrides: {
        datastreamId: "1e24809d-8a88-43c9-ba9a-0babf0fb08c7" // Can use another extension
    },
});
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['tealium_cmx_event']!='undefined'&&b['tealium_cmx_event'].toString().toLowerCase()=='GAM_AD_Viewed'.toLowerCase())){
alloy("sendEvent", {
    xdm: {
        eventType: 'web.cmxImpressionTracking.linkClicks',
        web: {
            
            type:"other",
            webInteraction:{
                URL:document.location.href,
                linkClicks: {value:1},
                name: b['link_name']
            },
            webPageDetails: {
                name: b['page_name'],
            }
        },
        _cvs: {
            Gam: {
                gamAdDetails: b['gamAdDetails'],
                gamAdUnit: b['gamAdUnit'],
                gamID: b['gamID'],
                gamPageTarget: b['gamPageTarget'],
                gamTimestamp: b['gamTimestamp'],
                gamViewableImp: b['gamViewableImp'],
                    },
            tealium_cmx_event: b['tealium_cmx_event'],
            cmxTimeStamp: Date.now().toString()
                }
    },
    edgeConfigOverrides: {
        datastreamId: "1e24809d-8a88-43c9-ba9a-0babf0fb08c7" // Can use another extension
    },
});
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
alloy("sendEvent", {
  personalization: {
    includeRenderedPropositions: true
  },
  xdm: {
        web: {
            webPageDetails: {
                name: b['page_name'],
                URL: document.location.href
            }
        }
    }
});
} } catch(e){ utag.DB(e) }  }];
  utag.handler.cfg_extend=[{"alr":0,"end":0,"blr":1,"bwq":0,"id":"554"},{"id":"281","bwq":0,"blr":1,"end":0,"alr":0},{"blr":1,"bwq":0,"id":"585","alr":0,"end":0},{"id":"656","bwq":0,"blr":1,"end":0,"alr":0},{"bwq":0,"blr":1,"id":"748","alr":0,"end":0},{"alr":0,"end":0,"blr":1,"bwq":0,"id":"735"},{"id":"768","bwq":0,"blr":1,"end":0,"alr":0},{"blr":0,"bwq":0,"id":"648","alr":1,"end":0},{"id":"638","blr":0,"bwq":0,"end":0,"alr":1},{"end":0,"alr":1,"id":"564","blr":0,"bwq":0},{"end":0,"alr":1,"id":"574","bwq":0,"blr":0},{"blr":0,"bwq":0,"id":"589","alr":1,"end":0},{"id":"662","bwq":0,"blr":0,"end":0,"alr":1},{"bwq":0,"blr":0,"id":"687","alr":1,"end":0},{"alr":1,"end":0,"bwq":0,"blr":0,"id":"666"},{"alr":1,"end":0,"blr":0,"bwq":0,"id":"659"},{"id":"660","blr":0,"bwq":0,"end":0,"alr":1},{"end":0,"alr":1,"id":"737","bwq":0,"blr":0},{"bwq":0,"blr":0,"id":"706","alr":1,"end":0},{"alr":0,"end":1,"bwq":0,"blr":0,"id":"783"},{"alr":0,"end":1,"bwq":0,"blr":0,"id":"756"},{"alr":0,"end":1,"bwq":0,"blr":0,"id":"760"},{"alr":0,"end":1,"blr":0,"bwq":0,"id":"759"},{"id":"757","blr":0,"bwq":0,"end":1,"alr":0},{"end":1,"alr":0,"id":"758","blr":0,"bwq":0},{"end":1,"alr":0,"id":"799","blr":0,"bwq":0}];
  utag.loader.initcfg = function(){
    utag.loader.cfg={"495":{load:4,send:1,v:202506091435,wait:0,tid:1220},"339":{load:4,send:1,v:202408061929,wait:0,tid:1191},"477":{load:((((utag.cond[151])  &&  (utag.cond[195])  &&  (utag.cond[210])  &&  (utag.cond[214])  &&  (utag.cond[129])  &&  (utag.cond[172] || utag.cond[154])) && !(utag.cond[230]))),send:1,v:202412091621,wait:1,tid:20010},"340":{load:1,send:1,v:202503121928,wait:1,tid:19063},"330":{load:1,send:1,v:202312051910,wait:1,tid:17013},"321":{load:((((((utag.cond[139])  &&  (utag.cond[151])  &&  (utag.cond[129]))  &&  (utag.cond[210])  &&  (utag.cond[214]))) && !(utag.cond[230]))),send:1,v:202506091435,wait:1,tid:20085,src:"//api.bluecore.com/triggermail.js/cvs.js"},"181":{load:((((utag.cond[151])  &&  (utag.cond[129])  &&  (utag.cond[195])  &&  (utag.cond[154])  &&  (utag.cond[210])  &&  (utag.cond[214])) && !(utag.cond[230]))),send:1,v:202409261909,wait:1,tid:7115},"168":{load:((((utag.cond[151])  &&  (utag.cond[129])  &&  (utag.cond[195])  &&  (utag.cond[154])  &&  (utag.cond[210])  &&  (utag.cond[214])) && !(utag.cond[221] || utag.cond[222] || utag.cond[230]))),send:1,v:202412091621,wait:1,tid:2045},"356":{load:((((utag.cond[151])  &&  (utag.cond[195])  &&  (utag.cond[219])) && !(utag.cond[221] || utag.cond[222]))),send:1,v:202404162019,wait:1,tid:4049},"357":{load:((((utag.cond[151])  &&  (utag.cond[195])  &&  (utag.cond[173])) && !(utag.cond[221] || utag.cond[222]))),send:1,v:202404162019,wait:1,tid:4049},"365":{load:(((utag.cond[151])  &&  (utag.cond[173])  &&  (utag.cond[195]))),send:1,v:202407171907,wait:1,tid:20011},"370":{load:((((utag.cond[151])  &&  (utag.cond[129])  &&  (utag.cond[195])  &&  (utag.cond[172])) && !(utag.cond[221] || utag.cond[222] || utag.cond[230]))),send:1,v:202411181948,wait:1,tid:2045},"371":{load:utag.cond[132],send:1,v:202312051910,wait:1,tid:20067},"381":{load:((((utag.cond[151])  &&  (utag.cond[195])  &&  (utag.cond[154])  &&  (utag.cond[210])  &&  (utag.cond[214])  &&  (utag.cond[129])) && !(utag.cond[222] || utag.cond[221] || utag.cond[230]))),send:1,v:202412091621,wait:1,tid:4049},"497":{load:(((((utag.cond[151])  &&  (utag.cond[195])  &&  (utag.cond[129]))  &&  (utag.cond[172])) && !((utag.cond[221] || utag.cond[222])  &&  (utag.cond[230])))),send:1,v:202409261909,wait:1,tid:20010},"476":{load:(((utag.cond[151])  &&  (utag.cond[195])  &&  (utag.cond[210])  &&  (utag.cond[214])  &&  (utag.cond[129])  &&  (utag.cond[154]))),send:1,v:202407171907,wait:1,tid:20010},"483":{load:(((((utag.cond[129])  &&  (utag.cond[195])  &&  (utag.cond[151]))  &&  (utag.cond[214])  &&  (utag.cond[210]))  &&  (utag.cond[154]))),send:1,v:202412092008,wait:1,tid:12042},"496":{load:(((((utag.cond[129])  &&  (utag.cond[195])  &&  (utag.cond[151]))  &&  (utag.cond[214])  &&  (utag.cond[210]))  &&  (utag.cond[172]))),send:1,v:202412092008,wait:1,tid:12042},"520":{load:(((((utag.cond[151])  &&  (utag.cond[129])  &&  (utag.cond[195]))  &&  (utag.cond[210])  &&  (utag.cond[214]))  &&  (utag.cond[233]))),send:1,v:202502032014,wait:1,tid:9043}};
utag.loader.cfgsort=["495","339","477","340","330","321","181","168","356","357","365","370","371","381","497","476","483","496","520"];
  }
utag.loader.initcfg();
}

  try{
    (function (window) {
        function evaluateLoadRule(id) {
            if (!id) return false;
            if (id === "all") return true;

            var config = {};
            config[id] = 0;
            var data = window.utag.loader.GV(window.utag_data);

            window.utag.cl = { "_all_": 1 };
            window.utag.loader.rd_flag = 1;

            window.utag.loader.RD(data);
            window.utag.loader.loadrules(data, config);

            window.utag.cl = undefined;
            window.utag.loader.rd_flag = undefined;

            return Boolean(config[id]);
        }

        function checkLoadRulesConflict(map) {
            if (!map) return true;

            var counter = 0;
            for (var key in map) {
                if (map[key]) counter += 1;
            }

            if (counter > 1) return true;

            return false;
        }

        function canIntegrationLoad(id) {
            return Boolean(!window.tealiumCmpIntegration.loadRules.hasConflict && window.tealiumCmpIntegration.loadRules.loadMap[id]);
        }

        window.tealiumCmpIntegration = window.tealiumCmpIntegration || {};
        window.tealiumCmpIntegration.loadRules = {};

        window.tealiumCmpIntegration.loadRules.canIntegrationLoad = canIntegrationLoad;

        window.tealiumCmpIntegration.loadRules.loadMap = {"7a54a81f-273a-4115-b710-dec7d277f26a": evaluateLoadRule("all")};
        window.tealiumCmpIntegration.loadRules.exemptionMap = {"1358adc0-4c53-456b-fdf6-74ebfa0a75a0": evaluateLoadRule("234")};
        window.tealiumCmpIntegration.loadRules.hasConflict = checkLoadRulesConflict(window.tealiumCmpIntegration.loadRules.loadMap);
    })(window);
    if (window.tealiumCmpIntegration.loadRules.canIntegrationLoad("7a54a81f-273a-4115-b710-dec7d277f26a")) {window.tealiumCmpIntegration = window.tealiumCmpIntegration || {};window.tealiumCmpIntegration.map = {"283c7078-bb2e-4027-97d1-8495f534e7df":{"C0001":[],"C0011":["339","340","368","375","401","420","423","468","469","484","488","490","495","290","294","316","319","330","331","332","333","341","347","371","374","396","413","416","449","520"],"C0013":["168","370","372","181","317","334","337","342","352","356","357","373","376","381","398","403","405","407","409","410","417","418","429","436","437","446","458","476","477","497","528","530"],"C0012":["386","321","326","351","355","360","361","362","365","478","483","496","518","521","522"]}};window.tealiumCmpIntegration.refiringAllowed = [];window.tealiumCmpIntegration.tiqGroupName = "C0001";//tv:2.0.1
//base:onetrust
/**
 * @module utcm/integration
 * @description CMP-specific component for OneTrust.
 *
 * 2.0.1
 *  - Add safeguarding conditional to cmpConvertResponseToLookupObject
 *  - Fix bug in cmpCheckForExplicitConsentDecision where an explicit opt-in was incorrectly output as an 'implicit' decision one
 * 
 * 2.0.0
 *  - Start using keys instead of names for the lookup (breaking change, but with deactivation switch)
 *  - Update the way the Vendor ID is pulled from the page to stop using the legacy cctId property
 *  - Parse window.dataLayer for the decision to avoid relying on ConsentIntegrationData, which isn't always populated for all customers
 *  - Introduce a new function to help with setup (cmpConvertResponseToLookupObject) that produces a key-to-name lookup object
 *
 * 1.0.2
 *  - Improve cmpCheckForExplicitConsentDecision again - there are non-decision interactions, so now we check if it's opt-in mode and the box is open
 *
 * 1.0.1
 *  - Improve cmpCheckForExplicitConsentDecision - use the interaction count instead of last interaction label (more reliable)
 *
 * 1.0.0
 *  - Initial version, start versioning
 */

(function oneTrust(window) {
    // allows simple adjustment of the name/id behavior
    var useNamesInsteadOfKeys = false;
    // allow the safety check of the expected Vendor ID to be circumvented to simplify setup at the cost of increased risk
    var disableVendorIdValidation = false;

    // CMP specific functionality and labels
    window.tealiumCmpIntegration = window.tealiumCmpIntegration || {};

    window.tealiumCmpIntegration.cmpName = "OneTrust";
    window.tealiumCmpIntegration.cmpIntegrationVersion = "onetrust-2.0.1";

    window.tealiumCmpIntegration.cmpFetchCurrentConsentDecision = cmpFetchCurrentConsentDecision;
    window.tealiumCmpIntegration.cmpFetchCurrentLookupKey = cmpFetchCurrentLookupKey;
    window.tealiumCmpIntegration.cmpCheckIfOptInModel = cmpCheckIfOptInModel;
    window.tealiumCmpIntegration.cmpCheckForWellFormedDecision = cmpCheckForWellFormedDecision;
    window.tealiumCmpIntegration.cmpCheckForExplicitConsentDecision = cmpCheckForExplicitConsentDecision;
    window.tealiumCmpIntegration.cmpCheckForTiqConsent = cmpCheckForTiqConsent;
    window.tealiumCmpIntegration.cmpConvertResponseToGroupList = cmpConvertResponseToGroupList;
    window.tealiumCmpIntegration.cmpConvertResponseToLookupObject = cmpConvertResponseToLookupObject;

    function cmpCheckIfOptInModel() {
        var decision = cmpFetchCurrentConsentDecision();
        if (decision && decision.ConsentModel && decision.ConsentModel.Name === "opt-out") {
            return false;
        }
        return true;
    }

    function cmpFetchCurrentConsentDecision() {
        if (!window.OneTrust || typeof window.OneTrust.GetDomainData !== "function") return false;
        var cmpRawOutput = window.OneTrust.GetDomainData();
        cmpRawOutput.dataLayer = window.dataLayer;
        return cmpRawOutput;
    }

    function cmpFetchCurrentLookupKey() {
        // newer versions of OneTrust, starting at the end of 2022 no longer have cctId defined
        // but this HTML attribute is the way OneTrust can tell
        var scrapeOneTrustVendorId = function () {
            var allScripts = document.getElementsByTagName("script");
            var re = /\/otSDKStub\.js(\?.*)*$/;
            for (var i = 0; i < allScripts.length; i++) {
                var isOneTrustScript = re.test(allScripts[i].src); // can be null
                if (isOneTrustScript) {
                    var fullVendorId = allScripts[i].getAttribute("data-domain-script"); // parse it from the script
                    return fullVendorId.split("-test")[0];
                }
            }
            return "error-not-found";
        }
        if (disableVendorIdValidation) {
            // just return whatever Vendor ID is expected be active
            return (window.tealiumCmpIntegration && window.tealiumCmpIntegration.map && Object.keys(window.tealiumCmpIntegration.map)[0]) || "(Vendor ID check disabled)"; // just return whatever's mapped to short-circuit the check as a test
        }
        return scrapeOneTrustVendorId();
    }

    function cmpCheckForWellFormedDecision(cmpRawOutput) {
        // treat things we don't understand as an opt-out
        if (typeof cmpRawOutput !== "object") return false;
        if (toString.call(cmpRawOutput.Groups) !== "[object Array]") return false;
        if (toString.call(cmpRawOutput.dataLayer) !== "[object Array]") return false;
        return true;
    }

    function cmpCheckForExplicitConsentDecision(cmpRawOutput) {
        // treat things we don't understand as implicit
        if (cmpCheckForWellFormedDecision(cmpRawOutput) !== true) return false;
        return window.OneTrust && typeof window.OneTrust.IsAlertBoxClosed === "function" && window.OneTrust.IsAlertBoxClosed();
    }

    function cmpConvertResponseToLookupObject(cmpRawOutput) {
        // convert from array of objects to object for easier lookups
        var decisionString = "";
        if (cmpCheckForWellFormedDecision(cmpRawOutput) !== true) return {};
        for (var i = cmpRawOutput.dataLayer.length - 1; i >= 0; i--) {
            if (["OneTrustGroupsUpdated", "OneTrustLoaded"].indexOf(cmpRawOutput.dataLayer[i].event) !== -1) {
                decisionString = cmpRawOutput.dataLayer[i].OnetrustActiveGroups;
                break;
            }
        }

        var permittedPurposeIds = decisionString.split(",").filter(function (group) {
            return group !== "";
        })

        var permittedPurposesWithNames = {};
        cmpRawOutput.Groups.forEach(function (groupInfo) {
            if (permittedPurposeIds.indexOf(groupInfo.OptanonGroupId) !== -1) {
                permittedPurposesWithNames[groupInfo.OptanonGroupId] = groupInfo.GroupName || "ERROR-MISSING";
            }
        })

        return permittedPurposesWithNames; // keys are IDs, values are names
    }

    function cmpConvertResponseToGroupList(cmpRawOutput) {
        var permittedPurposesWithNames = cmpConvertResponseToLookupObject(cmpRawOutput);
        var keysOrValues = useNamesInsteadOfKeys ? "values" : "keys";
        return Object[keysOrValues](permittedPurposesWithNames); // keys are IDs, values are names
    }

    function cmpCheckForTiqConsent(cmpRawOutput, tiqGroupName) {
        // treat things we don't understand as an opt-out
        if (cmpCheckForWellFormedDecision(cmpRawOutput) !== true) return false;

        tiqGroupName = tiqGroupName || "tiq-group-name-missing";
        var allowedGroups = cmpConvertResponseToGroupList(cmpRawOutput);
        return allowedGroups.indexOf(tiqGroupName) !== -1;
    }
})(window);

/*
// Debugging / development output - repaste the integration on your test pages each time you make a change to your consent state
var outputString = `CMP Found: ${window.tealiumCmpIntegration.cmpName} (${window.tealiumCmpIntegration.cmpCheckIfOptInModel() ? "Opt-in" : 'Opt-out'} Model)
  Checks:
    - id:          ${window.tealiumCmpIntegration.cmpFetchCurrentLookupKey()}
    - well-formed: ${window.tealiumCmpIntegration.cmpCheckForWellFormedDecision(window.tealiumCmpIntegration.cmpFetchCurrentConsentDecision())}
    - explicit:    ${window.tealiumCmpIntegration.cmpCheckForExplicitConsentDecision(window.tealiumCmpIntegration.cmpFetchCurrentConsentDecision())}
    - group list:  ${JSON.stringify(window.tealiumCmpIntegration.cmpConvertResponseToGroupList(window.tealiumCmpIntegration.cmpFetchCurrentConsentDecision()))}
    - name lookup: ${JSON.stringify(window.tealiumCmpIntegration.cmpConvertResponseToLookupObject(window.tealiumCmpIntegration.cmpFetchCurrentConsentDecision()), null, 6)}
  `
console.log(outputString)
*/
}
                var hasLoadRuleMatch = Object.values(window.tealiumCmpIntegration.loadRules.loadMap).some(value => !!value);
                var hasExemptionMatch = Object.values(window.tealiumCmpIntegration.loadRules.exemptionMap).some(value => !!value);
                if (hasLoadRuleMatch || !hasExemptionMatch) {//tv:1.2.0
//base:framework
/**
 * @module utcm/framework
 * @description Component of the CMP integration, responsible for stopping Tealium iQ from loading/running as appropriate, and responsible for blocking tags if consent is missing or this CMP integration is misconfigured.
 * Expects the appropriate {@link tealiumCmpIntegration tealiumCmpIntegration} inputs (from {@link utcm/integration utcm/integration}) and an appropriate map (from Publish Engine).
 */
(function (window) {
    var version = "v1.2.0";
    /**
     * A window-scoped (global) object used to expose or define selected functionality.
     * @namespace tealiumCmpIntegration
     * @type {object}
     * @memberof! <global>
     */
    window.tealiumCmpIntegration = window.tealiumCmpIntegration || {};
    /**
     * The name of the CMP, provided by utcm/integration, mostly used for logging and debugging.
     * @name cmpName
     * @type {string}
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.cmpName = window.tealiumCmpIntegration.cmpName || "Unnamed CMP";
    // for the consent information in the b object
    var nameOfFullGroupArray = window.tealiumCmpIntegration.nameOfFullGroupArray || "tci.purposes_with_consent_all";
    var nameOfUnprocessedGroupArray =
        window.tealiumCmpIntegration.nameOfUnprocessedGroupArray || "tci.purposes_with_consent_unprocessed";
    var nameOfProcessedGroupArray =
        window.tealiumCmpIntegration.nameOfProcessedGroupArray || "tci.purposes_with_consent_processed";
    var nameOfConsentTypeString = window.tealiumCmpIntegration.nameOfConsentTypeString || "tci.consent_type";
    var nameOfEventIdString = window.tealiumCmpIntegration.nameOfConsentTypeString || "tci.event_id";
    var nameOfImplicitQueueMarker = window.tealiumCmpIntegration.nameOfImplicitQueueMarker || "tci.from_implicit_queue"

    // default to NOT emiting events and NOT continuing to poll past the initial explicit decision
    tealiumCmpIntegration.suppressConsentRegister = tealiumCmpIntegration.suppressConsentRegister || false;

    /**
     * A list of tags that should refire when the user makes an initial, non opt-out explicit decision on first landing.
     * @name refiringAllowed
     * @type {array}
     * @memberof! tealiumCmpIntegration
     */
    var refiringAllowed = window.tealiumCmpIntegration.refiringAllowed || [];
    // name to use when calling utag.handler.trigger to indicate a consent polling call
    var nameOfConsentPollingEvent = window.tealiumCmpIntegration.nameOfConsentPollingEvent || "tiq_cmp_consent_polling";
    // setTimeout interval in MS - rate to poll for new (explicit) consent decision or correctly formed object
    var consentTimeoutInterval = 250;
    // check for the Tealium Debug cookie, see https://docs.tealium.com/platforms/javascript/debugging/
    var tiqInDebugMode = /utagdb=true/.test(document.cookie);
    // fall back to prod (stops logging) if something goes wrong with the function
    var tealiumEnvironment = getTealiumEnvironment() || "prod";
    /**
     * Profile-specific helper, expected to be provided by utcm/integration (and possibly overridden via Publish Engine). The Group Name for Tealium iQ in the CMP (used to decide if the TMS is allowed to run). Uses a standard name if not provided.
     * @name tiqGroupName
     * @type {string}
     * @memberof! tealiumCmpIntegration
     * @default '_missing_'
     */
    var tiqGroupName = window.tealiumCmpIntegration.tiqGroupName || "_missing_"; // make sure there's no match if it's not set
    /**
     * CMP-specific helper, expected to be provided by utcm/integration. Expects a function that gets the current consent decision from the CMP.
     * @function cmpFetchCurrentConsentDecision
     * @memberof! tealiumCmpIntegration
     * @returns {*} The CMP response to use within other CMP-specific functions
     */
    var cmpFetchCurrentConsentDecision =
        (typeof window.tealiumCmpIntegration.cmpFetchCurrentConsentDecision === "function" &&
            window.tealiumCmpIntegration.cmpFetchCurrentConsentDecision) ||
        function () { };
    /**
     * CMP-specific helper, expected to be provided by utcm/integration. Indicates if the CMP has loaded and returned a well-formed indication of user consent.
     * @function cmpCheckForWellFormedDecision
     * @memberof! tealiumCmpIntegration
     * @param cmpRawOutput the CMP output returned from cmpFetchCurrentConsentDecision
     * @returns {boolean} 'true' if the consent decision is well-formed, otherwise 'false'
     */
    var cmpCheckForWellFormedDecision =
        (typeof window.tealiumCmpIntegration.cmpCheckForWellFormedDecision === "function" &&
            window.tealiumCmpIntegration.cmpCheckForWellFormedDecision) ||
        function () { };
    /**
     * CMP-specific helper, expected to be provided by utcm/integration. Get the current CMP lookup key from the page, to use to find the right map.
     * @returns {string} the ID/key to use for the tag map lookup, defaults to an empty string if none is found
     */
    var cmpFetchCurrentLookupKey =
        (typeof window.tealiumCmpIntegration.cmpFetchCurrentLookupKey === "function" &&
            window.tealiumCmpIntegration.cmpFetchCurrentLookupKey) ||
        function () { };
    /**
     * CMP-specific helper, expected to be provided by utcm/integration. Indicates if the user has made an EXPLICIT decision.
     * @function cmpCheckForExplicitConsentDecision
     * @memberof! tealiumCmpIntegration
     * @param cmpRawOutput the CMP output returned from cmpFetchCurrentConsentDecision
     * @returns {boolean} 'true' if the consent decision is EXPLICIT otherwise 'false'
     */
    var cmpCheckForExplicitConsentDecision =
        (typeof window.tealiumCmpIntegration.cmpCheckForExplicitConsentDecision === "function" &&
            window.tealiumCmpIntegration.cmpCheckForExplicitConsentDecision) ||
        function () { };
    /**
     * CMP-specific helper, expected to be provided by utcm/integration. Indicates if Tealium iQ has permission to run (and fire tags).
     * @function cmpCheckForTiqConsent
     * @memberof! tealiumCmpIntegration
     * @param cmpRawOutput the CMP output returned from cmpFetchCurrentConsentDecision
     * @param tiqGroupName the Group Name designation for Tealium iQ in the CMP
     * @returns {boolean} 'true' if TiQ is allowed to run, otherwise 'false'
     */
    var cmpCheckForTiqConsent =
        (typeof window.tealiumCmpIntegration.cmpCheckForTiqConsent === "function" &&
            window.tealiumCmpIntegration.cmpCheckForTiqConsent) ||
        function () { };
    /**
     * CMP-specific helper, expected to be provided by utcm/integration. Indicates if Tealium iQ has permission to run (and fire tags).
     * @function cmpConvertResponseToGroupList
     * @memberof! tealiumCmpIntegration
     * @param cmpRawOutput the CMP output returned from cmpFetchCurrentConsentDecision
     * @returns {array} a simple list of the group names with permissions to fire, at the desired granularity
     */
    var cmpConvertResponseToGroupList =
        (typeof window.tealiumCmpIntegration.cmpConvertResponseToGroupList === "function" &&
            window.tealiumCmpIntegration.cmpConvertResponseToGroupList) ||
        function () { };
    /**
     * CMP-specific helper, expected to be provided by utcm/integration. Indicates if the CMP is running in opt-in (GDPR-like) or opt-out (CCPA-like) mode
     * @function cmpCheckIfOptInModel
     * @memberof! tealiumCmpIntegration
     * @returns {boolean} true if the CMP is in opt-in mode (like for GDPR), false if opt-out mode (like for CCPA)
     */
    var cmpCheckIfOptInModel =
        (typeof window.tealiumCmpIntegration.cmpCheckIfOptInModel === "function" &&
            window.tealiumCmpIntegration.cmpCheckIfOptInModel) ||
        function () { };
    /**
     * The current version designation
     * @name version
     * @type {string}
     * @private
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.version = version;
    /**
     * A [helper function]{@link module:utcm/framework~logger}, to help Tealium iQ users understand and troubleshoot this CMP integration without unneeded logging in production.
     * @name logger
     * @type {function}
     * @private
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.logger = logger;
    /**
     * A [helper function]{@link module:utcm/framework~getCurrentConsentDecision} that returns the current [ConsentDecision]{@link ConsentDecision}.
     * @name getCurrentConsentDecision
     * @type {function}
     * @private
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.getCurrentConsentDecision = getCurrentConsentDecision;
    /**
     * A [helper function]{@link module:utcm/framework~cmpFetchCurrentLookupKey} that returns the current CMP lookup key (found on the page)
     * @name cmpFetchCurrentLookupKey
     * @type {function}
     * @private
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.cmpFetchCurrentLookupKey = cmpFetchCurrentLookupKey;
    /**
     * Records the status of the [noview]{@link https://docs.tealium.com/platforms/javascript/settings/#noview} setting on page load.
     * @name isNoviewSet
     * @type {boolean}
     * @private
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.isNoviewSet = window.utag_cfg_ovrd && window.utag_cfg_ovrd.noview === true;
    /**
     * The name to use for the full [ConsentDecision]{@link ConsentDecision} array when adding it to Tealium's b object on each event.
     * @name nameOfFullGroupArray
     * @type {string}
     * @default tci.purposes_with_consent_all
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.nameOfFullGroupArray = nameOfFullGroupArray;
    /**
     * The name to use for the [ConsentDecision]{@link ConsentDecision}'s 'type' attribute ('implicit' or 'explicit') when adding it to Tealium's b object on each event.
     * @name nameOfConsentTypeString
     * @type {string}
     * @default tci.consent_type
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.nameOfConsentTypeString = nameOfConsentTypeString;
    /**
     * The name to use for the array of not-yet-processed-but-consented groups when adding it to Tealium's b object on each event and in the 'data' property of {@link QueuedEvent QueuedEvent} objects.
     * @name nameOfUnprocessedGroupArray
     * @type {string}
     * @default tci.purposes_with_consent_unprocessed
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.nameOfUnprocessedGroupArray = nameOfUnprocessedGroupArray;
    /**
     * The name to use for the array of already-processed consented groups when adding it to Tealium's b object on each event and in the 'data' property of {@link QueuedEvent QueuedEvent} objects.
     * @name nameOfProcessedGroupArray
     * @type {string}
     * @default tci.purposes_with_consent_processed
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.nameOfProcessedGroupArray = nameOfProcessedGroupArray;
    /**
     * A queue for any events that Tealium iQ processes with IMPLICIT consent (to allow those events to be re-processed for new Services in the event of an EXPLICIT consent choice by the user).
     * Each element in the queue is a [QueuedEvent]{@link QueuedEvent}
     * @name implicitEventQueue
     * @type {array}
     * @private
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.implicitEventQueue = window.tealiumCmpIntegration.implicitEventQueue || [];
    /**
     * A queue for any events that are triggered before Tealium iQ AND the CMP have both loaded.
     * Each element in the queue is a [QueuedEvent]{@link QueuedEvent}
     * @name earlyEventQueue
     * @type {array}
     * @private
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.earlyEventQueue = window.tealiumCmpIntegration.earlyEventQueue || [];
    /**
     * A map of CMP groups to arrays of Tealium iQ tag UIDs, an instance of {@link GroupToTagMap GroupToTagMap}. TiQ profile specific, and expected to be provided by Publish Engine (map).
     * @name map
     * @type {object}
     * @memberof! tealiumCmpIntegration
     */
    var map = window.tealiumCmpIntegration.map || {};
    /**
     * A map of Tealium iQ tag UIDs to CMP group assignment, a {@link TagToGroupMap TagToGroupMap}
     * @name tagBasedMap
     * @type {object}
     * @private
     * @memberof! tealiumCmpIntegration
     */
    window.tealiumCmpIntegration.tagBasedMap = generateTagBasedMap();
    /**
     * Allows us to make sure we don't log certain messages more than once, especially useful while polling to avoid overwhelming the user.
     * @function messageNotLoggedYet
     * @param {*} messageId a string or number to uniquely identify a message for the purposes of deduplication
     * @private
     * @returns {boolean} 'true' if the message hasn't been logged yet (and should be logged), otherwise 'false'
     */
    var alreadyLoggedMessageIds = {};
    function messageNotLoggedYet(messageId) {
        var output = false;
        if (typeof alreadyLoggedMessageIds[messageId] === "undefined") {
            alreadyLoggedMessageIds[messageId] = true;
            output = true;
        }
        return output;
    }
    /**
     * Create an instance of {@link ConsentDecision ConsentDecision} based on the specific CMP response
     * @param {array} cmpRawOutput the CMP output returned from cmpFetchCurrentConsentDecision
     * @private
     * @returns {array} an instance of {@link ConsentDecision ConsentDecision}
     */
    function buildConsentDecisionFromRawCmpOutput(cmpRawOutput) {
        var vendorArray = cmpConvertResponseToGroupList(cmpRawOutput) || [];
        var isWellFormed = cmpCheckForWellFormedDecision(cmpRawOutput);
        if (!isWellFormed) {
            vendorArray.type = "missing-well-formed-response";
            return vendorArray;
        }
        var tagBasedMap = generateTagBasedMap();
        // if there is no mapping for the settings id, we need to change the console output
        var currentSettingsIdHasMapping = typeof tagBasedMap === "object" && Object.keys(tagBasedMap).length > 0;
        if (!currentSettingsIdHasMapping) {
            vendorArray.type = "missing-map";
            return vendorArray;
        }
        vendorArray.type = cmpCheckForExplicitConsentDecision(cmpRawOutput) ? "explicit" : "implicit";
        var tiqGroupName = window.tealiumCmpIntegration.tiqGroupName || "_missing_";
        if (cmpCheckForTiqConsent(cmpRawOutput, tiqGroupName) === false) {
            // change the consent type, but leave the array for debugging purposes
            vendorArray.type = "missing-tiq-consent";
        }
        return vendorArray;
    }


    // class that emits consent events as decision change
    class TealiumConsentRegister {
        constructor() {
            this.currentDecision = null;
            this.decisions = [];
        }

        addConsentDecision(decision) {
            // only accept 'implicit' or 'explicit' decisions
            if (!decision || (decision.type !== 'implicit' && decision.type !== 'explicit')) {
                return;
            }
            // don't emit the same decision twice in a row
            if (!this.isNewDecision(this.currentDecision, decision)) {
                return;
            }
            const eventType = this.currentDecision === null ? 'consent_loaded' : 'consent_updated';
            this.currentDecision = decision;
            this.decisions.push(decision);
            const event = new CustomEvent(eventType, { detail: { decision: decision } });
            window.dispatchEvent(event);
        }

        getCurrentDecision() {
            return this.currentDecision;
        }

        getAllDecisions() {
            return this.decisions;
        }

        isNewDecision(desc1, desc2) {
            if (!desc1 || !desc2 || desc1.length !== desc2.length || desc1.type !== desc2.type) return true;

            for (let i = 0; i < desc1.length; i++) {
                if (desc1[i] !== desc2[i]) {
                    return true;
                }
            }
            return false;
        }
    }

    /**
     * The core CMP integration logic, which decides if Tealium iQ should be allowed to run, or if it needs to be stopped until an understandable response that includes permission for Tealium iQ to run is found.
     * @function reactToCmpResponse
     * @param {object} cmpResponse The response from the checkConsents function
     * @access private
     */
    function reactToCmpResponse(cmpResponse) {
        var cmpFound = typeof cmpResponse === "object";
        var foundWellFormedConsentDecision = cmpCheckForWellFormedDecision(cmpResponse);
        var tagBasedMap = generateTagBasedMap();
        var foundMapEntryForActiveSetting = Object.keys(tagBasedMap).length > 0;
        var foundExplicitConsent = cmpCheckForExplicitConsentDecision(cmpResponse);
        var tiqIsAllowedToFire = cmpCheckForTiqConsent(cmpResponse, tiqGroupName);
        var tiqIsLoaded = window.tealiumCmpIntegration.isTiqReady || (window.utag && window.utag.handler && window.utag.handler.iflag === 1);
        var conflictingIntegrations = window.tealiumCmpIntegration.loadRules.hasConflict;
        var noEnforcementRuleApplies = (Object.values(window.tealiumCmpIntegration.loadRules.loadMap)).indexOf(true) === -1;

        var currentDecision = buildConsentDecisionFromRawCmpOutput(cmpResponse);

        // emit consent events for consumption by any client or tool
        try {
            if (!window.tealiumCmpIntegration.suppressConsentRegister) {
                window.tealiumConsentRegister = window.tealiumConsentRegister || new TealiumConsentRegister();
                window.tealiumConsentRegister.addConsentDecision(currentDecision);
            }
        } catch (e) {
            console.warn(e)
        }

        // poll, because we can't rely on CMPs to be able to push decisions to us (and we want to simplify the integrations)
        function checkLater() {
            if (!window.tealiumCmpIntegration.alreadyPolling) {
                window.tealiumCmpIntegration.alreadyPolling = true;
                return window.setTimeout(recheckForCmpAndConsent, consentTimeoutInterval);
            }
        }
        // poll, but only if we're waiting for an explicit decision in an opt-in model
        // or we're still waiting for TiQ or the CMP to be ready
        function checkLaterIfNeeded() {
            if (cmpCheckIfOptInModel() === true) {
                return checkLater();
            }
            if (cmpCheckIfOptInModel() === false && !window.tealiumCmpIntegration.isTiqReady) {
                return checkLater();
            }
        }

        // make sure we set the persistent flag to prevent overpolling
        if (tiqIsLoaded) {
            window.tealiumCmpIntegration.isTiqReady = true;
        }
        if (conflictingIntegrations) {
            /**
             * Conflicting integrations found
             *
             * STOP and fire nothing at all. Do not retry.
             */
            if (messageNotLoggedYet(0)) {
                var message = "Conflicting consent integrations found:\n";
                var loadMap = window.tealiumCmpIntegration.loadRules.loadMap;
                Object.keys(loadMap).forEach(function (key) {
                    if (loadMap[key])
                        message += "\n- " + key
                });
                message += "\n\nStopping TiQ (no cookies set/removed, no tags fired).\n\nNo further polling."
                logger(message);
            }
            stopTiq();
        } else if (noEnforcementRuleApplies) {
            if (messageNotLoggedYet(10))
                logger("Consent Integrations are active on this environment, but none of the enforcement rules apply to this page, and no exemption applies.\n\nStopping TiQ (no cookies set/removed, no tags fired).");
            stopTiq();
        } else if (!cmpFound) {
            /**
             * CASE A1: no CMP found
             *
             * STOP and fire nothing at all
             * RETRY after a delay
             */
            if (messageNotLoggedYet(1))
                logger(
                    "No CMP found on page.\n\nStopping TiQ (no cookies set/removed, no tags fired).\n\nPolling for changes."
                );
            checkLater();
            stopTiq();
        } else if (!foundMapEntryForActiveSetting) {
            /**
             * CASE A7: No map found for the current CMP lookup key
             *
             * STOP and fire nothing at all. Do not retry.
             */
            if (messageNotLoggedYet(2))
                logger(
                    "No map found for current CMP Lookup Key.\n\nStopping TiQ (no cookies set/removed, no tags fired).\n\nNo retries."
                );
            stopTiq();
        } else if (!foundWellFormedConsentDecision) {
            /**
             * CASE A2: CMP found but consent response wasn't well-formed/complete/understandable
             *
             * STOP and fire nothing at all
             * RETRY after a delay
             */
            if (messageNotLoggedYet(3))
                logger(
                    "Found CMP and got response, but didn't understand the response.\n\nStopping TiQ (no cookies set/removed, no tags fired).\n\nPolling for changes."
                );
            checkLater();
            stopTiq();
        } else if (!tiqIsAllowedToFire) {
            /**
             * CASE A3: CMP found and consent response was well-formed, BUT TiQ didn't have an opt-in
             *
             * STOP and fire nothing at all
             * RETRY after a delay
             */
            if (messageNotLoggedYet(4))
                logger(
                    "Found CMP and got well-formed response, but TiQ (window.tealiumCmpIntegration.tiqGroupName, defined as " +
                    window.tealiumCmpIntegration.tiqGroupName +
                    ") isn't allowed to run based on the response.\n\nStopping TiQ (no cookies set/removed, no tags fired).\n\nPolling for changes."
                );
            checkLaterIfNeeded();
            stopTiq();
        } else if (!foundExplicitConsent) {
            /**
             * CASE A4: CMP found AND response was understandable (AND includes an implicit TiQ consent), BUT the user hasn't made an explicit decision yet
             *
             * ALLOW TO LOAD for any 'default opt-in' tags (filter logic in Extension B)
             * RETRY after a delay (in case there's an explicit decision, since implicit decisions usually mean the prompt is displayed)
             */
            if (cmpCheckIfOptInModel() === true) {
                checkLaterIfNeeded();
                if (messageNotLoggedYet(5))
                    logger(
                        "Found CMP and got well-formed IMPLICIT response which includes TiQ.\n\nAllowing certain tags to fire based on IMPLICIT consent.\n\nPolling for changes (opt-in mode)."
                    );
            } else {
                if (messageNotLoggedYet(5))
                    logger(
                        "Found CMP and got well-formed IMPLICIT response which includes TiQ.\n\nAllowing certain tags to fire based on IMPLICIT consent.\n\nNo further polling (opt-out mode)"
                    );
            }
            if (tiqIsLoaded) {
                processEarlyQueue();
            } else {
                checkLaterIfNeeded();
            }
            triggerOrQueue();
        } else if (foundExplicitConsent) {
            /**
             * CASE A5: CMP found AND response was understandable, AND the user has made an explicit consent decision AND TiQ is allowed
             *
             * ALLOW TO LOAD for any opted-in tags (filter logic in Extension B), do not retry.
             */
            if (messageNotLoggedYet(6))
                logger(
                    "Found CMP and got well-formed EXPLICIT response which includes TiQ.\n\nAllowing certain tags to fire based on EXPLICIT consent.\n\nNo further polling."
                );
            processEarlyQueue();
            processImplicitQueue();
            triggerOrQueue();
        } else {
            /**
             * CASE A6: Something went wrong with this extension.
             *
             * STOP and fire nothing at all. Do not retry.
             */
            if (messageNotLoggedYet(7))
                logger(
                    "Something unexpected went wrong.\n\nStopping TiQ (no cookies set/removed, no tags fired).\n\nNo retries."
                );
            stopTiq();
        }
        // if we're in pure monitoring mode, keep polling for changes beyond the first explicit one
        if (!window.tealiumCmpIntegration.suppressConsentRegister && !window.tealiumCmpIntegration.alreadyPolling) {
            window.tealiumCmpIntegration.pollingWouldHaveStopped = true;
            return checkLater();
        }
    }
    /**
     * Override utag.loader.initdata, utag.handler.trigger, utag.handler.RE to allow Tealium iQ Tags to be blocked if the user hasn't consented.
     * @function overrideUtagFunctions
     * @returns {boolean} 'true' if the function was overridden successfully by this request, 'false' if not (because it was already overridden)
     * @access private
     */
    function overrideUtagFunctions() {
        // don't override more than once, assume that if one function has been overridden, both have
        if (window.utag.handler.trigger.toString().indexOf("tealiumCmpIntegration") !== -1) {
            return true;
        }
        // the initial view is handled differently than subsequent events
        // this is safe to to override even if noview is set (because it will never be called in that case)
        window.utag.loader.initdata_old = window.utag.loader.initdata;
        window.utag.loader.initdata = newUtagLoaderInitdata;
        window.utag.handler.trigger_old = window.utag.handler.trigger;
        window.utag.handler.trigger = newUtagHandlerTrigger;
        window.utag.handler.RE_old = window.utag.handler.RE;
        window.utag.handler.RE = newUtagHandlerRE;
        logger("Overrode utag functions!");
        if (window.utag.handler.trigger.toString().indexOf("tealiumCmpIntegration") !== -1) {
            return true;
        }
        return false;
    }

    /**
     * Returns all items from explicit array which are not contained in implicit array
     * @param {array} implicit
     * @param {array} explicit
     * @returns {array}
     * @access private
     */
    function getNewConsents(implicit, explicit) {
        implicit = implicit || [];
        explicit = explicit || [];
        var changes = [];
        for (var i = 0; i < explicit.length; i++) {
            if (implicit.indexOf(explicit[i]) === -1) {
                changes.push(explicit[i]);
            }
        }
        return changes;
    }
    /**
     * Determines if a tag is allowed to fired based on the required consent and the granted consent
     * @param {array} consentedServices a {@link ConsentDecision ConsentDecision}
     * @param {string} assignedPurposesString an comma-delimited string of Purpose IDs.
     * @returns {boolean}
     * @private
     */
    function allPurposesHaveConsent(consentedServices, assignedPurposesString) {
        if (!consentedServices || !assignedPurposesString || typeof assignedPurposesString !== 'string') return false; // return an opt-out in error cases
        var splitPurposeIds = assignedPurposesString.split(',');
        for (var i = 0; i < splitPurposeIds.length; i++) {
            if (consentedServices.indexOf(splitPurposeIds[i]) === -1) return false;
        }
        // all the purposes had consent
        return true;
    }
    /**
     * Determines if a tag should be fired based on the required consent and the previously processed consent
     * @param {array} alreadyProcessedGroups a {@link ConsentDecision ConsentDecision}
     * @param {string} assignedPurposesString an comma-delimited string of Purpose IDs.
     * @returns {boolean}
     * @private
     */
    function allPurposesHaveBeenPreviouslyProcessed(alreadyProcessedGroups, assignedPurposesString) {
        if (!alreadyProcessedGroups || !assignedPurposesString || typeof assignedPurposesString !== 'string') return true; // err toward blocking in error/misconfiguration cases
        var splitPurposeIds = assignedPurposesString.split(',');
        for (var i = 0; i < splitPurposeIds.length; i++) {
            if (alreadyProcessedGroups.indexOf(splitPurposeIds[i]) === -1) return false;
        }
        // all the purposes have already been processed
        return true;
    }
    /**
     * Blocks tags based on consent by manually setting the 'load' and 'send' flags to 0 for any tags that don't have permission to fire.
     * That logic isn't sufficient to block tracking calls with a 'uids' array (which also circumvents load rules), so additional blocking logic is added in the utag.handler.trigger override.
     * @param {object} tagBasedMap a {@link TagToGroupMap TagToGroupMap}
     * @param {object} configObject the current window.utag.loader.cfg object (which is used to control which tags should load/fire)
     * @param {array} consentedServices a {@link ConsentDecision ConsentDecision}
     * @param {array} alreadyProcessedGroups an array of Service Names that have already been processed, to avoid double-firing those tags.
     * @private
     */
    function blockTagsBasedOnConsent(
        tagBasedMap,
        configObject,
        consentedServices,
        alreadyProcessedGroups,
        notProcessedGroups,
        refiringAllowed
    ) {
        // block all tags if the consented services array is missing
        if (Array.isArray(consentedServices) !== true) {
            consentedServices = [];
        }
        tagBasedMap = tagBasedMap || {};
        // if the utag template hasn't been edited, this function won't have been overriden, so we gut it
        // to stop tags from firing
        var utagFunctionsHaveBeenOverridden =
            window.utag.handler.trigger.toString().indexOf("tealiumCmpIntegration") !== -1;
        if (utagFunctionsHaveBeenOverridden !== true) {
            window.utag.handler.trigger = function () {
                if (messageNotLoggedYet(8)) {
                    logger(
                        "Tags have been disabled because the required utag.loader edit hasn't been done successfully and the tealiumCmpIntegration is active."
                    );
                }
            };
            consentedServices = [];
        }

        if (!window.tealiumCmpIntegration.bundledTags) {
            var cfg = window.utag.loader.cfg;
            var tags = Object.keys(cfg);
            window.tealiumCmpIntegration.bundledTags = tags.filter(function (tag) { return cfg[tag].load === 4 });
        }

        var deactivatedTags = [];
        // turn the map into an easier-to-query object
        alreadyProcessedGroups = alreadyProcessedGroups || [];
        var tiqIsAllowed = tiqGroupName && consentedServices.indexOf(tiqGroupName) !== -1;
        var allTagUids = Object.keys(configObject);
        var assignedPurposeIds;
        var isAllowed;

        // deactivate tags that aren't mapped and consented
        for (var i = 0; i < allTagUids.length; i++) {
            isAllowed = false; // assume no consent
            assignedPurposeIds = tagBasedMap[allTagUids[i]] || [];
            if (assignedPurposeIds) {
                // only fire if TiQ and the tag is allowed AND (it hasn't already fired OR it's supposed to refire when decisions change)
                isAllowed =
                    tiqIsAllowed && // TiQ is allowed AND
                    allPurposesHaveConsent(consentedServices, assignedPurposeIds) && // all purposes for this tag have consent AND
                    (!allPurposesHaveBeenPreviouslyProcessed(alreadyProcessedGroups, assignedPurposeIds) || // (tag has not yet fired OR
                        (notProcessedGroups.length > 0 && refiringAllowed.indexOf(Number(allTagUids[i])) !== -1)); // tag is allowed to refire)
            }
            if (isAllowed === true) {
                // should fire - has consent and load rules are met
                configObject[allTagUids[i]].consent = 1;
                configObject[allTagUids[i]].block = 0;
                utag.loader.bk[allTagUids[i]] = 0;
            } else {
                configObject[allTagUids[i]].send = 0;
                configObject[allTagUids[i]].consent = 0;
                configObject[allTagUids[i]].block = 1;
                deactivatedTags.push(allTagUids[i]);
                utag.loader.bk[allTagUids[i]] = 1;
            }
        }
        if (messageNotLoggedYet(9)) {
            logger(
                "Blocked tags: " +
                JSON.stringify(deactivatedTags, null, 2) +
                (tiqIsAllowed ? "" : "\n\nAll tags blocked because Tealium iQ isn't allowed to fire.")
            );
        }
        return configObject;
    }
    /**
     * An overridden version of the Tealium iQ function utag.handler.RE.
     * @function newUtagHandlerRE
     * @param {*} a can be an object or a string
     * @param {*} b
     * @param {*} c
     * @access private
     */
    function newUtagHandlerRE(a, b, c) {
        if (c == "alr") {
            var tagBasedMap = generateTagBasedMap();
            // recheck
            var currentlyAllowedVendors = getCurrentConsentDecision();
            var alreadyProcessed = b[nameOfImplicitQueueMarker] === 1 ? window.tealiumCmpIntegration.implicitServices : []; // use the previously processed consent if appropriate
            var notProcessed = getNewConsents(alreadyProcessed, currentlyAllowedVendors);
            // Add the current ConsentDecision information (allowed Services and consent type) to the UDO for possible use in extensions
            b[nameOfFullGroupArray] = currentlyAllowedVendors;
            b[nameOfConsentTypeString] = currentlyAllowedVendors && currentlyAllowedVendors.type;
            b[nameOfUnprocessedGroupArray] = notProcessed;
            b[nameOfProcessedGroupArray] = alreadyProcessed;
            logger(
                "Called block logic:\n\nAllowed: " +
                JSON.stringify(currentlyAllowedVendors, null, 2) +
                "\n\nAlready processed: " +
                (alreadyProcessed ? JSON.stringify(alreadyProcessed, null, 2) : "(none)")
            );
            logger(
                "Map:\n\n" +
                JSON.stringify(map, null, 2) +
                "\n\nActive CMP Lookup Key: " +
                cmpFetchCurrentLookupKey() +
                "\n\nMap has entry for current settingsId: " +
                (typeof map[cmpFetchCurrentLookupKey()] === "object" ? "true" : "false") +
                "\n\nTag-based map for the active key: " +
                JSON.stringify(tagBasedMap, null, 2) +
                "\n\nTags configured to refire: " +
                JSON.stringify(refiringAllowed.map(tag => String(tag)), null, 2)
            );
            logger(
                "Consent confirmed: " +
                currentlyAllowedVendors.type +
                " : " +
                JSON.stringify(currentlyAllowedVendors, null, 2)
            );
            var newCfg = blockTagsBasedOnConsent(
                tagBasedMap,
                window.utag.loader.cfg,
                currentlyAllowedVendors,
                alreadyProcessed,
                notProcessed,
                refiringAllowed
            );
            window.utag.loader.cfg = newCfg;
        }
        var r = window.utag.handler.RE_old(a, b, c);
        return r;
    }
    /**
     * An overridden version of the Tealium iQ function utag.loader.initdata.
     * Calls the original function, respects possible noview settings, rechecks the user consent, and calls queueEventWithoutFiringImplicitServices
     * if only an IMPLICIT consent is found (after recording the IMPLICIT services, to avoid double-firing).
     * That same event can then be re-processed for any new Services if an EXPLICIT consent decision later made.
     * @function newUtagLoaderInitdata
     * @access private
     */
    function newUtagLoaderInitdata() {
        window.utag.loader.initdata_old();
        // make sure we don't queue this initial page load twice, and respect the configured noview setting
        if (!window.tealiumCmpIntegration.isNoviewSet && !window.tealiumCmpIntegration.alreadyFiredInitialViewEvent) {
            var consentedServices = getCurrentConsentDecision();
            if (consentedServices.type === "missing-well-formed-response") {
                return;
            }
            window.tealiumCmpIntegration.alreadyFiredInitialViewEvent = true;
            if (consentedServices.type === "implicit") {
                window.tealiumCmpIntegration.implicitServices = consentedServices;
                var viewEvent = {
                    event: "view",
                    data: window.utag.handler.C(window.utag.data),
                };
                // store the original event and get the ID back
                viewEvent.data[nameOfEventIdString] = storeOriginalEvent(viewEvent);
                // we don't need to fire implicit services in this case, because TiQ's loading process will fire them
                queueEventWithoutFiringImplicitServices(viewEvent);
            }
        }
    }
    /**
     * Refresh [tealiumCmpIntegration.tagBasedMap]{@link tealiumCmpIntegration.tagBasedMap} and return that new map, helps smooth out any timing issues between CMP and Tealium iQ load.
     * @function generateTagBasedMap
     * @returns a [TagToGroupMap]{@link TagToGroupMap}
     * @access private
     */
    function generateTagBasedMap() {
        var tagBasedMap = getTagBasedMap(map);
        window.tealiumCmpIntegration.tagBasedMap = tagBasedMap;
        return tagBasedMap;
    }
    /**
     * Tealium iQ's utag.handler.trigger normally causes tags to fire. For this integration, we override that function to support blocking tags without consent.
     * @function newUtagHandlerTrigger
     * @param {*} a can be an object or a string
     * @param {*} b
     * @param {*} c
     * @access private
     */
    function newUtagHandlerTrigger(a, b, c) {
        /**
         * Trigger CASES (utag.handler.trigger override)
         *
         * We need to queue the events if we only have implicit consent, to allow a selective retrigger if/when we get an explicit decision.
         */
        var isPureConsentEvent = a === nameOfConsentPollingEvent && !b && !c;
        var isNoviewSet = window.tealiumCmpIntegration.isNoviewSet || true; // assume noview if something went wrong with the global, to avoid firing tracking in error
        var consentedServices = getCurrentConsentDecision();
        var consentType = (consentedServices && consentedServices.type) || "none";
        var isCmpReady = consentType === "implicit" || consentType === "explicit";
        var isTealiumReady = window.tealiumCmpIntegration.isTiqReady || (window.utag && window.utag.handler && window.utag.handler.iflag === 1) || (window.utag && window.utag.PINITCalled === true);
        // save this to avoid polling too much if something goes wrong with the iflag after initial load
        if (isTealiumReady) {
            window.tealiumCmpIntegration.isTiqReady = true;
        }
        if (!isPureConsentEvent) {
            logger("utag.handler.trigger called with:\n\n" + JSON.stringify(arguments, null, 2));
            b = b || {};
            // use the existing id or store the original event and get the ID back
            b[nameOfEventIdString] = b[nameOfEventIdString] || storeOriginalEvent(a, b, c);
        }
        if (!isCmpReady && !isTealiumReady) {
            consentedServices.type = "tealium-and-cmp-loading";
            logger("Waiting for CMP and Tealium to be ready, queueing early event.");
            queueEarlyEvent(a, b, c);
            return false;
        } else if (!isCmpReady) {
            consentedServices.type = "cmp-loading";
            logger("CMP is still loading, queueing early event");
            queueEarlyEvent(a, b, c);
            return false;
        } else if (!isTealiumReady) {
            consentedServices.type = "tealium-still-loading";
            logger("Tealium iQ is still loading, queueing early event");
            queueEarlyEvent(a, b, c);
            return false;
        }
        // if an array of tagUids is passed, that forces them to fire regardless of load rules
        // or consent, so we need to filter that array before allowing it to be processed
        var hasTagUidArray = c && typeof c === "object" && c.uids && window.utag.ut.typeOf(c.uids) === "array";
        var uidMap = generateTagBasedMap();
        var allowedTagUids = [];
        var blockedTagUids = [];
        var assignedPurposeIds;
        var tagUid;
        var hasConsent;
        if (hasTagUidArray) {
            for (var i = 0; i < c.uids.length; i++) {
                tagUid = c.uids[i];
                assignedPurposeIds = uidMap[tagUid] || "(missing)";
                hasConsent = utag.loader.cfg[tagUid] && utag.loader.cfg[tagUid].consent === 1;
                // only push consented services into the new array
                if (hasConsent) {
                    allowedTagUids.push(tagUid);
                } else {
                    blockedTagUids.push(tagUid);
                }
            }
            c.originalUids = c.uids.slice(); // make a shallow copy
            c.uids = allowedTagUids.slice();
            c.blockedTagUids = blockedTagUids.slice();
            // replace the original with the filtered array (can also be empty, if none of them were allowed)
            logger(
                "Call included tagUid array:\n\n" +
                JSON.stringify(c.originalUids) +
                "\n\nwhich was replaced by the filtered version (after consent and refire considerations):\n\n" +
                JSON.stringify(c.uids)
            );
        }
        if (consentType === "explicit") {
            /**
             * CASE T2: expected globals are populated, consent is EXPLICIT
             *
             * FIRE allowed tags (explicit)
             * utag.handler.trigger override PROCESSES the queue, which will include any queued events from CASE A4, making sure not to re-fire any default
             * opt-in tags that were already fired for the queued events
             */
            // make sure TiQ loads
            processEarlyQueue();
            processImplicitQueue();
            triggerTiqLoad();
            // fire the current event if it's not just a polling event
            if (!isPureConsentEvent) {
                return window.utag.handler.trigger_old(a, b, c);
            }
        } else if (consentType === "implicit") {
            /**
             * CASE T3: expected globals are populated, consent is IMPLICIT
             *
             * FIRE allowed tags (implicit)
             * utag.handler.trigger override KEEPS a queue/record that includes
             *  - the event(s) that were processed based on implicit consent
             *  - which tags were allowed to process each event (are set to implicit opt-in)
             */
            processEarlyQueue();
            // fire the initial view if appropriate, and queue it
            triggerTiqLoad();
            window.tealiumCmpIntegration.implicitServices = consentedServices;
            // queue the initial 'view' on pageload if appropriate
            if (!isNoviewSet && isTealiumReady && !window.tealiumCmpIntegration.alreadyFiredInitialViewEvent) {
                window.tealiumCmpIntegration.alreadyFiredInitialViewEvent = true;
                queueEventAndFireImplicitServices("view", window.utag.handler.C(window.utag.data));
            }
            // queue the current event if it exists (and this isn't just consent polling)
            if (!isPureConsentEvent) {
                return queueEventAndFireImplicitServices(a, b, c);
            }
        } else if (consentType === "missing-map") {
            logger(
                "Something went wrong - all tags were blocked because no consent map was found for the active setting ID."
            );
            return false;
        } else if (consentType === "missing-tiq-consent") {
            logger(
                'Something went wrong - all tags were blocked because no consent was found for "' +
                tiqGroupName +
                '", configured Tealium iQ name.\n\nConsent found: ' +
                JSON.stringify(consentedServices, null, 2)
            );
            return false;
        } else {
            /**
             * CASE T1: expected variables not populated (misconfiguration/error case)
             *
             * STOP and fire nothing at all. Do not retry or queue the event.
             */
            logger("Something went wrong - all tags were blocked because the consent response was not understood.");
            return false;
        }
    }
    var dequeuingInterval = 150;
    /**
     * Process any queued tracking events from [the early event queue]{@link tealiumCmpIntegration.earlyEventQueue} (can include pageviews) for any currently-consented Services.
     * Intended to be called first understandable implicit consent.
     * @function processEarlyQueue
     * @access private
     */
    function processEarlyQueue() {
        if (window.tealiumCmpIntegration.alreadyProcessingEarlyQueue !== true) {  // don't process this queue more than once, it can mess with the event order
            window.tealiumCmpIntegration.earlyEventQueue = window.tealiumCmpIntegration.earlyEventQueue || [];
            var count = 1;
            var trackCallGenerator = function (event) {
                return function () {
                    window.utag.track(event);
                };
            };
            while (window.tealiumCmpIntegration.earlyEventQueue.length > 0) {
                // process past events
                window.tealiumCmpIntegration.alreadyProcessingEarlyQueue = true;
                var queuedEvent = window.tealiumCmpIntegration.earlyEventQueue.shift();
                queuedEvent.data[nameOfProcessedGroupArray] = []; // nothing will have been fired at this point, because this is the early queue
                logger(
                    "Processing queued early event for currently consented tags: " + JSON.stringify(queuedEvent, null, 2)
                );
                var trackCall = trackCallGenerator(queuedEvent);
                window.setTimeout(trackCall, count * dequeuingInterval);
                count++;
            }
        }
    }
    /**
     * Process any queued tracking events from [the global queue]{@link tealiumCmpIntegration.implicitEventQueue} (can include pageviews) for any newly-consented Services.
     * Intended to be called on new EXPLICIT consent decision - queued events have already had IMPLICTLY consented tags fired, so those need to be excluded.
     * @function processImplicitQueue
     * @access private
     */
    function processImplicitQueue() {
        var count = 1;
        var trackCallGenerator = function (event) {
            return function () {
                // use the original event instead of the one that's already had the payload altered by extensions, but use
                // the latest the consent integrations parameters to ensure proper processing
                var originalEventCopy = JSON.parse(JSON.stringify(window.tealiumCmpIntegration.originalEvents[event.data[nameOfEventIdString]])); // copy the object
                originalEventCopy.data[nameOfImplicitQueueMarker] = 1;
                return window.utag.track(originalEventCopy);
            };
        };
        var alreadyLogged = false;
        if (window.tealiumCmpIntegration.alreadyProcessingImplicitQueue !== true) { // don't process this queue more than once, it can mess with the event order
            window.tealiumCmpIntegration.implicitEventQueue = window.tealiumCmpIntegration.implicitEventQueue || [];
            while (window.tealiumCmpIntegration.implicitEventQueue.length > 0) {
                if (!alreadyLogged) {
                    alreadyLogged = true;
                    logger(
                        "Explicit consent tracking request received - processing past implicitly tracked events (" +
                        window.tealiumCmpIntegration.implicitEventQueue.length +
                        ") for any new explicit tags."
                    );
                }
                // process past events
                window.tealiumCmpIntegration.alreadyProcessingImplicitQueue = true;
                var queuedEvent = window.tealiumCmpIntegration.implicitEventQueue.shift();
                logger("Triggering event for explicitly-consented tags: " + JSON.stringify(queuedEvent));
                var trackCall = trackCallGenerator(queuedEvent);
                window.setTimeout(trackCall, count * dequeuingInterval);
                count++;
            }
        }
    }
    /**
     * Queue a [tracking event]{@link QueuedEvent} for later reference, to avoid double-executing extensions. Does not fire tags.
     * Intended to be called for all incoming events, to preserve the original payloads for later replay.
     * @function storeOriginalEvent
     * @param {*} a the 'a' argument from utag.handler.trigger
     * @param {*} b the 'b' argument from utag.handler.trigger
     * @param {*} c the 'c' argument from utag.handler.trigger
     * @returns the event_id to be used for internal lookups when dequeuing (to avoid having extensions process the same payload twice)
     * @access private
     */
    function storeOriginalEvent(a, b, c) {
        a = a || {};
        // make a copy, in case shared objects are used (like utag_data, or a similar global) - snapshot those
        if (typeof b === "object") {
            b = JSON.parse(JSON.stringify(b));
        }
        // convert to a more standard format
        if (typeof a === "string") {
            a = { event: a, data: b || {}, cfg: c };
        }
        // nothing will be allowed to fire
        var event_id = String(Date.now()) + String(Math.round(Date.now() * Math.random() * 10000));
        a.data[nameOfEventIdString] = event_id;
        window.tealiumCmpIntegration.originalEvents = window.tealiumCmpIntegration.originalEvents || {};
        window.tealiumCmpIntegration.originalEvents[event_id] = a;
        logger("Stored original event " + event_id + "!");
        return event_id;
    }
    /**
     * Queue a [tracking event]{@link QueuedEvent} in [the early queue]{@link tealiumCmpIntegration.earlyEventQueue}, without firing any tags.
     * Intended to be called for events that triggered before we get an understandable response from the CMP.
     * @function queueEarlyEvent
     * @param {*} a the 'a' argument from utag.handler.trigger
     * @param {*} b the 'b' argument from utag.handler.trigger
     * @param {*} c the 'c' argument from utag.handler.trigger
     * @access private
     */
    function queueEarlyEvent(a, b, c) {
        a = a || {};
        // make a copy, in case shared objects are used (like utag_data, or a similar global) - snapshot those
        if (typeof b === "object") {
            b = JSON.parse(JSON.stringify(b));
        }
        // convert to a more standard format with our own control object
        if (typeof a === "string") {
            a = { event: a, data: b || {}, cfg: c };
        }
        a.data[nameOfEventIdString] = a.data[nameOfEventIdString] || storeOriginalEvent(a, b, c);  // use the existing id or store the original event and get the ID back

        window.tealiumCmpIntegration.earlyEventQueue = window.tealiumCmpIntegration.earlyEventQueue || [];
        window.tealiumCmpIntegration.earlyEventQueue.push(a);
        logger("Queued early event!");
    }
    /**
     * Queue a [tracking event]{@link QueuedEvent} in [the global queue]{@link tealiumCmpIntegration.implicitEventQueue}, without firing any implictly consented Services.
     * Intended to be called for the initial pageview on load, since the load process will have already fired the implicit services.
     * @function queueEventWithoutFiringImplicitServices
     * @param {*} a the 'a' argument from utag.handler.trigger
     * @param {*} b the 'b' argument from utag.handler.trigger
     * @param {*} c the 'c' argument from utag.handler.trigger
     * @access private
     */
    function queueEventWithoutFiringImplicitServices(a, b, c) {
        a = a || {};
        // make a copy, in case shared objects are used (like utag_data, or a similar global) - snapshot those
        if (typeof b === "object") {
            b = JSON.parse(JSON.stringify(b));
        }
        // convert to a more standard format with a control object for the integrations
        if (typeof a === "string") {
            a = { event: a, data: b || {}, cfg: c };
        }

        a.data[nameOfEventIdString] = a.data[nameOfEventIdString] || storeOriginalEvent(a, b, c);  // use the existing id or store the original event and get the ID back

        // if there's a tagUid array, don't queue the already-fired tags unless they're allowed to refire - instead, swap that with any blocked tags
        var newUids;
        if (a && a.cfg && window.utag.ut.typeOf(a.cfg.uids) === "array") {
            // anything blocked previously (to give it another chance with new consent)
            newUids = a.cfg.blockedTagUids.slice();
            // add any tags that were originally in the uid array AND have been marked to refire on both IMPLICIT and EXPLICIT consent decisions (like Tealium Collect)
            // as long as there are newly consented groups and it's not already in the array
            for (var i = 0; i < refiringAllowed.length; i++) {
                if (
                    a.cfg.originalUids &&
                    a.cfg.originalUids.indexOf(refiringAllowed[i]) !== -1 &&
                    newUids.indexOf(refiringAllowed[i]) === -1 &&
                    b[nameOfUnprocessedGroupArray].length > 0
                ) {
                    newUids.push(refiringAllowed[i]);
                }
            }
            a.cfg.uids = newUids;
        }
        delete a.data[nameOfProcessedGroupArray];
        delete a.data[nameOfFullGroupArray];
        delete a.data[nameOfUnprocessedGroupArray];
        window.tealiumCmpIntegration.implicitEventQueue = window.tealiumCmpIntegration.implicitEventQueue || [];
        // only queue if there's a possiblity that we'll reprocess (only in the opt-in model)
        if (window.tealiumCmpIntegration.cmpCheckIfOptInModel()) {
            window.tealiumCmpIntegration.implicitEventQueue.push(a);
        }
    }
    /**
     * Queue a [tracking event]{@link QueuedEvent} in [the global queue]{@link tealiumCmpIntegration~implicitEventQueue}, without firing any implicitly consented Services.
     * Intended to be called for all events other than the initial page load.
     * @function queueEventAndFireImplicitServices
     * @param {*} a the 'a' argument from utag.handler.trigger
     * @param {*} b the 'b' argument from utag.handler.trigger
     * @param {*} c the 'c' argument from utag.handler.trigger
     * @access private
     */
    function queueEventAndFireImplicitServices(a, b, c) {
        // fire the implicit tags
        window.utag.handler.trigger_old(a, b, c);
        logger("Implicit consent tracking request fired (or queued, if utag hasn't loaded).");
        return queueEventWithoutFiringImplicitServices(a, b, c);
    }
    /**
     * Generate a {@link TagToGroupMap TagToGroupMap} based on a {@link GroupToTagMap GroupToTagMap}
     * @function getTagBasedMap
     * @param {object} map a {@link GroupToTagMap GroupToTagMap} object
     * @return {object} a {@link TagToGroupMap TagToGroupMap}
     * @access private
     */
    function getTagBasedMap(map) {
        // generate a lookup based on the tagUid
        if (typeof map !== "object") return {};
        var settingsId = cmpFetchCurrentLookupKey() || "";
        if (typeof settingsId !== "string" || settingsId === "") return {};
        var settingSpecificMap = map[settingsId] || {};
        var purposeIds = Object.keys(settingSpecificMap);
        var uidMap = {};
        for (var i = 0; i < purposeIds.length; i++) {
            for (var j = 0; j < settingSpecificMap[purposeIds[i]].length; j++) {
                uidMap[settingSpecificMap[purposeIds[i]][j]] = uidMap[settingSpecificMap[purposeIds[i]][j]] || []
                uidMap[settingSpecificMap[purposeIds[i]][j]].push(purposeIds[i]);
            }
        }
        // convert from arrays of purposes to strings
        Object.keys(uidMap).forEach((tag) => {
            uidMap[tag] = uidMap[tag].join(',')
        })
        return uidMap;
    }
    /**
     * Trigger the core logic with an up-to-date {@link ConsentDecision ConsentDecision}
     * @function recheckForCmpAndConsent
     * @access private
     */
    function recheckForCmpAndConsent() {
        var newConsentResponse = cmpFetchCurrentConsentDecision();
        window.tealiumCmpIntegration.alreadyPolling = false; // reset the flag
        reactToCmpResponse(newConsentResponse);
    }
    /**
     * Get the current consent decision from the CMP for the active Setting
     * @function getCurrentConsentDecision
     * @returns a {@link ConsentDecision ConsentDecision}
     * @access private
     */
    function getCurrentConsentDecision() {
        var freshConsent = cmpFetchCurrentConsentDecision();
        return buildConsentDecisionFromRawCmpOutput(freshConsent);
    }
    /**
     *  A conditional logging function - we can't use utag.DB directly because some of our logic needs to be preloader, but we can mimic the same logic so that our logging only displays when TiQ is in debug mode and/or not in Prod, or is explicitly forced.
     * @function logger
     * @private
     * @param {string} message the message to be conditionally shown
     * @param {boolean} showOutsideDebugMode if 'true', forces the message to shown outside of debug mode, except on Prod
     */
    function logger(message, showOutsideDebugMode) {
        if (typeof tealiumEnvironment === "undefined" || tealiumEnvironment === "prod") {
            // don't allow anything outside of debug mode on prod (disable this flag)
            showOutsideDebugMode = false;
        }
        if (showOutsideDebugMode || tiqInDebugMode) {
            message = "\n" + message + "\n";
            var formattedArr = [];
            formattedArr.push("****************");
            var messageArr = message.split("\n");
            messageArr.forEach(function (messageLine) {
                formattedArr.push("*  " + messageLine);
            });
            formattedArr.push("****************");
            var outputString = formattedArr.join("\n");
            console.log(outputString);
        }
    }
    /**
     * Stops Tealium iQ from loading (the TMS will not load tags or set a cookie if this function is called in Pre Loader), using the {@link https://docs.tealium.com/platforms/javascript/settings/#noload noload} setting
     * @function stopTiq
     * @access private
     */
    function stopTiq() {
        window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
        window.utag_cfg_ovrd.noload = true;
    }
    /**
     * Allows TiQ to finish loading, intended to be called when a well-formed consent response is received, and that response allows Tealium iQ to run.
     * Works by setting {@link https://docs.tealium.com/platforms/javascript/settings/#noload noload} to 'false' and calling Tealium iQ's utag.loader.PINIT method.
     * If noload was 'true' and this function runs it must've been set to true by our own {@link module:utcm/framework~stopTiq stopTiq} function, because otherwise Tealium iQ wouldn't have been allowed to load/poll in the first place.
     * @function triggerTiqLoad
     * @access private
     * @returns {boolean} 'true' if Tealium iQ was successfully triggered, 'false' if it wasn't triggered because it's already initiated
     */
    function triggerTiqLoad() {
        // if the CMP is ready on the first request, TiQ won't have loaded yet at all - let it load naturally
        if (!(window.utag && window.utag.loader && window.utag.loader.PINIT)) {
            return true;
        }
        // if TiQ has already loaded but these flags aren't truthy, we've interrupted the load and should retrigger it
        // initial load / view (noview logic handled in utag.handler.trigger function itself)
        if (!window.utag.handler || !window.utag.handler.iflag) {
            // we don't need to reload actually, just allow it to finish loading
            window.utag.cfg.noload = false; // safe because this code only runs if it was set to false originally
            if (!window.utag.PINITCalled) {
                // calling PINIT more than once causes issues in some edge cases
                // unset this now, at the last second, to prevent DOM Ready from setting cookies with RDses previously but allow them to be set now
                window.utag.loader.rd_flag = undefined;
                window.utag.loader.PINIT();
                // ensure bundled tags that are both prioritized and implicitly consented fire correctly
                for (var i in window.utag.loader.GV(window.utag.loader.cfg)) {
                    var tag = window.utag.loader.cfg[i];
                    if (tag.load === 4 && (tag.send === 1 || tag.send === true) && tag.wait === 0) {
                        window.utag.loader.LOAD(i);
                    }
                }
                window.utag.PINITCalled = true;
            }
            return true;
        }
        // already loaded
        return false;
    }
    /**
     * If Tealium iQ hasn't loaded, load it (calling utag.handler.trigger in the process), otherwise call utag.handler.trigger.
     * @function triggerOrQueue
     * @access private
     */
    function triggerOrQueue() {
        var successfullyTriggeredLoadIfNeeded = triggerTiqLoad();
        if (!successfullyTriggeredLoadIfNeeded) {
            // explicit consent from polling, but load has already been triggered
            return window.utag.handler.trigger(nameOfConsentPollingEvent);
        }
    }
    /**
     * Get the the current Tealium iQ environment.
     * Since this runs in Pre Loader, it needs to use regex to recognize the utag.js file in the DOM and read the environment from the file name (there are no utag functions or objects at this point in the load).
     * NOTE: This doesn't work correctly when using the the Environment Switcher (because the original script is added to the DOM instead of the new one, and the 307 redirect that's used to pull the new file(s) only changes the response, not the script element itself).
     * If you're using the Environment Switcher on Prod and would like to see console output, set the [debug cookie]{@link https://docs.tealium.com/platforms/javascript/debugging/}.
     * @function getTealiumEnvironment
     * @access private
     * @returns {string}
     */
    function getTealiumEnvironment() {
        var allScripts = document.getElementsByTagName("script");
        var re = /\/([^/]*)\/utag\.js(\?.*)*$/;
        for (var i = 0; i < allScripts.length; i++) {
            var result = re.exec(allScripts[i].src); // can be null
            if (result && result[1]) {
                // [1] is the result of the match
                return result[1];
            }
        }
        return "prod"; // default to guessing we're in prod, just in case we're actually in prod (to avoid logging in Prod)
    }
    /******************************************** Module entry point below ********************************************/
    // if noload is set to 'true', don't interfere, just return to exit this function and allow that setting to stop TiQ load as usual.
    if (window.utag_cfg_ovrd && window.utag_cfg_ovrd.noload === true) return false;
    logger(
        "TiQ CMP integration active: " +
        window.tealiumCmpIntegration.cmpName +
        (tiqInDebugMode
            ? "\n\nDEBUGGING TIP: Use /SENDING|\\*\\*\\*\\*/ in the browser console as the 'filter' to show only CMP and tag send notifications."
            : "\n\nActivate TiQ Debug Mode for more details: https://docs.tealium.com/platforms/javascript/debugging/")
    );
    overrideUtagFunctions();
    // FIX for DOM Ready extension conditions (like for Events) in case a noload timing condition is hit
    var data = window.utag.loader.GV(window.utag_data);
    window.utag.cl = {
        "_all_": 1
    };
    window.utag.loader.rd_flag = 1;
    window.utag.loader.RD(data);
    window.utag.loader.loadrules(data);
    window.utag.cl = undefined;
    // leave this set to 1 to prevent DOM Ready from setting cookies with RDses
    // window.utag.loader.rd_flag = undefined;
    var cmpResponse = cmpFetchCurrentConsentDecision();
    reactToCmpResponse(cmpResponse);
})(window);
/*********************************** Document key data structures below for clarity ***********************************/
/**
 * An array of CMP group names that have permission to run.
 * Also includes a 'type' property that indicates whether the consent decision is IMPLICIT or EXPLICT.
 * @static
 * @type {array}
 * @name ConsentDecision
 * @memberof! <global>
 * @property {string} type the type of consent, will be either 'implicit' or 'explicit'
 * @example
var exampleConsentDecision = window.tealiumCmpIntegration.getCurrentConsentDecision()
JSON.stringify(exampleConsentDecision)
// ["C0001","C0002","C0003"]
exampleConsentDecision.type
// "explicit"
exampleConsentDecision.length
// 3
 */
/**
 * Assigns Tealium iQ Tags to Purpose IDs. Each purpose can be associated with multiple tags, and each tag can only be assigned to multiple purposes.
 * The keys for the main object are the configuration ID from the CMP (Vendor Id), inside that are key/value pairs where the key is a Purpose ID (granularity is flexible), and the value is an array of TagUIDs from Tealium iQ.
 * This needs to be provided as per the example below, in [tealiumCmpIntegration.map]{@link namespace:tealiumCmpIntegration~map}.
 * @static
 * @type {object}
 * @name GroupToTagMap
 * @memberof! <global>
 * @example
window.tealiumCmpIntegration = window.tealiumCmpIntegration || {}
window.tealiumCmpIntegration.map = {
    "b38364e4-b2c4-4349-8e4e-48cf28a35db8": {
        "C0004": [
            "17",
            "18",
            "19",
            "20"
        ],
        "C0001": [
            "21",
            "22",
            "14",
            "20"
        ],
        "C0002": [
            "12",
            "20",
            "13",
            "19"
        ],
        "C0003": [
            "13",
            "14",
            "15",
            "16",
            "20"
        ]
    }
}
 */
/**
 * A simple lookup, with Tealium iQ tag UIDs as keys and the Purpose IDs as values. Each purpose can be associated with multiple tags, and each tag can be mapped to multiple purposes.
 * The example is based on the {@link GroupToTagMap GroupToTagMap} example, where the CMP Lookup Key (a Usercentrics Settings ID, in this case) on the active page is 'b38364e4-b2c4-4349-8e4e-48cf28a35db8'.
 * This object is automatically generated by the [getTagBasedMap]{@link module:utcm/framework~getTagBasedMap} method, and made available globally in [tealiumCmpIntegration.tagBasedMap]{@link tealiumCmpIntegration~tagBasedMap} for debugging and use within extensions.
 * @static
 * @type {object}
 * @name TagToGroupMap
 * @memberof! <global>
 * @example
{
    "12": "C0002",
    "13": "C0002,C0003",
    "14": "C0001,C0003",
    "15": "C0003",
    "16": "C0003",
    "17": "C0004",
    "18": "C0004",
    "19": "C0004,C0002",
    "20": "C0004,C0001,C0002,C0003",
    "21": "C0001",
    "22": "C0001"
}
 */
/**
 * An object from the [implicitEventQueue]{@link tealiumCmpIntegration.implicitEventQueue} or [earlyEventQueue]{@link tealiumCmpIntegration.earlyEventQueue}, which represents a Tealium iQ tracking event that's been processed based on an IMPLICIT [ConsentDecision]{@link ConsentDecision}
 * Heavily based on the argument passed to [utag.track]{@link https://community.tealiumiq.com/t5/Tealium-iQ-Tag-Management/utag-track-method/td-p/24578}, since it's designed to be processed by that method.
 * Initial pageviews (handled in the [utag.loader.initdata override]{@link module:utcm/framework~newUtagLoaderInitdata}) will NOT have metadata like cookies, qps, etc - utag.track calls (handled in the [utag.handler.trigger override]{@link module:utcm/framework~newUtagHandlerTrigger}) will. That's a byproduct of using utag.handler.trigger, which is later in the load - those metadata will be re-read when the queue is processed, and since this queue isn't persisted between pages, it should be fine like that - the only strange behavior will be that any metadata that aren't present on re-read will still be present after the re-read - only values that are still present will be replaced with new values.
 * An alternative approach could be to manually remove 'cp.\*', 'dom.\*', 'ut.\*', 'qp.\*', 'meta.\*' and possibly 'tealium_\*' (except 'tealium_event') from the 'data' object before queueing - that hasn't been done so far.
 * @static
 * @type {object}
 * @name QueuedEvent
 * @memberof! <global>
 * @property {string} event the type of tracking event, generally 'view' for pageviews or 'link' for other events
 * @property {object} data the Universal Data Object associated with the event (from utag_data or the b object)
 * @property {object} cfg an optional configuration object that can have a 'cb' property (for a callback function) and a 'uids' array, which is a list of tag UIDs that should be triggered by the event, regardless of whether load rules are met.
 * @example
{
    "event": "view",
    "data": {
        "cp.utag_main_v_id": "0180d6afbfe5001fb3c58332996b05079004c07100fb8",
        "cp.utag_main__sn": "1",
        "cp.utag_main__se": "5",
        "cp.utag_main__ss": "0",
        "cp.utag_main__st": "1652872155220",
        "cp.utag_main_ses_id": "1652869283813",
        "cp.utag_main__pn": "3",
        "cp.utagdb": "true",
        "dom.referrer": "",
        "dom.title": "Usercentrics v2 Test",
        "dom.domain": "solutions.tealium.net",
        "dom.query_string": "",
        "dom.hash": "",
        "dom.url": "https://solutions.tealium.net/hosted/usercentrics-v2/test-page-standard.html",
        "dom.pathname": "/hosted/usercentrics-v2/test-page-standard.html",
        "dom.viewport_height": 1336,
        "dom.viewport_width": 976,
        "ut.domain": "tealium.net",
        "ut.version": "ut4.46.202205181037",
        "ut.event": "view",
        "ut.visitor_id": "0180d6afbfe5001fb3c58332996b05079004c07100fb8",
        "ut.session_id": "1652869283813",
        "ut.account": "services-caleb",
        "ut.profile": "usercentrics-v2-by-tag",
        "ut.env": "qa",
        "tealium_event": "view",
        "tealium_visitor_id": "0180d6afbfe5001fb3c58332996b05079004c07100fb8",
        "tealium_session_id": "1652869283813",
        "tealium_session_number": "1",
        "tealium_session_event_number": "5",
        "tealium_datasource": "",
        "tealium_account": "services-caleb",
        "tealium_profile": "usercentrics-v2-by-tag",
        "tealium_environment": "qa",
        "tealium_random": "8882989585076650",
        "tealium_library_name": "utag.js",
        "tealium_library_version": "4.46.0",
        "tealium_timestamp_epoch": 1652870355,
        "tealium_timestamp_utc": "2022-05-18T10:39:15.221Z",
        "tealium_timestamp_local": "2022-05-18T12:39:15.221",
        "tci.purposes_with_consent_all": [
            "Tealium iQ Tag Management",
            "Mouseflow",
            "Usercentrics Consent Management Platform"
        ],
        "tci.consent_type": "implicit",
        "tci.event_id": "16986703777223354612453473096",
        "tci.purposes_with_consent_unprocessed": [],
        "tci.purposes_with_consent_processed": [
            "Tealium iQ Tag Management",
            "Mouseflow",
            "Usercentrics Consent Management Platform"
        ]
    },
    "cfg": {
        "cb": null,
        "uids": [
            10,
            7
        ],
        "originalUids": [
            7,
            10
        ],
        "blockedTagUids": [
            10
        ]
    }
}
*/
}}catch(e){utag.DB(e)}
  if(typeof utag_cfg_ovrd!='undefined'){for(utag._i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[utag._i]=utag_cfg_ovrd[utag._i]};
  utag.loader.PINIT = function(a,b,c){
    utag.DB("Pre-INIT");
    if (utag.cfg.noload) {
      return;
    }

    try {
      // Initialize utag.data
      this.GET();
      // Even if noview flag is set, we still want to load in tags and have them ready to fire
      // blr = "before load rules"
      if(utag.handler.RE('view',utag.data,"blr")){
        utag.handler.LR(utag.data);
      }
      
    }catch(e){utag.DB(e)};
    // process 'blocking' tags (tags that need to run first)
    a=this.cfg;
    c=0;
    for (b in this.GV(a)) {
      // external .js files (currency converter tag) are blocking
      if(a[b].block == 1 || (a[b].load>0 && (typeof a[b].src!='undefined'&&a[b].src!=''))){
        a[b].block = 1;
        c=1;
        this.bq[b]=1;
      }
    }
    if(c==1) {
      for (b in this.GV(a)) {
        if(a[b].block){
          // handle case of bundled and blocking (change 4 to 1)
          // (bundled tags that do not have a .src should really never be set to block... they just run first)
          a[b].id=b; 
          if(a[b].load==4)a[b].load=1; 
 	  a[b].cb=function(){
            var d=this.uid;
            utag.loader.cfg[d].cbf=1;
            utag.loader.LOAD(d)
          };
          this.AS(a[b]);
        }
      }
    }
    if(c==0)this.INIT();
  };
  utag.loader.INIT = function(a, b, c, d, e) {
    utag.DB('utag.loader.INIT');
    if (this.ol == 1) return -1;
    else this.ol = 1;
    // The All Tags scope extensions run after blocking tags complete
    // The noview flag means to skip these Extensions (will run later for manual utag.view call)
    if(utag.cfg.noview!=true)utag.handler.RE('view',utag.data,"alr"); 

    utag.rpt.ts['i'] = new Date();
     
    d = this.cfgsort;
    // TODO: Publish engine should sort the bundled tags first..
    for (a=0;a<d.length;a++){
      e = d[a];
      b = this.cfg[e];
      b.id = e;
      if(b.block != 1){
        // do not wait if the utag.cfg.noview flag is set and the tag is bundled
        if (utag.loader.bk[b.id] || ((utag.cfg.readywait||utag.cfg.noview) && b.load==4)){
          this.f[b.id]=0;
          utag.loader.LOAD(b.id)
        }else if (b.wait == 1 && utag.loader.rf == 0) {
	  utag.DB('utag.loader.INIT: waiting ' + b.id);
          this.wq.push(b)
          this.f[b.id]=2;
        }else if (b.load>0){
	  utag.DB('utag.loader.INIT: loading ' + b.id);
	  this.lq.push(b);
          this.AS(b);
        }
      }
    }
          
    if (this.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.DB('READY:utag.loader.wq');
        utag.loader.rf=1;
        utag.loader.WQ();
      }
    });
    else if(this.lq.length>0)utag.loader.rf=1;
    else if(this.lq.length==0)utag.loader.END();

    return 1
  };
  

  if(utag.cfg.readywait || utag.cfg.waittimer){
    utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.loader.rf=1;
        utag.cfg.readywait=1;
        utag.DB('READY:utag.cfg.readywait');
        setTimeout(function(){utag.loader.PINIT()}, utag.cfg.waittimer || 1);
      }
    })
  }else{
    utag.loader.PINIT()
  }
}


//~~tv:1220.20240522
//~~tc: Update default library version
//~~tc: Improve events counter
//~~tc: Add product-level attributes and AJO parameters category

//ESLint
/*global utag*/
/*eslint no-unused-vars: ["error",{"varsIgnorePattern": "^c$"}]*/

//tealium universal tag - utag.sender.1220 ut4.0.202506091435, Copyright 2025 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {"id" : id};
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.41
    /* utag.js version 4.26 or above is required to avoid errors with this loader function */
    var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) { u.loader = function(o, a, b, c, l, m) { utag.DB(o); a = document; if (o.type == "iframe") { m = a.getElementById(o.id); if (m && m.tagName == "IFRAME") { b = m; } else { b = a.createElement("iframe"); } o.attrs = o.attrs || {}; utag.ut.merge(o.attrs, { "height": "1", "width": "1", "style": "display:none" }, 0); } else if (o.type == "img") { utag.DB("Attach img: " + o.src); b = new Image(); } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; } if (o.id) { b.id = o.id; } for (l in utag.loader.GV(o.attrs)) { b.setAttribute(l, o.attrs[l]); } b.setAttribute("src", o.src); if (typeof o.cb == "function") { if (b.addEventListener) { b.addEventListener("load", function() { o.cb(); }, false); } else { b.onreadystatechange = function() { if (this.readyState == "complete" || this.readyState == "loaded") { this.onreadystatechange = null; o.cb(); } }; } } if (o.type != "img" && !m) { l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    u.ev = {"view" : 1, "link" : 1};
    u.scriptrequested = false;
    u.set_config = false;

    var DEFAULT_LIBRARY_VERSION = '2.19.2'

    u.isEmptyVar = function (_var) {
      return typeof _var === "undefined" || _var === null || (Array.isArray(_var) && _var.length === 0);
    };

    u.deepMergeObject = function (targetObject, sourceObject) {
      targetObject = targetObject || {};
      sourceObject = sourceObject || {};
      // clone the source and target objects to avoid the mutation
      var copyTargetObject = JSON.parse(JSON.stringify(targetObject));
      var copySourceObject = JSON.parse(JSON.stringify(sourceObject));
      // Iterating through all the keys of source object
      Object.keys(copySourceObject).forEach(function (key) {
        if (typeof copySourceObject[key] === "object" && !Array.isArray(copySourceObject[key])) {
          // If property has nested object, call the function recursively
          copyTargetObject[key] = u.deepMergeObject(
            copyTargetObject[key],
            copySourceObject[key]
          );
        } else {
          // else merge the object source to target
          // utag.ut.merge(copyTargetObject[key], copySourceObject[key], 1);
          copyTargetObject[key] = copySourceObject[key];
        }
      });

      return copyTargetObject;
    }

    u.mapFunc = function (arr, obj, item) {
      var i = arr.shift();
      obj[i] = obj[i] || {};
      if (arr.length > 0) {
        u.mapFunc(arr,obj[i], item);
      } else {
        obj[i] = item;
      }
    };

    u.clearEmptyKeys = function (object) {
      for (var key in object) {
        if (object[key] === "" || object[key] === undefined) {
          delete object[key];
        }
      }
      return object;
    };

    u.toBoolean = function (val) {
      val = val || "";
      return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
    };

    u.productList = function () {
      var SKU = u.data.product.SKU;
      if (!u.data.product.SKU.length) {
        SKU = getProp(u.data, 'xdm.productListItems.SKU', [])
      }
      return SKU.map(function(skuItem, index) {
        return u.clearEmptyKeys({
          SKU: u.data.product.SKU[index],
          name: u.data.product.name[index],
          priceTotal: u.data.product.priceTotal[index],
          quantity: u.data.product.quantity[index],
          lineItemId: u.data.product.lineItemId[index]
        });
      });
    };

    u.flattenTargetValues = function (data) {
      if (data && data.__adobe && data.__adobe.target) {
        u.flattenListTargetDataKeys.forEach(function (key) {
          if (!data.__adobe.target[key]) {
            return;
          }
          var flattenObject = u.flattenObject(data.__adobe.target[key], key)
          utag.ut.merge(data.__adobe.target, flattenObject, 1);
          delete data.__adobe.target[key];
        })
      }
    }

    u.flattenObject = function (obj, prefix) {
      prefix = prefix ||  ''
      return Object.keys(obj).reduce(function (acc, k) {
        var pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object') {
          utag.ut.merge(acc, u.flattenObject(obj[k], pre + k), 1);
        }
        else acc[pre + k] = obj[k];
        return acc;
      }, {});
    }

    u.flattenListTargetDataKeys = [
      'entity',
      'user',
      'profile'
    ]

    function getProp( object, keys, defaultVal ){
      keys = Array.isArray(keys) ? keys : keys.split('.');
      object = object[keys[0]];
      if (object && keys.length > 1){
        return getProp( object, keys.slice(1), defaultVal);
      }
      return object === undefined? defaultVal : object;
    }

    var STANDARD_COMMERCE_EVENT_MATCH = /commerce\.(?:checkouts|productListAdds|productListOpens|productListRemovals|productListReopens|productListViews|productViews|purchases|saveForLaters)/;


    u.getEventData = function (event_type) {
      var event_data = {};

      if (event_type === "commerce.purchases") {
        event_data.xdm = createNest("commerce.order");
      } else {
        event_data.xdm = createNest(event_type);
      }

      if (u.data.eVars || u.data.props || u.data.contextData) {
        var analytics = {
          analytics: {
            customDimensions: {
              eVars: u.data.eVars || {},
              props: u.data.props || {}
            }
          }
        };
        utag.ut.merge(analytics.analytics, u.data.contextData, 1);
        event_data.xdm._experience = u.deepMergeObject(event_data.xdm._experience, analytics);
      }

      if (u.data.account_name) {
        event_data.xdm[u.data.account_name] = {};
        if (u.data.id_namespace) {
          event_data.xdm[u.data.account_name].id_namespace = u.data.id_namespace;
        }
        if (u.data.clientID) {
          event_data.xdm[u.data.account_name].clientID = u.data.clientID;
        }
      }

      // commerce events
      if (STANDARD_COMMERCE_EVENT_MATCH.test(event_type)) {

        if (event_type === "commerce.purchases") {
          event_data.xdm.commerce.order.purchaseID = u.data.purchaseID;
          event_data.xdm.commerce.order.currencyCode = u.data.currencyCode;
          event_data.xdm.commerce.order.priceTotal = u.data.priceTotal;
          event_data.xdm.commerce.order.payments = [];

          for (var j = 0; j < u.data.payment.paymentType.length; j++) {
            event_data.xdm.commerce.order.payments.push({
              transactionID: u.data.payment.transactionID[j],
              paymentAmount: u.data.payment.paymentAmount[j],
              paymentType: u.data.payment.paymentType[j],
              currencyCode: u.data.payment.currencyCode[j]
            });
          }
        } else {
          var event_measure = event_type.split(".")[1]; // assumes an event type format of `commerce.<event measure>`
          var ecommerceEventObject = u.data.commerce[event_measure] || {};
          event_data.xdm.commerce[event_measure] = {
            value: ecommerceEventObject.value || u.data.value || 1,
            id:ecommerceEventObject.id || u.data.id || ""
          };
        }

        event_data.xdm.productListItems = u.productList();

        if (event_data.xdm.productListItems.length > 0) {
          event_data.xdm.productListItems[0]._experience = {
            analytics: {
              customDimensions: {
                eVars: {}
              }
            }
          };

          event_data.xdm.productListItems[0].productCategories = [{
            categoryID: u.data.productListItems.productCategories.categoryID
          }];

          event_data.xdm.productListItems[0]._experience.analytics.customDimensions.eVars = u.data.productListItems._experience.analytics.customDimensions.eVars;
        }

      } else if (event_type === "web.webInteraction.linkClicks") {
          if(typeof u != "undefined" && typeof u.data != "undefined" && typeof u.data.documentUnloading != "undefined"){
        u.data.documentUnloading = true;
        }
        event_data.xdm.web.webInteraction.name = u.data.link_name;
        event_data.xdm.web.webInteraction.URL = u.data.link_URL;
        event_data.xdm.web.webInteraction.type = u.data.link_type || "other"; //standard values: download, exit, other
        event_data.xdm.web.webInteraction.linkClicks.value = u.data.value || 1;

      } else if (event_type === "web.webPageDetails.pageViews") {
        event_data.xdm.web.webPageDetails.pageViews.value = u.data.value || 1;

      }

      if (u.data.id_namespace.length > 0) {
        u.data.id_namespace.forEach(function(identity, i) {
          event_data.xdm.identityMap = event_data.xdm.identityMap || {};
          event_data.xdm.identityMap[identity] = [];
          event_data.xdm.identityMap[identity].push({
            id : u.data.id[i],
            authenticatedState : u.data.authenticatedState[i],
            primary : u.toBoolean(u.data.primary[i])
          });
        });
      }

      event_data.xdm.eventType = event_type;

      if (u.data.datasetId) {event_data.datasetId = u.data.datasetId;}
      if (u.data.mergeId) {event_data.mergeId = u.data.mergeId;}
      if (u.data.renderDecisions) {event_data.renderDecisions = u.data.renderDecisions;}

      if (u.data.defaultPersonalizationEnabled) {
        event_data.defaultPersonalizationEnabled = u.toBoolean(u.data.defaultPersonalizationEnabled);
      }

      if (u.data.personalization.sendDisplayEvent) {
        event_data.personalization = event_data.personalization || {};
        event_data.personalization.sendDisplayEvent = u.toBoolean(u.data.personalization.sendDisplayEvent);
      }

      if (u.data.personalization.includeRenderedPropositions) {
        event_data.personalization = event_data.personalization || {};
        event_data.personalization.includeRenderedPropositions = u.toBoolean(u.data.personalization.includeRenderedPropositions);
      }

      if (u.data.personalization.surfaces) {
        event_data.personalization = event_data.personalization || {};
        event_data.personalization.surfaces = u.data.personalization.surfaces;
      }


      if (isTrue(u.data.renderDecisions) && event_type == "web.webPageDetails.pageViews") {
        event_data.renderDecisions = true;
      }
      if (u.data.decisionScopes.length > 0) {
        event_data.decisionScopes = u.data.decisionScopes
      }

      if (u.toBoolean(u.data.documentUnloading)) {
        event_data.documentUnloading = u.toBoolean(u.data.documentUnloading);
      }

      // If there's data in the custom_data object, map to event's data property:
      if (!utag.ut.isEmptyObject(u.data.custom_data)) {
        event_data.data = u.data.custom_data;
      }

      event_data.xdm = u.deepMergeObject(event_data.xdm, u.data.xdm)
      event_data.data = u.deepMergeObject(event_data.data || {}, u.data.data)

      // event specific
      var eventSpecificObject = getProp(u.data, event_type, {})
      event_data = u.deepMergeObject(event_data, eventSpecificObject, 1)

      u.flattenTargetValues(event_data.data);

      return event_data;
    }

    u.sendButchAnalyticsQueue = function (instance) {
      var command = u.data.command || "sendEvent";
      var resultEventData = {};

      if (!u.data.analytics_queue.length) {
        return;
      }

      u.data.analytics_queue.forEach(function(event_type) {
        var eventData = u.getEventData(event_type);
        resultEventData = u.deepMergeObject(resultEventData, eventData)
      })

      resultEventData.xdm.eventType = 'web.webPageDetails.pageViews';

      u.trackEvent(instance, command, resultEventData);

    }

    u.trackEvent = function (instance, command, event_data) {
      window[instance](command, event_data)
        .then(u.data.commandCallback)
        .catch(function(error) {
          utag.DB(error);
        });
    }


      u.map={"eVarsObj":"xdm._experience.analytics.customDimensions.eVars","propsObj":"xdm._experience.analytics.customDimensions.props","eventobj1to100":"xdm._experience.analytics.event1to100","eventobj101to200":"xdm._experience.analytics.event101to200","eventobj201to300":"xdm._experience.analytics.event201to300","listsobj":"xdm._experience.analytics.customDimensions.lists","qp.WT.ac":"xdm._experience.analytics.customDimensions.eVars.eVar2","qp.ICID":"xdm._experience.analytics.customDimensions.eVars.eVar2","qp.icid":"xdm._experience.analytics.customDimensions.eVars.eVar2","search_results":"xdm._experience.analytics.customDimensions.eVars.eVar7","plan_name":"xdm._experience.analytics.customDimensions.props.prop18,xdm._experience.analytics.customDimensions.eVars.eVar28","breadcrumb":"xdm._experience.analytics.customDimensions.props.prop19","fulfillment_method":"xdm._experience.analytics.customDimensions.props.prop29,xdm._experience.analytics.customDimensions.eVars.eVar15","user_type":"xdm._experience.analytics.customDimensions.eVars.eVar32","cart_type":"xdm._experience.analytics.customDimensions.eVars.eVar85","benefit":"xdm._experience.analytics.customDimensions.eVars.eVar86","field_errors":"data.__adobe.analytics.list1","link_name":"xdm.web.webInteraction.name","refinement":"xdm._experience.analytics.customDimensions.eVars.eVar55","cart_count":"xdm._experience.analytics.customDimensions.props.prop25","order_id":"xdm._experience.analytics.customDimensions.eVars.eVar95","finding_method":"xdm._experience.analytics.customDimensions.eVars.eVar66","linkName":"xdm.web.webInteraction.name","flow_name":"xdm._experience.analytics.customDimensions.eVars.eVar78","login_attempts":"xdm._experience.analytics.customDimensions.eVars.eVar34","delivery_price":"xdm._experience.analytics.customDimensions.eVars.eVar107","cart_elig":"xdm._experience.analytics.customDimensions.eVars.eVar104","enroll_type":"xdm._experience.analytics.customDimensions.eVars.eVar3","pay_method":"xdm._experience.analytics.customDimensions.eVars.eVar27","order_type":"xdm._experience.analytics.customDimensions.eVars.eVar14","order_status":"xdm._experience.analytics.customDimensions.eVars.eVar17","page_flag":"xdm._experience.analytics.customDimensions.props.prop15","state_authentication":"xdm._experience.analytics.customDimensions.eVars.eVar31","savedCreditCards":"xdm._experience.analytics.customDimensions.props.prop15","pageErrors":"data.__adobe.analytics.list1","scenario":"xdm._experience.analytics.customDimensions.props.prop13","state_extracare_link":"xdm._experience.analytics.customDimensions.eVars.eVar59","coupon":"xdm._experience.analytics.customDimensions.eVars.eVar61","paymentOption":"xdm._experience.analytics.customDimensions.props.prop21","couponCount":"xdm._experience.analytics.customDimensions.props.prop27","free_shipping":"xdm._experience.analytics.customDimensions.eVars.eVar68","ecCard":"xdm._experience.analytics.customDimensions.eVars.eVar80","search_type":"xdm._experience.analytics.customDimensions.eVars.eVar67","product_rating":"xdm._experience.analytics.customDimensions.eVars.eVar73","store_id":"xdm._experience.analytics.customDimensions.eVars.eVar89","total_results":"xdm._experience.analytics.customDimensions.eVars.eVar7","list1":"data.__adobe.analytics.list1","carepass_status":"xdm._experience.analytics.customDimensions.eVars.eVar58","fs_component":"xdm._experience.analytics.customDimensions.eVars.eVar170","fs_pagetype":"xdm._experience.analytics.customDimensions.eVars.eVar165","fs_department":"xdm._experience.analytics.customDimensions.eVars.eVar166","fs_category":"xdm._experience.analytics.customDimensions.eVars.eVar167","fs_subcategory":"xdm._experience.analytics.customDimensions.eVars.eVar168","fs_subsubcategory":"xdm._experience.analytics.customDimensions.eVars.eVar169","bopis_store_eligible":"xdm._experience.analytics.customDimensions.eVars.eVar175","bopis_substitution_count":"xdm._experience.analytics.event101to200.event176.value","form_name":"xdm._experience.analytics.customDimensions.eVars.eVar10","loginmethod":"xdm._experience.analytics.customDimensions.eVars.eVar33","entry_method":"xdm._experience.analytics.customDimensions.eVars.eVar46","page_type":"xdm.web.webPageDetails.errorPage","banner_name":"xdm._experience.analytics.customDimensions.eVars.eVar197,xdm._experience.analytics.customDimensions.props.prop73","component_name":"xdm._experience.analytics.customDimensions.eVars.eVar198,xdm._experience.analytics.customDimensions.props.prop53","cart_id":"xdm._experience.analytics.customDimensions.eVars.eVar179","sf":"xdm._experience.analytics.customDimensions.eVars.eVar181","icid":"xdm._experience.analytics.customDimensions.eVars.eVar2","enableSplitFulfillment":"xdm._experience.analytics.customDimensions.eVars.eVar185","search_position_count":"xdm._experience.analytics.customDimensions.eVars.eVar180","cp.easy_xfer":"xdm._experience.analytics.customDimensions.eVars.eVar187","medallia_formID_formType":"xdm._experience.analytics.customDimensions.eVars.eVar200","medallia_feedback_UUID":"xdm._experience.analytics.customDimensions.eVars.eVar199","badge_name":"xdm._experience.analytics.customDimensions.props.prop65","cp.s2cincart":"xdm._experience.analytics.customDimensions.eVars.eVar188","coupon_type":"xdm._experience.analytics.customDimensions.eVars.eVar189","coupon_subtype":"xdm._experience.analytics.customDimensions.eVars.eVar177","vaccineName":"xdm._experience.analytics.customDimensions.eVars.eVar182","global_cookie":"xdm._experience.analytics.customDimensions.eVars.eVar142","providerID":"xdm._experience.analytics.customDimensions.eVars.eVar183","question_answer":"xdm._experience.analytics.customDimensions.props.prop22","self_service_type":"xdm._experience.analytics.customDimensions.eVars.eVar37","productPosition":"xdm._experience.analytics.customDimensions.eVars.eVar92","productPageNum":"xdm._experience.analytics.customDimensions.eVars.eVar93","scroll_depth":"xdm._experience.analytics.customDimensions.props.prop4","linkExtraInfo":"xdm._experience.analytics.customDimensions.props.prop14","program_value":"xdm._experience.analytics.customDimensions.eVars.eVar103","testName":"xdm._experience.analytics.customDimensions.eVars.eVar126","cp.aat3":"xdm._experience.analytics.customDimensions.eVars.eVar143","pageSubType":"xdm._experience.analytics.customDimensions.eVars.eVar165","pageHierarchy":"xdm._experience.analytics.customDimensions.eVars.eVar166","videoTitle":"xdm._experience.analytics.customDimensions.eVars.eVar70","qp.intref":"xdm._experience.analytics.customDimensions.eVars.eVar16","qp.micid":"xdm._experience.analytics.customDimensions.eVars.eVar117","page_url":"xdm._experience.analytics.customDimensions.eVars.eVar49,xdm._experience.analytics.customDimensions.props.prop23","sl_cookie":"xdm._experience.analytics.customDimensions.props.prop46","storeState":"xdm._experience.analytics.customDimensions.eVars.eVar130","bot_value":"xdm._experience.analytics.customDimensions.eVars.eVar164","store_eligible":"xdm._experience.analytics.customDimensions.eVars.eVar175","qm_session_id_cookie":"xdm._experience.analytics.customDimensions.eVars.eVar22","global_component":"xdm._experience.analytics.customDimensions.props.prop26","feature_experience":"data.__adobe.analytics.list2","overlayName":"xdm._experience.analytics.customDimensions.eVars.eVar13","cp.sp_bucket":"xdm._experience.analytics.customDimensions.eVars.eVar195","lifestyleShelf":"xdm._experience.analytics.customDimensions.props.prop6","pageVersionDisplayed":"xdm._experience.analytics.customDimensions.eVars.eVar29","otchs_test":"xdm._experience.analytics.customDimensions.props.prop17","authentication_method":"xdm._experience.analytics.customDimensions.eVars.eVar25","platform":"xdm._experience.analytics.customDimensions.eVars.eVar41","ut.event:link":"web.webInteraction.linkClicks","tool_type":"xdm._experience.analytics.customDimensions.eVars.eVar1","search_term":"xdm._experience.analytics.customDimensions.eVars.eVar6,xdm._experience.analytics.customDimensions.props.prop2","prodObj":"xdm.productListItems","_sm_495_111":"onBeforeEventSend","_sm_495_112":"prehidingStyle","campaignObj":"xdm.marketing.trackingCode","fs_tech_modern":"xdm._experience.analytics.customDimensions.eVars.eVar151","products":"productstring","events":"events","webSDKPageName":"xdm.web.webPageDetails.name","page_name":"pageName","cp.st":"xdm._experience.analytics.customDimensions.props.prop71","identityMap_id":"id","state":"authenticatedState","primaryID":"primary","id_namespace":"id_namespace","consentsState":"xdm._experience.analytics.customDimensions.eVars.eVar77","cartAdds":"xdm.commerce.productListAdds.value","cartRemoves":"xdm.commerce.productListRemovals.value","cartOpens":"xdm.commerce.productListOpens.value","cartViews":"xdm.commerce.productListViews.value","checkouts":"xdm.commerce.checkouts.value","productViews":"xdm.commerce.productViews.value","purchaseID":"xdm.commerce.order.purchaseID","purchases":"xdm.commerce.purchases.value","typeaheadSearchValues":"xdm._experience.analytics.customDimensions.eVars.eVar87","searchResponseID":"xdm._experience.analytics.customDimensions.props.prop17","onsiteSearchFeatures":"xdm._experience.analytics.customDimensions.eVars.eVar26","eventobj301to400":"xdm._experience.analytics.event301to400","cvs_profile_id":"xdm._experience.analytics.customDimensions.eVars.eVar99","searchClassification":"xdm._experience.analytics.customDimensions.props.prop74","extracare_offer":"xdm._experience.analytics.customDimensions.eVars.eVar60","otcCard":"xdm._experience.analytics.customDimensions.eVars.eVar140","fsZonePricingStoreId":"xdm._experience.analytics.customDimensions.eVars.eVar97","levelofAuthentication":"xdm._experience.analytics.customDimensions.eVars.eVar122","userSearchTerm":"xdm._experience.analytics.customDimensions.eVars.eVar19","search_term_autocorrected":"xdm._experience.analytics.customDimensions.eVars.eVar19"};
  u.extend=[function(a,b){
try{b['_sm_495_111']=window.adobeWebSdkBeforeEventSend;}catch(e){utag.DB(e);}
try{b['_sm_495_112']="";}catch(e){utag.DB(e);}
},
function(a,b){ try{ if((b['dom.url'].toString().indexOf('/benefits')<0&&b['dom.url'].toString().indexOf('/otchs')<0&&b['dom.url'].toString().indexOf('/realms')<0)){
if (typeof b != "undefined" && typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'view')
{
alloy("sendEvent", {
    xdm: {
        eventType: 'MetaConversion_PageView', // MetaConversion_Purchase
                _cvs: {
            Meta: {
                metaActionSource: 'website',
                metaEventID: b['tealium_random'],
                metaFBP: b['cp._fbp'],
                metaFBC: b['cp._fbc'],
                metaOptOutCCPA: b['cp.CCPA_OPT_OUT_USR'],
                metaOptOutGPC: b['gpc'],
                metaTimeStamp: b['tealium_timestamp_epoch']

                    },
            web: {
                URL: b['dom.url'],
                URLNoQps: b['dom.domain'] + b['dom.pathname'],
                name: b['page_name'],
                siteSection: b['pageHierarchy'],
                oneTrustCategoryId: window.OnetrustActiveGroups,
                oneTrustOptanonConsent: b['cp.OptanonConsent'],
                profile: 'fs'
                  }
                    
                }
    },
    edgeConfigOverrides: {
        datastreamId: "367bc694-a0a5-4750-808c-a93acbac13bb" // Can use another extension
    },
});
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((b['dom.url'].toString().indexOf('/benefits')<0&&b['dom.url'].toString().indexOf('/otchs')<0&&b['dom.url'].toString().indexOf('/realms')<0)){
if (typeof b != "undefined" && typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'view')
{
alloy("sendEvent", {
    xdm: {
        eventType: 'PINTEREST_SHOP',
                _cvs: {
            Meta: {
                metaActionSource: 'website',
                metaEventID: b['tci.event_id'],
                metaOptOutCCPA: b['cp.CCPA_OPT_OUT_USR'],
                metaOptOutGPC: b['gpc'],
                metaTimeStamp: b['tealium_timestamp_epoch']

                    },
            web: {
                deviceType: b['device_type'],
                URL: b['dom.url'],
                URLNoQps: b['dom.domain'] + b['dom.pathname'],
                name: b['page_name'],
                siteSection: b['pageHierarchy'],
                oneTrustCategoryId: window.OnetrustActiveGroups,
                oneTrustOptanonConsent: b['cp.OptanonConsent'],
                profile: 'fs'
                  }
                    
                }
    },
    edgeConfigOverrides: {
        datastreamId: "367bc694-a0a5-4750-808c-a93acbac13bb" 
    },
});
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((b['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/receipt'.toLowerCase())>-1&&b['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)||(b['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/checkout'.toLowerCase())>-1&&b['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)||(b['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/cart'.toLowerCase())>-1&&b['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)){
alloy("sendEvent", {
    xdm: {
        eventType: 'MetaConversion_Purchase', // MetaConversion_Purchase
                _cvs: {
            Meta: {
                metaActionSource: 'website',
                metaEventID: b['order_id'],
                metaFBP: b['cp._fbp'],
                metaFBC: b['cp._fbc'],
                metaOptOutCCPA: b['cp.CCPA_OPT_OUT_USR'],
                metaOptOutGPC: b['gpc'],
                metaTimeStamp: b['tealium_timestamp_epoch'],
                metaCurrencyCode: b['ss.qm_CurrencyCode'],
                metaPurchaseValue: b['order_total_bloomreach']
                                    },
            web: {
                URL: b['dom.url'],
                URLNoQps: b['dom.domain'] + b['dom.pathname'],
                name: b['page_name'],
                siteSection: b['pageHierarchy'],
                oneTrustCategoryId: window.OnetrustActiveGroups,
                oneTrustOptanonConsent: b['cp.OptanonConsent'],
                profile: 'fs'
                }
        },
                
    },
    edgeConfigOverrides: {
        datastreamId: "367bc694-a0a5-4750-808c-a93acbac13bb" // Can use another extension
    },
});
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((b['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/receipt'.toLowerCase())>-1&&b['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)||(b['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/checkout'.toLowerCase())>-1&&b['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)||(b['dom.pathname'].toString().toLowerCase().indexOf('/rx/dotm/cart'.toLowerCase())>-1&&b['dom.query_string'].toString().toLowerCase().indexOf('flowType=FS'.toLowerCase())>-1)){
alloy("sendEvent", {
    xdm: {
        eventType: 'PINTEREST_PURCHASE', 
                _cvs: {
            Meta: {
                metaActionSource: 'website',
                metaEventID: b['tci.event_id'],
                metaOrderID: b['order_id'],
                metaOptOutCCPA: b['cp.CCPA_OPT_OUT_USR'],
                metaOptOutGPC: b['gpc'],
                metaTimeStamp: b['tealium_timestamp_epoch'],
                metaCurrencyCode: b['ss.qm_CurrencyCode'],
                metaPurchaseValue: b['order_total_bloomreach']
                                    },
            web: {
                URL: b['dom.url'],
                URLNoQps: b['dom.domain'] + b['dom.pathname'],
                name: b['page_name'],
                siteSection: b['pageHierarchy'],
                oneTrustCategoryId: window.OnetrustActiveGroups,
                oneTrustOptanonConsent: b['cp.OptanonConsent'],
                profile: 'fs'
                }
        },
                
    },
    edgeConfigOverrides: {
        datastreamId: "367bc694-a0a5-4750-808c-a93acbac13bb" 
    },
});
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('otchs')>-1||b['dom.pathname'].toString().indexOf('benefits')>-1||b['dom.pathname'].toString().indexOf('realms')>-1){b['plan_name_otchs']=b['plan_name']} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
b.gnav = "hdnew="+getCookie("hdnew")+"|hddf="+getCookie("hddf");
b.gb = "gb="+getCookie("gb");
b.fsattach = "fsattach="+getCookie("fsattach");
b.global_cookie = "tphrm="+getCookie("tphrm")+ "|ga="+getCookie("ga")+"|pdpr="+getCookie("pdpr")+"|hdau="+getCookie("hdau")+"|rxp="+getCookie("rxp")+"|ghon="+getCookie("ghon")+"|mcpr="+getCookie("mcpr")+"|plpui="+getCookie("plpui")+"|slfinc="+getCookie("slfinc")+"|uh="+getCookie("uh")+"|hp_uh="+getCookie("hp_uh")+"|canary="+getCookie("canary")+"|ebe="+getCookie("ebe")+"|rbh1="+getCookie("rbh1")+"|rbh2="+getCookie("rbh2");
b.sl_cookie = "sl_v2="+getCookie("sl_v2")+"|slsdp="+getCookie("slsdp");
b.cj_cookie = getCookie("cj_ev")
b.qm_session_id_cookie = getCookie("QuantumMetricSessionID")
b.gr = getCookie("gr");
//b.globalHeaderEnabled = getCookie("globalHeaderEnabled")
//b.shelfInCart = getCookie("shelfInCart")
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
try {
if (typeof b.page_name !== "undefined" && b.page_name === "rxd: order confirmation")
{
	b.order_type = b.cart_type;
}
   
} catch (e) {}  
} } catch(e){ utag.DB(e) }  }];



    u.send = function (utag_event, data_layer) {
      if (u.ev[utag_event] || u.ev.all !== undefined) {
        utag.DB("send:495");
        utag.DB(data_layer);

        var a, b, c, d, e, f, h, config;

        a = utag_event;
        b = data_layer;

        u.data = {
          base_url: "https://cdn1.adoberesources.net/alloy/##utag_replace_library_version##/alloy.min.js",
          library_version: "2.19.2",
          auto_purchase_tracking: 'false',
          auto_page_tracking: 'true',
          commandCallback: function(){},
          //Configuration
          instanceName: "alloy" || "alloy",
          edgeConfigId: "2612b8ac-d4b2-4d6d-8d99-878e3f9e5846",
          orgId: "06660D1556E030D17F000101@AdobeOrg",
          context: undefined,
          debugEnabled: "false",
          edgeDomain: "edge.adobedc.net" || 'edge.adobedc.net',
          errorsEnabled: true,
          clickCollectionEnabled: true,
          downloadLinkQualifier: "\\.(exe|zip|wav|mp3|mov|mpg|avi|wmv|pdf|doc|docx|xls|xlsx|ppt|pptx)$",
          onBeforeEventSend: function(){},
          defaultConsent: "in",
          prehidingStyle: undefined,
          cookieDestinationsEnabled: true,
          urlDestinationsEnabled: true,
          idMigrationEnabled: true,
          thirdPartyCookiesEnabled: true,
          // Adobe Target
          renderDecisions: false,
          decisionScopes: [],
          // E-Commerce Var
          purchaseID: "",
          priceTotal: "",
          currencyCode: "",
          productListItems: {
            _experience: {
              analytics: {
                customDimensions: {
                  eVars: {}
                }
              }
            },
            productCategories: {
              categoryID: []
            },
          },
          product: {
            name: [],
            SKU: [],
            quantity: [],
            priceTotal: [],
            lineItemId: []
          },
          payment: {
            transactionID: [],
            paymentAmount: [],
            paymentType: [],
            currencyCode: []
          },
          // identityMap
          id_namespace: [],
          id: [],
          value: '',
          authenticatedState: [],
          primary: [],
          // link tracking
          link_name: "",
          link_type: "",
          link_URL: "",
          link_value: "",
          //Events and custom data
          command:"",
          datasetId: "",
          event_queue: [],
          analytics_queue: [],
          event_type: "",
          mergeId: "",
          custom_data: {},
          commerce: {},
          // xdm
          account_name: '',
          pageName: '',
          clientID: '',
          xdm: {},
          data: {},
          edgeBasePath: 'ee',
          documentUnloading: false,
          edgeConfigOverrides: {},
          defaultPersonalizationEnabled: '',
          personalization: {
            sendDisplayEvent: '',
            includeRenderedPropositions: '',
            surfaces: '',
          },
          // consent
          consent: {
            standard: ['Adobe'],
            version: ['2.0'],
            value: {
              collect: {
                val: ['y']
              },
              metadata: {
                time: [(new Date()).toISOString()]
              }
            }
          }
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};
        utag.DB("send:495:EXTENSIONS");
        utag.DB(data_layer);
        // End tag-scoped extensions

        c = [];

        // Start Mapping
        Object.keys(utag.loader.GV(u.map)).forEach(function(mapping_key) {
          if (data_layer[mapping_key] !== undefined && data_layer[mapping_key] !== '') {
            var destinations = u.map[mapping_key].split(',');
            destinations.forEach( function(parameter) {
              if (u.data.hasOwnProperty(parameter) || parameter.indexOf('.') > -1) {
                u.mapFunc(parameter.split('.'), u.data, data_layer[mapping_key]);
              } else {
                u.mapFunc(parameter.split('.'), u.data.custom_data, data_layer[mapping_key]);
              }
            });
          } else {
            var event_destinations = mapping_key.split(":");
            var isExperienceAnalytics = u.map[mapping_key] && u.map[mapping_key].indexOf("experience.analytics") !== -1;

            if (
              (event_destinations.length === 2 && String(data_layer[event_destinations[0]]) === String(event_destinations[1])) ||
              (isExperienceAnalytics && event_destinations[1] === "*" && !u.isEmptyVar(data_layer[event_destinations[0]]))
            ) {
              if (u.map[mapping_key]) {
                u.map[mapping_key].split(",").forEach(function (event) {
                  if (event.indexOf("experience.analytics") !== -1) {
                    u.data.analytics_queue.push(event);
                  } else {
                    u.data.event_queue.push(event);
                  }
                });
              }
            }
          }
        });

        utag.DB("send:495:MAPPINGS");
        utag.DB(u.data);
        // End Mapping
        if(u.data.library_version === ''){
          u.data.library_version = DEFAULT_LIBRARY_VERSION;
        }


        u.data.base_url = u.data.base_url.replace("##utag_replace_library_version##", u.data.library_version);

        //Turn comma seperated config values into arrays
        var delim = /\s*,\s*/;
        if(typeof u.data.instanceName === "string"){
          u.data.instanceName = u.data.instanceName.split(delim);
        }
         if (document.location.pathname.indexOf('/otchs') > -1 || document.location.pathname.indexOf('/benefits')  > -1 || document.location.pathname.indexOf('/realms')  > -1 ) {
	         u.data.edgeConfigId = "1ec57b17-b045-4146-8987-7f34c46c3a9d";
       } 
         else {
            	u.data.edgeConfigId = "2612b8ac-d4b2-4d6d-8d99-878e3f9e5846";
              }
        if(typeof u.data.edgeConfigId === "string"){
          u.data.edgeConfigId = u.data.edgeConfigId.split(delim);
        }
        if(typeof u.data.orgId === "string"){
          u.data.orgId = u.data.orgId.split(delim);
        }

        // Pull E-Commerce extension values
        // Mappings override E-Commerce extension values
        u.data.purchaseID = u.data.purchaseID || data_layer._corder || "";
        u.data.priceTotal = u.data.priceTotal || data_layer._ctotal || "";
        u.data.currencyCode = u.data.currencyCode || data_layer._ccurrency || "";

        u.data.product.name = u.data.product.name.length ?
          u.data.product.name : getProp(u.data, 'xdm.productListItems.name', []);
        u.data.product.SKU = u.data.product.SKU.length ?
          u.data.product.SKU : getProp(u.data, 'xdm.productListItems.SKU', []);
        u.data.product.quantity = u.data.product.quantity.length ?
          u.data.product.quantity : getProp(u.data, 'xdm.productListItems.quantity', []);
        u.data.product.priceTotal = u.data.product.priceTotal.length ?
          u.data.product.priceTotal : getProp(u.data, 'xdm.productListItems.priceTotal', []);
        u.data.product.lineItemId = u.data.product.lineItemId.length ?
          u.data.product.lineItemId : getProp(u.data, 'xdm.productListItems.lineItemId', []);

        if (u.data.product.name.length === 0 && data_layer._cprodname !== undefined) {
          u.data.product.name = data_layer._cprodname.slice(0) ;
        }
        if (u.data.product.SKU.length === 0 && data_layer._csku !== undefined) {
          u.data.product.SKU = data_layer._csku.slice(0);
        }
        if (u.data.product.quantity.length === 0 && data_layer._cquan !== undefined) {
          u.data.product.quantity = data_layer._cquan.slice(0);
        }
        if (u.data.product.priceTotal.length === 0 && data_layer._cprice !== undefined) {
          u.data.product.priceTotal = data_layer._cprice.slice(0);
        }
        if (u.data.product.lineItemId.length === 0 && data_layer._ccat !== undefined) {
          u.data.product.lineItemId = data_layer._ccat.slice(0);
        }

        u.data.cookieDestinationsEnabled = u.toBoolean(u.data.cookieDestinationsEnabled)
        u.data.urlDestinationsEnabled = u.toBoolean(u.data.urlDestinationsEnabled)

        // Report required config is missing, and stop tag from firing.
        if ((u.data.edgeConfigId.length < 1 || u.data.edgeConfigId[0] === "") || (u.data.orgId.length < 1 || u.data.orgId[0] === "")  || (u.data.instanceName.length < 1 || u.data.instanceName[0] === "")) {
          utag.DB(u.id + ": Tag not fired: Required attribute Config ID or Org ID not populated");
          return;
        }

        // automatic page view tracking
        if (u.toBoolean(u.data.auto_page_tracking) && a === "view") {
          u.data.event_queue.push("web.webPageDetails.pageViews");
        }

        // automatic purchase tracking
        if (u.toBoolean(u.data.auto_purchase_tracking) && u.data.purchaseID && u.data.event_queue.indexOf("commerce.purchases") === -1) {
          u.data.event_queue.push("commerce.purchases");
        }

        // convert strings to arrays for identityMap
        if (typeof u.data.id_namespace === "string") {
          u.data.id_namespace = u.data.id_namespace.split(",");
          u.data.id = u.data.id.split(",");
          u.data.authenticatedState = u.data.authenticatedState.split(",");
          u.data.primary = u.data.primary.split(",");
        }


        //Experience Platform Base Code
        (function(n,o){
          o.forEach(function(o){
            n[o]||
            ((n.__alloyNS=n.__alloyNS||[]).push(o),
              n[o]=function(){
              var u=arguments;
              return new Promise(function(i,l){
                n[o].q.push([i,l,u])
              })}
              ,n[o].q=[]
            )
          })
        }
        )(window,u.data.instanceName);

        //Loop through the different instance names which are used to call Adobe Alloy
        for (var i = 0; i < u.data.instanceName.length; i++) {
          var instance = u.data.instanceName[i];

          if (!u.data.edgeConfigId[i] && !u.data.orgId[i]) {
            utag.DB(u.id + ": Adobe Alloy: You are missing a matching Config ID or Org ID for this Instance Name. All subsequent tracking has been aborted.");
            break;
          }

          if (!u.set_config) {
            u.set_config = true;

            config = {
              orgId: u.data.orgId[i],
              edgeConfigId: u.data.edgeConfigId[i],
              debugEnabled: u.toBoolean(u.data.debugEnabled),
              clickCollectionEnabled: u.toBoolean(u.data.clickCollectionEnabled),
              downloadLinkQualifier: u.data.downloadLinkQualifier,
              context: u.data.context,
              defaultConsent: u.data.defaultConsent,
              edgeDomain: u.data.edgeDomain,
              errorsEnabled: u.data.errorsEnable,
              idMigrationEnabled: u.toBoolean(u.data.idMigrationEnabled),
              onBeforeEventSend: u.data.onBeforeEventSend,
              prehidingStyle: u.data.prehidingStyle,
              thirdPartyCookiesEnabled: u.toBoolean(u.data.thirdPartyCookiesEnabled),
              edgeBasePath: u.data.edgeBasePath
            };

            if (u.data.library_version >= '2.18.0') {
              config.datastreamId = u.data.edgeConfigId[i];
              delete config.edgeConfigId;
            }


            if (!utag.ut.isEmptyObject(u.data.edgeConfigOverrides)) {
              var reportSuites = getProp(u.data.edgeConfigOverrides, "com_adobe_analytics.reportSuites");
              if (!Array.isArray(reportSuites) && !!reportSuites) {
                u.data.edgeConfigOverrides.com_adobe_analytics.reportSuites = reportSuites
                  .split(',')
                  .map(function (item) {
                    return item.trim()
                  });
              }
              config.edgeConfigOverrides = u.data.edgeConfigOverrides;
            }

            if (!u.data.cookieDestinationsEnabled) {
              config.cookieDestinationsEnabled = u.toBoolean(u.data.cookieDestinationsEnabled);
            }
            if (!u.data.urlDestinationsEnabled) {
              config.urlDestinationsEnabled = u.toBoolean(u.data.urlDestinationsEnabled);
            }

            if (u.data.event_queue.indexOf('setConsent') !== -1) {
              config.defaultConsent = 'pending';
            }

            window[instance]("configure", u.clearEmptyKeys(config));
          }

          u.sendButchAnalyticsQueue(instance)

          u.data.event_queue.forEach(function(event_type) {
            var event_data = {},
                command = u.data.command || "sendEvent";

            if (event_type === 'setConsent') {
              // event specific
              var eventSpecificObject = getProp(u.data, event_type, {})
              var consentData = u.deepMergeObject(u.data.consent, eventSpecificObject.consent, 1)
              var consentResult = {
                consent: consentData.standard.map(function(standardValue, index) {
                  return {
                    standard: standardValue,
                    version: consentData.version[index],
                    value: {
                      collect: {
                        val: consentData.value.collect.val[index]
                      },
                      metadata: {
                        time: consentData.value.metadata.time[index]
                      }
                    }
                  }
                })
              }

              window[instance]('setConsent', consentResult)
                .catch(function(error) {
                  utag.DB(error);
                });
              return;
            }
            
            if (typeof u.data.event_queue != "undefined" && typeof u.data.event_queue == "object") {
    if (u.data.event_queue[0] == "web.webInteraction.linkClicks") {
        if (typeof u.data.xdm == "object" && u.data.xdm.hasOwnProperty('web')) {
            if (u.data.xdm.web.hasOwnProperty('webInteraction')) {
                if (u.data.xdm.web.webInteraction.name.indexOf("criteo") > -1 || u.data.xdm.web.webInteraction.name.indexOf("gam") > -1) {
                    return false;
                }
            }
        }

    }

}

            event_data = u.getEventData(event_type);

            u.trackEvent(instance, command, event_data);
          });
        }

        if (!u.scriptrequested) {
          u.scriptrequested = true;
          u.loader({
            "type" : "script",
            "src" : u.data.base_url,
            "cb" : null,
            "loc" : "script",
            "id" : "utag_495",
            "attrs" : {}
          });
        }

        utag.DB("send:495:COMPLETE");
      }
    };

    // returns an object in which each subsequent property is a nested object
    function createNest(input) {
      var nest = {},
        context = nest,
        chunks = input.split("."),
        lastChunkInt = parseInt(chunks[chunks.length - 1], 10),
        value = !Number.isNaN(lastChunkInt) ? lastChunkInt : 1;

      if (!Number.isNaN(lastChunkInt)) {
        chunks.pop();
      }

      for (var i = 0; i < chunks.length; i++) {
        context[chunks[i]] = {};
        context = context[chunks[i]];
      }

      context.value = value;
      return nest;
    }

    function isTrue (input) {
      if (typeof input === "boolean") {
        return input;
      } else if (typeof input === "string" && input.toLowerCase() === "true") {
        return true;
      } else {
        return false;
      }
    }

    utag.o[loader].loader.LOAD(id);
  }("495", "cvs.fs"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

//~~tv:1191.aid540.20220808
//~~tc: Added version 5.4.0



  /**
   * @license
   * Adobe Visitor API for JavaScript version: 5.4.0
   * Copyright 2022 Adobe, Inc. All Rights Reserved
   * More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
  */
  var e=function(){"use strict";function e(t){"@babel/helpers - typeof";return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(){return{callbacks:{},add:function(e,t){this.callbacks[e]=this.callbacks[e]||[];var n=this.callbacks[e].push(t)-1,i=this;return function(){i.callbacks[e].splice(n,1)}},execute:function(e,t){if(this.callbacks[e]){t=void 0===t?[]:t,t=t instanceof Array?t:[t];try{for(;this.callbacks[e].length;){var n=this.callbacks[e].shift();"function"==typeof n?n.apply(null,t):n instanceof Array&&n[1].apply(n[0],t)}delete this.callbacks[e]}catch(e){}}},executeAll:function(e,t){(t||e&&!U.isObjectEmpty(e))&&Object.keys(this.callbacks).forEach(function(t){var n=void 0!==e[t]?e[t]:"";this.execute(t,n)},this)},hasCallbacks:function(){return Boolean(Object.keys(this.callbacks).length)}}}function i(e,t,n){var i=null==e?void 0:e[t];return void 0===i?n:i}function r(e){for(var t=/^\d+$/,n=0,i=e.length;n<i;n++)if(!t.test(e[n]))return!1;return!0}function a(e,t){for(;e.length<t.length;)e.push("0");for(;t.length<e.length;)t.push("0")}function o(e,t){for(var n=0;n<e.length;n++){var i=parseInt(e[n],10),r=parseInt(t[n],10);if(i>r)return 1;if(r>i)return-1}return 0}function s(e,t){if(e===t)return 0;var n=e.toString().split("."),i=t.toString().split(".");return r(n.concat(i))?(a(n,i),o(n,i)):NaN}function c(e){return e===Object(e)&&0===Object.keys(e).length}function u(e){return"function"==typeof e||e instanceof Array&&e.length}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return!0};this.log=Ie("log",e,t),this.warn=Ie("warn",e,t),this.error=Ie("error",e,t)}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.cookieName,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.cookies;if(!t||!i)return{get:xe,set:xe,remove:xe};var r={remove:function(){i.remove(t)},get:function(){var e=i.get(t),n={};try{n=JSON.parse(e)}catch(e){n={}}return n},set:function(e,n){n=n||{};var a=r.get(),o=Object.assign(a,e);i.set(t,JSON.stringify(o),{domain:n.optInCookieDomain||"",cookieLifetime:n.optInStorageExpiry||3419e4,expires:!0})}};return r}function f(e){this.name=this.constructor.name,this.message=e,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error(e).stack}function p(){function e(e,t){var n=Ae(e);return n.length?n.every(function(e){return!!t[e]}):Oe(t)}function t(){M(A),O(de.COMPLETE),_(h.status,h.permissions),s&&m.set(h.permissions,{optInCookieDomain:c,optInStorageExpiry:u}),C.execute(He)}function n(e){return function(n,i){if(!Me(n))throw new Error("[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.");return O(de.CHANGED),Object.assign(A,ke(Ae(n),e)),i||t(),h}}var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=i.doesOptInApply,a=i.previousPermissions,o=i.preOptInApprovals,s=i.isOptInStorageEnabled,c=i.optInCookieDomain,u=i.optInStorageExpiry,l=i.isIabContext,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},p=f.cookies,g=Ne(a);Fe(g,"Invalid `previousPermissions`!"),Fe(o,"Invalid `preOptInApprovals`!");var m=d({cookieName:"adobeujs-optin"},{cookies:p}),h=this,_=le(h),C=_e(),S=Le(g),I=Le(o),v=s?m.get():{},D={},y=function(e,t){return Pe(e)||t&&Pe(t)?de.COMPLETE:de.PENDING}(S,v),b=function(e,t,n){var i=ke(he,!r);return r?Object.assign({},i,e,t,n):i}(I,S,v),A=Ee(b),O=function(e){return y=e},M=function(e){return b=e};h.deny=n(!1),h.approve=n(!0),h.denyAll=h.deny.bind(h,he),h.approveAll=h.approve.bind(h,he),h.isApproved=function(t){return e(t,h.permissions)},h.isPreApproved=function(t){return e(t,I)},h.fetchPermissions=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?h.on(de.COMPLETE,e):xe;return!r||r&&h.isComplete||!!o?e(h.permissions):t||C.add(He,function(){return e(h.permissions)}),n},h.complete=function(){h.status===de.CHANGED&&t()},h.registerPlugin=function(e){if(!e||!e.name||"function"!=typeof e.onRegister)throw new Error(Be);D[e.name]||(D[e.name]=e,e.onRegister.call(e,h))},h.execute=Ue(D),h.memoizeContent=function(e){we(e)&&m.set(e,{optInCookieDomain:c,optInStorageExpiry:u})},h.getMemoizedContent=function(e){var t=m.get();if(t)return t[e]},Object.defineProperties(h,{permissions:{get:function(){return b}},status:{get:function(){return y}},Categories:{get:function(){return fe}},doesOptInApply:{get:function(){return!!r}},isPending:{get:function(){return h.status===de.PENDING}},isComplete:{get:function(){return h.status===de.COMPLETE}},__plugins:{get:function(){return Object.keys(D)}},isIabContext:{get:function(){return l}}})}function g(e,t){function n(){r=null,e.call(e,new f("The call took longer than you wanted!"))}function i(){r&&(clearTimeout(r),e.apply(e,arguments))}if(void 0===t)return e;var r=setTimeout(n,t);return i}function m(){if(window.__tcfapi)return window.__tcfapi;var e=window;if(e===window.top)return void ye.error("__tcfapi not found");for(var t;!t;){e=e.parent;try{e.frames.__tcfapiLocator&&(t=e)}catch(e){}if(e===window.top)break}if(!t)return void ye.error("__tcfapi not found");var n={};return window.__tcfapi=function(e,i,r,a){var o=Math.random()+"",s={__tcfapiCall:{command:e,parameter:a,version:i,callId:o}};n[o]=r,t.postMessage(s,"*")},window.addEventListener("message",function(e){var t=e.data;if("string"==typeof t)try{t=JSON.parse(e.data)}catch(e){}if(t.__tcfapiReturn){var i=t.__tcfapiReturn;"function"==typeof n[i.callId]&&(n[i.callId](i.returnValue,i.success),delete n[i.callId])}},!1),window.__tcfapi}function h(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=!0===e.vendor.consents[t],r=n.every(function(t){return!0===e.purpose.consents[t]});return i&&r}function _(){var e=this;e.name="iabPlugin",e.version="0.0.2";var t,n=_e(),i={transparencyAndConsentData:null},r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i[e]=t};e.fetchConsentData=function(e){var t=e.callback,n=e.timeout,i=g(t,n);a({callback:i})},e.isApproved=function(e){var t=e.callback,n=e.category,r=e.timeout;if(i.transparencyAndConsentData)return t(null,h(i.transparencyAndConsentData,pe[n],ge[n]));var o=g(function(e,i){t(e,h(i,pe[n],ge[n]))},r);a({category:n,callback:o})},e.onRegister=function(n){t=n;var i=Object.keys(pe),r=function(e,t){!e&&t&&(i.forEach(function(e){var i=h(t,pe[e],ge[e]);n[i?"approve":"deny"](e,!0)}),n.complete())};e.fetchConsentData({callback:r})};var a=function(e){var a=e.callback;if(i.transparencyAndConsentData)return a(null,i.transparencyAndConsentData);n.add("FETCH_CONSENT_DATA",a),o(function(e,a){if(a){var o=Ee(e),s=t.getMemoizedContent("iabConsentHash"),c=De(o.tcString).toString(32);o.consentString=e.tcString,o.hasConsentChangedSinceLastCmpPull=s!==c,r("transparencyAndConsentData",o),t.memoizeContent({iabConsentHash:c})}n.execute("FETCH_CONSENT_DATA",[null,i.transparencyAndConsentData])})},o=function(e){var t=Ve(pe),n=m();"function"==typeof n&&n("getTCData",2,e,t)}}var C="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};Object.assign=Object.assign||function(e){for(var t,n,i=1;i<arguments.length;++i){n=arguments[i];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};var S,I,v={HANDSHAKE:"HANDSHAKE",GETSTATE:"GETSTATE",PARENTSTATE:"PARENTSTATE"},D={MCMID:"MCMID",MCAID:"MCAID",MCAAMB:"MCAAMB",MCAAMLH:"MCAAMLH",MCOPTOUT:"MCOPTOUT",CUSTOMERIDS:"CUSTOMERIDS"},y={MCMID:"getMarketingCloudVisitorID",MCAID:"getAnalyticsVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"isOptedOut",ALLFIELDS:"getVisitorValues"},b={CUSTOMERIDS:"getCustomerIDs"},A={MCMID:"getMarketingCloudVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"isOptedOut",MCAID:"getAnalyticsVisitorID",CUSTOMERIDS:"getCustomerIDs",ALLFIELDS:"getVisitorValues"},O={MC:"MCMID",A:"MCAID",AAM:"MCAAMB"},M={MCMID:"MCMID",MCOPTOUT:"MCOPTOUT",MCAID:"MCAID",MCAAMLH:"MCAAMLH",MCAAMB:"MCAAMB"},k={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},E={GLOBAL:"global"},T={LAX:"Lax",STRICT:"Strict",NONE:"None"},L={MESSAGES:v,STATE_KEYS_MAP:D,ASYNC_API_MAP:y,SYNC_API_MAP:b,ALL_APIS:A,FIELDGROUP_TO_FIELD:O,FIELDS:M,AUTH_STATE:k,OPT_OUT:E,SAME_SITE_VALUES:T},P=L.STATE_KEYS_MAP,R=function(e){function t(){}function n(t,n){var i=this;return function(){var r=e(0,t),a={};return a[t]=r,i.setStateAndPublish(a),n(r),r}}this.getMarketingCloudVisitorID=function(e){e=e||t;var i=this.findField(P.MCMID,e),r=n.call(this,P.MCMID,e);return void 0!==i?i:r()},this.getVisitorValues=function(e){this.getMarketingCloudVisitorID(function(t){e({MCMID:t})})}},w=L.MESSAGES,x=L.ASYNC_API_MAP,N=L.SYNC_API_MAP,F=function(){function e(){}function t(e,t){var n=this;return function(){return n.callbackRegistry.add(e,t),n.messageParent(w.GETSTATE),""}}function n(n){this[x[n]]=function(i){i=i||e;var r=this.findField(n,i),a=t.call(this,n,i);return void 0!==r?r:a()}}function i(t){this[N[t]]=function(){return this.findField(t,e)||{}}}Object.keys(x).forEach(n,this),Object.keys(N).forEach(i,this)},j=L.ASYNC_API_MAP,V=function(){Object.keys(j).forEach(function(e){this[j[e]]=function(t){this.callbackRegistry.add(e,t)}},this)},U=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(t,n){n.isObjectEmpty=function(e){return e===Object(e)&&0===Object.keys(e).length},n.isValueEmpty=function(e){return""===e||n.isObjectEmpty(e)};var i=function(){var e=navigator.appName,t=navigator.userAgent;return"Microsoft Internet Explorer"===e||t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0&&t.indexOf("Windows NT 6")>=0};n.getIeVersion=function(){return document.documentMode?document.documentMode:i()?7:null},n.isFirefox=function(e){return!!/Firefox\/([0-9\.]+)(?:\s|$)/.test(e||window.navigator.userAgent)},n.encodeAndBuildRequest=function(e,t){return e.map(encodeURIComponent).join(t)},n.isObject=function(t){return null!==t&&"object"===e(t)&&!1===Array.isArray(t)},n.defineGlobalNamespace=function(){return window.adobe=n.isObject(window.adobe)?window.adobe:{},window.adobe},n.pluck=function(e,t){return t.reduce(function(t,n){return e[n]&&(t[n]=e[n]),t},Object.create(null))},n.parseOptOut=function(e,t,n){t||(t=n,e.d_optout&&e.d_optout instanceof Array&&(t=e.d_optout.join(",")));var i=parseInt(e.d_ottl,10);return isNaN(i)&&(i=7200),{optOut:t,d_ottl:i}},n.normalizeBoolean=function(e){var t=e;return"true"===e?t=!0:"false"===e&&(t=!1),t}}),H=(U.isObjectEmpty,U.isValueEmpty,U.getIeVersion,U.isFirefox,U.encodeAndBuildRequest,U.isObject,U.defineGlobalNamespace,U.pluck,U.parseOptOut,U.normalizeBoolean,n),B=L.MESSAGES,G={0:"prefix",1:"orgID",2:"state"},Y=function(e,t){this.parse=function(e){try{var t={};return e.data.split("|").forEach(function(e,n){if(void 0!==e){t[G[n]]=2!==n?e:JSON.parse(e)}}),t}catch(e){}},this.isInvalid=function(n){var i=this.parse(n);if(!i||Object.keys(i).length<2)return!0;var r=e!==i.orgID,a=!t||n.origin!==t,o=-1===Object.keys(B).indexOf(i.prefix);return r||a||o},this.send=function(n,i,r){var a=i+"|"+e;r&&r===Object(r)&&(a+="|"+JSON.stringify(r));try{n.postMessage(a,t)}catch(e){}}},q=L.MESSAGES,W=function(e,t,n,i){function r(e){Object.assign(p,e)}function a(e){Object.assign(p.state,e),Object.assign(p.state.ALLFIELDS,e),p.callbackRegistry.executeAll(p.state)}function o(e){if(!h.isInvalid(e)){m=!1;var t=h.parse(e);p.setStateAndPublish(t.state)}}function s(e){!m&&g&&(m=!0,h.send(i,e))}function c(){r(new R(n._generateID)),p.getMarketingCloudVisitorID(),p.callbackRegistry.executeAll(p.state,!0),C.removeEventListener("message",u)}function u(e){if(!h.isInvalid(e)){var t=h.parse(e);m=!1,C.clearTimeout(p._handshakeTimeout),C.removeEventListener("message",u),r(new F(p)),C.addEventListener("message",o),p.setStateAndPublish(t.state),p.callbackRegistry.hasCallbacks()&&s(q.GETSTATE)}}function l(){g&&postMessage?(C.addEventListener("message",u),s(q.HANDSHAKE),p._handshakeTimeout=setTimeout(c,250)):c()}function d(){C.s_c_in||(C.s_c_il=[],C.s_c_in=0),p._c="Visitor",p._il=C.s_c_il,p._in=C.s_c_in,p._il[p._in]=p,C.s_c_in++}function f(){function e(e){0!==e.indexOf("_")&&"function"==typeof n[e]&&(p[e]=function(){})}Object.keys(n).forEach(e),p.getSupplementalDataID=n.getSupplementalDataID,p.isAllowed=function(){return!0}}var p=this,g=t.whitelistParentDomain;p.state={ALLFIELDS:{}},p.version=n.version,p.marketingCloudOrgID=e,p.cookieDomain=n.cookieDomain||"",p._instanceType="child";var m=!1,h=new Y(e,g);p.callbackRegistry=H(),p.init=function(){d(),f(),r(new V(p)),l()},p.findField=function(e,t){if(void 0!==p.state[e])return t(p.state[e]),p.state[e]},p.messageParent=s,p.setStateAndPublish=a},X=L.MESSAGES,K=L.ALL_APIS,J=L.ASYNC_API_MAP,z=L.FIELDGROUP_TO_FIELD,Q=function(e,t){function n(){var t={};return Object.keys(K).forEach(function(n){var i=K[n],r=e[i]();U.isValueEmpty(r)||(t[n]=r)}),t}function i(){var t=[];return e._loading&&Object.keys(e._loading).forEach(function(n){if(e._loading[n]){var i=z[n];t.push(i)}}),t.length?t:null}function r(t){return function n(r){var a=i();if(a){var o=J[a[0]];e[o](n,!0)}else t()}}function a(e,i){var r=n();t.send(e,i,r)}function o(e){c(e),a(e,X.HANDSHAKE)}function s(e){r(function(){a(e,X.PARENTSTATE)})()}function c(n){function i(i){r.call(e,i),t.send(n,X.PARENTSTATE,{CUSTOMERIDS:e.getCustomerIDs()})}var r=e.setCustomerIDs;e.setCustomerIDs=i}return function(e){if(!t.isInvalid(e)){(t.parse(e).prefix===X.HANDSHAKE?o:s)(e.source)}}},$=function(e,t){function n(e){return function(n){i[e]=n,r++,r===a&&t(i)}}var i={},r=0,a=Object.keys(e).length;Object.keys(e).forEach(function(t){var i=e[t];if(i.fn){var r=i.args||[];r.unshift(n(t)),i.fn.apply(i.context||null,r)}})},Z={get:function(e){e=encodeURIComponent(e);var t=(";"+document.cookie).split(" ").join(";"),n=t.indexOf(";"+e+"="),i=n<0?n:t.indexOf(";",n+1);return n<0?"":decodeURIComponent(t.substring(n+2+e.length,i<0?t.length:i))},set:function(e,t,n){var r=i(n,"cookieLifetime"),a=i(n,"expires"),o=i(n,"domain"),s=i(n,"secure"),c=i(n,"sameSite"),u=s?"Secure":"",l=c?"SameSite="+c+";":"";if(a&&"SESSION"!==r&&"NONE"!==r){var d=""!==t?parseInt(r||0,10):-60;if(d)a=new Date,a.setTime(a.getTime()+1e3*d);else if(1===a){a=new Date;var f=a.getYear();a.setYear(f+2+(f<1900?1900:0))}}else a=0;return e&&"NONE"!==r?(document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+"; path=/;"+(a?" expires="+a.toGMTString()+";":"")+(o?" domain="+o+";":"")+l+u,this.get(e)===t):0},remove:function(e,t){var n=i(t,"domain");n=n?" domain="+n+";":"";var r=i(t,"secure"),a=i(t,"sameSite"),o=r?"Secure":"",s=a?"SameSite="+a+";":"";document.cookie=encodeURIComponent(e)+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"+n+s+o}},ee=function(e,t){var n;!e&&C.location&&(e=C.location.hostname),n=e;var i,r=n.split("."),a=t||{};for(i=r.length-2;i>=0;i--)if(a.domain=r.slice(i).join("."),Z.set("TEST_AMCV_COOKIE_WRITE","cookie",a))return Z.remove("TEST_AMCV_COOKIE_WRITE",a),a.domain;return""},te={compare:s,isLessThan:function(e,t){return s(e,t)<0},areVersionsDifferent:function(e,t){return 0!==s(e,t)},isGreaterThan:function(e,t){return s(e,t)>0},isEqual:function(e,t){return 0===s(e,t)}},ne=!!C.postMessage,ie={postMessage:function(e,t,n){var i=1;t&&(ne?n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(n.location=t.replace(/#.*$/,"")+"#"+ +new Date+i+++"&"+e))},receiveMessage:function(e,t){var n;try{ne&&(e&&(n=function(n){if("string"==typeof t&&n.origin!==t||"[object Function]"===Object.prototype.toString.call(t)&&!1===t(n.origin))return!1;e(n)}),C.addEventListener?C[e?"addEventListener":"removeEventListener"]("message",n):C[e?"attachEvent":"detachEvent"]("onmessage",n))}catch(e){}}},re=function(e){var t,n,i="0123456789",r="",a="",o=8,s=10,c=10,u=""+Date.now(),l=u.substr(-6).split("").reverse("").join("");if(1==e){for(i+="ABCDEF",t=0;16>t;t++)n=Math.floor(Math.random()*o),4>t&&l[t]<o&&(n=+l[t]),r+=i.substring(n,n+1),n=Math.floor(Math.random()*o),a+=i.substring(n,n+1),o=16;return r+"-"+a}for(t=0;19>t;t++)n=Math.floor(Math.random()*s),6>t&&l[t]<s?(r+=l[t],n=l[t]):r+=i.substring(n,n+1),0===t&&9==n?s=3:(1==t||2==t)&&10!=s&&2>n?s=10:2<t&&(s=10),n=Math.floor(Math.random()*c),a+=i.substring(n,n+1),0===t&&9==n?c=3:(1==t||2==t)&&10!=c&&2>n?c=10:2<t&&(c=10);return r+a},ae=function(e,t){return{corsMetadata:function(){var e="none",t=!0;return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?e="XMLHttpRequest":"undefined"!=typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(t=!1),Object.prototype.toString.call(C.HTMLElement).indexOf("Constructor")>0&&(t=!1)),{corsType:e,corsCookiesEnabled:t}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new C[this.corsMetadata.corsType]},fireCORS:function(t,n,i){function r(e){var n;try{if((n=JSON.parse(e))!==Object(n))return void a.handleCORSError(t,null,"Response is not JSON")}catch(e){return void a.handleCORSError(t,e,"Error parsing response as JSON")}try{for(var i=t.callback,r=C,o=0;o<i.length;o++)r=r[i[o]];r(n)}catch(e){a.handleCORSError(t,e,"Error forming callback function")}}var a=this;n&&(t.loadErrorHandler=n);try{var o=this.getCORSInstance();o.open("get",t.corsUrl+"&ts="+(new Date).getTime(),!0),"XMLHttpRequest"===this.corsMetadata.corsType&&(o.withCredentials=!0,o.timeout=e.loadTimeout,o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4===this.readyState&&200===this.status&&r(this.responseText)}),o.onerror=function(e){a.handleCORSError(t,e,"onerror")},o.ontimeout=function(e){a.handleCORSError(t,e,"ontimeout")},o.send(),e._log.requests.push(t.corsUrl)}catch(e){this.handleCORSError(t,e,"try-catch")}},handleCORSError:function(t,n,i){e.CORSErrors.push({corsData:t,error:n,description:i}),t.loadErrorHandler&&("ontimeout"===i?t.loadErrorHandler(!0):t.loadErrorHandler(!1))}}},oe={POST_MESSAGE_ENABLED:!!C.postMessage,DAYS_BETWEEN_SYNC_ID_CALLS:1,MILLIS_PER_DAY:864e5,ADOBE_MC:"adobe_mc",ADOBE_MC_SDID:"adobe_mc_sdid",VALID_VISITOR_ID_REGEX:/^[0-9a-fA-F\-]+$/,ADOBE_MC_TTL_IN_MIN:5,VERSION_REGEX:/vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,FIRST_PARTY_SERVER_COOKIE:"s_ecid"},se=function(e,t){var n=C.document;return{THROTTLE_START:3e4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:null,onPagePixels:[],iframeHost:null,getIframeHost:function(e){if("string"==typeof e){var t=e.split("/");return t[0]+"//"+t[2]}},subdomain:null,url:null,getUrl:function(){var t,i="http://fast.",r="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.origin);return this.subdomain||(this.subdomain="nosubdomainreturned"),e.loadSSL&&(i=e.idSyncSSLUseAkamai?"https://fast.":"https://"),t=i+this.subdomain+".demdex.net/dest5.html"+r,this.iframeHost=this.getIframeHost(t),this.id="destination_publishing_iframe_"+this.subdomain+"_"+e.idSyncContainerID,t},checkDPIframeSrc:function(){var t="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.href);"string"==typeof e.dpIframeSrc&&e.dpIframeSrc.length&&(this.id="destination_publishing_iframe_"+(e._subdomain||this.subdomain||(new Date).getTime())+"_"+e.idSyncContainerID,this.iframeHost=this.getIframeHost(e.dpIframeSrc),this.url=e.dpIframeSrc+t)},idCallNotProcesssed:null,doAttachIframe:!1,startedAttachingIframe:!1,iframeHasLoaded:null,iframeIdChanged:null,newIframeCreated:null,originalIframeHasLoadedAlready:null,iframeLoadedCallbacks:[],regionChanged:!1,timesRegionChanged:0,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:oe.POST_MESSAGE_ENABLED?null:100,onPageDestinationsFired:[],jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,readyToAttachIframePreliminary:function(){return!(e.idSyncDisableSyncs||e.disableIdSyncs||e.idSyncDisable3rdPartySyncing||e.disableThirdPartyCookies||e.disableThirdPartyCalls)},readyToAttachIframe:function(){return this.readyToAttachIframePreliminary()&&(this.doAttachIframe||e._doAttachIframe)&&(this.subdomain&&"nosubdomainreturned"!==this.subdomain||e._subdomain)&&this.url&&!this.startedAttachingIframe},attachIframe:function(){function e(){r=n.createElement("iframe"),r.sandbox="allow-scripts allow-same-origin",r.title="Adobe ID Syncing iFrame",r.id=i.id,r.name=i.id+"_name",r.style.cssText="display: none; width: 0; height: 0;",r.src=i.url,i.newIframeCreated=!0,t(),n.body.appendChild(r)}function t(e){r.addEventListener("load",function(){r.className="aamIframeLoaded",i.iframeHasLoaded=!0,i.fireIframeLoadedCallbacks(e),i.requestToProcess()})}this.startedAttachingIframe=!0;var i=this,r=n.getElementById(this.id);r?"IFRAME"!==r.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==r.className?(this.originalIframeHasLoadedAlready=!1,t("The destination publishing iframe already exists from a different library, but hadn't loaded yet.")):(this.originalIframeHasLoadedAlready=!0,this.iframeHasLoaded=!0,this.iframe=r,this.fireIframeLoadedCallbacks("The destination publishing iframe already exists from a different library, and had loaded alresady."),this.requestToProcess())):e(),this.iframe=r},fireIframeLoadedCallbacks:function(e){this.iframeLoadedCallbacks.forEach(function(t){"function"==typeof t&&t({message:e||"The destination publishing iframe was attached and loaded successfully."})}),this.iframeLoadedCallbacks=[]},requestToProcess:function(t){function n(){r.jsonForComparison.push(t),r.jsonWaiting.push(t),r.processSyncOnPage(t)}var i,r=this;if(t===Object(t)&&t.ibs)if(i=JSON.stringify(t.ibs||[]),this.jsonForComparison.length){var a,o,s,c=!1;for(a=0,o=this.jsonForComparison.length;a<o;a++)if(s=this.jsonForComparison[a],i===JSON.stringify(s.ibs||[])){c=!0;break}c?this.jsonDuplicates.push(t):n()}else n();if((this.receivedThirdPartyCookiesNotification||!oe.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var u=this.jsonWaiting.shift();this.process(u),this.requestToProcess()}e.idSyncDisableSyncs||e.disableIdSyncs||!this.iframeHasLoaded||!this.messages.length||this.sendingMessages||(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){r.messageSendingInterval=oe.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},getRegionAndCheckIfChanged:function(t,n){var i=e._getField("MCAAMLH"),r=t.d_region||t.dcs_region;return i?r&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",r),parseInt(i,10)!==r&&(this.regionChanged=!0,this.timesRegionChanged++,e._setField("MCSYNCSOP",""),e._setField("MCSYNCS",""),i=r)):(i=r)&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",i)),i||(i=""),i},processSyncOnPage:function(e){var t,n,i,r;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(i=0;i<n;i++)r=t[i],r.syncOnPage&&this.checkFirstPartyCookie(r,"","syncOnPage")},process:function(e){var t,n,i,r,a,o=encodeURIComponent,s=!1;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(s=!0,i=0;i<n;i++)r=t[i],a=[o("ibs"),o(r.id||""),o(r.tag||""),U.encodeAndBuildRequest(r.url||[],","),o(r.ttl||""),"","",r.fireURLSync?"true":"false"],r.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(a.join("|")):r.fireURLSync&&this.checkFirstPartyCookie(r,a.join("|")));s&&this.jsonProcessed.push(e)},checkFirstPartyCookie:function(t,n,i){var r="syncOnPage"===i,a=r?"MCSYNCSOP":"MCSYNCS";e._readVisitor();var o,s,c=e._getField(a),u=!1,l=!1,d=Math.ceil((new Date).getTime()/oe.MILLIS_PER_DAY);c?(o=c.split("*"),s=this.pruneSyncData(o,t.id,d),u=s.dataPresent,l=s.dataValid,u&&l||this.fireSync(r,t,n,o,a,d)):(o=[],this.fireSync(r,t,n,o,a,d))},pruneSyncData:function(e,t,n){var i,r,a,o=!1,s=!1;for(r=0;r<e.length;r++)i=e[r],a=parseInt(i.split("-")[1],10),i.match("^"+t+"-")?(o=!0,n<a?s=!0:(e.splice(r,1),r--)):n>=a&&(e.splice(r,1),r--);return{dataPresent:o,dataValid:s}},manageSyncsSize:function(e){if(e.join("*").length>this.MAX_SYNCS_LENGTH)for(e.sort(function(e,t){return parseInt(e.split("-")[1],10)-parseInt(t.split("-")[1],10)});e.join("*").length>this.MAX_SYNCS_LENGTH;)e.shift()},fireSync:function(t,n,i,r,a,o){var s=this;if(t){if("img"===n.tag){var c,u,l,d,f=n.url,p=e.loadSSL?"https:":"http:";for(c=0,u=f.length;c<u;c++){l=f[c],d=/^\/\//.test(l);var g=new Image;g.addEventListener("load",function(t,n,i,r){return function(){s.onPagePixels[t]=null,e._readVisitor();var o,c=e._getField(a),u=[];if(c){o=c.split("*");var l,d,f;for(l=0,d=o.length;l<d;l++)f=o[l],f.match("^"+n.id+"-")||u.push(f)}s.setSyncTrackingData(u,n,i,r)}}(this.onPagePixels.length,n,a,o)),g.src=(d?p:"")+l,this.onPagePixels.push(g)}}}else this.addMessage(i),this.setSyncTrackingData(r,n,a,o)},addMessage:function(t){var n=encodeURIComponent,i=n(e._enableErrorReporting?"---destpub-debug---":"---destpub---");this.messages.push((oe.POST_MESSAGE_ENABLED?"":i)+t)},setSyncTrackingData:function(t,n,i,r){t.push(n.id+"-"+(r+Math.ceil(n.ttl/60/24))),this.manageSyncsSize(t),e._setField(i,t.join("*"))},sendMessages:function(){var e,t=this,n="",i=encodeURIComponent;this.regionChanged&&(n=i("---destpub-clear-dextp---"),this.regionChanged=!1),this.messages.length?oe.POST_MESSAGE_ENABLED?(e=n+i("---destpub-combined---")+this.messages.join("%01"),this.postMessage(e),this.messages=[],this.sendingMessages=!1):(e=this.messages.shift(),this.postMessage(n+e),setTimeout(function(){t.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(e){ie.postMessage(e,this.url,this.iframe.contentWindow),this.messagesPosted.push(e)},receiveMessage:function(e){var t,n=/^---destpub-to-parent---/;"string"==typeof e&&n.test(e)&&(t=e.replace(n,"").split("|"),"canSetThirdPartyCookies"===t[0]&&(this.canSetThirdPartyCookies="true"===t[1],this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(e))},processIDCallData:function(i){(null==this.url||i.subdomain&&"nosubdomainreturned"===this.subdomain)&&("string"==typeof e._subdomain&&e._subdomain.length?this.subdomain=e._subdomain:this.subdomain=i.subdomain||"",this.url=this.getUrl()),i.ibs instanceof Array&&i.ibs.length&&(this.doAttachIframe=!0),this.readyToAttachIframe()&&(e.idSyncAttachIframeOnWindowLoad?(t.windowLoaded||"complete"===n.readyState||"loaded"===n.readyState)&&this.attachIframe():this.attachIframeASAP()),"function"==typeof e.idSyncIDCallResult?e.idSyncIDCallResult(i):this.requestToProcess(i),"function"==typeof e.idSyncAfterIDCallResult&&e.idSyncAfterIDCallResult(i)},canMakeSyncIDCall:function(t,n){return e._forceSyncIDCall||!t||n-t>oe.DAYS_BETWEEN_SYNC_ID_CALLS},attachIframeASAP:function(){function e(){t.startedAttachingIframe||(n.body?t.attachIframe():setTimeout(e,30))}var t=this;e()}}},ce={audienceManagerServer:{},audienceManagerServerSecure:{},cookieDomain:{},cookieLifetime:{},cookieName:{},doesOptInApply:{type:"boolean"},disableThirdPartyCalls:{type:"boolean"},discardTrackingServerECID:{type:"boolean"},idSyncAfterIDCallResult:{},idSyncAttachIframeOnWindowLoad:{type:"boolean"},idSyncContainerID:{},idSyncDisable3rdPartySyncing:{type:"boolean"},disableThirdPartyCookies:{type:"boolean"},idSyncDisableSyncs:{type:"boolean"},disableIdSyncs:{type:"boolean"},idSyncIDCallResult:{},idSyncSSLUseAkamai:{type:"boolean"},isCoopSafe:{type:"boolean"},isIabContext:{type:"boolean"},isOptInStorageEnabled:{type:"boolean"},loadSSL:{type:"boolean"},loadTimeout:{},marketingCloudServer:{},marketingCloudServerSecure:{},optInCookieDomain:{},optInStorageExpiry:{},overwriteCrossDomainMCIDAndAID:{type:"boolean"},preOptInApprovals:{},previousPermissions:{},resetBeforeVersion:{},sdidParamExpiry:{},serverState:{},sessionCookieName:{},secureCookie:{type:"boolean"},sameSiteCookie:{},takeTimeoutMetrics:{},trackingServer:{},trackingServerSecure:{},useLocalStorage:{type:"boolean"},whitelistIframeDomains:{},whitelistParentDomain:{}},ue={getConfigNames:function(){return Object.keys(ce)},getConfigs:function(){return ce},normalizeConfig:function(e,t){return ce[e]&&"boolean"===ce[e].type?"function"!=typeof t?t:t():t}},le=function(e){var t={};return e.on=function(e,n,i){if(!n||"function"!=typeof n)throw new Error("[ON] Callback should be a function.");t.hasOwnProperty(e)||(t[e]=[]);var r=t[e].push({callback:n,context:i})-1;return function(){t[e].splice(r,1),t[e].length||delete t[e]}},e.off=function(e,n){t.hasOwnProperty(e)&&(t[e]=t[e].filter(function(e){if(e.callback!==n)return e}))},e.publish=function(e){if(t.hasOwnProperty(e)){var n=[].slice.call(arguments,1);t[e].slice(0).forEach(function(e){e.callback.apply(e.context,n)})}},e.publish},de={PENDING:"pending",CHANGED:"changed",COMPLETE:"complete"},fe={AAM:"aam",ADCLOUD:"adcloud",ANALYTICS:"aa",CAMPAIGN:"campaign",ECID:"ecid",LIVEFYRE:"livefyre",TARGET:"target",MEDIA_ANALYTICS:"mediaaa"},pe=(S={},t(S,fe.AAM,565),t(S,fe.ECID,565),S),ge=(I={},t(I,fe.AAM,[1,10]),t(I,fe.ECID,[1,10]),I),me=["videoaa","iabConsentHash"],he=function(e){return Object.keys(e).map(function(t){return e[t]})}(fe),_e=function(){var e={};return e.callbacks=Object.create(null),e.add=function(t,n){if(!u(n))throw new Error("[callbackRegistryFactory] Make sure callback is a function or an array of functions.");e.callbacks[t]=e.callbacks[t]||[];var i=e.callbacks[t].push(n)-1;return function(){e.callbacks[t].splice(i,1)}},e.execute=function(t,n){if(e.callbacks[t]){n=void 0===n?[]:n,n=n instanceof Array?n:[n];try{for(;e.callbacks[t].length;){var i=e.callbacks[t].shift();"function"==typeof i?i.apply(null,n):i instanceof Array&&i[1].apply(i[0],n)}delete e.callbacks[t]}catch(e){}}},e.executeAll=function(t,n){(n||t&&!c(t))&&Object.keys(e.callbacks).forEach(function(n){var i=void 0!==t[n]?t[n]:"";e.execute(n,i)},e)},e.hasCallbacks=function(){return Boolean(Object.keys(e.callbacks).length)},e},Ce=function(){},Se=function(e){var t=window,n=t.console;return!!n&&"function"==typeof n[e]},Ie=function(e,t,n){return n()?function(){if(Se(e)){for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];console[e].apply(console,[t].concat(i))}}:Ce},ve=l,De=function(){for(var e=[],t=0;t<256;t++){for(var n=t,i=0;i<8;i++)n=1&n?3988292384^n>>>1:n>>>1;e.push(n)}return function(t,n){t=unescape(encodeURIComponent(t)),n||(n=0),n^=-1;for(var i=0;i<t.length;i++){var r=255&(n^t.charCodeAt(i));n=n>>>8^e[r]}return(n^=-1)>>>0}}(),ye=new ve("[ADOBE OPT-IN]"),be=function(t,n){return e(t)===n},Ae=function(e,t){return e instanceof Array?e:be(e,"string")?[e]:t||[]},Oe=function(e){var t=Object.keys(e);return!!t.length&&t.every(function(t){return!0===e[t]})},Me=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return!(!e||Te(e))&&Ae(e).every(function(e){return he.indexOf(e)>-1||t&&me.indexOf(e)>-1})},ke=function(e,t){return e.reduce(function(e,n){return e[n]=t,e},{})},Ee=function(e){return JSON.parse(JSON.stringify(e))},Te=function(e){return"[object Array]"===Object.prototype.toString.call(e)&&!e.length},Le=function(e){if(we(e))return e;try{return JSON.parse(e)}catch(e){return{}}},Pe=function(e){return void 0===e||(we(e)?Me(Object.keys(e),!0):Re(e))},Re=function(e){try{var t=JSON.parse(e);return!!e&&be(e,"string")&&Me(Object.keys(t),!0)}catch(e){return!1}},we=function(e){return null!==e&&be(e,"object")&&!1===Array.isArray(e)},xe=function(){},Ne=function(e){return be(e,"function")?e():e},Fe=function(e,t){Pe(e)||ye.error("".concat(t))},je=function(e){return Object.keys(e).map(function(t){return e[t]})},Ve=function(e){return je(e).filter(function(e,t,n){return n.indexOf(e)===t})},Ue=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.command,i=t.params,r=void 0===i?{}:i,a=t.callback,o=void 0===a?xe:a;if(!n||-1===n.indexOf("."))throw new Error("[OptIn.execute] Please provide a valid command.");try{
    var s=n.split("."),c=e[s[0]],u=s[1];if(!c||"function"!=typeof c[u])throw new Error("Make sure the plugin and API name exist.");var l=Object.assign(r,{callback:o});c[u].call(c,l)}catch(e){ye.error("[execute] Something went wrong: "+e.message)}}};f.prototype=Object.create(Error.prototype),f.prototype.constructor=f;var He="fetchPermissions",Be="[OptIn#registerPlugin] Plugin is invalid.";p.Categories=fe,p.TimeoutError=f;var Ge=Object.freeze({OptIn:p,IabPlugin:_}),Ye=function(e,t){e.publishDestinations=function(n){var i=arguments[1],r=arguments[2];try{r="function"==typeof r?r:n.callback}catch(e){r=function(){}}var a=t;if(!a.readyToAttachIframePreliminary())return void r({error:"The destination publishing iframe is disabled in the Visitor library."});if("string"==typeof n){if(!n.length)return void r({error:"subdomain is not a populated string."});if(!(i instanceof Array&&i.length))return void r({error:"messages is not a populated array."});var o=!1;if(i.forEach(function(e){"string"==typeof e&&e.length&&(a.addMessage(e),o=!0)}),!o)return void r({error:"None of the messages are populated strings."})}else{if(!U.isObject(n))return void r({error:"Invalid parameters passed."});var s=n;if("string"!=typeof(n=s.subdomain)||!n.length)return void r({error:"config.subdomain is not a populated string."});var c=s.urlDestinations;if(!(c instanceof Array&&c.length))return void r({error:"config.urlDestinations is not a populated array."});var u=[];c.forEach(function(e){U.isObject(e)&&(e.hideReferrer?e.message&&a.addMessage(e.message):u.push(e))});!function e(){u.length&&setTimeout(function(){var t=new Image,n=u.shift();t.src=n.url,a.onPageDestinationsFired.push(n),e()},100)}()}a.iframe?(r({message:"The destination publishing iframe is already attached and loaded."}),a.requestToProcess()):!e.subdomain&&e._getField("MCMID")?(a.subdomain=n,a.doAttachIframe=!0,a.url=a.getUrl(),a.readyToAttachIframe()?(a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through this API call. Result: "+(e.message||"no result")})}),a.attachIframe()):r({error:"Encountered a problem in attempting to attach and load the destination publishing iframe through this API call."})):a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: "+(e.message||"no result")})})}},qe=function e(t){function n(e,t){return e>>>t|e<<32-t}for(var i,r,a=Math.pow,o=a(2,32),s="",c=[],u=8*t.length,l=e.h=e.h||[],d=e.k=e.k||[],f=d.length,p={},g=2;f<64;g++)if(!p[g]){for(i=0;i<313;i+=g)p[i]=g;l[f]=a(g,.5)*o|0,d[f++]=a(g,1/3)*o|0}for(t+="€";t.length%64-56;)t+="\0";for(i=0;i<t.length;i++){if((r=t.charCodeAt(i))>>8)return;c[i>>2]|=r<<(3-i)%4*8}for(c[c.length]=u/o|0,c[c.length]=u,r=0;r<c.length;){var m=c.slice(r,r+=16),h=l;for(l=l.slice(0,8),i=0;i<64;i++){var _=m[i-15],C=m[i-2],S=l[0],I=l[4],v=l[7]+(n(I,6)^n(I,11)^n(I,25))+(I&l[5]^~I&l[6])+d[i]+(m[i]=i<16?m[i]:m[i-16]+(n(_,7)^n(_,18)^_>>>3)+m[i-7]+(n(C,17)^n(C,19)^C>>>10)|0);l=[v+((n(S,2)^n(S,13)^n(S,22))+(S&l[1]^S&l[2]^l[1]&l[2]))|0].concat(l),l[4]=l[4]+v|0}for(i=0;i<8;i++)l[i]=l[i]+h[i]|0}for(i=0;i<8;i++)for(r=3;r+1;r--){var D=l[i]>>8*r&255;s+=(D<16?0:"")+D.toString(16)}return s},We=function(e,t){return"SHA-256"!==t&&"SHA256"!==t&&"sha256"!==t&&"sha-256"!==t||(e=qe(e)),e},Xe=function(e){return String(e).trim().toLowerCase()},Ke=Ge.OptIn;U.defineGlobalNamespace(),window.adobe.OptInCategories=Ke.Categories;var Je=function(t,n,i){function r(){S._customerIDsHashChanged=!1}function a(e){var t=e;return function(e){var n=e||A.location.href;try{var i=S._extractParamFromUri(n,t);if(i)return q.parsePipeDelimetedKeyValues(i)}catch(e){}}}function o(e){function t(e,t,n){e&&e.match(oe.VALID_VISITOR_ID_REGEX)&&(n===T&&(b=!0),t(e))}t(e[T],S.setMarketingCloudVisitorID,T),S._setFieldExpire(N,-1),t(e[w],S.setAnalyticsVisitorID)}function s(e){e=e||{},S._supplementalDataIDCurrent=e.supplementalDataIDCurrent||"",S._supplementalDataIDCurrentConsumed=e.supplementalDataIDCurrentConsumed||{},S._supplementalDataIDLast=e.supplementalDataIDLast||"",S._supplementalDataIDLastConsumed=e.supplementalDataIDLastConsumed||{}}function c(e){function t(e,t,n){return n=n?n+="|":n,n+=e+"="+encodeURIComponent(t)}function n(e,n){var i=n[0],r=n[1];return null!=r&&r!==F&&(e=t(i,r,e)),e}var i=e.reduce(n,"");return function(e){var t=q.getTimestampInSeconds();return e=e?e+="|":e,e+="TS="+t}(i)}function u(e){var t=e.minutesToLive,n="";return(S.idSyncDisableSyncs||S.disableIdSyncs)&&(n=n||"Error: id syncs have been disabled"),"string"==typeof e.dpid&&e.dpid.length||(n=n||"Error: config.dpid is empty"),"string"==typeof e.url&&e.url.length||(n=n||"Error: config.url is empty"),void 0===t?t=20160:(t=parseInt(t,10),(isNaN(t)||t<=0)&&(n=n||"Error: config.minutesToLive needs to be a positive number")),{error:n,ttl:t}}function l(){return!!S.configs.doesOptInApply&&!(I.optIn.isComplete&&d())}function d(){return S.configs.doesOptInApply&&S.configs.isIabContext?I.optIn.isApproved(I.optIn.Categories.ECID)&&y:I.optIn.isApproved(I.optIn.Categories.ECID)}function f(){[["getMarketingCloudVisitorID"],["setCustomerIDs",void 0],["syncIdentity",void 0],["getAnalyticsVisitorID"],["getAudienceManagerLocationHint"],["getLocationHint"],["getAudienceManagerBlob"]].forEach(function(e){var t=e[0],n=2===e.length?e[1]:"",i=S[t];S[t]=function(e){return d()&&S.isAllowed()?i.apply(S,arguments):("function"==typeof e&&S._callCallback(e,[n]),n)}})}function p(){var e=S._getAudienceManagerURLData(),t=e.url;return S._loadData(E,t,null,e)}function g(e,t){if(y=!0,e)throw new Error("[IAB plugin] : "+e);t&&t.gdprApplies&&(v=t.consentString,D=t.hasConsentChangedSinceLastCmpPull?1:0),p(),_()}function m(e,t){if(y=!0,e)throw new Error("[IAB plugin] : "+e);t.gdprApplies&&(v=t.consentString,D=t.hasConsentChangedSinceLastCmpPull?1:0),S.init(),_()}function h(){I.optIn.isComplete&&(I.optIn.isApproved(I.optIn.Categories.ECID)?S.configs.isIabContext?I.optIn.execute({command:"iabPlugin.fetchConsentData",callback:m}):(S.init(),_()):S.configs.isIabContext?I.optIn.execute({command:"iabPlugin.fetchConsentData",callback:g}):(f(),_()))}function _(){I.optIn.off("complete",h)}if(!i||i.split("").reverse().join("")!==t)throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");var S=this,I=window.adobe,v="",D=0,y=!1,b=!1;S.version="5.4.0";var A=C,O=A.Visitor;O.version=S.version,O.AuthState=L.AUTH_STATE,O.OptOut=L.OPT_OUT,A.s_c_in||(A.s_c_il=[],A.s_c_in=0),S._c="Visitor",S._il=A.s_c_il,S._in=A.s_c_in,S._il[S._in]=S,A.s_c_in++,S._instanceType="regular",S._log={requests:[]},S.marketingCloudOrgID=t,S.cookieName="AMCV_"+t,S.sessionCookieName="AMCVS_"+t;var M={};n&&n.secureCookie&&n.sameSiteCookie&&(M={sameSite:n.sameSiteCookie,secure:n.secureCookie}),S.cookieDomain=S.useLocalStorage?"":ee(null,M),S.loadSSL=!0,S.loadTimeout=3e4,S.CORSErrors=[],S.marketingCloudServer=S.audienceManagerServer="dpm.demdex.net",S.sdidParamExpiry=30;var k=null,E="MC",T="MCMID",P="MCIDTS",R="A",w="MCAID",x="AAM",N="MCAAMB",F="NONE",j=function(e){return!Object.prototype[e]},V=ae(S);S.FIELDS=L.FIELDS,S.cookieRead=function(e){return S.useLocalStorage?e===S.sessionCookieName?sessionStorage.getItem(e):localStorage.getItem(e):Z.get(e)},S.cookieWrite=function(e,t,n){var i=""+t;if(S.useLocalStorage)return e===S.sessionCookieName?sessionStorage.setItem(e,i):localStorage.setItem(e,i);var r=S.cookieLifetime?(""+S.cookieLifetime).toUpperCase():"",a={expires:n,domain:S.cookieDomain,cookieLifetime:r};return S.configs&&S.configs.secureCookie&&"https:"===location.protocol&&(a.secure=!0),S.configs&&S.configs.sameSiteCookie&&"https:"===location.protocol&&(a.sameSite=L.SAME_SITE_VALUES[S.configs.sameSiteCookie.toUpperCase()]||"Lax"),Z.set(e,i,a)},S.removeCookie=function(e){if(S.useLocalStorage)return e===S.sessionCookieName?sessionStorage.removeItem(e):localStorage.removeItem(e);var t={domain:S.cookieDomain};return S.configs&&S.configs.secureCookie&&"https:"===location.protocol&&(t.secure=!0),S.configs&&S.configs.sameSiteCookie&&"https:"===location.protocol&&(t.sameSite=L.SAME_SITE_VALUES[S.configs.sameSiteCookie.toUpperCase()]||"Lax"),Z.remove(e,t)},S.resetState=function(e){e?S._mergeServerState(e):s()},S._isAllowedDone=!1,S._isAllowedFlag=!1,S.isAllowed=function(){return S._isAllowedDone||(S._isAllowedDone=!0,(S.cookieRead(S.cookieName)||S.cookieWrite(S.cookieName,"T",1))&&(S._isAllowedFlag=!0)),"T"===S.cookieRead(S.cookieName)&&S.removeCookie(S.cookieName),S._isAllowedFlag},S.setMarketingCloudVisitorID=function(e){S._setMarketingCloudFields(e)},S._use1stPartyMarketingCloudServer=!1,S.getMarketingCloudVisitorID=function(e,t){S.marketingCloudServer&&S.marketingCloudServer.indexOf(".demdex.net")<0&&(S._use1stPartyMarketingCloudServer=!0);var n=S._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;return S._getRemoteField(T,i,e,t,n)};var H=function(e,t){var n={};S.getMarketingCloudVisitorID(function(){t.forEach(function(e){n[e]=S._getField(e,!0)}),-1!==t.indexOf("MCOPTOUT")?S.isOptedOut(function(t){n.MCOPTOUT=t,e(n)},null,!0):e(n)},!0)};S.getVisitorValues=function(e,t){var n={MCMID:{fn:S.getMarketingCloudVisitorID,args:[!0],context:S},MCOPTOUT:{fn:S.isOptedOut,args:[void 0,!0],context:S},MCAID:{fn:S.getAnalyticsVisitorID,args:[!0],context:S},MCAAMLH:{fn:S.getAudienceManagerLocationHint,args:[!0],context:S},MCAAMB:{fn:S.getAudienceManagerBlob,args:[!0],context:S}},i=t&&t.length?U.pluck(n,t):n;t&&-1===t.indexOf("MCAID")?H(e,t):$(i,e)},S._currentCustomerIDs={},S._customerIDsHashChanged=!1,S._newCustomerIDsHash="",S.setCustomerIDs=function(t,n){if(!S.isOptedOut()&&t){if(!U.isObject(t)||U.isObjectEmpty(t))return!1;S._readVisitor();var i,a,o,s;for(i in t)if(j(i)&&(S._currentCustomerIDs.dataSources=S._currentCustomerIDs.dataSources||{},a=t[i],n=a.hasOwnProperty("hashType")?a.hashType:n,a))if("object"===e(a)){var c={};if(a.id){if(n){if(!(s=We(Xe(a.id),n)))return;a.id=s,c.hashType=n}c.id=a.id}void 0!=a.authState&&(c.authState=a.authState),S._currentCustomerIDs.dataSources[i]=c}else if(n){if(!(s=We(Xe(a),n)))return;S._currentCustomerIDs.dataSources[i]={id:s,hashType:n}}else S._currentCustomerIDs.dataSources[i]={id:a};var u=S.getCustomerIDs(!0),l=S._getField("MCCIDH"),d="";l||(l=0);for(o in u){var f=u[o];if(!U.isObjectEmpty(f))for(i in f)j(i)&&(a=f[i],d+=(d?"|":"")+i+"|"+(a.id?a.id:"")+(a.authState?a.authState:""))}S._newCustomerIDsHash=String(S._hash(d)),S._newCustomerIDsHash!==l&&(S._customerIDsHashChanged=!0,S._mapCustomerIDs(r))}},S.syncIdentity=function(t,n){if(!S.isOptedOut()&&t){if(!U.isObject(t)||U.isObjectEmpty(t))return!1;S._readVisitor();var i,a,o,s,c;for(i in t)if(j(i)&&(S._currentCustomerIDs.nameSpaces=S._currentCustomerIDs.nameSpaces||{},a=t[i],n=a.hasOwnProperty("hashType")?a.hashType:n,a&&"object"===e(a))){var u={};if(a.id){if(n){if(!(o=We(Xe(a.id),n)))return;a.id=o,u.hashType=n}u.id=a.id}void 0!=a.authState&&(u.authState=a.authState),a.dataSource&&(S._currentCustomerIDs.dataSources=S._currentCustomerIDs.dataSources||{},s=a.dataSource,S._currentCustomerIDs.dataSources[s]=u),S._currentCustomerIDs.nameSpaces[i]=u}var l=S.getCustomerIDs(!0),d=S._getField("MCCIDH"),f="";d||(d="0");for(c in l){var p=l[c];if(!U.isObjectEmpty(p))for(i in p)j(i)&&(a=p[i],f+=(f?"|":"")+i+"|"+(a.id?a.id:"")+(a.authState?a.authState:""))}S._newCustomerIDsHash=String(S._hash(f)),S._newCustomerIDsHash!==d&&(S._customerIDsHashChanged=!0,S._mapCustomerIDs(r))}},S.getCustomerIDs=function(e){S._readVisitor();var t,n,i={dataSources:{},nameSpaces:{}},r=S._currentCustomerIDs.dataSources;for(t in r)j(t)&&(n=r[t],n.id&&(i.dataSources[t]||(i.dataSources[t]={}),i.dataSources[t].id=n.id,void 0!=n.authState?i.dataSources[t].authState=n.authState:i.dataSources[t].authState=O.AuthState.UNKNOWN,n.hashType&&(i.dataSources[t].hashType=n.hashType)));var a=S._currentCustomerIDs.nameSpaces;for(t in a)j(t)&&(n=a[t],n.id&&(i.nameSpaces[t]||(i.nameSpaces[t]={}),i.nameSpaces[t].id=n.id,void 0!=n.authState?i.nameSpaces[t].authState=n.authState:i.nameSpaces[t].authState=O.AuthState.UNKNOWN,n.hashType&&(i.nameSpaces[t].hashType=n.hashType)));return e?i:i.dataSources},S.setAnalyticsVisitorID=function(e){S._setAnalyticsFields(e)},S.getAnalyticsVisitorID=function(e,t,n){if(!q.isTrackingServerPopulated()&&!n)return S._callCallback(e,[""]),"";var i="";if(n||(i=S.getMarketingCloudVisitorID(function(t){S.getAnalyticsVisitorID(e,!0)})),i||n){var r=n?S.marketingCloudServer:S.trackingServer,a="";S.loadSSL&&(n?S.marketingCloudServerSecure&&(r=S.marketingCloudServerSecure):S.trackingServerSecure&&(r=S.trackingServerSecure));var o={};if(r){var s="http"+(S.loadSSL?"s":"")+"://"+r+"/id",c=S.configs.cookieLifetime,u="d_visid_ver="+S.version+"&mcorgid="+encodeURIComponent(S.marketingCloudOrgID)+(i?"&mid="+encodeURIComponent(i):"")+(c?"&cl="+encodeURIComponent(c):"")+(S.idSyncDisable3rdPartySyncing||S.disableThirdPartyCookies?"&d_coppa=true":""),l=["s_c_il",S._in,"_set"+(n?"MarketingCloud":"Analytics")+"Fields"];a=s+"?"+u+"&callback=s_c_il%5B"+S._in+"%5D._set"+(n?"MarketingCloud":"Analytics")+"Fields",o.corsUrl=s+"?"+u,o.callback=l}return o.url=a,S._getRemoteField(n?T:w,a,e,t,o)}return""},S.getAudienceManagerLocationHint=function(e,t){if(S.getMarketingCloudVisitorID(function(t){S.getAudienceManagerLocationHint(e,!0)})){var n=S._getField(w);if(!n&&q.isTrackingServerPopulated()&&(n=S.getAnalyticsVisitorID(function(t){S.getAudienceManagerLocationHint(e,!0)})),n||!q.isTrackingServerPopulated()){var i=S._getAudienceManagerURLData(),r=i.url;return S._getRemoteField("MCAAMLH",r,e,t,i)}}return""},S.getLocationHint=S.getAudienceManagerLocationHint,S.getAudienceManagerBlob=function(e,t){if(S.getMarketingCloudVisitorID(function(t){S.getAudienceManagerBlob(e,!0)})){var n=S._getField(w);if(!n&&q.isTrackingServerPopulated()&&(n=S.getAnalyticsVisitorID(function(t){S.getAudienceManagerBlob(e,!0)})),n||!q.isTrackingServerPopulated()){var i=S._getAudienceManagerURLData(),r=i.url;return S._customerIDsHashChanged&&S._setFieldExpire(N,-1),S._getRemoteField(N,r,e,t,i)}}return""},S._supplementalDataIDCurrent="",S._supplementalDataIDCurrentConsumed={},S._supplementalDataIDLast="",S._supplementalDataIDLastConsumed={},S.getSupplementalDataID=function(e,t){S._supplementalDataIDCurrent||t||(S._supplementalDataIDCurrent=S._generateID(1));var n=S._supplementalDataIDCurrent;return S._supplementalDataIDLast&&!S._supplementalDataIDLastConsumed[e]?(n=S._supplementalDataIDLast,S._supplementalDataIDLastConsumed[e]=!0):n&&(S._supplementalDataIDCurrentConsumed[e]&&(S._supplementalDataIDLast=S._supplementalDataIDCurrent,S._supplementalDataIDLastConsumed=S._supplementalDataIDCurrentConsumed,S._supplementalDataIDCurrent=n=t?"":S._generateID(1),S._supplementalDataIDCurrentConsumed={}),n&&(S._supplementalDataIDCurrentConsumed[e]=!0)),n};var B=!1;S._liberatedOptOut=null,S.getOptOut=function(e,t){var n=S._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;if(d())return S._getRemoteField("MCOPTOUT",i,e,t,n);if(S._registerCallback("liberatedOptOut",e),null!==S._liberatedOptOut)return S._callAllCallbacks("liberatedOptOut",[S._liberatedOptOut]),B=!1,S._liberatedOptOut;if(B)return null;B=!0;var r="liberatedGetOptOut";return n.corsUrl=n.corsUrl.replace(/\.demdex\.net\/id\?/,".demdex.net/optOutStatus?"),n.callback=[r],C[r]=function(e){if(e===Object(e)){var t,n,i=U.parseOptOut(e,t,F);t=i.optOut,n=1e3*i.d_ottl,S._liberatedOptOut=t,setTimeout(function(){S._liberatedOptOut=null},n)}S._callAllCallbacks("liberatedOptOut",[t]),B=!1},V.fireCORS(n),null},S.isOptedOut=function(e,t,n){t||(t=O.OptOut.GLOBAL);var i=S.getOptOut(function(n){var i=n===O.OptOut.GLOBAL||n.indexOf(t)>=0;S._callCallback(e,[i])},n);return i?i===O.OptOut.GLOBAL||i.indexOf(t)>=0:null};var G={subscribed:!1,callbacks:[]};S.onReceiveEcid=function(e){if(d())return S.getMarketingCloudVisitorID(e,!0);G.subscribed=!0,e&&"function"==typeof e&&G.callbacks.push(e)},S._fields=null,S._fieldsExpired=null,S._hash=function(e){var t,n,i=0;if(e)for(t=0;t<e.length;t++)n=e.charCodeAt(t),i=(i<<5)-i+n,i&=i;return i},S._generateID=re,S._generateLocalMID=function(){var e=S._generateID(0);return X.isClientSideMarketingCloudVisitorID=!0,e},S._callbackList=null,S._callCallback=function(e,t){try{"function"==typeof e?e.apply(A,t):e[1].apply(e[0],t)}catch(e){}},S._registerCallback=function(e,t){t&&(null==S._callbackList&&(S._callbackList={}),void 0==S._callbackList[e]&&(S._callbackList[e]=[]),S._callbackList[e].push(t))},S._callAllCallbacks=function(e,t){if(null!=S._callbackList){var n=S._callbackList[e];if(n)for(;n.length>0;)S._callCallback(n.shift(),t)}},S._addQuerystringParam=function(e,t,n,i){var r=encodeURIComponent(t)+"="+encodeURIComponent(n),a=q.parseHash(e),o=q.hashlessUrl(e);if(-1===o.indexOf("?"))return o+"?"+r+a;var s=o.split("?"),c=s[0]+"?",u=s[1];return c+q.addQueryParamAtLocation(u,r,i)+a},S._extractParamFromUri=function(e,t){var n=new RegExp("[\\?&#]"+t+"=([^&#]*)"),i=n.exec(e);if(i&&i.length)return decodeURIComponent(i[1])},S._parseAdobeMcFromUrl=a(oe.ADOBE_MC),S._parseAdobeMcSdidFromUrl=a(oe.ADOBE_MC_SDID),S._attemptToPopulateSdidFromUrl=function(e){var n=S._parseAdobeMcSdidFromUrl(e),i=1e9;n&&n.TS&&(i=q.getTimestampInSeconds()-n.TS),n&&n.SDID&&n.MCORGID===t&&i<S.sdidParamExpiry&&(S._supplementalDataIDCurrent=n.SDID,S._supplementalDataIDCurrentConsumed.SDID_URL_PARAM=!0)},S._attemptToPopulateIdsFromUrl=function(){var e=S._parseAdobeMcFromUrl();if(e&&e.TS){var n=q.getTimestampInSeconds(),i=n-e.TS;if(Math.floor(i/60)>oe.ADOBE_MC_TTL_IN_MIN||e.MCORGID!==t)return;o(e)}},S._mergeServerState=function(e){if(e)try{if(e=function(e){return q.isObject(e)?e:JSON.parse(e)}(e),e[S.marketingCloudOrgID]){var t=e[S.marketingCloudOrgID];!function(e){q.isObject(e)&&S.setCustomerIDs(e)}(t.customerIDs),s(t.sdid)}}catch(e){throw new Error("`serverState` has an invalid format.")}},S._timeout=null,S._loadData=function(e,t,n,i){t=S._addQuerystringParam(t,"d_fieldgroup",e,1),i.url=S._addQuerystringParam(i.url,"d_fieldgroup",e,1),i.corsUrl=S._addQuerystringParam(i.corsUrl,"d_fieldgroup",e,1),X.fieldGroupObj[e]=!0,i===Object(i)&&i.corsUrl&&"XMLHttpRequest"===V.corsMetadata.corsType&&V.fireCORS(i,n,e)},S._clearTimeout=function(e){null!=S._timeout&&S._timeout[e]&&(clearTimeout(S._timeout[e]),S._timeout[e]=0)},S._settingsDigest=0,S._getSettingsDigest=function(){if(!S._settingsDigest){var e=S.version;S.audienceManagerServer&&(e+="|"+S.audienceManagerServer),S.audienceManagerServerSecure&&(e+="|"+S.audienceManagerServerSecure),S._settingsDigest=S._hash(e)}return S._settingsDigest},S._readVisitorDone=!1,S._readVisitor=function(){if(!S._readVisitorDone){S._readVisitorDone=!0;var e,t,n,i,r,a,o=S._getSettingsDigest(),s=!1,c=S.cookieRead(S.cookieName),u=new Date;if(c||b||S.discardTrackingServerECID||(c=S.cookieRead(oe.FIRST_PARTY_SERVER_COOKIE)),null==S._fields&&(S._fields={}),c&&"T"!==c)for(c=c.split("|"),c[0].match(/^[\-0-9]+$/)&&(parseInt(c[0],10)!==o&&(s=!0),c.shift()),c.length%2==1&&c.pop(),e=0;e<c.length;e+=2)t=c[e].split("-"),n=t[0],i=c[e+1],t.length>1?(r=parseInt(t[1],10),a=t[1].indexOf("s")>0):(r=0,a=!1),s&&("MCCIDH"===n&&(i=""),r>0&&(r=u.getTime()/1e3-60)),n&&i&&(S._setField(n,i,1),r>0&&(S._fields["expire"+n]=r+(a?"s":""),(u.getTime()>=1e3*r||a&&!S.cookieRead(S.sessionCookieName))&&(S._fieldsExpired||(S._fieldsExpired={}),S._fieldsExpired[n]=!0)));!S._getField(w)&&q.isTrackingServerPopulated()&&(c=S.cookieRead("s_vi"))&&(c=c.split("|"),c.length>1&&c[0].indexOf("v1")>=0&&(i=c[1],e=i.indexOf("["),e>=0&&(i=i.substring(0,e)),i&&i.match(oe.VALID_VISITOR_ID_REGEX)&&S._setField(w,i)))}},S._appendVersionTo=function(e){var t="vVersion|"+S.version,n=e?S._getCookieVersion(e):null;return n?te.areVersionsDifferent(n,S.version)&&(e=e.replace(oe.VERSION_REGEX,t)):e+=(e?"|":"")+t,e},S._writeVisitor=function(){var e,t,n=S._getSettingsDigest();for(e in S._fields)j(e)&&S._fields[e]&&"expire"!==e.substring(0,6)&&(t=S._fields[e],n+=(n?"|":"")+e+(S._fields["expire"+e]?"-"+S._fields["expire"+e]:"")+"|"+t);n=S._appendVersionTo(n),S.cookieWrite(S.cookieName,n,1)},S._getField=function(e,t){return null==S._fields||!t&&S._fieldsExpired&&S._fieldsExpired[e]?null:S._fields[e]},S._setField=function(e,t,n){null==S._fields&&(S._fields={}),S._fields[e]=t,n||S._writeVisitor()},S._getFieldList=function(e,t){var n=S._getField(e,t);return n?n.split("*"):null},S._setFieldList=function(e,t,n){S._setField(e,t?t.join("*"):"",n)},S._getFieldMap=function(e,t){var n=S._getFieldList(e,t);if(n){var i,r={};for(i=0;i<n.length;i+=2)r[n[i]]=n[i+1];return r}return null},S._setFieldMap=function(e,t,n){var i,r=null;if(t){r=[];for(i in t)j(i)&&(r.push(i),r.push(t[i]))}S._setFieldList(e,r,n)},S._setFieldExpire=function(e,t,n){var i=new Date;i.setTime(i.getTime()+1e3*t),null==S._fields&&(S._fields={}),S._fields["expire"+e]=Math.floor(i.getTime()/1e3)+(n?"s":""),t<0?(S._fieldsExpired||(S._fieldsExpired={}),S._fieldsExpired[e]=!0):S._fieldsExpired&&(S._fieldsExpired[e]=!1),n&&(S.cookieRead(S.sessionCookieName)||S.cookieWrite(S.sessionCookieName,"1"))},S._findVisitorID=function(t){return t&&("object"===e(t)&&(t=t.d_mid?t.d_mid:t.visitorID?t.visitorID:t.id?t.id:t.uuid?t.uuid:""+t),t&&"NOTARGET"===(t=t.toUpperCase())&&(t=F),t&&(t===F||t.match(oe.VALID_VISITOR_ID_REGEX))||(t="")),t},S._setFields=function(t,n){if(S._clearTimeout(t),null!=S._loading&&(S._loading[t]=!1),X.fieldGroupObj[t]&&X.setState(t,!1),t===E){!0!==X.isClientSideMarketingCloudVisitorID&&(X.isClientSideMarketingCloudVisitorID=!1);var i=S._getField(T);if(!i||S.overwriteCrossDomainMCIDAndAID){if(!(i="object"===e(n)&&n.mid?n.mid:S._findVisitorID(n))){if(S._use1stPartyMarketingCloudServer&&!S.tried1stPartyMarketingCloudServer)return S.tried1stPartyMarketingCloudServer=!0,void S.getAnalyticsVisitorID(null,!1,!0);i=S._generateLocalMID()}S._setField(T,i)}i&&i!==F||(i=""),"object"===e(n)&&((n.d_region||n.dcs_region||n.d_blob||n.blob)&&S._setFields(x,n),S._use1stPartyMarketingCloudServer&&n.mid&&S._setFields(R,{id:n.id})),S._callAllCallbacks(T,[i])}if(t===x&&"object"===e(n)){var r=604800;void 0!=n.id_sync_ttl&&n.id_sync_ttl&&(r=parseInt(n.id_sync_ttl,10));var a=W.getRegionAndCheckIfChanged(n,r);S._callAllCallbacks("MCAAMLH",[a]);var o=S._getField(N);(n.d_blob||n.blob)&&(o=n.d_blob,o||(o=n.blob),S._setFieldExpire(N,r),S._setField(N,o)),o||(o=""),S._callAllCallbacks(N,[o]),!n.error_msg&&S._newCustomerIDsHash&&S._setField("MCCIDH",S._newCustomerIDsHash)}if(t===R){var s=S._getField(w);s&&!S.overwriteCrossDomainMCIDAndAID||(s=S._findVisitorID(n),s?s!==F&&S._setFieldExpire(N,-1):s=F,S._setField(w,s)),s&&s!==F||(s=""),S._callAllCallbacks(w,[s])}if(S.idSyncDisableSyncs||S.disableIdSyncs)W.idCallNotProcesssed=!0;else{W.idCallNotProcesssed=!1;var c={};c.ibs=n.ibs,c.subdomain=n.subdomain,W.processIDCallData(c)}if(n===Object(n)){var u,l;d()&&S.isAllowed()&&(u=S._getField("MCOPTOUT"));var f=U.parseOptOut(n,u,F);u=f.optOut,l=f.d_ottl,S._setFieldExpire("MCOPTOUT",l,!0),S._setField("MCOPTOUT",u),S._callAllCallbacks("MCOPTOUT",[u])}},S._loading=null,S._getRemoteField=function(e,t,n,i,r){var a,o="",s=q.isFirstPartyAnalyticsVisitorIDCall(e),c={MCAAMLH:!0,MCAAMB:!0};if(d()&&S.isAllowed()){S._readVisitor(),o=S._getField(e,!0===c[e]);if(function(){return(!o||S._fieldsExpired&&S._fieldsExpired[e])&&(!S.disableThirdPartyCalls||s)}()){if(e===T||"MCOPTOUT"===e?a=E:"MCAAMLH"===e||e===N?a=x:e===w&&(a=R),a)return!t||null!=S._loading&&S._loading[a]||(null==S._loading&&(S._loading={}),S._loading[a]=!0,a===x&&(D=0),S._loadData(a,t,function(t){if(!S._getField(e)){t&&X.setState(a,!0);var n="";e===T?n=S._generateLocalMID():a===x&&(n={error_msg:"timeout"}),S._setFields(a,n)}},r)),S._registerCallback(e,n),o||(t||S._setFields(a,{id:F}),"")}else o||(e===T?(S._registerCallback(e,n),o=S._generateLocalMID(),S.setMarketingCloudVisitorID(o)):e===w?(S._registerCallback(e,n),o="",S.setAnalyticsVisitorID(o)):(o="",i=!0))}return e!==T&&e!==w||o!==F||(o="",i=!0),n&&i&&S._callCallback(n,[o]),e===T&&G.subscribed&&(G.callbacks&&G.callbacks.length&&G.callbacks.forEach(function(e){S._callCallback(e,[o])}),G.subscribed=!1,G.callbacks.length=0),o},S._setMarketingCloudFields=function(e){S._readVisitor(),S._setFields(E,e)},S._mapCustomerIDs=function(e){S.getAudienceManagerBlob(e,!0)},S._setAnalyticsFields=function(e){S._readVisitor(),S._setFields(R,e)},S._setAudienceManagerFields=function(e){S._readVisitor(),S._setFields(x,e)},S._getAudienceManagerURLData=function(e){var t=S.audienceManagerServer,n="",i=S._getField(T),r=S._getField(N,!0),a=S._getField(w),o=a&&a!==F?"&d_cid_ic=AVID%01"+encodeURIComponent(a):"";if(S.loadSSL&&S.audienceManagerServerSecure&&(t=S.audienceManagerServerSecure),t){var s,c,u,l=S.getCustomerIDs(!0);if(l)for(c in l){var d=l[c];if(!U.isObjectEmpty(d)){var f="nameSpaces"===c?"&d_cid_ns=":"&d_cid_ic=";for(s in d)j(s)&&(u=d[s],o+=f+encodeURIComponent(s)+"%01"+encodeURIComponent(u.id?u.id:"")+(u.authState?"%01"+u.authState:""))}}e||(e="_setAudienceManagerFields");var p="http"+(S.loadSSL?"s":"")+"://"+t+"/id",g="d_visid_ver="+S.version+(v&&-1!==p.indexOf("demdex.net")?"&gdpr=1&gdpr_consent="+v:"")+(D&&-1!==p.indexOf("demdex.net")?"&d_cf="+D:"")+"&d_rtbd=json&d_ver=2"+(!i&&S._use1stPartyMarketingCloudServer?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(S.marketingCloudOrgID)+"&d_nsid="+(S.idSyncContainerID||0)+(i?"&d_mid="+encodeURIComponent(i):"")+(S.idSyncDisable3rdPartySyncing||S.disableThirdPartyCookies?"&d_coppa=true":"")+(!0===k?"&d_coop_safe=1":!1===k?"&d_coop_unsafe=1":"")+(r?"&d_blob="+encodeURIComponent(r):"")+o,m=["s_c_il",S._in,e];return n=p+"?"+g+"&d_cb=s_c_il%5B"+S._in+"%5D."+e,{url:n,corsUrl:p+"?"+g,callback:m}}return{url:n}},S.appendVisitorIDsTo=function(e){try{var t=[[T,S._getField(T)],[w,S._getField(w)],["MCORGID",S.marketingCloudOrgID]];return S._addQuerystringParam(e,oe.ADOBE_MC,c(t))}catch(t){return e}},S.appendSupplementalDataIDTo=function(e,t){if(!(t=t||S.getSupplementalDataID(q.generateRandomString(),!0)))return e;try{var n=c([["SDID",t],["MCORGID",S.marketingCloudOrgID]]);return S._addQuerystringParam(e,oe.ADOBE_MC_SDID,n)}catch(t){return e}};var q={parseHash:function(e){var t=e.indexOf("#");return t>0?e.substr(t):""},hashlessUrl:function(e){var t=e.indexOf("#");return t>0?e.substr(0,t):e},addQueryParamAtLocation:function(e,t,n){var i=e.split("&");return n=null!=n?n:i.length,i.splice(n,0,t),i.join("&")},isFirstPartyAnalyticsVisitorIDCall:function(e,t,n){if(e!==w)return!1;var i;return t||(t=S.trackingServer),n||(n=S.trackingServerSecure),!("string"!=typeof(i=S.loadSSL?n:t)||!i.length)&&(i.indexOf("2o7.net")<0&&i.indexOf("omtrdc.net")<0)},isObject:function(e){return Boolean(e&&e===Object(e))},removeCookie:function(e){Z.remove(e,{domain:S.cookieDomain})},isTrackingServerPopulated:function(){return!!S.trackingServer||!!S.trackingServerSecure},getTimestampInSeconds:function(){return Math.round((new Date).getTime()/1e3)},parsePipeDelimetedKeyValues:function(e){return e.split("|").reduce(function(e,t){var n=t.split("=");return e[n[0]]=decodeURIComponent(n[1]),e},{})},generateRandomString:function(e){e=e||5;for(var t="",n="abcdefghijklmnopqrstuvwxyz0123456789";e--;)t+=n[Math.floor(Math.random()*n.length)];return t},normalizeBoolean:function(e){return"true"===e||"false"!==e&&e},parseBoolean:function(e){return"true"===e||"false"!==e&&null},replaceMethodsWithFunction:function(e,t){for(var n in e)e.hasOwnProperty(n)&&"function"==typeof e[n]&&(e[n]=t);return e}};S._helpers=q;var W=se(S,O);S._destinationPublishing=W,S.timeoutMetricsLog=[];var X={isClientSideMarketingCloudVisitorID:null,MCIDCallTimedOut:null,AnalyticsIDCallTimedOut:null,AAMIDCallTimedOut:null,fieldGroupObj:{},setState:function(e,t){switch(e){case E:!1===t?!0!==this.MCIDCallTimedOut&&(this.MCIDCallTimedOut=!1):this.MCIDCallTimedOut=t;break;case R:!1===t?!0!==this.AnalyticsIDCallTimedOut&&(this.AnalyticsIDCallTimedOut=!1):this.AnalyticsIDCallTimedOut=t;break;case x:!1===t?!0!==this.AAMIDCallTimedOut&&(this.AAMIDCallTimedOut=!1):this.AAMIDCallTimedOut=t}}};S.isClientSideMarketingCloudVisitorID=function(){return X.isClientSideMarketingCloudVisitorID},S.MCIDCallTimedOut=function(){return X.MCIDCallTimedOut},S.AnalyticsIDCallTimedOut=function(){return X.AnalyticsIDCallTimedOut},S.AAMIDCallTimedOut=function(){return X.AAMIDCallTimedOut},S.idSyncGetOnPageSyncInfo=function(){return S._readVisitor(),S._getField("MCSYNCSOP")},S.idSyncByURL=function(e){if(!S.isOptedOut()){var t=u(e||{});if(t.error)return t.error;var n,i,r=e.url,a=encodeURIComponent,o=W;return r=r.replace(/^https:/,"").replace(/^http:/,""),n=U.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],","),i=["ibs",a(e.dpid),"img",a(r),t.ttl,"",n],o.addMessage(i.join("|")),o.requestToProcess(),"Successfully queued"}},S.idSyncByDataSource=function(e){if(!S.isOptedOut())return e===Object(e)&&"string"==typeof e.dpuuid&&e.dpuuid.length?(e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid,S.idSyncByURL(e)):"Error: config or config.dpuuid is empty"},Ye(S,W),S._getCookieVersion=function(e){e=e||S.cookieRead(S.cookieName);var t=oe.VERSION_REGEX.exec(e);return t&&t.length>1?t[1]:null},S._resetAmcvCookie=function(e){var t=S._getCookieVersion();t&&!te.isLessThan(t,e)||S.removeCookie(S.cookieName)},S.setAsCoopSafe=function(){k=!0},S.setAsCoopUnsafe=function(){k=!1},function(){if(S.configs=Object.create(null),q.isObject(n))for(var e in n)j(e)&&(S[e]=n[e],S.configs[e]=n[e])}(),f();var K;S.init=function(){l()&&(I.optIn.fetchPermissions(h,!0),!I.optIn.isApproved(I.optIn.Categories.ECID))||K||(K=!0,function(){if(q.isObject(n)){S.idSyncContainerID=S.idSyncContainerID||0,k="boolean"==typeof S.isCoopSafe?S.isCoopSafe:q.parseBoolean(S.isCoopSafe),S.resetBeforeVersion&&S._resetAmcvCookie(S.resetBeforeVersion),S._attemptToPopulateIdsFromUrl(),S._attemptToPopulateSdidFromUrl(),S._readVisitor();var e=S._getField(P),t=Math.ceil((new Date).getTime()/oe.MILLIS_PER_DAY);S.idSyncDisableSyncs||S.disableIdSyncs||!W.canMakeSyncIDCall(e,t)||(S._setFieldExpire(N,-1),S._setField(P,t)),S.getMarketingCloudVisitorID(),S.getAudienceManagerLocationHint(),S.getAudienceManagerBlob(),S._mergeServerState(S.serverState)}else S._attemptToPopulateIdsFromUrl(),S._attemptToPopulateSdidFromUrl()}(),function(){if(!S.idSyncDisableSyncs&&!S.disableIdSyncs){W.checkDPIframeSrc();var e=function(){var e=W;e.readyToAttachIframe()&&e.attachIframe()};A.addEventListener("load",function(){O.windowLoaded=!0,e()});try{ie.receiveMessage(function(e){W.receiveMessage(e.data)},W.iframeHost)}catch(e){}}}(),function(){S.whitelistIframeDomains&&oe.POST_MESSAGE_ENABLED&&(S.whitelistIframeDomains=S.whitelistIframeDomains instanceof Array?S.whitelistIframeDomains:[S.whitelistIframeDomains],S.whitelistIframeDomains.forEach(function(e){var n=new Y(t,e),i=Q(S,n);ie.receiveMessage(i,e)}))}())}};Je.config=ue,C.Visitor=Je;var ze=Je,Qe=function(e){if(U.isObject(e))return Object.keys(e).filter(function(t){return""!==e[t]&&ue.getConfigs()[t]}).reduce(function(t,n){var i=ue.normalizeConfig(n,e[n]),r=U.normalizeBoolean(i);return t[n]=r,t},Object.create(null))},$e=Ge.OptIn,Ze=Ge.IabPlugin;return ze.getInstance=function(e,t){if(!e)throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");e.indexOf("@")<0&&(e+="@AdobeOrg");var n=function(){var t=C.s_c_il;if(t)for(var n=0;n<t.length;n++){var i=t[n];if(i&&"Visitor"===i._c&&i.marketingCloudOrgID===e)return i}}();if(n)return n;var i=Qe(t)||{};!function(e){C.adobe.optIn=C.adobe.optIn||function(){var t=U.pluck(e,["doesOptInApply","previousPermissions","preOptInApprovals","isOptInStorageEnabled","optInStorageExpiry","isIabContext","sameSiteCookie","secureCookie"]),n=e.optInCookieDomain||e.cookieDomain;n=n||ee(),n=n===window.location.hostname?"":n,t.optInCookieDomain=n;var i=new $e(t,{cookies:Z});if(t.isIabContext&&t.doesOptInApply){var r=new Ze;i.registerPlugin(r)}return i}()}(i||{});var r=e,a=r.split("").reverse().join(""),o=new ze(e,null,a);i.cookieDomain&&(o.cookieDomain=i.cookieDomain),i.sameSiteCookie&&i.secureCookie&&(o.configs={sameSiteCookie:i.sameSiteCookie,secureCookie:i.secureCookie}),function(){
    C.s_c_il.splice(--C.s_c_in,1)}();var s=U.getIeVersion();if("number"==typeof s&&s<10)return o._helpers.replaceMethodsWithFunction(o,function(){});var c=function(){try{return C.self!==C.parent}catch(e){return!0}}()&&(!function(e){return e.cookieWrite("TEST_AMCV_COOKIE","T",1),"T"===e.cookieRead("TEST_AMCV_COOKIE")&&(e.removeCookie("TEST_AMCV_COOKIE"),!0)}(o)||U.isFirefox()&&!i.whitelistParentDomain)&&C.parent?new W(e,i,o,C.parent):new ze(e,i,a);return o=null,c.init(),c},function(){function e(){ze.windowLoaded=!0}C.addEventListener?C.addEventListener("load",e):C.attachEvent&&C.attachEvent("onload",e),ze.codeLoadEnd=(new Date).getTime()}(),ze}();

  /* eslint-enable */

//tealium universal tag - utag.sender.1191 ut4.0.202506091435, Copyright 2025 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {

    /* Tealium VisitorAPIWrapper v1.0 */
    window.utag.tagsettings = window.utag.tagsettings || {};
    window.utag.tagsettings.adobe = window.utag.tagsettings.adobe || {};
    var vAPI = window.utag.tagsettings.adobe.visitorAPI = window.utag.tagsettings.adobe.visitorAPI || (function () {
      function logger(msg) {
        utag.DB("[" + id + "] : " + msg);
      }

      function Observer(orgId, config) {
        var observers = [],
          visitor = {},
          demdex = null,
          instance = null,
          /* gotcha: http://stackoverflow.com/questions/6891545/javascript-regexp-test-returns-false-even-though-it-should-return-true */
          regex = new RegExp("AMCV_" + window.encodeURIComponent(orgId) + "=(.*?)(;|$)"),
          active = false,
          util = {
            "hasOwn": function (o, a) {
              return o !== null && Object.prototype.hasOwnProperty.call(o, a);
            }
          },
          /* register all configured marketing cloud tags */
          mTags = (function () {
            var tags = [],
              tag,
              cfg = utag.loader.cfg,
              loadcond = {
                1: 1,
                4: 1
              };
            for (tag in cfg) {
              if (!util.hasOwn(cfg, tag)) {
                continue;
              }
              if (cfg[tag].tid && String(cfg[tag].tid).indexOf('1191') === 0 && loadcond[cfg[tag].load]) {
                tags.push(tag);
              }
            }
            return tags;
          }());

        function mTagsLoaded () {
          var loaded = true, id;
          for (var i = 0, len = mTags.length; i < len; i++) {
            id = mTags[i];
            if (!utag.sender[id]) {
              loaded = false;
              break;
            }
          }
          return loaded;
        }

        function notify(result) {
          instance = result;
          /* iterate object and reverse lookup auth flags */
          if (instance && instance.setCustomerIDs) {
            var aliases, alias;
            for (aliases in visitor) {
              if (util.hasOwn(visitor, aliases)) {
                alias = visitor[aliases];
                if (alias.authState && Visitor.AuthState[alias.authState] !== undefined) {
                  alias.authState = Visitor.AuthState[alias.authState];
                }
              }
            }
            instance.setCustomerIDs(visitor);
          }
          while (observers.length !== 0) {
            var nextCallback = observers.shift();
            nextCallback(instance);
          }
          return true;
        }

        this.sync = function (ids) {
          var alias;
          for (alias in ids) {
            if (util.hasOwn(ids, alias)) {
              if (!visitor[alias]) {
                visitor[alias] = ids[alias];
              }
            }
          }
          return true;
        };
        this.subscribe = function (callback) {
          var self = this;
          if (instance !== null) {
            return callback(instance);
          } else {
            observers.push(callback);
            if (!active) {
              logger("demdex org id [" + orgId + "] sync requested");
              (function retry(retries) {
                if (retries === 0) {
                  logger("demdex org id [" + orgId + "] sync timed out!");
                  active = false;
                  return notify(undefined);
                } else {
                  active = true;
                  /* demdex org id cookie is set and all 1..n marketing cloud tags fired */
                  if (regex.test(document.cookie) && /\|mcmid\|/i.test(window.decodeURIComponent(RegExp.$1)) && mTagsLoaded()) {
                    logger('demdex org id [' + orgId + '] sync completed');
                    return config ? notify(window.Visitor.getInstance(orgId, config)) : notify(window.Visitor.getInstance(orgId));
                  } else {
                    if (window.Visitor && window.Visitor.getInstance) {
                      if (config && !demdex) {
                        demdex = window.Visitor.getInstance(orgId, config);
                      }
                    }
                    window.setTimeout(function () {
                      logger("demdex org id [" + orgId + "] sync, waiting...");
                      retry(--retries);
                    }, 25);
                  }
                }
              }(80));
            }
          }
          return true;
        };
      }

      function VisitorAPIWrapper() {
        var observers = {};
        this._version = "1.0";
        this.getInstance = function (orgId, callback, config, customerIds) {
          if (!orgId) {
            return callback(undefined);
          }

          orgId = !/@AdobeOrg$/.test(orgId) ? orgId + "@AdobeOrg" : orgId;
          if (!observers[orgId]) {
            if (!config) {
              logger("demdex org id [" + orgId + "] sync error. marketing cloud tag missing demdex config");
              return callback(undefined);
            }
            observers[orgId] = new Observer(orgId, config);
          }
          if (customerIds) {
            observers[orgId].sync(customerIds);
          }
          observers[orgId].subscribe(callback);
          return true;
        };
      }

      return new VisitorAPIWrapper();
    }());

    var u = { "id": id };
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.41
    /* utag.js version 4.26 or above is required to avoid errors with this loader function */
    var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) { u.loader = function (o, a, b, c, l, m) { utag.DB(o); a = document; if (o.type == "iframe") { m = a.getElementById(o.id); if (m && m.tagName == "IFRAME") { b = m; } else { b = a.createElement("iframe"); } o.attrs = o.attrs || {}; utag.ut.merge(o.attrs, { "height": "1", "width": "1", "style": "display:none" }, 0); } else if (o.type == "img") { utag.DB("Attach img: " + o.src); b = new Image(); } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; } if (o.id) { b.id = o.id; } for (l in utag.loader.GV(o.attrs)) { b.setAttribute(l, o.attrs[l]); } b.setAttribute("src", o.src); if (typeof o.cb == "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState == "complete" || this.readyState == "loaded") { this.onreadystatechange = null; o.cb(); } }; } } if (o.type != "img" && !m) { l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function (e) { return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase(); }; } else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    u.hasOwn = function (o, a) { return o != null && Object.prototype.hasOwnProperty.call(o, a); };
    u.isEmptyObject = function (o, a) { for (a in o) { if (u.hasOwn(o, a)) return false; } return true; };

    u.ev = { "view": 1 };
    u.initialized = false;
    u.adobeInstance;

    u.map_func = function (arr, obj, item) {
      var i = arr.shift();
      obj[i] = obj[i] || {};
      if (arr.length > 0) {
        u.map_func(arr, obj[i], item);
      } else {
        obj[i] = item;
      }
    };

    u.clearEmptyKeys = function (object) {
      for (var key in object) {
        if (object[key] === "" || object[key] === undefined) {
          delete object[key];
        }
      }
      return object;
    };

    u.eventsNameByKey = {
      setCustomerID: 'setCustomerID',
    };

    u.sendEvents = function (instance) {
      u.data.events.forEach(function (eventName) {
        if (eventName === u.eventsNameByKey.setCustomerID) {
          instance.setCustomerIDs(u.data.customer_ids);
          utag.DB("callEvent:setCustomerIDs");
        }
      })
    }

      u.map={};
  u.extend=[];


    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        loadLibrary();
        utag.DB("send:339");
        utag.DB(b);

        var c, d, e, f;
        /* https://marketing.adobe.com/resources/help/en_US/mcvid/mcvid-cookiedomain.html */
        u.data = {
          "adobe_org_id": "06660D1556E030D17F000101@AdobeOrg",
          "config": {
            "trackingServer": "metrics-sentry.cvshealth.com",
            "trackingServerSecure": "metrics-sentry.cvshealth.com", /* for clients with c-name setup (first party cookie alias) */
            "marketingCloudServer": "",
            "marketingCloudServerSecure": "", /* set adobe visitor api cookieDomain explicitly http://rossscrivener.co.uk/blog/javascript-get-domain-exclude-subdomain */
            "cookieDomain": (function () {
              return utag.loader.RC('utag_main').vapi_domain || (function () {
                var i = 0, d = document.domain, p = d.split("."), s = "_vapi" + new Date().getTime();
                while (i < (p.length - 1) && document.cookie.indexOf(s + "=" + s) === -1) {
                  d = p.slice(-1 - (++i)).join(".");
                  document.cookie = s + "=" + s + ";domain=" + d + ";";
                }
                document.cookie = s + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + d + ";";
                utag.loader.SC("utag_main", { "vapi_domain": d });
                return d;
              }());
            }())
          }, /* visitor id sync format 'customer_ids' : { // predefined alias 1 'system1_cid' : { 'id' : [VID1], 'authState' : 'AUTHENTICATED' }, // predefined alias 2 'system2_cid' : { 'id' : [VID2], 'authState' : 'AUTHENTICATED' } } */
          "customer_ids": {},
          events: []
        };

        // Start tag-scoped extensions
        
          utag.DB("send:339:EXTENSIONS");
        utag.DB(b);
        // End tag-scoped extensions

        c = [];

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.map_func(e[f].split("."), u.data, b[d]);
            }
          } else {
            var event_destinations = d.split(':');
            if (
              event_destinations.length === 2 &&
              String(b[event_destinations[0]]) === String(event_destinations[1])
            ) {
              if (u.map[d]) {
                u.data.events = u.data.events.concat(u.map[d].split(","));
              }
            }
          }
        }
        utag.DB("send:339:MAPPINGS");
        utag.DB(u.data);
        // End Mapping

        // Report required config is missing, and stop tag from firing.
        if (!u.data.adobe_org_id) {
          utag.DB(u.id + ": Tag not fired: Required attribute not populated [adobe_org_id]");
          return;
        }

        if (u.initialized) {
          u.sendEvents(u.adobeInstance)
        } else if (!u.initialized) {
          u.initialized = !0;
          vAPI.getInstance(u.data.adobe_org_id,
            function (instance) {
              /* do something after? */
              u.adobeInstance = instance;
              u.sendEvents(u.adobeInstance)
            },
            u.clearEmptyKeys(u.data.config), u.data.customer_ids);
        }
        utag.DB("send:339:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("339", "cvs.fs"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag
(function(){ if(typeof utag!='undefined' && !utag_condload){utag.initcatch=true;for(var i in utag.loader.GV(utag.loader.cfg)){var b=utag.loader.cfg[i];if(b.load!=4){utag.initcatch=false;break};if(b.wait==1){utag.initcatch=false;break}};if(utag.initcatch)utag.handler.INIT();} })();