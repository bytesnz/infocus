infocus

A super simple pure javascript script to add a class to an input's label when
the input is in focus (and remove it when it loses focus). It was created so
that in focus styling could be added to labels of radio buttons and checkboxes
that had been stlyed to be like buttons rather than a label and a
radio/checkbox


The script determines which label is associated with which label by using the
`id` and `for` attributes of the input and label if they are set, or by going
through the parent elements of the input to find a label element.

The script is pure Javascript and uses
[`classList`](http://caniuse.com/#feat=classlist),
[`querySelector`](http://caniuse.com/#feat=queryselector), and
[`addEventListener`](http://caniuse.com/#feat=addeventlistener)
(the auto script also uses
[`DOMContentLoaded`](http://caniuse.com/#feat=domcontentloaded),
hence it will require shims/polyfills to support older browsers.

Example Use:

```javascript
<script src="infocus.js"></script>
<script>
  // DOMContentLoaded also requires a shim/polyfill for <IE9
  document.addEventListener("DOMContentLoaded", function(event) { 
    infocus('focus');
  });
</script>
```
