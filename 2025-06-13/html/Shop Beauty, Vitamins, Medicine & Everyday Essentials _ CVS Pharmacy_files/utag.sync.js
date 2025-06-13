//tealium universal tag - utag.sync ut4.0.202506091435, Copyright 2025 Tealium.com Inc. All Rights Reserved.
try{ try{
window.handleAntiFlicker = function(win, doc) {
    function TargetFlickerConfig(pathRegex, checkHash, domainList, cssSelectorList, preHideFunction, postHideFunction, timeout) {
        this.pathRegex = pathRegex;                // A regular expression that must match the current path
        this.checkHash = checkHash;                // If true then include anything past # when checking the path
        this.domainList = domainList;              // A list of domains or empty list to allow all domains
        this.cssSelectorList = cssSelectorList;    // A CSS selector indicating the element to hide
        this.preHideFunction = preHideFunction;    // The name of a Javascript function to run before the normal hiding logic is executed
        this.postHideFunction = postHideFunction;  // The name of a Javascript function to run after the normal hiding logic is executed
        this.timeout = timeout;                    // The max number of milliseconds to keep the element hidden
    }
 
    // IMPORTANT: This configuration should match the Target tag load rules
    const targetFlickerConfigList = [
        new TargetFlickerConfig(/^\/search$/, false, ['www-qa1.cvs.com', 'www-qa2.cvs.com'], ['main'], hideElements, showElements, 3000),
        // new TargetFlickerConfig(/^\/shop\/merch\/new$/, false, ['www-qa1.cvs.com', 'www-qa2.cvs.com'], ['main'], hideElements, showElements, 3000),
        // new TargetFlickerConfig(/^\/shop\/merch\/back-to-school$/, false, [], ['main'], hideElements, showElements, 3500),
        new TargetFlickerConfig(/^\/shop$/, false, [], ['main'], hideElements, showElements, 2500),
        // new TargetFlickerConfig(/^\/shop\/household\/cleaning-supplies$/, false, [], ['main'], hideElements, showElements, 2500),
        new TargetFlickerConfig(/^\/shop\/.*$/, false, [], ['main'], hideElements, showElements, 2500),
        // new TargetFlickerConfig(/^\/shop\/merch\/deals(?:[\?&#].*)?$/, false, [], ['main'], hideElements, showElements, 2500),
        // new TargetFlickerConfig(/^\/shop\/health-medicine\/cough-cold-flu(?:[\?&#].*)?$/, false, [], ['main'], hideElements, showElements, 2500),
        /* Below paths should not be included
            /rx/dotm/cart
            /rx/dotm/checkout
            /rx/dotm/receipt
            /shop
         */
    ];
 
    const isNotVEC = window.location.search.indexOf("adobe_authoring_enabled") === -1 &&
        window.location.search.indexOf("mboxEdit") === -1;
    const isMboxNotDisabled = window.location.search.indexOf("mboxDisable") === -1;
    const isDebug = window.location.search.indexOf('flickerDebug') > 0;
 
    if (isNotVEC && isMboxNotDisabled) {
        // Find matching configs based on pathRegex and domainList
        const targetFlickerConfigMatchList = targetFlickerConfigList.filter(config => {
            return config.pathRegex.test(config.checkHash ? window.location.pathname + window.location.hash : window.location.pathname) &&
                (!config.domainList.length || config.domainList.some((domain) => window.location.hostname === domain));
        });
 
        targetFlickerConfigMatchList.forEach(targetFlickerConfig => {
            processConfig(targetFlickerConfig)
        });
    }
 
    function processConfig(targetFlickerConfig) {
        doAntiFlicker(targetFlickerConfig);
        listenForTargetFinished(targetFlickerConfig);
    }
 
    function listenForTargetFinished(targetFlickerConfig) {
        // Target finished for alloy.js (Web SDK)
        window.__alloyMonitors = window.__alloyMonitors || [];
        window.__alloyMonitors.push({
            onCommandResolved(data) {
                if (isTargetAlloyCommand(data)) {
                    undoAntiFlicker(targetFlickerConfig);
                }
            },
            onCommandRejected(data) {
                if (isTargetAlloyCommand(data)) {
                    undoAntiFlicker(targetFlickerConfig);
                }
            }
        });
 
        // Timeout in case Target never runs.
        setTimeout(function () {
            undoAntiFlicker(targetFlickerConfig);
        }, targetFlickerConfig.timeout);
    }
 
    function doAntiFlicker(targetFlickerConfig) {
        if (isDebug) {
            console.debug(`Flicker DEBUG: Running anti-flicker.  Config = ${JSON.stringify(targetFlickerConfig)};`);
 
        }
        targetFlickerConfig.preHideFunction && targetFlickerConfig.preHideFunction.call(this, win, doc, targetFlickerConfig);
    }
 
    function undoAntiFlicker(targetFlickerConfig) {
        if (isDebug) {
            console.debug(`Flicker DEBUG: Rolling back anti-flicker.  Config = ${JSON.stringify(targetFlickerConfig)};`)
        }
        targetFlickerConfig.postHideFunction && targetFlickerConfig.postHideFunction.call(this, win, doc, targetFlickerConfig);
    }
 
    function isTargetAlloyCommand(data) {
        return data &&
            data.commandName === 'sendEvent' &&
            data.options && data.options.xdm &&
            data.options.xdm.eventType === 'decisioning.propositionFetch';
    }
 
    function hideElements(win, doc, targetFlickerConfig) {
        const styleId = 'at-body-style';
        if (!doc.querySelector(styleId)) {
            const styleElement = doc.createElement('style');
            styleElement.id = styleId;
            styleElement.innerHTML = `${targetFlickerConfig.cssSelectorList.join(',')} {opacity: 0 !important}`;
            doc.head.appendChild(styleElement);
        }
    }
 
    function showElements(win, doc, targetFlickerConfig) {
        const styleId = 'at-body-style';
        const styleElement = doc.getElementById(styleId);
 
        if (styleElement) {
            doc.head.removeChild(styleElement);
        }
    }
}
 
window.handleAntiFlicker(window, document);
} catch(e){ console.log(e) } }catch(e){console.log(e);}

