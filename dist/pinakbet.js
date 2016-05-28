(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Sonai = factory());
}(this, function () { 'use strict';

    function greeter(person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    var index = {
        greeter: greeter
    };

    return index;

}));