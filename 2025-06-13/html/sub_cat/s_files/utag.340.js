//~~tv:19063.am2120.20190320
//~~tc: Add support for linkType and linkName mappings
//~~tc: Update to API version 2.12.0

//ESLint configurations
/*global utag Visitor*/
/*eslint-disable*/

var s=s_gi("cvshealthretailwebsdkprod")
s.account="cvshealthretailwebsdkprod";

/************************** CONFIG SECTION **************************/
s.trackDownloadLinks=false;
s.trackExternalLinks=false;
s.trackInlineStats=true;
s.linkInternalFilters="javascript:,cvs.com";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
s.usePlugins=true;
s.currencyCode="USD"; // override default with E-Commerce Extension
s.visitorNamespace = "cvshealth";
s.trackingServer="metrics-sentry.cvshealth.com";
s.trackingServerSecure="metrics-sentry.cvshealth.com";
s.charSet = "UTF-8";

s.expectSupplementalData=true;
s.debugTracking=utag.cfg.utagdb;

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.12.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.12.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.ac;q||(q=null);var p=k,m,s;try{for(m=p.parent,s=p.location;m&&m.location&&s&&""+m.location!=""+s&&p.location&&""+m.location!=""+p.location&&m.location.host==s.host;)p=m,m=p.parent}catch(u){}a.D=function(a){try{console.log(a)}catch(b){}};a.Pa=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.Ib=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ha&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ha=0<d?c.substring(d):c}return a.Ha};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.Ib(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1===d&&(d=new Date,g=d.getYear(),d.setYear(g+2+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.Fb=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.tb(a,function(){}))};a.tb=function(a,b){for(var d in a)a.hasOwnProperty(d)&&"function"===typeof a[d]&&(a[d]=b)};
a.M=[];a.fa=function(c,b,d){if(a.Ia)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ga)for(a.ga=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ga=0,a.delayReady())});f=1;e=0}else d||a.o("_d")&&(f=1);f&&(a.M.push({m:c,a:b,t:e}),a.ga||setTimeout(a.delayReady,
a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.o("_d")?b=1:a.za();0<a.M.length;){d=a.M.shift();if(b&&!d.t&&d.t>c){a.M.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Ia=1;a[d.m].apply(a,d.a);a.Ia=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.fa("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=
c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.Q,(h=a.lightTrackVars)&&(h=","+h+","+a.ka.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Zb,f=a[e].Yb));h&&(h=","+h+","+a.G.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.q=function(c,
b,d,f,e){var g="",h,l,k,n,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.q(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==
f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),n=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Pa(n)&&("prop"==k?h="c"+n:"eVar"==k?h="v"+n:"list"==k?h="l"+n:"hier"==k&&(h="h"+n,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.Lb=function(){var c="",b,d,f,e,g,h,l,k,n="",m="",p=e="",r=a.V();if(a.lightProfileID)b=a.Q,(n=a.lightTrackVars)&&(n=","+n+","+a.ka.join(",")+
",");else{b=a.g;if(a.pe||a.linkType)n=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].Zb,m=a[e].Yb));n&&(n=","+n+","+a.G.join(",")+",");m&&(m=","+m+",",n&&(n+=",events,"));a.events2&&(p+=(""!=p?",":"")+a.events2)}if(r&&a.xa()&&r.getCustomerIDs){e=q;if(g=r.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.q("cid",e))}a.AudienceManagement&&
a.AudienceManagement.isReady()&&(c+=a.q("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&p?(g=p,p=""):"marketingCloudOrgID"==e&&r&&a.X("ECID")&&(g=r.marketingCloudOrgID));if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e=
"D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&
a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;
case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":p&&(g+=(""!=g?",":"")+p);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=
(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.q("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.q("mts",a[e],n,e));g="";break;default:a.Pa(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==
f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}a.ja&&(c+="&lrt="+a.ja,a.ja=null);return c};a.C=function(a){var b=a.tagName;if("undefined"!=""+a.ec||"undefined"!=""+a.Ub&&"HTML"!=(""+a.Ub).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.La=function(a){var b=k.location,
d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.N=function(c){var b=a.C(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+
f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.La(c),e)?{id:e.substring(0,100),type:g}:0};a.bc=function(c){for(var b=a.C(c),d=a.N(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.C(c),d=a.N(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Tb=function(){var c,b,d=a.linkObject,
f=a.linkType,e=a.linkURL,g,h;a.la=1;d||(a.la=0,d=a.clickObject);if(d){c=a.C(d);for(b=a.N(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.C(d),b=a.N(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.la=1;!e&&d&&(e=a.La(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,n=0,p;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),
g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(p=g[h])&&l.substring(l.length-(p.length+1))=="."+p&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.Oa(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=
0;h<g.length;h++)p=g[h],0<=l.indexOf(p)&&(n=1);n?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Mb=function(){var c=a.la,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||
f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.Pb()){var b={},d=0,e=a.ob(),g=e?e.split("&"):0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.q("c",h)+
(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),
h--);a.ub(e)}}}return c};a.ob=function(){if(a.useLinkTrackSessionStorage){if(a.Ca())return k.sessionStorage.getItem(a.R)}else return a.cookieRead(a.R)};a.Ca=function(){return k.sessionStorage?!0:!1};a.ub=function(c){a.useLinkTrackSessionStorage?a.Ca()&&k.sessionStorage.setItem(a.R,c):a.cookieWrite(a.R,c)};a.Nb=function(){if(!a.Xb){var c=new Date,b=p.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",q="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l=
"1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.cc(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
q=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=q;a.homepage=m;a.Xb=1}};a.S={};a.loadModule=function(c,b){var d=a.S[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.S[c]=a[c]=d;d.jb=function(){return d.rb};d.vb=function(b){if(d.rb=b)a[c+"_onLoad"]=b,a.fa(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.jb,set:d.vb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.fa(c+"_onLoad",[a,d],1)||b(a,d))};a.o=function(c){var b,d;for(b in a.S)if(!Object.prototype[b]&&(d=a.S[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Pb=function(){return a.ActivityMap&&a.ActivityMap._c?!0:!1};a.Qb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);
if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.T=function(c,b){var d,f,e,g,h,k;for(d=0;2>d;d++)for(f=0<d?a.Da:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])h[k]||(h[k]=a[g][k]);a[g]=h}};a.Za=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Da:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.Hb=function(a){var b,d,f,e,g,h=0,k,m="",n="";if(a&&
255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(k=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&k)))){if((a=k.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?m+=(m?"&":"")+
e:n+=(n?"&":"")+e;m&&n?k=m+"&"+n:n=""}d=253-(k.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+k}return a};a.cb=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ca=!1;a.J=!1;a.xb=function(){a.J=!0;a.H()};a.K=!1;a.U=!1;a.yb=function(c){a.marketingCloudVisitorID=
c.MCMID;a.visitorOptedOut=c.MCOPTOUT;a.analyticsVisitorID=c.MCAID;a.audienceManagerLocationHint=c.MCAAMLH;a.audienceManagerBlob=c.MCAAMB;a.K=!1;a.U=!0;a.H()};a.bb=function(c){a.maxDelay||(a.maxDelay=250);return a.o("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.aa=!1;a.I=!1;a.za=function(){a.I=!0;a.H()};a.isReadyToTrack=function(){var c=!0;if(!a.nb()||!a.mb())return!1;a.xa()||(c=!1);a.qb()||(c=!1);return c};a.nb=function(){a.ca||a.J||(a.cb(a.xb)?a.J=!0:a.ca=!0);return a.ca&&!a.J?!1:!0};
a.mb=function(){var c=a.va();if(c)if(a.ta||a.ba)if(a.ta){if(!c.isApproved(c.Categories.ANALYTICS))return!1}else return!1;else return c.fetchPermissions(a.sb,!0),a.ba=!0,!1;return!0};a.X=function(c){var b=a.va();return b&&!b.isApproved(b.Categories[c])?!1:!0};a.va=function(){return k.adobe&&k.adobe.optIn?k.adobe.optIn:null};a.xa=function(){var c=a.V();return c&&c.getVisitorValues&&(a.K||a.U||(a.K=!0,c.getVisitorValues(a.yb)),a.K&&!a.U)?!1:!0};a.V=function(){var c=a.visitor;c&&!c.isAllowed()&&(c=null);
return c};a.qb=function(){a.aa||a.I||(a.bb(a.za)?a.I=!0:a.aa=!0);return a.aa&&!a.I?!1:!0};a.ba=!1;a.sb=function(){a.ba=!1;a.ta=!0};a.l=q;a.r=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Cb=c;f.Bb=b;f.zb=d;a.l==q&&(a.l=[]);a.l.push(f);0==a.r&&(a.r=setInterval(a.H,100))};a.H=function(){var c;if(a.isReadyToTrack()&&(a.wb(),a.l!=q))for(;0<a.l.length;)c=a.l.shift(),c.Bb.apply(c.Cb,c.zb)};a.wb=function(){a.r&&(clearInterval(a.r),a.r=0)};a.lb=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=
[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Za(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.Jb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/
108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset()),h=a.V();a.o("_s");a.lb(c)||(b&&a.T(b),c&&(d={},a.Za(d,0),a.T(c)),a.Qb()&&!a.visitorOptedOut&&(a.wa()||(a.fid=a.Jb()),a.Tb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||
(a.pageURL=f.href?f.href:f),a.referrer||a.$a||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:p.document.referrer),a.$a=1,a.referrer=a.Hb(a.referrer),a.o("_g")),a.Mb()&&!a.abort&&(h&&a.X("TARGET")&&!a.supplementalDataID&&h.getSupplementalDataID&&(a.supplementalDataID=h.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.X("AAM")||(a.contextData["cm.ssf"]=1),a.Nb(),g+=a.Lb(),a.pb(e,g),a.o("_t"),a.referrer=""))),c&&a.T(d,1));
a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.Ba=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Ba.push([c,b]):a.debugTracking&&a.D("DEBUG: Non function type passed to registerPreTrackCallback")};a.gb=function(c){a.ua(a.Ba,c)};a.Aa=[];a.registerPostTrackCallback=function(c){for(var b=[],d=
1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Aa.push([c,b]):a.debugTracking&&a.D("DEBUG: Non function type passed to registerPostTrackCallback")};a.fb=function(c){a.ua(a.Aa,c)};a.ua=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1].slice();e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.D(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.k=c,a.v=e);return a.track(f)};
a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.pb=function(c,b){var d=a.hb()+
"/"+c+"?AQB=1&ndh=1&pf=1&"+(a.ya()?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.gb(d);a.eb(d);a.W()};a.hb=function(){var c=a.ib();return"http"+(a.ssl?"s":"")+"://"+c+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(a.ya()?"10":"1")+"/JS-"+a.version+(a.Wb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")};a.ya=function(){return a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks};a.ib=function(){var c=a.dc,b=a.trackingServer;b?a.trackingServerSecure&&a.ssl&&
(b=a.trackingServerSecure):(c=c?(""+c).toLowerCase():"d1","d1"==c?c="112":"d2"==c&&(c="122"),b=a.kb()+"."+c+".2o7.net");return b};a.kb=function(){var c=a.visitorNamespace;c||(c=a.account.split(",")[0],c=c.replace(/[^0-9a-z]/gi,""));return c};a.Ya=/{(%?)(.*?)(%?)}/;a.$b=RegExp(a.Ya.source,"g");a.Gb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.$b),e=0;e<f.length;++e){var g=f[e],h=g.match(a.Ya),
k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.Kb());d.c=d.c.replace(g,a.escape(k))}}};a.Kb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.j(4,c.getFullYear())+"-"+a.j(2,c.getMonth()+1)+"-"+a.j(2,c.getDate())+"T"+a.j(2,c.getHours())+":"+a.j(2,c.getMinutes())+":"+a.j(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.j(2,b.getUTCHours())+":"+a.j(2,b.getUTCMinutes())};a.j=function(a,b){return(Array(a+
1).join(0)+b).slice(-a)};a.pa={};a.doPostbacks=function(c){if("object"==typeof c)if(a.Gb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.pa[d.id]=new Image,
a.pa[d.id].alt="",a.pa[d.id].src=d.c)}};a.eb=function(c){a.i||a.Ob();a.i.push(c);a.ia=a.B();a.Wa()};a.Ob=function(){a.i=a.Rb();a.i||(a.i=[])};a.Rb=function(){var c,b;if(a.oa()){try{(b=k.localStorage.getItem(a.ma()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.oa=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ma=function(){var c=0;a.i&&(c=a.i.length);a.p&&c++;return c};a.W=function(){if(a.p&&(a.A&&a.A.complete&&a.A.F&&a.A.ra(),a.p))return;a.Na=q;if(a.na)a.ia>
a.P&&a.Ua(a.i),a.qa(500);else{var c=a.Ab();if(0<c)a.qa(c);else if(c=a.Ja())a.p=1,a.Sb(c),a.Vb(c)}};a.qa=function(c){a.Na||(c||(c=0),a.Na=setTimeout(a.W,c))};a.Ab=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.B()-a.Sa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ja=function(){if(0<a.i.length)return a.i.shift()};a.Sb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.D(b)}};
a.wa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Z=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Z=!0,a.Y=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.Y=function(a){return k.$.parseJSON(a)},a.Z=!0):a.Y=function(){return null};a.Vb=function(c){var b,d,f;a.wa()&&2047<c.length&&(a.ab()&&(d=1,b=new XMLHttpRequest),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Z?b.Ea=!0:b=0));!b&&a.Xa&&(c=c.substring(0,2047));
!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=2):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||(b.abort=function(){b.src=q}));b.Ta=Date.now();b.Ga=function(){try{b.F&&(clearTimeout(b.F),b.F=0)}catch(a){}};b.onload=b.ra=function(){b.Ta&&(a.ja=Date.now()-
b.Ta);a.fb(c);b.Ga();a.Eb();a.da();a.p=0;a.W();if(b.Ea){b.Ea=!1;try{a.doPostbacks(a.Y(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ka=function(){b.Ga();(a.trackOffline||a.na)&&a.p&&a.i.unshift(a.Db);a.p=0;a.ia>a.P&&a.Ua(a.i);a.da();a.qa(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.ra():b.Ka())};a.Sa=a.B();if(1==d)f=c.indexOf("?"),d=c.substring(0,f),f=c.substring(f+1),f=f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,""),b.open("POST",d,!0),b.withCredentials=!0,b.send(f);
else if(b.src=c,2==d){if(a.Qa)try{f.removeChild(a.Qa)}catch(e){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Qa=a.A}b.F=setTimeout(function(){b.F&&(b.complete?b.ra():(a.trackOffline&&b.abort&&b.abort(),b.Ka()))},5E3);a.Db=c;a.A=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.L||a.v)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ea=setTimeout(a.da,a.forcedLinkTrackingTimeout)};a.ab=function(){return"undefined"!==typeof XMLHttpRequest&&"withCredentials"in
new XMLHttpRequest?!0:!1};a.Eb=function(){if(a.oa()&&!(a.Ra>a.P))try{k.localStorage.removeItem(a.ma()),a.Ra=a.B()}catch(c){}};a.Ua=function(c){if(a.oa()){a.Wa();try{k.localStorage.setItem(a.ma(),k.JSON.stringify(c)),a.P=a.B()}catch(b){}}};a.Wa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ja()}};a.forceOffline=function(){a.na=!0};a.forceOnline=function(){a.na=!1};a.ma=function(){return a.offlineFilename+"-"+a.visitorNamespace+
a.account};a.B=function(){return(new Date).getTime()};a.Oa=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Wb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.T(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||
0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>e)return g;b=
d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){if(document.documentMode)return document.documentMode;for(var a=7;4<a;a--){var b=document.createElement("div");b.innerHTML="\x3c!--[if IE "+a+"]><span></span><![endif]--\x3e";if(b.getElementsByTagName("span").length)return a}return null}};
a.G="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.G.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ka="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.Q=a.ka.slice(0);a.Da="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout useLinkTrackSessionStorage trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.Q.push("prop"+m)),a.g.push("eVar"+m),a.Q.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a".split(" ");a.g=a.g.concat(m);a.G=a.G.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.R="s_sq";a.Sa=0;a.ia=0;a.P=0;a.Ra=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Xa=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Xa=!0}}catch(x){}a.da=function(){a.ea&&(k.clearTimeout(a.ea),a.ea=q);a.k&&a.L&&a.k.dispatchEvent(a.L);a.v&&("function"==typeof a.v?
a.v():a.k&&a.k.href&&(a.d.location=a.k.href));a.k=a.L=a.v=0};a.Va=function(){a.b=a.d.body;a.b?(a.u=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Fa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.u,!1);else{a.b.removeEventListener("click",a.u,!0);a.Fa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.O&&a.O==a.clickObject||!(a.clickObject.tagName||
a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var h=a.O=a.clickObject;a.ha&&(clearTimeout(a.ha),a.ha=0);a.ha=setTimeout(function(){a.O==h&&(a.O=0)},1E4);f=a.Ma();a.track();if(f<a.Ma()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Oa(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.k=c.target,a.L=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.u):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Fa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.u,!0)),a.b.addEventListener("click",a.u,!1))):setTimeout(a.Va,30)};a.Fb();a.fc||(r?a.setAccount(r):a.D("Error, missing Report Suite ID in AppMeasurement initialization"),a.Va(),a.loadModule("ActivityMap"))}
function s_gi(r){var a,k=window.s_c_il,q,p,m=r.split(","),s,u,t=0;if(k)for(q=0;!t&&q<k.length;){a=k[q];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(p=a.account?a.account:a.oun,p=a.allAccounts?a.allAccounts:p.split(","),s=0;s<m.length;s++)for(u=0;u<p.length;u++)m[s]==p[u]&&(t=1);q++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,q,p;if(a)for(k=0;k<a.length;k++)q=a[k],p=s_gi(q.oun),p.setAccount(q.un),p.setTagContainer(q.tagContainerName);r.s_giq=0}s_pgicq();

// Integrate Module

function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}

// End Integrate Module


//Removed activity map module code

/*eslint-enable*/

//tealium universal tag - utag.sender.19063.am161 v4.0.202506091435, Copyright 2025 Tealium.com Inc. All Rights Reserved.
try{
  (function(id,loader){

    /**
     * Tealium VisitorAPIWrapper v1.0
     */
    window.utag.tagsettings = window.utag.tagsettings || {};
    window.utag.tagsettings.adobe = window.utag.tagsettings.adobe || {};
    var vAPI = window.utag.tagsettings.adobe.visitorAPI = window.utag.tagsettings.adobe.visitorAPI || (function() { return {getInstance : function(orgID, callback) {
        if (orgID) {
          utag.DB("["+u.id+"] OrgID used, but no 'Adobe Marketing Cloud ID Service' tag detected");
        }
        return callback();
      }}; }());

    var u = {"id" : id};
    u.queue = [];
    utag.o[loader].sender[id] = u;
    u.ev={'view':1,'link':1,'video':1};
    u.o=s;
    u.varlist={pageName:'pageName',channel:'ch',campaign:'v0',hier1:'h1',hier2:'h2',hier3:'h3',hier4:'h4'};for(var i=1;i<76;i++){u.varlist['prop'+i]='c'+i;u.varlist['eVar'+i]='v'+i;}
    u.combineLinkVar = false;
    u.pushlt=function(l,v){if(typeof l!="undefined")l.push(v)};

    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf
    u.typeCheck = function(linkTrack, type){
      if(u.typeOf(linkTrack) === "string"){
        u[type] = linkTrack.split(",");
      }else if(u.typeOf(linkTrack) === "array"){
        u[type] = linkTrack;
      }else{
        u[type] = [];
      }
    }

  u.map={"tool_type":"eVar1","search_term":"prop2,eVar6","qp.WT.ac":"eVar2","qp.ICID":"eVar2","qp.icid":"eVar2","search_results":"eVar7","search_results:":"event6","search_results:0":"event7","plan_name":"prop18","breadcrumb":"prop19","fulfillment_method":"prop29,eVar15","user_type":"eVar32","cart_type":"eVar85","benefit":"eVar86","field_errors":"list1","account_creation_start:1":"event54","account_creation_complete:1":"event55","link_name":"linkName","order_confirm_count":"VALUE_event107","refinement":"eVar55","cart_count":"prop25","prodView:prodView":"prodView","scAdd:scAdd":"scAdd","scRemove:scRemove":"scRemove","scRemove:1":"scRemove","order_total":"VALUE_event69","purchase_id":"purchaseID","order_id":"eVar95,purchaseID","finding_method":"eVar66","reviews_shown:1":"event45","product_sku_id":"PRODUCTS_id,PRODUCTS_eVar71","linkName":"linkName","linkType":"linkType","flow_name":"eVar78","order_level_discount":"VALUE_event35","order_tax_amount":"VALUE_event37","order_shipping_amount":"VALUE_event38","order_pre_discount":"VALUE_event69","login_success:1":"event22","form_complete:1":"event11","login_attempts":"eVar34","delivery_price":"eVar107","cart_elig":"eVar104","scCheckout:scCheckout":"scCheckout","order_submit:1":"event34","enroll_type":"eVar3","pay_method":"eVar27","order_type":"eVar14","rx_count":"VALUE_event63","carepass_coupon_discount":"VALUE_event85","free_shipping_savings":"VALUE_event84","coupon_count":"VALUE_event83","order_status":"eVar17","page_flag":"prop15","state_authentication":"eVar31","savedCreditCards":"prop15","pageErrors":"list1","scenario":"prop13","state_extracare_link":"eVar59","coupon":"eVar61","paymentOption":"prop21","couponCount":"prop27","free_shipping":"eVar68","ecCard":"eVar80","search_type":"eVar67","product_rating":"eVar73","store_id":"eVar89","hier2":"hier2","searchType":"eVar20","userSearchTerm":"eVar19","ecOffer":"eVar60","ecSend:1":"event58","site_error:1":"event4","scView:scView":"scView","scView:1":"scView","total_results":"eVar7","product_quantity":"PRODUCTS_event33,PRODUCTS_quantity","list1":"list1","carepass_status":"eVar58","fs_component":"eVar170","fs_pagetype":"eVar165","fs_department":"eVar166","fs_category":"eVar167","fs_subcategory":"eVar168","fs_subsubcategory":"eVar169","bopis_store_eligible":"eVar175","bopis_substitution_count":"VALUE_event176","form_name":"eVar10","form_event:form start":"event10","loginmethod":"eVar33","entry_method":"eVar46","couponsDisplayed":"VALUE_event82","ceb_total":"VALUE_event178","ceb_threshold":"VALUE_event179","page_type":"pageType","search_suggestion_line_number":"VALUE_event198","banner_name":"eVar197,prop73","component_name":"eVar198,prop53","cart_id":"eVar179","sf":"eVar181","banner_displayed:1":"event51","icid":"eVar2","shipping_exposed_filter:1":"event168","pickup_exposed_filter:1":"event169","product_available:1":"event170","enableSplitFulfillment":"eVar185","sms_opt_in:1":"event160","bopis_eligible_stores:1":"event212","bopis_eligible_total:1":"event205","bopis_eligible_only:1":"event206","instock_total:1":"event207","delivery_total:1":"event208","delivery_only:1":"event209","items_total:1":"event210","outofstock_total:1":"event211","search_position_count":"eVar180","cp.easy_xfer":"eVar187","medallia_formID_formType":"eVar200","medallia_feedback_UUID":"eVar199","medallia_custom_event:MDigital_Invite_Displayed":"event200","medallia_custom_event:MDigital_Form_Displayed":"event201","medallia_custom_event:MDigital_Submit_Feedback":"event202","badge_count":"VALUE_event240","badge_name":"prop65","cp.s2cincart":"eVar188","coupon_type":"eVar189","coupon_subtype":"eVar177","promocode_applied:1":"event222","deal_applied:1":"event223","savings_applied:1":"event224","savings_displayed:1":"event225","savings_amount_applied":"VALUE_event226","bopis_sku_add:1":"event214","bopis_sku_remove:1":"event215","cp.st":"c.kmsiCookie","vaccineName":"eVar182","global_cookie":"eVar142","providerID":"eVar183","question_answer":"prop22","flow:start":"event56","flow:complete":"event57","selfservice_complete":"event29","selfservice_start":"event28","self_service_type":"eVar37","productPosition":"eVar92","productPageNum":"eVar93","scroll_depth":"prop4","nw_rx_pickup_count":"event104","linkExtraInfo":"prop14","program_value":"eVar103","testName":"eVar126","cp.aat3":"eVar143","externalCampaign":"campaign,eVar39,eVar45,eVar62","pageSubType":"eVar165","pageHierarchy":"eVar166","videoComplete:1":"event31","videoDisplayed:1":"event23","videoMOne:1":"event25","videoMThree:1":"event27","videoMTwo:1":"event26","videoStart:1":"event24","videoTitle":"eVar70","qp.intref":"eVar16","qp.micid":"eVar117","page_url":"eVar49,prop23","sl_cookie":"prop46","storeState":"eVar130","bot_value":"eVar164","store_eligible":"eVar175","locationPromptDisplayed":"event62","sddtotal":"event139","qm_session_id_cookie":"eVar22","googleLiaMatched":"event156","global_component":"prop26","feature_experience":"list2","googleLiaNotMatched":"event251","idenPage":"event257","nonidenPage":"event258","overlayName":"eVar13","cp.sp_bucket":"eVar195","overlayDisplayed":"event50","adobe_page_name":"eVar4","plan_name_otchs":"eVar28","lifestyleShelf":"prop6","pageVersionDisplayed":"eVar29","otchs_test":"prop17","pageComponentDisplay":"list3","authentication_method":"eVar25","user_agent":"eVar53","platform":"eVar41","nullSearches":"event7","internalSearches":"event6","clickCall":"VALUE_event20","fs_tech_modern":"eVar151","state_logged_in":"eVar35","product_price_cj":"PRODUCTS_event32,PRODUCTS_price","lcpTime":"event280","preciselyTypeAheadCount":"VALUE_event281","savingsRemoved":"event282","autoAppliedSavings":"event283","typeaheadSearchValues":"eVar87","onsiteSearchFeatures":"eVar26","searchClassification":"prop74"};
  u.extend=[function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('otchs')>-1||b['dom.pathname'].toString().indexOf('benefits')>-1||b['dom.pathname'].toString().indexOf('realms')>-1){b['plan_name_otchs']=b['plan_name']} } catch(e){ utag.DB(e); }  },
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
if (utag.data['dom.pathname'].indexOf('/otchs') > -1 || utag.data['dom.pathname'].indexOf('/benefits')  > -1 || utag.data['dom.pathname'].indexOf('/realms')  > -1 ) {
	s.account = "cvshealthotchswebsdk";
} 
else {
	s.account = "cvshealthretailwebsdkprod";
}

s.trackingServer = "metrics-sentry.cvshealth.com"; 

//update to server
//Old Method for setting visitorID; replaced with VisitorID API code
//s.visitor = Visitor.getInstance("06660D1556E030D17F000101@AdobeOrg");

s.currencyCode = "USD";

//https://docs.adobe.com/content/help/en/analytics/analyze/activity-map/link-tracking/activitymap-link-tracking-methodology.html#configuration-vars
//Exclude users on https://www.cvs.com/pharmacy/manage/ice_notification_settings.jsp
//s.ActivityMap.regionExclusions = 'headingOne';

/* Link Tracking Config */
s.trackDownloadLinks = true;
s.trackExternalLinks = true;
s.trackInlineStats = false;
s.linkInternalFilters = "javascript:,cvs.com";
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,docx,xlsx,ppt,pptx";
s.linkLeaveQueryString = false;
//s.linkTrackVars = "prop75";
s.linkTrackEvents = "";
s.usePlugins = true;


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
try {
if (typeof b.page_name !== "undefined" && b.page_name === "rxd: order confirmation")
{
	b.order_type = b.cart_type;
}
   
} catch (e) {}  
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
/*
PLUGINS
*/

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue = new Function("v","c","el","" 
+ "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el" 
+ "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i" 
+ "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)" 
+ ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?" 
+ "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Utility Function: split v1.5 - split a string
 */
s.split = new Function("l","d","" 
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x" 
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: apl v1.1
 */
s.apl = new Function("l","v","d","u","" 
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a." 
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas" 
+ "e()));}}if(!m)l=l?l+d+v:v;return l");
s.inList = function(l, v, d, u) {
    if (typeof v != "string")
        return false;
    var s = this
      , ar = Array();
    if (typeof l == "string") {
        d = d ? d : ",";
        ar = l.split(d)
    } else if (typeof l == "object")
        ar = l;
    else
        return false;
    for (var i = 0, arlength = ar.length; i < arlength; i++)
        if (typeof u != "undefined" && u == 1 && v == ar[i])
            return true;
        else if (v.toLowerCase() == ar[i].toLowerCase())
            return true;
    return false
}
;


//Plugin: getValOnce v2.0 - used for campaign tracking
s.getValOnce=function(vtc,cn,et,ep){cn=cn?cn:"s_gvo";et=et?et:0;ep="m"===ep?6E4:864E5;if(vtc&&vtc!==this.c_r(cn)){var
e=new Date;e.setTime(e.getTime()+et*ep);this.c_w(cn,vtc,0===et?0:e);return vtc}return""};

/*
 * Plugin: getTimeParting 3.4a - modified to return date stamp
 */
s.getTimeParting = new Function("h","z","" 
+ "var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont" 
+ "h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['" 
+ "Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda" 
+ "y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp" 
+ "DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea" 
+ "r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)" 
+ "{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT" 
+ "imezoneOffset()*60000);d=new Date(d+(3600000*z)); dd=d.getDate();mm = d.getMonth()+1;yyyy = d.getFullYear();H=d.getHours();M=d" 
+ ".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P" 
+ "M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(mm+'|'+dd+'|'+yyyy+'|'+tm+'|'+D);}");


s._tpDST = {
    2015: '3/8,11/1',
    2016: '3/13,11/6',
    2017: '3/12,11/5',
    2018: '3/11,11/4',
    2019: '3/10,11/3',
    2020: '3/8,11/1',
    2021: '3/14,11/7',
    2022: '3/13,11/6',
    2023: '3/12,11/5',
    2024: '3/10,11/3',
    2025: '3/9,11/2',
    2026: '3/8,11/1',
    2027: '3/14,11/7',
    2028: '3/12,11/5',
    2029: '3/11,11/4',
    2030: '3/10,11/3',
}
/*END PLUGINS SECTION*/
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
try{
    function s_doPlugins(s) {     
	    try{
	        //ssl- secure server logon, forcing tags to pass thru https instead of http.
		    s.ssl = true;
		    s.abort = true;
		    //Set linkTrackVars for all mapped variables
		    s.linkTrackVars = (typeof b.linkTrackVars === 'string') ? s.apl(s.linkTrackVars, b.linkTrackVars, ',') : s.linkTrackVars;
	        s.linkTrackVars = s.apl(s.linkTrackVars, "prop75", ",", 1);
	        s.eVar4=s.pageName;
			s.linkTrackVars = s.apl(s.linkTrackVars, "eVar4", ",", 1);
		    
		    
		    //PAGE ONLY TAG VARIABLES
		    if (typeof b !== 'undefined' && typeof b["ut.event"] !== 'undefined' && b['ut.event'] === 'view') {
	            if (typeof b.page_name !== 'undefined' &&
	               (typeof s.prop3 !== 'undefined' && s.prop3.indexOf('shop:') === -1)) {/*s.prop3 = b.page_name;*/}
	            if (typeof b.page_category !== 'undefined') {s.prop5 = b.page_category;}
	           //prop6 decommissioned - Audit 8/31 - US1573293
	           //if (typeof b["cp.mc_ui_ssr"] !== 'undefined') {s.prop6 = b["cp.mc_ui_ssr"];}
	            if (typeof b.platform !== 'undefined') {s.prop11 = b.platform;}
	            if (typeof b.state_logged_in !== 'undefined') {s.eVar35 = b.state_logged_in;}
	            if (typeof b.state_extracare_link !== 'undefined') {s.eVar59 = b.state_extracare_link;}
	            if (typeof b.rx_store_id !== 'undefined') {s.eVar97 = b.rx_store_id;}
	            if (typeof b["cp.flipp2"] !== 'undefined') {s.eVar144 = b["cp.flipp2"];}
	            if (typeof b["cp.ecFingerprintId"] !== 'undefined') {s.eVar128 = b["cp.ecFingerprintId"];}
	            //US355507 If ecFingerprintId exists set v128 to 'yes'.  If not, v128 is set to 'no'
			    if (typeof b["cp.ecFingerprintId"] !== 'undefined') {s.eVar128 = "yes";} else {s.eVar128 = "no";}
                if (typeof b["cp.aat1"] !== 'undefined') {s.eVar137 = b["cp.aat1"];}
	            //if (typeof b. !== 'undefined') {s.prop3 = b.;}
	            //if (typeof b. !== 'undefined') {s.prop3 = b.;}
	            //if (typeof b. !== 'undefined') {s.prop3 = b.;}
	            
    		  	//Set Responsive Design (v26)
		        setResponsiveExperience();

    		    //Domain (v38)
    		    s.eVar38 = b['dom.domain'];
    		    
    		      /* Set eVar184 on all tracking calls to a static value 
    		      Evar184 decommissioned - Audit 8/31 - US1573293 
		  s.eVar184 = "encrypted";		
		  if(s.linkName != null && s.linkName.toString().indexOf("custom") > -1){
		    s.linkTrackVars = s.linkTrackVars + ',eVar184';
		    s.eVar184 = "encrypted";
		  }*/
    		    
    		    //Platform (v41)
    		    s.eVar41 = 'D=c11';
    		    
    		   //Local Time (c47) - Local time for user when tag was sent. Added 3/24/2020 JIRA AT-199
    			var local_time = new Date();
    			 s.prop47 = local_time.getMonth()+1 + '/' + local_time.getDate() + '/' + local_time.getFullYear() + ' ' 
    			   + (local_time.getHours()>12?local_time.getHours()-12:local_time.getHours()) + ':' + (local_time.getMinutes()<10?'0':'') + local_time.getMinutes()
    			     + ' ' + (local_time.getHours()>11?'PM':'AM');	

	            //Environment (c48)
    	        s.prop48 = b["ut.env"];
    	        
    		    //Adobe Mkt Cloud ID (c49)
    		    s.prop49 = 'D=mid';
    		  
    		    //Page URL (v49) - US261537 - ignore query string
    		    s.eVar49 = b['dom.domain'] + b['dom.pathname'];
    		
    		    //S Code Version (c50)
    		    s.prop50 = s.version;
    		    
    		    //Document Title (v51)
    		    s.eVar51 = b['dom.title'];
    		    
    		    //Query String (v52) - only set if populated
    		    s.eVar52 = ((b['dom.query_string']==='') ? '' : '?') + b['dom.query_string'];
    		    //s.eVar52 = '?' + b['dom.query_string'];
    		    
     		    //User Agent (v53)
    		    if(typeof b.user_agent != "string"){
    		    s.eVar53 =  "D=User-Agent";
    		    }
		  		 
    		    //Front Store Version (v56)
    		    //Evar56 decommissioned - Audit 8/31 - US1573293 
    		    //s.eVar56 = 'REACT';
    		    
    		    //Page Type (ch,v57)
    		    //s.channel = s.eVar57 = 'D=c5';

		        previousPage();

    		  	//Campaign tracking - External Link Parameters (v39)
    			if(globalAdobeObject.getParameterByName("WT.mc_id")){
    				s.campaign = globalAdobeObject.getParameterByName("WT.mc_id");
    				s.eVar39 = s.eVar45 = s.eVar62 = s.campaign = s.getValOnce(s.campaign, "s_cmp");
    			} else if (globalAdobeObject.getParameterByName("CID")) {
    				s.campaign = globalAdobeObject.getParameterByName("CID");
    				s.eVar39 = s.eVar45 =s.eVar62 = s.campaign = s.getValOnce(s.campaign, "s_cmp");
    			} else if(globalAdobeObject.getParameterByName("cid")){
    				s.campaign = globalAdobeObject.getParameterByName("cid");
    				s.eVar39 = s.eVar45 = s.eVar62 = s.campaign = s.getValOnce(s.campaign, "s_cmp");
    			} else if(globalAdobeObject.getParameterByName("WT.tsrc")){
    				s.campaign = globalAdobeObject.getParameterByName("WT.tsrc");
    				s.eVar39 = s.eVar45 =s.eVar62 = s.campaign = s.getValOnce(s.campaign, "s_cmp");
    			} 
    			
    			s.prop75 = "web view|fs profile" ;

				//Bloomreach Cookie (v179) - Commenting out mapping - 5/10/22 JP.  v179 will now be used for Cart ID
				//s.eVar179= ('brsrch:'+b['cp.brsrch']+'|brpdp:'+b['cp.brpdp']+'|brbrnd:'+b['cp.brbrnd']+'|brauto:'+b['cp.brauto']+'|brcat:'+b['cp.brcat']+'|brcon:'+b['cp.brcon']+'|brdl:'+b['cp.brdl']+'|brsku:'+b['cp.brsku']+'|brez:'+b['cp.brez']);

		    }
		    
		    //Set Event1 when tool_type is populated
	        if (typeof b !== 'undefined' && typeof b.tool_type !== 'undefined') {
	            s.events = s.apl(s.events, "event1", ",", 1);
				s.linkTrackEvents = s.apl(s.linkTrackEvents, "event1", ",", 1);
		    }
	        
		    //Tag Source (c75) - change default value on link tags
		    if (typeof b !== 'undefined' && typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'link') {
		        s.prop75 = "web link|fs profile";
		    }
		

		
            //Set events from a comma-separted list
            if (typeof b !== 'undefined' && typeof b.events !== 'undefined') {
	            s.events = s.apl(s.events, b.events, ",", 1);
	            if (typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'link') {
	                s.linkTrackVars = s.apl(s.linkTrackVars, "events", ",", 1);
	                if (b.events.indexOf('event4') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "event4", ",", 1); }
	                if (b.events.indexOf('scRemove') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "scRemove", ",", 1); }
                    if (b.events.indexOf('scAdd') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "scAdd", ",", 1); }
                    if (b.events.indexOf('scOpen') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "scOpen", ",", 1); }
                    if (b.events.indexOf('scView') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "scView", ",", 1); }
                    if (b.events.indexOf('scCheckout') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "scCheckout", ",", 1); }
                    if (b.events.indexOf('event32') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "event32", ",", 1); }
                    if (b.events.indexOf('event34') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "event34", ",", 1); }
                    if (b.events.indexOf('event69') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "event69", ",", 1); }
	            }
            }

		    //Set products string and associated events
            productsString();
            
            //Suppress Adobe tracking on GAM and criteo
            
            if(typeof s.linkName == "string" && (s.linkName.indexOf("gam") >-1 || s.linkName.indexOf("criteo") > -1)){
                s.abort = true;
            }

		    //Function to remove variables encrypted by Sentry
		    //sentryData();

		} catch (e) {
			//sensitiveDataFlag();
			s.abort = true;
			if(s.list1 === null){
				s.list1 = "Extension Error s_doPlugins fs profile "+ e.message;
				s.events = s.apl(s.events, "event4", ",", 1);
			} 
		}
	}

	s.doPlugins = s_doPlugins;

	// Helper function: Accepts a string, returns argsa-formatted parameter name
	function stringToParam(str) {
		try{
			if (str.indexOf('s.') === 0) {
				return str;
			} else {
				return 's.' + str;
			}
		} catch (e) {
			if(s.list1 === null){
				s.list1 = "Extension Error stringToParam fs profile "+ e.message;
				s.events = s.apl(s.events, "event4", ",", 1);
			}
		}  
	}

function sentryData(){
	try{
		s.eVar82 = s.eVar91 = s.eVar92 = s.eVar93 = s.eVar94 = s.eVar95 = s.eVar96 = undefined;
		s.eVar97 = s.eVar98 = s.eVar99 = s.eVar100 = undefined;
		s.prop74 = undefined;
	}catch(e){
		if(s.list1 === null){
			s.list1 = "Extension Error sensitiveDataFlag fs profile "+ e.message;
			s.events = s.apl(s.events, "event4", ",", 1); 
		}
	}
}

function previousPage() {
	try{
  
		//get previous page name
	//	if(s.pageName) {
			 //s.eVar5 = s.getPreviousValue(s.pageName, "gpv_e5");
		//}
		//get previous page uri
		if(s.eVar49) {
			s.prop10 = s.getPreviousValue(s.eVar49, "gpv_p10");
		}
	} catch (e) {
		if(s.list1 === null){
			s.list1 = "Extension Error previousPage fs profile "+ e.message;
			s.events = s.apl(s.events, "event4", ",", 1); 
		}
	}  
} 

function productsString() {
	try{
  
	    if (typeof b !== 'undefined' && typeof b.products !== 'undefined') {

	        s.products = b.products;
	        productInfo = b.products;
	        
	        if (typeof b.page_name !== 'undefined' && b.page_name === 'otchs: checkout: cart') {
                s.events = s.apl(s.events, "scView", ",", 1); 
                s.events = s.apl(s.events, "scCheckout", ",", 1); 
	        }
	        
	        if (typeof b["ut.event"] !== 'undefined' && b['ut.event'] == 'link') {
	            s.linkTrackVars = s.apl(s.linkTrackVars, "products", ",", 1);
                if (b.products.indexOf('event32') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "event32", ",", 1); }
                if (b.products.indexOf('event33') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "event33", ",", 1); }
                if (b.products.indexOf('event91') > -1) {s.linkTrackEvents = s.apl(s.linkTrackEvents, "event91", ",", 1); }
            }
	        
	    }
		    
	} catch (e) {
		if(s.list1 === null){
			s.list1 = "Extension Error productsString fs profile "+ e.message;
			s.events = s.apl(s.events, "event4", ",", 1); 
		}
	}  
}

function setResponsiveExperience() {
		try{
			var a_browser_width = document.body.clientWidth; 

			if (a_browser_width!==null) {
				if (a_browser_width>0&&a_browser_width<768) {
					a_res_experience = "mweb";
				}
				else if (a_browser_width>=768&&a_browser_width<1024) {
					a_res_experience = "tweb";
				}
			}

		//	s.eVar26 =  a_res_experience;
		} catch (e) {
			if(s.list1 === null){
				s.list1 = "Extension Error setResponsiveExperience fs profile failed "+ e.message;
				s.events = s.apl(s.events, "event4", ",", 1); 
			}
		}  
	}


} catch (e) {}  

} } catch(e){ utag.DB(e) }  }];

  u.send=function(a,b,c,d,e,f,g,h,ev){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      utag.DB("send:340");

      u.data = {

        "adobe_org_id" : "06660D1556E030D17F000101",

        // set cookie domain explicitly (no need for cookieDomainPeriods and domain guessing)
        // http://rossscrivener.co.uk/blog/javascript-get-domain-exclude-subdomain
        "cookieDomain" : (function () {
          return utag.loader.RC ('utag_main').vapi_domain || (function () {
            var i = 0, d = document.domain, p = d.split ('.'), s = '_vapi' + new Date ().getTime ();
            while (i < (p.length -1) && document.cookie.indexOf (s + '=' + s) === -1) {
              d = p.slice (-1 -(++i)).join ('.');
              document.cookie = s + '=' + s + ';domain=' + d + ';';
            }
            document.cookie = s + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + d + ';';
            utag.loader.SC ('utag_main', { 'vapi_domain' : d });
            return d;
          } ());
        } ()),

        "a" : {},
        "serial" : {},
        "linkName" : "",
        "linkType" : ""
      };

      //Map adobe_org_id - This can't be done inside the following callback because it is used to call the function itself.
      for (d in utag.loader.GV(u.map)) {
        if (b[d] !== undefined && b[d] !== "") {
          e = u.map[d].split(",");
          for (f = 0; f < e.length; f++) {
            if(e[f] === "adobe_org_id" || e[f] === "linkTrackVars" || e[f] === "linkTrackEvents" || e[f] === "linkType" || e[f] === "linkName"){
            u.data[e[f]] = b[d];
            } else if(e[f] === "combineLinkVar"){
              u.combineLinkVar = b[d];
            }
          }
        }
      }
      //Send every call to a queue so we can process the events after the visitor API call
      u.queue.push({"a":a,"b":b,"u.data":u.data});
      vAPI.getInstance(u.data.adobe_org_id, function(instance) {
        //Get data object back from the queue so we can process everything in order
        var data = u.queue.shift();
        a = data["a"];
        b = data["b"];
        u.data = data["u.data"];

        u.a=a;
        b.sc_events=b.sc_events||{};

        u.addEvent = function (v, n) {
          var t = [];
          if (v instanceof Array) {
            t = v.slice(0);
          } else if (typeof n !== "undefined") {
            t.push(v + "=" + n);
          } else {
            t.push(v);
          }
          for (var i = 0; i < t.length; i++) {
            b.sc_events[t[i]] = 1;
            u.pushlt(u.lte, t[i].indexOf("=") > -1 ? t[i].split('=')[0] : t[i].split(':')[0]);
          }
          return b.sc_events;
        };

        u.addProduct = function (v) {
          u.data.sc_addProd = "";
          if (v instanceof Array) {
            u.data.sc_addProd = v.join(',');
          } else {
            u.data.sc_addProd = v;
          }
        };

        if (u.a === "link") {
          u.ltflag = true;
          if (typeof u.data.linkTrackVars === "undefined" && typeof b.linkTrackVars === "undefined") { u.ltv = []; }
          if (u.combineLinkVar && typeof u.data.linkTrackVars !== "undefined") {
            u.typeCheck(u.data.linkTrackVars, "ltv");
          } else if (u.combineLinkVar && typeof b.linkTrackVars !== "undefined") {
            u.typeCheck(b.linkTrackVars, "ltv");
          }

          if (typeof u.data.linkTrackEvents === "undefined" && typeof b.linkTrackEvents === "undefined") { u.lte = []; }
          if (u.combineLinkVar && typeof u.data.linkTrackEvents !== "undefined") {
            u.typeCheck(u.data.linkTrackEvents, "lte");
          } else if (u.combineLinkVar && typeof b.linkTrackEvents !== "undefined") {
            u.typeCheck(b.linkTrackEvents, "lte");
          }
        }
        // Dynamically override using extensions
        u.data.tagdevicetype = "mobile";
        u.data.detectserial = "yes";

        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};

        // Demandbase
        try {
          if (window.sessionStorage) {
            var standardDimensions = sessionStorage.getItem('s_dmdbase') || '';
            var customDimensions1 = sessionStorage.getItem('s_dmdbase_custom1') || '';
            var customDimensions2 = sessionStorage.getItem('s_dmdbase_custom2') || '';
            var customDimensions3 = sessionStorage.getItem('s_dmdbase_custom3') || '';
            var customDimensions4 = sessionStorage.getItem('s_dmdbase_custom4') || '';

            u.o.contextData.s_dmdbase = standardDimensions;
            u.o.contextData.s_dmdbase_custom1 = customDimensions1;
            u.o.contextData.s_dmdbase_custom2 = customDimensions2;
            u.o.contextData.s_dmdbase_custom3 = customDimensions3;
            u.o.contextData.s_dmdbase_custom4 = customDimensions4;
          }
        }
        catch (e) {
          utag.DB('AppMeasurement Demandbase Error: ' + e.message);
        }

        // Mobile lifecycle var
        if (u.data.tagdevicetype === "mobile") {
          if (b.timestamp || b.timestamp_unix) {
            u.o.timestamp = b.timestamp || b.timestamp_unix;
          }
          u.data.a = {
            "AppID" : b.app_id || "",
            "CarrierName" : b.carrier || "",
            "DeviceName" : b.device || "",
            "HourOfDay" : b.lifecycle_hourofday_local || "",
            "DayOfWeek" : b.lifecycle_dayofweek_local || "",
            "OSVersion" : b.os_version || b.platform_version || "",
            "Resolution" : b.device_resolution || ""
          };
          if (b.lifecycle_type) {
            u.data.a.disable_wake_track = false;
            u.data.a.disable_sleep_track = false;
            u.data.a.DaysSinceFirstUse = b.lifecycle_dayssincelaunch || "";
            u.data.a.DaysSinceLastUpgrade = b.lifecycle_dayssinceupdate || "";
            u.data.a.DaysSinceLastUse = b.lifecycle_dayssincelastwake || "";
            u.data.a.Launches = b.lifecycle_launchcount || "";
            u.data.a.InstallDate =  b.lifecycle_firstlaunchdate_MMDDYYYY || "";
            u.data.a.UpgradeEvent = b.lifecycle_isfirstlaunchupdate || "";
            u.data.a.PrevSessionLength = b.lifecycle_priorsecondsawake || "";
          }
          if (b.lifecycle_isfirstlaunch) {
            u.data.a.InstallEvent = "InstallEvent";
          }
          if (b.lifecycle_diddetectcrash) {
            u.data.a.CrashEvent = "CrashEvent";
          }
          if (b.lifecycle_type === "launch") {
            u.data.a.LaunchEvent = "LaunchEvent";
          }
          if (b.lifecycle_isfirslaunchupdate) {
            u.data.a.UpgradeEvent = "UpgradeEvent";
          }
        }

        for (e in utag.loader.GV(u.map)) {
          if (u.data.tagdevicetype === "mobile") {
            if (typeof b[e] != "undefined" && typeof u.map[e] == "string" && u.map[e].indexOf("contextData.a.") > -1) {
              f = u.map[e].split(",");
              for (g = 0; g < f.length; g++) {
                if (f[g].indexOf("contextData.a.") === 0){
                  u.data.a[f[g].substring(14)] = b[e];
                }
              }
            }
          } else if (typeof b[e] != "undefined" && typeof u.map[e] == "string" && u.map[e].indexOf("SERIAL_") > -1) {
            f = u.map[e].split(",");
            for (g = 0; g < f.length; g++) {
              if (f[g].indexOf("SERIAL_") === 0){
                u.data.serial[f[g].substring(7)]=b[e];
              }
            }
          } else if (typeof b[e] != "undefined" && typeof u.map[e] == "string" && u.map[e].indexOf("PRODUCTS_") > -1) {
            f = u.map[e].split(",");
            for (g = 0; g < f.length; g++) {
              if(f[g].indexOf("PRODUCTS_id") || f[g].indexOf("PRODUCTS_category") || f[g].indexOf("PRODUCTS_quantity") || f[g].indexOf("PRODUCTS_price")){
                u.data[f[g].substring(9)]=b[e];
              }
            }
          }
        }

        //Check for disabled lifecycles

        if(u.data.a.disable_wake_track === true || u.data.a.disable_wake_track === "true") {
          if (b.lifecycle_type === "wake") {
            return false;
          }
        }
        if(u.data.a.disable_sleep_track === true || u.data.a.disable_sleep_track === "true") {
          if (b.lifecycle_type === "sleep") {
            return false;
          }
        }

        u.data.id = u.data.id || (typeof b._cprod != "undefined" ? b._cprod.slice(0) : []);
        u.data.category = u.data.category || (typeof b._ccat != "undefined" ? b._ccat.slice(0) : []);
        u.data.quantity = u.data.quantity || (typeof b._cquan != "undefined" ? b._cquan.slice(0) : []);
        u.data.price = u.data.price || (typeof b._cprice != "undefined" ? b._cprice.slice(0) : []);
        if(typeof u.data.id!="undefined"&&u.data.id!=""){
          c=[];d={};ev={};for(e in utag.loader.GV(u.map)){if(typeof b[e]!="undefined"&&typeof u.map[e]=="string"&&u.map[e].indexOf("PRODUCTS_")>-1){f=u.map[e].split(",");for( g=0;g<f.length;g++){
            var pv = f[g].substring(9);
            if(f[g].indexOf("PRODUCTS_evar")==0 || f[g].indexOf("PRODUCTS_eVar")==0){
              if (b[e] instanceof Array) {
                b.sc_prodevars = b.sc_prodevars || [];
                for (var i = 0; i < b[e].length; i++) {
                  var prodvars = {};
                  if(typeof b.sc_prodevars[i]!="undefined" && b.sc_prodevars[i]!=""){
                    b.sc_prodevars[i][pv]=b[e][i];
                  }else{
                    prodvars[pv]=b[e][i];
                    b.sc_prodevars.push(prodvars);
                  }
                }
              }else{
                d[pv] = (b[e]+"").split(",");
              }
            }else if(f[g].indexOf("PRODUCTS_event")==0){
              if(b[e] instanceof Array){
                b.sc_prodevents=b.sc_prodevents || [];
                for (var i = 0; i < b[e].length; i++) {
                  var prodevents = {};
                  if(typeof b.sc_prodevents[i]!="undefined" && b.sc_prodevents[i]!=""){
                    b.sc_prodevents[i][pv]=b[e][i];
                  }else{
                    prodevents[pv]=b[e][i];
                    b.sc_prodevents.push(prodevents);
                  }
                }
                u.addEvent(pv);
              }else if (b[e] !== ""){
                ev[pv]=b[e];
                u.addEvent(pv);
              }
            }
          }}}
          e="";for(f in utag.loader.GV(d)){for(g=0;g<d[f].length;g++){if(e!="")e+="|"+f+"="+d[f][g];else e=f+"="+d[f][g];}}
          h="";for(f in utag.loader.GV(ev)){if(h)h+="|"+f+"="+((isNaN(ev[f]))?"1":ev[f]);else h=f+"="+((isNaN(ev[f]))?"1":ev[f]);}
          b.sc_prodevents=b.sc_prodevents||[];
          b.sc_prodevars=b.sc_prodevars || [];
          for(d=0;d<u.data.id.length;d++){
            var h2=h;
            var h3=e;
            if(typeof b.sc_prodevents!="undefined"){
              for (f in b.sc_prodevents[d]) {
                if(typeof b.sc_prodevents[d][f]!="undefined"){
                  var l =b.sc_prodevents[d][f];
                  if(typeof l!="undefined" && l!="" && isNaN(l)==false){
                    if (h2){
                      h2 += "|" + f + '=' + l;
                    }else{
                      h2 = f + '=' + l;
                    }
                  }
                }
              }
            }
            if(typeof b.sc_prodevars!="undefined"){
              for (f in b.sc_prodevars[d]) {
                if(typeof b.sc_prodevars[d][f]!="undefined"){
                  var l =b.sc_prodevars[d][f];
                  if(typeof l!="undefined" && l!=""){
                    if (h3){
                      h3 += "|" + f + '=' + l;
                    }else{
                      h3 = f + '=' + l;
                    }
                  }
                }
              }
            }
            c.push((u.data.category[d]?u.data.category[d]:"")+";"+u.data.id[d]+";"+(u.data.quantity[d]?u.data.quantity[d]:"")+";"+(u.data.price[d]?((u.data.quantity[d]?parseInt(u.data.quantity[d]):1)*parseFloat(u.data.price[d])).toFixed(2):"")+";"+h2+";"+h3);
          }
          if (typeof u.data.sc_addProd !== "undefined" && u.data.sc_addProd) {
            c.push(u.data.sc_addProd);
          }
          u.o.products=c.join(",");
        } else {
          u.o.products = "";
        }

        // Mapping would be b.event_name ==> "prod:event3,click:event4"
        // Data layer variable b.event_name will contain "prod,click" and trigger both event3,event4
        // To serialize, this would be "prod:12345,click"
        var evt=/^event|prodView|scOpen|scAdd|scRemove|scView|scCheckout|purchase$/;
        for(c in utag.loader.GV(b)){
          if(b[c] !== ""){
            f=(""+b[c]).split(",");
            for(g=0;g<f.length;g++){
              h=f[g].split(":");
              d=[];
              if(u.data.detectserial === "no") {
                if(typeof u.map[c+":"+h.join(":")]!="undefined"){ //fix to check against whole string
                  d=u.map[c+":"+h.join(":")].split(",");
                }else if(typeof u.map[c]!="undefined"){
                  d=u.map[c].split(",");
                }
              } else {
                //h.length is determined by how many colons are found
                if(h.length>1){
                  var subTrigger = h[0];
                  //Subtrigger is a concatenation of all but the last index, which is a detected serialization
                  for(var i=1; i<h.length-1;i++) {
                    subTrigger += ":"+h[i];
                  }
                  // Redefine h with subTrigger and detected serialization
                  h[0] = subTrigger;
                  h[1] = h[h.length-1];
                }
                if(typeof u.map[c+":"+h[0]]!="undefined"){
                  d=u.map[c+":"+h[0]].split(",");
                }else if(typeof u.map[c]!="undefined"){
                  d=u.map[c].split(",");
                }
              }
              for(e=0;e<d.length;e++){if(d[e]!="events"&&evt.test(d[e])&&d[e].indexOf("SERIAL_")!==0){
                if(u.data.serial[d[e]] !== undefined && u.data.serial[d[e]] !== "" ) {
                  u.addEvent(d[e]+":"+u.data.serial[d[e]]);
                } else {
                  if(u.data.detectserial === "yes") {
                    u.addEvent(d[e]+(h.length>1?":"+h[1]:""));
                  } else {
                    u.addEvent(d[e]);
                  }
                }
              }}
            }
          }
        }
        //Placing mobile data in contextData
        for (var m in u.data.a) {
          u.o.contextData["a."+m] = u.data.a[m];
          u.pushlt(u.ltv, "contextData.a." + m);
        }

        for(c in utag.loader.GV(b)){if(typeof u.map[c]!="undefined"){d=u.map[c].split(",");for(e=0;e<d.length;e++){
          // map to VALUE_event51 for events = "event51=60"
          if(d[e].indexOf("VALUE_")==0){
            // If an event serialization was mapped for this event
            if(u.data.serial[d[e]] !== undefined && u.data.serial[d[e]] !== ""){
              u.addEvent( d[e].substring(6), b[c]+":"+u.data.serial[d[e]] );
            } else {
              u.addEvent(d[e].substring(6), b[c]);
            }
          }else if(d[e]=="doneAction"){
            b.doneAction=b[c];
            if(b.doneAction!="navigate"){
              b.doneAction=eval(b[c]);
            }
          }else if(d[e].indexOf("c.") == 0 || d[e].indexOf("contextData.") == 0){
            d[e]=d[e].replace("contextData.", "c.");
            if (!(d[e][2] === "a" && d[e][3] === ".")) {   // Exclude mobile vars
              u.o.contextData[d[e].substring(2)] = b[c];
              u.pushlt(u.ltv,"contextData."+d[e].substring(2))
            }
          } else {
            if(c=="sc_events" || c=="sc_prodevents" || c=="sc_prodevars"){
              utag.DB("Error:340: Mapping reserved object name " + c)
            }else{
              u.o[d[e]]=b[c];
            }
            // if linkTrackVars is mapped then turn off auto-generation of linkTrackVars
            if(d[e]=="s_account"){
              u.o.account=b[c];
            }else if(d[e]=="linkTrackVars"){
              u.ltflag=false;
            }else{
              if(u.combineLinkVar){u.ltflag=true;}
              if(d[e] !== "combineLinkVar"){
                u.pushlt(u.ltv,d[e]);
              }
            }
          }
        }}}
        d=[];for(c in utag.loader.GV(b.sc_events)){if(b.sc_events[c])d.push(c);}
        if(d.length>0){
          u.o.events=d.join(",");
          u.pushlt(u.lte,u.o.events);
        } else {
          u.o.events = "";
        }

        if(b._ccurrency){
          u.o.currencyCode=b._ccurrency;
        }

        if(b._corder){
          u.pushlt(u.lte,"purchase");
          u.pushlt(u.ltv,"purchaseID");
          u.o.purchaseID=((u.o.purchaseID)?u.o.purchaseID:b._corder);
          u.o.events=((u.o.events)?u.o.events:"purchase");
          if(u.o.events.indexOf("purchase")<0){u.o.events+=",purchase";}
        }

        //Use case: Visitor API set up in Tealium iQ, we will use this instance of the Visitor API
        if (instance) {
          u.o.visitor = instance;
        }

        //Use case: Visitor API not set up in Tealium iQ -
        //If a previously created instance of the Visitor API object is found on the page, that will be referenced.
        //Otherwise a new Visitor API object is instantiated.
        if (!u.o.visitor) {
          if(typeof visitor !== "undefined") {
            u.o.visitor = window.visitor;
          } else if (typeof Visitor !== "undefined" && typeof Visitor.getInstance !== "undefined") {
            u.o.visitor = Visitor.getInstance(u.data.adobe_org_id);
          }
        }

        // marketing cloud cookie domain should take precedence if exist
        u.o.cookieDomain = u.o.visitor ? u.o.visitor.cookieDomain || u.data.cookieDomain : u.data.cookieDomain;

        if (u.a === "view") {
          var img = u.o.t();
          /* still track on user agents Adobe cannot detect */
          if (typeof img !== "undefined" && img !== "") {
            u.img = new Image();
            u.img.src = img.substring(img.indexOf("src=")+5,img.indexOf("width=")-2);
          }
        } else if (u.a === "link") {
          if (typeof u.ltv !== "undefined" && u.ltflag) {
            if (u.o.events) {u.ltv.push("events");}
            if (u.o.products) {u.ltv.push("products");}
            b.linkTrackVars = u.ltv.join(",");
          }
          if (typeof u.lte !== "undefined" && u.ltflag) {b.linkTrackEvents = u.lte.join(",");}
          u.o.linkTrackVars = (b.linkTrackVars) ? b.linkTrackVars : "None";
          u.o.linkTrackEvents = (b.linkTrackEvents) ? b.linkTrackEvents : "None";

          /*
          in some implementations of AppMeasurement through Tealium iQ, values for linkName and linkType were provided directly in the data layer, e.g., through 
          the link tracking extension. This was done to minimize the number of mappings needed to set up AppMeasurement. To support these implementations the fallback checks 
          for b.link_text, b.link_name are included
          */
          
          //setting linkType: the values 'download link' and 'exit link' are set by the Link Tracking extension automatically; mappings supersede the setting of b.link_type
          if (!u.data.linkType) {
           if (b.link_type === "download link") {
             u.data.linkType = "d";
           } else if (b.link_type === "exit link") {
             u.data.linkType = "e";
           }
          }    
          
          // the fallback to u.o.linkType in this assignment is to handle static mappings to linkType as this template only runs static mappings when the vAPI.getInstance method is invoked, 
          // and not when u.send is invoked, as it is with most templates, defaulting to `o` if not otherwise set
          u.o.linkType = u.data.linkType || u.o.linkType || "o";

          //setting linkName: this fallback order is here to preserve the behavior of implementations referencing the data layer (b object) variables (link_name, link_text) directly
          u.data.linkName = u.data.linkName || b.link_name || b.link_text || "no link_name";

          u.o.tl(((b.link_obj) ? b.link_obj : true), u.o.linkType, u.data.linkName, null, (b.doneAction ? b.doneAction : null));
        }

        /* clear variables */
        if ("yes" === "yes") {
          u.o.clearVars();
          u.o.contextData = {};
        }

        utag.DB("send:340:COMPLETE");
      });
    }
  };
    try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
  })('340','cvs.fs');
}catch(e){
  utag.DB(e);
}
//end tealium universal tag
