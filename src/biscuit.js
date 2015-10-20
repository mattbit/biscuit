/**
 * Biscuit
 * -------
 * A simple style-free cookie banner.
 * 
 * @author mattbit <me@mattbit.com>
 */
;(function () {
    'use strict';

    function Biscuit(options) {

        this.options = {
            cookie: 'biscuit',
            remember: 365,
            text: 'This website uses cookies to ensure you get the best experience.',
            link_text: 'More info',
            link: '/privacy',
            close_text: '&#x2715;',
            hideOnScroll: true,
            template: '<div id="cookie-banner"><div id="cookie-banner-container">' +
                      '<p>{{ text }} <a href="{{ link }}">{{ link_text }}</a>.</p>' +
                      '<button id="cookie-banner-close">{{ close_text }}</button>' +
                      '</div></div>',
            closeButtonId: 'cookie-banner-close',
            containerId: 'cookie-banner',
            delay: 0
        };

        for (var attr in options) {
            this.options[attr] = options[attr];
        }

        this.event = {
            add: function(obj, type, fn) {
                if (obj.attachEvent) {
                    obj['e'+type+fn] = fn;
                    obj[type+fn] = function() { obj['e'+type+fn](window.event); };
                    obj.attachEvent('on'+type, obj[type+fn]);
                } else {
                    obj.addEventListener(type, fn, false);
                }
            },
            remove: function(obj, type, fn) {
                if (obj.detachEvent) {
                    obj.detachEvent('on'+type, obj[type+fn]);
                    obj[type+fn] = null;
                } else {
                    obj.removeEventListener(type, fn, false);
                }
            }
        };

        this.cookie = {
            create: function (name, value, days) {
                var expires;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = "; expires="+date.toUTCString();
                }
                else { expires = ""; }
                document.cookie = name+"="+value+expires+"; path=/";
            },
            read: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0)===' ') { c = c.substring(1,c.length); }
                    if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length,c.length); }
                }
                return null;
            }
        };

        this.template = {
            parse: function (template, variables) {
                for (var varname in variables) {
                    template = template.replace(new RegExp('{{\\s?' + varname + '\\s?}}', 'g'), variables[varname]);
                }
                
                return template;
            }
        };

        if (!this.cookie.read(this.options.cookie)) {
            var biscuit = this;

            if (document.readyState == "complete" || document.readyState == "loaded") {
                biscuit.initialize();
            } else {
                this.event.add(document, 'DOMContentLoaded', function() {
                    biscuit.initialize()
                });
            }
        }
    }

    Biscuit.prototype.initialize = function() {
        var biscuit = this;

        biscuit.show();

        biscuit.event.add(document.getElementById(this.options.closeButtonId), 'click', function() {
            biscuit.remove();
        }, false);
                            
        if (biscuit.options.hideOnScroll) {
            var initialScroll;

            biscuit.event.add(window, 'scroll', function cookieScroll() {
                
                if (!initialScroll) {
                    initialScroll = window.scrollY;
                }

                if (window.scrollY > initialScroll + 200 || window.scrollY < initialScroll - 200) {
                    this.remove(1000);
                    this.event.remove(window, 'scroll', cookieScroll);
                }
            }, false);
        }
    };

    Biscuit.prototype.show = function() {

        var html = this.template.parse(this.options.template, {
            text: this.options.text,
            link: this.options.link,
            link_text: this.options.link_text,
            close_text: this.options.close_text
        });

        document.body.insertAdjacentHTML('afterbegin', html);

        var cookieBanner = document.getElementById(this.options.containerId);
        cookieBanner.className = 'show';
    };

    Biscuit.prototype.remove = function() {
        this.cookie.create(this.options.cookie, '1', this.options.remember);

        var cookieBanner = document.getElementById(this.options.containerId);
        
        cookieBanner.className = 'removing';
        setTimeout(function () {
                cookieBanner.remove();
        }, this.options.delay);
    };

    Biscuit.init = function(options) {
        return new Biscuit(options);
    };

    window.Biscuit = Biscuit;
})();
