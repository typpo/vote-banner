var CSS = '\
  .vote-banner { \
    position: absolute; \
    top: 0; \
    left: 0; \
    width: 100%; \
    padding: 0.8em; \
    background-color: #f26522; \
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
    background-color: #e25f20; \
    padding: 0.3em; \
    color: #fff; \
    cursor: pointer; \
    transition: background-color .2s ease,color .2s ease,border-color .2s ease; \
    font-size: 0.8em; \
    text-decoration: none; \
  } \
  .vote-banner__button:hover { \
    background-color: #8c3911; \
  } \
  .vote-banner__cta { \
    background-color: #8f7fcc; \
  } \
  .vote-banner__cta:hover { \
    background-color: #5c3fcc; \
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
  div.className = "vote-banner__wrap";

  // Move the body's children into this wrapper
  while (document.body.firstChild) {
    div.appendChild(document.body.firstChild);
  }

  // Append the wrapper to the body
  document.body.appendChild(div);
}

function addBanner() {
  document.body.insertAdjacentHTML("afterbegin",
                                   "<div class='vote-banner'><strong>Nov 6</strong> elections: are you voting? &nbsp;\
                                   <a id='vote-banner__register' class='vote-banner__button vote-banner__cta' href='https://www.vote.org/register-to-vote/' target='_blank'>Register to Vote</a> \
                                   <a id='vote-banner__lookup' class='vote-banner__button' href='https://www.vote.org/polling-place-locator/' target='_blank'>Get Polling Location</a> \
                                   </div>");
}

injectStyles();
wrapBody();
addBanner();
