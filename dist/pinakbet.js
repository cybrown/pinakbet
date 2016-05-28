/*!
 * pinakbet v0.0.10
 * (c) 2016 KFlash
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Pinakbet = factory());
}(this, function () { 'use strict';

    function greeter(person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    var index = {
        greeter: greeter
    };

    return index;

}));