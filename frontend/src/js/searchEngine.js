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
exports.SearchEngine = void 0;
// import { TinySegmenter } from "tiny-segmenter";
var TinySegmenter = require('tiny-segmenter');
var segmenter = new TinySegmenter();
var SearchEngine = /** @class */ (function () {
    function SearchEngine(ref, field) {
        this.ref = ref;
        this.field = field;
        this.docs = [];
    }
    SearchEngine.prototype.add = function (doc) {
        this.docs.push(doc);
    };
    SearchEngine.prototype.search = function (text) {
        var e_1, _a;
        if (!text)
            return [];
        var segments = segmenter.segment(text);
        var filtered = segments.filter(function (item) { return !item.match(/^(て|で|に|を|は|が|か|ん|の|や|ばかり|まで|だけ|ほど|も|こそ|でも|ば|と|ても|でも|けれど|けれども|な|とも|さ|よ|から|ぞ|ほど|です|ます|？)$/); });
        var filteredRegex = new RegExp(filtered.join("|"));
        console.log(filteredRegex);
        var matchList = [];
        try {
            for (var _b = __values(this.docs), _c = _b.next(); !_c.done; _c = _b.next()) {
                var doc = _c.value;
                if (doc[this.field].includes(text))
                    matchList.push(doc);
                else if (doc[this.field].match(filteredRegex)) {
                    matchList.push(doc);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return matchList;
    };
    return SearchEngine;
}());
exports.SearchEngine = SearchEngine;
