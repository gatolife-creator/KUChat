"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.Filter = void 0;
var Filter = /** @class */ (function () {
    function Filter(list) {
        this.regex = this.setFilterList(list);
    }
    Filter.prototype.setFilterList = function (list) {
        var e_1, _a;
        var regexStringArray = [];
        try {
            for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                var word = list_1_1.value;
                regexStringArray.push(word);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (list_1_1 && !list_1_1.done && (_a = list_1["return"])) _a.call(list_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new RegExp(regexStringArray.join('|'), 'igm');
    };
    Filter.prototype.filtering = function (sentence) {
        return sentence.replace(this.regex, "[deleted]");
    };
    Filter.prototype.isPure = function (sentence) {
        if (sentence.match(this.regex))
            return false;
        else
            return true;
    };
    return Filter;
}());
exports.Filter = Filter;
