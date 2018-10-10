(function() {
  var DEFAULT_CONFIG = {
    backgroundColor: '#f26522',
    buttonBackgroundColor: '#dc4700',
  };

  var config = DEFAULT_CONFIG;
  if (window.voteBannerConfig) {
    for (var key in window.voteBannerConfig) {
      if (voteBannerConfig.hasOwnProperty(key)) {
        config[key] = window.voteBannerConfig[val];
      }
    }
  }

  var CSS = '\
    .vote-banner { \
      position: absolute; \
      top: 0; \
      left: 0; \
      width: 100%; \
      padding: 0.8em; \
      background-color: ' + config.backgroundColor + '; \
      color: #000; \
      box-shadow: 0 1px 0 rgba(0,0,0,.1); \
      text-align: center; \
      font-size: 1em; \
      z-index: 2147483647; \
    } \
    .vote-banner__wrap { \
      position: relative; \
      margin-top: 2.7em; \
    } \
    .vote-banner__button { \
      border: 1px solid hsla(0,0%,2%,.25); \
      border-radius: 3px; \
      background-color: ' + config.buttonBackgroundColor + '; \
      padding: 0.3em; \
      color: #fff; \
      cursor: pointer; \
      transition: background-color .2s ease,color .2s ease,border-color .2s ease; \
      font-size: 0.8em; \
      text-decoration: none; \
    } \
    .vote-banner__button:hover { \
      background-color: #8c3911; \
      color: #fff; \
      text-decoration: none; \
    } \
    .vote-banner__cta { \
      background-color: #8f7fcc; \
    } \
    .vote-banner__cta:hover { \
      background-color: #5c3fcc; \
    } \
    .vote-banner__close { \
      position: absolute; \
      right: 2em; \
      top: 0.4em; \
      font-size: 1.5em; \
      color: #404040; \
      cursor: pointer; \
    } \
    .vote-banner__close:hover { \
      color: #000; \
    } \
  ';

  function injectStyles() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = CSS;
    } else {
      style.appendChild(document.createTextNode(CSS));
    }
    head.appendChild(style);
  }

  function wrapBody() {
    var div = document.createElement("div");
    div.id = "vote-banner__wrap";
    div.className = "vote-banner__wrap";

    // Move the body's children into this wrapper
    while (document.body.firstChild) {
      div.appendChild(document.body.firstChild);
    }

    // Append the wrapper to the body
    document.body.appendChild(div);
  }

  var bannerEmSize;
  function adjustPositionFixed(reverse) {
    var elems = document.body.getElementsByTagName("*");
    bannerEmSize = bannerEmSize || parseFloat(getComputedStyle(document.getElementById('vote-banner')).fontSize);
    // Multiply by .vote-banner__wrap em height
    var emAdjust = bannerEmSize * 2.7;
    for (var i=0; i < elems.length; i++) {
      var elem = elems[i];
      if (window.getComputedStyle(elem, null).getPropertyValue('position') == 'fixed') {
        if (reverse) {
          elem.style.top = ((parseFloat(elem.style.top) || 0) - emAdjust) + 'px';
        } else {
          elem.style.top = ((parseFloat(elem.style.top) || 0) + emAdjust) + 'px';
        }
      }
    }
  }

  function wireCloseButton() {
    // Use this instead of an inline to avoid running into unsafe-inline
    // content security policies.
    document.getElementById('vote-banner__close').onclick = function() {
      window.closeVoteBanner();
    }
  }

  window.closeVoteBanner = function() {
    var elt = document.getElementById('vote-banner');
    elt.parentNode.removeChild(elt);
    adjustPositionFixed(true /* reverse */);
    document.getElementById('vote-banner__wrap').style.marginTop = 0;
  }

  function addBanner() {
    document.body.insertAdjacentHTML("afterbegin",
"<div id='vote-banner' class='vote-banner'><strong>Nov 6</strong> elections: are you voting? &nbsp;\
<a id='vote-banner__register' class='vote-banner__button vote-banner__cta' href='http://bit.ly/2ILc8Ro' target='_blank'>Register to Vote</a> \
<a id='vote-banner__lookup' class='vote-banner__button' href='http://bit.ly/2Cb2FS2' target='_blank'>Get Polling Location</a> \
<div id='vote-banner__close' class='vote-banner__close'>&times;</div> \
</div>");
  }

  injectStyles();
  wrapBody();
  addBanner();
  adjustPositionFixed();
  wireCloseButton();
})();
