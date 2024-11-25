/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var appState = {
  currentStyle: "page2.css",
  styles: {
    "Styl 1": "style/page1.css",
    "Styl 2": "style/page2.css",
    "Styl 3": "style/page3.css"
  }
};
function changeStyle(styleName) {
  var head = document.head;
  var existingLink = document.querySelector("link[rel='stylesheet']");
  if (existingLink) {
    head.removeChild(existingLink);
  }
  var newLink = document.createElement("link");
  newLink.rel = "stylesheet";
  newLink.href = appState.styles[styleName];
  head.appendChild(newLink);
  appState.currentStyle = appState.styles[styleName];
}
function createStyleSwitcher() {
  var footer = document.querySelector("footer");
  if (!footer) return;
  var styleSwitcher = document.createElement("div");
  styleSwitcher.id = "style-switcher";
  styleSwitcher.style.marginTop = "10px";
  Object.keys(appState.styles).forEach(function (styleName) {
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = styleName;
    link.style.marginRight = "10px";
    link.addEventListener("click", function () {
      return changeStyle(styleName);
    });
    styleSwitcher.appendChild(link);
  });
  footer.appendChild(styleSwitcher);
}
createStyleSwitcher();
/******/ })()
;