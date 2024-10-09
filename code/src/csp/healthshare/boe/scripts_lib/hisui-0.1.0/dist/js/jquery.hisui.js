if (typeof JSON !== "object") {
    JSON = {};
}

(function() {
    "use strict";
    function f(e) {
        return e < 10 ? "0" + e : e;
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    function quote(e) {
        escapable.lastIndex = 0;
        return escapable.test(e) ? '"' + e.replace(escapable, function(e) {
            var t = meta[e];
            return typeof t === "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + e + '"';
    }
    function str(e, t) {
        var i, a, n, r, o = gap, s, l = t[e];
        if (l && typeof l === "object" && typeof l.toJSON === "function") {
            l = l.toJSON(e);
        }
        if (typeof rep === "function") {
            l = rep.call(t, e, l);
        }
        switch (typeof l) {
          case "string":
            return quote(l);

          case "number":
            return isFinite(l) ? String(l) : "null";

          case "boolean":
          case "null":
            return String(l);

          case "object":
            if (!l) {
                return "null";
            }
            gap += indent;
            s = [];
            if (Object.prototype.toString.apply(l) === "[object Array]") {
                r = l.length;
                for (i = 0; i < r; i += 1) {
                    s[i] = str(i, l) || "null";
                }
                n = s.length === 0 ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + o + "]" : "[" + s.join(",") + "]";
                gap = o;
                return n;
            }
            if (rep && typeof rep === "object") {
                r = rep.length;
                for (i = 0; i < r; i += 1) {
                    if (typeof rep[i] === "string") {
                        a = rep[i];
                        n = str(a, l);
                        if (n) {
                            s.push(quote(a) + (gap ? ": " : ":") + n);
                        }
                    }
                }
            } else {
                for (a in l) {
                    if (Object.prototype.hasOwnProperty.call(l, a)) {
                        n = str(a, l);
                        if (n) {
                            s.push(quote(a) + (gap ? ": " : ":") + n);
                        }
                    }
                }
            }
            n = s.length === 0 ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + o + "}" : "{" + s.join(",") + "}";
            gap = o;
            return n;
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(e, t, i) {
            var a;
            gap = "";
            indent = "";
            if (typeof i === "number") {
                for (a = 0; a < i; a += 1) {
                    indent += " ";
                }
            } else if (typeof i === "string") {
                indent = i;
            }
            rep = t;
            if (t && typeof t !== "function" && (typeof t !== "object" || typeof t.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {
                "": e
            });
        };
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;
            function walk(e, t) {
                var i, a, n = e[t];
                if (n && typeof n === "object") {
                    for (i in n) {
                        if (Object.prototype.hasOwnProperty.call(n, i)) {
                            a = walk(n, i);
                            if (a !== undefined) {
                                n[i] = a;
                            } else {
                                delete n[i];
                            }
                        }
                    }
                }
                return reviver.call(e, t, n);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
})();

(function(e) {
    e.hisui = {
        indexOfArray: function(e, t, i) {
            for (var a = 0, n = e.length; a < n; a++) {
                if (i == undefined) {
                    if (e[a] == t) {
                        return a;
                    }
                } else {
                    if (e[a][t] == i) {
                        return a;
                    }
                }
            }
            return -1;
        },
        removeArrayItem: function(e, t, i) {
            if (typeof t == "string") {
                for (var a = 0, n = e.length; a < n; a++) {
                    if (e[a][t] == i) {
                        e.splice(a, 1);
                        return;
                    }
                }
            } else {
                var r = this.indexOfArray(e, t);
                if (r != -1) {
                    e.splice(r, 1);
                }
            }
        },
        addArrayItem: function(e, t, i) {
            var a = this.indexOfArray(e, t, i ? i[t] : undefined);
            if (a == -1) {
                e.push(i ? i : t);
            } else {
                e[a] = i ? i : t;
            }
        },
        getArrayItem: function(e, t, i) {
            var a = this.indexOfArray(e, t, i);
            return a == -1 ? null : e[a];
        },
        forEach: function(e, t, i) {
            var a = [];
            for (var n = 0; n < e.length; n++) {
                a.push(e[n]);
            }
            while (a.length) {
                var r = a.shift();
                if (i(r) == false) {
                    return;
                }
                if (t && r.children) {
                    for (var n = r.children.length - 1; n >= 0; n--) {
                        a.unshift(r.children[n]);
                    }
                }
            }
        },
        debounce: function(e, t, i) {
            var a, n;
            var r = function() {
                var r = this;
                var o = arguments;
                if (a) clearTimeout(a);
                if (i) {
                    var s = !a;
                    a = setTimeout(function() {
                        a = null;
                    }, t);
                    if (s) n = e.apply(r, o);
                } else {
                    a = setTimeout(function() {
                        e.apply(r, o);
                    }, t);
                }
                return n;
            };
            r.cancel = function() {
                clearTimeout(a);
                a = null;
            };
            return r;
        },
        getTrans: function(e) {
            if (typeof $g == "function" && typeof e == "string" && /(<[^>]+>)|(&nbsp;)|(<[^>]+\/>)/.test(e) == false) {
                var t = e;
                try {
                    t = $g(e);
                } catch (i) {}
                return t;
            }
            return e;
        },
        switchObjectSize: function(t, i, a, n, r) {
            var o = i.document.querySelectorAll("OBJECT");
            if (o.length > 0) {
                for (var s = 0; s < o.length; s++) {
                    if ("undefined" == typeof o[s].attributes["type"]) continue;
                    if ("application/x-iemrplugin" != o[s].attributes["type"].value.toLowerCase()) continue;
                    var l = o[s];
                    changeId = l.id;
                    if ("undefined" != typeof l.attributes["myid"]) {
                        changeId += l.attributes["myid"].value;
                    }
                    if (l) {
                        if (null == l.getAttribute("data-hideTimes")) l.setAttribute("data-hideTimes", 0);
                        if (0 > l.getAttribute("data-hideTimes")) l.setAttribute("data-hideTimes", 0);
                        if (!e.data(n, "changeIdStr")) {
                            e.data(n, "changeIdStr", {
                                NPAPIIdStr: ""
                            });
                        }
                        if (a) {
                            if (e.data(n, "changeIdStr").NPAPIIdStr.indexOf("," + changeId + ",") < 0) {
                                l.setAttribute("data-hideTimes", parseInt(l.getAttribute("data-hideTimes")) + 1);
                                e.data(n, "changeIdStr").NPAPIIdStr += "," + changeId + ",";
                            }
                            l.style.width = "0px";
                            l.style.height = "0px";
                        } else {
                            if (e.data(n, "changeIdStr").NPAPIIdStr.indexOf("," + changeId + ",") > -1) {
                                l.setAttribute("data-hideTimes", parseInt(l.getAttribute("data-hideTimes")) - 1);
                            }
                            if (0 > l.getAttribute("data-hideTimes")) l.setAttribute("data-hideTimes", 0);
                            e.data(n, "changeIdStr").NPAPIIdStr = e.data(n, "changeIdStr").NPAPIIdStr.replace("," + changeId + ",", "");
                            if (l.getAttribute("data-hideTimes") == 0) {
                                l.style.width = "100%";
                                l.style.height = "100%";
                            }
                        }
                    }
                }
            }
        },
        findObjectDom: function(t, i, a, n, r) {
            if (!!window.ActiveXObject || "ActiveXObject" in window) return;
            if (windowNPAPITotal < 0) return;
            r = r || "panel";
            windowNPAPITotal--;
            var o = i.frames.length;
            for (var s = 0; s < o; s++) {
                if (!i.frames[s]) continue;
                var l = i.frames[s].window;
                try {
                    l.document;
                } catch (d) {
                    return;
                }
                e.hisui.findObjectDom(t, l, a, n, r);
            }
            e.hisui.switchObjectSize(t, i, a, n, r);
        }
    };
    e.hisui.globalContainerId = "z-q-container";
    e.hisui.globalContainerSelector = "#" + e.hisui.globalContainerId;
    e.hisui.getLastSrcTargetDom = function() {
        return e.data(document.getElementById(e.hisui.globalContainerId), "data").srcTargetDom;
    };
    e.hisui.fixPanelTLWH = function() {
        var t = e.data(document.getElementById(e.hisui.globalContainerId), "data");
        var i = t.srcTargetDom;
        var a = e(i);
        var n = e(e.hisui.globalContainerSelector);
        var r = a.offset();
        if (t.offsettimer) {
            clearTimeout(t.offsettimer);
            t.offsettimer = null;
        }
        (function() {
            if (n.is(":visible")) {
                var e = parseInt(s());
                if (e > a.offset().top) {
                    e--;
                    n.removeClass("comboq-p-top").addClass("comboq-p-bottom");
                } else {
                    e++;
                    n.removeClass("comboq-p-bottom").addClass("comboq-p-top");
                }
                var i = o();
                if (Math.abs(e - n.offset().top) > 2 || Math.abs(i - n.offset().left) > 2) {
                    n.offset({
                        top: e,
                        left: i
                    });
                    clearTimeout(t.offsettimer);
                    t.offsettimer = null;
                }
                t.offsettimer = setTimeout(arguments.callee, 60);
            }
        })();
        function o() {
            var t = a.offset().left;
            if (t + n._outerWidth() > e(window)._outerWidth() + e(document).scrollLeft()) {
                t = e(window)._outerWidth() + e(document).scrollLeft() - n._outerWidth();
            }
            if (t < 0) {
                t = 0;
            }
            return t;
        }
        function s() {
            var t = a.offset().top + a._outerHeight();
            if (t + n._outerHeight() > e(window)._outerHeight() + e(document).scrollTop()) {
                t = a.offset().top - n._outerHeight();
            }
            if (t < e(document).scrollTop()) {
                t = a.offset().top + a._outerHeight();
            }
            t = parseInt(t);
            return t;
        }
    };
    e.parser = {
        auto: true,
        onComplete: function(e) {},
        plugins: [ "draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "numberspinner", "timespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog", "checkbox", "radio", "switchbox", "keywords", "comboq", "lookup", "triggerbox", "dateboxq", "datetimeboxq", "timeboxq" ],
        parse: function(t) {
            var i = [];
            for (var a = 0; a < e.parser.plugins.length; a++) {
                var n = e.parser.plugins[a];
                var r = e(".hisui-" + n, t);
                if (r.length) {
                    if (r[n]) {
                        r[n]();
                    } else {
                        i.push({
                            name: n,
                            jq: r
                        });
                    }
                }
            }
            if (i.length && window.easyloader) {
                var o = [];
                for (var a = 0; a < i.length; a++) {
                    o.push(i[a].name);
                }
                easyloader.load(o, function() {
                    for (var a = 0; a < i.length; a++) {
                        var n = i[a].name;
                        var r = i[a].jq;
                        r[n]();
                    }
                    e.parser.onComplete.call(e.parser, t);
                });
            } else {
                e.parser.onComplete.call(e.parser, t);
            }
        },
        parseValue: function(t, i, a, n) {
            n = n || 0;
            var r = e.trim(String(i || ""));
            var o = r.substr(r.length - 1, 1);
            if (o == "%") {
                r = parseFloat(r.substr(0, r.length - 1));
                if (t.toLowerCase().indexOf("width") >= 0) {
                    n += a[0].offsetWidth - a[0].clientWidth;
                    r = Math.floor((a.width() - n) * r / 100);
                } else {
                    n += a[0].offsetHeight - a[0].clientHeight;
                    r = Math.floor((a.height() - n) * r / 100);
                }
            } else {
                r = parseInt(r) || undefined;
            }
            return r;
        },
        parseOptions: function(t, i) {
            var a = e(t);
            var n = {};
            var r = e.trim(a.attr("data-options"));
            if (r) {
                if (r.substring(0, 1) != "{") {
                    r = "{" + r + "}";
                }
                n = new Function("return " + r)();
            }
            if (i) {
                var o = {};
                for (var s = 0; s < i.length; s++) {
                    var l = i[s];
                    if (typeof l == "string") {
                        if (l == "width" || l == "height" || l == "left" || l == "top") {
                            o[l] = parseInt(t.style[l]) || undefined;
                        } else {
                            o[l] = a.attr(l);
                        }
                    } else {
                        for (var d in l) {
                            var c = l[d];
                            if (c == "boolean") {
                                o[d] = a.attr(d) ? a.attr(d) == "true" : undefined;
                            } else {
                                if (c == "number") {
                                    o[d] = a.attr(d) == "0" ? 0 : parseFloat(a.attr(d)) || undefined;
                                }
                            }
                        }
                    }
                }
                e.extend(n, o);
            }
            return n;
        }
    };
    e(function() {
        var t = e('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo("body");
        t.width(100);
        e._boxModel = Math.abs(parseInt(t.width()) - 100) <= 2;
        t.remove();
        if (!window.easyloader && e.parser.auto) {
            e.parser.parse();
        }
    });
    e.fn._outerWidth = function(t) {
        if (t == undefined) {
            if (this[0] == window) {
                return this.width() || document.body.clientWidth;
            }
            return this.outerWidth() || 0;
        }
        return this.each(function() {
            if (e._boxModel) {
                e(this).width(t - (e(this).outerWidth() - e(this).width()));
            } else {
                e(this).width(t);
            }
        });
    };
    e.fn._outerHeight = function(t) {
        if (t == undefined) {
            if (this[0] == window) {
                return this.height() || document.body.clientHeight;
            }
            return this.outerHeight() || 0;
        }
        return this.each(function() {
            if (e._boxModel) {
                e(this).height(t - (e(this).outerHeight() - e(this).height()));
            } else {
                e(this).height(t);
            }
        });
    };
    e.fn._scrollLeft = function(t) {
        if (t == undefined) {
            return this.scrollLeft();
        } else {
            return this.each(function() {
                e(this).scrollLeft(t);
            });
        }
    };
    e.fn._propAttr = e.fn.prop || e.fn.attr;
    e.fn._fit = function(t) {
        t = t == undefined ? true : t;
        var i = this[0];
        var a = i.tagName == "BODY" ? i : this.parent()[0];
        var n = a.fcount || 0;
        if (t) {
            if (!i.fitted) {
                i.fitted = true;
                a.fcount = n + 1;
                e(a).addClass("panel-noscroll");
                if (a.tagName == "BODY") {
                    e("html").addClass("panel-fit");
                }
            }
        } else {
            if (i.fitted) {
                i.fitted = false;
                a.fcount = n - 1;
                if (a.fcount == 0) {
                    e(a).removeClass("panel-noscroll");
                    if (a.tagName == "BODY") {
                        e("html").removeClass("panel-fit");
                    }
                }
            }
        }
        return {
            width: e(a).width(),
            height: e(a).height()
        };
    };
})(jQuery);

(function(e) {
    var t = null;
    var i = null;
    var a = false;
    function n(i) {
        if (i.touches.length != 1) {
            return;
        }
        if (!a) {
            a = true;
            dblClickTimer = setTimeout(function() {
                a = false;
            }, 500);
        } else {
            clearTimeout(dblClickTimer);
            a = false;
            s(i, "dblclick");
        }
        t = setTimeout(function() {
            s(i, "contextmenu", 3);
        }, 1e3);
        s(i, "mousedown");
        if (e.fn.draggable.isDragging || e.fn.resizable.isResizing) {
            i.preventDefault();
        }
    }
    function r(i) {
        if (i.touches.length != 1) {
            return;
        }
        if (t) {
            clearTimeout(t);
        }
        s(i, "mousemove");
        if (e.fn.draggable.isDragging || e.fn.resizable.isResizing) {
            i.preventDefault();
        }
    }
    function o(i) {
        if (t) {
            clearTimeout(t);
        }
        s(i, "mouseup");
        if (e.fn.draggable.isDragging || e.fn.resizable.isResizing) {
            i.preventDefault();
        }
    }
    function s(t, i, a) {
        var n = new e.Event(i);
        n.pageX = t.changedTouches[0].pageX;
        n.pageY = t.changedTouches[0].pageY;
        n.which = a || 1;
        e(t.target).trigger(n);
    }
    if (document.addEventListener) {
        document.addEventListener("touchstart", n, true);
        document.addEventListener("touchmove", r, true);
        document.addEventListener("touchend", o, true);
    }
})(jQuery);

(function(e) {
    function t(t) {
        var i = e.data(t.data.target, "draggable");
        var a = i.options;
        var n = i.proxy;
        var r = t.data;
        var o = r.startLeft + t.pageX - r.startX;
        var s = r.startTop + t.pageY - r.startY;
        if (n) {
            if (n.parent()[0] == document.body) {
                if (a.deltaX != null && a.deltaX != undefined) {
                    o = t.pageX + a.deltaX;
                } else {
                    o = t.pageX - t.data.offsetWidth;
                }
                if (a.deltaY != null && a.deltaY != undefined) {
                    s = t.pageY + a.deltaY;
                } else {
                    s = t.pageY - t.data.offsetHeight;
                }
            } else {
                if (a.deltaX != null && a.deltaX != undefined) {
                    o += t.data.offsetWidth + a.deltaX;
                }
                if (a.deltaY != null && a.deltaY != undefined) {
                    s += t.data.offsetHeight + a.deltaY;
                }
            }
        }
        if (t.data.parent != document.body) {
            o += e(t.data.parent).scrollLeft();
            s += e(t.data.parent).scrollTop();
        }
        if (a.axis == "h") {
            r.left = o;
        } else {
            if (a.axis == "v") {
                r.top = s;
            } else {
                r.left = o;
                r.top = s;
            }
        }
    }
    function i(t) {
        var i = e.data(t.data.target, "draggable");
        var a = i.options;
        var n = i.proxy;
        if (!n) {
            n = e(t.data.target);
        }
        n.css({
            left: t.data.left,
            top: t.data.top
        });
        e("body").css("cursor", a.cursor);
    }
    function a(a) {
        if (!e.fn.draggable.isDragging) {
            return false;
        }
        var n = e.data(a.data.target, "draggable");
        var r = n.options;
        var o = e(".droppable:visible").filter(function() {
            return a.data.target != this;
        }).filter(function() {
            var t = e.data(this, "droppable").options.accept;
            if (t) {
                return e(t).filter(function() {
                    return this == a.data.target;
                }).length > 0;
            } else {
                return true;
            }
        });
        n.droppables = o;
        var s = n.proxy;
        if (!s) {
            if (r.proxy) {
                if (r.proxy == "clone") {
                    s = e(a.data.target).clone().insertAfter(a.data.target);
                } else {
                    s = r.proxy.call(a.data.target, a.data.target);
                }
                n.proxy = s;
            } else {
                s = e(a.data.target);
            }
        }
        s.css("position", "absolute");
        t(a);
        i(a);
        r.onStartDrag.call(a.data.target, a);
        return false;
    }
    function n(a) {
        if (!e.fn.draggable.isDragging) {
            return false;
        }
        var n = e.data(a.data.target, "draggable");
        t(a);
        if (n.options.onDrag.call(a.data.target, a) != false) {
            i(a);
        }
        var r = a.data.target;
        n.droppables.each(function() {
            var t = e(this);
            if (t.droppable("options").disabled) {
                return;
            }
            var i = t.offset();
            if (a.pageX > i.left && a.pageX < i.left + t.outerWidth() && a.pageY > i.top && a.pageY < i.top + t.outerHeight()) {
                if (!this.entered) {
                    e(this).trigger("_dragenter", [ r ]);
                    this.entered = true;
                }
                e(this).trigger("_dragover", [ r ]);
            } else {
                if (this.entered) {
                    e(this).trigger("_dragleave", [ r ]);
                    this.entered = false;
                }
            }
        });
        return false;
    }
    function r(t) {
        if (!e.fn.draggable.isDragging) {
            o();
            return false;
        }
        n(t);
        var i = e.data(t.data.target, "draggable");
        var a = i.proxy;
        var r = i.options;
        r.onEndDrag.call(t.data.target, t);
        if (r.revert) {
            if (c() == true) {
                e(t.data.target).css({
                    position: t.data.startPosition,
                    left: t.data.startLeft,
                    top: t.data.startTop
                });
            } else {
                if (a) {
                    var s, l;
                    if (a.parent()[0] == document.body) {
                        s = t.data.startX - t.data.offsetWidth;
                        l = t.data.startY - t.data.offsetHeight;
                    } else {
                        s = t.data.startLeft;
                        l = t.data.startTop;
                    }
                    a.animate({
                        left: s,
                        top: l
                    }, function() {
                        d();
                    });
                } else {
                    e(t.data.target).animate({
                        left: t.data.startLeft,
                        top: t.data.startTop
                    }, function() {
                        e(t.data.target).css("position", t.data.startPosition);
                    });
                }
            }
        } else {
            e(t.data.target).css({
                position: "absolute",
                left: t.data.left,
                top: t.data.top
            });
            c();
        }
        r.onStopDrag.call(t.data.target, t);
        o();
        function d() {
            if (a) {
                a.remove();
            }
            i.proxy = null;
        }
        function c() {
            var a = false;
            i.droppables.each(function() {
                var i = e(this);
                if (i.droppable("options").disabled) {
                    return;
                }
                var n = i.offset();
                if (t.pageX > n.left && t.pageX < n.left + i.outerWidth() && t.pageY > n.top && t.pageY < n.top + i.outerHeight()) {
                    if (r.revert) {
                        e(t.data.target).css({
                            position: t.data.startPosition,
                            left: t.data.startLeft,
                            top: t.data.startTop
                        });
                    }
                    e(this).triggerHandler("_drop", [ t.data.target ]);
                    d();
                    a = true;
                    this.entered = false;
                    return false;
                }
            });
            if (!a && !r.revert) {
                d();
            }
            return a;
        }
        return false;
    }
    function o() {
        if (e.fn.draggable.timer) {
            clearTimeout(e.fn.draggable.timer);
            e.fn.draggable.timer = undefined;
        }
        e(document).unbind(".draggable");
        e.fn.draggable.isDragging = false;
        setTimeout(function() {
            e("body").css("cursor", "");
        }, 100);
    }
    e.fn.draggable = function(t, i) {
        if (typeof t == "string") {
            return e.fn.draggable.methods[t](this, i);
        }
        return this.each(function() {
            var i;
            var o = e.data(this, "draggable");
            if (o) {
                o.handle.unbind(".draggable");
                i = e.extend(o.options, t);
            } else {
                i = e.extend({}, e.fn.draggable.defaults, e.fn.draggable.parseOptions(this), t || {});
            }
            var s = i.handle ? typeof i.handle == "string" ? e(i.handle, this) : i.handle : e(this);
            e.data(this, "draggable", {
                options: i,
                handle: s
            });
            if (i.disabled) {
                e(this).css("cursor", "");
                return;
            }
            s.unbind(".draggable").bind("mousemove.draggable", {
                target: this
            }, function(t) {
                if (e.fn.draggable.isDragging) {
                    return;
                }
                var i = e.data(t.data.target, "draggable").options;
                if (l(t)) {
                    e(this).css("cursor", i.cursor);
                } else {
                    e(this).css("cursor", "");
                }
            }).bind("mouseleave.draggable", {
                target: this
            }, function(t) {
                e(this).css("cursor", "");
            }).bind("mousedown.draggable", {
                target: this
            }, function(t) {
                if (l(t) == false) {
                    return;
                }
                e(this).css("cursor", "");
                var i = e(t.data.target).position();
                var o = e(t.data.target).offset();
                var s = {
                    startPosition: e(t.data.target).css("position"),
                    startLeft: i.left,
                    startTop: i.top,
                    left: i.left,
                    top: i.top,
                    startX: t.pageX,
                    startY: t.pageY,
                    width: e(t.data.target).outerWidth(),
                    height: e(t.data.target).outerHeight(),
                    offsetWidth: t.pageX - o.left,
                    offsetHeight: t.pageY - o.top,
                    target: t.data.target,
                    parent: e(t.data.target).parent()[0]
                };
                e.extend(t.data, s);
                var d = e.data(t.data.target, "draggable").options;
                if (d.onBeforeDrag.call(t.data.target, t) == false) {
                    return;
                }
                e(document).bind("mousedown.draggable", t.data, a);
                e(document).bind("mousemove.draggable", t.data, n);
                e(document).bind("mouseup.draggable", t.data, r);
                e.fn.draggable.timer = setTimeout(function() {
                    e.fn.draggable.isDragging = true;
                    a(t);
                }, d.delay);
                return false;
            });
            function l(t) {
                var i = e.data(t.data.target, "draggable");
                var a = i.handle;
                var n = e(a).offset();
                var r = e(a).outerWidth();
                var o = e(a).outerHeight();
                var s = t.pageY - n.top;
                var l = n.left + r - t.pageX;
                var d = n.top + o - t.pageY;
                var c = t.pageX - n.left;
                return Math.min(s, l, d, c) > i.options.edge;
            }
        });
    };
    e.fn.draggable.methods = {
        options: function(t) {
            return e.data(t[0], "draggable").options;
        },
        proxy: function(t) {
            return e.data(t[0], "draggable").proxy;
        },
        enable: function(t) {
            return t.each(function() {
                e(this).draggable({
                    disabled: false
                });
            });
        },
        disable: function(t) {
            return t.each(function() {
                e(this).draggable({
                    disabled: true
                });
            });
        }
    };
    e.fn.draggable.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "cursor", "handle", "axis", {
            revert: "boolean",
            deltaX: "number",
            deltaY: "number",
            edge: "number",
            delay: "number"
        } ]), {
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.draggable.defaults = {
        proxy: null,
        revert: false,
        cursor: "move",
        deltaX: null,
        deltaY: null,
        handle: null,
        disabled: false,
        edge: 0,
        axis: null,
        delay: 100,
        onBeforeDrag: function(e) {},
        onStartDrag: function(e) {},
        onDrag: function(e) {},
        onEndDrag: function(e) {},
        onStopDrag: function(e) {}
    };
    e.fn.draggable.isDragging = false;
})(jQuery);

(function(e) {
    function t(t) {
        e(t).addClass("droppable");
        e(t).bind("_dragenter", function(i, a) {
            e.data(t, "droppable").options.onDragEnter.apply(t, [ i, a ]);
        });
        e(t).bind("_dragleave", function(i, a) {
            e.data(t, "droppable").options.onDragLeave.apply(t, [ i, a ]);
        });
        e(t).bind("_dragover", function(i, a) {
            e.data(t, "droppable").options.onDragOver.apply(t, [ i, a ]);
        });
        e(t).bind("_drop", function(i, a) {
            e.data(t, "droppable").options.onDrop.apply(t, [ i, a ]);
        });
    }
    e.fn.droppable = function(i, a) {
        if (typeof i == "string") {
            return e.fn.droppable.methods[i](this, a);
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "droppable");
            if (a) {
                e.extend(a.options, i);
            } else {
                t(this);
                e.data(this, "droppable", {
                    options: e.extend({}, e.fn.droppable.defaults, e.fn.droppable.parseOptions(this), i)
                });
            }
        });
    };
    e.fn.droppable.methods = {
        options: function(t) {
            return e.data(t[0], "droppable").options;
        },
        enable: function(t) {
            return t.each(function() {
                e(this).droppable({
                    disabled: false
                });
            });
        },
        disable: function(t) {
            return t.each(function() {
                e(this).droppable({
                    disabled: true
                });
            });
        }
    };
    e.fn.droppable.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "accept" ]), {
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.droppable.defaults = {
        accept: null,
        disabled: false,
        onDragEnter: function(e, t) {},
        onDragOver: function(e, t) {},
        onDragLeave: function(e, t) {},
        onDrop: function(e, t) {}
    };
})(jQuery);

(function(e) {
    e.fn.resizable = function(t, i) {
        if (typeof t == "string") {
            return e.fn.resizable.methods[t](this, i);
        }
        function a(t) {
            var i = t.data;
            var a = e.data(i.target, "resizable").options;
            if (i.dir.indexOf("e") != -1) {
                var n = i.startWidth + t.pageX - i.startX;
                n = Math.min(Math.max(n, a.minWidth), a.maxWidth);
                i.width = n;
            }
            if (i.dir.indexOf("s") != -1) {
                var r = i.startHeight + t.pageY - i.startY;
                r = Math.min(Math.max(r, a.minHeight), a.maxHeight);
                i.height = r;
            }
            if (i.dir.indexOf("w") != -1) {
                var n = i.startWidth - t.pageX + i.startX;
                n = Math.min(Math.max(n, a.minWidth), a.maxWidth);
                i.width = n;
                i.left = i.startLeft + i.startWidth - i.width;
            }
            if (i.dir.indexOf("n") != -1) {
                var r = i.startHeight - t.pageY + i.startY;
                r = Math.min(Math.max(r, a.minHeight), a.maxHeight);
                i.height = r;
                i.top = i.startTop + i.startHeight - i.height;
            }
        }
        function n(t) {
            var i = t.data;
            var a = e(i.target);
            a.css({
                left: i.left,
                top: i.top
            });
            if (a.outerWidth() != i.width) {
                a._outerWidth(i.width);
            }
            if (a.outerHeight() != i.height) {
                a._outerHeight(i.height);
            }
        }
        function r(t) {
            e.fn.resizable.isResizing = true;
            e.data(t.data.target, "resizable").options.onStartResize.call(t.data.target, t);
            return false;
        }
        function o(t) {
            a(t);
            if (e.data(t.data.target, "resizable").options.onResize.call(t.data.target, t) != false) {
                n(t);
            }
            return false;
        }
        function s(t) {
            e.fn.resizable.isResizing = false;
            a(t, true);
            n(t);
            e.data(t.data.target, "resizable").options.onStopResize.call(t.data.target, t);
            e(document).unbind(".resizable");
            e("body").css("cursor", "");
            return false;
        }
        return this.each(function() {
            var i = null;
            var a = e.data(this, "resizable");
            if (a) {
                e(this).unbind(".resizable");
                i = e.extend(a.options, t || {});
            } else {
                i = e.extend({}, e.fn.resizable.defaults, e.fn.resizable.parseOptions(this), t || {});
                e.data(this, "resizable", {
                    options: i
                });
            }
            if (i.disabled == true) {
                return;
            }
            e(this).bind("mousemove.resizable", {
                target: this
            }, function(t) {
                if (e.fn.resizable.isResizing) {
                    return;
                }
                var i = n(t);
                if (i == "") {
                    e(t.data.target).css("cursor", "");
                } else {
                    e(t.data.target).css("cursor", i + "-resize");
                }
            }).bind("mouseleave.resizable", {
                target: this
            }, function(t) {
                e(t.data.target).css("cursor", "");
            }).bind("mousedown.resizable", {
                target: this
            }, function(t) {
                var i = n(t);
                if (i == "") {
                    return;
                }
                function a(i) {
                    var a = parseInt(e(t.data.target).css(i));
                    if (isNaN(a)) {
                        return 0;
                    } else {
                        return a;
                    }
                }
                var l = {
                    target: t.data.target,
                    dir: i,
                    startLeft: a("left"),
                    startTop: a("top"),
                    left: a("left"),
                    top: a("top"),
                    startX: t.pageX,
                    startY: t.pageY,
                    startWidth: e(t.data.target).outerWidth(),
                    startHeight: e(t.data.target).outerHeight(),
                    width: e(t.data.target).outerWidth(),
                    height: e(t.data.target).outerHeight(),
                    deltaWidth: e(t.data.target).outerWidth() - e(t.data.target).width(),
                    deltaHeight: e(t.data.target).outerHeight() - e(t.data.target).height()
                };
                e(document).bind("mousedown.resizable", l, r);
                e(document).bind("mousemove.resizable", l, o);
                e(document).bind("mouseup.resizable", l, s);
                e("body").css("cursor", i + "-resize");
            });
            function n(t) {
                var a = e(t.data.target);
                var n = "";
                var r = a.offset();
                var o = a.outerWidth();
                var s = a.outerHeight();
                var l = i.edge;
                if (t.pageY > r.top && t.pageY < r.top + l) {
                    n += "n";
                } else {
                    if (t.pageY < r.top + s && t.pageY > r.top + s - l) {
                        n += "s";
                    }
                }
                if (t.pageX > r.left && t.pageX < r.left + l) {
                    n += "w";
                } else {
                    if (t.pageX < r.left + o && t.pageX > r.left + o - l) {
                        n += "e";
                    }
                }
                var d = i.handles.split(",");
                for (var c = 0; c < d.length; c++) {
                    var f = d[c].replace(/(^\s*)|(\s*$)/g, "");
                    if (f == "all" || f == n) {
                        return n;
                    }
                }
                return "";
            }
        });
    };
    e.fn.resizable.methods = {
        options: function(t) {
            return e.data(t[0], "resizable").options;
        },
        enable: function(t) {
            return t.each(function() {
                e(this).resizable({
                    disabled: false
                });
            });
        },
        disable: function(t) {
            return t.each(function() {
                e(this).resizable({
                    disabled: true
                });
            });
        }
    };
    e.fn.resizable.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "handles", {
            minWidth: "number",
            minHeight: "number",
            maxWidth: "number",
            maxHeight: "number",
            edge: "number"
        } ]), {
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.resizable.defaults = {
        disabled: false,
        handles: "n, e, s, w, ne, se, sw, nw, all",
        minWidth: 10,
        minHeight: 10,
        maxWidth: 1e4,
        maxHeight: 1e4,
        edge: 5,
        onStartResize: function(e) {},
        onResize: function(e) {},
        onStopResize: function(e) {}
    };
    e.fn.resizable.isResizing = false;
})(jQuery);

(function(e) {
    function t(t) {
        var n = e.data(t, "linkbutton").options;
        var r = e(t).empty();
        r.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected");
        r.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + n.size);
        if (n.plain) {
            r.addClass("l-btn-plain");
        }
        if (n.selected) {
            r.addClass(n.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
        }
        r.attr("group", n.group || "");
        r.attr("id", n.id || "");
        var o = e('<span class="l-btn-left"></span>').appendTo(r);
        if (n.text) {
            if (n.notTrans) {
                e('<span class="l-btn-text"></span>').html(n.text).appendTo(o);
            } else {
                e('<span class="l-btn-text"></span>').html(e.hisui.getTrans(n.text)).appendTo(o);
            }
        } else {
            e('<span class="l-btn-text l-btn-empty">&nbsp;</span>').appendTo(o);
        }
        if (n.iconImg) {
            e('<span class="l-btn-icon" style="background-image:url(\'' + n.iconImg + "');background-position:center;background-repeat:no-repeat;\">&nbsp;</span>").appendTo(o);
            o.addClass("l-btn-icon-" + n.iconAlign);
        } else if (n.iconCls) {
            e('<span class="l-btn-icon">&nbsp;</span>').addClass(n.iconCls).appendTo(o);
            o.addClass("l-btn-icon-" + n.iconAlign);
        }
        r.unbind(".linkbutton").bind("focus.linkbutton", function() {
            if (!n.disabled) {
                e(this).addClass("l-btn-focus");
            }
        }).bind("blur.linkbutton", function() {
            e(this).removeClass("l-btn-focus");
        }).bind("click.linkbutton", function() {
            if (!n.disabled) {
                if (n.toggle) {
                    if (n.selected) {
                        e(this).linkbutton("unselect");
                    } else {
                        e(this).linkbutton("select");
                    }
                }
                n.onClick.call(this);
            }
            if (!r.hasClass("filebox-button")) return false;
        });
        r.children("span").unbind(".linkbutton").bind("click.linkbutton", function() {
            if (n.disabled && n.stopAllEventOnDisabled) {
                return false;
            } else {
                return true;
            }
        });
        i(t, n.selected);
        a(t, n.disabled);
    }
    function i(t, i) {
        var a = e.data(t, "linkbutton").options;
        if (i) {
            if (a.group) {
                e('a.l-btn[group="' + a.group + '"]').each(function() {
                    var t = e(this).linkbutton("options");
                    if (t.toggle) {
                        e(this).removeClass("l-btn-selected l-btn-plain-selected");
                        t.selected = false;
                    }
                });
            }
            e(t).addClass(a.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
            a.selected = true;
        } else {
            if (!a.group) {
                e(t).removeClass("l-btn-selected l-btn-plain-selected");
                a.selected = false;
            }
        }
    }
    function a(t, i) {
        var a = e.data(t, "linkbutton");
        var n = a.options;
        e(t).removeClass("l-btn-disabled l-btn-plain-disabled");
        if (i) {
            n.disabled = true;
            var r = e(t).attr("href");
            if (r) {
                a.href = r;
                e(t).attr("href", "javascript:void(0)");
            }
            if (t.onclick) {
                a.onclick = t.onclick;
                t.onclick = null;
            }
            n.plain ? e(t).addClass("l-btn-disabled l-btn-plain-disabled") : e(t).addClass("l-btn-disabled");
        } else {
            n.disabled = false;
            if (a.href) {
                e(t).attr("href", a.href);
            }
            if (a.onclick) {
                t.onclick = a.onclick;
            }
        }
    }
    e.fn.linkbutton = function(i, a) {
        if (typeof i == "string") {
            return e.fn.linkbutton.methods[i](this, a);
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "linkbutton");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "linkbutton", {
                    options: e.extend({}, e.fn.linkbutton.defaults, e.fn.linkbutton.parseOptions(this), i)
                });
                e(this).removeAttr("disabled");
            }
            t(this);
        });
    };
    e.fn.linkbutton.methods = {
        options: function(t) {
            return e.data(t[0], "linkbutton").options;
        },
        enable: function(e) {
            return e.each(function() {
                a(this, false);
            });
        },
        disable: function(e) {
            return e.each(function() {
                a(this, true);
            });
        },
        select: function(e) {
            return e.each(function() {
                i(this, true);
            });
        },
        unselect: function(e) {
            return e.each(function() {
                i(this, false);
            });
        }
    };
    e.fn.linkbutton.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "id", "iconImg", "iconCls", "iconAlign", "group", "size", {
            plain: "boolean",
            toggle: "boolean",
            selected: "boolean"
        } ]), {
            disabled: i.attr("disabled") ? true : undefined,
            text: e.trim(i.html()),
            iconCls: i.attr("icon") || i.attr("iconCls")
        });
    };
    e.fn.linkbutton.defaults = {
        id: null,
        disabled: false,
        toggle: false,
        selected: false,
        group: null,
        plain: false,
        text: "",
        iconImg: null,
        iconCls: null,
        iconAlign: "left",
        size: "small",
        onClick: function() {},
        stopAllEventOnDisabled: false,
        notTrans: false
    };
})(jQuery);

(function($) {
    function _81(_82) {
        var _83 = $.data(_82, "pagination");
        var _84 = _83.options;
        var bb = _83.bb = {};
        var _85 = $(_82).addClass("pagination").html('<table cellspacing="0" cellpadding="0" border="0"><tr></tr></table>');
        var tr = _85.find("tr");
        var aa = $.extend([], _84.layout);
        if (!_84.showPageList) {
            _86(aa, "list");
        }
        if (!_84.showRefresh) {
            _86(aa, "refresh");
        }
        if (aa[0] == "sep") {
            aa.shift();
        }
        if (aa[aa.length - 1] == "sep") {
            aa.pop();
        }
        for (var _87 = 0; _87 < aa.length; _87++) {
            var _88 = aa[_87];
            if (_88 == "list") {
                var ps = $('<select class="pagination-page-list"></select>');
                ps.bind("change", function() {
                    _84.pageSize = parseInt($(this).val());
                    _84.onChangePageSize.call(_82, _84.pageSize);
                    _8e(_82, _84.pageNumber);
                });
                for (var i = 0; i < _84.pageList.length; i++) {
                    $("<option></option>").text(_84.pageList[i]).appendTo(ps);
                }
                $("<td></td>").append(ps).appendTo(tr);
            } else {
                if (_88 == "sep") {
                    $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);
                } else {
                    if (_88 == "first") {
                        bb.first = _89("first");
                    } else {
                        if (_88 == "prev") {
                            bb.prev = _89("prev");
                        } else {
                            if (_88 == "next") {
                                bb.next = _89("next");
                            } else {
                                if (_88 == "last") {
                                    bb.last = _89("last");
                                } else {
                                    if (_88 == "manual") {
                                        $('<span style="padding-left:6px;"></span>').html(_84.beforePageText).appendTo(tr).wrap("<td></td>");
                                        bb.num = $('<input class="pagination-num" type="text" value="1" size="2">').appendTo(tr).wrap("<td></td>");
                                        bb.num.unbind(".pagination").bind("keydown.pagination", function(e) {
                                            if (e.keyCode == 13) {
                                                var t = parseInt($(this).val()) || 1;
                                                _8e(_82, t);
                                                return false;
                                            }
                                        });
                                        bb.after = $('<span style="padding-right:6px;"></span>').appendTo(tr).wrap("<td></td>");
                                    } else {
                                        if (_88 == "refresh") {
                                            bb.refresh = _89("refresh");
                                        } else {
                                            if (_88 == "links") {
                                                $('<td class="pagination-links"></td>').appendTo(tr);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_84.buttons) {
            $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);
            if ($.isArray(_84.buttons)) {
                for (var i = 0; i < _84.buttons.length; i++) {
                    var btn = _84.buttons[i];
                    if (btn == "-") {
                        $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr);
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var a = $('<a href="javascript:void(0)"></a>').appendTo(td);
                        a[0].onclick = eval(btn.handler || function() {});
                        a.linkbutton($.extend({}, btn, {
                            plain: true
                        }));
                    }
                }
            } else {
                var td = $("<td></td>").appendTo(tr);
                $(_84.buttons).appendTo(td).show();
            }
        }
        $('<div class="pagination-info"></div>').appendTo(_85);
        $('<div style="clear:both;"></div>').appendTo(_85);
        function _89(e) {
            var t = _84.nav[e];
            var i = $('<a href="javascript:void(0)"></a>').appendTo(tr);
            i.wrap("<td></td>");
            i.linkbutton({
                iconCls: t.iconCls,
                plain: true
            }).unbind(".pagination").bind("click.pagination", function() {
                t.handler.call(_82);
            });
            return i;
        }
        function _86(e, t) {
            var i = $.inArray(t, e);
            if (i >= 0) {
                e.splice(i, 1);
            }
            return e;
        }
    }
    function _8e(e, t) {
        var i = $.data(e, "pagination").options;
        _92(e, {
            pageNumber: t
        });
        i.onSelectPage.call(e, i.pageNumber, i.pageSize);
    }
    function _92(e, t) {
        var i = $.data(e, "pagination");
        var a = i.options;
        var n = i.bb;
        $.extend(a, t || {});
        var r = $(e).find("select.pagination-page-list");
        if (r.length) {
            r.val(a.pageSize + "");
            a.pageSize = parseInt(r.val());
        }
        var o = Math.ceil(a.total / a.pageSize) || 1;
        if (a.pageNumber < 1) {
            a.pageNumber = 1;
        }
        if (a.pageNumber > o) {
            a.pageNumber = o;
        }
        if (n.num) {
            n.num.val(a.pageNumber);
        }
        if (n.after) {
            n.after.html(a.afterPageText.replace(/{pages}/, o));
        }
        var s = $(e).find("td.pagination-links");
        if (s.length) {
            s.empty();
            var l = a.pageNumber - Math.floor(a.links / 2);
            if (l < 1) {
                l = 1;
            }
            var d = l + a.links - 1;
            if (d > o) {
                d = o;
            }
            l = d - a.links + 1;
            if (l < 1) {
                l = 1;
            }
            for (var c = l; c <= d; c++) {
                var f = $('<a class="pagination-link" href="javascript:void(0)"></a>').appendTo(s);
                f.linkbutton({
                    plain: true,
                    text: c
                });
                if (c == a.pageNumber) {
                    f.linkbutton("select");
                } else {
                    f.unbind(".pagination").bind("click.pagination", {
                        pageNumber: c
                    }, function(t) {
                        _8e(e, t.data.pageNumber);
                    });
                }
            }
        }
        var u = a.displayMsg;
        u = u.replace(/{from}/, a.total == 0 ? 0 : a.pageSize * (a.pageNumber - 1) + 1);
        u = u.replace(/{to}/, Math.min(a.pageSize * a.pageNumber, a.total));
        u = u.replace(/{total}/, a.total);
        $(e).find("div.pagination-info").html(u);
        if (n.first) {
            n.first.linkbutton({
                disabled: a.pageNumber == 1
            });
        }
        if (n.prev) {
            n.prev.linkbutton({
                disabled: a.pageNumber == 1
            });
        }
        if (n.next) {
            n.next.linkbutton({
                disabled: a.pageNumber == o
            });
        }
        if (n.last) {
            n.last.linkbutton({
                disabled: a.pageNumber == o
            });
        }
        _9b(e, a.loading);
    }
    function _9b(e, t) {
        var i = $.data(e, "pagination");
        var a = i.options;
        a.loading = t;
        if (a.showRefresh && i.bb.refresh) {
            i.bb.refresh.linkbutton({
                iconCls: a.loading ? "pagination-loading" : "pagination-load"
            });
        }
    }
    $.fn.pagination = function(e, t) {
        if (typeof e == "string") {
            return $.fn.pagination.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t;
            var i = $.data(this, "pagination");
            if (i) {
                t = $.extend(i.options, e);
            } else {
                t = $.extend({}, $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), e);
                $.data(this, "pagination", {
                    options: t
                });
            }
            _81(this);
            _92(this);
        });
    };
    $.fn.pagination.methods = {
        options: function(e) {
            return $.data(e[0], "pagination").options;
        },
        loading: function(e) {
            return e.each(function() {
                _9b(this, true);
            });
        },
        loaded: function(e) {
            return e.each(function() {
                _9b(this, false);
            });
        },
        refresh: function(e, t) {
            return e.each(function() {
                _92(this, t);
            });
        },
        select: function(e, t) {
            return e.each(function() {
                _8e(this, t);
            });
        }
    };
    $.fn.pagination.parseOptions = function(_a6) {
        var t = $(_a6);
        return $.extend({}, $.parser.parseOptions(_a6, [ {
            total: "number",
            pageSize: "number",
            pageNumber: "number",
            links: "number"
        }, {
            loading: "boolean",
            showPageList: "boolean",
            showRefresh: "boolean"
        } ]), {
            pageList: t.attr("pageList") ? eval(t.attr("pageList")) : undefined
        });
    };
    $.fn.pagination.defaults = {
        total: 1,
        pageSize: 10,
        pageNumber: 1,
        pageList: [ 10, 20, 30, 50 ],
        loading: false,
        buttons: null,
        showPageList: true,
        showRefresh: true,
        links: 10,
        layout: [ "list", "sep", "first", "prev", "sep", "manual", "sep", "next", "last", "sep", "refresh" ],
        onSelectPage: function(e, t) {},
        onBeforeRefresh: function(e, t) {},
        onRefresh: function(e, t) {},
        onChangePageSize: function(e) {},
        beforePageText: "Page",
        afterPageText: "of {pages}",
        displayMsg: "Displaying {from} to {to} of {total} items",
        nav: {
            first: {
                iconCls: "pagination-first",
                handler: function() {
                    var e = $(this).pagination("options");
                    if (e.pageNumber > 1) {
                        $(this).pagination("select", 1);
                    }
                }
            },
            prev: {
                iconCls: "pagination-prev",
                handler: function() {
                    var e = $(this).pagination("options");
                    if (e.pageNumber > 1) {
                        $(this).pagination("select", e.pageNumber - 1);
                    }
                }
            },
            next: {
                iconCls: "pagination-next",
                handler: function() {
                    var e = $(this).pagination("options");
                    var t = Math.ceil(e.total / e.pageSize);
                    if (e.pageNumber < t) {
                        $(this).pagination("select", e.pageNumber + 1);
                    }
                }
            },
            last: {
                iconCls: "pagination-last",
                handler: function() {
                    var e = $(this).pagination("options");
                    var t = Math.ceil(e.total / e.pageSize);
                    if (e.pageNumber < t) {
                        $(this).pagination("select", t);
                    }
                }
            },
            refresh: {
                iconCls: "pagination-refresh",
                handler: function() {
                    var e = $(this).pagination("options");
                    if (e.onBeforeRefresh.call(this, e.pageNumber, e.pageSize) != false) {
                        $(this).pagination("select", e.pageNumber);
                        e.onRefresh.call(this, e.pageNumber, e.pageSize);
                    }
                }
            }
        }
    };
})(jQuery);

(function(e) {
    function t(t) {
        var i = e(t);
        i.addClass("tree");
        return i;
    }
    function i(t) {
        var i = e.data(t, "tree").options;
        e(t).unbind().bind("mouseover", function(t) {
            var i = e(t.target);
            var a = i.closest("div.tree-node");
            if (!a.length) {
                return;
            }
            a.addClass("tree-node-hover");
            if (i.hasClass("tree-hit")) {
                if (i.hasClass("tree-expanded")) {
                    i.addClass("tree-expanded-hover");
                } else {
                    i.addClass("tree-collapsed-hover");
                }
            }
            t.stopPropagation();
        }).bind("mouseout", function(t) {
            var i = e(t.target);
            var a = i.closest("div.tree-node");
            if (!a.length) {
                return;
            }
            a.removeClass("tree-node-hover");
            if (i.hasClass("tree-hit")) {
                if (i.hasClass("tree-expanded")) {
                    i.removeClass("tree-expanded-hover");
                } else {
                    i.removeClass("tree-collapsed-hover");
                }
            }
            t.stopPropagation();
        }).bind("click", function(a) {
            var n = e(a.target);
            var o = n.closest("div.tree-node");
            if (!o.length) {
                return;
            }
            if (n.hasClass("tree-hit")) {
                u(t, o[0]);
                return false;
            } else {
                if (n.hasClass("tree-checkbox")) {
                    r(t, o[0], !n.hasClass("tree-checkbox1"));
                    return false;
                } else {
                    $(t, o[0]);
                    i.onClick.call(t, X(t, o[0]));
                }
            }
            a.stopPropagation();
        }).bind("dblclick", function(a) {
            var n = e(a.target).closest("div.tree-node");
            if (!n.length) {
                return;
            }
            $(t, n[0]);
            i.onDblClick.call(t, X(t, n[0]));
            a.stopPropagation();
        }).bind("contextmenu", function(a) {
            var n = e(a.target).closest("div.tree-node");
            if (!n.length) {
                return;
            }
            i.onContextMenu.call(t, a, X(t, n[0]));
            a.stopPropagation();
        });
    }
    function a(t) {
        var i = e.data(t, "tree").options;
        i.dnd = false;
        var a = e(t).find("div.tree-node");
        a.draggable("disable");
        a.css("cursor", "pointer");
    }
    function n(t) {
        var i = e.data(t, "tree");
        var a = i.options;
        var n = i.tree;
        i.disabledNodes = [];
        a.dnd = true;
        n.find("div.tree-node").draggable({
            disabled: false,
            revert: true,
            cursor: "pointer",
            proxy: function(t) {
                var i = e('<div class="tree-node-proxy"></div>').appendTo("body");
                i.html('<span class="tree-dnd-icon tree-dnd-no">&nbsp;</span>' + e(t).find(".tree-title").html());
                i.hide();
                return i;
            },
            deltaX: 15,
            deltaY: 15,
            onBeforeDrag: function(i) {
                if (a.onBeforeDrag.call(t, X(t, this)) == false) {
                    return false;
                }
                if (e(i.target).hasClass("tree-hit") || e(i.target).hasClass("tree-checkbox")) {
                    return false;
                }
                if (i.which != 1) {
                    return false;
                }
                e(this).next("ul").find("div.tree-node").droppable({
                    accept: "no-accept"
                });
                var n = e(this).find("span.tree-indent");
                if (n.length) {
                    i.data.offsetWidth -= n.length * n.width();
                }
            },
            onStartDrag: function() {
                e(this).draggable("proxy").css({
                    left: -1e4,
                    top: -1e4
                });
                a.onStartDrag.call(t, X(t, this));
                var n = X(t, this);
                if (n.id == undefined) {
                    n.id = "hisui_tree_node_id_temp";
                    C(t, n);
                }
                i.draggingNodeId = n.id;
            },
            onDrag: function(t) {
                var i = t.pageX, a = t.pageY, n = t.data.startX, r = t.data.startY;
                var o = Math.sqrt((i - n) * (i - n) + (a - r) * (a - r));
                if (o > 3) {
                    e(this).draggable("proxy").show();
                }
                this.pageY = t.pageY;
            },
            onStopDrag: function() {
                e(this).next("ul").find("div.tree-node").droppable({
                    accept: "div.tree-node"
                });
                for (var n = 0; n < i.disabledNodes.length; n++) {
                    e(i.disabledNodes[n]).droppable("enable");
                }
                i.disabledNodes = [];
                var r = J(t, i.draggingNodeId);
                if (r && r.id == "hisui_tree_node_id_temp") {
                    r.id = "";
                    C(t, r);
                }
                a.onStopDrag.call(t, r);
            }
        }).droppable({
            accept: "div.tree-node",
            onDragEnter: function(n, s) {
                if (a.onDragEnter.call(t, this, r(s)) == false) {
                    o(s, false);
                    e(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    e(this).droppable("disable");
                    i.disabledNodes.push(this);
                }
            },
            onDragOver: function(n, s) {
                if (e(this).droppable("options").disabled) {
                    return;
                }
                var l = s.pageY;
                var d = e(this).offset().top;
                var c = d + e(this).outerHeight();
                o(s, true);
                e(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                if (l > d + (c - d) / 2) {
                    if (c - l < 5) {
                        e(this).addClass("tree-node-bottom");
                    } else {
                        e(this).addClass("tree-node-append");
                    }
                } else {
                    if (l - d < 5) {
                        e(this).addClass("tree-node-top");
                    } else {
                        e(this).addClass("tree-node-append");
                    }
                }
                if (a.onDragOver.call(t, this, r(s)) == false) {
                    o(s, false);
                    e(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    e(this).droppable("disable");
                    i.disabledNodes.push(this);
                }
            },
            onDragLeave: function(i, n) {
                o(n, false);
                e(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                a.onDragLeave.call(t, this, r(n));
            },
            onDrop: function(i, n) {
                var o = this;
                var d, c;
                if (e(this).hasClass("tree-node-append")) {
                    d = s;
                    c = "append";
                } else {
                    d = l;
                    c = e(this).hasClass("tree-node-top") ? "top" : "bottom";
                }
                if (a.onBeforeDrop.call(t, o, r(n), c) == false) {
                    e(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    return;
                }
                d(n, o, c);
                e(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
            }
        });
        function r(t, i) {
            return e(t).closest("ul.tree").tree(i ? "pop" : "getData", t);
        }
        function o(t, i) {
            var a = e(t).draggable("proxy").find("span.tree-dnd-icon");
            a.removeClass("tree-dnd-yes tree-dnd-no").addClass(i ? "tree-dnd-yes" : "tree-dnd-no");
        }
        function s(i, n) {
            if (X(t, n).state == "closed") {
                c(t, n, function() {
                    o();
                });
            } else {
                o();
            }
            function o() {
                var o = r(i, true);
                e(t).tree("append", {
                    parent: n,
                    data: [ o ]
                });
                a.onDrop.call(t, n, o, "append");
            }
        }
        function l(i, n, o) {
            var s = {};
            if (o == "top") {
                s.before = n;
            } else {
                s.after = n;
            }
            var l = r(i, true);
            s.data = l;
            e(t).tree("insert", s);
            a.onDrop.call(t, n, l, o);
        }
    }
    function r(t, i, a) {
        var n = e.data(t, "tree").options;
        if (!n.checkbox) {
            return;
        }
        var r = X(t, i);
        if (n.onBeforeCheck.call(t, r, a) == false) {
            return;
        }
        var o = e(i);
        var s = o.find(".tree-checkbox");
        s.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
        if (a) {
            s.addClass("tree-checkbox1");
        } else {
            s.addClass("tree-checkbox0");
        }
        if (n.cascadeCheck) {
            d(o);
            l(o);
        }
        n.onCheck.call(t, r, a);
        function l(e) {
            var t = e.next().find(".tree-checkbox");
            t.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
            if (e.find(".tree-checkbox").hasClass("tree-checkbox1")) {
                t.addClass("tree-checkbox1");
            } else {
                t.addClass("tree-checkbox0");
            }
        }
        function d(i) {
            var a = Z(t, i[0]);
            if (a) {
                var n = e(a.target).find(".tree-checkbox");
                n.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
                if (r(i)) {
                    n.addClass("tree-checkbox1");
                } else {
                    if (o(i)) {
                        n.addClass("tree-checkbox0");
                    } else {
                        n.addClass("tree-checkbox2");
                    }
                }
                d(e(a.target));
            }
            function r(t) {
                var i = t.find(".tree-checkbox");
                if (i.hasClass("tree-checkbox0") || i.hasClass("tree-checkbox2")) {
                    return false;
                }
                var a = true;
                t.parent().siblings().each(function() {
                    if (!e(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
                        a = false;
                    }
                });
                return a;
            }
            function o(t) {
                var i = t.find(".tree-checkbox");
                if (i.hasClass("tree-checkbox1") || i.hasClass("tree-checkbox2")) {
                    return false;
                }
                var a = true;
                t.parent().siblings().each(function() {
                    if (!e(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")) {
                        a = false;
                    }
                });
                return a;
            }
        }
    }
    function o(t, i) {
        var a = e.data(t, "tree").options;
        if (!a.checkbox) {
            return;
        }
        var n = e(i);
        if (Q(t, i)) {
            var o = n.find(".tree-checkbox");
            if (o.length) {
                if (o.hasClass("tree-checkbox1")) {
                    r(t, i, true);
                } else {
                    r(t, i, false);
                }
            } else {
                if (a.onlyLeafCheck) {
                    e('<span class="tree-checkbox tree-checkbox0"></span>').insertBefore(n.find(".tree-title"));
                }
            }
        } else {
            var o = n.find(".tree-checkbox");
            if (a.onlyLeafCheck) {
                o.remove();
            } else {
                if (o.hasClass("tree-checkbox1")) {
                    r(t, i, true);
                } else {
                    if (o.hasClass("tree-checkbox2")) {
                        var s = true;
                        var l = true;
                        var d = S(t, i);
                        for (var c = 0; c < d.length; c++) {
                            if (d[c].checked) {
                                l = false;
                            } else {
                                s = false;
                            }
                        }
                        if (s) {
                            r(t, i, true);
                        }
                        if (l) {
                            r(t, i, false);
                        }
                    }
                }
            }
        }
    }
    function s(t, i, a, o) {
        var s = e.data(t, "tree");
        var d = s.options;
        var c = e(i).prevAll("div.tree-node:first");
        a = d.loadFilter.call(t, a, c[0]);
        var f = H(t, "domId", c.attr("id"));
        if (!o) {
            f ? f.children = a : s.data = a;
            e(i).empty();
        } else {
            if (f) {
                f.children ? f.children = f.children.concat(a) : f.children = a;
            } else {
                s.data = s.data.concat(a);
            }
        }
        d.view.render.call(d.view, t, i, a);
        if (d.dnd) {
            n(t);
        }
        if (f) {
            C(t, f);
        }
        var u = [];
        var h = [];
        for (var p = 0; p < a.length; p++) {
            var v = a[p];
            if (!v.checked) {
                u.push(v);
            }
        }
        k(a, function(e) {
            if (e.checked) {
                h.push(e);
            }
        });
        var g = d.onCheck;
        d.onCheck = function() {};
        if (u.length) {
            r(t, e("#" + u[0].domId)[0], false);
        }
        for (var p = 0; p < h.length; p++) {
            r(t, e("#" + h[p].domId)[0], true);
        }
        d.onCheck = g;
        setTimeout(function() {
            l(t, t);
        }, 0);
        d.onLoadSuccess.call(t, f, a);
    }
    function l(t, i, a) {
        var n = e.data(t, "tree").options;
        if (n.lines) {
            e(t).addClass("tree-lines");
        } else {
            e(t).removeClass("tree-lines");
            return;
        }
        if (!a) {
            a = true;
            e(t).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
            e(t).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
            var r = e(t).tree("getRoots");
            if (r.length > 1) {
                e(r[0].target).addClass("tree-root-first");
            } else {
                if (r.length == 1) {
                    e(r[0].target).addClass("tree-root-one");
                }
            }
        }
        e(i).children("li").each(function() {
            var i = e(this).children("div.tree-node");
            var n = i.next("ul");
            if (n.length) {
                if (e(this).next().length) {
                    d(i);
                }
                l(t, n, a);
            } else {
                s(i);
            }
        });
        var o = e(i).children("li:last").children("div.tree-node").addClass("tree-node-last");
        o.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
        function s(e, t) {
            var i = e.find("span.tree-icon");
            i.prev("span.tree-indent").addClass("tree-join");
        }
        function d(t) {
            var i = t.find("span.tree-indent, span.tree-hit").length;
            t.next().find("div.tree-node").each(function() {
                e(this).children("span:eq(" + (i - 1) + ")").addClass("tree-line");
            });
        }
    }
    function d(t, i, a, n) {
        var r = e.data(t, "tree").options;
        a = a || {};
        var o = null;
        if (t != i) {
            var l = e(i).prev();
            o = X(t, l[0]);
        }
        if (r.onBeforeLoad.call(t, o, a) == false) {
            return;
        }
        var d = e(i).prev().children("span.tree-folder");
        d.addClass("tree-loading");
        var c = r.loader.call(t, a, function(e) {
            d.removeClass("tree-loading");
            s(t, i, e);
            if (n) {
                n();
            }
        }, function() {
            d.removeClass("tree-loading");
            r.onLoadError.apply(t, arguments);
            if (n) {
                n();
            }
        });
        if (c == false) {
            d.removeClass("tree-loading");
        }
    }
    function c(t, i, a) {
        var n = e.data(t, "tree").options;
        var r = e(i).children("span.tree-hit");
        if (r.length == 0) {
            return;
        }
        if (r.hasClass("tree-expanded")) {
            return;
        }
        var o = X(t, i);
        if (n.onBeforeExpand.call(t, o) == false) {
            return;
        }
        r.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        r.next().addClass("tree-folder-open");
        var s = e(i).next();
        if (s.length) {
            if (n.animate) {
                s.slideDown("normal", function() {
                    o.state = "open";
                    n.onExpand.call(t, o);
                    if (a) {
                        a();
                    }
                });
            } else {
                s.css("display", "block");
                o.state = "open";
                n.onExpand.call(t, o);
                if (a) {
                    a();
                }
            }
        } else {
            var l = e('<ul style="display:none"></ul>').insertAfter(i);
            d(t, l[0], {
                id: o.id
            }, function() {
                if (l.is(":empty")) {
                    l.remove();
                }
                if (n.animate) {
                    l.slideDown("normal", function() {
                        o.state = "open";
                        n.onExpand.call(t, o);
                        if (a) {
                            a();
                        }
                    });
                } else {
                    l.css("display", "block");
                    o.state = "open";
                    n.onExpand.call(t, o);
                    if (a) {
                        a();
                    }
                }
            });
        }
    }
    function f(t, i) {
        var a = e.data(t, "tree").options;
        var n = e(i).children("span.tree-hit");
        if (n.length == 0) {
            return;
        }
        if (n.hasClass("tree-collapsed")) {
            return;
        }
        var r = X(t, i);
        if (a.onBeforeCollapse.call(t, r) == false) {
            return;
        }
        n.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        n.next().removeClass("tree-folder-open");
        var o = e(i).next();
        if (a.animate) {
            o.slideUp("normal", function() {
                r.state = "closed";
                a.onCollapse.call(t, r);
            });
        } else {
            o.css("display", "none");
            r.state = "closed";
            a.onCollapse.call(t, r);
        }
    }
    function u(t, i) {
        var a = e(i).children("span.tree-hit");
        if (a.length == 0) {
            return;
        }
        if (a.hasClass("tree-expanded")) {
            f(t, i);
        } else {
            c(t, i);
        }
    }
    function h(e, t) {
        var i = S(e, t);
        if (t) {
            i.unshift(X(e, t));
        }
        for (var a = 0; a < i.length; a++) {
            c(e, i[a].target);
        }
    }
    function p(e, t) {
        var i = [];
        var a = Z(e, t);
        while (a) {
            i.unshift(a);
            a = Z(e, a.target);
        }
        for (var n = 0; n < i.length; n++) {
            c(e, i[n].target);
        }
    }
    function v(t, i) {
        var a = e(t).parent();
        while (a[0].tagName != "BODY" && a.css("overflow-y") != "auto") {
            a = a.parent();
        }
        var n = e(i);
        var r = n.offset().top;
        if (a[0].tagName != "BODY") {
            var o = a.offset().top;
            if (r < o) {
                a.scrollTop(a.scrollTop() + r - o);
            } else {
                if (r + n.outerHeight() > o + a.outerHeight() - 18) {
                    a.scrollTop(a.scrollTop() + r + n.outerHeight() - o - a.outerHeight() + 18);
                }
            }
        } else {
            a.scrollTop(r);
        }
    }
    function g(e, t) {
        var i = S(e, t);
        if (t) {
            i.unshift(X(e, t));
        }
        for (var a = 0; a < i.length; a++) {
            f(e, i[a].target);
        }
    }
    function b(t, i) {
        var a = e(i.parent);
        var n = i.data;
        if (!n) {
            return;
        }
        n = e.isArray(n) ? n : [ n ];
        if (!n.length) {
            return;
        }
        var r;
        if (a.length == 0) {
            r = e(t);
        } else {
            if (Q(t, a[0])) {
                var l = a.find("span.tree-icon");
                l.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                var d = e('<span class="tree-hit tree-expanded"></span>').insertBefore(l);
                if (d.prev().length) {
                    d.prev().remove();
                }
            }
            r = a.next();
            if (!r.length) {
                r = e("<ul></ul>").insertAfter(a);
            }
        }
        s(t, r[0], n, true);
        o(t, r.prev());
    }
    function m(t, i) {
        var a = i.before || i.after;
        var n = Z(t, a);
        var r = i.data;
        if (!r) {
            return;
        }
        r = e.isArray(r) ? r : [ r ];
        if (!r.length) {
            return;
        }
        b(t, {
            parent: n ? n.target : null,
            data: r
        });
        var o = n ? n.children : e(t).tree("getRoots");
        for (var s = 0; s < o.length; s++) {
            if (o[s].domId == e(a).attr("id")) {
                for (var l = r.length - 1; l >= 0; l--) {
                    o.splice(i.before ? s : s + 1, 0, r[l]);
                }
                o.splice(o.length - r.length, r.length);
                break;
            }
        }
        var d = e();
        for (var s = 0; s < r.length; s++) {
            d = d.add(e("#" + r[s].domId).parent());
        }
        if (i.before) {
            d.insertBefore(e(a).parent());
        } else {
            d.insertAfter(e(a).parent());
        }
    }
    function x(t, i) {
        var a = r(i);
        e(i).parent().remove();
        if (a) {
            if (!a.children || !a.children.length) {
                var n = e(a.target);
                n.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                n.find(".tree-hit").remove();
                e('<span class="tree-indent"></span>').prependTo(n);
                n.next().remove();
            }
            C(t, a);
            o(t, a.target);
        }
        l(t, t);
        function r(i) {
            var a = e(i).attr("id");
            var n = Z(t, i);
            var r = n ? n.children : e.data(t, "tree").data;
            for (var o = 0; o < r.length; o++) {
                if (r[o].domId == a) {
                    r.splice(o, 1);
                    break;
                }
            }
            return n;
        }
    }
    function C(t, i) {
        var a = e.data(t, "tree").options;
        var n = e(i.target);
        var o = X(t, i.target);
        var s = o.checked;
        if (o.iconCls) {
            n.find(".tree-icon").removeClass(o.iconCls);
        }
        e.extend(o, i);
        n.find(".tree-title").html(a.formatter.call(t, o));
        if (o.iconCls) {
            n.find(".tree-icon").addClass(o.iconCls);
        }
        if (s != o.checked) {
            r(t, i.target, o.checked);
        }
    }
    function Y(e) {
        var t = w(e);
        return t.length ? t[0] : null;
    }
    function w(t) {
        var i = e.data(t, "tree").data;
        for (var a = 0; a < i.length; a++) {
            D(i[a]);
        }
        return i;
    }
    function S(t, i) {
        var a = [];
        var n = X(t, i);
        var r = n ? n.children : e.data(t, "tree").data;
        k(r, function(e) {
            a.push(D(e));
        });
        return a;
    }
    function Z(t, i) {
        var a = e(i).closest("ul").prevAll("div.tree-node:first");
        return X(t, a[0]);
    }
    function T(t, i) {
        i = i || "checked";
        if (!e.isArray(i)) {
            i = [ i ];
        }
        var a = [];
        for (var n = 0; n < i.length; n++) {
            var r = i[n];
            if (r == "checked") {
                a.push("span.tree-checkbox1");
            } else {
                if (r == "unchecked") {
                    a.push("span.tree-checkbox0");
                } else {
                    if (r == "indeterminate") {
                        a.push("span.tree-checkbox2");
                    }
                }
            }
        }
        var o = [];
        e(t).find(a.join(",")).each(function() {
            var i = e(this).parent();
            o.push(X(t, i[0]));
        });
        return o;
    }
    function L(t) {
        var i = e(t).find("div.tree-node-selected");
        return i.length ? X(t, i[0]) : null;
    }
    function y(e, t) {
        var i = X(e, t);
        if (i && i.children) {
            k(i.children, function(e) {
                D(e);
            });
        }
        return i;
    }
    function X(t, i) {
        return H(t, "domId", e(i).attr("id"));
    }
    function J(e, t) {
        return H(e, "id", t);
    }
    function H(t, i, a) {
        var n = e.data(t, "tree").data;
        var r = null;
        k(n, function(e) {
            if (e[i] == a) {
                r = D(e);
                return false;
            }
        });
        return r;
    }
    function D(t) {
        var i = e("#" + t.domId);
        t.target = i[0];
        t.checked = i.find(".tree-checkbox").hasClass("tree-checkbox1");
        return t;
    }
    function k(e, t) {
        var i = [];
        for (var a = 0; a < e.length; a++) {
            i.push(e[a]);
        }
        while (i.length) {
            var n = i.shift();
            if (t(n) == false) {
                return;
            }
            if (n.children) {
                for (var a = n.children.length - 1; a >= 0; a--) {
                    i.unshift(n.children[a]);
                }
            }
        }
    }
    function $(t, i) {
        var a = e.data(t, "tree").options;
        var n = X(t, i);
        if (a.onBeforeSelect.call(t, n) == false) {
            return;
        }
        e(t).find("div.tree-node-selected").removeClass("tree-node-selected");
        e(i).addClass("tree-node-selected");
        a.onSelect.call(t, n);
    }
    function Q(t, i) {
        return e(i).children("span.tree-hit").length == 0;
    }
    function F(t, i) {
        var a = e.data(t, "tree").options;
        var n = X(t, i);
        if (a.onBeforeEdit.call(t, n) == false) {
            return;
        }
        e(i).css("position", "relative");
        var r = e(i).find(".tree-title");
        var o = r.outerWidth();
        r.empty();
        var s = e('<input class="tree-editor">').appendTo(r);
        s.val(n.text).focus();
        s.width(o + 20);
        s.height(document.compatMode == "CSS1Compat" ? 18 - (s.outerHeight() - s.height()) : 18);
        s.bind("click", function(e) {
            return false;
        }).bind("mousedown", function(e) {
            e.stopPropagation();
        }).bind("mousemove", function(e) {
            e.stopPropagation();
        }).bind("keydown", function(e) {
            if (e.keyCode == 13) {
                P(t, i);
                return false;
            } else {
                if (e.keyCode == 27) {
                    M(t, i);
                    return false;
                }
            }
        }).bind("blur", function(e) {
            e.stopPropagation();
            P(t, i);
        });
    }
    function P(t, i) {
        var a = e.data(t, "tree").options;
        e(i).css("position", "");
        var n = e(i).find("input.tree-editor");
        var r = n.val();
        n.remove();
        var o = X(t, i);
        o.text = r;
        C(t, o);
        a.onAfterEdit.call(t, o);
    }
    function M(t, i) {
        var a = e.data(t, "tree").options;
        e(i).css("position", "");
        e(i).find("input.tree-editor").remove();
        var n = X(t, i);
        C(t, n);
        a.onCancelEdit.call(t, n);
    }
    e.fn.tree = function(a, n) {
        if (typeof a == "string") {
            return e.fn.tree.methods[a](this, n);
        }
        var a = a || {};
        return this.each(function() {
            var n = e.data(this, "tree");
            var r;
            if (n) {
                r = e.extend(n.options, a);
                n.options = r;
            } else {
                r = e.extend({}, e.fn.tree.defaults, e.fn.tree.parseOptions(this), a);
                e.data(this, "tree", {
                    options: r,
                    tree: t(this),
                    data: []
                });
                var o = e.fn.tree.parseData(this);
                if (o.length) {
                    s(this, this, o);
                }
            }
            i(this);
            if (r.data) {
                s(this, this, e.extend(true, [], r.data));
            }
            d(this, this);
        });
    };
    e.fn.tree.methods = {
        options: function(t) {
            return e.data(t[0], "tree").options;
        },
        loadData: function(e, t) {
            return e.each(function() {
                s(this, this, t);
            });
        },
        getNode: function(e, t) {
            return X(e[0], t);
        },
        getData: function(e, t) {
            return y(e[0], t);
        },
        reload: function(t, i) {
            return t.each(function() {
                if (i) {
                    var t = e(i);
                    var a = t.children("span.tree-hit");
                    a.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    t.next().remove();
                    c(this, i);
                } else {
                    e(this).empty();
                    d(this, this);
                }
            });
        },
        getRoot: function(e) {
            return Y(e[0]);
        },
        getRoots: function(e) {
            return w(e[0]);
        },
        getParent: function(e, t) {
            return Z(e[0], t);
        },
        getChildren: function(e, t) {
            return S(e[0], t);
        },
        getChecked: function(e, t) {
            return T(e[0], t);
        },
        getSelected: function(e) {
            return L(e[0]);
        },
        isLeaf: function(e, t) {
            return Q(e[0], t);
        },
        find: function(e, t) {
            return J(e[0], t);
        },
        select: function(e, t) {
            return e.each(function() {
                $(this, t);
            });
        },
        check: function(e, t) {
            return e.each(function() {
                r(this, t, true);
            });
        },
        uncheck: function(e, t) {
            return e.each(function() {
                r(this, t, false);
            });
        },
        collapse: function(e, t) {
            return e.each(function() {
                f(this, t);
            });
        },
        expand: function(e, t) {
            return e.each(function() {
                c(this, t);
            });
        },
        collapseAll: function(e, t) {
            return e.each(function() {
                g(this, t);
            });
        },
        expandAll: function(e, t) {
            return e.each(function() {
                h(this, t);
            });
        },
        expandTo: function(e, t) {
            return e.each(function() {
                p(this, t);
            });
        },
        scrollTo: function(e, t) {
            return e.each(function() {
                v(this, t);
            });
        },
        toggle: function(e, t) {
            return e.each(function() {
                u(this, t);
            });
        },
        append: function(e, t) {
            return e.each(function() {
                b(this, t);
            });
        },
        insert: function(e, t) {
            return e.each(function() {
                m(this, t);
            });
        },
        remove: function(e, t) {
            return e.each(function() {
                x(this, t);
            });
        },
        pop: function(e, t) {
            var i = e.tree("getData", t);
            e.tree("remove", t);
            return i;
        },
        update: function(e, t) {
            return e.each(function() {
                C(this, t);
            });
        },
        enableDnd: function(e) {
            return e.each(function() {
                n(this);
            });
        },
        disableDnd: function(e) {
            return e.each(function() {
                a(this);
            });
        },
        beginEdit: function(e, t) {
            return e.each(function() {
                F(this, t);
            });
        },
        endEdit: function(e, t) {
            return e.each(function() {
                P(this, t);
            });
        },
        cancelEdit: function(e, t) {
            return e.each(function() {
                M(this, t);
            });
        }
    };
    e.fn.tree.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "url", "method", {
            checkbox: "boolean",
            cascadeCheck: "boolean",
            onlyLeafCheck: "boolean"
        }, {
            animate: "boolean",
            lines: "boolean",
            dnd: "boolean"
        } ]));
    };
    e.fn.tree.parseData = function(t) {
        var i = [];
        a(i, e(t));
        return i;
        function a(t, i) {
            i.children("li").each(function() {
                var i = e(this);
                var n = e.extend({}, e.parser.parseOptions(this, [ "id", "iconCls", "state" ]), {
                    checked: i.attr("checked") ? true : undefined
                });
                n.text = i.children("span").html();
                if (!n.text) {
                    n.text = i.html();
                }
                var r = i.children("ul");
                if (r.length) {
                    n.children = [];
                    a(n.children, r);
                }
                t.push(n);
            });
        }
    };
    var _ = 1;
    var B = {
        render: function(t, i, a) {
            var n = e.data(t, "tree").options;
            var r = e('<div id="virtual-node" class="tree-node" style="position:absolute;top:-1000px">').appendTo("body");
            var o = e(i).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
            var s = l(o, a);
            e(i).append(s.join(""));
            r.remove();
            function l(i, a) {
                var o = [];
                for (var s = 0; s < a.length; s++) {
                    var d = a[s];
                    if (n.lines && n.autoNodeHeight) {
                        r.empty();
                        var c = e('<span class="tree-title">' + n.formatter.call(t, d) + "</span>").appendTo(r).height();
                    } else {
                        var c = 0;
                    }
                    if (d.state != "open" && d.state != "closed") {
                        d.state = "open";
                    }
                    d.domId = "_hisui_tree_" + _++;
                    o.push("<li>");
                    o.push('<div id="' + d.domId + '" class="tree-node">');
                    for (var f = 0; f < i; f++) {
                        o.push('<span class="tree-indent" ' + (c > 0 ? 'style="height:' + c + 'px"' : "") + "></span>");
                    }
                    var u = false;
                    if (d.state == "closed") {
                        o.push('<span class="tree-hit tree-collapsed" ' + (c > 0 ? 'style="height:' + c + 'px"' : "") + "></span>");
                        if (c > 0) {
                            o.push('<span class="tree-icon tree-folder tree-icon-lines" style="height:' + c + 'px"></span>');
                        } else {
                            o.push('<span class="tree-icon tree-folder ' + (d.iconCls ? d.iconCls : "") + '"></span>');
                        }
                    } else {
                        if (d.children && d.children.length) {
                            o.push('<span class="tree-hit tree-expanded" ' + (c > 0 ? 'style="height:' + c + 'px"' : "") + "></span>");
                            if (c > 0) {
                                o.push('<span class="tree-icon tree-folder tree-folder-open tree-icon-lines" style="height:' + c + 'px"></span>');
                            } else {
                                o.push('<span class="tree-icon tree-folder tree-folder-open ' + (d.iconCls ? d.iconCls : "") + '"></span>');
                            }
                        } else {
                            o.push('<span class="tree-indent" ' + (c > 0 ? 'style="height:' + c + 'px"' : "") + "></span>");
                            if (c > 0) {
                                o.push('<span class="tree-icon tree-file tree-icon-lines" style="height:' + c + 'px"></span>');
                            } else {
                                o.push('<span class="tree-icon tree-file ' + (d.iconCls ? d.iconCls : "") + '"></span>');
                            }
                            u = true;
                        }
                    }
                    if (n.checkbox) {
                        if (!n.onlyLeafCheck || u) {
                            o.push('<span class="tree-checkbox tree-checkbox0"></span>');
                        }
                    }
                    o.push('<span class="tree-title">' + n.formatter.call(t, d) + "</span>");
                    o.push("</div>");
                    if (d.children && d.children.length) {
                        var h = l(i + 1, d.children);
                        o.push('<ul style="display:' + (d.state == "closed" ? "none" : "block") + '">');
                        o = o.concat(h);
                        o.push("</ul>");
                    }
                    o.push("</li>");
                }
                return o;
            }
        }
    };
    e.fn.tree.defaults = {
        url: null,
        method: "post",
        animate: false,
        checkbox: false,
        cascadeCheck: true,
        onlyLeafCheck: false,
        lines: false,
        dnd: false,
        data: null,
        formatter: function(e) {
            return e.text;
        },
        loader: function(t, i, a) {
            var n = e(this).tree("options");
            if (!n.url) {
                return false;
            }
            e.ajax({
                type: n.method,
                url: n.url,
                data: t,
                dataType: "json",
                success: function(e) {
                    i(e);
                },
                error: function() {
                    a.apply(this, arguments);
                }
            });
        },
        loadFilter: function(e, t) {
            return e;
        },
        view: B,
        onBeforeLoad: function(e, t) {},
        onLoadSuccess: function(e, t) {},
        onLoadError: function() {},
        onClick: function(e) {},
        onDblClick: function(e) {},
        onBeforeExpand: function(e) {},
        onExpand: function(e) {},
        onBeforeCollapse: function(e) {},
        onCollapse: function(e) {},
        onBeforeCheck: function(e, t) {},
        onCheck: function(e, t) {},
        onBeforeSelect: function(e) {},
        onSelect: function(e) {},
        onContextMenu: function(e, t) {},
        onBeforeDrag: function(e) {},
        onStartDrag: function(e) {},
        onStopDrag: function(e) {},
        onDragEnter: function(e, t) {},
        onDragOver: function(e, t) {},
        onDragLeave: function(e, t) {},
        onBeforeDrop: function(e, t, i) {},
        onDrop: function(e, t, i) {},
        onBeforeEdit: function(e) {},
        onAfterEdit: function(e) {},
        onCancelEdit: function(e) {},
        autoNodeHeight: false
    };
})(jQuery);

(function(e) {
    function t(t) {
        e(t).addClass("progressbar");
        e(t).html('<div class="progressbar-text"></div><div class="progressbar-value"><div class="progressbar-text"></div></div>');
        return e(t);
    }
    function i(t, i) {
        var a = e.data(t, "progressbar").options;
        var n = e.data(t, "progressbar").bar;
        if (i) {
            a.width = i;
        }
        n._outerWidth(a.width)._outerHeight(a.height);
        n.find("div.progressbar-text").width(n.width());
        n.find("div.progressbar-text,div.progressbar-value").css({
            height: n.height() + "px",
            lineHeight: n.height() + "px"
        });
    }
    e.fn.progressbar = function(a, n) {
        if (typeof a == "string") {
            var r = e.fn.progressbar.methods[a];
            if (r) {
                return r(this, n);
            }
        }
        a = a || {};
        return this.each(function() {
            var n = e.data(this, "progressbar");
            if (n) {
                e.extend(n.options, a);
            } else {
                n = e.data(this, "progressbar", {
                    options: e.extend({}, e.fn.progressbar.defaults, e.fn.progressbar.parseOptions(this), a),
                    bar: t(this)
                });
            }
            e(this).progressbar("setValue", n.options.value);
            i(this);
        });
    };
    e.fn.progressbar.methods = {
        options: function(t) {
            return e.data(t[0], "progressbar").options;
        },
        resize: function(e, t) {
            return e.each(function() {
                i(this, t);
            });
        },
        getValue: function(t) {
            return e.data(t[0], "progressbar").options.value;
        },
        setValue: function(t, i) {
            if (i < 0) {
                i = 0;
            }
            if (i > 100) {
                i = 100;
            }
            return t.each(function() {
                var t = e.data(this, "progressbar").options;
                var a = t.text.replace(/{value}/, i);
                var n = t.value;
                t.value = i;
                e(this).find("div.progressbar-value").width(i + "%");
                e(this).find("div.progressbar-text").html(a);
                if (n != i) {
                    t.onChange.call(this, i, n);
                }
            });
        }
    };
    e.fn.progressbar.parseOptions = function(t) {
        return e.extend({}, e.parser.parseOptions(t, [ "width", "height", "text", {
            value: "number"
        } ]));
    };
    e.fn.progressbar.defaults = {
        width: "auto",
        height: 22,
        value: 0,
        text: "{value}%",
        onChange: function(e, t) {}
    };
})(jQuery);

(function(e) {
    function t(t) {
        e(t).addClass("tooltip-f");
    }
    function i(t) {
        var i = e.data(t, "tooltip").options;
        e(t).unbind(".tooltip").bind(i.showEvent + ".tooltip", function(e) {
            r(t, e);
        }).bind(i.hideEvent + ".tooltip", function(e) {
            o(t, e);
        }).bind("mousemove.tooltip", function(e) {
            if (i.trackMouse) {
                i.trackMouseX = e.pageX;
                i.trackMouseY = e.pageY;
                n(t);
            }
        });
    }
    function a(t) {
        var i = e.data(t, "tooltip");
        if (i.showTimer) {
            clearTimeout(i.showTimer);
            i.showTimer = null;
        }
        if (i.hideTimer) {
            clearTimeout(i.hideTimer);
            i.hideTimer = null;
        }
    }
    function n(t) {
        var i = e.data(t, "tooltip");
        if (!i || !i.tip) {
            return;
        }
        var a = i.options;
        var n = i.tip;
        if (a.trackMouse) {
            s = e();
            var r = a.trackMouseX + a.deltaX;
            var o = a.trackMouseY + a.deltaY;
        } else {
            var s = e(t);
            var r = s.offset().left + a.deltaX;
            var o = s.offset().top + a.deltaY;
        }
        a.currentPosition = a.position;
        switch (a.position) {
          case "right":
            r += s._outerWidth() + 12 + (a.trackMouse ? 12 : 0);
            o -= (n._outerHeight() - s._outerHeight()) / 2;
            break;

          case "left":
            r -= n._outerWidth() + 12 + (a.trackMouse ? 12 : 0);
            o -= (n._outerHeight() - s._outerHeight()) / 2;
            break;

          case "top":
            r -= (n._outerWidth() - s._outerWidth()) / 2;
            o -= n._outerHeight() + 12 + (a.trackMouse ? 12 : 0);
            break;

          case "bottom":
            r -= (n._outerWidth() - s._outerWidth()) / 2;
            o += s._outerHeight() + 12 + (a.trackMouse ? 12 : 0);
            if (o + n._outerHeight() > document.documentElement["clientHeight"] + window.scrollY) {
                o -= n._outerHeight() + e(t)._outerHeight() + 12 + 12;
                a.currentPosition = "top";
            }
            break;
        }
        var l = 0;
        if (r < 0) {
            l = r;
            r = 0;
        }
        if (!e(t).is(":visible")) {
            r = -1e5;
            o = -1e5;
        }
        n.css({
            left: r,
            top: o,
            zIndex: a.zIndex != undefined ? a.zIndex : e.fn.window ? e.fn.window.defaults.zIndex++ : ""
        });
        if (l < 0) {
            n.children("div.tooltip-arrow").eq(0).css({
                marginLeft: l - 6
            });
        }
        a.onPosition.call(t, r, o);
    }
    function r(t, i) {
        var r = e.data(t, "tooltip");
        var o = r.options;
        var l = r.tip;
        if (!l) {
            l = e('<div tabindex="-1" class="tooltip">' + '<div class="tooltip-content"></div>' + '<div class="tooltip-arrow-outer"></div>' + '<div class="tooltip-arrow"></div>' + "</div>").appendTo("body");
            r.tip = l;
            s(t);
        }
        if (o.tipWidth) l.css("width", o.tipWidth);
        l.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + o.position);
        a(t);
        r.showTimer = setTimeout(function() {
            n(t);
            l.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + o.currentPosition);
            l.show();
            o.onShow.call(t, i);
            var e = l.children(".tooltip-arrow-outer");
            var a = l.children(".tooltip-arrow");
            var r = "border-" + o.currentPosition + "-color";
            e.add(a).css({
                borderTopColor: "",
                borderBottomColor: "",
                borderLeftColor: "",
                borderRightColor: ""
            });
            e.css(r, l.css(r));
            a.css(r, l.css("backgroundColor"));
        }, o.showDelay);
    }
    function o(t, i) {
        var n = e.data(t, "tooltip");
        if (n && n.tip) {
            a(t);
            n.hideTimer = setTimeout(function() {
                n.tip.hide();
                n.options.onHide.call(t, i);
            }, n.options.hideDelay);
        }
    }
    function s(t, i) {
        var a = e.data(t, "tooltip");
        var n = a.options;
        if (i) {
            n.content = i;
        }
        if (!a.tip) {
            return;
        }
        var r = typeof n.content == "function" ? n.content.call(t) : n.content;
        a.tip.children(".tooltip-content").html(e.hisui.getTrans(r));
        n.onUpdate.call(t, r);
    }
    function l(t) {
        var i = e.data(t, "tooltip");
        if (i) {
            a(t);
            var n = i.options;
            if (i.tip) {
                i.tip.remove();
            }
            if (n._title) {
                e(t).attr("title", n._title);
            }
            e.removeData(t, "tooltip");
            e(t).unbind(".tooltip").removeClass("tooltip-f");
            n.onDestroy.call(t);
        }
    }
    e.fn.tooltip = function(a, n) {
        if (typeof a == "string") {
            return e.fn.tooltip.methods[a](this, n);
        }
        a = a || {};
        return this.each(function() {
            var n = e.data(this, "tooltip");
            if (n) {
                e.extend(n.options, a);
            } else {
                e.data(this, "tooltip", {
                    options: e.extend({}, e.fn.tooltip.defaults, e.fn.tooltip.parseOptions(this), a)
                });
                t(this);
            }
            i(this);
            s(this);
        });
    };
    e.fn.tooltip.methods = {
        options: function(t) {
            return e.data(t[0], "tooltip").options;
        },
        tip: function(t) {
            return e.data(t[0], "tooltip").tip;
        },
        arrow: function(e) {
            return e.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
        },
        show: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        hide: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        },
        update: function(e, t) {
            return e.each(function() {
                s(this, t);
            });
        },
        reposition: function(e) {
            return e.each(function() {
                n(this);
            });
        },
        destroy: function(e) {
            return e.each(function() {
                l(this);
            });
        }
    };
    e.fn.tooltip.parseOptions = function(t) {
        var i = e(t);
        var a = e.extend({}, e.parser.parseOptions(t, [ "position", "showEvent", "hideEvent", "content", "tipWidth", {
            deltaX: "number",
            deltaY: "number",
            showDelay: "number",
            hideDelay: "number"
        } ]), {
            _title: i.attr("title")
        });
        i.attr("title", "");
        if (!a.content) {
            a.content = a._title;
        }
        return a;
    };
    e.fn.tooltip.defaults = {
        tipWidth: undefined,
        position: "bottom",
        content: null,
        trackMouse: false,
        deltaX: 0,
        deltaY: 0,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        showDelay: 200,
        hideDelay: 100,
        onShow: function(e) {},
        onHide: function(e) {},
        onUpdate: function(e) {},
        onPosition: function(e, t) {},
        onDestroy: function() {}
    };
})(jQuery);

(function($) {
    $.fn._remove = function() {
        return this.each(function() {
            $(this).remove();
            try {
                this.outerHTML = "";
            } catch (e) {}
        });
    };
    function _1e2(e) {
        e._remove();
    }
    function GetCurrentStrWidth(e, t) {
        var i = $("<span></span>").hide().appendTo(document.body);
        $(i).html(e).css("font", t);
        var a = i.width();
        i.remove();
        return a;
    }
    function _1e3(e, t) {
        var i = $(e);
        if (i.attr("id") == $.hisui.globalContainerId) {
            i.css(t);
            $.hisui.fixPanelTLWH();
            return;
        }
        var a = $.data(e, "panel").options;
        var n = $.data(e, "panel").panel;
        var r = n.children("div.panel-header");
        var o = n.children("div.panel-body");
        if (t) {
            $.extend(a, {
                width: t.width,
                height: t.height,
                left: t.left,
                top: t.top
            });
        }
        a.fit ? $.extend(a, n._fit()) : n._fit(false);
        n.css({
            left: a.left,
            top: a.top
        });
        if (!isNaN(a.width)) {
            n._outerWidth(a.width);
        } else {
            n.width("auto");
        }
        r.add(o)._outerWidth(n.width());
        var s = false;
        if ("undefined" != typeof HISUIStyleCode && HISUIStyleCode.toLocaleLowerCase() == "lite") s = true;
        if (null != a.headerCls && "undefined" != typeof a.headerCls && a.headerCls.indexOf("panel-header-card") > -1 && !s) {
            if (null != a.titleWidth && "undefined" != typeof a.titleWidth) {
                r.width(a.titleWidth);
            } else {
                var l = r.find(".panel-title").text();
                if (l.length <= 4) {
                    r.width(80);
                } else {
                    r.width(40 + parseInt(GetCurrentStrWidth(l, 'normal 14px "Microsoft Yahei", verdana, helvetica, arial, sans-serif')));
                }
            }
        }
        if (!isNaN(a.height)) {
            n._outerHeight(a.height);
            o._outerHeight(n.height() - r._outerHeight());
        } else {
            o.height("auto");
        }
        n.css("height", "");
        a.onResize.apply(e, [ a.width, a.height ]);
        $(e).find(">div,>form>div").filter(":visible").each(function() {
            $(this).triggerHandler("_resize");
        });
    }
    function _1e9(e, t) {
        var i = $.data(e, "panel").options;
        var a = $.data(e, "panel").panel;
        if (t) {
            if (t.left != null) {
                i.left = t.left;
            }
            if (t.top != null) {
                i.top = t.top;
            }
        }
        if (i.left < 0) {
            i.left = 0;
        }
        if (i.top < 0) {
            i.top = 0;
        }
        a.css({
            left: i.left,
            top: i.top
        });
        i.onMove.apply(e, [ i.left, i.top ]);
    }
    function _1ed(e) {
        $(e).addClass("panel-body");
        var t = $('<div class="panel"></div>').insertBefore(e);
        t[0].appendChild(e);
        t.bind("_resize", function() {
            var t = $.data(e, "panel").options;
            if (t.fit == true) {
                _1e3(e);
            }
            return false;
        });
        return t;
    }
    function _1f0(_1f1) {
        var opts = $.data(_1f1, "panel").options;
        var _1f2 = $.data(_1f1, "panel").panel;
        if (opts.tools && typeof opts.tools == "string") {
            _1f2.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(opts.tools);
        }
        _1e2(_1f2.children("div.panel-header"));
        if (opts.title && !opts.noheader) {
            if (opts.notTrans) {
                var _1f3 = $('<div class="panel-header"><div class="panel-title">' + opts.title + "</div></div>").prependTo(_1f2);
            } else {
                var _1f3 = $('<div class="panel-header"><div class="panel-title">' + $.hisui.getTrans(opts.title) + "</div></div>").prependTo(_1f2);
            }
            if (opts.iconCls) {
                _1f3.find(".panel-title").addClass("panel-with-icon");
                $('<div class="panel-icon"></div>').addClass(opts.iconCls).appendTo(_1f3);
            }
            var tool = $('<div class="panel-tool"></div>').appendTo(_1f3);
            tool.bind("click", function(e) {
                e.stopPropagation();
            });
            if (opts.tools) {
                if ($.isArray(opts.tools)) {
                    for (var i = 0; i < opts.tools.length; i++) {
                        var t = $('<a href="javascript:void(0)"></a>').addClass(opts.tools[i].iconCls).appendTo(tool);
                        if (opts.tools[i].handler) {
                            t.bind("click", eval(opts.tools[i].handler));
                        }
                    }
                } else {
                    $(opts.tools).children().each(function() {
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
                    });
                }
            }
            if (opts.collapsible) {
                $('<a class="panel-tool-collapse" href="javascript:void(0)"></a>').appendTo(tool).bind("click", function() {
                    if (opts.collapsed == true) {
                        _210(_1f1, true);
                    } else {
                        _205(_1f1, true);
                    }
                    return false;
                });
            }
            if (opts.minimizable) {
                $('<a class="panel-tool-min" href="javascript:void(0)"></a>').appendTo(tool).bind("click", function() {
                    _216(_1f1);
                    return false;
                });
            }
            if (opts.maximizable) {
                $('<a class="panel-tool-max" href="javascript:void(0)"></a>').appendTo(tool).bind("click", function() {
                    if (opts.maximized == true) {
                        _219(_1f1);
                    } else {
                        _204(_1f1);
                    }
                    return false;
                });
            }
            if (opts.closable) {
                $('<a class="panel-tool-close" href="javascript:void(0)"></a>').appendTo(tool).bind("click", function() {
                    _1f4(_1f1);
                    return false;
                });
            }
            _1f2.children("div.panel-body").removeClass("panel-body-noheader");
        } else {
            _1f2.children("div.panel-body").addClass("panel-body-noheader");
        }
        var ocxFrame = "";
        if (opts.isTopZindex) {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                ocxFrame = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
                _1f2.prepend(ocxFrame);
            }
        }
    }
    function _1f5(e, t) {
        var i = $.data(e, "panel");
        var a = i.options;
        if (n) {
            a.queryParams = t;
        }
        if (a.href) {
            if (!i.isLoaded || !a.cache) {
                var n = $.extend({}, a.queryParams);
                if (a.onBeforeLoad.call(e, n) == false) {
                    return;
                }
                i.isLoaded = false;
                _1fa(e);
                if (a.loadingMessage) {
                    $(e).html($('<div class="panel-loading"></div>').html(a.loadingMessage));
                }
                a.loader.call(e, n, function(t) {
                    r(a.extractor.call(e, t));
                    a.onLoad.apply(e, arguments);
                    i.isLoaded = true;
                }, function() {
                    a.onLoadError.apply(e, arguments);
                });
            }
        } else {
            if (a.content) {
                if (!i.isLoaded) {
                    _1fa(e);
                    r(a.content);
                    i.isLoaded = true;
                }
            }
        }
        function r(t) {
            $(e).html(t);
            $.parser.parse($(e));
        }
    }
    function _1fa(e) {
        var t = $(e);
        t.find(".combo-f").each(function() {
            $(this).combo("destroy");
        });
        t.find(".m-btn").each(function() {
            $(this).menubutton("destroy");
        });
        t.find(".s-btn").each(function() {
            $(this).splitbutton("destroy");
        });
        t.find(".tooltip-f").each(function() {
            $(this).tooltip("destroy");
        });
        t.children("div").each(function() {
            $(this)._fit(false);
        });
    }
    function _1fe(e) {
        $(e).find("div.panel,div.accordion,div.tabs-container,div.layout").filter(":visible").each(function() {
            $(this).triggerHandler("_resize", [ true ]);
        });
    }
    function _200(e, t) {
        var i = $.data(e, "panel").options;
        var a = $.data(e, "panel").panel;
        if (t != true) {
            if (i.onBeforeOpen.call(e) == false) {
                return;
            }
        }
        a.show();
        i.closed = false;
        i.minimized = false;
        var n = a.children("div.panel-header").find("a.panel-tool-restore");
        if (n.length) {
            i.maximized = true;
        }
        if (i.isTopZindex) {
            windowNPAPITotal = 200;
            $.hisui.findObjectDom(i, window, true, e);
        }
        i.onOpen.call(e);
        if (i.maximized == true) {
            i.maximized = false;
            _204(e);
        }
        if (i.collapsed == true) {
            i.collapsed = false;
            _205(e);
        }
        if (!i.collapsed) {
            _1f5(e);
            _1fe(e);
        }
    }
    function _1f4(e, t) {
        var i = $.data(e, "panel").options;
        var a = $.data(e, "panel").panel;
        if (t != true) {
            if (i.onBeforeClose.call(e) == false) {
                return;
            }
        }
        a._fit(false);
        a.hide();
        if (i.isTopZindex) {
            windowNPAPITotal = 200;
            $.hisui.findObjectDom(i, window, false, e);
        }
        $.data(e, "changeIdStr", {
            NPAPIIdStr: ""
        });
        i.closed = true;
        i.onClose.call(e);
    }
    function _209(e, t) {
        var i = $.data(e, "panel").options;
        var a = $.data(e, "panel").panel;
        if (t != true) {
            if (i.onBeforeDestroy.call(e) == false) {
                return;
            }
        }
        _1fa(e);
        _1e2(a);
        i.onDestroy.call(e);
    }
    function _205(e, t) {
        var i = $.data(e, "panel").options;
        var a = $.data(e, "panel").panel;
        var n = a.children("div.panel-body");
        var r = a.children("div.panel-header").find("a.panel-tool-collapse");
        if (i.collapsed == true) {
            return;
        }
        n.stop(true, true);
        if (i.onBeforeCollapse.call(e) == false) {
            return;
        }
        r.addClass("panel-tool-expand");
        r.closest(".panel").addClass("panel-status-collapse");
        if (t == true) {
            n.slideUp("normal", function() {
                i.collapsed = true;
                i.onCollapse.call(e);
            });
        } else {
            n.hide();
            i.collapsed = true;
            i.onCollapse.call(e);
        }
    }
    function _210(e, t) {
        var i = $.data(e, "panel").options;
        var a = $.data(e, "panel").panel;
        var n = a.children("div.panel-body");
        var r = a.children("div.panel-header").find("a.panel-tool-collapse");
        if (i.collapsed == false) {
            return;
        }
        n.stop(true, true);
        if (i.onBeforeExpand.call(e) == false) {
            return;
        }
        r.removeClass("panel-tool-expand");
        r.closest(".panel").removeClass("panel-status-collapse");
        if (t == true) {
            n.slideDown("normal", function() {
                i.collapsed = false;
                i.onExpand.call(e);
                _1f5(e);
                _1fe(e);
            });
        } else {
            n.show();
            i.collapsed = false;
            i.onExpand.call(e);
            _1f5(e);
            _1fe(e);
        }
    }
    function _204(e) {
        var t = $.data(e, "panel").options;
        var i = $.data(e, "panel").panel;
        var a = i.children("div.panel-header").find("a.panel-tool-max");
        if (t.maximized == true) {
            return;
        }
        a.addClass("panel-tool-restore");
        if (!$.data(e, "panel").original) {
            $.data(e, "panel").original = {
                width: t.width,
                height: t.height,
                left: t.left,
                top: t.top,
                fit: t.fit
            };
        }
        t.left = 0;
        t.top = 0;
        t.fit = true;
        _1e3(e);
        t.minimized = false;
        t.maximized = true;
        t.onMaximize.call(e);
    }
    function _216(e) {
        var t = $.data(e, "panel").options;
        var i = $.data(e, "panel").panel;
        i._fit(false);
        i.hide();
        t.minimized = true;
        t.maximized = false;
        t.onMinimize.call(e);
    }
    function _219(e) {
        var t = $.data(e, "panel").options;
        var i = $.data(e, "panel").panel;
        var a = i.children("div.panel-header").find("a.panel-tool-max");
        if (t.maximized == false) {
            return;
        }
        i.show();
        a.removeClass("panel-tool-restore");
        $.extend(t, $.data(e, "panel").original);
        _1e3(e);
        t.minimized = false;
        t.maximized = false;
        $.data(e, "panel").original = null;
        t.onRestore.call(e);
    }
    function _21c(e) {
        var t = $.data(e, "panel").options;
        var i = $.data(e, "panel").panel;
        var a = $(e).panel("header");
        var n = $(e).panel("body");
        i.css(t.style);
        i.addClass(t.cls);
        if (t.border) {
            a.removeClass("panel-header-noborder");
            n.removeClass("panel-body-noborder");
        } else {
            a.addClass("panel-header-noborder");
            n.addClass("panel-body-noborder");
        }
        a.addClass(t.headerCls);
        a.parent().addClass(t.headerCls + "-parent");
        n.addClass(t.bodyCls);
        if (t.id) {
            $(e).attr("id", t.id);
        } else {
            $(e).attr("id", "");
        }
    }
    function _220(e, t) {
        $.data(e, "panel").options.title = t;
        $(e).panel("header").find("div.panel-title").html($.data(e, "panel").options.notTrans ? t : $.hisui.getTrans(t));
    }
    var TO = false;
    var _223 = true;
    $(window).unbind(".panel").bind("resize.panel", function() {
        if (!_223) {
            return;
        }
        if (TO !== false) {
            clearTimeout(TO);
        }
        TO = setTimeout(function() {
            _223 = false;
            var e = $("body.layout");
            if (e.length) {
                e.layout("resize");
            } else {
                $("body").children("div.panel,div.accordion,div.tabs-container,div.layout").filter(":visible").each(function() {
                    $(this).triggerHandler("_resize");
                });
            }
            _223 = true;
            TO = false;
        }, 200);
    });
    $.fn.panel = function(e, t) {
        if (typeof e == "string") {
            return $.fn.panel.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "panel");
            var i;
            if (t) {
                i = $.extend(t.options, e);
                t.isLoaded = false;
            } else {
                i = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), e);
                $(this).attr("title", "");
                t = $.data(this, "panel", {
                    options: i,
                    panel: _1ed(this),
                    isLoaded: false
                });
            }
            _1f0(this);
            _21c(this);
            if (i.doSize == true) {
                t.panel.css("display", "block");
                _1e3(this);
            }
            if (i.closed == true || i.minimized == true) {
                t.panel.hide();
            } else {
                _200(this);
            }
        });
    };
    $.fn.panel.methods = {
        options: function(e) {
            return $.data(e[0], "panel").options;
        },
        panel: function(e) {
            return $.data(e[0], "panel").panel;
        },
        header: function(e) {
            return $.data(e[0], "panel").panel.find(">div.panel-header");
        },
        body: function(e) {
            return $.data(e[0], "panel").panel.find(">div.panel-body");
        },
        setTitle: function(e, t) {
            return e.each(function() {
                _220(this, t);
            });
        },
        open: function(e, t) {
            return e.each(function() {
                _200(this, t);
            });
        },
        close: function(e, t) {
            return e.each(function() {
                _1f4(this, t);
            });
        },
        destroy: function(e, t) {
            return e.each(function() {
                _209(this, t);
            });
        },
        refresh: function(e, t) {
            return e.each(function() {
                var e = $.data(this, "panel");
                e.isLoaded = false;
                if (t) {
                    if (typeof t == "string") {
                        e.options.href = t;
                    } else {
                        e.options.queryParams = t;
                    }
                }
                _1f5(this);
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                _1e3(this, t);
            });
        },
        move: function(e, t) {
            return e.each(function() {
                _1e9(this, t);
            });
        },
        maximize: function(e) {
            return e.each(function() {
                _204(this);
            });
        },
        minimize: function(e) {
            return e.each(function() {
                _216(this);
            });
        },
        restore: function(e) {
            return e.each(function() {
                _219(this);
            });
        },
        collapse: function(e, t) {
            return e.each(function() {
                _205(this, t);
            });
        },
        expand: function(e, t) {
            return e.each(function() {
                _210(this, t);
            });
        }
    };
    $.fn.panel.parseOptions = function(e) {
        var t = $(e);
        return $.extend({}, $.parser.parseOptions(e, [ "id", "width", "height", "left", "top", "title", "titleWidth", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", {
            cache: "boolean",
            fit: "boolean",
            border: "boolean",
            noheader: "boolean"
        }, {
            collapsible: "boolean",
            minimizable: "boolean",
            maximizable: "boolean"
        }, {
            closable: "boolean",
            collapsed: "boolean",
            minimized: "boolean",
            maximized: "boolean",
            closed: "boolean"
        } ]), {
            loadingMessage: t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined
        });
    };
    $.fn.panel.defaults = {
        isTopZindex: false,
        id: null,
        title: null,
        iconCls: null,
        width: "auto",
        height: "auto",
        left: null,
        top: null,
        cls: null,
        headerCls: null,
        bodyCls: null,
        style: {},
        href: null,
        cache: true,
        fit: false,
        border: true,
        doSize: true,
        noheader: false,
        content: null,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        minimized: false,
        maximized: false,
        closed: false,
        tools: null,
        queryParams: {},
        method: "get",
        href: null,
        loadingMessage: "Loading...",
        loader: function(e, t, i) {
            var a = $(this).panel("options");
            if (!a.href) {
                return false;
            }
            $.ajax({
                type: a.method,
                url: a.href,
                cache: false,
                data: e,
                dataType: "html",
                success: function(e) {
                    t(e);
                },
                error: function() {
                    i.apply(this, arguments);
                }
            });
        },
        extractor: function(e) {
            var t = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var i = t.exec(e);
            if (i) {
                return i[1];
            } else {
                return e;
            }
        },
        onBeforeLoad: function(e) {},
        onLoad: function() {},
        onLoadError: function() {},
        onBeforeOpen: function() {},
        onOpen: function() {},
        onBeforeClose: function() {},
        onClose: function() {},
        onBeforeDestroy: function() {},
        onDestroy: function() {},
        onResize: function(e, t) {},
        onMove: function(e, t) {},
        onMaximize: function() {},
        onRestore: function() {},
        onMinimize: function() {},
        onBeforeCollapse: function() {},
        onBeforeExpand: function() {},
        onCollapse: function() {},
        onExpand: function() {},
        notTrans: false
    };
})(jQuery);

(function(e) {
    function t(t, i) {
        var a = e.data(t, "window").options;
        if (i) {
            e.extend(a, i);
        }
        e(t).panel("resize", a);
    }
    function i(t, i) {
        var a = e.data(t, "window");
        if (i) {
            if (i.left != null) {
                a.options.left = i.left;
            }
            if (i.top != null) {
                a.options.top = i.top;
            }
        }
        e(t).panel("move", a.options);
        if (a.shadow) {
            a.shadow.css({
                left: a.options.left,
                top: a.options.top
            });
        }
    }
    function a(t, a) {
        var n = e.data(t, "window");
        var r = n.options;
        var o = r.width;
        if (isNaN(o)) {
            o = n.window._outerWidth();
        }
        if (r.inline) {
            var s = n.window.parent();
            r.left = (s.width() - o) / 2 + s.scrollLeft();
        } else {
            r.left = (e(window)._outerWidth() - o) / 2 + e(document).scrollLeft();
        }
        if (a) {
            i(t);
        }
    }
    function n(t, a) {
        var n = e.data(t, "window");
        var r = n.options;
        var o = r.height;
        if (isNaN(o)) {
            o = n.window._outerHeight();
        }
        if (r.inline) {
            var s = n.window.parent();
            r.top = (s.height() - o) / 2 + s.scrollTop();
        } else {
            r.top = (e(window)._outerHeight() - o) / 2 + e(document).scrollTop();
        }
        if (a) {
            i(t);
        }
    }
    function r(t) {
        var r = e.data(t, "window");
        var o = r.options.closed;
        var l = e(t).panel(e.extend({}, r.options, {
            border: false,
            doSize: true,
            closed: true,
            cls: "window",
            headerCls: "window-header",
            bodyCls: "window-body " + (r.options.noheader ? "window-body-noheader" : ""),
            onBeforeDestroy: function() {
                if (r.options.onBeforeDestroy.call(t) == false) {
                    return false;
                }
                if (r.shadow) {
                    r.shadow.remove();
                }
                if (r.mask) {
                    r.mask.remove();
                }
            },
            onClose: function() {
                if (r.shadow) {
                    r.shadow.hide();
                }
                if (r.mask) {
                    r.mask.hide();
                }
                r.options.onClose.call(t);
            },
            onOpen: function() {
                if (r.mask) {
                    r.mask.css({
                        display: "block",
                        zIndex: e.fn.window.defaults.zIndex++
                    });
                }
                if (r.shadow) {
                    r.shadow.css({
                        display: "block",
                        zIndex: e.fn.window.defaults.zIndex++,
                        left: r.options.left,
                        top: r.options.top,
                        width: r.window._outerWidth(),
                        height: r.window._outerHeight()
                    });
                }
                r.window.css("z-index", e.fn.window.defaults.zIndex++);
                r.options.onOpen.call(t);
            },
            onResize: function(i, a) {
                var n = e(this).panel("options");
                e.extend(r.options, {
                    width: n.width,
                    height: n.height,
                    left: n.left,
                    top: n.top
                });
                if (r.shadow) {
                    r.shadow.css({
                        left: r.options.left,
                        top: r.options.top,
                        width: r.window._outerWidth(),
                        height: r.window._outerHeight()
                    });
                }
                r.options.onResize.call(t, i, a);
            },
            onMinimize: function() {
                if (r.shadow) {
                    r.shadow.hide();
                }
                if (r.mask) {
                    r.mask.hide();
                }
                r.options.onMinimize.call(t);
            },
            onBeforeCollapse: function() {
                if (r.options.onBeforeCollapse.call(t) == false) {
                    return false;
                }
                if (r.shadow) {
                    r.shadow.hide();
                }
            },
            onExpand: function() {
                if (r.shadow) {
                    r.shadow.show();
                }
                r.options.onExpand.call(t);
            }
        }));
        r.window = l.panel("panel");
        if (r.mask) {
            r.mask.remove();
        }
        if (r.options.modal == true) {
            var d = "";
            if (r.options.isTopZindex) {
                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    d = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
                }
            }
            r.mask = e('<div class="window-mask">' + d + "</div>").insertAfter(r.window);
            r.mask.css({
                width: r.options.inline ? r.mask.parent().width() : s().width,
                height: r.options.inline ? r.mask.parent().height() : s().height,
                display: "none"
            });
        }
        if (r.shadow) {
            r.shadow.remove();
        }
        if (r.options.shadow == true) {
            r.shadow = e('<div class="window-shadow"></div>').insertAfter(r.window);
            r.shadow.css({
                display: "none"
            });
        }
        if (r.options.left == null) {
            a(t);
        }
        if (r.options.top == null) {
            n(t);
        }
        i(t);
        if (!o) {
            l.window("open");
        }
    }
    function o(i) {
        var a = e.data(i, "window");
        a.window.draggable({
            handle: ">div.panel-header>div.panel-title",
            disabled: a.options.draggable == false,
            onStartDrag: function(t) {
                if (a.mask) {
                    a.mask.css("z-index", e.fn.window.defaults.zIndex++);
                }
                if (a.shadow) {
                    a.shadow.css("z-index", e.fn.window.defaults.zIndex++);
                }
                a.window.css("z-index", e.fn.window.defaults.zIndex++);
                if (!a.proxy) {
                    a.proxy = e('<div class="window-proxy"></div>').insertAfter(a.window);
                }
                a.proxy.css({
                    display: "none",
                    zIndex: e.fn.window.defaults.zIndex++,
                    left: t.data.left,
                    top: t.data.top
                });
                a.proxy._outerWidth(a.window._outerWidth());
                a.proxy._outerHeight(a.window._outerHeight());
                setTimeout(function() {
                    if (a.proxy) {
                        a.proxy.show();
                    }
                }, 500);
            },
            onDrag: function(e) {
                a.proxy.css({
                    display: "block",
                    left: e.data.left,
                    top: e.data.top
                });
                return false;
            },
            onStopDrag: function(t) {
                a.options.left = t.data.left;
                a.options.top = t.data.top;
                e(i).window("move");
                a.proxy.remove();
                a.proxy = null;
            }
        });
        a.window.resizable({
            disabled: a.options.resizable == false,
            onStartResize: function(t) {
                a.pmask = e('<div class="window-proxy-mask"></div>').insertAfter(a.window);
                a.pmask.css({
                    zIndex: e.fn.window.defaults.zIndex++,
                    left: t.data.left,
                    top: t.data.top,
                    width: a.window._outerWidth(),
                    height: a.window._outerHeight()
                });
                if (!a.proxy) {
                    a.proxy = e('<div class="window-proxy"></div>').insertAfter(a.window);
                }
                a.proxy.css({
                    zIndex: e.fn.window.defaults.zIndex++,
                    left: t.data.left,
                    top: t.data.top
                });
                a.proxy._outerWidth(t.data.width);
                a.proxy._outerHeight(t.data.height);
            },
            onResize: function(e) {
                a.proxy.css({
                    left: e.data.left,
                    top: e.data.top
                });
                a.proxy._outerWidth(e.data.width);
                a.proxy._outerHeight(e.data.height);
                return false;
            },
            onStopResize: function(n) {
                e.extend(a.options, {
                    left: n.data.left,
                    top: n.data.top,
                    width: n.data.width,
                    height: n.data.height
                });
                t(i);
                a.pmask.remove();
                a.pmask = null;
                a.proxy.remove();
                a.proxy = null;
            }
        });
    }
    function s() {
        if (document.compatMode == "BackCompat") {
            return {
                width: Math.max(document.body.scrollWidth, document.body.clientWidth),
                height: Math.max(document.body.scrollHeight, document.body.clientHeight)
            };
        } else {
            return {
                width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
            };
        }
    }
    e(window).resize(function() {
        e("body>div.window-mask").css({
            width: e(window)._outerWidth(),
            height: e(window)._outerHeight()
        });
        setTimeout(function() {
            e("body>div.window-mask").css({
                width: s().width,
                height: s().height
            });
        }, 50);
    });
    e.fn.window = function(t, i) {
        if (typeof t == "string") {
            var a = e.fn.window.methods[t];
            if (a) {
                return a(this, i);
            } else {
                return this.panel(t, i);
            }
        }
        t = t || {};
        return this.each(function() {
            var i = e.data(this, "window");
            if (i) {
                e.extend(i.options, t);
            } else {
                i = e.data(this, "window", {
                    options: e.extend({}, e.fn.window.defaults, e.fn.window.parseOptions(this), t)
                });
                if (!i.options.inline) {
                    document.body.appendChild(this);
                }
            }
            r(this);
            o(this);
        });
    };
    e.fn.window.methods = {
        options: function(t) {
            var i = t.panel("options");
            var a = e.data(t[0], "window").options;
            return e.extend(a, {
                closed: i.closed,
                collapsed: i.collapsed,
                minimized: i.minimized,
                maximized: i.maximized
            });
        },
        window: function(t) {
            return e.data(t[0], "window").window;
        },
        resize: function(e, i) {
            return e.each(function() {
                t(this, i);
            });
        },
        move: function(e, t) {
            return e.each(function() {
                i(this, t);
            });
        },
        hcenter: function(e) {
            return e.each(function() {
                a(this, true);
            });
        },
        vcenter: function(e) {
            return e.each(function() {
                n(this, true);
            });
        },
        center: function(e) {
            return e.each(function() {
                a(this);
                n(this);
                i(this);
            });
        }
    };
    e.fn.window.parseOptions = function(t) {
        return e.extend({}, e.fn.panel.parseOptions(t), e.parser.parseOptions(t, [ {
            draggable: "boolean",
            resizable: "boolean",
            shadow: "boolean",
            modal: "boolean",
            inline: "boolean"
        } ]));
    };
    e.fn.window.defaults = e.extend({}, e.fn.panel.defaults, {
        zIndex: 9e3,
        draggable: true,
        resizable: true,
        shadow: true,
        modal: false,
        inline: false,
        title: "New Window",
        collapsible: true,
        minimizable: true,
        maximizable: true,
        closable: true,
        closed: false
    });
})(jQuery);

(function($) {
    function _260(e) {
        var t = document.createElement("div");
        while (e.firstChild) {
            t.appendChild(e.firstChild);
        }
        e.appendChild(t);
        var i = $(t);
        i.attr("style", $(e).attr("style"));
        $(e).removeAttr("style").css("overflow", "hidden");
        i.panel({
            border: false,
            doSize: false,
            bodyCls: "dialog-content"
        });
        return i;
    }
    function _263(_264) {
        var opts = $.data(_264, "dialog").options;
        var _265 = $.data(_264, "dialog").contentPanel;
        if (opts.toolbar) {
            if ($.isArray(opts.toolbar)) {
                $(_264).find("div.dialog-toolbar").remove();
                var _266 = $('<div class="dialog-toolbar"><table cellspacing="0" cellpadding="0"><tr></tr></table></div>').prependTo(_264);
                var tr = _266.find("tr");
                for (var i = 0; i < opts.toolbar.length; i++) {
                    var btn = opts.toolbar[i];
                    if (btn == "-") {
                        $('<td><div class="dialog-tool-separator"></div></td>').appendTo(tr);
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $('<a href="javascript:void(0)"></a>').appendTo(td);
                        tool[0].onclick = eval(btn.handler || function() {});
                        tool.linkbutton($.extend({}, btn, {
                            plain: true
                        }));
                    }
                }
            } else {
                $(opts.toolbar).addClass("dialog-toolbar").prependTo(_264);
                $(opts.toolbar).show();
            }
        } else {
            $(_264).find("div.dialog-toolbar").remove();
        }
        if (opts.buttons) {
            if ($.isArray(opts.buttons)) {
                $(_264).find("div.dialog-button").remove();
                var _267 = $('<div class="dialog-button"></div>').appendTo(_264);
                for (var i = 0; i < opts.buttons.length; i++) {
                    var p = opts.buttons[i];
                    var _268 = $('<a href="javascript:void(0)"></a>').appendTo(_267);
                    if (p.handler) {
                        _268[0].onclick = p.handler;
                    }
                    _268.linkbutton(p);
                }
            } else {
                $(opts.buttons).addClass("dialog-button").appendTo(_264);
                $(opts.buttons).show();
            }
        } else {
            $(_264).find("div.dialog-button").remove();
        }
        var _269 = opts.href;
        var _26a = opts.content;
        opts.href = null;
        opts.content = null;
        _265.panel({
            closed: opts.closed,
            cache: opts.cache,
            href: _269,
            content: _26a,
            onLoad: function() {
                if (opts.height == "auto") {
                    $(_264).window("resize");
                }
                opts.onLoad.apply(_264, arguments);
            }
        });
        $(_264).window($.extend({}, opts, {
            onOpen: function() {
                if (_265.panel("options").closed) {
                    _265.panel("open");
                }
                if ("number" == typeof opts.closeKeyCode) {
                    $(_264).dialog("panel").attr("tabindex", "-1").focus();
                    $(_264).dialog("panel").unbind("keyup.dialog").bind("keyup.dialog", function(e) {
                        if (opts.closeKeyCode == e.keyCode) {
                            $(_264).window("close");
                        }
                    });
                }
                if (opts.onOpen) {
                    opts.onOpen.call(_264);
                }
            },
            onResize: function(e, t) {
                var i = $(_264);
                _265.panel("panel").show();
                _265.panel("resize", {
                    width: i.width(),
                    height: t == "auto" ? "auto" : i.height() - i.children("div.dialog-toolbar")._outerHeight() - i.children("div.dialog-button")._outerHeight()
                });
                if (opts.onResize) {
                    opts.onResize.call(_264, e, t);
                }
            }
        }));
        opts.href = _269;
        opts.content = _26a;
    }
    function _26e(e, t) {
        var i = $.data(e, "dialog").contentPanel;
        i.panel("refresh", t);
    }
    $.fn.dialog = function(e, t) {
        if (typeof e == "string") {
            var i = $.fn.dialog.methods[e];
            if (i) {
                return i(this, t);
            } else {
                return this.window(e, t);
            }
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "dialog");
            if (t) {
                $.extend(t.options, e);
            } else {
                $.data(this, "dialog", {
                    options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), e),
                    contentPanel: _260(this)
                });
            }
            _263(this);
        });
    };
    $.fn.dialog.methods = {
        options: function(e) {
            var t = $.data(e[0], "dialog").options;
            var i = e.panel("options");
            $.extend(t, {
                closed: i.closed,
                collapsed: i.collapsed,
                minimized: i.minimized,
                maximized: i.maximized
            });
            var a = $.data(e[0], "dialog").contentPanel;
            return t;
        },
        dialog: function(e) {
            return e.window("window");
        },
        refresh: function(e, t) {
            return e.each(function() {
                _26e(this, t);
            });
        }
    };
    $.fn.dialog.parseOptions = function(e) {
        return $.extend({}, $.fn.window.parseOptions(e), $.parser.parseOptions(e, [ "toolbar", "buttons" ]));
    };
    $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
        title: "New Dialog",
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        toolbar: null,
        buttons: null
    });
})(jQuery);

(function($) {
    function show(e, t, i, a) {
        var n = $(e).window("window");
        if (!n) {
            return;
        }
        switch (t) {
          case null:
            n.show();
            break;

          case "slide":
            n.slideDown(i);
            break;

          case "fade":
            n.fadeIn(i);
            break;

          case "show":
            n.show(i);
            break;
        }
        var r = null;
        if (a > 0) {
            r = setTimeout(function() {
                hide(e, t, i);
            }, a);
        }
        n.hover(function() {
            if (r) {
                clearTimeout(r);
            }
        }, function() {
            if (a > 0) {
                r = setTimeout(function() {
                    hide(e, t, i);
                }, a);
            }
        });
    }
    function hide(e, t, i) {
        if (e.locked == true) {
            return;
        }
        e.locked = true;
        var a = $(e).window("window");
        if (!a) {
            return;
        }
        switch (t) {
          case null:
            a.hide();
            break;

          case "slide":
            a.slideUp(i);
            break;

          case "fade":
            a.fadeOut(i);
            break;

          case "show":
            a.hide(i);
            break;
        }
        setTimeout(function() {
            $(e).window("destroy");
        }, i);
    }
    function _27d(e) {
        var t = $.extend({}, $.fn.window.defaults, {
            collapsible: false,
            minimizable: false,
            maximizable: false,
            shadow: false,
            draggable: false,
            resizable: false,
            closed: true,
            style: {
                left: "",
                top: "",
                right: 0,
                zIndex: $.fn.window.defaults.zIndex++,
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            },
            onBeforeOpen: function() {
                show(this, t.showType, t.showSpeed, t.timeout);
                return false;
            },
            onBeforeClose: function() {
                hide(this, t.showType, t.showSpeed);
                return false;
            }
        }, {
            title: "",
            width: 250,
            height: 100,
            showType: "slide",
            showSpeed: 600,
            msg: "",
            timeout: 4e3
        }, e);
        t.style.zIndex = $.fn.window.defaults.zIndex++;
        var i = $('<div class="messager-body"></div>').html($.hisui.getTrans(t.msg)).appendTo("body");
        i.window(t);
        i.window("window").css(t.style);
        i.window("open");
        return i;
    }
    function showWinByOptions(options) {
        var win = $('<div class="messager-body"></div>').appendTo("body");
        win.append(options.content);
        var bbuttons = options.bbuttons;
        if (bbuttons) {
            var tb = $('<div class="messager-button"></div>').appendTo(win);
            var mybuttonIndex = 0;
            for (var _283 in bbuttons) {
                $("<a></a>").attr("href", "javascript:void(0)").text($.messager.defaults[_283]).css("margin-left", mybuttonIndex == 0 ? 0 : 10).bind("click", eval(bbuttons[_283])).appendTo(tb).linkbutton();
                mybuttonIndex++;
            }
            win.on("keydown", function(e) {
                if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
                    return;
                }
                if (tb.children().length > 1) {
                    var t = tb.children(".l-btn-focus");
                    if (t.length > 0) {
                        if (e.which == 37) {
                            e.stopPropagation();
                            if (t.prev().length > 0) {
                                t.trigger("blur");
                                t.prev().trigger("focus");
                            }
                        }
                        if (e.which == 39) {
                            e.stopPropagation();
                            if (t.next().length > 0) {
                                t.trigger("blur");
                                t.next().trigger("focus");
                            }
                        }
                    }
                }
                if (e.which == 32 || e.which == 13) {
                    e.stopPropagation();
                    if (tb.children(".l-btn-focus").length > 0) {
                        tb.children(".l-btn-focus").trigger("click");
                    } else {
                        bbuttons["ok"](e);
                    }
                    return false;
                }
                if (bbuttons["cancel"]) {
                    if (e.which == 27) {
                        e.stopPropagation();
                        bbuttons["cancel"](e);
                        return false;
                    }
                }
            });
        }
        win.window({
            isTopZindex: true,
            closable: false,
            title: options.title,
            noheader: options.title ? false : true,
            width: options.width || 300,
            height: "auto",
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            onClose: function() {
                setTimeout(function() {
                    win.window("destroy");
                }, 100);
            }
        });
        win.window("window").addClass("messager-window");
        win.children("div.messager-button").children("a:first").focus();
        return win;
    }
    function _27f(_280, _281, bbuttons) {
        var win = $('<div class="messager-body"></div>').appendTo("body");
        win.append(_281);
        if (bbuttons) {
            var tb = $('<div class="messager-button"></div>').appendTo(win);
            var mybuttonIndex = 0;
            for (var _283 in bbuttons) {
                $("<a></a>").attr("href", "javascript:void(0)").text($.messager.defaults[_283]).css("margin-left", mybuttonIndex == 0 ? 0 : 10).bind("click", eval(bbuttons[_283])).appendTo(tb).linkbutton();
                mybuttonIndex++;
            }
            win.on("keydown", function(e) {
                if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
                    return;
                }
                if (tb.children().length > 1) {
                    var t = tb.children(".l-btn-focus");
                    if (t.length > 0) {
                        if (e.which == 37) {
                            e.stopPropagation();
                            if (t.prev().length > 0) {
                                t.trigger("blur");
                                t.prev().trigger("focus");
                            }
                        }
                        if (e.which == 39) {
                            e.stopPropagation();
                            if (t.next().length > 0) {
                                t.trigger("blur");
                                t.next().trigger("focus");
                            }
                        }
                    }
                }
                if (e.which == 32 || e.which == 13) {
                    e.stopPropagation();
                    if (tb.children(".l-btn-focus").length > 0) {
                        tb.children(".l-btn-focus").trigger("click");
                    } else {
                        bbuttons["ok"](e);
                    }
                    return false;
                }
                if (bbuttons["cancel"]) {
                    if (e.which == 27) {
                        e.stopPropagation();
                        bbuttons["cancel"](e);
                        return false;
                    }
                }
            });
        }
        win.window({
            isTopZindex: true,
            closable: false,
            title: _280,
            noheader: _280 ? false : true,
            width: 300,
            height: "auto",
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            onClose: function() {
                setTimeout(function() {
                    win.window("destroy");
                }, 100);
            }
        });
        win.window("window").addClass("messager-window");
        win.children("div.messager-button").children("a:first").focus();
        return win;
    }
    $.messager = {
        show: function(e) {
            return _27d(e);
        },
        alertSrcMsg: function(e, t, i, a) {
            var n = typeof e == "object" ? e : {
                title: e,
                msg: t,
                icon: i,
                fn: a
            };
            var r = n.icon ? "messager-icon messager-" + n.icon : "";
            n = $.extend({}, $.messager.defaults, {
                content: '<div class="' + r + '"></div>' + '<div style="margin-left:42px;">' + n.msg + "</div>" + '<div style="clear:both;"/>',
                bbuttons: {
                    ok: function(e) {
                        if (e && ("undefined" != typeof e.clientY && e.clientY < 0)) return false;
                        if (e && ("undefined" != typeof e.clientX && e.clientX < 0)) return false;
                        o.window("close");
                        if (n.fn) {
                            n.fn();
                            return false;
                        }
                    }
                }
            }, n);
            var o = showWinByOptions(n);
            return o;
        },
        alert: function(e, t, i, a) {
            var n = typeof e == "object" ? e : {
                title: e,
                msg: t,
                icon: i,
                fn: a
            };
            n.msg = $.hisui.getTrans(n.msg);
            return $.messager.alertSrcMsg(n);
        },
        confirmSrcMsg: function(e, t, i) {
            var a = '<div class="messager-icon messager-question"></div>' + '<div style="margin-left:42px;">' + t + "</div>" + '<div style="clear:both;"/>';
            var n = {};
            n["ok"] = function(e) {
                if (e && ("undefined" != typeof e.clientY && e.clientY < 0)) return false;
                if (e && ("undefined" != typeof e.clientX && e.clientX < 0)) return false;
                r.window("close");
                if (i) {
                    i(true);
                    return false;
                }
            };
            n["cancel"] = function() {
                r.window("close");
                if (i) {
                    i(false);
                    return false;
                }
            };
            var r = _27f(e, a, n);
            return r;
        },
        confirm: function(e, t, i) {
            return $.messager.confirmSrcMsg(e, $.hisui.getTrans(t), i);
        },
        confirm3SrcMsg: function(e, t, i) {
            var a = '<div class="messager-icon messager-question"></div>' + '<div style="margin-left:42px;">' + t + "</div>" + '<div style="clear:both;"/>';
            var n = {};
            n["ok"] = function(e) {
                if (e && ("undefined" != typeof e.clientY && e.clientY < 0)) return false;
                if (e && ("undefined" != typeof e.clientX && e.clientX < 0)) return false;
                r.window("close");
                if (i) {
                    i(true);
                    return false;
                }
            };
            n["no"] = function() {
                r.window("close");
                if (i) {
                    i(false);
                    return false;
                }
            };
            n["cancel"] = function() {
                r.window("close");
                if (i) {
                    i(undefined);
                    return false;
                }
            };
            var r = _27f(e, a, n);
            return r;
        },
        confirm3: function(e, t, i) {
            return $.messager.confirm3SrcMsg(e, $.hisui.getTrans(t), i);
        },
        promptSrcMsg: function(e, t, i) {
            var a = '<div class="messager-icon messager-question"></div>' + '<div style="margin-left:42px;">' + t + "</div>" + "<br/>" + '<div style="clear:both;"/>' + '<div><input class="messager-input" type="text"/></div>';
            var n = {};
            n["ok"] = function(e) {
                if (e && ("undefined" != typeof e.clientY && e.clientY < 0)) return false;
                if (e && ("undefined" != typeof e.clientX && e.clientX < 0)) return false;
                r.window("close");
                if (i) {
                    i($(".messager-input", r).val());
                    return false;
                }
            };
            n["cancel"] = function() {
                r.window("close");
                if (i) {
                    i();
                    return false;
                }
            };
            var r = _27f(e, a, n);
            r.find("input.messager-input").eq(0).focus();
            return r;
        },
        prompt: function(e, t, i) {
            return $.messager.promptSrcMsg(e, $.hisui.getTrans(t), i);
        },
        progress: function(e) {
            var t = {
                bar: function() {
                    return $("body>div.messager-window").find("div.messager-p-bar");
                },
                close: function() {
                    var e = $("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                    if (e.length) {
                        e.window("close");
                    }
                }
            };
            if (typeof e == "string") {
                var i = t[e];
                return i();
            }
            var a = $.extend({
                title: "",
                msg: "",
                text: undefined,
                interval: 300
            }, e || {});
            var n = '<div class="messager-progress"><div class="messager-p-msg"></div><div class="messager-p-bar"></div></div>';
            var r = _27f(a.title, n, null);
            r.find("div.messager-p-msg").html($.hisui.getTrans(a.msg));
            var o = r.find("div.messager-p-bar");
            o.progressbar({
                text: a.text
            });
            r.window("options").onClose = function() {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                $(this).window("destroy");
            };
            if (a.interval) {
                r[0].timer = setInterval(function() {
                    var e = o.progressbar("getValue");
                    e += 10;
                    if (e > 100) {
                        e = 0;
                    }
                    o.progressbar("setValue", e);
                }, a.interval);
            }
            return r;
        },
        popoverSrcMsg: function(e) {
            var t = {
                style: {
                    top: "",
                    left: ""
                },
                msg: "",
                type: "error",
                timeout: 3e3,
                showSpeed: "fast",
                showType: "slide"
            };
            var i = $.extend({}, t, e);
            var a = '<div class="messager-popover ' + i.type + '" style="display:none;">' + '<span class="messager-popover-icon ' + i.type + '"/><span class="content">' + i.msg + "</span>";
            if (i.timeout > 5e3) +'<span class="close"></span>' + "</div>";
            var n = $(a).appendTo("body");
            if (i.style.left == "") {
                i.style.left = document.body.clientWidth / 2 - n.width() / 2;
            }
            if (i.style.top == "") {
                i.style.top = document.body.clientHeight / 2 - n.height() / 2;
            }
            n.css(i.style);
            switch (i.showType) {
              case null:
                n.show();
                break;

              case "slide":
                n.slideDown(i.showSpeed);
                break;

              case "fade":
                n.fadeIn(i.showSpeed);
                break;

              case "show":
                n.show(i.showSpeed);
                break;
            }
            n.find(".close").click(function() {
                n.remove();
            });
            if (i.timeout > 0) {
                var r = setTimeout(function() {
                    switch (i.showType) {
                      case null:
                        n.hide();
                        break;

                      case "slide":
                        n.slideUp(i.showSpeed);
                        break;

                      case "fade":
                        n.fadeOut(i.showSpeed);
                        break;

                      case "show":
                        n.hide(i.showSpeed);
                        break;
                    }
                    setTimeout(function() {
                        n.remove();
                    }, i.timeout);
                }, i.timeout);
            }
        },
        popover: function(e) {
            e.msg = $.hisui.getTrans(e.msg);
            $.messager.popoverSrcMsg(e);
        }
    };
    $.messager.defaults = {
        ok: "Ok",
        cancel: "Cancel"
    };
})(jQuery);

(function(e) {
    function t(t) {
        var i = e.data(t, "accordion");
        var a = i.options;
        var n = i.panels;
        var r = e(t);
        a.fit ? e.extend(a, r._fit()) : r._fit(false);
        if (!isNaN(a.width)) {
            r._outerWidth(a.width);
        } else {
            r.css("width", "");
        }
        var o = 0;
        var s = "auto";
        var l = r.find(">div.panel>div.accordion-header");
        if (l.length) {
            o = e(l[0]).css("height", "")._outerHeight();
        }
        if (!isNaN(a.height)) {
            r._outerHeight(a.height);
            s = r.height() - o * l.length;
            var d = false;
            if ("undefined" != typeof HISUIStyleCode && HISUIStyleCode.toLocaleLowerCase() == "lite") d = true;
            if (d) {
                s -= 1;
            }
        } else {
            r.css("height", "");
        }
        if (r.hasClass("accordion-gray")) {
            s -= 4 * (l.length - 1) + 1;
        }
        c(true, s - c(false) + 1);
        function c(e, t) {
            var i = 0;
            for (var a = 0; a < n.length; a++) {
                var s = n[a];
                var l = s.panel("header")._outerHeight(o);
                if (s.panel("options").collapsible == e) {
                    var d = isNaN(t) ? undefined : t + o * l.length;
                    s.panel("resize", {
                        width: r.width(),
                        height: e ? d : undefined
                    });
                    i += s.panel("panel").outerHeight() - o;
                }
            }
            return i;
        }
    }
    function i(t, i, a, n) {
        var r = e.data(t, "accordion").panels;
        var o = [];
        for (var s = 0; s < r.length; s++) {
            var l = r[s];
            if (i) {
                if (l.panel("options")[i] == a) {
                    o.push(l);
                }
            } else {
                if (l[0] == e(a)[0]) {
                    return s;
                }
            }
        }
        if (i) {
            return n ? o : o.length ? o[0] : null;
        } else {
            return -1;
        }
    }
    function a(e) {
        return i(e, "collapsed", false, true);
    }
    function n(e) {
        var t = a(e);
        return t.length ? t[0] : null;
    }
    function r(e, t) {
        return i(e, null, t);
    }
    function o(t, a) {
        var n = e.data(t, "accordion").panels;
        if (typeof a == "number") {
            if (a < 0 || a >= n.length) {
                return null;
            } else {
                return n[a];
            }
        }
        return i(t, "title", a);
    }
    function s(t) {
        var i = e.data(t, "accordion").options;
        var a = e(t);
        if (i.border) {
            a.removeClass("accordion-noborder");
        } else {
            a.addClass("accordion-noborder");
        }
    }
    function l(i) {
        var a = e.data(i, "accordion");
        var n = e(i);
        n.addClass("accordion");
        a.panels = [];
        n.children("div").each(function() {
            var t = e.extend({}, e.parser.parseOptions(this), {
                selected: e(this).attr("selected") ? true : undefined
            });
            var n = e(this);
            a.panels.push(n);
            d(i, n, t);
        });
        n.bind("_resize", function(a, n) {
            var r = e.data(i, "accordion").options;
            if (r.fit == true || n) {
                t(i);
            }
            return false;
        });
    }
    function d(t, i, n) {
        var o = e.data(t, "accordion").options;
        i.panel(e.extend({}, {
            collapsible: true,
            minimizable: false,
            maximizable: false,
            closable: false,
            doSize: false,
            collapsed: true,
            headerCls: "accordion-header",
            bodyCls: "accordion-body"
        }, n, {
            onBeforeExpand: function() {
                if (n.onBeforeExpand) {
                    if (n.onBeforeExpand.call(this) == false) {
                        return false;
                    }
                }
                if (!o.multiple) {
                    var i = e.grep(a(t), function(e) {
                        return e.panel("options").collapsible;
                    });
                    for (var s = 0; s < i.length; s++) {
                        f(t, r(t, i[s]));
                    }
                }
                var l = e(this).panel("header");
                l.addClass("accordion-header-selected");
                l.find(".accordion-collapse").removeClass("accordion-expand");
            },
            onExpand: function() {
                if (n.onExpand) {
                    n.onExpand.call(this);
                }
                o.onSelect.call(t, e(this).panel("options").title, r(t, this));
            },
            onBeforeCollapse: function() {
                if (n.onBeforeCollapse) {
                    if (n.onBeforeCollapse.call(this) == false) {
                        return false;
                    }
                }
                var t = e(this).panel("header");
                t.removeClass("accordion-header-selected");
                t.find(".accordion-collapse").addClass("accordion-expand");
            },
            onCollapse: function() {
                if (n.onCollapse) {
                    n.onCollapse.call(this);
                }
                o.onUnselect.call(t, e(this).panel("options").title, r(t, this));
            }
        }));
        var s = i.panel("header");
        var l = s.children("div.panel-tool");
        l.children("a.panel-tool-collapse").hide();
        var d = e('<a href="javascript:void(0)"></a>').addClass("accordion-collapse accordion-expand").appendTo(l);
        d.bind("click", function() {
            var e = r(t, i);
            if (i.panel("options").collapsed) {
                c(t, e);
            } else {
                f(t, e);
            }
            return false;
        });
        i.panel("options").collapsible ? d.show() : d.hide();
        s.click(function() {
            e(this).find("a.accordion-collapse:visible").triggerHandler("click");
            return false;
        });
    }
    function c(t, i) {
        var a = o(t, i);
        if (!a) {
            return;
        }
        h(t);
        var n = e.data(t, "accordion").options;
        a.panel("expand", n.animate);
    }
    function f(t, i) {
        var a = o(t, i);
        if (!a) {
            return;
        }
        h(t);
        var n = e.data(t, "accordion").options;
        a.panel("collapse", n.animate);
    }
    function u(t) {
        var a = e.data(t, "accordion").options;
        var n = i(t, "selected", true);
        if (n) {
            o(r(t, n));
        } else {
            o(a.selected);
        }
        function o(e) {
            var i = a.animate;
            a.animate = false;
            c(t, e);
            a.animate = i;
        }
    }
    function h(t) {
        var i = e.data(t, "accordion").panels;
        for (var a = 0; a < i.length; a++) {
            i[a].stop(true, true);
        }
    }
    function p(i, a) {
        var n = e.data(i, "accordion");
        var r = n.options;
        var o = n.panels;
        if (a.selected == undefined) {
            a.selected = true;
        }
        h(i);
        var s = e("<div></div>").appendTo(i);
        o.push(s);
        d(i, s, a);
        t(i);
        r.onAdd.call(i, a.title, o.length - 1);
        if (a.selected) {
            c(i, o.length - 1);
        }
    }
    function v(i, a) {
        var s = e.data(i, "accordion");
        var l = s.options;
        var d = s.panels;
        h(i);
        var f = o(i, a);
        var u = f.panel("options").title;
        var p = r(i, f);
        if (!f) {
            return;
        }
        if (l.onBeforeRemove.call(i, u, p) == false) {
            return;
        }
        d.splice(p, 1);
        f.panel("destroy");
        if (d.length) {
            t(i);
            var v = n(i);
            if (!v) {
                c(i, 0);
            }
        }
        l.onRemove.call(i, u, p);
    }
    e.fn.accordion = function(i, a) {
        if (typeof i == "string") {
            return e.fn.accordion.methods[i](this, a);
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "accordion");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "accordion", {
                    options: e.extend({}, e.fn.accordion.defaults, e.fn.accordion.parseOptions(this), i),
                    accordion: e(this).addClass("accordion"),
                    panels: []
                });
                l(this);
            }
            s(this);
            t(this);
            u(this);
        });
    };
    e.fn.accordion.methods = {
        options: function(t) {
            return e.data(t[0], "accordion").options;
        },
        panels: function(t) {
            return e.data(t[0], "accordion").panels;
        },
        resize: function(e) {
            return e.each(function() {
                t(this);
            });
        },
        getSelections: function(e) {
            return a(e[0]);
        },
        getSelected: function(e) {
            return n(e[0]);
        },
        getPanel: function(e, t) {
            return o(e[0], t);
        },
        getPanelIndex: function(e, t) {
            return r(e[0], t);
        },
        select: function(e, t) {
            return e.each(function() {
                c(this, t);
            });
        },
        unselect: function(e, t) {
            return e.each(function() {
                f(this, t);
            });
        },
        add: function(e, t) {
            return e.each(function() {
                p(this, t);
            });
        },
        remove: function(e, t) {
            return e.each(function() {
                v(this, t);
            });
        }
    };
    e.fn.accordion.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "width", "height", {
            fit: "boolean",
            border: "boolean",
            animate: "boolean",
            multiple: "boolean",
            selected: "number"
        } ]));
    };
    e.fn.accordion.defaults = {
        width: "auto",
        height: "auto",
        fit: false,
        border: true,
        animate: true,
        multiple: false,
        selected: 0,
        onSelect: function(e, t) {},
        onUnselect: function(e, t) {},
        onAdd: function(e, t) {},
        onBeforeRemove: function(e, t) {},
        onRemove: function(e, t) {}
    };
})(jQuery);

(function($) {
    function setScrollers(e) {
        var t = $.data(e, "tabs").options;
        if (t.tabPosition == "left" || t.tabPosition == "right" || !t.showHeader) {
            return;
        }
        var i = $(e).children("div.tabs-header");
        var a = i.children("div.tabs-tool");
        var n = i.children("div.tabs-scroller-left");
        var r = i.children("div.tabs-scroller-right");
        var o = i.children("div.tabs-wrap");
        var s = i.outerHeight();
        if (t.plain) {
            s -= s - i.height();
        }
        a._outerHeight(s);
        var l = 0;
        $("ul.tabs li", i).each(function() {
            l += $(this).outerWidth(true);
        });
        var d = i.width() - a._outerWidth();
        if (l > d) {
            n.add(r).show()._outerHeight(s);
            if (t.toolPosition == "left") {
                a.css({
                    left: n.outerWidth(),
                    right: ""
                });
                o.css({
                    marginLeft: n.outerWidth() + a._outerWidth(),
                    marginRight: r._outerWidth(),
                    width: d - n.outerWidth() - r.outerWidth()
                });
            } else {
                a.css({
                    left: "",
                    right: r.outerWidth()
                });
                o.css({
                    marginLeft: n.outerWidth(),
                    marginRight: r.outerWidth() + a._outerWidth(),
                    width: d - n.outerWidth() - r.outerWidth()
                });
            }
        } else {
            n.add(r).hide();
            if (t.toolPosition == "left") {
                a.css({
                    left: 0,
                    right: ""
                });
                o.css({
                    marginLeft: a._outerWidth(),
                    marginRight: 0,
                    width: d
                });
            } else {
                a.css({
                    left: "",
                    right: 0
                });
                o.css({
                    marginLeft: 0,
                    marginRight: a._outerWidth(),
                    width: d
                });
            }
        }
    }
    function addTools(container) {
        var opts = $.data(container, "tabs").options;
        var header = $(container).children("div.tabs-header");
        if (opts.tools) {
            if (typeof opts.tools == "string") {
                $(opts.tools).addClass("tabs-tool").appendTo(header);
                $(opts.tools).show();
            } else {
                header.children("div.tabs-tool").remove();
                var tools = $('<div class="tabs-tool"><table cellspacing="0" cellpadding="0" style="height:100%"><tr></tr></table></div>').appendTo(header);
                var tr = tools.find("tr");
                for (var i = 0; i < opts.tools.length; i++) {
                    var td = $("<td></td>").appendTo(tr);
                    var tool = $('<a href="javascript:void(0);"></a>').appendTo(td);
                    tool[0].onclick = eval(opts.tools[i].handler || function() {});
                    tool.linkbutton($.extend({}, opts.tools[i], {
                        plain: true
                    }));
                }
            }
        } else {
            header.children("div.tabs-tool").remove();
        }
    }
    function setSize(e) {
        var t = $.data(e, "tabs");
        var i = t.options;
        var a = $(e);
        i.fit ? $.extend(i, a._fit()) : a._fit(false);
        a.width(i.width).height(i.height);
        var n = $(e).children("div.tabs-header");
        var r = $(e).children("div.tabs-panels");
        var o = n.find("div.tabs-wrap");
        var s = o.find(".tabs");
        for (var l = 0; l < t.tabs.length; l++) {
            var d = t.tabs[l].panel("options");
            var c = d.tab.find("a.tabs-inner");
            var f = parseInt(d.tabWidth || i.tabWidth) || undefined;
            if (f) {
                c._outerWidth(f);
            } else {
                c.css("width", "");
            }
            c._outerHeight(i.tabHeight);
            c.css("lineHeight", c.height() + "px");
        }
        if (i.tabPosition == "left" || i.tabPosition == "right") {
            n._outerWidth(i.showHeader ? i.headerWidth : 0);
            var u = a.width();
            if (u > i.width) u = i.width;
            r._outerWidth(u - n.outerWidth());
            n.add(r)._outerHeight(i.height);
            o._outerWidth(n.width());
            s._outerWidth(o.width()).css("height", "");
        } else {
            var h = n.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool");
            n._outerWidth(i.width).css("height", "");
            if (i.showHeader) {
                n.css("background-color", "");
                o.css("height", "");
                h.show();
            } else {
                n.css("background-color", "transparent");
                n._outerHeight(0);
                o._outerHeight(0);
                h.hide();
            }
            s._outerHeight(i.tabHeight).css("width", "");
            setScrollers(e);
            var p = i.height;
            if (!isNaN(p)) {
                r._outerHeight(p - n.outerHeight());
            } else {
                r.height("auto");
            }
            var f = i.width;
            if (!isNaN(f)) {
                r._outerWidth(f);
            } else {
                r.width("auto");
            }
        }
    }
    function setSelectedSize(e) {
        var t = $.data(e, "tabs").options;
        var i = getSelectedTab(e);
        if (i) {
            var a = $(e).children("div.tabs-panels");
            var n = t.width == "auto" ? "auto" : a.width();
            var r = t.height == "auto" ? "auto" : a.height();
            i.panel("resize", {
                width: n,
                height: r
            });
        }
    }
    function wrapTabs(e) {
        var t = $.data(e, "tabs").tabs;
        var i = $(e);
        i.addClass("tabs-container");
        var a = $('<div class="tabs-panels"></div>').insertBefore(i);
        i.children("div").each(function() {
            a[0].appendChild(this);
        });
        i[0].appendChild(a[0]);
        $('<div class="tabs-header">' + '<div class="tabs-scroller-left"></div>' + '<div class="tabs-scroller-right"></div>' + '<div class="tabs-wrap">' + '<ul class="tabs"></ul>' + "</div>" + "</div>").prependTo(e);
        i.children("div.tabs-panels").children("div").each(function(i) {
            var a = $.extend({}, $.parser.parseOptions(this), {
                selected: $(this).attr("selected") ? true : undefined
            });
            var n = $(this);
            t.push(n);
            createTab(e, n, a);
        });
        i.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function() {
            $(this).addClass("tabs-scroller-over");
        }, function() {
            $(this).removeClass("tabs-scroller-over");
        });
        i.bind("_resize", function(t, i) {
            var a = $.data(e, "tabs").options;
            if (a.fit == true || i) {
                setSize(e);
                setSelectedSize(e);
            }
            return false;
        });
    }
    function bindEvents(e) {
        var t = $.data(e, "tabs");
        var i = t.options;
        $(e).children("div.tabs-header").unbind().bind("click", function(n) {
            if ($(n.target).hasClass("tabs-scroller-left")) {
                $(e).tabs("scrollBy", -i.scrollIncrement);
            } else {
                if ($(n.target).hasClass("tabs-scroller-right")) {
                    $(e).tabs("scrollBy", i.scrollIncrement);
                } else {
                    var r = $(n.target).closest("li");
                    if (r.hasClass("tabs-disabled")) {
                        return;
                    }
                    var o = $(n.target).closest("a.tabs-close");
                    if (o.length) {
                        closeTab(e, a(r));
                    } else {
                        if (r.length) {
                            var s = a(r);
                            var l = t.tabs[s].panel("options");
                            if (l.collapsible) {
                                l.closed ? selectTab(e, s) : unselectTab(e, s);
                            } else {
                                selectTab(e, s);
                            }
                        }
                    }
                }
            }
        }).bind("contextmenu", function(t) {
            var n = $(t.target).closest("li");
            if (n.hasClass("tabs-disabled")) {
                return;
            }
            if (n.length) {
                var r = a(n);
                var o = getTab(e, r).panel("options").title;
                var r = a(n);
                var o = getTab(e, r).panel("options").title;
                i.onContextMenu.call(e, t, o, r);
            }
        });
        function a(e) {
            var t = 0;
            e.parent().children("li").each(function(i) {
                if (e[0] == this) {
                    t = i;
                    return false;
                }
            });
            return t;
        }
    }
    function setProperties(e) {
        var t = $.data(e, "tabs").options;
        var i = $(e).children("div.tabs-header");
        var a = $(e).children("div.tabs-panels");
        i.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
        a.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
        if (t.tabPosition == "top") {
            i.insertBefore(a);
        } else {
            if (t.tabPosition == "bottom") {
                i.insertAfter(a);
                i.addClass("tabs-header-bottom");
                a.addClass("tabs-panels-top");
            } else {
                if (t.tabPosition == "left") {
                    i.addClass("tabs-header-left");
                    a.addClass("tabs-panels-right");
                } else {
                    if (t.tabPosition == "right") {
                        i.addClass("tabs-header-right");
                        a.addClass("tabs-panels-left");
                    }
                }
            }
        }
        if (t.plain == true) {
            i.addClass("tabs-header-plain");
        } else {
            i.removeClass("tabs-header-plain");
        }
        if (t.border == true) {
            i.removeClass("tabs-header-noborder");
            a.removeClass("tabs-panels-noborder");
        } else {
            i.addClass("tabs-header-noborder");
            a.addClass("tabs-panels-noborder");
        }
    }
    function createTab(e, t, i) {
        var a = $.data(e, "tabs");
        i = i || {};
        t.panel($.extend({}, i, {
            border: false,
            noheader: true,
            closed: true,
            doSize: false,
            iconCls: i.icon ? i.icon : undefined,
            onLoad: function() {
                if (i.onLoad) {
                    i.onLoad.call(this, arguments);
                }
                a.options.onLoad.call(e, $(this));
            }
        }));
        var n = t.panel("options");
        var r = $(e).children("div.tabs-header").find("ul.tabs");
        if (!!a.options.isBrandTabs && r.children("li").length == 0) {
            n.tab = $("<li class='tabs-brand'></li>").appendTo(r);
        } else {
            n.tab = $("<li></li>").appendTo(r);
        }
        n.tab.append('<a href="javascript:void(0)" class="tabs-inner">' + '<span class="tabs-title"></span>' + '<span class="tabs-icon"></span>' + "</a>");
        $(e).tabs("update", {
            tab: t,
            options: n
        });
    }
    function addTab(e, t) {
        var i = $.data(e, "tabs").options;
        var a = $.data(e, "tabs").tabs;
        if (t.selected == undefined) {
            t.selected = true;
        }
        var n = $("<div></div>").appendTo($(e).children("div.tabs-panels"));
        a.push(n);
        createTab(e, n, t);
        i.onAdd.call(e, t.title, a.length - 1);
        setSize(e);
        if (t.selected) {
            selectTab(e, a.length - 1);
        }
    }
    function updateTabOpt(e, t) {
        var i = $.data(e, "tabs").selectHis;
        var a = t.tab;
        var n = t.options;
        var r = a.panel("options");
        var o = r.title;
        var s = r.tab;
        var l = s.find("span.tabs-title");
        var d = s.find("span.tabs-icon");
        if (n.title) {
            l.html(n.title);
            a.panel("options").title = n.title;
        }
        if (n.title) {
            l.html(n.title);
            if (o != r.title) {
                for (var c = 0; c < i.length; c++) {
                    if (i[c] == o) {
                        i[c] = r.title;
                    }
                }
            }
        }
    }
    function updateTab(e, t) {
        var i = $.data(e, "tabs").selectHis;
        var a = t.tab;
        var n = a.panel("options").title;
        a.panel($.extend({}, t.options, {
            iconCls: t.options.icon ? t.options.icon : undefined
        }));
        var r = a.panel("options");
        var o = r.tab;
        var s = o.find("span.tabs-title");
        var l = o.find("span.tabs-icon");
        s.html($.hisui.getTrans(r.title));
        l.attr("class", "tabs-icon");
        o.find("a.tabs-close").remove();
        if (r.closable) {
            s.addClass("tabs-closable");
            $('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(o);
        } else {
            s.removeClass("tabs-closable");
        }
        if (r.iconCls) {
            s.addClass("tabs-with-icon");
            l.addClass(r.iconCls);
        } else {
            s.removeClass("tabs-with-icon");
        }
        if (n != r.title) {
            for (var d = 0; d < i.length; d++) {
                if (i[d] == n) {
                    i[d] = r.title;
                }
            }
        }
        o.find("span.tabs-p-tool").remove();
        if (r.tools) {
            var c = $('<span class="tabs-p-tool"></span>').insertAfter(o.find("a.tabs-inner"));
            if ($.isArray(r.tools)) {
                for (var d = 0; d < r.tools.length; d++) {
                    var f = $('<a href="javascript:void(0)"></a>').appendTo(c);
                    f.addClass(r.tools[d].iconCls);
                    if (r.tools[d].handler) {
                        f.bind("click", {
                            handler: r.tools[d].handler
                        }, function(e) {
                            if ($(this).parents("li").hasClass("tabs-disabled")) {
                                return;
                            }
                            e.data.handler.call(this);
                        });
                    }
                }
            } else {
                $(r.tools).children().appendTo(c);
            }
            var u = c.children().length * 12;
            if (r.closable) {
                u += 8;
            } else {
                u -= 3;
                c.css("right", "5px");
            }
            s.css("padding-right", u + "px");
        }
        setSize(e);
        $.data(e, "tabs").options.onUpdate.call(e, r.title, getTabIndex(e, a));
    }
    function closeTab(e, t) {
        var i = $.data(e, "tabs").options;
        var a = $.data(e, "tabs").tabs;
        var n = $.data(e, "tabs").selectHis;
        if (!exists(e, t)) {
            return;
        }
        var r = getTab(e, t);
        var o = r.panel("options").title;
        var s = getTabIndex(e, r);
        if (i.onBeforeClose.call(e, o, s) == false) {
            return;
        }
        var r = getTab(e, t, true);
        r.panel("options").tab.remove();
        r.panel("destroy");
        i.onClose.call(e, o, s);
        setSize(e);
        for (var l = 0; l < n.length; l++) {
            if (n[l] == o) {
                n.splice(l, 1);
                l--;
            }
        }
        var d = n.pop();
        if (d) {
            selectTab(e, d);
        } else {
            if (a.length) {
                selectTab(e, 0);
            }
        }
    }
    function getTabByOpt(e, t) {
        var i = $.data(e, "tabs").tabs;
        for (var a = 0; a < i.length; a++) {
            var n = i[a];
            if (n.panel("options")[t["key"]] == t["val"]) {
                return n;
            }
        }
        return null;
    }
    function getTab(e, t, i) {
        var a = $.data(e, "tabs").tabs;
        if (typeof t == "number") {
            if (t < 0 || t >= a.length) {
                return null;
            } else {
                var n = a[t];
                if (i) {
                    a.splice(t, 1);
                }
                return n;
            }
        }
        for (var r = 0; r < a.length; r++) {
            var n = a[r];
            if (n.panel("options").title == t) {
                if (i) {
                    a.splice(r, 1);
                }
                return n;
            }
        }
        return null;
    }
    function getTabIndex(e, t) {
        var i = $.data(e, "tabs").tabs;
        for (var a = 0; a < i.length; a++) {
            if (i[a][0] == $(t)[0]) {
                return a;
            }
        }
        return -1;
    }
    function getSelectedTab(e) {
        var t = $.data(e, "tabs").tabs;
        for (var i = 0; i < t.length; i++) {
            var a = t[i];
            if (a.panel("options").closed == false) {
                return a;
            }
        }
        return null;
    }
    function doFirstSelect(e) {
        var t = $.data(e, "tabs");
        var i = t.tabs;
        var a = !!t.options.isBrandTabs;
        for (var n = 0; n < i.length; n++) {
            if (i[n].panel("options").selected && !(a && n == 0)) {
                selectTab(e, n);
                return;
            }
        }
        if (a && t.options.selected == 0) t.options.selected = 1;
        selectTab(e, t.options.selected);
    }
    function selectTab(e, t) {
        var i = $.data(e, "tabs");
        var a = i.options;
        var n = i.tabs;
        var r = i.selectHis;
        if (n.length == 0) {
            return;
        }
        var o = getTab(e, t);
        if (!o) {
            return;
        }
        var s = getSelectedTab(e);
        if (a.onBeforeSelect) {
            if (false == a.onBeforeSelect.call(e, o.panel("options").title, getTabIndex(e, o))) {
                return false;
            }
        }
        if (!!a.isBrandTabs) {
            if (getTabIndex(e, o) == 0) {
                return false;
            }
        }
        if (s) {
            if (o[0] == s[0]) {
                setSelectedSize(e);
                return;
            }
            unselectTab(e, getTabIndex(e, s));
            if (!s.panel("options").closed) {
                return;
            }
        }
        o.panel("open");
        var l = o.panel("options").title;
        r.push(l);
        var d = o.panel("options").tab;
        d.addClass("tabs-selected");
        var c = $(e).find(">div.tabs-header>div.tabs-wrap");
        var f = d.position().left;
        var u = f + d.outerWidth();
        if (f < 0 || u > c.width()) {
            var h = f - (c.width() - d.width()) / 2;
            $(e).tabs("scrollBy", h);
        } else {
            $(e).tabs("scrollBy", 0);
        }
        setSelectedSize(e);
        a.onSelect.call(e, l, getTabIndex(e, o));
    }
    function unselectTab(e, t) {
        var i = $.data(e, "tabs");
        var a = getTab(e, t);
        if (a) {
            var n = a.panel("options");
            if (!n.closed) {
                a.panel("close");
                if (n.closed) {
                    n.tab.removeClass("tabs-selected");
                    i.options.onUnselect.call(e, n.title, getTabIndex(e, a));
                }
            }
        }
    }
    function exists(e, t) {
        return getTab(e, t) != null;
    }
    function showHeader(e, t) {
        var i = $.data(e, "tabs").options;
        i.showHeader = t;
        $(e).tabs("resize");
    }
    $.fn.tabs = function(e, t) {
        if (typeof e == "string") {
            return $.fn.tabs.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "tabs");
            var i;
            if (t) {
                i = $.extend(t.options, e);
                t.options = i;
            } else {
                $.data(this, "tabs", {
                    options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), e),
                    tabs: [],
                    selectHis: []
                });
                wrapTabs(this);
            }
            addTools(this);
            setProperties(this);
            setSize(this);
            bindEvents(this);
            doFirstSelect(this);
        });
    };
    $.fn.tabs.methods = {
        options: function(e) {
            var t = e[0];
            var i = $.data(t, "tabs").options;
            var a = getSelectedTab(t);
            i.selected = a ? getTabIndex(t, a) : -1;
            return i;
        },
        tabs: function(e) {
            return $.data(e[0], "tabs").tabs;
        },
        resize: function(e) {
            return e.each(function() {
                setSize(this);
                setSelectedSize(this);
            });
        },
        add: function(e, t) {
            return e.each(function() {
                addTab(this, t);
            });
        },
        close: function(e, t) {
            return e.each(function() {
                closeTab(this, t);
            });
        },
        getTabByOpt: function(e, t) {
            return getTabByOpt(e[0], t);
        },
        getTab: function(e, t) {
            return getTab(e[0], t);
        },
        getTabIndex: function(e, t) {
            return getTabIndex(e[0], t);
        },
        getSelected: function(e) {
            return getSelectedTab(e[0]);
        },
        select: function(e, t) {
            return e.each(function() {
                selectTab(this, t);
            });
        },
        unselect: function(e, t) {
            return e.each(function() {
                unselectTab(this, t);
            });
        },
        exists: function(e, t) {
            return exists(e[0], t);
        },
        update: function(e, t) {
            return e.each(function() {
                updateTab(this, t);
            });
        },
        updateOpt: function(e, t) {
            return e.each(function() {
                updateTabOpt(this, t);
            });
        },
        enableTab: function(e, t) {
            return e.each(function() {
                $(this).tabs("getTab", t).panel("options").tab.removeClass("tabs-disabled");
            });
        },
        disableTab: function(e, t) {
            return e.each(function() {
                $(this).tabs("getTab", t).panel("options").tab.addClass("tabs-disabled");
            });
        },
        showHeader: function(e) {
            return e.each(function() {
                showHeader(this, true);
            });
        },
        hideHeader: function(e) {
            return e.each(function() {
                showHeader(this, false);
            });
        },
        scrollBy: function(e, t) {
            return e.each(function() {
                var e = $(this).tabs("options");
                var i = $(this).find(">div.tabs-header>div.tabs-wrap");
                var a = Math.min(i._scrollLeft() + t, n());
                i.animate({
                    scrollLeft: a
                }, e.scrollDuration);
                function n() {
                    var e = 0;
                    var t = i.children("ul");
                    t.children("li").each(function() {
                        e += $(this).outerWidth(true);
                    });
                    return e - i.width() + (t.outerWidth() - t.width());
                }
            });
        }
    };
    $.fn.tabs.parseOptions = function(e) {
        return $.extend({}, $.parser.parseOptions(e, [ "width", "height", "tools", "toolPosition", "tabPosition", {
            fit: "boolean",
            border: "boolean",
            plain: "boolean",
            headerWidth: "number",
            tabWidth: "number",
            tabHeight: "number",
            selected: "number",
            showHeader: "boolean"
        } ]));
    };
    $.fn.tabs.defaults = {
        width: "auto",
        height: "auto",
        headerWidth: 150,
        tabWidth: "auto",
        tabHeight: 36,
        selected: 0,
        showHeader: true,
        plain: false,
        fit: false,
        border: true,
        tools: null,
        toolPosition: "right",
        tabPosition: "top",
        scrollIncrement: 100,
        scrollDuration: 400,
        onLoad: function(e) {},
        onSelect: function(e, t) {},
        onUnselect: function(e, t) {},
        onBeforeClose: function(e, t) {},
        onClose: function(e, t) {},
        onAdd: function(e, t) {},
        onUpdate: function(e, t) {},
        onContextMenu: function(e, t, i) {}
    };
})(jQuery);

(function(e) {
    var t = false;
    function i(t) {
        var i = e.data(t, "layout");
        var n = i.options;
        var r = i.panels;
        var o = e(t);
        if (t.tagName == "BODY") {
            o._fit();
        } else {
            n.fit ? o.css(o._fit()) : o._fit(false);
        }
        var s = {
            top: 0,
            left: 0,
            width: o.width(),
            height: o.height()
        };
        if (t.tagName !== "BODY") {
            var l = e(t).parent();
            if (l[0].tagName === "BODY") {
                s.height = s.height - parseInt(l.css("padding-top")) - parseInt(l.css("padding-bottom"));
            }
        }
        u(d(r.expandNorth) ? r.expandNorth : r.north, "n");
        u(d(r.expandSouth) ? r.expandSouth : r.south, "s");
        h(d(r.expandEast) ? r.expandEast : r.east, "e");
        h(d(r.expandWest) ? r.expandWest : r.west, "w");
        r.center.panel("resize", s);
        a(r);
        function c(e) {
            var t = e.panel("options");
            return Math.min(Math.max(t.height, t.minHeight), t.maxHeight);
        }
        function f(e) {
            var t = e.panel("options");
            return Math.min(Math.max(t.width, t.minWidth), t.maxWidth);
        }
        function u(e, t) {
            if (!e.length || !d(e)) {
                return;
            }
            var i = e.panel("options");
            var a = c(e);
            e.panel("resize", {
                width: o.width(),
                height: a,
                left: 0,
                top: t == "n" ? 0 : o.height() - a
            });
            s.height -= a;
            if (t == "n") {
                s.top += a;
                if (!i.split && i.border) {
                    s.top--;
                }
            }
            if (!i.split && i.border) {
                s.height++;
            }
        }
        function h(e, t) {
            if (!e.length || !d(e)) {
                return;
            }
            var i = e.panel("options");
            var a = f(e);
            e.panel("resize", {
                width: a,
                height: s.height,
                left: t == "e" ? o.width() - a : 0,
                top: s.top
            });
            s.width -= a;
            if (t == "w") {
                s.left += a;
                if (!i.split && i.border) {
                    s.left--;
                }
            }
            if (!i.split && i.border) {
                s.width++;
            }
        }
    }
    function a(t) {
        var a = "";
        if (t.north.hasClass("layout")) {
            a = t.north[0];
        }
        if (t.south.hasClass("layout")) {
            a = t.south[0];
        }
        if (t.east.hasClass("layout")) {
            a = t.east[0];
        }
        if (t.west.hasClass("layout")) {
            a = t.west[0];
        }
        if (e.data(a, "layout")) {
            i(a);
        }
    }
    function n(t) {
        var a = e(t);
        a.addClass("layout");
        function n(i) {
            i.children("div").each(function() {
                var i = e.fn.layout.parsePanelOptions(this);
                if ("north,south,east,west,center".indexOf(i.region) >= 0) {
                    r(t, i, this);
                }
            });
        }
        a.children("form").length ? n(a.children("form")) : n(a);
        a.append('<div class="layout-split-proxy-h"></div><div class="layout-split-proxy-v"></div>');
        a.bind("_resize", function(a, n) {
            var r = e.data(t, "layout").options;
            if (r.fit == true || n) {
                i(t);
            }
            return false;
        });
    }
    function r(a, n, r) {
        n.region = n.region || "center";
        var o = e.data(a, "layout").panels;
        var l = e(a);
        var d = n.region;
        if (o[d].length) {
            return;
        }
        var c = e(r);
        if (!c.length) {
            c = e("<div></div>").appendTo(l);
        }
        var f = e.extend({}, e.fn.layout.paneldefaults, {
            width: c.length ? parseInt(c[0].style.width) || c.outerWidth() : "auto",
            height: c.length ? parseInt(c[0].style.height) || c.outerHeight() : "auto",
            doSize: false,
            collapsible: true,
            cls: "layout-panel layout-panel-" + d,
            bodyCls: "layout-body",
            onOpen: function() {
                var t = e(this).panel("header").children("div.panel-tool");
                t.children("a.panel-tool-collapse").hide();
                var i = {
                    north: "up",
                    south: "down",
                    east: "right",
                    west: "left"
                };
                if (!i[d]) {
                    return;
                }
                var n = "layout-button-" + i[d];
                var r = t.children("a." + n);
                if (!r.length) {
                    r = e('<a href="javascript:void(0)"></a>').addClass(n).appendTo(t);
                    r.bind("click", {
                        dir: d
                    }, function(e) {
                        s(a, e.data.dir);
                        return false;
                    });
                }
                e(this).panel("options").collapsible ? r.show() : r.hide();
            }
        }, n);
        c.panel(f);
        o[d] = c;
        if (c.panel("options").split) {
            var u = c.panel("panel");
            u.addClass("layout-split-" + d);
            var h = "";
            if (d == "north") {
                h = "s";
            }
            if (d == "south") {
                h = "n";
            }
            if (d == "east") {
                h = "w";
            }
            if (d == "west") {
                h = "e";
            }
            u.resizable(e.extend({}, {
                handles: h,
                onStartResize: function(i) {
                    t = true;
                    if (d == "north" || d == "south") {
                        var n = e(">div.layout-split-proxy-v", a);
                    } else {
                        var n = e(">div.layout-split-proxy-h", a);
                    }
                    var r = 0, o = 0, s = 0, c = 0;
                    var f = {
                        display: "block"
                    };
                    if (d == "north") {
                        f.top = parseInt(u.css("top")) + u.outerHeight() - n.height();
                        f.left = parseInt(u.css("left"));
                        f.width = u.outerWidth();
                        f.height = n.height();
                    } else {
                        if (d == "south") {
                            f.top = parseInt(u.css("top"));
                            f.left = parseInt(u.css("left"));
                            f.width = u.outerWidth();
                            f.height = n.height();
                        } else {
                            if (d == "east") {
                                f.top = parseInt(u.css("top")) || 0;
                                f.left = parseInt(u.css("left")) || 0;
                                f.width = n.width();
                                f.height = u.outerHeight();
                            } else {
                                if (d == "west") {
                                    f.top = parseInt(u.css("top")) || 0;
                                    f.left = u.outerWidth() - n.width();
                                    f.width = n.width();
                                    f.height = u.outerHeight();
                                }
                            }
                        }
                    }
                    n.css(f);
                    e('<div class="layout-mask"></div>').css({
                        left: 0,
                        top: 0,
                        width: l.width(),
                        height: l.height()
                    }).appendTo(l);
                },
                onResize: function(t) {
                    if (d == "north" || d == "south") {
                        var i = e(">div.layout-split-proxy-v", a);
                        i.css("top", t.pageY - e(a).offset().top - i.height() / 2);
                    } else {
                        var i = e(">div.layout-split-proxy-h", a);
                        i.css("left", t.pageX - e(a).offset().left - i.width() / 2);
                    }
                    return false;
                },
                onStopResize: function(e) {
                    l.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
                    c.panel("resize", e.data);
                    i(a);
                    t = false;
                    l.find(">div.layout-mask").remove();
                }
            }, n));
        }
    }
    function o(t, i) {
        var a = e.data(t, "layout").panels;
        if (a[i].length) {
            a[i].panel("destroy");
            a[i] = e();
            var n = "expand" + i.substring(0, 1).toUpperCase() + i.substring(1);
            if (a[n]) {
                a[n].panel("destroy");
                a[n] = undefined;
            }
        }
    }
    function s(i, a, n) {
        if (n == undefined) {
            n = "normal";
        }
        var r = e.data(i, "layout");
        var o = r.panels;
        var c = r.options;
        var f = o[a];
        var u = f.panel("options");
        if (u.onBeforeCollapse.call(f) == false) {
            return;
        }
        var h = "expand" + a.substring(0, 1).toUpperCase() + a.substring(1);
        if (!o[h]) {
            o[h] = v(a);
            o[h].panel("panel").bind("click", function() {
                if (c.clickExpand) {
                    l(i, a);
                    return false;
                } else {
                    var n = g();
                    f.panel("expand", false).panel("open").panel("resize", n.collapse);
                    f.panel("panel").animate(n.expand, function() {
                        e(this).unbind(".layout").bind("mouseleave.layout", {
                            region: a
                        }, function(e) {
                            if (t == true) {
                                return;
                            }
                            s(i, e.data.region);
                        });
                    });
                    return false;
                }
            });
        }
        var p = g();
        if (!d(o[h])) {
            o.center.panel("resize", p.resizeC);
        }
        f.panel("panel").animate(p.collapse, n, function() {
            f.panel("collapse", false).panel("close");
            o[h].panel("open").panel("resize", p.expandP);
            e(this).unbind(".layout");
        });
        function v(t) {
            var n;
            if (t == "east") {
                n = "layout-button-left";
            } else {
                if (t == "west") {
                    n = "layout-button-right";
                } else {
                    if (t == "north") {
                        n = "layout-button-down";
                    } else {
                        if (t == "south") {
                            n = "layout-button-up";
                        }
                    }
                }
            }
            var r = "&nbsp;", o = "";
            if (u.title != "" && u.showCollapsedTitle) {
                if (t == "east" || t == "west") {
                    o = e.hisui.getTrans(u.title).split("").join("</div><div>");
                    o = '<div class="layout-expand-body-title"><div>' + o + "</div></div>";
                } else {
                    r = u.title;
                }
            }
            var s = e("<div></div>").appendTo(i);
            s.panel(e.extend({}, e.fn.layout.paneldefaults, {
                cls: "layout-expand layout-expand-" + t,
                title: r,
                content: o,
                headerCls: u.headerCls,
                bodyCls: u.bodyCls,
                closed: true,
                minWidth: 0,
                minHeight: 0,
                doSize: false,
                tools: [ {
                    iconCls: n,
                    handler: function() {
                        l(i, a);
                        return false;
                    }
                } ]
            }));
            s.panel("panel").hover(function() {
                e(this).addClass("layout-expand-over");
            }, function() {
                e(this).removeClass("layout-expand-over");
            });
            return s;
        }
        function g() {
            var t = e(i);
            var n = o.center.panel("options");
            var r = u.collapsedSize;
            if (a == "east") {
                var s = n.width + u.width - r;
                if (u.split || !u.border) {
                    s++;
                }
                return {
                    resizeC: {
                        width: s
                    },
                    expand: {
                        left: t.width() - u.width
                    },
                    expandP: {
                        top: n.top,
                        left: t.width() - r,
                        width: r,
                        height: n.height
                    },
                    collapse: {
                        left: t.width(),
                        top: n.top,
                        height: n.height
                    }
                };
            } else {
                if (a == "west") {
                    var s = n.width + u.width - r;
                    if (u.split || !u.border) {
                        s++;
                    }
                    return {
                        resizeC: {
                            width: s,
                            left: r - 1
                        },
                        expand: {
                            left: 0
                        },
                        expandP: {
                            left: 0,
                            top: n.top,
                            width: r,
                            height: n.height
                        },
                        collapse: {
                            left: -u.width,
                            top: n.top,
                            height: n.height
                        }
                    };
                } else {
                    if (a == "north") {
                        r = u.collapsedHeight;
                        var l = n.height;
                        if (!d(o.expandNorth)) {
                            l += u.height - r + (u.split || !u.border ? 1 : 0);
                        }
                        o.east.add(o.west).add(o.expandEast).add(o.expandWest).panel("resize", {
                            top: r - 1,
                            height: l
                        });
                        return {
                            resizeC: {
                                top: r - 1,
                                height: l
                            },
                            expand: {
                                top: 0
                            },
                            expandP: {
                                top: 0,
                                left: 0,
                                width: t.width(),
                                height: r
                            },
                            collapse: {
                                top: -u.height,
                                width: t.width()
                            }
                        };
                    } else {
                        if (a == "south") {
                            r = u.collapsedHeight;
                            var l = n.height;
                            if (!d(o.expandSouth)) {
                                l += u.height - r + (u.split || !u.border ? 1 : 0);
                            }
                            o.east.add(o.west).add(o.expandEast).add(o.expandWest).panel("resize", {
                                height: l
                            });
                            return {
                                resizeC: {
                                    height: l
                                },
                                expand: {
                                    top: t.height() - u.height
                                },
                                expandP: {
                                    top: t.height() - r,
                                    left: 0,
                                    width: t.width(),
                                    height: r
                                },
                                collapse: {
                                    top: t.height(),
                                    width: t.width()
                                }
                            };
                        }
                    }
                }
            }
        }
    }
    function l(t, a) {
        var n = e.data(t, "layout").panels;
        var r = n[a];
        var o = r.panel("options");
        if (o.onBeforeExpand.call(r) == false) {
            return;
        }
        var s = d();
        var l = "expand" + a.substring(0, 1).toUpperCase() + a.substring(1);
        if (n[l]) {
            n[l].panel("close");
            r.panel("panel").stop(true, true);
            r.panel("expand", false).panel("open").panel("resize", s.collapse);
            r.panel("panel").animate(s.expand, function() {
                i(t);
            });
        }
        function d() {
            var i = e(t);
            var r = n.center.panel("options");
            if (a == "east" && n.expandEast) {
                return {
                    collapse: {
                        left: i.width(),
                        top: r.top,
                        height: r.height
                    },
                    expand: {
                        left: i.width() - n["east"].panel("options").width
                    }
                };
            } else {
                if (a == "west" && n.expandWest) {
                    return {
                        collapse: {
                            left: -n["west"].panel("options").width,
                            top: r.top,
                            height: r.height
                        },
                        expand: {
                            left: 0
                        }
                    };
                } else {
                    if (a == "north" && n.expandNorth) {
                        return {
                            collapse: {
                                top: -n["north"].panel("options").height,
                                width: i.width()
                            },
                            expand: {
                                top: 0
                            }
                        };
                    } else {
                        if (a == "south" && n.expandSouth) {
                            return {
                                collapse: {
                                    top: i.height(),
                                    width: i.width()
                                },
                                expand: {
                                    top: i.height() - n["south"].panel("options").height
                                }
                            };
                        }
                    }
                }
            }
        }
    }
    function d(e) {
        if (!e) {
            return false;
        }
        if (e.length) {
            return e.panel("panel").is(":visible");
        } else {
            return false;
        }
    }
    function c(t) {
        var i = e.data(t, "layout").panels;
        if (i.east.length && i.east.panel("options").collapsed) {
            s(t, "east", 0);
        }
        if (i.west.length && i.west.panel("options").collapsed) {
            s(t, "west", 0);
        }
        if (i.north.length && i.north.panel("options").collapsed) {
            s(t, "north", 0);
        }
        if (i.south.length && i.south.panel("options").collapsed) {
            s(t, "south", 0);
        }
    }
    e.fn.layout = function(t, a) {
        if (typeof t == "string") {
            return e.fn.layout.methods[t](this, a);
        }
        t = t || {};
        return this.each(function() {
            var a = e.data(this, "layout");
            if (a) {
                e.extend(a.options, t);
            } else {
                var r = e.extend({}, e.fn.layout.defaults, e.fn.layout.parseOptions(this), t);
                e.data(this, "layout", {
                    options: r,
                    panels: {
                        center: e(),
                        north: e(),
                        south: e(),
                        east: e(),
                        west: e()
                    }
                });
                n(this);
            }
            i(this);
            c(this);
        });
    };
    e.fn.layout.methods = {
        resize: function(e) {
            return e.each(function() {
                i(this);
            });
        },
        panel: function(t, i) {
            return e.data(t[0], "layout").panels[i];
        },
        collapse: function(e, t) {
            return e.each(function() {
                s(this, t);
            });
        },
        expand: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        add: function(t, a) {
            return t.each(function() {
                r(this, a);
                i(this);
                if (e(this).layout("panel", a.region).panel("options").collapsed) {
                    s(this, a.region, 0);
                }
            });
        },
        remove: function(e, t) {
            return e.each(function() {
                o(this, t);
                i(this);
            });
        }
    };
    e.fn.layout.parseOptions = function(t) {
        return e.extend({}, e.parser.parseOptions(t, [ {
            fit: "boolean"
        } ]));
    };
    e.fn.layout.defaults = {
        fit: false,
        clickExpand: false
    };
    e.fn.layout.parsePanelOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.panel.parseOptions(t), e.parser.parseOptions(t, [ "region", {
            split: "boolean",
            showCollapsedTitle: "boolean",
            collpasedSize: "number",
            collapsedHeight: "number",
            minWidth: "number",
            minHeight: "number",
            maxWidth: "number",
            maxHeight: "number"
        } ]));
    };
    e.fn.layout.paneldefaults = e.extend({}, e.fn.panel.defaults, {
        region: null,
        showCollapsedTitle: false,
        split: false,
        collapsedSize: 28,
        collapsedHeight: 38,
        minWidth: 10,
        minHeight: 10,
        maxWidth: 1e4,
        maxHeight: 1e4
    });
})(jQuery);

(function($) {
    function init(e) {
        $(e).appendTo("body");
        $(e).addClass("menu-top");
        var t = $.data(e, "menu").options;
        if (t.isTopZindex) {
            var i = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
            $(e).prepend(i);
        }
        $(document).unbind(".menu").bind("mousedown.menu", function(e) {
            var t = $(e.target).closest("div.menu,div.combo-p");
            if (t.length) {
                return;
            }
            $("body>div.menu-top:visible").menu("hide");
        });
        var a = r($(e));
        for (var n = 0; n < a.length; n++) {
            o(a[n]);
        }
        function r(t) {
            var i = [];
            t.addClass("menu");
            i.push(t);
            if (!t.hasClass("menu-content")) {
                t.children("div").each(function() {
                    var t = $(this).children("div");
                    if (t.length) {
                        t.insertAfter(e);
                        this.submenu = t;
                        var a = r(t);
                        i = i.concat(a);
                    }
                });
            }
            return i;
        }
        function o(t) {
            var i = $.parser.parseOptions(t[0], [ "width", "height" ]);
            t[0].originalHeight = i.height || 0;
            if (t.hasClass("menu-content")) {
                t[0].originalWidth = i.width || t._outerWidth();
            } else {
                t[0].originalWidth = i.width || 0;
                t.children("div").each(function() {
                    var t = $(this);
                    var i = $.extend({}, $.parser.parseOptions(this, [ "name", "iconCls", "href", {
                        separator: "boolean"
                    } ]), {
                        disabled: t.attr("disabled") ? true : undefined
                    });
                    if (i.separator) {
                        t.addClass("menu-sep");
                    }
                    if (!t.hasClass("menu-sep")) {
                        t[0].itemName = i.name || "";
                        t[0].itemHref = i.href || "";
                        var a = t.addClass("menu-item").html();
                        t.empty().append($('<div class="menu-text"></div>').html($.hisui.getTrans(a)));
                        if (i.iconCls) {
                            $('<div class="menu-icon"></div>').addClass(i.iconCls).appendTo(t);
                        }
                        if (i.disabled) {
                            setDisabled(e, t[0], true);
                        }
                        if (t[0].submenu) {
                            $('<div class="menu-rightarrow"></div>').appendTo(t);
                        }
                        bindMenuItemEvent(e, t);
                    }
                });
                $('<div class="menu-line"></div>').prependTo(t);
            }
            setMenuWidth(e, t);
            t.hide();
            bindMenuEvent(e, t);
        }
    }
    function setMenuWidth(e, t) {
        var i = $.data(e, "menu").options;
        var a = t.attr("style") || "";
        t.css({
            display: "block",
            left: -1e4,
            height: "auto",
            overflow: "hidden"
        });
        var n = t[0];
        var r = n.originalWidth || 0;
        if (!r) {
            r = 0;
            t.find("div.menu-text").each(function() {
                if (r < $(this)._outerWidth()) {
                    r = $(this)._outerWidth();
                }
                $(this).closest("div.menu-item")._outerHeight($(this)._outerHeight() + 2);
            });
            r += 40;
        }
        r = Math.max(r, i.minWidth);
        var o = n.originalHeight || t.outerHeight();
        var s = Math.max(n.originalHeight, t.outerHeight()) - 2;
        if (i.width && i.width > 0) r = i.width;
        t._outerWidth(r)._outerHeight(o);
        t.children("div.menu-line")._outerHeight(s);
        a += ";width:" + n.style.width + ";height:" + n.style.height;
        t.attr("style", a);
    }
    function bindMenuEvent(e, t) {
        var i = $.data(e, "menu");
        t.unbind(".menu").bind("mouseenter.menu", function() {
            if (i.timer) {
                clearTimeout(i.timer);
                i.timer = null;
            }
        }).bind("mouseleave.menu", function() {
            if (i.options.hideOnUnhover) {
                i.timer = setTimeout(function() {
                    hideAll(e);
                }, 100);
            }
        });
    }
    function bindMenuItemEvent(e, t) {
        if (!t.hasClass("menu-item")) {
            return;
        }
        t.unbind(".menu");
        t.bind("click.menu", function() {
            if ($(this).hasClass("menu-item-disabled")) {
                return;
            }
            if (!this.submenu) {
                hideAll(e);
                var t = $(this).attr("href");
                if (t) {
                    location.href = t;
                }
            }
            var i = $(e).menu("getItem", this);
            $.data(e, "menu").options.onClick.call(e, i);
        }).bind("mouseenter.menu", function(i) {
            t.siblings().each(function() {
                if (this.submenu) {
                    hideMenu(this.submenu);
                }
                $(this).removeClass("menu-active");
            });
            t.addClass("menu-active");
            if ($(this).hasClass("menu-item-disabled")) {
                t.addClass("menu-active-disabled");
                return;
            }
            var a = t[0].submenu;
            if (a) {
                $(e).menu("show", {
                    menu: a,
                    parent: t
                });
            }
        }).bind("mouseleave.menu", function(e) {
            t.removeClass("menu-active menu-active-disabled");
            var i = t[0].submenu;
            if (i) {
                if (e.pageX >= parseInt(i.css("left"))) {
                    t.addClass("menu-active");
                } else {
                    hideMenu(i);
                }
            } else {
                t.removeClass("menu-active");
            }
        });
    }
    function hideAll(e) {
        var t = $.data(e, "menu");
        if (t) {
            if ($(e).is(":visible")) {
                hideMenu($(e));
                t.options.onHide.call(e);
            }
        }
        if (t.options.isTopZindex) {
            windowNPAPITotal = 200;
            $.hisui.findObjectDom(t.options, window, false, e, "menu");
        }
        $.data(e, "changeIdStr", {
            NPAPIIdStr: ""
        });
        return false;
    }
    function showMenu(e, t) {
        var i, a;
        t = t || {};
        var n = $(t.menu || e);
        var r = $.data(e, "menu").options;
        if (n.hasClass("menu-top")) {
            $.extend(r, t);
            i = r.left;
            a = r.top;
            if (r.alignTo) {
                var o = $(r.alignTo);
                i = o.offset().left;
                a = o.offset().top + o._outerHeight();
                if (r.align == "right") {
                    i += o.outerWidth() - n.outerWidth();
                }
            }
            if (i + n.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                i = $(window)._outerWidth() + $(document).scrollLeft() - n.outerWidth() - 5;
            }
            if (i < 0) {
                i = 0;
            }
            if (a + n.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                a = $(window)._outerHeight() + $(document).scrollTop() - n.outerHeight() - 5;
            }
        } else {
            var s = t.parent;
            i = s.offset().left + s.outerWidth() - 2;
            if (i + n.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
                i = s.offset().left - n.outerWidth() + 2;
            }
            var a = s.offset().top - 3;
            if (a + n.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                a = $(window)._outerHeight() + $(document).scrollTop() - n.outerHeight() - 5;
            }
        }
        n.css({
            left: i,
            top: a
        });
        n.show(0, function() {
            if (!n[0].shadow) {
                n[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(n);
            }
            n[0].shadow.css({
                display: "block",
                zIndex: $.fn.menu.defaults.zIndex++,
                left: n.css("left"),
                top: n.css("top"),
                width: n.outerWidth(),
                height: n.outerHeight()
            });
            n.css("z-index", $.fn.menu.defaults.zIndex++);
            if (n.hasClass("menu-top")) {
                $.data(n[0], "menu").options.onShow.call(n[0]);
            }
        });
        if (r.isTopZindex) {
            windowNPAPITotal = 200;
            $.hisui.findObjectDom(r, window, true, e, "menu");
        }
    }
    function hideMenu(e) {
        if (!e) {
            return;
        }
        t(e);
        e.find("div.menu-item").each(function() {
            if (this.submenu) {
                hideMenu(this.submenu);
            }
            $(this).removeClass("menu-active");
        });
        function t(e) {
            e.stop(true, true);
            if (e[0].shadow) {
                e[0].shadow.hide();
            }
            e.hide();
        }
    }
    function findItem(e, t) {
        t = $.hisui.getTrans(t);
        var i = null;
        var a = $("<div></div>");
        function n(r) {
            r.children("div.menu-item").each(function() {
                var r = $(e).menu("getItem", this);
                var o = a.empty().html(r.text).text();
                if (t == $.trim(o)) {
                    i = r;
                } else {
                    if (this.submenu && !i) {
                        n(this.submenu);
                    }
                }
            });
        }
        n($(e));
        a.remove();
        return i;
    }
    function setDisabled(e, t, i) {
        var a = $(t);
        if (!a.hasClass("menu-item")) {
            return;
        }
        if (i) {
            a.addClass("menu-item-disabled");
            if (t.onclick) {
                t.onclick1 = t.onclick;
                t.onclick = null;
            }
        } else {
            a.removeClass("menu-item-disabled");
            if (t.onclick1) {
                t.onclick = t.onclick1;
                t.onclick1 = null;
            }
        }
    }
    function appendItem(target, param) {
        var menu = $(target);
        if (param.parent) {
            if (!param.parent.submenu) {
                var submenu = $('<div class="menu"><div class="menu-line"></div></div>').appendTo("body");
                submenu.hide();
                param.parent.submenu = submenu;
                $('<div class="menu-rightarrow"></div>').appendTo(param.parent);
            }
            menu = param.parent.submenu;
        }
        if (param.separator) {
            var item = $('<div class="menu-sep"></div>').appendTo(menu);
        } else {
            var item = $('<div class="menu-item"></div>').appendTo(menu);
            $('<div class="menu-text"></div>').html($.hisui.getTrans(param.text)).appendTo(item);
        }
        if (param.iconCls) {
            $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(item);
        }
        if (param.id) {
            item.attr("id", param.id);
        }
        if (param.name) {
            item[0].itemName = param.name;
        }
        if (param.href) {
            item[0].itemHref = param.href;
        }
        if (param.onclick) {
            if (typeof param.onclick == "string") {
                item.attr("onclick", param.onclick);
            } else {
                item[0].onclick = eval(param.onclick);
            }
        }
        if (param.handler) {
            item[0].onclick = eval(param.handler);
        }
        if (param.disabled) {
            setDisabled(target, item[0], true);
        }
        bindMenuItemEvent(target, item);
        bindMenuEvent(target, menu);
        setMenuWidth(target, menu);
    }
    function removeItem(e, t) {
        function i(e) {
            if (e.submenu) {
                e.submenu.children("div.menu-item").each(function() {
                    i(this);
                });
                var t = e.submenu[0].shadow;
                if (t) {
                    t.remove();
                }
                e.submenu.remove();
            }
            $(e).remove();
        }
        i(t);
    }
    function destroyMenu(e) {
        $(e).children("div.menu-item").each(function() {
            removeItem(e, this);
        });
        if (e.shadow) {
            e.shadow.remove();
        }
        $(e).remove();
    }
    $.fn.menu = function(e, t) {
        if (typeof e == "string") {
            return $.fn.menu.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "menu");
            if (t) {
                $.extend(t.options, e);
            } else {
                t = $.data(this, "menu", {
                    options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), e)
                });
                init(this);
            }
            $(this).css({
                left: t.options.left,
                top: t.options.top
            });
        });
    };
    $.fn.menu.methods = {
        options: function(e) {
            return $.data(e[0], "menu").options;
        },
        show: function(e, t) {
            return e.each(function() {
                showMenu(this, t);
            });
        },
        hide: function(e) {
            return e.each(function() {
                hideAll(this);
            });
        },
        destroy: function(e) {
            return e.each(function() {
                destroyMenu(this);
            });
        },
        setText: function(e, t) {
            return e.each(function() {
                $(t.target).children("div.menu-text").html($.hisui.getTrans(t.text));
            });
        },
        setIcon: function(e, t) {
            return e.each(function() {
                $(t.target).children("div.menu-icon").remove();
                if (t.iconCls) {
                    $('<div class="menu-icon"></div>').addClass(t.iconCls).appendTo(t.target);
                }
            });
        },
        getItem: function(e, t) {
            var i = $(t);
            var a = {
                target: t,
                id: i.attr("id"),
                text: $.trim(i.children("div.menu-text").html()),
                disabled: i.hasClass("menu-item-disabled"),
                name: t.itemName,
                href: t.itemHref,
                onclick: t.onclick
            };
            var n = i.children("div.menu-icon");
            if (n.length) {
                var r = [];
                var o = n.attr("class").split(" ");
                for (var s = 0; s < o.length; s++) {
                    if (o[s] != "menu-icon") {
                        r.push(o[s]);
                    }
                }
                a.iconCls = r.join(" ");
            }
            return a;
        },
        findItem: function(e, t) {
            return findItem(e[0], t);
        },
        appendItem: function(e, t) {
            return e.each(function() {
                appendItem(this, t);
            });
        },
        removeItem: function(e, t) {
            return e.each(function() {
                removeItem(this, t);
            });
        },
        enableItem: function(e, t) {
            return e.each(function() {
                setDisabled(this, t, false);
            });
        },
        disableItem: function(e, t) {
            return e.each(function() {
                setDisabled(this, t, true);
            });
        }
    };
    $.fn.menu.parseOptions = function(e) {
        return $.extend({}, $.parser.parseOptions(e, [ "left", "top", {
            minWidth: "number",
            hideOnUnhover: "boolean"
        } ]));
    };
    $.fn.menu.defaults = {
        isTopZindex: false,
        zIndex: 11e4,
        left: 0,
        top: 0,
        alignTo: null,
        align: "left",
        minWidth: 120,
        hideOnUnhover: true,
        onShow: function() {},
        onHide: function() {},
        onClick: function(e) {}
    };
})(jQuery);

(function(e) {
    function t(t) {
        var a = e.data(t, "menubutton").options;
        var n = e(t);
        n.linkbutton(a);
        n.removeClass(a.cls.btn1 + " " + a.cls.btn2).addClass("m-btn");
        n.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + a.size);
        var r = n.find(".l-btn-left");
        e("<span></span>").addClass(a.cls.arrow).appendTo(r);
        e("<span></span>").addClass("m-btn-line").appendTo(r);
        n.removeClass("menubutton-toolbar menubutton-blue").addClass(a.otherCls);
        if (a.menu) {
            e(a.menu).addClass(a.otherCls);
            if (a.otherCls == "menubutton-toolbar" || a.otherCls == "menubutton-blue") {
                e(a.menu).menu({
                    width: n._outerWidth(),
                    isTopZindex: a.isTopZindex
                });
            } else {
                e(a.menu).menu({
                    isTopZindex: a.isTopZindex
                });
            }
            var o = e(a.menu).menu("options");
            var s = o.onShow;
            var l = o.onHide;
            e.extend(o, {
                onShow: function() {
                    var t = e(this).menu("options");
                    var i = e(t.alignTo);
                    var a = i.menubutton("options");
                    i.addClass(a.plain == true ? a.cls.btn2 : a.cls.btn1);
                    s.call(this);
                },
                onHide: function() {
                    var t = e(this).menu("options");
                    var i = e(t.alignTo);
                    var a = i.menubutton("options");
                    i.removeClass(a.plain == true ? a.cls.btn2 : a.cls.btn1);
                    l.call(this);
                }
            });
        }
        i(t, a.disabled);
    }
    function i(t, i) {
        var n = e.data(t, "menubutton").options;
        n.disabled = i;
        var r = e(t);
        var o = r.find("." + n.cls.trigger);
        if (!o.length) {
            o = r;
        }
        o.unbind(".menubutton");
        if (i) {
            r.linkbutton("disable");
        } else {
            r.linkbutton("enable");
            var s = null;
            o.bind("click.menubutton", function() {
                a(t);
                return false;
            }).bind("mouseenter.menubutton", function() {
                s = setTimeout(function() {
                    a(t);
                }, n.duration);
                return false;
            }).bind("mouseleave.menubutton", function(t) {
                if (s) {
                    clearTimeout(s);
                }
                var i = t.toElement || t.relatedTarget;
                if (e(n.menu).length > 0 && e(n.menu).find(i).length == 0 && !e(n.menu).is(e(i))) {
                    e(n.menu).menu("hide");
                }
            });
        }
    }
    function a(t) {
        var i = e.data(t, "menubutton").options;
        if (i.disabled || !i.menu) {
            return;
        }
        e("body>div.menu-top").menu("hide");
        var a = e(t);
        var n = e(i.menu);
        if (n.length) {
            n.menu("options").alignTo = a;
            n.menu("show", {
                alignTo: a,
                align: i.menuAlign
            });
        }
        a.blur();
    }
    e.fn.menubutton = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.menubutton.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.linkbutton(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "menubutton");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "menubutton", {
                    options: e.extend({}, e.fn.menubutton.defaults, e.fn.menubutton.parseOptions(this), i)
                });
                e(this).removeAttr("disabled");
            }
            t(this);
        });
    };
    e.fn.menubutton.methods = {
        options: function(t) {
            var i = t.linkbutton("options");
            var a = e.data(t[0], "menubutton").options;
            a.toggle = i.toggle;
            a.selected = i.selected;
            return a;
        },
        enable: function(e) {
            return e.each(function() {
                i(this, false);
            });
        },
        disable: function(e) {
            return e.each(function() {
                i(this, true);
            });
        },
        destroy: function(t) {
            return t.each(function() {
                var t = e(this).menubutton("options");
                if (t.menu) {
                    e(t.menu).menu("destroy");
                }
                e(this).remove();
            });
        }
    };
    e.fn.menubutton.parseOptions = function(t) {
        var i = e(t);
        var a = "";
        if (i.hasClass("menubutton-blue")) {
            a = "menubutton-blue";
        } else if (i.hasClass("menubutton-toolbar")) {
            a = "menubutton-toolbar";
        }
        return e.extend({
            otherCls: a
        }, e.fn.linkbutton.parseOptions(t), e.parser.parseOptions(t, [ "menu", {
            plain: "boolean",
            duration: "number"
        } ]));
    };
    e.fn.menubutton.defaults = e.extend({}, e.fn.linkbutton.defaults, {
        otherCls: "",
        plain: true,
        menu: null,
        menuAlign: "left",
        duration: 100,
        cls: {
            btn1: "m-btn-active",
            btn2: "m-btn-plain-active",
            arrow: "m-btn-downarrow",
            trigger: "m-btn"
        }
    });
})(jQuery);

(function(e) {
    function t(t) {
        var i = e.data(t, "splitbutton").options;
        e(t).menubutton(i);
        e(t).addClass("s-btn");
    }
    e.fn.splitbutton = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.splitbutton.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.menubutton(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "splitbutton");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "splitbutton", {
                    options: e.extend({}, e.fn.splitbutton.defaults, e.fn.splitbutton.parseOptions(this), i)
                });
                e(this).removeAttr("disabled");
            }
            t(this);
        });
    };
    e.fn.splitbutton.methods = {
        options: function(t) {
            var i = t.menubutton("options");
            var a = e.data(t[0], "splitbutton").options;
            e.extend(a, {
                disabled: i.disabled,
                toggle: i.toggle,
                selected: i.selected
            });
            return a;
        }
    };
    e.fn.splitbutton.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.linkbutton.parseOptions(t), e.parser.parseOptions(t, [ "menu", {
            plain: "boolean",
            duration: "number"
        } ]));
    };
    e.fn.splitbutton.defaults = e.extend({}, e.fn.linkbutton.defaults, {
        plain: true,
        menu: null,
        duration: 100,
        cls: {
            btn1: "m-btn-active s-btn-active",
            btn2: "m-btn-plain-active s-btn-plain-active",
            arrow: "m-btn-downarrow",
            trigger: "m-btn-line"
        }
    });
})(jQuery);

(function($) {
    function init(e) {
        $(e).addClass("searchbox-f").hide();
        var t = $('<span class="searchbox"></span>').insertAfter(e);
        var i = $('<input type="text" class="searchbox-text">').appendTo(t);
        $('<span><span class="searchbox-button"></span></span>').appendTo(t);
        var a = $(e).attr("name");
        if (a) {
            i.attr("name", a);
            $(e).removeAttr("name").attr("searchboxName", a);
        }
        return t;
    }
    function _3fe(e, t) {
        var i = $.data(e, "searchbox").options;
        var a = $.data(e, "searchbox").searchbox;
        if (t) {
            i.width = t;
        }
        a.appendTo("body");
        if (isNaN(i.width)) {
            i.width = a._outerWidth();
        }
        var n = a.find("span.searchbox-button");
        var r = a.find("a.searchbox-menu");
        var o = a.find("input.searchbox-text");
        a._outerWidth(i.width)._outerHeight(i.height);
        o._outerWidth(a.width() - r._outerWidth() - n._outerWidth());
        o.css({
            height: a.height() + "px",
            lineHeight: a.height() + "px"
        });
        r._outerHeight(a.height());
        n._outerHeight(a.height());
        var s = r.find("span.l-btn-left");
        s._outerHeight(a.height());
        s.find("span.l-btn-text").css({
            height: s.height() + "px",
            lineHeight: s.height() + "px"
        });
        a.insertAfter(e);
    }
    function _404(e) {
        var t = $.data(e, "searchbox");
        var i = t.options;
        if (i.menu) {
            t.menu = $(i.menu).menu({
                onClick: function(e) {
                    n(e);
                }
            });
            var a = t.menu.children("div.menu-item:first");
            t.menu.children("div.menu-item").each(function() {
                var e = $.extend({}, $.parser.parseOptions(this), {
                    selected: $(this).attr("selected") ? true : undefined
                });
                if (e.selected) {
                    a = $(this);
                    return false;
                }
            });
            a.triggerHandler("click");
        } else {
            t.searchbox.find("a.searchbox-menu").remove();
            t.menu = null;
        }
        function n(i) {
            t.searchbox.find("a.searchbox-menu").remove();
            var a = $('<a class="searchbox-menu" href="javascript:void(0)"></a>').html(i.text);
            a.prependTo(t.searchbox).menubutton({
                menu: t.menu,
                iconCls: i.iconCls
            });
            t.searchbox.find("input.searchbox-text").attr("name", i.name || i.text);
            _3fe(e);
        }
    }
    function _409(e) {
        var t = $.data(e, "searchbox");
        var i = t.options;
        var a = t.searchbox.find("input.searchbox-text");
        var n = t.searchbox.find(".searchbox-button");
        a.unbind(".searchbox");
        n.unbind(".searchbox");
        if (!i.disabled) {
            a.bind("blur.searchbox", function(e) {
                i.value = $(this).val();
                if (i.value == "") {
                    $(this).val(i.prompt);
                    $(this).addClass("searchbox-prompt");
                } else {
                    $(this).removeClass("searchbox-prompt");
                }
            }).bind("focus.searchbox", function(e) {
                if ($(this).val() != i.value) {
                    $(this).val(i.value);
                }
                $(this).removeClass("searchbox-prompt");
            }).bind("keydown.searchbox", function(t) {
                if (t.keyCode == 13) {
                    t.preventDefault();
                    i.value = $(this).val();
                    i.searcher.call(e, i.value, a._propAttr("name"));
                    return false;
                }
            });
            n.bind("click.searchbox", function() {
                i.searcher.call(e, i.value, a._propAttr("name"));
            }).bind("mouseenter.searchbox", function() {
                $(this).addClass("searchbox-button-hover");
            }).bind("mouseleave.searchbox", function() {
                $(this).removeClass("searchbox-button-hover");
            });
        }
    }
    function _40e(e, t) {
        var i = $.data(e, "searchbox");
        var a = i.options;
        var n = i.searchbox.find("input.searchbox-text");
        var r = i.searchbox.find("a.searchbox-menu");
        if (t) {
            a.disabled = true;
            $(e).attr("disabled", true);
            n.attr("disabled", true);
            if (r.length) {
                r.menubutton("disable");
            }
            i.searchbox.addClass("disabled");
        } else {
            a.disabled = false;
            $(e).removeAttr("disabled");
            n.removeAttr("disabled");
            if (r.length) {
                r.menubutton("enable");
            }
            i.searchbox.removeClass("disabled");
        }
    }
    function _413(e) {
        var t = $.data(e, "searchbox");
        var i = t.options;
        var a = t.searchbox.find("input.searchbox-text");
        i.originalValue = i.value;
        if (i.value) {
            a.val(i.value);
            a.removeClass("searchbox-prompt");
        } else {
            a.val(i.prompt);
            a.addClass("searchbox-prompt");
        }
    }
    $.fn.searchbox = function(e, t) {
        if (typeof e == "string") {
            return $.fn.searchbox.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "searchbox");
            if (t) {
                $.extend(t.options, e);
            } else {
                t = $.data(this, "searchbox", {
                    options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), e),
                    searchbox: init(this)
                });
            }
            _404(this);
            _413(this);
            _409(this);
            _40e(this, t.options.disabled);
            _3fe(this);
        });
    };
    $.fn.searchbox.methods = {
        options: function(e) {
            return $.data(e[0], "searchbox").options;
        },
        menu: function(e) {
            return $.data(e[0], "searchbox").menu;
        },
        textbox: function(e) {
            return $.data(e[0], "searchbox").searchbox.find("input.searchbox-text");
        },
        getValue: function(e) {
            return $.data(e[0], "searchbox").options.value;
        },
        setValue: function(e, t) {
            return e.each(function() {
                $(this).searchbox("options").value = t;
                $(this).searchbox("textbox").val(t);
                $(this).searchbox("textbox").blur();
            });
        },
        clear: function(e) {
            return e.each(function() {
                $(this).searchbox("setValue", "");
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = $(this).searchbox("options");
                $(this).searchbox("setValue", e.originalValue);
            });
        },
        getName: function(e) {
            return $.data(e[0], "searchbox").searchbox.find("input.searchbox-text").attr("name");
        },
        selectName: function(e, t) {
            return e.each(function() {
                var e = $.data(this, "searchbox").menu;
                if (e) {
                    e.children('div.menu-item[name="' + t + '"]').triggerHandler("click");
                }
            });
        },
        destroy: function(e) {
            return e.each(function() {
                var e = $(this).searchbox("menu");
                if (e) {
                    e.menu("destroy");
                }
                $.data(this, "searchbox").searchbox.remove();
                $(this).remove();
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                _3fe(this, t);
            });
        },
        disable: function(e) {
            return e.each(function() {
                _40e(this, true);
                _409(this);
            });
        },
        enable: function(e) {
            return e.each(function() {
                _40e(this, false);
                _409(this);
            });
        }
    };
    $.fn.searchbox.parseOptions = function(_41c) {
        var t = $(_41c);
        return $.extend({}, $.parser.parseOptions(_41c, [ "width", "height", "prompt", "menu" ]), {
            value: t.val() || undefined,
            disabled: t.attr("disabled") ? true : undefined,
            searcher: t.attr("searcher") ? eval(t.attr("searcher")) : undefined
        });
    };
    $.fn.searchbox.defaults = {
        width: "auto",
        height: 30,
        prompt: "",
        value: "",
        menu: null,
        disabled: false,
        searcher: function(e, t) {}
    };
})(jQuery);

(function($) {
    function init(e) {
        $(e).addClass("validatebox-text");
    }
    function _41f(e) {
        var t = $.data(e, "validatebox");
        t.validating = false;
        if (t.timer) {
            clearTimeout(t.timer);
        }
        $(e).tooltip("destroy");
        $(e).unbind();
        $(e).remove();
    }
    function _422(e) {
        var t = $(e);
        var i = $.data(e, "validatebox");
        t.unbind(".validatebox");
        if (i.options.novalidate) {
            return;
        }
        t.bind("focus.validatebox", function() {
            i.validating = true;
            i.value = undefined;
            (function() {
                if (i.validating) {
                    if (i.value != t.val()) {
                        i.value = t.val();
                        if (i.timer) {
                            clearTimeout(i.timer);
                        }
                        i.timer = setTimeout(function() {
                            $(e).validatebox("validate");
                        }, i.options.delay);
                    } else {
                        _429(e);
                    }
                    setTimeout(arguments.callee, 200);
                }
            })();
        }).bind("blur.validatebox", function() {
            if (i.timer) {
                clearTimeout(i.timer);
                i.timer = undefined;
            }
            i.validating = false;
            _425(e);
        }).bind("mouseenter.validatebox", function() {
            if (t.hasClass("validatebox-invalid")) {
                _426(e);
            }
            var i = $.data(e, "validatebox");
            if (i.options) {
                if (i.options.prompt && i.options.prompt != "") {
                    i.message = i.options.prompt;
                    _426(e);
                }
            }
        }).bind("mouseleave.validatebox", function() {
            if (!i.validating) {
                _425(e);
            }
        });
    }
    function _426(e) {
        var t = $.data(e, "validatebox");
        var i = t.options;
        $(e).tooltip($.extend({}, i.tipOptions, {
            content: t.message,
            position: i.tipPosition,
            deltaX: i.deltaX
        })).tooltip("show");
        t.tip = true;
    }
    function _429(e) {
        var t = $.data(e, "validatebox");
        if (t && t.tip) {
            $(e).tooltip("reposition");
        }
    }
    function _425(e) {
        var t = $.data(e, "validatebox");
        t.tip = false;
        $(e).tooltip("hide");
    }
    function _42e(_42f) {
        var _430 = $.data(_42f, "validatebox");
        var opts = _430.options;
        var box = $(_42f);
        var _431 = box.val();
        function _432(e) {
            _430.message = e;
        }
        function _433(_434, _435) {
            var _436 = /([a-zA-Z_]+)(.*)/.exec(_434);
            var rule = opts.rules[_436[1]];
            if (rule && _431) {
                var _437 = _435 || opts.validParams || eval(_436[2]);
                if (!rule["validator"].call(_42f, _431, _437)) {
                    box.addClass("validatebox-invalid");
                    var _438 = rule["message"];
                    if (_437) {
                        for (var i = 0; i < _437.length; i++) {
                            _438 = _438.replace(new RegExp("\\{" + i + "\\}", "g"), _437[i]);
                        }
                    }
                    _432(opts.invalidMessage || _438);
                    if (_430.validating) {
                        _426(_42f);
                    }
                    return false;
                }
            }
            return true;
        }
        box.removeClass("validatebox-invalid");
        _425(_42f);
        if (opts.novalidate || box.is(":disabled")) {
            return true;
        }
        if (opts.required) {
            if (_431 == "") {
                box.addClass("validatebox-invalid");
                _432(opts.missingMessage);
                if (_430.validating) {
                    _426(_42f);
                }
                return false;
            }
        }
        if (opts.validType) {
            if ($.isArray(opts.validType)) {
                for (var i = 0; i < opts.validType.length; i++) {
                    if (!_433(opts.validType[i])) {
                        return false;
                    }
                }
            } else {
                if (typeof opts.validType == "string") {
                    if (!_433(opts.validType)) {
                        return false;
                    }
                } else {
                    for (var _439 in opts.validType) {
                        var _43a = opts.validType[_439];
                        if (!_433(_439, _43a)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
    function setDisabled(e, t) {
        var i = $.data(e, "validatebox").options;
        if (t) {
            i.disabled = true;
            $(e).attr("disabled", true);
        } else {
            i.disabled = false;
            $(e).removeAttr("disabled");
        }
    }
    function _43b(e, t) {
        var i = $.data(e, "validatebox").options;
        if (t != undefined) {
            i.novalidate = t;
        }
        if (i.novalidate) {
            $(e).removeClass("validatebox-invalid");
            _425(e);
        }
        if (i.placeholder != "") {
            $(e).attr("placeholder", $.hisui.getTrans(i.placeholder));
        }
        _422(e);
    }
    $.fn.validatebox = function(e, t) {
        if (typeof e == "string") {
            return $.fn.validatebox.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "validatebox");
            if (t) {
                $.extend(t.options, e);
            } else {
                init(this);
                $.data(this, "validatebox", {
                    options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), e)
                });
            }
            setDisabled(this, $.data(this, "validatebox").options.disabled);
            _43b(this);
            _42e(this);
        });
    };
    $.fn.validatebox.methods = {
        options: function(e) {
            return $.data(e[0], "validatebox").options;
        },
        destroy: function(e) {
            return e.each(function() {
                _41f(this);
            });
        },
        validate: function(e) {
            return e.each(function() {
                _42e(this);
            });
        },
        isValid: function(e) {
            return _42e(e[0]);
        },
        enableValidation: function(e) {
            return e.each(function() {
                _43b(this, false);
            });
        },
        disableValidation: function(e) {
            return e.each(function() {
                _43b(this, true);
            });
        },
        setDisabled: function(e, t) {
            return e.each(function() {
                setDisabled(this, t);
            });
        }
    };
    $.fn.validatebox.parseOptions = function(e) {
        var t = $(e);
        return $.extend({}, $.parser.parseOptions(e, [ "disabled", "placeholder", "validType", "missingMessage", "invalidMessage", "tipPosition", {
            delay: "number",
            deltaX: "number"
        } ]), {
            required: t.attr("required") ? true : undefined,
            novalidate: t.attr("novalidate") != undefined ? true : undefined
        });
    };
    $.fn.validatebox.defaults = {
        disabled: false,
        placeholder: "",
        required: false,
        validType: null,
        validParams: null,
        delay: 200,
        missingMessage: "This field is required.",
        invalidMessage: null,
        tipPosition: "right",
        deltaX: 0,
        novalidate: false,
        tipOptions: {
            showEvent: "none",
            hideEvent: "none",
            showDelay: 0,
            hideDelay: 0,
            zIndex: "",
            onShow: function() {
                $(this).tooltip("tip").css({
                    color: "#000",
                    borderColor: "#CC9933",
                    backgroundColor: "#FFFFCC"
                });
            },
            onHide: function() {
                $(this).tooltip("destroy");
            }
        },
        rules: {
            email: {
                validator: function(e) {
                    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(e);
                },
                message: "Please enter a valid email address."
            },
            url: {
                validator: function(e) {
                    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e);
                },
                message: "Please enter a valid URL."
            },
            length: {
                validator: function(e, t) {
                    var i = $.trim(e).length;
                    return i >= t[0] && i <= t[1];
                },
                message: "Please enter a value between {0} and {1}."
            },
            remote: {
                validator: function(e, t) {
                    var i = {};
                    i[t[1]] = e;
                    var a = $.ajax({
                        url: t[0],
                        dataType: "json",
                        data: i,
                        async: false,
                        cache: false,
                        type: "post"
                    }).responseText;
                    return a == "true";
                },
                message: "Please fix this field."
            },
            idcard: {
                validator: function(e) {
                    var t = $.data(this, "validatebox");
                    var i = t.options;
                    var a = {
                        11: "1",
                        12: "1",
                        13: "1",
                        14: "1",
                        15: "1",
                        21: "1",
                        22: "1",
                        23: "1",
                        31: "1",
                        32: "1",
                        33: "1",
                        34: "1",
                        35: "1",
                        36: "1",
                        37: "1",
                        41: "1",
                        42: "1",
                        43: "1",
                        44: "1",
                        45: "1",
                        46: "1",
                        50: "1",
                        51: "1",
                        52: "1",
                        53: "1",
                        54: "1 ",
                        61: "1",
                        62: "1",
                        63: "1",
                        64: "1",
                        65: "1",
                        71: "1",
                        81: "1",
                        82: "1",
                        91: "1"
                    };
                    var n = true;
                    if (!e || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e)) {
                        if (i.rules.idcard.formattermessage) i.rules.idcard.message = i.rules.idcard.formattermessage;
                        n = false;
                    } else if (!a[e.substr(0, 2)]) {
                        if (i.rules.idcard.addrmessage) i.rules.idcard.message = i.rules.idcard.addrmessage;
                        n = false;
                    } else {
                        if (e.length == 18) {
                            e = e.split("");
                            var r = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                            var o = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ];
                            var s = 0;
                            var l = 0;
                            var d = 0;
                            for (var c = 0; c < 17; c++) {
                                l = e[c];
                                d = r[c];
                                s += l * d;
                            }
                            var f = o[s % 11];
                            if (o[s % 11] != e[17]) {
                                if (i.rules.idcard.paritymessage) i.rules.idcard.message = i.rules.idcard.paritymessage;
                                n = false;
                            }
                        }
                    }
                    return n;
                },
                message: "Please enter a valid ID card."
            },
            mobilephone: {
                validator: function(e) {
                    var t = function(e) {
                        return e.length == 11 && /^1[3|4|5|8][0-9]\d{8}$/.test(e);
                    };
                    var i = false;
                    i = t(e);
                    if (e.length == 12 && e.substr(0, 1) == 0) {
                        var a = e.substr(1, 11);
                        if (t(a)) {
                            $(this).val(a);
                            i = true;
                        }
                    }
                    return i;
                },
                message: "Please enter a valid mobile phone."
            }
        }
    };
})(jQuery);

(function(e) {
    function t(t, i) {
        i = i || {};
        var a = {};
        if (i.onSubmit) {
            if (i.onSubmit.call(t, a) == false) {
                return;
            }
        }
        var n = e(t);
        if (i.url) {
            n.attr("action", i.url);
        }
        var r = "hisui_frame_" + new Date().getTime();
        var o = e("<iframe id=" + r + " name=" + r + "></iframe>").attr("src", window.ActiveXObject ? "javascript:false" : "about:blank").css({
            position: "absolute",
            top: -1e3,
            left: -1e3
        });
        var s = n.attr("target"), l = n.attr("action");
        n.attr("target", r);
        var d = e();
        try {
            o.appendTo("body");
            o.bind("load", p);
            for (var c in a) {
                var f = e('<input type="hidden" name="' + c + '">').val(a[c]).appendTo(n);
                d = d.add(f);
            }
            u();
            n[0].submit();
        } finally {
            n.attr("action", l);
            s ? n.attr("target", s) : n.removeAttr("target");
            d.remove();
        }
        function u() {
            var t = e("#" + r);
            if (!t.length) {
                return;
            }
            try {
                var i = t.contents()[0].readyState;
                if (i && i.toLowerCase() == "uninitialized") {
                    setTimeout(u, 100);
                }
            } catch (a) {
                p();
            }
        }
        var h = 10;
        function p() {
            var t = e("#" + r);
            if (!t.length) {
                return;
            }
            t.unbind();
            var a = "";
            try {
                var n = t.contents().find("body");
                a = n.html();
                if (a == "") {
                    if (--h) {
                        setTimeout(p, 100);
                        return;
                    }
                }
                var o = n.find(">textarea");
                if (o.length) {
                    a = o.val();
                } else {
                    var s = n.find(">pre");
                    if (s.length) {
                        a = s.html();
                    }
                }
            } catch (l) {}
            if (i.success) {
                i.success(a);
            }
            setTimeout(function() {
                t.unbind();
                t.remove();
            }, 100);
        }
    }
    function i(t, i) {
        if (!e.data(t, "form")) {
            e.data(t, "form", {
                options: e.extend({}, e.fn.form.defaults)
            });
        }
        var a = e.data(t, "form").options;
        if (typeof i == "string") {
            var n = {};
            if (a.onBeforeLoad.call(t, n) == false) {
                return;
            }
            e.ajax({
                url: i,
                data: n,
                dataType: "json",
                success: function(e) {
                    r(e);
                },
                error: function() {
                    a.onLoadError.apply(t, arguments);
                }
            });
        } else {
            r(i);
        }
        function r(i) {
            var n = e(t);
            for (var r in i) {
                var c = i[r];
                var f = s(r, c);
                if (!f.length) {
                    var u = l(r, c);
                    if (!u) {
                        e('input[name="' + r + '"]', n).val(c);
                        e('textarea[name="' + r + '"]', n).val(c);
                        e('select[name="' + r + '"]', n).val(c);
                    }
                }
                d(r, c);
            }
            a.onLoadSuccess.call(t, i);
            o(t);
        }
        function s(i, a) {
            var n = e(t).find('input[name="' + i + '"][type=radio], input[name="' + i + '"][type=checkbox]');
            n._propAttr("checked", false);
            n.each(function() {
                var t = e(this);
                if (t.val() == String(a) || e.inArray(t.val(), e.isArray(a) ? a : [ a ]) >= 0) {
                    t._propAttr("checked", true);
                }
            });
            return n;
        }
        function l(i, a) {
            var n = 0;
            var r = [ "numberbox", "slider" ];
            for (var o = 0; o < r.length; o++) {
                var s = r[o];
                var l = e(t).find("input[" + s + 'Name="' + i + '"]');
                if (l.length) {
                    l[s]("setValue", a);
                    n += l.length;
                }
            }
            return n;
        }
        function d(i, a) {
            var n = e(t);
            var r = [ "combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo" ];
            var o = n.find('[comboName="' + i + '"]');
            if (o.length) {
                for (var s = 0; s < r.length; s++) {
                    var l = r[s];
                    if (o.hasClass(l + "-f")) {
                        if (o[l]("options").multiple) {
                            o[l]("setValues", a);
                        } else {
                            o[l]("setValue", a);
                        }
                        return;
                    }
                }
            }
        }
    }
    function a(t) {
        e("input,select,textarea", t).each(function() {
            var t = this.type, i = this.tagName.toLowerCase();
            if (t == "text" || t == "hidden" || t == "password" || i == "textarea") {
                this.value = "";
            } else {
                if (t == "file") {
                    var a = e(this);
                    var n = a.clone().val("");
                    n.insertAfter(a);
                    if (a.data("validatebox")) {
                        a.validatebox("destroy");
                        n.validatebox();
                    } else {
                        a.remove();
                    }
                } else {
                    if (t == "checkbox" || t == "radio") {
                        this.checked = false;
                    } else {
                        if (i == "select") {
                            this.selectedIndex = -1;
                        }
                    }
                }
            }
        });
        var i = e(t);
        var a = [ "combo", "combobox", "combotree", "combogrid", "slider", "radio", "checkbox" ];
        for (var n = 0; n < a.length; n++) {
            var r = a[n];
            var s = i.find("." + r + "-f");
            if (s.length && s[r]) {
                s[r]("clear");
            }
        }
        o(t);
    }
    function n(t) {
        t.reset();
        var i = e(t);
        var a = [ "combo", "combobox", "combotree", "combogrid", "datebox", "datetimebox", "spinner", "timespinner", "numberbox", "numberspinner", "slider", "radio", "checkbox" ];
        for (var n = 0; n < a.length; n++) {
            var r = a[n];
            var s = i.find("." + r + "-f");
            if (s.length && s[r]) {
                s[r]("reset");
            }
        }
        o(t);
    }
    function r(i) {
        var a = e.data(i, "form").options;
        var n = e(i);
        n.unbind(".form").bind("submit.form", function() {
            setTimeout(function() {
                t(i, a);
            }, 0);
            return false;
        });
    }
    function o(t) {
        if (e.fn.validatebox) {
            var i = e(t);
            i.find(".validatebox-text:not(:disabled)").validatebox("validate");
            var a = i.find(".validatebox-invalid");
            a.filter(":not(:disabled):first").focus();
            return a.length == 0;
        }
        return true;
    }
    function s(t, i) {
        e(t).find(".validatebox-text:not(:disabled)").validatebox(i ? "disableValidation" : "enableValidation");
    }
    e.fn.form = function(t, i) {
        if (typeof t == "string") {
            return e.fn.form.methods[t](this, i);
        }
        t = t || {};
        return this.each(function() {
            if (!e.data(this, "form")) {
                e.data(this, "form", {
                    options: e.extend({}, e.fn.form.defaults, t)
                });
            }
            r(this);
        });
    };
    e.fn.form.methods = {
        submit: function(i, a) {
            return i.each(function() {
                var i = e.extend({}, e.fn.form.defaults, e.data(this, "form") ? e.data(this, "form").options : {}, a || {});
                t(this, i);
            });
        },
        load: function(e, t) {
            return e.each(function() {
                i(this, t);
            });
        },
        clear: function(e) {
            return e.each(function() {
                a(this);
            });
        },
        reset: function(e) {
            return e.each(function() {
                n(this);
            });
        },
        validate: function(e) {
            return o(e[0]);
        },
        disableValidation: function(e) {
            return e.each(function() {
                s(this, true);
            });
        },
        enableValidation: function(e) {
            return e.each(function() {
                s(this, false);
            });
        }
    };
    e.fn.form.defaults = {
        url: null,
        onSubmit: function(t) {
            return e(this).form("validate");
        },
        success: function(e) {},
        onBeforeLoad: function(e) {},
        onLoadSuccess: function(e) {},
        onLoadError: function() {}
    };
})(jQuery);

(function(e) {
    function t(t) {
        e(t).addClass("numberbox numberbox-f");
        var i = e('<input type="hidden">').insertAfter(t);
        var a = e(t).attr("name");
        if (a) {
            i.attr("name", a);
            e(t).removeAttr("name").attr("numberboxName", a);
        }
        return i;
    }
    function i(t) {
        var i = e.data(t, "numberbox").options;
        var a = i.onChange;
        i.onChange = function() {};
        r(t, i.parser.call(t, i.value));
        i.onChange = a;
        i.originalValue = n(t);
    }
    function a(t, i) {
        var a = e.data(t, "numberbox").options;
        if (i) {
            a.width = i;
        }
        var n = e(t);
        var r = e('<div style="display:none"></div>').insertBefore(n);
        n.appendTo("body");
        if (isNaN(a.width)) {
            a.width = n.outerWidth();
        }
        n._outerWidth(a.width)._outerHeight(a.height);
        n.css("line-height", n.height() + "px");
        n.insertAfter(r);
        r.remove();
    }
    function n(t) {
        return e.data(t, "numberbox").field.val();
    }
    function r(t, i) {
        var a = e.data(t, "numberbox");
        var r = a.options;
        var o = n(t);
        i = r.parser.call(t, i);
        r.value = i;
        a.field.val(i);
        e(t).val(r.formatter.call(t, i));
        if (o != i) {
            r.onChange.call(t, i, o);
        }
    }
    function o(t) {
        var i = e.data(t, "numberbox").options;
        e(t).unbind(".numberbox").bind("keypress.numberbox", function(e) {
            return i.filter.call(t, e);
        }).bind("blur.numberbox", function() {
            r(t, e(this).val());
            e(this).val(i.formatter.call(t, n(t)));
        }).bind("focus.numberbox", function() {
            var a = n(t);
            if (a != i.parser.call(t, e(this).val())) {
                e(this).val(i.formatter.call(t, a));
            }
        });
        if (i.isKeyupChange) {
            var a = function(a) {
                r(t, e(this).val());
                e(this).val(i.formatter.call(t, n(t)));
            };
            var o = a;
            if (i.keyupChangeDelay > 0) {
                o = e.hisui.debounce(a, i.keyupChangeDelay);
            }
            e(t).bind("keyup.numberbox", function(e) {
                o.call(this, e);
            });
        }
    }
    function s(t) {
        if (e.fn.validatebox) {
            var i = e.data(t, "numberbox").options;
            if (!i.validType) {
                i.validType = [];
            }
            if ("string" == typeof i.validType) i.validType = [ i.validType ];
            if (typeof i.min == "number") i.validType.push("min[" + i.min + "]");
            if (typeof i.max == "number") i.validType.push("max[" + i.max + "]");
            e(t).validatebox(i);
        }
    }
    function l(t, i) {
        var a = e.data(t, "numberbox").options;
        if (i) {
            a.disabled = true;
            e(t).attr("disabled", true);
        } else {
            a.disabled = false;
            e(t).removeAttr("disabled");
        }
    }
    e.fn.numberbox = function(n, r) {
        if (typeof n == "string") {
            var d = e.fn.numberbox.methods[n];
            if (d) {
                return d(this, r);
            } else {
                return this.validatebox(n, r);
            }
        }
        n = n || {};
        return this.each(function() {
            var r = e.data(this, "numberbox");
            if (r) {
                e.extend(r.options, n);
            } else {
                r = e.data(this, "numberbox", {
                    options: e.extend({}, e.fn.numberbox.defaults, e.fn.numberbox.parseOptions(this), n),
                    field: t(this)
                });
                e(this).removeAttr("disabled");
                e(this).css({
                    imeMode: "disabled"
                });
            }
            l(this, r.options.disabled);
            a(this);
            o(this);
            s(this);
            i(this);
        });
    };
    e.fn.numberbox.methods = {
        options: function(t) {
            return e.data(t[0], "numberbox").options;
        },
        destroy: function(t) {
            return t.each(function() {
                e.data(this, "numberbox").field.remove();
                e(this).validatebox("destroy");
                e(this).remove();
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                a(this, t);
            });
        },
        disable: function(e) {
            return e.each(function() {
                l(this, true);
            });
        },
        enable: function(e) {
            return e.each(function() {
                l(this, false);
            });
        },
        fix: function(t) {
            return t.each(function() {
                r(this, e(this).val());
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        getValue: function(e) {
            return n(e[0]);
        },
        clear: function(t) {
            return t.each(function() {
                var t = e.data(this, "numberbox");
                t.field.val("");
                e(this).val("");
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).numberbox("options");
                e(this).numberbox("setValue", t.originalValue);
            });
        }
    };
    e.fn.numberbox.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.validatebox.parseOptions(t), e.parser.parseOptions(t, [ "width", "height", "decimalSeparator", "groupSeparator", "suffix", {
            min: "number",
            max: "number",
            precision: "number"
        } ]), {
            prefix: i.attr("prefix") ? i.attr("prefix") : undefined,
            disabled: i.attr("disabled") ? true : undefined,
            value: i.val() || undefined
        });
    };
    e.fn.numberbox.defaults = e.extend({}, e.fn.validatebox.defaults, {
        forcePrecisionZoer: true,
        fix: true,
        isKeyupChange: false,
        keyupChangeDelay: 0,
        width: "auto",
        height: 30,
        disabled: false,
        value: "",
        min: null,
        max: null,
        precision: 0,
        decimalSeparator: ".",
        groupSeparator: "",
        prefix: "",
        suffix: "",
        filter: function(t) {
            var i = e(this).numberbox("options");
            if (t.which == 45) {
                return e(this).val().indexOf("-") == -1 ? true : false;
            }
            var a = String.fromCharCode(t.which);
            if (a == i.decimalSeparator) {
                return e(this).val().indexOf(a) == -1 ? true : false;
            } else {
                if (a == i.groupSeparator) {
                    return true;
                } else {
                    if (t.which >= 48 && t.which <= 57 && t.ctrlKey == false && t.shiftKey == false || t.which == 0 || t.which == 8) {
                        return true;
                    } else {
                        if (t.ctrlKey == true && (t.which == 99 || t.which == 118)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        },
        formatter: function(t) {
            if (!t) {
                return t;
            }
            t = t + "";
            var i = e(this).numberbox("options");
            var a = t, n = "";
            var r = t.indexOf(".");
            if (r >= 0) {
                a = t.substring(0, r);
                n = t.substring(r + 1, t.length);
            }
            if (i.groupSeparator) {
                var o = /(\d+)(\d{3})/;
                while (o.test(a)) {
                    a = a.replace(o, "$1" + i.groupSeparator + "$2");
                }
            }
            if (n) {
                return i.prefix + a + i.decimalSeparator + n + i.suffix;
            } else {
                return i.prefix + a + i.suffix;
            }
        },
        parser: function(t) {
            t = t + "";
            var i = e(this).numberbox("options");
            if (parseFloat(t) != t) {
                if (i.prefix) {
                    t = e.trim(t.replace(new RegExp("\\" + e.trim(i.prefix), "g"), ""));
                }
                if (i.suffix) {
                    t = e.trim(t.replace(new RegExp("\\" + e.trim(i.suffix), "g"), ""));
                }
                if (i.groupSeparator) {
                    t = e.trim(t.replace(new RegExp("\\" + i.groupSeparator, "g"), ""));
                }
                if (i.decimalSeparator) {
                    t = e.trim(t.replace(new RegExp("\\" + i.decimalSeparator, "g"), "."));
                }
                t = t.replace(/\s/g, "");
            }
            var a = o(parseFloat(t), i.precision, i.forcePrecisionZoer);
            if (isNaN(a)) {
                a = "";
            } else {
                if (i.fix) {
                    if (typeof i.min == "number" && a < i.min) {
                        a = o(i.min, i.precision, i.forcePrecisionZoer);
                    } else {
                        if (typeof i.max == "number" && a > i.max) {
                            a = o(i.max, i.precision, i.forcePrecisionZoer);
                        }
                    }
                } else {
                    var n = e.data(this, "validatebox").options.validType;
                    if (!n) e.data(this, "validatebox").options.validType = [];
                    if ("string" == typeof n) e.data(this, "validatebox").options.validType = [ n ];
                    var r = e.data(this, "validatebox").options.validType;
                    if (typeof i.min == "number") r.push("min[" + i.min + "]");
                    if (typeof i.max == "number") r.push("max[" + i.max + "]");
                    e(this).validatebox("validate");
                }
            }
            function o(e, t, i) {
                if (!i && ("" + e).indexOf(".") == -1) {
                    return e;
                }
                if (!i && ("" + e).indexOf(".") > -1) {
                    return e.toFixed(t).replace(/(0*$)/g, "");
                }
                return e.toFixed(t);
            }
            return a;
        },
        onChange: function(e, t) {}
    });
    e.extend(e.fn.numberbox.defaults.rules, {
        min: {
            validator: function(e, t) {
                if (parseFloat(t[0]) > parseFloat(e)) return false;
                return true;
            },
            message: "Please enter a value greater than {0}"
        },
        max: {
            validator: function(e, t) {
                if (parseFloat(t[0]) < parseFloat(e)) return false;
                return true;
            },
            message: "Please enter a value less than {0}"
        }
    });
})(jQuery);

(function(e) {
    function t(t) {
        var i = e.data(t, "calendar").options;
        var a = e(t);
        i.fit ? e.extend(i, a._fit()) : a._fit(false);
        var n = a.find(".calendar-header");
        a._outerWidth(i.width);
        a._outerHeight(i.height);
        a.find(".calendar-body")._outerHeight(a.height() - n._outerHeight());
    }
    function i(i) {
        e(i).addClass("calendar").html('<div class="calendar-header">' + '<div class="calendar-prevmonth"></div>' + '<div class="calendar-nextmonth"></div>' + '<div class="calendar-prevyear"></div>' + '<div class="calendar-nextyear"></div>' + '<div class="calendar-title">' + "<span>Aprial 2010</span>" + "</div>" + "</div>" + '<div class="calendar-body">' + '<div class="calendar-menu">' + '<div class="calendar-menu-year-inner">' + '<span class="calendar-menu-prev"></span>' + '<span><input class="calendar-menu-year" type="text"></input></span>' + '<span class="calendar-menu-next"></span>' + "</div>" + '<div class="calendar-menu-month-inner">' + "</div>" + "</div>" + "</div>");
        e(i).find(".calendar-title span").hover(function() {
            e(this).addClass("calendar-menu-hover");
        }, function() {
            e(this).removeClass("calendar-menu-hover");
        }).click(function() {
            var t = e(i).find(".calendar-menu");
            if (t.is(":visible")) {
                t.hide();
            } else {
                r(i);
            }
        });
        e(".calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear", i).hover(function() {
            e(this).addClass("calendar-nav-hover");
        }, function() {
            e(this).removeClass("calendar-nav-hover");
        });
        e(i).find(".calendar-nextmonth").click(function() {
            a(i, 1);
        });
        e(i).find(".calendar-prevmonth").click(function() {
            a(i, -1);
        });
        e(i).find(".calendar-nextyear").click(function() {
            n(i, 1);
        });
        e(i).find(".calendar-prevyear").click(function() {
            n(i, -1);
        });
        e(i).bind("_resize", function() {
            var a = e.data(i, "calendar").options;
            if (a.fit == true) {
                t(i);
            }
            return false;
        });
    }
    function a(t, i) {
        var a = e.data(t, "calendar").options;
        a.month += i;
        if (a.month > 12) {
            a.year++;
            a.month = 1;
        } else {
            if (a.month < 1) {
                a.year--;
                a.month = 12;
            }
        }
        s(t);
        var n = e(t).find(".calendar-menu-month-inner");
        n.find("td.calendar-selected").removeClass("calendar-selected");
        n.find("td:eq(" + (a.month - 1) + ")").addClass("calendar-selected");
    }
    function n(t, i) {
        var a = e.data(t, "calendar").options;
        a.year += i;
        s(t);
        var n = e(t).find(".calendar-menu-year");
        n.val(a.year);
    }
    function r(t) {
        var i = e.data(t, "calendar").options;
        e(t).find(".calendar-menu").show();
        if (e(t).find(".calendar-menu-month-inner").is(":empty")) {
            e(t).find(".calendar-menu-month-inner").empty();
            var a = e('<table class="calendar-mtable"></table>').appendTo(e(t).find(".calendar-menu-month-inner"));
            var n = 0;
            for (var r = 0; r < 3; r++) {
                var o = e("<tr></tr>").appendTo(a);
                for (var l = 0; l < 4; l++) {
                    e('<td class="calendar-menu-month"></td>').html(i.months[n++]).attr("abbr", n).appendTo(o);
                }
            }
            e(t).find(".calendar-menu-prev,.calendar-menu-next").hover(function() {
                e(this).addClass("calendar-menu-hover");
            }, function() {
                e(this).removeClass("calendar-menu-hover");
            });
            e(t).find(".calendar-menu-next").click(function() {
                var i = e(t).find(".calendar-menu-year");
                if (!isNaN(i.val())) {
                    i.val(parseInt(i.val()) + 1);
                    d();
                }
            });
            e(t).find(".calendar-menu-prev").click(function() {
                var i = e(t).find(".calendar-menu-year");
                if (!isNaN(i.val())) {
                    i.val(parseInt(i.val() - 1));
                    d();
                }
            });
            e(t).find(".calendar-menu-year").keypress(function(e) {
                if (e.keyCode == 13) {
                    d(true);
                }
            });
            e(t).find(".calendar-menu-month").hover(function() {
                e(this).addClass("calendar-menu-hover");
            }, function() {
                e(this).removeClass("calendar-menu-hover");
            }).click(function() {
                var i = e(t).find(".calendar-menu");
                i.find(".calendar-selected").removeClass("calendar-selected");
                e(this).addClass("calendar-selected");
                d(true);
            });
        }
        function d(a) {
            var n = e(t).find(".calendar-menu");
            var r = n.find(".calendar-menu-year").val();
            var o = n.find(".calendar-selected").attr("abbr");
            if (!isNaN(r)) {
                i.year = parseInt(r);
                i.month = parseInt(o);
                s(t);
            }
            if (a) {
                n.hide();
            }
        }
        var c = e(t).find(".calendar-body");
        var f = e(t).find(".calendar-menu");
        var u = f.find(".calendar-menu-year-inner");
        var h = f.find(".calendar-menu-month-inner");
        u.find("input").val(i.year).focus();
        h.find("td.calendar-selected").removeClass("calendar-selected");
        h.find("td:eq(" + (i.month - 1) + ")").addClass("calendar-selected");
        f._outerWidth(c._outerWidth());
        f._outerHeight(c._outerHeight());
        h._outerHeight(f.height() - u._outerHeight());
    }
    function o(t, i, a) {
        var n = e.data(t, "calendar").options;
        var r = [];
        var o = new Date(i, a, 0).getDate();
        for (var s = 1; s <= o; s++) {
            r.push([ i, a, s ]);
        }
        var l = [], d = [];
        var c = -1;
        while (r.length > 0) {
            var f = r.shift();
            d.push(f);
            var u = new Date(f[0], f[1] - 1, f[2]).getDay();
            if (c == u) {
                u = 0;
            } else {
                if (u == (n.firstDay == 0 ? 7 : n.firstDay) - 1) {
                    l.push(d);
                    d = [];
                }
            }
            c = u;
        }
        if (d.length) {
            l.push(d);
        }
        var h = l[0];
        if (h.length < 7) {
            while (h.length < 7) {
                var p = h[0];
                var f = new Date(p[0], p[1] - 1, p[2] - 1);
                h.unshift([ f.getFullYear(), f.getMonth() + 1, f.getDate() ]);
            }
        } else {
            var p = h[0];
            var d = [];
            for (var s = 1; s <= 7; s++) {
                var f = new Date(p[0], p[1] - 1, p[2] - s);
                d.unshift([ f.getFullYear(), f.getMonth() + 1, f.getDate() ]);
            }
            l.unshift(d);
        }
        var v = l[l.length - 1];
        while (v.length < 7) {
            var g = v[v.length - 1];
            var f = new Date(g[0], g[1] - 1, g[2] + 1);
            v.push([ f.getFullYear(), f.getMonth() + 1, f.getDate() ]);
        }
        if (l.length < 6) {
            var g = v[v.length - 1];
            var d = [];
            for (var s = 1; s <= 7; s++) {
                var f = new Date(g[0], g[1] - 1, g[2] + s);
                d.push([ f.getFullYear(), f.getMonth() + 1, f.getDate() ]);
            }
            l.push(d);
        }
        return l;
    }
    function s(t) {
        var i = e.data(t, "calendar").options;
        if (i.current && !i.validator.call(t, i.current)) {
            i.current = null;
        }
        var a = new Date();
        var n = a.getFullYear() + "," + (a.getMonth() + 1) + "," + a.getDate();
        var r = i.current ? i.current.getFullYear() + "," + (i.current.getMonth() + 1) + "," + i.current.getDate() : "";
        var s = 6 - i.firstDay;
        var l = s + 1;
        if (s >= 7) {
            s -= 7;
        }
        if (l >= 7) {
            l -= 7;
        }
        e(t).find(".calendar-title span").html(i.months[i.month - 1] + " " + i.year);
        var d = e(t).find("div.calendar-body");
        d.children("table").remove();
        var c = [ '<table class="calendar-dtable" cellspacing="0" cellpadding="0" border="0">' ];
        c.push("<thead><tr>");
        for (var f = i.firstDay; f < i.weeks.length; f++) {
            c.push("<th>" + i.weeks[f] + "</th>");
        }
        for (var f = 0; f < i.firstDay; f++) {
            c.push("<th>" + i.weeks[f] + "</th>");
        }
        c.push("</tr></thead>");
        c.push("<tbody>");
        var u = o(t, i.year, i.month);
        for (var f = 0; f < u.length; f++) {
            var h = u[f];
            var p = "";
            if (f == 0) {
                p = "calendar-first";
            } else {
                if (f == u.length - 1) {
                    p = "calendar-last";
                }
            }
            c.push('<tr class="' + p + '">');
            for (var v = 0; v < h.length; v++) {
                var g = h[v];
                var b = g[0] + "," + g[1] + "," + g[2];
                var m = new Date(g[0], parseInt(g[1]) - 1, g[2]);
                var x = i.formatter.call(t, m);
                var C = i.styler.call(t, m);
                var Y = "";
                var w = "";
                if (typeof C == "string") {
                    w = C;
                } else {
                    if (C) {
                        Y = C["class"] || "";
                        w = C["style"] || "";
                    }
                }
                var p = "calendar-day";
                if (!(i.year == g[0] && i.month == g[1])) {
                    p += " calendar-other-month";
                }
                if (b == n) {
                    p += " calendar-today";
                }
                if (b == r) {
                    p += " calendar-selected";
                }
                if (v == s) {
                    p += " calendar-saturday";
                } else {
                    if (v == l) {
                        p += " calendar-sunday";
                    }
                }
                if (v == 0) {
                    p += " calendar-first";
                } else {
                    if (v == h.length - 1) {
                        p += " calendar-last";
                    }
                }
                p += " " + Y;
                if (!i.validator.call(t, m)) {
                    p += " calendar-disabled";
                }
                c.push('<td class="' + p + '" abbr="' + b + '" style="' + w + '">' + x + "</td>");
            }
            c.push("</tr>");
        }
        c.push("</tbody>");
        c.push("</table>");
        d.append(c.join(""));
        var S = d.children("table.calendar-dtable").prependTo(d);
        S.find("td.calendar-day:not(.calendar-disabled)").hover(function() {
            e(this).addClass("calendar-hover");
        }, function() {
            e(this).removeClass("calendar-hover");
        }).click(function() {
            var a = i.current;
            S.find(".calendar-selected").removeClass("calendar-selected");
            e(this).addClass("calendar-selected");
            var n = e(this).attr("abbr").split(",");
            i.current = new Date(n[0], parseInt(n[1]) - 1, n[2]);
            i.onSelect.call(t, i.current);
            if (!a || a.getTime() != i.current.getTime()) {
                i.onChange.call(t, i.current, a);
            }
        }).bind("dblclick.calendar", function() {
            var a = i.current;
            S.find(".calendar-selected").removeClass("calendar-selected");
            e(this).addClass("calendar-selected");
            var n = e(this).attr("abbr").split(",");
            i.current = new Date(n[0], parseInt(n[1]) - 1, n[2]);
            i.onSelect.call(t, i.current);
            if (!a || a.getTime() != i.current.getTime()) {
                i.onChange.call(t, i.current, a);
            }
            i.onDblClick.call(t, i.current);
        });
    }
    e.fn.calendar = function(a, n) {
        if (typeof a == "string") {
            return e.fn.calendar.methods[a](this, n);
        }
        a = a || {};
        return this.each(function() {
            var n = e.data(this, "calendar");
            if (n) {
                e.extend(n.options, a);
            } else {
                n = e.data(this, "calendar", {
                    options: e.extend({}, e.fn.calendar.defaults, e.fn.calendar.parseOptions(this), a)
                });
                i(this);
            }
            if (n.options.border == false) {
                e(this).addClass("calendar-noborder");
            }
            t(this);
            s(this);
            e(this).find("div.calendar-menu").hide();
        });
    };
    e.fn.calendar.methods = {
        options: function(t) {
            return e.data(t[0], "calendar").options;
        },
        resize: function(e) {
            return e.each(function() {
                t(this);
            });
        },
        moveTo: function(t, i) {
            return t.each(function() {
                var t = e(this).calendar("options");
                if (t.validator.call(this, i)) {
                    var a = t.current;
                    e(this).calendar({
                        year: i.getFullYear(),
                        month: i.getMonth() + 1,
                        current: i
                    });
                    if (!a || a.getTime() != i.getTime()) {
                        t.onChange.call(this, t.current, a);
                    }
                } else {
                    s(this);
                }
            });
        }
    };
    e.fn.calendar.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "width", "height", {
            firstDay: "number",
            fit: "boolean",
            border: "boolean"
        } ]));
    };
    e.fn.calendar.defaults = {
        width: 180,
        height: 180,
        fit: false,
        border: true,
        firstDay: 0,
        weeks: [ "S", "M", "T", "W", "T", "F", "S" ],
        months: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        current: function() {
            var e = new Date();
            return new Date(e.getFullYear(), e.getMonth(), e.getDate());
        }(),
        formatter: function(e) {
            return e.getDate();
        },
        styler: function(e) {
            return "";
        },
        validator: function(e) {
            return true;
        },
        onSelect: function(e) {},
        onChange: function(e, t) {},
        onDblClick: function(e) {}
    };
})(jQuery);

(function(e) {
    function t(t) {
        var i = e('<span class="spinner">' + '<span class="spinner-arrow">' + '<span class="spinner-arrow-up"></span>' + '<span class="spinner-arrow-down"></span>' + "</span>" + "</span>").insertAfter(t);
        e(t).addClass("spinner-text spinner-f").prependTo(i);
        return i;
    }
    function i(t, i) {
        var a = e.data(t, "spinner").options;
        var n = e.data(t, "spinner").spinner;
        if (i) {
            a.width = i;
        }
        var r = e('<div style="display:none"></div>').insertBefore(n);
        n.appendTo("body");
        if (isNaN(a.width)) {
            a.width = e(t).outerWidth();
        }
        var o = n.find(".spinner-arrow");
        n._outerWidth(a.width)._outerHeight(a.height);
        e(t)._outerWidth(n.width() - o.outerWidth());
        e(t).css({
            height: n.height() + "px",
            lineHeight: n.height() + "px"
        });
        o._outerHeight(n.height());
        o.find("span")._outerHeight(o.height() / 2);
        n.insertAfter(r);
        r.remove();
    }
    function a(t) {
        var i = e.data(t, "spinner").options;
        var a = e.data(t, "spinner").spinner;
        e(t).unbind(".spinner");
        a.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
        if (!i.disabled && !i.readonly) {
            a.find(".spinner-arrow-up").bind("mouseenter.spinner", function() {
                e(this).addClass("spinner-arrow-hover");
            }).bind("mouseleave.spinner", function() {
                e(this).removeClass("spinner-arrow-hover");
            }).bind("click.spinner", function() {
                i.spin.call(t, false);
                i.onSpinUp.call(t);
                e(t).validatebox("validate");
            });
            a.find(".spinner-arrow-down").bind("mouseenter.spinner", function() {
                e(this).addClass("spinner-arrow-hover");
            }).bind("mouseleave.spinner", function() {
                e(this).removeClass("spinner-arrow-hover");
            }).bind("click.spinner", function() {
                i.spin.call(t, true);
                i.onSpinDown.call(t);
                e(t).validatebox("validate");
            });
            e(t).bind("change.spinner", function() {
                e(this).spinner("setValue", e(this).val());
            });
            a.find(".spinner-text").unbind("keydown.spinner").bind("keydown.spinner", function(e) {
                if ("undefined" == typeof e.keyCode) {
                    return;
                }
                switch (e.keyCode) {
                  case 38:
                    i.keyHandler.up.call(t, e);
                    break;

                  case 40:
                    i.keyHandler.down.call(t, e);
                    break;

                  case 13:
                    e.preventDefault();
                    i.keyHandler.enter.call(t, e);
                    break;

                  default:
                    ;
                }
            });
        }
    }
    function n(t, i) {
        var a = e.data(t, "spinner").options;
        if (i) {
            a.disabled = true;
            e(t).attr("disabled", true);
            e.data(t, "spinner").spinner.addClass("disabled");
        } else {
            a.disabled = false;
            e(t).removeAttr("disabled");
            e.data(t, "spinner").spinner.removeClass("disabled");
        }
    }
    function r(t, i) {
        var a = e.data(t, "spinner");
        var n = a.options;
        n.readonly = i == undefined ? true : i;
        var r = n.readonly ? true : !n.editable;
        e(t).attr("readonly", r).css("cursor", r ? "pointer" : "");
    }
    e.fn.spinner = function(o, s) {
        if (typeof o == "string") {
            var l = e.fn.spinner.methods[o];
            if (l) {
                return l(this, s);
            } else {
                return this.validatebox(o, s);
            }
        }
        o = o || {};
        return this.each(function() {
            var s = e.data(this, "spinner");
            if (s) {
                e.extend(s.options, o);
            } else {
                s = e.data(this, "spinner", {
                    options: e.extend({}, e.fn.spinner.defaults, e.fn.spinner.parseOptions(this), o),
                    spinner: t(this)
                });
                e(this).removeAttr("disabled");
            }
            s.options.originalValue = s.options.value;
            e(this).val(s.options.value);
            n(this, s.options.disabled);
            r(this, s.options.readonly);
            if (true !== e(this).data("rendered")) i(this);
            e(this).validatebox(s.options);
            a(this);
            e(this).data("rendered", true);
        });
    };
    e.fn.spinner.methods = {
        options: function(t) {
            var i = e.data(t[0], "spinner").options;
            return e.extend(i, {
                value: t.val()
            });
        },
        destroy: function(t) {
            return t.each(function() {
                var t = e.data(this, "spinner").spinner;
                e(this).validatebox("destroy");
                t.remove();
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                i(this, t);
            });
        },
        enable: function(e) {
            return e.each(function() {
                n(this, false);
                a(this);
            });
        },
        disable: function(e) {
            return e.each(function() {
                n(this, true);
                a(this);
            });
        },
        readonly: function(e, t) {
            return e.each(function() {
                r(this, t);
                a(this);
            });
        },
        getValue: function(e) {
            return e.val();
        },
        setValue: function(t, i) {
            return t.each(function() {
                var t = e.data(this, "spinner").options;
                var a = t.value;
                t.value = i;
                e(this).val(i);
                if (a != i) {
                    t.onChange.call(this, i, a);
                }
            });
        },
        clear: function(t) {
            return t.each(function() {
                var t = e.data(this, "spinner").options;
                t.value = "";
                e(this).val("");
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).spinner("options");
                e(this).spinner("setValue", t.originalValue);
            });
        }
    };
    e.fn.spinner.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.validatebox.parseOptions(t), e.parser.parseOptions(t, [ "width", "height", "min", "max", {
            increment: "number",
            editable: "boolean"
        } ]), {
            value: i.val() || undefined,
            disabled: i.attr("disabled") ? true : undefined,
            readonly: i.attr("readonly") ? true : undefined
        });
    };
    e.fn.spinner.defaults = e.extend({}, e.fn.validatebox.defaults, {
        width: "auto",
        height: 30,
        deltaX: 19,
        value: "",
        min: null,
        max: null,
        increment: 1,
        editable: true,
        disabled: false,
        readonly: false,
        spin: function(e) {},
        onSpinUp: function() {},
        onSpinDown: function() {},
        onChange: function(e, t) {},
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            enter: function(e) {}
        }
    });
})(jQuery);

(function(e) {
    function t(t) {
        e(t).addClass("numberspinner-f");
        var i = e.data(t, "numberspinner").options;
        e(t).spinner(i).numberbox(e.extend({}, i, {
            width: "auto"
        }));
    }
    function i(t, i) {
        var a = e.data(t, "numberspinner").options;
        var n = parseFloat(e(t).numberbox("getValue") || a.value) || 0;
        if (i == true) {
            n -= a.increment;
        } else {
            n += a.increment;
        }
        e(t).numberbox("setValue", n);
    }
    e.fn.numberspinner = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.numberspinner.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.spinner(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "numberspinner");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "numberspinner", {
                    options: e.extend({}, e.fn.numberspinner.defaults, e.fn.numberspinner.parseOptions(this), i)
                });
            }
            t(this);
        });
    };
    e.fn.numberspinner.methods = {
        options: function(t) {
            var i = e.data(t[0], "numberspinner").options;
            return e.extend(i, {
                value: t.numberbox("getValue"),
                originalValue: t.numberbox("options").originalValue
            });
        },
        setValue: function(t, i) {
            return t.each(function() {
                e(this).numberbox("setValue", i);
            });
        },
        getValue: function(e) {
            return e.numberbox("getValue");
        },
        clear: function(t) {
            return t.each(function() {
                e(this).spinner("clear");
                e(this).numberbox("clear");
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).numberspinner("options");
                e(this).numberspinner("setValue", t.originalValue);
            });
        }
    };
    e.fn.numberspinner.parseOptions = function(t) {
        return e.extend({}, e.fn.spinner.parseOptions(t), e.fn.numberbox.parseOptions(t), {});
    };
    e.fn.numberspinner.defaults = e.extend({}, e.fn.spinner.defaults, e.fn.numberbox.defaults, {
        spin: function(e) {
            i(this, e);
        }
    });
})(jQuery);

(function(e) {
    function t(t) {
        var n = e.data(t, "timespinner").options;
        e(t).addClass("timespinner-f");
        e(t).spinner(n);
        e(t).unbind(".timespinner");
        e(t).bind("click.timespinner", function() {
            var e = 0;
            if (this.selectionStart != null) {
                e = this.selectionStart;
            } else {
                if (this.createTextRange) {
                    var r = t.createTextRange();
                    var o = document.selection.createRange();
                    o.setEndPoint("StartToStart", r);
                    e = o.text.length;
                }
            }
            delete this.selectionStartPersistent;
            n.highlight = i(e);
            a(t);
        }).bind("blur.timespinner", function() {
            this.selectionStartPersistent = this.selectionStart;
            o(t);
        }).bind("keydown.timespinner", function() {
            delete this.selectionStartPersistent;
        }).bind("dblclick.timespinner", function() {
            var i = 0, a = 10;
            if (t.selectionStart != null) {
                t.setSelectionRange(i, a);
            } else {
                if (t.createTextRange) {
                    var n = t.createTextRange();
                    n.collapse();
                    n.moveEnd("character", a);
                    n.moveStart("character", i);
                    n.select();
                }
            }
            e(t).focus();
        });
    }
    function i(e) {
        if (e >= 0 && e <= 2) {
            return 0;
        } else {
            if (e >= 3 && e <= 5) {
                return 1;
            } else {
                if (e >= 6 && e <= 8) {
                    return 2;
                }
            }
        }
        return 0;
    }
    function a(t) {
        var a = e.data(t, "timespinner").options;
        var n = 0, r = 0;
        if (t.selectionStart != null) {
            a.highlight = i(t.selectionStartPersistent !== undefined ? t.selectionStartPersistent : t.selectionStart);
        }
        if (a.highlight == 0) {
            n = 0;
            r = 2;
        } else {
            if (a.highlight == 1) {
                n = 3;
                r = 5;
            } else {
                if (a.highlight == 2) {
                    n = 6;
                    r = 8;
                }
            }
        }
        if (t.selectionStart != null) {
            t.setSelectionRange(n, r);
        } else {
            if (t.createTextRange) {
                var o = t.createTextRange();
                o.collapse();
                o.moveEnd("character", r);
                o.moveStart("character", n);
                o.select();
            }
        }
        e(t).focus();
    }
    function n(e) {
        var t = [];
        if (e) {
            e = e.replace(/\s/g, "");
            var i = /^([0-2][0-9]|[1-9])([0-6][0-9]|[1-9])([0-9]*)$/;
            var a = /^([0-2][0-9]|[1-9])$/;
            if (a.test(e)) {
                t = e.match(a);
                t.splice(0, 1);
            } else if (i.test(e)) {
                t = e.match(i);
                t.splice(0, 1);
            }
        }
        return t;
    }
    function r(t, i) {
        var a = e.data(t, "timespinner").options;
        if (!i) {
            return null;
        }
        var r = [];
        if (i.indexOf(a.separator) > -1) {
            r = i.split(a.separator);
            for (var o = 0; o < r.length; o++) {
                if (isNaN(r[o])) {
                    return null;
                }
            }
        } else {
            r = n(i);
        }
        while (r.length < 3) {
            r.push(0);
        }
        return new Date(1900, 0, 0, r[0], r[1], r[2]);
    }
    function o(t) {
        var i = e.data(t, "timespinner").options;
        var a = e(t).val();
        var n = r(t, a);
        if (!n) {
            i.value = "";
            e(t).spinner("setValue", "");
            return;
        }
        var o = r(t, i.min);
        var s = r(t, i.max);
        if (o && o > n) {
            n = o;
        }
        if (s && s < n) {
            n = s;
        }
        var l = [ c(n.getHours()), c(n.getMinutes()) ];
        if (i.showSeconds) {
            l.push(c(n.getSeconds()));
        }
        var d = l.join(i.separator);
        i.value = d;
        e(t).spinner("setValue", d);
        function c(e) {
            return (e < 10 ? "0" : "") + e;
        }
    }
    function s(t, i) {
        var n = e.data(t, "timespinner").options;
        var r = e(t).val();
        if (r == "") {
            r = [ 0, 0, 0 ].join(n.separator);
        }
        var s = r.split(n.separator);
        for (var l = 0; l < s.length; l++) {
            s[l] = parseInt(s[l], 10);
        }
        if (i == true) {
            if (n.minutesStep > 0 || n.hourStep > 0 || n.secondStep > 0) {
                if (n.highlight == 2) {
                    s[n.highlight] -= parseInt(n.secondStep, 10);
                }
                if (n.highlight == 1) {
                    s[n.highlight] -= parseInt(n.minutesStep, 10);
                }
                if (n.highlight == 0) {
                    s[n.highlight] -= parseInt(n.hourStep, 10);
                }
            } else {
                s[n.highlight] -= n.increment;
            }
        } else {
            if (n.minutesStep > 0 || n.hourStep > 0 || n.secondStep > 0) {
                if (n.highlight == 2) {
                    s[n.highlight] += parseInt(n.secondStep, 10);
                }
                if (n.highlight == 1) {
                    s[n.highlight] += parseInt(n.minutesStep, 10);
                }
                if (n.highlight == 0) {
                    s[n.highlight] += parseInt(n.hourStep, 10);
                }
            } else {
                s[n.highlight] += n.increment;
            }
        }
        var d = t.selectionStartPersistent !== undefined ? t.selectionStartPersistent : t.selectionStart;
        e(t).val(s.join(n.separator));
        o(t);
        t.selectionStart = d;
        a(t);
    }
    e.fn.timespinner = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.timespinner.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.spinner(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "timespinner");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "timespinner", {
                    options: e.extend({}, e.fn.timespinner.defaults, e.fn.timespinner.parseOptions(this), i)
                });
            }
            t(this);
        });
    };
    e.fn.timespinner.methods = {
        options: function(t) {
            var i = e.data(t[0], "timespinner").options;
            return e.extend(i, {
                value: t.val(),
                originalValue: t.spinner("options").originalValue
            });
        },
        setValue: function(t, i) {
            return t.each(function() {
                e(this).val(i);
                o(this);
            });
        },
        getHours: function(t) {
            var i = e.data(t[0], "timespinner").options;
            var a = t.val().split(i.separator);
            return parseInt(a[0], 10);
        },
        getMinutes: function(t) {
            var i = e.data(t[0], "timespinner").options;
            var a = t.val().split(i.separator);
            return parseInt(a[1], 10);
        },
        getSeconds: function(t) {
            var i = e.data(t[0], "timespinner").options;
            var a = t.val().split(i.separator);
            return parseInt(a[2], 10) || 0;
        },
        setSpinStart: function(t, a) {
            return t.each(function() {
                if (a > -1) {
                    var t = e.data(this, "timespinner").options;
                    t.highlight = i(a);
                    this.selectionStart = a;
                    this.selectionStartPersistent = a;
                }
            });
        }
    };
    e.fn.timespinner.parseOptions = function(t) {
        return e.extend({}, e.fn.spinner.parseOptions(t), e.parser.parseOptions(t, [ "separator", {
            showSeconds: "boolean",
            highlight: "number",
            hourStep: "number",
            minutesStep: "number",
            secondStep: "number"
        } ]));
    };
    e.fn.timespinner.defaults = e.extend({}, e.fn.spinner.defaults, {
        separator: ":",
        showSeconds: false,
        highlight: 0,
        hourStep: 1,
        minutesStep: 1,
        secondStep: 1,
        spin: function(e) {
            s(this, e);
        },
        keyHandler: {
            up: function(e) {
                e.preventDefault();
                a(this);
                s(this, false);
                return false;
            },
            down: function(e) {
                e.preventDefault();
                a(this);
                s(this, true);
                return false;
            },
            enter: function(e) {
                o(this);
            }
        }
    });
})(jQuery);

(function($) {
    var _501 = 0;
    function _502(e, t) {
        for (var i = 0, a = e.length; i < a; i++) {
            if (e[i] == t) {
                return i;
            }
        }
        return -1;
    }
    function _503(e, t, i) {
        if (typeof t == "string") {
            for (var a = 0, n = e.length; a < n; a++) {
                if (e[a][t] == i) {
                    e.splice(a, 1);
                    return;
                }
            }
        } else {
            var r = _502(e, t);
            if (r != -1) {
                e.splice(r, 1);
            }
        }
    }
    function _505(e, t, i) {
        for (var a = 0, n = e.length; a < n; a++) {
            if (e[a][t] == i[t]) {
                return;
            }
        }
        e.push(i);
    }
    function _506(e) {
        var t = $.data(e, "datagrid");
        var i = t.options;
        var a = t.panel;
        var n = t.dc;
        var r = null;
        if (i.sharedStyleSheet) {
            r = typeof i.sharedStyleSheet == "boolean" ? "head" : i.sharedStyleSheet;
        } else {
            r = a.closest("div.datagrid-view");
            if (!r.length) {
                r = n.view;
            }
        }
        var o = $(r);
        var s = $.data(o[0], "ss");
        if (!s) {
            s = $.data(o[0], "ss", {
                cache: {},
                dirty: []
            });
        }
        return {
            add: function(e) {
                var t = [ '<style type="text/css" hisui="true">' ];
                for (var i = 0; i < e.length; i++) {
                    s.cache[e[i][0]] = {
                        width: e[i][1],
                        fontSize: e[i][2],
                        lineHeight: e[i][3]
                    };
                }
                var a = 0;
                for (var n in s.cache) {
                    var r = s.cache[n];
                    r.index = a++;
                    t.push(n + "{width:" + r.width + "}");
                }
                for (var n in s.cache) {
                    var r = s.cache[n];
                    var l = "";
                    if (r.fontSize) {
                        l += "font-size:" + r.fontSize + ";";
                    }
                    if (r.lineHeight) {
                        l += "line-height:" + r.lineHeight + ";";
                    }
                    if (l != "") t.push(".datagrid-row " + n + "{" + l + "}");
                }
                t.push("</style>");
                $(t.join("\n")).appendTo(o);
                o.children("style[hisui]:not(:last)").remove();
            },
            getRule: function(e) {
                var t = o.children("style[hisui]:last")[0];
                var i = t.styleSheet ? t.styleSheet : t.sheet || document.styleSheets[document.styleSheets.length - 1];
                var a = i.cssRules || i.rules;
                return a[e];
            },
            set: function(e, t) {
                var i = s.cache[e];
                if (i) {
                    i.width = t;
                    var a = this.getRule(i.index);
                    if (a) {
                        a.style["width"] = t;
                    }
                }
            },
            remove: function(e) {
                var t = [];
                for (var i in s.cache) {
                    if (i.indexOf(e) == -1) {
                        t.push([ i, s.cache[i].width ]);
                    }
                }
                s.cache = {};
                this.add(t);
            },
            dirty: function(e) {
                if (e) {
                    s.dirty.push(e);
                }
            },
            clean: function() {
                for (var e = 0; e < s.dirty.length; e++) {
                    this.remove(s.dirty[e]);
                }
                s.dirty = [];
            }
        };
    }
    function _515(e, t) {
        var i = $.data(e, "datagrid").options;
        var a = $.data(e, "datagrid").panel;
        if (t) {
            if (t.width) {
                i.width = t.width;
            }
            if (t.height) {
                i.height = t.height;
            }
        }
        if (i.fit == true) {
            var n = a.panel("panel").parent();
            if (n.hasClass("panel-body") && n.width() == 0) {
                n.width(1);
            }
            i.width = n.width();
            i.height = n.height();
        }
        a.panel("resize", {
            width: i.width,
            height: i.height
        });
    }
    function _519(e) {
        var t = $.data(e, "datagrid").options;
        var i = $.data(e, "datagrid").dc;
        var a = $.data(e, "datagrid").panel;
        var n = a.width();
        var r = a.height();
        var o = i.view;
        var s = i.view1;
        var l = i.view2;
        var d = s.children("div.datagrid-header");
        var c = l.children("div.datagrid-header");
        var f = d.find("table");
        var u = c.find("table");
        o.width(n);
        var h = d.children("div.datagrid-header-inner").show();
        s.width(h.find("table").width());
        if (!t.showHeader) {
            h.hide();
        }
        l.width(n - s._outerWidth());
        s.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(s.width());
        l.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(l.width());
        var p;
        d.css("height", "");
        c.css("height", "");
        f.css("height", "");
        u.css("height", "");
        p = Math.max(f.height(), u.height());
        f.height(p);
        u.height(p);
        d.add(c)._outerHeight(p);
        if (t.height != "auto") {
            var v = r - l.children("div.datagrid-header")._outerHeight() - l.children("div.datagrid-footer")._outerHeight() - a.children("div.datagrid-toolbar")._outerHeight() - a.children("div.datagrid-btoolbar")._outerHeight();
            a.children("div.datagrid-pager").each(function() {
                v -= $(this)._outerHeight();
            });
            i.body1.add(i.body2).children("table.datagrid-btable-frozen").css({
                position: "absolute",
                top: i.header2._outerHeight()
            });
            var g = i.body2.children("table.datagrid-btable-frozen")._outerHeight();
            s.add(l).children("div.datagrid-body").css({
                marginTop: g,
                height: v - g
            });
        }
        o.height(l.height());
    }
    function _526(e, t, i) {
        var a = $.data(e, "datagrid").data.rows;
        var n = $.data(e, "datagrid").options;
        var r = $.data(e, "datagrid").dc;
        if (!r.body1.is(":empty") && (!n.nowrap || n.autoRowHeight || i)) {
            if (t != undefined) {
                var o = n.finder.getTr(e, t, "body", 1);
                var s = n.finder.getTr(e, t, "body", 2);
                u(o, s);
            } else {
                var o = n.finder.getTr(e, 0, "allbody", 1);
                var s = n.finder.getTr(e, 0, "allbody", 2);
                u(o, s);
                if (n.showFooter) {
                    var o = n.finder.getTr(e, 0, "allfooter", 1);
                    var s = n.finder.getTr(e, 0, "allfooter", 2);
                    u(o, s);
                }
            }
        }
        _519(e);
        if (n.height == "auto") {
            var l = r.body1.parent();
            var d = r.body2;
            var c = h(d);
            var f = c.height;
            if (c.width > d.width()) {
                f += 18;
            }
            l.height(f);
            d.height(f);
            r.view.height(r.view2.height());
        }
        r.body2.triggerHandler("scroll");
        function u(e, t) {
            for (var i = 0; i < t.length; i++) {
                var a = $(e[i]);
                var n = $(t[i]);
                a.css("height", "");
                n.css("height", "");
                var r = Math.max(a.height(), n.height());
                a.css("height", r);
                n.css("height", r);
            }
        }
        function h(e) {
            var t = 0;
            var i = 0;
            $(e).children().each(function() {
                var e = $(this);
                if (e.is(":visible")) {
                    i += e._outerHeight();
                    if (t < e._outerWidth()) {
                        t = e._outerWidth();
                    }
                }
            });
            return {
                width: t,
                height: i
            };
        }
    }
    function _533(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        var n = i.dc;
        if (!n.body2.children("table.datagrid-btable-frozen").length) {
            n.body1.add(n.body2).prepend('<table class="datagrid-btable datagrid-btable-frozen" cellspacing="0" cellpadding="0"></table>');
        }
        r(true);
        r(false);
        _519(e);
        function r(i) {
            var r = i ? 1 : 2;
            var o = a.finder.getTr(e, t, "body", r);
            (i ? n.body1 : n.body2).children("table.datagrid-btable-frozen").append(o);
        }
    }
    function _53a(_53b, _53c) {
        function _53d() {
            var _53e = [];
            var _53f = [];
            $(_53b).children("thead").each(function() {
                var opt = $.parser.parseOptions(this, [ {
                    frozen: "boolean"
                } ]);
                $(this).find("tr").each(function() {
                    var cols = [];
                    $(this).find("th").each(function() {
                        var th = $(this);
                        var col = $.extend({}, $.parser.parseOptions(this, [ "field", "align", "halign", "order", {
                            sortable: "boolean",
                            checkbox: "boolean",
                            resizable: "boolean",
                            fixed: "boolean"
                        }, {
                            rowspan: "number",
                            colspan: "number",
                            width: "number"
                        } ]), {
                            title: th.html() || undefined,
                            hidden: th.attr("hidden") ? true : undefined,
                            formatter: th.attr("formatter") ? eval(th.attr("formatter")) : undefined,
                            styler: th.attr("styler") ? eval(th.attr("styler")) : undefined,
                            sorter: th.attr("sorter") ? eval(th.attr("sorter")) : undefined
                        });
                        if (th.attr("editor")) {
                            var s = $.trim(th.attr("editor"));
                            if (s.substr(0, 1) == "{") {
                                col.editor = eval("(" + s + ")");
                            } else {
                                col.editor = s;
                            }
                        }
                        cols.push(col);
                    });
                    opt.frozen ? _53e.push(cols) : _53f.push(cols);
                });
            });
            return [ _53e, _53f ];
        }
        var _540 = $('<div class="datagrid-wrap">' + '<div class="datagrid-view">' + '<div class="datagrid-view1">' + '<div class="datagrid-header">' + '<div class="datagrid-header-inner"></div>' + "</div>" + '<div class="datagrid-body">' + '<div class="datagrid-body-inner"></div>' + "</div>" + '<div class="datagrid-footer">' + '<div class="datagrid-footer-inner"></div>' + "</div>" + "</div>" + '<div class="datagrid-view2">' + '<div class="datagrid-header">' + '<div class="datagrid-header-inner"></div>' + "</div>" + '<div class="datagrid-body"></div>' + '<div class="datagrid-footer">' + '<div class="datagrid-footer-inner"></div>' + "</div>" + "</div>" + "</div>" + "</div>").insertAfter(_53b);
        _540.panel({
            doSize: false
        });
        _540.panel("panel").addClass("datagrid").bind("_resize", function(e, t) {
            var i = $.data(_53b, "datagrid").options;
            if (i.fit == true || t) {
                _515(_53b);
                setTimeout(function() {
                    if ($.data(_53b, "datagrid")) {
                        _542(_53b);
                    }
                }, 0);
            }
            return false;
        });
        $(_53b).addClass("datagrid-f").hide().appendTo(_540.children("div.datagrid-view"));
        var cc = _53d();
        var view = _540.children("div.datagrid-view");
        var _543 = view.children("div.datagrid-view1");
        var _544 = view.children("div.datagrid-view2");
        return {
            panel: _540,
            frozenColumns: cc[0],
            columns: cc[1],
            dc: {
                view: view,
                view1: _543,
                view2: _544,
                header1: _543.children("div.datagrid-header").children("div.datagrid-header-inner"),
                header2: _544.children("div.datagrid-header").children("div.datagrid-header-inner"),
                body1: _543.children("div.datagrid-body").children("div.datagrid-body-inner"),
                body2: _544.children("div.datagrid-body"),
                footer1: _543.children("div.datagrid-footer").children("div.datagrid-footer-inner"),
                footer2: _544.children("div.datagrid-footer").children("div.datagrid-footer-inner")
            }
        };
    }
    function _545(_546) {
        var _547 = $.data(_546, "datagrid");
        var opts = _547.options;
        var dc = _547.dc;
        var _548 = _547.panel;
        _547.ss = $(_546).datagrid("createStyleSheet");
        _548.panel($.extend({}, opts, {
            id: null,
            doSize: false,
            onResize: function(e, t) {
                setTimeout(function() {
                    if ($.data(_546, "datagrid")) {
                        _519(_546);
                        _579(_546);
                        opts.onResize.call(_548, e, t);
                    }
                }, 0);
            },
            onExpand: function() {
                _526(_546);
                opts.onExpand.call(_548);
            }
        }));
        _547.rowIdPrefix = "datagrid-row-r" + ++_501;
        _547.cellClassPrefix = "datagrid-cell-c" + _501;
        _54b(dc.header1, opts.frozenColumns, true);
        _54b(dc.header2, opts.columns, false);
        _54c();
        dc.header1.add(dc.header2).css("display", opts.showHeader ? "block" : "none");
        dc.footer1.add(dc.footer2).css("display", opts.showFooter ? "block" : "none");
        if (opts.toolbar) {
            if ($.isArray(opts.toolbar)) {
                $("div.datagrid-toolbar", _548).remove();
                var tb = $('<div class="datagrid-toolbar"><table cellspacing="0" cellpadding="0"><tr></tr></table></div>').prependTo(_548);
                var tr = tb.find("tr");
                for (var i = 0; i < opts.toolbar.length; i++) {
                    var btn = opts.toolbar[i];
                    if (btn == "-") {
                        $('<td><div class="datagrid-btn-separator"></div></td>').appendTo(tr);
                    } else if ("undefined" != typeof btn.type) {
                        if (btn.type == "input") {
                            var _myinput = $('<td><input class="' + btn["class"] + '" placeholder="' + btn.placeholder + '"/></td>').appendTo(tr);
                            _myinput.on("keydown", eval(btn.handler || function() {}));
                        }
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $('<a href="javascript:void(0)"></a>').appendTo(td);
                        tool[0].onclick = eval(btn.handler || function() {});
                        tool.linkbutton($.extend({}, btn, {
                            plain: true
                        }));
                    }
                }
            } else {
                $(opts.toolbar).addClass("datagrid-toolbar").prependTo(_548);
                $(opts.toolbar).show();
            }
        } else {
            $("div.datagrid-toolbar", _548).remove();
        }
        $("div.datagrid-pager", _548).remove();
        if (opts.pagination) {
            var _54d = $('<div class="datagrid-pager"></div>');
            if (opts.pagePosition == "bottom") {
                _54d.appendTo(_548);
            } else {
                if (opts.pagePosition == "top") {
                    _54d.addClass("datagrid-pager-top").prependTo(_548);
                } else {
                    var ptop = $('<div class="datagrid-pager datagrid-pager-top"></div>').prependTo(_548);
                    _54d.appendTo(_548);
                    _54d = _54d.add(ptop);
                }
            }
            _54d.pagination({
                total: opts.pageNumber == 1 ? 0 : opts.pageNumber * opts.pageSize,
                pageNumber: opts.pageNumber,
                showRefresh: opts.showRefresh,
                showPageList: opts.showPageList,
                afterPageText: opts.afterPageText,
                beforePageText: opts.beforePageText,
                displayMsg: opts.displayMsg,
                pageSize: opts.pageSize,
                pageList: opts.pageList,
                onSelectPage: function(e, t) {
                    opts.pageNumber = e;
                    opts.pageSize = t;
                    _54d.pagination("refresh", {
                        pageNumber: e,
                        pageSize: t
                    });
                    _577(_546);
                }
            });
            opts.pageSize = _54d.pagination("options").pageSize;
        }
        dc.body2.html("<div style='width:" + dc.view2.find(".datagrid-header-row").width() + "px;border:solid 0px;height:1px;'></div>");
        function _54b(e, t, i) {
            if (!t) {
                return;
            }
            $(e).show();
            $(e).empty();
            var a = [];
            var n = [];
            if (opts.sortName) {
                a = opts.sortName.split(",");
                n = opts.sortOrder.split(",");
            }
            var r = $('<table class="datagrid-htable" border="0" cellspacing="0" cellpadding="0"><tbody></tbody></table>').appendTo(e);
            for (var o = 0; o < t.length; o++) {
                var s = '<tr class="datagrid-header-row ';
                if (!opts.titleNoWrap) s += "datagrid-header-autowrap ";
                if (opts.id) s += opts.id + "-header-row" + o;
                s += '"></tr>';
                var l = $(s).appendTo($("tbody", r));
                var d = t[o];
                for (var c = 0; c < d.length; c++) {
                    var f = d[c];
                    var u = "";
                    if (f.rowspan) {
                        u += 'rowspan="' + f.rowspan + '" ';
                    }
                    if (f.colspan) {
                        u += 'colspan="' + f.colspan + '" ';
                    }
                    var h = $("<td " + u + "></td>").appendTo(l);
                    if (f.checkbox) {
                        h.attr("field", f.field);
                        $('<div class="datagrid-header-check"></div>').html('<input type="checkbox"/>').appendTo(h);
                    } else {
                        if (f.field) {
                            h.attr("field", f.field);
                            h.append('<div class="datagrid-cell"><span></span><span class="datagrid-sort-icon"></span></div>');
                            var p = f.title;
                            if (true != f.hidden) p = $.hisui.getTrans(f.title);
                            if (f.headerCheckbox) {
                                p += '<input type="checkbox" class="">';
                                h.attr("header-checkbox", "true");
                            }
                            $("span", h).html(p);
                            $("span.datagrid-sort-icon", h).html("");
                            var v = h.find("div.datagrid-cell");
                            var g = _502(a, f.field);
                            if (g >= 0) {
                                v.addClass("datagrid-sort-" + n[g]);
                            }
                            if (f.sortable) {
                                v.addClass("datagrid-sort");
                            }
                            if (f.resizable == false) {
                                v.attr("resizable", "false");
                            }
                            if (f.width) {
                                v._outerWidth(f.width);
                                f.boxWidth = parseInt(v[0].style.width);
                            } else {
                                f.auto = true;
                            }
                            v.css("text-align", f.halign || f.align || "");
                            f.cellClass = _547.cellClassPrefix + "-" + f.field.replace(/[\.|\s]/g, "-");
                            v.addClass(f.cellClass).css("width", "");
                            if (f.headerCheckbox) {
                                $('input[type="checkbox"]', v).checkbox({
                                    id: f.cellClass + "cb",
                                    onCheckChange: function(e, t) {
                                        var i = $(e.target).closest("td").attr("field");
                                        if (t) {
                                            _checkHeaderCheckbox($(e.target).closest(".datagrid-view2"), i);
                                        } else {
                                            _uncheckHeaderCheckbox($(e.target).closest(".datagrid-view2"), i);
                                        }
                                    }
                                });
                            }
                        } else {
                            h.append('<div class="datagrid-cell-group"><span></span></div>');
                            $("span", h).html($.hisui.getTrans(f.title));
                            var v = h.find("div.datagrid-cell-group");
                            v.css("height", "auto");
                            if (f.halign || f.align) v.css("text-align", f.halign || f.align || "");
                        }
                    }
                    if (f.hidden) {
                        h.hide();
                    }
                }
            }
            if (i && opts.rownumbers) {
                var h = $('<td rowspan="' + opts.frozenColumns.length + '"><div class="datagrid-header-rownumber"></div></td>');
                if ($("tr", r).length == 0) {
                    var b = '<tr class="datagrid-header-row';
                    if (!opts.titleNoWrap) b += " datagrid-header-autowrap";
                    b += '"></tr>';
                    h.wrap(b).parent().appendTo($("tbody", r));
                } else {
                    h.prependTo($("tr:first", r));
                }
            }
        }
        function _54c() {
            var e = [];
            var t = _557(_546, true).concat(_557(_546));
            for (var i = 0; i < t.length; i++) {
                var a = _getColumnOption(_546, t[i]);
                if (a && !a.checkbox) {
                    e.push([ "." + a.cellClass, a.boxWidth ? a.boxWidth + "px" : "auto", a.fontSize ? a.fontSize + "px" : opts.fontSize ? opts.fontSize + "px" : "", a.lineHeight ? a.lineHeight + "px" : opts.lineHeight ? opts.lineHeight + "px" : "" ]);
                }
            }
            _547.ss.add(e);
            _547.ss.dirty(_547.cellSelectorPrefix);
            _547.cellSelectorPrefix = "." + _547.cellClassPrefix;
        }
        if (opts.btoolbar) {
            if ($.isArray(opts.btoolbar)) {
                $("div.datagrid-btoolbar", _548).remove();
                var tb = $('<div class="datagrid-btoolbar"><table cellspacing="0" cellpadding="0"><tr></tr></table></div>').appendTo(_548);
                var tr = tb.find("tr");
                for (var i = 0; i < opts.btoolbar.length; i++) {
                    var btn = opts.btoolbar[i];
                    if (btn == "-") {
                        $('<td><div class="datagrid-btn-separator"></div></td>').appendTo(tr);
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $('<a href="javascript:void(0)"></a>').appendTo(td);
                        tool[0].onclick = eval(btn.handler || function() {});
                        tool.linkbutton($.extend({}, btn, {
                            plain: true
                        }));
                    }
                }
            } else {
                $(opts.btoolbar).addClass("datagrid-btoolbar").appendTo(_548);
                $(opts.btoolbar).show();
            }
        } else {
            $("div.datagrid-btoolbar", _548).remove();
        }
    }
    function _559(e) {
        var t = $.data(e, "datagrid");
        var i = t.panel;
        var a = t.options;
        var n = t.dc;
        var r = n.header1.add(n.header2);
        r.find(".datagrid-header-check input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function(t) {
            if (a.singleSelect && a.selectOnCheck) {
                return false;
            }
            if ($(this).is(":checked")) {
                _5df(e);
            } else {
                _uncheckAll(e);
            }
            t.stopPropagation();
        });
        var o = r.find("div.datagrid-cell");
        o.closest("td").unbind(".datagrid").bind("mouseenter.datagrid", function() {
            if (t.resizing) {
                return;
            }
            $(this).addClass("datagrid-header-over");
        }).bind("mouseleave.datagrid", function() {
            $(this).removeClass("datagrid-header-over");
        }).bind("contextmenu.datagrid", function(t) {
            var i = $(this).attr("field");
            a.onHeaderContextMenu.call(e, t, i);
        }).bind("dblclick.datagrid", function(t) {
            var i = $(this).attr("field");
            if (a.editColumnsPage != null) {
                t.preventDefault();
                var n = 1;
                if (null != a.editColumnsGrantUrl) $.ajax({
                    url: a.editColumnsGrantUrl,
                    async: false,
                    dataType: "text",
                    success: function(e) {
                        n = e;
                    }
                });
                if (n == 1) window.open(a.editColumnsPage, "_blank", "top=50,left=100,width=1000,height=800,titlebar=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
                return false;
            } else {
                a.onDblClickHeader.call(e, t, i);
            }
        });
        o.unbind(".datagrid").bind("click.datagrid", function(t) {
            var i = $(this).offset().left + 5;
            var a = $(this).offset().left + $(this)._outerWidth() - 5;
            if (t.pageX < a && t.pageX > i) {
                _56c(e, $(this).parent().attr("field"));
            }
        }).bind("dblclick.datagrid", function(t) {
            var i = $(this).offset().left + 5;
            var n = $(this).offset().left + $(this)._outerWidth() - 5;
            var r = a.resizeHandle == "right" ? t.pageX > n : a.resizeHandle == "left" ? t.pageX < i : t.pageX < i || t.pageX > n;
            if (r) {
                var o = $(this).parent().attr("field");
                var s = _getColumnOption(e, o);
                if (s.resizable == false) {
                    return;
                }
                $(e).datagrid("autoSizeColumn", o);
                s.auto = false;
            }
        });
        var s = a.resizeHandle == "right" ? "e" : a.resizeHandle == "left" ? "w" : "e,w";
        o.each(function() {
            $(this).resizable({
                handles: s,
                disabled: $(this).attr("resizable") ? $(this).attr("resizable") == "false" : false,
                minWidth: 25,
                onStartResize: function(e) {
                    t.resizing = true;
                    r.css("cursor", $("body").css("cursor"));
                    if (!t.proxy) {
                        t.proxy = $('<div class="datagrid-resize-proxy"></div>').appendTo(n.view);
                    }
                    t.proxy.css({
                        left: e.pageX - $(i).offset().left - 1,
                        display: "none"
                    });
                    setTimeout(function() {
                        if (t.proxy) {
                            t.proxy.show();
                        }
                    }, 500);
                },
                onResize: function(e) {
                    t.proxy.css({
                        left: e.pageX - $(i).offset().left - 1,
                        display: "block"
                    });
                    return false;
                },
                onStopResize: function(i) {
                    r.css("cursor", "");
                    $(this).css("height", "");
                    $(this)._outerWidth($(this)._outerWidth());
                    var n = $(this).parent().attr("field");
                    var o = _getColumnOption(e, n);
                    o.width = $(this)._outerWidth();
                    o.boxWidth = parseInt(this.style.width);
                    o.auto = undefined;
                    $(this).css("width", "");
                    _542(e, n);
                    t.proxy.remove();
                    t.proxy = null;
                    if ($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")) {
                        _519(e);
                    }
                    _579(e);
                    a.onResizeColumn.call(e, n, o.width);
                    setTimeout(function() {
                        t.resizing = false;
                    }, 0);
                }
            });
        });
        function l(t) {
            var i = $(t.target);
            var n = i.closest("tr.datagrid-row");
            if (!f(n)) {
                return;
            }
            var r = c(n);
            if (i.parent().hasClass("datagrid-cell-check")) {
                if (a.singleSelect && a.selectOnCheck) {
                    if (!a.checkOnSelect) {
                        _uncheckAll(e, true);
                    }
                    _5d2(e, r);
                } else {
                    if (i.is(":checked")) {
                        if (a.shiftCheck && t.shiftKey) {
                            shiftCheckRow(r, n, e);
                        }
                        _5d2(e, r);
                    } else {
                        if (a.shiftCheck && t.shiftKey) {
                            shiftUncheckRow(r, n, e);
                            _5d2(e, r);
                        } else {
                            _uncheckRow(e, r);
                        }
                    }
                }
            } else {
                var o = a.finder.getRow(e, r);
                var s = i.closest("td[field]", n);
                if (s.length) {
                    var l = s.attr("field");
                    a.onClickCell.call(e, r, l, o[l]);
                }
                if (a.singleSelect == true) {
                    _5cb(e, r);
                } else {
                    if (a.ctrlSelect) {
                        if (t.ctrlKey) {
                            if (n.hasClass("datagrid-row-selected")) {
                                _5d3(e, r);
                            } else {
                                _5cb(e, r);
                            }
                        } else {
                            $(e).datagrid("clearSelections");
                            _5cb(e, r);
                        }
                    } else {
                        if (n.hasClass("datagrid-row-selected")) {
                            _5d3(e, r);
                        } else {
                            _5cb(e, r);
                        }
                    }
                }
                if (s) {
                    var d = s.closest(".datagrid-view").find(".datagrid-header-row td[field=" + l + "]");
                    if ("true" == d.attr("header-checkbox")) {
                        _validHeaderCheckboxByData(s.closest(".datagrid-body"), d.parent(), l);
                    }
                }
                if (a.clicksToEdit == 1) {
                    var u = undefined;
                    var h = a.finder.getTr(e, "", "editing", 2);
                    if (h) u = h.attr("datagrid-row-index");
                    if (u != r) {
                        if (r > -1 && ("undefined" == typeof u || $(e).datagrid("validateRow", u))) {
                            if ("undefined" != typeof u) _5fd(e, parseInt(u), false);
                            _5f7(e, r);
                        }
                    }
                }
                a.onClickRow.call(e, r, o);
            }
        }
        var d = $.hisui.debounce && parseInt(a.clickDelay) > 0 ? $.hisui.debounce(l, parseInt(a.clickDelay)) : l;
        n.body1.add(n.body2).unbind().bind("mouseover", function(i) {
            if (t.resizing) {
                return;
            }
            var n = $(i.target);
            var r = undefined;
            if ("undefined" == typeof n.attr("field")) {
                n = n.closest("td");
            }
            r = n.attr("field");
            var o = $(i.target).closest("tr.datagrid-row");
            if (!f(o)) {
                return;
            }
            var s = c(o);
            if (r && $.trim(n.text()) != "") {
                var l = $.data(e, "datagrid");
                var d = l.options.columns || [];
                cm = d.concat(l.options.frozenColumns);
                for (var u = 0; u < cm.length; u++) {
                    for (var h = 0; h < cm[u].length; h++) {
                        if (cm[u][h].field == r) {
                            if (cm[u][h].showTip || "function" == typeof cm[u][h].showTipFormatter) {
                                var p = n.text();
                                if ("function" == typeof cm[u][h].showTipFormatter) {
                                    var v = a.finder.getRow(e, s);
                                    p = cm[u][h].showTipFormatter.call(this, v, s);
                                }
                                var g = cm[u][h].tipWidth || 350;
                                var b = cm[u][h].tipPosition || "bottom";
                                var m = cm[u][h].tipTrackMouse || false;
                                n.tooltip({
                                    content: p,
                                    position: b,
                                    trackMouse: m,
                                    tipWidth: g
                                }).tooltip("show", i);
                            }
                        }
                    }
                }
            }
            _5c7(e, s, true);
            i.stopPropagation();
        }).bind("mouseout", function(t) {
            var i = $(t.target).closest("tr.datagrid-row");
            if (!f(i)) {
                return;
            }
            var n = c(i);
            a.finder.getTr(e, n).removeClass("datagrid-row-over");
            t.stopPropagation();
        }).bind("click", function(e) {
            if (parseInt(a.clickDelay) > 0) {
                d.call(this, e);
            } else {
                l.call(this, e);
            }
            e.stopPropagation();
        }).bind("dblclick", function(t) {
            var i = $(t.target);
            var n = i.closest("tr.datagrid-row");
            if (!f(n)) {
                return;
            }
            var r = c(n);
            var o = a.finder.getRow(e, r);
            var s = i.closest("td[field]", n);
            if (s.length) {
                var l = s.attr("field");
                a.onDblClickCell.call(e, r, l, o[l]);
            }
            if (a.clicksToEdit == 2) {
                _5f7(e, rowIndex);
            }
            a.onDblClickRow.call(e, r, o);
            t.stopPropagation();
        }).bind("contextmenu", function(t) {
            var i = $(t.target).closest("tr.datagrid-row");
            if (!f(i)) {
                return;
            }
            var n = c(i);
            var r = a.finder.getRow(e, n);
            a.onRowContextMenu.call(e, t, n, r);
            t.stopPropagation();
        });
        n.body1.bind("mousewheel DOMMouseScroll", function(e) {
            e.preventDefault();
            var t = e.originalEvent || window.event;
            var i = t.wheelDelta || t.detail * -1;
            if ("deltaY" in t) {
                i = t.deltaY * -1;
            }
            var a = $(e.target).closest("div.datagrid-view").children(".datagrid-f");
            var n = a.data("datagrid").dc;
            n.body2.scrollTop(n.body2.scrollTop() - i);
        });
        n.body2.bind("scroll", function() {
            var e = n.view1.children("div.datagrid-body");
            e.scrollTop($(this).scrollTop());
            var t = n.body1.children(":first");
            var i = n.body2.children(":first");
            if (t.length && i.length) {
                var a = t.offset().top;
                var r = i.offset().top;
                if (a != r) {
                    e.scrollTop(e.scrollTop() + a - r);
                }
            }
            n.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
            n.body2.children("table.datagrid-btable-frozen").css("left", -$(this)._scrollLeft());
        });
        function c(e) {
            if (e.attr("datagrid-row-index")) {
                return parseInt(e.attr("datagrid-row-index"));
            } else {
                return e.attr("node-id");
            }
        }
        function f(e) {
            return e.length && e.parent().length;
        }
    }
    function _56c(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        t = t || {};
        var n = {
            sortName: a.sortName,
            sortOrder: a.sortOrder
        };
        if (typeof t == "object") {
            $.extend(n, t);
        }
        var r = [];
        var o = [];
        if (n.sortName) {
            r = n.sortName.split(",");
            o = n.sortOrder.split(",");
        }
        if (typeof t == "string") {
            var s = t;
            var l = _getColumnOption(e, s);
            if (!l.sortable || i.resizing) {
                return;
            }
            var d = l.order || "asc";
            var c = _502(r, s);
            if (c >= 0) {
                var f = o[c] == "asc" ? "desc" : "asc";
                if (a.multiSort && f == d) {
                    r.splice(c, 1);
                    o.splice(c, 1);
                } else {
                    o[c] = f;
                }
            } else {
                if (a.multiSort) {
                    r.push(s);
                    o.push(d);
                } else {
                    r = [ s ];
                    o = [ d ];
                }
            }
            n.sortName = r.join(",");
            n.sortOrder = o.join(",");
        }
        if (a.onBeforeSortColumn.call(e, n.sortName, n.sortOrder) == false) {
            return;
        }
        $.extend(a, n);
        var u = i.dc;
        var h = u.header1.add(u.header2);
        h.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
        for (var p = 0; p < r.length; p++) {
            var l = _getColumnOption(e, r[p]);
            h.find("div." + l.cellClass).addClass("datagrid-sort-" + o[p]);
        }
        if (a.remoteSort) {
            _577(e);
        } else {
            _578(e, $(e).datagrid("getData"));
        }
        a.onSortColumn.call(e, a.sortName, a.sortOrder);
    }
    function _579(e) {
        var t = $.data(e, "datagrid");
        var i = t.options;
        var a = t.dc;
        a.body2.css("overflow-x", "");
        if (!i.fitColumns) {
            return;
        }
        if (!t.leftWidth) {
            t.leftWidth = 0;
        }
        var n = a.view2.children("div.datagrid-header");
        var r = 0;
        var o;
        var s = _557(e, false);
        for (var l = 0; l < s.length; l++) {
            var d = _getColumnOption(e, s[l]);
            if (v(d)) {
                r += d.width;
                o = d;
            }
        }
        if (!r) {
            return;
        }
        if (o) {
            p(o, -t.leftWidth);
        }
        var c = n.children("div.datagrid-header-inner").show();
        var f = n.width() - n.find("table").width() - i.scrollbarSize + t.leftWidth;
        var u = f / r;
        if (!i.showHeader) {
            c.hide();
        }
        for (var l = 0; l < s.length; l++) {
            var d = _getColumnOption(e, s[l]);
            if (v(d)) {
                var h = parseInt(d.width * u);
                p(d, h);
                f -= h;
            }
        }
        t.leftWidth = f;
        if (o) {
            p(o, t.leftWidth);
        }
        _542(e);
        if (n.width() >= n.find("table").width()) {
            a.body2.css("overflow-x", "hidden");
        }
        function p(e, t) {
            if (e.width + t > 0) {
                e.width += t;
                e.boxWidth += t;
            }
        }
        function v(e) {
            if (!e.hidden && !e.checkbox && !e.auto && !e.fixed) {
                return true;
            }
        }
    }
    function _586(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        var n = i.dc;
        var r = $('<div class="datagrid-cell" style="position:absolute;left:-9999px"></div>').appendTo("body");
        if (t) {
            c(t);
            if (a.fitColumns) {
                _519(e);
                _579(e);
            }
        } else {
            if (!!a.autoSizeColumn) {
                var o = false;
                var s = _557(e, true).concat(_557(e, false));
                for (var l = 0; l < s.length; l++) {
                    var t = s[l];
                    var d = _getColumnOption(e, t);
                    if (!d.hidden && d.auto) {
                        c(t);
                        o = true;
                    }
                }
                if (o && a.fitColumns) {
                    _519(e);
                    _579(e);
                }
            }
        }
        r.remove();
        function c(t) {
            var i = n.view.find('div.datagrid-header td[field="' + t + '"] div.datagrid-cell');
            i.css("width", "");
            var o = $(e).datagrid("getColumnOption", t);
            o.width = undefined;
            o.boxWidth = undefined;
            o.auto = true;
            $(e).datagrid("fixColumnSize", t);
            var s = Math.max(l("header"), l("allbody"), l("allfooter"));
            i._outerWidth(s);
            o.width = s;
            o.boxWidth = parseInt(i[0].style.width);
            i.css("width", "");
            $(e).datagrid("fixColumnSize", t);
            a.onResizeColumn.call(e, t, o.width);
            function l(n) {
                var o = 0;
                if (n == "header") {
                    o = s(i);
                } else {
                    a.finder.getTr(e, 0, n).find('td[field="' + t + '"] div.datagrid-cell').each(function() {
                        var e = s($(this));
                        if (o < e) {
                            o = e;
                        }
                    });
                }
                return o;
                function s(e) {
                    return e.is(":visible") ? e._outerWidth() : r.html(e.html())._outerWidth();
                }
            }
        }
    }
    function _542(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        var n = i.dc;
        var r = n.view.find("table.datagrid-btable,table.datagrid-ftable");
        r.css("table-layout", "fixed");
        if (t) {
            l(t);
        } else {
            var o = _557(e, true).concat(_557(e, false));
            for (var s = 0; s < o.length; s++) {
                l(o[s]);
            }
        }
        r.css("table-layout", "auto");
        _596(e);
        setTimeout(function() {
            _526(e);
            _59b(e);
            resizeTHGroup(e);
        }, 0);
        function l(t) {
            var a = _getColumnOption(e, t);
            if (!a.checkbox) {
                i.ss.set("." + a.cellClass, a.boxWidth ? a.boxWidth + "px" : "auto");
            }
        }
    }
    function resizeTHGroup(e) {
        var t = $.data(e, "datagrid").options;
        var i = $.data(e, "datagrid").dc;
        i.header1.add(i.header2).find(".datagrid-cell-group").each(function() {
            $(this).width(1);
            var e = Math.floor($(this).parent().width()) - 16;
            $(this).width(e);
        });
        return false;
        var t = $.data(e, "datagrid").options;
        var i = $.data(e, "datagrid").dc;
        var a = 0;
        var n = t.columns;
        var r = 2;
        if (n.length == r) {
            var o = 0;
            for (var s = 0; s < n[0].length; s++) {
                if ("undefined" == typeof n[0][s].rowspan || n[0][s].rowspan < r) {
                    if (n[0].field) {} else {
                        var l = d(i, 1, o, o + n[0][s].colspan) - 16;
                        i.header1.add(i.header2).find(".datagrid-cell-group:eq(" + a + ")").width(l);
                        a++;
                        o += n[0][s].colspan;
                    }
                }
            }
        }
        function d(e, t, i, a) {
            var n = 0;
            e.header1.add(e.header2).find(".datagrid-header-row:eq(" + t + ")").find(".datagrid-cell").each(function(e) {
                if (e >= i && e < a) {
                    n += parseInt($(this).width()) + 16;
                }
            });
            return n;
        }
    }
    function _596(e) {
        var t = $.data(e, "datagrid").dc;
        t.body1.add(t.body2).find("td.datagrid-td-merged").each(function() {
            var t = $(this);
            var i = t.attr("colspan") || 1;
            var a = _getColumnOption(e, t.attr("field")).width;
            for (var n = 1; n < i; n++) {
                t = t.next();
                a += _getColumnOption(e, t.attr("field")).width + 1;
            }
            $(this).children("div.datagrid-cell")._outerWidth(a);
        });
    }
    function _59b(e, t) {
        var i = $.data(e, "datagrid").dc;
        (t || i.view).find("div.datagrid-editable").each(function() {
            var t = $(this);
            var i = t.parent().attr("field");
            var a = $(e).datagrid("getColumnOption", i);
            t._outerWidth(a.width);
            var n = $.data(this, "datagrid.editor");
            if (n.actions.resize) {
                n.actions.resize(n.target, t.width());
            }
        });
    }
    function _getColumnOption(e, t) {
        function i(e) {
            if (e) {
                for (var i = 0; i < e.length; i++) {
                    var a = e[i];
                    for (var n = 0; n < a.length; n++) {
                        var r = a[n];
                        if (r.field == t) {
                            return r;
                        }
                    }
                }
            }
            return null;
        }
        var a = $.data(e, "datagrid").options;
        var n = i(a.columns);
        if (!n) {
            n = i(a.frozenColumns);
        }
        return n;
    }
    function _557(e, t) {
        var i = $.data(e, "datagrid").options;
        var a = t == true ? i.frozenColumns || [ [] ] : i.columns;
        if (a.length == 0) {
            return [];
        }
        var n = [];
        function r(e) {
            var t = 0;
            var i = 0;
            while (true) {
                if (n[i] == undefined) {
                    if (t == e) {
                        return i;
                    }
                    t++;
                }
                i++;
            }
        }
        function o(e) {
            var t = [];
            var i = 0;
            for (var o = 0; o < a[e].length; o++) {
                var s = a[e][o];
                if (s.field) {
                    t.push([ i, s.field ]);
                }
                i += parseInt(s.colspan || "1");
            }
            for (var o = 0; o < t.length; o++) {
                t[o][0] = r(t[o][0]);
            }
            for (var o = 0; o < t.length; o++) {
                var l = t[o];
                n[l[0]] = l[1];
            }
        }
        for (var s = 0; s < a.length; s++) {
            o(s);
        }
        var l = [];
        if (!!$.data(e, "amendDataDisplay") && !!$.data(e, "filelds")) {
            if ($.isArray($.data(e, "filelds")[0])) {
                if (t) {
                    l = l.concat($.data(e, "filelds")[0]);
                } else {
                    l = l.concat($.data(e, "filelds")[1]);
                }
            } else {
                l = l.concat($.data(e, "filelds"));
            }
            for (var s = 0; s < n.length; s++) {
                var d = /^ID/;
                if (d.test(n[s])) {
                    l.splice(s, 0, n[s]);
                }
            }
            return l;
        } else {
            return n;
        }
    }
    function _validHeaderCheckboxByData(e, t, i) {
        var a = 0, n = 0;
        e.find("td[field=" + i + '] input[type="checkbox"]').each(function() {
            var e = $(this);
            if (e.prop("disabled")) return true;
            a++;
            if (e.prop("checked")) {
                n++;
            } else {
                return false;
            }
        });
        var r = $('td[field="' + i + '"] input[type="checkbox"]', t);
        if (n == a) {
            if (r.hasClass("checkbox-f")) {
                r.prop("checked", true);
                r.next().addClass("checked");
            } else {
                r.prop("checked", true);
            }
        } else {
            if (r.hasClass("checkbox-f")) {
                r.prop("checked", false);
                r.next().removeClass("checked");
            } else {
                r.prop("checked", false);
            }
        }
    }
    function _checkHeaderCheckbox(e, t) {
        var i = $('.datagrid-row [field="' + t + '"]', e);
        i.each(function(e, t) {
            var i = $('input[type="checkbox"]', t);
            if (i.prop("disabled")) return;
            if (i.hasClass("checkbox-f")) {
                i.checkbox("check");
            } else {
                i.prop("checked", true);
            }
        });
    }
    function _uncheckHeaderCheckbox(e, t) {
        var i = $('.datagrid-row [field="' + t + '"]', e);
        i.each(function(e, t) {
            var i = $('input[type="checkbox"]', t);
            if (i.prop("disabled")) return;
            if (i.hasClass("checkbox-f")) {
                i.checkbox("uncheck");
            } else {
                i.prop("checked", false);
            }
        });
    }
    function _578(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        var n = i.dc;
        t = a.loadFilter.call(e, t);
        t.total = parseInt(t.total);
        i.data = t;
        if (t.footer) {
            i.footer = t.footer;
        }
        if (!a.remoteSort && a.sortName) {
            var r = a.sortName.split(",");
            var o = a.sortOrder.split(",");
            t.rows.sort(function(t, i) {
                var a = 0;
                for (var n = 0; n < r.length; n++) {
                    var s = r[n];
                    var l = o[n];
                    var d = _getColumnOption(e, s);
                    var c = d.sorter || function(e, t) {
                        return e == t ? 0 : e > t ? 1 : -1;
                    };
                    a = c(t[s], i[s]) * (l == "asc" ? 1 : -1);
                    if (a != 0) {
                        return a;
                    }
                }
                return a;
            });
        }
        if (a.view.onBeforeRender) {
            a.view.onBeforeRender.call(a.view, e, t.rows);
        }
        a.view.render.call(a.view, e, n.body2, false);
        a.view.render.call(a.view, e, n.body1, true);
        if (a.showFooter) {
            a.view.renderFooter.call(a.view, e, n.footer2, false);
            a.view.renderFooter.call(a.view, e, n.footer1, true);
        }
        if (a.view.onAfterRender) {
            a.view.onAfterRender.call(a.view, e);
        }
        i.ss.clean();
        if (a.clearSelectionsOnload) $(e).datagrid("clearSelections");
        if (a.rownumbers && a.fixRowNumber) {
            $(e).datagrid("fixRowNumber");
        }
        a.onLoadSuccess.call(e, t);
        if (a.columns.length > 0) {
            for (var s = 0; s < a.columns[0].length; s++) {
                if (true == a.columns[0][s].headerCheckbox) {
                    _validHeaderCheckboxByData(n.body2, n.header2, a.columns[0][s].field);
                }
            }
        }
        var l = $(e).datagrid("getPager");
        if (l.length) {
            var d = l.pagination("options");
            if (d.total != t.total || a.pageNumber < 1) {
                l.pagination("refresh", {
                    total: t.total
                });
                if (a.pageNumber != d.pageNumber) {
                    a.pageNumber = d.pageNumber;
                    _577(e);
                }
            }
        }
        _526(e);
        n.body2.triggerHandler("scroll");
        _5af(e);
        $(e).datagrid("autoSizeColumn");
    }
    function _5af(e) {
        var t = $.data(e, "datagrid");
        var i = t.options;
        if (i.idField) {
            var a = $.data(e, "treegrid") ? true : false;
            var n = i.onSelect;
            var r = i.onCheck;
            i.onSelect = i.onCheck = function() {};
            var o = i.finder.getRows(e);
            for (var s = 0; s < o.length; s++) {
                var l = o[s];
                var d = a ? l[i.idField] : s;
                if (i.view.type == "scrollview") d += i.view.index || 0;
                if (c(t.selectedRows, l)) {
                    _5cb(e, d, true);
                }
                if (c(t.checkedRows, l)) {
                    _5d2(e, d, true);
                }
            }
            i.onSelect = n;
            i.onCheck = r;
        }
        function c(e, t) {
            for (var a = 0; a < e.length; a++) {
                if (e[a][i.idField] == t[i.idField]) {
                    e[a] = t;
                    return true;
                }
            }
            return false;
        }
    }
    function _5b7(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        var n = i.data.rows;
        if (typeof t == "object") {
            return _502(n, t);
        } else {
            for (var r = 0; r < n.length; r++) {
                if (a.idField) {
                    if (n[r][a.idField] == t) {
                        return r;
                    }
                }
            }
            return -1;
        }
    }
    function _5ba(e) {
        var t = $.data(e, "datagrid");
        var i = t.options;
        var a = t.data;
        if (i.idField) {
            return t.selectedRows;
        } else {
            var n = [];
            i.finder.getTr(e, "", "selected", 2).each(function() {
                n.push(i.finder.getRow(e, $(this)));
            });
            return n;
        }
    }
    function _5bd(e) {
        var t = $.data(e, "datagrid");
        var i = t.options;
        if (i.idField) {
            return t.checkedRows;
        } else {
            var a = [];
            i.finder.getTr(e, "", "checked", 2).each(function() {
                a.push(i.finder.getRow(e, $(this)));
            });
            return a;
        }
    }
    function _5c0(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.dc;
        var n = i.options;
        var r = n.finder.getTr(e, t);
        if (r.length) {
            if (r.closest("table").hasClass("datagrid-btable-frozen")) {
                return;
            }
            var o = a.view2.children("div.datagrid-header")._outerHeight();
            var s = a.body2;
            var l = s.outerHeight(true) - s.outerHeight();
            if (r.length > 1) r = r.eq(1);
            var d = r.position().top - o - l;
            if (d < 0) {
                s.scrollTop(s.scrollTop() + d);
            } else {
                if (d + r._outerHeight() > s.height() - 18) {
                    s.scrollTop(s.scrollTop() + d + r._outerHeight() - s.height() + 18);
                }
            }
        }
    }
    function _5c7(e, t, i) {
        var a = $.data(e, "datagrid");
        var n = a.options;
        n.finder.getTr(e, a.highlightIndex).removeClass("datagrid-row-over");
        n.finder.getTr(e, t).addClass("datagrid-row-over");
        var r = a.highlightIndex;
        a.highlightIndex = t;
        if (i === true && r == t) {} else {
            n.onHighlightRow.call(e, t, a.data.rows[t]);
        }
    }
    function _5cb(e, t, i) {
        var a = $.data(e, "datagrid");
        var n = a.dc;
        var r = a.options;
        var o = a.selectedRows;
        var s = r.finder.getRow(e, t);
        if (false === r.onBeforeSelect.call(e, t, s)) {
            return;
        }
        if (r.singleSelect) {
            _unselectAll(e);
            o.splice(0, o.length);
        }
        if (!i && r.checkOnSelect) {
            _5d2(e, t, true);
        }
        if (r.idField) {
            _505(o, r.idField, s);
        }
        r.finder.getTr(e, t).addClass("datagrid-row-selected");
        r.onSelect.call(e, t, s);
        _5c0(e, t);
    }
    function _5d3(e, t, i) {
        var a = $.data(e, "datagrid");
        var n = a.dc;
        var r = a.options;
        var o = r.finder.getRow(e, t);
        if (false === r.onBeforeUnselect.call(e, t, o)) {
            return;
        }
        var s = $.data(e, "datagrid").selectedRows;
        if (!i && r.checkOnSelect) {
            _uncheckRow(e, t, true);
        }
        r.finder.getTr(e, t).removeClass("datagrid-row-selected");
        if (r.idField) {
            _503(s, r.idField, o[r.idField]);
        }
        r.onUnselect.call(e, t, o);
    }
    function _5da(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        var n = a.finder.getRows(e);
        var r = $.data(e, "datagrid").selectedRows;
        if (!t && a.checkOnSelect) {
            _5df(e, true);
        }
        a.finder.getTr(e, "", "allbody").addClass("datagrid-row-selected");
        if (a.idField) {
            for (var o = 0; o < n.length; o++) {
                _505(r, a.idField, n[o]);
            }
        }
        a.onSelectAll.call(e, n);
    }
    function _unselectAll(e, t, i) {
        var a = $.data(e, "datagrid");
        var n = a.options;
        var r = n.finder.getRows(e);
        var o = $.data(e, "datagrid").selectedRows;
        var s = _5b7(e, o[0]);
        if (!t && n.checkOnSelect) {
            _uncheckAll(e, true, i);
        }
        n.finder.getTr(e, "", "selected").removeClass("datagrid-row-selected");
        if (s > -1) n.onUnselect.call(e, s, o[0]);
        if (n.idField) {
            for (var l = 0; l < r.length; l++) {
                _503(o, n.idField, r[l][n.idField]);
            }
            if (i) o.length = 0;
        }
        n.onUnselectAll.call(e, r);
    }
    function shiftUncheckRow(e, t, i) {
        var a = t[0].id;
        var n = a.slice(0, a.lastIndexOf("-") + 1);
        var r = parseInt(e) + 1;
        while (r > e) {
            if (document.getElementById(n + r)) {
                if (document.getElementById(n + r).className.indexOf("datagrid-row-selected") > -1) {
                    _uncheckRow(i, r);
                } else {
                    break;
                }
            } else {
                break;
            }
            r++;
        }
    }
    function shiftCheckRow(e, t, i) {
        var a = t[0].id;
        var n = a.slice(0, a.lastIndexOf("-") + 1);
        var r = parseInt(e) - 1;
        var o = -1;
        while (r > -1) {
            if (document.getElementById(n + r).className.indexOf("datagrid-row-selected") > -1) {
                o = r;
                break;
            }
            r--;
        }
        if (o > -1) {
            r = o + 1;
            while (r < e) {
                _5d2(i, r);
                r++;
            }
        }
    }
    function _5d2(e, t, i) {
        var a = $.data(e, "datagrid");
        var n = a.options;
        var r = n.finder.getRow(e, t);
        if ("undefined" == typeof r) return;
        if (false === n.onBeforeCheck.call(e, t, r)) {
            var o = n.finder.getTr(e, t);
            if (!o.hasClass("datagrid-row-checked")) {
                var s = o.find("div.datagrid-cell-check input[type=checkbox]");
                s._propAttr("checked", false);
            }
            return;
        }
        if (!i && n.selectOnCheck) {
            _5cb(e, t, true);
        }
        var o = n.finder.getTr(e, t).addClass("datagrid-row-checked");
        var s = o.find("div.datagrid-cell-check input[type=checkbox]");
        s._propAttr("checked", true);
        o = n.finder.getTr(e, "", "checked", 2);
        if (o.length == n.finder.getRows(e).length) {
            var l = a.dc;
            var d = l.header1.add(l.header2);
            d.find("div.datagrid-header-check input[type=checkbox]")._propAttr("checked", true);
        }
        if (n.idField) {
            _505(a.checkedRows, n.idField, r);
        }
        n.onCheck.call(e, t, r);
    }
    function _uncheckRow(e, t, i) {
        var a = $.data(e, "datagrid");
        var n = a.options;
        var r = n.finder.getRow(e, t);
        if (false === n.onBeforeUncheck.call(e, t, r)) {
            var o = n.finder.getTr(e, t);
            if (o.hasClass("datagrid-row-checked")) {
                var s = o.find("div.datagrid-cell-check input[type=checkbox]");
                s._propAttr("checked", true);
            }
            return;
        }
        if (!i && n.selectOnCheck) {
            _5d3(e, t, true);
        }
        var o = n.finder.getTr(e, t).removeClass("datagrid-row-checked");
        var s = o.find("div.datagrid-cell-check input[type=checkbox]");
        s._propAttr("checked", false);
        var l = a.dc;
        var d = l.header1.add(l.header2);
        d.find("div.datagrid-header-check input[type=checkbox]")._propAttr("checked", false);
        if (n.idField) {
            _503(a.checkedRows, n.idField, r[n.idField]);
        }
        n.onUncheck.call(e, t, r);
    }
    function _5df(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        var n = a.finder.getRows(e);
        if (!t && a.selectOnCheck) {
            _5da(e, true);
        }
        var r = i.dc;
        var o = r.header1.add(r.header2).find(".datagrid-header-check input[type=checkbox]");
        var s = a.finder.getTr(e, "", "allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
        o.add(s)._propAttr("checked", true);
        if (a.idField) {
            for (var l = 0; l < n.length; l++) {
                _505(i.checkedRows, a.idField, n[l]);
            }
        }
        a.onCheckAll.call(e, n);
    }
    function _uncheckAll(e, t, i) {
        var a = $.data(e, "datagrid");
        var n = a.options;
        var r = n.finder.getRows(e);
        if (!t && n.selectOnCheck) {
            _unselectAll(e, true, i);
        }
        var o = a.dc;
        var s = o.header1.add(o.header2).find("input[type=checkbox]");
        var l = n.finder.getTr(e, "", "checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
        s.add(l)._propAttr("checked", false);
        if (n.idField) {
            for (var d = 0; d < r.length; d++) {
                _503(a.checkedRows, n.idField, r[d][n.idField]);
            }
            if (i) a.checkedRows.length = 0;
        }
        n.onUncheckAll.call(e, r);
    }
    function _5f7(e, t) {
        var i = $.data(e, "datagrid").options;
        var a = i.finder.getTr(e, t);
        var n = i.finder.getRow(e, t);
        if (a.hasClass("datagrid-row-editing")) {
            return;
        }
        if (i.onBeforeEdit.call(e, t, n) == false) {
            return;
        }
        a.addClass("datagrid-row-editing");
        _5fa(e, t);
        _59b(e, a);
        a.find("div.datagrid-editable").each(function() {
            var e = $(this).parent().attr("field");
            var t = $.data(this, "datagrid.editor");
            t.actions.setValue(t.target, n[e]);
        });
        _5fc(e, t);
        i.onBeginEdit.call(e, t, n);
    }
    function _5fd(e, t, i) {
        var a = $.data(e, "datagrid").options;
        var n = $.data(e, "datagrid").updatedRows;
        var r = $.data(e, "datagrid").insertedRows;
        var o = a.finder.getTr(e, t);
        var s = a.finder.getRow(e, t);
        if (!o.hasClass("datagrid-row-editing")) {
            return;
        }
        if (!i) {
            if (!_5fc(e, t)) {
                return;
            }
            var l = false;
            var d = {};
            o.find("div.datagrid-editable").each(function() {
                var e = $(this).parent().attr("field");
                var t = $.data(this, "datagrid.editor");
                var i = t.actions.getValue(t.target);
                if ("object" == typeof i) {
                    if (JSON.stringify(s[e]) != JSON.stringify(i)) {
                        s[e] = i;
                        l = true;
                        d[e] = i;
                    }
                } else {
                    if (s[e] != i) {
                        s[e] = i;
                        l = true;
                        d[e] = i;
                    }
                }
            });
            if (l) {
                if (_502(r, s) == -1) {
                    if (_502(n, s) == -1) {
                        n.push(s);
                    }
                }
            }
            a.onEndEdit.call(e, t, s, d);
        }
        o.removeClass("datagrid-row-editing");
        _607(e, t);
        $(e).datagrid("refreshRow", t);
        if (!i) {
            if (a.showChangedStyle) {
                if (n.length > 0 || r.length > 0) {
                    for (var c in d) {
                        o.children('td[field="' + c + '"]').addClass("datagrid-value-changed");
                    }
                }
            }
            a.onAfterEdit.call(e, t, s, d);
        } else {
            a.onCancelEdit.call(e, t, s);
        }
    }
    function _608(e, t) {
        var i = $.data(e, "datagrid").options;
        var a = i.finder.getTr(e, t);
        var n = [];
        a.children("td").each(function() {
            var e = $(this).find("div.datagrid-editable");
            if (e.length) {
                var t = $.data(e[0], "datagrid.editor");
                n.push(t);
            }
        });
        return n;
    }
    function _60c(e, t) {
        var i = _608(e, t.index != undefined ? t.index : t.id);
        for (var a = 0; a < i.length; a++) {
            if (i[a].field == t.field) {
                return i[a];
            }
        }
        return null;
    }
    function _5fa(e, t) {
        var i = $.data(e, "datagrid").options;
        var a = i.finder.getTr(e, t);
        a.children("td").each(function() {
            var t = $(this).find("div.datagrid-cell");
            var a = $(this).attr("field");
            var n = _getColumnOption(e, a);
            if (n && n.editor) {
                var r, o;
                if (typeof n.editor == "string") {
                    r = n.editor;
                } else {
                    r = n.editor.type;
                    o = n.editor.options;
                }
                var s = i.editors[r];
                if (s) {
                    var l = t.html();
                    var d = t._outerWidth();
                    t.addClass("datagrid-editable");
                    t._outerWidth(d);
                    t.html('<table border="0" cellspacing="0" cellpadding="1"><tr><td></td></tr></table>');
                    t.children("table").bind("click dblclick contextmenu", function(e) {
                        e.stopPropagation();
                    });
                    $.data(t[0], "datagrid.editor", {
                        actions: s,
                        target: s.init(t.find("td"), o),
                        field: a,
                        type: r,
                        oldHtml: l
                    });
                }
            }
        });
        _526(e, t, true);
    }
    function _607(e, t) {
        var i = $.data(e, "datagrid").options;
        var a = i.finder.getTr(e, t);
        a.children("td").each(function() {
            var e = $(this).find("div.datagrid-editable");
            if (e.length) {
                var t = $.data(e[0], "datagrid.editor");
                if (t.actions.destroy) {
                    t.actions.destroy(t.target);
                }
                e.html(t.oldHtml);
                $.removeData(e[0], "datagrid.editor");
                e.removeClass("datagrid-editable");
                e.css("width", "");
            }
        });
    }
    function _5fc(e, t) {
        var i = $.data(e, "datagrid").options.finder.getTr(e, t);
        if (!i.hasClass("datagrid-row-editing")) {
            return true;
        }
        var a = i.find(".validatebox-text");
        a.validatebox("validate");
        a.trigger("mouseleave");
        var n = i.find(".validatebox-invalid");
        return n.length == 0;
    }
    function _61d(e, t) {
        var i = $.data(e, "datagrid").insertedRows;
        var a = $.data(e, "datagrid").deletedRows;
        var n = $.data(e, "datagrid").updatedRows;
        if (!t) {
            var r = [];
            r = r.concat(i);
            r = r.concat(a);
            r = r.concat(n);
            return r;
        } else {
            if (t == "inserted") {
                return i;
            } else {
                if (t == "deleted") {
                    return a;
                } else {
                    if (t == "updated") {
                        return n;
                    }
                }
            }
        }
        return [];
    }
    function _623(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        var n = i.data;
        var r = i.insertedRows;
        var o = i.deletedRows;
        $(e).datagrid("cancelEdit", t);
        var s = a.finder.getRow(e, t);
        if (_502(r, s) >= 0) {
            _503(r, s);
        } else {
            o.push(s);
        }
        _503(i.selectedRows, a.idField, s[a.idField]);
        _503(i.checkedRows, a.idField, s[a.idField]);
        a.view.deleteRow.call(a.view, e, t);
        if (a.height == "auto") {
            _526(e);
        }
        $(e).datagrid("getPager").pagination("refresh", {
            total: n.total
        });
    }
    function _629(e, t) {
        var i = $.data(e, "datagrid").data;
        var a = $.data(e, "datagrid").options.view;
        var n = $.data(e, "datagrid").insertedRows;
        a.insertRow.call(a, e, t.index, t.row);
        n.push(t.row);
        $(e).datagrid("getPager").pagination("refresh", {
            total: i.total
        });
    }
    function _62d(e, t) {
        var i = $.data(e, "datagrid").data;
        var a = $.data(e, "datagrid").options.view;
        var n = $.data(e, "datagrid").insertedRows;
        a.insertRow.call(a, e, null, t);
        n.push(t);
        $(e).datagrid("getPager").pagination("refresh", {
            total: i.total
        });
    }
    function _630(e) {
        var t = $.data(e, "datagrid");
        var i = t.data;
        var a = i.rows;
        var n = [];
        for (var r = 0; r < a.length; r++) {
            n.push($.extend({}, a[r]));
        }
        t.originalRows = n;
        t.updatedRows = [];
        t.insertedRows = [];
        t.deletedRows = [];
    }
    function _634(e) {
        var t = $.data(e, "datagrid").data;
        var i = true;
        for (var a = 0, n = t.rows.length; a < n; a++) {
            if (_5fc(e, a)) {
                _5fd(e, a, false);
            } else {
                i = false;
            }
        }
        if (i) {
            _630(e);
        }
    }
    function _636(e) {
        var t = $.data(e, "datagrid");
        var i = t.options;
        var a = t.originalRows;
        var n = t.insertedRows;
        var r = t.deletedRows;
        var o = t.selectedRows;
        var s = t.checkedRows;
        var l = t.data;
        function d(e) {
            var t = [];
            for (var a = 0; a < e.length; a++) {
                t.push(e[a][i.idField]);
            }
            return t;
        }
        function c(t, i) {
            for (var a = 0; a < t.length; a++) {
                var n = _5b7(e, t[a]);
                if (n >= 0) {
                    (i == "s" ? _5cb : _5d2)(e, n, true);
                }
            }
        }
        for (var f = 0; f < l.rows.length; f++) {
            _5fd(e, f, true);
        }
        var u = d(o);
        var h = d(s);
        o.splice(0, o.length);
        s.splice(0, s.length);
        l.total += r.length - n.length;
        l.rows = a;
        _578(e, l);
        c(u, "s");
        c(h, "c");
        _630(e);
    }
    function _reload2(e) {
        var t = $.data(e, "datagrid");
        var i = t.options;
        if (i.toolBarOriginalData == null) {
            i.toolBarOriginalData = $(e).datagrid("getData");
        }
        if (i.toolBarOriginalData) {
            $(e).datagrid("loadData", i.toolBarOriginalData);
        }
    }
    function addToolLoadFilter(e) {
        var t = $.data(e, "datagrid").options;
        t.oldLoadFilter = t.loadFilter;
        t.loadFilter = function(i) {
            i = t.oldLoadFilter.call(this, i);
            var a = $(e).closest(".datagrid-wrap").find(".datagrid-toolbar");
            var n = a.find(".datagrid-toolbar-findbox").val().trim().toUpperCase();
            var r = {}, o = true;
            a.find(".datagrid-filter-htable").find("td").each(function() {
                var e = $(this).attr("field");
                var t = $(this).find('input[type="text"]');
                if (e && t.length > 0 && t.val() != "") {
                    r[e] = t.val().trim().toUpperCase();
                    o = false;
                }
            });
            if (typeof i.length == "number" && typeof i.splice == "function") {
                i = {
                    total: i.length,
                    rows: i
                };
            }
            if (n == "" && o) return i;
            var s = [];
            var l = i.originalRows || i.rows;
            for (var d = 0; d < l.length; d++) {
                var c = l[d];
                var f = true;
                var u = [];
                for (var h in c) {
                    if (c.hasOwnProperty(h)) {
                        if ("string" !== typeof c[h] && "number" !== typeof c[h]) {
                            break;
                        }
                        if (r.hasOwnProperty(h) && r[h] != "") {
                            if (c[h].toString().toUpperCase().indexOf(r[h]) == -1 && $.hisui.toChineseSpell(c[h].toString()).toUpperCase().indexOf(r[h]) == -1) {
                                f = false;
                                break;
                            }
                        }
                        u.push(c[h]);
                    }
                }
                if (f && (u.join(",").toUpperCase().indexOf(n) == -1 && $.hisui.toChineseSpell(u.join(",")).toUpperCase().indexOf(n) == -1)) {
                    f = false;
                }
                if (f) s.push(l[d]);
            }
            var p = {
                total: s.length,
                rows: s
            };
            return p;
        };
    }
    function _577(e, t) {
        var i = $.data(e, "datagrid").options;
        if (t) {
            i.queryParams = t;
        }
        var a = $.extend({}, i.queryParams);
        if (i.pagination) {
            $.extend(a, {
                page: i.pageNumber,
                rows: i.pageSize
            });
        }
        if (i.sortName) {
            $.extend(a, {
                sort: i.sortName,
                order: i.sortOrder
            });
        }
        if (i.onBeforeLoad.call(e, a) == false) {
            return;
        }
        $(e).datagrid("loading");
        setTimeout(function() {
            n();
        }, 0);
        function n() {
            var t = i.loader.call(e, a, function(t) {
                setTimeout(function() {
                    $(e).datagrid("loaded");
                }, 0);
                _578(e, t);
                setTimeout(function() {
                    _630(e);
                }, 0);
            }, function() {
                setTimeout(function() {
                    $(e).datagrid("loaded");
                }, 0);
                i.onLoadError.apply(e, arguments);
            });
            if (t == false) {
                $(e).datagrid("loaded");
            }
        }
    }
    function _649(e, t) {
        var i = $.data(e, "datagrid").options;
        t.rowspan = t.rowspan || 1;
        t.colspan = t.colspan || 1;
        if (t.rowspan == 1 && t.colspan == 1) {
            return;
        }
        var a = i.finder.getTr(e, t.index != undefined ? t.index : t.id);
        if (!a.length) {
            return;
        }
        var n = i.finder.getRow(e, a);
        var r = n[t.field];
        var o = a.find('td[field="' + t.field + '"]');
        o.attr("rowspan", t.rowspan).attr("colspan", t.colspan);
        o.addClass("datagrid-td-merged");
        for (var s = 1; s < t.colspan; s++) {
            o = o.next();
            o.hide();
            n[o.attr("field")] = r;
        }
        for (var s = 1; s < t.rowspan; s++) {
            a = a.next();
            if (!a.length) {
                break;
            }
            var n = i.finder.getRow(e, a);
            var o = a.find('td[field="' + t.field + '"]').hide();
            n[o.attr("field")] = r;
            for (var l = 1; l < t.colspan; l++) {
                o = o.next();
                o.hide();
                n[o.attr("field")] = r;
            }
        }
        _596(e);
    }
    function getColumns(e) {
        if (e.columnsUrl != null) {
            var t = "";
            $.ajax({
                url: e.columnsUrl,
                async: false,
                dataType: "json",
                success: function(e) {
                    t = e;
                }
            });
            return t;
        }
        return "";
    }
    var _handerColumns = function(e, t, i) {
        if (!!e.queryName) {
            if (null == e.editColumnsGrantUrl) e.editColumnsGrantUrl = $URL + "?ClassName=BSP.SYS.SRV.SSGroup&MethodName=CurrAllowColumnMgr";
            if (null == e.columnsUrl) e.columnsUrl = $URL + "?ClassName=websys.Query&MethodName=ColumnDefJson&cn=" + e.className + "&qn=" + e.queryName;
            if (null == e.editColumnsPage) e.editColumnsPage = "../csp/websys.component.customiselayout.csp?ID=1872&DHCICARE=2&CONTEXT=K" + e.className + ":" + e.queryName;
            if ("" != e.editColumnsPage && "function" == typeof window.websys_getMWToken) e.editColumnsPage += "&MWToken=" + websys_getMWToken();
        }
        if (e.columnsUrl) {
            var a = getColumns(e);
            if (a) {
                if (!e.sortName) {
                    e.sortName = a.sortColumnDefault;
                    e.sortOrder = a.sortOrderDefault;
                }
                var n = function(e, t) {
                    var i;
                    if (e) {
                        for (i in t) {
                            if (i == "title") {
                                e[i] = t[i];
                            }
                            if (t.hasOwnProperty(i) && e[i] === undefined) {
                                e[i] = t[i];
                            }
                        }
                    }
                    return e;
                };
                var r = e.columns;
                if (r && r.length > 0 && a.cm && a.cm.length > 0) {
                    for (var o = 0; o < a.cm.length; o++) {
                        var s = $.hisui.getArrayItem(r[0], "field", a.cm[o].field);
                        if (s) {
                            n(a.cm[o], s);
                        }
                    }
                }
                var l = e.defaultsColumns;
                if (l && l.length > 0 && a.cm && a.cm.length > 0) {
                    if ($.isArray(l[0])) {
                        l = l[0];
                    }
                    for (var o = 0; o < a.cm.length; o++) {
                        var s = $.hisui.getArrayItem(l, "field", a.cm[o].field);
                        if (s) {
                            n(a.cm[o], s);
                        }
                    }
                }
                if (e.onColumnsLoad) e.onColumnsLoad.call(i, a.cm);
                if (a.cm && a.cm.length > 0) {
                    e.columns = [ a.cm ];
                    t.columns = e.columns;
                }
                if (a.pageSize > 0) {
                    e.pageSize = a.pageSize;
                    if (e.pageList && $.isArray(e.pageList) && $.inArray(e.pageSize, e.pageList) == -1) {
                        e.pageList.push(e.pageSize);
                        e.pageList.sort(function(e, t) {
                            return e - t;
                        });
                    }
                }
            }
        }
    };
    $.fn.datagrid = function(e, t) {
        if (typeof e == "string") {
            return $.fn.datagrid.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "datagrid");
            var i;
            if (t) {
                i = $.extend(t.options, e);
                t.options = i;
                if ("function" == typeof i.onInitBefore) i.onInitBefore.call(this, i);
                _handerColumns(i, e, t);
            } else {
                i = $.extend({}, $.extend({}, $.fn.datagrid.defaults, {
                    queryParams: {}
                }), $.fn.datagrid.parseOptions(this), e);
                if ("function" == typeof i.onInitBefore) i.onInitBefore.call(this, i);
                _handerColumns(i, e, t);
                $(this).css("width", "").css("height", "");
                var a = _53a(this, i.rownumbers);
                if (!i.columns) {
                    i.columns = a.columns;
                }
                if (!i.frozenColumns) {
                    i.frozenColumns = a.frozenColumns;
                }
                i.columns = $.extend(true, [], i.columns);
                i.frozenColumns = $.extend(true, [], i.frozenColumns);
                i.view = $.extend({}, i.view);
                $.data(this, "datagrid", {
                    options: i,
                    panel: a.panel,
                    dc: a.dc,
                    ss: null,
                    selectedRows: [],
                    checkedRows: [],
                    data: {
                        total: 0,
                        rows: []
                    },
                    originalRows: [],
                    updatedRows: [],
                    insertedRows: [],
                    deletedRows: []
                });
            }
            var n = this;
            if (i.showFilterToolbar && (i.toolbar == null || i.toolbar == "")) {
                addToolLoadFilter(n);
                i.toolbar = [ {
                    type: "input",
                    "class": "textbox datagrid-toolbar-findbox",
                    placeholder: i.like,
                    handler: function(e) {
                        if (e.keyCode == 13) {
                            $(n).datagrid("reload2");
                        }
                    },
                    notTrans: true
                }, {
                    text: i.findBtn,
                    iconCls: "icon-search",
                    handler: function() {
                        $(n).datagrid("reload2");
                    },
                    notTrans: true
                }, {
                    text: i.clearBtn,
                    iconCls: "icon-clear-screen",
                    handler: function() {
                        var e = $(n).closest(".datagrid-wrap").find(".datagrid-toolbar");
                        e.find(".datagrid-toolbar-findbox").val("");
                        e.find(".datagrid-filter-htable").find('td input[type="text"]').val("");
                        $(n).datagrid("reload2");
                        i.toolBarOriginalData = null;
                    },
                    notTrans: true
                }, {
                    text: i.advancedBtn,
                    iconCls: "icon-find-fee-itm",
                    handler: function() {
                        var e = $(this).closest("table");
                        if (e.next().length == 0) {
                            $(this).find(".l-btn-text").text(i.advanced2Btn);
                            var t = $(this).closest(".datagrid-wrap").find(".datagrid-view1 .datagrid-header .datagrid-header-row");
                            var a = $(this).closest(".datagrid-wrap").find(".datagrid-view2 .datagrid-header .datagrid-header-row");
                            var r = "";
                            if (t.length > 0) {
                                r += t.html();
                            }
                            if (a.length > 0) {
                                r += a.html();
                            }
                            var o = $('<table class="datagrid-filter-htable" border="0" cellspacing="0" cellpadding="0" style="height: 35px;"><tr>' + r + "</tr></table>").insertAfter(e);
                            o.find(".datagrid-cell").each(function() {
                                var e = $(this).text();
                                $(this).css({
                                    padding: "0 8px"
                                }).removeClass("datagrid-cell");
                                $(this).html('<input type="text" placeholder="' + e + '" class="datagrid-cell-filter">');
                            });
                            o.on("keydown", function(e) {
                                if (e.keyCode == 13) {
                                    $(n).datagrid("reload2");
                                }
                            });
                        } else {
                            $(this).find(".l-btn-text").text(i.advancedBtn);
                            if (e.next().css("display") !== "none") e.next().hide(); else e.next().show();
                        }
                    },
                    notTrans: true
                } ];
            }
            _545(this);
            _559(this);
            _515(this);
            if (i.data) {
                _578(this, i.data);
                _630(this);
            } else {
                var r = $.fn.datagrid.parseData(this);
                if (r.total > 0) {
                    _578(this, r);
                    _630(this);
                }
            }
            if (!i.lazy && i.url) {
                _577(this);
            }
        });
    };
    var _651 = {
        text: {
            init: function(e, t) {
                var i = $('<input type="text" class="datagrid-editable-input">').appendTo(e);
                return i;
            },
            getValue: function(e) {
                return $(e).val();
            },
            setValue: function(e, t) {
                $(e).val(t);
            },
            resize: function(e, t) {
                $(e)._outerWidth(t)._outerHeight(30);
            }
        },
        textarea: {
            init: function(e, t) {
                var i = '<textarea class="textbox datagrid-editable-input" style="';
                if ("undefined" != typeof t) {
                    if (t.height) i += "height:" + t.height + ";";
                    if (t.width) i += "width:" + t.width + ";";
                }
                var a = $(i + '"></textarea>').appendTo(e);
                if ("undefined" != typeof t) {
                    a.validatebox(t);
                }
                return a;
            },
            destroy: function(e) {
                if (e.length > 0 && e.hasClass("validatebox-text")) e.validatebox("destroy");
            },
            getValue: function(e) {
                return $(e).val();
            },
            setValue: function(e, t) {
                $(e).val(t);
            },
            resize: function(e, t) {
                $(e)._outerWidth(t);
            }
        },
        celltextarea: {
            init: function(e, t) {
                $("<div></div>").appendTo(e);
                var i = '<textarea class="celltextarea textbox datagrid-editable-input" style="position:absolute;';
                if ("undefined" != typeof t) {
                    if (t.height) i += "height:" + t.height + ";";
                    if (t.width) i += "width:" + t.width + ";";
                }
                var a = $(i + '"></textarea>').appendTo(e);
                if ("undefined" != typeof t) {
                    a.validatebox(t);
                }
                return a;
            },
            destroy: function(e) {
                e.off(".celltextarea");
                e.closest(".datagrid-body").off(".celltextarea");
                if (e.length > 0 && e.hasClass("validatebox-text")) e.validatebox("destroy");
            },
            getValue: function(e) {
                return $(e).val();
            },
            setValue: function(e, t) {
                $(e).val(t);
                $(e).prev().text(t);
            },
            resize: function(e, t) {
                $(e)._outerWidth(t);
                var i = function(e) {
                    var t = $(e);
                    var i = t.closest("div.datagrid-cell").closest("td").height();
                    var a = t.closest(".datagrid-view2")[0].offsetHeight;
                    var n = t.parent().offset().top;
                    var r = t.closest(".datagrid-body").offset().top;
                    var o = n - r;
                    var s = true;
                    if (o + i > a - o) {
                        s = false;
                    }
                    var l = Math.max(o + i, a - o);
                    l = Math.min(l, a - 32);
                    if (i > a - 32) {
                        l = a - 32;
                        if (o < 0) {
                            s = false;
                        } else {
                            s = true;
                        }
                    }
                    return {
                        maxHeight: l - 32,
                        downShow: s
                    };
                };
                var a = function(e, t, a, r) {
                    t = t || 0;
                    var o = !!document.getBoxObjectFor || "mozInnerScreenX" in window, s = !!window.opera && !!window.opera.toString().indexOf("Opera"), l = e.currentStyle ? function(t) {
                        var i = e.currentStyle[t];
                        if (t === "height" && i.search(/px/i) !== 1) {
                            var a = e.getBoundingClientRect();
                            return a.bottom - a.top - parseFloat(l("paddingTop")) - parseFloat(l("paddingBottom")) + "px";
                        }
                        return i;
                    } : function(t) {
                        return getComputedStyle(e, null)[t];
                    }, d = parseFloat(l("height"));
                    e.style.resize = "none";
                    var c = function(a) {
                        var r, c = 0, f = e.style;
                        if (a != true && e._length === e.value.length) return;
                        e._length = e.value.length;
                        if (!o && !s) {
                            c = parseInt(l("paddingTop")) + parseInt(l("paddingBottom"));
                        }
                        e.style.height = d + "px";
                        var u = i(e);
                        var h = u.maxHeight;
                        if (e.scrollHeight > d) {
                            if (h && e.scrollHeight > h) {
                                r = h - c;
                                f.overflowY = "auto";
                            } else {
                                r = e.scrollHeight - c;
                                f.overflowY = "hidden";
                            }
                            f.height = r + t + "px";
                            e.currHeight = parseInt(f.height);
                        }
                        n($(e), u.downShow);
                    };
                    $(e).off("propertychange.celltextarea").on("propertychange.celltextarea", c);
                    $(e).off("input.celltextarea").on("input.celltextarea", c);
                    $(e).off("focus.celltextarea").on("focus.celltextarea", c);
                    c(r);
                };
                var n = function(e, t) {
                    var a = e.parent().offset();
                    var n = e.closest("div.datagrid-cell");
                    if (n.length > 0 && n[0].style.whiteSpace == "") {
                        a.top -= 7;
                    }
                    var r = e.closest(".datagrid-view2")[0];
                    if (r) {
                        if (a) {
                            var o = e.closest(".datagrid").offset().top;
                            if ("undefined" == typeof t) t = i(e[0]).downShow;
                            if (t) {
                                e.offset(a);
                            } else {
                                var s = n.closest("td").height();
                                e.offset({
                                    top: a.top + s - e.height(),
                                    left: a.left
                                });
                            }
                        }
                        if (false == t) {
                            if (r.scrollTop > 0) {
                                setTimeout(function() {
                                    e.closest(".datagrid-body")[0].scrollTop = 1e5;
                                }, 0);
                            }
                        }
                    }
                };
                e.closest(".datagrid-body").on("scroll.celltextarea", function() {
                    n(e);
                });
                a(e[0], 0, undefined);
            }
        },
        icheckbox: {
            init: function(e, t) {
                var i = $.extend({
                    on: "on",
                    off: "off"
                }, t);
                var a = $('<input type="checkbox">').appendTo(e);
                a.checkbox(i);
                return a;
            },
            getValue: function(e) {
                if ($(e).checkbox("getValue")) {
                    return $(e).checkbox("options").on;
                } else {
                    return $(e).checkbox("options").off;
                }
            },
            setValue: function(e, t) {
                var i = false;
                if ($(e).checkbox("options").on == t) {
                    i = true;
                }
                $(e).checkbox("setValue", i);
            }
        },
        checkbox: {
            init: function(e, t) {
                var i = $('<input type="checkbox">').appendTo(e);
                i.val(t.on);
                i.attr("offval", t.off);
                return i;
            },
            getValue: function(e) {
                if ($(e).is(":checked")) {
                    return $(e).val();
                } else {
                    return $(e).attr("offval");
                }
            },
            setValue: function(e, t) {
                var i = false;
                if ($(e).val() == t) {
                    i = true;
                }
                $(e)._propAttr("checked", i);
            }
        },
        numberbox: {
            init: function(e, t) {
                var i = $('<input type="text" class="datagrid-editable-input">').appendTo(e);
                i.numberbox(t);
                return i;
            },
            destroy: function(e) {
                $(e).numberbox("destroy");
            },
            getValue: function(e) {
                $(e).blur();
                return $(e).numberbox("getValue");
            },
            setValue: function(e, t) {
                $(e).numberbox("setValue", t);
            },
            resize: function(e, t) {
                $(e)._outerWidth(t)._outerHeight(30);
            }
        },
        validatebox: {
            init: function(e, t) {
                var i = $('<input type="text" class="datagrid-editable-input">').appendTo(e);
                i.validatebox(t);
                return i;
            },
            destroy: function(e) {
                $(e).validatebox("destroy");
            },
            getValue: function(e) {
                return $(e).val();
            },
            setValue: function(e, t) {
                $(e).val(t);
            },
            resize: function(e, t) {
                $(e)._outerWidth(t)._outerHeight(30);
            }
        },
        datebox: {
            init: function(e, t) {
                var i = $('<input type="text">').appendTo(e);
                i.datebox(t);
                return i;
            },
            destroy: function(e) {
                $(e).datebox("destroy");
            },
            getValue: function(e) {
                return $(e).datebox("getValue");
            },
            setValue: function(e, t) {
                $(e).datebox("setValue", t);
            },
            resize: function(e, t) {
                $(e).datebox("resize", t);
            }
        },
        datetimebox: {
            init: function(e, t) {
                var i = $('<input type="text">').appendTo(e);
                i.datetimebox(t);
                return i;
            },
            destroy: function(e) {
                $(e).datetimebox("destroy");
            },
            getValue: function(e) {
                return $(e).datetimebox("getValue");
            },
            setValue: function(e, t) {
                $(e).datetimebox("setValue", t);
            },
            resize: function(e, t) {
                $(e).datetimebox("resize", t);
            }
        },
        dateboxq: {
            init: function(e, t) {
                var i = $('<input type="text">').appendTo(e);
                i.dateboxq(t);
                return i;
            },
            destroy: function(e) {
                $(e).dateboxq("destroy");
            },
            getValue: function(e) {
                return $(e).dateboxq("getValue");
            },
            setValue: function(e, t) {
                $(e).dateboxq("setValue", t);
            },
            resize: function(e, t) {
                $(e).dateboxq("resize", t);
            }
        },
        timeboxq: {
            init: function(e, t) {
                var i = $('<input type="text">').appendTo(e);
                i.timeboxq(t);
                return i;
            },
            destroy: function(e) {
                $(e).timeboxq("destroy");
            },
            getValue: function(e) {
                return $(e).timeboxq("getValue");
            },
            setValue: function(e, t) {
                $(e).timeboxq("setValue", t);
            },
            resize: function(e, t) {
                $(e).timeboxq("resize", t);
            }
        },
        combobox: {
            init: function(e, t) {
                var i = $('<input type="text">').appendTo(e);
                i.combobox(t || {});
                return i;
            },
            destroy: function(e) {
                $(e).combobox("destroy");
            },
            getValue: function(e) {
                var t = $(e).combobox("options");
                if (t.multiple) {
                    return $(e).combobox("getValues").join(t.separator);
                } else {
                    return $(e).combobox("getValue");
                }
            },
            setValue: function(e, t) {
                var i = $(e).combobox("options");
                if (i.multiple) {
                    if (t) {
                        $(e).combobox("setValues", t.split(i.separator));
                    } else {
                        $(e).combobox("clear");
                    }
                } else {
                    $(e).combobox("setValue", t);
                }
            },
            resize: function(e, t) {
                $(e).combobox("resize", t);
            }
        },
        combotree: {
            init: function(e, t) {
                var i = $('<input type="text">').appendTo(e);
                i.combotree(t);
                return i;
            },
            destroy: function(e) {
                $(e).combotree("destroy");
            },
            getValue: function(e) {
                var t = $(e).combotree("options");
                if (t.multiple) {
                    return $(e).combotree("getValues").join(t.separator);
                } else {
                    return $(e).combotree("getValue");
                }
            },
            setValue: function(e, t) {
                var i = $(e).combotree("options");
                if (i.multiple) {
                    if (t) {
                        $(e).combotree("setValues", t.split(i.separator));
                    } else {
                        $(e).combotree("clear");
                    }
                } else {
                    $(e).combotree("setValue", t);
                }
            },
            resize: function(e, t) {
                $(e).combotree("resize", t);
            }
        },
        combogrid: {
            init: function(e, t) {
                var i = $('<input type="text">').appendTo(e);
                i.combogrid(t);
                return i;
            },
            destroy: function(e) {
                $(e).combogrid("destroy");
            },
            getValue: function(e) {
                var t = $(e).combogrid("options");
                if (t.multiple) {
                    return $(e).combogrid("getValues").join(t.separator);
                } else {
                    return $(e).combogrid("getValue");
                }
            },
            setValue: function(e, t) {
                var i = $(e).combogrid("options");
                if (i.multiple) {
                    if (t) {
                        $(e).combogrid("setValues", t.split(i.separator));
                    } else {
                        $(e).combogrid("clear");
                    }
                } else {
                    $(e).combogrid("setValue", t);
                }
            },
            resize: function(e, t) {
                $(e).combogrid("resize", t);
            }
        },
        linkbutton: {
            init: function(e, t) {
                var i = $("<a href='#'></a>").appendTo(e);
                i.linkbutton(t);
                i.click(t.handler);
                return i;
            },
            destroy: function(e) {},
            getValue: function(e) {
                return $(e).linkbutton("options").text;
            },
            setValue: function(e, t) {
                $(e).linkbutton("options").text = t;
                $(e).linkbutton({});
            },
            resize: function(e, t) {}
        },
        switchbox: {
            init: function(e, t) {
                var i = $("<div href='#'></div>").appendTo(e);
                i.switchbox(t);
                return i;
            },
            destroy: function(e) {
                $(e).switchbox("destroy");
            },
            getValue: function(e) {
                if ($(e).switchbox("getValue")) {
                    return $(e).switchbox("options").onText;
                } else {
                    return $(e).switchbox("options").offText;
                }
            },
            setValue: function(e, t) {
                var i = false;
                if ($(e).switchbox("options").onText == t) {
                    i = true;
                }
                $(e).switchbox("setValue", i, false);
            },
            resize: function(e, t) {}
        },
        lookup: {
            init: function(e, t) {
                var i = $("<input class='textbox' type=\"text\">").appendTo(e);
                i.lookup(t);
                return i;
            },
            destroy: function(e) {
                $(e).lookup("destroy");
            },
            getValue: function(e) {
                return $(e).lookup("getText");
            },
            setValue: function(e, t) {
                $(e).lookup("setText", t);
            },
            resize: function(e, t) {
                $(e).lookup("resize", t);
            }
        },
        timespinner: {
            init: function(e, t) {
                var i = $("<input class='textbox' type=\"text\">").appendTo(e);
                i.timespinner(t);
                return i;
            },
            destroy: function(e) {
                $(e).timespinner("destroy");
            },
            getValue: function(e) {
                return $(e).timespinner("getValue");
            },
            setValue: function(e, t) {
                $(e).timespinner("setValue", t);
            },
            resize: function(e, t) {
                $(e).timespinner("resize", t);
            }
        }
    };
    function _getCheckboxRows(e, t) {
        var i = [];
        var a = $(e).datagrid("getRows");
        $(e).datagrid("getPanel").find('.datagrid-body td[field="' + t + '"] input[type="checkbox"]').each(function() {
            var e = $(this).prop("checked");
            if (e) {
                var t = $(this).closest(".datagrid-row");
                var n = t.attr("datagrid-row-index");
                if (n > -1) i.push(a[n]);
            }
        });
        return i;
    }
    $.fn.datagrid.methods = {
        options: function(e) {
            var t = $.data(e[0], "datagrid").options;
            var i = $.data(e[0], "datagrid").panel.panel("options");
            var a = $.extend(t, {
                width: i.width,
                height: i.height,
                closed: i.closed,
                collapsed: i.collapsed,
                minimized: i.minimized,
                maximized: i.maximized
            });
            return a;
        },
        setSelectionState: function(e) {
            return e.each(function() {
                _5af(this);
            });
        },
        createStyleSheet: function(e) {
            return _506(e[0]);
        },
        getPanel: function(e) {
            return $.data(e[0], "datagrid").panel;
        },
        getPager: function(e) {
            return $.data(e[0], "datagrid").panel.children("div.datagrid-pager");
        },
        getColumnFields: function(e, t) {
            return _557(e[0], t);
        },
        getColumnOption: function(e, t) {
            return _getColumnOption(e[0], t);
        },
        resize: function(e, t) {
            return e.each(function() {
                _515(this, t);
            });
        },
        load: function(e, t) {
            return e.each(function() {
                var e = $(this).datagrid("options");
                e.pageNumber = 1;
                var i = $(this).datagrid("getPager");
                i.pagination("refresh", {
                    pageNumber: 1
                });
                _577(this, t);
            });
        },
        reload: function(e, t) {
            return e.each(function() {
                _577(this, t);
            });
        },
        reload2: function(e) {
            return e.each(function() {
                _reload2(this);
            });
        },
        reloadFooter: function(e, t) {
            return e.each(function() {
                var e = $.data(this, "datagrid").options;
                var i = $.data(this, "datagrid").dc;
                if (t) {
                    $.data(this, "datagrid").footer = t;
                }
                if (e.showFooter) {
                    e.view.renderFooter.call(e.view, this, i.footer2, false);
                    e.view.renderFooter.call(e.view, this, i.footer1, true);
                    if (e.view.onAfterRender) {
                        e.view.onAfterRender.call(e.view, this);
                    }
                    $(this).datagrid("fixRowHeight");
                }
            });
        },
        loading: function(e) {
            return e.each(function() {
                var e = $.data(this, "datagrid").options;
                $(this).datagrid("getPager").pagination("loading");
                if (e.loadMsg) {
                    var t = $(this).datagrid("getPanel");
                    if (!t.children("div.datagrid-mask").length) {
                        $('<div class="datagrid-mask" style="display:block"></div>').appendTo(t);
                        var i = $('<div class="datagrid-mask-msg" style="display:block;left:50%"></div>').html(e.loadMsg).appendTo(t);
                        i._outerHeight(40);
                        i.css({
                            marginLeft: -i.outerWidth() / 2,
                            lineHeight: i.height() + "px"
                        });
                    }
                }
            });
        },
        loaded: function(e) {
            return e.each(function() {
                $(this).datagrid("getPager").pagination("loaded");
                var e = $(this).datagrid("getPanel");
                e.children("div.datagrid-mask-msg").remove();
                e.children("div.datagrid-mask").remove();
            });
        },
        fitColumns: function(e) {
            return e.each(function() {
                _579(this);
            });
        },
        fixColumnSize: function(e, t) {
            return e.each(function() {
                _542(this, t);
            });
        },
        fixRowHeight: function(e, t) {
            return e.each(function() {
                _526(this, t);
            });
        },
        fixRowNumber: function(e) {
            return e.each(function() {
                var e = $(this).datagrid("getPanel");
                var t = $(".datagrid-cell-rownumber", e).last().clone();
                t.css({
                    position: "absolute",
                    left: -1e3
                }).appendTo("body");
                var i = t.width("auto").width();
                if (i > 25) {
                    $(".datagrid-header-rownumber,.datagrid-cell-rownumber", e).width(i + 5);
                    $(this).datagrid("resize");
                    t.remove();
                    t = null;
                } else {
                    $(".datagrid-header-rownumber,.datagrid-cell-rownumber", e).removeAttr("style");
                }
            });
        },
        freezeRow: function(e, t) {
            return e.each(function() {
                _533(this, t);
            });
        },
        autoSizeColumn: function(e, t) {
            return e.each(function() {
                _586(this, t);
            });
        },
        loadData: function(e, t) {
            return e.each(function() {
                _578(this, t);
                _630(this);
            });
        },
        getData: function(e) {
            return $.data(e[0], "datagrid").data;
        },
        getRows: function(e) {
            return $.data(e[0], "datagrid").data.rows;
        },
        getFooterRows: function(e) {
            return $.data(e[0], "datagrid").footer;
        },
        getRowIndex: function(e, t) {
            return _5b7(e[0], t);
        },
        getChecked: function(e) {
            return _5bd(e[0]);
        },
        getSelected: function(e) {
            var t = _5ba(e[0]);
            return t.length > 0 ? t[0] : null;
        },
        getSelections: function(e) {
            return _5ba(e[0]);
        },
        clearSelections: function(e) {
            return e.each(function() {
                var e = $.data(this, "datagrid");
                var t = e.selectedRows;
                var i = e.checkedRows;
                t.splice(0, t.length);
                _unselectAll(this);
                if (e.options.checkOnSelect) {
                    i.splice(0, i.length);
                }
            });
        },
        clearChecked: function(e) {
            return e.each(function() {
                var e = $.data(this, "datagrid");
                var t = e.selectedRows;
                var i = e.checkedRows;
                i.splice(0, i.length);
                _uncheckAll(this);
                if (e.options.selectOnCheck) {
                    t.splice(0, t.length);
                }
            });
        },
        scrollTo: function(e, t) {
            return e.each(function() {
                _5c0(this, t);
            });
        },
        highlightRow: function(e, t) {
            return e.each(function() {
                _5c7(this, t);
                _5c0(this, t);
            });
        },
        selectAll: function(e) {
            return e.each(function() {
                _5da(this);
            });
        },
        unselectAll: function(e, t) {
            return e.each(function() {
                _unselectAll(this, undefined, t);
            });
        },
        selectRow: function(e, t) {
            return e.each(function() {
                _5cb(this, t);
            });
        },
        selectRecord: function(e, t) {
            return e.each(function() {
                var e = $.data(this, "datagrid").options;
                if (e.idField) {
                    var i = _5b7(this, t);
                    if (i >= 0) {
                        $(this).datagrid("selectRow", i);
                    }
                }
            });
        },
        unselectRow: function(e, t) {
            return e.each(function() {
                _5d3(this, t);
            });
        },
        checkRow: function(e, t) {
            return e.each(function() {
                _5d2(this, t);
            });
        },
        uncheckRow: function(e, t) {
            return e.each(function() {
                _uncheckRow(this, t);
            });
        },
        checkAll: function(e) {
            return e.each(function() {
                _5df(this);
            });
        },
        uncheckAll: function(e, t) {
            return e.each(function() {
                _uncheckAll(this, undefined, t);
            });
        },
        beginEdit: function(e, t) {
            return e.each(function() {
                _5f7(this, t);
            });
        },
        endEdit: function(e, t) {
            return e.each(function() {
                _5fd(this, t, false);
            });
        },
        cancelEdit: function(e, t) {
            return e.each(function() {
                _5fd(this, t, true);
            });
        },
        getEditors: function(e, t) {
            return _608(e[0], t);
        },
        getEditor: function(e, t) {
            return _60c(e[0], t);
        },
        refreshRow: function(e, t) {
            return e.each(function() {
                var e = $.data(this, "datagrid").options;
                e.view.refreshRow.call(e.view, this, t);
            });
        },
        validateRow: function(e, t) {
            return _5fc(e[0], t);
        },
        updateRow: function(e, t) {
            return e.each(function() {
                var e = $.data(this, "datagrid").options;
                e.view.updateRow.call(e.view, this, t.index, t.row);
            });
        },
        appendRow: function(e, t) {
            return e.each(function() {
                _62d(this, t);
            });
        },
        insertRow: function(e, t) {
            return e.each(function() {
                _629(this, t);
            });
        },
        deleteRow: function(e, t) {
            return e.each(function() {
                t = parseInt(t);
                _623(this, t);
            });
        },
        getChanges: function(e, t) {
            return _61d(e[0], t);
        },
        acceptChanges: function(e) {
            return e.each(function() {
                _634(this);
            });
        },
        rejectChanges: function(e) {
            return e.each(function() {
                _636(this);
            });
        },
        mergeCells: function(e, t) {
            return e.each(function() {
                _649(this, t);
            });
        },
        showColumn: function(e, t) {
            return e.each(function() {
                var e = $(this).datagrid("getPanel");
                e.find('td[field="' + t + '"]').show();
                $(this).datagrid("getColumnOption", t).hidden = false;
                $(this).datagrid("fitColumns");
            });
        },
        hideColumn: function(e, t) {
            return e.each(function() {
                var e = $(this).datagrid("getPanel");
                e.find('td[field="' + t + '"]').hide();
                $(this).datagrid("getColumnOption", t).hidden = true;
                $(this).datagrid("fitColumns");
            });
        },
        sort: function(e, t) {
            return e.each(function() {
                _56c(this, t);
            });
        },
        setColumnTitle: function(e, t) {
            return e.each(function() {
                var e = $.data($(this)[0], "datagrid").dc.header2;
                for (var i in t) {
                    e.find('.datagrid-header-row td[field="' + i + '"] .datagrid-cell span').first().html($.hisui.getTrans(t[i]));
                }
            });
        },
        getEditingIndex: function(e) {
            var t = $.data(e[0], "datagrid").options;
            if (t) {
                var i = t.finder.getTr(e[0], "", "editing", 2);
                if (i) return i.attr("datagrid-row-index");
            }
            return undefined;
        },
        getCheckboxRows: function(e, t) {
            return _getCheckboxRows(e[0], t);
        }
    };
    $.fn.datagrid.parseOptions = function(_6cc) {
        var t = $(_6cc);
        return $.extend({}, $.fn.panel.parseOptions(_6cc), $.parser.parseOptions(_6cc, [ "url", "toolbar", "btoolbar", "idField", "sortName", "sortOrder", "pagePosition", "resizeHandle", {
            sharedStyleSheet: "boolean",
            fitColumns: "boolean",
            autoRowHeight: "boolean",
            striped: "boolean",
            nowrap: "boolean"
        }, {
            rownumbers: "boolean",
            singleSelect: "boolean",
            ctrlSelect: "boolean",
            checkOnSelect: "boolean",
            selectOnCheck: "boolean"
        }, {
            pagination: "boolean",
            pageSize: "number",
            pageNumber: "number"
        }, {
            multiSort: "boolean",
            remoteSort: "boolean",
            showHeader: "boolean",
            showFooter: "boolean"
        }, {
            scrollbarSize: "number"
        } ]), {
            pageList: t.attr("pageList") ? eval(t.attr("pageList")) : undefined,
            loadMsg: t.attr("loadMsg") != undefined ? t.attr("loadMsg") : undefined,
            rowStyler: t.attr("rowStyler") ? eval(t.attr("rowStyler")) : undefined
        });
    };
    $.fn.datagrid.parseData = function(e) {
        var t = $(e);
        var i = {
            total: 0,
            rows: []
        };
        var a = t.datagrid("getColumnFields", true).concat(t.datagrid("getColumnFields", false));
        t.find("tbody tr").each(function() {
            i.total++;
            var e = {};
            $.extend(e, $.parser.parseOptions(this, [ "iconCls", "state" ]));
            for (var t = 0; t < a.length; t++) {
                e[a[t]] = $(this).find("td:eq(" + t + ")").html();
            }
            i.rows.push(e);
        });
        return i;
    };
    var _6cf = {
        render: function(e, t, i) {
            var a = $.data(e, "datagrid");
            var n = a.options;
            var r = a.data.rows;
            var o = $(e).datagrid("getColumnFields", i);
            if (i) {
                if (!(n.rownumbers || n.frozenColumns && n.frozenColumns.length)) {
                    return;
                }
            }
            if (r.length > 0) {
                var s = [ '<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>' ];
                for (var l = 0; l < r.length; l++) {
                    var d = n.rowStyler ? n.rowStyler.call(e, l, r[l]) : "";
                    var c = "";
                    var f = "";
                    if (typeof d == "string") {
                        f = d;
                    } else {
                        if (d) {
                            c = d["class"] || "";
                            f = d["style"] || "";
                        }
                    }
                    var u = 'class="datagrid-row ' + (l % 2 && n.striped ? "datagrid-row-alt " : " ") + c + '"';
                    var h = f ? 'style="' + f + '"' : "";
                    var p = a.rowIdPrefix + "-" + (i ? 1 : 2) + "-" + l;
                    s.push('<tr id="' + p + '" datagrid-row-index="' + l + '" ' + u + " " + h + ">");
                    s.push(this.renderRow.call(this, e, o, i, l, r[l]));
                    s.push("</tr>");
                }
                s.push("</tbody></table>");
                $(t).find("td").tooltip("destroy");
                $(t)[0].innerHTML = s.join("");
            } else {
                $(t).html("<div style='width:" + a.dc.view2.find(".datagrid-header-row").width() + "px;border:solid 0px;height:1px;'></div>");
            }
        },
        renderFooter: function(e, t, i) {
            var a = $.data(e, "datagrid").options;
            var n = $.data(e, "datagrid").footer || [];
            var r = $(e).datagrid("getColumnFields", i);
            var o = [ '<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>' ];
            for (var s = 0; s < n.length; s++) {
                o.push('<tr class="datagrid-row" datagrid-row-index="' + s + '">');
                o.push(this.renderRow.call(this, e, r, i, s, n[s]));
                o.push("</tr>");
            }
            o.push("</tbody></table>");
            $(t).html(o.join(""));
        },
        renderRow: function(e, t, i, a, n) {
            var r = $.data(e, "datagrid").options;
            var o = [];
            if (i && r.rownumbers) {
                var s = a + 1;
                if (r.pagination) {
                    s += (r.pageNumber - 1) * r.pageSize;
                }
                o.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">' + s + "</div></td>");
            }
            for (var l = 0; l < t.length; l++) {
                var d = t[l];
                var c = $(e).datagrid("getColumnOption", d);
                if (c) {
                    var f = n[d];
                    var u = c.styler ? c.styler(f, n, a) || "" : "";
                    var h = "";
                    var p = "";
                    if (typeof u == "string") {
                        p = u;
                    } else {
                        if (u) {
                            h = u["class"] || "";
                            p = u["style"] || "";
                        }
                    }
                    var v = h ? 'class="' + h + '"' : "";
                    var g = c.hidden ? 'style="display:none;' + p + '"' : p ? 'style="' + p + '"' : "";
                    o.push('<td field="' + d + '" ' + v + " " + g + ">");
                    var g = "";
                    if (!c.checkbox) {
                        if (c.align) {
                            g += "text-align:" + c.align + ";";
                        }
                        if ("undefined" != typeof c.wordBreak) {
                            g += "word-break: " + c.wordBreak + ";";
                        }
                        if (!r.nowrap) {
                            g += "white-space:normal;height:auto;";
                        } else {
                            if (r.autoRowHeight) {
                                g += "height:auto;";
                            }
                        }
                    }
                    o.push('<div style="' + g + '" ');
                    o.push(c.checkbox ? 'class="datagrid-cell-check"' : 'class="datagrid-cell ' + c.cellClass + '"');
                    o.push(">");
                    if (c.checkbox) {
                        o.push('<input type="checkbox" ' + (n.checked ? 'checked="checked"' : ""));
                        o.push(' name="' + d + '" value="' + (f != undefined ? f : "") + '">');
                    } else {
                        if (c.formatter) {
                            o.push(c.formatter(f, n, a));
                        } else {
                            if ("string" == typeof f) {
                                if (f.indexOf("<") > -1 && f.indexOf(">") == -1) {
                                    f = f.replace(/</g, "&lt;");
                                }
                                if (f.indexOf(">") > -1 && f.indexOf("<") == -1) {
                                    f = f.replace(/>/g, "&gt;");
                                }
                            }
                            o.push(f);
                        }
                    }
                    o.push("</div>");
                    o.push("</td>");
                }
            }
            return o.join("");
        },
        refreshRow: function(e, t) {
            this.updateRow.call(this, e, t, {});
        },
        updateRow: function(e, t, i) {
            var a = $.data(e, "datagrid").options;
            var n = $(e).datagrid("getRows");
            $.extend(n[t], i);
            var r = a.rowStyler ? a.rowStyler.call(e, t, n[t]) : "";
            var o = "";
            var s = "";
            if (typeof r == "string") {
                s = r;
            } else {
                if (r) {
                    o = r["class"] || "";
                    s = r["style"] || "";
                }
            }
            var o = "datagrid-row " + (t % 2 && a.striped ? "datagrid-row-alt " : " ") + o;
            function l(i) {
                var r = $(e).datagrid("getColumnFields", i);
                var l = a.finder.getTr(e, t, "body", i ? 1 : 2);
                var d = l.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                if (a.showChangedStyle) {
                    var c = [];
                    l.children(".datagrid-value-changed").each(function() {
                        c.push($(this).attr("field"));
                    });
                }
                l.html(this.renderRow.call(this, e, r, i, t, n[t]));
                if (a.showChangedStyle) {
                    for (var f = 0; f < c.length; f++) {
                        l.children('td[field="' + c[f] + '"]').addClass("datagrid-value-changed");
                    }
                }
                var u = l.hasClass("datagrid-row-checked");
                l.attr("style", s).attr("class", l.hasClass("datagrid-row-selected") ? o + " datagrid-row-selected" : o);
                if (u) {
                    l.addClass("datagrid-row-checked");
                }
                if (d) {
                    l.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
                }
            }
            l.call(this, true);
            l.call(this, false);
            $(e).datagrid("fixRowHeight", t);
        },
        insertRow: function(e, t, i) {
            var a = $.data(e, "datagrid");
            var n = a.options;
            var r = a.dc;
            var o = a.data;
            if (t == undefined || t == null) {
                t = o.rows.length;
            }
            if (t > o.rows.length) {
                t = o.rows.length;
            }
            function s(i) {
                var r = i ? 1 : 2;
                for (var s = o.rows.length - 1; s >= t; s--) {
                    var l = n.finder.getTr(e, s, "body", r);
                    l.attr("datagrid-row-index", s + 1);
                    l.attr("id", a.rowIdPrefix + "-" + r + "-" + (s + 1));
                    if (i && n.rownumbers) {
                        var d = s + 2;
                        if (n.pagination) {
                            d += (n.pageNumber - 1) * n.pageSize;
                        }
                        l.find("div.datagrid-cell-rownumber").html(d);
                    }
                    if (n.striped) {
                        l.removeClass("datagrid-row-alt").addClass((s + 1) % 2 ? "datagrid-row-alt" : "");
                    }
                }
            }
            function l(i) {
                var s = i ? 1 : 2;
                var l = $(e).datagrid("getColumnFields", i);
                var d = a.rowIdPrefix + "-" + s + "-" + t;
                var c = '<tr id="' + d + '" class="datagrid-row" datagrid-row-index="' + t + '"></tr>';
                if (t >= o.rows.length) {
                    if (o.rows.length) {
                        n.finder.getTr(e, "", "last", s).after(c);
                    } else {
                        var f = i ? r.body1 : r.body2;
                        f.html('<table cellspacing="0" cellpadding="0" border="0"><tbody>' + c + "</tbody></table>");
                    }
                } else {
                    n.finder.getTr(e, t + 1, "body", s).before(c);
                }
            }
            s.call(this, true);
            s.call(this, false);
            l.call(this, true);
            l.call(this, false);
            o.total += 1;
            o.rows.splice(t, 0, i);
            this.refreshRow.call(this, e, t);
        },
        deleteRow: function(e, t) {
            var i = $.data(e, "datagrid");
            var a = i.options;
            var n = i.data;
            function r(r) {
                var o = r ? 1 : 2;
                for (var s = t + 1; s < n.rows.length; s++) {
                    var l = a.finder.getTr(e, s, "body", o);
                    l.attr("datagrid-row-index", s - 1);
                    l.attr("id", i.rowIdPrefix + "-" + o + "-" + (s - 1));
                    if (r && a.rownumbers) {
                        var d = s;
                        if (a.pagination) {
                            d += (a.pageNumber - 1) * a.pageSize;
                        }
                        l.find("div.datagrid-cell-rownumber").html(d);
                    }
                    if (a.striped) {
                        l.removeClass("datagrid-row-alt").addClass((s - 1) % 2 ? "datagrid-row-alt" : "");
                    }
                }
            }
            a.finder.getTr(e, t).remove();
            r.call(this, true);
            r.call(this, false);
            n.total -= 1;
            n.rows.splice(t, 1);
        },
        onBeforeRender: function(e, t) {},
        onAfterRender: function(e) {
            var t = $.data(e, "datagrid").options;
            if (t.showFooter) {
                var i = $(e).datagrid("getPanel").find("div.datagrid-footer");
                i.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
            }
        }
    };
    $.fn.datagrid.defaults = $.extend({}, $.fn.panel.defaults, {
        columnsUrl: null,
        editColumnsPage: null,
        editColumnsGrantUrl: null,
        onInitBefore: null,
        loadBeforeClearSelect: false,
        singleRequest: false,
        shiftCheck: false,
        fontSize: "",
        lineHeight: "",
        titleNoWrap: true,
        className: "",
        queryName: "",
        compContext: "",
        showChangedStyle: true,
        fixRowNumber: false,
        autoSizeColumn: true,
        sharedStyleSheet: false,
        frozenColumns: undefined,
        columns: undefined,
        fitColumns: false,
        resizeHandle: "right",
        autoRowHeight: true,
        btoolbar: null,
        toolbar: null,
        striped: false,
        method: "post",
        nowrap: true,
        idField: null,
        url: null,
        data: null,
        loadMsg: "Processing, please wait ...",
        rownumbers: false,
        singleSelect: false,
        ctrlSelect: false,
        selectOnCheck: true,
        checkOnSelect: true,
        pagination: false,
        pagePosition: "bottom",
        pageNumber: 1,
        pageSize: 10,
        pageList: [ 10, 20, 30, 40, 50, 100, 200 ],
        queryParams: {},
        sortName: null,
        sortOrder: "asc",
        multiSort: false,
        remoteSort: true,
        showHeader: true,
        showFooter: false,
        scrollbarSize: 18,
        rowStyler: function(e, t) {},
        loader: function(e, t, i) {
            var a = $(this).datagrid("options");
            if (!a.url) {
                return false;
            }
            if (a.loadBeforeClearSelect) $(this).datagrid("unselectAll").datagrid("uncheckAll");
            if (a.singleRequest && a.currentAjax) a.currentAjax.abort();
            a.currentAjax = $.ajax({
                type: a.method,
                url: a.url,
                data: e,
                dataType: "json",
                success: function(e) {
                    if ("undefined" !== typeof e.code && !$.isArray(e.rows)) {
                        var i = {
                            total: 0,
                            rows: []
                        };
                        if ("object" == typeof e.data) {
                            i = e.data;
                            if ($.isArray(e.data.records)) {
                                i.rows = e.data.records;
                            }
                        }
                        i.message = e.message || e.msg;
                        t(i);
                    } else {
                        t(e);
                    }
                },
                error: function() {
                    i.apply(this, arguments);
                }
            });
        },
        loadFilter: function(e) {
            if (typeof e.length == "number" && typeof e.splice == "function") {
                return {
                    total: e.length,
                    rows: e
                };
            } else {
                return e;
            }
        },
        editors: _651,
        finder: {
            getTr: function(e, t, i, a) {
                i = i || "body";
                a = a || 0;
                var n = $.data(e, "datagrid");
                var r = n.dc;
                var o = n.options;
                if (a == 0) {
                    var s = o.finder.getTr(e, t, i, 1);
                    var l = o.finder.getTr(e, t, i, 2);
                    return s.add(l);
                } else {
                    if (i == "body") {
                        var d = $("#" + n.rowIdPrefix + "-" + a + "-" + t);
                        if (!d.length) {
                            d = (a == 1 ? r.body1 : r.body2).find(">table>tbody>tr[datagrid-row-index=" + t + "]");
                        }
                        return d;
                    } else {
                        if (i == "footer") {
                            return (a == 1 ? r.footer1 : r.footer2).find(">table>tbody>tr[datagrid-row-index=" + t + "]");
                        } else {
                            if (i == "selected") {
                                return (a == 1 ? r.body1 : r.body2).find(">table>tbody>tr.datagrid-row-selected");
                            } else {
                                if (i == "highlight") {
                                    return (a == 1 ? r.body1 : r.body2).find(">table>tbody>tr.datagrid-row-over");
                                } else {
                                    if (i == "checked") {
                                        return (a == 1 ? r.body1 : r.body2).find(">table>tbody>tr.datagrid-row-checked");
                                    } else {
                                        if (i == "last") {
                                            return (a == 1 ? r.body1 : r.body2).find(">table>tbody>tr[datagrid-row-index]:last");
                                        } else {
                                            if (i == "allbody") {
                                                return (a == 1 ? r.body1 : r.body2).find(">table>tbody>tr[datagrid-row-index]");
                                            } else {
                                                if (i == "allfooter") {
                                                    return (a == 1 ? r.footer1 : r.footer2).find(">table>tbody>tr[datagrid-row-index]");
                                                } else {
                                                    if (i == "editing") {
                                                        return (a == 1 ? r.body1 : r.body2).find(">table>tbody>tr.datagrid-row-editing");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            getRow: function(e, t) {
                var i = typeof t == "object" ? t.attr("datagrid-row-index") : t;
                return $.data(e, "datagrid").data.rows[parseInt(i)];
            },
            getRows: function(e) {
                return $(e).datagrid("getRows");
            }
        },
        view: _6cf,
        onBeforeLoad: function(e) {},
        onLoadSuccess: function() {},
        onLoadError: function() {},
        onClickRow: function(e, t) {},
        onDblClickRow: function(e, t) {},
        onClickCell: function(e, t, i) {},
        onDblClickCell: function(e, t, i) {},
        onBeforeSortColumn: function(e, t) {},
        onSortColumn: function(e, t) {},
        onResizeColumn: function(e, t) {},
        onBeforeSelect: function(e, t) {},
        onSelect: function(e, t) {},
        onBeforeUnselect: function(e, t) {},
        onUnselect: function(e, t) {},
        onSelectAll: function(e) {},
        onUnselectAll: function(e) {},
        onBeforeCheck: function(e, t) {},
        onCheck: function(e, t) {},
        onBeforeUncheck: function(e, t) {},
        onUncheck: function(e, t) {},
        onCheckAll: function(e) {},
        onUncheckAll: function(e) {},
        onBeforeEdit: function(e, t) {},
        onBeginEdit: function(e, t) {},
        onEndEdit: function(e, t, i) {},
        onAfterEdit: function(e, t, i) {},
        onCancelEdit: function(e, t) {},
        onHeaderContextMenu: function(e, t) {},
        onRowContextMenu: function(e, t, i) {},
        onDblClickHeader: function(e, t) {},
        lazy: false,
        onHighlightRow: function(e, t) {},
        onColumnsLoad: function(e, t) {},
        clickDelay: 0,
        clicksToEdit: 0,
        showFilterToolbar: false,
        toolBarOriginalData: null,
        findBtn: "Find",
        clearBtn: "Clear",
        advancedBtn: "Advance",
        advanced2Btn: "Collapse",
        like: "like",
        defaultsColumns: null,
        clearSelectionsOnload: false
    });
})(jQuery);

(function(e) {
    var t;
    function i(i) {
        var n = e.data(i, "propertygrid");
        var r = e.data(i, "propertygrid").options;
        e(i).datagrid(e.extend({}, r, {
            cls: "propertygrid",
            view: r.showGroup ? r.groupView : r.view,
            onClickRow: function(n, o) {
                if (t != this) {
                    a(t);
                    t = this;
                }
                if (r.editIndex != n && o.editor) {
                    var s = e(this).datagrid("getColumnOption", "value");
                    s.editor = o.editor;
                    a(t);
                    e(this).datagrid("beginEdit", n);
                    e(this).datagrid("getEditors", n)[0].target.focus();
                    r.editIndex = n;
                }
                r.onClickRow.call(i, n, o);
            },
            loadFilter: function(e) {
                a(this);
                return r.loadFilter.call(this, e);
            }
        }));
        e(document).unbind(".propertygrid").bind("mousedown.propertygrid", function(i) {
            var n = e(i.target).closest("div.datagrid-view,div.combo-panel");
            if (n.length) {
                return;
            }
            a(t);
            t = undefined;
        });
    }
    function a(t) {
        var i = e(t);
        if (!i.length) {
            return;
        }
        var a = e.data(t, "propertygrid").options;
        var n = a.editIndex;
        if (n == undefined) {
            return;
        }
        var r = i.datagrid("getEditors", n)[0];
        if (r) {
            r.target.blur();
            if (i.datagrid("validateRow", n)) {
                i.datagrid("endEdit", n);
            } else {
                i.datagrid("cancelEdit", n);
            }
        }
        a.editIndex = undefined;
    }
    e.fn.propertygrid = function(t, a) {
        if (typeof t == "string") {
            var n = e.fn.propertygrid.methods[t];
            if (n) {
                return n(this, a);
            } else {
                return this.datagrid(t, a);
            }
        }
        t = t || {};
        return this.each(function() {
            var a = e.data(this, "propertygrid");
            if (a) {
                e.extend(a.options, t);
            } else {
                var n = e.extend({}, e.fn.propertygrid.defaults, e.fn.propertygrid.parseOptions(this), t);
                n.frozenColumns = e.extend(true, [], n.frozenColumns);
                n.columns = e.extend(true, [], n.columns);
                e.data(this, "propertygrid", {
                    options: n
                });
            }
            i(this);
        });
    };
    e.fn.propertygrid.methods = {
        options: function(t) {
            return e.data(t[0], "propertygrid").options;
        }
    };
    e.fn.propertygrid.parseOptions = function(t) {
        return e.extend({}, e.fn.datagrid.parseOptions(t), e.parser.parseOptions(t, [ {
            showGroup: "boolean"
        } ]));
    };
    var n = e.extend({}, e.fn.datagrid.defaults.view, {
        render: function(t, i, a) {
            var n = [];
            var r = this.groups;
            for (var o = 0; o < r.length; o++) {
                n.push(this.renderGroup.call(this, t, o, r[o], a));
            }
            e(i).html(n.join(""));
        },
        renderGroup: function(t, i, a, n) {
            var r = e.data(t, "datagrid");
            var o = r.options;
            var s = e(t).datagrid("getColumnFields", n);
            var l = [];
            l.push('<div class="datagrid-group" group-index=' + i + ">");
            l.push('<table cellspacing="0" cellpadding="0" border="0" style="height:100%"><tbody>');
            l.push("<tr>");
            if (n && (o.rownumbers || o.frozenColumns.length) || !n && !(o.rownumbers || o.frozenColumns.length)) {
                l.push('<td style="border:0;text-align:center;width:25px"><span class="datagrid-row-expander datagrid-row-collapse" style="display:inline-block;width:16px;height:16px;cursor:pointer">&nbsp;</span></td>');
            }
            l.push('<td style="border:0;">');
            if (!n) {
                l.push('<span class="datagrid-group-title">');
                l.push(o.groupFormatter.call(t, a.value, a.rows));
                l.push("</span>");
            }
            l.push("</td>");
            l.push("</tr>");
            l.push("</tbody></table>");
            l.push("</div>");
            l.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
            var d = a.startIndex;
            for (var c = 0; c < a.rows.length; c++) {
                var f = o.rowStyler ? o.rowStyler.call(t, d, a.rows[c]) : "";
                var u = "";
                var h = "";
                if (typeof f == "string") {
                    h = f;
                } else {
                    if (f) {
                        u = f["class"] || "";
                        h = f["style"] || "";
                    }
                }
                var p = 'class="datagrid-row ' + (d % 2 && o.striped ? "datagrid-row-alt " : " ") + u + '"';
                var v = h ? 'style="' + h + '"' : "";
                var g = r.rowIdPrefix + "-" + (n ? 1 : 2) + "-" + d;
                l.push('<tr id="' + g + '" datagrid-row-index="' + d + '" ' + p + " " + v + ">");
                l.push(this.renderRow.call(this, t, s, n, d, a.rows[c]));
                l.push("</tr>");
                d++;
            }
            l.push("</tbody></table>");
            return l.join("");
        },
        bindEvents: function(t) {
            var i = e.data(t, "datagrid");
            var a = i.dc;
            var n = a.body1.add(a.body2);
            var r = (e.data(n[0], "events") || e._data(n[0], "events")).click[0].handler;
            n.unbind("click").bind("click", function(i) {
                var a = e(i.target);
                var n = a.closest("span.datagrid-row-expander");
                if (n.length) {
                    var o = n.closest("div.datagrid-group").attr("group-index");
                    if (n.hasClass("datagrid-row-collapse")) {
                        e(t).datagrid("collapseGroup", o);
                    } else {
                        e(t).datagrid("expandGroup", o);
                    }
                } else {
                    r(i);
                }
                i.stopPropagation();
            });
        },
        onBeforeRender: function(t, i) {
            var a = e.data(t, "datagrid");
            var n = a.options;
            h();
            var r = [];
            for (var o = 0; o < i.length; o++) {
                var s = i[o];
                var l = u(s[n.groupField]);
                if (!l) {
                    l = {
                        value: s[n.groupField],
                        rows: [ s ]
                    };
                    r.push(l);
                } else {
                    l.rows.push(s);
                }
            }
            var d = 0;
            var c = [];
            for (var o = 0; o < r.length; o++) {
                var l = r[o];
                l.startIndex = d;
                d += l.rows.length;
                c = c.concat(l.rows);
            }
            a.data.rows = c;
            this.groups = r;
            var f = this;
            setTimeout(function() {
                f.bindEvents(t);
            }, 0);
            function u(e) {
                for (var t = 0; t < r.length; t++) {
                    var i = r[t];
                    if (i.value == e) {
                        return i;
                    }
                }
                return null;
            }
            function h() {
                if (!e("#datagrid-group-style").length) {
                    e("head").append('<style id="datagrid-group-style">' + ".datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}" + "</style>");
                }
            }
        }
    });
    e.extend(e.fn.datagrid.methods, {
        expandGroup: function(t, i) {
            return t.each(function() {
                var t = e.data(this, "datagrid").dc.view;
                var a = t.find(i != undefined ? 'div.datagrid-group[group-index="' + i + '"]' : "div.datagrid-group");
                var n = a.find("span.datagrid-row-expander");
                if (n.hasClass("datagrid-row-expand")) {
                    n.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
                    a.next("table").show();
                }
                e(this).datagrid("fixRowHeight");
            });
        },
        collapseGroup: function(t, i) {
            return t.each(function() {
                var t = e.data(this, "datagrid").dc.view;
                var a = t.find(i != undefined ? 'div.datagrid-group[group-index="' + i + '"]' : "div.datagrid-group");
                var n = a.find("span.datagrid-row-expander");
                if (n.hasClass("datagrid-row-collapse")) {
                    n.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
                    a.next("table").hide();
                }
                e(this).datagrid("fixRowHeight");
            });
        }
    });
    e.fn.propertygrid.defaults = e.extend({}, e.fn.datagrid.defaults, {
        singleSelect: true,
        remoteSort: false,
        fitColumns: true,
        loadMsg: "",
        frozenColumns: [ [ {
            field: "f",
            width: 16,
            resizable: false
        } ] ],
        columns: [ [ {
            field: "name",
            title: "Name",
            width: 100,
            sortable: true
        }, {
            field: "value",
            title: "Value",
            width: 100,
            resizable: false
        } ] ],
        showGroup: false,
        groupView: n,
        groupField: "group",
        groupFormatter: function(e, t) {
            return e;
        }
    });
})(jQuery);

(function(e) {
    function t(t) {
        var a = e.data(t, "treegrid");
        var n = a.options;
        e(t).datagrid(e.extend({}, n, {
            url: null,
            data: null,
            loader: function() {
                return false;
            },
            onBeforeLoad: function() {
                return false;
            },
            onLoadSuccess: function() {},
            onResizeColumn: function(e, a) {
                i(t);
                n.onResizeColumn.call(t, e, a);
            },
            onBeforeSortColumn: function(e, i) {
                if (n.onBeforeSortColumn.call(t, e, i) == false) {
                    return false;
                }
            },
            onSortColumn: function(i, a) {
                n.sortName = i;
                n.sortOrder = a;
                if (n.remoteSort) {
                    v(t);
                } else {
                    var r = e(t).treegrid("getData");
                    p(t, null, r);
                }
                n.onSortColumn.call(t, i, a);
            },
            onClickCell: function(e, i) {
                n.onClickCell.call(t, i, Y(t, e));
            },
            onDblClickCell: function(e, i) {
                n.onDblClickCell.call(t, i, Y(t, e));
            },
            onRowContextMenu: function(e, i) {
                n.onContextMenu.call(t, e, Y(t, i));
            }
        }));
        var r = e.data(t, "datagrid").options;
        n.columns = r.columns;
        n.frozenColumns = r.frozenColumns;
        a.dc = e.data(t, "datagrid").dc;
        if (n.pagination) {
            var o = e(t).datagrid("getPager");
            o.pagination({
                pageNumber: n.pageNumber,
                pageSize: n.pageSize,
                pageList: n.pageList,
                onSelectPage: function(e, i) {
                    n.pageNumber = e;
                    n.pageSize = i;
                    v(t);
                }
            });
            n.pageSize = o.pagination("options").pageSize;
        }
    }
    function i(t, i) {
        var a = e.data(t, "datagrid").options;
        var n = e.data(t, "datagrid").dc;
        if (!n.body1.is(":empty") && (!a.nowrap || a.autoRowHeight)) {
            if (i != undefined) {
                var r = x(t, i);
                for (var o = 0; o < r.length; o++) {
                    s(r[o][a.idField]);
                }
            }
        }
        e(t).datagrid("fixRowHeight", i);
        function s(e) {
            var i = a.finder.getTr(t, e, "body", 1);
            var n = a.finder.getTr(t, e, "body", 2);
            i.css("height", "");
            n.css("height", "");
            var r = Math.max(i.height(), n.height());
            i.css("height", r);
            n.css("height", r);
        }
    }
    function a(t) {
        var i = e.data(t, "datagrid").dc;
        var a = e.data(t, "treegrid").options;
        if (!a.rownumbers) {
            return;
        }
        i.body1.find("div.datagrid-cell-rownumber").each(function(t) {
            e(this).html(t + 1);
        });
    }
    function n(t) {
        return function(i) {
            var a = e(i.target);
            var n = t ? "addClass" : "removeClass";
            if (a.hasClass("tree-hit")) {
                a.hasClass("tree-expanded") ? a[n]("tree-expanded-hover") : a[n]("tree-collapsed-hover");
            }
        };
    }
    function r(t) {
        var i = e(t.target);
        if (i.hasClass("tree-hit")) {
            a(Z);
        } else {
            if (i.hasClass("tree-checkbox")) {
                a(o);
            } else {}
        }
        function a(e) {
            var t = i.closest("tr.datagrid-row");
            var a = t.closest("div.datagrid-view").children(".datagrid-f")[0];
            e(a, t.attr("node-id"));
        }
    }
    function o(t, i, a, n) {
        var r = e.data(t, "treegrid");
        var o = r.checkedRows;
        var c = r.options;
        if (!c.checkbox) {
            return;
        }
        var f = Y(t, i);
        if (!f.checkState) {
            return;
        }
        var u = c.finder.getTr(t, i);
        var h = u.find(".tree-checkbox");
        if (a == undefined) {
            if (h.hasClass("tree-checkbox1")) {
                a = false;
            } else {
                if (h.hasClass("tree-checkbox0")) {
                    a = true;
                } else {
                    if (f._checked == undefined) {
                        f._checked = h.hasClass("tree-checkbox1");
                    }
                    a = !f._checked;
                }
            }
        }
        f._checked = a;
        if (a) {
            if (h.hasClass("tree-checkbox1")) {
                return;
            }
        } else {
            if (h.hasClass("tree-checkbox0")) {
                return;
            }
        }
        if (!n) {
            if (c.onBeforeCheckNode.call(t, f, a) == false) {
                return;
            }
        }
        if (c.cascadeCheck) {
            l(t, f, a);
            d(t, f);
        } else {
            s(t, f, a ? "1" : "0");
        }
        if (!n) {
            c.onCheckNode.call(t, f, a);
        }
    }
    function s(t, i, a) {
        var n = e.data(t, "treegrid");
        var r = n.checkedRows;
        var o = n.options;
        if (!i.checkState || a == undefined) {
            return;
        }
        var s = o.finder.getTr(t, i[o.idField]);
        var l = s.find(".tree-checkbox");
        if (!l.length) {
            return;
        }
        i.checkState = [ "unchecked", "checked", "indeterminate" ][a];
        i.checked = i.checkState == "checked";
        l.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
        l.addClass("tree-checkbox" + a);
        if (a == 0) {
            e.hisui.removeArrayItem(r, o.idField, i[o.idField]);
        } else {
            e.hisui.addArrayItem(r, o.idField, i);
        }
    }
    function l(t, i, a) {
        var n = a ? 1 : 0;
        s(t, i, n);
        e.hisui.forEach(i.children || [], true, function(e) {
            s(t, e, n);
        });
    }
    function d(t, i) {
        var a = e.data(t, "treegrid").options;
        var n = m(t, i[a.idField]);
        if (n) {
            s(t, n, c(n));
            d(t, n);
        }
    }
    function c(t) {
        var i = 0;
        var a = 0;
        var n = 0;
        e.hisui.forEach(t.children || [], false, function(e) {
            if (e.checkState) {
                i++;
                if (e.checkState == "checked") {
                    n++;
                } else {
                    if (e.checkState == "unchecked") {
                        a++;
                    }
                }
            }
        });
        if (i == 0) {
            return undefined;
        }
        var r = 0;
        if (a == i) {
            r = 0;
        } else {
            if (n == i) {
                r = 1;
            } else {
                r = 2;
            }
        }
        return r;
    }
    function f(t, i) {
        var a = e.data(t, "treegrid").options;
        if (!a.checkbox) {
            return;
        }
        var n = Y(t, i);
        var r = a.finder.getTr(t, i);
        var s = r.find(".tree-checkbox");
        if (a.view.hasCheckbox(t, n)) {
            if (!s.length) {
                n.checkState = n.checkState || "unchecked";
                e('<span class="tree-checkbox"></span>').insertBefore(r.find(".tree-title"));
            }
            if (n.checkState == "checked") {
                o(t, i, true, true);
            } else {
                if (n.checkState == "unchecked") {
                    o(t, i, false, true);
                } else {
                    var l = c(n);
                    if (l === 0) {
                        o(t, i, false, true);
                    } else {
                        if (l === 1) {
                            o(t, i, true, true);
                        }
                    }
                }
            }
        } else {
            s.remove();
            n.checkState = undefined;
            n.checked = undefined;
            d(t, n);
        }
    }
    function u(t, i) {
        var a = e.data(t, "treegrid").options;
        var n = a.finder.getTr(t, i, "body", 1);
        var r = a.finder.getTr(t, i, "body", 2);
        var o = e(t).datagrid("getColumnFields", true).length + (a.rownumbers ? 1 : 0);
        var s = e(t).datagrid("getColumnFields", false).length;
        l(n, o);
        l(r, s);
        function l(t, i) {
            e('<tr class="treegrid-tr-tree">' + '<td style="border:0px" colspan="' + i + '">' + "<div></div>" + "</td>" + "</tr>").insertAfter(t);
        }
    }
    function h(t, i) {
        var a = e.data(t, "treegrid");
        var n = a.options;
        var r = a.checkedRows;
        if (!e.isArray(r)) return;
        for (var o = 0; o < r.length; o++) {
            var s = r[o];
            var l = n.finder.getTr(t, s[n.idField], "body", 2);
            if (i.find(l).length > 0) {
                r.splice(o, 1);
                o--;
            }
        }
    }
    function p(t, n, r, o, s) {
        var l = e.data(t, "treegrid");
        var d = l.options;
        var c = l.dc;
        r = d.loadFilter.call(t, r, n);
        var f = Y(t, n);
        if (f) {
            var u = d.finder.getTr(t, n, "body", 1);
            var p = d.finder.getTr(t, n, "body", 2);
            var v = u.next("tr.treegrid-tr-tree").children("td").children("div");
            var g = p.next("tr.treegrid-tr-tree").children("td").children("div");
            if (!o) {
                f.children = [];
            }
        } else {
            var v = c.body1;
            var g = c.body2;
            if (!o) {
                l.data = [];
            }
        }
        if (!o) {
            if (!f) {
                l.checkedRows = [];
            } else {
                h(t, g);
            }
            v.empty();
            g.empty();
        }
        if (d.view.onBeforeRender) {
            d.view.onBeforeRender.call(d.view, t, n, r);
        }
        d.view.render.call(d.view, t, v, true);
        d.view.render.call(d.view, t, g, false);
        if (d.showFooter) {
            d.view.renderFooter.call(d.view, t, c.footer1, true);
            d.view.renderFooter.call(d.view, t, c.footer2, false);
        }
        if (d.view.onAfterRender) {
            d.view.onAfterRender.call(d.view, t);
        }
        if (!n && d.pagination) {
            var b = e.data(t, "treegrid").total;
            var m = e(t).datagrid("getPager");
            if (m.pagination("options").total != b) {
                m.pagination({
                    total: b
                });
            }
        }
        i(t);
        a(t);
        e(t).treegrid("showLines");
        e(t).treegrid("setSelectionState");
        e(t).treegrid("autoSizeColumn");
        if (!s) {
            d.onLoadSuccess.call(t, f, r);
        }
    }
    function v(t, i, a, n, r) {
        var o = e.data(t, "treegrid").options;
        var s = e(t).datagrid("getPanel").find("div.datagrid-body");
        if (i == undefined && o.queryParams) {
            o.queryParams.id = undefined;
        }
        if (a) {
            o.queryParams = a;
        }
        var l = e.extend({}, o.queryParams);
        if (o.pagination) {
            e.extend(l, {
                page: o.pageNumber,
                rows: o.pageSize
            });
        }
        if (o.sortName) {
            e.extend(l, {
                sort: o.sortName,
                order: o.sortOrder
            });
        }
        var d = Y(t, i);
        if (o.onBeforeLoad.call(t, d, l) == false) {
            return;
        }
        var c = s.find('tr[node-id="' + i + '"] span.tree-folder');
        c.addClass("tree-loading");
        e(t).treegrid("loading");
        var f = o.loader.call(t, l, function(a) {
            c.removeClass("tree-loading");
            e(t).treegrid("loaded");
            p(t, i, a, n);
            if (r) {
                r();
            }
        }, function() {
            c.removeClass("tree-loading");
            e(t).treegrid("loaded");
            o.onLoadError.apply(t, arguments);
            if (r) {
                r();
            }
        });
        if (f == false) {
            c.removeClass("tree-loading");
            e(t).treegrid("loaded");
        }
    }
    function g(e) {
        var t = b(e);
        return t.length ? t[0] : null;
    }
    function b(t) {
        return e.data(t, "treegrid").data;
    }
    function m(e, t) {
        var i = Y(e, t);
        if (i._parentId) {
            return Y(e, i._parentId);
        } else {
            return null;
        }
    }
    function x(t, i) {
        var a = e.data(t, "treegrid").data;
        if (i) {
            var n = Y(t, i);
            a = n ? n.children || [] : [];
        }
        var r = [];
        e.hisui.forEach(a, true, function(e) {
            r.push(e);
        });
        return r;
    }
    function C(t, i) {
        var a = e.data(t, "treegrid").options;
        var n = a.finder.getTr(t, i);
        var r = n.children('td[field="' + a.treeField + '"]');
        return r.find("span.tree-indent,span.tree-hit").length;
    }
    function Y(t, i) {
        var a = e.data(t, "treegrid");
        var n = a.options;
        var r = null;
        e.hisui.forEach(a.data, true, function(e) {
            if (e[n.idField] == i) {
                r = e;
                return false;
            }
        });
        return r;
    }
    function w(t, a) {
        var n = e.data(t, "treegrid").options;
        var r = Y(t, a);
        var o = n.finder.getTr(t, a);
        var s = o.find("span.tree-hit");
        if (s.length == 0) {
            return;
        }
        if (s.hasClass("tree-collapsed")) {
            return;
        }
        if (n.onBeforeCollapse.call(t, r) == false) {
            return;
        }
        s.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        s.next().removeClass("tree-folder-open");
        r.state = "closed";
        o = o.next("tr.treegrid-tr-tree");
        var l = o.children("td").children("div");
        if (n.animate) {
            l.slideUp("normal", function() {
                e(t).treegrid("autoSizeColumn");
                i(t, a);
                n.onCollapse.call(t, r);
            });
        } else {
            l.hide();
            e(t).treegrid("autoSizeColumn");
            i(t, a);
            n.onCollapse.call(t, r);
        }
    }
    function S(t, a) {
        var n = e.data(t, "treegrid").options;
        var r = n.finder.getTr(t, a);
        var o = r.find("span.tree-hit");
        var s = Y(t, a);
        if (o.length == 0) {
            return;
        }
        if (o.hasClass("tree-expanded")) {
            return;
        }
        if (n.onBeforeExpand.call(t, s) == false) {
            return;
        }
        o.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        o.next().addClass("tree-folder-open");
        var l = r.next("tr.treegrid-tr-tree");
        if (l.length) {
            var d = l.children("td").children("div");
            f(d);
        } else {
            u(t, s[n.idField]);
            var l = r.next("tr.treegrid-tr-tree");
            var d = l.children("td").children("div");
            d.hide();
            var c = e.extend({}, n.queryParams || {});
            c.id = s[n.idField];
            v(t, s[n.idField], c, true, function() {
                if (d.is(":empty")) {
                    l.remove();
                } else {
                    f(d);
                }
            });
        }
        function f(r) {
            s.state = "open";
            if (n.animate) {
                r.slideDown("normal", function() {
                    e(t).treegrid("autoSizeColumn");
                    i(t, a);
                    n.onExpand.call(t, s);
                });
            } else {
                r.show();
                e(t).treegrid("autoSizeColumn");
                i(t, a);
                n.onExpand.call(t, s);
            }
        }
    }
    function Z(t, i) {
        var a = e.data(t, "treegrid").options;
        var n = a.finder.getTr(t, i);
        var r = n.find("span.tree-hit");
        if (r.hasClass("tree-expanded")) {
            w(t, i);
        } else {
            S(t, i);
        }
    }
    function T(t, i) {
        var a = e.data(t, "treegrid").options;
        var n = x(t, i);
        if (i) {
            n.unshift(Y(t, i));
        }
        for (var r = 0; r < n.length; r++) {
            w(t, n[r][a.idField]);
        }
    }
    function L(t, i) {
        var a = e.data(t, "treegrid").options;
        var n = x(t, i);
        if (i) {
            n.unshift(Y(t, i));
        }
        for (var r = 0; r < n.length; r++) {
            S(t, n[r][a.idField]);
        }
    }
    function y(t, i) {
        var a = e.data(t, "treegrid").options;
        var n = [];
        var r = m(t, i);
        while (r) {
            var o = r[a.idField];
            n.unshift(o);
            r = m(t, o);
        }
        for (var s = 0; s < n.length; s++) {
            S(t, n[s]);
        }
    }
    function X(t, i) {
        var a = e.data(t, "treegrid");
        var n = a.options;
        if (i.parent) {
            var r = n.finder.getTr(t, i.parent);
            if (r.next("tr.treegrid-tr-tree").length == 0) {
                u(t, i.parent);
            }
            var o = r.children('td[field="' + n.treeField + '"]').children("div.datagrid-cell");
            var s = o.children("span.tree-icon");
            if (s.hasClass("tree-file")) {
                s.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                var l = e('<span class="tree-hit tree-expanded"></span>').insertBefore(s);
                if (l.prev().length) {
                    l.prev().remove();
                }
            }
        }
        p(t, i.parent, i.data, a.data.length > 0, true);
    }
    function J(t, i) {
        var n = i.before || i.after;
        var r = e.data(t, "treegrid").options;
        var o = m(t, n);
        X(t, {
            parent: o ? o[r.idField] : null,
            data: [ i.data ]
        });
        var s = o ? o.children : e(t).treegrid("getRoots");
        for (var l = 0; l < s.length; l++) {
            if (s[l][r.idField] == n) {
                var d = s[s.length - 1];
                s.splice(i.before ? l : l + 1, 0, d);
                s.splice(s.length - 1, 1);
                break;
            }
        }
        c(true);
        c(false);
        a(t);
        e(t).treegrid("showLines");
        function c(e) {
            var a = e ? 1 : 2;
            var o = r.finder.getTr(t, i.data[r.idField], "body", a);
            var s = o.closest("table.datagrid-btable");
            o = o.parent().children();
            var l = r.finder.getTr(t, n, "body", a);
            if (i.before) {
                o.insertBefore(l);
            } else {
                var d = l.next("tr.treegrid-tr-tree");
                o.insertAfter(d.length ? d : l);
            }
            s.remove();
        }
    }
    function H(t, i) {
        var n = e.data(t, "treegrid");
        var r = n.options;
        var o = m(t, i);
        e(t).datagrid("deleteRow", i);
        e.hisui.removeArrayItem(n.checkedRows, r.idField, i);
        a(t);
        if (o) {
            f(t, o[r.idField]);
        }
        n.total -= 1;
        e(t).datagrid("getPager").pagination("refresh", {
            total: n.total
        });
        e(t).treegrid("showLines");
    }
    function D(t) {
        var i = e(t);
        var a = i.treegrid("options");
        if (a.lines) {
            i.treegrid("getPanel").addClass("tree-lines");
        } else {
            i.treegrid("getPanel").removeClass("tree-lines");
            return;
        }
        i.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
        i.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
        var n = i.treegrid("getRoots");
        if (n.length > 1) {
            s(n[0]).addClass("tree-root-first");
        } else {
            if (n.length == 1) {
                s(n[0]).addClass("tree-root-one");
            }
        }
        r(n);
        o(n);
        function r(t) {
            e.map(t, function(e) {
                if (e.children && e.children.length) {
                    r(e.children);
                } else {
                    var t = s(e);
                    t.find(".tree-icon").prev().addClass("tree-join");
                }
            });
            if (t.length) {
                var i = s(t[t.length - 1]);
                i.addClass("tree-node-last");
                i.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
            }
        }
        function o(n) {
            e.map(n, function(e) {
                if (e.children && e.children.length) {
                    o(e.children);
                }
            });
            for (var r = 0; r < n.length - 1; r++) {
                var s = n[r];
                var l = i.treegrid("getLevel", s[a.idField]);
                var d = a.finder.getTr(t, s[a.idField]);
                var c = d.next().find('tr.datagrid-row td[field="' + a.treeField + '"] div.datagrid-cell');
                c.find("span:eq(" + (l - 1) + ")").addClass("tree-line");
            }
        }
        function s(e) {
            var i = a.finder.getTr(t, e[a.idField]);
            var n = i.find('td[field="' + a.treeField + '"] div.datagrid-cell');
            return n;
        }
    }
    e.fn.treegrid = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.treegrid.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.datagrid(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "treegrid");
            if (a) {
                e.extend(a.options, i);
            } else {
                a = e.data(this, "treegrid", {
                    options: e.extend({}, e.fn.treegrid.defaults, e.fn.treegrid.parseOptions(this), i),
                    data: [],
                    checkedRows: [],
                    tmpIds: []
                });
            }
            t(this);
            var n = e(a.dc.body1);
            var r = e(a.dc.body2);
            for (var o in a.options.rowEvents) {
                r.bind(o, a.options.rowEvents[o]);
            }
            for (var o in a.options.rowEvents) {
                n.bind(o, a.options.rowEvents[o]);
            }
            if (a.options.data) {
                e(this).treegrid("loadData", a.options.data);
            }
            v(this);
        });
    };
    e.fn.treegrid.methods = {
        options: function(t) {
            return e.data(t[0], "treegrid").options;
        },
        resize: function(t, i) {
            return t.each(function() {
                e(this).datagrid("resize", i);
            });
        },
        fixRowHeight: function(e, t) {
            return e.each(function() {
                i(this, t);
            });
        },
        loadData: function(e, t) {
            return e.each(function() {
                p(this, t.parent, t);
            });
        },
        load: function(t, i) {
            return t.each(function() {
                e(this).treegrid("options").pageNumber = 1;
                e(this).treegrid("getPager").pagination({
                    pageNumber: 1
                });
                e(this).treegrid("reload", i);
            });
        },
        reload: function(t, i) {
            return t.each(function() {
                var t = e(this).treegrid("options");
                var a = {};
                if (typeof i == "object") {
                    a = i;
                } else {
                    a = e.extend({}, t.queryParams);
                    a.id = i;
                }
                if (a.id) {
                    var n = e(this).treegrid("find", a.id);
                    if (n.children) {
                        n.children.splice(0, n.children.length);
                    }
                    t.queryParams = a;
                    var r = t.finder.getTr(this, a.id);
                    h(this, r.next("tr.treegrid-tr-tree"));
                    r.next("tr.treegrid-tr-tree").remove();
                    r.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    S(this, a.id);
                } else {
                    v(this, null, a);
                }
            });
        },
        reloadFooter: function(t, i) {
            return t.each(function() {
                var t = e.data(this, "treegrid").options;
                var a = e.data(this, "datagrid").dc;
                if (i) {
                    e.data(this, "treegrid").footer = i;
                }
                if (t.showFooter) {
                    t.view.renderFooter.call(t.view, this, a.footer1, true);
                    t.view.renderFooter.call(t.view, this, a.footer2, false);
                    if (t.view.onAfterRender) {
                        t.view.onAfterRender.call(t.view, this);
                    }
                    e(this).treegrid("fixRowHeight");
                }
            });
        },
        getData: function(t) {
            return e.data(t[0], "treegrid").data;
        },
        getFooterRows: function(t) {
            return e.data(t[0], "treegrid").footer;
        },
        getRoot: function(e) {
            return g(e[0]);
        },
        getRoots: function(e) {
            return b(e[0]);
        },
        getParent: function(e, t) {
            return m(e[0], t);
        },
        getChildren: function(e, t) {
            return x(e[0], t);
        },
        getLevel: function(e, t) {
            return C(e[0], t);
        },
        find: function(e, t) {
            return Y(e[0], t);
        },
        isLeaf: function(t, i) {
            var a = e.data(t[0], "treegrid").options;
            var n = a.finder.getTr(t[0], i);
            var r = n.find("span.tree-hit");
            return r.length == 0;
        },
        select: function(t, i) {
            return t.each(function() {
                e(this).datagrid("selectRow", i);
            });
        },
        unselect: function(t, i) {
            return t.each(function() {
                e(this).datagrid("unselectRow", i);
            });
        },
        collapse: function(e, t) {
            return e.each(function() {
                w(this, t);
            });
        },
        expand: function(e, t) {
            return e.each(function() {
                S(this, t);
            });
        },
        toggle: function(e, t) {
            return e.each(function() {
                Z(this, t);
            });
        },
        collapseAll: function(e, t) {
            return e.each(function() {
                T(this, t);
            });
        },
        expandAll: function(e, t) {
            return e.each(function() {
                L(this, t);
            });
        },
        expandTo: function(e, t) {
            return e.each(function() {
                y(this, t);
            });
        },
        append: function(e, t) {
            return e.each(function() {
                X(this, t);
            });
        },
        insert: function(e, t) {
            return e.each(function() {
                J(this, t);
            });
        },
        remove: function(e, t) {
            return e.each(function() {
                H(this, t);
            });
        },
        pop: function(e, t) {
            var i = e.treegrid("find", t);
            e.treegrid("remove", t);
            return i;
        },
        refresh: function(t, i) {
            return t.each(function() {
                var t = e.data(this, "treegrid").options;
                t.view.refreshRow.call(t.view, this, i);
            });
        },
        update: function(t, i) {
            return t.each(function() {
                var t = e.data(this, "treegrid").options;
                var a = i.row;
                t.view.updateRow.call(t.view, this, i.id, a);
                if (a.checked != undefined) {
                    a = Y(this, i.id);
                    e.extend(a, {
                        checkState: a.checked ? "checked" : a.checked === false ? "unchecked" : undefined
                    });
                    f(this, i.id);
                }
            });
        },
        beginEdit: function(t, i) {
            return t.each(function() {
                e(this).datagrid("beginEdit", i);
                e(this).treegrid("fixRowHeight", i);
            });
        },
        endEdit: function(t, i) {
            return t.each(function() {
                e(this).datagrid("endEdit", i);
            });
        },
        cancelEdit: function(t, i) {
            return t.each(function() {
                e(this).datagrid("cancelEdit", i);
            });
        },
        showLines: function(e) {
            return e.each(function() {
                D(this);
            });
        },
        setSelectionState: function(t) {
            return t.each(function() {
                e(this).datagrid("setSelectionState");
                var t = e(this).data("treegrid");
                for (var i = 0; i < t.tmpIds.length; i++) {
                    o(this, t.tmpIds[i], true, true);
                }
                t.tmpIds = [];
            });
        },
        getCheckedNodes: function(t, i) {
            i = i || "checked";
            var a = [];
            e.hisui.forEach(t.data("treegrid").checkedRows, false, function(e) {
                if (e.checkState == i) {
                    a.push(e);
                }
            });
            return a;
        },
        checkNode: function(e, t) {
            return e.each(function() {
                o(this, t, true);
            });
        },
        uncheckNode: function(e, t) {
            return e.each(function() {
                o(this, t, false);
            });
        },
        clearChecked: function(t) {
            return t.each(function() {
                var t = this;
                var i = e(t).treegrid("options");
                e(t).datagrid("clearChecked");
                e.map(e(t).treegrid("getCheckedNodes"), function(e) {
                    o(t, e[i.idField], false, true);
                });
            });
        }
    };
    e.fn.treegrid.parseOptions = function(t) {
        return e.extend({}, e.fn.datagrid.parseOptions(t), e.parser.parseOptions(t, [ "treeField", {
            checkbox: "boolean",
            cascadeCheck: "boolean",
            onlyLeafCheck: "boolean"
        }, {
            animate: "boolean"
        } ]));
    };
    var k = e.extend({}, e.fn.datagrid.defaults.view, {
        getStyleValue: function(e) {
            var t = "";
            var i = "";
            if (typeof e == "string") {
                i = e;
            } else {
                if (e) {
                    t = e["class"] || "";
                    i = e["style"] || "";
                }
            }
            return {
                c: t,
                s: i
            };
        },
        render: function(t, i, a) {
            var n = e.data(t, "treegrid").options;
            var r = e(t).datagrid("getColumnFields", a);
            var o = e.data(t, "datagrid").rowIdPrefix;
            if (a) {
                if (!(n.rownumbers || n.frozenColumns && n.frozenColumns.length)) {
                    return;
                }
            }
            var s = this;
            if (this.treeNodes && this.treeNodes.length) {
                var l = d.call(this, a, this.treeLevel, this.treeNodes);
                e(i).append(l.join(""));
            }
            function d(i, a, l) {
                var c = e(t).treegrid("getParent", l[0][n.idField]);
                var f = (c ? c.children.length : e(t).treegrid("getRoots").length) - l.length;
                var u = [ '<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>' ];
                for (var h = 0; h < l.length; h++) {
                    var p = l[h];
                    if (p.state != "open" && p.state != "closed") {
                        p.state = "open";
                    }
                    var v = n.rowStyler ? n.rowStyler.call(t, p) : "";
                    var g = this.getStyleValue(v);
                    var b = 'class="datagrid-row ' + (f++ % 2 && n.striped ? "datagrid-row-alt " : " ") + g.c + '"';
                    var m = g.s ? 'style="' + g.s + '"' : "";
                    var x = o + "-" + (i ? 1 : 2) + "-" + p[n.idField];
                    u.push('<tr id="' + x + '" node-id="' + p[n.idField] + '" ' + b + " " + m + ">");
                    u = u.concat(s.renderRow.call(s, t, r, i, a, p));
                    u.push("</tr>");
                    if (p.children && p.children.length) {
                        var C = d.call(this, i, a + 1, p.children);
                        var Y = p.state == "closed" ? "none" : "block";
                        u.push('<tr class="treegrid-tr-tree"><td style="border:0px" colspan=' + (r.length + (n.rownumbers ? 1 : 0)) + '><div style="display:' + Y + '">');
                        u = u.concat(C);
                        u.push("</div></td></tr>");
                    }
                }
                u.push("</tbody></table>");
                return u;
            }
        },
        renderFooter: function(t, i, a) {
            var n = e.data(t, "treegrid").options;
            var r = e.data(t, "treegrid").footer || [];
            var o = e(t).datagrid("getColumnFields", a);
            var s = [ '<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>' ];
            for (var l = 0; l < r.length; l++) {
                var d = r[l];
                d[n.idField] = d[n.idField] || "foot-row-id" + l;
                s.push('<tr class="datagrid-row" node-id="' + d[n.idField] + '">');
                s.push(this.renderRow.call(this, t, o, a, 0, d));
                s.push("</tr>");
            }
            s.push("</tbody></table>");
            e(i).html(s.join(""));
        },
        renderRow: function(t, i, a, n, r) {
            var o = e.data(t, "treegrid");
            var s = o.options;
            var l = [];
            if (a && s.rownumbers) {
                l.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">0</div></td>');
            }
            for (var d = 0; d < i.length; d++) {
                var c = i[d];
                var f = e(t).datagrid("getColumnOption", c);
                if (f) {
                    var u = f.styler ? f.styler(r[c], r) || "" : "";
                    var h = this.getStyleValue(u);
                    var p = h.c ? 'class="' + h.c + '"' : "";
                    var v = f.hidden ? 'style="display:none;' + h.s + '"' : h.s ? 'style="' + h.s + '"' : "";
                    l.push('<td field="' + c + '" ' + p + " " + v + ">");
                    var v = "";
                    if (!f.checkbox) {
                        if (f.align) {
                            v += "text-align:" + f.align + ";";
                        }
                        if (!s.nowrap) {
                            v += "white-space:normal;height:auto;";
                        } else {
                            if (s.autoRowHeight) {
                                v += "height:auto;";
                            }
                        }
                    }
                    l.push('<div style="' + v + '" ');
                    if (f.checkbox) {
                        l.push('class="datagrid-cell-check ');
                    } else {
                        l.push('class="datagrid-cell ' + f.cellClass);
                    }
                    l.push('">');
                    if (f.checkbox) {
                        if (r.checked) {
                            l.push('<input type="checkbox" checked="checked"');
                        } else {
                            l.push('<input type="checkbox"');
                        }
                        l.push(' name="' + c + '" value="' + (r[c] != undefined ? r[c] : "") + '">');
                    } else {
                        var g = null;
                        if (f.formatter) {
                            g = f.formatter(r[c], r);
                        } else {
                            g = r[c];
                        }
                        if (c == s.treeField) {
                            for (var b = 0; b < n; b++) {
                                l.push('<span class="tree-indent"></span>');
                            }
                            if (r.state == "closed") {
                                l.push('<span class="tree-hit tree-collapsed"></span>');
                                l.push('<span class="tree-icon tree-folder ' + (r.iconCls ? r.iconCls : "") + '"></span>');
                            } else {
                                if (r.children && r.children.length) {
                                    l.push('<span class="tree-hit tree-expanded"></span>');
                                    l.push('<span class="tree-icon tree-folder tree-folder-open ' + (r.iconCls ? r.iconCls : "") + '"></span>');
                                } else {
                                    l.push('<span class="tree-indent"></span>');
                                    l.push('<span class="tree-icon tree-file ' + (r.iconCls ? r.iconCls : "") + '"></span>');
                                }
                            }
                            if (this.hasCheckbox(t, r)) {
                                var m = 0;
                                var x = e.hisui.getArrayItem(o.checkedRows, s.idField, r[s.idField]);
                                if (x) {
                                    m = x.checkState == "checked" ? 1 : 2;
                                    r.checkState = x.checkState;
                                } else {
                                    var C = e.hisui.getArrayItem(o.checkedRows, s.idField, r._parentId);
                                    if (C && C.checkState == "checked" && s.cascadeCheck) {
                                        m = 1;
                                        r.checked = true;
                                        e.hisui.addArrayItem(o.checkedRows, s.idField, r);
                                    } else {
                                        if (r.checked) {
                                            e.hisui.addArrayItem(o.tmpIds, r[s.idField]);
                                        }
                                    }
                                    r.checkState = m ? "checked" : "unchecked";
                                }
                                l.push('<span class="tree-checkbox tree-checkbox' + m + '"></span>');
                            } else {
                                r.checkState = undefined;
                                r.checked = undefined;
                            }
                            l.push('<span class="tree-title">' + g + "</span>");
                        } else {
                            l.push(g);
                        }
                    }
                    l.push("</div>");
                    l.push("</td>");
                }
            }
            return l.join("");
        },
        hasCheckbox: function(t, i) {
            var a = e.data(t, "treegrid").options;
            if (a.checkbox) {
                if (e.isFunction(a.checkbox)) {
                    if (a.checkbox.call(t, i)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (a.onlyLeafCheck) {
                        if (i.state == "open" && !(i.children && i.children.length)) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            }
            return false;
        },
        refreshRow: function(e, t) {
            this.updateRow.call(this, e, t, {});
        },
        updateRow: function(t, i, a) {
            var n = e.data(t, "treegrid").options;
            var r = e(t).treegrid("find", i);
            e.extend(r, a);
            var o = e(t).treegrid("getLevel", i) - 1;
            var s = n.rowStyler ? n.rowStyler.call(t, r) : "";
            var l = e.data(t, "datagrid").rowIdPrefix;
            var d = r[n.idField];
            function c(a) {
                var c = e(t).treegrid("getColumnFields", a);
                var f = n.finder.getTr(t, i, "body", a ? 1 : 2);
                var u = f.find("div.datagrid-cell-rownumber").html();
                var h = f.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                f.html(this.renderRow(t, c, a, o, r));
                f.attr("style", s || "");
                f.find("div.datagrid-cell-rownumber").html(u);
                if (h) {
                    f.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
                }
                if (d != i) {
                    f.attr("id", l + "-" + (a ? 1 : 2) + "-" + d);
                    f.attr("node-id", d);
                }
            }
            c.call(this, true);
            c.call(this, false);
            e(t).treegrid("fixRowHeight", i);
        },
        deleteRow: function(t, i) {
            var a = e.data(t, "treegrid").options;
            var n = a.finder.getTr(t, i);
            n.next("tr.treegrid-tr-tree").remove();
            n.remove();
            var r = s(i);
            if (r) {
                if (r.children.length == 0) {
                    n = a.finder.getTr(t, r[a.idField]);
                    n.next("tr.treegrid-tr-tree").remove();
                    var o = n.children('td[field="' + a.treeField + '"]').children("div.datagrid-cell");
                    o.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                    o.find(".tree-hit").remove();
                    e('<span class="tree-indent"></span>').prependTo(o);
                }
            }
            function s(i) {
                var n;
                var r = e(t).treegrid("getParent", i);
                if (r) {
                    n = r.children;
                } else {
                    n = e(t).treegrid("getData");
                }
                for (var o = 0; o < n.length; o++) {
                    if (n[o][a.idField] == i) {
                        n.splice(o, 1);
                        break;
                    }
                }
                return r;
            }
        },
        onBeforeRender: function(t, i, a) {
            if (e.isArray(i)) {
                a = {
                    total: i.length,
                    rows: i
                };
                i = null;
            }
            if (!a) {
                return false;
            }
            var n = e.data(t, "treegrid");
            var r = n.options;
            if (a.length == undefined) {
                if (a.footer) {
                    n.footer = a.footer;
                }
                if (a.total != n.total) {
                    n.total = a.total;
                }
                a = this.transfer(t, i, a.rows);
            } else {
                function o(e, t) {
                    for (var i = 0; i < e.length; i++) {
                        var a = e[i];
                        a._parentId = t;
                        if (a.children && a.children.length) {
                            o(a.children, a[r.idField]);
                        }
                    }
                }
                o(a, i);
            }
            var s = Y(t, i);
            if (s) {
                if (s.children) {
                    s.children = s.children.concat(a);
                } else {
                    s.children = a;
                }
            } else {
                n.data = n.data.concat(a);
            }
            this.sort(t, a);
            this.treeNodes = a;
            this.treeLevel = e(t).treegrid("getLevel", i);
        },
        sort: function(t, i) {
            var a = e.data(t, "treegrid").options;
            if (!a.remoteSort && a.sortName) {
                var n = a.sortName.split(",");
                var r = a.sortOrder.split(",");
                o(i);
            }
            function o(i) {
                i.sort(function(i, a) {
                    var o = 0;
                    for (var s = 0; s < n.length; s++) {
                        var l = n[s];
                        var d = r[s];
                        var c = e(t).treegrid("getColumnOption", l);
                        var f = c.sorter || function(e, t) {
                            return e == t ? 0 : e > t ? 1 : -1;
                        };
                        o = f(i[l], a[l]) * (d == "asc" ? 1 : -1);
                        if (o != 0) {
                            return o;
                        }
                    }
                    return o;
                });
                for (var a = 0; a < i.length; a++) {
                    var s = i[a].children;
                    if (s && s.length) {
                        o(s);
                    }
                }
            }
        },
        transfer: function(t, i, a) {
            var n = e.data(t, "treegrid").options;
            var r = e.extend([], a);
            var o = c(i, r);
            var s = e.extend([], o);
            while (s.length) {
                var l = s.shift();
                var d = c(l[n.idField], r);
                if (d.length) {
                    if (l.children) {
                        l.children = l.children.concat(d);
                    } else {
                        l.children = d;
                    }
                    s = s.concat(d);
                }
            }
            return o;
            function c(e, t) {
                var i = [];
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    if (n._parentId == e || f(n._parentId, e)) {
                        i.push(n);
                        t.splice(a, 1);
                        a--;
                    }
                }
                return i;
            }
            function f(e, t) {
                return (typeof e == "undefined" || e == null || e == "") && (typeof t == "undefined" || t == null);
            }
        }
    });
    e.fn.treegrid.defaults = e.extend({}, e.fn.datagrid.defaults, {
        treeField: null,
        checkbox: false,
        cascadeCheck: true,
        onlyLeafCheck: false,
        lines: false,
        animate: false,
        singleSelect: true,
        view: k,
        rowEvents: e.extend({}, e.fn.datagrid.defaults.rowEvents, {
            mouseover: n(true),
            mouseout: n(false),
            click: r
        }),
        loader: function(t, i, a) {
            var n = e(this).treegrid("options");
            if (!n.url) {
                return false;
            }
            e.ajax({
                type: n.method,
                url: n.url,
                data: t,
                dataType: "json",
                success: function(t) {
                    if ("undefined" !== typeof t.code) {
                        var a = t.data || {
                            total: 0,
                            rows: []
                        };
                        t.message = t.message || t.msg;
                        if ("undefined" == typeof a.rows && a.records) {
                            a.rows = a.records;
                        }
                        if (t.code != 200) e.messager.alert(t.code, t.message, "error");
                        i(a);
                    } else {
                        i(t);
                    }
                },
                error: function() {
                    a.apply(this, arguments);
                }
            });
        },
        loadFilter: function(e, t) {
            return e;
        },
        finder: {
            getTr: function(t, i, a, n) {
                a = a || "body";
                n = n || 0;
                var r = e.data(t, "datagrid").dc;
                if (n == 0) {
                    var o = e.data(t, "treegrid").options;
                    var s = o.finder.getTr(t, i, a, 1);
                    var l = o.finder.getTr(t, i, a, 2);
                    return s.add(l);
                } else {
                    if (a == "body") {
                        var d = e("#" + e.data(t, "datagrid").rowIdPrefix + "-" + n + "-" + i);
                        if (!d.length) {
                            d = (n == 1 ? r.body1 : r.body2).find('tr[node-id="' + i + '"]');
                        }
                        return d;
                    } else {
                        if (a == "footer") {
                            return (n == 1 ? r.footer1 : r.footer2).find('tr[node-id="' + i + '"]');
                        } else {
                            if (a == "selected") {
                                return (n == 1 ? r.body1 : r.body2).find("tr.datagrid-row-selected");
                            } else {
                                if (a == "highlight") {
                                    return (n == 1 ? r.body1 : r.body2).find("tr.datagrid-row-over");
                                } else {
                                    if (a == "checked") {
                                        return (n == 1 ? r.body1 : r.body2).find("tr.datagrid-row-checked");
                                    } else {
                                        if (a == "last") {
                                            return (n == 1 ? r.body1 : r.body2).find("tr:last[node-id]");
                                        } else {
                                            if (a == "allbody") {
                                                return (n == 1 ? r.body1 : r.body2).find("tr[node-id]");
                                            } else {
                                                if (a == "allfooter") {
                                                    return (n == 1 ? r.footer1 : r.footer2).find("tr[node-id]");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            getRow: function(t, i) {
                var a = typeof i == "object" ? i.attr("node-id") : i;
                return e(t).treegrid("find", a);
            },
            getRows: function(t) {
                return e(t).treegrid("getChildren");
            }
        },
        onBeforeLoad: function(e, t) {},
        onLoadSuccess: function(e, t) {},
        onLoadError: function() {},
        onBeforeCollapse: function(e) {},
        onCollapse: function(e) {},
        onBeforeExpand: function(e) {},
        onExpand: function(e) {},
        onClickRow: function(e) {},
        onDblClickRow: function(e) {},
        onClickCell: function(e, t) {},
        onDblClickCell: function(e, t) {},
        onContextMenu: function(e, t) {},
        onBeforeEdit: function(e) {},
        onAfterEdit: function(e, t) {},
        onCancelEdit: function(e) {},
        onBeforeCheckNode: function(e, t) {},
        onCheckNode: function(e, t) {}
    });
})(jQuery);

(function(e) {
    function t(t, i) {
        var a = e.data(t, "combo");
        var n = a.options;
        var r = a.combo;
        var o = a.panel;
        if (i) {
            n.width = i;
        }
        if (isNaN(n.width)) {
            var s = e(t).clone();
            s.css("visibility", "hidden");
            s.appendTo("body");
            n.width = s.outerWidth();
            s.remove();
        }
        r.appendTo("body");
        var l = r.find("input.combo-text");
        var d = r.find(".combo-arrow");
        var c = n.hasDownArrow ? d._outerWidth() : 0;
        r._outerWidth(n.width)._outerHeight(n.height);
        l._outerWidth(r.width() - c);
        l.css({
            height: r.height() + "px",
            lineHeight: r.height() + "px"
        });
        d._outerHeight(r.height());
        r.insertAfter(t);
    }
    function i(t) {
        e(t).addClass("combo-f").hide();
        var i = e('<span class="combo">' + '<input type="text" class="combo-text" autocomplete="off">' + '<span><span class="combo-arrow"></span></span>' + '<input type="hidden" class="combo-value">' + "</span>").insertAfter(t);
        var a = e('<div class="combo-panel"></div>').appendTo("body");
        a.panel({
            doSize: false,
            closed: true,
            cls: "combo-p",
            style: {
                position: "absolute",
                zIndex: 10
            },
            onOpen: function() {
                var t = e(this).panel("panel");
                if (e.fn.menu) {
                    t.css("z-index", e.fn.menu.defaults.zIndex++);
                } else {
                    if (e.fn.window) {
                        t.css("z-index", e.fn.window.defaults.zIndex++);
                    }
                }
                i.addClass("combo-p-active");
                e(this).panel("resize");
            },
            onBeforeClose: function() {
                r(this);
            },
            onClose: function() {
                var a = e.data(t, "combo");
                if (a) {
                    i.removeClass("combo-p-active");
                    a.options.onHidePanel.call(t);
                }
            }
        });
        var n = e(t).attr("name");
        if (n) {
            i.find("input.combo-value").attr("name", n);
            e(t).removeAttr("name").attr("comboName", n);
        }
        return {
            combo: i,
            panel: a
        };
    }
    function a(t) {
        var i = e.data(t, "combo");
        var a = i.options;
        var n = i.combo;
        if (a.hasDownArrow) {
            n.find(".combo-arrow").show();
        } else {
            n.find(".combo-arrow").hide();
        }
        c(t, a.disabled);
        f(t, a.readonly);
    }
    function n(t) {
        var i = e.data(t, "combo");
        var a = i.combo.find("input.combo-text");
        a.validatebox("destroy");
        i.panel.panel("destroy");
        i.combo.remove();
        e(t).remove();
    }
    function r(t) {
        e(t).find(".combo-f").each(function() {
            var t = e(this).combo("panel");
            if (t.is(":visible")) {
                t.panel("close");
            }
        });
    }
    function o(t) {
        var i = e.data(t, "combo");
        var a = i.options;
        var n = i.panel;
        var o = i.combo;
        var s = o.find(".combo-text");
        var d = o.find(".combo-arrow");
        e(document).unbind(".combo").bind("mousedown.combo", function(t) {
            var i = e(t.target).closest("span.combo,div.combo-p");
            if (i.length) {
                r(i);
                return;
            }
            if (e("body>div.combo-p>div.combo-panel:visible").length > 0) {
                if (t.target.type && t.target.type.toLowerCase() == "text") e(t.target).focus();
                e("body>div.combo-p>div.combo-panel:visible").panel("close");
            }
        });
        s.unbind(".combo");
        d.unbind(".combo");
        if (!a.disabled && !a.readonly) {
            s.bind("click.combo", function(t) {
                if (!a.editable) {
                    c.call(this);
                } else {
                    var i = e(this).closest("div.combo-panel");
                    e("div.combo-panel:visible").not(n).not(i).panel("close");
                }
            }).bind("keydown.combo paste.combo drop.combo input.combo compositionend.combo", function(r) {
                if (navigator.userAgent.indexOf("MWBrowser/2") == -1 && "undefined" == typeof r.keyCode) {
                    return;
                }
                switch (r.keyCode) {
                  case 38:
                    a.keyHandler.up.call(t, r);
                    break;

                  case 40:
                    if (n.panel("options").closed) d.trigger("click.combo");
                    a.keyHandler.down.call(t, r);
                    break;

                  case 37:
                    a.keyHandler.left.call(t, r);
                    break;

                  case 39:
                    a.keyHandler.right.call(t, r);
                    break;

                  case 13:
                    a.keyHandler.enter.call(t, r);
                    break;

                  case 9:
                  case 27:
                    l(t);
                    break;

                  default:
                    if (a.editable) {
                        if (i.timer) {
                            clearTimeout(i.timer);
                        }
                        i.timer = setTimeout(function() {
                            var n = s.val();
                            if (i.previousValue != n) {
                                i.previousValue = n;
                                e(t).combo("showPanel");
                                a.keyHandler.query.call(t, s.val(), r);
                                e(t).combo("validate");
                                a.queryOnFirstArrowDown = false;
                            }
                        }, a.delay);
                    }
                }
            });
            d.bind("click.combo", function() {
                c.call(this);
            }).bind("mouseenter.combo", function() {
                e(this).addClass("combo-arrow-hover");
            }).bind("mouseleave.combo", function() {
                e(this).removeClass("combo-arrow-hover");
            });
        }
        function c() {
            if (n.is(":visible")) {
                l(t);
            } else {
                var i = e(this).closest("div.combo-panel");
                e("div.combo-panel:visible").not(n).not(i).panel("close");
                e(t).combo("showPanel");
                if (a.queryOnFirstArrowDown) {
                    a.keyHandler.query.call(t, s.val());
                    a.queryOnFirstArrowDown = false;
                    e(t).combo("validate");
                }
            }
            s.focus();
        }
    }
    function s(t) {
        var i = e.data(t, "combo");
        var a = i.options;
        var n = i.combo;
        var r = i.panel;
        r.panel("move", {
            left: s(),
            top: l()
        });
        if (r.panel("options").closed) {
            r.panel("open");
            var o = i.combo;
            r.panel("resize", {
                width: a.panelWidth ? a.panelWidth : o.outerWidth(),
                height: a.panelHeight
            });
            if (r.find(".datagrid").length > 0) {
                e.data(t, "combogrid").grid.datagrid("resize", {
                    width: a.panelWidth ? a.panelWidth : o.outerWidth(),
                    height: a.panelHeight
                });
            }
            a.onShowPanel.call(t);
        }
        (function() {
            if (r.is(":visible")) {
                var e = l();
                if (e > n.offset().top) {
                    r.parent().removeClass("combo-p-top").addClass("combo-p-bottom");
                } else {
                    r.parent().removeClass("combo-p-bottom").addClass("combo-p-top");
                }
                r.panel("move", {
                    left: s(),
                    top: e
                });
                setTimeout(arguments.callee, 200);
            }
        })();
        function s() {
            var t = n.offset().left;
            if (a.panelAlign == "right") {
                t += n._outerWidth() - r._outerWidth();
            }
            if (t + r._outerWidth() > e(window)._outerWidth() + e(document).scrollLeft()) {
                t = e(window)._outerWidth() + e(document).scrollLeft() - r._outerWidth();
            }
            if (t < 0) {
                t = 0;
            }
            return t;
        }
        function l() {
            var t = n.offset().top + n._outerHeight() - 1;
            if (t + r._outerHeight() > e(window)._outerHeight() + e(document).scrollTop()) {
                t = n.offset().top - r._outerHeight() + 1;
            }
            if (t < e(document).scrollTop()) {
                t = n.offset().top + n._outerHeight() - 1;
            }
            return t;
        }
    }
    function l(t) {
        var i = e.data(t, "combo").panel;
        i.panel("close");
    }
    function d(t) {
        var i = e.data(t, "combo").options;
        var a = e(t).combo("textbox");
        a.validatebox(e.extend({}, i, {
            deltaX: i.hasDownArrow ? i.deltaX : i.deltaX > 0 ? 1 : -1
        }));
    }
    function c(t, i) {
        var a = e.data(t, "combo");
        var n = a.options;
        var r = a.combo;
        if (i) {
            n.disabled = true;
            e(t).attr("disabled", true);
            r.find(".combo-value").attr("disabled", true);
            r.find(".combo-text").attr("disabled", true);
            r.addClass("disabled");
        } else {
            n.disabled = false;
            e(t).removeAttr("disabled");
            r.find(".combo-value").removeAttr("disabled");
            r.find(".combo-text").removeAttr("disabled");
            r.removeClass("disabled");
        }
    }
    function f(t, i) {
        var a = e.data(t, "combo");
        var n = a.options;
        n.readonly = i == undefined ? true : i;
        var r = n.readonly ? true : !n.editable;
        a.combo.find(".combo-text").attr("readonly", r).css("cursor", r ? "pointer" : "");
    }
    function u(t) {
        var i = e.data(t, "combo");
        var a = i.options;
        var n = i.combo;
        if (a.multiple) {
            n.find("input.combo-value").remove();
        } else {
            n.find("input.combo-value").val("");
        }
        n.find("input.combo-text").val("");
    }
    function h(t) {
        var i = e.data(t, "combo").combo;
        return i.find("input.combo-text").val();
    }
    function p(t, i) {
        var a = e.data(t, "combo");
        var n = a.combo.find("input.combo-text");
        if (n.val() != i) {
            n.val(i);
            e(t).combo("validate");
            a.previousValue = i;
        }
    }
    function v(t) {
        var i = [];
        var a = e.data(t, "combo").combo;
        a.find("input.combo-value").each(function() {
            i.push(e(this).val());
        });
        return i;
    }
    function g(t, i) {
        var a = e.data(t, "combo").options;
        var n = v(t);
        var r = e.data(t, "combo").combo;
        r.find("input.combo-value").remove();
        var o = e(t).attr("comboName");
        for (var s = 0; s < i.length; s++) {
            var l = e('<input type="hidden" class="combo-value">').appendTo(r);
            if (o) {
                l.attr("name", o);
            }
            l.val(i[s]);
        }
        var d = [];
        for (var s = 0; s < n.length; s++) {
            d[s] = n[s];
        }
        var c = [];
        for (var s = 0; s < i.length; s++) {
            for (var f = 0; f < d.length; f++) {
                if (i[s] == d[f]) {
                    c.push(i[s]);
                    d.splice(f, 1);
                    break;
                }
            }
        }
        if (c.length != i.length || i.length != n.length) {
            if (a.multiple) {
                a.onChange.call(t, i, n);
            } else {
                a.onChange.call(t, i[0], n[0]);
            }
        }
    }
    function b(e) {
        var t = v(e);
        if (typeof t[0] == "undefined") {
            t[0] = "";
        }
        return t[0];
    }
    function m(e, t) {
        g(e, [ t ]);
    }
    function x(t) {
        var i = e.data(t, "combo").options;
        var a = i.onChange;
        i.onChange = function() {};
        if (i.multiple) {
            if (i.value) {
                if (typeof i.value == "object") {
                    g(t, i.value);
                } else {
                    m(t, i.value);
                }
            } else {
                g(t, []);
            }
            i.originalValue = v(t);
        } else {
            m(t, i.value);
            i.originalValue = i.value;
        }
        i.onChange = a;
    }
    e.fn.combo = function(n, r) {
        if (typeof n == "string") {
            var s = e.fn.combo.methods[n];
            if (s) {
                return s(this, r);
            } else {
                return this.each(function() {
                    var t = e(this).combo("textbox");
                    t.validatebox(n, r);
                });
            }
        }
        n = n || {};
        return this.each(function() {
            var r = e.data(this, "combo");
            if (r) {
                e.extend(r.options, n);
            } else {
                var s = i(this);
                r = e.data(this, "combo", {
                    options: e.extend({}, e.fn.combo.defaults, e.fn.combo.parseOptions(this), n),
                    combo: s.combo,
                    panel: s.panel,
                    previousValue: null
                });
                e(this).removeAttr("disabled");
            }
            a(this);
            t(this);
            o(this);
            d(this);
            x(this);
        });
    };
    e.fn.combo.methods = {
        options: function(t) {
            return e.data(t[0], "combo").options;
        },
        panel: function(t) {
            return e.data(t[0], "combo").panel;
        },
        textbox: function(t) {
            return e.data(t[0], "combo").combo.find("input.combo-text");
        },
        destroy: function(e) {
            return e.each(function() {
                n(this);
            });
        },
        resize: function(e, i) {
            return e.each(function() {
                t(this, i);
            });
        },
        showPanel: function(e) {
            return e.each(function() {
                s(this);
            });
        },
        hidePanel: function(e) {
            return e.each(function() {
                l(this);
            });
        },
        disable: function(e) {
            return e.each(function() {
                c(this, true);
                o(this);
            });
        },
        enable: function(e) {
            return e.each(function() {
                c(this, false);
                o(this);
            });
        },
        readonly: function(e, t) {
            return e.each(function() {
                f(this, t);
                o(this);
            });
        },
        isValid: function(t) {
            var i = e.data(t[0], "combo").combo.find("input.combo-text");
            return i.validatebox("isValid");
        },
        clear: function(e) {
            return e.each(function() {
                u(this);
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e.data(this, "combo").options;
                if (t.multiple) {
                    e(this).combo("setValues", t.originalValue);
                } else {
                    e(this).combo("setValue", t.originalValue);
                }
            });
        },
        getText: function(e) {
            return h(e[0]);
        },
        setText: function(e, t) {
            return e.each(function() {
                p(this, t);
            });
        },
        getValues: function(e) {
            return v(e[0]);
        },
        setValues: function(e, t) {
            return e.each(function() {
                g(this, t);
            });
        },
        getValue: function(e) {
            return b(e[0]);
        },
        setValue: function(e, t) {
            return e.each(function() {
                m(this, t);
            });
        }
    };
    e.fn.combo.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.validatebox.parseOptions(t), e.parser.parseOptions(t, [ "blurValidValue", "width", "height", "separator", "panelAlign", {
            panelWidth: "number",
            editable: "boolean",
            hasDownArrow: "boolean",
            delay: "number",
            selectOnNavigation: "boolean"
        } ]), {
            panelHeight: i.attr("panelHeight") == "auto" ? "auto" : parseInt(i.attr("panelHeight")) || undefined,
            multiple: i.attr("multiple") ? true : undefined,
            disabled: i.attr("disabled") ? true : undefined,
            readonly: i.attr("readonly") ? true : undefined,
            value: i.val() || undefined
        });
    };
    e.fn.combo.defaults = e.extend({}, e.fn.validatebox.defaults, {
        blurValidValue: false,
        enterNullValueClear: true,
        width: "auto",
        height: 22,
        panelWidth: null,
        panelHeight: 200,
        panelAlign: "left",
        multiple: false,
        selectOnNavigation: true,
        separator: ",",
        editable: true,
        disabled: false,
        readonly: false,
        hasDownArrow: true,
        value: "",
        delay: 200,
        deltaX: 19,
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {},
            query: function(e, t) {}
        },
        onShowPanel: function() {},
        onHidePanel: function() {},
        onChange: function(e, t) {}
    });
})(jQuery);

(function(e) {
    var t = 0;
    function i(t, i) {
        var a = e.data(t, "combobox");
        var n = a.options;
        var r = a.data;
        for (var o = 0; o < r.length; o++) {
            if (r[o][n.valueField] == i) {
                return o;
            }
        }
        return -1;
    }
    function a(t, i) {
        var a = e.data(t, "combobox").options;
        var n = e(t).combo("panel");
        var r = a.finder.getEl(t, i);
        if (r.length) {
            if (r.position().top <= 0) {
                var o = n.scrollTop() + r.position().top;
                n.scrollTop(o);
            } else {
                if (r.position().top + r.outerHeight() > n.height()) {
                    var o = n.scrollTop() + r.position().top + r.outerHeight() - n.height();
                    n.scrollTop(o);
                }
            }
        }
    }
    function n(t, i) {
        var n = e.data(t, "combobox").options;
        var o = e(t).combobox("panel");
        var s = o.children("div.combobox-item-hover");
        if (!s.length) {
            s = o.children("div.combobox-item-selected");
        }
        s.removeClass("combobox-item-hover");
        var l = "div.combobox-item:visible:not(.combobox-item-disabled):first";
        var d = "div.combobox-item:visible:not(.combobox-item-disabled):last";
        if (!s.length) {
            s = o.children(i == "next" ? l : d);
        } else {
            if (i == "next") {
                s = s.nextAll(l);
                if (!s.length) {
                    s = o.children(l);
                }
            } else {
                s = s.prevAll(l);
                if (!s.length) {
                    s = o.children(d);
                }
            }
        }
        if (s.length) {
            s.addClass("combobox-item-hover");
            var c = n.finder.getRow(t, s);
            if (c) {
                a(t, c[n.valueField]);
                if (n.selectOnNavigation) {
                    r(t, c[n.valueField]);
                }
            }
        }
    }
    function r(t, i) {
        var a = e.data(t, "combobox").options;
        var n = e(t).combo("getValues");
        if (e.inArray(i + "", n) == -1) {
            if (a.multiple) {
                n.push(i);
            } else {
                n = [ i ];
            }
            s(t, n);
            a.onSelect.call(t, a.finder.getRow(t, i));
        } else {
            if (a.multiple) {} else {
                if (i) {
                    var r = a.finder.getRow(t, i);
                    if (r) {
                        var o = r[a.textField];
                        if (o !== e(t).combo("getText")) {
                            e(t).combo("setText", o);
                        }
                    }
                }
            }
        }
    }
    function o(t, i) {
        var a = e.data(t, "combobox").options;
        var n = e(t).combo("getValues");
        var r = e.inArray(i + "", n);
        if (r >= 0) {
            n.splice(r, 1);
            s(t, n);
            a.onUnselect.call(t, a.finder.getRow(t, i));
        }
    }
    function s(t, i, a) {
        var n = e.data(t, "combobox").options;
        var r = e(t).combo("panel");
        r.find("div.combobox-item-selected").removeClass("combobox-item-selected");
        var o = [], s = [], l = [];
        for (var d = 0; d < i.length; d++) {
            var c = i[d];
            var f = c;
            if (c != "" && c != undefined && c != null) {
                if (n.finder.getEl(t, c).length > 0) {
                    l.push(c);
                }
            }
            n.finder.getEl(t, c).addClass("combobox-item-selected");
            var u = n.finder.getRow(t, c);
            if (u) {
                f = u[n.textField];
            } else {}
            o.push(c);
            s.push(f);
        }
        e(t).combo("setValues", o);
        if (!a) {
            e(t).combo("setText", s.join(n.separator));
        }
        if (n.rowStyle && n.rowStyle == "checkbox") {
            var h = e.data(t, "combobox").data.length;
            if (l.length == h) {
                r.parent().children("._hisui_combobox-selectall").addClass("checked");
            } else {
                r.parent().children("._hisui_combobox-selectall").removeClass("checked");
            }
        }
    }
    function l(t, i, a) {
        var n = e.data(t, "combobox");
        var r = n.options;
        n.data = r.loadFilter.call(t, i);
        n.groups = [];
        i = n.data;
        var o = e(t).combobox("getValues");
        var l = [];
        var d = undefined;
        var c = "01234567890123456789", f = 0;
        function u(e) {
            if ("undefined" == typeof e) {
                return 1;
            }
            var t, i;
            i = 0;
            for (t = 0; t < e.length; t++) {
                if (e.charCodeAt(t) >= 0 && e.charCodeAt(t) <= 255) i = i + 1; else i = i + 2;
            }
            return i;
        }
        strFontWidth = function(t, i) {
            var a = i || "14px Microsoft Yahei", n = e("<div>" + t + "</div>").css({
                position: "absolute",
                "float": "left",
                "white-space": "nowrap",
                visibility: "hidden",
                font: a
            }).appendTo(e("body")), r = n.width();
            n.remove();
            return r;
        };
        var h = "";
        for (var p = 0; p < i.length; p++) {
            var v = i[p];
            var g = v[r.valueField] + "";
            var b = v[r.textField];
            var m = v[r.groupField];
            if (m) {
                if (d != m) {
                    d = m;
                    n.groups.push(m);
                    l.push('<div id="' + (n.groupIdPrefix + "_" + (n.groups.length - 1)) + '" class="combobox-group">');
                    l.push(r.groupFormatter ? r.groupFormatter.call(t, m) : m);
                    l.push("</div>");
                }
            } else {
                d = undefined;
            }
            var x = "combobox-item" + (v.disabled ? " combobox-item-disabled" : "") + (m ? " combobox-gitem" : "");
            l.push('<div id="' + (n.itemIdPrefix + "_" + p) + '" ' + h + ' class="' + x + '">');
            l.push(r.formatter ? r.formatter.call(t, v) : b);
            l.push("</div>");
            if (v["selected"] && e.inArray(g, o) == -1) {
                o.push(g);
            }
        }
        e(t).combo("panel").html(l.join(""));
        if (r.multiple) {
            s(t, o, a);
            if (r.rowStyle && r.rowStyle == "checkbox") {
                var C = e(t).combo("panel");
                C.closest(".combo-p").children("._hisui_combobox-selectall").remove();
                var Y = C.width() - 5;
                var w = e('<div style="width:' + Y + 'px" class="_hisui_combobox-selectall"><span class="combobox-checkbox"></span>' + r.selectAllBtnDesc + "</div>").bind("mouseenter", function(t) {
                    e(t.target).closest("div._hisui_combobox-selectall").addClass("combobox-selectall-hover");
                    t.stopPropagation();
                }).bind("mouseleave", function(t) {
                    e(t.target).closest("div._hisui_combobox-selectall").removeClass("combobox-selectall-hover");
                    t.stopPropagation();
                }).bind("click", function(i) {
                    var a = e(this);
                    if (a.hasClass("checked")) {
                        a.removeClass("checked");
                        e(t).combobox("setValues", []);
                    } else {
                        var n = [];
                        a.addClass("checked");
                        var o = e(t).combo("panel");
                        o.find("div.combobox-item").filter(":visible").each(function() {
                            var i = e(this);
                            if (!i.length || i.hasClass("combobox-item-disabled")) {
                                return;
                            }
                            var a = r.finder.getRow(t, i);
                            if (!a) {
                                return;
                            }
                            var o = a[r.valueField];
                            n.push(o);
                        });
                        e(t).combobox("setValues", n);
                    }
                    if (r.onAllSelectClick) {
                        r.onAllSelectClick.call(t, i);
                    }
                });
                if (r.allSelectButtonPosition == "bottom") {
                    w.insertAfter(C);
                    w.parent().addClass("bbtm");
                } else {
                    w.insertBefore(C);
                    w.parent().addClass("btop");
                }
            }
        } else {
            s(t, o.length ? [ o[o.length - 1] ] : [], a);
        }
        r.onLoadSuccess.call(t, i);
    }
    function d(t, i, a, n) {
        var r = e.data(t, "combobox").options;
        if (i) {
            r.url = i;
        }
        a = a || {};
        if (r.onBeforeLoad.call(t, a) == false) {
            return;
        }
        r.loader.call(t, a, function(i) {
            var a = i;
            if ("undefined" !== typeof i.code) {
                if (e.isArray(i.rows)) {
                    a = i.rows;
                } else if (e.isArray(i.data)) {
                    a = i.data;
                } else if (e.isArray(i.records)) {
                    a = i.records;
                }
            }
            l(t, a, n);
        }, function() {
            r.onLoadError.apply(this, arguments);
        });
    }
    function c(t, i) {
        var a = e.data(t, "combobox");
        var n = a.options;
        if (n.multiple && !i) {
            s(t, [], true);
        } else {
            s(t, [ i ], true);
        }
        if (n.mode == "remote") {
            d(t, null, {
                q: i
            }, true);
        } else {
            var r = e(t).combo("panel");
            r.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover");
            r.find("div.combobox-item,div.combobox-group").hide();
            var o = a.data;
            var l = [];
            var c = n.multiple ? i.split(n.separator) : [ i ];
            e.map(c, function(i) {
                i = e.trim(i);
                var r = undefined;
                for (var s = 0; s < o.length; s++) {
                    var d = o[s];
                    if (n.filter.call(t, i, d)) {
                        var c = d[n.valueField];
                        var f = d[n.textField];
                        var u = d[n.groupField];
                        var h = n.finder.getEl(t, c).show();
                        if (f.toLowerCase() == i.toLowerCase()) {
                            l.push(c);
                            h.addClass("combobox-item-selected");
                        }
                        if (n.groupField && r != u) {
                            e("#" + a.groupIdPrefix + "_" + e.inArray(u, a.groups)).show();
                            r = u;
                        }
                    }
                }
            });
            s(t, l, true);
            if (l.length > 0) {
                n.onSelect.call(t, n.finder.getRow(t, l[l.length - 1]));
            }
        }
    }
    function f(t) {
        var a = e(t);
        var n = a.combobox("options");
        var r = a.combobox("panel");
        if (!r.is(":visible")) return;
        var o = r.children("div.combobox-item-hover");
        if (o.length) {
            var s = n.finder.getRow(t, o);
            var l = s[n.valueField];
            n.doEnterFlag = 1;
            if (n.multiple) {
                if (o.hasClass("combobox-item-selected")) {
                    a.combobox("unselect", l);
                } else {
                    a.combobox("select", l);
                }
            } else {
                a.combobox("select", l);
            }
        }
        var d = [];
        e.map(a.combobox("getValues"), function(e) {
            if (i(t, e) >= 0) {
                d.push(e);
            }
        });
        if (d.length == 0 && !n.enterNullValueClear || n.multiple && !n.enterNullValueClear) {} else {
            a.combobox("setValues", d);
        }
        if (!n.multiple) {
            a.combobox("hidePanel");
        }
    }
    function u(t) {
        e(t).combobox("textbox").val("");
        var i = e.data(t, "combo");
        i.previousValue = "";
        c(t, "");
    }
    var h = function(t) {
        var i = null;
        if (window.event) {
            i = window.event.target || window.event.srcElement || null;
        }
        if (i && (i.className || "").indexOf("combobox-item") > -1) {
            return;
        }
        var a = e(t).combobox("options");
        if (a.doEnterFlag == 1) {
            a.doEnterFlag == 0;
            return;
        }
        var n = e(t).combobox("getValue");
        if (n == undefined || n == "" || n == null) {
            u(t);
        } else {
            var r = 0;
            var o = e(t).combobox("getData");
            for (var s = 0; s < o.length; s++) {
                if (o[s][a.valueField] == n) {
                    r = 1;
                }
            }
            if (0 == r) {
                u(t);
            }
        }
    };
    function p(i) {
        var n = e.data(i, "combobox");
        var s = n.options;
        t++;
        n.itemIdPrefix = "_hisui_combobox_i" + t;
        n.groupIdPrefix = "_hisui_combobox_g" + t;
        e(i).addClass("combobox-f");
        var l = s.onHidePanel;
        if (s && s.blurValidValue) {
            s.forceValidValue = true;
            if (s.onHidePanel) {
                var d = s.onHidePanel;
            }
            l = function() {
                var e = this;
                if ("function" == typeof d) d.call(e);
                h(e);
            };
        }
        e(i).combo(e.extend({}, s, {
            onShowPanel: function() {
                e(i).combo("panel").find("div.combobox-item,div.combobox-group").show();
                a(i, e(i).combobox("getValue"));
                s.onShowPanel.call(i);
            },
            onHidePanel: l
        }));
        e(i).combo("panel").unbind().bind("mouseover", function(t) {
            e(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
            var i = e(t.target).closest("div.combobox-item");
            if (!i.hasClass("combobox-item-disabled")) {
                i.addClass("combobox-item-hover");
            }
            t.stopPropagation();
        }).bind("mouseout", function(t) {
            e(t.target).closest("div.combobox-item").removeClass("combobox-item-hover");
            t.stopPropagation();
        }).bind("click", function(t) {
            var a = e(t.target).closest("div.combobox-item");
            if (!a.length || a.hasClass("combobox-item-disabled")) {
                return;
            }
            var n = s.finder.getRow(i, a);
            if (!n) {
                return;
            }
            var l = n[s.valueField];
            if (s.multiple) {
                if (a.hasClass("combobox-item-selected")) {
                    o(i, l);
                } else {
                    r(i, l);
                }
            } else {
                if (s.allowNull && a.hasClass("combobox-item-selected")) {
                    o(i, l);
                } else {
                    r(i, l);
                }
                e(i).combo("hidePanel");
            }
            t.stopPropagation();
        });
    }
    e.fn.combobox = function(t, i) {
        if (typeof t == "string") {
            var a = e.fn.combobox.methods[t];
            if (a) {
                return a(this, i);
            } else {
                return this.combo(t, i);
            }
        }
        t = t || {};
        return this.each(function() {
            var i = e.data(this, "combobox");
            if (i) {
                e.extend(i.options, t);
                p(this);
            } else {
                i = e.data(this, "combobox", {
                    options: e.extend({}, e.fn.combobox.defaults, e.fn.combobox.parseOptions(this), t),
                    data: []
                });
                p(this);
                var a = e.fn.combobox.parseData(this);
                if (a.length) {
                    l(this, a);
                }
            }
            if (i.options.data) {
                l(this, i.options.data);
            }
            d(this);
        });
    };
    e.fn.combobox.methods = {
        options: function(t) {
            var i = t.combo("options");
            return e.extend(e.data(t[0], "combobox").options, {
                originalValue: i.originalValue,
                disabled: i.disabled,
                readonly: i.readonly
            });
        },
        getData: function(t) {
            return e.data(t[0], "combobox").data;
        },
        setValues: function(e, t) {
            return e.each(function() {
                s(this, t);
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                s(this, [ t ]);
            });
        },
        clear: function(t) {
            return t.each(function() {
                e(this).combo("clear");
                var t = e(this).combo("panel");
                t.find("div.combobox-item-selected").removeClass("combobox-item-selected");
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).combobox("options");
                if (t.multiple) {
                    e(this).combobox("setValues", t.originalValue);
                } else {
                    e(this).combobox("setValue", t.originalValue);
                }
            });
        },
        loadData: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        reload: function(e, t) {
            return e.each(function() {
                d(this, t);
            });
        },
        select: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        unselect: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        }
    };
    e.fn.combobox.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.combo.parseOptions(t), e.parser.parseOptions(t, [ "valueField", "textField", "groupField", "mode", "method", "url" ]));
    };
    e.fn.combobox.parseData = function(t) {
        var i = [];
        var a = e(t).combobox("options");
        e(t).children().each(function() {
            if (this.tagName.toLowerCase() == "optgroup") {
                var t = e(this).attr("label");
                e(this).children().each(function() {
                    n(this, t);
                });
            } else {
                n(this);
            }
        });
        return i;
        function n(t, n) {
            var r = e(t);
            var o = {};
            o[a.valueField] = r.attr("value") != undefined ? r.attr("value") : r.text();
            o[a.textField] = r.text();
            o["selected"] = r.is(":selected");
            o["disabled"] = r.is(":disabled");
            if (n) {
                a.groupField = a.groupField || "group";
                o[a.groupField] = n;
            }
            i.push(o);
        }
    };
    e.fn.combobox.defaults = e.extend({}, e.fn.combo.defaults, {
        forceValidValue: false,
        allowNull: false,
        selectAllBtnDesc: "select/unselect",
        allSelectButtonPosition: "top",
        rowStyle: "",
        valueField: "value",
        textField: "text",
        groupField: null,
        groupFormatter: function(e) {
            return e;
        },
        mode: "local",
        method: "post",
        url: null,
        data: null,
        keyHandler: {
            up: function(e) {
                n(this, "prev");
                e.preventDefault();
            },
            down: function(e) {
                n(this, "next");
                e.preventDefault();
            },
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                f(this);
            },
            query: function(e, t) {
                c(this, e);
            }
        },
        filter: function(t, i) {
            var a = e(this).combobox("options");
            return i[a.textField].toLowerCase().indexOf(t.toLowerCase()) == 0;
        },
        formatter: function(t) {
            var i = e(this).combobox("options");
            if (i.rowStyle && i.rowStyle == "checkbox") {
                return "<span class='combobox-checkbox'></span>" + t[i.textField];
            } else {
                return t[i.textField];
            }
        },
        loader: function(t, i, a) {
            var n = e(this).combobox("options");
            if (!n.url) {
                return false;
            }
            e.ajax({
                type: n.method,
                url: n.url,
                data: t,
                dataType: "json",
                success: function(e) {
                    i(e);
                },
                error: function() {
                    a.apply(this, arguments);
                }
            });
        },
        loadFilter: function(e) {
            return e;
        },
        finder: {
            getEl: function(t, a) {
                var n = i(t, a);
                var r = e.data(t, "combobox").itemIdPrefix + "_" + n;
                return e("#" + r);
            },
            getRow: function(t, a) {
                var n = e.data(t, "combobox");
                var r = a instanceof jQuery ? a.attr("id").substr(n.itemIdPrefix.length + 1) : i(t, a);
                return n.data[parseInt(r)];
            }
        },
        onBeforeLoad: function(e) {},
        onLoadSuccess: function() {},
        onLoadError: function() {},
        onSelect: function(e) {},
        onUnselect: function(e) {}
    });
})(jQuery);

(function(e) {
    function t(t) {
        var a = e.data(t, "combotree");
        var n = a.options;
        var r = a.tree;
        e(t).addClass("combotree-f");
        e(t).combo(n);
        var o = e(t).combo("panel");
        if (!r) {
            r = e("<ul></ul>").appendTo(o);
            e.data(t, "combotree").tree = r;
        }
        r.tree(e.extend({}, n, {
            checkbox: n.multiple,
            onLoadSuccess: function(i, a) {
                var o = e(t).combotree("getValues");
                if (n.multiple) {
                    var s = r.tree("getChecked");
                    for (var l = 0; l < s.length; l++) {
                        var d = s[l].id;
                        (function() {
                            for (var e = 0; e < o.length; e++) {
                                if (d == o[e]) {
                                    return;
                                }
                            }
                            o.push(d);
                        })();
                    }
                }
                var c = e(this).tree("options");
                var f = c.onCheck;
                var u = c.onSelect;
                c.onCheck = c.onSelect = function() {};
                e(t).combotree("setValues", o);
                c.onCheck = f;
                c.onSelect = u;
                n.onLoadSuccess.call(this, i, a);
            },
            onClick: function(a) {
                if (n.multiple) {
                    e(this).tree(a.checked ? "uncheck" : "check", a.target);
                } else {
                    e(t).combo("hidePanel");
                }
                i(t);
                n.onClick.call(this, a);
            },
            onCheck: function(e, a) {
                i(t);
                n.onCheck.call(this, e, a);
            }
        }));
    }
    function i(t) {
        var i = e.data(t, "combotree");
        var a = i.options;
        var n = i.tree;
        var r = [], o = [];
        if (a.multiple) {
            var s = n.tree("getChecked");
            for (var l = 0; l < s.length; l++) {
                r.push(s[l].id);
                o.push(s[l].text);
            }
        } else {
            var d = n.tree("getSelected");
            if (d) {
                r.push(d.id);
                o.push(d.text);
            }
        }
        e(t).combo("setValues", r).combo("setText", o.join(a.separator));
    }
    function a(t, i) {
        var a = e.data(t, "combotree").options;
        var n = e.data(t, "combotree").tree;
        n.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
        var r = [], o = [];
        for (var s = 0; s < i.length; s++) {
            var l = i[s];
            var d = l;
            var c = n.tree("find", l);
            if (c) {
                d = c.text;
                n.tree("check", c.target);
                n.tree("select", c.target);
            }
            r.push(l);
            o.push(d);
        }
        e(t).combo("setValues", r).combo("setText", o.join(a.separator));
    }
    e.fn.combotree = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.combotree.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.combo(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "combotree");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "combotree", {
                    options: e.extend({}, e.fn.combotree.defaults, e.fn.combotree.parseOptions(this), i)
                });
            }
            t(this);
        });
    };
    e.fn.combotree.methods = {
        options: function(t) {
            var i = t.combo("options");
            return e.extend(e.data(t[0], "combotree").options, {
                originalValue: i.originalValue,
                disabled: i.disabled,
                readonly: i.readonly
            });
        },
        tree: function(t) {
            return e.data(t[0], "combotree").tree;
        },
        loadData: function(t, i) {
            return t.each(function() {
                var t = e.data(this, "combotree").options;
                t.data = i;
                var a = e.data(this, "combotree").tree;
                a.tree("loadData", i);
            });
        },
        reload: function(t, i) {
            return t.each(function() {
                var t = e.data(this, "combotree").options;
                var a = e.data(this, "combotree").tree;
                if (i) {
                    t.url = i;
                }
                a.tree({
                    url: t.url
                });
            });
        },
        setValues: function(e, t) {
            return e.each(function() {
                a(this, t);
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                a(this, [ t ]);
            });
        },
        clear: function(t) {
            return t.each(function() {
                var t = e.data(this, "combotree").tree;
                t.find("div.tree-node-selected").removeClass("tree-node-selected");
                var i = t.tree("getChecked");
                for (var a = 0; a < i.length; a++) {
                    t.tree("uncheck", i[a].target);
                }
                e(this).combo("clear");
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).combotree("options");
                if (t.multiple) {
                    e(this).combotree("setValues", t.originalValue);
                } else {
                    e(this).combotree("setValue", t.originalValue);
                }
            });
        }
    };
    e.fn.combotree.parseOptions = function(t) {
        return e.extend({}, e.fn.combo.parseOptions(t), e.fn.tree.parseOptions(t));
    };
    e.fn.combotree.defaults = e.extend({}, e.fn.combo.defaults, e.fn.tree.defaults, {
        editable: false
    });
})(jQuery);

(function(e) {
    function t(t) {
        var i = e.data(t, "combogrid");
        var n = i.options;
        var r = i.grid;
        e(t).addClass("combogrid-f").combo(n);
        var o = e(t).combo("panel");
        if (!r) {
            r = e("<table></table>").appendTo(o);
            i.grid = r;
        }
        if (n.lazy && e(t).combo("getValue") == "") e(t).combo("options").queryOnFirstArrowDown = true;
        r.datagrid(e.extend({}, n, {
            border: false,
            fit: true,
            singleSelect: !n.multiple,
            onLoadSuccess: function(r) {
                var o = e(t).combo("getValues");
                var s = n.onSelect;
                n.onSelect = function() {};
                a(t, o, i.remainText);
                n.onSelect = s;
                n.onLoadSuccess.apply(t, arguments);
            },
            onClickRow: s,
            onSelect: function(e, t) {
                l();
                n.onSelect.call(this, e, t);
            },
            onUnselect: function(e, t) {
                l();
                n.onUnselect.call(this, e, t);
            },
            onSelectAll: function(e) {
                l();
                n.onSelectAll.call(this, e);
            },
            onUnselectAll: function(e) {
                if (n.multiple) {
                    l();
                }
                n.onUnselectAll.call(this, e);
            },
            lazy: n.lazy && e(t).combo("getValue") == ""
        }));
        function s(a, r) {
            i.remainText = false;
            l();
            if (!n.multiple) {
                e(t).combo("hidePanel");
            }
            n.onClickRow.call(this, a, r);
        }
        function l() {
            var a = r.datagrid("getSelections");
            var o = [], s = [];
            for (var l = 0; l < a.length; l++) {
                o.push(a[l][n.idField]);
                s.push(a[l][n.textField]);
            }
            if (!n.multiple) {
                e(t).combo("setValues", o.length ? o : [ "" ]);
            } else {
                e(t).combo("setValues", o);
            }
            if (!i.remainText) {
                e(t).combo("setText", s.join(n.separator));
            }
        }
    }
    function i(t, i) {
        var a = e.data(t, "combogrid");
        var n = a.options;
        var r = a.grid;
        var o = r.datagrid("getRows").length;
        if (!o) {
            return;
        }
        var s = n.finder.getTr(r[0], null, "highlight");
        if (!s.length) {
            s = n.finder.getTr(r[0], null, "selected");
        }
        var l;
        if (!s.length) {
            l = i == "next" ? 0 : o - 1;
        } else {
            var l = parseInt(s.attr("datagrid-row-index"));
            l += i == "next" ? 1 : -1;
            if (l < 0) {
                l = o - 1;
            }
            if (l >= o) {
                l = 0;
            }
        }
        r.datagrid("highlightRow", l);
        if (n.selectOnNavigation) {
            a.remainText = false;
            r.datagrid("selectRow", l);
        }
    }
    function a(t, i, a) {
        var n = e.data(t, "combogrid");
        var r = n.options;
        var o = n.grid;
        var s = o.datagrid("getRows");
        var l = [];
        var d = e(t).combo("getValues");
        var c = e(t).combo("options");
        var f = c.onChange;
        c.onChange = function() {};
        if (i === "") i = [];
        var u = e.map(i, function(e) {
            return String(e);
        });
        var h = e.grep(o.datagrid("getSelections"), function(t, i) {
            return e.inArray(String(t[r.idField]), u) >= 0;
        });
        o.datagrid("clearSelections");
        o.data("datagrid").selectedRows = h;
        for (var p = 0; p < i.length; p++) {
            var v = o.datagrid("getRowIndex", i[p]);
            if (v >= 0) {
                o.datagrid("selectRow", v);
                l.push(s[v][r.textField]);
            } else if (b(i[p], h)) {
                l.push(b(i[p], h));
            } else {
                l.push(i[p]);
            }
        }
        e(t).combo("setValues", d);
        c.onChange = f;
        e(t).combo("setValues", i);
        if (!a) {
            var g = l.join(r.separator);
            if (e(t).combo("getText") != g) {
                e(t).combo("setText", g);
            }
        }
        function b(t, i) {
            var a = e.hisui.getArrayItem(i, r.idField, t);
            return a ? a[r.textField] : undefined;
        }
    }
    function n(t, i) {
        var n = e.data(t, "combogrid");
        var r = n.options;
        var o = n.grid;
        n.remainText = true;
        if (r.multiple && !i) {
            a(t, [], true);
        } else {
            a(t, [ i ], true);
        }
        if (r.mode == "remote") {
            o.datagrid("clearSelections");
            o.datagrid("load", e.extend({}, r.queryParams, {
                q: i
            }));
        } else {
            if (!i) {
                return;
            }
            o.datagrid("clearSelections").datagrid("highlightRow", -1);
            var s = o.datagrid("getRows");
            var l = r.multiple ? i.split(r.separator) : [ i ];
            e.map(l, function(i) {
                i = e.trim(i);
                if (i) {
                    e.map(s, function(e, a) {
                        if (i == e[r.textField]) {
                            o.datagrid("selectRow", a);
                        } else {
                            if (r.filter.call(t, i, e)) {
                                o.datagrid("highlightRow", a);
                            }
                        }
                    });
                }
            });
        }
    }
    function r(t) {
        var i = e.data(t, "combogrid");
        var a = i.options;
        var n = i.grid;
        var r = e(t).combogrid("panel");
        if (!r.is(":visible")) return;
        var o = a.finder.getTr(n[0], null, "highlight");
        i.remainText = false;
        if (o.length) {
            var s = parseInt(o.attr("datagrid-row-index"));
            if (a.multiple) {
                if (o.hasClass("datagrid-row-selected")) {
                    n.datagrid("unselectRow", s);
                } else {
                    n.datagrid("selectRow", s);
                }
            } else {
                n.datagrid("selectRow", s);
            }
        }
        var l = [];
        e.map(n.datagrid("getSelections"), function(e) {
            l.push(e[a.idField]);
        });
        if (l.length == 0 && !a.enterNullValueClear) {} else if (l.length == 1 && a.enterSelectRow) {} else {
            e(t).combogrid("setValues", l);
        }
        if (!a.multiple) {
            e(t).combogrid("hidePanel");
        }
    }
    e.fn.combogrid = function(i, a) {
        if (typeof i == "string") {
            var r = e.fn.combogrid.methods[i];
            if (r) {
                return r(this, a);
            } else {
                return this.combo(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "combogrid");
            if (a) {
                e.extend(a.options, i);
            } else {
                a = e.data(this, "combogrid", {
                    options: e.extend({}, e.fn.combogrid.defaults, e.fn.combogrid.parseOptions(this), i)
                });
            }
            t(this);
            if (a.options.blurValidValue) {
                var r = this;
                e(r).combo("textbox").bind("blur.combo-text", function(t) {
                    var i = e(r).combogrid("grid").datagrid("getSelected");
                    if (i == undefined || i == "" || i == null) {
                        e(t.target).val("");
                        n(r, "");
                    }
                });
            }
        });
    };
    e.fn.combogrid.methods = {
        options: function(t) {
            var i = t.combo("options");
            return e.extend(e.data(t[0], "combogrid").options, {
                originalValue: i.originalValue,
                disabled: i.disabled,
                readonly: i.readonly
            });
        },
        grid: function(t) {
            return e.data(t[0], "combogrid").grid;
        },
        setValues: function(e, t) {
            return e.each(function() {
                a(this, t);
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                a(this, [ t ]);
            });
        },
        clear: function(t) {
            return t.each(function() {
                e(this).combogrid("grid").datagrid("clearSelections");
                e(this).combo("clear");
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).combogrid("options");
                if (t.multiple) {
                    e(this).combogrid("setValues", t.originalValue);
                } else {
                    e(this).combogrid("setValue", t.originalValue);
                }
            });
        }
    };
    e.fn.combogrid.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.combo.parseOptions(t), e.fn.datagrid.parseOptions(t), e.parser.parseOptions(t, [ "idField", "textField", "mode" ]));
    };
    e.fn.combogrid.defaults = e.extend({}, e.fn.combo.defaults, e.fn.datagrid.defaults, {
        enterSelectRow: false,
        loadMsg: null,
        idField: null,
        textField: null,
        mode: "local",
        keyHandler: {
            up: function(e) {
                i(this, "prev");
                e.preventDefault();
            },
            down: function(e) {
                i(this, "next");
                e.preventDefault();
            },
            left: function(e) {},
            right: function(e) {},
            enter: function(t) {
                e.data(this, "combogrid").options.enterSelectRow = true;
                r(this);
                e.data(this, "combogrid").options.enterSelectRow = false;
            },
            query: function(e, t) {
                n(this, e);
            }
        },
        filter: function(t, i) {
            var a = e(this).combogrid("options");
            return i[a.textField].toLowerCase().indexOf(t.toLowerCase()) == 0;
        },
        lazy: false
    });
})(jQuery);

(function(e) {
    function t(e, t) {
        return e + "_" + t;
    }
    function i(e) {
        return e + "_name";
    }
    var a = {
        init: function(a) {
            var n = {
                onChange: function() {}
            };
            var r = e.extend(n, a);
            this.each(function() {
                var a = e(this);
                var n = a.attr("id");
                r.formatter = function(e) {
                    var a;
                    var o = e[r.valueField];
                    var s = e[r.textField];
                    var l = t(n, o);
                    var d = i(n);
                    if (e.selected == true) {
                        a = "<input style='height:13px' type='radio' checked='checked' id='" + l + "' name='" + d + "' value='" + o + "'>" + s;
                    } else {
                        a = "<input style='height:13px' type='radio' id='" + l + "' name='" + d + "' value='" + o + "'>" + s;
                    }
                    return a;
                };
                r.oldonSelect = r.onSelect;
                r.onSelect = function(i) {
                    if (i) {
                        var a = i[r.valueField];
                        var o = t(n, a);
                        e("#" + o).prop("checked", true);
                        if (r.oldonSelect) {
                            r.oldonSelect(i);
                        }
                    }
                };
                r.oldonUnselect = r.onUnselect;
                r.onUnselect = function(i) {
                    var a = i[r.valueField];
                    var o = t(n, a);
                    e("#" + o).prop("checked", false);
                    if (r.oldonUnselect) {
                        r.oldonUnselect(i);
                    }
                };
                e(a).combobox(r);
            });
        },
        enable: function(t) {
            var i = e(this);
            if (t) {
                e(i).combobox("enable");
            } else {
                e(i).combobox("disable");
            }
        },
        disable: function(t) {
            var i = e(this);
            if (t) {
                e(i).combobox("disable");
            } else {
                e(i).combobox("enable");
            }
        },
        setValue: function(i) {
            var a = e(this);
            var n = a.attr("id");
            e(a).combobox("setValue", i);
            var r = t(n, i);
            e("#" + r).prop("checked", true);
            var o = null;
            var s = e(a).combobox("options").valueField;
            for (var l = 0; l < datas.length; l++) {
                if (datas[l][s] == i[0]) {
                    o = datas[l];
                    break;
                }
            }
            if (o != null) e(a).combobox("options").onSelect.call(e("#" + n)[0], o);
        },
        setValues: function(i) {
            var a = e(this);
            var n = a.attr("id");
            if (i.length > 0) {
                var r = i[0];
                e(a).combobox("setValue", r);
                var o = t(n, r);
                e("#" + o).prop("checked", true);
                var s = e(a).combobox("getData");
                var l = null;
                var d = e(a).combobox("options").valueField;
                for (var c = 0; c < s.length; c++) {
                    if (s[c][d] == i[0]) {
                        l = s[c];
                        break;
                    }
                }
                if (l != null) e(a).combobox("options").onSelect.call(e("#" + n)[0], l);
            }
        },
        loadData: function(t) {
            var i = e(this);
            e(i).combobox("loadData", t);
        },
        options: function() {
            var t = e(this);
            return e(t).combobox("options");
        },
        getValue: function() {
            var t = e(this);
            var i = e(t).combobox("getValue");
            return i == undefined ? "" : i;
        },
        getValues: function() {
            var t = e(this);
            var i = e(t).combobox("getValues");
            return i == undefined ? [] : i;
        },
        getData: function() {
            var t = e(this);
            var i = e(t).combobox("getData");
            return i == undefined ? [] : i;
        },
        clear: function() {
            var i = e(this);
            var a = e(i).combobox("options");
            var n = e(i).combobox("getData");
            if (!!n) {
                var r = i.attr("id");
                for (var o = 0; o < n.length; o++) {
                    var s = n[o];
                    var l = s[a.valueField];
                    var d = t(r, l);
                    e("#" + d).prop("checked", false);
                }
            }
            e(this).combobox("clear");
        }
    };
    e.fn.DropDropRadio = function(t) {
        if (a[t]) {
            return a[t].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof t === "object" || !t) {
            return a.init.apply(this, arguments);
        } else {
            e.error("Method " + t + "does not exist on mutiselect.js");
        }
    };
})(jQuery);

(function(e) {
    function t(t) {
        var i = e.data(t, "datebox");
        var a = i.options;
        e(t).addClass("datebox-f").combo(e.extend({}, a, {
            onShowPanel: function() {
                if (!i.calendar) {
                    n();
                }
                r();
                o(t, e(t).datebox("getText"), true);
                a.onShowPanel.call(t);
            }
        }));
        e(t).combo("textbox").parent().addClass("datebox");
        if (a.allParse) {
            if (!i.calendar) {
                n();
            }
        }
        o(t, a.value);
        e(t).combo("textbox").unbind(".datebox").bind("blur.datebox", function(i) {
            if (e(t).combo("textbox").parent().find(".combo-arrow-hover").length > 0) {
                return;
            }
            if (e.data(t, "datebox").calendar) {
                var n = e.data(t, "datebox").calendar.closest(".panel-body");
                if (n.find(".calendar-hover").length > 0) {
                    return;
                }
                if (n.find(".calendar-nav-hover").length > 0) {
                    return;
                }
                if (n.find(".calendar-menu-hover").length > 0) {
                    return;
                }
            }
            var r = e(t).combo("getText");
            setTimeout(function() {
                a.onBlur(t);
            }, 200);
        });
        function n() {
            var n = e(t).combo("panel").css("overflow", "hidden");
            n.panel("options").onBeforeDestroy = function() {
                var t = e(this).find(".calendar-shared");
                if (t.length) {
                    t.insertBefore(t[0].pholder);
                }
            };
            var r = e('<div class="datebox-calendar-inner"></div>').appendTo(n);
            if (a.sharedCalendar) {
                var s = e(a.sharedCalendar);
                if (!s[0].pholder) {
                    s[0].pholder = e('<div class="calendar-pholder" style="display:none"></div>').insertAfter(s);
                }
                s.addClass("calendar-shared").appendTo(r);
                if (!s.hasClass("calendar")) {
                    s.calendar();
                }
                i.calendar = s;
            } else {
                i.calendar = e("<div></div>").appendTo(r).calendar();
            }
            e.extend(i.calendar.calendar("options"), {
                fit: true,
                border: false,
                onSelect: function(i) {
                    var a = e(this.target).datebox("options");
                    o(this.target, a.formatter.call(this.target, i));
                    e(this.target).combo("hidePanel");
                    a.onSelect.call(t, i);
                },
                validator: function(i, a) {
                    var n = new Date(i.getFullYear(), i.getMonth(), i.getDate());
                    var r = e.data(t, "datebox");
                    var o = r.options;
                    var s = true;
                    if (null != o.minDate) {
                        if (a) a[0] = o.minDate;
                        var l = o.parser.call(t, o.minDate);
                        if (l > n) s = false;
                    }
                    if (null != o.maxDate) {
                        if (a) a[1] = o.maxDate;
                        var d = o.parser.call(t, o.maxDate);
                        if (d < n) s = false;
                    }
                    return s;
                }
            });
            var l = e('<div class="datebox-button"><table cellspacing="0" cellpadding="0" style="width:100%"><tr></tr></table></div>').appendTo(n);
            var d = l.find("tr");
            for (var c = 0; c < a.buttons.length; c++) {
                var f = e("<td></td>").appendTo(d);
                var u = a.buttons[c];
                var h = e('<a href="javascript:void(0)" onclick="javascript:return false;"></a>').html(e.isFunction(u.text) ? u.text(t) : u.text).appendTo(f);
                h.bind("click", {
                    target: t,
                    handler: u.handler
                }, function(e) {
                    e.data.handler.call(this, e.data.target);
                });
            }
            d.find("td").css("width", 100 / a.buttons.length + "%");
        }
        function r() {
            var n = e(t).combo("panel");
            var r = n.children("div.datebox-calendar-inner");
            n.children()._outerWidth(n.width());
            i.calendar.appendTo(r);
            i.calendar[0].target = t;
            if (a.panelHeight != "auto") {
                var o = n.height();
                n.children().not(r).each(function() {
                    o -= e(this).outerHeight();
                });
                r._outerHeight(o);
            }
            i.calendar.calendar("resize");
        }
    }
    function i(e, t) {
        o(e, t, true);
    }
    function a(e) {
        if (!e) return false;
        if (e.charAt(0).toUpperCase() == "T") {
            return true;
        }
        if ("undefined" != typeof dtformat && dtformat == "DMY") {
            var t = e.split("/");
            s = parseInt(t[2], 10);
            l = parseInt(t[1], 10);
            d = parseInt(t[0], 10);
            if (!isNaN(s) && !isNaN(l) && !isNaN(d)) {
                if (l > 12 || d > 31) {
                    return false;
                }
                return true;
            } else {
                return false;
            }
        }
        if (e.charAt(0).toUpperCase() == "T") {
            var t = e.split("-");
            var i = parseInt(t[0], 10);
            var a = parseInt(t[1], 10);
            var n = parseInt(t[2], 10);
            if (!isNaN(i) && !isNaN(a) && !isNaN(n)) {
                e = i + "-" + (a > 9 ? a : "0" + a) + "-" + (n > 9 ? n : "0" + n);
            } else {
                return false;
            }
        }
        var r = /((?!0000)[0-9]{4}((0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])(29|30)|(0[13578]|1[02])31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)0229)/;
        var o = /((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)/;
        var s = NaN, l = NaN, d = NaN;
        if (r.test(e)) {
            s = parseInt(e.slice(0, 4), 10);
            l = parseInt(e.slice(4, 6));
            d = parseInt(e.slice(6, 8));
        } else if (o.test(e)) {
            var t = e.split("-");
            s = parseInt(t[0], 10);
            l = parseInt(t[1], 10);
            d = parseInt(t[2], 10);
        }
        if (!isNaN(s) && !isNaN(l) && !isNaN(d)) {
            return true;
        } else {
            return false;
        }
    }
    function n(t, i) {
        var a = e.data(t, "datebox");
        var n = a.options;
        var r = e(t).datebox("getText");
        var s;
        if (a.calendar && r != "") {
            s = a.calendar.calendar("options").current;
        }
        if (i === true) {
            s = a.calendar.calendar("options").current;
        }
        if (s) {
            o(t, n.formatter.call(t, s));
            e(t).combo("hidePanel");
        }
    }
    function r(t) {
        e(t).combo("textbox").validatebox("enableValidation");
        if (e(t).combo("textbox").validatebox("isValid")) {
            n(t);
        }
    }
    function o(t, i, a) {
        var n = e.data(t, "datebox");
        var r = n.options;
        e(t).combo("setValue", i);
        var o = n.calendar;
        if (o) {
            o.calendar("moveTo", r.parser.call(t, i));
        }
        if (!a) {
            if (i) {
                if (o) {
                    i = r.formatter.call(t, o.calendar("options").current);
                } else {
                    i = r.formatter.call(t, r.parser.call(t, i));
                }
                e(t).combo("setValue", i).combo("setText", i);
            } else {
                e(t).combo("setText", i);
            }
        }
    }
    e.fn.datebox = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.datebox.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.combo(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "datebox");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "datebox", {
                    options: e.extend({}, e.fn.datebox.defaults, e.fn.datebox.parseOptions(this), i)
                });
            }
            t(this);
        });
    };
    e.fn.datebox.methods = {
        options: function(t) {
            var i = t.combo("options");
            return e.extend(e.data(t[0], "datebox").options, {
                originalValue: i.originalValue,
                disabled: i.disabled,
                readonly: i.readonly
            });
        },
        calendar: function(t) {
            return e.data(t[0], "datebox").calendar;
        },
        setValue: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).datebox("options");
                e(this).datebox("setValue", t.originalValue);
            });
        }
    };
    e.fn.datebox.parseOptions = function(t) {
        return e.extend({}, e.fn.combo.parseOptions(t), e.parser.parseOptions(t, [ "sharedCalendar" ]));
    };
    e.fn.datebox.defaults = e.extend({}, e.fn.combo.defaults, {
        panelWidth: 180,
        panelHeight: "auto",
        sharedCalendar: null,
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                r(this);
            },
            query: function(t, a) {
                e(this).combo("textbox").validatebox("disableValidation");
                i(this, t);
            }
        },
        currentText: "Today",
        closeText: "Close",
        okText: "Ok",
        buttons: [ {
            text: function(t) {
                return e(t).datebox("options").currentText;
            },
            handler: function(t) {
                var i = e(t).datebox("options");
                var a = new Date();
                var r = new Date(a.getFullYear(), a.getMonth(), a.getDate());
                e(t).datebox("calendar").calendar({
                    year: r.getFullYear(),
                    month: r.getMonth() + 1,
                    current: r
                });
                i.onSelect.call(t, r);
                n(t, true);
            }
        }, {
            text: function(t) {
                return e(t).datebox("options").closeText;
            },
            handler: function(t) {
                e(this).closest("div.combo-panel").panel("close");
            }
        } ],
        formatter: function(e) {
            var t = e.getFullYear();
            var i = e.getMonth() + 1;
            var a = e.getDate();
            return i + "/" + a + "/" + t;
        },
        parser: function(e) {
            var t = Date.parse(e);
            if (!isNaN(t)) {
                return new Date(t);
            } else {
                return new Date();
            }
        },
        onBlur: function(e) {
            r(e);
        },
        onSelect: function(e) {},
        onDblClick: function(e) {},
        validType: {
            datebox: typeof dtformat == "undefined" ? "" : dtformat,
            minMaxDate: [ null, null ]
        },
        minDate: typeof dtformat == "undefined" ? null : dtformat == "YMD" ? "1841-01-01" : null,
        maxDate: null,
        allParse: true
    });
    e.extend(e.fn.datebox.defaults.rules, {
        datebox: {
            validator: function(t, i) {
                var n = e(this);
                var r = "", o = "";
                if (n.hasClass("dateboxq")) {
                    o = this;
                    r = e.data(o, "dateboxq");
                } else {
                    o = n.closest(".datebox").prev()[0];
                    if (o) {
                        r = e.data(o, "datebox");
                    }
                }
                if (r) {
                    var s = r.options;
                    if (s.validParams == "YM") return true;
                }
                if (i == "YMD") {
                    return a(t);
                }
                return true;
            },
            message: "Please enter a valid date."
        },
        minMaxDate: {
            validator: function(t, i) {
                var a = e(this);
                var n = "", r = "";
                if (a.hasClass("dateboxq")) {
                    r = this;
                    n = e.data(r, "dateboxq");
                } else {
                    r = a.closest(".datebox").prev()[0];
                    if (r) {
                        n = e.data(r, "datebox");
                    }
                }
                if (n) {
                    var o = n.options;
                    var s = o.parser.call(r, t);
                    o.validType.minMaxDate = [ null, null ];
                    if (o.minDate != null || o.maxDate != null) {
                        if (o.minDate == null && o.rules.minMaxDate.messageMax) {
                            o.rules.minMaxDate.message = o.rules.minMaxDate.messageMax;
                        } else if (o.maxDate == null && o.rules.minMaxDate.messageMin) {
                            o.rules.minMaxDate.message = o.rules.minMaxDate.messageMin;
                        } else {
                            o.rules.minMaxDate.message = o.rules.minMaxDate.messageDef;
                        }
                        if (o.minDate != null) o.validType.minMaxDate[0] = o.minDate;
                        if (o.maxDate != null) o.validType.minMaxDate[1] = o.maxDate;
                    } else {
                        o.rules.minMaxDate.message = o.rules.datebox.message;
                    }
                    if (n.calendar) return n.calendar.calendar("options").validator(s, i);
                }
                return true;
            },
            message: "Please enter a valid date.",
            messageDef: "Please enter a valid date."
        }
    });
})(jQuery);

(function(e) {
    function t(t) {
        var a = e.data(t, "datetimebox");
        var n = a.options;
        e(t).datebox(e.extend({}, n, {
            onShowPanel: function() {
                var i = e(t).datetimebox("getValue");
                l(t, i, true);
                n.onShowPanel.call(t);
            },
            formatter: e.fn.datebox.defaults.formatter,
            parser: e.fn.datebox.defaults.parser
        }));
        e(t).removeClass("datebox-f").addClass("datetimebox-f");
        e(t).datebox("calendar").calendar({
            onSelect: function(e) {
                n.onSelect.call(t, e);
            },
            onDblClick: function(i) {
                var a = e(t).datetimebox("options").buttons;
                if (a.length > 1 && a[1].handler) a[1].handler.call(this, t);
                n.onDblClick.call(t, i);
            }
        });
        var r = e(t).datebox("panel");
        if (!a.spinner) {
            var o = e('<div style="padding:2px"><input style="width:100px;height:24px"></div>').insertAfter(r.children("div.datebox-calendar-inner"));
            a.spinner = o.children("input");
        }
        a.spinner.timespinner({
            showSeconds: n.showSeconds,
            separator: n.timeSeparator
        }).unbind(".datetimebox").bind("mousedown.datetimebox", function(e) {
            e.stopPropagation();
        });
        l(t, n.value);
        e(t).combo("textbox").unbind(".datetimebox").bind("dblclick.datetimebox", function(t) {
            var a = 0, n = 0, r = this, o = "";
            var s = e(r).val();
            if (r.selectionStart != null) {
                a = r.selectionStart;
                n = r.selectionEnd;
                o = s.substring(a, n);
            } else {
                if (r.createTextRange) {
                    var l = r.createTextRange();
                    var d = document.selection.createRange();
                    o = d.text;
                    d.setEndPoint("StartToStart", l);
                    n = d.text.length;
                    if (o.indexOf(" ") > -1) {
                        a = n - o.length;
                    }
                }
            }
            if (a > 0) {
                if (o.indexOf(" ") > -1) {
                    i(e(r), {
                        start: a,
                        end: n - 1
                    });
                }
            }
        });
    }
    function i(t, i) {
        return t.each(function() {
            var t = this;
            var a = i.start;
            var n = i.end;
            if (t.createTextRange) {
                var r = t.createTextRange();
                r.collapse();
                r.moveEnd("character", n);
                r.moveStart("character", a);
                r.select();
            } else {
                t.setSelectionRange(a, n);
            }
            e(this).focus();
        });
    }
    function a(t) {
        var i = e(t).datetimebox("calendar");
        var a = e(t).datetimebox("spinner");
        var n = i.calendar("options").current;
        return new Date(n.getFullYear(), n.getMonth(), n.getDate(), a.timespinner("getHours"), a.timespinner("getMinutes"), a.timespinner("getSeconds"));
    }
    function n(e, t) {
        l(e, t, true);
    }
    function r(t) {
        var i = e.data(t, "datetimebox").options;
        var n = a(t);
        l(t, i.formatter.call(t, n));
    }
    function o(t) {
        if (e(t).combo("textbox").val() == "") {
            l(t, "");
        } else {
            r(t);
        }
    }
    function s(t) {
        r(t);
        e(t).combo("hidePanel");
    }
    function l(t, i, a) {
        var n = e.data(t, "datetimebox").options;
        e(t).combo("setValue", i);
        if (!a) {
            if (i) {
                var r = n.parser.call(t, i);
                e(t).combo("setValue", n.formatter.call(t, r));
                e(t).combo("setText", n.formatter.call(t, r));
            } else {
                e(t).combo("setText", i);
            }
        }
        var r = n.parser.call(t, i);
        e(t).datetimebox("calendar").calendar("moveTo", r);
        e(t).datetimebox("spinner").timespinner("setValue", o(r));
        function o(i) {
            function a(e) {
                return (e < 10 ? "0" : "") + e;
            }
            var r = [ a(i.getHours()), a(i.getMinutes()) ];
            if (n.showSeconds) {
                r.push(a(i.getSeconds()));
            }
            return r.join(e(t).datetimebox("spinner").timespinner("options").separator);
        }
    }
    e.fn.datetimebox = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.datetimebox.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.datebox(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "datetimebox");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "datetimebox", {
                    options: e.extend({}, e.fn.datetimebox.defaults, e.fn.datetimebox.parseOptions(this), i)
                });
            }
            t(this);
        });
    };
    e.fn.datetimebox.methods = {
        options: function(t) {
            var i = t.datebox("options");
            return e.extend(e.data(t[0], "datetimebox").options, {
                originalValue: i.originalValue,
                disabled: i.disabled,
                readonly: i.readonly
            });
        },
        spinner: function(t) {
            return e.data(t[0], "datetimebox").spinner;
        },
        setValue: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).datetimebox("options");
                e(this).datetimebox("setValue", t.originalValue);
            });
        }
    };
    e.fn.datetimebox.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.datebox.parseOptions(t), e.parser.parseOptions(t, [ "timeSeparator", {
            showSeconds: "boolean"
        } ]));
    };
    e.fn.datetimebox.defaults = e.extend({}, e.fn.datebox.defaults, {
        showSeconds: true,
        timeSeparator: ":",
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                s(this);
            },
            query: function(e, t) {
                n(this, e);
            }
        },
        buttons: [ {
            text: function(t) {
                return e(t).datetimebox("options").currentText;
            },
            handler: function(t) {
                e(t).datetimebox("calendar").calendar({
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    current: new Date()
                });
                s(t);
            }
        }, {
            text: function(t) {
                return e(t).datetimebox("options").okText;
            },
            handler: function(e) {
                s(e);
            }
        }, {
            text: function(t) {
                return e(t).datetimebox("options").closeText;
            },
            handler: function(t) {
                e(this).closest("div.combo-panel").panel("close");
            }
        } ],
        formatter: function(t) {
            var i = t.getHours();
            var a = t.getMinutes();
            var n = t.getSeconds();
            function r(e) {
                return (e < 10 ? "0" : "") + e;
            }
            var o = e(this).datetimebox("spinner").timespinner("options").separator;
            var s = e.fn.datebox.defaults.formatter(t) + " " + r(i) + o + r(a);
            if (e(this).datetimebox("options").showSeconds) {
                s += o + r(n);
            }
            return s;
        },
        parser: function(t) {
            if (e.trim(t) == "") {
                return new Date();
            }
            var i = t.split(" ");
            var a = e.fn.datebox.defaults.parser(i[0]);
            if (i.length < 2) {
                return a;
            }
            var n = e(this).datetimebox("spinner").timespinner("options").separator;
            var r = i[1].split(n);
            var o = parseInt(r[0], 10) || 0;
            var s = parseInt(r[1], 10) || 0;
            var l = parseInt(r[2], 10) || 0;
            return new Date(a.getFullYear(), a.getMonth(), a.getDate(), o, s, l);
        },
        onHidePanel: function() {},
        rules: {},
        onBlur: function(e) {
            o(e);
        }
    });
})(jQuery);

(function($) {
    function init(e) {
        var t = $('<div class="slider">' + '<div class="slider-inner">' + '<a href="javascript:void(0)" class="slider-handle"></a>' + '<span class="slider-tip"></span>' + "</div>" + '<div class="slider-rule"></div>' + '<div class="slider-rulelabel"></div>' + '<div style="clear:both"></div>' + '<input type="hidden" class="slider-value">' + "</div>").insertAfter(e);
        var i = $(e);
        i.addClass("slider-f").hide();
        var a = i.attr("name");
        if (a) {
            t.find("input.slider-value").attr("name", a);
            i.removeAttr("name").attr("sliderName", a);
        }
        return t;
    }
    function setSize(e, t) {
        var i = $.data(e, "slider");
        var a = i.options;
        var n = i.slider;
        if (t) {
            if (t.width) {
                a.width = t.width;
            }
            if (t.height) {
                a.height = t.height;
            }
        }
        if (a.mode == "h") {
            n.css("height", "");
            n.children("div").css("height", "");
            if (!isNaN(a.width)) {
                n.width(a.width);
            }
        } else {
            n.css("width", "");
            n.children("div").css("width", "");
            if (!isNaN(a.height)) {
                n.height(a.height);
                n.find("div.slider-rule").height(a.height);
                n.find("div.slider-rulelabel").height(a.height);
                n.find("div.slider-inner")._outerHeight(a.height);
            }
        }
        initValue(e);
    }
    function showRule(e) {
        var t = $.data(e, "slider");
        var i = t.options;
        var a = t.slider;
        var n = i.mode == "h" ? i.rule : i.rule.slice(0).reverse();
        if (i.reversed) {
            n = n.slice(0).reverse();
        }
        r(n);
        function r(e) {
            var t = a.find("div.slider-rule");
            var n = a.find("div.slider-rulelabel");
            t.empty();
            n.empty();
            for (var r = 0; r < e.length; r++) {
                var o = r * 100 / (e.length - 1) + "%";
                var s = $("<span></span>").appendTo(t);
                s.css(i.mode == "h" ? "left" : "top", o);
                if (e[r] != "|") {
                    s = $("<span></span>").appendTo(n);
                    s.html(e[r]);
                    if (i.mode == "h") {
                        s.css({
                            left: o,
                            marginLeft: -Math.round(s.outerWidth() / 2)
                        });
                    } else {
                        s.css({
                            top: o,
                            marginTop: -Math.round(s.outerHeight() / 2)
                        });
                    }
                }
            }
        }
    }
    function buildSlider(e) {
        var t = $.data(e, "slider");
        var i = t.options;
        var a = t.slider;
        a.removeClass("slider-h slider-v slider-disabled");
        a.addClass(i.mode == "h" ? "slider-h" : "slider-v");
        a.addClass(i.disabled ? "slider-disabled" : "");
        a.find("a.slider-handle").draggable({
            axis: i.mode,
            cursor: "pointer",
            disabled: i.disabled,
            onDrag: function(t) {
                var r = t.data.left;
                var o = a.width();
                if (i.mode != "h") {
                    r = t.data.top;
                    o = a.height();
                }
                if (r < 0 || r > o) {
                    return false;
                } else {
                    var s = pos2value(e, r);
                    n(s);
                    return false;
                }
            },
            onBeforeDrag: function() {
                t.isDragging = true;
            },
            onStartDrag: function() {
                i.onSlideStart.call(e, i.value);
            },
            onStopDrag: function(a) {
                var r = pos2value(e, i.mode == "h" ? a.data.left : a.data.top);
                n(r);
                i.onSlideEnd.call(e, i.value);
                i.onComplete.call(e, i.value);
                t.isDragging = false;
            }
        });
        a.find("div.slider-inner").unbind(".slider").bind("mousedown.slider", function(a) {
            if (t.isDragging) {
                return;
            }
            var r = $(this).offset();
            var o = pos2value(e, i.mode == "h" ? a.pageX - r.left : a.pageY - r.top);
            n(o);
            i.onComplete.call(e, i.value);
        });
        function n(t) {
            var a = Math.abs(t % i.step);
            if (a < i.step / 2) {
                t -= a;
            } else {
                t = t - a + i.step;
            }
            setValue(e, t);
        }
    }
    function setValue(e, t) {
        var i = $.data(e, "slider");
        var a = i.options;
        var n = i.slider;
        var r = a.value;
        if (t < a.min) {
            t = a.min;
        }
        if (t > a.max) {
            t = a.max;
        }
        a.value = t;
        $(e).val(t);
        n.find("input.slider-value").val(t);
        var o = value2pos(e, t);
        var s = n.find(".slider-tip");
        if (a.showTip) {
            s.show();
            s.html(a.tipFormatter.call(e, a.value));
        } else {
            s.hide();
        }
        if (a.mode == "h") {
            var l = "left:" + o + "px;";
            n.find(".slider-handle").attr("style", l);
            s.attr("style", l + "margin-left:" + -Math.round(s.outerWidth() / 2) + "px");
        } else {
            var l = "top:" + o + "px;";
            n.find(".slider-handle").attr("style", l);
            s.attr("style", l + "margin-left:" + -Math.round(s.outerWidth()) + "px");
        }
        if (r != t) {
            a.onChange.call(e, t, r);
        }
    }
    function initValue(e) {
        var t = $.data(e, "slider").options;
        var i = t.onChange;
        t.onChange = function() {};
        setValue(e, t.value);
        t.onChange = i;
    }
    function value2pos(e, t) {
        var i = $.data(e, "slider");
        var a = i.options;
        var n = i.slider;
        var r = a.mode == "h" ? n.width() : n.height();
        var o = a.converter.toPosition.call(e, t, r);
        if (a.mode == "v") {
            o = n.height() - o;
        }
        if (a.reversed) {
            o = r - o;
        }
        return o.toFixed(0);
    }
    function pos2value(e, t) {
        var i = $.data(e, "slider");
        var a = i.options;
        var n = i.slider;
        var r = a.mode == "h" ? n.width() : n.height();
        var o = a.converter.toValue.call(e, a.mode == "h" ? a.reversed ? r - t : t : r - t, r);
        return o.toFixed(0);
    }
    $.fn.slider = function(e, t) {
        if (typeof e == "string") {
            return $.fn.slider.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "slider");
            if (t) {
                $.extend(t.options, e);
            } else {
                t = $.data(this, "slider", {
                    options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), e),
                    slider: init(this)
                });
                $(this).removeAttr("disabled");
            }
            var i = t.options;
            i.min = parseFloat(i.min);
            i.max = parseFloat(i.max);
            i.value = parseFloat(i.value);
            i.step = parseFloat(i.step);
            i.originalValue = i.value;
            buildSlider(this);
            showRule(this);
            setSize(this);
        });
    };
    $.fn.slider.methods = {
        options: function(e) {
            return $.data(e[0], "slider").options;
        },
        destroy: function(e) {
            return e.each(function() {
                $.data(this, "slider").slider.remove();
                $(this).remove();
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                setSize(this, t);
            });
        },
        getValue: function(e) {
            return e.slider("options").value;
        },
        setValue: function(e, t) {
            return e.each(function() {
                setValue(this, t);
            });
        },
        clear: function(e) {
            return e.each(function() {
                var e = $(this).slider("options");
                setValue(this, e.min);
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = $(this).slider("options");
                setValue(this, e.originalValue);
            });
        },
        enable: function(e) {
            return e.each(function() {
                $.data(this, "slider").options.disabled = false;
                buildSlider(this);
            });
        },
        disable: function(e) {
            return e.each(function() {
                $.data(this, "slider").options.disabled = true;
                buildSlider(this);
            });
        }
    };
    $.fn.slider.parseOptions = function(target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, [ "width", "height", "mode", {
            reversed: "boolean",
            showTip: "boolean",
            min: "number",
            max: "number",
            step: "number"
        } ]), {
            value: t.val() || undefined,
            disabled: t.attr("disabled") ? true : undefined,
            rule: t.attr("rule") ? eval(t.attr("rule")) : undefined
        });
    };
    $.fn.slider.defaults = {
        width: "auto",
        height: "auto",
        mode: "h",
        reversed: false,
        showTip: false,
        disabled: false,
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        rule: [],
        tipFormatter: function(e) {
            return e;
        },
        converter: {
            toPosition: function(e, t) {
                var i = $(this).slider("options");
                return (e - i.min) / (i.max - i.min) * t;
            },
            toValue: function(e, t) {
                var i = $(this).slider("options");
                return i.min + (i.max - i.min) * (e / t);
            }
        },
        onChange: function(e, t) {},
        onSlideStart: function(e) {},
        onSlideEnd: function(e) {},
        onComplete: function(e) {}
    };
})(jQuery);

!function(e) {
    "use strict";
    e.fn["bootstrapSwitch"] = function(t) {
        var i = 'input[type!="hidden"]';
        var a = {
            init: function() {
                return this.each(function() {
                    var t = e(this), a, n, r, o, s = t.closest("form"), l = "", d = t.attr("class"), c, f, u = "ON", h = "OFF", p = false, v = false;
                    e.each([ "switch-mini", "switch-small", "switch-large" ], function(e, t) {
                        if (d && d.indexOf(t) >= 0) l = t;
                    });
                    t.addClass("has-switch");
                    if (t.data("on") !== undefined) c = "switch-" + t.data("on");
                    if (t.data("on-label") !== undefined) u = t.data("on-label");
                    if (t.data("off-label") !== undefined) h = t.data("off-label");
                    if (t.data("label-icon") !== undefined) p = t.data("label-icon");
                    if (t.data("text-label") !== undefined) v = t.data("text-label");
                    n = e("<span>").addClass("switch-left").addClass(l).addClass(c).html(u);
                    c = "";
                    if (t.data("off") !== undefined) c = "switch-" + t.data("off");
                    r = e("<span>").addClass("switch-right").addClass(l).addClass(c).html(h);
                    o = e("<label>").html("&nbsp;").addClass(l).attr("for", t.find(i).attr("id"));
                    if (p) {
                        o.html('<i class="icon ' + p + '"></i>');
                    }
                    if (v) {
                        o.html("" + v + "");
                    }
                    a = t.find(i).wrap(e("<div>")).parent().data("animated", false);
                    if (t.data("animated") !== false) a.addClass("switch-animate").data("animated", true);
                    a.append(n).append(o).append(r);
                    t.find(">div").addClass(t.find(i).is(":checked") ? "switch-on" : "switch-off");
                    if (t.find(i).is(":disabled")) e(this).addClass("deactivate");
                    var g = function(e) {
                        if (t.parent("label").is(".label-change-switch")) {} else {
                            e.siblings("label").trigger("mousedown").trigger("mouseup").trigger("click");
                        }
                    };
                    t.on("keydown", function(t) {
                        if (t.keyCode === 32) {
                            t.stopImmediatePropagation();
                            t.preventDefault();
                            g(e(t.target).find("span:first"));
                        }
                    });
                    n.on("click", function(t) {
                        g(e(this));
                    });
                    r.on("click", function(t) {
                        g(e(this));
                    });
                    t.find(i).on("change", function(t, i) {
                        var a = e(this), n = a.parent(), r = a.is(":checked"), o = n.is(".switch-off");
                        t.preventDefault();
                        n.css("left", "");
                        if (o === r) {
                            if (r) n.removeClass("switch-off").addClass("switch-on"); else n.removeClass("switch-on").addClass("switch-off");
                            if (n.data("animated") !== false) n.addClass("switch-animate");
                            if (typeof i === "boolean" && i) return;
                            n.parent().trigger("switch-change", {
                                el: a,
                                value: r
                            });
                        }
                    });
                    t.find("label").on("mousedown touchstart", function(t) {
                        var i = e(this);
                        f = false;
                        t.preventDefault();
                        t.stopImmediatePropagation();
                        i.closest("div").removeClass("switch-animate");
                        if (i.closest(".has-switch").is(".deactivate")) {
                            i.unbind("click");
                        } else if (i.closest(".switch-on").parent().is(".radio-no-uncheck")) {
                            i.unbind("click");
                        } else {
                            i.on("mousemove touchmove", function(t) {
                                var i = e(this).closest(".make-switch");
                                if (i.length == 0) return;
                                var a = (t.pageX || t.originalEvent.targetTouches[0].pageX) - i.offset().left, n = a / i.width() * 100, r = 25, o = 75;
                                f = true;
                                if (n < r) n = r; else if (n > o) n = o;
                                i.find(">div").css("left", n - o + "%");
                            });
                            i.on("click touchend", function(t) {
                                var i = e(this), a = e(t.target), n = a.siblings("input");
                                t.stopImmediatePropagation();
                                t.preventDefault();
                                i.unbind("mouseleave");
                                if (f) n.prop("checked", !(parseInt(i.parent().css("left")) < -25)); else n.prop("checked", !n.is(":checked"));
                                f = false;
                                n.trigger("change");
                            });
                            i.on("mouseleave", function(t) {
                                var i = e(this), a = i.siblings("input");
                                t.preventDefault();
                                t.stopImmediatePropagation();
                                i.unbind("mouseleave");
                                i.trigger("mouseup");
                                a.prop("checked", !(parseInt(i.parent().css("left")) < -25)).trigger("change");
                            });
                            i.on("mouseup", function(t) {
                                t.stopImmediatePropagation();
                                t.preventDefault();
                                e(this).unbind("mousemove");
                            });
                        }
                    });
                    if (s.data("bootstrapSwitch") !== "injected") {
                        s.bind("reset", function() {
                            setTimeout(function() {
                                s.find(".make-switch").each(function() {
                                    var t = e(this).find(i);
                                    t.prop("checked", t.is(":checked")).trigger("change");
                                });
                            }, 1);
                        });
                        s.data("bootstrapSwitch", "injected");
                    }
                });
            },
            toggleActivation: function() {
                var t = e(this);
                t.toggleClass("deactivate");
                t.find(i).prop("disabled", t.is(".deactivate"));
            },
            isActive: function() {
                return !e(this).hasClass("deactivate");
            },
            setActive: function(t) {
                var a = e(this);
                if (t) {
                    a.removeClass("deactivate");
                    a.find(i).removeAttr("disabled");
                } else {
                    a.addClass("deactivate");
                    a.find(i).attr("disabled", "disabled");
                }
            },
            toggleState: function(t) {
                var i = e(this).find(":checkbox");
                i.prop("checked", !i.is(":checked")).trigger("change", t);
            },
            toggleRadioState: function(t) {
                var i = e(this).find(":radio");
                i.not(":checked").prop("checked", !i.is(":checked")).trigger("change", t);
            },
            toggleRadioStateAllowUncheck: function(t, i) {
                var a = e(this).find(":radio");
                if (t) {
                    a.not(":checked").trigger("change", i);
                } else {
                    a.not(":checked").prop("checked", !a.is(":checked")).trigger("change", i);
                }
            },
            setState: function(t, a) {
                e(this).find(i).prop("checked", t).trigger("change", a);
            },
            setOnLabel: function(t) {
                var i = e(this).find(".switch-left");
                i.html(t);
            },
            setOffLabel: function(t) {
                var i = e(this).find(".switch-right");
                i.html(t);
            },
            setOnClass: function(t) {
                var i = e(this).find(".switch-left");
                var a = "";
                if (t !== undefined) {
                    if (e(this).attr("data-on") !== undefined) {
                        a = "switch-" + e(this).attr("data-on");
                    }
                    i.removeClass(a);
                    a = "switch-" + t;
                    i.addClass(a);
                }
            },
            setOffClass: function(t) {
                var i = e(this).find(".switch-right");
                var a = "";
                if (t !== undefined) {
                    if (e(this).attr("data-off") !== undefined) {
                        a = "switch-" + e(this).attr("data-off");
                    }
                    i.removeClass(a);
                    a = "switch-" + t;
                    i.addClass(a);
                }
            },
            setAnimated: function(t) {
                var a = e(this).find(i).parent();
                if (t === undefined) t = false;
                a.data("animated", t);
                a.attr("data-animated", t);
                if (a.data("animated") !== false) {
                    a.addClass("switch-animate");
                } else {
                    a.removeClass("switch-animate");
                }
            },
            setSizeClass: function(t) {
                var i = e(this);
                var a = i.find(".switch-left");
                var n = i.find(".switch-right");
                var r = i.find("label");
                e.each([ "switch-mini", "switch-small", "switch-large" ], function(e, i) {
                    if (i !== t) {
                        a.removeClass(i);
                        n.removeClass(i);
                        r.removeClass(i);
                    } else {
                        a.addClass(i);
                        n.addClass(i);
                        r.addClass(i);
                    }
                });
            },
            status: function() {
                return e(this).find(i).is(":checked");
            },
            destroy: function() {
                var t = e(this), i = t.find("div"), a = t.closest("form"), n;
                i.find(":not(input)").remove();
                n = i.children();
                n.unwrap().unwrap();
                n.unbind("change");
                if (a) {
                    a.unbind("reset");
                    a.removeData("bootstrapSwitch");
                }
                return n;
            }
        };
        if (a[t]) return a[t].apply(this, Array.prototype.slice.call(arguments, 1)); else if (typeof t === "object" || !t) return a.init.apply(this, arguments); else e.error("Method " + t + " does not exist!");
    };
}(jQuery);

!function(e, t, i) {
    "use strict";
    !function(t) {
        "function" == typeof define && define.amd ? define([ "jquery" ], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(e.jQuery);
    }(function(a) {
        function n(e) {
            if (a && a.hisui && a.hisui.getTrans) return a.hisui.getTrans(e);
            return e;
        }
        function r() {
            if (a && a.fn && a.fn.window && a.fn.window.defaults && a.fn.window.defaults.zIndex) {
                a.fn.window.defaults.zIndex++;
                return a.fn.window.defaults.zIndex;
            }
            return 8999;
        }
        function o(e, t) {
            return this.$element = a(e), t && ("string" === a.type(t.delay) || "number" === a.type(t.delay)) && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), this.options = a.extend({}, c, t), this._defaults = c, this._name = s, this._targetclick = !1, 
            this.init(), u.push(this.$element), this;
        }
        var s = "webuiPopover", l = "webui-popover", d = "webui.popover", c = {
            placement: "auto",
            container: null,
            width: "auto",
            height: "auto",
            trigger: "click",
            style: "",
            selector: !1,
            delay: {
                show: null,
                hide: 300
            },
            async: {
                type: "GET",
                before: null,
                success: null,
                error: null
            },
            cache: !0,
            multi: !1,
            arrow: !0,
            title: "",
            content: "",
            closeable: !1,
            padding: !0,
            url: "",
            type: "html",
            direction: "",
            animation: null,
            template: '<div class="webui-popover"><div class="webui-arrow"></div><div class="webui-popover-inner"><a href="#" class="close"></a><h3 class="webui-popover-title"></h3><div class="webui-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div></div></div>',
            backdrop: !1,
            dismissible: !0,
            onShow: null,
            onHide: null,
            abortXHR: !0,
            autoHide: !1,
            offsetTop: 0,
            offsetLeft: 0,
            iframeOptions: {
                frameborder: "0",
                allowtransparency: "true",
                id: "",
                name: "",
                scrolling: "",
                onload: "",
                height: "",
                width: ""
            },
            hideEmpty: !1
        }, f = l + "-rtl", u = [], h = a('<div class="webui-popover-backdrop"></div>'), p = 0, v = !1, g = -2e3, b = a(t), m = function(e, t) {
            return isNaN(e) ? t || 0 : Number(e);
        }, x = function(e) {
            return e.data("plugin_" + s);
        }, C = function() {
            for (var e = null, t = 0; t < u.length; t++) e = x(u[t]), e && e.hide(!0);
            b.trigger("hiddenAll." + d);
        }, Y = function(e) {
            for (var t = null, i = 0; i < u.length; i++) t = x(u[i]), t && t.id !== e.id && t.hide(!0);
            b.trigger("hiddenAll." + d);
        }, w = "ontouchstart" in t.documentElement && /Mobi/.test(navigator.userAgent), S = function(e) {
            var t = {
                x: 0,
                y: 0
            };
            if ("touchstart" === e.type || "touchmove" === e.type || "touchend" === e.type || "touchcancel" === e.type) {
                var i = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                t.x = i.pageX, t.y = i.pageY;
            } else ("mousedown" === e.type || "mouseup" === e.type || "click" === e.type) && (t.x = e.pageX, 
            t.y = e.pageY);
            return t;
        };
        o.prototype = {
            init: function() {
                if (this.$element[0] instanceof t.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                "manual" !== this.getTrigger() && (w ? this.$element.off("touchend", this.options.selector).on("touchend", this.options.selector, a.proxy(this.toggle, this)) : "click" === this.getTrigger() ? this.$element.off("click", this.options.selector).on("click", this.options.selector, a.proxy(this.toggle, this)) : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave click", this.options.selector).on("mouseenter", this.options.selector, a.proxy(this.mouseenterHandler, this)).on("mouseleave", this.options.selector, a.proxy(this.mouseleaveHandler, this))), 
                this._poped = !1, this._inited = !0, this._opened = !1, this._idSeed = p, this.id = s + this._idSeed, 
                this.options.container = a(this.options.container || t.body).first(), this.options.backdrop && h.appendTo(this.options.container).hide(), 
                p++, "sticky" === this.getTrigger() && this.show(), this.options.selector && (this._options = a.extend({}, this.options, {
                    selector: ""
                }));
            },
            destroy: function() {
                for (var e = -1, t = 0; t < u.length; t++) if (u[t] === this.$element) {
                    e = t;
                    break;
                }
                u.splice(e, 1), this.hide(), this.$element.data("plugin_" + s, null), "click" === this.getTrigger() ? this.$element.off("click") : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave"), 
                this.$target && this.$target.remove();
            },
            getDelegateOptions: function() {
                var e = {};
                return this._options && a.each(this._options, function(t, i) {
                    c[t] !== i && (e[t] = i);
                }), e;
            },
            hide: function(e, t) {
                if ((e || "sticky" !== this.getTrigger()) && this._opened) {
                    t && (t.preventDefault(), t.stopPropagation()), this.xhr && this.options.abortXHR === !0 && (this.xhr.abort(), 
                    this.xhr = null);
                    var i = a.Event("hide." + d);
                    if (this.$element.trigger(i, [ this.$target ]), this.$target) {
                        this.$target.removeClass("in").addClass(this.getHideAnimation());
                        var n = this;
                        setTimeout(function() {
                            n.$target.hide(), n.getCache() || n.$target.remove();
                        }, n.getHideDelay());
                    }
                    this.options.backdrop && h.hide(), this._opened = !1, this.$element.trigger("hidden." + d, [ this.$target ]), 
                    this.options.onHide && this.options.onHide(this.$target);
                }
            },
            resetAutoHide: function() {
                var e = this, t = e.getAutoHide();
                t && (e.autoHideHandler && clearTimeout(e.autoHideHandler), e.autoHideHandler = setTimeout(function() {
                    e.hide();
                }, t));
            },
            delegate: function(e) {
                var t = a(e).data("plugin_" + s);
                return t || (t = new o(e, this.getDelegateOptions()), a(e).data("plugin_" + s, t)), 
                t;
            },
            toggle: function(e) {
                var t = this;
                e && (e.preventDefault(), e.stopPropagation(), this.options.selector && (t = this.delegate(e.currentTarget))), 
                t[t.getTarget().hasClass("in") ? "hide" : "show"]();
            },
            hideAll: function() {
                C();
            },
            hideOthers: function() {
                Y(this);
            },
            show: function() {
                if (!this._opened) {
                    var e = this.getTarget().removeClass().addClass(l).addClass(this._customTargetClass).css("zIndex", r());
                    if (this.options.multi || this.hideOthers(), !this.getCache() || !this._poped || "" === this.content) {
                        if (this.content = "", this.setTitle(this.getTitle()), this.options.closeable || e.find(".close").off("click").remove(), 
                        this.isAsync() ? this.setContentASync(this.options.content) : this.setContent(this.getContent()), 
                        this.canEmptyHide() && "" === this.content) return;
                        e.show();
                    }
                    this.displayContent(), this.options.onShow && this.options.onShow(e), this.bindBodyEvents(), 
                    this.options.backdrop && h.show(), this._opened = !0, this.resetAutoHide();
                }
            },
            displayContent: function() {
                var e = this.getElementPosition(), t = this.getTarget().removeClass().addClass(l).addClass(this._customTargetClass), i = this.getContentElement(), n = t[0].offsetWidth, r = t[0].offsetHeight, o = "bottom", s = a.Event("show." + d);
                if (this.canEmptyHide()) {
                    var c = i.children().html();
                    if (null !== c && 0 === c.trim().length) return;
                }
                this.$element.trigger(s, [ t ]);
                var u = this.$element.data("width") || this.options.width;
                "" === u && (u = this._defaults.width), "auto" !== u && t.width(u);
                var h = this.$element.data("height") || this.options.height;
                "" === h && (h = this._defaults.height), "auto" !== h && i.height(h), this.options.style && this.$target.addClass(l + "-" + this.options.style), 
                "rtl" !== this.options.direction || i.hasClass(f) || i.addClass(f), this.options.arrow || t.find(".webui-arrow").remove(), 
                t.detach().css({
                    top: g,
                    left: g,
                    display: "block"
                }), this.getAnimation() && t.addClass(this.getAnimation()), t.appendTo(this.options.container), 
                o = this.getPlacement(e), this.$element.trigger("added." + d), this.initTargetEvents(), 
                this.options.padding || ("auto" !== this.options.height && i.css("height", i.outerHeight()), 
                this.$target.addClass("webui-no-padding")), this.options.maxHeight && i.css("maxHeight", this.options.maxHeight), 
                this.options.maxWidth && i.css("maxWidth", this.options.maxWidth), n = t[0].offsetWidth, 
                r = t[0].offsetHeight;
                var p = this.getTargetPositin(e, o, n, r);
                if (this.$target.css(p.position).addClass(o).addClass("in"), "iframe" === this.options.type) {
                    var v = t.find("iframe"), b = t.width(), m = v.parent().height();
                    "" !== this.options.iframeOptions.width && "auto" !== this.options.iframeOptions.width && (b = this.options.iframeOptions.width), 
                    "" !== this.options.iframeOptions.height && "auto" !== this.options.iframeOptions.height && (m = this.options.iframeOptions.height), 
                    v.width(b).height(m);
                }
                if (this.options.arrow || this.$target.css({
                    margin: 0
                }), this.options.arrow) {
                    var x = this.$target.find(".webui-arrow");
                    x.removeAttr("style"), "left" === o || "right" === o ? x.css({
                        top: this.$target.height() / 2
                    }) : ("top" === o || "bottom" === o) && x.css({
                        left: this.$target.width() / 2
                    }), p.arrowOffset && (-1 === p.arrowOffset.left || -1 === p.arrowOffset.top ? x.hide() : x.css(p.arrowOffset));
                }
                this._poped = !0, this.$element.trigger("shown." + d, [ this.$target ]);
            },
            isTargetLoaded: function() {
                return 0 === this.getTarget().find("i.glyphicon-refresh").length;
            },
            getTriggerElement: function() {
                return this.$element;
            },
            getTarget: function() {
                if (!this.$target) {
                    var e = s + this._idSeed;
                    this.$target = a(this.options.template).attr("id", e), this._customTargetClass = this.$target.attr("class") !== l ? this.$target.attr("class") : null, 
                    this.getTriggerElement().attr("data-target", e);
                }
                return this.$target.data("trigger-element") || this.$target.data("trigger-element", this.getTriggerElement()), 
                this.$target;
            },
            removeTarget: function() {
                this.$target.remove(), this.$target = null, this.$contentElement = null;
            },
            getTitleElement: function() {
                return this.getTarget().find("." + l + "-title");
            },
            getContentElement: function() {
                return this.$contentElement || (this.$contentElement = this.getTarget().find("." + l + "-content")), 
                this.$contentElement;
            },
            getTitle: function() {
                return this.$element.attr("data-title") || this.options.title || this.$element.attr("title");
            },
            getUrl: function() {
                return this.$element.attr("data-url") || this.options.url;
            },
            getAutoHide: function() {
                return this.$element.attr("data-auto-hide") || this.options.autoHide;
            },
            getOffsetTop: function() {
                return m(this.$element.attr("data-offset-top")) || this.options.offsetTop;
            },
            getOffsetLeft: function() {
                return m(this.$element.attr("data-offset-left")) || this.options.offsetLeft;
            },
            getCache: function() {
                var e = this.$element.attr("data-cache");
                if ("undefined" != typeof e) switch (e.toLowerCase()) {
                  case "true":
                  case "yes":
                  case "1":
                    return !0;

                  case "false":
                  case "no":
                  case "0":
                    return !1;
                }
                return this.options.cache;
            },
            getTrigger: function() {
                return this.$element.attr("data-trigger") || this.options.trigger;
            },
            getDelayShow: function() {
                var e = this.$element.attr("data-delay-show");
                return "undefined" != typeof e ? e : 0 === this.options.delay.show ? 0 : this.options.delay.show || 100;
            },
            getHideDelay: function() {
                var e = this.$element.attr("data-delay-hide");
                return "undefined" != typeof e ? e : 0 === this.options.delay.hide ? 0 : this.options.delay.hide || 100;
            },
            getAnimation: function() {
                var e = this.$element.attr("data-animation");
                return e || this.options.animation;
            },
            getHideAnimation: function() {
                var e = this.getAnimation();
                return e ? e + "-out" : "out";
            },
            setTitle: function(e) {
                var t = this.getTitleElement();
                e ? ("rtl" !== this.options.direction || t.hasClass(f) || t.addClass(f), t.html(n(e))) : t.remove();
            },
            hasContent: function() {
                return this.getContent();
            },
            canEmptyHide: function() {
                return this.options.hideEmpty && "html" === this.options.type;
            },
            getIframe: function() {
                var e = a("<iframe></iframe>").attr("src", this.getUrl()), t = this;
                return a.each(this._defaults.iframeOptions, function(i) {
                    "undefined" != typeof t.options.iframeOptions[i] && e.attr(i, t.options.iframeOptions[i]);
                }), e;
            },
            getContent: function() {
                if (this.getUrl()) switch (this.options.type) {
                  case "iframe":
                    this.content = this.getIframe();
                    break;

                  case "html":
                    try {
                        this.content = a(this.getUrl()), this.content.is(":visible") || this.content.show();
                    } catch (e) {
                        throw new Error("Unable to get popover content. Invalid selector specified.");
                    }
                } else if (!this.content) {
                    var t = "";
                    if (t = a.isFunction(this.options.content) ? this.options.content.apply(this.$element[0], [ this ]) : this.options.content, 
                    this.content = this.$element.attr("data-content") || t, !this.content) {
                        var i = this.$element.next();
                        i && i.hasClass(l + "-content") && (this.content = i);
                    }
                }
                return this.content;
            },
            setContent: function(e) {
                var t = this.getTarget(), i = this.getContentElement();
                "string" == typeof e ? i.html(n(e)) : e instanceof a && (i.html(""), this.options.cache ? e.removeClass(l + "-content").appendTo(i) : e.clone(!0, !0).removeClass(l + "-content").appendTo(i)), 
                this.$target = t;
            },
            isAsync: function() {
                return "async" === this.options.type;
            },
            setContentASync: function(e) {
                var t = this;
                this.xhr || (this.xhr = a.ajax({
                    url: this.getUrl(),
                    type: this.options.async.type,
                    cache: this.getCache(),
                    beforeSend: function(e, i) {
                        t.options.async.before && t.options.async.before(t, e, i);
                    },
                    success: function(i) {
                        t.bindBodyEvents(), e && a.isFunction(e) ? t.content = e.apply(t.$element[0], [ i ]) : t.content = i, 
                        t.setContent(t.content);
                        var n = t.getContentElement();
                        n.removeAttr("style"), t.displayContent(), t.options.async.success && t.options.async.success(t, i);
                    },
                    complete: function() {
                        t.xhr = null;
                    },
                    error: function(e, i) {
                        t.options.async.error && t.options.async.error(t, e, i);
                    }
                }));
            },
            bindBodyEvents: function() {
                v || (this.options.dismissible && "click" === this.getTrigger() ? w ? b.off("touchstart.webui-popover").on("touchstart.webui-popover", a.proxy(this.bodyTouchStartHandler, this)) : (b.off("keyup.webui-popover").on("keyup.webui-popover", a.proxy(this.escapeHandler, this)), 
                b.off("click.webui-popover").on("click.webui-popover", a.proxy(this.bodyClickHandler, this))) : "hover" === this.getTrigger() && b.off("touchend.webui-popover").on("touchend.webui-popover", a.proxy(this.bodyClickHandler, this)));
            },
            mouseenterHandler: function(e) {
                var t = this;
                e && this.options.selector && (t = this.delegate(e.currentTarget)), t._timeout && clearTimeout(t._timeout), 
                t._enterTimeout = setTimeout(function() {
                    t.getTarget().is(":visible") || t.show();
                }, this.getDelayShow());
            },
            mouseleaveHandler: function() {
                var e = this;
                clearTimeout(e._enterTimeout), e._timeout = setTimeout(function() {
                    e.hide();
                }, this.getHideDelay());
            },
            escapeHandler: function(e) {
                27 === e.keyCode && this.hideAll();
            },
            bodyTouchStartHandler: function(e) {
                var t = this, i = a(e.currentTarget);
                i.on("touchend", function(e) {
                    t.bodyClickHandler(e), i.off("touchend");
                }), i.on("touchmove", function() {
                    i.off("touchend");
                });
            },
            bodyClickHandler: function(e) {
                v = !0;
                for (var t = !0, i = 0; i < u.length; i++) {
                    var a = x(u[i]);
                    if (a && a._opened) {
                        var n = a.getTarget().offset(), r = n.left, o = n.top, s = n.left + a.getTarget().width(), l = n.top + a.getTarget().height(), d = S(e), c = d.x >= r && d.x <= s && d.y >= o && d.y <= l;
                        if (c) {
                            t = !1;
                            break;
                        }
                    }
                }
                t && C();
            },
            initTargetEvents: function() {
                "hover" === this.getTrigger() && this.$target.off("mouseenter mouseleave").on("mouseenter", a.proxy(this.mouseenterHandler, this)).on("mouseleave", a.proxy(this.mouseleaveHandler, this)), 
                this.$target.find(".close").off("click").on("click", a.proxy(this.hide, this, !0));
            },
            getPlacement: function(e) {
                var t, i = this.options.container, a = i.innerWidth(), n = i.innerHeight(), r = i.scrollTop(), o = i.scrollLeft(), s = Math.max(0, e.left - o), l = Math.max(0, e.top - r);
                t = "function" == typeof this.options.placement ? this.options.placement.call(this, this.getTarget()[0], this.$element[0]) : this.$element.data("placement") || this.options.placement;
                var d = "horizontal" === t, c = "vertical" === t, f = "auto" === t || d || c;
                return f ? t = a / 3 > s ? n / 3 > l ? d ? "right-bottom" : "bottom-right" : 2 * n / 3 > l ? c ? n / 2 >= l ? "bottom-right" : "top-right" : "right" : d ? "right-top" : "top-right" : 2 * a / 3 > s ? n / 3 > l ? d ? a / 2 >= s ? "right-bottom" : "left-bottom" : "bottom" : 2 * n / 3 > l ? d ? a / 2 >= s ? "right" : "left" : n / 2 >= l ? "bottom" : "top" : d ? a / 2 >= s ? "right-top" : "left-top" : "top" : n / 3 > l ? d ? "left-bottom" : "bottom-left" : 2 * n / 3 > l ? c ? n / 2 >= l ? "bottom-left" : "top-left" : "left" : d ? "left-top" : "top-left" : "auto-top" === t ? t = a / 3 > s ? "top-right" : 2 * a / 3 > s ? "top" : "top-left" : "auto-bottom" === t ? t = a / 3 > s ? "bottom-right" : 2 * a / 3 > s ? "bottom" : "bottom-left" : "auto-left" === t ? t = n / 3 > l ? "left-top" : 2 * n / 3 > l ? "left" : "left-bottom" : "auto-right" === t && (t = n / 3 > l ? "right-bottom" : 2 * n / 3 > l ? "right" : "right-top"), 
                t;
            },
            getElementPosition: function() {
                var e = this.$element[0].getBoundingClientRect(), i = this.options.container, n = i.css("position");
                if (i.is(t.body) || "static" === n) return a.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth || e.width,
                    height: this.$element[0].offsetHeight || e.height
                });
                if ("fixed" === n) {
                    var r = i[0].getBoundingClientRect();
                    return {
                        top: e.top - r.top + i.scrollTop(),
                        left: e.left - r.left + i.scrollLeft(),
                        width: e.width,
                        height: e.height
                    };
                }
                return "relative" === n ? {
                    top: this.$element.offset().top - i.offset().top,
                    left: this.$element.offset().left - i.offset().left,
                    width: this.$element[0].offsetWidth || e.width,
                    height: this.$element[0].offsetHeight || e.height
                } : void 0;
            },
            getTargetPositin: function(e, i, a, n) {
                var r = e, o = this.options.container, s = this.$element.outerWidth(), l = this.$element.outerHeight(), d = t.documentElement.scrollTop + o.scrollTop(), c = t.documentElement.scrollLeft + o.scrollLeft(), f = {}, u = null, h = this.options.arrow ? 20 : 0, p = 10, v = h + p > s ? h : 0, b = h + p > l ? h : 0, m = 0, x = t.documentElement.clientHeight + d, C = t.documentElement.clientWidth + c, Y = r.left + r.width / 2 - v > 0, w = r.left + r.width / 2 + v < C, S = r.top + r.height / 2 - b > 0, Z = r.top + r.height / 2 + b < x;
                switch (i) {
                  case "bottom":
                    f = {
                        top: r.top + r.height,
                        left: r.left + r.width / 2 - a / 2
                    };
                    break;

                  case "top":
                    f = {
                        top: r.top - n,
                        left: r.left + r.width / 2 - a / 2
                    };
                    break;

                  case "left":
                    f = {
                        top: r.top + r.height / 2 - n / 2,
                        left: r.left - a
                    };
                    break;

                  case "right":
                    f = {
                        top: r.top + r.height / 2 - n / 2,
                        left: r.left + r.width
                    };
                    break;

                  case "top-right":
                    f = {
                        top: r.top - n,
                        left: Y ? r.left - v : p
                    }, u = {
                        left: Y ? Math.min(s, a) / 2 + v : g
                    };
                    break;

                  case "top-left":
                    m = w ? v : -p, f = {
                        top: r.top - n,
                        left: r.left - a + r.width + m
                    }, u = {
                        left: w ? a - Math.min(s, a) / 2 - v : g
                    };
                    break;

                  case "bottom-right":
                    f = {
                        top: r.top + r.height,
                        left: Y ? r.left - v : p
                    }, u = {
                        left: Y ? Math.min(s, a) / 2 + v : g
                    };
                    break;

                  case "bottom-left":
                    m = w ? v : -p, f = {
                        top: r.top + r.height,
                        left: r.left - a + r.width + m
                    }, u = {
                        left: w ? a - Math.min(s, a) / 2 - v : g
                    };
                    break;

                  case "right-top":
                    m = Z ? b : -p, f = {
                        top: r.top - n + r.height + m,
                        left: r.left + r.width
                    }, u = {
                        top: Z ? n - Math.min(l, n) / 2 - b : g
                    };
                    break;

                  case "right-bottom":
                    f = {
                        top: S ? r.top - b : p,
                        left: r.left + r.width
                    }, u = {
                        top: S ? Math.min(l, n) / 2 + b : g
                    };
                    break;

                  case "left-top":
                    m = Z ? b : -p, f = {
                        top: r.top - n + r.height + m,
                        left: r.left - a
                    }, u = {
                        top: Z ? n - Math.min(l, n) / 2 - b : g
                    };
                    break;

                  case "left-bottom":
                    f = {
                        top: S ? r.top - b : p,
                        left: r.left - a
                    }, u = {
                        top: S ? Math.min(l, n) / 2 + b : g
                    };
                }
                return f.top += this.getOffsetTop(), f.left += this.getOffsetLeft(), {
                    position: f,
                    arrowOffset: u
                };
            }
        }, a.fn[s] = function(e, t) {
            var i = [], n = this.each(function() {
                var n = a.data(this, "plugin_" + s);
                n ? "destroy" === e ? n.destroy() : "string" == typeof e && i.push(n[e]()) : (e ? "string" == typeof e ? "destroy" !== e && (t || (n = new o(this, null), 
                i.push(n[e]()))) : "object" == typeof e && (n = new o(this, e)) : n = new o(this, null), 
                a.data(this, "plugin_" + s, n));
            });
            return i.length ? i : n;
        };
        var Z = function() {
            var e = function() {
                C();
            }, t = function(e, t) {
                t = t || {}, a(e).webuiPopover(t);
            }, n = function(e) {
                var t = !0;
                return a(e).each(function(e, n) {
                    t = t && a(n).data("plugin_" + s) !== i;
                }), t;
            }, r = function(e, t) {
                debugger;
                t ? a(e).webuiPopover(t).webuiPopover("show") : a(e).webuiPopover("show");
            }, o = function(e) {
                a(e).webuiPopover("hide");
            }, l = function(e) {
                c = a.extend({}, c, e);
            }, d = function(e, t) {
                var i = a(e).data("plugin_" + s);
                if (i) {
                    var n = i.getCache();
                    i.options.cache = !1, i.options.content = t, i._opened ? (i._opened = !1, i.show()) : i.isAsync() ? i.setContentASync(t) : i.setContent(t), 
                    i.options.cache = n;
                }
            }, f = function(e, t) {
                var i = a(e).data("plugin_" + s);
                if (i) {
                    var n = i.getCache(), r = i.options.type;
                    i.options.cache = !1, i.options.url = t, i._opened ? (i._opened = !1, i.show()) : (i.options.type = "async", 
                    i.setContentASync(i.content)), i.options.cache = n, i.options.type = r;
                }
            };
            return {
                show: r,
                hide: o,
                create: t,
                isCreated: n,
                hideAll: e,
                updateContent: d,
                updateContentAsync: f,
                setDefaultOptions: l
            };
        }();
        e.WebuiPopovers = Z;
    });
}(window, document);

(function(e) {
    function t(t) {
        var i = e(t).empty();
        var a = e.data(t, "switchbox").options;
        var n = false;
        if (a.onText != "" && a.offText != "") {
            var r = parseInt(a.onText.length) + parseInt(a.offText.length);
            if (a.onText.length != a.offText.length) {
                n = true;
            }
        }
        if (!i.hasClass("has-switch")) {
            var o = "";
            if (a.disabled) {
                o += " disabled ";
            }
            if (a.checked) {
                o += " checked ";
            }
            i.append('<input type="checkbox"' + o + ">");
        }
        if (a.size == "mini") {
            i.addClass("switch-mini");
        } else if (a.size == "small") {
            i.addClass("switch-small");
        } else if (a.size == "large") {
            i.addClass("switch-large");
        }
        i.attr("data-on", a.onClass);
        i.attr("data-off", a.offClass);
        i.attr("data-on-label", a.onText);
        i.attr("data-off-label", a.offText);
        i.attr("data-animated", a.animated);
        i.bootstrapSwitch();
        if (n) i.width(r * 20);
        i.bind("switch-change", function(e, t) {
            if (!a.disabled) {
                a.onSwitchChange.call(this, e, t);
            }
            return false;
        });
    }
    e.fn.switchbox = function(i, a) {
        if (typeof i == "string") {
            return e.fn.switchbox.methods[i](this, a);
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "switchbox");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "switchbox", {
                    options: e.extend({}, e.fn.switchbox.defaults, e.fn.switchbox.parseOptions(this), i)
                });
                e(this).removeAttr("disabled");
            }
            t(this);
        });
    };
    e.fn.switchbox.methods = {
        options: function(t) {
            return e.data(t[0], "switchbox").options;
        },
        toggleActivation: function(t) {
            return t.each(function() {
                e(this).bootstrapSwitch("toggleActivation");
            });
        },
        isActive: function(e) {
            return e.eq(0).bootstrapSwitch("isActive");
        },
        setActive: function(t, i) {
            return t.each(function() {
                e(this).bootstrapSwitch("setActive", i);
            });
        },
        toggle: function(t) {
            return t.each(function() {
                e(this).bootstrapSwitch("toggleState");
            });
        },
        setValue: function(t, i, a) {
            return t.each(function() {
                e(this).bootstrapSwitch("setState", i, a || true);
            });
        },
        getValue: function(e) {
            return e.eq(0).bootstrapSwitch("status");
        },
        setOnText: function(t, i) {
            return t.each(function() {
                e(this).bootstrapSwitch("setOnLabel", i);
            });
        },
        setOffText: function(t, i) {
            return t.each(function() {
                e(this).bootstrapSwitch("setOffLabel", i);
            });
        },
        setOnClass: function(t, i) {
            return t.each(function() {
                e(this).bootstrapSwitch("setOnClass", i);
            });
        },
        setOffClass: function(t, i) {
            return t.each(function() {
                e(this).bootstrapSwitch("setOffClass", i);
            });
        },
        destroy: function(t) {
            return t.each(function() {
                e(this).bootstrapSwitch("destroy");
            });
        }
    };
    e.fn.switchbox.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "id", "iconCls", "iconAlign", "group", "size", {
            plain: "boolean",
            toggle: "boolean",
            selected: "boolean"
        } ]), {
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.switchbox.defaults = {
        id: null,
        disabled: false,
        checked: true,
        animated: false,
        size: "mini",
        onText: "ON",
        offText: "OFF",
        onClass: "success",
        offClass: "warning",
        onSwitchChange: function(e, t) {}
    };
})(jQuery);

(function(e) {
    function t(t) {
        var i = e("input[name='" + t + "']");
        if (i.length > 0) {
            var a = i.last()[0];
            var n = e.data(a, "checkbox");
            if (n) {
                var r = n.proxy;
                e(r).tooltip("hide");
            }
        }
    }
    function i(t) {
        var i = e("input[name='" + t + "']");
        if (i.length > 0) {
            if (i.last().next().hasClass("invalid")) {
                var a = i.last()[0];
                var n = e.data(a, "checkbox");
                if (n) {
                    var r = n.options;
                    var o = n.proxy;
                    e(o).tooltip(e.extend({}, r.tipOptions, {
                        content: r.missingMessage,
                        position: r.tipPosition,
                        deltaX: r.deltaX
                    })).tooltip("show");
                    n.tip = true;
                }
            }
        }
    }
    function a(t) {
        var i = e.data(t, "checkbox");
        if (!i) return false;
        var a = i.options;
        if (a.name) {
            var n = e(t).next();
            if (a.novalidate || n.is(":disabled")) {
                return true;
            }
            var r = e("input[name='" + a.name + "']");
            r.next().removeClass("invalid");
            var o = r.filter(":checked");
            if (o.length == 0 && a.required) {
                r.next().addClass("invalid");
                return false;
            }
        }
        return true;
    }
    function n(a) {
        var n = e(a).empty();
        var r = e.data(a, "checkbox");
        var s = r.options;
        if (!s.id) {
            s.id = s.label;
            n.attr("id", s.id);
        }
        n.prop("disabled", s.disabled);
        n.prop("checked", s.checked);
        if (!n.hasClass("checkbox-f")) {
            s.originalValue = n.prop("checked");
            n.addClass("checkbox-f");
            var l = a.className.replace("hisui-checkbox", "").replace("checkbox-f", "");
            var d = '<label class="checkbox ' + l;
            if (s.boxPosition == "right") {
                d += " right";
            }
            if (s.disabled) {
                d += " disabled";
            }
            if (s.checked) {
                d += " checked";
            }
            d += '"';
            if (s.width) {
                d += ' style="width:' + s.width + 'px" ';
            }
            d += ">" + e.hisui.getTrans(s.label) + "</label>";
            var c = e(d).insertAfter(n);
            c.unbind("click").bind("click.checkbox", function(t) {
                if (e(a).prop("disabled") == false) o(a, !e(this).hasClass("checked"));
            });
            n.unbind("click").bind("click.checkbox", function(t) {
                var i = e(this).is(":checked");
                if (i) {
                    if (s.onChecked) s.onChecked.call(this, t, true);
                    if (s.ifChecked) s.ifChecked.call(this, t, true);
                } else {
                    if (s.onUnchecked) s.onUnchecked.call(this, t, false);
                    if (s.ifUnchecked) s.ifUnchecked.call(this, t, false);
                }
                if (s.onCheckChange) s.onCheckChange.call(this, t, i);
                if (s.ifToggled) s.ifToggled.call(this, t, i);
                n.trigger("ifChanged");
            });
            var f = e('label[for="' + s.id + '"]').add(n.closest("label"));
            if (f.length) {
                f.off(".checkbox").on("click.checkbox mouseover.checkbox mouseout.checkbox ", function(t) {
                    var i = t["type"], n = e(this);
                    if (!e(a).prop("disabled")) {
                        if (i == "click") {
                            if (e(t.target).is("a")) {
                                return;
                            }
                            o(a, !c.hasClass("checked"));
                        } else {
                            if (/ut|nd/.test(i)) {
                                c.removeClass("hover");
                            } else {
                                c.addClass("hover");
                            }
                        }
                        return false;
                    }
                });
            }
            r.proxy = c;
        } else {
            var c = r.proxy;
            if (s.disabled && !c.hasClass("disabled")) c.addClass("disabled");
            if (!s.disabled && c.hasClass("disabled")) c.removeClass("disabled");
            if (s.checked && !c.hasClass("checked")) c.addClass("checked");
            if (!s.checked && c.hasClass("checked")) c.removeClass("checked");
            var u = e.hisui.getTrans(s.label);
            if (u != c.text()) c.text(u);
        }
        if (s.required) {
            c.unbind("mouseenter").bind("mouseenter.checkbox", function(t) {
                var a = e(this);
                if (!a.hasClass("disabled")) {
                    i(s.name);
                }
            }).unbind("mouseleave").bind("mouseleave.checkbox", function(i) {
                var a = e(this);
                if (!a.hasClass("disabled")) {
                    t(s.name);
                }
            });
        }
        if (s.name && !n.attr("name")) {
            n.attr("name", s.name);
        }
        var h = e.data(a, "checkbox");
        e.data(a, "checkbox", h);
        n.hide();
    }
    function r(t) {
        var i = (e.data(t, "checkbox") || e.data(t, "radio") || {})["proxy"];
        if (i) {
            var n = e.data(t, "checkbox");
            if (n) n.options.checked = e(t).prop("checked");
            if (e(t).prop("checked") && !i.hasClass("checked")) i.addClass("checked");
            if (!e(t).prop("checked") && i.hasClass("checked")) i.removeClass("checked");
            a(t);
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > -1) {
            var r = i;
            r.css("background-position", "-6px 0px");
            if (r.hasClass("checked") && r.hasClass("disabled")) {
                r.css("background-position", "-6px -96px");
                return;
            }
            if (r.hasClass("checked")) {
                r.css("background-position", "-6px -48px");
            }
            if (r.hasClass("disabled")) {
                r.css("background-position", "-6px -72px");
            }
            if (r.hasClass("invalid")) {
                r.css("background-position", "-6px -240px");
            }
        }
    }
    e.fn.checkbox = function(t, i) {
        if (typeof t == "string") {
            return e.fn.checkbox.methods[t](this, i);
        }
        t = t || {};
        return this.each(function() {
            var i = e.data(this, "checkbox");
            if (i) {
                e.extend(i.options, t);
            } else {
                e.data(this, "checkbox", {
                    options: e.extend({}, e.fn.checkbox.defaults, e.fn.checkbox.parseOptions(this), t)
                });
            }
            n(this);
            a(this);
        });
    };
    function o(t, i) {
        if (i != e(t).is(":checked")) {
            if (e(t).prop("disabled") == true) {
                e(t).prop("disabled", false);
                e(t).prop("checked", i);
                e(t).prop("disabled", true);
            }
            var a = (e.data(t, "checkbox") || e.data(t, "radio") || {})["proxy"];
            if (i) {
                a.addClass("checked");
            } else {
                a.removeClass("checked");
            }
            e(t).trigger("click.checkbox");
        }
        r(t);
    }
    function s(t) {
        return e(t).is(":checked");
    }
    function l(t, i) {
        i = i == true;
        var a = e.data(t, "checkbox") || e.data(t, "radio") || {};
        var n = a.proxy;
        if (n) {
            e(t).prop("disabled", i);
            if (i) n.addClass("disabled"); else n.removeClass("disabled");
            a.options.disabled = i;
            e(t).trigger("ifChanged");
        }
    }
    function d(t, i) {
        e(t).checkbox({
            required: i
        });
    }
    e.fn.checkbox.methods = {
        options: function(t) {
            return e.data(t[0], "checkbox").options;
        },
        setValue: function(e, t) {
            return e.each(function() {
                o(this, t);
                r(this);
            });
        },
        getValue: function(e) {
            return s(e[0]);
        },
        setDisable: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        check: function(e) {
            return e.each(function() {
                o(this, true);
            });
        },
        uncheck: function(e) {
            return e.each(function() {
                o(this, false);
            });
        },
        toggle: function(e) {
            return e.each(function() {
                o(this, !s(this));
            });
        },
        disable: function(e) {
            return e.each(function() {
                l(this, true);
            });
        },
        enable: function(e) {
            return e.each(function() {
                l(this, false);
            });
        },
        indeterminate: function(e) {
            return e.each(function() {});
        },
        determinate: function(e) {
            return e.each(function() {});
        },
        update: function(e) {},
        destroy: function(e) {},
        clear: function(e) {
            return e.each(function() {
                o(this, false);
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).checkbox("options").originalValue || false;
                o(this, t);
            });
        },
        isValid: function(e) {
            var t = false;
            e.each(function() {
                t = a(this);
            });
            return t;
        },
        setRequired: function(e, t) {
            return e.each(function() {
                d(this, t);
            });
        }
    };
    e.fn.checkbox.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "label", "name", "id", "checked", "width", "required" ]), {
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.checkbox.defaults = {
        id: null,
        label: "",
        width: null,
        boxPosition: "left",
        disabled: false,
        checked: false,
        onCheckChange: null,
        onChecked: null,
        onUnchecked: null,
        ifChecked: null,
        ifUnchecked: null,
        ifToggled: null,
        required: false,
        novalidate: false,
        missingMessage: "This field is required.",
        validating: false,
        tipPosition: "right",
        deltaX: 0,
        tipOptions: {
            position: "right",
            showEvent: "none",
            hideEvent: "none",
            showDelay: 0,
            hideDelay: 0,
            zIndex: "",
            onShow: function() {},
            onHide: function() {
                e(this).tooltip("destroy");
            }
        }
    };
})(jQuery);

(function(e) {
    function t(t) {
        var i = e("input[name='" + t + "']");
        if (i.length > 0) {
            var a = i.last()[0];
            var n = e.data(a, "radio");
            if (n) {
                var r = n.proxy;
                e(r).tooltip("hide");
            }
        }
    }
    function i(t) {
        var i = e("input[name='" + t + "']");
        if (i.length > 0) {
            if (i.last().next().hasClass("invalid")) {
                var a = i.last()[0];
                var n = e.data(a, "radio");
                if (n) {
                    var r = n.options;
                    var o = n.proxy;
                    e(o).tooltip(e.extend({}, r.tipOptions, {
                        content: r.missingMessage,
                        position: r.tipPosition,
                        deltaX: r.deltaX
                    })).tooltip("show");
                    n.tip = true;
                }
            }
        }
    }
    function a(i) {
        var a = e.data(i, "radio");
        if (!a) return false;
        var n = a.options;
        if (n.name) {
            var r = e(i).next();
            if (n.novalidate || r.is(":disabled")) {
                return true;
            }
            var o = e("input[name='" + n.name + "']");
            o.next("label").removeClass("invalid");
            t(n.name);
            var s = o.filter(":checked");
            if (s.length == 0 && n.required) {
                o.next("label").addClass("invalid");
                return false;
            }
        }
        return true;
    }
    function n(a) {
        var n = e(a).empty();
        var r = e.data(a, "radio");
        var s = r.options;
        if (!s.id) {
            s.id = s.label;
            n.attr("id", s.id);
        }
        if (s.name != "") n.attr("name", s.name);
        n.prop("disabled", s.disabled);
        n.prop("checked", s.checked);
        if (!n.hasClass("radio-f")) {
            s.originalValue = n.prop("checked");
            var l = s.requiredSel;
            n.addClass("radio-f");
            var d = '<label class="radio';
            if (s.boxPosition == "right") {
                d += " right";
            }
            if (s.radioClass) {
                d += " hischeckbox_square-blue";
            }
            if (s.disabled) {
                d += " disabled";
            }
            if (s.checked) {
                d += " checked";
            }
            d += '">' + e.hisui.getTrans(s.label) + "</label>";
            var c = e(d).insertAfter(n);
            c.unbind("click").bind("click.radio", function(t) {
                var i = e(this);
                if (!i.hasClass("disabled")) {
                    o(a, !i.hasClass("checked"), !l);
                }
            });
            n.unbind("click").bind("click.radio", function(t) {
                if (e(this).prop("disabled") == false) {
                    var i = e(this).is(":checked");
                    if (i) {
                        if (s.onChecked) s.onChecked.call(this, t, true);
                    } else {}
                    if (s.onCheckChange) s.onCheckChange.call(this, t, i);
                }
            }).bind("ifChecked", function(t, i) {
                if (!e(this).prop("disabled")) {
                    if (s.onChecked) s.onChecked.call(this, t, i);
                }
                return false;
            }).bind("ifUnchecked", function(t, i) {
                if (!e(this).prop("disabled")) {
                    if (s.onUnchecked) s.onUnchecked.call(this, t, i);
                }
                return false;
            }).bind("ifToggled", function(t, i) {
                if (!e(this).prop("disabled")) {
                    if (s.onCheckChange) s.onCheckChange.call(this, t, i);
                }
                return false;
            });
            var f = e('label[for="' + s.id + '"]').add(n.closest("label"));
            if (f.length) {
                f.off(".radio").on("click.radio mouseover.radio mouseout.radio ", function(t) {
                    var i = t["type"], n = e(this);
                    if (!e(a).prop("disabled")) {
                        if (i == "click") {
                            if (e(t.target).is("a")) {
                                return;
                            }
                            o(a, !c.hasClass("checked"), !l);
                        } else {
                            if (/ut|nd/.test(i)) {
                                c.removeClass("hover");
                            } else {
                                c.addClass("hover");
                            }
                        }
                        return false;
                    }
                });
            }
            r.proxy = c;
        } else {
            var c = r.proxy;
            if (s.disabled && !c.hasClass("disabled")) c.addClass("disabled");
            if (!s.disabled && c.hasClass("disabled")) c.removeClass("disabled");
            if (s.checked && !c.hasClass("checked")) c.addClass("checked");
            if (!s.checked && c.hasClass("checked")) c.removeClass("checked");
            if (e.hisui.getTrans(s.label) != c.text()) c.text(e.hisui.getTrans(s.label));
        }
        if (s.required) {
            c.unbind("mouseenter").bind("mouseenter.radio", function(t) {
                var a = e(this);
                if (!a.hasClass("disabled")) {
                    i(s.name);
                }
            }).unbind("mouseleave").bind("mouseleave.radio", function(i) {
                var a = e(this);
                if (!a.hasClass("disabled")) {
                    t(s.name);
                }
            });
        }
        if (s.name && !n.attr("name")) {
            n.attr("name", s.name);
        }
        var u = e.data(a, "radio");
        e.data(a, "radio", u);
        n.hide();
        status.validating = true;
    }
    function r(t) {
        var i = (e.data(t, "radio") || e.data(t, "checkbox") || {})["proxy"];
        if (i) {
            var n = e.data(t, "radio");
            if (n) n.options.checked = e(t).prop("checked");
            if (e(t).prop("checked") && !i.hasClass("checked")) i.addClass("checked");
            if (!e(t).prop("checked") && i.hasClass("checked")) i.removeClass("checked");
            a(t);
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > -1 && !i.hasClass("hischeckbox_square-blue")) {
            var r = i;
            r.css("background-position", "0px -120px");
            if (r.hasClass("checked") && r.hasClass("disabled")) {
                r.css("background-position", "0px -216px");
                return;
            }
            if (r.hasClass("checked")) {
                r.css("background-position", "0px -168px");
            }
            if (r.hasClass("disabled")) {
                r.css("background-position", "0px -192px");
            }
            if (r.hasClass("invalid")) {
                r.css("background-position", "0px -264px");
            }
        }
    }
    e.fn.radio = function(t, i) {
        if (typeof t == "string") {
            return e.fn.radio.methods[t](this, i);
        }
        t = t || {};
        return this.each(function() {
            var i = e.data(this, "radio");
            if (i) {
                e.extend(i.options, t);
            } else {
                e.data(this, "radio", {
                    options: e.extend({}, e.fn.radio.defaults, e.fn.radio.parseOptions(this), t)
                });
            }
            n(this);
            a(this);
        });
    };
    function o(t, i, a) {
        var n = e(t);
        if (i != n.is(":checked")) {
            var s = (e.data(t, "radio") || e.data(t, "checkbox") || {})["proxy"];
            if (i == true) {
                var l = e(t).attr("name");
                if (l) {
                    var d = n.closest("form"), c = 'input[name="' + l + '"]';
                    c = d.length ? d.find(c) : e(c);
                    c.each(function() {
                        if (this !== t && e.data(this, "radio")) {
                            o(this, false, true);
                        }
                    });
                }
                s.addClass("checked");
                e(t).prop("checked", true).trigger("ifChecked", true).trigger("ifToggled", true);
            } else {
                if (a) {
                    s.removeClass("checked");
                    e(t).prop("checked", false).trigger("ifUnchecked", false).trigger("ifToggled", false);
                }
            }
        }
        r(t);
    }
    function s(t) {
        return e(t).is(":checked");
    }
    function l(t, i) {
        i = i == true;
        var a = e.data(t, "radio") || e.data(t, "checkbox") || {};
        var n = a.proxy;
        if (n) {
            e(t).prop("disabled", i);
            if (i) n.addClass("disabled"); else n.removeClass("disabled");
            a.options.disabled = i;
        }
    }
    function d(t, i) {
        e(t).radio({
            required: i
        });
    }
    e.fn.radio.methods = {
        options: function(t) {
            return e.data(t[0], "radio").options;
        },
        setValue: function(e, t) {
            return e.each(function() {
                o(this, t, true);
            });
        },
        getValue: function(e) {
            return s(e[0]);
        },
        setDisable: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        check: function(e) {
            return e.each(function() {
                o(this, true, true);
            });
        },
        uncheck: function(e) {
            return e.each(function() {
                o(this, false, true);
            });
        },
        toggle: function(e) {
            return e.each(function() {
                o(this, !s(this), true);
            });
        },
        disable: function(e) {
            return e.each(function() {
                l(this, true);
            });
        },
        enable: function(e) {
            return e.each(function() {
                l(this, false);
            });
        },
        indeterminate: function(e) {
            return e.each(function() {});
        },
        determinate: function(e) {
            return e.each(function() {});
        },
        update: function(e) {},
        destroy: function(e) {},
        clear: function(e) {
            return e.each(function() {
                o(this, false, true);
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).radio("options").originalValue || false;
                o(this, t, true);
            });
        },
        isValid: function(e) {
            var t = false;
            e.each(function() {
                t = a(this);
            });
            return t;
        },
        setRequired: function(e, t) {
            return e.each(function() {
                d(this, t);
            });
        }
    };
    e.fn.radio.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "label", "id", "name", "checked", "required" ]), {
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.radio.defaults = {
        id: null,
        label: "",
        name: "",
        boxPosition: "left",
        radioClass: "",
        disabled: false,
        checked: false,
        onCheckChange: null,
        onChecked: null,
        required: false,
        novalidate: false,
        missingMessage: "This field is required.",
        validating: false,
        tipPosition: "right",
        deltaX: 0,
        tipOptions: {
            position: "right",
            showEvent: "none",
            hideEvent: "none",
            showDelay: 0,
            hideDelay: 0,
            zIndex: "",
            onShow: function() {},
            onHide: function() {
                e(this).tooltip("destroy");
            }
        },
        requiredSel: false
    };
})(jQuery);

(function(e) {
    e.parser.plugins.push("filebox");
    var t = 0;
    function i(i) {
        var n = e.data(i, "filebox");
        var r = n.options;
        r.fileboxId = "filebox_file_id_" + ++t;
        e(i).addClass("filebox-f").hide();
        var o = e('<span class="filebox">' + '<input class="filebox-text" autocomplete="off">' + '<input type="hidden" class="filebox-value">' + "</span>").insertAfter(i);
        var s = e(i).attr("name");
        if (s) {
            o.find("input.filebox-value").attr("name", s);
            e(i).removeAttr("name").attr("fileboxName", s);
        }
        if (r.plain) o.addClass("filebox-plain");
        if (r.disabled) o.addClass("disabled");
        if (!r.buttonText) o.addClass("filebox-no-txet");
        if (r.buttonAlign == "left") o.addClass("filebox-left");
        var l = "filebox-button";
        if (e(i).hasClass("showicon")) {
            l += " showicon";
        }
        var d = e('<a href="javascript:;" class="' + l + '"></a>').prependTo(o);
        d.addClass("filebox-button-" + r.buttonAlign).linkbutton({
            text: r.buttonText,
            iconCls: r.buttonIcon,
            onClick: function() {
                r.onClickButton.call(i);
            },
            disabled: r.disabled
        });
        var c = o.find("input.filebox-text");
        c.attr("readonly", "readonly").attr("placeholder", r.prompt || "");
        n.filebox = e(i).next();
        var f = a(i);
        if (d.length) {
            e('<label class="filebox-label" for="' + r.fileboxId + '"></label>').appendTo(d);
            if (d.linkbutton("options").disabled) {
                f.attr("disabled", "disabled");
            } else {
                f.removeAttr("disabled");
            }
        }
        o._outerWidth(r.width)._outerHeight(r.height);
        var u = o.width() - d.outerWidth();
        c._outerWidth(u).css({
            height: o.height() + "px",
            lineHeight: o.height() + "px",
            marginLeft: (r.buttonAlign == "left" ? d.outerWidth() : 0) + "px"
        });
    }
    function a(t) {
        var i = e.data(t, "filebox");
        var a = i.options;
        i.filebox.find(".filebox-value").remove();
        a.oldValue = "";
        var n = e('<input type="file" class="filebox-value">').appendTo(i.filebox);
        n.attr("id", a.fileboxId).attr("name", e(t).attr("fileboxName") || "");
        n.attr("accept", a.accept);
        n.attr("capture", a.capture);
        if (a.multiple) {
            n.attr("multiple", "multiple");
        }
        n.change(function() {
            var i = this.value;
            if (this.files) {
                i = e.map(this.files, function(e) {
                    return e.name;
                }).join(a.separator);
            }
            e(t).filebox("setText", i);
            a.onChange.call(t, i, a.oldValue);
            a.oldValue = i;
        });
        return n;
    }
    function n(t) {
        var i = e.data(t, "filebox");
        var a = i.options;
        var n = i.filebox;
        n.addClass("disabled");
        var r = n.find(".filebox-button");
        r.linkbutton("disable");
        var o = n.find(".filebox-value");
        o.attr("disabled", "disabled");
        a.disabled = true;
    }
    function r(t) {
        var i = e.data(t, "filebox");
        var a = i.options;
        var n = i.filebox;
        n.removeClass("disabled");
        var r = n.find(".filebox-button");
        r.linkbutton("enable");
        var o = n.find(".filebox-value");
        o.removeAttr("disabled");
        a.disabled = false;
    }
    e.fn.filebox = function(t, a) {
        if (typeof t == "string") {
            var n = e.fn.filebox.methods[t];
            return n(this, a);
        }
        t = t || {};
        return this.each(function() {
            var a = e.data(this, "filebox");
            if (a) {
                e.extend(a.options, t);
            } else {
                e.data(this, "filebox", {
                    options: e.extend({}, e.fn.filebox.defaults, e.fn.filebox.parseOptions(this), t)
                });
            }
            i(this);
        });
    };
    e.fn.filebox.methods = {
        options: function(t) {
            return e.data(t[0], "filebox").options;
        },
        clear: function(t) {
            return t.each(function() {
                a(this);
                e(this).filebox("setText", "");
            });
        },
        reset: function(t) {
            return t.each(function() {
                e(this).filebox("clear");
            });
        },
        setValue: function(e) {
            return e;
        },
        setValues: function(e) {
            return e;
        },
        files: function(e) {
            var t = e.next().find(".filebox-value")[0];
            if (t.files) {
                return t.files;
            } else {
                var i = [];
                i.push({
                    lastModified: null,
                    name: t.value,
                    type: t.accept,
                    size: null
                });
                return i;
            }
        },
        setText: function(t, i) {
            return t.each(function() {
                e.data(this, "filebox").filebox.find(".filebox-text").val(i);
            });
        },
        button: function(t) {
            return e.data(t[0], "filebox").filebox.find(".filebox-button");
        },
        disable: function(e) {
            return e.each(function() {
                n(this);
            });
        },
        enable: function(e) {
            return e.each(function() {
                r(this);
            });
        }
    };
    e.fn.filebox.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "width", "height", "prompt", "accept", "capture", "separator" ]), {
            multiple: i.attr("multiple") ? true : undefined,
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.filebox.defaults = e.extend({}, {
        buttonIcon: null,
        buttonText: "Choose File",
        buttonAlign: "right",
        inputEvents: {},
        accept: "",
        capture: "",
        separator: ",",
        multiple: false,
        prompt: "",
        width: "177",
        height: "30",
        disabled: false,
        onClickButton: function() {},
        onChange: function() {},
        plain: false
    });
})(jQuery);

(function(e) {
    function t(t) {
        var i = e(t);
        var a = e.data(t, "popover").options;
        if (!a.id) {
            a.id = a.label;
            i.attr("id", a.id);
        }
        i.prop("disabled", a.disabled);
        if (!a.cache) i.webuiPopover("destroy");
        i.webuiPopover(a);
    }
    function i(t) {
        var i = e.data(t, "popover").options;
        if (i.width === "auto") {
            var a = e(t).data().plugin_webuiPopover.options.template;
            var n = i.title;
            var r = i.content;
            var o = e('<div class="webui-popover top in" id="tempPopover" style="display: block; top: 451.6px; left: 11.375px; visibility:hidden">' + '<div class="webui-arrow" style="left: 199px;"></div>' + '<div class="webui-popover-inner">' + '<h3 class="webui-popover-title">' + n + "</h3>" + '<div class="webui-popover-content">' + r + "</div></div></div>").appendTo("body").width();
            e(t).data().plugin_webuiPopover.options.template = a.replace('"webui-popover-inner"', '"webui-popover-inner" style="width: ' + o + 'px"');
            e("#tempPopover").remove();
        }
    }
    e.fn.popover = function(a, n) {
        if (typeof a == "string") {
            return e.fn.popover.methods[a](this, n);
        }
        a = a || {};
        return this.each(function() {
            var n = e.data(this, "popover");
            if (n) {
                e.extend(n.options, a);
            } else {
                e.data(this, "popover", {
                    options: e.extend({}, e.fn.popover.defaults, e.fn.popover.parseOptions(this), a)
                });
            }
            t(this);
            i(this);
        });
    };
    e.fn.popover.methods = {
        options: function(t) {
            return e.data(t[0], "popover").options;
        },
        show: function(t) {
            return t.each(function() {
                var t = e(this);
                t.webuiPopover("show");
            });
        },
        hide: function(t) {
            return t.each(function() {
                var t = e(this);
                if (!e.data(this, "popover").options.cache) {
                    t.webuiPopover("destroy");
                } else {
                    t.webuiPopover("hide");
                }
            });
        },
        destroy: function(t) {
            return t.each(function() {
                e(this).webuiPopover("destroy");
            });
        },
        setContent: function(t, a) {
            return t.each(function() {
                var t = e.data(this, "popover").options.cache;
                if (e.data(this, "popover").options.cache) {
                    e.data(this, "popover").options.cache = false;
                }
                var n = e(this);
                var r = e.data(this, "popover").options;
                r.content = a;
                n.webuiPopover("destroy");
                n.webuiPopover(r);
                i(this);
                e.data(this, "popover").options.cache = t;
            });
        }
    };
    e.fn.popover.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "id" ]), {
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.popover.defaults = {
        id: null,
        disabled: false,
        placement: "auto",
        container: document.body,
        width: "auto",
        height: "auto",
        trigger: "click",
        selector: false,
        style: "",
        animation: null,
        delay: {
            show: null,
            hide: 300
        },
        async: {
            type: "GET",
            before: function(e, t) {},
            success: function(e, t) {},
            error: function(e, t, i) {}
        },
        cache: true,
        multi: false,
        arrow: true,
        title: "",
        content: "",
        closeable: false,
        direction: "",
        padding: true,
        type: "html",
        url: "",
        backdrop: false,
        dismissible: true,
        autoHide: false,
        offsetTop: 0,
        offsetLeft: 0,
        onShow: function(e) {},
        onHide: function(e) {}
    };
})(jQuery);

(function(e) {
    function t(t, i) {
        var a = e(i);
        if (a.hasClass("bginone")) return false;
        var n = t.pageX;
        var r = a._outerWidth();
        var o = a.offset();
        if (n < o.left + r && n > o.left + r - 40) {
            return true;
        }
        return false;
    }
    function i(t, i) {
        e(t)._outerWidth(i);
    }
    function a(t) {
        var i = e(e.hisui.globalContainerSelector);
        if (i.length > 0 && e.data(i[0], "data")) {
            var a = e.data(i[0], "data");
            var n = a.qState;
            clearTimeout(a.offsettimer);
            a.offsettimer = null;
            if ("undefined" == typeof t) {
                t = a.srcTargetDom;
            }
        }
        if (i.is(":visible")) {
            var r = e.data(t, "comboq") || n;
            if (r) {
                var o = r.options;
                r.isShow = false;
                o.onHidePanel.call(this, t);
            }
            e(t).removeClass("comboq-active");
            e(e.hisui.globalContainerSelector).hide();
            return e(t);
        }
        if ("undefined" != typeof t) return e(t);
        return null;
    }
    function n(e) {
        r(e, "");
        o(e, "");
    }
    function r(t, i) {
        var a = e.data(t, "comboq");
        if (i != e(t).val()) {
            e(t).val(i);
            e(t).comboq("validate");
            a.previousValue = i;
        }
    }
    function o(t, i) {
        var a = e.data(t, "comboq");
        var n = a.options;
        var r = e(t).data("value");
        if (i != r) {
            n.onChange.call(t, i, r);
            e(t).data("value", i);
            e(t).comboq("validate");
            a.originalRealValue = i;
        }
    }
    function s(i) {
        var n = e.data(i, "comboq");
        var r = n.options;
        var o = e(i);
        o.addClass("comboq");
        o.attr("autocomplete", "off");
        if (e.isNumeric(r.width)) o._outerWidth(r.width);
        if (r.disabled) {
            o.addClass("disabled");
        }
        if (r.readOnly) {
            o.addClass("readonly");
        }
        if (!r.hasDownArrow) {
            o.addClass("bginone");
        }
        o.validatebox(r);
        e(document).unbind(".comboq").bind("mousedown.comboq", function(t) {
            var i = e(t.target).closest("input.comboq");
            if (i.length > 0 && e.data(i[0], "comboq").isShow) {
                return;
            }
            var n = e(t.target).closest(e.hisui.globalContainerSelector);
            if (n.length) {
                return;
            }
            if (e(e.hisui.globalContainerSelector).is(":visible")) a();
        });
        o.unbind(".comboq").bind("mousemove.comboq", function(i) {
            if (e(this).hasClass("disabled")) return;
            if (e(this).hasClass("readonly")) return;
            if (t(i, this)) {
                this.style.cursor = "pointer";
                e(this).addClass("comboq-arrow-hover");
            } else {
                this.style.cursor = "auto";
                e(this).removeClass("comboq-arrow-hover");
            }
        }).bind("mouseleave.comboq", function() {
            this.style.cursor = "auto";
            e(this).removeClass("comboq-arrow-hover");
        }).bind("click.comboq", function(i) {
            if (e(this).hasClass("disabled")) return;
            if (e(this).hasClass("readonly")) return;
            if (t(i, this)) {
                i.preventDefault();
                i.stopPropagation();
                d(this);
                return false;
            }
        }).bind("blur.comboq", function(e) {
            if (r.onBlur) r.onBlur.call(this, i);
        }).bind("keydown.comboq paste.comboq drop.comboq input.comboq", function(t) {
            if ("undefined" == typeof t.keyCode) {
                return;
            }
            switch (t.keyCode) {
              case 38:
                r.keyHandler.up.call(i, t);
                break;

              case 40:
                if (!e(e.hisui.globalContainerSelector).is(":visible")) {
                    if (false == d(this)) return;
                }
                r.keyHandler.down.call(i, t);
                break;

              case 37:
                r.keyHandler.left.call(i, t);
                break;

              case 39:
                r.keyHandler.right.call(i, t);
                break;

              case 33:
                r.keyHandler.pageUp.call(i, t);
                break;

              case 34:
                r.keyHandler.pageDown.call(i, t);
                break;

              case 13:
                r.keyHandler.enter.call(i, t);
                break;

              case 9:
              case 27:
                a();
                break;

              default:
                setTimeout(function() {
                    if (r.editable) {
                        if (n.timer) {
                            clearTimeout(n.timer);
                        }
                        if (!r.isCombo) return;
                        if (r.minQueryLen > 0 && o.val().length < r.minQueryLen) return;
                        n.timer = setTimeout(function() {
                            var a = o.val();
                            if (n.previousValue != a) {
                                n.previousValue = a;
                                if (!n.isShow) {
                                    var s = e(i).comboq("showPanel");
                                    if (s == false) return;
                                }
                                r.keyHandler.query.call(i, o.val(), t);
                                e(i).comboq("validate");
                            }
                        }, r.delay);
                    }
                }, 0);
            }
        });
        return;
    }
    function l(t, i) {
        if (i) {
            e(t).addClass("disabled");
            e(t).prop("disabled", true);
        } else {
            e(t).removeClass("disabled");
            e(t).prop("disabled", false);
        }
    }
    function d(t) {
        var i = e(t);
        var a = e.data(t, "comboq");
        var n = a.options;
        if (n.onBeforeShowPanel.call(t) === false) return false;
        var r = e(e.hisui.globalContainerSelector);
        if (r.length > 0) {
            r.empty();
        } else {
            r = e('<div id="' + e.hisui.globalContainerId + '"></div>').appendTo("body");
        }
        r.height(n.panelHeight);
        r.css("z-index", e.fn.window.defaults.zIndex++);
        if (!n.panelWidth) {
            n.panelWidth = i._outerWidth();
        }
        r.width(n.panelWidth);
        a.isShow = true;
        r.show();
        e.data(document.getElementById(e.hisui.globalContainerId), "data", {
            srcTargetDom: t,
            qState: a
        });
        n.onShowPanel.call(t);
        i.addClass("comboq-active");
        e.hisui.fixPanelTLWH();
    }
    e.fn.comboq = function(t, i) {
        if (typeof t == "string") {
            var a = e.fn.comboq.methods[t];
            if (a) {
                return a(this, i);
            } else {
                return this.validatebox(t, i);
            }
        }
        t = t || {};
        return this.each(function() {
            var i = e.data(this, "comboq");
            if (i) {
                e.extend(i.options, t);
            } else {
                i = e.data(this, "comboq", {
                    isShow: false,
                    options: e.extend({}, e.fn.comboq.defaults, e.fn.comboq.parseOptions(this), t),
                    previousValue: null
                });
                var a = s(this);
            }
        });
    };
    e.fn.comboq.methods = {
        options: function(t) {
            return e.data(t[0], "comboq").options;
        },
        panel: function(t) {
            return e(e.hisui.globalContainerSelector);
        },
        textbox: function(e) {
            return e;
        },
        destroy: function(e) {
            return;
        },
        resize: function(e, t) {
            return e.each(function() {
                i(this, t);
            });
        },
        showPanel: function(e) {
            return d(e[0]);
        },
        hidePanel: function(e) {
            return a();
        },
        setDisabled: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        disable: function(e) {
            return e.each(function() {
                l(this, true);
            });
        },
        enable: function(e) {
            return e.each(function() {
                l(this, false);
            });
        },
        readonly: function(t, i) {
            return t.each(function() {
                if (i) {
                    e(this).addClass("readonly");
                } else {
                    e(this).removeClass("readonly");
                }
                e(this).prop("readonly", i);
            });
        },
        isValid: function(e) {
            return e.validatebox("isValid");
        },
        clear: function(e) {
            return e.each(function() {
                n(this);
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e.data(this, "comboq").options;
                if (t.multiple) {
                    e(this).comboq("setValues", t.originalRealValue);
                    e(this).comboq("setText", t.originalValue);
                } else {
                    e(this).comboq("setValue", t.originalRealValue);
                    e(this).comboq("setText", t.originalValue);
                }
            });
        },
        getText: function(e) {
            return e.val();
        },
        setText: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        getValues: function(e) {
            return e.data("value");
        },
        setValues: function(t, i) {
            return t.each(function() {
                if (e.isArray(i) && i.length > 0) o(this, i[0]); else {
                    o(this, "");
                }
            });
        },
        getValue: function(e) {
            return e.data("value");
        },
        setValue: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        },
        createPanelBody: function() {
            var t = e(e.hisui.globalContainerSelector);
            if (t.length) {
                t.empty();
            } else {
                t = e('<div id="' + e.hisui.globalContainerId + '"></div>').appendTo("body");
            }
            return e("<div></div>").appendTo(t);
        }
    };
    e.fn.comboq.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.validatebox.parseOptions(t), e.parser.parseOptions(t, [ "blurValidValue", "width", "height", "separator", "panelAlign", {
            panelWidth: "number",
            editable: "boolean",
            hasDownArrow: "boolean",
            delay: "number",
            selectOnNavigation: "boolean"
        } ]), {
            panelHeight: i.attr("panelHeight") == "auto" ? "auto" : parseInt(i.attr("panelHeight")) || undefined,
            multiple: i.attr("multiple") ? true : undefined,
            disabled: i.attr("disabled") ? true : undefined,
            readonly: i.attr("readonly") ? true : undefined,
            value: i.val() || undefined
        });
    };
    e.fn.comboq.defaults = e.extend({}, e.fn.validatebox.defaults, {
        blurValidValue: false,
        enterNullValueClear: true,
        width: "auto",
        height: 22,
        panelWidth: null,
        panelHeight: 200,
        isCombo: true,
        minQueryLen: 0,
        panelAlign: "left",
        multiple: false,
        selectOnNavigation: true,
        separator: ",",
        editable: true,
        disabled: false,
        readonly: false,
        hasDownArrow: true,
        value: "",
        delay: 200,
        deltaX: 19,
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {},
            query: function(e, t) {}
        },
        onBeforeShowPanel: function() {},
        onShowPanel: function() {},
        onHidePanel: function() {},
        onChange: function(e, t) {}
    });
})(jQuery);

(function(e) {
    function t(t, i) {
        var a = e.data(t, "lookup");
        var n = a.options;
        var r = a.grid;
        if (!r) return;
        var o = r.datagrid("getRows").length;
        if (!o) {
            return;
        }
        var s = n.finder.getTr(r[0], null, "highlight");
        if (!s.length) {
            s = n.finder.getTr(r[0], null, "selected");
        }
        var l;
        if (!s.length) {
            l = i == "next" ? 0 : o - 1;
        } else {
            var l = parseInt(s.attr("datagrid-row-index"));
            l += i == "next" ? 1 : -1;
            if (l < 0) {
                l = o - 1;
            }
            if (l >= o) {
                l = 0;
            }
        }
        r.datagrid("highlightRow", l);
        if (n.selectOnNavigation) {
            a.remainText = false;
            r.datagrid("selectRow", l);
        }
    }
    function i(t, i) {
        var a = e.data(t, "lookup");
        var n = a.options;
        var r = a.grid;
        i = i == "prev" ? "prev" : "next";
        var o = r.datagrid("getPager").find(".l-btn-icon.pagination-" + i);
        if (o.parents(".l-btn-disabled").length == 0) {
            o.click();
        }
    }
    function a(t, i, a) {
        var n = e.data(t, "lookup");
        var r = n.options;
        var o = n.grid;
        var s = [];
        var l = r;
        var d = l.onChange;
        l.onChange = function() {};
        o.datagrid("clearSelections");
        for (var c = 0; c < i.length; c++) {
            s.push(i[c]);
        }
        l.onChange = d;
        if (!a) {
            var f = s.join(r.separator);
            if (e(t).lookup("getText") != f) {
                e(t).lookup("setText", f);
            }
        }
    }
    function n(t, i, n) {
        var o = e.data(t, "lookup");
        var s = o.options;
        var l = o.grid;
        var d = e(t).comboq("panel");
        if (s.isCombo && s.enableNumberEvent) {
            var c = n.keyCode;
            if (r(o) && d.is(":visible")) {
                var f = l.datagrid("getRows");
                if (f && f.length > 0) {
                    var u = -1;
                    if (c <= 57 && c >= 49) {
                        u = c - 49;
                    } else if (c <= 105 && c >= 97) {
                        u = c - 97;
                    }
                    if (u > -1 && f.length > u) {
                        l.datagrid("selectRow", u);
                        return false;
                    }
                }
            }
        }
        o.remainText = true;
        if (s.multiple && !i) {
            a(t, [], true);
        } else {
            a(t, [ i ], true);
        }
        if (s.mode == "remote") {
            l.datagrid("clearSelections");
            l.datagrid("load", e.extend({}, s.queryParams, {
                q: i
            }));
        } else {
            if (!i) {
                return;
            }
            l.datagrid("clearSelections").datagrid("highlightRow", -1);
            var h = l.datagrid("getRows");
            var p = s.multiple ? i.split(s.separator) : [ i ];
            e.map(p, function(i) {
                i = e.trim(i);
                if (i) {
                    e.map(h, function(e, a) {
                        if (i == e[s.textField]) {
                            l.datagrid("selectRow", a);
                        } else {
                            if (s.filter.call(t, i, e)) {
                                l.datagrid("highlightRow", a);
                            }
                        }
                    });
                }
            });
        }
    }
    function r(e) {
        var t = false;
        try {
            if (e.grid && e.grid.datagrid("options").lookup) t = true;
        } catch (i) {}
        return t;
    }
    function o(t, i) {
        var a = e.data(t, "lookup");
        var o = a.options;
        var s = a.grid;
        var l = e(t).comboq("panel");
        if (r(a) && l.is(":visible")) {
            var d = s.datagrid("options").queryParams.q;
            if (d == e(t).lookup("getText")) {
                var c = o.finder.getTr(s[0], null, "highlight");
                if (c.length) {
                    var f = parseInt(c.attr("datagrid-row-index"));
                    s.datagrid("selectRow", f);
                    return;
                }
            }
            n(t, e(t).lookup("getText"), i);
        } else {
            e(t).comboq("hidePanel");
            e(t).comboq("showPanel");
        }
        return;
    }
    function s(e, t, i, a) {
        if (!!i) {
            e._outerHeight(i);
        } else {
            i = e._outerHeight();
        }
        if (!a) {
            a = i;
        }
        var n = e._outerWidth();
        t.datagrid("resize", {
            height: a,
            width: n
        });
    }
    function l(t, i, a) {
        var n = e(t);
        var r = e.data(t, "lookup");
        var o = r.options;
        var s = e(e.hisui.globalContainerSelector);
        if (!s.is(":visible")) return;
        var l = s._outerHeight();
        if (o.panelHeightFix) {
            var d = document.documentElement.clientHeight;
            var c = n.offset();
            var f = c.top - document.documentElement.scrollTop;
            var u = d - f - n._outerHeight();
            if (f > u) {
                l = f;
            } else {
                l = u;
            }
            if (i.datagrid("getPanel").find(".datagrid-view2 .datagrid-btable").eq(0).length > 0) {
                var h = i.datagrid("getPanel").find(".datagrid-view2 .datagrid-btable").eq(0)[0].scrollHeight + a;
                var p = 36 + 18;
                var v = i.datagrid("getPanel").find(".datagrid-view2 .datagrid-body");
                if (v.length > 0 && v[0].scrollWidth != v[0].clientWidth) {
                    p += 18;
                }
                var g = i.datagrid("getPanel").find(".datagrid-pager");
                if (g.length > 0) {
                    p += g._outerHeight();
                }
                if (l > h + p) {
                    l = h + p;
                }
            }
            if (l > o.panelMaxHeight) {
                l = o.panelMaxHeight;
            }
            if (l < o.panelMinHeight) {
                l = o.panelMinHeight;
            }
            l = l - 18;
        }
        return l;
    }
    function d(t, i, a) {
        var n = e(e.hisui.globalContainerSelector);
        if (n.is(":visible")) {
            var r = e.data(t, "lookup");
            var o = r.options;
            if (o.rowSummaryHeight > 0 && n.find(".lookup-rowSummary").length > 0) {
                n.find(".lookup-rowSummary").children().remove();
                e(i).appendTo(e(".lookup-rowSummary"));
            } else {
                n.find(".lookup-rowSummary").remove();
                var d = e('<div class="lookup-rowSummary">' + i + "</div>").appendTo(n);
                if (o.rowSummaryHeight == 0) o.rowSummaryHeight = d._outerHeight();
                e(".lookup-rowSummary").css("height", o.rowSummaryHeight).css("overflow", "auto");
            }
            var c = l(t, a, o.rowSummaryHeight);
            var f = c - o.rowSummaryHeight;
            s(n, a, c, f);
            e.hisui.fixPanelTLWH();
        }
        return;
    }
    function c(t) {
        var i = e.data(t, "lookup");
        var a = i.options;
        if ("function" == typeof a.selectRowRender) {
            a.fit = false;
            a.panelHeightFix = true;
        } else {
            a.fit = true;
        }
        if (!r(i)) {
            var n = e(t).comboq("createPanelBody");
            if (!a.columns && typeof a.columnsLoader == "function") a.columns = a.columnsLoader(t);
            n.datagrid(e.extend({}, a, {
                title: a.gridTitle || "",
                width: 400,
                height: 300,
                rownumbers: true,
                lazy: true,
                border: false,
                singleSelect: !a.multiple,
                onBeforeLoad: function(i) {
                    var r = e(e.hisui.globalContainerSelector);
                    s(r, n);
                    a.onBeforeLoad.apply(t, arguments);
                },
                onLoadSuccess: function(r) {
                    if (i.panel.is(":visible")) {
                        if (a.forceFocus) {
                            e(t).focus();
                        }
                        var o = l(t, n, 0);
                        s(e(e.hisui.globalContainerSelector), n, o, o);
                        n.datagrid("highlightRow", 0);
                    }
                    a.onLoadSuccess.apply(t, arguments);
                },
                onSelect: function(i, n) {
                    var r = a.onChange;
                    a.onChange = function() {};
                    if (n) {
                        e(t).comboq("setText", n[a.textField]);
                        e(t).comboq("setValue", n[a.idField]);
                    }
                    a.onChange = r;
                    if (false !== a.onSelect.call(this, i, n)) {
                        e(t).comboq("hidePanel");
                    }
                },
                onHighlightRow: function(e, i) {
                    if ("function" == typeof a.selectRowRender) {
                        var r = a.selectRowRender.call(this, i);
                        if (typeof r != "string") r = "";
                        d(t, r, n);
                    }
                },
                clickDelay: 200,
                lookup: e(t)
            }));
            i.grid = n;
        }
        if (a.minQueryLen < 0) {
            a.minQueryLen = 0;
        }
        var o = e(t).lookup("getText");
        i.grid.datagrid("load", e.extend({}, a.queryParams, {
            q: o
        }));
    }
    function f(t) {
        var i = e.data(t, "lookup");
        var a = i.options;
        var n = e(t);
        n.addClass("lookup");
        n.comboq(e.extend({}, a, {
            onShowPanel: function() {
                i.panel = e(t).comboq("panel");
                c(t);
                a.onShowPanel.call(t);
            }
        }));
    }
    e.fn.lookup = function(t, i) {
        if (typeof t == "string") {
            var a = e.fn.lookup.methods[t];
            if (a) {
                return a(this, i);
            } else {
                return e(this).comboq(t, i);
            }
        }
        t = t || {};
        t.originalValue = t.value;
        return this.each(function() {
            var i = e.data(this, "lookup");
            if (i) {
                e.extend(i.options, t);
            } else {
                i = e.data(this, "lookup", {
                    options: e.extend({}, e.fn.lookup.defaults, e.fn.lookup.parseOptions(this), t)
                });
                f(this);
            }
        });
    };
    e.fn.lookup.methods = {
        options: function(t) {
            return e.data(t[0], "lookup").options;
        },
        grid: function(t) {
            return e.data(t[0], "lookup").grid;
        },
        clear: function(t) {
            return t.each(function() {
                var t = e.data(this, "lookup");
                if (t) {
                    if (r(t)) e(this).lookup("grid").datagrid("clearSelections");
                    e(this).lookup("setText", "");
                    e(this).lookup("setValue", "");
                }
            });
        }
    };
    e.fn.lookup.parseOptions = function(t) {
        return e.extend({}, e.fn.comboq.parseOptions(t), e.fn.datagrid.parseOptions(t), e.parser.parseOptions(t, [ "idField", "textField", "mode", {
            isCombo: "boolean",
            minQueryLen: "number"
        } ]));
    };
    e.fn.lookup.defaults = e.extend({}, e.fn.comboq.defaults, e.fn.datagrid.defaults, {
        panelHeightFix: false,
        panelMaxHeight: 500,
        panelMinHeight: 160,
        singleRequest: true,
        forceFocus: true,
        fixRowNumber: true,
        loadMsg: null,
        idField: null,
        textField: null,
        mode: "local",
        keyHandler: {
            up: function(e) {
                t(this, "prev");
                e.preventDefault();
            },
            down: function(e) {
                t(this, "next");
                e.preventDefault();
            },
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                o(this, e);
            },
            query: function(e, t) {
                n(this, e, t);
            },
            pageUp: function(e) {
                i(this, "prev");
                e.preventDefault();
            },
            pageDown: function(e) {
                i(this, "next");
                e.preventDefault();
            }
        },
        filter: function(t, i) {
            var a = e(this).lookup("options");
            return i[a.textField].toLowerCase().indexOf(t.toLowerCase()) == 0;
        },
        onShowPanel: function() {},
        onHidePanel: function() {},
        onChange: function(e, t) {},
        panelWidth: 350,
        panelHeight: 200,
        panelAlign: "left",
        selectOnNavigation: false,
        separator: ",",
        isCombo: false,
        minQueryLen: 0,
        queryOnSameQueryString: true,
        enableNumberEvent: false,
        onBeforeShowPanel: function() {},
        selectRowRender: null,
        rowSummaryHeight: 0
    });
})(jQuery);

(function(e) {
    function t(t, i) {
        var a = e.data(t, "keywords").options;
        var n = a.items;
        var r = i.split("-");
        if (r.length == 1) {
            return n[r[0]];
        }
        if (r.length == 2) {
            return n[r[0]].items[r[1]];
        }
        if (r.length == 3) {
            return n[r[0]].items[r[1]].items[r[2]];
        }
    }
    function i(t) {
        var i = e(t).empty();
        var n = e.data(t, "keywords").options;
        if (n.labelCls != "blue") i.addClass("keywords-label" + n.labelCls);
        var r = "";
        e.each(n.items, function(t, i) {
            if (i.type == "chapter") {
                r += '<div class="kw-chapter">';
                if (i.text != "") r += "<a></a>" + (n.notTrans ? i.text : e.hisui.getTrans(i.text));
                r += '</div><div class="kw-line"></div>';
                e.each(i.items, function(a, o) {
                    if (o.type == "section") {
                        r += '<div class="kw-section"><div class="kw-section-header">' + (n.notTrans ? o.text : e.hisui.getTrans(o.text)) + "</div>";
                        if (o.items) {
                            r += '<ul class="kw-section-list keywords">';
                        }
                        e.each(o.items, function(i, o) {
                            var s = 'class="' + (o.selected ? " selected" : "") + (o.disabled ? " disabled" : "") + '"';
                            r += '<li id="' + (o.id || o.text) + '" rowid="' + t + "-" + a + "-" + i + '" ' + s + "><a>" + (n.notTrans ? o.text : e.hisui.getTrans(o.text)) + "</a></li>";
                        });
                        if (o.items) {
                            r += "</ul>";
                        }
                        r += "</div>";
                    } else {
                        if (a == 0) {
                            r += '<ul class="kw-section-list keywords">';
                        }
                        var s = 'class="' + (o.selected ? "selected" : "") + (o.disabled ? " disabled" : "") + '"';
                        r += '<li id="' + (o.id || o.text) + '" rowid="' + t + "-" + a + '" ' + s + "><a>" + (n.notTrans ? o.text : e.hisui.getTrans(o.text)) + "</a></li>";
                        if (a == i.items.length - 1) r += "</ul>";
                    }
                });
            } else if (i.type == "section") {
                r += '<div class="kw-section"><div class="kw-section-header">' + (n.notTrans ? i.text : e.hisui.getTrans(i.text)) + "</div>";
                if (i.items) {
                    r += '<ul class="kw-section-list keywords">';
                }
                e.each(i.items, function(i, a) {
                    var o = 'class="' + (a.selected ? " selected" : "") + (a.disabled ? " disabled" : "") + '"';
                    r += '<li id="' + (a.id || a.text) + '" rowid="' + t + "-" + i + '" ' + o + "><a>" + (n.notTrans ? a.text : e.hisui.getTrans(a.text)) + "</a></li>";
                });
                if (i.items) {
                    r += "</ul>";
                }
                r += "</div>";
            } else {
                if (t == 0) {
                    r += '<ul class="kw-section-list keywords">';
                }
                var a = 'class="' + (i.selected ? " selected" : "") + (i.disabled ? " disabled" : "") + '"';
                r += '<li id="' + (i.id || i.text) + '" rowid="' + t + '" ' + a + "><a>" + (n.notTrans ? i.text : e.hisui.getTrans(i.text)) + "</a></li>";
                if (t == n.items.length - 1) r += "</ul>";
            }
        });
        i.append(r);
        i.off("click").on("click", "ul.kw-section-list>li", function(i, n) {
            if (e(this).hasClass("disabled")) return false;
            var r = e(this).attr("id");
            a(t, r);
            return false;
        });
    }
    e.fn.keywords = function(t, a) {
        if (typeof t == "string") {
            return e.fn.keywords.methods[t](this, a);
        }
        t = t || {};
        return this.each(function() {
            var a = e.data(this, "keywords");
            if (a) {
                e.extend(a.options, t);
            } else {
                e.data(this, "keywords", {
                    options: e.extend({}, e.fn.keywords.defaults, e.fn.keywords.parseOptions(this), t)
                });
            }
            i(this);
        });
    };
    function a(i, a) {
        var n = e(i);
        var r = e.data(i, "keywords").options;
        if (r.singleSelect) {
            n.find("li.selected").removeClass("selected");
        }
        var o = n.find("li#" + a);
        o.toggleClass("selected");
        var s = t(i, o.attr("rowid"));
        r.onClick.call(this, s);
        if (o.hasClass("selected")) {
            r.onSelect.call(this, s);
        }
        if (!r.singleSelect) {
            if (!o.hasClass("selected")) {
                r.onUnselect.call(this, s);
            }
        }
    }
    function n(t) {
        e(t).find("li.selected").removeClass("selected");
    }
    function r(i) {
        var a = [];
        e(i).find("li.selected").each(function() {
            a.push(t(i, e(this).attr("rowid")));
        });
        return a;
    }
    e.fn.keywords.methods = {
        options: function(t) {
            if (t.length > 0) return e.data(t[0], "keywords").options;
            return {};
        },
        getSelected: function(e) {
            if (e.length > 0) return r(e[0]);
            return [];
        },
        select: function(e, t) {
            if (e.length > 0) return a(e[0], t);
        },
        switchById: function(e, t) {
            if (e.length > 0) return a(e[0], t);
        },
        clearAllSelected: function(e, t) {
            e.each(function(e, t) {
                n(t);
            });
        }
    };
    e.fn.keywords.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "id", "iconCls", "iconAlign", "group", "size", {
            plain: "boolean",
            toggle: "boolean",
            selected: "boolean",
            disabled: "boolean"
        } ]), {
            disabled: i.attr("disabled") ? true : undefined
        });
    };
    e.fn.keywords.defaults = {
        singleSelect: false,
        labelCls: "blue",
        onClick: function(e) {},
        onUnselect: function(e) {},
        onSelect: function(e) {},
        notTrans: false
    };
})(jQuery);

(function($) {
    function init(e) {
        $(e).addClass("triggerbox-f").hide();
        var t = $('<span class="triggerbox"></span>').insertAfter(e);
        var i = $('<input type="text" class="triggerbox-text">').appendTo(t);
        $('<span><span class="triggerbox-button"></span></span>').appendTo(t);
        var a = $(e).attr("name");
        if (a) {
            i.attr("name", a);
            $(e).removeAttr("name").attr("triggerboxName", a);
        }
        return t;
    }
    function _3fe(e, t) {
        var i = $.data(e, "triggerbox").options;
        var a = $.data(e, "triggerbox").triggerbox;
        if (t) {
            i.width = t;
        }
        a.appendTo("body");
        if (isNaN(i.width)) {
            i.width = a._outerWidth();
        }
        var n = a.find("span.triggerbox-button");
        if (n && "string" == typeof i.icon) {
            n.addClass(i.icon);
        }
        var r = a.find("input.triggerbox-text");
        a._outerWidth(i.width)._outerHeight(i.height);
        r._outerWidth(a.width() - n._outerWidth());
        r.css({
            height: a.height() + "px",
            lineHeight: a.height() + "px"
        });
        n._outerHeight(a.height());
        a.insertAfter(e);
        if (!i.plain && a.hasClass("triggerbox-plain")) a.removeClass("triggerbox-plain");
        if (i.plain && !a.hasClass("triggerbox-plain")) a.addClass("triggerbox-plain");
    }
    function _409(e) {
        var t = $.data(e, "triggerbox");
        var i = t.options;
        var a = t.triggerbox.find("input.triggerbox-text");
        var n = t.triggerbox.find(".triggerbox-button");
        a.unbind(".triggerbox");
        n.unbind(".triggerbox");
        if (!i.disabled) {
            a.bind("blur.triggerbox", function(e) {
                i.value = $(this).val();
                if (i.value == "") {
                    $(this).val(i.prompt);
                    $(this).addClass("triggerbox-prompt");
                } else {
                    $(this).removeClass("triggerbox-prompt");
                }
            }).bind("focus.triggerbox", function(e) {
                if ($(this).val() != i.value) {
                    $(this).val(i.value);
                }
                $(this).removeClass("triggerbox-prompt");
            });
            n.bind("click.triggerbox", function() {
                i.handler.call(e, i.value, a._propAttr("name"));
            }).bind("mouseenter.triggerbox", function() {
                $(this).addClass("triggerbox-button-hover");
            }).bind("mouseleave.triggerbox", function() {
                $(this).removeClass("triggerbox-button-hover");
            });
        }
    }
    function _40e(e, t) {
        var i = $.data(e, "triggerbox");
        var a = i.options;
        var n = i.triggerbox.find("input.triggerbox-text");
        if (t) {
            a.disabled = true;
            $(e).attr("disabled", true);
            n.attr("disabled", true);
            i.triggerbox.addClass("disabled");
        } else {
            a.disabled = false;
            $(e).removeAttr("disabled");
            n.removeAttr("disabled");
            i.triggerbox.removeClass("disabled");
        }
    }
    function _413(e) {
        var t = $.data(e, "triggerbox");
        var i = t.options;
        var a = t.triggerbox.find("input.triggerbox-text");
        i.originalValue = i.value;
        if (i.value) {
            a.val(i.value);
            a.removeClass("triggerbox-prompt");
        } else {
            a.val(i.prompt);
            a.addClass("triggerbox-prompt");
        }
    }
    $.fn.triggerbox = function(e, t) {
        if (typeof e == "string") {
            return $.fn.triggerbox.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            var t = $.data(this, "triggerbox");
            if (t) {
                $.extend(t.options, e);
            } else {
                var i = $.extend({}, $.fn.triggerbox.parseOptions(this), e);
                if (typeof i.icon == "undefined" && typeof i.plain == "undefined") {
                    i.icon = "icon-trigger-box";
                    i.plain = true;
                }
                t = $.data(this, "triggerbox", {
                    options: $.extend({}, $.fn.triggerbox.defaults, i),
                    triggerbox: init(this)
                });
            }
            _413(this);
            _409(this);
            _40e(this, t.options.disabled);
            _3fe(this);
        });
    };
    $.fn.triggerbox.methods = {
        options: function(e) {
            return $.data(e[0], "triggerbox").options;
        },
        textbox: function(e) {
            return $.data(e[0], "triggerbox").triggerbox.find("input.triggerbox-text");
        },
        getValue: function(e) {
            return $.data(e[0], "triggerbox").options.value;
        },
        setValue: function(e, t) {
            return e.each(function() {
                $(this).triggerbox("options").value = t;
                $(this).triggerbox("textbox").val(t);
                $(this).triggerbox("textbox").blur();
            });
        },
        clear: function(e) {
            return e.each(function() {
                $(this).triggerbox("setValue", "");
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = $(this).triggerbox("options");
                $(this).triggerbox("setValue", e.originalValue);
            });
        },
        getName: function(e) {
            return $.data(e[0], "triggerbox").triggerbox.find("input.triggerbox-text").attr("name");
        },
        destroy: function(e) {
            return e.each(function() {
                $.data(this, "triggerbox").triggerbox.remove();
                $(this).remove();
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                _3fe(this, t);
            });
        },
        disable: function(e) {
            return e.each(function() {
                _40e(this, true);
                _409(this);
            });
        },
        enable: function(e) {
            return e.each(function() {
                _40e(this, false);
                _409(this);
            });
        }
    };
    $.fn.triggerbox.parseOptions = function(_41c) {
        var t = $(_41c);
        var w = t._outerWidth();
        return $.extend({}, $.parser.parseOptions(_41c, [ "width", "height", "prompt", {
            plain: "boolean"
        } ]), {
            width: w,
            value: t.val() || undefined,
            disabled: t.attr("disabled") ? true : undefined,
            handler: t.attr("handler") ? eval(t.attr("handler")) : undefined
        });
    };
    $.fn.triggerbox.defaults = {
        icon: "icon-w-trigger-box",
        width: "auto",
        height: 30,
        prompt: "",
        value: "",
        disabled: false,
        handler: function(e, t) {},
        plain: false
    };
})(jQuery);

(function(e) {
    var t = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
    var i = {
        "19969": "DZ",
        "19975": "WM",
        "19988": "QJ",
        "20048": "YL",
        "20056": "SC",
        "20060": "NM",
        "20094": "QG",
        "20127": "QJ",
        "20167": "QC",
        "20193": "YG",
        "20250": "KH",
        "20256": "ZC",
        "20282": "SC",
        "20285": "QJG",
        "20291": "TD",
        "20314": "YD",
        "20340": "NE",
        "20375": "TD",
        "20389": "YJ",
        "20391": "CZ",
        "20415": "PB",
        "20446": "YS",
        "20447": "SQ",
        "20504": "TC",
        "20608": "KG",
        "20854": "QJ",
        "20857": "ZC",
        "20911": "PF",
        "20504": "TC",
        "20608": "KG",
        "20854": "QJ",
        "20857": "ZC",
        "20911": "PF",
        "20985": "AW",
        "21032": "PB",
        "21048": "XQ",
        "21049": "SC",
        "21089": "YS",
        "21119": "JC",
        "21242": "SB",
        "21273": "SC",
        "21305": "YP",
        "21306": "QO",
        "21330": "ZC",
        "21333": "SDC",
        "21345": "QK",
        "21378": "CA",
        "21397": "SC",
        "21414": "XS",
        "21442": "SC",
        "21477": "JG",
        "21480": "TD",
        "21484": "ZS",
        "21494": "YX",
        "21505": "YX",
        "21512": "HG",
        "21523": "XH",
        "21537": "PB",
        "21542": "PF",
        "21549": "KH",
        "21571": "E",
        "21574": "DA",
        "21588": "TD",
        "21589": "O",
        "21618": "ZC",
        "21621": "KHA",
        "21632": "ZJ",
        "21654": "KG",
        "21679": "LKG",
        "21683": "KH",
        "21710": "A",
        "21719": "YH",
        "21734": "WOE",
        "21769": "A",
        "21780": "WN",
        "21804": "XH",
        "21834": "A",
        "21899": "ZD",
        "21903": "RN",
        "21908": "WO",
        "21939": "ZC",
        "21956": "SA",
        "21964": "YA",
        "21970": "TD",
        "22003": "A",
        "22031": "JG",
        "22040": "XS",
        "22060": "ZC",
        "22066": "ZC",
        "22079": "MH",
        "22129": "XJ",
        "22179": "XA",
        "22237": "NJ",
        "22244": "TD",
        "22280": "JQ",
        "22300": "YH",
        "22313": "XW",
        "22331": "YQ",
        "22343": "YJ",
        "22351": "PH",
        "22395": "DC",
        "22412": "TD",
        "22484": "PB",
        "22500": "PB",
        "22534": "ZD",
        "22549": "DH",
        "22561": "PB",
        "22612": "TD",
        "22771": "KQ",
        "22831": "HB",
        "22841": "JG",
        "22855": "QJ",
        "22865": "XQ",
        "23013": "ML",
        "23081": "MW",
        "23487": "SX",
        "23558": "QJ",
        "23561": "YW",
        "23586": "YW",
        "23614": "YW",
        "23615": "SN",
        "23631": "PB",
        "23646": "ZS",
        "23663": "ZT",
        "23673": "YG",
        "23762": "TD",
        "23769": "ZS",
        "23780": "QJ",
        "23884": "QK",
        "24055": "XH",
        "24113": "DC",
        "24162": "ZC",
        "24191": "GA",
        "24273": "QJ",
        "24324": "NL",
        "24377": "TD",
        "24378": "QJ",
        "24439": "PF",
        "24554": "ZS",
        "24683": "TD",
        "24694": "WE",
        "24733": "LK",
        "24925": "TN",
        "25094": "ZG",
        "25100": "XQ",
        "25103": "XH",
        "25153": "PB",
        "25170": "PB",
        "25179": "KG",
        "25203": "PB",
        "25240": "ZS",
        "25282": "FB",
        "25303": "NA",
        "25324": "KG",
        "25341": "ZY",
        "25373": "WZ",
        "25375": "XJ",
        "25384": "A",
        "25457": "A",
        "25528": "SD",
        "25530": "SC",
        "25552": "TD",
        "25774": "ZC",
        "25874": "ZC",
        "26044": "YW",
        "26080": "WM",
        "26292": "PB",
        "26333": "PB",
        "26355": "ZY",
        "26366": "CZ",
        "26397": "ZC",
        "26399": "QJ",
        "26415": "ZS",
        "26451": "SB",
        "26526": "ZC",
        "26552": "JG",
        "26561": "TD",
        "26588": "JG",
        "26597": "CZ",
        "26629": "ZS",
        "26638": "YL",
        "26646": "XQ",
        "26653": "KG",
        "26657": "XJ",
        "26727": "HG",
        "26894": "ZC",
        "26937": "ZS",
        "26946": "ZC",
        "26999": "KJ",
        "27099": "KJ",
        "27449": "YQ",
        "27481": "XS",
        "27542": "ZS",
        "27663": "ZS",
        "27748": "TS",
        "27784": "SC",
        "27788": "ZD",
        "27795": "TD",
        "27812": "O",
        "27850": "PB",
        "27852": "MB",
        "27895": "SL",
        "27898": "PL",
        "27973": "QJ",
        "27981": "KH",
        "27986": "HX",
        "27994": "XJ",
        "28044": "YC",
        "28065": "WG",
        "28177": "SM",
        "28267": "QJ",
        "28291": "KH",
        "28337": "ZQ",
        "28463": "TL",
        "28548": "DC",
        "28601": "TD",
        "28689": "PB",
        "28805": "JG",
        "28820": "QG",
        "28846": "PB",
        "28952": "TD",
        "28975": "ZC",
        "29100": "A",
        "29325": "QJ",
        "29575": "SL",
        "29602": "FB",
        "30010": "TD",
        "30044": "CX",
        "30058": "PF",
        "30091": "YSP",
        "30111": "YN",
        "30229": "XJ",
        "30427": "SC",
        "30465": "SX",
        "30631": "YQ",
        "30655": "QJ",
        "30684": "QJG",
        "30707": "SD",
        "30729": "XH",
        "30796": "LG",
        "30917": "PB",
        "31074": "NM",
        "31085": "JZ",
        "31109": "SC",
        "31181": "ZC",
        "31192": "MLB",
        "31293": "JQ",
        "31400": "YX",
        "31584": "YJ",
        "31896": "ZN",
        "31909": "ZY",
        "31995": "XJ",
        "32321": "PF",
        "32327": "ZY",
        "32418": "HG",
        "32420": "XQ",
        "32421": "HG",
        "32438": "LG",
        "32473": "GJ",
        "32488": "TD",
        "32521": "QJ",
        "32527": "PB",
        "32562": "ZSQ",
        "32564": "JZ",
        "32735": "ZD",
        "32793": "PB",
        "33071": "PF",
        "33098": "XL",
        "33100": "YA",
        "33152": "PB",
        "33261": "CX",
        "33324": "BP",
        "33333": "TD",
        "33406": "YA",
        "33426": "WM",
        "33432": "PB",
        "33445": "JG",
        "33486": "ZN",
        "33493": "TS",
        "33507": "QJ",
        "33540": "QJ",
        "33544": "ZC",
        "33564": "XQ",
        "33617": "YT",
        "33632": "QJ",
        "33636": "XH",
        "33637": "YX",
        "33694": "WG",
        "33705": "PF",
        "33728": "YW",
        "33882": "SR",
        "34067": "WM",
        "34074": "YW",
        "34121": "QJ",
        "34255": "ZC",
        "34259": "XL",
        "34425": "JH",
        "34430": "XH",
        "34485": "KH",
        "34503": "YS",
        "34532": "HG",
        "34552": "XS",
        "34558": "YE",
        "34593": "ZL",
        "34660": "YQ",
        "34892": "XH",
        "34928": "SC",
        "34999": "QJ",
        "35048": "PB",
        "35059": "SC",
        "35098": "ZC",
        "35203": "TQ",
        "35265": "JX",
        "35299": "JX",
        "35782": "SZ",
        "35828": "YS",
        "35830": "E",
        "35843": "TD",
        "35895": "YG",
        "35977": "MH",
        "36158": "JG",
        "36228": "QJ",
        "36426": "XQ",
        "36466": "DC",
        "36710": "JC",
        "36711": "ZYG",
        "36767": "PB",
        "36866": "SK",
        "36951": "YW",
        "37034": "YX",
        "37063": "XH",
        "37218": "ZC",
        "37325": "ZC",
        "38063": "PB",
        "38079": "TD",
        "38085": "QY",
        "38107": "DC",
        "38116": "TD",
        "38123": "YD",
        "38224": "HG",
        "38241": "XTC",
        "38271": "ZC",
        "38415": "YE",
        "38426": "KH",
        "38461": "YD",
        "38463": "AE",
        "38466": "PB",
        "38477": "XJ",
        "38518": "YT",
        "38551": "WK",
        "38585": "ZC",
        "38704": "XS",
        "38739": "LJ",
        "38761": "GJ",
        "38808": "SQ",
        "39048": "JG",
        "39049": "XJ",
        "39052": "HG",
        "39076": "CZ",
        "39271": "XT",
        "39534": "TD",
        "39552": "TD",
        "39584": "PB",
        "39647": "SB",
        "39730": "LG",
        "39748": "TPB",
        "40109": "ZQ",
        "40479": "ND",
        "40516": "HG",
        "40536": "HG",
        "40583": "QJ",
        "40765": "YQ",
        "40784": "QJ",
        "40840": "YK",
        "40863": "QJG"
    };
    function a(e) {
        if (typeof e != "string") throw new Error(-1, "makePy parameter type must 'string'!");
        var t = new Array();
        for (var i = 0, a = e.length; i < a; i++) {
            var o = e.charAt(i);
            t.push(n(o));
        }
        return r(t);
    }
    function n(e) {
        var a = e.charCodeAt(0);
        if (a > 40869 || a < 19968) return e;
        return i[a] ? i[a] : t.charAt(a - 19968);
    }
    function r(e) {
        var t = [ "" ];
        for (var i = 0, a = e.length; i < a; i++) {
            var n = e[i];
            var r = n.length;
            if (r == 1) {
                for (var o = 0; o < t.length; o++) {
                    t[o] += n;
                }
            } else {
                var s = t.slice(0);
                t = [];
                for (o = 0; o < r; o++) {
                    var l = s.slice(0);
                    for (var d = 0; d < l.length; d++) {
                        l[d] += n.charAt(o);
                    }
                    t = t.concat(l);
                }
            }
        }
        return t;
    }
    function o(t) {
        var i = e.trim(t);
        if (i != "") {
            var n = a(i);
            return n[0];
        } else {
            return "";
        }
    }
    e.hisui.toChineseSpell = o;
    e.hisui.getChineseSpellArray = a;
})(jQuery);

(function(e) {
    e.extend(e.fn.combobox.defaults, {
        defaultFilter: 1,
        filter: function(t, i) {
            var a = e(this).combobox("options");
            var n = i[a.textField] || "", r = n.toLowerCase();
            var o = t.toLowerCase();
            var s = a.defaultFilter || 1;
            if (s == 3 || s == 4) s += 2;
            var l = s % 2 == 1;
            var d = r.indexOf(o);
            if (d == 0) return true;
            if (d > -1 && !l) return true;
            if (s >= 3 && s <= 6) {
                if (a.spellField) {
                    var c = i[a.spellField] || "", f = c.toLowerCase();
                    var u = f.indexOf(o);
                    return u == 0 || u > -1 && !l;
                } else {
                    var h = e.hisui.getChineseSpellArray(n);
                    var p = h.length;
                    if (s <= 4) p = Math.min(p, 1);
                    var v = false;
                    for (var g = 0; g < p; g++) {
                        var f = (h[g] || "").toLowerCase();
                        var u = f.indexOf(o);
                        if (u == 0 || u > -1 && !l) {
                            v = true;
                            break;
                        }
                    }
                    return v;
                }
            } else {
                return false;
            }
        }
    });
})(jQuery);

(function(e) {
    function t(t) {
        var a = e.data(t, "dateboxq");
        var n = a.options;
        var r = e(t);
        if (n.format) {
            n.formatter = function(e) {
                var t = e.getFullYear();
                var i = e.getMonth() + 1;
                var a = e.getDate();
                i = i < 10 ? "0" + i : i;
                a = a < 10 ? "0" + a : a;
                return n.format.replace("yyyy", t).replace("MM", i).replace("dd", a);
            };
        }
        r.comboq(e.extend({}, n, {
            onShowPanel: function() {
                a.panel = e(t).comboq("panel");
                i(t);
                n.onShowPanel.call(t);
            }
        }));
        r.addClass("dateboxq");
        return;
    }
    function i(t) {
        var i = e(t);
        var a = e.data(t, "dateboxq");
        var n = a.options;
        var r = e(t).comboq("getText");
        var s = n.parser.call(t, r);
        if (n.minDate != null || n.maxDate != null) {
            e(t).dateboxq("calendar").options.validator = function(i, a) {
                var n = e.data(t, "dateboxq");
                var r = n.options;
                var o = true;
                if (null != r.minDate) {
                    if (a) a[0] = r.minDate;
                    var s = r.parser.call(t, r.minDate);
                    if (s > i) o = false;
                }
                if (null != r.maxDate) {
                    if (a) a[1] = r.maxDate;
                    var l = r.parser.call(t, r.maxDate);
                    if (l < i) o = false;
                }
                return o;
            };
        }
        var l = e.extend({
            current: s,
            border: false,
            onSelect: function(i) {
                var a = e(t).dateboxq("options");
                o(t, a.formatter.call(t, i));
                e(t).comboq("hidePanel");
            }
        }, e(t).dateboxq("calendar").calendar("options"));
        var d = e(t).comboq("panel");
        var c = e(t).comboq("createPanelBody");
        c.calendar(l);
        var f = e('<div class="datebox-button"><table cellspacing="0" cellpadding="0" style="width:100%"><tr></tr></table></div>').appendTo(d);
        var u = f.find("tr");
        for (var h = 0; h < n.buttons.length; h++) {
            var p = e("<td></td>").appendTo(u);
            var v = n.buttons[h];
            var g = e('<a href="javascript:void(0)" onclick="javascript:return false;"></a>').html(e.isFunction(v.text) ? v.text(t) : v.text).appendTo(p);
            g.bind("click", {
                target: t,
                handler: v.handler
            }, function(e) {
                e.data.handler.call(this, e.data.target);
            });
        }
        u.find("td").css("width", 100 / n.buttons.length + "%");
        return;
    }
    function a(t, i) {
        i = i === undefined ? true : i;
        var a = e.data(t, "dateboxq");
        var n = a.options;
        var r = e(t).val();
        if (r) {
            o(t, n.formatter.call(t, n.parser.call(t, r)));
            if (i) e(t).comboq("hidePanel");
        }
    }
    function n(t) {
        if (e(t).validatebox("isValid")) {
            a(t, false);
        }
    }
    function r(t) {
        return e(t).val();
    }
    function o(t, i, a) {
        var n = e.data(t, "dateboxq");
        var r = n.options;
        var o = e(t).val();
        if (o != i) {
            r.onChange.call(t, i, o);
        }
        e(t).val(i);
        if (e(t).validatebox("isValid")) {
            r.onSelect.call(t, r.parser.call(t, i));
        }
    }
    e.fn.dateboxq = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.dateboxq.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.comboq(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "dateboxq");
            if (a) {
                e.extend(a.options, i);
            } else {
                var n = this;
                e.data(this, "dateboxq", {
                    calendar: {
                        options: {
                            validator: e.fn.calendar.defaults.validator
                        },
                        calendar: function(t) {
                            if (typeof t == "string") {
                                if (t == "options") return e.data(n, "dateboxq").calendar.options;
                            } else {
                                e.extend(e.data(n, "dateboxq").calendar.options, t);
                            }
                        }
                    },
                    options: e.extend({}, e.fn.dateboxq.defaults, e.fn.dateboxq.parseOptions(this), i)
                });
                e(this).css({
                    imeMode: "disabled"
                });
            }
            t(this);
        });
    };
    e.fn.dateboxq.methods = {
        options: function(t) {
            return e.data(t[0], "dateboxq").options;
        },
        setValue: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        },
        getValue: function(e) {
            return r(e[0]);
        },
        calendar: function(t) {
            return e.data(t[0], "dateboxq").calendar;
        }
    };
    e.fn.dateboxq.parseOptions = function(t) {
        return e.extend({}, e.fn.comboq.parseOptions(t), e.parser.parseOptions(t, [ "format" ]));
    };
    e.fn.dateboxq.defaults = e.extend({}, e.fn.comboq.defaults, {
        panelWidth: 180,
        panelHeight: 202,
        parser: e.fn.datebox.defaults.parser,
        formatter: e.fn.datebox.defaults.formatter,
        currentText: e.fn.datebox.defaults.currentText,
        closeText: e.fn.datebox.defaults.closeText,
        okText: e.fn.datebox.defaults.okText,
        buttons: [ {
            text: function(t) {
                return e(t).dateboxq("options").currentText;
            },
            handler: function(t) {
                e(t).val("t");
                a(t);
            }
        }, {
            text: function(t) {
                return e(t).dateboxq("options").closeText;
            },
            handler: function(t) {
                e(t).comboq("hidePanel");
            }
        } ],
        onBlur: function(e) {
            n(e);
        },
        onSelect: function(e) {},
        onChange: function(e, t) {},
        onDblClick: function(e) {},
        validType: {
            datebox: typeof dtformat == "undefined" ? "" : dtformat,
            minMaxDate: [ null, null ]
        },
        minDate: typeof dtformat == "undefined" ? null : dtformat == "YMD" ? "1841-01-01" : null,
        maxDate: null,
        format: ""
    });
})(jQuery);

(function(e) {
    function t(t) {
        var i = e.data(t, "datetimeboxq");
        var a = i.options;
        e(t).val(a.value);
        e(t).dateboxq(e.extend({}, a, {
            onShowPanel: function() {
                var i = e(t).datetimeboxq("getValue");
                r(t, i, true);
                a.onShowPanel.call(t);
            }
        }));
        e(t).removeClass("dateboxq-f").addClass("datetimeboxq-f");
        e(t).dateboxq("calendar").calendar({
            onSelect: function(e) {
                a.onSelect.call(t, e);
            },
            onDblClick: function(i) {
                var n = e(t).datetimeboxq("options").buttons;
                if (n.length > 1 && n[1].handler) n[1].handler.call(this, t);
                a.onDblClick.call(t, i);
            }
        });
    }
    function i(e, t, i) {}
    function a(t, i) {
        i.onHidePanel.call(this, t);
        e(e.hisui.globalContainerSelector).hide();
    }
    function n(t, i) {
        i = i === undefined ? true : i;
        var n = e.data(t, "datetimeboxq");
        var r = n.options;
        var s = e(t).val();
        if (s) {
            o(t, r.formatter.call(t, r.parser.call(t, s)));
            if (i) a(t, r);
        }
    }
    function r(t) {
        var i = e(t);
        var a = e(e.hisui.globalContainerSelector);
        var n = e.data(t, "datetimeboxq").options;
        var r = i.val();
        var o = new Date();
        var s = o.getHours();
        var l = o.getMinutes();
        var d = o.getSeconds();
        var c = r.split(" ");
        function f(e) {
            return (e < 10 ? "0" : "") + e;
        }
        if (c.length == 1) {
            timeval = f(s) + ":" + f(l) + ":" + f(d);
        } else {
            timeval = c[1];
        }
        var u = n.parser.call(t, r);
        var h = e('<div style="padding:2px"><input style="width:100px;height:24px"></div>').insertAfter(a.children("div.calendar"));
        var p = h.children("input");
        p.timespinner({
            showSeconds: n.showSeconds,
            separator: ":"
        }).unbind(".datetimeboxq").bind("mousedown.datetimeboxq", function(e) {
            e.stopPropagation();
        });
        p.timespinner("setValue", timeval);
    }
    function o(t, i, a) {
        var n = e.data(t, "datetimeboxq");
        var r = n.options;
        var o = e(t).val();
        if (o != i) {
            r.onChange.call(t, i, o);
        }
        e(t).val(i);
        if (e(t).validatebox("isValid")) {
            r.onSelect.call(t, r.parser.call(t, i));
        }
    }
    function s(t) {
        var i = e(e.hisui.globalContainerSelector);
        var a = i.children("div.calendar").calendar("options").current;
        var n = i.find("input.spinner-f");
        return new Date(a.getFullYear(), a.getMonth(), a.getDate(), n.timespinner("getHours"), n.timespinner("getMinutes"), n.timespinner("getSeconds"));
    }
    e.fn.datetimeboxq = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.datetimeboxq.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.dateboxq(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "datetimeboxq");
            if (a) {
                e.extend(a.options, i);
            } else {
                var n = this;
                e.data(this, "datetimeboxq", {
                    spinner: {
                        options: e.fn.timespinner.defaults.options,
                        timespinner: function(t) {
                            if (typeof t == "string") {
                                if (t == "options") return e.data(n, "datetimeboxq").spinner.options;
                            } else {
                                e.data(n, "datetimeboxq").spinner.options = t;
                            }
                        }
                    },
                    options: e.extend({}, e.fn.datetimeboxq.defaults, e.fn.datetimeboxq.parseOptions(this), i)
                });
            }
            t(this);
        });
    };
    e.fn.datetimeboxq.methods = {
        options: function(t) {
            var i = t.dateboxq("options");
            return e.extend(e.data(t[0], "datetimeboxq").options, {
                originalValue: i.originalValue,
                disabled: i.disabled,
                readonly: i.readonly
            });
        },
        spinner: function(t) {
            return e.data(t[0], "datetimeboxq").spinner;
        },
        setValue: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        },
        reset: function(t) {
            return t.each(function() {
                var t = e(this).datetimeboxq("options");
                e(this).datetimeboxq("setValue", t.originalValue);
            });
        }
    };
    e.fn.datetimeboxq.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.fn.dateboxq.parseOptions(t), e.parser.parseOptions(t, [ {
            showSeconds: "boolean"
        } ]));
    };
    e.fn.datetimeboxq.defaults = e.extend({}, e.fn.dateboxq.defaults, {
        showSeconds: true,
        panelHeight: 232,
        buttons: [ {
            text: function(t) {
                return e(t).dateboxq("options").currentText;
            },
            handler: function(t) {
                var i = e(t).dateboxq("options").formatter.call(t, new Date());
                e(t).val(i);
                n(t, true);
            }
        }, {
            text: function(t) {
                return e(t).dateboxq("options").okText;
            },
            handler: function(t) {
                var i = s(t);
                var a = e.data(t, "datetimeboxq");
                var r = a.options.formatter.call(t, i);
                e(t).val(r);
                n(t, true);
            }
        }, {
            text: function(t) {
                return e(t).dateboxq("options").closeText;
            },
            handler: function(t) {
                a(t, e(t).datetimeboxq("options"));
            }
        } ],
        formatter: function(t) {
            var i = t.getHours();
            var a = t.getMinutes();
            var n = t.getSeconds();
            function r(e) {
                return (e < 10 ? "0" : "") + e;
            }
            var o = ":";
            var s = e.fn.dateboxq.defaults.formatter(t) + " " + r(i) + o + r(a);
            if (e(this).datetimeboxq("options").showSeconds) {
                s += o + r(n);
            }
            return s;
        },
        parser: function(t) {
            if (e.trim(t) == "") {
                return new Date();
            }
            var i = t.split(" ");
            var a = e.fn.dateboxq.defaults.parser(i[0]);
            if (i.length < 2) {
                return a;
            }
            var n = ":";
            var r = i[1].split(n);
            var o = parseInt(r[0], 10) || 0;
            var s = parseInt(r[1], 10) || 0;
            var l = parseInt(r[2], 10) || 0;
            return new Date(a.getFullYear(), a.getMonth(), a.getDate(), o, s, l);
        },
        onHidePanel: function() {},
        rules: {},
        onBlur: function(e) {}
    });
})(jQuery);

(function(e) {
    var t = "<div class='hstep-container'>" + "<ul class='hstep-container-steps'>" + "</ul>" + "<div class='hstep-progress'>" + "<p class='hstep-progress-bar'>" + "<span class='hstep-progress-highlight' style='width:0%'>" + "</span>" + "</p>" + "</div>" + "</div>";
    var i = "<li class='hstep-step undone'></li>";
    function a(t) {
        var i = n(t) - 1;
        var a = e.data(t, "hstep");
        var r = a.options;
        if (i > 0) return r.items[i - 1];
        return {};
    }
    function n(t) {
        var i = e(t).find(".active").attr("ind");
        return i;
    }
    function r(t, i, a) {
        var r = e(t).find(".hstep-container").find("li");
        var o = e(t).find(".hstep-container").find(".hstep-progress-highlight");
        var s = n(t);
        a = a || 0;
        if (a !== 0) i = parseInt(s) + parseInt(a);
        if (1 <= i && i <= r.length) {
            var l = "%";
            l = Math.round((i - 1) * 100 / (r.length - 1)) + l;
            o.animate({
                width: l
            }, {
                speed: 1e3,
                done: function() {
                    r.each(function(t, a) {
                        var n = e(a);
                        var r = t + 1;
                        if (r < i) {
                            n.attr("class", "done");
                        } else if (r === i) {
                            n.attr("class", "active");
                        } else if (r > i) {
                            n.attr("class", "undone");
                        }
                    });
                }
            });
        }
    }
    function o(e, t) {
        var i = e.find("li").length - 1, a = i * t + t + "px", n = i * t + "px";
        e.css({
            width: a
        });
        e.find(".hstep-progress").css({
            width: n
        });
        e.find(".hstep-progress-bar").css({
            width: n
        });
    }
    function s(a) {
        var n = e.data(a, "hstep");
        var s = n.options;
        var l = e(t), d = e(i), c = l.find(".hstep-container-steps"), f = 0, u = e(a);
        u.addClass("hstep");
        l.addClass("hstep-lg");
        var h = s.items;
        f = h.length;
        for (var p = 0; p < f; p++) {
            var v = h[p];
            d.css("width", s.stepWidth).attr("ind", 1 + parseInt(p)).text(v.title).append('<div class="cnode">' + (s.showNumber ? p + 1 : "") + "</div>");
            if (v.context) d.append(v.context);
            c.append(d);
            d = e(i);
        }
        o(l, s.stepWidth);
        u.append(l);
        r(a, s.currentInd);
        e(a).unbind(".hstep").bind("click.hstep", function(t) {
            var i = e(t.target).closest("li");
            i.closest(".hstep-container-steps").children("li").removeClass("hover");
            i.addClass("hover");
            if (i.length > 0 && s.onSelect) {
                var a = s.items[i.attr("ind") - 1];
                a.state = i.hasClass("done") ? "done" : i.hasClass("active") ? "active" : "undone";
                s.onSelect.call(this, i.attr("ind"), a);
            }
        });
    }
    e.fn.hstep = function(t, i) {
        if (typeof t == "string") {
            return e.fn.hstep.methods[t](this, i);
        }
        t = t || {};
        return this.each(function() {
            var i = e.data(this, "hstep");
            if (i) {
                e.extend(i.options, t);
            } else {
                e.data(this, "hstep", {
                    options: e.extend({}, e.fn.hstep.defaults, e.fn.hstep.parseOptions(this), t)
                });
            }
            s(this);
        });
    };
    e.fn.hstep.methods = {
        options: function(t) {
            return e.data(t[0], "hstep").options;
        },
        destroy: function(e) {
            return e.each(function() {});
        },
        setStep: function(e, t, i) {
            return e.each(function() {
                r(this, t, i);
            });
        },
        nextStep: function(e) {
            return e.each(function() {
                r(this, undefined, 1);
            });
        },
        prevStep: function(e) {
            return e.each(function() {
                r(this, undefined, -1);
            });
        },
        getStep: function(e) {
            if (e.length > 0) return a(e[0]);
            return {};
        }
    };
    e.fn.hstep.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "showNumber", "stepWidth", "titlePostion" ]));
    };
    e.fn.hstep.defaults = {
        currentInd: 1,
        showNumber: false,
        stepWidth: 100,
        titlePostion: "top",
        items: [],
        onSelect: null
    };
})(jQuery);

(function(e) {
    var t = "<div class='vstep-container'>" + "<ul class='vstep-container-steps'>" + "</ul>" + "<div class='vstep-progress'>" + "<p class='vstep-progress-bar'>" + "<span class='vstep-progress-highlight' style='height:0%'>" + "</span>" + "</p>" + "</div>" + "</div>";
    var i = "<li class='vstep-step undone'></li>";
    function a(t) {
        var i = n(t) - 1;
        var a = e.data(t, "vstep");
        var r = a.options;
        if (i > 0) return r.items[i - 1];
        return {};
    }
    function n(t) {
        var i = e(t).find(".active").attr("ind");
        return i;
    }
    function r(t, i, a) {
        var r = e(t).find(".vstep-container").find("li");
        var o = e(t).find(".vstep-container").find(".vstep-progress-highlight");
        var s = n(t);
        a = a || 0;
        if (a !== 0) i = parseInt(s) + parseInt(a);
        if (1 <= i && i <= r.length) {
            var l = "%";
            l = Math.round((i - 1) * 100 / (r.length - 1)) + l;
            o.animate({
                height: l
            }, {
                speed: 1e3,
                done: function() {
                    r.each(function(t, a) {
                        var n = e(a);
                        var r = t + 1;
                        if (r < i) {
                            n.attr("class", "done");
                        } else if (r === i) {
                            n.attr("class", "active");
                        } else if (r > i) {
                            n.attr("class", "undone");
                        }
                    });
                }
            });
        }
    }
    function o(e, t) {
        var i = e.find("li").length - 1, a = i * t + t + "px", n = i * t + "px";
        e.css({
            height: a
        });
        e.find(".vstep-progress").css({
            height: n
        });
        e.find(".vstep-progress-bar").css({
            height: n
        });
    }
    function s(a) {
        var n = e.data(a, "vstep");
        var s = n.options;
        var l = e(t), d = e(i), c = l.find(".vstep-container-steps"), f = 0, u = e(a);
        u.addClass("vstep");
        l.addClass("vstep-lg").width(u.width());
        var h = s.items;
        f = h.length;
        for (var p = 0; p < f; p++) {
            var v = h[p];
            d.css("height", s.stepHeight).attr("ind", 1 + parseInt(p)).append('<div class="cnode">' + (s.showNumber ? p + 1 : "") + "</div>").append('<span class="title">' + v.title + "</span>");
            if (v.context) d.append(v.context);
            c.append(d);
            d = e(i);
        }
        o(l, s.stepHeight);
        u.append(l);
        r(a, s.currentInd);
        e(a).unbind(".vstep").bind("click.vstep", function(t) {
            var i = e(t.target).closest("li");
            i.closest(".vstep-container-steps").children("li").removeClass("hover");
            i.addClass("hover");
            if (i.length > 0 && s.onSelect) {
                var a = s.items[i.attr("ind") - 1];
                a.state = i.hasClass("done") ? "done" : i.hasClass("active") ? "active" : "undone";
                s.onSelect.call(this, i.attr("ind"), a);
            }
        });
    }
    e.fn.vstep = function(t, i) {
        if (typeof t == "string") {
            return e.fn.vstep.methods[t](this, i);
        }
        t = t || {};
        return this.each(function() {
            var i = e.data(this, "vstep");
            if (i) {
                e.extend(i.options, t);
            } else {
                e.data(this, "vstep", {
                    options: e.extend({}, e.fn.vstep.defaults, e.fn.vstep.parseOptions(this), t)
                });
            }
            s(this);
        });
    };
    e.fn.vstep.methods = {
        options: function(t) {
            return e.data(t[0], "vstep").options;
        },
        destroy: function(e) {
            return e.each(function() {});
        },
        setStep: function(e, t, i) {
            return e.each(function() {
                r(this, t, i);
            });
        },
        nextStep: function(e) {
            return e.each(function() {
                r(this, undefined, 1);
            });
        },
        prevStep: function(e) {
            return e.each(function() {
                r(this, undefined, -1);
            });
        },
        getStep: function(e) {
            if (e.length > 0) return a(e[0]);
            return {};
        }
    };
    e.fn.vstep.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "showNumber", "stepHeight", "titlePostion" ]));
    };
    e.fn.vstep.defaults = {
        currentInd: 1,
        showNumber: false,
        stepHeight: 60,
        titlePostion: "top",
        items: [],
        onSelect: null
    };
})(jQuery);

(function(e) {
    function t(t, i) {
        var a = e.data(t, "timeboxq");
        var r = a.options;
        var o = e(t).val();
        if (o) {
            n(t, r.formatter.call(t, r.parser.call(t, o)));
        }
    }
    function i(i) {
        if (e(i).validatebox("isValid")) {
            t(i, false);
        }
    }
    function a(t) {
        return e(t).val();
    }
    function n(t, i, a) {
        var n = e.data(t, "timeboxq");
        var r = n.options;
        var o = e(t).val();
        if (o != i || r.valueDirty) {
            r.onChange.call(t, i, o);
        }
        e(t).val(i);
        r.valueDirty = 0;
        if (e(t).validatebox("isValid")) {
            r.onSelect.call(t, i);
        }
    }
    e.fn.timeboxq = function(t, i) {
        if (typeof t == "string") {
            var a = e.fn.timeboxq.methods[t];
            if (a) {
                return a(this, i);
            } else {
                return this.validatebox(t, i);
            }
        }
        t = t || {};
        if ("object" == typeof t.validType) {
            if (e.isArray(t.validType)) {
                t.validType.push("timeboxq");
            }
        }
        return this.each(function() {
            var i = e.data(this, "timeboxq");
            var a;
            var n = this;
            if (i) {
                e.extend(i.options, t);
                a = i.options;
            } else {
                e.data(this, "timeboxq", {
                    options: e.extend({}, e.fn.timeboxq.defaults, e.fn.timeboxq.parseOptions(this), t)
                });
                a = e.data(this, "timeboxq").options;
                if (a.minTime != null) {
                    a.validType.minMaxTime[0] = a.formatter.call(this, a.parser.call(this, a.minTime));
                }
                if (a.maxTime != null) {
                    a.validType.minMaxTime[1] = a.formatter.call(this, a.parser.call(this, a.maxTime));
                }
            }
            e(n).validatebox(a);
            e(n).css({
                imeMode: "disabled"
            }).addClass("timeboxq").off("blur.timeboxq").on("blur.timeboxq", function() {
                if (a.onBlur) a.onBlur.call(this, n);
            }).unbind("keydown.timeboxq").bind("keydown.timeboxq", function(e) {
                if ("undefined" == typeof e.keyCode) {
                    return;
                }
                switch (e.keyCode) {
                  case 38:
                    a.keyHandler.up.call(n, e);
                    break;

                  case 40:
                    a.keyHandler.down.call(n, e);
                    break;

                  case 13:
                    e.preventDefault();
                    a.keyHandler.enter.call(n, e);
                    break;

                  default:
                    ;
                }
            }).unbind("input.timeboxq").bind("change.timeboxq", function(e) {
                a.valueDirty = 1;
            });
        });
    };
    function r(t) {
        var i = e.data(this, "timeboxq").options;
        var a = i.timeFormat;
        if (t.indexOf(":") == -1) {
            if (isNaN(t.charAt(0))) {
                t = s(t, a);
            } else {
                t = l(t, a);
            }
        }
        if (t.indexOf(":") > -1) {
            var n = new Date();
            var r = t.split(":");
            var o = r[0];
            var d = r[1];
            var c = r.length > 2 ? r[2] : 0;
            n.setHours(o);
            n.setMinutes(d);
            n.setSeconds(c);
            return n.getTime();
        }
        return t;
    }
    function o(e, t, i, a) {
        var n = "";
        if (e < 10) e = "0" + e;
        if (t < 10) t = "0" + t;
        if (i < 10) i = "0" + i;
        if (a == "HMS") {
            n = e + ":" + t + ":" + i;
        }
        if (a == "HM") {
            n = e + ":" + t;
        }
        return n;
    }
    function s(e, t) {
        var i = new Date();
        var a = /(\s)+/g;
        var n;
        e = e.replace(a, "");
        if (e.charAt(0).toUpperCase() == "N") {
            xmin = e.slice(2);
            if (xmin == "") xmin = 0;
            if (isNaN(xmin)) return e;
            n = xmin * 60 * 1e3;
            if (e.charAt(1) == "+") i.setTime(i.getTime() + n); else if (e.charAt(1) == "-") i.setTime(i.getTime() - n); else if (e.length > 1) return e;
            var r = o(i.getHours(), i.getMinutes(), i.getSeconds(), t);
            return r;
        }
        return e;
    }
    function l(e, t) {
        if (isNaN(e)) return e;
        var i = e.slice(0, 2);
        if (isNaN(i)) return e;
        var a = e.slice(2, 4) || 0;
        var n = e.slice(4) || 0;
        return o(i, parseInt(a), parseInt(n), t);
    }
    function d(t) {
        if (t == "") return "";
        var i = e.data(this, "timeboxq").options;
        var a = i.timeFormat;
        var n = new Date();
        n.setTime(t);
        return o(n.getHours(), n.getMinutes(), n.getSeconds(), a);
    }
    function c(t, i) {
        e(t)._outerWidth(i);
    }
    e.fn.timeboxq.methods = {
        options: function(t) {
            if (t.length > 0) return e.data(t[0], "timeboxq").options;
            return null;
        },
        setValue: function(e, t) {
            return e.each(function() {
                n(this, t);
            });
        },
        getValue: function(e) {
            return a(e[0]);
        },
        resize: function(e, t) {
            return e.each(function() {
                c(this, t);
            });
        }
    };
    e.fn.timeboxq.parseOptions = function(t) {
        return e.extend({}, e.fn.validatebox.parseOptions(t), e.parser.parseOptions(t));
    };
    e.fn.timeboxq.defaults = e.extend({}, e.fn.validatebox.defaults, {
        panelWidth: 180,
        parser: r,
        formatter: d,
        onBlur: function(e) {
            i(e);
        },
        onSelect: function(e) {},
        onChange: function(e, t) {},
        keyHandler: {
            enter: function(e) {
                t(this);
            }
        },
        validType: {
            timeboxq: "",
            minMaxTime: [ null, null ]
        },
        timeFormat: "HMS",
        minTime: "00:00:00",
        maxTime: "23:59:59",
        valueDirty: 1
    });
    e.extend(e.fn.timeboxq.defaults.rules, {
        timeboxq: {
            validator: function(e) {
                return /^(20|21|22|23|[0-1]\d|\d)(:[0-5]\d){1,2}$/i.test(e) || /^(20|21|22|23|\d|[0-1]\d)([0-5]\d){0,2}$/i.test(e) || /^[nN][-+]*\d*$/i.test(e);
            },
            message: "Please enter a valid time. 14:10, 1410, n+15"
        },
        minMaxTime: {
            validator: function(t, i) {
                var a = this;
                var n = e(this);
                var r = e.data(a, "timeboxq");
                if (r) {
                    var o = r.options;
                    var s = o.parser.call(a, t);
                    o.validType.minMaxTime = [ null, null ];
                    if (o.minTime != null || o.maxTime != null) {
                        if (o.minTime == null && o.rules.minMaxTime.messageMax) {
                            o.rules.minMaxTime.message = o.rules.minMaxTime.messageMax;
                        } else if (o.maxTime == null && o.rules.minMaxTime.messageMin) {
                            o.rules.minMaxTime.message = o.rules.minMaxTime.messageMin;
                        } else {
                            o.rules.minMaxTime.message = o.rules.minMaxTime.messageDef;
                        }
                        if (o.minTime != null) {
                            o.validType.minMaxTime[0] = o.formatter.call(a, o.parser.call(a, o.minTime));
                        }
                        if (o.maxTime != null) {
                            o.validType.minMaxTime[1] = o.formatter.call(a, o.parser.call(a, o.maxTime));
                        }
                    } else {
                        o.rules.minMaxTime.message = o.rules.timeboxq.message;
                    }
                    var l = o.parser.call(a, o.validType.minMaxTime[0]);
                    var d = o.parser.call(a, o.validType.minMaxTime[1]);
                    if (s > d || s < l) return false;
                }
                return true;
            },
            message: "Please enter a valid time.",
            messageDef: "Please enter a valid time : from {0} to {1}'"
        }
    });
})(jQuery);

(function(e) {
    var t = '<input id="imedisabled_password_input" type="password" style="width: 1px; height: 1px; position: absolute; border: 0px; padding: 0px;">';
    function i(i) {
        var a = e.data(i, "imedisabled");
        var n = a.options;
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            e(i).css({
                imeMode: "disabled"
            });
        } else if ("object" === typeof WebsysTool) {
            e(i).unbind(".imedisabled").bind("focus.imedisabled", function() {
                WebsysTool.SwitchToLanguageMode("en-US");
            }).bind("blur.imedisabled", function() {
                WebsysTool.SwitchToLanguageMode("zh-CN");
            });
        } else {
            var r = e("#imedisabled_password_input");
            if (r.length == 0) {
                e(i).after(t);
            }
            var o = function(t) {
                var i = this;
                e("#imedisabled_password_input").focus();
                setTimeout(function() {
                    i.focus();
                    e(i).one("focus", o);
                }, 50);
            };
            e(i).one("focus", o);
        }
    }
    e.fn.imedisabled = function(t, a) {
        if (typeof t == "string") {
            return e.fn.imedisabled.methods[t](this, a);
        }
        t = t || {};
        return this.each(function() {
            var a = e.data(this, "imedisabled");
            if (a) {
                e.extend(a.options, t);
            } else {
                e.data(this, "imedisabled", {
                    options: e.extend({}, e.fn.imedisabled.defaults, e.fn.imedisabled.parseOptions(this), t)
                });
            }
            i(this);
        });
    };
    e.fn.imedisabled.methods = {
        options: function(t) {
            return e.data(t[0], "imedisabled").options;
        },
        destroy: function(e) {
            return e.each(function() {});
        }
    };
    e.fn.imedisabled.parseOptions = function(t) {
        var i = e(t);
        return e.extend({}, e.parser.parseOptions(t, [ "imeEventType" ]));
    };
    e.fn.imedisabled.defaults = {
        imeEventType: "focus"
    };
})(jQuery);

(function(e) {
    e.parser.plugins.push("menutree");
    function t(t) {
        var n = e('<div class="menutree-wrap"><div class="menutree-collapse-wrap"></div><div class="menutree-searchbox-wrap"></div><div class="menutree-tree-wrap"></div></div>').insertAfter(t);
        n.panel({
            doSize: false,
            border: false,
            onResize: function(e, i) {
                setTimeout(function() {
                    a(t, {
                        width: e,
                        height: i
                    });
                }, 0);
            }
        });
        n.panel("panel").addClass("menutree").bind("_resize", function(a, n) {
            var r = e.data(t, "menutree").options;
            if (r.fit == true || n) {
                i(t);
            }
            return false;
        });
        var r = e('<div class="menutree-wrap"><div class="menutree-tree-wrap"></div></div>').appendTo("body");
        r.panel({
            doSize: false,
            closed: true,
            border: false,
            cls: "menutree menutree-sp",
            style: {
                position: "absolute",
                zIndex: 10
            },
            onOpen: function() {
                var t = e(this).panel("panel");
                if (e.fn.menu) {
                    t.css("z-index", e.fn.menu.defaults.zIndex++);
                } else {
                    if (e.fn.window) {
                        t.css("z-index", e.fn.window.defaults.zIndex++);
                    }
                }
                e(this).panel("resize");
            },
            onBeforeClose: function() {},
            onClose: function() {
                var i = e.data(t, "menutree");
                if (i && i._isClickShowSub) {
                    i._isClickShowSub = false;
                }
                if (i.panel) {
                    i.panel.find(".menutree-root-hover").removeClass("menutree-root-hover");
                }
            }
        });
        e(document).off(".menutree").on("mousedown.menutree", function(t) {
            var i = e(t.target).closest("div.menutree-sp");
            if (i.length) {
                return;
            }
            if (e(".menutree-sp:visible").length > 0) {
                e(".menutree-sp>.menutree-wrap:visible").panel("close");
            }
        });
        return {
            panel: n,
            subpanel: r
        };
    }
    function i(t, i) {
        var a = e.data(t, "menutree").options;
        var n = e.data(t, "menutree").panel;
        if (i) {
            if (i.width) {
                a.width = i.width;
            }
            if (i.height) {
                a.height = i.height;
            }
        }
        if (a.fit == true) {
            var r = n.panel("panel").parent();
            if (!a.collapsed) {
                a.width = r.width();
            }
            a.height = r.height();
        }
        if (a.collapsed) {
            n.panel("resize", {
                height: a.height
            });
        } else {
            n.panel("resize", {
                width: a.width,
                height: a.height
            });
        }
    }
    function a(t) {
        var i = e.data(t, "menutree").options;
        var a = e.data(t, "menutree").panel;
        var n = a.find(".menutree-collapse-wrap");
        var r = a.find(".menutree-searchbox-wrap");
        var o = a.find(".menutree-tree-wrap");
        var s = r.find(".menutree-searchbox");
        if (s.length > 0) s.searchbox("resize", i.width);
        var l = i.height - (o.offset().top - o.parent().offset().top);
        o._outerHeight(l);
    }
    function n(t) {
        var i = e.data(t, "menutree").options;
        var a = e.data(t, "menutree").panel;
        var n = a.find(".menutree-collapse-wrap");
        var r = n.find(".menutree-collapse");
        if (r.length == 0) {
            r = e('<span class="menutree-collapse menutree-expanded"></span>').appendTo(n);
            r.on("click", function() {
                if (e(this).hasClass("menutree-expanded")) {
                    e(this).removeClass("menutree-expanded");
                    a.panel("panel").addClass("menutree-min");
                    a.panel("resize", {
                        width: i.minwidth
                    });
                    e(this).addClass("menutree-collapsed");
                    i.collapsed = true;
                    i.onPanelCollapse.call(t, i.minwidth);
                } else if (e(this).hasClass("menutree-collapsed")) {
                    e(this).removeClass("menutree-collapsed");
                    a.panel("panel").removeClass("menutree-min");
                    a.panel("resize", {
                        width: i.width
                    });
                    e(this).addClass("menutree-expanded");
                    i.collapsed = false;
                    i.onPanelExpand.call(t, i.width);
                }
            });
        }
        if (i.collapsible) {
            n.removeClass("menutree-hidden");
        } else {
            n.addClass("menutree-hidden");
        }
    }
    function r(t) {
        var i = e.data(t, "menutree");
        var a = i.options;
        var n = i.panel;
        var r = n.find(".menutree-searchbox-wrap");
        var o = r.find(".menutree-searchbox");
        if (o.length == 0) {
            o = e('<input class="menutree-searchbox" />').appendTo(r);
            i.searchbox = o;
        }
        o.searchbox({
            searcher: function(e) {
                var t = n.find(".menutree-tree");
                if (t.length > 0) {
                    var r = t.tree("getRoots");
                    h(r, e, null, a.searchFields);
                    var o = !a.rootCollapsible;
                    p(r, e, true, o);
                    i._q = e;
                }
            },
            prompt: a.prompt
        });
        if (a.searchable) {
            r.removeClass("menutree-hidden");
        } else {
            r.addClass("menutree-hidden");
        }
    }
    function o(t, i) {
        i = i || 1;
        if (t && t.length > 0) {
            t.find(">li").each(function() {
                var t = "menutree-li-level" + (i > 2 ? "x" : i);
                if (!e(this).hasClass(t)) {
                    e(this).removeClass("menutree-li-level1 menutree-li-level2 menutree-li-levelx").addClass(t);
                }
                var a = e(this).find(">ul");
                if (a.length > 0) {
                    o(a, i + 1);
                } else {
                    if (i > 1) {
                        e(this).find(">.tree-node>.tree-indent").last().addClass("tree-indent-hit");
                    }
                }
            });
        }
        if (i == 1 && t.find("li.menutree-li-levelx").length == 0) {
            t.addClass("menutree-tree-nox");
        }
    }
    function s(t) {
        var i = e.data(t, "menutree");
        var a = i.options;
        var n = i.panel;
        var r = n.find(".menutree-tree-wrap");
        var s = r.find(".menutree-tree");
        if (s.length == 0) {
            s = e('<div class="menutree-tree" ></div>').appendTo(r);
            i.tree = s;
        }
        var u = e.extend({}, a, {
            formatter: f,
            onClick: function(i) {
                if (!s.tree("isLeaf", i.target)) {
                    var n = s.tree("getRoots");
                    var r = e.hisui.indexOfArray(n, "id", i.id) > -1;
                    if (a.rootCollapsible || !r) {
                        if (a.onlyOneExpanded && i.state == "closed") {
                            var o = s.tree("getParent", i.target), l = null;
                            if (o) {
                                l = s.tree("getChildren", o.target);
                            } else {
                                l = n;
                            }
                            e.each(l, function(e, t) {
                                if (t.id != i.id && t.state == "open") s.tree("collapse", t.target);
                            });
                        }
                        s.tree("toggle", i.target);
                    }
                    a.onMenuGroupClick.call(t, i);
                } else {
                    a.onMenuClick.call(t, i);
                }
                a.onClick.call(this, i);
            },
            onBeforeExpand: function(t) {
                var i = s.tree("getRoots");
                if (a.onlyOneExpanded) {
                    var n = s.tree("getParent", t.target), r = null;
                    if (n) {
                        r = s.tree("getChildren", n.target);
                    } else {
                        r = i;
                    }
                    e.each(r, function(e, i) {
                        if (i.id != t.id && i.state == "open") s.tree("collapse", i.target);
                    });
                }
            },
            onLoadSuccess: function(e, i) {
                a.onLoadSuccess.call(t, e, i);
                o(s);
            },
            loadFilter: function(e, i) {
                var n = a.loadFilter.call(t, e, i);
                l(n, !i, a.onlyOneExpanded, a.rootCollapsible);
                return n;
            }
        });
        s.tree(u);
        if (a.title) {
            var v = r.find(".menutree-tree-title");
            if (v.length == 0) {
                v = e('<div class="menutree-tree-title"></div>').prependTo(r);
            }
            v.html(e.hisui.getTrans(a.title));
            r.addClass("menutree-tree-withtitle");
        } else {
            r.find(".menutree-tree-title").remove();
            r.removeClass("menutree-tree-withtitle");
        }
        if (!a.rootCollapsible) {
            r.addClass("menutree-tree-norootcollapse");
        } else {
            r.removeClass("menutree-tree-norootcollapse");
        }
        if (a.collapsible) {
            r.addClass("menutree-tree-collapsible");
            c(t);
        } else {
            r.removeClass("menutree-tree-collapsible");
        }
        s.off(".menutree").on("mouseenter.menutree", ">li", function() {
            var t = e(this);
            if (t.closest(".menutree").hasClass("menutree-min") && !i._isClickShowSub) {
                if (i._hideSubTimer) clearTimeout(i._hideTimer);
                i._showSubTimer = setTimeout(function() {
                    g(t);
                }, 200);
            }
        }).on("mouseleave.menutree", ">li", function() {
            var t = e(this);
            if (t.closest(".menutree").hasClass("menutree-min") && !i._isClickShowSub) {
                if (i._showSubTimer) clearTimeout(i._showSubTimer);
                i._hideSubTimer = setTimeout(function() {
                    var e = i.subpanel;
                    e.panel("close");
                    i._isClickShowSub = false;
                });
            }
        }).on("click.menutree", ">li", function() {
            var t = e(this);
            if (t.closest(".menutree").hasClass("menutree-min")) {
                if (i._hideSubTimer) clearTimeout(i._hideTimer);
                if (i._showSubTimer) clearTimeout(i._showSubTimer);
                g(t);
                i._isClickShowSub = true;
            }
        });
        function g(e) {
            var t = i.subpanel;
            var n = e.offset();
            var r = n.left + e._outerWidth(), o = n.top - 1;
            t.panel("move", {
                left: r,
                top: o
            });
            t.panel("open");
            var l = t.find(".menutree-tree");
            var c = e.find(">.tree-node");
            var f = s.tree("getNode", c);
            var u = d(f);
            if (u.children && u.state != "open") {
                u.state = "open";
            }
            var v = [ u ];
            l.tree("loadData", v);
            var g = i.tree;
            var b = g.tree("getSelected");
            if (b) {
                var m = l.tree("find", b.id);
                if (m) l.tree("select", m.target);
            }
            var x = i._q;
            if (x) {
                var C = l.tree("getRoots");
                h(C, x, null, a.searchFields);
                var Y = !a.rootCollapsible;
                p(C, x, true, Y);
            }
            t.panel("resize", {
                width: a.width,
                height: "auto"
            });
            e.addClass("menutree-root-hover");
        }
    }
    function l(e, t, i, a) {
        var n = false;
        for (var r = 0; r < e.length; r++) {
            var o = e[r];
            if (o.children) {
                if (t) {
                    if (a) {
                        if (o.state != "closed") {
                            if (n) {
                                if (i) o.state = "closed";
                            } else {
                                n = true;
                            }
                        }
                    } else {
                        o.state = "open";
                    }
                    if (!o.iconCls) o.iconCls = "icon-book-rep";
                } else {
                    if (o.state != "closed") {
                        if (n) {
                            if (i) o.state = "closed";
                        } else {
                            n = true;
                        }
                    }
                }
                l(o.children, false, i, a);
            }
        }
        return e;
    }
    function d(t) {
        var i = {};
        for (var a in t) {
            if (a == "domId" || a == "target") {
                continue;
            } else if (a == "children") {
                i.children = [];
                for (var n = 0; n < t.children.length; n++) {
                    var r = d(t.children[n]);
                    i.children.push(r);
                }
            } else if (typeof t[a] == "object") {
                i[a] = e.extend({}, t[a], true);
            } else if (typeof t[a] == "string" || typeof t[a] == "number") {
                i[a] = t[a];
            }
        }
        return i;
    }
    function c(t) {
        var i = e.data(t, "menutree");
        var a = i.options;
        var n = i.subpanel;
        var r = n.find(".menutree-tree-wrap");
        var s = r.find(".menutree-tree");
        if (s.length == 0) {
            s = e('<div class="menutree-tree menutree-subtree" ></div>').appendTo(r);
            i.subtree = s;
        }
        var d = e.extend({}, a, {
            formatter: f,
            onClick: function(i) {
                if (!s.tree("isLeaf", i.target)) {
                    var r = s.tree("getRoots");
                    var o = e.hisui.indexOfArray(r, "id", i.id) > -1;
                    if (!o) {
                        if (a.onlyOneExpanded && i.state == "closed") {
                            var l = s.tree("getParent", i.target), d = null;
                            if (l) {
                                d = s.tree("getChildren", l.target);
                            } else {
                                d = r;
                            }
                            e.each(d, function(e, t) {
                                if (t.id != i.id && t.state == "open") s.tree("collapse", t.target);
                            });
                        }
                        s.tree("toggle", i.target);
                    }
                    a.onMenuGroupClick.call(t, i);
                } else {
                    n.panel("close");
                    a.onMenuClick.call(t, i);
                }
                a.onClick.call(t, i);
            },
            onBeforeExpand: function(t) {
                var i = s.tree("getRoots");
                var n = e.hisui.indexOfArray(i, "id", t.id) > -1;
                if (!n) {
                    if (a.onlyOneExpanded) {
                        var r = s.tree("getParent", t.target), o = null;
                        if (r) {
                            o = s.tree("getChildren", r.target);
                        } else {
                            o = i;
                        }
                        e.each(o, function(e, i) {
                            if (i.id != t.id && i.state == "open") s.tree("collapse", i.target);
                        });
                    }
                }
            },
            onExpand: function(e) {
                var t = i.tree;
                var a = t.tree("find", e.id);
                t.tree("expand", a.target);
            },
            onCollapse: function(e) {
                var t = i.tree;
                var a = t.tree("find", e.id);
                t.tree("collapse", a.target);
            },
            onSelect: function(e) {
                var t = i.tree;
                var a = t.tree("find", e.id);
                t.tree("select", a.target);
            },
            loadFilter: function(e, i) {
                var n = a.loadFilter.call(t, e, i);
                l(n, !i, a.onlyOneExpanded, a.rootCollapsible);
                return n;
            },
            onLoadSuccess: function(e, t) {
                o(s);
            }
        });
        s.tree(d);
        s.off(".menutree").on("mouseenter.menutree", function() {
            if (i._hideSubTimer) {
                clearTimeout(i._hideSubTimer);
            }
        }).on("mouseleave.menutree", function() {
            if (!i._isClickShowSub) {
                i._hideSubTimer = setTimeout(function() {
                    n.panel("close");
                }, 200);
            }
        });
    }
    function f(e, t) {
        var i = e.text;
        if (t && t != "") {
            var a = new RegExp(t, "ig");
            i = i.replace(a, "<span class='menutree-reg-word'>" + t + "</span>");
        }
        if (e && e.attributes && (e.attributes.count && e.attributes.count != "" && e.attributes.count != 0)) {
            return i + " " + '<span class="menutree-tip-count">' + e.attributes.count + "</span>";
        } else {
            return i;
        }
    }
    function u(t, i) {
        var a = false;
        if (t.indexOf(i) > -1) {
            a = true;
        } else {
            var n = e.hisui.getChineseSpellArray(t);
            var r = n.length;
            var o = false;
            for (var s = 0; s < r; s++) {
                var l = (n[s] || "").toLowerCase();
                var d = l.indexOf(i);
                if (d > -1) {
                    a = true;
                    break;
                }
            }
        }
        return a;
    }
    function h(e, t, i, a) {
        var n = false, r = i && i._ok, t = t.toLowerCase();
        for (var o = 0; o < e.length; o++) {
            var s = e[o];
            s._ok = false;
            if (r) {
                s._ok = true;
            } else {
                var l = s.text.toLowerCase();
                if (u(l, t)) {
                    s._ok = true;
                } else if (a) {
                    var d = a.split(",");
                    for (var c = 0; c < d.length; c++) {
                        var f = d[c];
                        var p = s[f];
                        if (!p && s.attributes) p = s.attributes[f];
                        if (p && u(p, t)) {
                            s._ok = true;
                            break;
                        }
                    }
                }
            }
            if (s.children) {
                h(s.children, t, s, a);
            }
            if (s._ok) n = true;
        }
        if (n && i) i._ok = true;
    }
    function p(t, i, a, n) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            if (o.children) {
                p(o.children, i, false, n);
            }
            var s = e("#" + o.domId);
            if (a && n) {} else if (o._ok) {
                var l = f(o, i);
                s.find(".tree-title").html(l);
                s.removeClass("menutree-node-hidden");
            } else {
                s.addClass("menutree-node-hidden");
            }
        }
    }
    function v(t, i) {
        var a = e.data(t, "menutree");
        var n = a.tree.tree("find", i);
        if (n) a.tree.tree("select", n.target);
    }
    e.fn.menutree = function(a, o) {
        if (typeof a == "string") {
            var l = e.fn.menutree.methods[a];
            return l(this, o);
        }
        a = a || {};
        return this.each(function() {
            var o = e.data(this, "menutree");
            if (o) {
                e.extend(o.options, a);
            } else {
                var l = t(this);
                e.data(this, "menutree", {
                    panel: l.panel,
                    subpanel: l.subpanel,
                    options: e.extend({}, e.fn.menutree.defaults, e.fn.menutree.parseOptions(this), a)
                });
                o = e.data(this, "menutree");
            }
            if (o.options.collapsible && !o.options.title) {
                o.options.title = "瀵艰埅鑿滃崟";
            }
            n(this);
            r(this);
            s(this);
            i(this);
        });
    };
    e.fn.menutree.methods = {
        options: function(t) {
            return e.data(t[0], "menutree").options;
        },
        getTree: function(t) {
            return e.data(t[0], "menutree").tree;
        },
        selectById: function(e, t) {
            e.each(function() {
                v(this, t);
            });
        }
    };
    e.fn.menutree.parseOptions = function(t) {
        var i = e('<div class="menutree-default-width"></div>').appendTo("body");
        var a = i.width();
        i.remove();
        i = e('<div class="menutree-default-min-width"></div>').appendTo("body");
        var n = i.width();
        i.remove();
        var r = e(t);
        return e.extend({
            width: a,
            minwidth: n
        }, e.fn.combo.parseOptions(t), e.parser.parseOptions(t, [ "width", "height", "prompt", {
            fit: "boolean"
        } ]));
    };
    e.fn.menutree.defaults = e.extend({}, e.fn.tree.defaults, {
        title: "",
        collapsible: false,
        rootCollapsible: true,
        width: "auto",
        height: "auto",
        fit: false,
        searchable: true,
        animate: true,
        onlyOneExpanded: true,
        searchFields: "",
        onMenuClick: function(e) {},
        onMenuGroupClick: function(e) {},
        onPanelCollapse: function(e) {},
        onPanelExpand: function(e) {}
    });
})(jQuery);

(function(e) {
    e.parser.plugins.push("inputclearbtn");
    function t(t) {
        var i = e.data(t, "inputclearbtn");
        var a = i.options;
        var n = e(t);
        if (n.hasClass("searchbox-f")) {
            n.next().find("input").addClass("inputclearbtn-f");
        } else if (n.hasClass("triggerbox-f")) {
            n.next().find("input").addClass("inputclearbtn-f");
        } else if (n.hasClass("combo-f")) {
            n.next().find("input").addClass("inputclearbtn-f");
        } else if (n.hasClass("filebox-f")) {
            n.next().find("input").addClass("inputclearbtn-f");
        } else {
            n.addClass("inputclearbtn-f");
        }
        var r = e(".z-q-clearbtn");
        if (r.length == 0) {
            r = e('<span class="z-q-clearbtn"><i class="z-q-clearbtnicon">&nbsp;</i></span>').appendTo("body");
            e(document.body).delegate("input.inputclearbtn-f", "mouseenter.inputclearbtn focus.inputclearbtn", function(t) {
                if ("" !== t.target.value) {
                    var i = e(".z-q-clearbtn");
                    if (i.length == 0) {
                        i = e('<span class="z-q-clearbtn"><i class="z-q-clearbtnicon">&nbsp;</i></span>').appendTo("body");
                    }
                    var a = t.target;
                    var n = e(a);
                    var r = n.outerWidth();
                    var o = n.outerHeight();
                    var s = n.offset();
                    var l = s.left + r - 22;
                    var d = s.top + o / 2 - 8;
                    if (n.hasClass("comboq") || n.hasClass("validatebox-invalid")) {
                        l -= 22;
                    }
                    i.css({
                        top: d,
                        left: l,
                        display: "block",
                        fontSize: "10px",
                        position: "absolute"
                    });
                    i.bind("click.inputclearbtn", function(t) {
                        var r = a, o = "";
                        if (n.hasClass("searchbox-text")) {
                            r = e(a).parent().prev()[0];
                            o = "searchbox";
                        }
                        if (n.hasClass("triggerbox-text")) {
                            r = e(a).parent().prev()[0];
                            o = "triggerbox";
                        }
                        if (e(a).hasClass("numberbox-f")) {
                            r = a;
                            o = "numberbox";
                        }
                        if (n.hasClass("combo-text")) {
                            r = e(a).parent().prev()[0];
                            if (e(r).hasClass("datetimebox-f")) {
                                o = "datetimebox";
                            } else if (e(r).hasClass("datebox-f")) {
                                o = "datebox";
                            } else if (e(r).hasClass("combobox-f")) {
                                o = "combobox";
                            } else {
                                o = "combo";
                            }
                        }
                        var s = e.data(r, "inputclearbtn");
                        if (s) {
                            var l = s.options;
                            if (l.onClearBefore) {
                                l.onClearBefore.call(r, n.val());
                            }
                        }
                        if (o != "") {
                            if (o == "combo") {
                                e.fn[o].methods.clear(e(r));
                            } else {
                                e.fn[o].methods.setValue(e(r), "");
                            }
                        } else {
                            n.val("");
                            n.focus();
                        }
                        i.hide();
                        if (l && l.onClearAfter) {
                            l.onClearAfter.call(a, n.val());
                        }
                    });
                }
            }).delegate("input.inputclearbtn-f", "mouseleave.inputclearbtn blur.inputclearbtn", function(t) {
                if (e(t.toElement).hasClass("z-q-clearbtn") || e(t.toElement).hasClass("z-q-clearbtnicon")) {
                    return;
                }
                var i = e(".z-q-clearbtn");
                if (i.length > 0) {
                    i.hide();
                    i.unbind(".inputclearbtn");
                }
            });
        }
    }
    e.fn.inputclearbtn = function(i, a) {
        if (typeof i == "string") {
            var n = e.fn.inputclearbtn.methods[i];
            if (n) {
                return n(this, a);
            } else {
                return this.inputclearbtn(i, a);
            }
        }
        i = i || {};
        return this.each(function() {
            var a = e.data(this, "inputclearbtn");
            if (a) {
                e.extend(a.options, i);
            } else {
                e.data(this, "inputclearbtn", {
                    options: e.extend({}, e.fn.inputclearbtn.parseOptions(this), i)
                });
            }
            t(this);
        });
    };
    e.fn.inputclearbtn.methods = {
        options: function(t) {
            return e.data(t[0], "inputclearbtn").options;
        },
        show: function(e) {
            return e.each(function() {
                _show(this);
            });
        },
        hide: function(e) {
            return e.each(function() {
                _hide(this);
            });
        }
    };
    e.fn.inputclearbtn.parseOptions = function(t) {
        return e.extend({}, e.parser.parseOptions(t));
    };
    e.fn.inputclearbtn.defaults = e.extend({}, {
        clearCls: "default",
        clearBtnRight: 10,
        clearBtnTop: 20,
        onClearBefore: null,
        onClearAfter: null
    });
})(jQuery);

$URL = "websys.Broker.cls";

var Level = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4
};

(function() {
    if ("undefined" === typeof console) {
        var e = function() {};
        console = {
            log: e,
            debug: e,
            info: e,
            warn: e,
            error: e,
            assert: e,
            dir: e,
            dirxml: e,
            trace: e,
            group: e,
            groupCollapsed: e,
            time: e,
            timeEnd: e,
            profile: e,
            profileEnd: e,
            count: e,
            clear: e
        };
    }
    var t = function() {
        this.level = Level.ERROR;
    };
    t.prototype = {
        log: function(e) {
            try {
                console.log(e);
            } catch (t) {}
        },
        debug: function(e) {
            if (this.level <= Level.DEBUG) {
                this.log(e);
            }
        },
        info: function(e) {
            if (this.level <= Level.INFO) {
                this.log(e);
            }
        },
        warn: function(e) {
            if (this.level <= Level.WARN) {
                console.warn(e);
            }
        },
        error: function(e) {
            if (this.level <= Level.ERROR) {
                this.log(e);
                console.trace();
            }
        }
    };
    logger = new t();
})();

(function(e, t) {
    var i = {};
    t.fn.validatebox.defaults.tipOptions.onShow = function() {
        t(this).tooltip("tip");
    };
    t.fn.combo.defaults.width = 177;
    t.fn.combo.defaults.height = 30;
    t.fn.combobox.defaults.height = 30;
    t.fn.combotree.defaults.height = 30;
    t.fn.combogrid.defaults.height = 30;
    t.fn.datebox.defaults.height = 30;
    t.fn.datetimebox.defaults.height = 30;
    t.fn.tabs.defaults.tabHeight = 36;
    var a = {
        numberbox: {
            superui: "validatebox"
        },
        spinner: {
            superui: "validatebox"
        },
        timespinner: {
            superui: "spinner"
        },
        numberspinner: {
            superui: "spinner"
        },
        combo: {
            superui: "validatebox"
        },
        combobox: {
            superui: "combo"
        },
        combogrid: {
            superui: "combo"
        },
        combotree: {
            superui: "combo"
        },
        window: {
            superui: "panel"
        },
        dialog: {
            superui: "window"
        },
        datebox: {
            superui: "combo"
        },
        datetimebox: {
            superui: "datebox"
        },
        menubutton: {
            superui: "linkbutton"
        },
        splitbutton: {
            superui: "menubutton"
        },
        propertygrid: {
            superui: "datagrid"
        },
        treegrid: {
            superui: "datagrid"
        },
        lookup: {
            superui: "comboq"
        },
        comboq: {
            superui: "validatebox"
        },
        timeboxq: {
            superui: "validatebox"
        }
    };
    var n = [ "draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "numberspinner", "timespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog", "checkbox", "radio", "switchbox", "filebox", "popover", "comboq", "lookup", "keywords", "triggerbox", "layoutq", "dateboxq", "timeboxq" ];
    t.each(n, function(e, n) {
        i[n] = function(e, i) {
            if (!e) return;
            var r = t(e);
            if ("undefined" != typeof i) {
                r[n](i);
            }
            var o = t.extend({
                jdata: r.data(n)
            }, {
                jqselector: e
            });
            function s() {}
            if (a[n] && a[n].superui && a[a[n].superui] && a[a[n].superui].superui) {
                t.each(t.fn[a[a[n].superui].superui].methods, function(e, i) {
                    o[e] = function() {
                        var e = t(this.jqselector);
                        Array.prototype.splice.call(arguments, 0, 0, e);
                        var a = i.apply(e, arguments);
                        return a;
                    };
                });
            }
            if (a[n] && a[n].superui) {
                t.each(t.fn[a[n].superui].methods, function(e, i) {
                    o[e] = function() {
                        var e = t(this.jqselector);
                        Array.prototype.splice.call(arguments, 0, 0, e);
                        var a = i.apply(e, arguments);
                        return a;
                    };
                });
            }
            t.each(t.fn[n].methods, function(e, i) {
                o[e] = function() {
                    var e = t(this.jqselector);
                    Array.prototype.splice.call(arguments, 0, 0, e);
                    var a = i.apply(e, arguments);
                    return a;
                };
            });
            return o;
        };
    });
    e.$HUI = i;
})(window, jQuery);

$(function() {
    $(document.body).on("keydown", function(e) {
        var t = e.keyCode;
        try {
            if (e.altKey && t == 37) {
                e.preventDefault();
                return false;
            }
            if (t == 8) {
                if (document.designMode == "on") return;
                var i = e.target;
                if ($(i).prop("contenteditable")) return;
                var a = i.tagName.toUpperCase();
                if ($(i).prop("readonly")) {
                    e.preventDefault();
                    return false;
                }
                if (a == "INPUT") {
                    var n = i.type.toUpperCase();
                    if (n == "CHECKBOX") {
                        e.preventDefault();
                        return false;
                    }
                    if (n == "RADIO") {
                        e.preventDefault();
                        return false;
                    }
                }
                if (a !== "INPUT" && a !== "TEXTAREA") {
                    e.preventDefault();
                    return false;
                }
            }
        } catch (e) {}
        return true;
    });
});