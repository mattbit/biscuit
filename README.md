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
        close_text: '&#x2715;', // The close button text
        hideOnScroll: true,
        template: '<div id="cookie-banner">{{ text }} <button id="close-btn">{{ close_text }}</button></div>',
        containerId: 'cookie-banner', // Adjust to your needs if you use a custom template
        closeButtonId: 'close-btn' 
    });
```

The variables available inside the template are `text`, `link`, `link_text`, `close_text`.

You can also manually remove/insert the banner:

```js
    var biscuit = Biscuit.init();
    
    biscuit.remove(); // Removes the banner (and sets a cookie to remember the consent)
    biscuit.show(); // Shows the banner
``` 

## To do

- Write tests
