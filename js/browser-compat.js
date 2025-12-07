// Browser Compatibility Polyfills
// Ensures website works on all browsers including older ones

(function() {
    'use strict';

    // Polyfill for Array.find() - IE11 support
    if (!Array.prototype.find) {
        Array.prototype.find = function(predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = parseInt(list.length) || 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }

    // Polyfill for Array.includes() - IE11 support
    if (!Array.prototype.includes) {
        Array.prototype.includes = function(searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = parseInt(o.length) || 0;
            if (len === 0) {
                return false;
            }
            var n = parseInt(fromIndex) || 0;
            var k = n >= 0 ? n : Math.max(len + n, 0);
            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
            for (; k < len; k++) {
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
            }
            return false;
        };
    }

    // Polyfill for String.startsWith() - IE11 support
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    // Polyfill for String.endsWith() - IE11 support
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(searchString, length) {
            if (length === undefined || length > this.length) {
                length = this.length;
            }
            return this.substring(length - searchString.length, length) === searchString;
        };
    }

    // Polyfill for Object.assign() - IE11 support
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }

    // Polyfill for Promise - IE11 support
    if (typeof Promise === 'undefined') {
        window.Promise = function(executor) {
            var self = this;
            self.state = 'pending';
            self.value = undefined;
            self.handlers = [];

            function resolve(result) {
                if (self.state === 'pending') {
                    self.state = 'fulfilled';
                    self.value = result;
                    self.handlers.forEach(handle);
                    self.handlers = null;
                }
            }

            function reject(error) {
                if (self.state === 'pending') {
                    self.state = 'rejected';
                    self.value = error;
                    self.handlers.forEach(handle);
                    self.handlers = null;
                }
            }

            function handle(handler) {
                if (self.state === 'pending') {
                    self.handlers.push(handler);
                } else {
                    if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
                        handler.onFulfilled(self.value);
                    }
                    if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
                        handler.onRejected(self.value);
                    }
                }
            }

            self.then = function(onFulfilled, onRejected) {
                return new Promise(function(resolve, reject) {
                    handle({
                        onFulfilled: function(result) {
                            try {
                                resolve(onFulfilled ? onFulfilled(result) : result);
                            } catch (ex) {
                                reject(ex);
                            }
                        },
                        onRejected: function(error) {
                            try {
                                resolve(onRejected ? onRejected(error) : error);
                            } catch (ex) {
                                reject(ex);
                            }
                        }
                    });
                });
            };

            try {
                executor(resolve, reject);
            } catch (ex) {
                reject(ex);
            }
        };
    }

    // Polyfill for fetch() - IE11 support
    if (typeof window.fetch === 'undefined') {
        window.fetch = function(url, options) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(options && options.method || 'GET', url);
                
                if (options && options.headers) {
                    Object.keys(options.headers).forEach(function(key) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    });
                }
                
                xhr.onload = function() {
                    var response = {
                        ok: xhr.status >= 200 && xhr.status < 300,
                        status: xhr.status,
                        statusText: xhr.statusText,
                        json: function() {
                            return Promise.resolve(JSON.parse(xhr.responseText));
                        },
                        text: function() {
                            return Promise.resolve(xhr.responseText);
                        }
                    };
                    resolve(response);
                };
                
                xhr.onerror = function() {
                    reject(new Error('Network request failed'));
                };
                
                xhr.send(options && options.body || null);
            });
        };
    }

    // Fix for CSS Grid in older browsers
    if (!window.CSS || !CSS.supports || !CSS.supports('display', 'grid')) {
        // Add fallback styles for browsers without grid support
        var style = document.createElement('style');
        style.textContent = `
            @supports not (display: grid) {
                .grid, [class*="grid"] {
                    display: flex;
                    flex-wrap: wrap;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Fix for CSS Custom Properties (CSS Variables) in IE11
    if (!window.CSS || !CSS.supports || !CSS.supports('color', 'var(--fake-var)')) {
        // Polyfill for CSS variables would go here
        // For now, we'll ensure fallback colors are used
        console.log('CSS Variables not supported, using fallback styles');
    }

    // Ensure images load with error handling
    document.addEventListener('DOMContentLoaded', function() {
        var images = document.querySelectorAll('img');
        images.forEach(function(img) {
            // Fix relative paths to absolute
            if (img.src && !img.src.startsWith('http') && !img.src.startsWith('/')) {
                var currentPath = window.location.pathname;
                var basePath = currentPath.substring(0, currentPath.lastIndexOf('/')) || '';
                if (img.src.startsWith('./')) {
                    img.src = basePath + img.src.substring(1);
                } else if (!img.src.startsWith('/')) {
                    img.src = basePath + '/' + img.src;
                }
            }
            
            // Add error handler
            img.onerror = function() {
                console.warn('Image failed to load:', this.src);
                // Optionally set a placeholder
                if (!this.hasAttribute('data-placeholder-set')) {
                    this.setAttribute('data-placeholder-set', 'true');
                    this.style.backgroundColor = '#f0f0f0';
                    this.style.minHeight = '200px';
                }
            };
        });
    });

    console.log('Browser compatibility polyfills loaded');
})();

