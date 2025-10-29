"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fragment = exports.h = void 0;
exports.createElement = createElement;
exports.createFragment = createFragment;
function createElement(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    props = props || {};
    var flatChildren = children
        .flat()
        .filter(function (c) { return c != null; });
    return { type: type, props: props, children: flatChildren };
}
function createFragment(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    return createElement.apply(void 0, __spreadArray(["fragment", props], children, false));
}
exports.h = createElement;
exports.Fragment = createFragment;
var vnode = createElement("div", { className: "test" }, "Hello World");
console.log(vnode);
