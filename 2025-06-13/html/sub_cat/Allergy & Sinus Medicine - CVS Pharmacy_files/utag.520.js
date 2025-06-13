//~~tv:9043.20180801
//~~tc: Adding tag Impact Universal Tracking Tag

//tealium universal tag - utag.sender.9043 ut4.0.202506091435, Copyright 2025 Tealium.com Inc. All Rights Reserved.
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

    u.ev = {"view" : 1};
    u.initialized = false;
    u.scriptrequested = false;
    u.queue = [];

    u.clearEmptyKeys = function (object) {
      var key, required_list = ["orderId","customerId","customerEmail","category","quantity","subTotal","sku"];
      for (key in object) {
        // only deletes keys if they're empty and not required
        if ((object[key] === "" || object[key] === undefined) && (required_list.indexOf(key) === -1)) {
          delete object[key];
        }
      }
      return object;
    };

    u.isPlainEmail = function(email) {
      var emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
      return emailRegex.test(email);
    }

    u.createProductCollection = function(obj) {
      var i, collection = [],
        data = {};
      for (i = 0; i < obj.product_sku.length; i++) {
        // required items parameters
        data.subTotal = obj.product_subTotal[i] || "";
        data.sku = obj.product_sku[i] || "";
        data.category = obj.product_category[i] || "";
        data.quantity = obj.product_quantity[i] || "";
        // optional items parameters
        data.name = obj.product_name[i];
        data.brand = obj.product_brand[i];
        data.subcategory = obj.product_subcategory[i];
        data.mpn = obj.product_mpn[i];
        data.deliveryType = obj.product_deliveryType[i];
        data.referenceId = obj.product_referenceId[i];
        data.promoCodeDesc = obj.product_promoCodeDesc[i];
        data.totalDiscount = obj.product_totalDiscount[i];
        data.totalRebate = obj.product_totalRebate[i];   
        data.discount = obj.product_discount[i];

        collection.push(u.clearEmptyKeys(data));
        data = {};
      }

      return collection;
    };

      u.map={"_sm_520_1":"actionTrackerId","dom.domain:cvs.com":"identify","dom.pathname:/rx/dotm/receipt":"trackConversion","order_id":"orderId","coupon":"orderPromoCode","savings_amount_applied":"orderDiscount","product_sku_id":"product_sku","product_quantity":"product_quantity","product_name":"product_name","fulfillment_method":"text1","brands":"product_brand","individual_item_subtotal":"product_subTotal","item_category":"product_category","cc":"currencyCode","ec_used":"customerStatus"};
  u.extend=[function(a,b){
try{b['_sm_520_1']="49528";}catch(e){utag.DB(e);}
}];


    // Start Loader Callback
    u.loader_cb = function (a, b, c) {
      utag.DB("send:520:CALLBACK");
      u.initialized = true;
      
      var i, key, custom_key, options = {},
        properties = {},
        properties_exclusions_list = ["base_url","acid","event","actionTrackerId","domReady","tag","custom"];

      // automatically trigger identify call on page load or utag.view call
      if (a === "view" && u.data.event.indexOf("identify") === -1) {
        u.data.event.unshift("identify");
      }

      // automatically trigger trackConversion call if order ID is populated and trackConversion is not otherwise set
      if (u.data.orderId && u.data.event.indexOf("trackConversion") === -1) {
        u.data.event.push("trackConversion");
      }

      // build options object
      if (u.data.domReady) { options.domReady = u.data.domReady; }
      if (u.data.tag) { options.tag = u.data.tag; }

      // removing plain text email addresses
      if (u.isPlainEmail(u.data.customerId)) {
        u.data.customerId = "";
        utag.DB(u.id + ": A plain email address was detected for customerId. Removing from Impact tracking call.");
      }
      if (u.isPlainEmail(u.data.customerEmail)) {
        u.data.customerEmail = "";
        utag.DB(u.id + ": A plain email address was detected for customerEmail. Removing from Impact tracking call.");
      }

      for (i = 0; i < u.data.event.length; i++) {
        if (u.data.event[i] === "identify") {       
          ire(u.data.event[i], {customerId: u.data.customerId, customerEmail: u.data.customerEmail});
        } else {
          if (u.data.event[i] === "trackConversion") { options.verifySiteDefinitionMatch = true; }
          for (key in u.data) {
            // passes parameters from u.data to the properties object as long as they're not product arrays and not on the exclusions list
            if (u.data.hasOwnProperty(key) && key.indexOf("product_") === -1 && properties_exclusions_list.indexOf(key) === -1) {
              properties[key] = u.data[key];
            }
          }
          // passes any custom parameters into the properties object
          for (custom_key in u.data.custom) {
            if (u.data.custom.hasOwnProperty(custom_key)) {
              properties[custom_key] = u.data.custom[custom_key];
            }
          }
          // clears non-required empty properties
          properties = u.clearEmptyKeys(properties);
          // adds items collection
          properties.items = u.createProductCollection(u.data);
          if (!u.data.actionTrackerId) {
            utag.DB(u.id + ": Required attribute actionTrackerId not populated.");
          }
          ire(u.data.event[i], u.data.actionTrackerId, properties, options);
        }
      }

      utag.DB("send:520:CALLBACK:COMPLETE");
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
        utag.DB("send:520");
        utag.DB(b);

        var c, d, e, f, h;

        u.data = {
          "acid" : "A5716640-b064-4059-8c8a-c68a672f46bd1",
          "base_url" : "//d.impactradius-event.com/",
          "actionTrackerId" : "",
          // properties
          "orderId": "",
          "orderPromoCode": "",
          "orderPromoCodeDesc": "",
          "orderDiscount": "",
          "orderRebate": "",
          "orderSubTotalPreDiscount": "",
          "orderSubTotalPostDiscount": "",
          "orderShipping": "",
          "orderTax": "",
          "paymentType": "",
          "locationName": "",
          "locationType": "",
          "locationId": "",
          "giftPurchase": "",
          "currencyCode": "",
          "customerId": "",
          "customerEmail": "",
          "customerCity": "",
          "customerRegion": "",
          "customerPostCode": "",
          "customerCountry": "",
          "customerStatus": "",
          "money1": "",
          "money2": "",
          "money3": "",
          "date1": "",
          "date2": "",
          "date3": "",
          "numeric1": "",
          "numeric2": "",
          "numeric3": "",
          "text1": "",
          "text2": "",
          "text3": "",
          "siteCategory": "",
          "siteVersion": "",
          "hearAboutUs": "",
          "note": "",
          "dispositionCode": "",
          "phoneNumber": "",
          "callerId": "",
          "clickId": "",  
          "referenceId": "",
          "test": "",
          // product data
          "product_name" : [],
          "product_sku" : [],
          "product_brand" : [],
          "product_category" : [],
          "product_subcategory" : [],
          "product_quantity" : [],
          "product_mpn" : [],
          "product_deliveryType" : [],
          "product_referenceId" : [],
          "product_subTotal" : [],
          "product_promoCode" : [],
          "product_promoCodeDesc" : [],
          "product_totalDiscount" : [],
          "product_totalRebate" : [],
          "product_discount" : [],
          // options
          "domReady" : "",
          "tag" : "",
          // event queue and custom mappings object
          "event" : [],
          "custom" : {}
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};
        utag.DB("send:520:EXTENSIONS");
        utag.DB(b);
        // End tag-scoped extensions

        c = [];

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (u.data.hasOwnProperty(e[f])) {
                u.data[e[f]] = b[d];
              } else {
                u.data.custom[e[f]] = b[d];
              }

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
        utag.DB("send:520:MAPPINGS");
        utag.DB(u.data);
        // End Mapping

        // Pull E-Commerce extension values
        // Mappings override E-Commerce extension values
        u.data.orderId = u.data.orderId || b._corder || "";
        u.data.orderSubTotalPreDiscount = u.data.orderSubTotalPreDiscount || b._csubtotal || "";
        u.data.orderShipping = u.data.orderShipping || b._cship || "";
        u.data.orderTax = u.data.orderTax || b._ctax || "";
        u.data.currencyCode = u.data.currencyCode || b._ccurrency || "";
        u.data.orderPromoCode = u.data.orderPromoCode || b._cpromo || "";
        u.data.customerId = u.data.customerId || b._ccustid || "";
        u.data.customerCity = u.data.customerCity || b._ccity || "";
        u.data.customerRegion = u.data.customerRegion || b._cstate || "";
        u.data.customerPostCode = u.data.customerPostCode || b._czip || "";
        u.data.customerCountry = u.data.customerCountry || b._ccountry || "";
        if (u.data.product_name.length === 0 && b._cprodname !== undefined) { u.data.product_name = b._cprodname.slice(0); }
        if (u.data.product_sku.length === 0 && b._csku !== undefined) { u.data.product_sku = b._csku.slice(0); }
        if (u.data.product_brand.length === 0 && b._cbrand !== undefined) { u.data.product_brand = b._cbrand.slice(0); }
        if (u.data.product_category.length === 0 && b._ccat !== undefined) { u.data.product_category = b._ccat.slice(0); }
        if (u.data.product_subcategory.length === 0 && b._ccat2 !== undefined) { u.data.product_subcategory = b._ccat2.slice(0); }
        if (u.data.product_quantity.length === 0 && b._cquan !== undefined) { u.data.product_quantity = b._cquan.slice(0); }
        if (u.data.product_subTotal.length === 0 && b._cprice !== undefined) { u.data.product_subTotal = b._cprice.slice(0); }

        // Report required config is missing, and stop tag from firing.
        if (!u.data.acid) {
          utag.DB(u.id + ": Tag not fired: Required attribute acid not populated");
          return;
        }
        u.data.base_url += u.data.acid;

        // Makes sure that base_url has .js at the end
        if (!/\.js$/.test(u.data.base_url)) {
          u.data.base_url += ".js";
        }

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
              "id" : "utag_520",
              "attrs" : {}
            });
          }
        }

        utag.DB("send:520:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("520", "cvs.fs"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

