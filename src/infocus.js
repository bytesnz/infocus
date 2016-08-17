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
 */
'use strict';

/** @internal
 * Find the label associated with the given DOM element
 *
 * @param {HTMLDOMObject} input Input to find the label of
 *
 * @returns {HTMLDOMObject|null} The label element or null if no
 *   label element was found
 */
function findLabel(input) {
  var label = null;
  // Find label associated with the id - assume that the id is unique
  if (input.hasAttribute('id')) {
    label = document.querySelector('label[for="'
        + input.getAttribute('id') + '"]');
  }

  // Find the parent label
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

/**
 * Adds event listeners on to inputs to add/remove a class on the associated
 * label if the input is in focus or not.
 * 
 * @param {Object} options Options for in focus
 * @param {String} options.focusClass Class that will be added/removed from
 *   the label, default is 'infocus'
 * @param {String} options.inputSelector Selector to select inputs to add event
 *   listeners to, default is 'input, textarea, select'
 * @param {Boolean} useDocListener Use an event listener on the document,
 *   rather than each input
 * @param {Boolean} storeLabels Whether to store the labels associated
 *   with each input on the input DOM Object
 *
 * @returns {undefined}
 */
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

  /**@internal
   * Event handler function for focus events
   *
   * @param {HTMLDOMObject} label Label element to add class to
   *
   * @returns {undefined}
   */
  function focus(label) {
    if (!label.classList.contains(options.focusClass)) {
      label.classList.add(options.focusClass);
    }
  }

  /**@internal
   * Event handler function for blur events
   *
   * @param {HTMLDOMObject} label Label element to add class to
   *
   * @returns {undefined}
   */
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
    // Attach a listener to the document for focus/blur events
    document.addEventListener('focus', function(event) {
      var label;
      if (typeof event.target.matches === 'function'
          && event.target.matches(options.inputSelector)) {
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
      if (typeof event.target.matches === 'function'
          && event.target.matches(options.inputSelector)) {
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
    // Find all inputs (including textareas and selects)
    var inputs = document.querySelectorAll(options.inputSelector);

    // Go through inputs, find associated label and attach event handler to input
    var i, label, length = inputs.length;
    for (i = 0; i < length; i++) {
      // Try and find a label, attach event listeners to the input
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
