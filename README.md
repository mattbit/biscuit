## Biscuit

Biscuit is a simple Javascript library to display a cookie law banner.
It has no dependency and is style-free.

### Usage

Include the script in you page:

```html
<script type="text/javascript" src="biscuit.min.js"></script>
```

Then initialize the banner:

```js
    Biscuit.init({
        cookie: "biscuit_consent", // The name of the cookie used to remember the consent
        expire: 365, // Number of days the cookie will be kept
        text: "This website uses cookies ;)",
        link: "/cookie-policy",
        link_text: "More info",
        hideOnScroll: true
    });
```

You can also manually remove/insert the banner:

```js
    var biscuit = Biscuit.init();
    
    biscuit.remove(); // Removes the banner (and sets a cookie to remember the consent)
    biscuit.show(); // Shows the banner
``` 
