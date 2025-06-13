"use strict";

// v5.2.26
(function () {
    if (typeof window.IVD === "undefined") {
        window.IVD = {};
        IVD.mode = window.herolens ? "Herolens" : (window.location.href.indexOf("file:") == 0 || window.location.hostname == "localhost" ? "Local" : "Innovid");
        populateIVD();
    } else {
        populateIVD();
        Object.defineProperty(window, 'IVD', {
            writable: false
        });
    }

    function getMeta(metaName) {
        var metas = document.getElementsByTagName('meta');
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === metaName) {
                return metas[i].getAttribute('content');
            }
        }
        return '';
    }

    function isPrefixMatch(key, prefix) {
        return key.substring(0, prefix.length) === prefix
    }

    function clearPrefix(key, prefix) {
        return key.substring(prefix.length)
    }

    function populateIVD() {
        console.log(">>> Innovid Display Connector: Version 6 ");
        IVD.feed = {};
        IVD.ctx = {};
        IVD.extra = {};
        var prefix = {
            feed: 'inv_fd_',
            ctx: 'inv_ctx_'
        }
        if (IVD.mode === "Innovid" || IVD.mode === "Local") {
            var allData = {};
            var props = [];
            if (window.location.search) props = window.location.search.slice(1).split('&');
            if (window.name) props = props.concat(window.name.split('&'));
            if (props && props.length) {
                for (var i = 0; i < props.length; i++) {
                    var prop = props[i].split('=')
                    allData[decodeURIComponent(decodeURIComponent(prop[0]))] = decodeURIComponent(prop[1]);
                }
            }


            for (var key in allData) {
                if (allData.hasOwnProperty(key)) {
                    if (isPrefixMatch(key, prefix.feed)) {
                        IVD.feed[clearPrefix(key, prefix.feed)] = allData[key];
                    } else if (isPrefixMatch(key, prefix.ctx)) {
                        IVD.ctx[clearPrefix(key, prefix.ctx)] = allData[key];
                    } else {
                        IVD.extra[key] = allData[key];
                    }
                }
            }

            if (IVD.mode === "Local" && window.ivd_mock_feed) IVD.feed = window.ivd_mock_feed;

            // replace feed values with size-specific values,  if needed
            var width_height = (getMeta('ad.size')).match(/\d+/g);
            if (width_height) {
                for (var property in IVD.feed) {
                    if (IVD.feed.hasOwnProperty(property)) {
                        var adSizeAppendix = "___" + width_height.join("_");
                        var isSizeExist = new RegExp(adSizeAppendix).test(property);
                        if (isSizeExist) {
                            IVD.feed[property.split("___")[0]] = IVD.feed[property];
                            delete IVD.feed[property]
                        }
                    }
                }
            }
        }


        IVD.clickthru = function (label, url) {
            url = url || (IVD.feed[label] ? IVD.feed[label] : null)
            console.log(">>> Innovid Clickthru: " + label + (url ? " | " + url : ""));
            switch (IVD.mode) {
                case "Innovid":
                    var postmsgobj = {
                        type: "open-url",
                        label: label,
                        url: url,
                        target: "innovid"
                    };
                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;

                case "Local":
                    if (url) window.open(url);
                    break;
            }
        };

        IVD.engage = function (label, value) {
            console.log(">>> Innovid Engage: " + label + (value ? "    value:" + value : ""));

            switch (IVD.mode) {
                case "Innovid":
                    var postmsgobj = {
                        type: "user-interaction-event",
                        label: label,
                        value: value,
                        target: "innovid"
                    };
                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;

                case "Local":
                    break;
            }
        };

        IVD.report = function (label, value) {
            console.log(">>> Innovid Report: " + label + (value ? "    value:" + value : ""));

            switch (IVD.mode) {
                case "Innovid":
                    var postmsgobj = {
                        type: "custom-creative-event",
                        label: label,
                        value: value,
                        target: "innovid"
                    };
                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;

                case "Local":
                    break;
            }
        };

        IVD.enableInteractions = function () {
            console.log(">>> Innovid Enable Interactions");

            switch (IVD.mode) {
                case "Local":
                case "Innovid":
                    var postmsgobj = {
                        type: "enable-user-interaction-events",
                        target: "innovid"
                    };

                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;
            }
        };

        IVD.closeInterstitialAd = function () {
            console.log(">>> Innovid Close Interstitial Ad");

            switch (IVD.mode) {
                case "Innovid":
                    var postmsgobj = {
                        type: "close-interstitial-ad",
                        target: "innovid"
                    };

                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;
            }
        };

        IVD.adaptCreativeFromSecureUrlScript = function(updateScriptUrl) {
            console.log(">>> Innovid adaptCreativeFromSecureUrlScript");
            switch (IVD.mode) {
                case "Innovid":
                    var postmsgobj = {
                        type: "adapt-creative-from-secure-url-script",
                        target: "innovid",
                        script: updateScriptUrl
                    };

                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;
            }
        };

        IVD.adaptCreativeFromFunction = function(updateFunction) {
            console.log(">>> Innovid adaptCreativeFromFunction");
            switch (IVD.mode) {
                case "Innovid":
                    var postmsgobj = {
                        type: "adapt-creative-from-function",
                        target: "innovid",
                        updateFunction: updateFunction.toString()
                    };

                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;
            }
        };

        IVD.closeCreativeFromSecureUrlScript = function(closeScriptUrl) {
            console.log(">>> Innovid closeCreativeFromSecureUrlScript");
            switch (IVD.mode) {
                case "Innovid":
                    var postmsgobj = {
                        type: "close-creative-from-secure-url-script",
                        target: "innovid",
                        script: closeScriptUrl
                    };

                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;
            }
        };

        IVD.closeCreativeFromFunction = function(closeFunction) {
            console.log(">>> Innovid closeCreativeFromFunction");
            switch (IVD.mode) {
                case "Innovid":
                    var postmsgobj = {
                        type: "close-creative-from-function",
                        target: "innovid",
                        closeFunction: closeFunction.toString()
                    };

                    window.parent.postMessage(JSON.stringify(postmsgobj), '*');
                    break;
            }
        };
    }
})
();
