var mixer = document.getElementById("mixer");
var editor = document.getElementById("editor");
var workarea = document.getElementById("workarea");
var topbar = document.getElementById("topbar");
var controlpanel = document.getElementById("controlpanel");
var bottombar = document.getElementById("bottombar");
var root = document.getElementById("root");

function setEditorHeight(height) {
  editor.style.height = height + '%';
  mixer.style.height = 100-height + '%';
}

function setWindowHeight(height) {
  root.style.height = height.toString() + 'px';
  console.log(root.style.height);

  wh = (height - px(topbar, 'height') - px(controlpanel, 'height') - px(bottombar, 'height')).toString() + 'px';
  workarea.style.height = wh;
  console.log(workarea.style.height);
}

setEditorHeight(35);
setWindowHeight(800);

function px(el, styleProp) {
  return parseFloat(getStyle(el, styleProp).slice(0, -2));
}

function getStyle(el, styleProp) {
  // Function borrowed from stackoverflow user CMS
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex|px)?$/i.test(value)) {
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}