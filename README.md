#infocus

A super simple pure javascript to add a class to an input element's associated
label element when the input element is in focus (and remove it when it loses
focus). It was created so that in focus styling could be added to labels of
radio buttons and checkboxes that had been stlyed to be like buttons rather
than a label and a radio/checkbox (will be redundant when CSS4 comes out).


The script determines which label element is associated with which input
element by using the `id` and `for` attributes of the input and label if they
are set, or by going through the parent elements of the input to find a
label element.

The script is pure Javascript and uses
[`classList`](http://caniuse.com/#feat=classlist),
[`querySelector`](http://caniuse.com/#feat=queryselector), and
[`addEventListener`](http://caniuse.com/#feat=addeventlistener).
The auto script uses
[`DOMContentLoaded`](http://caniuse.com/#feat=domcontentloaded),
The `storeLabels` option uses
[`WeakMap`](http://kangax.github.io/compat-table/es6/#test-WeakMap).
If you need to support older browsers, you will need to use
shims/polyfills.

## infocus usage
Make it just work (will find all `<input>`, `<select>` and `<textarea>`
input elements and will the `infocus` class to their associated `<label>`
elements when they are in focus):

```html
<script src="infocus.auto.min.js"></script>
```

Customise:

```html
<script src="infocus.min.js"></script>
<script>
  infocus({
    focusClass: 'focus',
    useDocListener: true
  });
</script>
```

The single parameter to `infocus()` can either be the class to add to labels
when their associated input is in focus, or an Object of options:
- `focusClass` {String} - The class to add to labels when their associated
  input is in focus, default is `"infocus"`
- `inputSelector` {String} - The selector string to find inputs to add the
  class to, default is `"input, select, textarea"`
- `useDocListener` {Boolean} - Whether to use a single event listener on the
  document, or individual listeners on each input
- `storeLabels` {Boolean} - If `true` (and `WeakMap` is available), labels will
  be stored with their associated inputs
