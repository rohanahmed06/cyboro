/*
 *  Remodal - v1.1.1
 *  Responsive, lightweight, fast, synchronized with CSS animations, fully customizable modal window plugin with declarative configuration and hash tracking.
 *  http://vodkabears.github.io/remodal/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */

! function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function (c) {
        return b(a, c)
    }) : "object" == typeof exports ? b(a, require("jquery")) : b(a, a.jQuery || a.Zepto)
}(this, function (a, b) {
    "use strict";

    function c(a) {
        if (w && "none" === a.css("animation-name") && "none" === a.css("-webkit-animation-name") && "none" === a.css("-moz-animation-name") && "none" === a.css("-o-animation-name") && "none" === a.css("-ms-animation-name")) return 0;
        var b, c, d, e, f = a.css("animation-duration") || a.css("-webkit-animation-duration") || a.css("-moz-animation-duration") || a.css("-o-animation-duration") || a.css("-ms-animation-duration") || "0s",
            g = a.css("animation-delay") || a.css("-webkit-animation-delay") || a.css("-moz-animation-delay") || a.css("-o-animation-delay") || a.css("-ms-animation-delay") || "0s",
            h = a.css("animation-iteration-count") || a.css("-webkit-animation-iteration-count") || a.css("-moz-animation-iteration-count") || a.css("-o-animation-iteration-count") || a.css("-ms-animation-iteration-count") || "1";
        for (f = f.split(", "), g = g.split(", "), h = h.split(", "), e = 0, c = f.length, b = Number.NEGATIVE_INFINITY; e < c; e++) d = parseFloat(f[e]) * parseInt(h[e], 10) + parseFloat(g[e]), d > b && (b = d);
        return b
    }

    function d() {
        if (b(document).height() <= b(window).height()) return 0;
        var a, c, d = document.createElement("div"),
            e = document.createElement("div");
        return d.style.visibility = "hidden", d.style.width = "100px", document.body.appendChild(d), a = d.offsetWidth, d.style.overflow = "scroll", e.style.width = "100%", d.appendChild(e), c = e.offsetWidth, d.parentNode.removeChild(d), a - c
    }

    function e() {
        if (!x) {
            var a, c, e = b("html"),
                f = k("is-locked");
            e.hasClass(f) || (c = b(document.body), a = parseInt(c.css("padding-right"), 10) + d(), c.css("padding-right", a + "px"), e.addClass(f))
        }
    }

    function f() {
        if (!x) {
            var a, c, e = b("html"),
                f = k("is-locked");
            e.hasClass(f) && (c = b(document.body), a = parseInt(c.css("padding-right"), 10) - d(), c.css("padding-right", a + "px"), e.removeClass(f))
        }
    }

    function g(a, b, c, d) {
        var e = k("is", b),
            f = [k("is", u.CLOSING), k("is", u.OPENING), k("is", u.CLOSED), k("is", u.OPENED)].join(" ");
        a.$bg.removeClass(f).addClass(e), a.$overlay.removeClass(f).addClass(e), a.$wrapper.removeClass(f).addClass(e), a.$modal.removeClass(f).addClass(e), a.state = b, !c && a.$modal.trigger({
            type: b,
            reason: d
        }, [{
            reason: d
        }])
    }

    function h(a, d, e) {
        var f = 0,
            g = function (a) {
                a.target === this && f++
            },
            h = function (a) {
                a.target === this && 0 === --f && (b.each(["$bg", "$overlay", "$wrapper", "$modal"], function (a, b) {
                    e[b].off(r + " " + s)
                }), d())
            };
        b.each(["$bg", "$overlay", "$wrapper", "$modal"], function (a, b) {
            e[b].on(r, g).on(s, h)
        }), a(), 0 === c(e.$bg) && 0 === c(e.$overlay) && 0 === c(e.$wrapper) && 0 === c(e.$modal) && (b.each(["$bg", "$overlay", "$wrapper", "$modal"], function (a, b) {
            e[b].off(r + " " + s)
        }), d())
    }

    function i(a) {
        a.state !== u.CLOSED && (b.each(["$bg", "$overlay", "$wrapper", "$modal"], function (b, c) {
            a[c].off(r + " " + s)
        }), a.$bg.removeClass(a.settings.modifier), a.$overlay.removeClass(a.settings.modifier).hide(), a.$wrapper.hide(), f(), g(a, u.CLOSED, !0))
    }

    function j(a) {
        var b, c, d, e, f = {};
        for (a = a.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), b = a.split(","), e = 0, c = b.length; e < c; e++) b[e] = b[e].split(":"), d = b[e][1], ("string" == typeof d || d instanceof String) && (d = "true" === d || "false" !== d && d), ("string" == typeof d || d instanceof String) && (d = isNaN(d) ? d : +d), f[b[e][0]] = d;
        return f
    }

    function k() {
        for (var a = q, b = 0; b < arguments.length; ++b) a += "-" + arguments[b];
        return a
    }

    function l() {
        var a, c, d = location.hash.replace("#", "");
        if (d) {
            try {
                c = b('[data-remodal-id="' + d + '"]')
            } catch (e) { }
            c && c.length && (a = b[p].lookup[c.data(p)], a && a.settings.hashTracking && a.open())
        } else n && n.state === u.OPENED && n.settings.hashTracking && n.close()
    }

    function m(a, c) {
        var d = b(document.body),
            e = d,
            f = this;
        f.settings = b.extend({}, t, c), f.index = b[p].lookup.push(f) - 1, f.state = u.CLOSED, f.$overlay = b("." + k("overlay")), null !== f.settings.appendTo && f.settings.appendTo.length && (e = b(f.settings.appendTo)), f.$overlay.length || (f.$overlay = b("<div>").addClass(k("overlay") + " " + k("is", u.CLOSED)).hide(), e.append(f.$overlay)), f.$bg = b("." + k("bg")).addClass(k("is", u.CLOSED)), f.$modal = a.addClass(q + " " + k("is-initialized") + " " + f.settings.modifier + " " + k("is", u.CLOSED)).attr("tabindex", "-1"), f.$wrapper = b("<div>").addClass(k("wrapper") + " " + f.settings.modifier + " " + k("is", u.CLOSED)).hide().append(f.$modal), e.append(f.$wrapper), f.$wrapper.on("click." + q, '[data-remodal-action="close"]', function (a) {
            a.preventDefault(), f.close()
        }), f.$wrapper.on("click." + q, '[data-remodal-action="cancel"]', function (a) {
            a.preventDefault(), f.$modal.trigger(v.CANCELLATION), f.settings.closeOnCancel && f.close(v.CANCELLATION)
        }), f.$wrapper.on("click." + q, '[data-remodal-action="confirm"]', function (a) {
            a.preventDefault(), f.$modal.trigger(v.CONFIRMATION), f.settings.closeOnConfirm && f.close(v.CONFIRMATION)
        }), f.$wrapper.on("click." + q, function (a) {
            var c = b(a.target);
            c.hasClass(k("wrapper")) && f.settings.closeOnOutsideClick && f.close()
        })
    }
    var n, o, p = "remodal",
        q = a.REMODAL_GLOBALS && a.REMODAL_GLOBALS.NAMESPACE || p,
        r = b.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function (a) {
            return a + "." + q
        }).join(" "),
        s = b.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function (a) {
            return a + "." + q
        }).join(" "),
        t = b.extend({
            hashTracking: !0,
            closeOnConfirm: !0,
            closeOnCancel: !0,
            closeOnEscape: !0,
            closeOnOutsideClick: !0,
            modifier: "",
            appendTo: null
        }, a.REMODAL_GLOBALS && a.REMODAL_GLOBALS.DEFAULTS),
        u = {
            CLOSING: "closing",
            CLOSED: "closed",
            OPENING: "opening",
            OPENED: "opened"
        },
        v = {
            CONFIRMATION: "confirmation",
            CANCELLATION: "cancellation"
        },
        w = function () {
            var a = document.createElement("div").style;
            return void 0 !== a.animationName || void 0 !== a.WebkitAnimationName || void 0 !== a.MozAnimationName || void 0 !== a.msAnimationName || void 0 !== a.OAnimationName
        }(),
        x = /iPad|iPhone|iPod/.test(navigator.platform);
    m.prototype.open = function () {
        var a, c = this;
        c.state !== u.OPENING && c.state !== u.CLOSING && (a = c.$modal.attr("data-remodal-id"), a && c.settings.hashTracking && (o = b(window).scrollTop(), location.hash = a), n && n !== c && i(n), n = c, e(), c.$bg.addClass(c.settings.modifier), c.$overlay.addClass(c.settings.modifier).show(), c.$wrapper.show().scrollTop(0), c.$modal.focus(), h(function () {
            g(c, u.OPENING)
        }, function () {
            g(c, u.OPENED)
        }, c))
    }, m.prototype.close = function (a) {
        var c = this;
        c.state !== u.OPENING && c.state !== u.CLOSING && c.state !== u.CLOSED && (c.settings.hashTracking && c.$modal.attr("data-remodal-id") === location.hash.substr(1) && (location.hash = "", b(window).scrollTop(o)), h(function () {
            g(c, u.CLOSING, !1, a)
        }, function () {
            c.$bg.removeClass(c.settings.modifier), c.$overlay.removeClass(c.settings.modifier).hide(), c.$wrapper.hide(), f(), g(c, u.CLOSED, !1, a)
        }, c))
    }, m.prototype.getState = function () {
        return this.state
    }, m.prototype.destroy = function () {
        var a, c = b[p].lookup;
        i(this), this.$wrapper.remove(), delete c[this.index], a = b.grep(c, function (a) {
            return !!a
        }).length, 0 === a && (this.$overlay.remove(), this.$bg.removeClass(k("is", u.CLOSING) + " " + k("is", u.OPENING) + " " + k("is", u.CLOSED) + " " + k("is", u.OPENED)))
    }, b[p] = {
        lookup: []
    }, b.fn[p] = function (a) {
        var c, d;
        return this.each(function (e, f) {
            d = b(f), null == d.data(p) ? (c = new m(d, a), d.data(p, c.index), c.settings.hashTracking && d.attr("data-remodal-id") === location.hash.substr(1) && c.open()) : c = b[p].lookup[d.data(p)]
        }), c
    }, b(document).ready(function () {
        b(document).on("click", "[data-remodal-target]", function (a) {
            a.preventDefault();
            var c = a.currentTarget,
                d = c.getAttribute("data-remodal-target"),
                e = b('[data-remodal-id="' + d + '"]');
            b[p].lookup[e.data(p)].open()
        }), b(document).find("." + q).each(function (a, c) {
            var d = b(c),
                e = d.data("remodal-options");
            e ? ("string" == typeof e || e instanceof String) && (e = j(e)) : e = {}, d[p](e)
        }), b(document).on("keydown." + q, function (a) {
            n && n.settings.closeOnEscape && n.state === u.OPENED && 27 === a.keyCode && n.close()
        }), b(window).on("hashchange." + q, l)
    })
});