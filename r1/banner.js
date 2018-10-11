;(function() {
  var COOKIE_NAME = 'vote-banner__hide';

  var DEFAULT_CONFIG = {
    backgroundColor: '#f26522',
    fontColor: '#000',
    defaultButtonFontColor: '#fff',
    defaultButtonBackgroundColor: '#dc4700',
    defaultButtonBackgroundColorHover: '#8c3911',
    mainButtonFontColor: '#fff',
    mainButtonBackgroundColor: '#8f7fcc',
    mainButtonBackgroundColorHover: '#5c3fcc',
    text: '<strong>Nov 6</strong> elections: are you voting?'
  };

  var config = DEFAULT_CONFIG;
  if (window.voteBannerConfig) {
    for (var key in window.voteBannerConfig) {
      if (voteBannerConfig.hasOwnProperty(key)) {
        config[key] = window.voteBannerConfig[key];
      }
    }
  }

  var CSS = '\
    .vote-banner { \
      position: absolute; \
      top: -3em; \
      left: 0; \
      width: 100%; \
    } \
    .vote-banner__inner { \
      padding: 0.8em; \
      background-color: ' + config.backgroundColor + '; \
      color: ' + config.fontColor + '; \
      box-shadow: 0 1px 0 rgba(0,0,0,.1); \
      text-align: center; \
      font-size: 1em; \
      z-index: 2147483647; \
    } \
    .vote-banner__button-container { \
      display: inline-block; \
    } \
    .vote-banner__button { \
      border: 1px solid hsla(0,0%,2%,.25); \
      border-radius: 3px; \
      background-color: ' + config.defaultButtonBackgroundColor + '; \
      padding: 0.3em; \
      color: ' + config.defaultButtonFontColor + '; \
      cursor: pointer; \
      transition: background-color .2s ease,color .2s ease,border-color .2s ease; \
      font-size: 0.8em; \
      text-decoration: none; \
    } \
    .vote-banner__button:hover { \
      color: ' + config.defaultButtonFontColor + '; \
      background-color: ' + config.defaultButtonBackgroundColorHover + '; \
      text-decoration: none; \
    } \
    .vote-banner__cta { \
      color: ' + config.mainButtonFontColor + '; \
      background-color: ' + config.mainButtonBackgroundColor + '; \
    } \
    .vote-banner__cta:hover { \
      color: ' + config.mainButtonFontColor + '; \
      background-color: ' + config.mainButtonBackgroundColorHover + '; \
    } \
    .vote-banner__close { \
      position: absolute; \
      right: 14px; \
      top: 8px; \
      font-size: 1.5em; \
      color: #404040; \
      cursor: pointer; \
    } \
    .vote-banner__close:hover { \
      color: #000; \
    } \
    @media screen and (max-width: 960px) { \
      .vote-banner__inner { \
        padding: 0.45em; \
        font-size: 0.85em; \
        line-height: 1.3em; \
      } \
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

  var prevBodyTransform = '';
  function adjustBody(reverse) {
    if (reverse) {
      document.body.style.transform = prevBodyTransform;
    } else {
      prevBodyTransform = document.body.style.transform;
			var elt = document.getElementById('vote-banner');
			var px = Math.abs(elt.getBoundingClientRect().top);
      document.body.style.transform = 'translate(0, ' + px + 'px)';
			px -= Math.abs(elt.getBoundingClientRect().top);
			console.log(px);
      document.body.style.transform = 'translate(0, ' + px + 'px)';
    }
  }

  function wireCloseButton() {
    // Use this instead of an inline to avoid running into unsafe-inline
    // content security policies.
    document.getElementById('vote-banner__close').onclick = function() {
      window.__voteBanner_close();
    }
  }

  window.__voteBanner_close = function() {
    var elt = document.getElementById('vote-banner');
    elt.parentNode.removeChild(elt);

    adjustBody(true /* reverse */);

    createCookie(COOKIE_NAME, 1, 7);
  }

  window.__voteBanner_resetCookie = function() {
    createCookie(COOKIE_NAME, '', -1);
  }

  function addBanner() {
    document.body.insertAdjacentHTML("afterbegin",
"<div id='vote-banner' class='vote-banner vote-banner__override'><div class='vote-banner__inner'>" + config.text + " &nbsp;\
<div class='vote-banner__button-container'> \
<a id='vote-banner__register' class='vote-banner__button vote-banner__cta' href='https://bit.ly/2ILc8Ro' target='_blank'>Register to Vote</a> \
<a id='vote-banner__lookup' class='vote-banner__button' href='https://bit.ly/2Cb2FS2' target='_blank'>Get Polling Location</a> \
</div> \
<div id='vote-banner__close' class='vote-banner__close'>&times;</div></div> \
</div>");
  }

  function createCookie(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    }
    else {
      expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1,c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length,c.length);
      }
    }
    return null;
  }

  if (readCookie(COOKIE_NAME)) {
    return;
  }

  injectStyles();
  addBanner();
  wireCloseButton();
  adjustBody();
})();
