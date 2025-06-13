
// whats new on ver 2.0
// - removal of the max-height 300px on the CVSmain div

// whats new on ver 3.0
// - safeFrame expand

// whats new on ver 4.0
// resizeIframe : fixed the safeframe height by setting the body height explicitly

document.getElementById('CVSmain').innerHTML =
    '<div id="contentDesktop" class="CVScol1 mobileHide">' +
    '<div id="adDesktop" style="width:100%;height:100%;max-width:1280px" ></div>' +
    '</div>' +
    '<div id="contentMobile" class="CVScol1 desktopHide">' +
    '<div id="adMobile" style="width:100%;height:100%"></div>' +
    '</div>';


// below are clinch ad tags for desktop and mobile
// if the placement only require one of them, keep the other empty ( = '';)

var contentDesktop = document.getElementById('contentDesktop');
var contentMobile = document.getElementById('contentMobile');

var desktopAdded = false;
var mobileAdded = false;

// below method will inject the correct tag (desktop or mobile) but only once
function injectCorrectTag() {
    try {


        var _parentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        //var _parentHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        if (!_parentWidth) {//!_parentHeight ||
            return;
        }

        if (_parentWidth > 660 || _parentWidth <= 300) {
            contentDesktop.style.display = 'block';
            contentMobile.style.display = 'none';
            if (desktopAdded) return;
            desktopAdded = true;

            // inject the desktop clinch tag
            if (desktopTag) {
                var adDesktop = document.getElementById('adDesktop');
                adDesktop.innerHTML = desktopTag;
            }
        }
        else {
            contentDesktop.style.display = 'none';
            contentMobile.style.display = 'block';
            if (mobileAdded) return;
            mobileAdded = true;

            // inject the desktop clinch tag
            if (mobileTag) {
                var adMobile = document.getElementById('adMobile');
                adMobile.innerHTML = mobileTag;
            }
        }
    }
    catch (e) {

    }
};

function resizeIframe(iframe) {
    try {
        if (!iframe) {
            return;
        }


        var _parentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        //var _parentHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        if (!_parentWidth) {//!_parentHeight || 
            return;
        }

        if (!iframe.height || !iframe.width) {
            return;
        }

        // below sizing of the body is important since otherwise google code does not recognize the height of ad and set the height of the safeframe to 0
        document.body.style.height = iframe.height + 'px';
        document.body.style.position = 'absolute';
        

        iframe.style.position = 'absolute';
        var ratio = _parentWidth / iframe.width;

        if (ratio < 1) {
            iframe.style.transformOrigin = "top left";
            iframe.style.transform = "scale(" + ratio + ")";
        }
        else {
            iframe.style.transformOrigin = "";
            iframe.style.transform = "";
            if (ratio > 1) iframe.style.left = ((_parentWidth - iframe.width) / 2) + 'px';
            
        }
    }
    catch (e) {

    }
};
function resizeIframes() {
   
    var desktopAdIframe = contentDesktop.getElementsByTagName("iframe")[0];
    if (desktopAdIframe) {
        resizeIframe(desktopAdIframe);
    }
    var mobileAdIframe = contentMobile.getElementsByTagName("iframe")[0];
    if (mobileAdIframe) {
        resizeIframe(mobileAdIframe);
    }
};


window.addEventListener('resize', function () {
    injectCorrectTag();
    resizeIframes();
});
window.addEventListener("orientationchange", function () {
    injectCorrectTag();
    resizeIframes();
});

var styleElm = document.createElement("style");
document.head.appendChild(styleElm);
styleElm.sheet.insertRule("body{margin:0;padding:0;color:#fff;background:#fff;box-sizing:border-box;height:100%}", 0);
styleElm.sheet.insertRule("#CVSmain{width:100%;height:100%;top:0;left:0;margin:auto;padding:0;background-color:#fff}", 0);
injectCorrectTag();// run it once
resizeIframes();// run it once
