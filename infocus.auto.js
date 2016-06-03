/*
 * This file is part of infocus.
 *
 * infocus is copyright BytesNZ 2016 (http://github.com/bytesnz)
 *
 * infocus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * infocus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener("DOMContentLoaded", function(event) { 
  require('./infocus.js')('infocus');
});

},{"./infocus.js":2}],2:[function(require,module,exports){
'use strict';

function findLabel(input) {
  var label = null;
  if (input.hasAttribute('id')) {
    label = document.querySelector('label[for="'
        + input.getAttribute('id') + '"]');
  }

  if (!label) {
    label = input;
    while ((label = label.parentElement)) {
      if (label.nodeName === 'LABEL') {
        break;
      }
    }
  }

  return label;
}

function infocus(options) {
  var map;

    if (typeof options === 'string') {
    options = {
      focusClass: options
    };
  } else if (typeof options === 'undefined') {
    options = {};
  }

  if (!options.inputSelector) {
    options.inputSelector = 'input, textarea, select';
  }

  if (!options.focusClass) {
    options.focusClass = 'infocus';
  }

  function focus(label) {
    if (!label.classList.contains(options.focusClass)) {
      label.classList.add(options.focusClass);
    }
  }

  function blur(label) {
    if (label.classList.contains(options.focusClass)) {
      label.classList.remove(options.focusClass);
    }
  }

  if (options.storeLabels) {
    if (typeof WeakMap === 'function') {
      map = new WeakMap();
    } else {
      console.warn('WeakMap not available - not storing associated labels');
    }
  }

  if (options.useDocListener) {
    document.addEventListener('focus', function(event) {
      var label;
      if (event.target.matches(options.inputSelector)) {
        if (map && (label = map.get(event.target))) {
          focus(label);
        } else if ((label = findLabel(event.target))) {
          focus(label);
          if (map) {
            map.set(event.target, label);
          }
        }
      }
    }, true);
    document.addEventListener('blur', function(event) {
      var label;
      if (event.target.matches(options.inputSelector)) {
        if (map && (label = map.get(event.target))) {
          blur(label);
        } else if ((label = findLabel(event.target))) {
          blur(label);
          if (map) {
            map.set(event.target, label);
          }
        }
      }
    }, true);
  } else {
    var inputs = document.querySelectorAll(options.inputSelector);

    var i, label, length = inputs.length;
    for (i = 0; i < length; i++) {
      if ((label = findLabel(inputs[i]))) {
        inputs[i].addEventListener('focus', focus.bind(this, label));
        inputs[i].addEventListener('blur', blur.bind(this, label));
      }
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = infocus;
}

},{}]},{},[1])