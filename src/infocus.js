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

/**
 * Adds event listeners on to inputs to add/remove a class on the associated
 * label if the input is in focus or not.
 *
 * @param {String} focusClass Class that will be added/removed from the label,
 *        default is 'infocus'
 * @param {String} inputSelector Selector to select inputs to add event
 *        listeners to, default is 'input, textarea, select'
 *
 * @returns {undefined}
 */
function infocus(focusClass, inputSelector) {
  function focus(label) {
    if (!label.classList.contains(focusClass)) {
      label.classList.add(focusClass);
    }
  }

  function blur(label) {
    if (label.classList.contains(focusClass)) {
      label.classList.remove(focusClass);
    }
  }

  if (!inputSelector) {
    inputSelector = 'input, textarea, select';
  }

  if (!focusClass) {
    focusClass = 'infocus';
  }

  // Find all inputs (including textareas and selects)
  var inputs = document.querySelectorAll(inputSelector);

  // Go through inputs, find associated label and attach event handler to input
  var i, label, length = inputs.length;
  for (i = 0; i < length; i++) {
    label = null;
    // Find label associated with the id - assume that the id is unique
    if (inputs[i].hasAttribute('id')) {
      label = document.querySelector('label[for="'
          + inputs[i].getAttribute('id') + '"]');
    }

    // Find the parent label
    if (!label) {
      label = inputs[i];
      while ((label = label.parentElement)) {
        if (label.nodeName === 'LABEL') {
          break;
        }
      }
    }

    // If we found a label, attach event listeners to the input
    if (label) {
      inputs[i].addEventListener('focus', focus.bind(this, label));
      inputs[i].addEventListener('blur', blur.bind(this, label));
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = infocus;
}
