"use strict";

!function () {
    function e() {
        function e(e, t, o) {
            var n = "_jsonp_" + t,
                r = document.createElement("script");
            r.type = "text/javascript",
                r.src = e,
                r.async = !0,
                window[n] = function (e) {
                    o.call(window, e),
                        document.getElementsByTagName("head")[0].removeChild(r),
                        r = null,
                        delete window[n];
                },
                document.head.appendChild(r);
        }

        function t() {
            var e = document.createElement("script");
            e.src = o + "/apps/fc3/build/default-handler.js",
                e.async = !0,
                e.onload = function () {
                    window.spFormBootstrap();
                },
                document.head.appendChild(e);
        }

        var o = "//web.webformscr.com",
            n = 0,
            r = document.querySelectorAll("script[sp-form-id]");

        "function" != typeof NodeList.prototype.forEach &&
            (NodeList.prototype.forEach = Array.prototype.forEach);

        r.forEach(function (d) {
            o = "//" + d.getAttribute("src").split("/")[2];
            var c = d.getAttribute("sp-form-id");
            e(o + "/formstore/" + c + ".js", c, function (e) {
                n++,
                    200 === e.status
                        ? (d.parentNode instanceof HTMLHeadElement
                            ? document.body.insertAdjacentHTML("beforeend", e.html)
                            : d.insertAdjacentHTML("afterend", e.html),
                            n === r.length && t())
                        : console.error(e);
            });
        });
    }

    window.spFormLoaderAdded ||
        (window.addEventListener("load", e, !1), window.spFormLoaderAdded = !0);
}();
