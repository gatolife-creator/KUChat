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
exports.Quadratic = exports.Linear = exports.Box = exports.Sphere = exports.Polygon = exports.Quad3D = exports.Triangle3D = exports.Line3D = exports.Point3D = exports.Circle = exports.Quad = exports.Triangle = exports.Line = exports.Point = void 0;
/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
var Manager = /** @class */ (function () {
    function Manager() {
    }
    Manager.displayError = function (conditions) {
        var e_1, _a;
        var message = "ConditionalError: You must follow the following rules:";
        try {
            for (var conditions_1 = __values(conditions), conditions_1_1 = conditions_1.next(); !conditions_1_1.done; conditions_1_1 = conditions_1.next()) {
                var condition = conditions_1_1.value;
                message += "\n\t".concat(condition);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (conditions_1_1 && !conditions_1_1.done && (_a = conditions_1["return"])) _a.call(conditions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw message;
    };
    return Manager;
}());
var Point = /** @class */ (function () {
    /**
     *
     * @param x X coordinate
     * @param y Y coordinate
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Find the distance between 2 points.
     * 2点間の距離を求める。
     * */
    Point.dist = function (p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    };
    /**
     * In search of the middle point.
     * 中点を求める。
     *  */
    Point.getMidpoint = function (p1, p2) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    };
    /**
     * Finding a symmetrical point for specific points.
     * 特定の点に対して対称な点を求める。
     * */
    Point.getSymmetricPoint = function (p, center) {
        var x = center.x - p.x;
        var y = center.y - p.y;
        return new Point(center.x + x, center.y + y);
    };
    /**
     * Finding the center of gravity between 3 points.
     * 3点間の重心を求める。
     * */
    Point.getBarycenter = function (p1, p2, p3) {
        return new Point((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3);
    };
    /**
     * Finding the circumcenter.
     * 外心を求める。
     */
    Point.getCircumcenter = function (p1, p2, p3) {
        var l1 = new Line(p1, p2);
        var l2 = new Line(p2, p3);
        var perpendicularBisector1 = l1.getPerpendicularBisector();
        var perpendicularBisector2 = l2.getPerpendicularBisector();
        return perpendicularBisector1.getIntersection(perpendicularBisector2);
    };
    /**
     * Finding the orthocenter.
     * 垂心を求める。
     */
    Point.getOrthocenter = function (p1, p2, p3) {
        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;
        var x3 = p3.x;
        var y3 = p3.y;
        var l1 = new Linear("".concat((y2 - y1) / (x2 - x1), "x+").concat(-((y2 - y1) / (x2 - x1)) + y1));
        var l2 = new Linear("".concat((y3 - y2) / (x3 - x2), "x+").concat(-((y3 - y2) / (x3 - x2)) + y2));
        var perpendicularLinear1 = l1.getPerpendicularLinear(p3);
        var perpendicularLinear2 = l2.getPerpendicularLinear(p1);
        return perpendicularLinear1.getIntersection(perpendicularLinear2);
    };
    /**
     * Finding the inner center.
     * 内心を求める。
     */
    Point.getInnerCenter = function (p1, p2, p3) {
        var A = p1;
        var B = p2;
        var C = p3;
        var AB = new Line(A, B);
        var BC = new Line(B, C);
        var CA = new Line(C, A);
        var P = BC.getDividingPoint(AB.getLength(), CA.getLength());
        var Q = CA.getDividingPoint(BC.getLength(), AB.getLength());
        var AP = new Line(A, P);
        var BQ = new Line(B, Q);
        return AP.getIntersection(BQ);
    };
    /**
     * Finding the excenters.
     * 傍心を求める。
     */
    Point.getExcenters = function (p1, p2, p3) {
        var A = p1;
        var B = p2;
        var C = p3;
        var BA = new Line(A, B);
        var CB = new Line(B, C);
        var AC = new Line(C, A);
        var P = CB.getDividingPoint(BA.getLength(), -AC.getLength());
        var Q = BA.getDividingPoint(AC.getLength(), -CB.getLength());
        var R = AC.getDividingPoint(CB.getLength(), -BA.getLength());
        var AP = new Line(A, P);
        var CQ = new Line(C, Q);
        var BR = new Line(B, R);
        return [AP.getIntersection(CQ), CQ.getIntersection(BR), BR.getIntersection(AP)];
    };
    /**
     * Finding a secondary function through 3 points.
     * 3点を通る二次関数を求める。
     */
    Point.estimateQuadraticByThreePoints = function (p1, p2, p3) {
        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;
        var x3 = p3.x;
        var y3 = p3.y;
        var b = (((y3 - y1) * Math.pow(x2, 2) - (y3 - y1) * Math.pow(x1, 2)) -
            ((y2 - y1) * Math.pow(x3, 2) - (y2 - y1) * Math.pow(x1, 2))) /
            ((x2 - x1) * (Math.pow(x1, 2) - Math.pow(x3, 2)) -
                ((x3 - x1) * (Math.pow(x1, 2) - Math.pow(x2, 2))));
        var a = ((y2 - y1) - b * (x2 - x1)) / (Math.pow(x2, 2) - Math.pow(x1, 2));
        var c = y1 - a * Math.pow(x1, 2) - b * x1;
        return new Quadratic("".concat(a, "x^2+").concat(b, "x+").concat(c));
    };
    /**
     * Enlarge and shrink according to the reference point.
     * 基準点に合わせて拡大縮小する。
     */
    Point.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, this);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        return new Point(p1.x, p1.y);
    };
    /**
     * Find the origin.
     * 原点を求める。
     *  */
    Point.O = function () {
        return new Point(0, 0);
    };
    Point.prototype.draw = function (p5) {
        p5.point(this.x, this.y);
    };
    return Point;
}());
exports.Point = Point;
var Line = /** @class */ (function () {
    /**
     *
     * @param start Coordinate of start point
     * @param end Coordinate of end point
     */
    function Line(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Find the point that divides the line.
     * 線分を二分する点を求める。
     *  */
    Line.prototype.getMidpoint = function () {
        return Point.getMidpoint(this.start, this.end);
    };
    /**
     * Find the inner division.
     * 内分点を求める。
     *  */
    Line.prototype.getInteriorPoint = function (m, n) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        }
        else {
            return new Point((this.start.x * n + this.end.x * m) / (m + n), (this.start.y * n + this.end.y * m) / (m + n));
        }
    };
    /**
     * Finding the outer sorting point.
     * 外分点を求める。
     *  */
    Line.prototype.getExteriorPoint = function (m, n) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        }
        else {
            return new Point((-this.start.x * n + this.end.x * m) / (m - n), (-this.start.y * n + this.end.y * m) / (m - n));
        }
    };
    /**
     * Incidental divisions and outer sarings.
     * 内分点、外分点を求める。
     */
    Line.prototype.getDividingPoint = function (m, n) {
        return new Point((this.start.x * n + this.end.x * m) / (m + n), (this.start.y * n + this.end.y * m) / (m + n));
    };
    /**
     * Find the length of the line.
     * 線の長さを求める。
     *  */
    Line.prototype.getLength = function () {
        return Point.dist(this.start, this.end);
    };
    /**
     * Find the distance between a point and a straight line.
     * 点と直線の距離を求める。
     *  */
    Line.prototype.getDistBetweenPoint = function (p) {
        var a = (this.end.y - this.start.y) /
            (this.end.x - this.start.x);
        var b = -1;
        var c = this.start.y - (a * this.start.x);
        if (a === Infinity)
            return Math.abs(this.start.x - p.x);
        return Math.abs(a * p.x + b * p.y + c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    };
    /**
     * Finding the intersection between straight lines, including extensions.
     * 延長線上を含め直線同士の交点を求める。
     */
    Line.prototype.getIntersection = function (l) {
        var a = (l.end.y - l.start.y) / (l.end.x - l.start.x);
        var b = l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x;
        var c = (this.end.y - this.start.y) / (this.end.x - this.start.x);
        var d = this.start.y - (this.end.y - this.start.y) / (this.end.x - this.start.x) * this.start.x;
        if (a === c)
            return new Point(NaN, NaN);
        else if (a === Infinity)
            return new Point(l.start.x, c * l.start.x + d);
        else if (c === Infinity)
            return new Point(this.start.x, a * this.start.x + b);
        return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    };
    /**
     * Finding the intersection between straight lines.
     * 直線同士の交点を求める。
     */
    Line.prototype.getIntersectionStrict = function (l) {
        var x1 = this.start.x;
        var y1 = this.start.y;
        var x2 = this.end.x;
        var y2 = this.end.y;
        var x3 = l.start.x;
        var y3 = l.start.y;
        var x4 = l.end.x;
        var y4 = l.end.y;
        var a1 = (y2 - y1) / (x2 - x1);
        var a2 = (y4 - y3) / (x4 - x3);
        var x = (a1 * x1 - y1 - a2 * x3 + y3) / (a1 - a2);
        var y = (y2 - y1) / (x2 - x1) * (x - x1) + y1;
        if (Math.abs(a1) === Math.abs(a2))
            return new Point(NaN, NaN);
        if (x > Math.max(x1, x2) || x > Math.max(x3, x4) ||
            y > Math.max(y1, y2) || y > Math.max(y3, y4) ||
            x < Math.min(x1, x2) || x < Math.min(x3, x4) ||
            x < Math.min(x1, x2) || y < Math.min(y3, y4))
            return new Point(NaN, NaN);
        // else if (a1 === Infinity) return new Point(this.start.x, a2* this.start.x + l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x)
        // else if (a2 === Infinity) return new Point(l.start.x, a1 * l.start.x + l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x);
        return new Point(x, y);
    };
    /**
     * Finding a vertical binary division.
     * 垂直二等分線を求める。
     */
    Line.prototype.getPerpendicularBisector = function () {
        var x1 = this.start.x;
        var y1 = this.start.y;
        var x2 = this.end.x;
        var y2 = this.end.y;
        var linear = new Linear("".concat((y2 - y1) / (x2 - x1), "x+").concat((-(y2 - y1) / (x2 - x1) * x1) + y1));
        return linear.getPerpendicularLinear(this.getMidpoint());
        // 戻り値が関数ってやばくね？
    };
    /**
     * Enlarge a straight line according to the reference point.
     * 直線を基準点に合わせて拡大縮小する。
     */
    Line.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, this.start);
        var l2 = new Line(center, this.end);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        return new Line(p1, p2);
    };
    Line.prototype.draw = function (p5) {
        p5.line(this.start.x, this.start.y, this.end.x, this.end.y);
    };
    return Line;
}());
exports.Line = Line;
var Triangle = /** @class */ (function () {
    /**
     *
     * @param p1 First point of the triangle.
     * @param p2 Second point of the triangle.
     * @param p3 Third point of the triangle.
     */
    function Triangle(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.l1 = new Line(this.p1, this.p2);
        this.l2 = new Line(this.p2, this.p3);
        this.l3 = new Line(this.p3, this.p1);
    }
    /**
     * Finding a triangular center of gravity.
     * 三角形の重心を求める。
     *  */
    Triangle.prototype.getBarycenter = function () {
        return Point.getBarycenter(this.p1, this.p2, this.p3);
    };
    /**
     * Finding the circumcenter.
     * 三角形の外心を求める。
     */
    Triangle.prototype.getCircumcenter = function () {
        return Point.getCircumcenter(this.p1, this.p2, this.p3);
    };
    /**
     * Finding the circumscribed circle.
     * 三角形の外接円を求める。
     */
    Triangle.prototype.getCircumscribedCircle = function () {
        var circumcenter = this.getCircumcenter();
        var r = Point.dist(circumcenter, this.p1);
        return new Circle(circumcenter.x, circumcenter.y, r);
    };
    /**
     * Finding the orthocenter.
     * 三角形の垂心を求める。
     */
    Triangle.prototype.getOrthocenter = function () {
        return Point.getOrthocenter(this.p1, this.p2, this.p3);
    };
    /**
     * Finding the inner center.
     * 三角形の内心を求める。
     */
    Triangle.prototype.getInnerCenter = function () {
        return Point.getInnerCenter(this.p1, this.p2, this.p3);
    };
    /**
     * Finding the inscribe circle.
     * 三角形の内接円を求める。
     */
    Triangle.prototype.getInscribedCircle = function () {
        var innerCenter = this.getInnerCenter();
        var r = this.l1.getDistBetweenPoint(innerCenter);
        return new Circle(innerCenter.x, innerCenter.y, r);
    };
    /**
     * Finding the excenters.
     * 三角形の傍心を求める。
     */
    Triangle.prototype.getExcenters = function () {
        return Point.getExcenters(this.p1, this.p2, this.p3);
    };
    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    Triangle.prototype.getAroundLength = function () {
        var p1 = new Line(this.p1, this.p2);
        var p2 = new Line(this.p2, this.p3);
        var p3 = new Line(this.p3, this.p1);
        return p1.getLength() + p2.getLength() + p3.getLength();
    };
    /**
     * Find a triangle area.
     * 三角形の面積を求める。
     *  */
    Triangle.prototype.getArea = function () {
        return ((1 / 2) *
            Math.abs((this.p1.x - this.p3.x) * (this.p2.y - this.p3.y) -
                (this.p2.x - this.p3.x) * (this.p1.y - this.p3.y)));
    };
    /**
     * In search of a symmetrical triangle for the reference point.
     * 基準点に対して対称な三角形を求める。
     */
    Triangle.prototype.getSymmetricTriangle = function (center) {
        return new Triangle(Point.getSymmetricPoint(this.p1, center), Point.getSymmetricPoint(this.p2, center), Point.getSymmetricPoint(this.p3, center));
    };
    /**
     * Enlarge and reduce the triangle according to the reference point.
     * 三角形を基準点に合わせて拡大縮小する。
     */
    Triangle.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, this.p1);
        var l2 = new Line(center, this.p2);
        var l3 = new Line(center, this.p3);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        var p3 = l3.getDividingPoint(-magnification, magnification - 1);
        return new Triangle(p1, p2, p3);
    };
    Triangle.prototype.draw = function (p5) {
        p5.triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    };
    return Triangle;
}());
exports.Triangle = Triangle;
var Quad = /** @class */ (function () {
    /**
     *
     * @param p1 First point of the quad.
     * @param p2 Second point of the quad.
     * @param p3 Third point of the quad.
     * @param p4 Forth point of the quad.
     */
    function Quad(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.l1 = new Line(this.p1, this.p2);
        this.l2 = new Line(this.p2, this.p3);
        this.l3 = new Line(this.p3, this.p4);
        this.l4 = new Line(this.p4, this.p1);
    }
    /**
     * Find a square area.
     * 四角形の面積を求める。
     *  */
    Quad.prototype.getArea = function () {
        var triangle1 = new Triangle(this.p1, this.p2, this.p3);
        var triangle2 = new Triangle(this.p2, this.p3, this.p4);
        return triangle1.getArea() + triangle2.getArea();
    };
    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    Quad.prototype.getAroundLength = function () {
        var l1 = new Line(this.p1, this.p2);
        var l2 = new Line(this.p2, this.p3);
        var l3 = new Line(this.p3, this.p4);
        var l4 = new Line(this.p4, this.p1);
        return l1.getLength() + l2.getLength() + l3.getLength() + l4.getLength();
    };
    /**
     * Find a symmetrical square for reference points.
     * 基準点に対して対称な四角形を求める。
     */
    Quad.prototype.getSymmetricQuad = function (center) {
        return new Quad(Point.getSymmetricPoint(this.p1, center), Point.getSymmetricPoint(this.p2, center), Point.getSymmetricPoint(this.p3, center), Point.getSymmetricPoint(this.p4, center));
    };
    /**
     * Enlarge and reduce the square according to the reference point.
     * 四角形を基準点に合わせて拡大縮小する。
     */
    Quad.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, this.p1);
        var l2 = new Line(center, this.p2);
        var l3 = new Line(center, this.p3);
        var l4 = new Line(center, this.p4);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        var p3 = l3.getDividingPoint(-magnification, magnification - 1);
        var p4 = l4.getDividingPoint(-magnification, magnification - 1);
        return new Quad(p1, p2, p3, p4);
    };
    Quad.prototype.draw = function (p5) {
        p5.beginShape();
        p5.vertex(this.p1.x, this.p1.y);
        p5.vertex(this.p2.x, this.p2.y);
        p5.vertex(this.p3.x, this.p3.y);
        p5.vertex(this.p4.x, this.p4.y);
        p5.endShape(p5.CLOSE);
    };
    return Quad;
}());
exports.Quad = Quad;
var Polygon = /** @class */ (function () {
    /**
     *
     * @param points Points tha make up the polygon.
     */
    function Polygon(points) {
        this.points = points;
        this.lines = [];
        for (var i = 0; i < this.points.length; i++) {
            if (i < this.points.length - 1) {
                this.lines.push(new Line(this.points[i], this.points[i + 1]));
            }
            else {
                this.lines.push(new Line(this.points[i], this.points[0]));
            }
        }
    }
    /**
     * Find the sum of the length of the polygon.
     * 多角形の辺の長さの和を求める。
     */
    Polygon.prototype.getAroundLength = function () {
        var e_2, _a;
        var result = 0;
        try {
            for (var _b = __values(this.lines), _c = _b.next(); !_c.done; _c = _b.next()) {
                var line = _c.value;
                result += line.getLength();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    /**
     * Find a symmetrical polygon for reference points.
     * 基準点に対して対称な多角形を求める。
     */
    Polygon.prototype.getSymmetricPolygon = function (center) {
        var e_3, _a;
        var points = [];
        try {
            for (var _b = __values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                points.push(Point.getSymmetricPoint(point, center));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return new Polygon(points);
    };
    /**
     * Enlarge and reduce the polygon according to the reference point.
     * 多角形を基準点に合わせて拡大縮小する。
     */
    Polygon.prototype.magnify = function (center, magnification) {
        var e_4, _a;
        var magnifiedPoints = [];
        try {
            for (var _b = __values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                var l = new Line(center, point);
                var p = l.getDividingPoint(-magnification, magnification - 1);
                magnifiedPoints.push(p);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return new Polygon(magnifiedPoints);
    };
    Polygon.prototype.draw = function (p5) {
        var e_5, _a;
        p5.beginShape();
        try {
            for (var _b = __values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                p5.vertex(point.x, point.y);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        p5.endShape(p5.CLOSE);
    };
    return Polygon;
}());
exports.Polygon = Polygon;
var Circle = /** @class */ (function () {
    /**
     *
     * @param x X coordinate of the circle.
     * @param y Y coordinate of the circle.
     * @param r Radius of the circle.
     */
    function Circle(x, y, r) {
        this.x = x;
        this.y = y;
        this.center = new Point(x, y);
        this.r = r;
        this.d = r * 2;
    }
    /**
     * Find the length of the circumference.
     * 円周の長さを求める。
     */
    Circle.prototype.getAround = function () {
        return 2 * Math.PI * this.r;
    };
    /**
     * Find the area of the circle.
     * 円の面積をもとめる。
     */
    Circle.prototype.getArea = function () {
        return Math.PI * Math.pow(this.r, 2);
    };
    /**
     * Find a symmetrical circle for the reference point.
     * 基準点に対して対称な円を求める。
     */
    Circle.prototype.getSymmetricCircle = function (center) {
        var p = this.center;
        var _a = Point.getSymmetricPoint(p, center), x = _a.x, y = _a.y;
        return new Circle(x, y, this.r);
    };
    /**
     * Enlarge and reduce the circle according to the reference point.
     * 円を基準点に合わせて拡大縮小する。
     */
    Circle.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, this.center);
        var p = l1.getDividingPoint(-magnification, magnification - 1);
        return new Circle(p.x, p.y, this.r * magnification);
    };
    Circle.prototype.draw = function (p5) {
        p5.circle(this.x, this.y, this.d);
    };
    return Circle;
}());
exports.Circle = Circle;
var Point3D = /** @class */ (function () {
    /**
     *
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     */
    function Point3D(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Point3D.dist = function (p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2) + Math.pow((p2.z - p1.z), 2));
    };
    /**
     * In search of the middle point.
     * 中点を求める。
     *  */
    Point3D.getMidpoint = function (p1, p2) {
        return new Point3D((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);
    };
    /**
     * Finding a symmetrical point for specific points.
     * 特定の点に対して対称な点を求める。
     * */
    Point3D.getSymmetricPoint = function (p, center) {
        var x = center.x - p.x;
        var y = center.y - p.y;
        var z = center.z - p.z;
        return new Point3D(center.x + x, center.y + y, center.z + z);
    };
    /**
     * Finding the center of gravity between 3 points.
     * 3点間の重心を求める。
     * */
    Point3D.getBarycenter = function (p1, p2, p3) {
        return new Point3D((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3, (p1.z + p2.z + p3.z) / 3);
    };
    /**
     * 外心を求める
     */
    // static getCircumcenter(p1: Point3D, p2: Point3D, p3: Point3D) {
    //     let l1 = new Line3D(p1, p2);
    //     let l2 = new Line3D(p2, p3);
    //     // let l3 = new Line(p3, p1);
    //     let perpendicularBisector1 = l1.getPerpendicularBisector();
    //     let perpendicularBisector2 = l2.getPerpendicularBisector();
    //     return perpendicularBisector1.getIntersection(perpendicularBisector2);
    // }
    /**
     * 垂心を求める
     */
    // static getOrthocenter(p1: Point, p2: Point, p3: Point) {
    //     let x1 = p1.x;
    //     let y1 = p1.y;
    //     let x2 = p2.x;
    //     let y2 = p2.y;
    //     let x3 = p3.x;
    //     let y3 = p3.y;
    //     let l1 = new Linear(`${(y2 - y1) / (x2 - x1)}x+${-((y2 - y1) / (x2 - x1)) + y1}`);
    //     let l2 = new Linear(`${(y3 - y2) / (x3 - x2)}x+${-((y3 - y2) / (x3 - x2)) + y2}`);
    //     let perpendicularLinear1 = l1.getPerpendicularLinear(p3);
    //     let perpendicularLinear2 = l2.getPerpendicularLinear(p1);
    //     return perpendicularLinear1.getIntersection(perpendicularLinear2);
    // }
    /**
     * 内心を求める
     */
    // static getInnerCenter(p1: Point, p2: Point, p3: Point) {
    //     let A = p1;
    //     let B = p2;
    //     let C = p3;
    //     let AB = new Line(A, B);
    //     let BC = new Line(B, C);
    //     let CA = new Line(C, A);
    //     let P = BC.getDividingPoint(AB.getLength(), CA.getLength());
    //     let Q = CA.getDividingPoint(BC.getLength(), AB.getLength());
    //     let AP = new Line(A, P);
    //     let BQ = new Line(B, Q);
    //     return AP.getIntersection(BQ);
    // }
    /**
     * 傍心を求める
     */
    // static getExcenters(p1: Point, p2: Point, p3: Point) {
    //     let A = p1;
    //     let B = p2;
    //     let C = p3;
    //     let BA = new Line(A, B);
    //     let CB = new Line(B, C);
    //     let AC = new Line(C, A);
    //     let P = CB.getDividingPoint(BA.getLength(), -AC.getLength());
    //     let Q = BA.getDividingPoint(AC.getLength(), -CB.getLength());
    //     let R = AC.getDividingPoint(CB.getLength(), -BA.getLength());
    //     let AP = new Line(A, P);
    //     let CQ = new Line(C, Q);
    //     let BR = new Line(B, R);
    //     return [AP.getIntersection(CQ), CQ.getIntersection(BR), BR.getIntersection(AP)];
    // }
    /**
     * Enlarge and reduce the point according to the reference point.
     * 点を基準点に合わせて拡大縮小する。
     */
    Point3D.prototype.magnify = function (center, magnification) {
        var l1 = new Line3D(center, this);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        return new Point3D(p1.x, p1.y, p1.z);
    };
    /**
     * Find the origin
     * 原点を求める。
     *  */
    Point3D.O = function () {
        return new Point3D(0, 0, 0);
    };
    Point3D.prototype.draw = function (p5) {
        p5.point(this.x, this.y, this.z);
    };
    return Point3D;
}());
exports.Point3D = Point3D;
var Line3D = /** @class */ (function () {
    /**
     *
     * @param start Coordinate of start point.
     * @param end Coordinate of end point.
     */
    function Line3D(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Find the length of the line.
     * 線の長さを求める。
     *  */
    Line3D.prototype.getLength = function () {
        return Point3D.dist(this.start, this.end);
    };
    /**
     * Finding the point that divides lines
     * 線を二等分する点を求める。
     *  */
    Line3D.prototype.getMidpoint = function () {
        return Point3D.getMidpoint(this.start, this.end);
    };
    /**
     * Find the inner division.
     * 内分点を求める。
     *  */
    Line3D.prototype.getInteriorPoint = function (m, n) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        }
        else {
            return new Point3D((this.start.x * n + this.end.x * m) / (m + n), (this.start.y * n + this.end.y * m) / (m + n), (this.start.z * n + this.end.z * m) / (m + n));
        }
    };
    /**
     * Finding the outer sorting point.
     * 外分点を求める。
     *  */
    Line3D.prototype.getExteriorPoint = function (m, n) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        }
        else {
            return new Point3D((-this.start.x * n + this.end.x * m) / (m - n), (-this.start.y * n + this.end.y * m) / (m - n), (-this.start.z * n + this.end.z * m) / (m - n));
        }
    };
    /**
     * Incidental divisions and outer sarings.
     * 内分点、外分点を求める。
     */
    Line3D.prototype.getDividingPoint = function (m, n) {
        return new Point3D((this.start.x * n + this.end.x * m) / (m + n), (this.start.y * n + this.end.y * m) / (m + n), (this.start.z * n + this.end.z * m) / (m + n));
    };
    /**
     * 点と直線の距離を求める
     *  */
    // getDistBetweenPoint(p: Point) {
    //     let a =
    //         (this.end.y - this.start.y) /
    //         (this.end.x - this.start.x);
    //     let b = -1;
    //     let c = this.start.y - (a * this.start.x);
    //     if (a === Infinity) return Math.abs(this.start.x - p.x);
    //     return Math.abs(a * p.x + b * p.y + c) / Math.sqrt(a ** 2 + b ** 2);
    // }
    /**
     * 延長線上を含め直線同士の交点を求める
     */
    // getIntersection(l: Line) {
    //     let a = (l.end.y - l.start.y) / (l.end.x - l.start.x);
    //     let b = l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x;
    //     let c = (this.end.y - this.start.y) / (this.end.x - this.start.x);
    //     let d = this.start.y - (this.end.y - this.start.y) / (this.end.x - this.start.x) * this.start.x;
    //     if (a === c) return new Point(NaN, NaN);
    //     else if (a === Infinity) return new Point(l.start.x, c * l.start.x + d);
    //     else if (c === Infinity) return new Point(this.start.x, a * this.start.x + b);
    //     return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    // }
    /**
     * 直線同士の交点を求める
     */
    // getIntersectionStrict(l: Line) {
    //     let x1 = this.start.x;
    //     let y1 = this.start.y;
    //     let x2 = this.end.x;
    //     let y2 = this.end.y;
    //     let x3 = l.start.x;
    //     let y3 = l.start.y;
    //     let x4 = l.end.x;
    //     let y4 = l.end.y;
    //     var a1 = (y2 - y1) / (x2 - x1),
    //         a2 = (y4 - y3) / (x4 - x3);
    //     var x = (a1 * x1 - y1 - a2 * x3 + y3) / (a1 - a2),
    //         y = (y2 - y1) / (x2 - x1) * (x - x1) + y1;
    //     if (Math.abs(a1) === Math.abs(a2)) return new Point(NaN, NaN);
    //     if (x > Math.max(x1, x2) || x > Math.max(x3, x4) ||
    //         y > Math.max(y1, y2) || y > Math.max(y3, y4) ||
    //         x < Math.min(x1, x2) || x < Math.min(x3, x4) ||
    //         x < Math.min(x1, x2) || y < Math.min(y3, y4)) return new Point(NaN, NaN);
    //     // else if (a1 === Infinity) return new Point(this.start.x, a2* this.start.x + l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x)
    //     // else if (a2 === Infinity) return new Point(l.start.x, a1 * l.start.x + l.start.y - (l.end.y - l.start.y) / (l.end.x - l.start.x) * l.start.x);
    //     return new Point(x, y);
    // }
    /**
     * 垂直二等分線を求める
     */
    // getPerpendicularBisector() {
    //     let x1 = this.start.x;
    //     let y1 = this.start.y;
    //     let x2 = this.end.x;
    //     let y2 = this.end.y;
    //     let linear = new Linear(`${(y2 - y1) / (x2 - x1)}x+${(-(y2 - y1) / (x2 - x1) * x1) + y1}`);
    //     return linear.getPerpendicularLinear(this.getMidpoint());
    //     // 戻り値が関数ってやばくね？
    // }
    /**
     * Enlarge and reduce the line according to the reference point.
     * 線を基準点に合わせて拡大縮小する。
     */
    Line3D.prototype.magnify = function (center, magnification) {
        var l1 = new Line3D(center, this.start);
        var l2 = new Line3D(center, this.end);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        return new Line3D(p1, p2);
    };
    Line3D.prototype.draw = function (p5) {
        p5.line(this.start.x, this.start.y, this.start.z, this.end.x, this.end.y, this.end.z);
    };
    return Line3D;
}());
exports.Line3D = Line3D;
var Triangle3D = /** @class */ (function () {
    /**
     *
     * @param p1 First point of the Triangle.
     * @param p2 Second point of the Triangle.
     * @param p3 Third point of the Triangle.
     */
    function Triangle3D(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.l1 = new Line3D(p1, p2);
        this.l2 = new Line3D(p2, p3);
        this.l3 = new Line3D(p3, p1);
    }
    /**
     * Finding a triangular center of gravity.
     * 三角形の重心を求める。
     */
    Triangle3D.prototype.getBarycenter = function () {
        return Point3D.getBarycenter(this.p1, this.p2, this.p3);
    };
    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    Triangle3D.prototype.getAroundLength = function () {
        var p1 = new Line3D(this.p1, this.p2);
        var p2 = new Line3D(this.p2, this.p3);
        var p3 = new Line3D(this.p3, this.p1);
        return p1.getLength() + p2.getLength() + p3.getLength();
    };
    /**
     * Find a triangle area.
     * 三角形の面積を求める。
     *  */
    Triangle3D.prototype.getArea = function () {
        var a = this.l1.getLength();
        var b = this.l2.getLength();
        var c = this.l3.getLength();
        var s = (a + b + c) / 2;
        var S = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return S;
    };
    /**
     * In search of a symmetrical triangle for the reference point.
     * 基準点に対して対称な三角形を求める。
     */
    Triangle3D.prototype.getSymmetricTriangle = function (center) {
        return new Triangle3D(Point3D.getSymmetricPoint(this.p1, center), Point3D.getSymmetricPoint(this.p2, center), Point3D.getSymmetricPoint(this.p3, center));
    };
    /**
     * Enlarge and reduce the triangle according to the reference point.
     * 三角形を基準点に合わせて拡大縮小する。
     */
    Triangle3D.prototype.magnify = function (center, magnification) {
        var l1 = new Line3D(center, this.p1);
        var l2 = new Line3D(center, this.p2);
        var l3 = new Line3D(center, this.p3);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        var p3 = l3.getDividingPoint(-magnification, magnification - 1);
        return new Triangle3D(p1, p2, p3);
    };
    Triangle3D.prototype.draw = function (p5) {
        p5.beginShape();
        p5.vertex(this.p1.x, this.p1.y, this.p1.z);
        p5.vertex(this.p2.x, this.p2.y, this.p2.z);
        p5.vertex(this.p3.x, this.p3.y, this.p3.z);
        p5.ndShape(p5.CLOSE);
    };
    return Triangle3D;
}());
exports.Triangle3D = Triangle3D;
var Quad3D = /** @class */ (function () {
    /**
     *
     * @param p1 First point of the Quad.
     * @param p2 Second point of the Quad.
     * @param p3 Third point of the Quad.
     * @param p4 Forth point of the Quad.
     */
    function Quad3D(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.l1 = new Line3D(this.p1, this.p2);
        this.l2 = new Line3D(this.p2, this.p3);
        this.l3 = new Line3D(this.p3, this.p4);
        this.l4 = new Line3D(this.p4, this.p1);
    }
    /**
     * Enlarge and reduce the square according to the reference point.
     * 四角形を基準点に合わせて拡大縮小する。
     */
    Quad3D.prototype.magnify = function (center, magnification) {
        var l1 = new Line3D(center, this.p1);
        var l2 = new Line3D(center, this.p2);
        var l3 = new Line3D(center, this.p3);
        var l4 = new Line3D(center, this.p4);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        var p3 = l3.getDividingPoint(-magnification, magnification - 1);
        var p4 = l4.getDividingPoint(-magnification, magnification - 1);
        return new Quad3D(p1, p2, p3, p4);
    };
    Quad3D.prototype.draw = function (p5) {
        p5.beginShape();
        p5.vertex(this.p1.x, this.p1.y, this.p1.z);
        p5.vertex(this.p2.x, this.p2.y, this.p2.z);
        p5.vertex(this.p3.x, this.p3.y, this.p3.z);
        p5.vertex(this.p4.x, this.p4.y, this.p4.z);
        p5.endShape(p5.CLOSE);
    };
    return Quad3D;
}());
exports.Quad3D = Quad3D;
var Box = /** @class */ (function () {
    function Box(x, y, z, w, h, d) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
        this.d = d;
    }
    /**
     * Find the surface area.
     * 表面積を求める。
     */
    Box.prototype.getSurfaceArea = function () {
        return 2 * (this.w * this.h + this.h * this.d + this.d * this.w);
    };
    /**
     * Seek the volume.
     * 体積を求める。
     */
    Box.prototype.getVolume = function () {
        return this.w * this.h * this.d;
    };
    /**
     * Enlarge and shrink the rectangular body according to the reference point.
     * 直方体を基準点に合わせて拡大縮小する。
     */
    Box.prototype.magnify = function (center, magnification) {
        var boxCenter = new Point3D(this.x + this.w / 2, this.y + this.h / 2, this.z + this.d / 2);
        var l1 = new Line3D(center, boxCenter);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var w = this.w * magnification;
        var h = this.h * magnification;
        var d = this.d * magnification;
        var x = p1.x - w / 2;
        var y = p1.y - h / 2;
        var z = p1.z - d / 2;
        return new Box(x, y, z, w, h, d);
    };
    Box.prototype.draw = function (p5) {
        p5.push();
        p5.translate(this.x, this.y, this.z);
        p5.box(this.w, this.h, this.d);
        p5.pop();
    };
    return Box;
}());
exports.Box = Box;
var Sphere = /** @class */ (function () {
    /**
     *
     * @param x X coordinate of the center of the sphere.
     * @param y Y coordinate of the center of the sphere.
     * @param z Z coordinate of the center of the sphere.
     * @param r Radius of the sphere.
     */
    function Sphere(x, y, z, r) {
        this.center = new Point3D(x, y, z);
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
    }
    /**
     * Find the surface area.
     * 表面積を求める。
     */
    Sphere.prototype.getSurfaceArea = function () {
        return 4 * Math.PI * Math.pow(this.r, 2);
    };
    /**
     * Seek the volume.
     * 体積を求める。
     */
    Sphere.prototype.getVolume = function () {
        return (4 * Math.PI * Math.pow(this.r, 3)) / 3;
    };
    /**
     * Enlarge and shrink the ball according to the reference point.
     * 球を基準点に合わせて拡大縮小する。
     */
    Sphere.prototype.magnify = function (center, magnification) {
        var l1 = new Line3D(center, this.center);
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        return new Sphere(p1.x, p1.y, p1.z, this.r * magnification);
    };
    Sphere.prototype.draw = function (p5) {
        p5.push();
        p5.translate(this.x, this.y, this.z);
        p5.sphere(this.r);
        p5.pop();
    };
    return Sphere;
}());
exports.Sphere = Sphere;
var Linear = /** @class */ (function () {
    /**
     *
     * @param formula Formula.
     */
    function Linear(formula) {
        this.setForms(formula);
    }
    Linear.prototype.setForms = function (formula) {
        var array = formula.replace(/\s/g, "").split(/\+|x/).filter(function (v) { return v; });
        this.slope = Number(array[0]);
        this.yIntercept = Number(array[1]);
        var stringSlope = String(this.slope);
        var stringYIntercept = this.yIntercept >= 0 ? "+" + String(this.yIntercept) : String(this.yIntercept);
        this.vertexForm = "".concat(stringSlope, "x").concat(stringYIntercept);
    };
    /**
     * Substitute X and find the value of Y.
     * xを代入して、yの値を求める。
     */
    Linear.prototype.getY = function (x) {
        return this.slope * x + this.yIntercept;
    };
    /**
     * Finding the intersection between primary functions.
     * 一次関数同士の交点を求める。
     */
    Linear.prototype.getIntersection = function (linear) {
        var a = this.slope;
        var b = this.yIntercept;
        var c = linear.slope;
        var d = linear.yIntercept;
        return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    };
    /**
     * Finding primary functions that are perpendicular to the standard primary functions.
     * 基準となる一次関数に垂直な一次関数をもとめる。
     */
    Linear.prototype.getPerpendicularLinear = function (p) {
        var a = this.slope;
        var x1 = p.x;
        var y1 = p.y;
        return new Linear("".concat(-1 / a, "x+").concat(x1 / a + y1));
    };
    /**
     * Finding a symmetrical point for a straight line.
     * 直線に対して対称な点を求める。
     */
    Linear.prototype.getSymmetricPointToL = function (p) {
        var perpendicularLinear = this.getPerpendicularLinear(p);
        var center = this.getIntersection(perpendicularLinear);
        var symmetricPoint = Point.getSymmetricPoint(p, center);
        return symmetricPoint;
    };
    /**
     * Primary functions are expanded according to the reference point.
     * 一次関数を基準点に合わせて拡大縮小する。
     */
    Linear.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, new Point(0, this.yIntercept));
        var l2 = new Line(center, new Point(5, this.getY(5)));
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        return Linear.estimateLinearByTwoPoints(p1, p2);
    };
    /**
     * Find the primary function that passes through 2 points.
     * 2点を通る一次関数を求める。
     */
    Linear.estimateLinearByTwoPoints = function (p1, p2) {
        var a = (p2.y - p1.y) / (p2.x - p1.x);
        var b = (p1.y - a * p1.x);
        return new Linear("".concat(a, "x+").concat(b));
    };
    Linear.prototype.draw = function (min, max, p5) {
        p5.beginShape();
        for (var x = min; x < max; x++) {
            var y = this.getY(x);
            p5.vertex(x, y);
        }
        p5.endShape();
    };
    return Linear;
}());
exports.Linear = Linear;
var Quadratic = /** @class */ (function () {
    /**
     * Formula.
     * Enter even if the coefficient of x^2, x is 0, 1.
     * x^2, xの係数, 定数項が0, 1であっても入力すること。
     * @param formula
     */
    function Quadratic(formula) {
        this.setForms(formula);
    }
    /**
     * Determines whether the entered function is a general form, a standard form, or something else.
     * 入力された関数が一般形であるか、標準形であるか、またはそれ以外であるか判別する。
     *  */
    Quadratic.judgeForm = function (formula) {
        if (formula.match(/x\^2/g) &&
            formula.match(/x/g)) {
            return "vertex";
        }
        else if (formula.match(/x/g) &&
            formula.match(/\(/g) &&
            formula.match(/\)/g) &&
            formula.match(/\^2/g)) {
            return "standard";
        }
        else {
            return Manager.displayError(["You MUST use following:", "x", "(", ")", "^2"]);
        }
    };
    /**
     * Assign a value to a, b, c, p, q to complete general and standard forms.
     * a, b, c, p, qに値を代入し、一般形と標準形を完成させる。
     */
    Quadratic.prototype.setForms = function (formula) {
        if (Quadratic.judgeForm(formula) === "vertex") {
            var array = formula.replace(/\s/g, "").split(/\+|x\^2|x/).filter(function (v) { return v; });
            this.a = Number(array[0]);
            this.b = Number(array[1]);
            this.c = Number(array[2]);
            var stringA = String(this.a);
            var stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            var stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = "".concat(stringA, "x^2").concat(stringB, "x").concat(stringC);
            this.p = -this.b / (2 * this.a);
            this.q = -(Math.pow(this.b, 2) - 4 * this.a * this.c) / (4 * this.a);
            var stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            var stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = "".concat(stringA, "(x").concat(stringP, ")^2").concat(stringQ);
        }
        else if (Quadratic.judgeForm(formula) === "standard") {
            var array = formula.replace(/\s/g, "").split(/\(|\)|\+|x|\^2/).filter(function (v) { return v; });
            this.a = Number(array[0]);
            this.p = Number(array[1]) * (-1);
            this.q = Number(array[2]);
            var stringA = String(this.a);
            var stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            var stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = "".concat(stringA, "(x").concat(stringP, ")^2").concat(stringQ);
            this.b = -2 * this.a * this.p;
            this.c = this.a * Math.pow(this.p, 2) + this.q;
            var stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            var stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = "".concat(stringA, "x^2").concat(stringB, "x").concat(stringC);
        }
    };
    /**
     * Finding the top of the secondary function.
     * 二次関数の頂点を求める。
     *  */
    Quadratic.prototype.getVertex = function () {
        return new Point(this.p, this.q);
    };
    /**
     * Substitute X and find the value of Y.
     * xを代入して、yの値を求める。
     */
    Quadratic.prototype.getY = function (x) {
        return this.a * Math.pow(x, 2) + this.b * x + this.c;
    };
    /**
     * Find the coordinates of y cut pieces.
     * y切片の座標を求める。
     */
    Quadratic.prototype.getYIntercept = function () {
        return new Point(0, this.getY(0));
    };
    /**
     * Finding a symmetrical secondary function for the reference point.
     * 基準点に対して対称な二次関数を求める。
     */
    Quadratic.prototype.getSymmetricQuadratic = function (center) {
        var a = -this.a;
        var p = -Point.getSymmetricPoint(this.getVertex(), center).x;
        var q = Point.getSymmetricPoint(this.getVertex(), center).y;
        return new Quadratic("".concat(a, "(x +").concat(p, ")^2 + ").concat(q));
    };
    Quadratic.prototype.getSymmetricQuadraticToX_Axis = function () {
        return new Quadratic("".concat(-this.a, "x^2+").concat(-this.b, "x+").concat(-this.c));
    };
    Quadratic.prototype.getSymmetricQuadraticToY_Axis = function () {
        return new Quadratic("".concat(this.a, "x^2+").concat(-this.b, "x+").concat(this.c));
    };
    /**
     * Find the intersection of secondary and primary functions.
     * 二次関数と一次関数の交点を求める。
     */
    Quadratic.prototype.getIntersectionsOfQL = function (linear) {
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = linear.slope;
        var e = linear.yIntercept;
        var x1 = (d - b + Math.sqrt(Math.pow((b - d), 2) - 4 * a * (c - e))) / (2 * a);
        var y1 = d * x1 + e;
        var x2 = (d - b - Math.sqrt(Math.pow((b - d), 2) - 4 * a * (c - e))) / (2 * a);
        var y2 = d * x2 + e;
        return [new Point(x1, y1), new Point(x2, y2)];
    };
    /**
     * In search of intersections between secondary functions.
     * 二次関数同士の交点を求める。
     */
    Quadratic.prototype.getIntersectionsOfQQ = function (quadratic) {
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = quadratic.a;
        var e = quadratic.b;
        var f = quadratic.c;
        if (a === d) {
            var x = (f - c) / (b - e);
            var y = a * Math.pow(x, 2) + b * x + c;
            return [new Point(x, y), new Point(NaN, NaN)];
        }
        else {
            var x1 = (e - b + Math.sqrt(Math.pow((b - e), 2) - 4 * (a - d) * (c - f))) / (2 * (a - d));
            var y1 = a * Math.pow(x1, 2) + b * x1 + c;
            var x2 = (e - b - Math.sqrt(Math.pow((b - e), 2) - 4 * (a - d) * (c - f))) / (2 * (a - d));
            var y2 = a * Math.pow(x2, 2) + b * x2 + c;
            return [new Point(x1, y1), new Point(x2, y2)];
        }
    };
    /**
     * Finding a secondary function.
     * 二次関数の接線を求める。
     */
    Quadratic.prototype.getTangentLinear = function (x) {
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = 2 * a * x + b;
        var e = (2 * b * d + 4 * a * c - Math.pow(b, 2) - Math.pow(d, 2)) / (4 * a);
        return new Linear("".concat(d, "x+").concat(e));
    };
    /**
     * Finding a secondary function line.
     * 二次関数の方線を求める。
     */
    Quadratic.prototype.getNormalLinear = function (x) {
        var l = this.differentiate();
        return new Linear("".concat(-1 / l.getY(x), "x+").concat(x / l.getY(x) + this.getY(x)));
    };
    /**
     * Finding a secondary equation solution.
     * 二次方程式の解を求める。
     */
    Quadratic.prototype.getSolution = function () {
        return this.getIntersectionsOfQL(new Linear("0x+0"));
    };
    /**
     * Enlarge the secondary function according to the reference point.
     * 二次関数を基準点に合わせて拡大する。
     */
    Quadratic.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, this.getYIntercept());
        var l2 = new Line(center, new Point(-5, this.getY(-5)));
        var l3 = new Line(center, new Point(5, this.getY(5)));
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        var p3 = l3.getDividingPoint(-magnification, magnification - 1);
        return Quadratic.estimateQuadraticByThreePoints(p1, p2, p3);
    };
    /**
     * Move the secondary function parallel.
     * 二次関数を平行移動させる。
     */
    Quadratic.prototype.moveQuadratic = function (x, y) {
        var newP = -(this.p + x);
        var newQ = this.q + y;
        return new Quadratic("".concat(this.a, "(x+").concat(newP, ")^2+").concat(newQ));
    };
    /**
     * Find the secondary function from the value of A and the two points that pass.
     * aの値と、通る2点から二次関数を求める。
     */
    Quadratic.estimateQuadraticByAandTwoPoints = function (a, p1, p2) {
        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;
        var b = ((y2 - y1) - a * (Math.pow(x2, 2) - Math.pow(x1, 2))) / (x2 - x1);
        var c = y1 - a * Math.pow(x1, 2) - b * Math.pow(x1, 2);
        return new Quadratic("".concat(a, "x^2+").concat(b, "x+").concat(c));
    };
    /**
     * Finding a secondary function through 3 points.
     * 3点を通る二次関数を求める。
     */
    Quadratic.estimateQuadraticByThreePoints = function (p1, p2, p3) {
        return Point.estimateQuadraticByThreePoints(p1, p2, p3);
    };
    Quadratic.prototype.differentiate = function () {
        return new Linear("".concat(2 * this.a, "x+").concat(this.b));
    };
    Quadratic.prototype.draw = function (min, max, p5) {
        p5.beginShape();
        for (var x = min; x < max; x++) {
            var y = this.getY(x);
            p5.vertex(x, y);
        }
        p5.endShape();
    };
    return Quadratic;
}());
exports.Quadratic = Quadratic;
