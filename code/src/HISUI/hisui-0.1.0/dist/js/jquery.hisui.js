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

(function(c) {
    c.hisui = {
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
        debounce: function(a, n, r) {
            var o, s;
            var e = function() {
                var e = this;
                var t = arguments;
                if (o) clearTimeout(o);
                if (r) {
                    var i = !o;
                    o = setTimeout(function() {
                        o = null;
                    }, n);
                    if (i) s = a.apply(e, t);
                } else {
                    o = setTimeout(function() {
                        a.apply(e, t);
                    }, n);
                }
                return s;
            };
            e.cancel = function() {
                clearTimeout(o);
                o = null;
            };
            return e;
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
        hisuiStyle: null,
        getHisuiStyle: function() {
            if (c.hisui.hisuiStyle === null) {
                var t = "";
                if (typeof HISUIStyleCode == "string") {
                    t = HISUIStyleCode;
                } else {
                    c("link").each(function() {
                        if (this.href.indexOf("/hisui.") > -1) {
                            var e = this.href.split("/hisui.")[1].split(".")[0];
                            if (e != "css" && e != "min") {
                                t = e;
                            } else {
                                t = "";
                            }
                            return false;
                        }
                    });
                }
                c.hisui.hisuiStyle = t;
                return t;
            } else {
                return c.hisui.hisuiStyle;
            }
        },
        switchObjectSize: function(e, t, i, a, n) {
            var r = t.document.querySelectorAll("OBJECT");
            if (r.length > 0) {
                for (var o = 0; o < r.length; o++) {
                    if ("undefined" == typeof r[o].attributes["type"]) continue;
                    if ("application/x-iemrplugin" != r[o].attributes["type"].value.toLowerCase()) continue;
                    var s = r[o];
                    changeId = s.id;
                    if ("undefined" != typeof s.attributes["myid"]) {
                        changeId += s.attributes["myid"].value;
                    }
                    if (s) {
                        if (null == s.getAttribute("data-hideTimes")) s.setAttribute("data-hideTimes", 0);
                        if (0 > s.getAttribute("data-hideTimes")) s.setAttribute("data-hideTimes", 0);
                        if (!c.data(a, "changeIdStr")) {
                            c.data(a, "changeIdStr", {
                                NPAPIIdStr: ""
                            });
                        }
                        if (i) {
                            if (c.data(a, "changeIdStr").NPAPIIdStr.indexOf("," + changeId + ",") < 0) {
                                s.setAttribute("data-hideTimes", parseInt(s.getAttribute("data-hideTimes")) + 1);
                                c.data(a, "changeIdStr").NPAPIIdStr += "," + changeId + ",";
                            }
                            s.style.width = "0px";
                            s.style.height = "0px";
                        } else {
                            if (c.data(a, "changeIdStr").NPAPIIdStr.indexOf("," + changeId + ",") > -1) {
                                s.setAttribute("data-hideTimes", parseInt(s.getAttribute("data-hideTimes")) - 1);
                            }
                            if (0 > s.getAttribute("data-hideTimes")) s.setAttribute("data-hideTimes", 0);
                            c.data(a, "changeIdStr").NPAPIIdStr = c.data(a, "changeIdStr").NPAPIIdStr.replace("," + changeId + ",", "");
                            if (s.getAttribute("data-hideTimes") == 0) {
                                s.style.width = "100%";
                                s.style.height = "100%";
                            }
                        }
                    }
                }
            }
        },
        findObjectDom: function(e, t, i, a, n) {
            if (!!window.ActiveXObject || "ActiveXObject" in window) return;
            if (windowNPAPITotal < 0) return;
            n = n || "panel";
            windowNPAPITotal--;
            var r = t.frames.length;
            for (var o = 0; o < r; o++) {
                if (!t.frames[o]) continue;
                var s = t.frames[o].window;
                try {
                    s.document;
                } catch (l) {
                    return;
                }
                c.hisui.findObjectDom(e, s, i, a, n);
            }
            c.hisui.switchObjectSize(e, t, i, a, n);
        },
        styleCodeConfig: {
            mustCalcPanelHeaderCardTitleWidth: {
                "default": true,
                blue: true,
                lite: false,
                lightblue: false,
                pure: false
            },
            accordionBodyExHeight: {
                lite: -1,
                lightblue: -1,
                "default": 0
            },
            datagridRowNumberHeaderTitle: {
                pure: "序号",
                "default": ""
            },
            dateTodayColor: {
                "default": "#449edd",
                pure: "#008FFF"
            },
            dateCloseColor: {
                "default": "#ff2600",
                pure: "#939393"
            },
            dateOkColor: {
                "default": "#ff2600"
            },
            inputHeight: {
                "default": 30,
                pure: 32
            },
            messagerPromptBtnIndex: {
                "default": [ "ok", "cancel" ],
                pure: [ "cancel", "ok" ]
            },
            messagerConfirm3BtnIndex: {
                "default": [ "ok", "no", "cancel" ],
                pure: [ "cancel", "no", "ok" ]
            },
            messagerConfirmBtnIndex: {
                "default": [ "ok", "cancel" ],
                pure: [ "cancel", "ok" ]
            },
            tabHeight: {
                "default": 36,
                pure: 44
            },
            dateboxqPanelHeight: {
                "default": 202,
                pure: 210
            },
            datetimeboxPanelHeight: {
                "default": 232,
                pure: 248
            },
            collapsedSize: {
                "default": 28,
                pure: 56
            },
            collapsedHeight: {
                "default": 38,
                pure: 56
            }
        },
        getStyleCodeConfigValue: function(e) {
            if ("undefined" == typeof HISUIStyleCode) return c.hisui.styleCodeConfig[e]["default"];
            if ("undefined" == typeof c.hisui.styleCodeConfig[e]) return "";
            if ("undefined" == typeof c.hisui.styleCodeConfig[e][HISUIStyleCode]) return c.hisui.styleCodeConfig[e]["default"];
            return c.hisui.styleCodeConfig[e][HISUIStyleCode];
        }
    };
    c.hisui.globalContainerId = "z-q-container";
    c.hisui.globalContainerSelector = "#" + c.hisui.globalContainerId;
    c.hisui.getLastSrcTargetDom = function() {
        return c.data(document.getElementById(c.hisui.globalContainerId), "data").srcTargetDom;
    };
    c.hisui.fixPanelTLWH = function() {
        var i = c.data(document.getElementById(c.hisui.globalContainerId), "data");
        var e = i.srcTargetDom;
        var a = c(e);
        var n = c(c.hisui.globalContainerSelector);
        var t = a.offset();
        if (i.offsettimer) {
            clearTimeout(i.offsettimer);
            i.offsettimer = null;
        }
        (function() {
            if (n.is(":visible")) {
                var e = parseInt(o());
                if (e > a.offset().top) {
                    e--;
                    n.removeClass("comboq-p-top").addClass("comboq-p-bottom");
                    a.removeClass("comboq-textbox-top").addClass("comboq-textbox-bottom");
                } else {
                    e++;
                    n.removeClass("comboq-p-bottom").addClass("comboq-p-top");
                    a.removeClass("comboq-textbox-bottom").addClass("comboq-textbox-top");
                }
                var t = r();
                if (Math.abs(e - n.offset().top) > 2 || Math.abs(t - n.offset().left) > 2) {
                    n.offset({
                        top: e,
                        left: t
                    });
                    clearTimeout(i.offsettimer);
                    i.offsettimer = null;
                }
                i.offsettimer = setTimeout(arguments.callee, 60);
            }
        })();
        function r() {
            var e = a.offset().left;
            if (e + n._outerWidth() > c(window)._outerWidth() + c(document).scrollLeft()) {
                e = c(window)._outerWidth() + c(document).scrollLeft() - n._outerWidth();
            }
            if (e < 0) {
                e = 0;
            }
            return e;
        }
        function o() {
            var e = a.offset().top + a._outerHeight();
            if (e + n._outerHeight() > c(window)._outerHeight() + c(document).scrollTop()) {
                e = a.offset().top - n._outerHeight();
            }
            if (e < c(document).scrollTop()) {
                e = a.offset().top + a._outerHeight();
            }
            e = parseInt(e);
            return e;
        }
    };
    c.parser = {
        auto: true,
        onComplete: function(e) {},
        plugins: [ "draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "numberspinner", "timespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog", "checkbox", "radio", "switchbox", "keywords", "comboq", "lookup", "triggerbox", "dateboxq", "datetimeboxq", "timeboxq", "label" ],
        parse: function(a) {
            var n = [];
            for (var e = 0; e < c.parser.plugins.length; e++) {
                var t = c.parser.plugins[e];
                var i = c(".hisui-" + t, a);
                if (i.length) {
                    if (i[t]) {
                        i[t]();
                    } else {
                        n.push({
                            name: t,
                            jq: i
                        });
                    }
                }
            }
            if (n.length && window.easyloader) {
                var r = [];
                for (var e = 0; e < n.length; e++) {
                    r.push(n[e].name);
                }
                easyloader.load(r, function() {
                    for (var e = 0; e < n.length; e++) {
                        var t = n[e].name;
                        var i = n[e].jq;
                        i[t]();
                    }
                    c.parser.onComplete.call(c.parser, a);
                });
            } else {
                c.parser.onComplete.call(c.parser, a);
            }
        },
        parseValue: function(e, t, i, a) {
            a = a || 0;
            var n = c.trim(String(t || ""));
            var r = n.substr(n.length - 1, 1);
            if (r == "%") {
                n = parseFloat(n.substr(0, n.length - 1));
                if (e.toLowerCase().indexOf("width") >= 0) {
                    a += i[0].offsetWidth - i[0].clientWidth;
                    n = Math.floor((i.width() - a) * n / 100);
                } else {
                    a += i[0].offsetHeight - i[0].clientHeight;
                    n = Math.floor((i.height() - a) * n / 100);
                }
            } else {
                n = parseInt(n) || undefined;
            }
            return n;
        },
        parseOptions: function(e, t) {
            var i = c(e);
            var a = {};
            var n = c.trim(i.attr("data-options"));
            if (n) {
                if (n.substring(0, 1) != "{") {
                    n = "{" + n + "\n" + "}";
                }
                a = new Function("return " + n)();
            }
            if (t) {
                var r = {};
                for (var o = 0; o < t.length; o++) {
                    var s = t[o];
                    if (typeof s == "string") {
                        if (s == "width" || s == "height" || s == "left" || s == "top") {
                            r[s] = parseInt(e.style[s]) || undefined;
                        } else {
                            r[s] = i.attr(s);
                        }
                    } else {
                        for (var l in s) {
                            var d = s[l];
                            if (d == "boolean") {
                                r[l] = i.attr(l) ? i.attr(l) == "true" : undefined;
                            } else {
                                if (d == "number") {
                                    r[l] = i.attr(l) == "0" ? 0 : parseFloat(i.attr(l)) || undefined;
                                }
                            }
                        }
                    }
                }
                c.extend(a, r);
            }
            return a;
        }
    };
    c(function() {
        var e = c('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo("body");
        e.width(100);
        c._boxModel = Math.abs(parseInt(e.width()) - 100) <= 2;
        e.remove();
        if (!window.easyloader && c.parser.auto) {
            c.parser.parse();
        }
    });
    c.fn._outerWidth = function(e) {
        if (e == undefined) {
            if (this[0] == window) {
                return this.width() || document.body.clientWidth;
            }
            return this.outerWidth() || 0;
        }
        return this.each(function() {
            if (c._boxModel) {
                c(this).width(e - (c(this).outerWidth() - c(this).width()));
            } else {
                c(this).width(e);
            }
        });
    };
    c.fn._outerHeight = function(e) {
        if (e == undefined) {
            if (this[0] == window) {
                return this.height() || document.body.clientHeight;
            }
            return this.outerHeight() || 0;
        }
        return this.each(function() {
            if (c._boxModel) {
                c(this).height(e - (c(this).outerHeight() - c(this).height()));
            } else {
                c(this).height(e);
            }
        });
    };
    c.fn._scrollLeft = function(e) {
        if (e == undefined) {
            return this.scrollLeft();
        } else {
            return this.each(function() {
                c(this).scrollLeft(e);
            });
        }
    };
    c.fn._propAttr = c.fn.prop || c.fn.attr;
    c.fn._fit = function(e) {
        e = e == undefined ? true : e;
        var t = this[0];
        var i = t.tagName == "BODY" ? t : this.parent()[0];
        var a = i.fcount || 0;
        if (e) {
            if (!t.fitted) {
                t.fitted = true;
                i.fcount = a + 1;
                c(i).addClass("panel-noscroll");
                if (i.tagName == "BODY") {
                    c("html").addClass("panel-fit");
                }
            }
        } else {
            if (t.fitted) {
                t.fitted = false;
                i.fcount = a - 1;
                if (i.fcount == 0) {
                    c(i).removeClass("panel-noscroll");
                    if (i.tagName == "BODY") {
                        c("html").removeClass("panel-fit");
                    }
                }
            }
        }
        return {
            width: c(i).width(),
            height: c(i).height()
        };
    };
})(jQuery);

(function(n) {
    var t = null;
    var e = null;
    var i = false;
    function a(e) {
        if (e.touches.length != 1) {
            return;
        }
        if (!i) {
            i = true;
            dblClickTimer = setTimeout(function() {
                i = false;
            }, 500);
        } else {
            clearTimeout(dblClickTimer);
            i = false;
            s(e, "dblclick");
        }
        t = setTimeout(function() {
            s(e, "contextmenu", 3);
        }, 1e3);
        s(e, "mousedown");
        if (n.fn.draggable.isDragging || n.fn.resizable.isResizing) {
            e.preventDefault();
        }
    }
    function r(e) {
        if (e.touches.length != 1) {
            return;
        }
        if (t) {
            clearTimeout(t);
        }
        s(e, "mousemove");
        if (n.fn.draggable.isDragging || n.fn.resizable.isResizing) {
            e.preventDefault();
        }
    }
    function o(e) {
        if (t) {
            clearTimeout(t);
        }
        s(e, "mouseup");
        if (n.fn.draggable.isDragging || n.fn.resizable.isResizing) {
            e.preventDefault();
        }
    }
    function s(e, t, i) {
        var a = new n.Event(t);
        a.pageX = e.changedTouches[0].pageX;
        a.pageY = e.changedTouches[0].pageY;
        a.which = i || 1;
        n(e.target).trigger(a);
    }
    if (document.addEventListener) {
        document.addEventListener("touchstart", a, true);
        document.addEventListener("touchmove", r, true);
        document.addEventListener("touchend", o, true);
    }
})(jQuery);

(function(c) {
    function r(e) {
        var t = c.data(e.data.target, "draggable");
        var i = t.options;
        var a = t.proxy;
        var n = e.data;
        var r = n.startLeft + e.pageX - n.startX;
        var o = n.startTop + e.pageY - n.startY;
        if (a) {
            if (a.parent()[0] == document.body) {
                if (i.deltaX != null && i.deltaX != undefined) {
                    r = e.pageX + i.deltaX;
                } else {
                    r = e.pageX - e.data.offsetWidth;
                }
                if (i.deltaY != null && i.deltaY != undefined) {
                    o = e.pageY + i.deltaY;
                } else {
                    o = e.pageY - e.data.offsetHeight;
                }
            } else {
                if (i.deltaX != null && i.deltaX != undefined) {
                    r += e.data.offsetWidth + i.deltaX;
                }
                if (i.deltaY != null && i.deltaY != undefined) {
                    o += e.data.offsetHeight + i.deltaY;
                }
            }
        }
        if (e.data.parent != document.body) {
            r += c(e.data.parent).scrollLeft();
            o += c(e.data.parent).scrollTop();
        }
        if (i.axis == "h") {
            n.left = r;
        } else {
            if (i.axis == "v") {
                n.top = o;
            } else {
                n.left = r;
                n.top = o;
            }
        }
    }
    function o(e) {
        var t = c.data(e.data.target, "draggable");
        var i = t.options;
        var a = t.proxy;
        if (!a) {
            a = c(e.data.target);
        }
        a.css({
            left: e.data.left - c(e.data.parent).scrollLeft(),
            top: e.data.top - c(e.data.parent).scrollTop()
        });
        c("body").css("cursor", i.cursor);
    }
    function s(t) {
        if (!c.fn.draggable.isDragging) {
            return false;
        }
        var e = c.data(t.data.target, "draggable");
        var i = e.options;
        var a = c(".droppable:visible").filter(function() {
            return t.data.target != this;
        }).filter(function() {
            var e = c.data(this, "droppable").options.accept;
            if (e) {
                return c(e).filter(function() {
                    return this == t.data.target;
                }).length > 0;
            } else {
                return true;
            }
        });
        e.droppables = a;
        var n = e.proxy;
        if (!n) {
            if (i.proxy) {
                if (i.proxy == "clone") {
                    n = c(t.data.target).clone().insertAfter(t.data.target);
                } else {
                    n = i.proxy.call(t.data.target, t.data.target);
                }
                e.proxy = n;
            } else {
                n = c(t.data.target);
            }
        }
        n.css("position", "absolute");
        r(t);
        o(t);
        i.onStartDrag.call(t.data.target, t);
        return false;
    }
    function l(i) {
        if (!c.fn.draggable.isDragging) {
            return false;
        }
        var e = c.data(i.data.target, "draggable");
        r(i);
        if (e.options.onDrag.call(i.data.target, i) != false) {
            o(i);
        }
        var a = i.data.target;
        e.droppables.each(function() {
            var e = c(this);
            if (e.droppable("options").disabled) {
                return;
            }
            var t = e.offset();
            if (i.pageX > t.left && i.pageX < t.left + e.outerWidth() && i.pageY > t.top && i.pageY < t.top + e.outerHeight()) {
                if (!this.entered) {
                    c(this).trigger("_dragenter", [ a ]);
                    this.entered = true;
                }
                c(this).trigger("_dragover", [ a ]);
            } else {
                if (this.entered) {
                    c(this).trigger("_dragleave", [ a ]);
                    this.entered = false;
                }
            }
        });
        return false;
    }
    function d(a) {
        if (!c.fn.draggable.isDragging) {
            f();
            return false;
        }
        l(a);
        var e = c.data(a.data.target, "draggable");
        var t = e.proxy;
        var n = e.options;
        n.onEndDrag.call(a.data.target, a);
        if (n.revert) {
            if (s() == true) {
                c(a.data.target).css({
                    position: a.data.startPosition,
                    left: a.data.startLeft,
                    top: a.data.startTop
                });
            } else {
                if (t) {
                    var i, r;
                    if (t.parent()[0] == document.body) {
                        i = a.data.startX - a.data.offsetWidth;
                        r = a.data.startY - a.data.offsetHeight;
                    } else {
                        i = a.data.startLeft;
                        r = a.data.startTop;
                    }
                    t.animate({
                        left: i,
                        top: r
                    }, function() {
                        o();
                    });
                } else {
                    c(a.data.target).animate({
                        left: a.data.startLeft,
                        top: a.data.startTop
                    }, function() {
                        c(a.data.target).css("position", a.data.startPosition);
                    });
                }
            }
        } else {
            c(a.data.target).css({
                position: "absolute",
                left: a.data.left,
                top: a.data.top
            });
            s();
        }
        n.onStopDrag.call(a.data.target, a);
        f();
        function o() {
            if (t) {
                t.remove();
            }
            e.proxy = null;
        }
        function s() {
            var i = false;
            e.droppables.each(function() {
                var e = c(this);
                if (e.droppable("options").disabled) {
                    return;
                }
                var t = e.offset();
                if (a.pageX > t.left && a.pageX < t.left + e.outerWidth() && a.pageY > t.top && a.pageY < t.top + e.outerHeight()) {
                    if (n.revert) {
                        c(a.data.target).css({
                            position: a.data.startPosition,
                            left: a.data.startLeft,
                            top: a.data.startTop
                        });
                    }
                    c(this).triggerHandler("_drop", [ a.data.target ]);
                    o();
                    i = true;
                    this.entered = false;
                    return false;
                }
            });
            if (!i && !n.revert) {
                o();
            }
            return i;
        }
        return false;
    }
    function f() {
        if (c.fn.draggable.timer) {
            clearTimeout(c.fn.draggable.timer);
            c.fn.draggable.timer = undefined;
        }
        c(document).unbind(".draggable");
        c.fn.draggable.isDragging = false;
        setTimeout(function() {
            c("body").css("cursor", "");
        }, 100);
    }
    c.fn.draggable = function(a, e) {
        if (typeof a == "string") {
            return c.fn.draggable.methods[a](this, e);
        }
        return this.each(function() {
            var e;
            var t = c.data(this, "draggable");
            if (t) {
                t.handle.unbind(".draggable");
                e = c.extend(t.options, a);
            } else {
                e = c.extend({}, c.fn.draggable.defaults, c.fn.draggable.parseOptions(this), a || {});
            }
            var i = e.handle ? typeof e.handle == "string" ? c(e.handle, this) : e.handle : c(this);
            c.data(this, "draggable", {
                options: e,
                handle: i
            });
            if (e.disabled) {
                c(this).css("cursor", "");
                return;
            }
            i.unbind(".draggable").bind("mousemove.draggable", {
                target: this
            }, function(e) {
                if (c.fn.draggable.isDragging) {
                    return;
                }
                var t = c.data(e.data.target, "draggable").options;
                if (r(e)) {
                    c(this).css("cursor", t.cursor);
                } else {
                    c(this).css("cursor", "");
                }
            }).bind("mouseleave.draggable", {
                target: this
            }, function(e) {
                c(this).css("cursor", "");
            }).bind("mousedown.draggable", {
                target: this
            }, function(e) {
                if (r(e) == false) {
                    return;
                }
                c(this).css("cursor", "");
                var t = c(e.data.target).position();
                var i = c(e.data.target).offset();
                var a = {
                    startPosition: c(e.data.target).css("position"),
                    startLeft: t.left,
                    startTop: t.top,
                    left: t.left,
                    top: t.top,
                    startX: e.pageX,
                    startY: e.pageY,
                    width: c(e.data.target).outerWidth(),
                    height: c(e.data.target).outerHeight(),
                    offsetWidth: e.pageX - i.left,
                    offsetHeight: e.pageY - i.top,
                    target: e.data.target,
                    parent: c(e.data.target).parent()[0]
                };
                c.extend(e.data, a);
                var n = c.data(e.data.target, "draggable").options;
                if (n.onBeforeDrag.call(e.data.target, e) == false) {
                    return;
                }
                c(document).bind("mousedown.draggable", e.data, s);
                c(document).bind("mousemove.draggable", e.data, l);
                c(document).bind("mouseup.draggable", e.data, d);
                c.fn.draggable.timer = setTimeout(function() {
                    c.fn.draggable.isDragging = true;
                    s(e);
                }, n.delay);
                return false;
            });
            function r(e) {
                var t = c.data(e.data.target, "draggable");
                var i = t.handle;
                var a = c(i).offset();
                var n = c(i).outerWidth();
                var r = c(i).outerHeight();
                var o = e.pageY - a.top;
                var s = a.left + n - e.pageX;
                var l = a.top + r - e.pageY;
                var d = e.pageX - a.left;
                return Math.min(o, s, l, d) > t.options.edge;
            }
        });
    };
    c.fn.draggable.methods = {
        options: function(e) {
            return c.data(e[0], "draggable").options;
        },
        proxy: function(e) {
            return c.data(e[0], "draggable").proxy;
        },
        enable: function(e) {
            return e.each(function() {
                c(this).draggable({
                    disabled: false
                });
            });
        },
        disable: function(e) {
            return e.each(function() {
                c(this).draggable({
                    disabled: true
                });
            });
        }
    };
    c.fn.draggable.parseOptions = function(e) {
        var t = c(e);
        return c.extend({}, c.parser.parseOptions(e, [ "cursor", "handle", "axis", {
            revert: "boolean",
            deltaX: "number",
            deltaY: "number",
            edge: "number",
            delay: "number"
        } ]), {
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    c.fn.draggable.defaults = {
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
    c.fn.draggable.isDragging = false;
})(jQuery);

(function(a) {
    function i(i) {
        a(i).addClass("droppable");
        a(i).bind("_dragenter", function(e, t) {
            a.data(i, "droppable").options.onDragEnter.apply(i, [ e, t ]);
        });
        a(i).bind("_dragleave", function(e, t) {
            a.data(i, "droppable").options.onDragLeave.apply(i, [ e, t ]);
        });
        a(i).bind("_dragover", function(e, t) {
            a.data(i, "droppable").options.onDragOver.apply(i, [ e, t ]);
        });
        a(i).bind("_drop", function(e, t) {
            a.data(i, "droppable").options.onDrop.apply(i, [ e, t ]);
        });
    }
    a.fn.droppable = function(t, e) {
        if (typeof t == "string") {
            return a.fn.droppable.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = a.data(this, "droppable");
            if (e) {
                a.extend(e.options, t);
            } else {
                i(this);
                a.data(this, "droppable", {
                    options: a.extend({}, a.fn.droppable.defaults, a.fn.droppable.parseOptions(this), t)
                });
            }
        });
    };
    a.fn.droppable.methods = {
        options: function(e) {
            return a.data(e[0], "droppable").options;
        },
        enable: function(e) {
            return e.each(function() {
                a(this).droppable({
                    disabled: false
                });
            });
        },
        disable: function(e) {
            return e.each(function() {
                a(this).droppable({
                    disabled: true
                });
            });
        }
    };
    a.fn.droppable.parseOptions = function(e) {
        var t = a(e);
        return a.extend({}, a.parser.parseOptions(e, [ "accept" ]), {
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    a.fn.droppable.defaults = {
        accept: null,
        disabled: false,
        onDragEnter: function(e, t) {},
        onDragOver: function(e, t) {},
        onDragLeave: function(e, t) {},
        onDrop: function(e, t) {}
    };
})(jQuery);

(function(f) {
    f.fn.resizable = function(t, e) {
        if (typeof t == "string") {
            return f.fn.resizable.methods[t](this, e);
        }
        function i(e) {
            var t = e.data;
            var i = f.data(t.target, "resizable").options;
            if (t.dir.indexOf("e") != -1) {
                var a = t.startWidth + e.pageX - t.startX;
                a = Math.min(Math.max(a, i.minWidth), i.maxWidth);
                t.width = a;
            }
            if (t.dir.indexOf("s") != -1) {
                var n = t.startHeight + e.pageY - t.startY;
                n = Math.min(Math.max(n, i.minHeight), i.maxHeight);
                t.height = n;
            }
            if (t.dir.indexOf("w") != -1) {
                var a = t.startWidth - e.pageX + t.startX;
                a = Math.min(Math.max(a, i.minWidth), i.maxWidth);
                t.width = a;
                t.left = t.startLeft + t.startWidth - t.width;
            }
            if (t.dir.indexOf("n") != -1) {
                var n = t.startHeight - e.pageY + t.startY;
                n = Math.min(Math.max(n, i.minHeight), i.maxHeight);
                t.height = n;
                t.top = t.startTop + t.startHeight - t.height;
            }
        }
        function a(e) {
            var t = e.data;
            var i = f(t.target);
            i.css({
                left: t.left,
                top: t.top
            });
            if (i.outerWidth() != t.width) {
                i._outerWidth(t.width);
            }
            if (i.outerHeight() != t.height) {
                i._outerHeight(t.height);
            }
        }
        function r(e) {
            f.fn.resizable.isResizing = true;
            f.data(e.data.target, "resizable").options.onStartResize.call(e.data.target, e);
            return false;
        }
        function o(e) {
            i(e);
            if (f.data(e.data.target, "resizable").options.onResize.call(e.data.target, e) != false) {
                a(e);
            }
            return false;
        }
        function s(e) {
            f.fn.resizable.isResizing = false;
            i(e, true);
            a(e);
            f.data(e.data.target, "resizable").options.onStopResize.call(e.data.target, e);
            f(document).unbind(".resizable");
            f("body").css("cursor", "");
            return false;
        }
        return this.each(function() {
            var c = null;
            var e = f.data(this, "resizable");
            if (e) {
                f(this).unbind(".resizable");
                c = f.extend(e.options, t || {});
            } else {
                c = f.extend({}, f.fn.resizable.defaults, f.fn.resizable.parseOptions(this), t || {});
                f.data(this, "resizable", {
                    options: c
                });
            }
            if (c.disabled == true) {
                return;
            }
            f(this).bind("mousemove.resizable", {
                target: this
            }, function(e) {
                if (f.fn.resizable.isResizing) {
                    return;
                }
                var t = n(e);
                if (t == "") {
                    f(e.data.target).css("cursor", "");
                } else {
                    f(e.data.target).css("cursor", t + "-resize");
                }
            }).bind("mouseleave.resizable", {
                target: this
            }, function(e) {
                f(e.data.target).css("cursor", "");
            }).bind("mousedown.resizable", {
                target: this
            }, function(i) {
                var e = n(i);
                if (e == "") {
                    return;
                }
                function t(e) {
                    var t = parseInt(f(i.data.target).css(e));
                    if (isNaN(t)) {
                        return 0;
                    } else {
                        return t;
                    }
                }
                var a = {
                    target: i.data.target,
                    dir: e,
                    startLeft: t("left"),
                    startTop: t("top"),
                    left: t("left"),
                    top: t("top"),
                    startX: i.pageX,
                    startY: i.pageY,
                    startWidth: f(i.data.target).outerWidth(),
                    startHeight: f(i.data.target).outerHeight(),
                    width: f(i.data.target).outerWidth(),
                    height: f(i.data.target).outerHeight(),
                    deltaWidth: f(i.data.target).outerWidth() - f(i.data.target).width(),
                    deltaHeight: f(i.data.target).outerHeight() - f(i.data.target).height()
                };
                f(document).bind("mousedown.resizable", a, r);
                f(document).bind("mousemove.resizable", a, o);
                f(document).bind("mouseup.resizable", a, s);
                f("body").css("cursor", e + "-resize");
            });
            function n(e) {
                var t = f(e.data.target);
                var i = "";
                var a = t.offset();
                var n = t.outerWidth();
                var r = t.outerHeight();
                var o = c.edge;
                if (e.pageY > a.top && e.pageY < a.top + o) {
                    i += "n";
                } else {
                    if (e.pageY < a.top + r && e.pageY > a.top + r - o) {
                        i += "s";
                    }
                }
                if (e.pageX > a.left && e.pageX < a.left + o) {
                    i += "w";
                } else {
                    if (e.pageX < a.left + n && e.pageX > a.left + n - o) {
                        i += "e";
                    }
                }
                var s = c.handles.split(",");
                for (var l = 0; l < s.length; l++) {
                    var d = s[l].replace(/(^\s*)|(\s*$)/g, "");
                    if (d == "all" || d == i) {
                        return i;
                    }
                }
                return "";
            }
        });
    };
    f.fn.resizable.methods = {
        options: function(e) {
            return f.data(e[0], "resizable").options;
        },
        enable: function(e) {
            return e.each(function() {
                f(this).resizable({
                    disabled: false
                });
            });
        },
        disable: function(e) {
            return e.each(function() {
                f(this).resizable({
                    disabled: true
                });
            });
        }
    };
    f.fn.resizable.parseOptions = function(e) {
        var t = f(e);
        return f.extend({}, f.parser.parseOptions(e, [ "handles", {
            minWidth: "number",
            minHeight: "number",
            maxWidth: "number",
            maxHeight: "number",
            edge: "number"
        } ]), {
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    f.fn.resizable.defaults = {
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
    f.fn.resizable.isResizing = false;
})(jQuery);

(function(r) {
    function i(e) {
        var t = r.data(e, "linkbutton").options;
        var i = r(e).empty();
        i.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected");
        i.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + t.size);
        if (t.plain) {
            i.addClass("l-btn-plain");
        }
        if (t.selected) {
            i.addClass(t.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
        }
        i.attr("group", t.group || "");
        i.attr("id", t.id || "");
        function a(e) {
            var t = r(this).linkbutton("options");
            if (!t.disabled) {
                if (t.toggle) {
                    if (t.selected) {
                        r(this).linkbutton("unselect");
                    } else {
                        r(this).linkbutton("select");
                    }
                }
                t.onClick.call(this);
            }
        }
        t.debouncedClickFun = r.hisui.debounce(a, parseInt(t.clickWaitingTime), true);
        var n = r('<span class="l-btn-left"></span>').appendTo(i);
        if (t.text) {
            if (t.notTrans) {
                r('<span class="l-btn-text"></span>').html(t.text).appendTo(n);
            } else {
                r('<span class="l-btn-text"></span>').html(r.hisui.getTrans(t.text)).appendTo(n);
            }
        } else {
            r('<span class="l-btn-text l-btn-empty">&nbsp;</span>').appendTo(n);
        }
        if (t.iconImg) {
            r('<span class="l-btn-icon" style="background-image:url(\'' + t.iconImg + "');background-position:center;background-repeat:no-repeat;\">&nbsp;</span>").appendTo(n);
            n.addClass("l-btn-icon-" + t.iconAlign);
        } else if (t.iconCls) {
            r('<span class="l-btn-icon">&nbsp;</span>').addClass(t.iconCls).appendTo(n);
            n.addClass("l-btn-icon-" + t.iconAlign);
        }
        i.unbind(".linkbutton").bind("focus.linkbutton", function() {
            if (!t.disabled) {
                r(this).addClass("l-btn-focus");
            }
        }).bind("blur.linkbutton", function() {
            r(this).removeClass("l-btn-focus");
        }).bind("click.linkbutton", function() {
            o(e);
            t.debouncedClickFun.call(this, e);
            if (!i.hasClass("filebox-button")) return false;
        });
        i.children("span").unbind(".linkbutton").bind("click.linkbutton", function() {
            if (t.waiting) {
                if (t.waitingAlert != "") {
                    r.messager.popover({
                        msg: t.waitingAlert,
                        type: "alert",
                        timeout: 2e3,
                        showSpeed: "slow",
                        showType: "fade"
                    });
                }
                return false;
            }
            if (t.disabled && t.stopAllEventOnDisabled) {
                return false;
            } else {
                return true;
            }
        });
        s(e, t.selected);
        l(e, t.disabled);
    }
    function o(e) {
        var t = r(e);
        t.addClass("l-btn-waiting");
        t.removeClass("l-btn-focus");
        var i = t.linkbutton("options");
        i.waiting = true;
        i.waitingTimer = setTimeout(function() {
            a(e);
        }, parseInt(i.clickWaitingTime));
    }
    function a(e) {
        var t = r.data(e, "linkbutton");
        if (t) {
            var i = t.options;
            if (i.waiting) {
                i.waiting = false;
            } else {
                return;
            }
            clearTimeout(i.waitingTimer);
            if (i.debouncedClickFun && "function" == typeof i.debouncedClickFun.cancel) i.debouncedClickFun.cancel();
            r(e).removeClass("l-btn-waiting");
        }
    }
    function s(e, t) {
        var i = r.data(e, "linkbutton").options;
        if (t) {
            if (i.group) {
                r('a.l-btn[group="' + i.group + '"]').each(function() {
                    var e = r(this).linkbutton("options");
                    if (e.toggle) {
                        r(this).removeClass("l-btn-selected l-btn-plain-selected");
                        e.selected = false;
                    }
                });
            }
            r(e).addClass(i.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
            i.selected = true;
        } else {
            if (!i.group) {
                r(e).removeClass("l-btn-selected l-btn-plain-selected");
                i.selected = false;
            }
        }
    }
    function l(e, t) {
        var i = r.data(e, "linkbutton");
        var a = i.options;
        r(e).removeClass("l-btn-disabled l-btn-plain-disabled");
        if (t) {
            a.disabled = true;
            var n = r(e).attr("href");
            if (n) {
                i.href = n;
                r(e).attr("href", "javascript:void(0)");
            }
            if (e.onclick) {
                i.onclick = e.onclick;
                e.onclick = null;
            }
            a.plain ? r(e).addClass("l-btn-disabled l-btn-plain-disabled") : r(e).addClass("l-btn-disabled");
        } else {
            a.disabled = false;
            if (i.href) {
                r(e).attr("href", i.href);
            }
            if (i.onclick) {
                e.onclick = i.onclick;
            }
        }
    }
    r.fn.linkbutton = function(t, e) {
        if (typeof t == "string") {
            return r.fn.linkbutton.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = r.data(this, "linkbutton");
            if (e) {
                r.extend(e.options, t);
            } else {
                r.data(this, "linkbutton", {
                    options: r.extend({}, r.fn.linkbutton.defaults, r.fn.linkbutton.parseOptions(this), t)
                });
                r(this).removeAttr("disabled");
            }
            i(this);
        });
    };
    r.fn.linkbutton.methods = {
        options: function(e) {
            return r.data(e[0], "linkbutton").options;
        },
        enable: function(e) {
            return e.each(function() {
                l(this, false);
            });
        },
        disable: function(e) {
            return e.each(function() {
                l(this, true);
            });
        },
        select: function(e) {
            return e.each(function() {
                s(this, true);
            });
        },
        unselect: function(e) {
            return e.each(function() {
                s(this, false);
            });
        },
        operationCompleted: function(e) {
            return e.each(function() {
                a(this);
            });
        },
        operationStart: function(e) {
            return e.each(function() {
                o(this);
            });
        }
    };
    r.fn.linkbutton.parseOptions = function(e) {
        var t = r(e);
        return r.extend({}, r.parser.parseOptions(e, [ "id", "iconImg", "iconCls", "iconAlign", "group", "size", {
            plain: "boolean",
            toggle: "boolean",
            selected: "boolean"
        } ]), {
            disabled: t.attr("disabled") ? true : undefined,
            text: r.trim(t.html()),
            iconCls: t.attr("icon") || t.attr("iconCls")
        });
    };
    r.fn.linkbutton.defaults = {
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
        notTrans: false,
        clickWaitingTime: 200,
        waitingAlert: "The button has been clicked and the system is responding. Please wait"
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
    function _92(t, e) {
        var i = $.data(t, "pagination");
        var a = i.options;
        var n = i.bb;
        $.extend(a, e || {});
        var r = $(t).find("select.pagination-page-list");
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
        var s = $(t).find("td.pagination-links");
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
                    }, function(e) {
                        _8e(t, e.data.pageNumber);
                    });
                }
            }
        }
        var u = a.displayMsg;
        u = u.replace(/{from}/, a.total == 0 ? 0 : a.pageSize * (a.pageNumber - 1) + 1);
        u = u.replace(/{to}/, Math.min(a.pageSize * a.pageNumber, a.total));
        u = u.replace(/{total}/, a.total);
        $(t).find("div.pagination-info").html(u);
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
        _9b(t, a.loading);
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
    $.fn.pagination = function(i, e) {
        if (typeof i == "string") {
            return $.fn.pagination.methods[i](this, e);
        }
        i = i || {};
        return this.each(function() {
            var e;
            var t = $.data(this, "pagination");
            if (t) {
                e = $.extend(t.options, i);
            } else {
                e = $.extend({}, $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), i);
                $.data(this, "pagination", {
                    options: e
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

(function(h) {
    function n(e) {
        var t = h(e);
        t.addClass("tree");
        return t;
    }
    function r(a) {
        var n = h.data(a, "tree").options;
        h(a).unbind().bind("mouseover", function(e) {
            var t = h(e.target);
            var i = t.closest("div.tree-node");
            if (!i.length) {
                return;
            }
            i.addClass("tree-node-hover");
            if (t.hasClass("tree-hit")) {
                if (t.hasClass("tree-expanded")) {
                    t.addClass("tree-expanded-hover");
                } else {
                    t.addClass("tree-collapsed-hover");
                }
            }
            e.stopPropagation();
        }).bind("mouseout", function(e) {
            var t = h(e.target);
            var i = t.closest("div.tree-node");
            if (!i.length) {
                return;
            }
            i.removeClass("tree-node-hover");
            if (t.hasClass("tree-hit")) {
                if (t.hasClass("tree-expanded")) {
                    t.removeClass("tree-expanded-hover");
                } else {
                    t.removeClass("tree-collapsed-hover");
                }
            }
            e.stopPropagation();
        }).bind("click", function(e) {
            var t = h(e.target);
            var i = t.closest("div.tree-node");
            if (!i.length) {
                return;
            }
            if (t.hasClass("tree-hit")) {
                c(a, i[0]);
                return false;
            } else {
                if (t.hasClass("tree-checkbox")) {
                    v(a, i[0], !t.hasClass("tree-checkbox1"));
                    return false;
                } else {
                    k(a, i[0]);
                    n.onClick.call(a, X(a, i[0]));
                }
            }
            e.stopPropagation();
        }).bind("dblclick", function(e) {
            var t = h(e.target).closest("div.tree-node");
            if (!t.length) {
                return;
            }
            k(a, t[0]);
            n.onDblClick.call(a, X(a, t[0]));
            e.stopPropagation();
        }).bind("contextmenu", function(e) {
            var t = h(e.target).closest("div.tree-node");
            if (!t.length) {
                return;
            }
            n.onContextMenu.call(a, e, X(a, t[0]));
            e.stopPropagation();
        });
    }
    function t(e) {
        var t = h.data(e, "tree").options;
        t.dnd = false;
        var i = h(e).find("div.tree-node");
        i.draggable("disable");
        i.css("cursor", "pointer");
    }
    function p(r) {
        var o = h.data(r, "tree");
        var s = o.options;
        var e = o.tree;
        o.disabledNodes = [];
        s.dnd = true;
        e.find("div.tree-node").draggable({
            disabled: false,
            revert: true,
            cursor: "pointer",
            proxy: function(e) {
                var t = h('<div class="tree-node-proxy"></div>').appendTo("body");
                t.html('<span class="tree-dnd-icon tree-dnd-no">&nbsp;</span>' + h(e).find(".tree-title").html());
                t.hide();
                return t;
            },
            deltaX: 15,
            deltaY: 15,
            onBeforeDrag: function(e) {
                if (s.onBeforeDrag.call(r, X(r, this)) == false) {
                    return false;
                }
                if (h(e.target).hasClass("tree-hit") || h(e.target).hasClass("tree-checkbox")) {
                    return false;
                }
                if (e.which != 1) {
                    return false;
                }
                h(this).next("ul").find("div.tree-node").droppable({
                    accept: "no-accept"
                });
                var t = h(this).find("span.tree-indent");
                if (t.length) {
                    e.data.offsetWidth -= t.length * t.width();
                }
            },
            onStartDrag: function() {
                h(this).draggable("proxy").css({
                    left: -1e4,
                    top: -1e4
                });
                s.onStartDrag.call(r, X(r, this));
                var e = X(r, this);
                if (e.id == undefined) {
                    e.id = "hisui_tree_node_id_temp";
                    w(r, e);
                }
                o.draggingNodeId = e.id;
            },
            onDrag: function(e) {
                var t = e.pageX, i = e.pageY, a = e.data.startX, n = e.data.startY;
                var r = Math.sqrt((t - a) * (t - a) + (i - n) * (i - n));
                if (r > 3) {
                    h(this).draggable("proxy").show();
                }
                this.pageY = e.pageY;
            },
            onStopDrag: function() {
                h(this).next("ul").find("div.tree-node").droppable({
                    accept: "div.tree-node"
                });
                for (var e = 0; e < o.disabledNodes.length; e++) {
                    h(o.disabledNodes[e]).droppable("enable");
                }
                o.disabledNodes = [];
                var t = H(r, o.draggingNodeId);
                if (t && t.id == "hisui_tree_node_id_temp") {
                    t.id = "";
                    w(r, t);
                }
                s.onStopDrag.call(r, t);
            }
        }).droppable({
            accept: "div.tree-node",
            onDragEnter: function(e, t) {
                if (s.onDragEnter.call(r, this, l(t)) == false) {
                    d(t, false);
                    h(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    h(this).droppable("disable");
                    o.disabledNodes.push(this);
                }
            },
            onDragOver: function(e, t) {
                if (h(this).droppable("options").disabled) {
                    return;
                }
                var i = t.pageY;
                var a = h(this).offset().top;
                var n = a + h(this).outerHeight();
                d(t, true);
                h(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                if (i > a + (n - a) / 2) {
                    if (n - i < 5) {
                        h(this).addClass("tree-node-bottom");
                    } else {
                        h(this).addClass("tree-node-append");
                    }
                } else {
                    if (i - a < 5) {
                        h(this).addClass("tree-node-top");
                    } else {
                        h(this).addClass("tree-node-append");
                    }
                }
                if (s.onDragOver.call(r, this, l(t)) == false) {
                    d(t, false);
                    h(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    h(this).droppable("disable");
                    o.disabledNodes.push(this);
                }
            },
            onDragLeave: function(e, t) {
                d(t, false);
                h(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                s.onDragLeave.call(r, this, l(t));
            },
            onDrop: function(e, t) {
                var i = this;
                var a, n;
                if (h(this).hasClass("tree-node-append")) {
                    a = c;
                    n = "append";
                } else {
                    a = f;
                    n = h(this).hasClass("tree-node-top") ? "top" : "bottom";
                }
                if (s.onBeforeDrop.call(r, i, l(t), n) == false) {
                    h(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    return;
                }
                a(t, i, n);
                h(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
            }
        });
        function l(e, t) {
            return h(e).closest("ul.tree").tree(t ? "pop" : "getData", e);
        }
        function d(e, t) {
            var i = h(e).draggable("proxy").find("span.tree-dnd-icon");
            i.removeClass("tree-dnd-yes tree-dnd-no").addClass(t ? "tree-dnd-yes" : "tree-dnd-no");
        }
        function c(t, i) {
            if (X(r, i).state == "closed") {
                u(r, i, function() {
                    e();
                });
            } else {
                e();
            }
            function e() {
                var e = l(t, true);
                h(r).tree("append", {
                    parent: i,
                    data: [ e ]
                });
                s.onDrop.call(r, i, e, "append");
            }
        }
        function f(e, t, i) {
            var a = {};
            if (i == "top") {
                a.before = t;
            } else {
                a.after = t;
            }
            var n = l(e, true);
            a.data = n;
            h(r).tree("insert", a);
            s.onDrop.call(r, t, n, i);
        }
    }
    function v(r, e, t) {
        var i = h.data(r, "tree").options;
        if (!i.checkbox) {
            return;
        }
        var a = X(r, e);
        if (i.onBeforeCheck.call(r, a, t) == false) {
            return;
        }
        var n = h(e);
        var o = n.find(".tree-checkbox");
        o.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
        if (t) {
            o.addClass("tree-checkbox1");
        } else {
            o.addClass("tree-checkbox0");
        }
        if (i.cascadeCheck) {
            l(n);
            s(n);
        }
        i.onCheck.call(r, a, t);
        function s(e) {
            var t = e.next().find(".tree-checkbox");
            t.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
            if (e.find(".tree-checkbox").hasClass("tree-checkbox1")) {
                t.addClass("tree-checkbox1");
            } else {
                t.addClass("tree-checkbox0");
            }
        }
        function l(e) {
            var t = T(r, e[0]);
            if (t) {
                var i = h(t.target).find(".tree-checkbox");
                i.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
                if (a(e)) {
                    i.addClass("tree-checkbox1");
                } else {
                    if (n(e)) {
                        i.addClass("tree-checkbox0");
                    } else {
                        i.addClass("tree-checkbox2");
                    }
                }
                l(h(t.target));
            }
            function a(e) {
                var t = e.find(".tree-checkbox");
                if (t.hasClass("tree-checkbox0") || t.hasClass("tree-checkbox2")) {
                    return false;
                }
                var i = true;
                e.parent().siblings().each(function() {
                    if (!h(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
                        i = false;
                    }
                });
                return i;
            }
            function n(e) {
                var t = e.find(".tree-checkbox");
                if (t.hasClass("tree-checkbox1") || t.hasClass("tree-checkbox2")) {
                    return false;
                }
                var i = true;
                e.parent().siblings().each(function() {
                    if (!h(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")) {
                        i = false;
                    }
                });
                return i;
            }
        }
    }
    function s(e, t) {
        var i = h.data(e, "tree").options;
        if (!i.checkbox) {
            return;
        }
        var a = h(t);
        if (Q(e, t)) {
            var n = a.find(".tree-checkbox");
            if (n.length) {
                if (n.hasClass("tree-checkbox1")) {
                    v(e, t, true);
                } else {
                    v(e, t, false);
                }
            } else {
                if (i.onlyLeafCheck) {
                    h('<span class="tree-checkbox tree-checkbox0"></span>').insertBefore(a.find(".tree-title"));
                }
            }
        } else {
            var n = a.find(".tree-checkbox");
            if (i.onlyLeafCheck) {
                n.remove();
            } else {
                if (n.hasClass("tree-checkbox1")) {
                    v(e, t, true);
                } else {
                    if (n.hasClass("tree-checkbox2")) {
                        var r = true;
                        var o = true;
                        var s = Z(e, t);
                        for (var l = 0; l < s.length; l++) {
                            if (s[l].checked) {
                                o = false;
                            } else {
                                r = false;
                            }
                        }
                        if (r) {
                            v(e, t, true);
                        }
                        if (o) {
                            v(e, t, false);
                        }
                    }
                }
            }
        }
    }
    function d(e, t, i, a) {
        var n = h.data(e, "tree");
        var r = n.options;
        var o = h(t).prevAll("div.tree-node:first");
        i = r.loadFilter.call(e, i, o[0]);
        var s = J(e, "domId", o.attr("id"));
        if (!a) {
            s ? s.children = i : n.data = i;
            h(t).empty();
        } else {
            if (s) {
                s.children ? s.children = s.children.concat(i) : s.children = i;
            } else {
                n.data = n.data.concat(i);
            }
        }
        r.view.render.call(r.view, e, t, i);
        if (r.dnd) {
            p(e);
        }
        if (s) {
            w(e, s);
        }
        var l = [];
        var d = [];
        for (var c = 0; c < i.length; c++) {
            var f = i[c];
            if (!f.checked) {
                l.push(f);
            }
        }
        $(i, function(e) {
            if (e.checked) {
                d.push(e);
            }
        });
        var u = r.onCheck;
        r.onCheck = function() {};
        if (l.length) {
            v(e, h("#" + l[0].domId)[0], false);
        }
        for (var c = 0; c < d.length; c++) {
            v(e, h("#" + d[c].domId)[0], true);
        }
        r.onCheck = u;
        setTimeout(function() {
            g(e, e);
        }, 0);
        r.onLoadSuccess.call(e, s, i);
    }
    function g(i, e, a) {
        var t = h.data(i, "tree").options;
        if (t.lines) {
            h(i).addClass("tree-lines");
        } else {
            h(i).removeClass("tree-lines");
            return;
        }
        if (!a) {
            a = true;
            h(i).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
            h(i).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
            var n = h(i).tree("getRoots");
            if (n.length > 1) {
                h(n[0].target).addClass("tree-root-first");
            } else {
                if (n.length == 1) {
                    h(n[0].target).addClass("tree-root-one");
                }
            }
        }
        h(e).children("li").each(function() {
            var e = h(this).children("div.tree-node");
            var t = e.next("ul");
            if (t.length) {
                if (h(this).next().length) {
                    s(e);
                }
                g(i, t, a);
            } else {
                o(e);
            }
        });
        var r = h(e).children("li:last").children("div.tree-node").addClass("tree-node-last");
        r.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
        function o(e, t) {
            var i = e.find("span.tree-icon");
            i.prev("span.tree-indent").addClass("tree-join");
        }
        function s(e) {
            var t = e.find("span.tree-indent, span.tree-hit").length;
            e.next().find("div.tree-node").each(function() {
                h(this).children("span:eq(" + (t - 1) + ")").addClass("tree-line");
            });
        }
    }
    function l(t, i, e, a) {
        var n = h.data(t, "tree").options;
        e = e || {};
        var r = null;
        if (t != i) {
            var o = h(i).prev();
            r = X(t, o[0]);
        }
        if (n.onBeforeLoad.call(t, r, e) == false) {
            return;
        }
        var s = h(i).prev().children("span.tree-folder");
        s.addClass("tree-loading");
        var l = n.loader.call(t, e, function(e) {
            s.removeClass("tree-loading");
            d(t, i, e);
            if (a) {
                a();
            }
        }, function() {
            s.removeClass("tree-loading");
            n.onLoadError.apply(t, arguments);
            if (a) {
                a();
            }
        });
        if (l == false) {
            s.removeClass("tree-loading");
        }
    }
    function u(e, t, i) {
        var a = h.data(e, "tree").options;
        var n = h(t).children("span.tree-hit");
        if (n.length == 0) {
            return;
        }
        if (n.hasClass("tree-expanded")) {
            return;
        }
        var r = X(e, t);
        if (a.onBeforeExpand.call(e, r) == false) {
            return;
        }
        n.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        n.next().addClass("tree-folder-open");
        var o = h(t).next();
        if (o.length) {
            if (a.animate) {
                o.slideDown("normal", function() {
                    r.state = "open";
                    a.onExpand.call(e, r);
                    if (i) {
                        i();
                    }
                });
            } else {
                o.css("display", "block");
                r.state = "open";
                a.onExpand.call(e, r);
                if (i) {
                    i();
                }
            }
        } else {
            var s = h('<ul style="display:none"></ul>').insertAfter(t);
            l(e, s[0], {
                id: r.id
            }, function() {
                if (s.is(":empty")) {
                    s.remove();
                }
                if (a.animate) {
                    s.slideDown("normal", function() {
                        r.state = "open";
                        a.onExpand.call(e, r);
                        if (i) {
                            i();
                        }
                    });
                } else {
                    s.css("display", "block");
                    r.state = "open";
                    a.onExpand.call(e, r);
                    if (i) {
                        i();
                    }
                }
            });
        }
    }
    function o(e, t) {
        var i = h.data(e, "tree").options;
        var a = h(t).children("span.tree-hit");
        if (a.length == 0) {
            return;
        }
        if (a.hasClass("tree-collapsed")) {
            return;
        }
        var n = X(e, t);
        if (i.onBeforeCollapse.call(e, n) == false) {
            return;
        }
        a.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        a.next().removeClass("tree-folder-open");
        var r = h(t).next();
        if (i.animate) {
            r.slideUp("normal", function() {
                n.state = "closed";
                i.onCollapse.call(e, n);
            });
        } else {
            r.css("display", "none");
            n.state = "closed";
            i.onCollapse.call(e, n);
        }
    }
    function c(e, t) {
        var i = h(t).children("span.tree-hit");
        if (i.length == 0) {
            return;
        }
        if (i.hasClass("tree-expanded")) {
            o(e, t);
        } else {
            u(e, t);
        }
    }
    function i(e, t) {
        var i = Z(e, t);
        if (t) {
            i.unshift(X(e, t));
        }
        for (var a = 0; a < i.length; a++) {
            u(e, i[a].target);
        }
    }
    function a(e, t) {
        var i = [];
        var a = T(e, t);
        while (a) {
            i.unshift(a);
            a = T(e, a.target);
        }
        for (var n = 0; n < i.length; n++) {
            u(e, i[n].target);
        }
    }
    function f(e, t) {
        var i = h(e).parent();
        while (i[0].tagName != "BODY" && i.css("overflow-y") != "auto") {
            i = i.parent();
        }
        var a = h(t);
        var n = a.offset().top;
        if (i[0].tagName != "BODY") {
            var r = i.offset().top;
            if (n < r) {
                i.scrollTop(i.scrollTop() + n - r);
            } else {
                if (n + a.outerHeight() > r + i.outerHeight() - 18) {
                    i.scrollTop(i.scrollTop() + n + a.outerHeight() - r - i.outerHeight() + 18);
                }
            }
        } else {
            i.scrollTop(n);
        }
    }
    function b(e, t) {
        var i = Z(e, t);
        if (t) {
            i.unshift(X(e, t));
        }
        for (var a = 0; a < i.length; a++) {
            o(e, i[a].target);
        }
    }
    function m(e, t) {
        var i = h(t.parent);
        var a = t.data;
        if (!a) {
            return;
        }
        a = h.isArray(a) ? a : [ a ];
        if (!a.length) {
            return;
        }
        var n;
        if (i.length == 0) {
            n = h(e);
        } else {
            if (Q(e, i[0])) {
                var r = i.find("span.tree-icon");
                r.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                var o = h('<span class="tree-hit tree-expanded"></span>').insertBefore(r);
                if (o.prev().length) {
                    o.prev().remove();
                }
            }
            n = i.next();
            if (!n.length) {
                n = h("<ul></ul>").insertAfter(i);
            }
        }
        d(e, n[0], a, true);
        s(e, n.prev());
    }
    function x(e, t) {
        var i = t.before || t.after;
        var a = T(e, i);
        var n = t.data;
        if (!n) {
            return;
        }
        n = h.isArray(n) ? n : [ n ];
        if (!n.length) {
            return;
        }
        m(e, {
            parent: a ? a.target : null,
            data: n
        });
        var r = a ? a.children : h(e).tree("getRoots");
        for (var o = 0; o < r.length; o++) {
            if (r[o].domId == h(i).attr("id")) {
                for (var s = n.length - 1; s >= 0; s--) {
                    r.splice(t.before ? o : o + 1, 0, n[s]);
                }
                r.splice(r.length - n.length, n.length);
                break;
            }
        }
        var l = h();
        for (var o = 0; o < n.length; o++) {
            l = l.add(h("#" + n[o].domId).parent());
        }
        if (t.before) {
            l.insertBefore(h(i).parent());
        } else {
            l.insertAfter(h(i).parent());
        }
    }
    function C(r, e) {
        var t = a(e);
        h(e).parent().remove();
        if (t) {
            if (!t.children || !t.children.length) {
                var i = h(t.target);
                i.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                i.find(".tree-hit").remove();
                h('<span class="tree-indent"></span>').prependTo(i);
                i.next().remove();
            }
            w(r, t);
            s(r, t.target);
        }
        g(r, r);
        function a(e) {
            var t = h(e).attr("id");
            var i = T(r, e);
            var a = i ? i.children : h.data(r, "tree").data;
            for (var n = 0; n < a.length; n++) {
                if (a[n].domId == t) {
                    a.splice(n, 1);
                    break;
                }
            }
            return i;
        }
    }
    function w(e, t) {
        var i = h.data(e, "tree").options;
        var a = h(t.target);
        var n = X(e, t.target);
        var r = n.checked;
        if (n.iconCls) {
            a.find(".tree-icon").removeClass(n.iconCls);
        }
        h.extend(n, t);
        a.find(".tree-title").html(i.formatter.call(e, n));
        if (n.iconCls) {
            a.find(".tree-icon").addClass(n.iconCls);
        }
        if (r != n.checked) {
            v(e, t.target, n.checked);
        }
    }
    function Y(e) {
        var t = S(e);
        return t.length ? t[0] : null;
    }
    function S(e) {
        var t = h.data(e, "tree").data;
        for (var i = 0; i < t.length; i++) {
            D(t[i]);
        }
        return t;
    }
    function Z(e, t) {
        var i = [];
        var a = X(e, t);
        var n = a ? a.children : h.data(e, "tree").data;
        $(n, function(e) {
            i.push(D(e));
        });
        return i;
    }
    function T(e, t) {
        var i = h(t).closest("ul").prevAll("div.tree-node:first");
        return X(e, i[0]);
    }
    function y(t, e) {
        e = e || "checked";
        if (!h.isArray(e)) {
            e = [ e ];
        }
        var i = [];
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            if (n == "checked") {
                i.push("span.tree-checkbox1");
            } else {
                if (n == "unchecked") {
                    i.push("span.tree-checkbox0");
                } else {
                    if (n == "indeterminate") {
                        i.push("span.tree-checkbox2");
                    }
                }
            }
        }
        var r = [];
        h(t).find(i.join(",")).each(function() {
            var e = h(this).parent();
            r.push(X(t, e[0]));
        });
        return r;
    }
    function L(e) {
        var t = h(e).find("div.tree-node-selected");
        return t.length ? X(e, t[0]) : null;
    }
    function M(e, t) {
        var i = X(e, t);
        if (i && i.children) {
            $(i.children, function(e) {
                D(e);
            });
        }
        return i;
    }
    function X(e, t) {
        return J(e, "domId", h(t).attr("id"));
    }
    function H(e, t) {
        return J(e, "id", t);
    }
    function J(e, t, i) {
        var a = h.data(e, "tree").data;
        var n = null;
        $(a, function(e) {
            if (e[t] == i) {
                n = D(e);
                return false;
            }
        });
        return n;
    }
    function D(e) {
        var t = h("#" + e.domId);
        e.target = t[0];
        e.checked = t.find(".tree-checkbox").hasClass("tree-checkbox1");
        return e;
    }
    function $(e, t) {
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
    function k(e, t) {
        var i = h.data(e, "tree").options;
        var a = X(e, t);
        if (i.onBeforeSelect.call(e, a) == false) {
            return;
        }
        h(e).find("div.tree-node-selected").removeClass("tree-node-selected");
        h(t).addClass("tree-node-selected");
        i.onSelect.call(e, a);
    }
    function Q(e, t) {
        return h(t).children("span.tree-hit").length == 0;
    }
    function _(t, i) {
        var e = h.data(t, "tree").options;
        var a = X(t, i);
        if (e.onBeforeEdit.call(t, a) == false) {
            return;
        }
        h(i).css("position", "relative");
        var n = h(i).find(".tree-title");
        var r = n.outerWidth();
        n.empty();
        var o = h('<input class="tree-editor">').appendTo(n);
        o.val(a.text).focus();
        o.width(r + 20);
        o.height(document.compatMode == "CSS1Compat" ? 18 - (o.outerHeight() - o.height()) : 18);
        o.bind("click", function(e) {
            return false;
        }).bind("mousedown", function(e) {
            e.stopPropagation();
        }).bind("mousemove", function(e) {
            e.stopPropagation();
        }).bind("keydown", function(e) {
            if (e.keyCode == 13) {
                F(t, i);
                return false;
            } else {
                if (e.keyCode == 27) {
                    P(t, i);
                    return false;
                }
            }
        }).bind("blur", function(e) {
            e.stopPropagation();
            F(t, i);
        });
    }
    function F(e, t) {
        var i = h.data(e, "tree").options;
        h(t).css("position", "");
        var a = h(t).find("input.tree-editor");
        var n = a.val();
        a.remove();
        var r = X(e, t);
        r.text = n;
        w(e, r);
        i.onAfterEdit.call(e, r);
    }
    function P(e, t) {
        var i = h.data(e, "tree").options;
        h(t).css("position", "");
        h(t).find("input.tree-editor").remove();
        var a = X(e, t);
        w(e, a);
        i.onCancelEdit.call(e, a);
    }
    function B(i, t) {
        var e = h.data(i, "tree");
        var a = e.options;
        var n = {};
        h.hisui.forEach(e.data, true, function(e) {
            if (a.filter.call(i, t, e)) {
                h("#" + e.domId).removeClass("tree-node-hidden");
                n[e.domId] = 1;
                e.hidden = false;
            } else {
                h("#" + e.domId).addClass("tree-node-hidden");
                e.hidden = true;
            }
        });
        for (var r in n) {
            o(r);
        }
        function o(e) {
            var t = h(i).tree("getParent", h("#" + e)[0]);
            while (t) {
                h(t.target).removeClass("tree-node-hidden");
                t.hidden = false;
                t = h(i).tree("getParent", t.target);
            }
        }
    }
    h.fn.tree = function(a, e) {
        if (typeof a == "string") {
            return h.fn.tree.methods[a](this, e);
        }
        var a = a || {};
        return this.each(function() {
            var e = h.data(this, "tree");
            var t;
            if (e) {
                t = h.extend(e.options, a);
                e.options = t;
            } else {
                t = h.extend({}, h.fn.tree.defaults, h.fn.tree.parseOptions(this), a);
                h.data(this, "tree", {
                    options: t,
                    tree: n(this),
                    data: []
                });
                var i = h.fn.tree.parseData(this);
                if (i.length) {
                    d(this, this, i);
                }
            }
            r(this);
            if (t.data) {
                d(this, this, h.extend(true, [], t.data));
            }
            l(this, this);
        });
    };
    h.fn.tree.methods = {
        options: function(e) {
            return h.data(e[0], "tree").options;
        },
        loadData: function(e, t) {
            return e.each(function() {
                d(this, this, t);
            });
        },
        getNode: function(e, t) {
            return X(e[0], t);
        },
        getData: function(e, t) {
            return M(e[0], t);
        },
        reload: function(e, i) {
            return e.each(function() {
                if (i) {
                    var e = h(i);
                    var t = e.children("span.tree-hit");
                    t.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    e.next().remove();
                    u(this, i);
                } else {
                    h(this).empty();
                    l(this, this);
                }
            });
        },
        getRoot: function(e) {
            return Y(e[0]);
        },
        getRoots: function(e) {
            return S(e[0]);
        },
        getParent: function(e, t) {
            return T(e[0], t);
        },
        getChildren: function(e, t) {
            return Z(e[0], t);
        },
        getChecked: function(e, t) {
            return y(e[0], t);
        },
        getSelected: function(e) {
            return L(e[0]);
        },
        isLeaf: function(e, t) {
            return Q(e[0], t);
        },
        find: function(e, t) {
            return H(e[0], t);
        },
        select: function(e, t) {
            return e.each(function() {
                k(this, t);
            });
        },
        check: function(e, t) {
            return e.each(function() {
                v(this, t, true);
            });
        },
        uncheck: function(e, t) {
            return e.each(function() {
                v(this, t, false);
            });
        },
        collapse: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        },
        expand: function(e, t) {
            return e.each(function() {
                u(this, t);
            });
        },
        collapseAll: function(e, t) {
            return e.each(function() {
                b(this, t);
            });
        },
        expandAll: function(e, t) {
            return e.each(function() {
                i(this, t);
            });
        },
        expandTo: function(e, t) {
            return e.each(function() {
                a(this, t);
            });
        },
        scrollTo: function(e, t) {
            return e.each(function() {
                f(this, t);
            });
        },
        toggle: function(e, t) {
            return e.each(function() {
                c(this, t);
            });
        },
        append: function(e, t) {
            return e.each(function() {
                m(this, t);
            });
        },
        insert: function(e, t) {
            return e.each(function() {
                x(this, t);
            });
        },
        remove: function(e, t) {
            return e.each(function() {
                C(this, t);
            });
        },
        pop: function(e, t) {
            var i = e.tree("getData", t);
            e.tree("remove", t);
            return i;
        },
        update: function(e, t) {
            return e.each(function() {
                w(this, t);
            });
        },
        enableDnd: function(e) {
            return e.each(function() {
                p(this);
            });
        },
        disableDnd: function(e) {
            return e.each(function() {
                t(this);
            });
        },
        beginEdit: function(e, t) {
            return e.each(function() {
                _(this, t);
            });
        },
        endEdit: function(e, t) {
            return e.each(function() {
                F(this, t);
            });
        },
        cancelEdit: function(e, t) {
            return e.each(function() {
                P(this, t);
            });
        },
        doFilter: function(e, t) {
            return e.each(function() {
                B(this, t);
            });
        }
    };
    h.fn.tree.parseOptions = function(e) {
        var t = h(e);
        return h.extend({}, h.parser.parseOptions(e, [ "url", "method", {
            checkbox: "boolean",
            cascadeCheck: "boolean",
            onlyLeafCheck: "boolean"
        }, {
            animate: "boolean",
            lines: "boolean",
            dnd: "boolean"
        } ]));
    };
    h.fn.tree.parseData = function(e) {
        var t = [];
        n(t, h(e));
        return t;
        function n(a, e) {
            e.children("li").each(function() {
                var e = h(this);
                var t = h.extend({}, h.parser.parseOptions(this, [ "id", "iconCls", "state" ]), {
                    checked: e.attr("checked") ? true : undefined
                });
                t.text = e.children("span").html();
                if (!t.text) {
                    t.text = e.html();
                }
                var i = e.children("ul");
                if (i.length) {
                    t.children = [];
                    n(t.children, i);
                }
                a.push(t);
            });
        }
    };
    var W = 1;
    var e = {
        render: function(d, e, t) {
            var c = h.data(d, "tree").options;
            var f = h('<div id="virtual-node" class="tree-node" style="position:absolute;top:-1000px">').appendTo("body");
            var i = h(e).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
            var a = u(i, t);
            h(e).append(a.join(""));
            f.remove();
            function u(e, t) {
                var i = [];
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    if (c.lines && c.autoNodeHeight) {
                        f.empty();
                        var r = h('<span class="tree-title">' + c.formatter.call(d, n) + "</span>").appendTo(f).height();
                    } else {
                        var r = 0;
                    }
                    if (n.state != "open" && n.state != "closed") {
                        n.state = "open";
                    }
                    n.domId = "_hisui_tree_" + W++;
                    i.push("<li>");
                    i.push('<div id="' + n.domId + '" class="tree-node">');
                    for (var o = 0; o < e; o++) {
                        i.push('<span class="tree-indent" ' + (r > 0 ? 'style="height:' + r + 'px"' : "") + "></span>");
                    }
                    var s = false;
                    if (n.state == "closed") {
                        i.push('<span class="tree-hit tree-collapsed" ' + (r > 0 ? 'style="height:' + r + 'px"' : "") + "></span>");
                        if (r > 0) {
                            i.push('<span class="tree-icon tree-folder tree-icon-lines" style="height:' + r + 'px"></span>');
                        } else {
                            i.push('<span class="tree-icon tree-folder ' + (n.iconCls ? n.iconCls : "") + '"></span>');
                        }
                    } else {
                        if (n.children && n.children.length) {
                            i.push('<span class="tree-hit tree-expanded" ' + (r > 0 ? 'style="height:' + r + 'px"' : "") + "></span>");
                            if (r > 0) {
                                i.push('<span class="tree-icon tree-folder tree-folder-open tree-icon-lines" style="height:' + r + 'px"></span>');
                            } else {
                                i.push('<span class="tree-icon tree-folder tree-folder-open ' + (n.iconCls ? n.iconCls : "") + '"></span>');
                            }
                        } else {
                            i.push('<span class="tree-indent" ' + (r > 0 ? 'style="height:' + r + 'px"' : "") + "></span>");
                            if (r > 0) {
                                i.push('<span class="tree-icon tree-file tree-icon-lines" style="height:' + r + 'px"></span>');
                            } else {
                                i.push('<span class="tree-icon tree-file ' + (n.iconCls ? n.iconCls : "") + '"></span>');
                            }
                            s = true;
                        }
                    }
                    if (c.checkbox) {
                        if (!c.onlyLeafCheck || s) {
                            i.push('<span class="tree-checkbox tree-checkbox0"></span>');
                        }
                    }
                    i.push('<span class="tree-title">' + c.formatter.call(d, n) + "</span>");
                    i.push("</div>");
                    if (n.children && n.children.length) {
                        var l = u(e + 1, n.children);
                        i.push('<ul style="display:' + (n.state == "closed" ? "none" : "block") + '">');
                        i = i.concat(l);
                        i.push("</ul>");
                    }
                    i.push("</li>");
                }
                return i;
            }
        }
    };
    h.fn.tree.defaults = {
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
        filter: function(e, t) {
            var i = [];
            h.map(h.isArray(e) ? e : [ e ], function(e) {
                e = h.trim(e);
                if (e) {
                    i.push(e);
                }
            });
            for (var a = 0; a < i.length; a++) {
                var n = t.text.toLowerCase().indexOf(i[a].toLowerCase());
                if (n >= 0) {
                    return true;
                }
            }
            return !i.length;
        },
        loader: function(e, i, t) {
            var a = h(this).tree("options");
            if (!a.url) {
                return false;
            }
            h.ajax({
                type: a.method,
                url: a.url,
                data: e,
                dataType: "json",
                success: function(e) {
                    var t = e;
                    if ("undefined" !== typeof e.code) {
                        if (h.isArray(e.rows)) {
                            t = e.rows;
                        } else if (h.isArray(e.data)) {
                            t = e.data;
                        } else if (h.isArray(e.records)) {
                            t = e.records;
                        } else if (e.data != null && typeof e.data === "object" && h.isArray(e.data) === false) {
                            if (h.isArray(e.data.records)) {
                                t = e.data.records;
                            }
                        }
                    }
                    i(t);
                },
                error: function() {
                    t.apply(this, arguments);
                }
            });
        },
        loadFilter: function(e, t) {
            return e;
        },
        view: e,
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

(function(n) {
    function a(e) {
        n(e).addClass("progressbar");
        n(e).html('<div class="progressbar-text"></div><div class="progressbar-value"><div class="progressbar-text"></div></div>');
        return n(e);
    }
    function r(e, t) {
        var i = n.data(e, "progressbar").options;
        var a = n.data(e, "progressbar").bar;
        if (t) {
            i.width = t;
        }
        a._outerWidth(i.width)._outerHeight(i.height);
        a.find("div.progressbar-text").width(a.width());
        a.find("div.progressbar-text,div.progressbar-value").css({
            height: a.height() + "px",
            lineHeight: a.height() + "px"
        });
    }
    n.fn.progressbar = function(t, e) {
        if (typeof t == "string") {
            var i = n.fn.progressbar.methods[t];
            if (i) {
                return i(this, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = n.data(this, "progressbar");
            if (e) {
                n.extend(e.options, t);
            } else {
                e = n.data(this, "progressbar", {
                    options: n.extend({}, n.fn.progressbar.defaults, n.fn.progressbar.parseOptions(this), t),
                    bar: a(this)
                });
            }
            n(this).progressbar("setValue", e.options.value);
            r(this);
        });
    };
    n.fn.progressbar.methods = {
        options: function(e) {
            return n.data(e[0], "progressbar").options;
        },
        resize: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        getValue: function(e) {
            return n.data(e[0], "progressbar").options.value;
        },
        setValue: function(e, a) {
            if (a < 0) {
                a = 0;
            }
            if (a > 100) {
                a = 100;
            }
            return e.each(function() {
                var e = n.data(this, "progressbar").options;
                var t = e.text.replace(/{value}/, a);
                var i = e.value;
                e.value = a;
                n(this).find("div.progressbar-value").width(a + "%");
                n(this).find("div.progressbar-text").html(t);
                if (i != a) {
                    e.onChange.call(this, a, i);
                }
            });
        }
    };
    n.fn.progressbar.parseOptions = function(e) {
        return n.extend({}, n.parser.parseOptions(e, [ "width", "height", "text", {
            value: "number"
        } ]));
    };
    n.fn.progressbar.defaults = {
        width: "auto",
        height: 22,
        value: 0,
        text: "{value}%",
        onChange: function(e, t) {}
    };
})(jQuery);

(function(l) {
    function i(e) {
        l(e).addClass("tooltip-f");
    }
    function a(t) {
        var i = l.data(t, "tooltip").options;
        l(t).unbind(".tooltip").bind(i.showEvent + ".tooltip", function(e) {
            n(t, e);
        }).bind(i.hideEvent + ".tooltip", function(e) {
            r(t, e);
        }).bind("mousemove.tooltip", function(e) {
            if (i.trackMouse) {
                i.trackMouseX = e.pageX;
                i.trackMouseY = e.pageY;
                d(t);
            }
        });
    }
    function s(e) {
        var t = l.data(e, "tooltip");
        if (t.showTimer) {
            clearTimeout(t.showTimer);
            t.showTimer = null;
        }
        if (t.hideTimer) {
            clearTimeout(t.hideTimer);
            t.hideTimer = null;
        }
    }
    function d(e) {
        var t = l.data(e, "tooltip");
        if (!t || !t.tip) {
            return;
        }
        var i = t.options;
        var a = t.tip;
        if (i.trackMouse) {
            o = l();
            var n = i.trackMouseX + i.deltaX;
            var r = i.trackMouseY + i.deltaY;
        } else {
            var o = l(e);
            var n = o.offset().left + i.deltaX;
            var r = o.offset().top + i.deltaY;
        }
        i.currentPosition = i.position;
        switch (i.position) {
          case "right":
            n += o._outerWidth() + 12 + (i.trackMouse ? 12 : 0);
            r -= (a._outerHeight() - o._outerHeight()) / 2;
            break;

          case "left":
            n -= a._outerWidth() + 12 + (i.trackMouse ? 12 : 0);
            r -= (a._outerHeight() - o._outerHeight()) / 2;
            break;

          case "top":
            n -= (a._outerWidth() - o._outerWidth()) / 2;
            r -= a._outerHeight() + 12 + (i.trackMouse ? 12 : 0);
            break;

          case "bottom":
            n -= (a._outerWidth() - o._outerWidth()) / 2;
            r += o._outerHeight() + 12 + (i.trackMouse ? 12 : 0);
            if (r + a._outerHeight() > document.documentElement["clientHeight"] + window.scrollY) {
                r -= a._outerHeight() + l(e)._outerHeight() + 12 + 12;
                i.currentPosition = "top";
            }
            break;
        }
        var s = 0;
        if (n < 0) {
            s = n;
            n = 0;
        }
        if (!l(e).is(":visible")) {
            n = -1e5;
            r = -1e5;
        }
        a.css({
            left: n,
            top: r,
            zIndex: i.zIndex != undefined ? i.zIndex : l.fn.window ? l.fn.window.defaults.zIndex++ : ""
        });
        if (s < 0) {
            a.children("div.tooltip-arrow").eq(0).css({
                marginLeft: s - 6
            });
        }
        i.onPosition.call(e, n, r);
    }
    function n(a, n) {
        var e = l.data(a, "tooltip");
        var r = e.options;
        var o = e.tip;
        if (!o) {
            o = l('<div tabindex="-1" class="tooltip">' + '<div class="tooltip-content"></div>' + '<div class="tooltip-arrow-outer"></div>' + '<div class="tooltip-arrow"></div>' + "</div>").appendTo("body");
            e.tip = o;
            c(a);
        }
        if (r.tipWidth) o.css("width", r.tipWidth);
        o.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + r.position);
        s(a);
        e.showTimer = setTimeout(function() {
            d(a);
            o.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + r.currentPosition);
            o.show();
            r.onShow.call(a, n);
            var e = o.children(".tooltip-arrow-outer");
            var t = o.children(".tooltip-arrow");
            var i = "border-" + r.currentPosition + "-color";
            e.add(t).css({
                borderTopColor: "",
                borderBottomColor: "",
                borderLeftColor: "",
                borderRightColor: ""
            });
            e.css(i, o.css(i));
            t.css(i, o.css("backgroundColor"));
        }, r.showDelay);
    }
    function r(e, t) {
        var i = l.data(e, "tooltip");
        if (i && i.tip) {
            s(e);
            i.hideTimer = setTimeout(function() {
                i.tip.hide();
                i.options.onHide.call(e, t);
            }, i.options.hideDelay);
        }
    }
    function c(e, t) {
        var i = l.data(e, "tooltip");
        var a = i.options;
        if (t) {
            a.content = t;
        }
        if (!i.tip) {
            return;
        }
        var n = typeof a.content == "function" ? a.content.call(e) : a.content;
        i.tip.children(".tooltip-content").html(l.hisui.getTrans(n));
        a.onUpdate.call(e, n);
    }
    function t(e) {
        var t = l.data(e, "tooltip");
        if (t) {
            s(e);
            var i = t.options;
            if (t.tip) {
                t.tip.remove();
            }
            if (i._title) {
                l(e).attr("title", i._title);
            }
            l.removeData(e, "tooltip");
            l(e).unbind(".tooltip").removeClass("tooltip-f");
            i.onDestroy.call(e);
        }
    }
    l.fn.tooltip = function(t, e) {
        if (typeof t == "string") {
            return l.fn.tooltip.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = l.data(this, "tooltip");
            if (e) {
                l.extend(e.options, t);
            } else {
                l.data(this, "tooltip", {
                    options: l.extend({}, l.fn.tooltip.defaults, l.fn.tooltip.parseOptions(this), t)
                });
                i(this);
            }
            a(this);
            c(this);
        });
    };
    l.fn.tooltip.methods = {
        options: function(e) {
            return l.data(e[0], "tooltip").options;
        },
        tip: function(e) {
            return l.data(e[0], "tooltip").tip;
        },
        arrow: function(e) {
            return e.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
        },
        show: function(e, t) {
            return e.each(function() {
                n(this, t);
            });
        },
        hide: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        update: function(e, t) {
            return e.each(function() {
                c(this, t);
            });
        },
        reposition: function(e) {
            return e.each(function() {
                d(this);
            });
        },
        destroy: function(e) {
            return e.each(function() {
                t(this);
            });
        }
    };
    l.fn.tooltip.parseOptions = function(e) {
        var t = l(e);
        var i = l.extend({}, l.parser.parseOptions(e, [ "position", "showEvent", "hideEvent", "content", "tipWidth", {
            deltaX: "number",
            deltaY: "number",
            showDelay: "number",
            hideDelay: "number"
        } ]), {
            _title: t.attr("title")
        });
        t.attr("title", "");
        if (!i.content) {
            i.content = i._title;
        }
        return i;
    };
    l.fn.tooltip.defaults = {
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
        var s = $.hisui.getStyleCodeConfigValue("mustCalcPanelHeaderCardTitleWidth");
        if (null != a.headerCls && "undefined" != typeof a.headerCls && a.headerCls.indexOf("panel-header-card") > -1 && s) {
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
    function _1ed(t) {
        $(t).addClass("panel-body");
        var e = $('<div class="panel"></div>').insertBefore(t);
        e[0].appendChild(t);
        e.bind("_resize", function() {
            var e = $.data(t, "panel").options;
            if (e.fit == true) {
                _1e3(t);
            }
            return false;
        });
        return e;
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
    function _1f5(t, e) {
        var i = $.data(t, "panel");
        var a = i.options;
        if (n) {
            a.queryParams = e;
        }
        if (a.href) {
            if (!i.isLoaded || !a.cache) {
                var n = $.extend({}, a.queryParams);
                if (a.onBeforeLoad.call(t, n) == false) {
                    return;
                }
                i.isLoaded = false;
                _1fa(t);
                if (a.loadingMessage) {
                    $(t).html($('<div class="panel-loading"></div>').html(a.loadingMessage));
                }
                a.loader.call(t, n, function(e) {
                    r(a.extractor.call(t, e));
                    a.onLoad.apply(t, arguments);
                    i.isLoaded = true;
                }, function() {
                    a.onLoadError.apply(t, arguments);
                });
            }
        } else {
            if (a.content) {
                if (!i.isLoaded) {
                    _1fa(t);
                    r(a.content);
                    i.isLoaded = true;
                }
            }
        }
        function r(e) {
            $(t).html(e);
            $.parser.parse($(t));
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
    $.fn.panel = function(i, e) {
        if (typeof i == "string") {
            return $.fn.panel.methods[i](this, e);
        }
        i = i || {};
        return this.each(function() {
            var e = $.data(this, "panel");
            var t;
            if (e) {
                t = $.extend(e.options, i);
                e.isLoaded = false;
            } else {
                t = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), i);
                $(this).attr("title", "");
                e = $.data(this, "panel", {
                    options: t,
                    panel: _1ed(this),
                    isLoaded: false
                });
            }
            _1f0(this);
            _21c(this);
            if (t.doSize == true) {
                e.panel.css("display", "block");
                _1e3(this);
            }
            if (t.closed == true || t.minimized == true) {
                e.panel.hide();
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

(function(o) {
    function a(e, t) {
        var i = o.data(e, "window").options;
        if (t) {
            o.extend(i, t);
        }
        o(e).panel("resize", i);
    }
    function s(e, t) {
        var i = o.data(e, "window");
        if (t) {
            if (t.left != null) {
                i.options.left = t.left;
            }
            if (t.top != null) {
                i.options.top = t.top;
            }
        }
        o(e).panel("move", i.options);
        if (i.shadow) {
            i.shadow.css({
                left: i.options.left,
                top: i.options.top
            });
        }
    }
    function r(e, t) {
        var i = o.data(e, "window");
        var a = i.options;
        var n = a.width;
        if (isNaN(n)) {
            n = i.window._outerWidth();
        }
        if (a.inline) {
            var r = i.window.parent();
            a.left = (r.width() - n) / 2 + r.scrollLeft();
        } else {
            a.left = (o(window)._outerWidth() - n) / 2 + o(document).scrollLeft();
        }
        if (t) {
            s(e);
        }
    }
    function l(e, t) {
        var i = o.data(e, "window");
        var a = i.options;
        var n = a.height;
        if (isNaN(n)) {
            n = i.window._outerHeight();
        }
        if (a.inline) {
            var r = i.window.parent();
            a.top = (r.height() - n) / 2 + r.scrollTop();
        } else {
            a.top = (o(window)._outerHeight() - n) / 2 + o(document).scrollTop();
        }
        if (t) {
            s(e);
        }
    }
    function n(a) {
        var n = o.data(a, "window");
        var e = n.options.closed;
        var t = o(a).panel(o.extend({}, n.options, {
            border: false,
            doSize: true,
            closed: true,
            cls: "window",
            headerCls: "window-header",
            bodyCls: "window-body " + (n.options.noheader ? "window-body-noheader" : ""),
            onBeforeDestroy: function() {
                if (n.options.onBeforeDestroy.call(a) == false) {
                    return false;
                }
                if (n.shadow) {
                    n.shadow.remove();
                }
                if (n.mask) {
                    n.mask.remove();
                }
            },
            onClose: function() {
                if (n.shadow) {
                    n.shadow.hide();
                }
                if (n.mask) {
                    n.mask.hide();
                }
                n.options.onClose.call(a);
            },
            onOpen: function() {
                if (n.mask) {
                    n.mask.css({
                        display: "block",
                        zIndex: o.fn.window.defaults.zIndex++
                    });
                }
                if (n.shadow) {
                    n.shadow.css({
                        display: "block",
                        zIndex: o.fn.window.defaults.zIndex++,
                        left: n.options.left,
                        top: n.options.top,
                        width: n.window._outerWidth(),
                        height: n.window._outerHeight()
                    });
                }
                n.window.css("z-index", o.fn.window.defaults.zIndex++);
                n.options.onOpen.call(a);
            },
            onResize: function(e, t) {
                var i = o(this).panel("options");
                o.extend(n.options, {
                    width: i.width,
                    height: i.height,
                    left: i.left,
                    top: i.top
                });
                if (n.shadow) {
                    n.shadow.css({
                        left: n.options.left,
                        top: n.options.top,
                        width: n.window._outerWidth(),
                        height: n.window._outerHeight()
                    });
                }
                n.options.onResize.call(a, e, t);
            },
            onMinimize: function() {
                if (n.shadow) {
                    n.shadow.hide();
                }
                if (n.mask) {
                    n.mask.hide();
                }
                n.options.onMinimize.call(a);
            },
            onBeforeCollapse: function() {
                if (n.options.onBeforeCollapse.call(a) == false) {
                    return false;
                }
                if (n.shadow) {
                    n.shadow.hide();
                }
            },
            onExpand: function() {
                if (n.shadow) {
                    n.shadow.show();
                }
                n.options.onExpand.call(a);
            }
        }));
        n.window = t.panel("panel");
        if (n.mask) {
            n.mask.remove();
        }
        if (n.options.modal == true) {
            var i = "";
            if (n.options.isTopZindex) {
                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    i = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
                }
            }
            n.mask = o('<div class="window-mask">' + i + "</div>").insertAfter(n.window);
            n.mask.css({
                width: n.options.inline ? n.mask.parent().width() : c().width,
                height: n.options.inline ? n.mask.parent().height() : c().height,
                display: "none"
            });
        }
        if (n.shadow) {
            n.shadow.remove();
        }
        if (n.options.shadow == true) {
            n.shadow = o('<div class="window-shadow"></div>').insertAfter(n.window);
            n.shadow.css({
                display: "none"
            });
        }
        if (n.options.left == null) {
            r(a);
        }
        if (n.options.top == null) {
            l(a);
        }
        s(a);
        if (!e) {
            t.window("open");
        }
    }
    function d(t) {
        var i = o.data(t, "window");
        i.window.draggable({
            handle: ">div.panel-header>div.panel-title",
            disabled: i.options.draggable == false,
            onStartDrag: function(e) {
                if (i.mask) {
                    i.mask.css("z-index", o.fn.window.defaults.zIndex++);
                }
                if (i.shadow) {
                    i.shadow.css("z-index", o.fn.window.defaults.zIndex++);
                }
                i.window.css("z-index", o.fn.window.defaults.zIndex++);
                if (!i.proxy) {
                    i.proxy = o('<div class="window-proxy"></div>').insertAfter(i.window);
                }
                i.proxy.css({
                    display: "none",
                    zIndex: o.fn.window.defaults.zIndex++,
                    left: e.data.left,
                    top: e.data.top
                });
                i.proxy._outerWidth(i.window._outerWidth());
                i.proxy._outerHeight(i.window._outerHeight());
                setTimeout(function() {
                    if (i.proxy) {
                        i.proxy.show();
                    }
                }, 500);
            },
            onDrag: function(e) {
                i.proxy.css({
                    display: "block",
                    left: e.data.left,
                    top: e.data.top
                });
                return false;
            },
            onStopDrag: function(e) {
                i.options.left = e.data.left;
                i.options.top = e.data.top;
                o(t).window("move");
                i.proxy.remove();
                i.proxy = null;
            }
        });
        i.window.resizable({
            disabled: i.options.resizable == false,
            onStartResize: function(e) {
                i.pmask = o('<div class="window-proxy-mask"></div>').insertAfter(i.window);
                i.pmask.css({
                    zIndex: o.fn.window.defaults.zIndex++,
                    left: e.data.left,
                    top: e.data.top,
                    width: i.window._outerWidth(),
                    height: i.window._outerHeight()
                });
                if (!i.proxy) {
                    i.proxy = o('<div class="window-proxy"></div>').insertAfter(i.window);
                }
                i.proxy.css({
                    zIndex: o.fn.window.defaults.zIndex++,
                    left: e.data.left,
                    top: e.data.top
                });
                i.proxy._outerWidth(e.data.width);
                i.proxy._outerHeight(e.data.height);
            },
            onResize: function(e) {
                i.proxy.css({
                    left: e.data.left,
                    top: e.data.top
                });
                i.proxy._outerWidth(e.data.width);
                i.proxy._outerHeight(e.data.height);
                return false;
            },
            onStopResize: function(e) {
                o.extend(i.options, {
                    left: e.data.left,
                    top: e.data.top,
                    width: e.data.width,
                    height: e.data.height
                });
                a(t);
                i.pmask.remove();
                i.pmask = null;
                i.proxy.remove();
                i.proxy = null;
            }
        });
    }
    function c() {
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
    o(window).resize(function() {
        o("body>div.window-mask").css({
            width: o(window)._outerWidth(),
            height: o(window)._outerHeight()
        });
        setTimeout(function() {
            o("body>div.window-mask").css({
                width: c().width,
                height: c().height
            });
        }, 50);
    });
    o.fn.window = function(t, e) {
        if (typeof t == "string") {
            var i = o.fn.window.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.panel(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = o.data(this, "window");
            if (e) {
                o.extend(e.options, t);
            } else {
                e = o.data(this, "window", {
                    options: o.extend({}, o.fn.window.defaults, o.fn.window.parseOptions(this), t)
                });
                if (!e.options.inline) {
                    document.body.appendChild(this);
                }
            }
            n(this);
            d(this);
        });
    };
    o.fn.window.methods = {
        options: function(e) {
            var t = e.panel("options");
            var i = o.data(e[0], "window").options;
            return o.extend(i, {
                closed: t.closed,
                collapsed: t.collapsed,
                minimized: t.minimized,
                maximized: t.maximized
            });
        },
        window: function(e) {
            return o.data(e[0], "window").window;
        },
        resize: function(e, t) {
            return e.each(function() {
                a(this, t);
            });
        },
        move: function(e, t) {
            return e.each(function() {
                s(this, t);
            });
        },
        hcenter: function(e) {
            return e.each(function() {
                r(this, true);
            });
        },
        vcenter: function(e) {
            return e.each(function() {
                l(this, true);
            });
        },
        center: function(e) {
            return e.each(function() {
                r(this);
                l(this);
                s(this);
            });
        }
    };
    o.fn.window.parseOptions = function(e) {
        return o.extend({}, o.fn.panel.parseOptions(e), o.parser.parseOptions(e, [ {
            draggable: "boolean",
            resizable: "boolean",
            shadow: "boolean",
            modal: "boolean",
            inline: "boolean"
        } ]));
    };
    o.fn.window.defaults = o.extend({}, o.fn.panel.defaults, {
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
    $.fn.dialog = function(t, e) {
        if (typeof t == "string") {
            var i = $.fn.dialog.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.window(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = $.data(this, "dialog");
            if (e) {
                $.extend(e.options, t);
            } else {
                $.data(this, "dialog", {
                    options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), t),
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
        win.window("window").addClass("messager-window").addClass("messager-window-" + (options.icon || "info"));
        win.children("div.messager-button").children("a:first").focus();
        return win;
    }
    function _createMessageWindow(title, message, bbuttons, bbuttonsSort) {
        var win = $('<div class="messager-body"></div>').appendTo("body");
        win.append(message);
        if (bbuttons) {
            var tb = $('<div class="messager-button"></div>').appendTo(win);
            var mybuttonIndex = 0;
            if (bbuttonsSort) {
                for (var sortIndex = 0; sortIndex < bbuttonsSort.length; sortIndex++) {
                    var _283 = bbuttonsSort[sortIndex];
                    $("<a></a>").attr("href", "javascript:void(0)").text($.messager.defaults[_283]).css("margin-left", mybuttonIndex == 0 ? 0 : 10).bind("click", eval(bbuttons[_283])).appendTo(tb).linkbutton();
                    mybuttonIndex++;
                }
            } else {
                for (var _283 in bbuttons) {
                    $("<a></a>").attr("href", "javascript:void(0)").text($.messager.defaults[_283]).css("margin-left", mybuttonIndex == 0 ? 0 : 10).bind("click", eval(bbuttons[_283])).appendTo(tb).linkbutton();
                    mybuttonIndex++;
                }
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
            title: title,
            noheader: title ? false : true,
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
                content: '<div class="' + r + '"></div>' + '<div style="margin-left:42px">' + n.msg + "</div>" + '<div style="clear:both;"/>',
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
                o.window("close");
                if (i) {
                    i(true);
                    return false;
                }
            };
            n["cancel"] = function() {
                o.window("close");
                if (i) {
                    i(false);
                    return false;
                }
            };
            var r = $.hisui.getStyleCodeConfigValue("messagerConfirmBtnIndex");
            var o = _createMessageWindow(e, a, n, r);
            return o;
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
                o.window("close");
                if (i) {
                    i(true);
                    return false;
                }
            };
            n["no"] = function() {
                o.window("close");
                if (i) {
                    i(false);
                    return false;
                }
            };
            n["cancel"] = function() {
                o.window("close");
                if (i) {
                    i(undefined);
                    return false;
                }
            };
            var r = $.hisui.getStyleCodeConfigValue("messagerConfirm3BtnIndex");
            var o = _createMessageWindow(e, a, n, r);
            return o;
        },
        confirm3: function(e, t, i) {
            return $.messager.confirm3SrcMsg(e, $.hisui.getTrans(t), i);
        },
        promptSrcMsg: function(e, t, i) {
            var a = '<div class="messager-icon messager-question"></div>' + '<div style="margin-left:42px">' + t + "</div>" + "<br/>" + '<div style="clear:both;"/>' + '<div><input class="messager-input" type="text"/></div>';
            var n = {};
            n["ok"] = function(e) {
                if (e && ("undefined" != typeof e.clientY && e.clientY < 0)) return false;
                if (e && ("undefined" != typeof e.clientX && e.clientX < 0)) return false;
                o.window("close");
                if (i) {
                    i($(".messager-input", o).val());
                    return false;
                }
            };
            n["cancel"] = function() {
                o.window("close");
                if (i) {
                    i();
                    return false;
                }
            };
            var r = $.hisui.getStyleCodeConfigValue("messagerPromptBtnIndex");
            var o = _createMessageWindow(e, a, n, r);
            o.find("input.messager-input").eq(0).focus();
            return o;
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
            var r = _createMessageWindow(a.title, n, null);
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
            var n = $(".messager-popover:visible");
            if (n.length > 0) {
                if (i.style.top == "") {
                    var r = 30;
                    if (n.last()._outerHeight() > 20) {
                        r = n.last()._outerHeight();
                    }
                    i.style.top = n.last().offset().top + r + 10;
                }
            }
            var o = $(a).appendTo("body");
            if (i.style.left == "") {
                i.style.left = document.body.clientWidth / 2 - o.width() / 2;
            }
            if (i.style.top == "") {
                i.style.top = document.body.clientHeight / 2 - o.height() / 2;
            }
            o.css(i.style);
            switch (i.showType) {
              case null:
                o.show();
                break;

              case "slide":
                o.slideDown(i.showSpeed, "swing", function() {
                    var e = $(".messager-popover:visible");
                    if (e.length >= 2) {
                        var t = e.eq(length - 2);
                        o.css({
                            top: t.offset().top + t._outerHeight() + 10
                        });
                    }
                });
                break;

              case "fade":
                o.fadeIn(i.showSpeed);
                break;

              case "show":
                o.show(i.showSpeed);
                break;
            }
            o.find(".close").click(function() {
                o.remove();
            });
            if (i.timeout > 0) {
                var s = setTimeout(function() {
                    switch (i.showType) {
                      case null:
                        o.hide();
                        break;

                      case "slide":
                        o.slideUp(i.showSpeed);
                        break;

                      case "fade":
                        o.fadeOut(i.showSpeed);
                        break;

                      case "show":
                        o.hide(i.showSpeed);
                        break;
                    }
                    setTimeout(function() {
                        o.remove();
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

(function(c) {
    function d(e) {
        var t = c.data(e, "accordion");
        var i = t.options;
        var s = t.panels;
        var l = c(e);
        i.fit ? c.extend(i, l._fit()) : l._fit(false);
        if (!isNaN(i.width)) {
            l._outerWidth(i.width);
        } else {
            l.css("width", "");
        }
        var d = 0;
        var a = "auto";
        var n = l.find(">div.panel>div.accordion-header");
        if (n.length) {
            d = c(n[0]).css("height", "")._outerHeight();
        }
        if (!isNaN(i.height)) {
            l._outerHeight(i.height);
            a = l.height() - d * n.length;
            var r = c.hisui.getStyleCodeConfigValue("accordionBodyExHeight");
            a += parseInt(r);
        } else {
            l.css("height", "");
        }
        if (l.hasClass("accordion-gray")) {
            a -= 4 * (n.length - 1) + 1;
        }
        o(true, a - o(false) + 1);
        function o(e, t) {
            var i = 0;
            for (var a = 0; a < s.length; a++) {
                var n = s[a];
                var r = n.panel("header")._outerHeight(d);
                if (n.panel("options").collapsible == e) {
                    var o = isNaN(t) ? undefined : t + d * r.length;
                    n.panel("resize", {
                        width: l.width(),
                        height: e ? o : undefined
                    });
                    i += n.panel("panel").outerHeight() - d;
                }
            }
            return i;
        }
    }
    function n(e, t, i, a) {
        var n = c.data(e, "accordion").panels;
        var r = [];
        for (var o = 0; o < n.length; o++) {
            var s = n[o];
            if (t) {
                if (s.panel("options")[t] == i) {
                    r.push(s);
                }
            } else {
                if (s[0] == c(i)[0]) {
                    return o;
                }
            }
        }
        if (t) {
            return a ? r : r.length ? r[0] : null;
        } else {
            return -1;
        }
    }
    function s(e) {
        return n(e, "collapsed", false, true);
    }
    function f(e) {
        var t = s(e);
        return t.length ? t[0] : null;
    }
    function u(e, t) {
        return n(e, null, t);
    }
    function h(e, t) {
        var i = c.data(e, "accordion").panels;
        if (typeof t == "number") {
            if (t < 0 || t >= i.length) {
                return null;
            } else {
                return i[t];
            }
        }
        return n(e, "title", t);
    }
    function i(e) {
        var t = c.data(e, "accordion").options;
        var i = c(e);
        if (t.border) {
            i.removeClass("accordion-noborder");
        } else {
            i.addClass("accordion-noborder");
        }
    }
    function a(a) {
        var i = c.data(a, "accordion");
        var e = c(a);
        e.addClass("accordion");
        i.panels = [];
        e.children("div").each(function() {
            var e = c.extend({}, c.parser.parseOptions(this), {
                selected: c(this).attr("selected") ? true : undefined
            });
            var t = c(this);
            i.panels.push(t);
            o(a, t, e);
        });
        e.bind("_resize", function(e, t) {
            var i = c.data(a, "accordion").options;
            if (i.fit == true || t) {
                d(a);
            }
            return false;
        });
    }
    function o(a, t, n) {
        var r = c.data(a, "accordion").options;
        t.panel(c.extend({}, {
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
                if (!r.multiple) {
                    var e = c.grep(s(a), function(e) {
                        return e.panel("options").collapsible;
                    });
                    for (var t = 0; t < e.length; t++) {
                        l(a, u(a, e[t]));
                    }
                }
                var i = c(this).panel("header");
                i.addClass("accordion-header-selected");
                i.find(".accordion-collapse").removeClass("accordion-expand");
            },
            onExpand: function() {
                if (n.onExpand) {
                    n.onExpand.call(this);
                }
                r.onSelect.call(a, c(this).panel("options").title, u(a, this));
            },
            onBeforeCollapse: function() {
                if (n.onBeforeCollapse) {
                    if (n.onBeforeCollapse.call(this) == false) {
                        return false;
                    }
                }
                var e = c(this).panel("header");
                e.removeClass("accordion-header-selected");
                e.find(".accordion-collapse").addClass("accordion-expand");
            },
            onCollapse: function() {
                if (n.onCollapse) {
                    n.onCollapse.call(this);
                }
                r.onUnselect.call(a, c(this).panel("options").title, u(a, this));
            }
        }));
        var e = t.panel("header");
        var i = e.children("div.panel-tool");
        i.children("a.panel-tool-collapse").hide();
        var o = c('<a href="javascript:void(0)"></a>').addClass("accordion-collapse accordion-expand").appendTo(i);
        o.bind("click", function() {
            var e = u(a, t);
            if (t.panel("options").collapsed) {
                p(a, e);
            } else {
                l(a, e);
            }
            return false;
        });
        t.panel("options").collapsible ? o.show() : o.hide();
        e.click(function() {
            c(this).find("a.accordion-collapse:visible").triggerHandler("click");
            return false;
        });
    }
    function p(e, t) {
        var i = h(e, t);
        if (!i) {
            return;
        }
        v(e);
        var a = c.data(e, "accordion").options;
        i.panel("expand", a.animate);
    }
    function l(e, t) {
        var i = h(e, t);
        if (!i) {
            return;
        }
        v(e);
        var a = c.data(e, "accordion").options;
        i.panel("collapse", a.animate);
    }
    function r(i) {
        var a = c.data(i, "accordion").options;
        var e = n(i, "selected", true);
        if (e) {
            t(u(i, e));
        } else {
            t(a.selected);
        }
        function t(e) {
            var t = a.animate;
            a.animate = false;
            p(i, e);
            a.animate = t;
        }
    }
    function v(e) {
        var t = c.data(e, "accordion").panels;
        for (var i = 0; i < t.length; i++) {
            t[i].stop(true, true);
        }
    }
    function g(e, t) {
        var i = c.data(e, "accordion");
        var a = i.options;
        var n = i.panels;
        if (t.selected == undefined) {
            t.selected = true;
        }
        v(e);
        var r = c("<div></div>").appendTo(e);
        n.push(r);
        o(e, r, t);
        d(e);
        a.onAdd.call(e, t.title, n.length - 1);
        if (t.selected) {
            p(e, n.length - 1);
        }
    }
    function b(e, t) {
        var i = c.data(e, "accordion");
        var a = i.options;
        var n = i.panels;
        v(e);
        var r = h(e, t);
        var o = r.panel("options").title;
        var s = u(e, r);
        if (!r) {
            return;
        }
        if (a.onBeforeRemove.call(e, o, s) == false) {
            return;
        }
        n.splice(s, 1);
        r.panel("destroy");
        if (n.length) {
            d(e);
            var l = f(e);
            if (!l) {
                p(e, 0);
            }
        }
        a.onRemove.call(e, o, s);
    }
    c.fn.accordion = function(t, e) {
        if (typeof t == "string") {
            return c.fn.accordion.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = c.data(this, "accordion");
            if (e) {
                c.extend(e.options, t);
            } else {
                c.data(this, "accordion", {
                    options: c.extend({}, c.fn.accordion.defaults, c.fn.accordion.parseOptions(this), t),
                    accordion: c(this).addClass("accordion"),
                    panels: []
                });
                a(this);
            }
            i(this);
            d(this);
            r(this);
        });
    };
    c.fn.accordion.methods = {
        options: function(e) {
            return c.data(e[0], "accordion").options;
        },
        panels: function(e) {
            return c.data(e[0], "accordion").panels;
        },
        resize: function(e) {
            return e.each(function() {
                d(this);
            });
        },
        getSelections: function(e) {
            return s(e[0]);
        },
        getSelected: function(e) {
            return f(e[0]);
        },
        getPanel: function(e, t) {
            return h(e[0], t);
        },
        getPanelIndex: function(e, t) {
            return u(e[0], t);
        },
        select: function(e, t) {
            return e.each(function() {
                p(this, t);
            });
        },
        unselect: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        add: function(e, t) {
            return e.each(function() {
                g(this, t);
            });
        },
        remove: function(e, t) {
            return e.each(function() {
                b(this, t);
            });
        }
    };
    c.fn.accordion.parseOptions = function(e) {
        var t = c(e);
        return c.extend({}, c.parser.parseOptions(e, [ "width", "height", {
            fit: "boolean",
            border: "boolean",
            animate: "boolean",
            multiple: "boolean",
            selected: "number"
        } ]));
    };
    c.fn.accordion.defaults = {
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
    function createSimpleContextMenu(n) {
        var e = $.data(n, "tabs");
        var t = e.options;
        if (t.simpleContextMenu) {
            var r = $('<div class="tabs-ctx-menu">' + '<div class="tabs-ctx-menu-refresh" >刷新</div>' + '<div class="menu-sep" ></div>' + '<div class="tabs-ctx-menu-close" >关闭</div>' + '<div class="tabs-ctx-menu-closeother" >关闭其他</div>' + '<div class="tabs-ctx-menu-closeall" >关闭全部</div>' + '<div class="tabs-ctx-menu-closeleft" >关闭左侧</div>' + '<div class="tabs-ctx-menu-closeright">关闭右侧</div>' + "</div>").appendTo("body");
            r.menu({});
            e.ctxmenu = r;
            r.find(".tabs-ctx-menu-refresh").off("click.tabs").on("click.tabs", function() {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                var e = r.data("currtab"), t = $(n).tabs("getTab", e);
                var i = t.find("iframe");
                $(n).tabs("select", e);
                if (i.length > 0) {
                    i.attr("src", i.attr("src"));
                }
            });
            r.find(".tabs-ctx-menu-close").off("click.tabs").on("click.tabs", function() {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                var e = r.data("currtab");
                $(n).tabs("close", e);
            });
            r.find(".tabs-ctx-menu-closeother").off("click.tabs").on("click.tabs", function() {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                var e = r.data("currtab"), t = e;
                var i = $(n).tabs("tabs");
                for (var a = i.length - 1; a > 0; a--) {
                    if (a != e) {
                        $(n).tabs("close", a);
                        if (a < e) t--;
                    }
                }
                $(n).tabs("select", t);
                return false;
            });
            r.find(".tabs-ctx-menu-closeall").off("click.tabs").on("click.tabs", function() {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                var e = $(n).tabs("tabs");
                for (var t = e.length - 1; t > 0; t--) {
                    $(n).tabs("close", t);
                }
            });
            r.find(".tabs-ctx-menu-closeleft").off("click.tabs").on("click.tabs", function() {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                var e = r.data("currtab"), t = e;
                var i = $(n).tabs("tabs");
                for (var a = i.length - 1; a > 0; a--) {
                    if (a < e) {
                        $(n).tabs("close", a);
                        if (a < e) t--;
                    }
                }
                $(n).tabs("select", t);
                return false;
            });
            r.find(".tabs-ctx-menu-closeright").off("click.tabs").on("click.tabs", function() {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                var e = r.data("currtab"), t = e;
                var i = $(n).tabs("tabs");
                for (var a = i.length - 1; a > 0; a--) {
                    if (a > e) {
                        $(n).tabs("close", a);
                    }
                }
                $(n).tabs("select", t);
                return false;
            });
        }
    }
    function showSimpleContextMenu(e, t, i, a) {
        var n = $.data(e, "tabs");
        var r = n.ctxmenu;
        var o = n.options;
        var s = $(e).tabs("tabs").length;
        var l = $(e).tabs("getTab", a);
        var d = l.panel("options").closable;
        var c = l.find("iframe");
        if (c.length == 0) {
            r.menu("disableItem", r.find(".tabs-ctx-menu-refresh")[0]);
        } else {
            r.menu("enableItem", r.find(".tabs-ctx-menu-refresh")[0]);
        }
        if (!d) {
            r.menu("disableItem", r.find(".tabs-ctx-menu-close")[0]);
        } else {
            r.menu("enableItem", r.find(".tabs-ctx-menu-close")[0]);
        }
        if (a > 1) {
            r.menu("enableItem", r.find(".tabs-ctx-menu-closeleft")[0]);
        } else {
            r.menu("disableItem", r.find(".tabs-ctx-menu-closeleft")[0]);
        }
        if (a < s - 1) {
            r.menu("enableItem", r.find(".tabs-ctx-menu-closeright")[0]);
        } else {
            r.menu("disableItem", r.find(".tabs-ctx-menu-closeright")[0]);
        }
        if (a > 1 || a < s - 1) {
            r.menu("enableItem", r.find(".tabs-ctx-menu-closeother")[0]);
        } else {
            r.menu("disableItem", r.find(".tabs-ctx-menu-closeother")[0]);
        }
        r.menu("show", {
            left: t.pageX,
            top: t.pageY
        });
        r.data("currtab", a);
    }
    var debounced_showSimpleContextMenu = $.hisui.debounce(showSimpleContextMenu, 200);
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
    function wrapTabs(a) {
        var n = $.data(a, "tabs").tabs;
        var e = $(a);
        e.addClass("tabs-container");
        var t = $('<div class="tabs-panels"></div>').insertBefore(e);
        e.children("div").each(function() {
            t[0].appendChild(this);
        });
        e[0].appendChild(t[0]);
        $('<div class="tabs-header">' + '<div class="tabs-scroller-left"></div>' + '<div class="tabs-scroller-right"></div>' + '<div class="tabs-wrap">' + '<ul class="tabs"></ul>' + "</div>" + "</div>").prependTo(a);
        e.children("div.tabs-panels").children("div").each(function(e) {
            var t = $.extend({}, $.parser.parseOptions(this), {
                selected: $(this).attr("selected") ? true : undefined
            });
            var i = $(this);
            n.push(i);
            createTab(a, i, t);
        });
        e.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function() {
            $(this).addClass("tabs-scroller-over");
        }, function() {
            $(this).removeClass("tabs-scroller-over");
        });
        e.bind("_resize", function(e, t) {
            var i = $.data(a, "tabs").options;
            if (i.fit == true || t) {
                setSize(a);
                setSelectedSize(a);
            }
            return false;
        });
    }
    function bindEvents(r) {
        var o = $.data(r, "tabs");
        var s = o.options;
        $(r).children("div.tabs-header").unbind().bind("click", function(e) {
            if ($(e.target).hasClass("tabs-scroller-left")) {
                $(r).tabs("scrollBy", -s.scrollIncrement);
            } else {
                if ($(e.target).hasClass("tabs-scroller-right")) {
                    $(r).tabs("scrollBy", s.scrollIncrement);
                } else {
                    var t = $(e.target).closest("li");
                    if (t.hasClass("tabs-disabled")) {
                        return;
                    }
                    var i = $(e.target).closest("a.tabs-close");
                    if (i.length) {
                        closeTab(r, l(t));
                    } else {
                        if (t.length) {
                            var a = l(t);
                            var n = o.tabs[a].panel("options");
                            if (n.collapsible) {
                                n.closed ? selectTab(r, a) : unselectTab(r, a);
                            } else {
                                selectTab(r, a);
                            }
                        }
                    }
                }
            }
        }).bind("contextmenu", function(e) {
            var t = $(e.target).closest("li");
            if (t.hasClass("tabs-disabled")) {
                return;
            }
            if (t.length) {
                var i = l(t);
                var a = getTab(r, i).panel("options").title;
                var i = l(t);
                var a = getTab(r, i).panel("options").title;
                if (s.simpleContextMenu) {
                    e.preventDefault();
                    debounced_showSimpleContextMenu(r, e, a, i);
                }
                s.onContextMenu.call(r, e, a, i);
            }
        });
        function l(t) {
            var i = 0;
            t.parent().children("li").each(function(e) {
                if (t[0] == this) {
                    i = e;
                    return false;
                }
            });
            return i;
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
    $.fn.tabs = function(i, e) {
        if (typeof i == "string") {
            return $.fn.tabs.methods[i](this, e);
        }
        i = i || {};
        return this.each(function() {
            var e = $.data(this, "tabs");
            var t;
            if (e) {
                t = $.extend(e.options, i);
                e.options = t;
            } else {
                $.data(this, "tabs", {
                    options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), i),
                    tabs: [],
                    selectHis: []
                });
                wrapTabs(this);
            }
            addTools(this);
            createSimpleContextMenu(this);
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
        scrollBy: function(e, n) {
            return e.each(function() {
                var e = $(this).tabs("options");
                var i = $(this).find(">div.tabs-header>div.tabs-wrap");
                var t = Math.min(i._scrollLeft() + n, a());
                i.animate({
                    scrollLeft: t
                }, e.scrollDuration);
                function a() {
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
        onContextMenu: function(e, t, i) {},
        simpleContextMenu: false
    };
})(jQuery);

(function(u) {
    var h = false;
    function f(e) {
        var t = u.data(e, "layout");
        var i = t.options;
        var a = t.panels;
        var n = u(e);
        if (e.tagName == "BODY") {
            n._fit();
        } else {
            i.fit ? n.css(n._fit()) : n._fit(false);
        }
        var r = {
            top: 0,
            left: 0,
            width: n.width(),
            height: n.height()
        };
        if (e.tagName !== "BODY") {
            var o = u(e).parent();
            if (o[0].tagName === "BODY") {
                r.height = r.height - parseInt(o.css("padding-top")) - parseInt(o.css("padding-bottom"));
            }
        }
        d(b(a.expandNorth) ? a.expandNorth : a.north, "n");
        d(b(a.expandSouth) ? a.expandSouth : a.south, "s");
        c(b(a.expandEast) ? a.expandEast : a.east, "e");
        c(b(a.expandWest) ? a.expandWest : a.west, "w");
        a.center.panel("resize", r);
        p(a);
        function s(e) {
            var t = e.panel("options");
            return Math.min(Math.max(t.height, t.minHeight), t.maxHeight);
        }
        function l(e) {
            var t = e.panel("options");
            return Math.min(Math.max(t.width, t.minWidth), t.maxWidth);
        }
        function d(e, t) {
            if (!e.length || !b(e)) {
                return;
            }
            var i = e.panel("options");
            var a = s(e);
            e.panel("resize", {
                width: n.width(),
                height: a,
                left: 0,
                top: t == "n" ? 0 : n.height() - a
            });
            r.height -= a;
            if (t == "n") {
                r.top += a;
                if (!i.split && i.border) {
                    r.top--;
                }
            }
            if (!i.split && i.border) {
                r.height++;
            }
        }
        function c(e, t) {
            if (!e.length || !b(e)) {
                return;
            }
            var i = e.panel("options");
            var a = l(e);
            e.panel("resize", {
                width: a,
                height: r.height,
                left: t == "e" ? n.width() - a : 0,
                top: r.top
            });
            r.width -= a;
            if (t == "w") {
                r.left += a;
                if (!i.split && i.border) {
                    r.left--;
                }
            }
            if (!i.split && i.border) {
                r.width++;
            }
        }
    }
    function p(e) {
        var t = "";
        if (e.north.hasClass("layout")) {
            t = e.north[0];
        }
        if (e.south.hasClass("layout")) {
            t = e.south[0];
        }
        if (e.east.hasClass("layout")) {
            t = e.east[0];
        }
        if (e.west.hasClass("layout")) {
            t = e.west[0];
        }
        if (u.data(t, "layout")) {
            f(t);
        }
    }
    function a(a) {
        var e = u(a);
        e.addClass("layout");
        function t(e) {
            e.children("div").each(function() {
                var e = u.fn.layout.parsePanelOptions(this);
                if ("north,south,east,west,center".indexOf(e.region) >= 0) {
                    i(a, e, this);
                }
            });
        }
        e.children("form").length ? t(e.children("form")) : t(e);
        e.append('<div class="layout-split-proxy-h"></div><div class="layout-split-proxy-v"></div>');
        e.bind("_resize", function(e, t) {
            var i = u.data(a, "layout").options;
            if (i.fit == true || t) {
                f(a);
            }
            return false;
        });
    }
    function i(s, e, t) {
        e.region = e.region || "center";
        var i = u.data(s, "layout").panels;
        var l = u(s);
        var d = e.region;
        if (i[d].length) {
            return;
        }
        var a = u(t);
        if (!a.length) {
            a = u("<div></div>").appendTo(l);
        }
        var n = u.extend({}, u.fn.layout.paneldefaults, {
            width: a.length ? parseInt(a[0].style.width) || a.outerWidth() : "auto",
            height: a.length ? parseInt(a[0].style.height) || a.outerHeight() : "auto",
            doSize: false,
            collapsible: true,
            cls: "layout-panel layout-panel-" + d,
            bodyCls: "layout-body",
            onOpen: function() {
                var e = u(this).panel("header").children("div.panel-tool");
                e.children("a.panel-tool-collapse").hide();
                var t = {
                    north: "up",
                    south: "down",
                    east: "right",
                    west: "left"
                };
                if (!t[d]) {
                    return;
                }
                var i = "layout-button-" + t[d];
                var a = e.children("a." + i);
                if (!a.length) {
                    a = u('<a href="javascript:void(0)"></a>').addClass(i).appendTo(e);
                    a.bind("click", {
                        dir: d
                    }, function(e) {
                        v(s, e.data.dir);
                        return false;
                    });
                }
                u(this).panel("options").collapsible ? a.show() : a.hide();
            }
        }, e);
        a.panel(n);
        i[d] = a;
        if (a.panel("options").isBigPadding || a.panel("options").isNormalPadding) {
            if (a.panel("options").isBigPadding) {
                a.panel("panel").addClass("layout-big-split-" + d);
            }
            if (a.panel("options").isNormalPadding) {
                a.panel("panel").addClass("layout-split-" + d);
            }
        }
        if (a.panel("options").split) {
            var c = a.panel("panel");
            c.addClass("layout-split-" + d);
            var r = "";
            if (d == "north") {
                r = "s";
            }
            if (d == "south") {
                r = "n";
            }
            if (d == "east") {
                r = "w";
            }
            if (d == "west") {
                r = "e";
            }
            c.resizable(u.extend({}, {
                handles: r,
                onStartResize: function(e) {
                    h = true;
                    if (d == "north" || d == "south") {
                        var t = u(">div.layout-split-proxy-v", s);
                    } else {
                        var t = u(">div.layout-split-proxy-h", s);
                    }
                    var i = 0, a = 0, n = 0, r = 0;
                    var o = {
                        display: "block"
                    };
                    if (d == "north") {
                        o.top = parseInt(c.css("top")) + c.outerHeight() - t.height();
                        o.left = parseInt(c.css("left"));
                        o.width = c.outerWidth();
                        o.height = t.height();
                    } else {
                        if (d == "south") {
                            o.top = parseInt(c.css("top"));
                            o.left = parseInt(c.css("left"));
                            o.width = c.outerWidth();
                            o.height = t.height();
                        } else {
                            if (d == "east") {
                                o.top = parseInt(c.css("top")) || 0;
                                o.left = parseInt(c.css("left")) || 0;
                                o.width = t.width();
                                o.height = c.outerHeight();
                            } else {
                                if (d == "west") {
                                    o.top = parseInt(c.css("top")) || 0;
                                    o.left = c.outerWidth() - t.width();
                                    o.width = t.width();
                                    o.height = c.outerHeight();
                                }
                            }
                        }
                    }
                    t.css(o);
                    u('<div class="layout-mask"></div>').css({
                        left: 0,
                        top: 0,
                        width: l.width(),
                        height: l.height()
                    }).appendTo(l);
                },
                onResize: function(e) {
                    if (d == "north" || d == "south") {
                        var t = u(">div.layout-split-proxy-v", s);
                        t.css("top", e.pageY - u(s).offset().top - t.height() / 2);
                    } else {
                        var t = u(">div.layout-split-proxy-h", s);
                        t.css("left", e.pageX - u(s).offset().left - t.width() / 2);
                    }
                    return false;
                },
                onStopResize: function(e) {
                    l.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
                    a.panel("resize", e.data);
                    f(s);
                    h = false;
                    l.find(">div.layout-mask").remove();
                }
            }, e));
        }
    }
    function n(e, t) {
        var i = u.data(e, "layout").panels;
        if (i[t].length) {
            i[t].panel("destroy");
            i[t] = u();
            var a = "expand" + t.substring(0, 1).toUpperCase() + t.substring(1);
            if (i[a]) {
                i[a].panel("destroy");
                i[a] = undefined;
            }
        }
    }
    function v(r, o, e) {
        if (e == undefined) {
            e = "normal";
        }
        var t = u.data(r, "layout");
        var s = t.panels;
        var i = t.options;
        var a = s[o];
        var l = a.panel("options");
        if (l.onBeforeCollapse.call(a) == false) {
            return;
        }
        var n = "expand" + o.substring(0, 1).toUpperCase() + o.substring(1);
        if (!s[n]) {
            s[n] = c(o);
            s[n].panel("panel").bind("click", function() {
                if (i.clickExpand) {
                    g(r, o);
                    return false;
                } else {
                    var e = f();
                    a.panel("expand", false).panel("open").panel("resize", e.collapse);
                    a.panel("panel").animate(e.expand, function() {
                        u(this).unbind(".layout").bind("mouseleave.layout", {
                            region: o
                        }, function(e) {
                            if (h == true) {
                                return;
                            }
                            v(r, e.data.region);
                        });
                    });
                    return false;
                }
            });
        }
        var d = f();
        if (!b(s[n])) {
            s.center.panel("resize", d.resizeC);
        }
        a.panel("panel").animate(d.collapse, e, function() {
            a.panel("collapse", false).panel("close");
            s[n].panel("open").panel("resize", d.expandP);
            u(this).unbind(".layout");
        });
        function c(e) {
            var t;
            if (e == "east") {
                t = "layout-button-left";
            } else {
                if (e == "west") {
                    t = "layout-button-right";
                } else {
                    if (e == "north") {
                        t = "layout-button-down";
                    } else {
                        if (e == "south") {
                            t = "layout-button-up";
                        }
                    }
                }
            }
            var i = "&nbsp;", a = "";
            if (l.title != "" && l.showCollapsedTitle) {
                if (e == "east" || e == "west") {
                    a = u.hisui.getTrans(l.title).split("").join("</div><div>");
                    a = '<div class="layout-expand-body-title"><div>' + a + "</div></div>";
                } else {
                    i = l.title;
                }
            }
            var n = u("<div></div>").appendTo(r);
            n.panel(u.extend({}, u.fn.layout.paneldefaults, {
                cls: "layout-expand layout-expand-" + e,
                title: i,
                content: a,
                headerCls: l.headerCls,
                bodyCls: l.bodyCls,
                closed: true,
                minWidth: 0,
                minHeight: 0,
                doSize: false,
                tools: [ {
                    iconCls: t,
                    handler: function() {
                        g(r, o);
                        return false;
                    }
                } ]
            }));
            n.panel("panel").hover(function() {
                u(this).addClass("layout-expand-over");
            }, function() {
                u(this).removeClass("layout-expand-over");
            });
            return n;
        }
        function f() {
            var e = u(r);
            var t = s.center.panel("options");
            var i = l.collapsedSize;
            if (o == "east") {
                var a = t.width + l.width - i;
                if (l.split || !l.border) {
                    a++;
                }
                return {
                    resizeC: {
                        width: a
                    },
                    expand: {
                        left: e.width() - l.width
                    },
                    expandP: {
                        top: t.top,
                        left: e.width() - i,
                        width: i,
                        height: t.height
                    },
                    collapse: {
                        left: e.width(),
                        top: t.top,
                        height: t.height
                    }
                };
            } else {
                if (o == "west") {
                    var a = t.width + l.width - i;
                    if (l.split || !l.border) {
                        a++;
                    }
                    return {
                        resizeC: {
                            width: a,
                            left: i - 1
                        },
                        expand: {
                            left: 0
                        },
                        expandP: {
                            left: 0,
                            top: t.top,
                            width: i,
                            height: t.height
                        },
                        collapse: {
                            left: -l.width,
                            top: t.top,
                            height: t.height
                        }
                    };
                } else {
                    if (o == "north") {
                        i = l.collapsedHeight;
                        var n = t.height;
                        if (!b(s.expandNorth)) {
                            n += l.height - i + (l.split || !l.border ? 1 : 0);
                        }
                        s.east.add(s.west).add(s.expandEast).add(s.expandWest).panel("resize", {
                            top: i - 1,
                            height: n
                        });
                        return {
                            resizeC: {
                                top: i - 1,
                                height: n
                            },
                            expand: {
                                top: 0
                            },
                            expandP: {
                                top: 0,
                                left: 0,
                                width: e.width(),
                                height: i
                            },
                            collapse: {
                                top: -l.height,
                                width: e.width()
                            }
                        };
                    } else {
                        if (o == "south") {
                            i = l.collapsedHeight;
                            var n = t.height;
                            if (!b(s.expandSouth)) {
                                n += l.height - i + (l.split || !l.border ? 1 : 0);
                            }
                            s.east.add(s.west).add(s.expandEast).add(s.expandWest).panel("resize", {
                                height: n
                            });
                            return {
                                resizeC: {
                                    height: n
                                },
                                expand: {
                                    top: e.height() - l.height
                                },
                                expandP: {
                                    top: e.height() - i,
                                    left: 0,
                                    width: e.width(),
                                    height: i
                                },
                                collapse: {
                                    top: e.height(),
                                    width: e.width()
                                }
                            };
                        }
                    }
                }
            }
        }
    }
    function g(i, a) {
        var n = u.data(i, "layout").panels;
        var e = n[a];
        var t = e.panel("options");
        if (t.onBeforeExpand.call(e) == false) {
            return;
        }
        var r = s();
        var o = "expand" + a.substring(0, 1).toUpperCase() + a.substring(1);
        if (n[o]) {
            n[o].panel("close");
            e.panel("panel").stop(true, true);
            e.panel("expand", false).panel("open").panel("resize", r.collapse);
            e.panel("panel").animate(r.expand, function() {
                f(i);
            });
        }
        function s() {
            var e = u(i);
            var t = n.center.panel("options");
            if (a == "east" && n.expandEast) {
                return {
                    collapse: {
                        left: e.width(),
                        top: t.top,
                        height: t.height
                    },
                    expand: {
                        left: e.width() - n["east"].panel("options").width
                    }
                };
            } else {
                if (a == "west" && n.expandWest) {
                    return {
                        collapse: {
                            left: -n["west"].panel("options").width,
                            top: t.top,
                            height: t.height
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
                                width: e.width()
                            },
                            expand: {
                                top: 0
                            }
                        };
                    } else {
                        if (a == "south" && n.expandSouth) {
                            return {
                                collapse: {
                                    top: e.height(),
                                    width: e.width()
                                },
                                expand: {
                                    top: e.height() - n["south"].panel("options").height
                                }
                            };
                        }
                    }
                }
            }
        }
    }
    function b(e) {
        if (!e) {
            return false;
        }
        if (e.length) {
            return e.panel("panel").is(":visible");
        } else {
            return false;
        }
    }
    function r(e) {
        var t = u.data(e, "layout").panels;
        if (t.east.length && t.east.panel("options").collapsed) {
            v(e, "east", 0);
        }
        if (t.west.length && t.west.panel("options").collapsed) {
            v(e, "west", 0);
        }
        if (t.north.length && t.north.panel("options").collapsed) {
            v(e, "north", 0);
        }
        if (t.south.length && t.south.panel("options").collapsed) {
            v(e, "south", 0);
        }
    }
    u.fn.layout = function(i, e) {
        if (typeof i == "string") {
            return u.fn.layout.methods[i](this, e);
        }
        i = i || {};
        return this.each(function() {
            var e = u.data(this, "layout");
            if (e) {
                u.extend(e.options, i);
            } else {
                var t = u.extend({}, u.fn.layout.defaults, u.fn.layout.parseOptions(this), i);
                u.data(this, "layout", {
                    options: t,
                    panels: {
                        center: u(),
                        north: u(),
                        south: u(),
                        east: u(),
                        west: u()
                    }
                });
                a(this);
            }
            f(this);
            r(this);
        });
    };
    u.fn.layout.methods = {
        resize: function(e) {
            return e.each(function() {
                f(this);
            });
        },
        panel: function(e, t) {
            return u.data(e[0], "layout").panels[t];
        },
        collapse: function(e, t) {
            return e.each(function() {
                v(this, t);
            });
        },
        expand: function(e, t) {
            return e.each(function() {
                g(this, t);
            });
        },
        add: function(e, t) {
            return e.each(function() {
                i(this, t);
                f(this);
                if (u(this).layout("panel", t.region).panel("options").collapsed) {
                    v(this, t.region, 0);
                }
            });
        },
        remove: function(e, t) {
            return e.each(function() {
                n(this, t);
                f(this);
            });
        }
    };
    u.fn.layout.parseOptions = function(e) {
        return u.extend({}, u.parser.parseOptions(e, [ {
            fit: "boolean"
        } ]));
    };
    u.fn.layout.defaults = {
        fit: false,
        clickExpand: false
    };
    u.fn.layout.parsePanelOptions = function(e) {
        var t = u(e);
        return u.extend({}, u.fn.panel.parseOptions(e), u.parser.parseOptions(e, [ "region", {
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
    u.fn.layout.paneldefaults = u.extend({}, u.fn.panel.defaults, {
        region: null,
        showCollapsedTitle: false,
        split: false,
        collapsedSize: u.hisui.getStyleCodeConfigValue("collapsedSize"),
        collapsedHeight: u.hisui.getStyleCodeConfigValue("collapsedHeight"),
        minWidth: 10,
        minHeight: 10,
        maxWidth: 1e4,
        maxHeight: 1e4,
        isNormalPadding: false,
        isBigPadding: false
    });
})(jQuery);

(function($) {
    function init(a) {
        $(a).appendTo("body");
        $(a).addClass("menu-top");
        var e = $.data(a, "menu").options;
        if (e.isTopZindex) {
            var t = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
            $(a).prepend(t);
        }
        $(document).unbind(".menu").bind("mousedown.menu", function(e) {
            var t = $(e.target).closest("div.menu,div.combo-p");
            if (t.length) {
                return;
            }
            $("body>div.menu-top:visible").menu("hide");
        });
        var i = r($(a));
        for (var n = 0; n < i.length; n++) {
            o(i[n]);
        }
        function r(e) {
            var i = [];
            e.addClass("menu");
            i.push(e);
            if (!e.hasClass("menu-content")) {
                e.children("div").each(function() {
                    var e = $(this).children("div");
                    if (e.length) {
                        e.insertAfter(a);
                        this.submenu = e;
                        var t = r(e);
                        i = i.concat(t);
                    }
                });
            }
            return i;
        }
        function o(e) {
            var t = $.parser.parseOptions(e[0], [ "width", "height" ]);
            e[0].originalHeight = t.height || 0;
            if (e.hasClass("menu-content")) {
                e[0].originalWidth = t.width || e._outerWidth();
            } else {
                e[0].originalWidth = t.width || 0;
                e.children("div").each(function() {
                    var e = $(this);
                    var t = $.extend({}, $.parser.parseOptions(this, [ "name", "iconCls", "href", {
                        separator: "boolean"
                    } ]), {
                        disabled: e.attr("disabled") ? true : undefined
                    });
                    if (t.separator) {
                        e.addClass("menu-sep");
                    }
                    if (!e.hasClass("menu-sep")) {
                        e[0].itemName = t.name || "";
                        e[0].itemHref = t.href || "";
                        var i = e.addClass("menu-item").html();
                        e.empty().append($('<div class="menu-text"></div>').html($.hisui.getTrans(i)));
                        if (t.iconCls) {
                            $('<div class="menu-icon"></div>').addClass(t.iconCls).appendTo(e);
                        }
                        if (t.disabled) {
                            setDisabled(a, e[0], true);
                        }
                        if (e[0].submenu) {
                            $('<div class="menu-rightarrow"></div>').appendTo(e);
                        }
                        bindMenuItemEvent(a, e);
                    }
                });
                $('<div class="menu-line"></div>').prependTo(e);
            }
            setMenuWidth(a, e);
            e.hide();
            bindMenuEvent(a, e);
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
    function bindMenuItemEvent(i, a) {
        if (!a.hasClass("menu-item")) {
            return;
        }
        a.unbind(".menu");
        a.bind("click.menu", function() {
            if ($(this).hasClass("menu-item-disabled")) {
                return;
            }
            if (!this.submenu) {
                hideAll(i);
                var e = $(this).attr("href");
                if (e) {
                    location.href = e;
                }
            }
            var t = $(i).menu("getItem", this);
            $.data(i, "menu").options.onClick.call(i, t);
        }).bind("mouseenter.menu", function(e) {
            a.siblings().each(function() {
                if (this.submenu) {
                    hideMenu(this.submenu);
                }
                $(this).removeClass("menu-active");
            });
            a.addClass("menu-active");
            if ($(this).hasClass("menu-item-disabled")) {
                a.addClass("menu-active-disabled");
                return;
            }
            var t = a[0].submenu;
            if (t) {
                $(i).menu("show", {
                    menu: t,
                    parent: a
                });
            }
        }).bind("mouseleave.menu", function(e) {
            a.removeClass("menu-active menu-active-disabled");
            var t = a[0].submenu;
            if (t) {
                if (e.pageX >= parseInt(t.css("left"))) {
                    a.addClass("menu-active");
                } else {
                    hideMenu(t);
                }
            } else {
                a.removeClass("menu-active");
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
    function findItem(i, a) {
        a = $.hisui.getTrans(a);
        var n = null;
        var r = $("<div></div>");
        function o(e) {
            e.children("div.menu-item").each(function() {
                var e = $(i).menu("getItem", this);
                var t = r.empty().html(e.text).text();
                if (a == $.trim(t)) {
                    n = e;
                } else {
                    if (this.submenu && !n) {
                        o(this.submenu);
                    }
                }
            });
        }
        o($(i));
        r.remove();
        return n;
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
    $.fn.menu = function(t, e) {
        if (typeof t == "string") {
            return $.fn.menu.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = $.data(this, "menu");
            if (e) {
                $.extend(e.options, t);
            } else {
                e = $.data(this, "menu", {
                    options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), t)
                });
                init(this);
            }
            $(this).css({
                left: e.options.left,
                top: e.options.top
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

(function(s) {
    function a(e) {
        var t = s.data(e, "menubutton").options;
        var i = s(e);
        i.linkbutton(t);
        i.removeClass(t.cls.btn1 + " " + t.cls.btn2).addClass("m-btn");
        i.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + t.size);
        var a = i.find(".l-btn-left");
        s("<span></span>").addClass(t.cls.arrow).appendTo(a);
        s("<span></span>").addClass("m-btn-line").appendTo(a);
        i.removeClass("menubutton-toolbar menubutton-blue").addClass(t.otherCls);
        if (t.menu) {
            s(t.menu).addClass(t.otherCls);
            if (t.otherCls == "menubutton-toolbar" || t.otherCls == "menubutton-blue") {
                s(t.menu).menu({
                    width: i._outerWidth(),
                    isTopZindex: t.isTopZindex
                });
            } else {
                s(t.menu).menu({
                    isTopZindex: t.isTopZindex
                });
            }
            var n = s(t.menu).menu("options");
            var r = n.onShow;
            var o = n.onHide;
            s.extend(n, {
                onShow: function() {
                    var e = s(this).menu("options");
                    var t = s(e.alignTo);
                    var i = t.menubutton("options");
                    t.addClass(i.plain == true ? i.cls.btn2 : i.cls.btn1);
                    r.call(this);
                },
                onHide: function() {
                    var e = s(this).menu("options");
                    var t = s(e.alignTo);
                    var i = t.menubutton("options");
                    t.removeClass(i.plain == true ? i.cls.btn2 : i.cls.btn1);
                    o.call(this);
                }
            });
        }
        l(e, t.disabled);
    }
    function l(e, t) {
        var i = s.data(e, "menubutton").options;
        i.disabled = t;
        var a = s(e);
        var n = a.find("." + i.cls.trigger);
        if (!n.length) {
            n = a;
        }
        n.unbind(".menubutton");
        if (t) {
            a.linkbutton("disable");
        } else {
            a.linkbutton("enable");
            var r = null;
            n.bind("click.menubutton", function() {
                o(e);
                return false;
            }).bind("mouseenter.menubutton", function() {
                r = setTimeout(function() {
                    o(e);
                }, i.duration);
                return false;
            }).bind("mouseleave.menubutton", function(e) {
                if (r) {
                    clearTimeout(r);
                }
                var t = e.toElement || e.relatedTarget;
                if (s(i.menu).length > 0 && s(i.menu).find(t).length == 0 && !s(i.menu).is(s(t)) && !a.is(s(t))) {
                    s(i.menu).menu("hide");
                }
            });
        }
    }
    function o(e) {
        var t = s.data(e, "menubutton").options;
        if (t.disabled || !t.menu) {
            return;
        }
        s("body>div.menu-top").menu("hide");
        var i = s(e);
        var a = s(t.menu);
        if (a.length) {
            a.menu("options").alignTo = i;
            a.menu("show", {
                alignTo: i,
                align: t.menuAlign
            });
        }
        i.blur();
    }
    s.fn.menubutton = function(t, e) {
        if (typeof t == "string") {
            var i = s.fn.menubutton.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.linkbutton(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = s.data(this, "menubutton");
            if (e) {
                s.extend(e.options, t);
            } else {
                s.data(this, "menubutton", {
                    options: s.extend({}, s.fn.menubutton.defaults, s.fn.menubutton.parseOptions(this), t)
                });
                s(this).removeAttr("disabled");
            }
            a(this);
        });
    };
    s.fn.menubutton.methods = {
        options: function(e) {
            var t = e.linkbutton("options");
            var i = s.data(e[0], "menubutton").options;
            i.toggle = t.toggle;
            i.selected = t.selected;
            return i;
        },
        enable: function(e) {
            return e.each(function() {
                l(this, false);
            });
        },
        disable: function(e) {
            return e.each(function() {
                l(this, true);
            });
        },
        destroy: function(e) {
            return e.each(function() {
                var e = s(this).menubutton("options");
                if (e.menu) {
                    s(e.menu).menu("destroy");
                }
                s(this).remove();
            });
        }
    };
    s.fn.menubutton.parseOptions = function(e) {
        var t = s(e);
        var i = "";
        if (t.hasClass("menubutton-blue")) {
            i = "menubutton-blue";
        } else if (t.hasClass("menubutton-toolbar")) {
            i = "menubutton-toolbar";
        }
        return s.extend({
            otherCls: i
        }, s.fn.linkbutton.parseOptions(e), s.parser.parseOptions(e, [ "menu", {
            plain: "boolean",
            duration: "number"
        } ]));
    };
    s.fn.menubutton.defaults = s.extend({}, s.fn.linkbutton.defaults, {
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

(function(a) {
    function n(e) {
        var t = a.data(e, "splitbutton").options;
        a(e).menubutton(t);
        a(e).addClass("s-btn");
    }
    a.fn.splitbutton = function(t, e) {
        if (typeof t == "string") {
            var i = a.fn.splitbutton.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.menubutton(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = a.data(this, "splitbutton");
            if (e) {
                a.extend(e.options, t);
            } else {
                a.data(this, "splitbutton", {
                    options: a.extend({}, a.fn.splitbutton.defaults, a.fn.splitbutton.parseOptions(this), t)
                });
                a(this).removeAttr("disabled");
            }
            n(this);
        });
    };
    a.fn.splitbutton.methods = {
        options: function(e) {
            var t = e.menubutton("options");
            var i = a.data(e[0], "splitbutton").options;
            a.extend(i, {
                disabled: t.disabled,
                toggle: t.toggle,
                selected: t.selected
            });
            return i;
        }
    };
    a.fn.splitbutton.parseOptions = function(e) {
        var t = a(e);
        return a.extend({}, a.fn.linkbutton.parseOptions(e), a.parser.parseOptions(e, [ "menu", {
            plain: "boolean",
            duration: "number"
        } ]));
    };
    a.fn.splitbutton.defaults = a.extend({}, a.fn.linkbutton.defaults, {
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
    function _404(i) {
        var a = $.data(i, "searchbox");
        var e = a.options;
        if (e.menu) {
            a.menu = $(e.menu).menu({
                onClick: function(e) {
                    n(e);
                }
            });
            var t = a.menu.children("div.menu-item:first");
            a.menu.children("div.menu-item").each(function() {
                var e = $.extend({}, $.parser.parseOptions(this), {
                    selected: $(this).attr("selected") ? true : undefined
                });
                if (e.selected) {
                    t = $(this);
                    return false;
                }
            });
            t.triggerHandler("click");
        } else {
            a.searchbox.find("a.searchbox-menu").remove();
            a.menu = null;
        }
        function n(e) {
            a.searchbox.find("a.searchbox-menu").remove();
            var t = $('<a class="searchbox-menu" href="javascript:void(0)"></a>').html(e.text);
            t.prependTo(a.searchbox).menubutton({
                menu: a.menu,
                iconCls: e.iconCls
            });
            a.searchbox.find("input.searchbox-text").attr("name", e.name || e.text);
            _3fe(i);
        }
    }
    function _409(t) {
        var e = $.data(t, "searchbox");
        var i = e.options;
        var a = e.searchbox.find("input.searchbox-text");
        var n = e.searchbox.find(".searchbox-button");
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
            }).bind("keydown.searchbox", function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    i.value = $(this).val();
                    i.searcher.call(t, i.value, a._propAttr("name"));
                    return false;
                }
            });
            n.bind("click.searchbox", function() {
                i.searcher.call(t, i.value, a._propAttr("name"));
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
    $.fn.searchbox = function(t, e) {
        if (typeof t == "string") {
            return $.fn.searchbox.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = $.data(this, "searchbox");
            if (e) {
                $.extend(e.options, t);
            } else {
                e = $.data(this, "searchbox", {
                    options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), t),
                    searchbox: init(this)
                });
            }
            _404(this);
            _413(this);
            _409(this);
            _40e(this, e.options.disabled);
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
    function _422(t) {
        var i = $(t);
        var e = $.data(t, "validatebox");
        i.unbind(".validatebox");
        if (e.options.novalidate) {
            return;
        }
        i.bind("focus.validatebox", function() {
            e.validating = true;
            e.value = undefined;
            (function() {
                if (e.validating) {
                    if (e.value != i.val()) {
                        e.value = i.val();
                        if (e.timer) {
                            clearTimeout(e.timer);
                        }
                        e.timer = setTimeout(function() {
                            if ($.data(t, "validatebox")) {
                                $(t).validatebox("validate");
                            }
                        }, e.options.delay);
                    } else {
                        _429(t);
                    }
                    setTimeout(arguments.callee, 200);
                }
            })();
        }).bind("blur.validatebox", function() {
            if (e.timer) {
                clearTimeout(e.timer);
                e.timer = undefined;
            }
            e.validating = false;
            setTimeout(function() {
                if ($.data(t, "validatebox")) {
                    $(t).validatebox("validate");
                }
            }, 0);
            _425(t);
        }).bind("mouseenter.validatebox", function() {
            if (i.hasClass("validatebox-invalid")) {
                _426(t);
            }
            var e = $.data(t, "validatebox");
            if (e.options) {
                if (e.options.prompt && e.options.prompt != "") {
                    e.message = e.options.prompt;
                    _426(t);
                }
            }
        }).bind("mouseleave.validatebox", function() {
            if (!e.validating) {
                _425(t);
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
                    box.closest(".combo").addClass("combo-invalid");
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
        box.closest(".combo").removeClass("combo-invalid");
        _425(_42f);
        if (opts.novalidate || box.is(":disabled")) {
            return true;
        }
        if (opts.required) {
            if (_431 == "") {
                box.addClass("validatebox-invalid");
                box.closest(".combo").addClass("combo-invalid");
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
    $.fn.validatebox = function(t, e) {
        if (typeof t == "string") {
            return $.fn.validatebox.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = $.data(this, "validatebox");
            if (e) {
                $.extend(e.options, t);
            } else {
                init(this);
                $.data(this, "validatebox", {
                    options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), t)
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
                        "async": false,
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
                        return e.length == 11 && /^1[1-9][0-9]\d{8}$/.test(e);
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

(function(p) {
    function a(e, o) {
        o = o || {};
        var t = {};
        if (o.onSubmit) {
            if (o.onSubmit.call(e, t) == false) {
                return;
            }
        }
        var i = p(e);
        if (o.url) {
            i.attr("action", o.url);
        }
        var s = "hisui_frame_" + new Date().getTime();
        var a = p("<iframe id=" + s + " name=" + s + "></iframe>").attr("src", window.ActiveXObject ? "javascript:false" : "about:blank").css({
            position: "absolute",
            top: -1e3,
            left: -1e3
        });
        var n = i.attr("target"), r = i.attr("action");
        i.attr("target", s);
        var l = p();
        try {
            a.appendTo("body");
            a.bind("load", h);
            for (var d in t) {
                var c = p('<input type="hidden" name="' + d + '">').val(t[d]).appendTo(i);
                l = l.add(c);
            }
            f();
            i[0].submit();
        } finally {
            i.attr("action", r);
            n ? i.attr("target", n) : i.removeAttr("target");
            l.remove();
        }
        function f() {
            var e = p("#" + s);
            if (!e.length) {
                return;
            }
            try {
                var t = e.contents()[0].readyState;
                if (t && t.toLowerCase() == "uninitialized") {
                    setTimeout(f, 100);
                }
            } catch (i) {
                h();
            }
        }
        var u = 10;
        function h() {
            var e = p("#" + s);
            if (!e.length) {
                return;
            }
            e.unbind();
            var t = "";
            try {
                var i = e.contents().find("body");
                t = i.html();
                if (t == "") {
                    if (--u) {
                        setTimeout(h, 100);
                        return;
                    }
                }
                var a = i.find(">textarea");
                if (a.length) {
                    t = a.val();
                } else {
                    var n = i.find(">pre");
                    if (n.length) {
                        t = n.html();
                    }
                }
            } catch (r) {}
            if (o.success) {
                o.success(t);
            }
            setTimeout(function() {
                e.unbind();
                e.remove();
            }, 100);
        }
    }
    function i(s, e) {
        if (!p.data(s, "form")) {
            p.data(s, "form", {
                options: p.extend({}, p.fn.form.defaults)
            });
        }
        var o = p.data(s, "form").options;
        if (typeof e == "string") {
            var t = {};
            if (o.onBeforeLoad.call(s, t) == false) {
                return;
            }
            p.ajax({
                url: e,
                data: t,
                dataType: "json",
                success: function(e) {
                    i(e);
                },
                error: function() {
                    o.onLoadError.apply(s, arguments);
                }
            });
        } else {
            i(e);
        }
        function i(e) {
            var t = p(s);
            for (var i in e) {
                var a = e[i];
                var n = l(i, a);
                if (!n.length) {
                    var r = d(i, a);
                    if (!r) {
                        p('input[name="' + i + '"]', t).val(a);
                        p('textarea[name="' + i + '"]', t).val(a);
                        p('select[name="' + i + '"]', t).val(a);
                    }
                }
                c(i, a);
            }
            o.onLoadSuccess.call(s, e);
            f(s);
        }
        function l(e, t) {
            var i = p(s).find('input[name="' + e + '"][type=radio], input[name="' + e + '"][type=checkbox]');
            i._propAttr("checked", false);
            i.each(function() {
                var e = p(this);
                if (e.val() == String(t) || p.inArray(e.val(), p.isArray(t) ? t : [ t ]) >= 0) {
                    e._propAttr("checked", true);
                }
            });
            return i;
        }
        function d(e, t) {
            var i = 0;
            var a = [ "numberbox", "slider" ];
            for (var n = 0; n < a.length; n++) {
                var r = a[n];
                var o = p(s).find("input[" + r + 'Name="' + e + '"]');
                if (o.length) {
                    o[r]("setValue", t);
                    i += o.length;
                }
            }
            return i;
        }
        function c(e, t) {
            var i = p(s);
            var a = [ "combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo" ];
            var n = i.find('[comboName="' + e + '"]');
            if (n.length) {
                for (var r = 0; r < a.length; r++) {
                    var o = a[r];
                    if (n.hasClass(o + "-f")) {
                        if (n[o]("options").multiple) {
                            n[o]("setValues", t);
                        } else {
                            n[o]("setValue", t);
                        }
                        return;
                    }
                }
            }
        }
    }
    function t(e) {
        p("input,select,textarea", e).each(function() {
            var e = this.type, t = this.tagName.toLowerCase();
            if (e == "text" || e == "hidden" || e == "password" || t == "textarea") {
                this.value = "";
            } else {
                if (e == "file") {
                    var i = p(this);
                    var a = i.clone().val("");
                    a.insertAfter(i);
                    if (i.data("validatebox")) {
                        i.validatebox("destroy");
                        a.validatebox();
                    } else {
                        i.remove();
                    }
                } else {
                    if (e == "checkbox" || e == "radio") {
                        this.checked = false;
                    } else {
                        if (t == "select") {
                            this.selectedIndex = -1;
                        }
                    }
                }
            }
        });
        var t = p(e);
        var i = [ "combo", "combobox", "combotree", "combogrid", "slider", "radio", "checkbox" ];
        for (var a = 0; a < i.length; a++) {
            var n = i[a];
            var r = t.find("." + n + "-f");
            if (r.length && r[n]) {
                r[n]("clear");
            }
        }
        f(e);
    }
    function n(e) {
        e.reset();
        var t = p(e);
        var i = [ "combo", "combobox", "combotree", "combogrid", "datebox", "datetimebox", "spinner", "timespinner", "numberbox", "numberspinner", "slider", "radio", "checkbox" ];
        for (var a = 0; a < i.length; a++) {
            var n = i[a];
            var r = t.find("." + n + "-f");
            if (r.length && r[n]) {
                r[n]("reset");
            }
        }
        f(e);
    }
    function r(e) {
        var t = p.data(e, "form").options;
        var i = p(e);
        i.unbind(".form").bind("submit.form", function() {
            setTimeout(function() {
                a(e, t);
            }, 0);
            return false;
        });
    }
    function f(e) {
        if (p.fn.validatebox) {
            var t = p(e);
            t.find(".validatebox-text:not(:disabled)").validatebox("validate");
            var i = t.find(".validatebox-invalid");
            i.filter(":not(:disabled):first").focus();
            return i.length == 0;
        }
        return true;
    }
    function o(e, t) {
        p(e).find(".validatebox-text:not(:disabled)").validatebox(t ? "disableValidation" : "enableValidation");
    }
    p.fn.form = function(e, t) {
        if (typeof e == "string") {
            return p.fn.form.methods[e](this, t);
        }
        e = e || {};
        return this.each(function() {
            if (!p.data(this, "form")) {
                p.data(this, "form", {
                    options: p.extend({}, p.fn.form.defaults, e)
                });
            }
            r(this);
        });
    };
    p.fn.form.methods = {
        submit: function(e, t) {
            return e.each(function() {
                var e = p.extend({}, p.fn.form.defaults, p.data(this, "form") ? p.data(this, "form").options : {}, t || {});
                a(this, e);
            });
        },
        load: function(e, t) {
            return e.each(function() {
                i(this, t);
            });
        },
        clear: function(e) {
            return e.each(function() {
                t(this);
            });
        },
        reset: function(e) {
            return e.each(function() {
                n(this);
            });
        },
        validate: function(e) {
            return f(e[0]);
        },
        disableValidation: function(e) {
            return e.each(function() {
                o(this, true);
            });
        },
        enableValidation: function(e) {
            return e.each(function() {
                o(this, false);
            });
        }
    };
    p.fn.form.defaults = {
        url: null,
        onSubmit: function(e) {
            return p(this).form("validate");
        },
        success: function(e) {},
        onBeforeLoad: function(e) {},
        onLoadSuccess: function(e) {},
        onLoadError: function() {}
    };
})(jQuery);

(function(o) {
    function a(e) {
        o(e).addClass("numberbox numberbox-f");
        var t = o('<input type="hidden">').insertAfter(e);
        var i = o(e).attr("name");
        if (i) {
            t.attr("name", i);
            o(e).removeAttr("name").attr("numberboxName", i);
        }
        return t;
    }
    function n(e) {
        var t = o.data(e, "numberbox").options;
        var i = t.onChange;
        t.onChange = function() {};
        l(e, t.parser.call(e, t.value));
        t.onChange = i;
        t.originalValue = s(e);
    }
    function r(e, t) {
        var i = o.data(e, "numberbox").options;
        if (t) {
            i.width = t;
        }
        var a = o(e);
        var n = o('<div style="display:none"></div>').insertBefore(a);
        a.appendTo("body");
        if (isNaN(i.width)) {
            i.width = a.outerWidth();
        }
        a._outerWidth(i.width)._outerHeight(i.height);
        a.css("line-height", a.height() + "px");
        a.insertAfter(n);
        n.remove();
    }
    function s(e) {
        return o.data(e, "numberbox").field.val();
    }
    function l(e, t) {
        var i = o.data(e, "numberbox");
        var a = i.options;
        var n = s(e);
        t = a.parser.call(e, t);
        a.value = t;
        i.field.val(t);
        o(e).val(a.formatter.call(e, t));
        if (n != t) {
            a.onChange.call(e, t, n);
        }
    }
    function d(t) {
        var i = o.data(t, "numberbox").options;
        o(t).unbind(".numberbox").bind("keypress.numberbox", function(e) {
            return i.filter.call(t, e);
        }).bind("blur.numberbox", function() {
            l(t, o(this).val());
            o(this).val(i.formatter.call(t, s(t)));
        }).bind("focus.numberbox", function() {
            var e = s(t);
            if (e != i.parser.call(t, o(this).val())) {
                o(this).val(i.formatter.call(t, e));
            }
        });
        if (i.isKeyupChange) {
            var e = function(e) {
                l(t, o(this).val());
                o(this).val(i.formatter.call(t, s(t)));
            };
            var a = e;
            if (i.keyupChangeDelay > 0) {
                a = o.hisui.debounce(e, i.keyupChangeDelay);
            }
            o(t).bind("keyup.numberbox", function(e) {
                a.call(this, e);
            });
        }
    }
    function c(e) {
        if (o.fn.validatebox) {
            var t = o.data(e, "numberbox").options;
            if (!t.validType) {
                t.validType = [];
            }
            if ("string" == typeof t.validType) t.validType = [ t.validType ];
            if (typeof t.min == "number") t.validType.push("min[" + t.min + "]");
            if (typeof t.max == "number") t.validType.push("max[" + t.max + "]");
            o(e).validatebox(t);
        }
    }
    function f(e, t) {
        var i = o.data(e, "numberbox").options;
        if (t) {
            i.disabled = true;
            o(e).attr("disabled", true);
        } else {
            i.disabled = false;
            o(e).removeAttr("disabled");
        }
    }
    o.fn.numberbox = function(t, e) {
        if (typeof t == "string") {
            var i = o.fn.numberbox.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.validatebox(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = o.data(this, "numberbox");
            if (e) {
                o.extend(e.options, t);
            } else {
                e = o.data(this, "numberbox", {
                    options: o.extend({}, o.fn.numberbox.defaults, o.fn.numberbox.parseOptions(this), t),
                    field: a(this)
                });
                o(this).removeAttr("disabled");
                o(this).css({
                    imeMode: "disabled"
                });
            }
            f(this, e.options.disabled);
            r(this);
            d(this);
            c(this);
            n(this);
        });
    };
    o.fn.numberbox.methods = {
        options: function(e) {
            return o.data(e[0], "numberbox").options;
        },
        destroy: function(e) {
            return e.each(function() {
                o.data(this, "numberbox").field.remove();
                o(this).validatebox("destroy");
                o(this).remove();
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        disable: function(e) {
            return e.each(function() {
                f(this, true);
            });
        },
        enable: function(e) {
            return e.each(function() {
                f(this, false);
            });
        },
        fix: function(e) {
            return e.each(function() {
                l(this, o(this).val());
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        getValue: function(e) {
            return s(e[0]);
        },
        clear: function(e) {
            return e.each(function() {
                var e = o.data(this, "numberbox");
                e.field.val("");
                o(this).val("");
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = o(this).numberbox("options");
                o(this).numberbox("setValue", e.originalValue);
            });
        }
    };
    o.fn.numberbox.parseOptions = function(e) {
        var t = o(e);
        return o.extend({}, o.fn.validatebox.parseOptions(e), o.parser.parseOptions(e, [ "width", "height", "decimalSeparator", "groupSeparator", "suffix", {
            min: "number",
            max: "number",
            precision: "number"
        } ]), {
            prefix: t.attr("prefix") ? t.attr("prefix") : undefined,
            disabled: t.attr("disabled") ? true : undefined,
            value: t.val() || undefined
        });
    };
    o.fn.numberbox.defaults = o.extend({}, o.fn.validatebox.defaults, {
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
        filter: function(e) {
            var t = o(this).numberbox("options");
            if (e.which == 45) {
                return o(this).val().indexOf("-") == -1 ? true : false;
            }
            var i = String.fromCharCode(e.which);
            if (i == t.decimalSeparator) {
                return o(this).val().indexOf(i) == -1 ? true : false;
            } else {
                if (i == t.groupSeparator) {
                    return true;
                } else {
                    if (e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false || e.which == 0 || e.which == 8) {
                        return true;
                    } else {
                        if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        },
        formatter: function(e) {
            if (!e) {
                return e;
            }
            e = e + "";
            var t = o(this).numberbox("options");
            var i = e, a = "";
            var n = e.indexOf(".");
            if (n >= 0) {
                i = e.substring(0, n);
                a = e.substring(n + 1, e.length);
            }
            if (t.groupSeparator) {
                var r = /(\d+)(\d{3})/;
                while (r.test(i)) {
                    i = i.replace(r, "$1" + t.groupSeparator + "$2");
                }
            }
            if (a) {
                return t.prefix + i + t.decimalSeparator + a + t.suffix;
            } else {
                return t.prefix + i + t.suffix;
            }
        },
        parser: function(e) {
            e = e + "";
            var t = o(this).numberbox("options");
            if (parseFloat(e) != e) {
                if (t.prefix) {
                    e = o.trim(e.replace(new RegExp("\\" + o.trim(t.prefix), "g"), ""));
                }
                if (t.suffix) {
                    e = o.trim(e.replace(new RegExp("\\" + o.trim(t.suffix), "g"), ""));
                }
                if (t.groupSeparator) {
                    e = o.trim(e.replace(new RegExp("\\" + t.groupSeparator, "g"), ""));
                }
                if (t.decimalSeparator) {
                    e = o.trim(e.replace(new RegExp("\\" + t.decimalSeparator, "g"), "."));
                }
                e = e.replace(/\s/g, "");
            }
            var i = r(parseFloat(e), t.precision, t.forcePrecisionZoer);
            if (isNaN(i)) {
                i = "";
            } else {
                if (t.fix) {
                    if (typeof t.min == "number" && i < t.min) {
                        i = r(t.min, t.precision, t.forcePrecisionZoer);
                    } else {
                        if (typeof t.max == "number" && i > t.max) {
                            i = r(t.max, t.precision, t.forcePrecisionZoer);
                        }
                    }
                } else {
                    var a = o.data(this, "validatebox").options.validType;
                    if (!a) o.data(this, "validatebox").options.validType = [];
                    if ("string" == typeof a) o.data(this, "validatebox").options.validType = [ a ];
                    var n = o.data(this, "validatebox").options.validType;
                    if (typeof t.min == "number") n.push("min[" + t.min + "]");
                    if (typeof t.max == "number") n.push("max[" + t.max + "]");
                    o(this).validatebox("validate");
                }
            }
            function r(e, t, i) {
                if (!i && ("" + e).indexOf(".") == -1) {
                    return e;
                }
                if (!i && ("" + e).indexOf(".") > -1) {
                    return e.toFixed(t).replace(/(0*$)/g, "");
                }
                return e.toFixed(t);
            }
            return i;
        },
        onChange: function(e, t) {}
    });
    o.extend(o.fn.numberbox.defaults.rules, {
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

(function(Y) {
    function i(e) {
        var t = Y.data(e, "calendar").options;
        var i = Y(e);
        t.fit ? Y.extend(t, i._fit()) : i._fit(false);
        var a = i.find(".calendar-header");
        i._outerWidth(t.width);
        i._outerHeight(t.height);
        i.find(".calendar-body")._outerHeight(i.height() - a._outerHeight());
    }
    function a(t) {
        Y(t).addClass("calendar").html('<div class="calendar-header">' + '<div class="calendar-prevmonth"></div>' + '<div class="calendar-nextmonth"></div>' + '<div class="calendar-prevyear"></div>' + '<div class="calendar-nextyear"></div>' + '<div class="calendar-title">' + "<span>Aprial 2010</span>" + "</div>" + "</div>" + '<div class="calendar-body">' + '<div class="calendar-menu">' + '<div class="calendar-menu-year-inner">' + '<span class="calendar-menu-prev"></span>' + '<span><input class="calendar-menu-year" type="text"></input></span>' + '<span class="calendar-menu-next"></span>' + "</div>" + '<div class="calendar-menu-month-inner">' + "</div>" + "</div>" + "</div>");
        Y(t).find(".calendar-title span").hover(function() {
            Y(this).addClass("calendar-menu-hover");
        }, function() {
            Y(this).removeClass("calendar-menu-hover");
        }).click(function() {
            var e = Y(t).find(".calendar-menu");
            if (e.is(":visible")) {
                e.hide();
            } else {
                r(t);
            }
        });
        Y(".calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear", t).hover(function() {
            Y(this).addClass("calendar-nav-hover");
        }, function() {
            Y(this).removeClass("calendar-nav-hover");
        });
        Y(t).find(".calendar-nextmonth").click(function() {
            e(t, 1);
        });
        Y(t).find(".calendar-prevmonth").click(function() {
            e(t, -1);
        });
        Y(t).find(".calendar-nextyear").click(function() {
            n(t, 1);
        });
        Y(t).find(".calendar-prevyear").click(function() {
            n(t, -1);
        });
        Y(t).bind("_resize", function() {
            var e = Y.data(t, "calendar").options;
            if (e.fit == true) {
                i(t);
            }
            return false;
        });
    }
    function e(e, t) {
        var i = Y.data(e, "calendar").options;
        i.month += t;
        if (i.month > 12) {
            i.year++;
            i.month = 1;
        } else {
            if (i.month < 1) {
                i.year--;
                i.month = 12;
            }
        }
        u(e);
        var a = Y(e).find(".calendar-menu-month-inner");
        a.find("td.calendar-selected").removeClass("calendar-selected");
        a.find("td:eq(" + (i.month - 1) + ")").addClass("calendar-selected");
    }
    function n(e, t) {
        var i = Y.data(e, "calendar").options;
        i.year += t;
        u(e);
        var a = Y(e).find(".calendar-menu-year");
        a.val(i.year);
    }
    function r(n) {
        var r = Y.data(n, "calendar").options;
        Y(n).find(".calendar-menu").show();
        if (Y(n).find(".calendar-menu-month-inner").is(":empty")) {
            Y(n).find(".calendar-menu-month-inner").empty();
            var e = Y('<table class="calendar-mtable"></table>').appendTo(Y(n).find(".calendar-menu-month-inner"));
            var t = 0;
            for (var i = 0; i < 3; i++) {
                var a = Y("<tr></tr>").appendTo(e);
                for (var o = 0; o < 4; o++) {
                    Y('<td class="calendar-menu-month"></td>').html(r.months[t++]).attr("abbr", t).appendTo(a);
                }
            }
            Y(n).find(".calendar-menu-prev,.calendar-menu-next").hover(function() {
                Y(this).addClass("calendar-menu-hover");
            }, function() {
                Y(this).removeClass("calendar-menu-hover");
            });
            Y(n).find(".calendar-menu-next").click(function() {
                var e = Y(n).find(".calendar-menu-year");
                if (!isNaN(e.val())) {
                    e.val(parseInt(e.val()) + 1);
                    s();
                }
            });
            Y(n).find(".calendar-menu-prev").click(function() {
                var e = Y(n).find(".calendar-menu-year");
                if (!isNaN(e.val())) {
                    e.val(parseInt(e.val() - 1));
                    s();
                }
            });
            Y(n).find(".calendar-menu-year").keypress(function(e) {
                if (e.keyCode == 13) {
                    s(true);
                }
            });
            Y(n).find(".calendar-menu-month").hover(function() {
                Y(this).addClass("calendar-menu-hover");
            }, function() {
                Y(this).removeClass("calendar-menu-hover");
            }).click(function() {
                var e = Y(n).find(".calendar-menu");
                e.find(".calendar-selected").removeClass("calendar-selected");
                Y(this).addClass("calendar-selected");
                s(true);
            });
        }
        function s(e) {
            var t = Y(n).find(".calendar-menu");
            var i = t.find(".calendar-menu-year").val();
            var a = t.find(".calendar-selected").attr("abbr");
            if (!isNaN(i)) {
                r.year = parseInt(i);
                r.month = parseInt(a);
                u(n);
            }
            if (e) {
                t.hide();
            }
        }
        var l = Y(n).find(".calendar-body");
        var d = Y(n).find(".calendar-menu");
        var c = d.find(".calendar-menu-year-inner");
        var f = d.find(".calendar-menu-month-inner");
        c.find("input").val(r.year).focus();
        f.find("td.calendar-selected").removeClass("calendar-selected");
        f.find("td:eq(" + (r.month - 1) + ")").addClass("calendar-selected");
        d._outerWidth(l._outerWidth());
        d._outerHeight(l._outerHeight());
        f._outerHeight(d.height() - c._outerHeight());
    }
    function S(e, t, i) {
        var a = Y.data(e, "calendar").options;
        var n = [];
        var r = new Date(t, i, 0).getDate();
        for (var o = 1; o <= r; o++) {
            n.push([ t, i, o ]);
        }
        var s = [], l = [];
        var d = -1;
        while (n.length > 0) {
            var c = n.shift();
            l.push(c);
            var f = new Date(c[0], c[1] - 1, c[2]).getDay();
            if (d == f) {
                f = 0;
            } else {
                if (f == (a.firstDay == 0 ? 7 : a.firstDay) - 1) {
                    s.push(l);
                    l = [];
                }
            }
            d = f;
        }
        if (l.length) {
            s.push(l);
        }
        var u = s[0];
        if (u.length < 7) {
            while (u.length < 7) {
                var h = u[0];
                var c = new Date(h[0], h[1] - 1, h[2] - 1);
                u.unshift([ c.getFullYear(), c.getMonth() + 1, c.getDate() ]);
            }
        } else {
            var h = u[0];
            var l = [];
            for (var o = 1; o <= 7; o++) {
                var c = new Date(h[0], h[1] - 1, h[2] - o);
                l.unshift([ c.getFullYear(), c.getMonth() + 1, c.getDate() ]);
            }
            s.unshift(l);
        }
        var p = s[s.length - 1];
        while (p.length < 7) {
            var v = p[p.length - 1];
            var c = new Date(v[0], v[1] - 1, v[2] + 1);
            p.push([ c.getFullYear(), c.getMonth() + 1, c.getDate() ]);
        }
        if (s.length < 6) {
            var v = p[p.length - 1];
            var l = [];
            for (var o = 1; o <= 7; o++) {
                var c = new Date(v[0], v[1] - 1, v[2] + o);
                l.push([ c.getFullYear(), c.getMonth() + 1, c.getDate() ]);
            }
            s.push(l);
        }
        return s;
    }
    function u(i) {
        var a = Y.data(i, "calendar").options;
        if (a.current && !a.validator.call(i, a.current)) {
            a.current = null;
        }
        var e = new Date();
        var t = e.getFullYear() + "," + (e.getMonth() + 1) + "," + e.getDate();
        var n = a.current ? a.current.getFullYear() + "," + (a.current.getMonth() + 1) + "," + a.current.getDate() : "";
        var r = 6 - a.firstDay;
        var o = r + 1;
        if (r >= 7) {
            r -= 7;
        }
        if (o >= 7) {
            o -= 7;
        }
        Y(i).find(".calendar-title span").html(a.months[a.month - 1] + " " + a.year);
        var s = Y(i).find("div.calendar-body");
        s.children("table").remove();
        var l = [ '<table class="calendar-dtable" cellspacing="0" cellpadding="0" border="0">' ];
        l.push("<thead><tr>");
        for (var d = a.firstDay; d < a.weeks.length; d++) {
            l.push("<th>" + a.weeks[d] + "</th>");
        }
        for (var d = 0; d < a.firstDay; d++) {
            l.push("<th>" + a.weeks[d] + "</th>");
        }
        l.push("</tr></thead>");
        l.push("<tbody>");
        var c = S(i, a.year, a.month);
        for (var d = 0; d < c.length; d++) {
            var f = c[d];
            var u = "";
            if (d == 0) {
                u = "calendar-first";
            } else {
                if (d == c.length - 1) {
                    u = "calendar-last";
                }
            }
            l.push('<tr class="' + u + '">');
            for (var h = 0; h < f.length; h++) {
                var p = f[h];
                var v = p[0] + "," + p[1] + "," + p[2];
                var g = new Date(p[0], parseInt(p[1]) - 1, p[2]);
                var b = a.formatter.call(i, g);
                var m = a.styler.call(i, g);
                var x = "";
                var C = "";
                if (typeof m == "string") {
                    C = m;
                } else {
                    if (m) {
                        x = m["class"] || "";
                        C = m["style"] || "";
                    }
                }
                var u = "calendar-day";
                if (!(a.year == p[0] && a.month == p[1])) {
                    u += " calendar-other-month";
                }
                if (v == t) {
                    u += " calendar-today";
                }
                if (v == n) {
                    u += " calendar-selected";
                }
                if (h == r) {
                    u += " calendar-saturday";
                } else {
                    if (h == o) {
                        u += " calendar-sunday";
                    }
                }
                if (h == 0) {
                    u += " calendar-first";
                } else {
                    if (h == f.length - 1) {
                        u += " calendar-last";
                    }
                }
                u += " " + x;
                if (!a.validator.call(i, g)) {
                    u += " calendar-disabled";
                }
                l.push('<td tabindex=-1 class="' + u + '" abbr="' + v + '" style="' + C + '">' + b + "</td>");
            }
            l.push("</tr>");
        }
        l.push("</tbody>");
        l.push("</table>");
        s.append(l.join(""));
        var w = s.children("table.calendar-dtable").prependTo(s);
        w.find("td.calendar-day:not(.calendar-disabled)").hover(function() {
            Y(this).addClass("calendar-hover");
        }, function() {
            Y(this).removeClass("calendar-hover");
        }).click(function() {
            var e = a.current;
            w.find(".calendar-selected").removeClass("calendar-selected");
            Y(this).addClass("calendar-selected");
            var t = Y(this).attr("abbr").split(",");
            a.current = new Date(t[0], parseInt(t[1]) - 1, t[2]);
            a.onSelect.call(i, a.current);
            if (!e || e.getTime() != a.current.getTime()) {
                a.onChange.call(i, a.current, e);
            }
        }).bind("dblclick.calendar", function() {
            var e = a.current;
            w.find(".calendar-selected").removeClass("calendar-selected");
            Y(this).addClass("calendar-selected");
            var t = Y(this).attr("abbr").split(",");
            a.current = new Date(t[0], parseInt(t[1]) - 1, t[2]);
            a.onSelect.call(i, a.current);
            if (!e || e.getTime() != a.current.getTime()) {
                a.onChange.call(i, a.current, e);
            }
            a.onDblClick.call(i, a.current);
        }).bind("keydown.calendar", function(e) {
            a.onKeyDownInCalendar.call(i, e, a.current);
        });
    }
    Y.fn.calendar = function(t, e) {
        if (typeof t == "string") {
            return Y.fn.calendar.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = Y.data(this, "calendar");
            if (e) {
                Y.extend(e.options, t);
            } else {
                e = Y.data(this, "calendar", {
                    options: Y.extend({}, Y.fn.calendar.defaults, Y.fn.calendar.parseOptions(this), t)
                });
                a(this);
            }
            if (e.options.border == false) {
                Y(this).addClass("calendar-noborder");
            }
            i(this);
            u(this);
            Y(this).find("div.calendar-menu").hide();
        });
    };
    Y.fn.calendar.methods = {
        options: function(e) {
            return Y.data(e[0], "calendar").options;
        },
        resize: function(e) {
            return e.each(function() {
                i(this);
            });
        },
        moveTo: function(e, i) {
            return e.each(function() {
                var e = Y(this).calendar("options");
                if (e.validator.call(this, i)) {
                    var t = e.current;
                    Y(this).calendar({
                        year: i.getFullYear(),
                        month: i.getMonth() + 1,
                        current: i
                    });
                    if (!t || t.getTime() != i.getTime()) {
                        e.onChange.call(this, e.current, t);
                    }
                } else {
                    u(this);
                }
            });
        }
    };
    Y.fn.calendar.parseOptions = function(e) {
        var t = Y(e);
        return Y.extend({}, Y.parser.parseOptions(e, [ "width", "height", {
            firstDay: "number",
            fit: "boolean",
            border: "boolean"
        } ]));
    };
    Y.fn.calendar.defaults = {
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
        onDblClick: function(e) {},
        onKeyDownInCalendar: function(e, t) {}
    };
})(jQuery);

(function(o) {
    function a(e) {
        var t = o('<span class="spinner">' + '<span class="spinner-arrow">' + '<span class="spinner-arrow-up"></span>' + '<span class="spinner-arrow-down"></span>' + "</span>" + "</span>").insertAfter(e);
        o(e).addClass("spinner-text spinner-f").prependTo(t);
        return t;
    }
    function n(e, t) {
        var i = o.data(e, "spinner").options;
        var a = o.data(e, "spinner").spinner;
        if (t) {
            i.width = t;
        }
        var n = o('<div style="display:none"></div>').insertBefore(a);
        a.appendTo("body");
        if (isNaN(i.width)) {
            i.width = o(e).outerWidth();
        }
        var r = a.find(".spinner-arrow");
        a._outerWidth(i.width)._outerHeight(i.height);
        o(e)._outerWidth(a.width() - r.outerWidth());
        o(e).css({
            height: a.height() + "px",
            lineHeight: a.height() + "px"
        });
        r._outerHeight(a.height());
        r.find("span")._outerHeight(r.height() / 2);
        a.insertAfter(n);
        n.remove();
    }
    function r(t) {
        var i = o.data(t, "spinner").options;
        var e = o.data(t, "spinner").spinner;
        o(t).unbind(".spinner");
        e.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
        if (!i.disabled && !i.readonly) {
            e.find(".spinner-arrow-up").bind("mouseenter.spinner", function() {
                o(this).addClass("spinner-arrow-hover");
            }).bind("mouseleave.spinner", function() {
                o(this).removeClass("spinner-arrow-hover");
            }).bind("click.spinner", function() {
                i.spin.call(t, false);
                i.onSpinUp.call(t);
                o(t).validatebox("validate");
            });
            e.find(".spinner-arrow-down").bind("mouseenter.spinner", function() {
                o(this).addClass("spinner-arrow-hover");
            }).bind("mouseleave.spinner", function() {
                o(this).removeClass("spinner-arrow-hover");
            }).bind("click.spinner", function() {
                i.spin.call(t, true);
                i.onSpinDown.call(t);
                o(t).validatebox("validate");
            });
            o(t).bind("change.spinner", function() {
                o(this).spinner("setValue", o(this).val());
            });
            e.find(".spinner-text").unbind("keydown.spinner").bind("keydown.spinner", function(e) {
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
    function s(e, t) {
        var i = o.data(e, "spinner").options;
        if (t) {
            i.disabled = true;
            o(e).attr("disabled", true);
            o.data(e, "spinner").spinner.addClass("disabled");
        } else {
            i.disabled = false;
            o(e).removeAttr("disabled");
            o.data(e, "spinner").spinner.removeClass("disabled");
        }
    }
    function l(e, t) {
        var i = o.data(e, "spinner");
        var a = i.options;
        a.readonly = t == undefined ? true : t;
        var n = a.readonly ? true : !a.editable;
        o(e).attr("readonly", n).css("cursor", n ? "pointer" : "");
    }
    o.fn.spinner = function(t, e) {
        if (typeof t == "string") {
            var i = o.fn.spinner.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.validatebox(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = o.data(this, "spinner");
            if (e) {
                o.extend(e.options, t);
            } else {
                e = o.data(this, "spinner", {
                    options: o.extend({}, o.fn.spinner.defaults, o.fn.spinner.parseOptions(this), t),
                    spinner: a(this)
                });
                o(this).removeAttr("disabled");
            }
            e.options.originalValue = e.options.value;
            o(this).val(e.options.value);
            s(this, e.options.disabled);
            l(this, e.options.readonly);
            if (true !== o(this).data("rendered")) n(this);
            o(this).validatebox(e.options);
            r(this);
            o(this).data("rendered", true);
        });
    };
    o.fn.spinner.methods = {
        options: function(e) {
            var t = o.data(e[0], "spinner").options;
            return o.extend(t, {
                value: e.val()
            });
        },
        destroy: function(e) {
            return e.each(function() {
                var e = o.data(this, "spinner").spinner;
                o(this).validatebox("destroy");
                e.remove();
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                n(this, t);
            });
        },
        enable: function(e) {
            return e.each(function() {
                s(this, false);
                r(this);
            });
        },
        disable: function(e) {
            return e.each(function() {
                s(this, true);
                r(this);
            });
        },
        readonly: function(e, t) {
            return e.each(function() {
                l(this, t);
                r(this);
            });
        },
        getValue: function(e) {
            return e.val();
        },
        setValue: function(e, i) {
            return e.each(function() {
                var e = o.data(this, "spinner").options;
                var t = e.value;
                e.value = i;
                o(this).val(i);
                if (t != i) {
                    e.onChange.call(this, i, t);
                }
            });
        },
        clear: function(e) {
            return e.each(function() {
                var e = o.data(this, "spinner").options;
                e.value = "";
                o(this).val("");
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = o(this).spinner("options");
                o(this).spinner("setValue", e.originalValue);
            });
        }
    };
    o.fn.spinner.parseOptions = function(e) {
        var t = o(e);
        return o.extend({}, o.fn.validatebox.parseOptions(e), o.parser.parseOptions(e, [ "width", "height", "min", "max", {
            increment: "number",
            editable: "boolean"
        } ]), {
            value: t.val() || undefined,
            disabled: t.attr("disabled") ? true : undefined,
            readonly: t.attr("readonly") ? true : undefined
        });
    };
    o.fn.spinner.defaults = o.extend({}, o.fn.validatebox.defaults, {
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

(function(n) {
    function a(e) {
        n(e).addClass("numberspinner-f");
        var t = n.data(e, "numberspinner").options;
        n(e).spinner(t).numberbox(n.extend({}, t, {
            width: "auto"
        }));
    }
    function t(e, t) {
        var i = n.data(e, "numberspinner").options;
        var a = parseFloat(n(e).numberbox("getValue") || i.value) || 0;
        if (t == true) {
            a -= i.increment;
        } else {
            a += i.increment;
        }
        n(e).numberbox("setValue", a);
    }
    n.fn.numberspinner = function(t, e) {
        if (typeof t == "string") {
            var i = n.fn.numberspinner.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.spinner(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = n.data(this, "numberspinner");
            if (e) {
                n.extend(e.options, t);
            } else {
                n.data(this, "numberspinner", {
                    options: n.extend({}, n.fn.numberspinner.defaults, n.fn.numberspinner.parseOptions(this), t)
                });
            }
            a(this);
        });
    };
    n.fn.numberspinner.methods = {
        options: function(e) {
            var t = n.data(e[0], "numberspinner").options;
            return n.extend(t, {
                value: e.numberbox("getValue"),
                originalValue: e.numberbox("options").originalValue
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                n(this).numberbox("setValue", t);
            });
        },
        getValue: function(e) {
            return e.numberbox("getValue");
        },
        clear: function(e) {
            return e.each(function() {
                n(this).spinner("clear");
                n(this).numberbox("clear");
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = n(this).numberspinner("options");
                n(this).numberspinner("setValue", e.originalValue);
            });
        }
    };
    n.fn.numberspinner.parseOptions = function(e) {
        return n.extend({}, n.fn.spinner.parseOptions(e), n.fn.numberbox.parseOptions(e), {});
    };
    n.fn.numberspinner.defaults = n.extend({}, n.fn.spinner.defaults, n.fn.numberbox.defaults, {
        spin: function(e) {
            t(this, e);
        }
    });
})(jQuery);

(function(d) {
    function a(a) {
        var n = d.data(a, "timespinner").options;
        d(a).addClass("timespinner-f");
        d(a).spinner(n);
        d(a).unbind(".timespinner");
        d(a).bind("click.timespinner", function() {
            var e = 0;
            if (this.selectionStart != null) {
                e = this.selectionStart;
            } else {
                if (this.createTextRange) {
                    var t = a.createTextRange();
                    var i = document.selection.createRange();
                    i.setEndPoint("StartToStart", t);
                    e = i.text.length;
                }
            }
            delete this.selectionStartPersistent;
            n.highlight = r(e);
            s(a);
        }).bind("blur.timespinner", function() {
            this.selectionStartPersistent = this.selectionStart;
            l(a);
        }).bind("keydown.timespinner", function() {
            delete this.selectionStartPersistent;
        }).bind("dblclick.timespinner", function() {
            var e = 0, t = 10;
            if (a.selectionStart != null) {
                a.setSelectionRange(e, t);
            } else {
                if (a.createTextRange) {
                    var i = a.createTextRange();
                    i.collapse();
                    i.moveEnd("character", t);
                    i.moveStart("character", e);
                    i.select();
                }
            }
            d(a).focus();
        });
    }
    function r(e) {
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
    function s(e) {
        var t = d.data(e, "timespinner").options;
        var i = 0, a = 0;
        if (e.selectionStart != null) {
            t.highlight = r(e.selectionStartPersistent !== undefined ? e.selectionStartPersistent : e.selectionStart);
        }
        if (t.highlight == 0) {
            i = 0;
            a = 2;
        } else {
            if (t.highlight == 1) {
                i = 3;
                a = 5;
            } else {
                if (t.highlight == 2) {
                    i = 6;
                    a = 8;
                }
            }
        }
        if (e.selectionStart != null) {
            e.setSelectionRange(i, a);
        } else {
            if (e.createTextRange) {
                var n = e.createTextRange();
                n.collapse();
                n.moveEnd("character", a);
                n.moveStart("character", i);
                n.select();
            }
        }
        d(e).focus();
    }
    function o(e) {
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
    function c(e, t) {
        var i = d.data(e, "timespinner").options;
        if (!t) {
            return null;
        }
        var a = [];
        if (t.indexOf(i.separator) > -1) {
            a = t.split(i.separator);
            for (var n = 0; n < a.length; n++) {
                if (isNaN(a[n])) {
                    return null;
                }
            }
        } else {
            a = o(t);
        }
        while (a.length < 3) {
            a.push(0);
        }
        return new Date(1900, 0, 0, a[0], a[1], a[2]);
    }
    function l(e) {
        var t = d.data(e, "timespinner").options;
        var i = d(e).val();
        var a = c(e, i);
        if (!a) {
            t.value = "";
            d(e).spinner("setValue", "");
            return;
        }
        var n = c(e, t.min);
        var r = c(e, t.max);
        if (n && n > a) {
            a = n;
        }
        if (r && r < a) {
            a = r;
        }
        var o = [ l(a.getHours()), l(a.getMinutes()) ];
        if (t.showSeconds) {
            o.push(l(a.getSeconds()));
        }
        var s = o.join(t.separator);
        t.value = s;
        d(e).spinner("setValue", s);
        function l(e) {
            return (e < 10 ? "0" : "") + e;
        }
    }
    function t(e, t) {
        var i = d.data(e, "timespinner").options;
        var a = d(e).val();
        if (a == "") {
            a = [ 0, 0, 0 ].join(i.separator);
        }
        var n = a.split(i.separator);
        for (var r = 0; r < n.length; r++) {
            n[r] = parseInt(n[r], 10);
        }
        if (t == true) {
            if (i.minutesStep > 0 || i.hourStep > 0 || i.secondStep > 0) {
                if (i.highlight == 2) {
                    n[i.highlight] -= parseInt(i.secondStep, 10);
                }
                if (i.highlight == 1) {
                    n[i.highlight] -= parseInt(i.minutesStep, 10);
                }
                if (i.highlight == 0) {
                    n[i.highlight] -= parseInt(i.hourStep, 10);
                }
            } else {
                n[i.highlight] -= i.increment;
            }
        } else {
            if (i.minutesStep > 0 || i.hourStep > 0 || i.secondStep > 0) {
                if (i.highlight == 2) {
                    n[i.highlight] += parseInt(i.secondStep, 10);
                }
                if (i.highlight == 1) {
                    n[i.highlight] += parseInt(i.minutesStep, 10);
                }
                if (i.highlight == 0) {
                    n[i.highlight] += parseInt(i.hourStep, 10);
                }
            } else {
                n[i.highlight] += i.increment;
            }
        }
        var o = e.selectionStartPersistent !== undefined ? e.selectionStartPersistent : e.selectionStart;
        d(e).val(n.join(i.separator));
        l(e);
        e.selectionStart = o;
        s(e);
    }
    d.fn.timespinner = function(t, e) {
        if (typeof t == "string") {
            var i = d.fn.timespinner.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.spinner(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = d.data(this, "timespinner");
            if (e) {
                d.extend(e.options, t);
            } else {
                d.data(this, "timespinner", {
                    options: d.extend({}, d.fn.timespinner.defaults, d.fn.timespinner.parseOptions(this), t)
                });
            }
            a(this);
        });
    };
    d.fn.timespinner.methods = {
        options: function(e) {
            var t = d.data(e[0], "timespinner").options;
            return d.extend(t, {
                value: e.val(),
                originalValue: e.spinner("options").originalValue
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                d(this).val(t);
                l(this);
            });
        },
        getHours: function(e) {
            var t = d.data(e[0], "timespinner").options;
            var i = e.val().split(t.separator);
            return parseInt(i[0], 10);
        },
        getMinutes: function(e) {
            var t = d.data(e[0], "timespinner").options;
            var i = e.val().split(t.separator);
            return parseInt(i[1], 10);
        },
        getSeconds: function(e) {
            var t = d.data(e[0], "timespinner").options;
            var i = e.val().split(t.separator);
            return parseInt(i[2], 10) || 0;
        },
        setSpinStart: function(e, t) {
            return e.each(function() {
                if (t > -1) {
                    var e = d.data(this, "timespinner").options;
                    e.highlight = r(t);
                    this.selectionStart = t;
                    this.selectionStartPersistent = t;
                }
            });
        }
    };
    d.fn.timespinner.parseOptions = function(e) {
        return d.extend({}, d.fn.spinner.parseOptions(e), d.parser.parseOptions(e, [ "separator", {
            showSeconds: "boolean",
            highlight: "number",
            hourStep: "number",
            minutesStep: "number",
            secondStep: "number"
        } ]));
    };
    d.fn.timespinner.defaults = d.extend({}, d.fn.spinner.defaults, {
        separator: ":",
        showSeconds: false,
        highlight: 0,
        hourStep: 1,
        minutesStep: 1,
        secondStep: 1,
        spin: function(e) {
            t(this, e);
        },
        keyHandler: {
            up: function(e) {
                e.preventDefault();
                s(this);
                t(this, false);
                return false;
            },
            down: function(e) {
                e.preventDefault();
                s(this);
                t(this, true);
                return false;
            },
            enter: function(e) {
                l(this);
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
    function _setSelectionByIdField(e, t, i) {
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
        var s = $(r);
        var l = $.data(s[0], "ss");
        if (!l) {
            l = $.data(s[0], "ss", {
                cache: {},
                dirty: []
            });
        }
        return {
            add: function(e) {
                var t = [ '<style type="text/css" hisui="true">' ];
                for (var i = 0; i < e.length; i++) {
                    l.cache[e[i][0]] = {
                        width: e[i][1],
                        fontSize: e[i][2],
                        lineHeight: e[i][3]
                    };
                }
                var a = 0;
                for (var n in l.cache) {
                    var r = l.cache[n];
                    r.index = a++;
                    t.push(n + "{width:" + r.width + "}");
                }
                for (var n in l.cache) {
                    var r = l.cache[n];
                    var o = "";
                    if (r.fontSize) {
                        o += "font-size:" + r.fontSize + ";";
                    }
                    if (r.lineHeight) {
                        o += "line-height:" + r.lineHeight + ";";
                    }
                    if (o != "") t.push(".datagrid-row " + n + "{" + o + "}");
                }
                t.push("</style>");
                $(t.join("\n")).appendTo(s);
                s.children("style[hisui]:not(:last)").remove();
            },
            getRule: function(e) {
                var t = s.children("style[hisui]:last")[0];
                var i = t.styleSheet ? t.styleSheet : t.sheet || document.styleSheets[document.styleSheets.length - 1];
                var a = i.cssRules || i.rules;
                return a[e];
            },
            set: function(e, t) {
                var i = l.cache[e];
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
                for (var i in l.cache) {
                    if (i.indexOf(e + "-") == -1) {
                        t.push([ i, l.cache[i].width ]);
                    }
                }
                l.cache = {};
                this.add(t);
            },
            dirty: function(e) {
                if (e) {
                    l.dirty.push(e);
                }
            },
            clean: function() {
                for (var e = 0; e < l.dirty.length; e++) {
                    this.remove(l.dirty[e]);
                }
                l.dirty = [];
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
        if (p > 0) {
            f.height(p);
            u.height(p);
            d.add(c)._outerHeight(p);
        }
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
        if (l.height() > 0) {
            o.height(l.height());
        }
    }
    function _fixRowHeight(e, t, i) {
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
    function _533(a, n) {
        var e = $.data(a, "datagrid");
        var r = e.options;
        var o = e.dc;
        if (!o.body2.children("table.datagrid-btable-frozen").length) {
            o.body1.add(o.body2).prepend('<table class="datagrid-btable datagrid-btable-frozen" cellspacing="0" cellpadding="0"></table>');
        }
        t(true);
        t(false);
        _519(a);
        function t(e) {
            var t = e ? 1 : 2;
            var i = r.finder.getTr(a, n, "body", t);
            (e ? o.body1 : o.body2).children("table.datagrid-btable-frozen").append(i);
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
                _fixRowHeight(_546);
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
                        } else if (btn.type == "combobox") {
                            var _myinput = $('<td><label class="' + btn.lclass + '">' + btn.label + '</label><input class="' + btn.iclass + '"/></td>').appendTo(tr);
                            _myinput.find("input").eq(0).combobox(btn);
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
        if (!(opts.rownumbers || opts.frozenColumns && opts.frozenColumns.length)) {
            dc.view1.closest(".datagrid-view").addClass("datagrid-not-view1");
            return;
        }
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
                            if ("undefined" != typeof f.columnHeaderTitle && f.columnHeaderTitle) {
                                h.attr("title", f.columnHeaderTitle);
                                h.addClass("datagrid-header-col-tip");
                                h.tooltip({
                                    position: "bottom",
                                    trackMouse: false
                                });
                            }
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
                var h = $('<td rowspan="' + opts.frozenColumns.length + '"><div class="datagrid-header-rownumber">' + $.hisui.getTrans($.hisui.getStyleCodeConfigValue("datagridRowNumberHeaderTitle")) + "</div></td>");
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
    function _559(p) {
        var v = $.data(p, "datagrid");
        var t = v.panel;
        var g = v.options;
        var r = v.dc;
        var a = r.header1.add(r.header2);
        a.find(".datagrid-header-check input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function(e) {
            if (g.singleSelect && g.selectOnCheck) {
                return false;
            }
            if ($(this).is(":checked")) {
                _5df(p);
            } else {
                _uncheckAll(p);
            }
            e.stopPropagation();
        });
        var e = a.find("div.datagrid-cell");
        e.closest("td").unbind(".datagrid").bind("mouseenter.datagrid", function() {
            if (v.resizing) {
                return;
            }
            $(this).addClass("datagrid-header-over");
        }).bind("mouseleave.datagrid", function() {
            $(this).removeClass("datagrid-header-over");
        }).bind("contextmenu.datagrid", function(e) {
            var t = $(this).attr("field");
            g.onHeaderContextMenu.call(p, e, t);
        }).bind("dblclick.datagrid", function(e) {
            var t = $(this).attr("field");
            if (g.editColumnsPage != null) {
                e.preventDefault();
                var i = 1;
                if (null != g.editColumnsGrantUrl) $.ajax({
                    url: g.editColumnsGrantUrl,
                    "async": false,
                    dataType: "text",
                    success: function(e) {
                        i = e;
                    }
                });
                if (i == 1) window.open(g.editColumnsPage, "_blank", "top=50,left=100,width=1000,height=800,titlebar=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
                return false;
            } else {
                g.onDblClickHeader.call(p, e, t);
            }
        });
        e.unbind(".datagrid").bind("click.datagrid", function(e) {
            var t = $(this).offset().left + 5;
            var i = $(this).offset().left + $(this)._outerWidth() - 5;
            if (e.pageX < i && e.pageX > t) {
                _56c(p, $(this).parent().attr("field"));
            }
        }).bind("dblclick.datagrid", function(e) {
            var t = $(this).offset().left + 5;
            var i = $(this).offset().left + $(this)._outerWidth() - 5;
            var a = g.resizeHandle == "right" ? e.pageX > i : g.resizeHandle == "left" ? e.pageX < t : e.pageX < t || e.pageX > i;
            if (a) {
                var n = $(this).parent().attr("field");
                var r = _getColumnOption(p, n);
                if (r.resizable == false) {
                    return;
                }
                $(p).datagrid("autoSizeColumn", n);
                r.auto = false;
            }
        });
        var i = g.resizeHandle == "right" ? "e" : g.resizeHandle == "left" ? "w" : "e,w";
        e.each(function() {
            $(this).resizable({
                handles: i,
                disabled: $(this).attr("resizable") ? $(this).attr("resizable") == "false" : false,
                minWidth: 25,
                onStartResize: function(e) {
                    v.resizing = true;
                    a.css("cursor", $("body").css("cursor"));
                    if (!v.proxy) {
                        v.proxy = $('<div class="datagrid-resize-proxy"></div>').appendTo(r.view);
                    }
                    v.proxy.css({
                        left: e.pageX - $(t).offset().left - 1,
                        display: "none"
                    });
                    setTimeout(function() {
                        if (v.proxy) {
                            v.proxy.show();
                        }
                    }, 500);
                },
                onResize: function(e) {
                    v.proxy.css({
                        left: e.pageX - $(t).offset().left - 1,
                        display: "block"
                    });
                    return false;
                },
                onStopResize: function(e) {
                    a.css("cursor", "");
                    $(this).css("height", "");
                    $(this)._outerWidth($(this)._outerWidth());
                    var t = $(this).parent().attr("field");
                    var i = _getColumnOption(p, t);
                    i.width = $(this)._outerWidth();
                    i.boxWidth = parseInt(this.style.width);
                    i.auto = undefined;
                    $(this).css("width", "");
                    _542(p, t);
                    v.proxy.remove();
                    v.proxy = null;
                    if ($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")) {
                        _519(p);
                    }
                    _579(p);
                    g.onResizeColumn.call(p, t, i.width);
                    setTimeout(function() {
                        v.resizing = false;
                    }, 0);
                }
            });
        });
        function n(e) {
            var t = $(e.target);
            var i = t.closest("tr.datagrid-row");
            if (!m(i)) {
                return;
            }
            var a = b(i);
            if (t.parent().hasClass("datagrid-cell-check")) {
                if (g.singleSelect && g.selectOnCheck) {
                    if (!g.checkOnSelect) {
                        _uncheckAll(p, true);
                    }
                    _5d2(p, a);
                } else {
                    if (t.is(":checked")) {
                        if (g.shiftCheck && e.shiftKey) {
                            shiftCheckRow(a, i, p);
                        }
                        _5d2(p, a);
                    } else {
                        if (g.shiftCheck && e.shiftKey) {
                            shiftUncheckRow(a, i, p);
                            _5d2(p, a);
                        } else {
                            _uncheckRow(p, a);
                        }
                    }
                }
            } else {
                var n = g.finder.getRow(p, a);
                var r = t.closest("td[field]", i);
                if (r.length) {
                    var o = r.attr("field");
                    g.onClickCell.call(p, a, o, n[o]);
                }
                if (g.singleSelect == true) {
                    _5cb(p, a);
                } else {
                    if (g.ctrlSelect) {
                        if (e.ctrlKey) {
                            if (i.hasClass("datagrid-row-selected")) {
                                _5d3(p, a);
                            } else {
                                _5cb(p, a);
                            }
                        } else {
                            $(p).datagrid("clearSelections");
                            _5cb(p, a);
                        }
                    } else {
                        if (i.hasClass("datagrid-row-selected")) {
                            _5d3(p, a);
                        } else {
                            _5cb(p, a);
                        }
                    }
                }
                if (r) {
                    var s = r.closest(".datagrid-view").find(".datagrid-header-row td[field=" + o + "]");
                    if ("true" == s.attr("header-checkbox")) {
                        _validHeaderCheckboxByData(r.closest(".datagrid-body"), s.parent(), o);
                    }
                }
                if (g.clicksToEdit == 1) {
                    var l = undefined;
                    var d = g.finder.getTr(p, "", "editing", 2);
                    if (d) l = d.attr("datagrid-row-index");
                    if (l != a) {
                        if (a > -1 && ("undefined" == typeof l || $(p).datagrid("validateRow", l))) {
                            if ("undefined" != typeof l) _5fd(p, parseInt(l), false);
                            _5f7(p, a);
                        }
                    }
                }
                g.onClickRow.call(p, a, n);
            }
        }
        var o = $.hisui.debounce && parseInt(g.clickDelay) > 0 ? $.hisui.debounce(n, parseInt(g.clickDelay)) : n;
        r.body1.add(r.body2).unbind().bind("mouseover", function(e) {
            if (v.resizing) {
                return;
            }
            var t = $(e.target);
            var i = undefined;
            if ("undefined" == typeof t.attr("field")) {
                t = t.closest("td");
            }
            i = t.attr("field");
            var a = $(e.target).closest("tr.datagrid-row");
            if (!m(a)) {
                return;
            }
            var n = b(a);
            if (i && t.text() != "") {
                var r = $.data(p, "datagrid");
                var o = r.options.columns || [];
                cm = o.concat(r.options.frozenColumns);
                for (var s = 0; s < cm.length; s++) {
                    for (var l = 0; l < cm[s].length; l++) {
                        if (cm[s][l].field == i) {
                            if (cm[s][l].showTip || "function" == typeof cm[s][l].showTipFormatter) {
                                var d = t.text();
                                if ("function" == typeof cm[s][l].showTipFormatter) {
                                    var c = g.finder.getRow(p, n);
                                    d = cm[s][l].showTipFormatter.call(this, c, n);
                                }
                                var f = cm[s][l].tipWidth || 350;
                                var u = cm[s][l].tipPosition || "bottom";
                                var h = cm[s][l].tipTrackMouse || false;
                                if ("" != d) t.tooltip({
                                    content: d,
                                    position: u,
                                    trackMouse: h,
                                    tipWidth: f,
                                    onShow: function() {
                                        var e = this;
                                        (function() {
                                            if ($(e).closest("div").length == 0) {
                                                $(e).tooltip("hide");
                                                $(e).tooltip("destroy");
                                                return;
                                            }
                                            if ($.data(e, "tooltip")) {
                                                setTimeout(arguments.callee, 200);
                                            }
                                        })();
                                    },
                                    onHide: function() {
                                        $(this).tooltip("destroy");
                                    }
                                }).tooltip("show", e);
                            }
                        }
                    }
                }
            }
            _5c7(p, n, true);
            e.stopPropagation();
        }).bind("mouseout", function(e) {
            var t = $(e.target).closest("tr.datagrid-row");
            if (!m(t)) {
                return;
            }
            var i = b(t);
            g.finder.getTr(p, i).removeClass("datagrid-row-over");
            e.stopPropagation();
        }).bind("click", function(e) {
            if (parseInt(g.clickDelay) > 0) {
                o.call(this, e);
            } else {
                n.call(this, e);
            }
            e.stopPropagation();
        }).bind("dblclick", function(e) {
            var t = $(e.target);
            var i = t.closest("tr.datagrid-row");
            if (!m(i)) {
                return;
            }
            var a = b(i);
            var n = g.finder.getRow(p, a);
            var r = t.closest("td[field]", i);
            if (r.length) {
                var o = r.attr("field");
                g.onDblClickCell.call(p, a, o, n[o]);
            }
            if (g.clicksToEdit == 2) {
                _5f7(p, rowIndex);
            }
            if (parseInt(g.clickDelay) > 0) {
                setTimeout(function() {
                    g.onDblClickRow.call(p, a, n);
                }, g.clickDelay);
            } else {
                g.onDblClickRow.call(p, a, n);
            }
            e.stopPropagation();
        }).bind("contextmenu", function(e) {
            var t = $(e.target).closest("tr.datagrid-row");
            if (!m(t)) {
                return;
            }
            var i = b(t);
            var a = g.finder.getRow(p, i);
            g.onRowContextMenu.call(p, e, i, a);
            e.stopPropagation();
        });
        r.body1.bind("mousewheel DOMMouseScroll", function(e) {
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
        r.body2.bind("scroll", function() {
            var e = r.view1.children("div.datagrid-body");
            e.scrollTop($(this).scrollTop());
            var t = r.body1.children(":first");
            var i = r.body2.children(":first");
            if (t.length && i.length) {
                var a = t.offset().top;
                var n = i.offset().top;
                if (a != n) {
                    e.scrollTop(e.scrollTop() + a - n);
                }
            }
            r.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
            r.body2.children("table.datagrid-btable-frozen").css("left", -$(this)._scrollLeft());
        });
        function b(e) {
            if (e.attr("datagrid-row-index")) {
                return parseInt(e.attr("datagrid-row-index"));
            } else {
                return e.attr("node-id");
            }
        }
        function m(e) {
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
    function _586(r, e) {
        var t = $.data(r, "datagrid");
        var o = t.options;
        var s = t.dc;
        var l = $('<div class="datagrid-cell" style="position:absolute;left:-9999px"></div>').appendTo("body");
        if (e) {
            c(e);
            if (o.fitColumns) {
                _519(r);
                _579(r);
            }
        } else {
            if (!!o.autoSizeColumn) {
                var i = false;
                var a = _557(r, true).concat(_557(r, false));
                for (var n = 0; n < a.length; n++) {
                    var e = a[n];
                    var d = _getColumnOption(r, e);
                    if (!d.hidden && d.auto) {
                        c(e);
                        i = true;
                    }
                }
                if (i && o.fitColumns) {
                    _519(r);
                    _579(r);
                }
            }
        }
        l.remove();
        function c(a) {
            var n = s.view.find('div.datagrid-header td[field="' + a + '"] div.datagrid-cell');
            n.css("width", "");
            var e = $(r).datagrid("getColumnOption", a);
            e.width = undefined;
            e.boxWidth = undefined;
            e.auto = true;
            $(r).datagrid("fixColumnSize", a);
            var t = Math.max(i("header"), i("allbody"), i("allfooter"));
            n._outerWidth(t);
            e.width = t;
            e.boxWidth = parseInt(n[0].style.width);
            n.css("width", "");
            $(r).datagrid("fixColumnSize", a);
            o.onResizeColumn.call(r, a, e.width);
            function i(e) {
                var t = 0;
                if (e == "header") {
                    t = i(n);
                } else {
                    o.finder.getTr(r, 0, e).find('td[field="' + a + '"] div.datagrid-cell').each(function() {
                        var e = i($(this));
                        if (t < e) {
                            t = e;
                        }
                    });
                }
                return t;
                function i(e) {
                    return e.is(":visible") ? e._outerWidth() : l.html(e.html())._outerWidth();
                }
            }
        }
    }
    function _542(i, e) {
        var a = $.data(i, "datagrid");
        var t = a.options;
        var n = a.dc;
        var r = n.view.find("table.datagrid-btable,table.datagrid-ftable");
        r.css("table-layout", "fixed");
        if (e) {
            l(e);
        } else {
            var o = _557(i, true).concat(_557(i, false));
            for (var s = 0; s < o.length; s++) {
                l(o[s]);
            }
        }
        r.css("table-layout", "auto");
        _596(i);
        setTimeout(function() {
            _fixRowHeight(i);
            _59b(i);
            resizeTHGroup(i);
        }, 0);
        function l(e) {
            var t = _getColumnOption(i, e);
            if (!t.checkbox) {
                a.ss.set("." + t.cellClass, t.boxWidth ? t.boxWidth + "px" : "auto");
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
    function _596(n) {
        var e = $.data(n, "datagrid").dc;
        e.body1.add(e.body2).find("td.datagrid-td-merged").each(function() {
            var e = $(this);
            var t = e.attr("colspan") || 1;
            var i = _getColumnOption(n, e.attr("field")).width;
            for (var a = 1; a < t; a++) {
                e = e.next();
                i += _getColumnOption(n, e.attr("field")).width + 1;
            }
            $(this).children("div.datagrid-cell")._outerWidth(i);
        });
    }
    function _59b(n, e) {
        var t = $.data(n, "datagrid").dc;
        (e || t.view).find("div.datagrid-editable").each(function() {
            var e = $(this);
            var t = e.parent().attr("field");
            var i = $(n).datagrid("getColumnOption", t);
            e._outerWidth(i.width);
            var a = $.data(this, "datagrid.editor");
            if (a.actions.resize) {
                a.actions.resize(a.target, e.width());
            }
        });
    }
    function _getColumnOption(e, r) {
        function t(e) {
            if (e) {
                for (var t = 0; t < e.length; t++) {
                    var i = e[t];
                    for (var a = 0; a < i.length; a++) {
                        var n = i[a];
                        if (n.field == r) {
                            return n;
                        }
                    }
                }
            }
            return null;
        }
        var i = $.data(e, "datagrid").options;
        var a = t(i.columns);
        if (!a) {
            a = t(i.frozenColumns);
        }
        return a;
    }
    function _557(e, t) {
        var i = $.data(e, "datagrid").options;
        var o = t == true ? i.frozenColumns || [ [] ] : i.columns;
        if (o.length == 0) {
            return [];
        }
        var s = [];
        function l(e) {
            var t = 0;
            var i = 0;
            while (true) {
                if (s[i] == undefined) {
                    if (t == e) {
                        return i;
                    }
                    t++;
                }
                i++;
            }
        }
        function a(e) {
            var t = [];
            var i = 0;
            for (var a = 0; a < o[e].length; a++) {
                var n = o[e][a];
                if (n.field) {
                    t.push([ i, n.field ]);
                }
                i += parseInt(n.colspan || "1");
            }
            for (var a = 0; a < t.length; a++) {
                t[a][0] = l(t[a][0]);
            }
            for (var a = 0; a < t.length; a++) {
                var r = t[a];
                s[r[0]] = r[1];
            }
        }
        for (var n = 0; n < o.length; n++) {
            a(n);
        }
        var r = [];
        if (!!$.data(e, "amendDataDisplay") && !!$.data(e, "filelds")) {
            if ($.isArray($.data(e, "filelds")[0])) {
                if (t) {
                    r = r.concat($.data(e, "filelds")[0]);
                } else {
                    r = r.concat($.data(e, "filelds")[1]);
                }
            } else {
                r = r.concat($.data(e, "filelds"));
            }
            for (var n = 0; n < s.length; n++) {
                var d = /^ID/;
                if (d.test(s[n])) {
                    r.splice(n, 0, s[n]);
                }
            }
            return r;
        } else {
            return s;
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
    function _578(l, e) {
        var t = $.data(l, "datagrid");
        var i = t.options;
        var a = t.dc;
        e = i.loadFilter.call(l, e);
        e.total = parseInt(e.total);
        t.data = e;
        if (e.footer) {
            t.footer = e.footer;
        }
        if (!i.remoteSort && i.sortName) {
            var d = i.sortName.split(",");
            var c = i.sortOrder.split(",");
            e.rows.sort(function(e, t) {
                var i = 0;
                for (var a = 0; a < d.length; a++) {
                    var n = d[a];
                    var r = c[a];
                    var o = _getColumnOption(l, n);
                    var s = o.sorter || function(e, t) {
                        return e == t ? 0 : e > t ? 1 : -1;
                    };
                    i = s(e[n], t[n]) * (r == "asc" ? 1 : -1);
                    if (i != 0) {
                        return i;
                    }
                }
                return i;
            });
        }
        if (i.view.onBeforeRender) {
            i.view.onBeforeRender.call(i.view, l, e.rows);
        }
        i.view.render.call(i.view, l, a.body2, false);
        i.view.render.call(i.view, l, a.body1, true);
        if (i.showFooter) {
            i.view.renderFooter.call(i.view, l, a.footer2, false);
            i.view.renderFooter.call(i.view, l, a.footer1, true);
        }
        if (i.view.onAfterRender) {
            i.view.onAfterRender.call(i.view, l);
        }
        t.ss.clean();
        if (i.clearSelectionsOnload) $(l).datagrid("clearSelections");
        if (i.rownumbers && i.fixRowNumber) {
            $(l).datagrid("fixRowNumber");
        }
        i.onLoadSuccess.call(l, e);
        if (i.columns.length > 0) {
            for (var n = 0; n < i.columns[0].length; n++) {
                if (true == i.columns[0][n].headerCheckbox) {
                    _validHeaderCheckboxByData(a.body2, a.header2, i.columns[0][n].field);
                }
            }
        }
        var r = $(l).datagrid("getPager");
        if (r.length) {
            var o = r.pagination("options");
            if (o.total != e.total || i.pageNumber < 1) {
                r.pagination("refresh", {
                    total: e.total
                });
                if (i.pageNumber != o.pageNumber) {
                    i.pageNumber = o.pageNumber;
                    _577(l);
                }
            }
        }
        _fixRowHeight(l);
        a.body2.triggerHandler("scroll");
        _5af(l);
        $(l).datagrid("autoSizeColumn");
    }
    function _5af(e) {
        var t = $.data(e, "datagrid");
        var a = t.options;
        if (a.idField) {
            var i = $.data(e, "treegrid") ? true : false;
            var n = a.onSelect;
            var r = a.onCheck;
            a.onSelect = a.onCheck = function() {};
            var o = a.finder.getRows(e);
            for (var s = 0; s < o.length; s++) {
                var l = o[s];
                var d = i ? l[a.idField] : s;
                if (a.view.type == "scrollview") d += a.view.index || 0;
                if (c(t.selectedRows, l)) {
                    _5cb(e, d, true);
                }
                if (c(t.checkedRows, l)) {
                    _5d2(e, d, true);
                }
            }
            a.onSelect = n;
            a.onCheck = r;
        }
        function c(e, t) {
            for (var i = 0; i < e.length; i++) {
                if (e[i][a.idField] == t[a.idField]) {
                    e[i] = t;
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
    function _getSelections(e) {
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
    function _handerMergeddRow(e, t, i, a, n) {
        try {
            if (e.finder.getTr(t, i).children().hasClass("datagrid-td-merged")) {
                var r = e.finder.getTr(t, i).children().eq(0);
                var o = r.attr("rowspan");
                if (o >= 2) {
                    for (var s = 1; s < o; s++) {
                        if (n) {
                            e.finder.getTr(t, parseInt(i) + parseInt(s)).addClass("datagrid-merged-row-selected");
                        } else {
                            e.finder.getTr(t, parseInt(i) + parseInt(s)).removeClass("datagrid-merged-row-selected");
                        }
                    }
                }
            }
        } catch (l) {}
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
            _setSelectionByIdField(o, r.idField, s);
        }
        r.finder.getTr(e, t).addClass("datagrid-row-selected");
        _handerMergeddRow(r, e, t, "datagrid-merged-row-selected", true);
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
        _handerMergeddRow(r, e, t, "datagrid-merged-row-selected", false);
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
                _setSelectionByIdField(r, a.idField, n[o]);
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
            _setSelectionByIdField(a.checkedRows, n.idField, r);
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
                _setSelectionByIdField(i.checkedRows, a.idField, n[l]);
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
            if ("function" == typeof t.actions.setText) t.actions.setText(t.target, t.oldHtml);
            if ("function" == typeof t.actions.setValueText) t.actions.setValueText(t.target, n[e], t.oldHtml);
        });
        _validateRow(e, t);
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
            if (!_validateRow(e, t)) {
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
    function _5fa(l, e) {
        var d = $.data(l, "datagrid").options;
        var t = d.finder.getTr(l, e);
        t.children("td").each(function() {
            var e = $(this).find("div.datagrid-cell");
            var t = $(this).attr("field");
            var i = _getColumnOption(l, t);
            if (i && i.editor) {
                var a, n;
                if (typeof i.editor == "string") {
                    a = i.editor;
                } else {
                    a = i.editor.type;
                    n = i.editor.options;
                }
                var r = d.editors[a];
                if (r) {
                    var o = e.html();
                    var s = e._outerWidth();
                    e.addClass("datagrid-editable");
                    e._outerWidth(s);
                    e.html('<table border="0" cellspacing="0" cellpadding="1"><tr><td></td></tr></table>');
                    e.children("table").bind("click dblclick contextmenu", function(e) {
                        e.stopPropagation();
                    });
                    $.data(e[0], "datagrid.editor", {
                        actions: r,
                        target: r.init(e.find("td"), n),
                        field: t,
                        type: a,
                        oldHtml: o
                    });
                }
            }
        });
        _fixRowHeight(l, e, true);
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
    function _validateRow(e, t) {
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
            _fixRowHeight(e);
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
            if (_validateRow(e, a)) {
                _5fd(e, a, false);
            } else {
                i = false;
            }
        }
        if (i) {
            _630(e);
        }
    }
    function _636(n) {
        var e = $.data(n, "datagrid");
        var a = e.options;
        var t = e.originalRows;
        var i = e.insertedRows;
        var r = e.deletedRows;
        var o = e.selectedRows;
        var s = e.checkedRows;
        var l = e.data;
        function d(e) {
            var t = [];
            for (var i = 0; i < e.length; i++) {
                t.push(e[i][a.idField]);
            }
            return t;
        }
        function c(e, t) {
            for (var i = 0; i < e.length; i++) {
                var a = _5b7(n, e[i]);
                if (a >= 0) {
                    (t == "s" ? _5cb : _5d2)(n, a, true);
                }
            }
        }
        for (var f = 0; f < l.rows.length; f++) {
            _5fd(n, f, true);
        }
        var u = d(o);
        var h = d(s);
        o.splice(0, o.length);
        s.splice(0, s.length);
        l.total += r.length - i.length;
        l.rows = t;
        _578(n, l);
        c(u, "s");
        c(h, "c");
        _630(n);
    }
    function _reload2(e, t) {
        var i = $.data(e, "datagrid");
        var a = i.options;
        if (a.filterToolbarType == "remote") {
            $(e).datagrid("load", t);
        } else {
            if (a.toolBarOriginalData == null) {
                a.toolBarOriginalData = $(e).datagrid("getData");
            }
            if (a.toolBarOriginalData) {
                $(e).datagrid("loadData", a.toolBarOriginalData);
            }
        }
    }
    function addToolLoadFilter(h) {
        var p = $.data(h, "datagrid").options;
        p.oldLoadFilter = p.loadFilter;
        if (p.filterToolbarType == "remote") {
            return;
        }
        p.loadFilter = function(e) {
            var t = $(h).closest(".datagrid-wrap").find(".datagrid-toolbar");
            var i = t.find(".datagrid-toolbar-findbox").val().trim().toUpperCase();
            var a = {}, n = true;
            t.find(".datagrid-filter-htable").find("td").each(function() {
                var e = $(this).attr("field");
                var t = $(this).find('input[type="text"]');
                if (e && t.length > 0 && t.val() != "") {
                    a[e] = t.val().trim().toUpperCase();
                    n = false;
                }
            });
            if (typeof e.length == "number" && typeof e.splice == "function") {
                e = {
                    total: e.length,
                    rows: e
                };
            }
            if (i == "" && n) {
                return p.oldLoadFilter.call(this, e);
            }
            var r = [];
            var o = e.originalRows || e.rows;
            for (var s = 0; s < o.length; s++) {
                var l = o[s];
                var d = true;
                var c = [];
                for (var f in l) {
                    if (l.hasOwnProperty(f)) {
                        if ("string" !== typeof l[f] && "number" !== typeof l[f]) {
                            continue;
                        }
                        if (a.hasOwnProperty(f) && a[f] != "") {
                            if (l[f].toString().toUpperCase().indexOf(a[f]) == -1 && $.hisui.toChineseSpell(l[f].toString()).toUpperCase().indexOf(a[f]) == -1) {
                                d = false;
                                break;
                            }
                        }
                        c.push(l[f]);
                    }
                }
                if (d && (c.join(",").toUpperCase().indexOf(i) == -1 && $.hisui.toChineseSpell(c.join(",")).toUpperCase().indexOf(i) == -1)) {
                    d = false;
                }
                if (d) r.push(o[s]);
            }
            var u = {
                total: r.length,
                rows: r
            };
            u = p.oldLoadFilter.call(this, u);
            return u;
        };
    }
    function _577(t, e) {
        var i = $.data(t, "datagrid").options;
        if (e) {
            i.queryParams = e;
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
        if (i.onBeforeLoad.call(t, a) == false) {
            return;
        }
        $(t).datagrid("loading");
        setTimeout(function() {
            n();
        }, 0);
        function n() {
            var e = i.loader.call(t, a, function(e) {
                setTimeout(function() {
                    $(t).datagrid("loaded");
                }, 0);
                _578(t, e);
                setTimeout(function() {
                    _630(t);
                }, 0);
            }, function() {
                setTimeout(function() {
                    $(t).datagrid("loaded");
                }, 0);
                i.onLoadError.apply(t, arguments);
            });
            if (e == false) {
                $(t).datagrid("loaded");
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
                "async": false,
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
                var n = function(e, t, i) {
                    var a;
                    if (e) {
                        for (a in t) {
                            if ("string" == typeof i && a == i) {
                                e[a] = t[a];
                            }
                            if (t.hasOwnProperty(a) && e[a] === undefined) {
                                e[a] = t[a];
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
                            n(a.cm[o], s, "title");
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
    $.fn.datagrid = function(a, e) {
        if (typeof a == "string") {
            return $.fn.datagrid.methods[a](this, e);
        }
        a = a || {};
        return this.each(function() {
            var e = $.data(this, "datagrid");
            var r;
            if (e) {
                r = $.extend(e.options, a);
                e.options = r;
                if ("function" == typeof r.onInitBefore) r.onInitBefore.call(this, r);
                _handerColumns(r, a, e);
            } else {
                r = $.extend({}, $.extend({}, $.fn.datagrid.defaults, {
                    queryParams: {}
                }), $.fn.datagrid.parseOptions(this), a);
                if ("function" == typeof r.onInitBefore) r.onInitBefore.call(this, r);
                _handerColumns(r, a, e);
                $(this).css("width", "").css("height", "");
                var t = _53a(this, r.rownumbers);
                if (!r.columns) {
                    r.columns = t.columns;
                }
                if (!r.frozenColumns) {
                    r.frozenColumns = t.frozenColumns;
                }
                r.columns = $.extend(true, [], r.columns);
                r.frozenColumns = $.extend(true, [], r.frozenColumns);
                r.view = $.extend({}, r.view);
                $.data(this, "datagrid", {
                    options: r,
                    panel: t.panel,
                    dc: t.dc,
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
            if ("function" == typeof r.onInitBefore2) r.onInitBefore2.call(this, r);
            var o = this;
            if (r.showFilterToolbar && (r.toolbar == null || r.toolbar == "")) {
                addToolLoadFilter(o);
                r.toolbar = [ {
                    type: "input",
                    "class": "textbox datagrid-toolbar-findbox",
                    placeholder: r.like,
                    handler: function(e) {
                        if (e.keyCode == 13) {
                            $(o).datagrid("reload2", {
                                findboxValue: e.target.value
                            });
                        }
                    },
                    notTrans: true
                }, {
                    text: r.findBtn,
                    iconCls: "icon-search",
                    handler: function() {
                        var e = $(o).closest(".datagrid-wrap").find(".datagrid-toolbar");
                        var t = e.find(".datagrid-toolbar-findbox").val();
                        $(o).datagrid("reload2", {
                            findboxValue: t
                        });
                    },
                    notTrans: true
                }, {
                    text: r.clearBtn,
                    iconCls: "icon-clear-screen",
                    handler: function() {
                        var e = $(o).closest(".datagrid-wrap").find(".datagrid-toolbar");
                        e.find(".datagrid-toolbar-findbox").val("");
                        e.find(".datagrid-filter-htable").find('td input[type="text"]').val("");
                        $(o).datagrid("reload2");
                        r.toolBarOriginalData = null;
                    },
                    notTrans: true
                }, {
                    text: r.advancedBtn,
                    iconCls: "icon-find-fee-itm",
                    handler: function() {
                        var e = $(this).closest("table");
                        if (e.next().length == 0) {
                            $(this).find(".l-btn-text").text(r.advanced2Btn);
                            var t = $(this).closest(".datagrid-wrap").find(".datagrid-view1 .datagrid-header .datagrid-header-row");
                            var i = $(this).closest(".datagrid-wrap").find(".datagrid-view2 .datagrid-header .datagrid-header-row");
                            var a = "";
                            if (t.length > 0) {
                                a += t.html();
                            }
                            if (i.length > 0) {
                                a += i.html();
                            }
                            var n = $('<table class="datagrid-filter-htable" border="0" cellspacing="0" cellpadding="0" style="height: 35px;"><tr>' + a + "</tr></table>").insertAfter(e);
                            n.find(".datagrid-header-check").removeClass("datagrid-header-check").css({
                                width: 27
                            }).find("input").remove();
                            n.find(".datagrid-cell").each(function() {
                                var e = $(this).text();
                                $(this).css({
                                    padding: "0 8px"
                                }).removeClass("datagrid-cell");
                                $(this).html('<input type="text" placeholder="' + e + '" class="datagrid-cell-filter">');
                            });
                            n.on("keydown", function(e) {
                                if (e.keyCode == 13) {
                                    $(o).datagrid("reload2");
                                }
                            });
                        } else {
                            if (e.next().css("display") !== "none") {
                                $(this).find(".l-btn-text").text(r.advancedBtn);
                                e.next().hide();
                            } else {
                                $(this).find(".l-btn-text").text(r.advanced2Btn);
                                e.next().show();
                            }
                        }
                    },
                    notTrans: true
                } ];
            }
            _545(this);
            _559(this);
            _515(this);
            if (r.data) {
                _578(this, r.data);
                _630(this);
            } else {
                var i = $.fn.datagrid.parseData(this);
                if (i.total > 0) {
                    _578(this, i);
                    _630(this);
                }
            }
            if (!r.lazy && r.url) {
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
                var u = function(e) {
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
                var i = function(o, s, e, t) {
                    s = s || 0;
                    var l = !!document.getBoxObjectFor || "mozInnerScreenX" in window, d = !!window.opera && !!window.opera.toString().indexOf("Opera"), c = o.currentStyle ? function(e) {
                        var t = o.currentStyle[e];
                        if (e === "height" && t.search(/px/i) !== 1) {
                            var i = o.getBoundingClientRect();
                            return i.bottom - i.top - parseFloat(c("paddingTop")) - parseFloat(c("paddingBottom")) + "px";
                        }
                        return t;
                    } : function(e) {
                        return getComputedStyle(o, null)[e];
                    }, f = parseFloat(c("height"));
                    o.style.resize = "none";
                    var i = function(e) {
                        var t, i = 0, a = o.style;
                        if (e != true && o._length === o.value.length) return;
                        o._length = o.value.length;
                        if (!l && !d) {
                            i = parseInt(c("paddingTop")) + parseInt(c("paddingBottom"));
                        }
                        o.style.height = f + "px";
                        var n = u(o);
                        var r = n.maxHeight;
                        if (o.scrollHeight > f) {
                            if (r && o.scrollHeight > r) {
                                t = r - i;
                                a.overflowY = "auto";
                            } else {
                                t = o.scrollHeight - i;
                                a.overflowY = "hidden";
                            }
                            a.height = t + s + "px";
                            o.currHeight = parseInt(a.height);
                        }
                        h($(o), n.downShow);
                    };
                    $(o).off("propertychange.celltextarea").on("propertychange.celltextarea", i);
                    $(o).off("input.celltextarea").on("input.celltextarea", i);
                    $(o).off("focus.celltextarea").on("focus.celltextarea", i);
                    i(t);
                };
                var h = function(e, t) {
                    var i = e.parent().offset();
                    var a = e.closest("div.datagrid-cell");
                    if (a.length > 0 && a[0].style.whiteSpace == "") {
                        i.top -= 7;
                    }
                    var n = e.closest(".datagrid-view2")[0];
                    if (n) {
                        if (i) {
                            var r = e.closest(".datagrid").offset().top;
                            if ("undefined" == typeof t) t = u(e[0]).downShow;
                            if (t) {
                                e.offset(i);
                            } else {
                                var o = a.closest("td").height();
                                e.offset({
                                    top: i.top + o - e.height(),
                                    left: i.left
                                });
                            }
                        }
                        if (false == t) {
                            if (n.scrollTop > 0) {
                                setTimeout(function() {
                                    e.closest(".datagrid-body")[0].scrollTop = 1e5;
                                }, 0);
                            }
                        }
                    }
                };
                e.closest(".datagrid-body").on("scroll.celltextarea", function() {
                    h(e);
                });
                i(e[0], 0, undefined);
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
                if ("boolean" == typeof t && t == true && $(e).val() == "true") {
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
                        if ("string" == typeof t && t) {
                            t = t.split(i.separator);
                        }
                        $(e).combobox("setValues", t);
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
            setText: function(e, t) {
                if ($(e).combogrid("options").lazy) {
                    $(e).combogrid("setText", t);
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
        var a = [];
        var n = $(e).datagrid("getRows");
        $(e).datagrid("getPanel").find('.datagrid-body td[field="' + t + '"] input[type="checkbox"]').each(function() {
            var e = $(this).prop("checked");
            if (e) {
                var t = $(this).closest(".datagrid-row");
                var i = t.attr("datagrid-row-index");
                if (i > -1) a.push(n[i]);
            }
        });
        return a;
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
        load: function(e, i) {
            return e.each(function() {
                var e = $(this).datagrid("options");
                e.pageNumber = 1;
                var t = $(this).datagrid("getPager");
                t.pagination("refresh", {
                    pageNumber: 1
                });
                _577(this, i);
            });
        },
        reload: function(e, t) {
            return e.each(function() {
                _577(this, t);
            });
        },
        reload2: function(e, t) {
            return e.each(function() {
                _reload2(this, t);
            });
        },
        reloadFooter: function(e, i) {
            return e.each(function() {
                var e = $.data(this, "datagrid").options;
                var t = $.data(this, "datagrid").dc;
                if (i) {
                    $.data(this, "datagrid").footer = i;
                }
                if (e.showFooter) {
                    e.view.renderFooter.call(e.view, this, t.footer2, false);
                    e.view.renderFooter.call(e.view, this, t.footer1, true);
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
                if (e.refLinkButton && $(e.refLinkButton).length > 0) $(e.refLinkButton).linkbutton("operationStart");
            });
        },
        loaded: function(e) {
            return e.each(function() {
                var e = $.data(this, "datagrid").options;
                $(this).datagrid("getPager").pagination("loaded");
                var t = $(this).datagrid("getPanel");
                t.children("div.datagrid-mask-msg").remove();
                t.children("div.datagrid-mask").remove();
                if (e.refLinkButton && $(e.refLinkButton).length > 0) $(e.refLinkButton).linkbutton("operationCompleted");
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
                _fixRowHeight(this, t);
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
            var t = _getSelections(e[0]);
            return t.length > 0 ? t[0] : null;
        },
        getSelections: function(e) {
            return _getSelections(e[0]);
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
        selectRecord: function(e, i) {
            return e.each(function() {
                var e = $.data(this, "datagrid").options;
                if (e.idField) {
                    var t = _5b7(this, i);
                    if (t >= 0) {
                        $(this).datagrid("selectRow", t);
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
            return _validateRow(e[0], t);
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
        setColumnTitle: function(e, i) {
            return e.each(function() {
                var e = $.data($(this)[0], "datagrid").dc.header2;
                for (var t in i) {
                    e.find('.datagrid-header-row td[field="' + t + '"] .datagrid-cell span').first().html($.hisui.getTrans(i[t]));
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
        updateRow: function(s, l, e) {
            var d = $.data(s, "datagrid").options;
            var c = $(s).datagrid("getRows");
            $.extend(c[l], e);
            var t = d.rowStyler ? d.rowStyler.call(s, l, c[l]) : "";
            var f = "";
            var u = "";
            if (typeof t == "string") {
                u = t;
            } else {
                if (t) {
                    f = t["class"] || "";
                    u = t["style"] || "";
                }
            }
            var f = "datagrid-row " + (l % 2 && d.striped ? "datagrid-row-alt " : " ") + f;
            function i(e) {
                var t = $(s).datagrid("getColumnFields", e);
                var i = d.finder.getTr(s, l, "body", e ? 1 : 2);
                var a = i.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                if (d.showChangedStyle) {
                    var n = [];
                    i.children(".datagrid-value-changed").each(function() {
                        n.push($(this).attr("field"));
                    });
                }
                i.html(this.renderRow.call(this, s, t, e, l, c[l]));
                if (d.showChangedStyle) {
                    for (var r = 0; r < n.length; r++) {
                        i.children('td[field="' + n[r] + '"]').addClass("datagrid-value-changed");
                    }
                }
                var o = i.hasClass("datagrid-row-checked");
                i.attr("style", u).attr("class", i.hasClass("datagrid-row-selected") ? f + " datagrid-row-selected" : f);
                if (o) {
                    i.addClass("datagrid-row-checked");
                }
                if (a) {
                    i.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
                }
            }
            i.call(this, true);
            i.call(this, false);
            $(s).datagrid("fixRowHeight", l);
        },
        insertRow: function(o, s, e) {
            var l = $.data(o, "datagrid");
            var d = l.options;
            var c = l.dc;
            var f = l.data;
            if (s == undefined || s == null) {
                s = f.rows.length;
            }
            if (s > f.rows.length) {
                s = f.rows.length;
            }
            function t(e) {
                var t = e ? 1 : 2;
                for (var i = f.rows.length - 1; i >= s; i--) {
                    var a = d.finder.getTr(o, i, "body", t);
                    a.attr("datagrid-row-index", i + 1);
                    a.attr("id", l.rowIdPrefix + "-" + t + "-" + (i + 1));
                    if (e && d.rownumbers) {
                        var n = i + 2;
                        if (d.pagination) {
                            n += (d.pageNumber - 1) * d.pageSize;
                        }
                        a.find("div.datagrid-cell-rownumber").html(n);
                    }
                    if (d.striped) {
                        a.removeClass("datagrid-row-alt").addClass((i + 1) % 2 ? "datagrid-row-alt" : "");
                    }
                }
            }
            function i(e) {
                var t = e ? 1 : 2;
                var i = $(o).datagrid("getColumnFields", e);
                var a = l.rowIdPrefix + "-" + t + "-" + s;
                var n = '<tr id="' + a + '" class="datagrid-row" datagrid-row-index="' + s + '"></tr>';
                if (s >= f.rows.length) {
                    if (f.rows.length) {
                        d.finder.getTr(o, "", "last", t).after(n);
                    } else {
                        var r = e ? c.body1 : c.body2;
                        r.html('<table cellspacing="0" cellpadding="0" border="0"><tbody>' + n + "</tbody></table>");
                    }
                } else {
                    d.finder.getTr(o, s + 1, "body", t).before(n);
                }
            }
            t.call(this, true);
            t.call(this, false);
            i.call(this, true);
            i.call(this, false);
            f.total += 1;
            f.rows.splice(s, 0, e);
            this.refreshRow.call(this, o, s);
        },
        deleteRow: function(r, o) {
            var s = $.data(r, "datagrid");
            var l = s.options;
            var d = s.data;
            function e(e) {
                var t = e ? 1 : 2;
                for (var i = o + 1; i < d.rows.length; i++) {
                    var a = l.finder.getTr(r, i, "body", t);
                    a.attr("datagrid-row-index", i - 1);
                    a.attr("id", s.rowIdPrefix + "-" + t + "-" + (i - 1));
                    if (e && l.rownumbers) {
                        var n = i;
                        if (l.pagination) {
                            n += (l.pageNumber - 1) * l.pageSize;
                        }
                        a.find("div.datagrid-cell-rownumber").html(n);
                    }
                    if (l.striped) {
                        a.removeClass("datagrid-row-alt").addClass((i - 1) % 2 ? "datagrid-row-alt" : "");
                    }
                }
            }
            l.finder.getTr(r, o).remove();
            e.call(this, true);
            e.call(this, false);
            d.total -= 1;
            d.rows.splice(o, 1);
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
        striped: true,
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
        loader: function(e, i, t) {
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
                        if (e.code == "4001") {
                            $.messager.popover({
                                msg: e.msg,
                                type: "error"
                            });
                        }
                        var t = {
                            total: 0,
                            rows: []
                        };
                        if (e.data != null && "object" == typeof e.data) {
                            t = e.data;
                            if ($.isArray(e.data.records)) {
                                t.rows = e.data.records;
                            }
                        }
                        t.message = e.message || e.msg;
                        i(t);
                    } else {
                        i(e);
                    }
                },
                error: function() {
                    t.apply(this, arguments);
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
        clearSelectionsOnload: false,
        refLinkButton: null,
        filterToolbarType: "local"
    });
})(jQuery);

(function(g) {
    var r;
    function a(a) {
        var e = g.data(a, "propertygrid");
        var n = g.data(a, "propertygrid").options;
        g(a).datagrid(g.extend({}, n, {
            cls: "propertygrid",
            view: n.showGroup ? n.groupView : n.view,
            onClickRow: function(e, t) {
                if (r != this) {
                    o(r);
                    r = this;
                }
                if (n.editIndex != e && t.editor) {
                    var i = g(this).datagrid("getColumnOption", "value");
                    i.editor = t.editor;
                    o(r);
                    g(this).datagrid("beginEdit", e);
                    g(this).datagrid("getEditors", e)[0].target.focus();
                    n.editIndex = e;
                }
                n.onClickRow.call(a, e, t);
            },
            loadFilter: function(e) {
                o(this);
                return n.loadFilter.call(this, e);
            }
        }));
        g(document).unbind(".propertygrid").bind("mousedown.propertygrid", function(e) {
            var t = g(e.target).closest("div.datagrid-view,div.combo-panel");
            if (t.length) {
                return;
            }
            o(r);
            r = undefined;
        });
    }
    function o(e) {
        var t = g(e);
        if (!t.length) {
            return;
        }
        var i = g.data(e, "propertygrid").options;
        var a = i.editIndex;
        if (a == undefined) {
            return;
        }
        var n = t.datagrid("getEditors", a)[0];
        if (n) {
            n.target.blur();
            if (t.datagrid("validateRow", a)) {
                t.datagrid("endEdit", a);
            } else {
                t.datagrid("cancelEdit", a);
            }
        }
        i.editIndex = undefined;
    }
    g.fn.propertygrid = function(i, e) {
        if (typeof i == "string") {
            var t = g.fn.propertygrid.methods[i];
            if (t) {
                return t(this, e);
            } else {
                return this.datagrid(i, e);
            }
        }
        i = i || {};
        return this.each(function() {
            var e = g.data(this, "propertygrid");
            if (e) {
                g.extend(e.options, i);
            } else {
                var t = g.extend({}, g.fn.propertygrid.defaults, g.fn.propertygrid.parseOptions(this), i);
                t.frozenColumns = g.extend(true, [], t.frozenColumns);
                t.columns = g.extend(true, [], t.columns);
                g.data(this, "propertygrid", {
                    options: t
                });
            }
            a(this);
        });
    };
    g.fn.propertygrid.methods = {
        options: function(e) {
            return g.data(e[0], "propertygrid").options;
        }
    };
    g.fn.propertygrid.parseOptions = function(e) {
        return g.extend({}, g.fn.datagrid.parseOptions(e), g.parser.parseOptions(e, [ {
            showGroup: "boolean"
        } ]));
    };
    var e = g.extend({}, g.fn.datagrid.defaults.view, {
        render: function(e, t, i) {
            var a = [];
            var n = this.groups;
            for (var r = 0; r < n.length; r++) {
                a.push(this.renderGroup.call(this, e, r, n[r], i));
            }
            g(t).html(a.join(""));
        },
        renderGroup: function(e, t, i, a) {
            var n = g.data(e, "datagrid");
            var r = n.options;
            var o = g(e).datagrid("getColumnFields", a);
            var s = [];
            s.push('<div class="datagrid-group" group-index=' + t + ">");
            s.push('<table cellspacing="0" cellpadding="0" border="0" style="height:100%"><tbody>');
            s.push("<tr>");
            if (a && (r.rownumbers || r.frozenColumns.length) || !a && !(r.rownumbers || r.frozenColumns.length)) {
                s.push('<td style="border:0;text-align:center;width:25px"><span class="datagrid-row-expander datagrid-row-collapse" style="display:inline-block;width:16px;height:16px;cursor:pointer">&nbsp;</span></td>');
            }
            s.push('<td style="border:0;">');
            if (!a) {
                s.push('<span class="datagrid-group-title">');
                s.push(r.groupFormatter.call(e, i.value, i.rows));
                s.push("</span>");
            }
            s.push("</td>");
            s.push("</tr>");
            s.push("</tbody></table>");
            s.push("</div>");
            s.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
            var l = i.startIndex;
            for (var d = 0; d < i.rows.length; d++) {
                var c = r.rowStyler ? r.rowStyler.call(e, l, i.rows[d]) : "";
                var f = "";
                var u = "";
                if (typeof c == "string") {
                    u = c;
                } else {
                    if (c) {
                        f = c["class"] || "";
                        u = c["style"] || "";
                    }
                }
                var h = 'class="datagrid-row ' + (l % 2 && r.striped ? "datagrid-row-alt " : " ") + f + '"';
                var p = u ? 'style="' + u + '"' : "";
                var v = n.rowIdPrefix + "-" + (a ? 1 : 2) + "-" + l;
                s.push('<tr id="' + v + '" datagrid-row-index="' + l + '" ' + h + " " + p + ">");
                s.push(this.renderRow.call(this, e, o, a, l, i.rows[d]));
                s.push("</tr>");
                l++;
            }
            s.push("</tbody></table>");
            return s.join("");
        },
        bindEvents: function(n) {
            var e = g.data(n, "datagrid");
            var t = e.dc;
            var i = t.body1.add(t.body2);
            var r = (g.data(i[0], "events") || g._data(i[0], "events")).click[0].handler;
            i.unbind("click").bind("click", function(e) {
                var t = g(e.target);
                var i = t.closest("span.datagrid-row-expander");
                if (i.length) {
                    var a = i.closest("div.datagrid-group").attr("group-index");
                    if (i.hasClass("datagrid-row-collapse")) {
                        g(n).datagrid("collapseGroup", a);
                    } else {
                        g(n).datagrid("expandGroup", a);
                    }
                } else {
                    r(e);
                }
                e.stopPropagation();
            });
        },
        onBeforeRender: function(e, t) {
            var i = g.data(e, "datagrid");
            var a = i.options;
            u();
            var n = [];
            for (var r = 0; r < t.length; r++) {
                var o = t[r];
                var s = f(o[a.groupField]);
                if (!s) {
                    s = {
                        value: o[a.groupField],
                        rows: [ o ]
                    };
                    n.push(s);
                } else {
                    s.rows.push(o);
                }
            }
            var l = 0;
            var d = [];
            for (var r = 0; r < n.length; r++) {
                var s = n[r];
                s.startIndex = l;
                l += s.rows.length;
                d = d.concat(s.rows);
            }
            i.data.rows = d;
            this.groups = n;
            var c = this;
            setTimeout(function() {
                c.bindEvents(e);
            }, 0);
            function f(e) {
                for (var t = 0; t < n.length; t++) {
                    var i = n[t];
                    if (i.value == e) {
                        return i;
                    }
                }
                return null;
            }
            function u() {
                if (!g("#datagrid-group-style").length) {
                    g("head").append('<style id="datagrid-group-style">' + ".datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}" + "</style>");
                }
            }
        }
    });
    g.extend(g.fn.datagrid.methods, {
        expandGroup: function(e, a) {
            return e.each(function() {
                var e = g.data(this, "datagrid").dc.view;
                var t = e.find(a != undefined ? 'div.datagrid-group[group-index="' + a + '"]' : "div.datagrid-group");
                var i = t.find("span.datagrid-row-expander");
                if (i.hasClass("datagrid-row-expand")) {
                    i.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
                    t.next("table").show();
                }
                g(this).datagrid("fixRowHeight");
            });
        },
        collapseGroup: function(e, a) {
            return e.each(function() {
                var e = g.data(this, "datagrid").dc.view;
                var t = e.find(a != undefined ? 'div.datagrid-group[group-index="' + a + '"]' : "div.datagrid-group");
                var i = t.find("span.datagrid-row-expander");
                if (i.hasClass("datagrid-row-collapse")) {
                    i.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
                    t.next("table").hide();
                }
                g(this).datagrid("fixRowHeight");
            });
        }
    });
    g.fn.propertygrid.defaults = g.extend({}, g.fn.datagrid.defaults, {
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
        groupView: e,
        groupField: "group",
        groupFormatter: function(e, t) {
            return e;
        }
    });
})(jQuery);

(function(w) {
    function r(a) {
        var e = w.data(a, "treegrid");
        var n = e.options;
        w(a).datagrid(w.extend({}, n, {
            url: null,
            data: null,
            loader: function() {
                return false;
            },
            onBeforeLoad: function() {
                return false;
            },
            onLoadSuccess: function() {},
            onResizeColumn: function(e, t) {
                v(a);
                n.onResizeColumn.call(a, e, t);
            },
            onBeforeSortColumn: function(e, t) {
                if (n.onBeforeSortColumn.call(a, e, t) == false) {
                    return false;
                }
            },
            onSortColumn: function(e, t) {
                n.sortName = e;
                n.sortOrder = t;
                if (n.remoteSort) {
                    m(a);
                } else {
                    var i = w(a).treegrid("getData");
                    p(a, null, i);
                }
                n.onSortColumn.call(a, e, t);
            },
            onClickCell: function(e, t) {
                n.onClickCell.call(a, t, C(a, e));
            },
            onDblClickCell: function(e, t) {
                n.onDblClickCell.call(a, t, C(a, e));
            },
            onRowContextMenu: function(e, t) {
                n.onContextMenu.call(a, e, C(a, t));
            }
        }));
        var t = w.data(a, "datagrid").options;
        n.columns = t.columns;
        n.frozenColumns = t.frozenColumns;
        e.dc = w.data(a, "datagrid").dc;
        if (n.pagination) {
            var i = w(a).datagrid("getPager");
            i.pagination({
                pageNumber: n.pageNumber,
                pageSize: n.pageSize,
                pageList: n.pageList,
                onSelectPage: function(e, t) {
                    n.pageNumber = e;
                    n.pageSize = t;
                    m(a);
                }
            });
            n.pageSize = i.pagination("options").pageSize;
        }
    }
    function v(n, e) {
        var r = w.data(n, "datagrid").options;
        var t = w.data(n, "datagrid").dc;
        if (!t.body1.is(":empty") && (!r.nowrap || r.autoRowHeight)) {
            if (e != undefined) {
                var i = d(n, e);
                for (var a = 0; a < i.length; a++) {
                    o(i[a][r.idField]);
                }
            }
        }
        w(n).datagrid("fixRowHeight", e);
        function o(e) {
            var t = r.finder.getTr(n, e, "body", 1);
            var i = r.finder.getTr(n, e, "body", 2);
            t.css("height", "");
            i.css("height", "");
            var a = Math.max(t.height(), i.height());
            t.css("height", a);
            i.css("height", a);
        }
    }
    function g(e) {
        var t = w.data(e, "datagrid").dc;
        var i = w.data(e, "treegrid").options;
        if (!i.rownumbers) {
            return;
        }
        t.body1.find("div.datagrid-cell-rownumber").each(function(e) {
            w(this).html(e + 1);
        });
    }
    function e(a) {
        return function(e) {
            var t = w(e.target);
            var i = a ? "addClass" : "removeClass";
            if (t.hasClass("tree-hit")) {
                t.hasClass("tree-expanded") ? t[i]("tree-expanded-hover") : t[i]("tree-collapsed-hover");
            }
        };
    }
    function t(e) {
        var a = w(e.target);
        if (a.hasClass("tree-hit")) {
            t(Z);
        } else {
            if (a.hasClass("tree-checkbox")) {
                t(s);
            } else {}
        }
        function t(e) {
            var t = a.closest("tr.datagrid-row");
            var i = t.closest("div.datagrid-view").children(".datagrid-f")[0];
            e(i, t.attr("node-id"));
        }
    }
    function s(e, t, i, a) {
        var n = w.data(e, "treegrid");
        var r = n.checkedRows;
        var o = n.options;
        if (!o.checkbox) {
            return;
        }
        var s = C(e, t);
        if (!s.checkState) {
            return;
        }
        var l = o.finder.getTr(e, t);
        var d = l.find(".tree-checkbox");
        if (i == undefined) {
            if (d.hasClass("tree-checkbox1")) {
                i = false;
            } else {
                if (d.hasClass("tree-checkbox0")) {
                    i = true;
                } else {
                    if (s._checked == undefined) {
                        s._checked = d.hasClass("tree-checkbox1");
                    }
                    i = !s._checked;
                }
            }
        }
        s._checked = i;
        if (i) {
            if (d.hasClass("tree-checkbox1")) {
                return;
            }
        } else {
            if (d.hasClass("tree-checkbox0")) {
                return;
            }
        }
        if (!a) {
            if (o.onBeforeCheckNode.call(e, s, i) == false) {
                return;
            }
        }
        if (o.cascadeCheck) {
            f(e, s, i);
            u(e, s);
        } else {
            c(e, s, i ? "1" : "0");
        }
        if (!a) {
            o.onCheckNode.call(e, s, i);
        }
    }
    function c(e, t, i) {
        var a = w.data(e, "treegrid");
        var n = a.checkedRows;
        var r = a.options;
        if (!t.checkState || i == undefined) {
            return;
        }
        var o = r.finder.getTr(e, t[r.idField]);
        var s = o.find(".tree-checkbox");
        if (!s.length) {
            return;
        }
        t.checkState = [ "unchecked", "checked", "indeterminate" ][i];
        t.checked = t.checkState == "checked";
        s.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
        s.addClass("tree-checkbox" + i);
        if (i == 0) {
            w.hisui.removeArrayItem(n, r.idField, t[r.idField]);
        } else {
            w.hisui.addArrayItem(n, r.idField, t);
        }
    }
    function f(t, e, i) {
        var a = i ? 1 : 0;
        c(t, e, a);
        w.hisui.forEach(e.children || [], true, function(e) {
            c(t, e, a);
        });
    }
    function u(e, t) {
        var i = w.data(e, "treegrid").options;
        var a = x(e, t[i.idField]);
        if (a) {
            c(e, a, l(a));
            u(e, a);
        }
    }
    function l(e) {
        var t = 0;
        var i = 0;
        var a = 0;
        w.hisui.forEach(e.children || [], false, function(e) {
            if (e.checkState) {
                t++;
                if (e.checkState == "checked") {
                    a++;
                } else {
                    if (e.checkState == "unchecked") {
                        i++;
                    }
                }
            }
        });
        if (t == 0) {
            return undefined;
        }
        var n = 0;
        if (i == t) {
            n = 0;
        } else {
            if (a == t) {
                n = 1;
            } else {
                n = 2;
            }
        }
        return n;
    }
    function o(e, t) {
        var i = w.data(e, "treegrid").options;
        if (!i.checkbox) {
            return;
        }
        var a = C(e, t);
        var n = i.finder.getTr(e, t);
        var r = n.find(".tree-checkbox");
        if (i.view.hasCheckbox(e, a)) {
            if (!r.length) {
                a.checkState = a.checkState || "unchecked";
                w('<span class="tree-checkbox"></span>').insertBefore(n.find(".tree-title"));
            }
            if (a.checkState == "checked") {
                s(e, t, true, true);
            } else {
                if (a.checkState == "unchecked") {
                    s(e, t, false, true);
                } else {
                    var o = l(a);
                    if (o === 0) {
                        s(e, t, false, true);
                    } else {
                        if (o === 1) {
                            s(e, t, true, true);
                        }
                    }
                }
            }
        } else {
            r.remove();
            a.checkState = undefined;
            a.checked = undefined;
            u(e, a);
        }
    }
    function h(e, t) {
        var i = w.data(e, "treegrid").options;
        var a = i.finder.getTr(e, t, "body", 1);
        var n = i.finder.getTr(e, t, "body", 2);
        var r = w(e).datagrid("getColumnFields", true).length + (i.rownumbers ? 1 : 0);
        var o = w(e).datagrid("getColumnFields", false).length;
        s(a, r);
        s(n, o);
        function s(e, t) {
            w('<tr class="treegrid-tr-tree">' + '<td style="border:0px" colspan="' + t + '">' + "<div></div>" + "</td>" + "</tr>").insertAfter(e);
        }
    }
    function b(e, t) {
        var i = w.data(e, "treegrid");
        var a = i.options;
        var n = i.checkedRows;
        if (!w.isArray(n)) return;
        for (var r = 0; r < n.length; r++) {
            var o = n[r];
            var s = a.finder.getTr(e, o[a.idField], "body", 2);
            if (t.find(s).length > 0) {
                n.splice(r, 1);
                r--;
            }
        }
    }
    function p(e, t, i, a, n) {
        var r = w.data(e, "treegrid");
        var o = r.options;
        var s = r.dc;
        i = o.loadFilter.call(e, i, t);
        var l = C(e, t);
        if (l) {
            var d = o.finder.getTr(e, t, "body", 1);
            var c = o.finder.getTr(e, t, "body", 2);
            var f = d.next("tr.treegrid-tr-tree").children("td").children("div");
            var u = c.next("tr.treegrid-tr-tree").children("td").children("div");
            if (!a) {
                l.children = [];
            }
        } else {
            var f = s.body1;
            var u = s.body2;
            if (!a) {
                r.data = [];
            }
        }
        if (!a) {
            if (!l) {
                r.checkedRows = [];
            } else {
                b(e, u);
            }
            f.empty();
            u.empty();
        }
        if (o.view.onBeforeRender) {
            o.view.onBeforeRender.call(o.view, e, t, i);
        }
        o.view.render.call(o.view, e, f, true);
        o.view.render.call(o.view, e, u, false);
        if (o.showFooter) {
            o.view.renderFooter.call(o.view, e, s.footer1, true);
            o.view.renderFooter.call(o.view, e, s.footer2, false);
        }
        if (o.view.onAfterRender) {
            o.view.onAfterRender.call(o.view, e);
        }
        if (!t && o.pagination) {
            var h = w.data(e, "treegrid").total;
            var p = w(e).datagrid("getPager");
            if (p.pagination("options").total != h) {
                p.pagination({
                    total: h
                });
            }
        }
        v(e);
        g(e);
        w(e).treegrid("showLines");
        w(e).treegrid("setSelectionState");
        w(e).treegrid("autoSizeColumn");
        if (!n) {
            o.onLoadSuccess.call(e, l, i);
        }
    }
    function m(t, i, e, a, n) {
        var r = w.data(t, "treegrid").options;
        var o = w(t).datagrid("getPanel").find("div.datagrid-body");
        if (i == undefined && r.queryParams) {
            r.queryParams.id = undefined;
        }
        if (e) {
            r.queryParams = e;
        }
        var s = w.extend({}, r.queryParams);
        if (r.pagination) {
            w.extend(s, {
                page: r.pageNumber,
                rows: r.pageSize
            });
        }
        if (r.sortName) {
            w.extend(s, {
                sort: r.sortName,
                order: r.sortOrder
            });
        }
        var l = C(t, i);
        if (r.onBeforeLoad.call(t, l, s) == false) {
            return;
        }
        var d = o.find('tr[node-id="' + i + '"] span.tree-folder');
        d.addClass("tree-loading");
        w(t).treegrid("loading");
        var c = r.loader.call(t, s, function(e) {
            d.removeClass("tree-loading");
            w(t).treegrid("loaded");
            p(t, i, e, a);
            if (n) {
                n();
            }
        }, function() {
            d.removeClass("tree-loading");
            w(t).treegrid("loaded");
            r.onLoadError.apply(t, arguments);
            if (n) {
                n();
            }
        });
        if (c == false) {
            d.removeClass("tree-loading");
            w(t).treegrid("loaded");
        }
    }
    function i(e) {
        var t = a(e);
        return t.length ? t[0] : null;
    }
    function a(e) {
        return w.data(e, "treegrid").data;
    }
    function x(e, t) {
        var i = C(e, t);
        if (i._parentId) {
            return C(e, i._parentId);
        } else {
            return null;
        }
    }
    function d(e, t) {
        var i = w.data(e, "treegrid").data;
        if (t) {
            var a = C(e, t);
            i = a ? a.children || [] : [];
        }
        var n = [];
        w.hisui.forEach(i, true, function(e) {
            n.push(e);
        });
        return n;
    }
    function n(e, t) {
        var i = w.data(e, "treegrid").options;
        var a = i.finder.getTr(e, t);
        var n = a.children('td[field="' + i.treeField + '"]');
        return n.find("span.tree-indent,span.tree-hit").length;
    }
    function C(e, t) {
        var i = w.data(e, "treegrid");
        var a = i.options;
        var n = null;
        w.hisui.forEach(i.data, true, function(e) {
            if (e[a.idField] == t) {
                n = e;
                return false;
            }
        });
        return n;
    }
    function Y(e, t) {
        var i = w.data(e, "treegrid").options;
        var a = C(e, t);
        var n = i.finder.getTr(e, t);
        var r = n.find("span.tree-hit");
        if (r.length == 0) {
            return;
        }
        if (r.hasClass("tree-collapsed")) {
            return;
        }
        if (i.onBeforeCollapse.call(e, a) == false) {
            return;
        }
        r.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        r.next().removeClass("tree-folder-open");
        a.state = "closed";
        n = n.next("tr.treegrid-tr-tree");
        var o = n.children("td").children("div");
        if (i.animate) {
            o.slideUp("normal", function() {
                w(e).treegrid("autoSizeColumn");
                v(e, t);
                i.onCollapse.call(e, a);
            });
        } else {
            o.hide();
            w(e).treegrid("autoSizeColumn");
            v(e, t);
            i.onCollapse.call(e, a);
        }
    }
    function S(t, i) {
        var a = w.data(t, "treegrid").options;
        var e = a.finder.getTr(t, i);
        var n = e.find("span.tree-hit");
        var r = C(t, i);
        if (n.length == 0) {
            return;
        }
        if (n.hasClass("tree-expanded")) {
            return;
        }
        if (a.onBeforeExpand.call(t, r) == false) {
            return;
        }
        n.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        n.next().addClass("tree-folder-open");
        var o = e.next("tr.treegrid-tr-tree");
        if (o.length) {
            var s = o.children("td").children("div");
            d(s);
        } else {
            h(t, r[a.idField]);
            var o = e.next("tr.treegrid-tr-tree");
            var s = o.children("td").children("div");
            s.hide();
            var l = w.extend({}, a.queryParams || {});
            l.id = r[a.idField];
            m(t, r[a.idField], l, true, function() {
                if (s.is(":empty")) {
                    o.remove();
                } else {
                    d(s);
                }
            });
        }
        function d(e) {
            r.state = "open";
            if (a.animate) {
                e.slideDown("normal", function() {
                    w(t).treegrid("autoSizeColumn");
                    v(t, i);
                    a.onExpand.call(t, r);
                });
            } else {
                e.show();
                w(t).treegrid("autoSizeColumn");
                v(t, i);
                a.onExpand.call(t, r);
            }
        }
    }
    function Z(e, t) {
        var i = w.data(e, "treegrid").options;
        var a = i.finder.getTr(e, t);
        var n = a.find("span.tree-hit");
        if (n.hasClass("tree-expanded")) {
            Y(e, t);
        } else {
            S(e, t);
        }
    }
    function T(e, t) {
        var i = w.data(e, "treegrid").options;
        var a = d(e, t);
        if (t) {
            a.unshift(C(e, t));
        }
        for (var n = 0; n < a.length; n++) {
            Y(e, a[n][i.idField]);
        }
    }
    function y(e, t) {
        var i = w.data(e, "treegrid").options;
        var a = d(e, t);
        if (t) {
            a.unshift(C(e, t));
        }
        for (var n = 0; n < a.length; n++) {
            S(e, a[n][i.idField]);
        }
    }
    function L(e, t) {
        var i = w.data(e, "treegrid").options;
        var a = [];
        var n = x(e, t);
        while (n) {
            var r = n[i.idField];
            a.unshift(r);
            n = x(e, r);
        }
        for (var o = 0; o < a.length; o++) {
            S(e, a[o]);
        }
    }
    function X(e, t) {
        var i = w.data(e, "treegrid");
        var a = i.options;
        if (t.parent) {
            var n = a.finder.getTr(e, t.parent);
            if (n.next("tr.treegrid-tr-tree").length == 0) {
                h(e, t.parent);
            }
            var r = n.children('td[field="' + a.treeField + '"]').children("div.datagrid-cell");
            var o = r.children("span.tree-icon");
            if (o.hasClass("tree-file")) {
                o.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                var s = w('<span class="tree-hit tree-expanded"></span>').insertBefore(o);
                if (s.prev().length) {
                    s.prev().remove();
                }
            }
        }
        p(e, t.parent, t.data, i.data.length > 0, true);
    }
    function H(o, s) {
        var l = s.before || s.after;
        var d = w.data(o, "treegrid").options;
        var e = x(o, l);
        X(o, {
            parent: e ? e[d.idField] : null,
            data: [ s.data ]
        });
        var t = e ? e.children : w(o).treegrid("getRoots");
        for (var i = 0; i < t.length; i++) {
            if (t[i][d.idField] == l) {
                var a = t[t.length - 1];
                t.splice(s.before ? i : i + 1, 0, a);
                t.splice(t.length - 1, 1);
                break;
            }
        }
        n(true);
        n(false);
        g(o);
        w(o).treegrid("showLines");
        function n(e) {
            var t = e ? 1 : 2;
            var i = d.finder.getTr(o, s.data[d.idField], "body", t);
            var a = i.closest("table.datagrid-btable");
            i = i.parent().children();
            var n = d.finder.getTr(o, l, "body", t);
            if (s.before) {
                i.insertBefore(n);
            } else {
                var r = n.next("tr.treegrid-tr-tree");
                i.insertAfter(r.length ? r : n);
            }
            a.remove();
        }
    }
    function J(e, t) {
        var i = w.data(e, "treegrid");
        var a = i.options;
        var n = x(e, t);
        w(e).datagrid("deleteRow", t);
        w.hisui.removeArrayItem(i.checkedRows, a.idField, t);
        g(e);
        if (n) {
            o(e, n[a.idField]);
        }
        i.total -= 1;
        w(e).datagrid("getPager").pagination("refresh", {
            total: i.total
        });
        w(e).treegrid("showLines");
    }
    function D(o) {
        var s = w(o);
        var l = s.treegrid("options");
        if (l.lines) {
            s.treegrid("getPanel").addClass("tree-lines");
        } else {
            s.treegrid("getPanel").removeClass("tree-lines");
            return;
        }
        s.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
        s.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
        var e = s.treegrid("getRoots");
        if (e.length > 1) {
            a(e[0]).addClass("tree-root-first");
        } else {
            if (e.length == 1) {
                a(e[0]).addClass("tree-root-one");
            }
        }
        i(e);
        d(e);
        function i(e) {
            w.map(e, function(e) {
                if (e.children && e.children.length) {
                    i(e.children);
                } else {
                    var t = a(e);
                    t.find(".tree-icon").prev().addClass("tree-join");
                }
            });
            if (e.length) {
                var t = a(e[e.length - 1]);
                t.addClass("tree-node-last");
                t.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
            }
        }
        function d(e) {
            w.map(e, function(e) {
                if (e.children && e.children.length) {
                    d(e.children);
                }
            });
            for (var t = 0; t < e.length - 1; t++) {
                var i = e[t];
                var a = s.treegrid("getLevel", i[l.idField]);
                var n = l.finder.getTr(o, i[l.idField]);
                var r = n.next().find('tr.datagrid-row td[field="' + l.treeField + '"] div.datagrid-cell');
                r.find("span:eq(" + (a - 1) + ")").addClass("tree-line");
            }
        }
        function a(e) {
            var t = l.finder.getTr(o, e[l.idField]);
            var i = t.find('td[field="' + l.treeField + '"] div.datagrid-cell');
            return i;
        }
    }
    w.fn.treegrid = function(n, e) {
        if (typeof n == "string") {
            var t = w.fn.treegrid.methods[n];
            if (t) {
                return t(this, e);
            } else {
                return this.datagrid(n, e);
            }
        }
        n = n || {};
        return this.each(function() {
            var e = w.data(this, "treegrid");
            if (e) {
                w.extend(e.options, n);
            } else {
                e = w.data(this, "treegrid", {
                    options: w.extend({}, w.fn.treegrid.defaults, w.fn.treegrid.parseOptions(this), n),
                    data: [],
                    checkedRows: [],
                    tmpIds: []
                });
            }
            r(this);
            var t = w(e.dc.body1);
            var i = w(e.dc.body2);
            for (var a in e.options.rowEvents) {
                i.bind(a, e.options.rowEvents[a]);
            }
            for (var a in e.options.rowEvents) {
                t.bind(a, e.options.rowEvents[a]);
            }
            if (e.options.data) {
                w(this).treegrid("loadData", e.options.data);
            }
            m(this);
        });
    };
    w.fn.treegrid.methods = {
        options: function(e) {
            return w.data(e[0], "treegrid").options;
        },
        resize: function(e, t) {
            return e.each(function() {
                w(this).datagrid("resize", t);
            });
        },
        fixRowHeight: function(e, t) {
            return e.each(function() {
                v(this, t);
            });
        },
        loadData: function(e, t) {
            return e.each(function() {
                p(this, t.parent, t);
            });
        },
        load: function(e, t) {
            return e.each(function() {
                w(this).treegrid("options").pageNumber = 1;
                w(this).treegrid("getPager").pagination({
                    pageNumber: 1
                });
                w(this).treegrid("reload", t);
            });
        },
        reload: function(e, n) {
            return e.each(function() {
                var e = w(this).treegrid("options");
                var t = {};
                if (typeof n == "object") {
                    t = n;
                } else {
                    t = w.extend({}, e.queryParams);
                    t.id = n;
                }
                if (t.id) {
                    var i = w(this).treegrid("find", t.id);
                    if (i.children) {
                        i.children.splice(0, i.children.length);
                    }
                    e.queryParams = t;
                    var a = e.finder.getTr(this, t.id);
                    b(this, a.next("tr.treegrid-tr-tree"));
                    a.next("tr.treegrid-tr-tree").remove();
                    a.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    S(this, t.id);
                } else {
                    m(this, null, t);
                }
            });
        },
        reloadFooter: function(e, i) {
            return e.each(function() {
                var e = w.data(this, "treegrid").options;
                var t = w.data(this, "datagrid").dc;
                if (i) {
                    w.data(this, "treegrid").footer = i;
                }
                if (e.showFooter) {
                    e.view.renderFooter.call(e.view, this, t.footer1, true);
                    e.view.renderFooter.call(e.view, this, t.footer2, false);
                    if (e.view.onAfterRender) {
                        e.view.onAfterRender.call(e.view, this);
                    }
                    w(this).treegrid("fixRowHeight");
                }
            });
        },
        getData: function(e) {
            return w.data(e[0], "treegrid").data;
        },
        getFooterRows: function(e) {
            return w.data(e[0], "treegrid").footer;
        },
        getRoot: function(e) {
            return i(e[0]);
        },
        getRoots: function(e) {
            return a(e[0]);
        },
        getParent: function(e, t) {
            return x(e[0], t);
        },
        getChildren: function(e, t) {
            return d(e[0], t);
        },
        getLevel: function(e, t) {
            return n(e[0], t);
        },
        find: function(e, t) {
            return C(e[0], t);
        },
        isLeaf: function(e, t) {
            var i = w.data(e[0], "treegrid").options;
            var a = i.finder.getTr(e[0], t);
            var n = a.find("span.tree-hit");
            return n.length == 0;
        },
        select: function(e, t) {
            return e.each(function() {
                w(this).datagrid("selectRow", t);
            });
        },
        unselect: function(e, t) {
            return e.each(function() {
                w(this).datagrid("unselectRow", t);
            });
        },
        collapse: function(e, t) {
            return e.each(function() {
                Y(this, t);
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
                y(this, t);
            });
        },
        expandTo: function(e, t) {
            return e.each(function() {
                L(this, t);
            });
        },
        append: function(e, t) {
            return e.each(function() {
                X(this, t);
            });
        },
        insert: function(e, t) {
            return e.each(function() {
                H(this, t);
            });
        },
        remove: function(e, t) {
            return e.each(function() {
                J(this, t);
            });
        },
        pop: function(e, t) {
            var i = e.treegrid("find", t);
            e.treegrid("remove", t);
            return i;
        },
        refresh: function(e, t) {
            return e.each(function() {
                var e = w.data(this, "treegrid").options;
                e.view.refreshRow.call(e.view, this, t);
            });
        },
        update: function(e, i) {
            return e.each(function() {
                var e = w.data(this, "treegrid").options;
                var t = i.row;
                e.view.updateRow.call(e.view, this, i.id, t);
                if (t.checked != undefined) {
                    t = C(this, i.id);
                    w.extend(t, {
                        checkState: t.checked ? "checked" : t.checked === false ? "unchecked" : undefined
                    });
                    o(this, i.id);
                }
            });
        },
        beginEdit: function(e, t) {
            return e.each(function() {
                w(this).datagrid("beginEdit", t);
                w(this).treegrid("fixRowHeight", t);
            });
        },
        endEdit: function(e, t) {
            return e.each(function() {
                w(this).datagrid("endEdit", t);
            });
        },
        cancelEdit: function(e, t) {
            return e.each(function() {
                w(this).datagrid("cancelEdit", t);
            });
        },
        showLines: function(e) {
            return e.each(function() {
                D(this);
            });
        },
        setSelectionState: function(e) {
            return e.each(function() {
                w(this).datagrid("setSelectionState");
                var e = w(this).data("treegrid");
                for (var t = 0; t < e.tmpIds.length; t++) {
                    s(this, e.tmpIds[t], true, true);
                }
                e.tmpIds = [];
            });
        },
        getCheckedNodes: function(e, t) {
            t = t || "checked";
            var i = [];
            w.hisui.forEach(e.data("treegrid").checkedRows, false, function(e) {
                if (e.checkState == t) {
                    i.push(e);
                }
            });
            return i;
        },
        checkNode: function(e, t) {
            return e.each(function() {
                s(this, t, true);
            });
        },
        uncheckNode: function(e, t) {
            return e.each(function() {
                s(this, t, false);
            });
        },
        clearChecked: function(e) {
            return e.each(function() {
                var t = this;
                var i = w(t).treegrid("options");
                w(t).datagrid("clearChecked");
                w.map(w(t).treegrid("getCheckedNodes"), function(e) {
                    s(t, e[i.idField], false, true);
                });
            });
        }
    };
    w.fn.treegrid.parseOptions = function(e) {
        return w.extend({}, w.fn.datagrid.parseOptions(e), w.parser.parseOptions(e, [ "treeField", {
            checkbox: "boolean",
            cascadeCheck: "boolean",
            onlyLeafCheck: "boolean"
        }, {
            animate: "boolean"
        } ]));
    };
    var $ = w.extend({}, w.fn.datagrid.defaults.view, {
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
        render: function(v, e, t) {
            var g = w.data(v, "treegrid").options;
            var b = w(v).datagrid("getColumnFields", t);
            var m = w.data(v, "datagrid").rowIdPrefix;
            if (t) {
                if (!(g.rownumbers || g.frozenColumns && g.frozenColumns.length)) {
                    return;
                }
            }
            var x = this;
            if (this.treeNodes && this.treeNodes.length) {
                var i = C.call(this, t, this.treeLevel, this.treeNodes);
                w(e).append(i.join(""));
            }
            function C(e, t, i) {
                var a = w(v).treegrid("getParent", i[0][g.idField]);
                var n = (a ? a.children.length : w(v).treegrid("getRoots").length) - i.length;
                var r = [ '<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>' ];
                for (var o = 0; o < i.length; o++) {
                    var s = i[o];
                    if (s.state != "open" && s.state != "closed") {
                        s.state = "open";
                    }
                    var l = g.rowStyler ? g.rowStyler.call(v, s) : "";
                    var d = this.getStyleValue(l);
                    var c = 'class="datagrid-row ' + (n++ % 2 && g.striped ? "datagrid-row-alt " : " ") + d.c + '"';
                    var f = d.s ? 'style="' + d.s + '"' : "";
                    var u = m + "-" + (e ? 1 : 2) + "-" + s[g.idField];
                    r.push('<tr id="' + u + '" node-id="' + s[g.idField] + '" ' + c + " " + f + ">");
                    r = r.concat(x.renderRow.call(x, v, b, e, t, s));
                    r.push("</tr>");
                    if (s.children && s.children.length) {
                        var h = C.call(this, e, t + 1, s.children);
                        var p = s.state == "closed" ? "none" : "block";
                        r.push('<tr class="treegrid-tr-tree"><td style="border:0px" colspan=' + (b.length + (g.rownumbers ? 1 : 0)) + '><div style="display:' + p + '">');
                        r = r.concat(h);
                        r.push("</div></td></tr>");
                    }
                }
                r.push("</tbody></table>");
                return r;
            }
        },
        renderFooter: function(e, t, i) {
            var a = w.data(e, "treegrid").options;
            var n = w.data(e, "treegrid").footer || [];
            var r = w(e).datagrid("getColumnFields", i);
            var o = [ '<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>' ];
            for (var s = 0; s < n.length; s++) {
                var l = n[s];
                l[a.idField] = l[a.idField] || "foot-row-id" + s;
                o.push('<tr class="datagrid-row" node-id="' + l[a.idField] + '">');
                o.push(this.renderRow.call(this, e, r, i, 0, l));
                o.push("</tr>");
            }
            o.push("</tbody></table>");
            w(t).html(o.join(""));
        },
        renderRow: function(e, t, i, a, n) {
            var r = w.data(e, "treegrid");
            var o = r.options;
            var s = [];
            if (i && o.rownumbers) {
                s.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">0</div></td>');
            }
            for (var l = 0; l < t.length; l++) {
                var d = t[l];
                var c = w(e).datagrid("getColumnOption", d);
                if (c) {
                    var f = c.styler ? c.styler(n[d], n) || "" : "";
                    var u = this.getStyleValue(f);
                    var h = u.c ? 'class="' + u.c + '"' : "";
                    var p = c.hidden ? 'style="display:none;' + u.s + '"' : u.s ? 'style="' + u.s + '"' : "";
                    s.push('<td field="' + d + '" ' + h + " " + p + ">");
                    var p = "";
                    if (!c.checkbox) {
                        if (c.align) {
                            p += "text-align:" + c.align + ";";
                        }
                        if (!o.nowrap) {
                            p += "white-space:normal;height:auto;";
                        } else {
                            if (o.autoRowHeight) {
                                p += "height:auto;";
                            }
                        }
                    }
                    s.push('<div style="' + p + '" ');
                    if (c.checkbox) {
                        s.push('class="datagrid-cell-check ');
                    } else {
                        s.push('class="datagrid-cell ' + c.cellClass);
                    }
                    s.push('">');
                    if (c.checkbox) {
                        if (n.checked) {
                            s.push('<input type="checkbox" checked="checked"');
                        } else {
                            s.push('<input type="checkbox"');
                        }
                        s.push(' name="' + d + '" value="' + (n[d] != undefined ? n[d] : "") + '">');
                    } else {
                        var v = null;
                        if (c.formatter) {
                            v = c.formatter(n[d], n);
                        } else {
                            v = n[d];
                        }
                        if (d == o.treeField) {
                            for (var g = 0; g < a; g++) {
                                s.push('<span class="tree-indent"></span>');
                            }
                            if (n.state == "closed") {
                                s.push('<span class="tree-hit tree-collapsed"></span>');
                                s.push('<span class="tree-icon tree-folder ' + (n.iconCls ? n.iconCls : "") + '"></span>');
                            } else {
                                if (n.children && n.children.length) {
                                    s.push('<span class="tree-hit tree-expanded"></span>');
                                    s.push('<span class="tree-icon tree-folder tree-folder-open ' + (n.iconCls ? n.iconCls : "") + '"></span>');
                                } else {
                                    s.push('<span class="tree-indent"></span>');
                                    s.push('<span class="tree-icon tree-file ' + (n.iconCls ? n.iconCls : "") + '"></span>');
                                }
                            }
                            if (this.hasCheckbox(e, n)) {
                                var b = 0;
                                var m = w.hisui.getArrayItem(r.checkedRows, o.idField, n[o.idField]);
                                if (m) {
                                    b = m.checkState == "checked" ? 1 : 2;
                                    n.checkState = m.checkState;
                                } else {
                                    var x = w.hisui.getArrayItem(r.checkedRows, o.idField, n._parentId);
                                    if (x && x.checkState == "checked" && o.cascadeCheck) {
                                        b = 1;
                                        n.checked = true;
                                        w.hisui.addArrayItem(r.checkedRows, o.idField, n);
                                    } else {
                                        if (n.checked) {
                                            w.hisui.addArrayItem(r.tmpIds, n[o.idField]);
                                        }
                                    }
                                    n.checkState = b ? "checked" : "unchecked";
                                }
                                s.push('<span class="tree-checkbox tree-checkbox' + b + '"></span>');
                            } else {
                                n.checkState = undefined;
                                n.checked = undefined;
                            }
                            s.push('<span class="tree-title">' + v + "</span>");
                        } else {
                            s.push(v);
                        }
                    }
                    s.push("</div>");
                    s.push("</td>");
                }
            }
            return s.join("");
        },
        hasCheckbox: function(e, t) {
            var i = w.data(e, "treegrid").options;
            if (i.checkbox) {
                if (w.isFunction(i.checkbox)) {
                    if (i.checkbox.call(e, t)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (i.onlyLeafCheck) {
                        if (t.state == "open" && !(t.children && t.children.length)) {
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
        updateRow: function(r, o, e) {
            var s = w.data(r, "treegrid").options;
            var l = w(r).treegrid("find", o);
            w.extend(l, e);
            var d = w(r).treegrid("getLevel", o) - 1;
            var c = s.rowStyler ? s.rowStyler.call(r, l) : "";
            var f = w.data(r, "datagrid").rowIdPrefix;
            var u = l[s.idField];
            function t(e) {
                var t = w(r).treegrid("getColumnFields", e);
                var i = s.finder.getTr(r, o, "body", e ? 1 : 2);
                var a = i.find("div.datagrid-cell-rownumber").html();
                var n = i.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                i.html(this.renderRow(r, t, e, d, l));
                i.attr("style", c || "");
                i.find("div.datagrid-cell-rownumber").html(a);
                if (n) {
                    i.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
                }
                if (u != o) {
                    i.attr("id", f + "-" + (e ? 1 : 2) + "-" + u);
                    i.attr("node-id", u);
                }
            }
            t.call(this, true);
            t.call(this, false);
            w(r).treegrid("fixRowHeight", o);
        },
        deleteRow: function(n, e) {
            var r = w.data(n, "treegrid").options;
            var t = r.finder.getTr(n, e);
            t.next("tr.treegrid-tr-tree").remove();
            t.remove();
            var i = o(e);
            if (i) {
                if (i.children.length == 0) {
                    t = r.finder.getTr(n, i[r.idField]);
                    t.next("tr.treegrid-tr-tree").remove();
                    var a = t.children('td[field="' + r.treeField + '"]').children("div.datagrid-cell");
                    a.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                    a.find(".tree-hit").remove();
                    w('<span class="tree-indent"></span>').prependTo(a);
                }
            }
            function o(e) {
                var t;
                var i = w(n).treegrid("getParent", e);
                if (i) {
                    t = i.children;
                } else {
                    t = w(n).treegrid("getData");
                }
                for (var a = 0; a < t.length; a++) {
                    if (t[a][r.idField] == e) {
                        t.splice(a, 1);
                        break;
                    }
                }
                return i;
            }
        },
        onBeforeRender: function(e, t, i) {
            if (w.isArray(t)) {
                i = {
                    total: t.length,
                    rows: t
                };
                t = null;
            }
            if (!i) {
                return false;
            }
            var a = w.data(e, "treegrid");
            var n = a.options;
            if (i.length == undefined) {
                if (i.footer) {
                    a.footer = i.footer;
                }
                if (i.total != a.total) {
                    a.total = i.total;
                }
                i = this.transfer(e, t, i.rows);
            } else {
                function r(e, t) {
                    for (var i = 0; i < e.length; i++) {
                        var a = e[i];
                        a._parentId = t;
                        if (a.children && a.children.length) {
                            r(a.children, a[n.idField]);
                        }
                    }
                }
                r(i, t);
            }
            var o = C(e, t);
            if (o) {
                if (o.children) {
                    o.children = o.children.concat(i);
                } else {
                    o.children = i;
                }
            } else {
                a.data = a.data.concat(i);
            }
            this.sort(e, i);
            this.treeNodes = i;
            this.treeLevel = w(e).treegrid("getLevel", t);
        },
        sort: function(l, e) {
            var t = w.data(l, "treegrid").options;
            if (!t.remoteSort && t.sortName) {
                var d = t.sortName.split(",");
                var c = t.sortOrder.split(",");
                a(e);
            }
            function a(e) {
                e.sort(function(e, t) {
                    var i = 0;
                    for (var a = 0; a < d.length; a++) {
                        var n = d[a];
                        var r = c[a];
                        var o = w(l).treegrid("getColumnOption", n);
                        var s = o.sorter || function(e, t) {
                            return e == t ? 0 : e > t ? 1 : -1;
                        };
                        i = s(e[n], t[n]) * (r == "asc" ? 1 : -1);
                        if (i != 0) {
                            return i;
                        }
                    }
                    return i;
                });
                for (var t = 0; t < e.length; t++) {
                    var i = e[t].children;
                    if (i && i.length) {
                        a(i);
                    }
                }
            }
        },
        transfer: function(e, t, i) {
            var a = w.data(e, "treegrid").options;
            var n = w.extend([], i);
            var r = d(t, n);
            var o = w.extend([], r);
            while (o.length) {
                var s = o.shift();
                var l = d(s[a.idField], n);
                if (l.length) {
                    if (s.children) {
                        s.children = s.children.concat(l);
                    } else {
                        s.children = l;
                    }
                    o = o.concat(l);
                }
            }
            return r;
            function d(e, t) {
                var i = [];
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    if (n._parentId == e || c(n._parentId, e)) {
                        i.push(n);
                        t.splice(a, 1);
                        a--;
                    }
                }
                return i;
            }
            function c(e, t) {
                return (typeof e == "undefined" || e == null || e == "") && (typeof t == "undefined" || t == null);
            }
        }
    });
    w.fn.treegrid.defaults = w.extend({}, w.fn.datagrid.defaults, {
        treeField: null,
        checkbox: false,
        cascadeCheck: true,
        onlyLeafCheck: false,
        lines: false,
        animate: false,
        singleSelect: true,
        view: $,
        rowEvents: w.extend({}, w.fn.datagrid.defaults.rowEvents, {
            mouseover: e(true),
            mouseout: e(false),
            click: t
        }),
        loader: function(e, i, t) {
            var a = w(this).treegrid("options");
            if (!a.url) {
                return false;
            }
            w.ajax({
                type: a.method,
                url: a.url,
                data: e,
                dataType: "json",
                success: function(e) {
                    if ("undefined" !== typeof e.code) {
                        var t = e.data || {
                            total: 0,
                            rows: []
                        };
                        e.message = e.message || e.msg;
                        if ("undefined" == typeof t.rows && t.records) {
                            t.rows = t.records;
                        }
                        if (e.code != 200) w.messager.alert(e.code, e.message, "error");
                        i(t);
                    } else {
                        i(e);
                    }
                },
                error: function() {
                    t.apply(this, arguments);
                }
            });
        },
        loadFilter: function(e, t) {
            return e;
        },
        finder: {
            getTr: function(e, t, i, a) {
                i = i || "body";
                a = a || 0;
                var n = w.data(e, "datagrid").dc;
                if (a == 0) {
                    var r = w.data(e, "treegrid").options;
                    var o = r.finder.getTr(e, t, i, 1);
                    var s = r.finder.getTr(e, t, i, 2);
                    return o.add(s);
                } else {
                    if (i == "body") {
                        var l = w("#" + w.data(e, "datagrid").rowIdPrefix + "-" + a + "-" + t);
                        if (!l.length) {
                            l = (a == 1 ? n.body1 : n.body2).find('tr[node-id="' + t + '"]');
                        }
                        return l;
                    } else {
                        if (i == "footer") {
                            return (a == 1 ? n.footer1 : n.footer2).find('tr[node-id="' + t + '"]');
                        } else {
                            if (i == "selected") {
                                return (a == 1 ? n.body1 : n.body2).find("tr.datagrid-row-selected");
                            } else {
                                if (i == "highlight") {
                                    return (a == 1 ? n.body1 : n.body2).find("tr.datagrid-row-over");
                                } else {
                                    if (i == "checked") {
                                        return (a == 1 ? n.body1 : n.body2).find("tr.datagrid-row-checked");
                                    } else {
                                        if (i == "last") {
                                            return (a == 1 ? n.body1 : n.body2).find("tr:last[node-id]");
                                        } else {
                                            if (i == "allbody") {
                                                return (a == 1 ? n.body1 : n.body2).find("tr[node-id]");
                                            } else {
                                                if (i == "allfooter") {
                                                    return (a == 1 ? n.footer1 : n.footer2).find("tr[node-id]");
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
                var i = typeof t == "object" ? t.attr("node-id") : t;
                return w(e).treegrid("find", i);
            },
            getRows: function(e) {
                return w(e).treegrid("getChildren");
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

(function(f) {
    function a(e, t) {
        var i = f.data(e, "combo");
        var a = i.options;
        var n = i.combo;
        var r = i.panel;
        if (t) {
            a.width = t;
        }
        if (isNaN(a.width)) {
            var o = f(e).clone();
            o.css("visibility", "hidden");
            o.appendTo("body");
            a.width = o.outerWidth();
            o.remove();
        }
        n.appendTo("body");
        var s = n.find("input.combo-text");
        var l = n.find(".combo-arrow");
        var d = a.hasDownArrow ? l._outerWidth() : 0;
        n._outerWidth(a.width)._outerHeight(a.height);
        s._outerWidth(n.width() - d);
        s.css({
            height: n.height() + "px",
            lineHeight: n.height() + "px"
        });
        l._outerHeight(n.height());
        n.insertAfter(e);
    }
    function n(t) {
        f(t).addClass("combo-f").hide();
        var i = f('<span class="combo">' + '<input type="text" class="combo-text" autocomplete="off">' + '<span><span class="combo-arrow"></span></span>' + '<input type="hidden" class="combo-value">' + "</span>").insertAfter(t);
        var e = f('<div class="combo-panel"></div>').appendTo("body");
        e.panel({
            doSize: false,
            closed: true,
            cls: "combo-p",
            style: {
                position: "absolute",
                zIndex: 10
            },
            onOpen: function() {
                var e = f(this).panel("panel");
                if (f.fn.menu) {
                    e.css("z-index", f.fn.menu.defaults.zIndex++);
                } else {
                    if (f.fn.window) {
                        e.css("z-index", f.fn.window.defaults.zIndex++);
                    }
                }
                i.addClass("combo-p-active");
                f(this).panel("resize");
            },
            onBeforeClose: function() {
                d(this);
            },
            onClose: function() {
                var e = f.data(t, "combo");
                if (e) {
                    i.removeClass("combo-p-active");
                    e.options.onHidePanel.call(t);
                }
            }
        });
        var a = f(t).attr("name");
        if (a) {
            i.find("input.combo-value").attr("name", a);
            f(t).removeAttr("name").attr("comboName", a);
        }
        return {
            combo: i,
            panel: e
        };
    }
    function r(e) {
        var t = f.data(e, "combo");
        var i = t.options;
        var a = t.combo;
        if (i.hasDownArrow) {
            a.find(".combo-arrow").show();
        } else {
            a.find(".combo-arrow").hide();
        }
        l(e, i.disabled);
        u(e, i.readonly);
    }
    function t(e) {
        var t = f.data(e, "combo");
        var i = t.combo.find("input.combo-text");
        i.validatebox("destroy");
        t.panel.panel("destroy");
        t.combo.remove();
        f(e).remove();
    }
    function d(e) {
        f(e).find(".combo-f").each(function() {
            var e = f(this).combo("panel");
            if (e.is(":visible")) {
                e.panel("close");
            }
        });
    }
    function o(i) {
        var a = f.data(i, "combo");
        var n = a.options;
        var r = a.panel;
        var e = a.combo;
        var o = e.find(".combo-text");
        var s = e.find(".combo-arrow");
        f(document).unbind(".combo").bind("mousedown.combo", function(e) {
            var t = f(e.target).closest("span.combo,div.combo-p");
            if (t.length) {
                d(t);
                return;
            }
            if (f("body>div.combo-p>div.combo-panel:visible").length > 0) {
                if (e.target.type && e.target.type.toLowerCase() == "text") f(e.target).focus();
                f("body>div.combo-p>div.combo-panel:visible").panel("close");
            }
        });
        o.unbind(".combo");
        s.unbind(".combo");
        if (!n.disabled && !n.readonly) {
            o.bind("click.combo", function(e) {
                if (!n.editable) {
                    l.call(this);
                } else {
                    var t = f(this).closest("div.combo-panel");
                    f("div.combo-panel:visible").not(r).not(t).panel("close");
                }
            }).bind("keydown.combo paste.combo drop.combo input.combo compositionend.combo", function(t) {
                if (navigator.userAgent.indexOf("MWBrowser/2") == -1 && "undefined" == typeof t.keyCode) {
                    return;
                }
                switch (t.keyCode) {
                  case 38:
                    n.keyHandler.up.call(i, t);
                    break;

                  case 40:
                    if (r.panel("options").closed) s.trigger("click.combo");
                    n.keyHandler.down.call(i, t);
                    break;

                  case 37:
                    n.keyHandler.left.call(i, t);
                    break;

                  case 39:
                    n.keyHandler.right.call(i, t);
                    break;

                  case 13:
                    n.keyHandler.enter.call(i, t);
                    break;

                  case 9:
                  case 27:
                    c(i);
                    break;

                  default:
                    if (n.editable) {
                        if (a.timer) {
                            clearTimeout(a.timer);
                        }
                        a.timer = setTimeout(function() {
                            var e = o.val();
                            if (a.previousValue != e) {
                                a.previousValue = e;
                                f(i).combo("showPanel");
                                n.keyHandler.query.call(i, o.val(), t);
                                f(i).combo("validate");
                                n.queryOnFirstArrowDown = false;
                            }
                        }, n.delay);
                    }
                }
            });
            s.bind("click.combo", function() {
                l.call(this);
            }).bind("mouseenter.combo", function() {
                f(this).addClass("combo-arrow-hover");
            }).bind("mouseleave.combo", function() {
                f(this).removeClass("combo-arrow-hover");
            });
        }
        function l() {
            if (r.is(":visible")) {
                c(i);
            } else {
                var e = f(this).closest("div.combo-panel");
                f("div.combo-panel:visible").not(r).not(e).panel("close");
                f(i).combo("showPanel");
                if (n.queryOnFirstArrowDown) {
                    n.keyHandler.query.call(i, o.val());
                    n.queryOnFirstArrowDown = false;
                    f(i).combo("validate");
                }
            }
            o.focus();
        }
    }
    function i(e) {
        var t = f.data(e, "combo");
        var i = t.options;
        var a = t.combo;
        var n = t.panel;
        n.panel("move", {
            left: o(),
            top: s()
        });
        if (n.panel("options").closed) {
            n.panel("open");
            var r = t.combo;
            n.panel("resize", {
                width: i.panelWidth ? i.panelWidth : r.outerWidth(),
                height: i.panelHeight
            });
            if (n.find(".datagrid").length > 0) {
                f.data(e, "combogrid").grid.datagrid("resize", {
                    width: i.panelWidth ? i.panelWidth : r.outerWidth(),
                    height: i.panelHeight
                });
            }
            i.onShowPanel.call(e);
        }
        (function() {
            if (n.is(":visible")) {
                var e = s();
                if (e > a.offset().top) {
                    a.removeClass("combo-p-top").addClass("combo-p-bottom");
                    n.parent().removeClass("combo-p-top").addClass("combo-p-bottom");
                } else {
                    a.removeClass("combo-p-bottom").addClass("combo-p-top");
                    n.parent().removeClass("combo-p-bottom").addClass("combo-p-top");
                }
                if (n.prev().hasClass("_hisui_combobox-selectall") && n.parent().hasClass("combo-p-top")) {
                    e -= 32;
                }
                n.panel("move", {
                    left: o(),
                    top: e
                });
                setTimeout(arguments.callee, 200);
            }
        })();
        function o() {
            var e = a.offset().left;
            if (i.panelAlign == "right") {
                e += a._outerWidth() - n._outerWidth();
            }
            if (e + n._outerWidth() > f(window)._outerWidth() + f(document).scrollLeft()) {
                e = f(window)._outerWidth() + f(document).scrollLeft() - n._outerWidth();
            }
            if (e < 0) {
                e = 0;
            }
            return e;
        }
        function s() {
            var e = a.offset().top + a._outerHeight() - 1;
            if (e + n._outerHeight() > f(window)._outerHeight() + f(document).scrollTop()) {
                e = a.offset().top - n._outerHeight() + 1;
            }
            if (e < f(document).scrollTop()) {
                e = a.offset().top + a._outerHeight() - 1;
            }
            return e;
        }
    }
    function c(e) {
        var t = f.data(e, "combo").panel;
        t.panel("close");
    }
    function s(e) {
        var t = f.data(e, "combo").options;
        var i = f(e).combo("textbox");
        i.validatebox(f.extend({}, t, {
            deltaX: t.hasDownArrow ? t.deltaX : t.deltaX > 0 ? 1 : -1
        }));
    }
    function l(e, t) {
        var i = f.data(e, "combo");
        var a = i.options;
        var n = i.combo;
        if (t) {
            a.disabled = true;
            f(e).attr("disabled", true);
            n.find(".combo-value").attr("disabled", true);
            n.find(".combo-text").attr("disabled", true);
            n.addClass("disabled");
        } else {
            a.disabled = false;
            f(e).removeAttr("disabled");
            n.find(".combo-value").removeAttr("disabled");
            n.find(".combo-text").removeAttr("disabled");
            n.removeClass("disabled");
        }
    }
    function u(e, t) {
        var i = f.data(e, "combo");
        var a = i.options;
        a.readonly = t == undefined ? true : t;
        var n = a.readonly ? true : !a.editable;
        i.combo.find(".combo-text").attr("readonly", n).css("cursor", n ? "pointer" : "");
    }
    function h(e) {
        var t = f.data(e, "combo");
        var i = t.options;
        var a = t.combo;
        if (i.multiple) {
            a.find("input.combo-value").remove();
        } else {
            a.find("input.combo-value").val("");
        }
        a.find("input.combo-text").val("");
    }
    function p(e) {
        var t = f.data(e, "combo").combo;
        return t.find("input.combo-text").val();
    }
    function v(e, t) {
        var i = f.data(e, "combo");
        var a = i.combo.find("input.combo-text");
        if (a.val() != t) {
            a.val(t);
            f(e).combo("validate");
            i.previousValue = t;
        }
    }
    function g(e) {
        var t = [];
        var i = f.data(e, "combo").combo;
        i.find("input.combo-value").each(function() {
            t.push(f(this).val());
        });
        return t;
    }
    function b(e, t) {
        var i = f.data(e, "combo").options;
        var a = g(e);
        var n = f.data(e, "combo").combo;
        n.find("input.combo-value").remove();
        var r = f(e).attr("comboName");
        for (var o = 0; o < t.length; o++) {
            var s = f('<input type="hidden" class="combo-value">').appendTo(n);
            if (r) {
                s.attr("name", r);
            }
            s.val(t[o]);
        }
        var l = [];
        for (var o = 0; o < a.length; o++) {
            l[o] = a[o];
        }
        var d = [];
        for (var o = 0; o < t.length; o++) {
            for (var c = 0; c < l.length; c++) {
                if (t[o] == l[c]) {
                    d.push(t[o]);
                    l.splice(c, 1);
                    break;
                }
            }
        }
        if (d.length != t.length || t.length != a.length) {
            if (i.multiple) {
                i.onChange.call(e, t, a);
            } else {
                i.onChange.call(e, t[0], a[0]);
            }
        }
    }
    function m(e) {
        var t = g(e);
        if (typeof t[0] == "undefined") {
            t[0] = "";
        }
        return t[0];
    }
    function x(e, t) {
        b(e, [ t ]);
    }
    function C(e) {
        var t = f.data(e, "combo").options;
        var i = t.onChange;
        t.onChange = function() {};
        if (t.multiple) {
            if (t.value) {
                if (typeof t.value == "object") {
                    b(e, t.value);
                } else {
                    x(e, t.value);
                }
            } else {
                b(e, []);
            }
            t.originalValue = g(e);
        } else {
            x(e, t.value);
            t.originalValue = t.value;
        }
        t.onChange = i;
    }
    f.fn.combo = function(i, t) {
        if (typeof i == "string") {
            var e = f.fn.combo.methods[i];
            if (e) {
                return e(this, t);
            } else {
                return this.each(function() {
                    var e = f(this).combo("textbox");
                    e.validatebox(i, t);
                });
            }
        }
        i = i || {};
        return this.each(function() {
            var e = f.data(this, "combo");
            if (e) {
                f.extend(e.options, i);
            } else {
                var t = n(this);
                e = f.data(this, "combo", {
                    options: f.extend({}, f.fn.combo.defaults, f.fn.combo.parseOptions(this), i),
                    combo: t.combo,
                    panel: t.panel,
                    previousValue: null
                });
                f(this).removeAttr("disabled");
            }
            r(this);
            a(this);
            o(this);
            s(this);
            C(this);
        });
    };
    f.fn.combo.methods = {
        options: function(e) {
            return f.data(e[0], "combo").options;
        },
        panel: function(e) {
            return f.data(e[0], "combo").panel;
        },
        textbox: function(e) {
            return f.data(e[0], "combo").combo.find("input.combo-text");
        },
        destroy: function(e) {
            return e.each(function() {
                t(this);
            });
        },
        resize: function(e, t) {
            return e.each(function() {
                a(this, t);
            });
        },
        showPanel: function(e) {
            return e.each(function() {
                i(this);
            });
        },
        hidePanel: function(e) {
            return e.each(function() {
                c(this);
            });
        },
        disable: function(e) {
            return e.each(function() {
                l(this, true);
                o(this);
            });
        },
        enable: function(e) {
            return e.each(function() {
                l(this, false);
                o(this);
            });
        },
        readonly: function(e, t) {
            return e.each(function() {
                u(this, t);
                o(this);
            });
        },
        isValid: function(e) {
            var t = f.data(e[0], "combo").combo.find("input.combo-text");
            return t.validatebox("isValid");
        },
        clear: function(e) {
            return e.each(function() {
                h(this);
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = f.data(this, "combo").options;
                if (e.multiple) {
                    f(this).combo("setValues", e.originalValue);
                } else {
                    f(this).combo("setValue", e.originalValue);
                }
            });
        },
        getText: function(e) {
            return p(e[0]);
        },
        setText: function(e, t) {
            return e.each(function() {
                v(this, t);
            });
        },
        getValues: function(e) {
            return g(e[0]);
        },
        setValues: function(e, t) {
            return e.each(function() {
                b(this, t);
            });
        },
        getValue: function(e) {
            return m(e[0]);
        },
        setValue: function(e, t) {
            return e.each(function() {
                x(this, t);
            });
        }
    };
    f.fn.combo.parseOptions = function(e) {
        var t = f(e);
        return f.extend({}, f.fn.validatebox.parseOptions(e), f.parser.parseOptions(e, [ "blurValidValue", "width", "height", "separator", "panelAlign", {
            panelWidth: "number",
            editable: "boolean",
            hasDownArrow: "boolean",
            delay: "number",
            selectOnNavigation: "boolean"
        } ]), {
            panelHeight: t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined,
            multiple: t.attr("multiple") ? true : undefined,
            disabled: t.attr("disabled") ? true : undefined,
            readonly: t.attr("readonly") ? true : undefined,
            value: t.val() || undefined
        });
    };
    f.fn.combo.defaults = f.extend({}, f.fn.validatebox.defaults, {
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

jQuery.fn.comboboxAddClass = function(e) {
    if (e == "combobox-item-selected" || e == "combobox-item-hover") {
        var t = $(this).parent()[0];
        if (t) {
            if (t.scrollWidth > t.clientWidth) {
                var i = t.scrollWidth - (t.offsetWidth - t.clientWidth);
                if (i > 0) $(this).width(i);
            }
        }
    }
    return $(this).addClass(e);
};

jQuery.fn.comboboxRemoveClass = function(e) {
    var t = $(this).removeClass(e);
    if (e == "combobox-item-selected" || e == "combobox-item-hover") {
        if (!$(this).hasClass("combobox-item-selected") && !$(this).hasClass("combobox-item-hover")) {
            $(this).width("");
        }
    }
    return t;
};

(function(w) {
    var a = 0;
    function l(e, t) {
        var i = w.data(e, "combobox");
        var a = i.options;
        var n = i.data;
        for (var r = 0; r < n.length; r++) {
            if (n[r][a.valueField] == t) {
                return r;
            }
        }
        return -1;
    }
    function d(e, t) {
        var i = w.data(e, "combobox").options;
        var a = w(e).combo("panel");
        var n = i.finder.getEl(e, t);
        if (n.length) {
            if (n.position().top <= 0) {
                var r = a.scrollTop() + n.position().top;
                a.scrollTop(r);
            } else {
                if (n.position().top + n.outerHeight() > a.height()) {
                    var r = a.scrollTop() + n.position().top + n.outerHeight() - a.height();
                    a.scrollTop(r);
                }
            }
        }
    }
    function t(e, t) {
        var i = w.data(e, "combobox").options;
        var a = w(e).combobox("panel");
        var n = a.children("div.combobox-item-hover");
        if (!n.length) {
            n = a.children("div.combobox-item-selected");
        }
        n.comboboxRemoveClass("combobox-item-hover");
        var r = "div.combobox-item:visible:not(.combobox-item-disabled):first";
        var o = "div.combobox-item:visible:not(.combobox-item-disabled):last";
        if (!n.length) {
            n = a.children(t == "next" ? r : o);
        } else {
            if (t == "next") {
                n = n.nextAll(r);
                if (!n.length) {
                    n = a.children(r);
                }
            } else {
                n = n.prevAll(r);
                if (!n.length) {
                    n = a.children(o);
                }
            }
        }
        if (n.length) {
            n.comboboxAddClass("combobox-item-hover");
            var s = i.finder.getRow(e, n);
            if (s) {
                d(e, s[i.valueField]);
                if (i.selectOnNavigation) {
                    c(e, s[i.valueField]);
                }
            }
        }
    }
    function c(e, t) {
        var i = w.data(e, "combobox").options;
        var a = w(e).combo("getValues");
        if (w.inArray(t + "", a) == -1) {
            if (i.multiple) {
                a.push(t);
            } else {
                a = [ t ];
            }
            Y(e, a);
            i.onSelect.call(e, i.finder.getRow(e, t));
        } else {
            if (i.multiple) {} else {
                if (t) {
                    var n = i.finder.getRow(e, t);
                    if (n) {
                        var r = n[i.textField];
                        if (r !== w(e).combo("getText")) {
                            w(e).combo("setText", r);
                        }
                    }
                }
            }
        }
    }
    function o(e, t) {
        var i = w.data(e, "combobox").options;
        var a = w(e).combo("getValues");
        var n = w.inArray(t + "", a);
        if (n >= 0) {
            a.splice(n, 1);
            Y(e, a);
            i.onUnselect.call(e, i.finder.getRow(e, t));
        }
    }
    function Y(e, t, i) {
        var a = w.data(e, "combobox").options;
        var n = w(e).combo("panel");
        n.find("div.combobox-item-selected").comboboxRemoveClass("combobox-item-selected");
        var r = [], o = [], s = [];
        for (var l = 0; l < t.length; l++) {
            var d = t[l];
            var c = d;
            if (d != "" && d != undefined && d != null) {
                if (a.finder.getEl(e, d).length > 0) {
                    s.push(d);
                }
            }
            a.finder.getEl(e, d).comboboxAddClass("combobox-item-selected");
            var f = a.finder.getRow(e, d);
            if (f) {
                c = f[a.textField];
            } else {}
            r.push(d);
            o.push(c);
        }
        w(e).combo("setValues", r);
        if (!i) {
            w(e).combo("setText", o.join(a.separator));
        }
        if (a.rowStyle && a.rowStyle == "checkbox") {
            var u = w.data(e, "combobox").data.length;
            if (s.length == u) {
                n.parent().children("._hisui_combobox-selectall").comboboxAddClass("checked");
            } else {
                n.parent().children("._hisui_combobox-selectall").comboboxRemoveClass("checked");
            }
        }
    }
    function r(n, e, t) {
        var i = w.data(n, "combobox");
        if ("undefined" == typeof i) return;
        var r = i.options;
        i.data = r.loadFilter.call(n, e);
        i.groups = [];
        e = i.data;
        var a = w(n).combobox("getValues");
        var o = [];
        var s = undefined;
        var l = "01234567890123456789", d = 0;
        function c(e) {
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
        strFontWidth = function(e, t) {
            var i = t || "14px Microsoft Yahei", a = w("<div>" + e + "</div>").css({
                position: "absolute",
                "float": "left",
                "white-space": "nowrap",
                visibility: "hidden",
                font: i
            }).appendTo(w("body")), n = a.width();
            a.remove();
            return n;
        };
        var f = "";
        for (var u = 0; u < e.length; u++) {
            var h = e[u];
            var p = h[r.valueField] + "";
            var v = h[r.textField];
            var g = h[r.groupField];
            if (g) {
                if (s != g) {
                    s = g;
                    i.groups.push(g);
                    o.push('<div id="' + (i.groupIdPrefix + "_" + (i.groups.length - 1)) + '" class="combobox-group">');
                    o.push(r.groupFormatter ? r.groupFormatter.call(n, g) : g);
                    o.push("</div>");
                }
            } else {
                s = undefined;
            }
            var b = "combobox-item" + (h.disabled ? " combobox-item-disabled" : "") + (g ? " combobox-gitem" : "");
            o.push('<div id="' + (i.itemIdPrefix + "_" + u) + '" ' + f + ' class="' + b + '">');
            o.push(r.formatter ? r.formatter.call(n, h) : v);
            o.push("</div>");
            if (h["selected"] && w.inArray(p, a) == -1) {
                a.push(p);
            }
        }
        w(n).combo("panel").html(o.join(""));
        if (r.multiple) {
            Y(n, a, t);
            if (r.rowStyle && r.rowStyle == "checkbox") {
                var m = w(n).combo("panel");
                m.closest(".combo-p").children("._hisui_combobox-selectall").remove();
                var x = m.width() - 5;
                var C = w('<div style="width:' + x + 'px" class="_hisui_combobox-selectall"><span class="combobox-checkbox"></span>' + r.selectAllBtnDesc + "</div>").bind("mouseenter", function(e) {
                    w(e.target).closest("div._hisui_combobox-selectall").comboboxAddClass("combobox-selectall-hover");
                    e.stopPropagation();
                }).bind("mouseleave", function(e) {
                    w(e.target).closest("div._hisui_combobox-selectall").comboboxRemoveClass("combobox-selectall-hover");
                    e.stopPropagation();
                }).bind("click", function(e) {
                    var t = w(this);
                    if (t.hasClass("checked")) {
                        t.comboboxRemoveClass("checked");
                        w(n).combobox("setValues", []);
                    } else {
                        var a = [];
                        t.comboboxAddClass("checked");
                        var i = w(n).combo("panel");
                        i.find("div.combobox-item").filter(":visible").each(function() {
                            var e = w(this);
                            if (!e.length || e.hasClass("combobox-item-disabled")) {
                                return;
                            }
                            var t = r.finder.getRow(n, e);
                            if (!t) {
                                return;
                            }
                            var i = t[r.valueField];
                            a.push(i);
                        });
                        w(n).combobox("setValues", a);
                    }
                    if (r.onAllSelectClick) {
                        r.onAllSelectClick.call(n, e);
                    }
                });
                if (r.allSelectButtonPosition == "bottom") {
                    C.insertAfter(m);
                    C.parent().comboboxAddClass("bbtm");
                } else {
                    C.insertBefore(m);
                    C.parent().comboboxAddClass("btop");
                }
            }
        } else {
            Y(n, a.length ? [ a[a.length - 1] ] : [], t);
        }
        if (r.defaultHoverFirstRow === true) {
            if (e.length > 0) {
                w(n).combo("panel").find(".combobox-item:visible:eq(0)").comboboxAddClass("combobox-item-hover");
            }
        }
        r.onLoadSuccess.call(n, e);
    }
    function n(i, e, t, a) {
        var n = w.data(i, "combobox").options;
        if (e) {
            n.url = e;
        }
        t = t || {};
        if (n.onBeforeLoad.call(i, t) == false) {
            return;
        }
        n.loader.call(i, t, function(e) {
            var t = e;
            if ("undefined" !== typeof e.code) {
                if (w.isArray(e.rows)) {
                    t = e.rows;
                } else if (w.isArray(e.data)) {
                    t = e.data;
                } else if (w.isArray(e.records)) {
                    t = e.records;
                } else if (e.data != null && typeof e.data === "object" && w.isArray(e.data) === false) {
                    if (w.isArray(e.data.records)) {
                        t = e.data.records;
                    }
                }
            }
            r(i, t, a);
        }, function() {
            n.onLoadError.apply(this, arguments);
        });
    }
    function i(l, e) {
        var d = w.data(l, "combobox");
        var c = d.options;
        if (c.multiple && !e) {
            Y(l, [], true);
        } else {
            Y(l, [ e ], true);
        }
        if (c.mode == "remote") {
            n(l, null, {
                q: e
            }, true);
        } else {
            var t = w(l).combo("panel");
            t.find("div.combobox-item-selected,div.combobox-item-hover").comboboxRemoveClass("combobox-item-selected combobox-item-hover");
            t.find("div.combobox-item,div.combobox-group").hide();
            var f = d.data;
            var u = [];
            var i = c.multiple ? e.split(c.separator) : [ e ];
            w.map(i, function(e) {
                e = w.trim(e);
                var t = undefined;
                for (var i = 0; i < f.length; i++) {
                    var a = f[i];
                    if (c.filter.call(l, e, a)) {
                        var n = a[c.valueField];
                        var r = a[c.textField];
                        var o = a[c.groupField];
                        var s = c.finder.getEl(l, n).show();
                        if (r.toLowerCase() == e.toLowerCase()) {
                            u.push(n);
                            s.comboboxAddClass("combobox-item-selected");
                        }
                        if (c.groupField && t != o) {
                            w("#" + d.groupIdPrefix + "_" + w.inArray(o, d.groups)).show();
                            t = o;
                        }
                    }
                }
            });
            Y(l, u, true);
            if (u.length > 0) {
                c.onSelect.call(l, c.finder.getRow(l, u[u.length - 1]));
            }
            if (c.defaultHoverFirstRow === true) {
                if (f.length > 0) {
                    w(l).combo("panel").find(".combobox-item:visible:eq(0)").comboboxAddClass("combobox-item-hover");
                }
            }
        }
    }
    function s(t) {
        var e = w(t);
        var i = e.combobox("options");
        var a = e.combobox("panel");
        if (!a.is(":visible")) return;
        var n = a.children("div.combobox-item-hover");
        if (n.length) {
            var r = i.finder.getRow(t, n);
            var o = r[i.valueField];
            i.doEnterFlag = 1;
            if (i.multiple) {
                if (n.hasClass("combobox-item-selected")) {
                    e.combobox("unselect", o);
                } else {
                    e.combobox("select", o);
                }
            } else {
                e.combobox("select", o);
            }
        }
        var s = [];
        w.map(e.combobox("getValues"), function(e) {
            if (l(t, e) >= 0) {
                s.push(e);
            }
        });
        if (s.length == 0 && !i.enterNullValueClear || i.multiple && !i.enterNullValueClear) {} else {
            e.combobox("setValues", s);
        }
        if (!i.multiple) {
            e.combobox("hidePanel");
        }
    }
    function f(e) {
        w(e).combobox("textbox").val("");
        var t = w.data(e, "combo");
        t.previousValue = "";
        i(e, "");
    }
    var u = function(e) {
        var t = null;
        if (window.event) {
            t = window.event.target || window.event.srcElement || null;
        }
        if (t && (t.className || "").indexOf("combobox-item") > -1) {
            return;
        }
        var i = w(e).combobox("options");
        if (i.doEnterFlag == 1) {
            i.doEnterFlag == 0;
            return;
        }
        var a = w(e).combobox("getValue");
        if (a == undefined || a == "" || a == null) {
            f(e);
        } else {
            var n = 0;
            var r = w(e).combobox("getData");
            for (var o = 0; o < r.length; o++) {
                if (r[o][i.valueField] == a) {
                    n = 1;
                }
            }
            if (0 == n) {
                f(e);
            }
        }
    };
    function h(n) {
        var e = w.data(n, "combobox");
        var r = e.options;
        a++;
        e.itemIdPrefix = "_hisui_combobox_i" + a;
        e.groupIdPrefix = "_hisui_combobox_g" + a;
        w(n).comboboxAddClass("combobox-f");
        var t = r.onHidePanel;
        if (r && r.blurValidValue) {
            r.forceValidValue = true;
            if (r.onHidePanel) {
                var i = r.onHidePanel;
            }
            t = function() {
                var e = this;
                if ("function" == typeof i) i.call(e);
                u(e);
            };
        }
        w(n).combo(w.extend({}, r, {
            onShowPanel: function() {
                w(n).combo("panel").find("div.combobox-item,div.combobox-group").show();
                w(n).combo("panel").find(".combobox-item-selected").comboboxAddClass("combobox-item-selected");
                d(n, w(n).combobox("getValue"));
                r.onShowPanel.call(n);
                if (r.defaultHoverFirstRow === true) {
                    w(n).combo("panel").find(".combobox-item:visible:eq(0)").comboboxAddClass("combobox-item-hover");
                }
            },
            onHidePanel: t
        }));
        w(n).combo("panel").unbind().bind("mouseover", function(e) {
            w(this).children("div.combobox-item-hover").comboboxRemoveClass("combobox-item-hover");
            var t = w(e.target).closest("div.combobox-item");
            if (!t.hasClass("combobox-item-disabled")) {
                t.comboboxAddClass("combobox-item-hover");
            }
            e.stopPropagation();
        }).bind("mouseout", function(e) {
            w(e.target).closest("div.combobox-item").comboboxRemoveClass("combobox-item-hover");
            e.stopPropagation();
        }).bind("click", function(e) {
            var t = w(e.target).closest("div.combobox-item");
            if (!t.length || t.hasClass("combobox-item-disabled")) {
                return;
            }
            var i = r.finder.getRow(n, t);
            if (!i) {
                return;
            }
            var a = i[r.valueField];
            if (r.multiple) {
                if (t.hasClass("combobox-item-selected")) {
                    o(n, a);
                } else {
                    c(n, a);
                }
            } else {
                if (r.allowNull && t.hasClass("combobox-item-selected")) {
                    o(n, a);
                } else {
                    c(n, a);
                }
                w(n).combo("hidePanel");
            }
            e.stopPropagation();
        });
    }
    w.fn.combobox = function(i, e) {
        if (typeof i == "string") {
            var t = w.fn.combobox.methods[i];
            if (t) {
                return t(this, e);
            } else {
                return this.combo(i, e);
            }
        }
        i = i || {};
        return this.each(function() {
            var e = w.data(this, "combobox");
            if (e) {
                w.extend(e.options, i);
                h(this);
            } else {
                e = w.data(this, "combobox", {
                    options: w.extend({}, w.fn.combobox.defaults, w.fn.combobox.parseOptions(this), i),
                    data: []
                });
                h(this);
                var t = w.fn.combobox.parseData(this);
                if (t.length) {
                    r(this, t);
                }
            }
            if (e.options.data) {
                r(this, e.options.data);
            }
            n(this);
        });
    };
    w.fn.combobox.methods = {
        options: function(e) {
            var t = e.combo("options");
            return w.extend(w.data(e[0], "combobox").options, {
                originalValue: t.originalValue,
                disabled: t.disabled,
                readonly: t.readonly
            });
        },
        getData: function(e) {
            return w.data(e[0], "combobox").data;
        },
        setValues: function(e, t) {
            return e.each(function() {
                Y(this, t);
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                Y(this, [ t ]);
            });
        },
        clear: function(e) {
            return e.each(function() {
                w(this).combo("clear");
                var e = w(this).combo("panel");
                e.find("div.combobox-item-selected").comboboxRemoveClass("combobox-item-selected");
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = w(this).combobox("options");
                if (e.multiple) {
                    w(this).combobox("setValues", e.originalValue);
                } else {
                    w(this).combobox("setValue", e.originalValue);
                }
            });
        },
        loadData: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        reload: function(e, t) {
            return e.each(function() {
                n(this, t);
            });
        },
        select: function(e, t) {
            return e.each(function() {
                c(this, t);
            });
        },
        unselect: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        }
    };
    w.fn.combobox.parseOptions = function(e) {
        var t = w(e);
        return w.extend({}, w.fn.combo.parseOptions(e), w.parser.parseOptions(e, [ "valueField", "textField", "groupField", "mode", "method", "url" ]));
    };
    w.fn.combobox.parseData = function(e) {
        var n = [];
        var r = w(e).combobox("options");
        w(e).children().each(function() {
            if (this.tagName.toLowerCase() == "optgroup") {
                var e = w(this).attr("label");
                w(this).children().each(function() {
                    t(this, e);
                });
            } else {
                t(this);
            }
        });
        return n;
        function t(e, t) {
            var i = w(e);
            var a = {};
            a[r.valueField] = i.attr("value") != undefined ? i.attr("value") : i.text();
            a[r.textField] = i.text();
            a["selected"] = i.is(":selected");
            a["disabled"] = i.is(":disabled");
            if (t) {
                r.groupField = r.groupField || "group";
                a[r.groupField] = t;
            }
            n.push(a);
        }
    };
    w.fn.combobox.defaults = w.extend({}, w.fn.combo.defaults, {
        forceValidValue: false,
        allowNull: false,
        selectAllBtnDesc: "select/unselect",
        defaultHoverFirstRow: false,
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
                s(this);
            },
            query: function(e, t) {
                i(this, e);
            }
        },
        filter: function(e, t) {
            var i = w(this).combobox("options");
            return t[i.textField].toLowerCase().indexOf(e.toLowerCase()) == 0;
        },
        formatter: function(e) {
            var t = w(this).combobox("options");
            if (t.rowStyle && t.rowStyle == "checkbox") {
                return "<span class='combobox-checkbox'></span>" + e[t.textField];
            } else {
                return e[t.textField];
            }
        },
        loader: function(e, t, i) {
            var a = w(this).combobox("options");
            if (!a.url) {
                return false;
            }
            w.ajax({
                type: a.method,
                url: a.url,
                data: e,
                dataType: "json",
                success: function(e) {
                    t(e);
                },
                error: function() {
                    i.apply(this, arguments);
                }
            });
        },
        loadFilter: function(e) {
            return e;
        },
        finder: {
            getEl: function(e, t) {
                var i = l(e, t);
                var a = w.data(e, "combobox").itemIdPrefix + "_" + i;
                return w("#" + a);
            },
            getRow: function(e, t) {
                var i = w.data(e, "combobox");
                var a = t instanceof jQuery ? t.attr("id").substr(i.itemIdPrefix.length + 1) : l(e, t);
                return i.data[parseInt(a)];
            }
        },
        onBeforeLoad: function(e) {},
        onLoadSuccess: function() {},
        onLoadError: function() {},
        onSelect: function(e) {},
        onUnselect: function(e) {}
    });
})(jQuery);

(function(u) {
    function a(d) {
        var e = u.data(d, "combotree");
        var c = e.options;
        var f = e.tree;
        u(d).addClass("combotree-f");
        u(d).combo(c);
        var t = u(d).combo("panel");
        if (!f) {
            f = u("<ul></ul>").appendTo(t);
            u.data(d, "combotree").tree = f;
        }
        f.tree(u.extend({}, c, {
            checkbox: c.multiple,
            onLoadSuccess: function(e, t) {
                var i = u(d).combotree("getValues");
                if (c.multiple) {
                    var a = f.tree("getChecked");
                    for (var n = 0; n < a.length; n++) {
                        var r = a[n].id;
                        (function() {
                            for (var e = 0; e < i.length; e++) {
                                if (r == i[e]) {
                                    return;
                                }
                            }
                            i.push(r);
                        })();
                    }
                }
                var o = u(this).tree("options");
                var s = o.onCheck;
                var l = o.onSelect;
                o.onCheck = o.onSelect = function() {};
                u(d).combotree("setValues", i);
                o.onCheck = s;
                o.onSelect = l;
                c.onLoadSuccess.call(this, e, t);
            },
            onClick: function(e) {
                if (c.multiple) {
                    u(this).tree(e.checked ? "uncheck" : "check", e.target);
                } else {
                    u(d).combo("hidePanel");
                }
                i(d);
                c.onClick.call(this, e);
            },
            onCheck: function(e, t) {
                i(d);
                c.onCheck.call(this, e, t);
            }
        }));
    }
    function i(e) {
        var t = u.data(e, "combotree");
        var i = t.options;
        var a = t.tree;
        var n = [], r = [];
        if (i.multiple) {
            var o = a.tree("getChecked");
            for (var s = 0; s < o.length; s++) {
                n.push(o[s].id);
                r.push(o[s].text);
            }
        } else {
            var l = a.tree("getSelected");
            if (l) {
                n.push(l.id);
                r.push(l.text);
            }
        }
        u(e).combo("setValues", n).combo("setText", r.join(i.separator));
    }
    function n(e, t) {
        var i = u.data(e, "combotree").options;
        var a = u.data(e, "combotree").tree;
        a.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
        var n = [], r = [];
        for (var o = 0; o < t.length; o++) {
            var s = t[o];
            var l = s;
            var d = a.tree("find", s);
            if (d) {
                l = d.text;
                a.tree("check", d.target);
                a.tree("select", d.target);
            }
            n.push(s);
            r.push(l);
        }
        u(e).combo("setValues", n).combo("setText", r.join(i.separator));
    }
    function r(e, t) {
        var i = u.data(e, "combotree");
        var a = i.options;
        var n = i.tree;
        i.remainText = true;
        n.tree("doFilter", a.multiple ? t.split(a.separator) : t);
    }
    function t(e) {
        var t = u.data(e, "combotree");
        t.remainText = false;
        u(e).combotree("setValues", u(e).combotree("getValues"));
        u(e).combotree("hidePanel");
    }
    u.fn.combotree = function(t, e) {
        if (typeof t == "string") {
            var i = u.fn.combotree.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.combo(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = u.data(this, "combotree");
            if (e) {
                u.extend(e.options, t);
            } else {
                u.data(this, "combotree", {
                    options: u.extend({}, u.fn.combotree.defaults, u.fn.combotree.parseOptions(this), t)
                });
            }
            a(this);
        });
    };
    u.fn.combotree.methods = {
        options: function(e) {
            var t = e.combo("options");
            return u.extend(u.data(e[0], "combotree").options, {
                originalValue: t.originalValue,
                disabled: t.disabled,
                readonly: t.readonly
            });
        },
        tree: function(e) {
            return u.data(e[0], "combotree").tree;
        },
        loadData: function(e, i) {
            return e.each(function() {
                var e = u.data(this, "combotree").options;
                e.data = i;
                var t = u.data(this, "combotree").tree;
                t.tree("loadData", i);
            });
        },
        reload: function(e, i) {
            return e.each(function() {
                var e = u.data(this, "combotree").options;
                var t = u.data(this, "combotree").tree;
                if (i) {
                    e.url = i;
                }
                t.tree({
                    url: e.url
                });
            });
        },
        setValues: function(e, t) {
            return e.each(function() {
                n(this, t);
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                n(this, [ t ]);
            });
        },
        clear: function(e) {
            return e.each(function() {
                var e = u.data(this, "combotree").tree;
                e.find("div.tree-node-selected").removeClass("tree-node-selected");
                var t = e.tree("getChecked");
                for (var i = 0; i < t.length; i++) {
                    e.tree("uncheck", t[i].target);
                }
                u(this).combo("clear");
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = u(this).combotree("options");
                if (e.multiple) {
                    u(this).combotree("setValues", e.originalValue);
                } else {
                    u(this).combotree("setValue", e.originalValue);
                }
            });
        }
    };
    u.fn.combotree.parseOptions = function(e) {
        return u.extend({}, u.fn.combo.parseOptions(e), u.fn.tree.parseOptions(e));
    };
    u.fn.combotree.defaults = u.extend({}, u.fn.combo.defaults, u.fn.tree.defaults, {
        editable: false,
        textField: null,
        unselectedValues: [],
        mappingRows: [],
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                t(this);
            },
            query: function(e, t) {
                r(this, e);
            }
        }
    });
})(jQuery);

(function(b) {
    function a(n) {
        var r = b.data(n, "combogrid");
        var o = r.options;
        var s = r.grid;
        b(n).addClass("combogrid-f").combo(o);
        var e = b(n).combo("panel");
        if (!s) {
            s = b("<table></table>").appendTo(e);
            r.grid = s;
        }
        if (o.lazy && b(n).combo("getValue") == "") b(n).combo("options").queryOnFirstArrowDown = true;
        s.datagrid(b.extend({}, o, {
            border: false,
            fit: true,
            singleSelect: !o.multiple,
            onLoadSuccess: function(e) {
                var t = b(n).combo("getValues");
                var i = o.onSelect;
                o.onSelect = function() {};
                l(n, t, r.remainText);
                o.onSelect = i;
                o.onLoadSuccess.apply(n, arguments);
            },
            onClickRow: t,
            onSelect: function(e, t) {
                i();
                o.onSelect.call(this, e, t);
            },
            onUnselect: function(e, t) {
                i();
                o.onUnselect.call(this, e, t);
            },
            onSelectAll: function(e) {
                i();
                o.onSelectAll.call(this, e);
            },
            onUnselectAll: function(e) {
                if (o.multiple) {
                    i();
                }
                o.onUnselectAll.call(this, e);
            },
            lazy: o.lazy && b(n).combo("getValue") == ""
        }));
        function t(e, t) {
            r.remainText = false;
            i();
            if (!o.multiple) {
                b(n).combo("hidePanel");
            }
            o.onClickRow.call(this, e, t);
        }
        function i() {
            var e = s.datagrid("getSelections");
            var t = [], i = [];
            for (var a = 0; a < e.length; a++) {
                t.push(e[a][o.idField]);
                i.push(e[a][o.textField]);
            }
            if (!o.multiple) {
                b(n).combo("setValues", t.length ? t : [ "" ]);
            } else {
                b(n).combo("setValues", t);
            }
            if (!r.remainText) {
                b(n).combo("setText", i.join(o.separator));
            }
        }
    }
    function t(e, t) {
        var i = b.data(e, "combogrid");
        var a = i.options;
        var n = i.grid;
        var r = n.datagrid("getRows").length;
        if (!r) {
            return;
        }
        var o = a.finder.getTr(n[0], null, "highlight");
        if (!o.length) {
            o = a.finder.getTr(n[0], null, "selected");
        }
        var s;
        if (!o.length) {
            s = t == "next" ? 0 : r - 1;
        } else {
            var s = parseInt(o.attr("datagrid-row-index"));
            s += t == "next" ? 1 : -1;
            if (s < 0) {
                s = r - 1;
            }
            if (s >= r) {
                s = 0;
            }
        }
        n.datagrid("highlightRow", s);
        if (a.selectOnNavigation) {
            i.remainText = false;
            n.datagrid("selectRow", s);
        }
    }
    function l(e, t, i) {
        var a = b.data(e, "combogrid");
        var n = a.options;
        var r = a.grid;
        var o = r.datagrid("getRows");
        var s = [];
        var l = b(e).combo("getValues");
        var d = b(e).combo("options");
        var c = d.onChange;
        d.onChange = function() {};
        if (t === "") t = [];
        var f = b.map(t, function(e) {
            return String(e);
        });
        var u = b.grep(r.datagrid("getSelections"), function(e, t) {
            return b.inArray(String(e[n.idField]), f) >= 0;
        });
        r.datagrid("clearSelections");
        r.data("datagrid").selectedRows = u;
        for (var h = 0; h < t.length; h++) {
            var p = r.datagrid("getRowIndex", t[h]);
            if (p >= 0) {
                r.datagrid("selectRow", p);
                s.push(o[p][n.textField]);
            } else if (g(t[h], u)) {
                s.push(g(t[h], u));
            } else {
                s.push(t[h]);
            }
        }
        b(e).combo("setValues", l);
        d.onChange = c;
        b(e).combo("setValues", t);
        if (!i) {
            var v = s.join(n.separator);
            if (b(e).combo("getText") != v) {
                b(e).combo("setText", v);
            }
        }
        function g(e, t) {
            var i = b.hisui.getArrayItem(t, n.idField, e);
            return i ? i[n.textField] : undefined;
        }
    }
    function n(a, e) {
        var t = b.data(a, "combogrid");
        var n = t.options;
        var r = t.grid;
        t.remainText = true;
        if (n.multiple && !e) {
            l(a, [], true);
        } else {
            l(a, [ e ], true);
        }
        if (n.mode == "remote") {
            r.datagrid("clearSelections");
            r.datagrid("load", b.extend({}, n.queryParams, {
                q: e
            }));
        } else {
            if (!e) {
                return;
            }
            r.datagrid("clearSelections").datagrid("highlightRow", -1);
            var o = r.datagrid("getRows");
            var i = n.multiple ? e.split(n.separator) : [ e ];
            b.map(i, function(i) {
                i = b.trim(i);
                if (i) {
                    b.map(o, function(e, t) {
                        if (i == e[n.textField]) {
                            r.datagrid("selectRow", t);
                        } else {
                            if (n.filter.call(a, i, e)) {
                                r.datagrid("highlightRow", t);
                            }
                        }
                    });
                }
            });
        }
    }
    function i(e) {
        var t = b.data(e, "combogrid");
        var i = t.options;
        var a = t.grid;
        var n = b(e).combogrid("panel");
        if (!n.is(":visible")) return;
        var r = i.finder.getTr(a[0], null, "highlight");
        t.remainText = false;
        if (r.length) {
            var o = parseInt(r.attr("datagrid-row-index"));
            if (i.multiple) {
                if (r.hasClass("datagrid-row-selected")) {
                    a.datagrid("unselectRow", o);
                } else {
                    a.datagrid("selectRow", o);
                }
            } else {
                a.datagrid("selectRow", o);
            }
        }
        var s = [];
        b.map(a.datagrid("getSelections"), function(e) {
            s.push(e[i.idField]);
        });
        if (s.length == 0 && !i.enterNullValueClear) {} else if (s.length == 1 && i.enterSelectRow) {} else {
            b(e).combogrid("setValues", s);
        }
        if (!i.multiple) {
            b(e).combogrid("hidePanel");
        }
    }
    b.fn.combogrid = function(t, e) {
        if (typeof t == "string") {
            var i = b.fn.combogrid.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.combo(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = b.data(this, "combogrid");
            if (e) {
                b.extend(e.options, t);
            } else {
                e = b.data(this, "combogrid", {
                    options: b.extend({}, b.fn.combogrid.defaults, b.fn.combogrid.parseOptions(this), t)
                });
            }
            a(this);
            if (e.options.blurValidValue) {
                var i = this;
                b(i).combo("textbox").bind("blur.combo-text", function(e) {
                    var t = b(i).combogrid("grid").datagrid("getSelected");
                    if (t == undefined || t == "" || t == null) {
                        b(e.target).val("");
                        n(i, "");
                    }
                });
            }
        });
    };
    b.fn.combogrid.methods = {
        options: function(e) {
            var t = e.combo("options");
            return b.extend(b.data(e[0], "combogrid").options, {
                originalValue: t.originalValue,
                disabled: t.disabled,
                readonly: t.readonly
            });
        },
        grid: function(e) {
            return b.data(e[0], "combogrid").grid;
        },
        setValues: function(e, t) {
            return e.each(function() {
                l(this, t);
            });
        },
        setValue: function(e, t) {
            return e.each(function() {
                l(this, [ t ]);
            });
        },
        clear: function(e) {
            return e.each(function() {
                b(this).combogrid("grid").datagrid("clearSelections");
                b(this).combo("clear");
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = b(this).combogrid("options");
                if (e.multiple) {
                    b(this).combogrid("setValues", e.originalValue);
                } else {
                    b(this).combogrid("setValue", e.originalValue);
                }
            });
        }
    };
    b.fn.combogrid.parseOptions = function(e) {
        var t = b(e);
        return b.extend({}, b.fn.combo.parseOptions(e), b.fn.datagrid.parseOptions(e), b.parser.parseOptions(e, [ "idField", "textField", "mode" ]));
    };
    b.fn.combogrid.defaults = b.extend({}, b.fn.combo.defaults, b.fn.datagrid.defaults, {
        enterSelectRow: false,
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
                b.data(this, "combogrid").options.enterSelectRow = true;
                i(this);
                b.data(this, "combogrid").options.enterSelectRow = false;
            },
            query: function(e, t) {
                n(this, e);
            }
        },
        filter: function(e, t) {
            var i = b(this).combogrid("options");
            return t[i.textField].toLowerCase().indexOf(e.toLowerCase()) == 0;
        },
        lazy: false
    });
})(jQuery);

(function(d) {
    function c(e, t) {
        return e + "_" + t;
    }
    function l(e) {
        return e + "_name";
    }
    var t = {
        init: function(e) {
            var t = {
                onChange: function() {}
            };
            var s = d.extend(t, e);
            this.each(function() {
                var e = d(this);
                var o = e.attr("id");
                s.formatter = function(e) {
                    var t;
                    var i = e[s.valueField];
                    var a = e[s.textField];
                    var n = c(o, i);
                    var r = l(o);
                    if (e.selected == true) {
                        t = "<input style='height:13px' type='radio' checked='checked' id='" + n + "' name='" + r + "' value='" + i + "'>" + a;
                    } else {
                        t = "<input style='height:13px' type='radio' id='" + n + "' name='" + r + "' value='" + i + "'>" + a;
                    }
                    return t;
                };
                s.oldonSelect = s.onSelect;
                s.onSelect = function(e) {
                    if (e) {
                        var t = e[s.valueField];
                        var i = c(o, t);
                        d("#" + i).prop("checked", true);
                        if (s.oldonSelect) {
                            s.oldonSelect(e);
                        }
                    }
                };
                s.oldonUnselect = s.onUnselect;
                s.onUnselect = function(e) {
                    var t = e[s.valueField];
                    var i = c(o, t);
                    d("#" + i).prop("checked", false);
                    if (s.oldonUnselect) {
                        s.oldonUnselect(e);
                    }
                };
                d(e).combobox(s);
            });
        },
        enable: function(e) {
            var t = d(this);
            if (e) {
                d(t).combobox("enable");
            } else {
                d(t).combobox("disable");
            }
        },
        disable: function(e) {
            var t = d(this);
            if (e) {
                d(t).combobox("disable");
            } else {
                d(t).combobox("enable");
            }
        },
        setValue: function(e) {
            var t = d(this);
            var i = t.attr("id");
            d(t).combobox("setValue", e);
            var a = c(i, e);
            d("#" + a).prop("checked", true);
            var n = null;
            var r = d(t).combobox("options").valueField;
            for (var o = 0; o < datas.length; o++) {
                if (datas[o][r] == e[0]) {
                    n = datas[o];
                    break;
                }
            }
            if (n != null) d(t).combobox("options").onSelect.call(d("#" + i)[0], n);
        },
        setValues: function(e) {
            var t = d(this);
            var i = t.attr("id");
            if (e.length > 0) {
                var a = e[0];
                d(t).combobox("setValue", a);
                var n = c(i, a);
                d("#" + n).prop("checked", true);
                var r = d(t).combobox("getData");
                var o = null;
                var s = d(t).combobox("options").valueField;
                for (var l = 0; l < r.length; l++) {
                    if (r[l][s] == e[0]) {
                        o = r[l];
                        break;
                    }
                }
                if (o != null) d(t).combobox("options").onSelect.call(d("#" + i)[0], o);
            }
        },
        loadData: function(e) {
            var t = d(this);
            d(t).combobox("loadData", e);
        },
        options: function() {
            var e = d(this);
            return d(e).combobox("options");
        },
        getValue: function() {
            var e = d(this);
            var t = d(e).combobox("getValue");
            return t == undefined ? "" : t;
        },
        getValues: function() {
            var e = d(this);
            var t = d(e).combobox("getValues");
            return t == undefined ? [] : t;
        },
        getData: function() {
            var e = d(this);
            var t = d(e).combobox("getData");
            return t == undefined ? [] : t;
        },
        clear: function() {
            var e = d(this);
            var t = d(e).combobox("options");
            var i = d(e).combobox("getData");
            if (!!i) {
                var a = e.attr("id");
                for (var n = 0; n < i.length; n++) {
                    var r = i[n];
                    var o = r[t.valueField];
                    var s = c(a, o);
                    d("#" + s).prop("checked", false);
                }
            }
            d(this).combobox("clear");
        }
    };
    d.fn.DropDropRadio = function(e) {
        if (t[e]) {
            return t[e].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof e === "object" || !e) {
            return t.init.apply(this, arguments);
        } else {
            d.error("Method " + e + "does not exist on mutiselect.js");
        }
    };
})(jQuery);

(function(u) {
    function a(d) {
        var c = u.data(d, "datebox");
        var f = c.options;
        u(d).addClass("datebox-f").combo(u.extend({}, f, {
            onShowPanel: function() {
                if (!c.calendar) {
                    e();
                }
                t();
                h(d, u(d).datebox("getText"), true);
                f.onShowPanel.call(d);
            }
        }));
        u(d).combo("textbox").parent().addClass("datebox");
        if (f.allParse) {
            if (!c.calendar) {
                e();
            }
        }
        h(d, f.value);
        u(d).combo("textbox").unbind(".datebox").bind("blur.datebox", function(e) {
            if (u(d).combo("textbox").parent().find(".combo-arrow-hover").length > 0) {
                return;
            }
            if (u.data(d, "datebox").calendar) {
                var t = u.data(d, "datebox").calendar.closest(".panel-body");
                if (t.find(".calendar-hover").length > 0) {
                    return;
                }
                if (t.find(".calendar-nav-hover").length > 0) {
                    return;
                }
                if (t.find(".calendar-menu-hover").length > 0) {
                    return;
                }
            }
            var i = u(d).combo("getText");
            setTimeout(function() {
                f.onBlur(d);
            }, 200);
        });
        function e() {
            var e = u(d).combo("panel").css("overflow", "hidden");
            e.panel("options").onBeforeDestroy = function() {
                var e = u(this).find(".calendar-shared");
                if (e.length) {
                    e.insertBefore(e[0].pholder);
                }
            };
            var t = u('<div class="datebox-calendar-inner"></div>').appendTo(e);
            if (f.sharedCalendar) {
                var i = u(f.sharedCalendar);
                if (!i[0].pholder) {
                    i[0].pholder = u('<div class="calendar-pholder" style="display:none"></div>').insertAfter(i);
                }
                i.addClass("calendar-shared").appendTo(t);
                if (!i.hasClass("calendar")) {
                    i.calendar();
                }
                c.calendar = i;
            } else {
                c.calendar = u("<div></div>").appendTo(t).calendar();
            }
            u.extend(c.calendar.calendar("options"), {
                fit: true,
                border: false,
                onSelect: function(e) {
                    var t = u(this.target).datebox("options");
                    h(this.target, t.formatter.call(this.target, e));
                    u(this.target).combo("hidePanel");
                    t.onSelect.call(d, e);
                },
                validator: function(e, t) {
                    var i = new Date(e.getFullYear(), e.getMonth(), e.getDate());
                    var a = u.data(d, "datebox");
                    var n = a.options;
                    var r = true;
                    if (null != n.minDate) {
                        if (t) t[0] = n.minDate;
                        var o = n.parser.call(d, n.minDate);
                        if (o > i) r = false;
                    }
                    if (null != n.maxDate) {
                        if (t) t[1] = n.maxDate;
                        var s = n.parser.call(d, n.maxDate);
                        if (s < i) r = false;
                    }
                    return r;
                }
            });
            var a = u('<div class="datebox-button"><table cellspacing="0" cellpadding="0" style="width:100%"><tr></tr></table></div>').appendTo(e);
            var n = a.find("tr");
            for (var r = 0; r < f.buttons.length; r++) {
                var o = u("<td></td>").appendTo(n);
                var s = f.buttons[r];
                var l = u('<a href="javascript:void(0)" onclick="javascript:return false;"></a>').html(u.isFunction(s.text) ? s.text(d) : s.text).appendTo(o);
                l.bind("click", {
                    target: d,
                    handler: s.handler
                }, function(e) {
                    e.data.handler.call(this, e.data.target);
                });
            }
            n.find("td").css("width", 100 / f.buttons.length + "%");
        }
        function t() {
            var e = u(d).combo("panel");
            var t = e.children("div.datebox-calendar-inner");
            e.children()._outerWidth(e.width());
            c.calendar.appendTo(t);
            c.calendar[0].target = d;
            if (f.panelHeight != "auto") {
                var i = e.height();
                e.children().not(t).each(function() {
                    i -= u(this).outerHeight();
                });
                t._outerHeight(i);
            }
            c.calendar.calendar("resize");
        }
    }
    function i(e, t) {
        h(e, t, true);
    }
    function o(e) {
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
    function n(e, t) {
        var i = u.data(e, "datebox");
        var a = i.options;
        var n = u(e).datebox("getText");
        var r;
        if (i.calendar && n != "") {
            r = i.calendar.calendar("options").current;
        }
        if (t === true) {
            r = i.calendar.calendar("options").current;
        }
        if (r) {
            h(e, a.formatter.call(e, r));
            u(e).combo("hidePanel");
        }
    }
    function t(e) {
        u(e).combo("textbox").validatebox("enableValidation");
        if (u(e).combo("textbox").validatebox("isValid")) {
            n(e);
        }
    }
    function h(e, t, i) {
        var a = u.data(e, "datebox");
        var n = a.options;
        u(e).combo("setValue", t);
        var r = a.calendar;
        if (r) {
            r.calendar("moveTo", n.parser.call(e, t));
        }
        if (!i) {
            if (t) {
                if (r) {
                    t = n.formatter.call(e, r.calendar("options").current);
                } else {
                    t = n.formatter.call(e, n.parser.call(e, t));
                }
                u(e).combo("setValue", t).combo("setText", t);
            } else {
                u(e).combo("setText", t);
            }
        }
    }
    u.fn.datebox = function(t, e) {
        if (typeof t == "string") {
            var i = u.fn.datebox.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.combo(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = u.data(this, "datebox");
            if (e) {
                u.extend(e.options, t);
            } else {
                u.data(this, "datebox", {
                    options: u.extend({}, u.fn.datebox.defaults, u.fn.datebox.parseOptions(this), t)
                });
            }
            a(this);
        });
    };
    u.fn.datebox.methods = {
        options: function(e) {
            var t = e.combo("options");
            return u.extend(u.data(e[0], "datebox").options, {
                originalValue: t.originalValue,
                disabled: t.disabled,
                readonly: t.readonly
            });
        },
        calendar: function(e) {
            return u.data(e[0], "datebox").calendar;
        },
        setValue: function(e, t) {
            return e.each(function() {
                h(this, t);
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = u(this).datebox("options");
                u(this).datebox("setValue", e.originalValue);
            });
        }
    };
    u.fn.datebox.parseOptions = function(e) {
        return u.extend({}, u.fn.combo.parseOptions(e), u.parser.parseOptions(e, [ "sharedCalendar" ]));
    };
    u.fn.datebox.defaults = u.extend({}, u.fn.combo.defaults, {
        panelWidth: 180,
        panelHeight: "auto",
        sharedCalendar: null,
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                t(this);
            },
            query: function(e, t) {
                u(this).combo("textbox").validatebox("disableValidation");
                i(this, e);
            }
        },
        currentText: "Today",
        closeText: "Close",
        okText: "Ok",
        buttons: [ {
            text: function(e) {
                return u(e).datebox("options").currentText;
            },
            handler: function(e) {
                var t = u(e).datebox("options");
                var i = new Date();
                var a = new Date(i.getFullYear(), i.getMonth(), i.getDate());
                u(e).datebox("calendar").calendar({
                    year: a.getFullYear(),
                    month: a.getMonth() + 1,
                    current: a
                });
                n(e, true);
                t.onSelect.call(e, a);
            }
        }, {
            text: function(e) {
                return u(e).datebox("options").closeText;
            },
            handler: function(e) {
                u(this).closest("div.combo-panel").panel("close");
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
            t(e);
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
    u.extend(u.fn.datebox.defaults.rules, {
        datebox: {
            validator: function(e, t) {
                var i = u(this);
                var a = "", n = "";
                if (i.hasClass("dateboxq")) {
                    n = this;
                    a = u.data(n, "dateboxq");
                } else {
                    n = i.closest(".datebox").prev()[0];
                    if (n) {
                        a = u.data(n, "datebox");
                    }
                }
                if (a) {
                    var r = a.options;
                    if (r.validParams == "YM") return true;
                }
                if (t == "YMD") {
                    return o(e);
                }
                return true;
            },
            message: "Please enter a valid date."
        },
        minMaxDate: {
            validator: function(e, t) {
                var i = u(this);
                var a = "", n = "";
                if (i.hasClass("dateboxq")) {
                    n = this;
                    a = u.data(n, "dateboxq");
                } else {
                    n = i.closest(".datebox").prev()[0];
                    if (n) {
                        a = u.data(n, "datebox");
                    }
                }
                if (a) {
                    var r = a.options;
                    var o = r.parser.call(n, e);
                    r.validType.minMaxDate = [ null, null ];
                    if (r.minDate != null || r.maxDate != null) {
                        if (r.minDate == null && r.rules.minMaxDate.messageMax) {
                            r.rules.minMaxDate.message = r.rules.minMaxDate.messageMax;
                        } else if (r.maxDate == null && r.rules.minMaxDate.messageMin) {
                            r.rules.minMaxDate.message = r.rules.minMaxDate.messageMin;
                        } else {
                            r.rules.minMaxDate.message = r.rules.minMaxDate.messageDef;
                        }
                        if (r.minDate != null) r.validType.minMaxDate[0] = r.minDate;
                        if (r.maxDate != null) r.validType.minMaxDate[1] = r.maxDate;
                    } else {
                        r.rules.minMaxDate.message = r.rules.datebox.message;
                    }
                    if (a.calendar) return a.calendar.calendar("options").validator(o, t);
                }
                return true;
            },
            message: "Please enter a valid date.",
            messageDef: "Please enter a valid date."
        }
    });
})(jQuery);

(function(l) {
    function a(a) {
        var e = l.data(a, "datetimebox");
        var i = e.options;
        l(a).datebox(l.extend({}, i, {
            onShowPanel: function() {
                var e = l(a).datetimebox("getValue");
                s(a, e, true);
                i.onShowPanel.call(a);
            },
            formatter: l.fn.datebox.defaults.formatter,
            parser: l.fn.datebox.defaults.parser
        }));
        l(a).removeClass("datebox-f").addClass("datetimebox-f");
        l(a).datebox("calendar").calendar({
            onSelect: function(e) {
                i.onSelect.call(a, e);
            },
            onDblClick: function(e) {
                var t = l(a).datetimebox("options").buttons;
                if (t.length > 1 && t[1].handler) t[1].handler.call(this, a);
                i.onDblClick.call(a, e);
            },
            onKeyDownInCalendar: function(e, t) {
                if (e.keyCode == 13) {
                    var i = l(a).datetimebox("options").buttons;
                    if (i.length > 1 && i[1].handler) i[1].handler.call(this, a);
                }
            }
        });
        var t = l(a).datebox("panel");
        if (!e.spinner) {
            var n = l('<div style="padding:2px"><input style="width:100px;height:24px"></div>').insertAfter(t.children("div.datebox-calendar-inner"));
            e.spinner = n.children("input");
        }
        e.spinner.timespinner({
            showSeconds: i.showSeconds,
            separator: i.timeSeparator
        }).unbind(".datetimebox").bind("mousedown.datetimebox", function(e) {
            e.stopPropagation();
        }).bind("keydown.datetimebox", function(e) {
            if (13 == e.keyCode) {
                var t = l(a).datetimebox("options").buttons;
                if (t.length > 1 && t[1].handler) t[1].handler.call(this, a);
            }
        });
        s(a, i.value);
        l(a).combo("textbox").unbind(".datetimebox").bind("dblclick.datetimebox", function(e) {
            var t = 0, i = 0, a = this, n = "";
            var r = l(a).val();
            if (a.selectionStart != null) {
                t = a.selectionStart;
                i = a.selectionEnd;
                n = r.substring(t, i);
            } else {
                if (a.createTextRange) {
                    var o = a.createTextRange();
                    var s = document.selection.createRange();
                    n = s.text;
                    s.setEndPoint("StartToStart", o);
                    i = s.text.length;
                    if (n.indexOf(" ") > -1) {
                        t = i - n.length;
                    }
                }
            }
            if (t > 0) {
                if (n.indexOf(" ") > -1) {
                    d(l(a), {
                        start: t,
                        end: i - 1
                    });
                }
            }
        });
    }
    function d(e, n) {
        return e.each(function() {
            var e = this;
            var t = n.start;
            var i = n.end;
            if (e.createTextRange) {
                var a = e.createTextRange();
                a.collapse();
                a.moveEnd("character", i);
                a.moveStart("character", t);
                a.select();
            } else {
                e.setSelectionRange(t, i);
            }
            l(this).focus();
        });
    }
    function n(e) {
        var t = l(e).datetimebox("calendar");
        var i = l(e).datetimebox("spinner");
        var a = t.calendar("options").current;
        return new Date(a.getFullYear(), a.getMonth(), a.getDate(), i.timespinner("getHours"), i.timespinner("getMinutes"), i.timespinner("getSeconds"));
    }
    function i(e, t) {
        s(e, t, true);
    }
    function t(e) {
        var t = l.data(e, "datetimebox").options;
        var i = n(e);
        s(e, t.formatter.call(e, i));
    }
    function r(e) {
        if (l(e).datetimebox("panel").closest(".panel.combo-p").css("display") == "block") {
            return;
        }
        if (l(e).combo("textbox").val() == "") {
            s(e, "");
        } else {
            t(e);
        }
    }
    function o(e) {
        t(e);
        l(e).combo("hidePanel");
    }
    function s(a, e, t) {
        var n = l.data(a, "datetimebox").options;
        l(a).combo("setValue", e);
        if (!t) {
            if (e) {
                var i = n.parser.call(a, e);
                l(a).combo("setValue", n.formatter.call(a, i));
                l(a).combo("setText", n.formatter.call(a, i));
            } else {
                l(a).combo("setText", e);
            }
        }
        var i = n.parser.call(a, e);
        l(a).datetimebox("calendar").calendar("moveTo", i);
        l(a).datetimebox("spinner").timespinner("setValue", r(i));
        function r(e) {
            function t(e) {
                return (e < 10 ? "0" : "") + e;
            }
            var i = [ t(e.getHours()), t(e.getMinutes()) ];
            if (n.showSeconds) {
                i.push(t(e.getSeconds()));
            }
            return i.join(l(a).datetimebox("spinner").timespinner("options").separator);
        }
    }
    l.fn.datetimebox = function(t, e) {
        if (typeof t == "string") {
            var i = l.fn.datetimebox.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.datebox(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = l.data(this, "datetimebox");
            if (e) {
                l.extend(e.options, t);
            } else {
                l.data(this, "datetimebox", {
                    options: l.extend({}, l.fn.datetimebox.defaults, l.fn.datetimebox.parseOptions(this), t)
                });
            }
            a(this);
        });
    };
    l.fn.datetimebox.methods = {
        options: function(e) {
            var t = e.datebox("options");
            return l.extend(l.data(e[0], "datetimebox").options, {
                originalValue: t.originalValue,
                disabled: t.disabled,
                readonly: t.readonly
            });
        },
        spinner: function(e) {
            return l.data(e[0], "datetimebox").spinner;
        },
        setValue: function(e, t) {
            return e.each(function() {
                s(this, t);
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = l(this).datetimebox("options");
                l(this).datetimebox("setValue", e.originalValue);
            });
        }
    };
    l.fn.datetimebox.parseOptions = function(e) {
        var t = l(e);
        return l.extend({}, l.fn.datebox.parseOptions(e), l.parser.parseOptions(e, [ "timeSeparator", {
            showSeconds: "boolean"
        } ]));
    };
    l.fn.datetimebox.defaults = l.extend({}, l.fn.datebox.defaults, {
        showSeconds: true,
        timeSeparator: ":",
        keyHandler: {
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                o(this);
            },
            query: function(e, t) {
                i(this, e);
            }
        },
        buttons: [ {
            text: function(e) {
                return l(e).datetimebox("options").currentText;
            },
            handler: function(e) {
                var t = l(e).datetimebox("options");
                var i = new Date();
                l(e).datetimebox("calendar").calendar({
                    year: i.getFullYear(),
                    month: i.getMonth() + 1,
                    current: i
                });
                var a = t.timeSeparator;
                l(e).datetimebox("spinner").timespinner("setValue", i.getHours() + a + i.getMinutes() + a + i.getSeconds());
                o(e);
            }
        }, {
            text: function(e) {
                return l(e).datetimebox("options").okText;
            },
            handler: function(e) {
                o(e);
            }
        }, {
            text: function(e) {
                return l(e).datetimebox("options").closeText;
            },
            handler: function(e) {
                l(this).closest("div.combo-panel").panel("close");
            }
        } ],
        formatter: function(e) {
            var t = e.getHours();
            var i = e.getMinutes();
            var a = e.getSeconds();
            function n(e) {
                return (e < 10 ? "0" : "") + e;
            }
            var r = l(this).datetimebox("spinner").timespinner("options").separator;
            var o = l.fn.datebox.defaults.formatter(e) + " " + n(t) + r + n(i);
            if (l(this).datetimebox("options").showSeconds) {
                o += r + n(a);
            }
            return o;
        },
        parser: function(e) {
            if (l.trim(e) == "") {
                return new Date();
            }
            var t = e.split(" ");
            var i = l.fn.datebox.defaults.parser(t[0]);
            if (t.length < 2) {
                return i;
            }
            var a = l(this).datetimebox("spinner").timespinner("options").separator;
            var n = t[1].split(a);
            var r = parseInt(n[0], 10) || 0;
            var o = parseInt(n[1], 10) || 0;
            var s = parseInt(n[2], 10) || 0;
            return new Date(i.getFullYear(), i.getMonth(), i.getDate(), r, o, s);
        },
        onHidePanel: function() {},
        rules: {},
        onBlur: function(e) {
            r(e);
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
        var o = t.options;
        var s = t.slider;
        var i = o.mode == "h" ? o.rule : o.rule.slice(0).reverse();
        if (o.reversed) {
            i = i.slice(0).reverse();
        }
        a(i);
        function a(e) {
            var t = s.find("div.slider-rule");
            var i = s.find("div.slider-rulelabel");
            t.empty();
            i.empty();
            for (var a = 0; a < e.length; a++) {
                var n = a * 100 / (e.length - 1) + "%";
                var r = $("<span></span>").appendTo(t);
                r.css(o.mode == "h" ? "left" : "top", n);
                if (e[a] != "|") {
                    r = $("<span></span>").appendTo(i);
                    r.html(e[a]);
                    if (o.mode == "h") {
                        r.css({
                            left: n,
                            marginLeft: -Math.round(r.outerWidth() / 2)
                        });
                    } else {
                        r.css({
                            top: n,
                            marginTop: -Math.round(r.outerHeight() / 2)
                        });
                    }
                }
            }
        }
    }
    function buildSlider(n) {
        var a = $.data(n, "slider");
        var r = a.options;
        var o = a.slider;
        o.removeClass("slider-h slider-v slider-disabled");
        o.addClass(r.mode == "h" ? "slider-h" : "slider-v");
        o.addClass(r.disabled ? "slider-disabled" : "");
        o.find("a.slider-handle").draggable({
            axis: r.mode,
            cursor: "pointer",
            disabled: r.disabled,
            onDrag: function(e) {
                var t = e.data.left;
                var i = o.width();
                if (r.mode != "h") {
                    t = e.data.top;
                    i = o.height();
                }
                if (t < 0 || t > i) {
                    return false;
                } else {
                    var a = pos2value(n, t);
                    s(a);
                    return false;
                }
            },
            onBeforeDrag: function() {
                a.isDragging = true;
            },
            onStartDrag: function() {
                r.onSlideStart.call(n, r.value);
            },
            onStopDrag: function(e) {
                var t = pos2value(n, r.mode == "h" ? e.data.left : e.data.top);
                s(t);
                r.onSlideEnd.call(n, r.value);
                r.onComplete.call(n, r.value);
                a.isDragging = false;
            }
        });
        o.find("div.slider-inner").unbind(".slider").bind("mousedown.slider", function(e) {
            if (a.isDragging) {
                return;
            }
            var t = $(this).offset();
            var i = pos2value(n, r.mode == "h" ? e.pageX - t.left : e.pageY - t.top);
            s(i);
            r.onComplete.call(n, r.value);
        });
        function s(e) {
            var t = Math.abs(e % r.step);
            if (t < r.step / 2) {
                e -= t;
            } else {
                e = e - t + r.step;
            }
            setValue(n, e);
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
    $.fn.slider = function(i, e) {
        if (typeof i == "string") {
            return $.fn.slider.methods[i](this, e);
        }
        i = i || {};
        return this.each(function() {
            var e = $.data(this, "slider");
            if (e) {
                $.extend(e.options, i);
            } else {
                e = $.data(this, "slider", {
                    options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), i),
                    slider: init(this)
                });
                $(this).removeAttr("disabled");
            }
            var t = e.options;
            t.min = parseFloat(t.min);
            t.max = parseFloat(t.max);
            t.value = parseFloat(t.value);
            t.step = parseFloat(t.step);
            t.originalValue = t.value;
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

!function(g) {
    "use strict";
    g.fn["bootstrapSwitch"] = function(e) {
        var v = 'input[type!="hidden"]';
        var t = {
            init: function() {
                return this.each(function() {
                    var t = g(this), e, i, a, n, r = t.closest("form"), o = "", s = t.attr("class"), l, d, c = "ON", f = "OFF", u = false, h = false;
                    g.each([ "switch-mini", "switch-small", "switch-large" ], function(e, t) {
                        if (s && s.indexOf(t) >= 0) o = t;
                    });
                    t.addClass("has-switch");
                    if (t.data("on") !== undefined) l = "switch-" + t.data("on");
                    if (t.data("on-label") !== undefined) c = t.data("on-label");
                    if (t.data("off-label") !== undefined) f = t.data("off-label");
                    if (t.data("label-icon") !== undefined) u = t.data("label-icon");
                    if (t.data("text-label") !== undefined) h = t.data("text-label");
                    i = g("<span>").addClass("switch-left").addClass(o).addClass(l).html(c);
                    l = "";
                    if (t.data("off") !== undefined) l = "switch-" + t.data("off");
                    a = g("<span>").addClass("switch-right").addClass(o).addClass(l).html(f);
                    n = g("<label>").html("&nbsp;").addClass(o).attr("for", t.find(v).attr("id"));
                    if (u) {
                        n.html('<i class="icon ' + u + '"></i>');
                    }
                    if (h) {
                        n.html("" + h + "");
                    }
                    e = t.find(v).wrap(g("<div>")).parent().data("animated", false);
                    if (t.data("animated") !== false) e.addClass("switch-animate").data("animated", true);
                    e.append(i).append(n).append(a);
                    t.find(">div").addClass(t.find(v).is(":checked") ? "switch-on" : "switch-off");
                    if (t.find(v).is(":disabled")) g(this).addClass("deactivate");
                    var p = function(e) {
                        if (t.parent("label").is(".label-change-switch")) {} else {
                            e.siblings("label").trigger("mousedown").trigger("mouseup").trigger("click");
                        }
                    };
                    t.on("keydown", function(e) {
                        if (e.keyCode === 32) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            p(g(e.target).find("span:first"));
                        }
                    });
                    i.on("click", function(e) {
                        p(g(this));
                    });
                    a.on("click", function(e) {
                        p(g(this));
                    });
                    t.find(v).on("change", function(e, t) {
                        var i = g(this), a = i.parent(), n = i.is(":checked"), r = a.is(".switch-off");
                        e.preventDefault();
                        a.css("left", "");
                        if (r === n) {
                            if (n) a.removeClass("switch-off").addClass("switch-on"); else a.removeClass("switch-on").addClass("switch-off");
                            if (a.data("animated") !== false) a.addClass("switch-animate");
                            if (typeof t === "boolean" && t) return;
                            a.parent().trigger("switch-change", {
                                el: i,
                                value: n
                            });
                        }
                    });
                    t.find("label").on("mousedown touchstart", function(e) {
                        var t = g(this);
                        d = false;
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        t.closest("div").removeClass("switch-animate");
                        if (t.closest(".has-switch").is(".deactivate")) {
                            t.unbind("click");
                        } else if (t.closest(".switch-on").parent().is(".radio-no-uncheck")) {
                            t.unbind("click");
                        } else {
                            t.on("mousemove touchmove", function(e) {
                                var t = g(this).closest(".make-switch");
                                if (t.length == 0) return;
                                var i = (e.pageX || e.originalEvent.targetTouches[0].pageX) - t.offset().left, a = i / t.width() * 100, n = 25, r = 75;
                                d = true;
                                if (a < n) a = n; else if (a > r) a = r;
                                t.find(">div").css("left", a - r + "%");
                            });
                            t.on("click touchend", function(e) {
                                var t = g(this), i = g(e.target), a = i.siblings("input");
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                t.unbind("mouseleave");
                                if (d) a.prop("checked", !(parseInt(t.parent().css("left")) < -25)); else a.prop("checked", !a.is(":checked"));
                                d = false;
                                a.trigger("change");
                            });
                            t.on("mouseleave", function(e) {
                                var t = g(this), i = t.siblings("input");
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                t.unbind("mouseleave");
                                t.trigger("mouseup");
                                i.prop("checked", !(parseInt(t.parent().css("left")) < -25)).trigger("change");
                            });
                            t.on("mouseup", function(e) {
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                g(this).unbind("mousemove");
                            });
                        }
                    });
                    if (r.data("bootstrapSwitch") !== "injected") {
                        r.bind("reset", function() {
                            setTimeout(function() {
                                r.find(".make-switch").each(function() {
                                    var e = g(this).find(v);
                                    e.prop("checked", e.is(":checked")).trigger("change");
                                });
                            }, 1);
                        });
                        r.data("bootstrapSwitch", "injected");
                    }
                });
            },
            toggleActivation: function() {
                var e = g(this);
                e.toggleClass("deactivate");
                e.find(v).prop("disabled", e.is(".deactivate"));
            },
            isActive: function() {
                return !g(this).hasClass("deactivate");
            },
            setActive: function(e) {
                var t = g(this);
                if (e) {
                    t.removeClass("deactivate");
                    t.find(v).removeAttr("disabled");
                } else {
                    t.addClass("deactivate");
                    t.find(v).attr("disabled", "disabled");
                }
            },
            toggleState: function(e) {
                var t = g(this).find(":checkbox");
                t.prop("checked", !t.is(":checked")).trigger("change", e);
            },
            toggleRadioState: function(e) {
                var t = g(this).find(":radio");
                t.not(":checked").prop("checked", !t.is(":checked")).trigger("change", e);
            },
            toggleRadioStateAllowUncheck: function(e, t) {
                var i = g(this).find(":radio");
                if (e) {
                    i.not(":checked").trigger("change", t);
                } else {
                    i.not(":checked").prop("checked", !i.is(":checked")).trigger("change", t);
                }
            },
            setState: function(e, t) {
                g(this).find(v).prop("checked", e).trigger("change", t);
            },
            setOnLabel: function(e) {
                var t = g(this).find(".switch-left");
                t.html(e);
            },
            setOffLabel: function(e) {
                var t = g(this).find(".switch-right");
                t.html(e);
            },
            setOnClass: function(e) {
                var t = g(this).find(".switch-left");
                var i = "";
                if (e !== undefined) {
                    if (g(this).attr("data-on") !== undefined) {
                        i = "switch-" + g(this).attr("data-on");
                    }
                    t.removeClass(i);
                    i = "switch-" + e;
                    t.addClass(i);
                }
            },
            setOffClass: function(e) {
                var t = g(this).find(".switch-right");
                var i = "";
                if (e !== undefined) {
                    if (g(this).attr("data-off") !== undefined) {
                        i = "switch-" + g(this).attr("data-off");
                    }
                    t.removeClass(i);
                    i = "switch-" + e;
                    t.addClass(i);
                }
            },
            setAnimated: function(e) {
                var t = g(this).find(v).parent();
                if (e === undefined) e = false;
                t.data("animated", e);
                t.attr("data-animated", e);
                if (t.data("animated") !== false) {
                    t.addClass("switch-animate");
                } else {
                    t.removeClass("switch-animate");
                }
            },
            setSizeClass: function(i) {
                var e = g(this);
                var a = e.find(".switch-left");
                var n = e.find(".switch-right");
                var r = e.find("label");
                g.each([ "switch-mini", "switch-small", "switch-large" ], function(e, t) {
                    if (t !== i) {
                        a.removeClass(t);
                        n.removeClass(t);
                        r.removeClass(t);
                    } else {
                        a.addClass(t);
                        n.addClass(t);
                        r.addClass(t);
                    }
                });
            },
            status: function() {
                return g(this).find(v).is(":checked");
            },
            destroy: function() {
                var e = g(this), t = e.find("div"), i = e.closest("form"), a;
                t.find(":not(input)").remove();
                a = t.children();
                a.unwrap().unwrap();
                a.unbind("change");
                if (i) {
                    i.unbind("reset");
                    i.removeData("bootstrapSwitch");
                }
                return a;
            }
        };
        if (t[e]) return t[e].apply(this, Array.prototype.slice.call(arguments, 1)); else if (typeof e === "object" || !e) return t.init.apply(this, arguments); else g.error("Method " + e + " does not exist!");
    };
}(jQuery);

!function(w, Z, Y) {
    "use strict";
    !function(e) {
        "function" == typeof define && define.amd ? define([ "jquery" ], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(w.jQuery);
    }(function(v) {
        function a(e) {
            if (v && v.hisui && v.hisui.getTrans) return v.hisui.getTrans(e);
            return e;
        }
        function t() {
            if (v && v.fn && v.fn.window && v.fn.window.defaults && v.fn.window.defaults.zIndex) {
                v.fn.window.defaults.zIndex++;
                return v.fn.window.defaults.zIndex;
            }
            return 8999;
        }
        function n(e, t) {
            return this.$element = v(e), t && ("string" === v.type(t.delay) || "number" === v.type(t.delay)) && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), this.options = v.extend({}, d, t), this._defaults = d, this._name = l, 
            this._targetclick = !1, this.init(), f.push(this.$element), this;
        }
        var l = "webuiPopover", g = "webui-popover", b = "webui.popover", d = {
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
            "async": {
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
        }, m = g + "-rtl", f = [], r = v('<div class="webui-popover-backdrop"></div>'), e = 0, u = !1, S = -2e3, o = v(Z), i = function(e, t) {
            return isNaN(e) ? t || 0 : Number(e);
        }, h = function(e) {
            return e.data("plugin_" + l);
        }, p = function() {
            for (var e = null, t = 0; t < f.length; t++) e = h(f[t]), e && e.hide(!0);
            o.trigger("hiddenAll." + b);
        }, s = function(e) {
            for (var t = null, i = 0; i < f.length; i++) t = h(f[i]), t && t.id !== e.id && t.hide(!0);
            o.trigger("hiddenAll." + b);
        }, c = "ontouchstart" in Z.documentElement && /Mobi/.test(navigator.userAgent), x = function(e) {
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
        n.prototype = {
            init: function() {
                if (this.$element[0] instanceof Z.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                "manual" !== this.getTrigger() && (c ? this.$element.off("touchend", this.options.selector).on("touchend", this.options.selector, v.proxy(this.toggle, this)) : "click" === this.getTrigger() ? this.$element.off("click", this.options.selector).on("click", this.options.selector, v.proxy(this.toggle, this)) : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave click", this.options.selector).on("mouseenter", this.options.selector, v.proxy(this.mouseenterHandler, this)).on("mouseleave", this.options.selector, v.proxy(this.mouseleaveHandler, this))), 
                this._poped = !1, this._inited = !0, this._opened = !1, this._idSeed = e, 
                this.id = l + this._idSeed, this.options.container = v(this.options.container || Z.body).first(), 
                this.options.backdrop && r.appendTo(this.options.container).hide(), 
                e++, "sticky" === this.getTrigger() && this.show(), this.options.selector && (this._options = v.extend({}, this.options, {
                    selector: ""
                }));
            },
            destroy: function() {
                for (var e = -1, t = 0; t < f.length; t++) if (f[t] === this.$element) {
                    e = t;
                    break;
                }
                f.splice(e, 1), this.hide(), this.$element.data("plugin_" + l, null), 
                "click" === this.getTrigger() ? this.$element.off("click") : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave"), 
                this.$target && this.$target.remove();
            },
            getDelegateOptions: function() {
                var i = {};
                return this._options && v.each(this._options, function(e, t) {
                    d[e] !== t && (i[e] = t);
                }), i;
            },
            hide: function(e, t) {
                if ((e || "sticky" !== this.getTrigger()) && this._opened) {
                    t && (t.preventDefault(), t.stopPropagation()), this.xhr && this.options.abortXHR === !0 && (this.xhr.abort(), 
                    this.xhr = null);
                    var i = v.Event("hide." + b);
                    if (this.$element.trigger(i, [ this.$target ]), this.$target) {
                        this.$target.removeClass("in").addClass(this.getHideAnimation());
                        var a = this;
                        setTimeout(function() {
                            a.$target.hide(), a.getCache() || a.$target.remove();
                        }, a.getHideDelay());
                    }
                    this.options.backdrop && r.hide(), this._opened = !1, this.$element.trigger("hidden." + b, [ this.$target ]), 
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
                var t = v(e).data("plugin_" + l);
                return t || (t = new n(e, this.getDelegateOptions()), v(e).data("plugin_" + l, t)), 
                t;
            },
            toggle: function(e) {
                var t = this;
                e && (e.preventDefault(), e.stopPropagation(), this.options.selector && (t = this.delegate(e.currentTarget))), 
                t[t.getTarget().hasClass("in") ? "hide" : "show"]();
            },
            hideAll: function() {
                p();
            },
            hideOthers: function() {
                s(this);
            },
            show: function() {
                if (!this._opened) {
                    var e = this.getTarget().removeClass().addClass(g).addClass(this._customTargetClass).css("zIndex", t());
                    if (this.options.multi || this.hideOthers(), !this.getCache() || !this._poped || "" === this.content) {
                        if (this.content = "", this.setTitle(this.getTitle()), this.options.closeable || e.find(".close").off("click").remove(), 
                        this.isAsync() ? this.setContentASync(this.options.content) : this.setContent(this.getContent()), 
                        this.canEmptyHide() && "" === this.content) return;
                        e.show();
                    }
                    this.displayContent(), this.options.onShow && this.options.onShow(e), 
                    this.bindBodyEvents(), this.options.backdrop && r.show(), this._opened = !0, 
                    this.resetAutoHide();
                }
            },
            displayContent: function() {
                var e = this.getElementPosition(), t = this.getTarget().removeClass().addClass(g).addClass(this._customTargetClass), i = this.getContentElement(), a = t[0].offsetWidth, n = t[0].offsetHeight, r = "bottom", o = v.Event("show." + b);
                if (this.canEmptyHide()) {
                    var s = i.children().html();
                    if (null !== s && 0 === s.trim().length) return;
                }
                this.$element.trigger(o, [ t ]);
                var l = this.$element.data("width") || this.options.width;
                "" === l && (l = this._defaults.width), "auto" !== l && t.width(l);
                var d = this.$element.data("height") || this.options.height;
                "" === d && (d = this._defaults.height), "auto" !== d && i.height(d), 
                this.options.style && this.$target.addClass(g + "-" + this.options.style), 
                "rtl" !== this.options.direction || i.hasClass(m) || i.addClass(m), 
                this.options.arrow || t.find(".webui-arrow").remove(), t.detach().css({
                    top: S,
                    left: S,
                    display: "block"
                }), this.getAnimation() && t.addClass(this.getAnimation()), t.appendTo(this.options.container), 
                r = this.getPlacement(e), this.$element.trigger("added." + b), this.initTargetEvents(), 
                this.options.padding || ("auto" !== this.options.height && i.css("height", i.outerHeight()), 
                this.$target.addClass("webui-no-padding")), this.options.maxHeight && i.css("maxHeight", this.options.maxHeight), 
                this.options.maxWidth && i.css("maxWidth", this.options.maxWidth), 
                a = t[0].offsetWidth, n = t[0].offsetHeight;
                var c = this.getTargetPositin(e, r, a, n);
                if (this.$target.css(c.position).addClass(r).addClass("in"), "iframe" === this.options.type) {
                    var f = t.find("iframe"), u = t.width(), h = f.parent().height();
                    "" !== this.options.iframeOptions.width && "auto" !== this.options.iframeOptions.width && (u = this.options.iframeOptions.width), 
                    "" !== this.options.iframeOptions.height && "auto" !== this.options.iframeOptions.height && (h = this.options.iframeOptions.height), 
                    f.width(u).height(h);
                }
                if (this.options.arrow || this.$target.css({
                    margin: 0
                }), this.options.arrow) {
                    var p = this.$target.find(".webui-arrow");
                    p.removeAttr("style"), "left" === r || "right" === r ? p.css({
                        top: this.$target.height() / 2
                    }) : ("top" === r || "bottom" === r) && p.css({
                        left: this.$target.width() / 2
                    }), c.arrowOffset && (-1 === c.arrowOffset.left || -1 === c.arrowOffset.top ? p.hide() : p.css(c.arrowOffset));
                }
                this._poped = !0, this.$element.trigger("shown." + b, [ this.$target ]);
            },
            isTargetLoaded: function() {
                return 0 === this.getTarget().find("i.glyphicon-refresh").length;
            },
            getTriggerElement: function() {
                return this.$element;
            },
            getTarget: function() {
                if (!this.$target) {
                    var e = l + this._idSeed;
                    this.$target = v(this.options.template).attr("id", e), this._customTargetClass = this.$target.attr("class") !== g ? this.$target.attr("class") : null, 
                    this.getTriggerElement().attr("data-target", e);
                }
                return this.$target.data("trigger-element") || this.$target.data("trigger-element", this.getTriggerElement()), 
                this.$target;
            },
            removeTarget: function() {
                this.$target.remove(), this.$target = null, this.$contentElement = null;
            },
            getTitleElement: function() {
                return this.getTarget().find("." + g + "-title");
            },
            getContentElement: function() {
                return this.$contentElement || (this.$contentElement = this.getTarget().find("." + g + "-content")), 
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
                return i(this.$element.attr("data-offset-top")) || this.options.offsetTop;
            },
            getOffsetLeft: function() {
                return i(this.$element.attr("data-offset-left")) || this.options.offsetLeft;
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
                e ? ("rtl" !== this.options.direction || t.hasClass(m) || t.addClass(m), 
                t.html(a(e))) : t.remove();
            },
            hasContent: function() {
                return this.getContent();
            },
            canEmptyHide: function() {
                return this.options.hideEmpty && "html" === this.options.type;
            },
            getIframe: function() {
                var t = v("<iframe></iframe>").attr("src", this.getUrl()), i = this;
                return v.each(this._defaults.iframeOptions, function(e) {
                    "undefined" != typeof i.options.iframeOptions[e] && t.attr(e, i.options.iframeOptions[e]);
                }), t;
            },
            getContent: function() {
                if (this.getUrl()) switch (this.options.type) {
                  case "iframe":
                    this.content = this.getIframe();
                    break;

                  case "html":
                    try {
                        this.content = v(this.getUrl()), this.content.is(":visible") || this.content.show();
                    } catch (w) {
                        throw new Error("Unable to get popover content. Invalid selector specified.");
                    }
                } else if (!this.content) {
                    var e = "";
                    if (e = v.isFunction(this.options.content) ? this.options.content.apply(this.$element[0], [ this ]) : this.options.content, 
                    this.content = this.$element.attr("data-content") || e, !this.content) {
                        var t = this.$element.next();
                        t && t.hasClass(g + "-content") && (this.content = t);
                    }
                }
                return this.content;
            },
            setContent: function(e) {
                var t = this.getTarget(), i = this.getContentElement();
                "string" == typeof e ? i.html(a(e)) : e instanceof v && (i.html(""), 
                this.options.cache ? e.removeClass(g + "-content").appendTo(i) : e.clone(!0, !0).removeClass(g + "-content").appendTo(i)), 
                this.$target = t;
            },
            isAsync: function() {
                return "async" === this.options.type;
            },
            setContentASync: function(i) {
                var a = this;
                this.xhr || (this.xhr = v.ajax({
                    url: this.getUrl(),
                    type: this.options["async"].type,
                    cache: this.getCache(),
                    beforeSend: function(e, t) {
                        a.options["async"].before && a.options["async"].before(a, e, t);
                    },
                    success: function(e) {
                        a.bindBodyEvents(), i && v.isFunction(i) ? a.content = i.apply(a.$element[0], [ e ]) : a.content = e, 
                        a.setContent(a.content);
                        var t = a.getContentElement();
                        t.removeAttr("style"), a.displayContent(), a.options["async"].success && a.options["async"].success(a, e);
                    },
                    complete: function() {
                        a.xhr = null;
                    },
                    error: function(e, t) {
                        a.options["async"].error && a.options["async"].error(a, e, t);
                    }
                }));
            },
            bindBodyEvents: function() {
                u || (this.options.dismissible && "click" === this.getTrigger() ? c ? o.off("touchstart.webui-popover").on("touchstart.webui-popover", v.proxy(this.bodyTouchStartHandler, this)) : (o.off("keyup.webui-popover").on("keyup.webui-popover", v.proxy(this.escapeHandler, this)), 
                o.off("click.webui-popover").on("click.webui-popover", v.proxy(this.bodyClickHandler, this))) : "hover" === this.getTrigger() && o.off("touchend.webui-popover").on("touchend.webui-popover", v.proxy(this.bodyClickHandler, this)));
            },
            mouseenterHandler: function(e) {
                var t = this;
                e && this.options.selector && (t = this.delegate(e.currentTarget)), 
                t._timeout && clearTimeout(t._timeout), t._enterTimeout = setTimeout(function() {
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
                var t = this, i = v(e.currentTarget);
                i.on("touchend", function(e) {
                    t.bodyClickHandler(e), i.off("touchend");
                }), i.on("touchmove", function() {
                    i.off("touchend");
                });
            },
            bodyClickHandler: function(e) {
                u = !0;
                for (var t = !0, i = 0; i < f.length; i++) {
                    var a = h(f[i]);
                    if (a && a._opened) {
                        var n = a.getTarget().offset(), r = n.left, o = n.top, s = n.left + a.getTarget().width(), l = n.top + a.getTarget().height(), d = x(e), c = d.x >= r && d.x <= s && d.y >= o && d.y <= l;
                        if (c) {
                            t = !1;
                            break;
                        }
                    }
                }
                t && p();
            },
            initTargetEvents: function() {
                "hover" === this.getTrigger() && this.$target.off("mouseenter mouseleave").on("mouseenter", v.proxy(this.mouseenterHandler, this)).on("mouseleave", v.proxy(this.mouseleaveHandler, this)), 
                this.$target.find(".close").off("click").on("click", v.proxy(this.hide, this, !0));
            },
            getPlacement: function(e) {
                var t, i = this.options.container, a = i.innerWidth(), n = i.innerHeight(), r = i.scrollTop(), o = i.scrollLeft(), s = Math.max(0, e.left - o), l = Math.max(0, e.top - r);
                t = "function" == typeof this.options.placement ? this.options.placement.call(this, this.getTarget()[0], this.$element[0]) : this.$element.data("placement") || this.options.placement;
                var d = "horizontal" === t, c = "vertical" === t, f = "auto" === t || d || c;
                return f ? t = a / 3 > s ? n / 3 > l ? d ? "right-bottom" : "bottom-right" : 2 * n / 3 > l ? c ? n / 2 >= l ? "bottom-right" : "top-right" : "right" : d ? "right-top" : "top-right" : 2 * a / 3 > s ? n / 3 > l ? d ? a / 2 >= s ? "right-bottom" : "left-bottom" : "bottom" : 2 * n / 3 > l ? d ? a / 2 >= s ? "right" : "left" : n / 2 >= l ? "bottom" : "top" : d ? a / 2 >= s ? "right-top" : "left-top" : "top" : n / 3 > l ? d ? "left-bottom" : "bottom-left" : 2 * n / 3 > l ? c ? n / 2 >= l ? "bottom-left" : "top-left" : "left" : d ? "left-top" : "top-left" : "auto-top" === t ? t = a / 3 > s ? "top-right" : 2 * a / 3 > s ? "top" : "top-left" : "auto-bottom" === t ? t = a / 3 > s ? "bottom-right" : 2 * a / 3 > s ? "bottom" : "bottom-left" : "auto-left" === t ? t = n / 3 > l ? "left-top" : 2 * n / 3 > l ? "left" : "left-bottom" : "auto-right" === t && (t = n / 3 > l ? "right-bottom" : 2 * n / 3 > l ? "right" : "right-top"), 
                t;
            },
            getElementPosition: function() {
                var e = this.$element[0].getBoundingClientRect(), t = this.options.container, i = t.css("position");
                if (t.is(Z.body) || "static" === i) return v.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth || e.width,
                    height: this.$element[0].offsetHeight || e.height
                });
                if ("fixed" === i) {
                    var a = t[0].getBoundingClientRect();
                    return {
                        top: e.top - a.top + t.scrollTop(),
                        left: e.left - a.left + t.scrollLeft(),
                        width: e.width,
                        height: e.height
                    };
                }
                return "relative" === i ? {
                    top: this.$element.offset().top - t.offset().top,
                    left: this.$element.offset().left - t.offset().left,
                    width: this.$element[0].offsetWidth || e.width,
                    height: this.$element[0].offsetHeight || e.height
                } : void 0;
            },
            getTargetPositin: function(e, t, i, a) {
                var n = e, r = this.options.container, o = this.$element.outerWidth(), s = this.$element.outerHeight(), l = Z.documentElement.scrollTop + r.scrollTop(), d = Z.documentElement.scrollLeft + r.scrollLeft(), c = {}, f = null, u = this.options.arrow ? 20 : 0, h = 10, p = u + h > o ? u : 0, v = u + h > s ? u : 0, g = 0, b = Z.documentElement.clientHeight + l, m = Z.documentElement.clientWidth + d, x = n.left + n.width / 2 - p > 0, C = n.left + n.width / 2 + p < m, w = n.top + n.height / 2 - v > 0, Y = n.top + n.height / 2 + v < b;
                switch (t) {
                  case "bottom":
                    c = {
                        top: n.top + n.height,
                        left: n.left + n.width / 2 - i / 2
                    };
                    break;

                  case "top":
                    c = {
                        top: n.top - a,
                        left: n.left + n.width / 2 - i / 2
                    };
                    break;

                  case "left":
                    c = {
                        top: n.top + n.height / 2 - a / 2,
                        left: n.left - i
                    };
                    break;

                  case "right":
                    c = {
                        top: n.top + n.height / 2 - a / 2,
                        left: n.left + n.width
                    };
                    break;

                  case "top-right":
                    c = {
                        top: n.top - a,
                        left: x ? n.left - p : h
                    }, f = {
                        left: x ? Math.min(o, i) / 2 + p : S
                    };
                    break;

                  case "top-left":
                    g = C ? p : -h, c = {
                        top: n.top - a,
                        left: n.left - i + n.width + g
                    }, f = {
                        left: C ? i - Math.min(o, i) / 2 - p : S
                    };
                    break;

                  case "bottom-right":
                    c = {
                        top: n.top + n.height,
                        left: x ? n.left - p : h
                    }, f = {
                        left: x ? Math.min(o, i) / 2 + p : S
                    };
                    break;

                  case "bottom-left":
                    g = C ? p : -h, c = {
                        top: n.top + n.height,
                        left: n.left - i + n.width + g
                    }, f = {
                        left: C ? i - Math.min(o, i) / 2 - p : S
                    };
                    break;

                  case "right-top":
                    g = Y ? v : -h, c = {
                        top: n.top - a + n.height + g,
                        left: n.left + n.width
                    }, f = {
                        top: Y ? a - Math.min(s, a) / 2 - v : S
                    };
                    break;

                  case "right-bottom":
                    c = {
                        top: w ? n.top - v : h,
                        left: n.left + n.width
                    }, f = {
                        top: w ? Math.min(s, a) / 2 + v : S
                    };
                    break;

                  case "left-top":
                    g = Y ? v : -h, c = {
                        top: n.top - a + n.height + g,
                        left: n.left - i
                    }, f = {
                        top: Y ? a - Math.min(s, a) / 2 - v : S
                    };
                    break;

                  case "left-bottom":
                    c = {
                        top: w ? n.top - v : h,
                        left: n.left - i
                    }, f = {
                        top: w ? Math.min(s, a) / 2 + v : S
                    };
                }
                return c.top += this.getOffsetTop(), c.left += this.getOffsetLeft(), 
                {
                    position: c,
                    arrowOffset: f
                };
            }
        }, v.fn[l] = function(t, i) {
            var a = [], e = this.each(function() {
                var e = v.data(this, "plugin_" + l);
                e ? "destroy" === t ? e.destroy() : "string" == typeof t && a.push(e[t]()) : (t ? "string" == typeof t ? "destroy" !== t && (i || (e = new n(this, null), 
                a.push(e[t]()))) : "object" == typeof t && (e = new n(this, t)) : e = new n(this, null), 
                v.data(this, "plugin_" + l, e));
            });
            return a.length ? a : e;
        };
        var C = function() {
            var e = function() {
                p();
            }, t = function(e, t) {
                t = t || {}, v(e).webuiPopover(t);
            }, i = function(e) {
                var i = !0;
                return v(e).each(function(e, t) {
                    i = i && v(t).data("plugin_" + l) !== Y;
                }), i;
            }, a = function(e, t) {
                debugger;
                t ? v(e).webuiPopover(t).webuiPopover("show") : v(e).webuiPopover("show");
            }, n = function(e) {
                v(e).webuiPopover("hide");
            }, r = function(e) {
                d = v.extend({}, d, e);
            }, o = function(e, t) {
                var i = v(e).data("plugin_" + l);
                if (i) {
                    var a = i.getCache();
                    i.options.cache = !1, i.options.content = t, i._opened ? (i._opened = !1, 
                    i.show()) : i.isAsync() ? i.setContentASync(t) : i.setContent(t), 
                    i.options.cache = a;
                }
            }, s = function(e, t) {
                var i = v(e).data("plugin_" + l);
                if (i) {
                    var a = i.getCache(), n = i.options.type;
                    i.options.cache = !1, i.options.url = t, i._opened ? (i._opened = !1, 
                    i.show()) : (i.options.type = "async", i.setContentASync(i.content)), 
                    i.options.cache = a, i.options.type = n;
                }
            };
            return {
                show: a,
                hide: n,
                create: t,
                isCreated: i,
                hideAll: e,
                updateContent: o,
                updateContentAsync: s,
                setDefaultOptions: r
            };
        }();
        w.WebuiPopovers = C;
    });
}(window, document);

(function(o) {
    function i(e) {
        var t = o(e).empty();
        var i = o.data(e, "switchbox").options;
        var a = false;
        if (i.onText != "" && i.offText != "") {
            var n = parseInt(i.onText.length) + parseInt(i.offText.length);
            if (i.onText.length != i.offText.length) {
                a = true;
            }
        }
        if (!t.hasClass("has-switch")) {
            var r = "";
            if (i.disabled) {
                r += " disabled ";
            }
            if (i.checked) {
                r += " checked ";
            }
            t.append('<input type="checkbox"' + r + ">");
        }
        if (i.size == "mini") {
            t.addClass("switch-mini");
        } else if (i.size == "small") {
            t.addClass("switch-small");
        } else if (i.size == "large") {
            t.addClass("switch-large");
        }
        t.attr("data-on", i.onClass);
        t.attr("data-off", i.offClass);
        t.attr("data-on-label", i.onText);
        t.attr("data-off-label", i.offText);
        t.attr("data-animated", i.animated);
        t.bootstrapSwitch();
        if (a) t.width(n * 20);
        t.bind("switch-change", function(e, t) {
            if (!i.disabled) {
                i.onSwitchChange.call(this, e, t);
            }
            return false;
        });
    }
    o.fn.switchbox = function(t, e) {
        if (typeof t == "string") {
            return o.fn.switchbox.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = o.data(this, "switchbox");
            if (e) {
                o.extend(e.options, t);
            } else {
                o.data(this, "switchbox", {
                    options: o.extend({}, o.fn.switchbox.defaults, o.fn.switchbox.parseOptions(this), t)
                });
                o(this).removeAttr("disabled");
            }
            i(this);
        });
    };
    o.fn.switchbox.methods = {
        options: function(e) {
            return o.data(e[0], "switchbox").options;
        },
        toggleActivation: function(e) {
            return e.each(function() {
                o(this).bootstrapSwitch("toggleActivation");
            });
        },
        isActive: function(e) {
            return e.eq(0).bootstrapSwitch("isActive");
        },
        setActive: function(e, t) {
            return e.each(function() {
                o(this).bootstrapSwitch("setActive", t);
            });
        },
        toggle: function(e) {
            return e.each(function() {
                o(this).bootstrapSwitch("toggleState");
            });
        },
        setValue: function(e, t, i) {
            return e.each(function() {
                o(this).bootstrapSwitch("setState", t, i || true);
            });
        },
        getValue: function(e) {
            return e.eq(0).bootstrapSwitch("status");
        },
        setOnText: function(e, t) {
            return e.each(function() {
                o(this).bootstrapSwitch("setOnLabel", t);
            });
        },
        setOffText: function(e, t) {
            return e.each(function() {
                o(this).bootstrapSwitch("setOffLabel", t);
            });
        },
        setOnClass: function(e, t) {
            return e.each(function() {
                o(this).bootstrapSwitch("setOnClass", t);
            });
        },
        setOffClass: function(e, t) {
            return e.each(function() {
                o(this).bootstrapSwitch("setOffClass", t);
            });
        },
        destroy: function(e) {
            return e.each(function() {
                o(this).bootstrapSwitch("destroy");
            });
        }
    };
    o.fn.switchbox.parseOptions = function(e) {
        var t = o(e);
        return o.extend({}, o.parser.parseOptions(e, [ "id", "iconCls", "iconAlign", "group", "size", {
            plain: "boolean",
            toggle: "boolean",
            selected: "boolean"
        } ]), {
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    o.fn.switchbox.defaults = {
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

(function(c) {
    function f(e) {
        var t = c("input[name='" + e + "']");
        if (t.length > 0) {
            var i = t.last()[0];
            var a = c.data(i, "checkbox");
            if (a) {
                var n = a.proxy;
                c(n).tooltip("hide");
            }
        }
    }
    function u(e) {
        var t = c("input[name='" + e + "']");
        if (t.length > 0) {
            if (t.last().next().hasClass("invalid")) {
                var i = t.last()[0];
                var a = c.data(i, "checkbox");
                if (a) {
                    var n = a.options;
                    var r = a.proxy;
                    c(r).tooltip(c.extend({}, n.tipOptions, {
                        content: n.missingMessage,
                        position: n.tipPosition,
                        deltaX: n.deltaX
                    })).tooltip("show");
                    a.tip = true;
                }
            }
        }
    }
    function n(e) {
        var t = c.data(e, "checkbox");
        if (!t) return false;
        var i = t.options;
        if (i.name) {
            var a = c(e).next();
            if (i.novalidate || a.is(":disabled")) {
                return true;
            }
            var n = c("input[name='" + i.name + "']");
            n.next().removeClass("invalid");
            var r = n.filter(":checked");
            if (r.length == 0 && i.required) {
                n.next().addClass("invalid");
                return false;
            }
        }
        return true;
    }
    function i(a) {
        var i = c(a).empty();
        var e = c.data(a, "checkbox");
        var n = e.options;
        if (!n.id) {
            n.id = n.label;
            i.attr("id", n.id);
        }
        i.prop("disabled", n.disabled);
        i.prop("checked", n.checked);
        if (!i.hasClass("checkbox-f")) {
            n.originalValue = i.prop("checked");
            i.addClass("checkbox-f");
            var t = a.className.replace("hisui-checkbox", "").replace("checkbox-f", "");
            var r = '<label class="checkbox ' + t;
            if (n.boxPosition == "right") {
                r += " right";
            }
            if (n.disabled) {
                r += " disabled";
            }
            if (n.checked) {
                r += " checked";
            }
            r += '"';
            if (n.width) {
                r += ' style="width:' + n.width + 'px" ';
            }
            r += ">" + c.hisui.getTrans(n.label) + "</label>";
            var o = c(r).insertAfter(i);
            o.unbind("click").bind("click.checkbox", function(e) {
                if (c(a).prop("disabled") == false) h(a, !c(this).hasClass("checked"));
            });
            i.unbind("click").bind("click.checkbox", function(e) {
                var t = c(this).is(":checked");
                if (t) {
                    if (n.onChecked) n.onChecked.call(this, e, true);
                    if (n.ifChecked) n.ifChecked.call(this, e, true);
                } else {
                    if (n.onUnchecked) n.onUnchecked.call(this, e, false);
                    if (n.ifUnchecked) n.ifUnchecked.call(this, e, false);
                }
                if (n.onCheckChange) n.onCheckChange.call(this, e, t);
                if (n.ifToggled) n.ifToggled.call(this, e, t);
                i.trigger("ifChanged");
            });
            var s = c('label[for="' + n.id + '"]').add(i.closest("label"));
            if (s.length) {
                s.off(".checkbox").on("click.checkbox mouseover.checkbox mouseout.checkbox ", function(e) {
                    var t = e["type"], i = c(this);
                    if (!c(a).prop("disabled")) {
                        if (t == "click") {
                            if (c(e.target).is("a")) {
                                return;
                            }
                            h(a, !o.hasClass("checked"));
                        } else {
                            if (/ut|nd/.test(t)) {
                                o.removeClass("hover");
                            } else {
                                o.addClass("hover");
                            }
                        }
                        return false;
                    }
                });
            }
            e.proxy = o;
        } else {
            var o = e.proxy;
            if (n.disabled && !o.hasClass("disabled")) o.addClass("disabled");
            if (!n.disabled && o.hasClass("disabled")) o.removeClass("disabled");
            if (n.checked && !o.hasClass("checked")) o.addClass("checked");
            if (!n.checked && o.hasClass("checked")) o.removeClass("checked");
            var l = c.hisui.getTrans(n.label);
            if (l != o.text()) o.text(l);
        }
        if (n.required) {
            o.unbind("mouseenter").bind("mouseenter.checkbox", function(e) {
                var t = c(this);
                if (!t.hasClass("disabled")) {
                    u(n.name);
                }
            }).unbind("mouseleave").bind("mouseleave.checkbox", function(e) {
                var t = c(this);
                if (!t.hasClass("disabled")) {
                    f(n.name);
                }
            });
        }
        if (n.name && !i.attr("name")) {
            i.attr("name", n.name);
        }
        var d = c.data(a, "checkbox");
        c.data(a, "checkbox", d);
        i.hide();
    }
    function a(e) {
        var t = (c.data(e, "checkbox") || c.data(e, "radio") || {})["proxy"];
        if (t) {
            var i = c.data(e, "checkbox");
            if (i) i.options.checked = c(e).prop("checked");
            if (c(e).prop("checked") && !t.hasClass("checked")) t.addClass("checked");
            if (!c(e).prop("checked") && t.hasClass("checked")) t.removeClass("checked");
            n(e);
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > -1) {
            var a = t;
            a.css("background-position", "-6px 0px");
            if (a.hasClass("checked") && a.hasClass("disabled")) {
                a.css("background-position", "-6px -96px");
                return;
            }
            if (a.hasClass("checked")) {
                a.css("background-position", "-6px -48px");
            }
            if (a.hasClass("disabled")) {
                a.css("background-position", "-6px -72px");
            }
            if (a.hasClass("invalid")) {
                a.css("background-position", "-6px -240px");
            }
        }
    }
    c.fn.checkbox = function(t, e) {
        if (typeof t == "string") {
            return c.fn.checkbox.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = c.data(this, "checkbox");
            if (e) {
                c.extend(e.options, t);
            } else {
                c.data(this, "checkbox", {
                    options: c.extend({}, c.fn.checkbox.defaults, c.fn.checkbox.parseOptions(this), t)
                });
            }
            i(this);
            n(this);
        });
    };
    function h(e, t) {
        if (t != c(e).is(":checked")) {
            if (c(e).prop("disabled") == true) {
                c(e).prop("disabled", false);
                c(e).prop("checked", t);
                c(e).prop("disabled", true);
            }
            var i = (c.data(e, "checkbox") || c.data(e, "radio") || {})["proxy"];
            if (t) {
                i.addClass("checked");
            } else {
                i.removeClass("checked");
            }
            c(e).trigger("click.checkbox");
        }
        a(e);
    }
    function t(e) {
        return c(e).is(":checked");
    }
    function r(e, t) {
        t = t == true;
        var i = c.data(e, "checkbox") || c.data(e, "radio") || {};
        var a = i.proxy;
        if (a) {
            c(e).prop("disabled", t);
            if (t) a.addClass("disabled"); else a.removeClass("disabled");
            i.options.disabled = t;
            c(e).trigger("ifChanged");
        }
    }
    function o(e, t) {
        c(e).checkbox({
            required: t
        });
    }
    c.fn.checkbox.methods = {
        options: function(e) {
            return c.data(e[0], "checkbox").options;
        },
        setValue: function(e, t) {
            return e.each(function() {
                h(this, t);
                a(this);
            });
        },
        getValue: function(e) {
            return t(e[0]);
        },
        setDisable: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        check: function(e) {
            return e.each(function() {
                h(this, true);
            });
        },
        uncheck: function(e) {
            return e.each(function() {
                h(this, false);
            });
        },
        toggle: function(e) {
            return e.each(function() {
                h(this, !t(this));
            });
        },
        disable: function(e) {
            return e.each(function() {
                r(this, true);
            });
        },
        enable: function(e) {
            return e.each(function() {
                r(this, false);
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
                h(this, false);
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = c(this).checkbox("options").originalValue || false;
                h(this, e);
            });
        },
        isValid: function(e) {
            var t = false;
            e.each(function() {
                t = n(this);
            });
            return t;
        },
        setRequired: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        }
    };
    c.fn.checkbox.parseOptions = function(e) {
        var t = c(e);
        return c.extend({}, c.parser.parseOptions(e, [ "label", "name", "id", "checked", "width", "required" ]), {
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    c.fn.checkbox.defaults = {
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
                c(this).tooltip("destroy");
            }
        }
    };
})(jQuery);

(function(d) {
    function c(e) {
        var t = d("input[name='" + e + "']");
        if (t.length > 0) {
            var i = t.last()[0];
            var a = d.data(i, "radio");
            if (a) {
                var n = a.proxy;
                d(n).tooltip("hide");
            }
        }
    }
    function f(e) {
        var t = d("input[name='" + e + "']");
        if (t.length > 0) {
            if (t.last().next().hasClass("invalid")) {
                var i = t.last()[0];
                var a = d.data(i, "radio");
                if (a) {
                    var n = a.options;
                    var r = a.proxy;
                    d(r).tooltip(d.extend({}, n.tipOptions, {
                        content: n.missingMessage,
                        position: n.tipPosition,
                        deltaX: n.deltaX
                    })).tooltip("show");
                    a.tip = true;
                }
            }
        }
    }
    function n(e) {
        var t = d.data(e, "radio");
        if (!t) return false;
        var i = t.options;
        if (i.name) {
            var a = d(e).next();
            if (i.novalidate || a.is(":disabled")) {
                return true;
            }
            var n = d("input[name='" + i.name + "']");
            n.next("label").removeClass("invalid");
            c(i.name);
            var r = n.filter(":checked");
            if (r.length == 0 && i.required) {
                n.next("label").addClass("invalid");
                return false;
            }
        }
        return true;
    }
    function i(a) {
        var e = d(a).empty();
        var t = d.data(a, "radio");
        var i = t.options;
        if (!i.id) {
            i.id = i.label;
            e.attr("id", i.id);
        }
        if (i.name != "") e.attr("name", i.name);
        e.prop("disabled", i.disabled);
        e.prop("checked", i.checked);
        if (!e.hasClass("radio-f")) {
            i.originalValue = e.prop("checked");
            var n = i.requiredSel;
            e.addClass("radio-f");
            var r = '<label class="radio';
            if (i.boxPosition == "right") {
                r += " right";
            }
            if (i.radioClass) {
                r += " hischeckbox_square-blue";
            }
            if (i.disabled) {
                r += " disabled";
            }
            if (i.checked) {
                r += " checked";
            }
            r += '">' + d.hisui.getTrans(i.label) + "</label>";
            var o = d(r).insertAfter(e);
            o.unbind("click").bind("click.radio", function(e) {
                var t = d(this);
                if (!t.hasClass("disabled")) {
                    u(a, !t.hasClass("checked"), !n);
                }
            });
            e.unbind("click").bind("click.radio", function(e) {
                if (d(this).prop("disabled") == false) {
                    var t = d(this).is(":checked");
                    if (t) {
                        if (i.onChecked) i.onChecked.call(this, e, true);
                    } else {}
                    if (i.onCheckChange) i.onCheckChange.call(this, e, t);
                }
            }).bind("ifChecked", function(e, t) {
                if (!d(this).prop("disabled")) {
                    if (i.onChecked) i.onChecked.call(this, e, t);
                }
                return false;
            }).bind("ifUnchecked", function(e, t) {
                if (!d(this).prop("disabled")) {
                    if (i.onUnchecked) i.onUnchecked.call(this, e, t);
                }
                return false;
            }).bind("ifToggled", function(e, t) {
                if (!d(this).prop("disabled")) {
                    if (i.onCheckChange) i.onCheckChange.call(this, e, t);
                }
                return false;
            });
            var s = d('label[for="' + i.id + '"]').add(e.closest("label"));
            if (s.length) {
                s.off(".radio").on("click.radio mouseover.radio mouseout.radio ", function(e) {
                    var t = e["type"], i = d(this);
                    if (!d(a).prop("disabled")) {
                        if (t == "click") {
                            if (d(e.target).is("a")) {
                                return;
                            }
                            u(a, !o.hasClass("checked"), !n);
                        } else {
                            if (/ut|nd/.test(t)) {
                                o.removeClass("hover");
                            } else {
                                o.addClass("hover");
                            }
                        }
                        return false;
                    }
                });
            }
            t.proxy = o;
        } else {
            var o = t.proxy;
            if (i.disabled && !o.hasClass("disabled")) o.addClass("disabled");
            if (!i.disabled && o.hasClass("disabled")) o.removeClass("disabled");
            if (i.checked && !o.hasClass("checked")) o.addClass("checked");
            if (!i.checked && o.hasClass("checked")) o.removeClass("checked");
            if (d.hisui.getTrans(i.label) != o.text()) o.text(d.hisui.getTrans(i.label));
        }
        if (i.required) {
            o.unbind("mouseenter").bind("mouseenter.radio", function(e) {
                var t = d(this);
                if (!t.hasClass("disabled")) {
                    f(i.name);
                }
            }).unbind("mouseleave").bind("mouseleave.radio", function(e) {
                var t = d(this);
                if (!t.hasClass("disabled")) {
                    c(i.name);
                }
            });
        }
        if (i.name && !e.attr("name")) {
            e.attr("name", i.name);
        }
        var l = d.data(a, "radio");
        d.data(a, "radio", l);
        e.hide();
        status.validating = true;
    }
    function l(e) {
        var t = (d.data(e, "radio") || d.data(e, "checkbox") || {})["proxy"];
        if (t) {
            var i = d.data(e, "radio");
            if (i) i.options.checked = d(e).prop("checked");
            if (d(e).prop("checked") && !t.hasClass("checked")) t.addClass("checked");
            if (!d(e).prop("checked") && t.hasClass("checked")) t.removeClass("checked");
            n(e);
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > -1 && !t.hasClass("hischeckbox_square-blue")) {
            var a = t;
            a.css("background-position", "0px -120px");
            if (a.hasClass("checked") && a.hasClass("disabled")) {
                a.css("background-position", "0px -216px");
                return;
            }
            if (a.hasClass("checked")) {
                a.css("background-position", "0px -168px");
            }
            if (a.hasClass("disabled")) {
                a.css("background-position", "0px -192px");
            }
            if (a.hasClass("invalid")) {
                a.css("background-position", "0px -264px");
            }
        }
    }
    d.fn.radio = function(t, e) {
        if (typeof t == "string") {
            return d.fn.radio.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = d.data(this, "radio");
            if (e) {
                d.extend(e.options, t);
            } else {
                d.data(this, "radio", {
                    options: d.extend({}, d.fn.radio.defaults, d.fn.radio.parseOptions(this), t)
                });
            }
            i(this);
            n(this);
        });
    };
    function u(e, t, i) {
        var a = d(e);
        if (t != a.is(":checked")) {
            var n = (d.data(e, "radio") || d.data(e, "checkbox") || {})["proxy"];
            if (t == true) {
                var r = d(e).attr("name");
                if (r) {
                    var o = a.closest("form"), s = 'input[name="' + r + '"]';
                    s = o.length ? o.find(s) : d(s);
                    s.each(function() {
                        if (this !== e && d.data(this, "radio")) {
                            u(this, false, true);
                        }
                    });
                }
                n.addClass("checked");
                d(e).prop("checked", true).trigger("ifChecked", true).trigger("ifToggled", true);
            } else {
                if (i) {
                    n.removeClass("checked");
                    d(e).prop("checked", false).trigger("ifUnchecked", false).trigger("ifToggled", false);
                }
            }
        }
        l(e);
    }
    function t(e) {
        return d(e).is(":checked");
    }
    function a(e, t) {
        t = t == true;
        var i = d.data(e, "radio") || d.data(e, "checkbox") || {};
        var a = i.proxy;
        if (a) {
            d(e).prop("disabled", t);
            if (t) a.addClass("disabled"); else a.removeClass("disabled");
            i.options.disabled = t;
        }
    }
    function r(e, t) {
        d(e).radio({
            required: t
        });
    }
    d.fn.radio.methods = {
        options: function(e) {
            return d.data(e[0], "radio").options;
        },
        setValue: function(e, t) {
            return e.each(function() {
                u(this, t, true);
            });
        },
        getValue: function(e) {
            return t(e[0]);
        },
        setDisable: function(e, t) {
            return e.each(function() {
                a(this, t);
            });
        },
        check: function(e) {
            return e.each(function() {
                u(this, true, true);
            });
        },
        uncheck: function(e) {
            return e.each(function() {
                u(this, false, true);
            });
        },
        toggle: function(e) {
            return e.each(function() {
                u(this, !t(this), true);
            });
        },
        disable: function(e) {
            return e.each(function() {
                a(this, true);
            });
        },
        enable: function(e) {
            return e.each(function() {
                a(this, false);
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
                u(this, false, true);
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = d(this).radio("options").originalValue || false;
                u(this, e, true);
            });
        },
        isValid: function(e) {
            var t = false;
            e.each(function() {
                t = n(this);
            });
            return t;
        },
        setRequired: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        }
    };
    d.fn.radio.parseOptions = function(e) {
        var t = d(e);
        return d.extend({}, d.parser.parseOptions(e, [ "label", "id", "name", "checked", "required" ]), {
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    d.fn.radio.defaults = {
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
                d(this).tooltip("destroy");
            }
        },
        requiredSel: false
    };
})(jQuery);

(function(c) {
    c.parser.plugins.push("filebox");
    var f = 0;
    function a(e) {
        var t = c.data(e, "filebox");
        var i = t.options;
        i.fileboxId = "filebox_file_id_" + ++f;
        c(e).addClass("filebox-f").hide();
        var a = c('<span class="filebox">' + '<input class="filebox-text" autocomplete="off">' + '<input type="hidden" class="filebox-value">' + "</span>").insertAfter(e);
        var n = c(e).attr("name");
        if (n) {
            a.find("input.filebox-value").attr("name", n);
            c(e).removeAttr("name").attr("fileboxName", n);
        }
        if (i.plain) a.addClass("filebox-plain");
        if (i.disabled) a.addClass("disabled");
        if (!i.buttonText) a.addClass("filebox-no-txet");
        if (i.buttonAlign == "left") a.addClass("filebox-left");
        var r = "filebox-button";
        if (c(e).hasClass("showicon")) {
            r += " showicon";
        }
        var o = c('<a href="javascript:;" class="' + r + '"></a>').prependTo(a);
        o.addClass("filebox-button-" + i.buttonAlign).linkbutton({
            text: i.buttonText,
            iconCls: i.buttonIcon,
            onClick: function() {
                i.onClickButton.call(e);
            },
            disabled: i.disabled
        });
        var s = a.find("input.filebox-text");
        s.attr("readonly", "readonly").attr("placeholder", i.prompt || "");
        t.filebox = c(e).next();
        var l = u(e);
        if (o.length) {
            c('<label class="filebox-label" for="' + i.fileboxId + '"></label>').appendTo(o);
            if (o.linkbutton("options").disabled) {
                l.attr("disabled", "disabled");
            } else {
                l.removeAttr("disabled");
            }
        }
        a._outerWidth(i.width)._outerHeight(i.height);
        var d = a.width() - o.outerWidth();
        s._outerWidth(d).css({
            height: a.height() + "px",
            lineHeight: a.height() + "px",
            marginLeft: (i.buttonAlign == "left" ? o.outerWidth() : 0) + "px"
        });
    }
    function u(t) {
        var e = c.data(t, "filebox");
        var i = e.options;
        e.filebox.find(".filebox-value").remove();
        i.oldValue = "";
        var a = c('<input type="file" class="filebox-value">').appendTo(e.filebox);
        a.attr("id", i.fileboxId).attr("name", c(t).attr("fileboxName") || "");
        a.attr("accept", i.accept);
        a.attr("capture", i.capture);
        if (i.multiple) {
            a.attr("multiple", "multiple");
        }
        a.change(function() {
            var e = this.value;
            if (this.files) {
                e = c.map(this.files, function(e) {
                    return e.name;
                }).join(i.separator);
            }
            c(t).filebox("setText", e);
            i.onChange.call(t, e, i.oldValue);
            i.oldValue = e;
        });
        return a;
    }
    function t(e) {
        var t = c.data(e, "filebox");
        var i = t.options;
        var a = t.filebox;
        a.addClass("disabled");
        var n = a.find(".filebox-button");
        n.linkbutton("disable");
        var r = a.find(".filebox-value");
        r.attr("disabled", "disabled");
        i.disabled = true;
    }
    function i(e) {
        var t = c.data(e, "filebox");
        var i = t.options;
        var a = t.filebox;
        a.removeClass("disabled");
        var n = a.find(".filebox-button");
        n.linkbutton("enable");
        var r = a.find(".filebox-value");
        r.removeAttr("disabled");
        i.disabled = false;
    }
    c.fn.filebox = function(t, e) {
        if (typeof t == "string") {
            var i = c.fn.filebox.methods[t];
            return i(this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = c.data(this, "filebox");
            if (e) {
                c.extend(e.options, t);
            } else {
                c.data(this, "filebox", {
                    options: c.extend({}, c.fn.filebox.defaults, c.fn.filebox.parseOptions(this), t)
                });
            }
            a(this);
        });
    };
    c.fn.filebox.methods = {
        options: function(e) {
            return c.data(e[0], "filebox").options;
        },
        clear: function(e) {
            return e.each(function() {
                u(this);
                c(this).filebox("setText", "");
            });
        },
        reset: function(e) {
            return e.each(function() {
                c(this).filebox("clear");
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
        setText: function(e, t) {
            return e.each(function() {
                c.data(this, "filebox").filebox.find(".filebox-text").val(t);
            });
        },
        button: function(e) {
            return c.data(e[0], "filebox").filebox.find(".filebox-button");
        },
        disable: function(e) {
            return e.each(function() {
                t(this);
            });
        },
        enable: function(e) {
            return e.each(function() {
                i(this);
            });
        }
    };
    c.fn.filebox.parseOptions = function(e) {
        var t = c(e);
        return c.extend({}, c.parser.parseOptions(e, [ "width", "height", "prompt", "accept", "capture", "separator" ]), {
            multiple: t.attr("multiple") ? true : undefined,
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    c.fn.filebox.defaults = c.extend({}, {
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

(function(o) {
    function i(e) {
        var t = o(e);
        var i = o.data(e, "popover").options;
        if (!i.id) {
            i.id = i.label;
            t.attr("id", i.id);
        }
        t.prop("disabled", i.disabled);
        if (!i.cache) t.webuiPopover("destroy");
        t.webuiPopover(i);
    }
    function n(e) {
        var t = o.data(e, "popover").options;
        if (t.width === "auto") {
            var i = o(e).data().plugin_webuiPopover.options.template;
            var a = t.title;
            var n = t.content;
            var r = o('<div class="webui-popover top in" id="tempPopover" style="display: block; top: 451.6px; left: 11.375px; visibility:hidden">' + '<div class="webui-arrow" style="left: 199px;"></div>' + '<div class="webui-popover-inner">' + '<h3 class="webui-popover-title">' + a + "</h3>" + '<div class="webui-popover-content">' + n + "</div></div></div>").appendTo("body").width();
            o(e).data().plugin_webuiPopover.options.template = i.replace('"webui-popover-inner"', '"webui-popover-inner" style="width: ' + r + 'px"');
            o("#tempPopover").remove();
        }
    }
    o.fn.popover = function(t, e) {
        if (typeof t == "string") {
            return o.fn.popover.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = o.data(this, "popover");
            if (e) {
                o.extend(e.options, t);
            } else {
                o.data(this, "popover", {
                    options: o.extend({}, o.fn.popover.defaults, o.fn.popover.parseOptions(this), t)
                });
            }
            i(this);
            n(this);
        });
    };
    o.fn.popover.methods = {
        options: function(e) {
            return o.data(e[0], "popover").options;
        },
        show: function(e) {
            return e.each(function() {
                var e = o(this);
                e.webuiPopover("show");
            });
        },
        hide: function(e) {
            return e.each(function() {
                var e = o(this);
                if (!o.data(this, "popover").options.cache) {
                    e.webuiPopover("destroy");
                } else {
                    e.webuiPopover("hide");
                }
            });
        },
        destroy: function(e) {
            return e.each(function() {
                o(this).webuiPopover("destroy");
            });
        },
        setContent: function(e, a) {
            return e.each(function() {
                var e = o.data(this, "popover").options.cache;
                if (o.data(this, "popover").options.cache) {
                    o.data(this, "popover").options.cache = false;
                }
                var t = o(this);
                var i = o.data(this, "popover").options;
                i.content = a;
                t.webuiPopover("destroy");
                t.webuiPopover(i);
                n(this);
                o.data(this, "popover").options.cache = e;
            });
        }
    };
    o.fn.popover.parseOptions = function(e) {
        var t = o(e);
        return o.extend({}, o.parser.parseOptions(e, [ "id" ]), {
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    o.fn.popover.defaults = {
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
        "async": {
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

(function(s) {
    function t(e, t) {
        var i = s(t);
        if (i.hasClass("bginone")) return false;
        var a = e.pageX;
        var n = i._outerWidth();
        var r = i.offset();
        if (a < r.left + n && a > r.left + n - 40) {
            return true;
        }
        return false;
    }
    function i(e, t) {
        s(e)._outerWidth(t);
    }
    function l(e) {
        var t = s(s.hisui.globalContainerSelector);
        if (t.length > 0 && s.data(t[0], "data")) {
            var i = s.data(t[0], "data");
            var a = i.qState;
            clearTimeout(i.offsettimer);
            i.offsettimer = null;
            if ("undefined" == typeof e) {
                e = i.srcTargetDom;
            }
        }
        if (t.is(":visible")) {
            var n = s.data(e, "comboq") || a;
            if (n) {
                var r = n.options;
                n.isShow = false;
                r.onHidePanel.call(this, e);
            }
            s(e).removeClass("comboq-active");
            s(s.hisui.globalContainerSelector).hide();
            return s(e);
        }
        if ("undefined" != typeof e) return s(e);
        return null;
    }
    function a(e) {
        n(e, "");
        r(e, "");
    }
    function n(e, t) {
        var i = s.data(e, "comboq");
        if (t != s(e).val()) {
            s(e).val(t);
            s(e).comboq("validate");
            i.previousValue = t;
        }
    }
    function r(e, t) {
        var i = s.data(e, "comboq");
        var a = i.options;
        var n = s(e).data("value");
        if (t != n) {
            a.onChange.call(e, t, n);
            s(e).data("value", t);
            s(e).comboq("validate");
            i.originalRealValue = t;
        }
    }
    function o(a) {
        var n = s.data(a, "comboq");
        var r = n.options;
        var o = s(a);
        o.addClass("comboq");
        o.attr("autocomplete", "off");
        if (s.isNumeric(r.width)) o._outerWidth(r.width);
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
        s(document).unbind(".comboq").bind("mousedown.comboq", function(e) {
            var t = s(e.target).closest("input.comboq");
            if (t.length > 0 && s.data(t[0], "comboq").isShow) {
                return;
            }
            var i = s(e.target).closest(s.hisui.globalContainerSelector);
            if (i.length) {
                return;
            }
            if (s(s.hisui.globalContainerSelector).is(":visible")) l();
        });
        o.unbind(".comboq").bind("mousemove.comboq", function(e) {
            if (s(this).hasClass("disabled")) return;
            if (s(this).hasClass("readonly")) return;
            if (t(e, this)) {
                this.style.cursor = "pointer";
                s(this).addClass("comboq-arrow-hover");
            } else {
                this.style.cursor = "auto";
                s(this).removeClass("comboq-arrow-hover");
            }
        }).bind("mouseleave.comboq", function() {
            this.style.cursor = "auto";
            s(this).removeClass("comboq-arrow-hover");
        }).bind("click.comboq", function(e) {
            if (s(this).hasClass("disabled")) return;
            if (s(this).hasClass("readonly")) return;
            if (t(e, this)) {
                e.preventDefault();
                e.stopPropagation();
                c(this);
                return false;
            }
        }).bind("blur.comboq", function(e) {
            if (r.onBlur) r.onBlur.call(this, a);
        }).bind("keydown.comboq paste.comboq drop.comboq input.comboq compositionend.comboq", function(i) {
            if (navigator.userAgent.indexOf("MWBrowser/2") == -1 && "undefined" == typeof i.keyCode) {
                return;
            }
            switch (i.keyCode) {
              case 38:
                r.keyHandler.up.call(a, i);
                break;

              case 40:
                if (!s(s.hisui.globalContainerSelector).is(":visible")) {
                    if (false == c(this)) return;
                }
                r.keyHandler.down.call(a, i);
                break;

              case 37:
                r.keyHandler.left.call(a, i);
                break;

              case 39:
                r.keyHandler.right.call(a, i);
                break;

              case 33:
                r.keyHandler.pageUp.call(a, i);
                break;

              case 34:
                r.keyHandler.pageDown.call(a, i);
                break;

              case 13:
                setTimeout(function() {
                    if (r.editable) {
                        if (n.timer) {
                            clearTimeout(n.timer);
                        }
                        if (r.minQueryLen > 0 && o.val().length < r.minQueryLen) return;
                        n.timer = setTimeout(function() {
                            if (!n.isShow) {
                                var e = s(a).comboq("showPanel");
                                if (e == false) return;
                            }
                            r.keyHandler.enter.call(a, i);
                        }, r.delay);
                    }
                }, 0);
                break;

              case 9:
              case 27:
                l();
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
                            if (!n.isShow) {
                                var e = s(a).comboq("showPanel");
                                if (e == false) return;
                            }
                            var t = o.val();
                            if (n.previousValue != t) {
                                n.previousValue = t;
                                r.keyHandler.query.call(a, o.val(), i);
                                s(a).comboq("validate");
                            }
                        }, r.delay);
                    }
                }, 0);
            }
        });
        return;
    }
    function d(e, t) {
        if (t) {
            s(e).addClass("disabled");
            s(e).prop("disabled", true);
        } else {
            s(e).removeClass("disabled");
            s(e).prop("disabled", false);
        }
    }
    function c(e) {
        var t = s(e);
        var i = s.data(e, "comboq");
        var a = i.options;
        if (a.onBeforeShowPanel.call(e) === false) return false;
        var n = s(s.hisui.globalContainerSelector);
        if (n.length > 0) {
            n.empty();
        } else {
            n = s('<div id="' + s.hisui.globalContainerId + '"></div>').appendTo("body");
        }
        n.height(a.panelHeight);
        n.css("z-index", s.fn.window.defaults.zIndex++);
        if (!a.panelWidth) {
            a.panelWidth = t._outerWidth();
        }
        n.width(a.panelWidth);
        i.isShow = true;
        n.show();
        s.data(document.getElementById(s.hisui.globalContainerId), "data", {
            srcTargetDom: e,
            qState: i
        });
        a.onShowPanel.call(e);
        t.addClass("comboq-active");
        s.hisui.fixPanelTLWH();
    }
    s.fn.comboq = function(i, e) {
        if (typeof i == "string") {
            var t = s.fn.comboq.methods[i];
            if (t) {
                return t(this, e);
            } else {
                return this.validatebox(i, e);
            }
        }
        i = i || {};
        return this.each(function() {
            var e = s.data(this, "comboq");
            if (e) {
                s.extend(e.options, i);
            } else {
                e = s.data(this, "comboq", {
                    isShow: false,
                    options: s.extend({}, s.fn.comboq.defaults, s.fn.comboq.parseOptions(this), i),
                    previousValue: null
                });
                var t = o(this);
            }
        });
    };
    s.fn.comboq.methods = {
        options: function(e) {
            return s.data(e[0], "comboq").options;
        },
        panel: function(e) {
            return s(s.hisui.globalContainerSelector);
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
            return c(e[0]);
        },
        hidePanel: function(e) {
            return l();
        },
        setDisabled: function(e, t) {
            return e.each(function() {
                d(this, t);
            });
        },
        disable: function(e) {
            return e.each(function() {
                d(this, true);
            });
        },
        enable: function(e) {
            return e.each(function() {
                d(this, false);
            });
        },
        readonly: function(e, t) {
            return e.each(function() {
                if (t) {
                    s(this).addClass("readonly");
                } else {
                    s(this).removeClass("readonly");
                }
                s(this).prop("readonly", t);
            });
        },
        isValid: function(e) {
            return e.validatebox("isValid");
        },
        clear: function(e) {
            return e.each(function() {
                a(this);
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = s.data(this, "comboq").options;
                if (e.multiple) {
                    s(this).comboq("setValues", e.originalRealValue);
                    s(this).comboq("setText", e.originalValue);
                } else {
                    s(this).comboq("setValue", e.originalRealValue);
                    s(this).comboq("setText", e.originalValue);
                }
            });
        },
        getText: function(e) {
            return e.val();
        },
        setText: function(e, t) {
            return e.each(function() {
                n(this, t);
            });
        },
        getValues: function(e) {
            return e.data("value");
        },
        setValues: function(e, t) {
            return e.each(function() {
                if (s.isArray(t) && t.length > 0) r(this, t[0]); else {
                    r(this, "");
                }
            });
        },
        getValue: function(e) {
            return e.data("value");
        },
        setValue: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        createPanelBody: function() {
            var e = s(s.hisui.globalContainerSelector);
            if (e.length) {
                e.empty();
            } else {
                e = s('<div id="' + s.hisui.globalContainerId + '"></div>').appendTo("body");
            }
            return s("<div></div>").appendTo(e);
        }
    };
    s.fn.comboq.parseOptions = function(e) {
        var t = s(e);
        return s.extend({}, s.fn.validatebox.parseOptions(e), s.parser.parseOptions(e, [ "blurValidValue", "width", "height", "separator", "panelAlign", {
            panelWidth: "number",
            editable: "boolean",
            hasDownArrow: "boolean",
            delay: "number",
            selectOnNavigation: "boolean"
        } ]), {
            panelHeight: t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined,
            multiple: t.attr("multiple") ? true : undefined,
            disabled: t.attr("disabled") ? true : undefined,
            readonly: t.attr("readonly") ? true : undefined,
            value: t.val() || undefined
        });
    };
    s.fn.comboq.defaults = s.extend({}, s.fn.validatebox.defaults, {
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
    s(window).on("blur", function() {
        l();
    });
})(jQuery);

(function(g) {
    function t(e, t) {
        var i = g.data(e, "lookup");
        var a = i.options;
        var n = i.grid;
        if (!n) return;
        var r = n.datagrid("getRows").length;
        if (!r) {
            return;
        }
        var o = a.finder.getTr(n[0], null, "highlight");
        if (!o.length) {
            o = a.finder.getTr(n[0], null, "selected");
        }
        var s;
        if (!o.length) {
            s = t == "next" ? 0 : r - 1;
        } else {
            var s = parseInt(o.attr("datagrid-row-index"));
            s += t == "next" ? 1 : -1;
            if (s < 0) {
                s = r - 1;
            }
            if (s >= r) {
                s = 0;
            }
        }
        n.datagrid("highlightRow", s);
        if (a.selectOnNavigation) {
            i.remainText = false;
            n.datagrid("selectRow", s);
        }
    }
    function i(e, t) {
        var i = g.data(e, "lookup");
        var a = i.options;
        var n = i.grid;
        t = t == "prev" ? "prev" : "next";
        var r = n.datagrid("getPager").find(".l-btn-icon.pagination-" + t);
        if (r.parents(".l-btn-disabled").length == 0) {
            r.click();
        }
    }
    function u(e, t, i) {
        var a = g.data(e, "lookup");
        var n = a.options;
        var r = a.grid;
        var o = [];
        var s = n;
        var l = s.onChange;
        s.onChange = function() {};
        r.datagrid("clearSelections");
        for (var d = 0; d < t.length; d++) {
            o.push(t[d]);
        }
        s.onChange = l;
        if (!i) {
            var c = o.join(n.separator);
            if (g(e).lookup("getText") != c) {
                g(e).lookup("setText", c);
            }
        }
    }
    function d(a, e, t) {
        var i = g.data(a, "lookup");
        var n = i.options;
        var r = i.grid;
        var o = g(a).comboq("panel");
        if (n.isCombo && n.enableNumberEvent) {
            if (t.shiftKey) return;
            if (t.ctrlKey) return;
            var s = t.keyCode;
            if (h(i) && o.is(":visible")) {
                var l = r.datagrid("getRows");
                if (l && l.length > 0) {
                    var d = -1;
                    if ("undefined" == typeof s && t.type == "input") {
                        if (",1,2,3,4,5,6,7,8,9,".indexOf(t.originalEvent.data) > -1) {
                            s = t.originalEvent.data.charCodeAt(0);
                        }
                    }
                    if (s <= 57 && s >= 49) {
                        d = s - 49;
                    } else if (s <= 105 && s >= 97) {
                        d = s - 97;
                    }
                    if (d > -1 && l.length > d) {
                        r.datagrid("selectRow", d);
                        return false;
                    }
                }
            }
        }
        i.remainText = true;
        if (n.multiple && !e) {
            u(a, [], true);
        } else {
            u(a, [ e ], true);
        }
        if (n.mode == "remote") {
            r.datagrid("clearSelections");
            r.datagrid("load", g.extend({}, n.queryParams, {
                q: e
            }));
        } else {
            if (!e) {
                return;
            }
            r.datagrid("clearSelections").datagrid("highlightRow", -1);
            var c = r.datagrid("getRows");
            var f = n.multiple ? e.split(n.separator) : [ e ];
            g.map(f, function(i) {
                i = g.trim(i);
                if (i) {
                    g.map(c, function(e, t) {
                        if (i == e[n.textField]) {
                            r.datagrid("selectRow", t);
                        } else {
                            if (n.filter.call(a, i, e)) {
                                r.datagrid("highlightRow", t);
                            }
                        }
                    });
                }
            });
        }
    }
    function h(e) {
        var t = false;
        try {
            if (e.grid && e.grid.datagrid("options").lookup) t = true;
        } catch (i) {}
        return t;
    }
    function a(e, t) {
        var i = g.data(e, "lookup");
        var a = i.options;
        var n = i.grid;
        var r = g(e).comboq("panel");
        if (h(i) && r.is(":visible")) {
            var o = n.datagrid("options").queryParams.q;
            if (o == g(e).lookup("getText")) {
                var s = a.finder.getTr(n[0], null, "highlight");
                if (s.length) {
                    var l = parseInt(s.attr("datagrid-row-index"));
                    n.datagrid("selectRow", l);
                    return;
                }
            }
            d(e, g(e).lookup("getText"), t);
        } else {
            g(e).comboq("hidePanel");
            g(e).comboq("showPanel");
        }
        return;
    }
    function c(e, t, i, a) {
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
    function f(e, t, i) {
        var a = g(e);
        var n = g.data(e, "lookup");
        var r = n.options;
        var o = g(g.hisui.globalContainerSelector);
        if (!o.is(":visible")) return;
        var s = o._outerHeight();
        if (r.panelHeightFix) {
            var l = document.documentElement.clientHeight;
            var d = a.offset();
            var c = d.top - document.documentElement.scrollTop;
            var f = l - c - a._outerHeight();
            if (c > f) {
                s = c;
            } else {
                s = f;
            }
            if (t.datagrid("getPanel").find(".datagrid-view2 .datagrid-btable").eq(0).length > 0) {
                var u = t.datagrid("getPanel").find(".datagrid-view2 .datagrid-btable").eq(0)[0].scrollHeight + i;
                var h = 36 + 18;
                var p = t.datagrid("getPanel").find(".datagrid-view2 .datagrid-body");
                if (p.length > 0 && p[0].scrollWidth != p[0].clientWidth) {
                    h += 18;
                }
                var v = t.datagrid("getPanel").find(".datagrid-pager");
                if (v.length > 0) {
                    h += v._outerHeight();
                }
                if (s > u + h) {
                    s = u + h;
                }
            }
            if (s > r.panelMaxHeight) {
                s = r.panelMaxHeight;
            }
            if (s < r.panelMinHeight) {
                s = r.panelMinHeight;
            }
            s = s - 18;
        }
        return s;
    }
    function o(e, t, i) {
        var a = g(g.hisui.globalContainerSelector);
        if (a.is(":visible")) {
            var n = g.data(e, "lookup");
            var r = n.options;
            if (r.rowSummaryHeight > 0 && a.find(".lookup-rowSummary").length > 0) {
                a.find(".lookup-rowSummary").children().remove();
                g(t).appendTo(g(".lookup-rowSummary"));
            } else {
                a.find(".lookup-rowSummary").remove();
                var o = g('<div class="lookup-rowSummary">' + t + "</div>").appendTo(a);
                if (r.rowSummaryHeight == 0) r.rowSummaryHeight = o._outerHeight();
                g(".lookup-rowSummary").css("height", r.rowSummaryHeight).css("overflow", "auto");
            }
            var s = f(e, i, r.rowSummaryHeight);
            var l = s - r.rowSummaryHeight;
            c(a, i, s, l);
            g.hisui.fixPanelTLWH();
        }
        return;
    }
    function n(a) {
        var i = g.data(a, "lookup");
        var n = i.options;
        if ("function" == typeof n.selectRowRender) {
            n.fit = false;
            n.panelHeightFix = true;
        } else {
            n.fit = true;
        }
        if (!h(i)) {
            var r = g(a).comboq("createPanelBody");
            if (!n.columns && typeof n.columnsLoader == "function") n.columns = n.columnsLoader(a);
            if ("undefined" == typeof $LOOKUPBTOOLBAR) $LOOKUPBTOOLBAR = {};
            if ("string" == typeof n.btoolbar && n.btoolbar != "" && "undefined" == typeof $LOOKUPBTOOLBAR[n.btoolbar]) {
                $LOOKUPBTOOLBAR[n.btoolbar] = g(n.btoolbar)[0].outerHTML;
            }
            if (g(n.btoolbar).length == 0 && $LOOKUPBTOOLBAR[n.btoolbar] != "") {
                n.btoolbar = $LOOKUPBTOOLBAR[n.btoolbar];
            }
            r.datagrid(g.extend({}, n, {
                title: n.gridTitle || "",
                width: 400,
                height: 300,
                rownumbers: true,
                lazy: true,
                border: false,
                singleSelect: !n.multiple,
                onBeforeLoad: function(e) {
                    var t = g(g.hisui.globalContainerSelector);
                    c(t, r);
                    return n.onBeforeLoad.apply(a, arguments);
                },
                onLoadSuccess: function(e) {
                    if (i.panel.is(":visible")) {
                        if (n.forceFocus) {
                            g(a).focus();
                        }
                        var t = f(a, r, 0);
                        c(g(g.hisui.globalContainerSelector), r, t, t);
                        r.datagrid("highlightRow", 0);
                    }
                    n.onLoadSuccess.apply(a, arguments);
                },
                onSelect: function(e, t) {
                    var i = n.onChange;
                    n.onChange = function() {};
                    if (t) {
                        g(a).comboq("setText", t[n.textField]);
                        g(a).comboq("setValue", t[n.idField]);
                    }
                    n.onChange = i;
                    if (false !== n.onSelect.call(this, e, t)) {
                        g(a).comboq("hidePanel");
                    }
                },
                onHighlightRow: function(e, t) {
                    if ("function" == typeof n.selectRowRender) {
                        var i = n.selectRowRender.call(this, t);
                        if (typeof i != "string") i = "";
                        o(a, i, r);
                    }
                },
                clickDelay: 200,
                lookup: g(a)
            }));
            i.grid = r;
        }
        if (n.minQueryLen < 0) {
            n.minQueryLen = 0;
        }
        var e = g(a).lookup("getText");
        i.grid.datagrid("load", g.extend({}, n.queryParams, {
            q: e
        }));
    }
    function r(e) {
        var t = g.data(e, "lookup");
        var i = t.options;
        var a = g(e);
        a.addClass("lookup");
        a.comboq(g.extend({}, i, {
            onShowPanel: function() {
                t.panel = g(e).comboq("panel");
                n(e);
                i.onShowPanel.call(e);
            }
        }));
    }
    g.fn.lookup = function(t, e) {
        if (typeof t == "string") {
            var i = g.fn.lookup.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return g(this).comboq(t, e);
            }
        }
        t = t || {};
        t.originalValue = t.value;
        return this.each(function() {
            var e = g.data(this, "lookup");
            if (e) {
                g.extend(e.options, t);
            } else {
                e = g.data(this, "lookup", {
                    options: g.extend({}, g.fn.lookup.defaults, g.fn.lookup.parseOptions(this), t)
                });
                r(this);
            }
        });
    };
    g.fn.lookup.methods = {
        options: function(e) {
            return g.data(e[0], "lookup").options;
        },
        grid: function(e) {
            return g.data(e[0], "lookup").grid;
        },
        clear: function(e) {
            return e.each(function() {
                var e = g.data(this, "lookup");
                if (e) {
                    if (h(e)) g(this).lookup("grid").datagrid("clearSelections");
                    g(this).lookup("setText", "");
                    g(this).lookup("setValue", "");
                }
            });
        }
    };
    g.fn.lookup.parseOptions = function(e) {
        return g.extend({}, g.fn.comboq.parseOptions(e), g.fn.datagrid.parseOptions(e), g.parser.parseOptions(e, [ "idField", "textField", "mode", {
            isCombo: "boolean",
            minQueryLen: "number"
        } ]));
    };
    g.fn.lookup.defaults = g.extend({}, g.fn.comboq.defaults, g.fn.datagrid.defaults, {
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
                a(this, e);
            },
            query: function(e, t) {
                d(this, e, t);
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
        filter: function(e, t) {
            var i = g(this).lookup("options");
            return t[i.textField].toLowerCase().indexOf(e.toLowerCase()) == 0;
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

(function(s) {
    function o(e, t) {
        var i = s.data(e, "keywords").options;
        var a = i.items;
        var n = t.split("-");
        if (n.length == 1) {
            return a[n[0]];
        }
        if (n.length == 2) {
            return a[n[0]].items[n[1]];
        }
        if (n.length == 3) {
            return a[n[0]].items[n[1]].items[n[2]];
        }
    }
    function i(a) {
        var e = s(a).empty();
        var r = s.data(a, "keywords").options;
        if (r.labelCls != "blue") e.addClass("keywords-label" + r.labelCls);
        var o = "";
        s.each(r.items, function(n, i) {
            if (i.type == "chapter") {
                o += '<div class="kw-chapter">';
                if (i.text != "") o += "<a></a>" + (r.notTrans ? i.text : s.hisui.getTrans(i.text));
                o += '</div><div class="kw-line"></div>';
                s.each(i.items, function(a, e) {
                    if (e.type == "section") {
                        o += '<div class="kw-section"><div class="kw-section-header">' + (r.notTrans ? e.text : s.hisui.getTrans(e.text)) + "</div>";
                        if (e.items) {
                            o += '<ul class="kw-section-list keywords">';
                        }
                        s.each(e.items, function(e, t) {
                            var i = 'class="' + (t.selected ? " selected" : "") + (t.disabled ? " disabled" : "") + '"';
                            o += '<li id="' + (t.id || t.text) + '" rowid="' + n + "-" + a + "-" + e + '" ' + i + "><a>" + (r.notTrans ? t.text : s.hisui.getTrans(t.text)) + "</a></li>";
                        });
                        if (e.items) {
                            o += "</ul>";
                        }
                        o += "</div>";
                    } else {
                        if (a == 0) {
                            o += '<ul class="kw-section-list keywords">';
                        }
                        var t = 'class="' + (e.selected ? "selected" : "") + (e.disabled ? " disabled" : "") + '"';
                        o += '<li id="' + (e.id || e.text) + '" rowid="' + n + "-" + a + '" ' + t + "><a>" + (r.notTrans ? e.text : s.hisui.getTrans(e.text)) + "</a></li>";
                        if (a == i.items.length - 1) o += "</ul>";
                    }
                });
            } else if (i.type == "section") {
                o += '<div class="kw-section"><div class="kw-section-header">' + (r.notTrans ? i.text : s.hisui.getTrans(i.text)) + "</div>";
                if (i.items) {
                    o += '<ul class="kw-section-list keywords">';
                }
                s.each(i.items, function(e, t) {
                    var i = 'class="' + (t.selected ? " selected" : "") + (t.disabled ? " disabled" : "") + '"';
                    o += '<li id="' + (t.id || t.text) + '" rowid="' + n + "-" + e + '" ' + i + "><a>" + (r.notTrans ? t.text : s.hisui.getTrans(t.text)) + "</a></li>";
                });
                if (i.items) {
                    o += "</ul>";
                }
                o += "</div>";
            } else {
                if (n == 0) {
                    o += '<ul class="kw-section-list keywords">';
                }
                var e = 'class="' + (i.selected ? " selected" : "") + (i.disabled ? " disabled" : "") + '"';
                o += '<li id="' + (i.id || i.text) + '" rowid="' + n + '" ' + e + "><a>" + (r.notTrans ? i.text : s.hisui.getTrans(i.text)) + "</a></li>";
                if (n == r.items.length - 1) o += "</ul>";
            }
        });
        e.append(o);
        e.off("click").on("click", "ul.kw-section-list>li", function(e, t) {
            if (s(this).hasClass("disabled")) return false;
            var i = s(this).attr("id");
            n(a, i);
            return false;
        });
    }
    s.fn.keywords = function(t, e) {
        if (typeof t == "string") {
            return s.fn.keywords.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = s.data(this, "keywords");
            if (e) {
                s.extend(e.options, t);
            } else {
                s.data(this, "keywords", {
                    options: s.extend({}, s.fn.keywords.defaults, s.fn.keywords.parseOptions(this), t)
                });
            }
            i(this);
        });
    };
    function n(e, t) {
        var i = s(e);
        var a = s.data(e, "keywords").options;
        if (a.singleSelect) {
            i.find("li.selected").removeClass("selected");
        }
        var n = i.find("li#" + t);
        n.toggleClass("selected");
        var r = o(e, n.attr("rowid"));
        a.onClick.call(this, r);
        if (n.hasClass("selected")) {
            a.onSelect.call(this, r);
        }
        if (!a.singleSelect) {
            if (!n.hasClass("selected")) {
                a.onUnselect.call(this, r);
            }
        }
    }
    function a(e) {
        s(e).find("li.selected").removeClass("selected");
    }
    function t(e) {
        var t = [];
        s(e).find("li.selected").each(function() {
            t.push(o(e, s(this).attr("rowid")));
        });
        return t;
    }
    s.fn.keywords.methods = {
        options: function(e) {
            if (e.length > 0) return s.data(e[0], "keywords").options;
            return {};
        },
        getSelected: function(e) {
            if (e.length > 0) return t(e[0]);
            return [];
        },
        select: function(e, t) {
            if (e.length > 0) return n(e[0], t);
        },
        switchById: function(e, t) {
            if (e.length > 0) return n(e[0], t);
        },
        clearAllSelected: function(e, t) {
            e.each(function(e, t) {
                a(t);
            });
        }
    };
    s.fn.keywords.parseOptions = function(e) {
        var t = s(e);
        return s.extend({}, s.parser.parseOptions(e, [ "id", "iconCls", "iconAlign", "group", "size", {
            plain: "boolean",
            toggle: "boolean",
            selected: "boolean",
            disabled: "boolean"
        } ]), {
            disabled: t.attr("disabled") ? true : undefined
        });
    };
    s.fn.keywords.defaults = {
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
    $.fn.triggerbox = function(i, e) {
        if (typeof i == "string") {
            return $.fn.triggerbox.methods[i](this, e);
        }
        i = i || {};
        return this.each(function() {
            var e = $.data(this, "triggerbox");
            if (e) {
                $.extend(e.options, i);
            } else {
                var t = $.extend({}, $.fn.triggerbox.parseOptions(this), i);
                if (typeof t.icon == "undefined" && typeof t.plain == "undefined") {
                    t.icon = "icon-trigger-box";
                    t.plain = true;
                }
                e = $.data(this, "triggerbox", {
                    options: $.extend({}, $.fn.triggerbox.defaults, t),
                    triggerbox: init(this)
                });
            }
            _413(this);
            _409(this);
            _40e(this, e.options.disabled);
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

(function(a) {
    var i = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
    var n = {
        19969: "DZ",
        19975: "WM",
        19988: "QJ",
        20048: "YL",
        20056: "SC",
        20060: "NM",
        20094: "QG",
        20127: "QJ",
        20167: "QC",
        20193: "YG",
        20250: "KH",
        20256: "ZC",
        20282: "SC",
        20285: "QJG",
        20291: "TD",
        20314: "YD",
        20340: "NE",
        20375: "TD",
        20389: "YJ",
        20391: "CZ",
        20415: "PB",
        20446: "YS",
        20447: "SQ",
        20504: "TC",
        20608: "KG",
        20854: "QJ",
        20857: "ZC",
        20911: "PF",
        20504: "TC",
        20608: "KG",
        20854: "QJ",
        20857: "ZC",
        20911: "PF",
        20985: "AW",
        21032: "PB",
        21048: "XQ",
        21049: "SC",
        21089: "YS",
        21119: "JC",
        21242: "SB",
        21273: "SC",
        21305: "YP",
        21306: "QO",
        21330: "ZC",
        21333: "SDC",
        21345: "QK",
        21378: "CA",
        21397: "SC",
        21414: "XS",
        21442: "SC",
        21477: "JG",
        21480: "TD",
        21484: "ZS",
        21494: "YX",
        21505: "YX",
        21512: "HG",
        21523: "XH",
        21537: "PB",
        21542: "PF",
        21549: "KH",
        21571: "E",
        21574: "DA",
        21588: "TD",
        21589: "O",
        21618: "ZC",
        21621: "KHA",
        21632: "ZJ",
        21654: "KG",
        21679: "LKG",
        21683: "KH",
        21710: "A",
        21719: "YH",
        21734: "WOE",
        21769: "A",
        21780: "WN",
        21804: "XH",
        21834: "A",
        21899: "ZD",
        21903: "RN",
        21908: "WO",
        21939: "ZC",
        21956: "SA",
        21964: "YA",
        21970: "TD",
        22003: "A",
        22031: "JG",
        22040: "XS",
        22060: "ZC",
        22066: "ZC",
        22079: "MH",
        22129: "XJ",
        22179: "XA",
        22237: "NJ",
        22244: "TD",
        22280: "JQ",
        22300: "YH",
        22313: "XW",
        22331: "YQ",
        22343: "YJ",
        22351: "PH",
        22395: "DC",
        22412: "TD",
        22484: "PB",
        22500: "PB",
        22534: "ZD",
        22549: "DH",
        22561: "PB",
        22612: "TD",
        22771: "KQ",
        22831: "HB",
        22841: "JG",
        22855: "QJ",
        22865: "XQ",
        23013: "ML",
        23081: "MW",
        23487: "SX",
        23558: "QJ",
        23561: "YW",
        23586: "YW",
        23614: "YW",
        23615: "SN",
        23631: "PB",
        23646: "ZS",
        23663: "ZT",
        23673: "YG",
        23762: "TD",
        23769: "ZS",
        23780: "QJ",
        23884: "QK",
        24055: "XH",
        24113: "DC",
        24162: "ZC",
        24191: "GA",
        24273: "QJ",
        24324: "NL",
        24377: "TD",
        24378: "QJ",
        24439: "PF",
        24554: "ZS",
        24683: "TD",
        24694: "WE",
        24733: "LK",
        24925: "TN",
        25094: "ZG",
        25100: "XQ",
        25103: "XH",
        25153: "PB",
        25170: "PB",
        25179: "KG",
        25203: "PB",
        25240: "ZS",
        25282: "FB",
        25303: "NA",
        25324: "KG",
        25341: "ZY",
        25373: "WZ",
        25375: "XJ",
        25384: "A",
        25457: "A",
        25528: "SD",
        25530: "SC",
        25552: "TD",
        25774: "ZC",
        25874: "ZC",
        26044: "YW",
        26080: "WM",
        26292: "PB",
        26333: "PB",
        26355: "ZY",
        26366: "CZ",
        26397: "ZC",
        26399: "QJ",
        26415: "ZS",
        26451: "SB",
        26526: "ZC",
        26552: "JG",
        26561: "TD",
        26588: "JG",
        26597: "CZ",
        26629: "ZS",
        26638: "YL",
        26646: "XQ",
        26653: "KG",
        26657: "XJ",
        26727: "HG",
        26894: "ZC",
        26937: "ZS",
        26946: "ZC",
        26999: "KJ",
        27099: "KJ",
        27449: "YQ",
        27481: "XS",
        27542: "ZS",
        27663: "ZS",
        27748: "TS",
        27784: "SC",
        27788: "ZD",
        27795: "TD",
        27812: "O",
        27850: "PB",
        27852: "MB",
        27895: "SL",
        27898: "PL",
        27973: "QJ",
        27981: "KH",
        27986: "HX",
        27994: "XJ",
        28044: "YC",
        28065: "WG",
        28177: "SM",
        28267: "QJ",
        28291: "KH",
        28337: "ZQ",
        28463: "TL",
        28548: "DC",
        28601: "TD",
        28689: "PB",
        28805: "JG",
        28820: "QG",
        28846: "PB",
        28952: "TD",
        28975: "ZC",
        29100: "A",
        29325: "QJ",
        29575: "SL",
        29602: "FB",
        30010: "TD",
        30044: "CX",
        30058: "PF",
        30091: "YSP",
        30111: "YN",
        30229: "XJ",
        30427: "SC",
        30465: "SX",
        30631: "YQ",
        30655: "QJ",
        30684: "QJG",
        30707: "SD",
        30729: "XH",
        30796: "LG",
        30917: "PB",
        31074: "NM",
        31085: "JZ",
        31109: "SC",
        31181: "ZC",
        31192: "MLB",
        31293: "JQ",
        31400: "YX",
        31584: "YJ",
        31896: "ZN",
        31909: "ZY",
        31995: "XJ",
        32321: "PF",
        32327: "ZY",
        32418: "HG",
        32420: "XQ",
        32421: "HG",
        32438: "LG",
        32473: "GJ",
        32488: "TD",
        32521: "QJ",
        32527: "PB",
        32562: "ZSQ",
        32564: "JZ",
        32735: "ZD",
        32793: "PB",
        33071: "PF",
        33098: "XL",
        33100: "YA",
        33152: "PB",
        33261: "CX",
        33324: "BP",
        33333: "TD",
        33406: "YA",
        33426: "WM",
        33432: "PB",
        33445: "JG",
        33486: "ZN",
        33493: "TS",
        33507: "QJ",
        33540: "QJ",
        33544: "ZC",
        33564: "XQ",
        33617: "YT",
        33632: "QJ",
        33636: "XH",
        33637: "YX",
        33694: "WG",
        33705: "PF",
        33728: "YW",
        33882: "SR",
        34067: "WM",
        34074: "YW",
        34121: "QJ",
        34255: "ZC",
        34259: "XL",
        34425: "JH",
        34430: "XH",
        34485: "KH",
        34503: "YS",
        34532: "HG",
        34552: "XS",
        34558: "YE",
        34593: "ZL",
        34660: "YQ",
        34892: "XH",
        34928: "SC",
        34999: "QJ",
        35048: "PB",
        35059: "SC",
        35098: "ZC",
        35203: "TQ",
        35265: "JX",
        35299: "JX",
        35782: "SZ",
        35828: "YS",
        35830: "E",
        35843: "TD",
        35895: "YG",
        35977: "MH",
        36158: "JG",
        36228: "QJ",
        36426: "XQ",
        36466: "DC",
        36710: "JC",
        36711: "ZYG",
        36767: "PB",
        36866: "SK",
        36951: "YW",
        37034: "YX",
        37063: "XH",
        37218: "ZC",
        37325: "ZC",
        38063: "PB",
        38079: "TD",
        38085: "QY",
        38107: "DC",
        38116: "TD",
        38123: "YD",
        38224: "HG",
        38241: "XTC",
        38271: "ZC",
        38415: "YE",
        38426: "KH",
        38461: "YD",
        38463: "AE",
        38466: "PB",
        38477: "XJ",
        38518: "YT",
        38551: "WK",
        38585: "ZC",
        38704: "XS",
        38739: "LJ",
        38761: "GJ",
        38808: "SQ",
        39048: "JG",
        39049: "XJ",
        39052: "HG",
        39076: "CZ",
        39271: "XT",
        39534: "TD",
        39552: "TD",
        39584: "PB",
        39647: "SB",
        39730: "LG",
        39748: "TPB",
        40109: "ZQ",
        40479: "ND",
        40516: "HG",
        40536: "HG",
        40583: "QJ",
        40765: "YQ",
        40784: "QJ",
        40840: "YK",
        40863: "QJG"
    };
    function r(e) {
        if (typeof e != "string") throw new Error(-1, "makePy parameter type must 'string'!");
        var t = new Array();
        for (var i = 0, a = e.length; i < a; i++) {
            var n = e.charAt(i);
            t.push(o(n));
        }
        return s(t);
    }
    function o(e) {
        var t = e.charCodeAt(0);
        if (t > 40869 || t < 19968) return e;
        return n[t] ? n[t] : i.charAt(t - 19968);
    }
    function s(e) {
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
    function e(e) {
        var t = a.trim(e);
        if (t != "") {
            var i = r(t);
            return i[0];
        } else {
            return "";
        }
    }
    a.hisui.toChineseSpell = e;
    a.hisui.getChineseSpellArray = r;
})(jQuery);

(function(g) {
    g.extend(g.fn.combobox.defaults, {
        defaultFilter: 1,
        filter: function(e, t) {
            var i = g(this).combobox("options");
            var a = t[i.textField] || "", n = a.toLowerCase();
            var r = e.toLowerCase();
            var o = i.defaultFilter || 1;
            if (o == 3 || o == 4) o += 2;
            var s = o % 2 == 1;
            var l = n.indexOf(r);
            if (l == 0) return true;
            if (l > -1 && !s) return true;
            if (o >= 3 && o <= 6) {
                if (i.spellField) {
                    var d = t[i.spellField] || "", c = d.toLowerCase();
                    var f = c.indexOf(r);
                    return f == 0 || f > -1 && !s;
                } else {
                    var u = g.hisui.getChineseSpellArray(a);
                    var h = u.length;
                    if (o <= 4) h = Math.min(h, 1);
                    var p = false;
                    for (var v = 0; v < h; v++) {
                        var c = (u[v] || "").toLowerCase();
                        var f = c.indexOf(r);
                        if (f == 0 || f > -1 && !s) {
                            p = true;
                            break;
                        }
                    }
                    return p;
                }
            } else {
                return false;
            }
        }
    });
})(jQuery);

(function(v) {
    function a(e) {
        var t = v.data(e, "dateboxq");
        var n = t.options;
        var i = v(e);
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
        i.comboq(v.extend({}, n, {
            onShowPanel: function() {
                t.panel = v(e).comboq("panel");
                r(e);
                n.onShowPanel.call(e);
            }
        }));
        i.addClass("dateboxq");
        return;
    }
    function r(s) {
        var e = v(s);
        var t = v.data(s, "dateboxq");
        var i = t.options;
        var a = v(s).comboq("getText");
        var n = i.parser.call(s, a);
        if (i.minDate != null || i.maxDate != null) {
            v(s).dateboxq("calendar").options.validator = function(e, t) {
                var i = v.data(s, "dateboxq");
                var a = i.options;
                var n = true;
                if (null != a.minDate) {
                    if (t) t[0] = a.minDate;
                    if (a.minDate.indexOf(" ") == -1 && a.minDate.indexOf(":") == -1) {
                        a.minDate += " 00:00:00";
                    }
                    var r = a.parser.call(s, a.minDate);
                    if (r > e) n = false;
                }
                if (null != a.maxDate) {
                    if (t) t[1] = a.maxDate;
                    if (a.maxDate.indexOf(" ") == -1 && a.maxDate.indexOf(":") == -1) {
                        a.maxDate += " 23:59:59";
                    }
                    var o = a.parser.call(s, a.maxDate);
                    if (o < e) n = false;
                }
                return n;
            };
        }
        var r = v.extend({
            current: n,
            border: false,
            onSelect: function(e) {
                var t = v(s).dateboxq("options");
                g(s, t.formatter.call(s, e));
                v(s).comboq("hidePanel");
            }
        }, v(s).dateboxq("calendar").calendar("options"));
        var o = v(s).comboq("panel");
        var l = v(s).comboq("createPanelBody");
        l.calendar(r);
        var d = v('<div class="datebox-button"><table cellspacing="0" cellpadding="0" style="width:100%"><tr></tr></table></div>').appendTo(o);
        var c = d.find("tr");
        for (var f = 0; f < i.buttons.length; f++) {
            var u = v("<td></td>").appendTo(c);
            var h = i.buttons[f];
            var p = v('<a href="javascript:void(0)" onclick="javascript:return false;"></a>').html(v.isFunction(h.text) ? h.text(s) : h.text).appendTo(u);
            p.bind("click", {
                target: s,
                handler: h.handler
            }, function(e) {
                e.data.handler.call(this, e.data.target);
            });
        }
        c.find("td").css("width", 100 / i.buttons.length + "%");
        return;
    }
    function t(e, t) {
        t = t === undefined ? true : t;
        var i = v.data(e, "dateboxq");
        var a = i.options;
        var n = v(e).val();
        if (n) {
            g(e, a.formatter.call(e, a.parser.call(e, n)));
            if (t) v(e).comboq("hidePanel");
        }
    }
    function i(e) {
        if (v(e).validatebox("isValid")) {
            t(e, false);
        }
    }
    function n(e) {
        return v(e).val();
    }
    function g(e, t, i) {
        var a = v.data(e, "dateboxq");
        var n = a.options;
        var r = v(e).val();
        if (r != t) {
            n.onChange.call(e, t, r);
        }
        v(e).val(t);
        if (v(e).validatebox("isValid")) {
            n.onSelect.call(e, n.parser.call(e, t));
        }
    }
    v.fn.dateboxq = function(i, e) {
        if (typeof i == "string") {
            var t = v.fn.dateboxq.methods[i];
            if (t) {
                return t(this, e);
            } else {
                return this.comboq(i, e);
            }
        }
        i = i || {};
        return this.each(function() {
            var e = v.data(this, "dateboxq");
            if (e) {
                v.extend(e.options, i);
            } else {
                var t = this;
                v.data(this, "dateboxq", {
                    calendar: {
                        options: {
                            validator: v.fn.calendar.defaults.validator
                        },
                        calendar: function(e) {
                            if (typeof e == "string") {
                                if (e == "options") return v.data(t, "dateboxq").calendar.options;
                            } else {
                                v.extend(v.data(t, "dateboxq").calendar.options, e);
                            }
                        }
                    },
                    options: v.extend({}, v.fn.dateboxq.defaults, v.fn.dateboxq.parseOptions(this), i)
                });
                v(this).css({
                    imeMode: "disabled"
                });
            }
            a(this);
        });
    };
    v.fn.dateboxq.methods = {
        options: function(e) {
            return v.data(e[0], "dateboxq").options;
        },
        setValue: function(e, t) {
            return e.each(function() {
                g(this, t);
            });
        },
        getValue: function(e) {
            return n(e[0]);
        },
        calendar: function(e) {
            return v.data(e[0], "dateboxq").calendar;
        }
    };
    v.fn.dateboxq.parseOptions = function(e) {
        return v.extend({}, v.fn.comboq.parseOptions(e), v.parser.parseOptions(e, [ "format" ]));
    };
    v.fn.dateboxq.defaults = v.extend({}, v.fn.comboq.defaults, {
        panelWidth: 180,
        panelHeight: v.hisui.getStyleCodeConfigValue("dateboxqPanelHeight"),
        parser: v.fn.datebox.defaults.parser,
        formatter: v.fn.datebox.defaults.formatter,
        currentText: v.fn.datebox.defaults.currentText,
        closeText: v.fn.datebox.defaults.closeText,
        okText: v.fn.datebox.defaults.okText,
        buttons: [ {
            text: function(e) {
                return v(e).dateboxq("options").currentText;
            },
            handler: function(e) {
                v(e).val("t");
                t(e);
            }
        }, {
            text: function(e) {
                return v(e).dateboxq("options").closeText;
            },
            handler: function(e) {
                v(e).comboq("hidePanel");
            }
        } ],
        onBlur: function(e) {
            i(e);
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

(function(p) {
    function a(i) {
        var e = p.data(i, "datetimeboxq");
        var a = e.options;
        p(i).val(a.value);
        p(i).dateboxq(p.extend({}, a, {
            onShowPanel: function() {
                var e = p(i).datetimeboxq("getValue");
                t(i, e, true);
                a.onShowPanel.call(i);
            }
        }));
        p(i).removeClass("dateboxq-f").addClass("datetimeboxq-f");
        p(i).dateboxq("calendar").calendar({
            onSelect: function(e) {
                a.onSelect.call(i, e);
            },
            onDblClick: function(e) {
                var t = p(i).datetimeboxq("options").buttons;
                if (t.length > 1 && t[1].handler) t[1].handler.call(this, i);
                a.onDblClick.call(i, e);
            }
        });
    }
    function e(e, t, i) {}
    function r(e, t) {
        t.onHidePanel.call(this, e);
        p(p.hisui.globalContainerSelector).hide();
    }
    function n(e, t) {
        t = t === undefined ? true : t;
        var i = p.data(e, "datetimeboxq");
        var a = i.options;
        var n = p(e).val();
        if (n) {
            o(e, a.formatter.call(e, a.parser.call(e, n)));
            if (t) r(e, a);
        }
    }
    function t(e) {
        var t = p(e);
        var i = p(p.hisui.globalContainerSelector);
        var a = p.data(e, "datetimeboxq").options;
        var n = t.val();
        var r = new Date();
        var o = r.getHours();
        var s = r.getMinutes();
        var l = r.getSeconds();
        var d = n.split(" ");
        function c(e) {
            return (e < 10 ? "0" : "") + e;
        }
        if (d.length == 1) {
            timeval = c(o) + ":" + c(s) + ":" + c(l);
        } else {
            timeval = d[1];
        }
        var f = a.parser.call(e, n);
        var u = p('<div style="padding:2px"><input style="width:100px;height:24px"></div>').insertAfter(i.children("div.calendar"));
        var h = u.children("input");
        h.timespinner({
            showSeconds: a.showSeconds,
            separator: ":"
        }).unbind(".datetimeboxq").bind("mousedown.datetimeboxq", function(e) {
            e.stopPropagation();
        });
        h.timespinner("setValue", timeval);
    }
    function o(e, t, i) {
        var a = p.data(e, "datetimeboxq");
        var n = a.options;
        var r = p(e).val();
        if (r != t) {
            n.onChange.call(e, t, r);
        }
        p(e).val(t);
        if (p(e).validatebox("isValid")) {
            n.onSelect.call(e, n.parser.call(e, t));
        }
    }
    function s(e) {
        var t = p(p.hisui.globalContainerSelector);
        var i = t.children("div.calendar").calendar("options").current;
        var a = t.find("input.spinner-f");
        return new Date(i.getFullYear(), i.getMonth(), i.getDate(), a.timespinner("getHours"), a.timespinner("getMinutes"), a.timespinner("getSeconds"));
    }
    p.fn.datetimeboxq = function(i, e) {
        if (typeof i == "string") {
            var t = p.fn.datetimeboxq.methods[i];
            if (t) {
                return t(this, e);
            } else {
                return this.dateboxq(i, e);
            }
        }
        i = i || {};
        return this.each(function() {
            var e = p.data(this, "datetimeboxq");
            if (e) {
                p.extend(e.options, i);
            } else {
                var t = this;
                p.data(this, "datetimeboxq", {
                    spinner: {
                        options: p.fn.timespinner.defaults.options,
                        timespinner: function(e) {
                            if (typeof e == "string") {
                                if (e == "options") return p.data(t, "datetimeboxq").spinner.options;
                            } else {
                                p.data(t, "datetimeboxq").spinner.options = e;
                            }
                        }
                    },
                    options: p.extend({}, p.fn.datetimeboxq.defaults, p.fn.datetimeboxq.parseOptions(this), i)
                });
            }
            a(this);
        });
    };
    p.fn.datetimeboxq.methods = {
        options: function(e) {
            var t = e.dateboxq("options");
            return p.extend(p.data(e[0], "datetimeboxq").options, {
                originalValue: t.originalValue,
                disabled: t.disabled,
                readonly: t.readonly
            });
        },
        spinner: function(e) {
            return p.data(e[0], "datetimeboxq").spinner;
        },
        setValue: function(e, t) {
            return e.each(function() {
                o(this, t);
            });
        },
        reset: function(e) {
            return e.each(function() {
                var e = p(this).datetimeboxq("options");
                p(this).datetimeboxq("setValue", e.originalValue);
            });
        }
    };
    p.fn.datetimeboxq.parseOptions = function(e) {
        var t = p(e);
        return p.extend({}, p.fn.dateboxq.parseOptions(e), p.parser.parseOptions(e, [ {
            showSeconds: "boolean"
        } ]));
    };
    p.fn.datetimeboxq.defaults = p.extend({}, p.fn.dateboxq.defaults, {
        showSeconds: true,
        panelHeight: p.hisui.getStyleCodeConfigValue("datetimeboxPanelHeight"),
        buttons: [ {
            text: function(e) {
                return p(e).dateboxq("options").currentText;
            },
            handler: function(e) {
                var t = p(e).dateboxq("options").formatter.call(e, new Date());
                p(e).val(t);
                n(e, true);
            }
        }, {
            text: function(e) {
                return p(e).dateboxq("options").okText;
            },
            handler: function(e) {
                var t = s(e);
                var i = p.data(e, "datetimeboxq");
                var a = i.options.formatter.call(e, t);
                p(e).val(a);
                n(e, true);
            }
        }, {
            text: function(e) {
                return p(e).dateboxq("options").closeText;
            },
            handler: function(e) {
                r(e, p(e).datetimeboxq("options"));
            }
        } ],
        formatter: function(e) {
            var t = e.getHours();
            var i = e.getMinutes();
            var a = e.getSeconds();
            function n(e) {
                return (e < 10 ? "0" : "") + e;
            }
            var r = ":";
            var o = p.fn.dateboxq.defaults.formatter(e) + " " + n(t) + r + n(i);
            if (p(this).datetimeboxq("options").showSeconds) {
                o += r + n(a);
            }
            return o;
        },
        parser: function(e) {
            if (p.trim(e) == "") {
                return new Date();
            }
            var t = e.split(" ");
            var i = p.fn.dateboxq.defaults.parser(t[0]);
            if (t.length < 2) {
                return i;
            }
            var a = ":";
            var n = t[1].split(a);
            var r = parseInt(n[0], 10) || 0;
            var o = parseInt(n[1], 10) || 0;
            var s = parseInt(n[2], 10) || 0;
            return new Date(i.getFullYear(), i.getMonth(), i.getDate(), r, o, s);
        },
        onHidePanel: function() {},
        rules: {},
        onBlur: function(e) {}
    });
})(jQuery);

(function(f) {
    var u = "<div class='hstep-container'>" + "<ul class='hstep-container-steps'>" + "</ul>" + "<div class='hstep-progress'>" + "<p class='hstep-progress-bar'>" + "<span class='hstep-progress-highlight' style='width:0%'>" + "</span>" + "</p>" + "</div>" + "</div>";
    var h = "<li class='hstep-step undone'></li>";
    function t(e) {
        var t = s(e) - 1;
        var i = f.data(e, "hstep");
        var a = i.options;
        if (t > 0) return a.items[t - 1];
        return {};
    }
    function s(e) {
        var t = f(e).find(".active").attr("ind");
        return t;
    }
    function p(e, n, t) {
        var i = f(e).find(".hstep-container").find("li");
        var a = f(e).find(".hstep-container").find(".hstep-progress-highlight");
        var r = s(e);
        t = t || 0;
        if (t !== 0) n = parseInt(r) + parseInt(t);
        if (1 <= n && n <= i.length) {
            var o = "%";
            o = Math.round((n - 1) * 100 / (i.length - 1)) + o;
            a.animate({
                width: o
            }, {
                speed: 1e3,
                done: function() {
                    i.each(function(e, t) {
                        var i = f(t);
                        var a = e + 1;
                        if (a < n) {
                            i.attr("class", "done");
                        } else if (a === n) {
                            i.attr("class", "active");
                        } else if (a > n) {
                            i.attr("class", "undone");
                        }
                    });
                }
            });
        }
    }
    function v(e, t) {
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
    function i(e) {
        var t = f.data(e, "hstep");
        var a = t.options;
        var i = f(u), n = f(h), r = i.find(".hstep-container-steps"), o = 0, s = f(e);
        s.addClass("hstep");
        i.addClass("hstep-lg");
        var l = a.items;
        o = l.length;
        for (var d = 0; d < o; d++) {
            var c = l[d];
            n.css("width", a.stepWidth).attr("ind", 1 + parseInt(d)).text(c.title).append('<div class="cnode">' + (a.showNumber ? d + 1 : "") + "</div>");
            if (c.context) n.append(c.context);
            r.append(n);
            n = f(h);
        }
        v(i, a.stepWidth);
        s.append(i);
        p(e, a.currentInd);
        f(e).unbind(".hstep").bind("click.hstep", function(e) {
            var t = f(e.target).closest("li");
            t.closest(".hstep-container-steps").children("li").removeClass("hover");
            t.addClass("hover");
            if (t.length > 0 && a.onSelect) {
                var i = a.items[t.attr("ind") - 1];
                i.state = t.hasClass("done") ? "done" : t.hasClass("active") ? "active" : "undone";
                a.onSelect.call(this, t.attr("ind"), i);
            }
        });
    }
    f.fn.hstep = function(t, e) {
        if (typeof t == "string") {
            return f.fn.hstep.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = f.data(this, "hstep");
            if (e) {
                f.extend(e.options, t);
            } else {
                f.data(this, "hstep", {
                    options: f.extend({}, f.fn.hstep.defaults, f.fn.hstep.parseOptions(this), t)
                });
            }
            i(this);
        });
    };
    f.fn.hstep.methods = {
        options: function(e) {
            return f.data(e[0], "hstep").options;
        },
        destroy: function(e) {
            return e.each(function() {});
        },
        setStep: function(e, t, i) {
            return e.each(function() {
                p(this, t, i);
            });
        },
        nextStep: function(e) {
            return e.each(function() {
                p(this, undefined, 1);
            });
        },
        prevStep: function(e) {
            return e.each(function() {
                p(this, undefined, -1);
            });
        },
        getStep: function(e) {
            if (e.length > 0) return t(e[0]);
            return {};
        }
    };
    f.fn.hstep.parseOptions = function(e) {
        var t = f(e);
        return f.extend({}, f.parser.parseOptions(e, [ "showNumber", "stepWidth", "titlePostion" ]));
    };
    f.fn.hstep.defaults = {
        currentInd: 1,
        showNumber: false,
        stepWidth: 100,
        titlePostion: "top",
        items: [],
        onSelect: null
    };
})(jQuery);

(function(f) {
    var u = "<div class='vstep-container'>" + "<ul class='vstep-container-steps'>" + "</ul>" + "<div class='vstep-progress'>" + "<p class='vstep-progress-bar'>" + "<span class='vstep-progress-highlight' style='height:0%'>" + "</span>" + "</p>" + "</div>" + "</div>";
    var h = "<li class='vstep-step undone'></li>";
    function t(e) {
        var t = s(e) - 1;
        var i = f.data(e, "vstep");
        var a = i.options;
        if (t > 0) return a.items[t - 1];
        return {};
    }
    function s(e) {
        var t = f(e).find(".active").attr("ind");
        return t;
    }
    function p(e, n, t) {
        var i = f(e).find(".vstep-container").find("li");
        var a = f(e).find(".vstep-container").find(".vstep-progress-highlight");
        var r = s(e);
        t = t || 0;
        if (t !== 0) n = parseInt(r) + parseInt(t);
        if (1 <= n && n <= i.length) {
            var o = "%";
            o = Math.round((n - 1) * 100 / (i.length - 1)) + o;
            a.animate({
                height: o
            }, {
                speed: 1e3,
                done: function() {
                    i.each(function(e, t) {
                        var i = f(t);
                        var a = e + 1;
                        if (a < n) {
                            i.attr("class", "done");
                        } else if (a === n) {
                            i.attr("class", "active");
                        } else if (a > n) {
                            i.attr("class", "undone");
                        }
                    });
                }
            });
        }
    }
    function v(e, t) {
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
    function i(e) {
        var t = f.data(e, "vstep");
        var a = t.options;
        var i = f(u), n = f(h), r = i.find(".vstep-container-steps"), o = 0, s = f(e);
        if (s.hasClass("vstep")) {
            s.empty();
        }
        s.addClass("vstep");
        i.addClass("vstep-lg").width(s.width());
        var l = a.items;
        o = l.length;
        for (var d = 0; d < o; d++) {
            var c = l[d];
            n.css("height", a.stepHeight).attr("ind", 1 + parseInt(d)).append('<div class="cnode">' + (a.showNumber ? d + 1 : "") + "</div>").append('<span class="title">' + c.title + "</span>");
            if (c.context) n.append(c.context);
            r.append(n);
            n = f(h);
        }
        v(i, a.stepHeight);
        s.append(i);
        p(e, a.currentInd);
        f(e).unbind(".vstep").bind("click.vstep", function(e) {
            var t = f(e.target).closest("li");
            t.closest(".vstep-container-steps").children("li").removeClass("hover");
            t.addClass("hover");
            if (t.length > 0 && a.onSelect) {
                var i = a.items[t.attr("ind") - 1];
                i.state = t.hasClass("done") ? "done" : t.hasClass("active") ? "active" : "undone";
                a.onSelect.call(this, t.attr("ind"), i);
            }
        });
    }
    f.fn.vstep = function(t, e) {
        if (typeof t == "string") {
            return f.fn.vstep.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = f.data(this, "vstep");
            if (e) {
                f.extend(e.options, t);
            } else {
                f.data(this, "vstep", {
                    options: f.extend({}, f.fn.vstep.defaults, f.fn.vstep.parseOptions(this), t)
                });
            }
            i(this);
        });
    };
    f.fn.vstep.methods = {
        options: function(e) {
            return f.data(e[0], "vstep").options;
        },
        destroy: function(e) {
            return e.each(function() {});
        },
        setStep: function(e, t, i) {
            return e.each(function() {
                p(this, t, i);
            });
        },
        nextStep: function(e) {
            return e.each(function() {
                p(this, undefined, 1);
            });
        },
        prevStep: function(e) {
            return e.each(function() {
                p(this, undefined, -1);
            });
        },
        getStep: function(e) {
            if (e.length > 0) return t(e[0]);
            return {};
        }
    };
    f.fn.vstep.parseOptions = function(e) {
        var t = f(e);
        return f.extend({}, f.parser.parseOptions(e, [ "showNumber", "stepHeight", "titlePostion" ]));
    };
    f.fn.vstep.defaults = {
        currentInd: 1,
        showNumber: false,
        stepHeight: 60,
        titlePostion: "top",
        items: [],
        onSelect: null
    };
})(jQuery);

(function(d) {
    function t(e, t) {
        var i = d.data(e, "timeboxq");
        var a = i.options;
        var n = d(e).val();
        if (n) {
            r(e, a.formatter.call(e, a.parser.call(e, n)));
        }
    }
    function i(e) {
        if (d(e).validatebox("isValid")) {
            t(e, false);
        }
    }
    function a(e) {
        return d(e).val();
    }
    function r(e, t, i) {
        var a = d.data(e, "timeboxq");
        var n = a.options;
        var r = d(e).val();
        if (r != t || n.valueDirty) {
            n.onChange.call(e, t, r);
        }
        d(e).val(t);
        n.valueDirty = 0;
        if (d(e).validatebox("isValid")) {
            n.onSelect.call(e, t);
        }
    }
    d.fn.timeboxq = function(a, e) {
        if (typeof a == "string") {
            var t = d.fn.timeboxq.methods[a];
            if (t) {
                return t(this, e);
            } else {
                return this.validatebox(a, e);
            }
        }
        a = a || {};
        if ("object" == typeof a.validType) {
            if (d.isArray(a.validType)) {
                a.validType.push("timeboxq");
            }
        }
        return this.each(function() {
            var e = d.data(this, "timeboxq");
            var t;
            var i = this;
            if (e) {
                d.extend(e.options, a);
                t = e.options;
            } else {
                d.data(this, "timeboxq", {
                    options: d.extend({}, d.fn.timeboxq.defaults, d.fn.timeboxq.parseOptions(this), a)
                });
                t = d.data(this, "timeboxq").options;
                if (t.minTime != null) {
                    t.validType.minMaxTime[0] = t.formatter.call(this, t.parser.call(this, t.minTime));
                }
                if (t.maxTime != null) {
                    t.validType.minMaxTime[1] = t.formatter.call(this, t.parser.call(this, t.maxTime));
                }
            }
            d(i).validatebox(t);
            d(i).css({
                imeMode: "disabled"
            }).addClass("timeboxq").off("blur.timeboxq").on("blur.timeboxq", function() {
                if (t.onBlur) t.onBlur.call(this, i);
            }).unbind("keydown.timeboxq").bind("keydown.timeboxq", function(e) {
                if ("undefined" == typeof e.keyCode) {
                    return;
                }
                switch (e.keyCode) {
                  case 38:
                    t.keyHandler.up.call(i, e);
                    break;

                  case 40:
                    t.keyHandler.down.call(i, e);
                    break;

                  case 13:
                    e.preventDefault();
                    t.keyHandler.enter.call(i, e);
                    break;

                  default:
                    ;
                }
            }).unbind("input.timeboxq").bind("change.timeboxq", function(e) {
                t.valueDirty = 1;
            });
        });
    };
    function e(e) {
        var t = d.data(this, "timeboxq").options;
        var i = t.timeFormat;
        if (e.indexOf(":") == -1) {
            if (isNaN(e.charAt(0))) {
                e = l(e, i);
            } else {
                e = c(e, i);
            }
        }
        if (e.indexOf(":") > -1) {
            var a = new Date();
            var n = e.split(":");
            var r = n[0];
            var o = n[1];
            var s = n.length > 2 ? n[2] : 0;
            a.setHours(r);
            a.setMinutes(o);
            a.setSeconds(s);
            return a.getTime();
        }
        return e;
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
    function l(e, t) {
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
    function c(e, t) {
        if (isNaN(e)) return e;
        var i = e.slice(0, 2);
        if (isNaN(i)) return e;
        var a = e.slice(2, 4) || 0;
        var n = e.slice(4) || 0;
        return o(i, parseInt(a), parseInt(n), t);
    }
    function n(e) {
        if (e == "") return "";
        var t = d.data(this, "timeboxq").options;
        var i = t.timeFormat;
        var a = new Date();
        a.setTime(e);
        return o(a.getHours(), a.getMinutes(), a.getSeconds(), i);
    }
    function s(e, t) {
        d(e)._outerWidth(t);
    }
    d.fn.timeboxq.methods = {
        options: function(e) {
            if (e.length > 0) return d.data(e[0], "timeboxq").options;
            return null;
        },
        setValue: function(e, t) {
            return e.each(function() {
                r(this, t);
            });
        },
        getValue: function(e) {
            return a(e[0]);
        },
        resize: function(e, t) {
            return e.each(function() {
                s(this, t);
            });
        }
    };
    d.fn.timeboxq.parseOptions = function(e) {
        return d.extend({}, d.fn.validatebox.parseOptions(e), d.parser.parseOptions(e));
    };
    d.fn.timeboxq.defaults = d.extend({}, d.fn.validatebox.defaults, {
        panelWidth: 180,
        parser: e,
        formatter: n,
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
    d.extend(d.fn.timeboxq.defaults.rules, {
        timeboxq: {
            validator: function(e) {
                return /^(20|21|22|23|[0-1]\d|\d)(:[0-5]\d){1,2}$/i.test(e) || /^(20|21|22|23|\d|[0-1]\d)([0-5]\d){0,2}$/i.test(e) || /^[nN][-+]*\d*$/i.test(e);
            },
            message: "Please enter a valid time. 14:10, 1410, n+15"
        },
        minMaxTime: {
            validator: function(e, t) {
                var i = this;
                var a = d(this);
                var n = d.data(i, "timeboxq");
                if (n) {
                    var r = n.options;
                    var o = r.parser.call(i, e);
                    r.validType.minMaxTime = [ null, null ];
                    if (r.minTime != null || r.maxTime != null) {
                        if (r.minTime == null && r.rules.minMaxTime.messageMax) {
                            r.rules.minMaxTime.message = r.rules.minMaxTime.messageMax;
                        } else if (r.maxTime == null && r.rules.minMaxTime.messageMin) {
                            r.rules.minMaxTime.message = r.rules.minMaxTime.messageMin;
                        } else {
                            r.rules.minMaxTime.message = r.rules.minMaxTime.messageDef;
                        }
                        if (r.minTime != null) {
                            r.validType.minMaxTime[0] = r.formatter.call(i, r.parser.call(i, r.minTime));
                        }
                        if (r.maxTime != null) {
                            r.validType.minMaxTime[1] = r.formatter.call(i, r.parser.call(i, r.maxTime));
                        }
                    } else {
                        r.rules.minMaxTime.message = r.rules.timeboxq.message;
                    }
                    var s = r.parser.call(i, r.validType.minMaxTime[0]);
                    var l = r.parser.call(i, r.validType.minMaxTime[1]);
                    if (o > l || o < s) return false;
                }
                return true;
            },
            message: "Please enter a valid time.",
            messageDef: "Please enter a valid time : from {0} to {1}'"
        }
    });
})(jQuery);

(function(r) {
    var o = '<input id="imedisabled_password_input" type="password" style="width: 1px; height: 1px; position: absolute; border: 0px; padding: 0px;">';
    function i(e) {
        var t = r.data(e, "imedisabled");
        var i = t.options;
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            r(e).css({
                imeMode: "disabled"
            });
        } else if ("object" === typeof WebsysTool) {
            r(e).unbind(".imedisabled").bind("focus.imedisabled", function() {
                WebsysTool.SwitchToLanguageMode("en-US");
            }).bind("blur.imedisabled", function() {
                WebsysTool.SwitchToLanguageMode("zh-CN");
            });
        } else {
            var a = r("#imedisabled_password_input");
            if (a.length == 0) {
                r(e).after(o);
            }
            var n = function(e) {
                var t = this;
                r("#imedisabled_password_input").focus();
                setTimeout(function() {
                    t.focus();
                    r(t).one("focus", n);
                }, 50);
            };
            r(e).one("focus", n);
        }
    }
    r.fn.imedisabled = function(t, e) {
        if (typeof t == "string") {
            return r.fn.imedisabled.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = r.data(this, "imedisabled");
            if (e) {
                r.extend(e.options, t);
            } else {
                r.data(this, "imedisabled", {
                    options: r.extend({}, r.fn.imedisabled.defaults, r.fn.imedisabled.parseOptions(this), t)
                });
            }
            i(this);
        });
    };
    r.fn.imedisabled.methods = {
        options: function(e) {
            return r.data(e[0], "imedisabled").options;
        },
        destroy: function(e) {
            return e.each(function() {});
        }
    };
    r.fn.imedisabled.parseOptions = function(e) {
        var t = r(e);
        return r.extend({}, r.parser.parseOptions(e, [ "imeEventType" ]));
    };
    r.fn.imedisabled.defaults = {
        imeEventType: "focus"
    };
})(jQuery);

(function(d) {
    d.parser.plugins.push("menutree");
    function a(a) {
        if (d.hisui.getHisuiStyle() == "pure") {
            var e = d('<div class="menutree-wrap"><div class="menutree-searchbox-wrap"><div class="menutree-searchbox-proxy"></div></div><div class="menutree-tree-wrap"></div><div class="menutree-collapse-wrap"></div></div>').insertAfter(a);
        } else {
            var e = d('<div class="menutree-wrap"><div class="menutree-collapse-wrap"></div><div class="menutree-searchbox-wrap"></div><div class="menutree-tree-wrap"></div></div>').insertAfter(a);
        }
        e.panel({
            doSize: false,
            border: false,
            onResize: function(e, t) {
                setTimeout(function() {
                    i(a, {
                        width: e,
                        height: t
                    });
                }, 0);
            }
        });
        e.panel("panel").addClass("menutree").bind("_resize", function(e, t) {
            var i = d.data(a, "menutree").options;
            if (i.fit == true || t) {
                n(a);
            }
            return false;
        });
        var t = d('<div class="menutree-wrap"><div class="menutree-tree-wrap"></div></div>').appendTo("body");
        t.panel({
            doSize: false,
            closed: true,
            border: false,
            cls: "menutree menutree-sp",
            style: {
                position: "absolute",
                zIndex: 10
            },
            onOpen: function() {
                var e = d(this).panel("panel");
                if (d.fn.menu) {
                    e.css("z-index", d.fn.menu.defaults.zIndex++);
                } else {
                    if (d.fn.window) {
                        e.css("z-index", d.fn.window.defaults.zIndex++);
                    }
                }
                d(this).panel("resize");
            },
            onBeforeClose: function() {},
            onClose: function() {
                var e = d.data(a, "menutree");
                if (e && e._isClickShowSub) {
                    e._isClickShowSub = false;
                }
                if (e.panel) {
                    e.panel.find(".menutree-root-hover").removeClass("menutree-root-hover");
                }
            }
        });
        d(document).off(".menutree").on("mousedown.menutree", function(e) {
            var t = d(e.target).closest("div.menutree-sp");
            if (t.length) {
                return;
            }
            if (d(".menutree-sp:visible").length > 0) {
                d(".menutree-sp>.menutree-wrap:visible").panel("close");
            }
        });
        return {
            panel: e,
            subpanel: t
        };
    }
    function n(e, t) {
        var i = d.data(e, "menutree").options;
        var a = d.data(e, "menutree").panel;
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
            if (!i.collapsed) {
                i.width = n.width();
            }
            i.height = n.height();
        }
        if (i.collapsed) {
            a.panel("resize", {
                height: i.height
            });
        } else {
            a.panel("resize", {
                width: i.width,
                height: i.height
            });
        }
    }
    function i(e) {
        var t = d.data(e, "menutree").options;
        var i = d.data(e, "menutree").panel;
        var a = i.find(".menutree-collapse-wrap");
        var n = i.find(".menutree-searchbox-wrap");
        var r = i.find(".menutree-tree-wrap");
        var o = n.find(".menutree-searchbox");
        if (o.length > 0) o.searchbox("resize", t.width);
        var s = t.height - (r.offset().top - r.parent().offset().top);
        if (d.hisui.getHisuiStyle() == "pure" && t.collapsible) {
            s = s - a.outerHeight();
        }
        r._outerHeight(s);
    }
    function r(e) {
        var t = d.data(e, "menutree");
        var i = t.options;
        var a = t.panel;
        var n = a.find(".menutree-collapse-wrap");
        var r = n.find(".menutree-collapse");
        if (r.length == 0) {
            r = d('<span class="menutree-collapse menutree-expanded"></span>').appendTo(n);
            t.collapse = r;
            r.on("click", function() {
                if (d(this).hasClass("menutree-expanded")) {
                    d(this).removeClass("menutree-expanded");
                    a.panel("panel").addClass("menutree-min");
                    a.panel("resize", {
                        width: i.minwidth
                    });
                    d(this).addClass("menutree-collapsed");
                    i.collapsed = true;
                    i.onPanelCollapse.call(e, i.minwidth);
                } else if (d(this).hasClass("menutree-collapsed")) {
                    d(this).removeClass("menutree-collapsed");
                    a.panel("panel").removeClass("menutree-min");
                    a.panel("resize", {
                        width: i.width
                    });
                    d(this).addClass("menutree-expanded");
                    i.collapsed = false;
                    i.onPanelExpand.call(e, i.width);
                }
            });
        }
        if (i.collapsible) {
            n.removeClass("menutree-hidden");
        } else {
            n.addClass("menutree-hidden");
        }
    }
    function s(e) {
        var t = d.data(e, "menutree");
        var i = t.collapse;
        if (i.hasClass("menutree-collapsed")) {
            i.trigger("click");
        }
    }
    function o(t) {
        var n = d.data(t, "menutree");
        var r = n.options;
        var o = n.panel;
        var e = o.find(".menutree-searchbox-wrap");
        var i = e.find(".menutree-searchbox");
        if (i.length == 0) {
            i = d('<input class="menutree-searchbox" />').appendTo(e);
            n.searchbox = i;
        }
        i.searchbox({
            searcher: function(e) {
                var t = o.find(".menutree-tree");
                if (t.length > 0) {
                    var i = t.tree("getRoots");
                    C(i, e, null, r.searchFields);
                    var a = !r.rootCollapsible;
                    w(i, e, true, a);
                    n._q = e;
                }
            },
            prompt: r.prompt
        });
        if (r.searchable) {
            e.removeClass("menutree-hidden");
        } else {
            e.addClass("menutree-hidden");
        }
        e.find(".menutree-searchbox-proxy").off("click.menutree").on("click.menutree", function(e) {
            s(t);
            setTimeout(function() {
                i.searchbox("textbox").focus();
            }, 200);
        });
    }
    function c(e, i) {
        i = i || 1;
        if (e && e.length > 0) {
            e.find(">li").each(function() {
                var e = "menutree-li-level" + (i > 2 ? "x" : i);
                if (!d(this).hasClass(e)) {
                    d(this).removeClass("menutree-li-level1 menutree-li-level2 menutree-li-levelx").addClass(e);
                }
                var t = d(this).find(">ul");
                if (t.length > 0) {
                    c(t, i + 1);
                } else {
                    if (i > 1) {
                        d(this).find(">.tree-node>.tree-indent").last().addClass("tree-indent-hit");
                    }
                }
            });
        }
        if (i == 1 && e.find("li.menutree-li-levelx").length == 0) {
            e.addClass("menutree-tree-nox");
        }
    }
    function l(r) {
        var g = d.data(r, "menutree");
        var b = g.options;
        var e = g.panel;
        var t = e.find(".menutree-tree-wrap");
        var m = t.find(".menutree-tree");
        if (m.length == 0) {
            m = d('<div class="menutree-tree" ></div>').appendTo(t);
            g.tree = m;
        }
        var i = d.extend({}, b, {
            formatter: h,
            onClick: function(i) {
                if (!m.tree("isLeaf", i.target)) {
                    var e = m.tree("getRoots");
                    var t = d.hisui.indexOfArray(e, "id", i.id) > -1;
                    if (b.rootCollapsible || !t) {
                        if (b.onlyOneExpanded && i.state == "closed") {
                            var a = m.tree("getParent", i.target), n = null;
                            if (a) {
                                n = m.tree("getChildren", a.target);
                            } else {
                                n = e;
                            }
                            d.each(n, function(e, t) {
                                if (t.id != i.id && t.state == "open") m.tree("collapse", t.target);
                            });
                        }
                        m.tree("toggle", i.target);
                    }
                    b.onMenuGroupClick.call(r, i);
                } else {
                    b.onMenuClick.call(r, i);
                }
                b.onClick.call(this, i);
            },
            onBeforeExpand: function(i) {
                var e = m.tree("getRoots");
                if (b.onlyOneExpanded) {
                    var t = m.tree("getParent", i.target), a = null;
                    if (t) {
                        a = m.tree("getChildren", t.target);
                    } else {
                        a = e;
                    }
                    d.each(a, function(e, t) {
                        if (t.id != i.id && t.state == "open") m.tree("collapse", t.target);
                    });
                }
            },
            onLoadSuccess: function(e, t) {
                b.onLoadSuccess.call(r, e, t);
                c(m);
            },
            loadFilter: function(e, t) {
                var i = b.loadFilter.call(r, e, t);
                f(i, !t, b.onlyOneExpanded, b.rootCollapsible);
                return i;
            }
        });
        m.tree(i);
        if (b.title) {
            var a = t.find(".menutree-tree-title");
            if (a.length == 0) {
                a = d('<div class="menutree-tree-title"></div>').prependTo(t);
            }
            a.html(d.hisui.getTrans(b.title));
            t.addClass("menutree-tree-withtitle");
        } else {
            t.find(".menutree-tree-title").remove();
            t.removeClass("menutree-tree-withtitle");
        }
        if (!b.rootCollapsible) {
            t.addClass("menutree-tree-norootcollapse");
        } else {
            t.removeClass("menutree-tree-norootcollapse");
        }
        if (b.collapsible) {
            t.addClass("menutree-tree-collapsible");
            u(r);
        } else {
            t.removeClass("menutree-tree-collapsible");
        }
        m.off(".menutree").on("mouseenter.menutree", ">li", function() {
            var e = d(this);
            if (e.closest(".menutree").hasClass("menutree-min") && !g._isClickShowSub) {
                if (g._hideSubTimer) clearTimeout(g._hideTimer);
                g._showSubTimer = setTimeout(function() {
                    n(e);
                }, 200);
            }
        }).on("mouseleave.menutree", ">li", function() {
            var e = d(this);
            if (e.closest(".menutree").hasClass("menutree-min") && !g._isClickShowSub) {
                if (g._showSubTimer) clearTimeout(g._showSubTimer);
                g._hideSubTimer = setTimeout(function() {
                    var e = g.subpanel;
                    e.panel("close");
                    g._isClickShowSub = false;
                });
            }
        }).on("click.menutree", ">li", function() {
            var e = d(this);
            if (e.closest(".menutree").hasClass("menutree-min")) {
                if (g._hideSubTimer) clearTimeout(g._hideTimer);
                if (g._showSubTimer) clearTimeout(g._showSubTimer);
                n(e);
                g._isClickShowSub = true;
            }
        });
        function n(e) {
            var t = g.subpanel;
            var i = e.offset();
            var a = i.left + e._outerWidth(), n = i.top - 1;
            t.panel("move", {
                left: a,
                top: n
            });
            t.panel("open");
            var r = t.find(".menutree-tree");
            var o = e.find(">.tree-node");
            var s = m.tree("getNode", o);
            var l = x(s);
            if (l.children && l.state != "open") {
                l.state = "open";
            }
            var d = [ l ];
            r.tree("loadData", d);
            var c = g.tree;
            var f = c.tree("getSelected");
            if (f) {
                var u = r.tree("find", f.id);
                if (u) r.tree("select", u.target);
            }
            var h = g._q;
            if (h) {
                var p = r.tree("getRoots");
                C(p, h, null, b.searchFields);
                var v = !b.rootCollapsible;
                w(p, h, true, v);
            }
            t.panel("resize", {
                width: b.width,
                height: "auto"
            });
            e.addClass("menutree-root-hover");
        }
    }
    function f(e, t, i, a) {
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
                f(o.children, false, i, a);
            }
        }
        return e;
    }
    function x(e) {
        var t = {};
        for (var i in e) {
            if (i == "domId" || i == "target") {
                continue;
            } else if (i == "children") {
                t.children = [];
                for (var a = 0; a < e.children.length; a++) {
                    var n = x(e.children[a]);
                    t.children.push(n);
                }
            } else if (typeof e[i] == "object") {
                t[i] = d.extend({}, e[i], true);
            } else if (typeof e[i] == "string" || typeof e[i] == "number") {
                t[i] = e[i];
            }
        }
        return t;
    }
    function u(r) {
        var a = d.data(r, "menutree");
        var o = a.options;
        var s = a.subpanel;
        var e = s.find(".menutree-tree-wrap");
        var l = e.find(".menutree-tree");
        if (l.length == 0) {
            l = d('<div class="menutree-tree menutree-subtree" ></div>').appendTo(e);
            a.subtree = l;
        }
        var t = d.extend({}, o, {
            formatter: h,
            onClick: function(i) {
                if (!l.tree("isLeaf", i.target)) {
                    var e = l.tree("getRoots");
                    var t = d.hisui.indexOfArray(e, "id", i.id) > -1;
                    if (!t) {
                        if (o.onlyOneExpanded && i.state == "closed") {
                            var a = l.tree("getParent", i.target), n = null;
                            if (a) {
                                n = l.tree("getChildren", a.target);
                            } else {
                                n = e;
                            }
                            d.each(n, function(e, t) {
                                if (t.id != i.id && t.state == "open") l.tree("collapse", t.target);
                            });
                        }
                        l.tree("toggle", i.target);
                    }
                    o.onMenuGroupClick.call(r, i);
                } else {
                    s.panel("close");
                    o.onMenuClick.call(r, i);
                }
                o.onClick.call(r, i);
            },
            onBeforeExpand: function(i) {
                var e = l.tree("getRoots");
                var t = d.hisui.indexOfArray(e, "id", i.id) > -1;
                if (!t) {
                    if (o.onlyOneExpanded) {
                        var a = l.tree("getParent", i.target), n = null;
                        if (a) {
                            n = l.tree("getChildren", a.target);
                        } else {
                            n = e;
                        }
                        d.each(n, function(e, t) {
                            if (t.id != i.id && t.state == "open") l.tree("collapse", t.target);
                        });
                    }
                }
            },
            onExpand: function(e) {
                var t = a.tree;
                var i = t.tree("find", e.id);
                t.tree("expand", i.target);
            },
            onCollapse: function(e) {
                var t = a.tree;
                var i = t.tree("find", e.id);
                t.tree("collapse", i.target);
            },
            onSelect: function(e) {
                var t = a.tree;
                var i = t.tree("find", e.id);
                t.tree("select", i.target);
            },
            loadFilter: function(e, t) {
                var i = o.loadFilter.call(r, e, t);
                f(i, !t, o.onlyOneExpanded, o.rootCollapsible);
                return i;
            },
            onLoadSuccess: function(e, t) {
                c(l);
            }
        });
        l.tree(t);
        l.off(".menutree").on("mouseenter.menutree", function() {
            if (a._hideSubTimer) {
                clearTimeout(a._hideSubTimer);
            }
        }).on("mouseleave.menutree", function() {
            if (!a._isClickShowSub) {
                a._hideSubTimer = setTimeout(function() {
                    s.panel("close");
                }, 200);
            }
        });
    }
    function h(e, t) {
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
    function p(e, t) {
        var i = false;
        if (e.indexOf(t) > -1) {
            i = true;
        } else {
            var a = d.hisui.getChineseSpellArray(e);
            var n = a.length;
            var r = false;
            for (var o = 0; o < n; o++) {
                var s = (a[o] || "").toLowerCase();
                var l = s.indexOf(t);
                if (l > -1) {
                    i = true;
                    break;
                }
            }
        }
        return i;
    }
    function C(e, t, i, a) {
        var n = false, r = i && i._ok, t = t.toLowerCase();
        for (var o = 0; o < e.length; o++) {
            var s = e[o];
            s._ok = false;
            if (r) {
                s._ok = true;
            } else {
                var l = s.text.toLowerCase();
                if (p(l, t)) {
                    s._ok = true;
                } else if (a) {
                    var d = a.split(",");
                    for (var c = 0; c < d.length; c++) {
                        var f = d[c];
                        var u = s[f];
                        if (!u && s.attributes) u = s.attributes[f];
                        if (u && p(u, t)) {
                            s._ok = true;
                            break;
                        }
                    }
                }
            }
            if (s.children) {
                C(s.children, t, s, a);
            }
            if (s._ok) n = true;
        }
        if (n && i) i._ok = true;
    }
    function w(e, t, i, a) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (r.children) {
                w(r.children, t, false, a);
            }
            var o = d("#" + r.domId);
            if (i && a) {} else if (r._ok) {
                var s = h(r, t);
                o.find(".tree-title").html(s);
                o.removeClass("menutree-node-hidden");
            } else {
                o.addClass("menutree-node-hidden");
            }
        }
    }
    function v(e, t) {
        var i = d.data(e, "menutree");
        var a = i.tree.tree("find", t);
        if (a) i.tree.tree("select", a.target);
    }
    function g(e, t) {
        var i = d.data(e, "menutree");
        var a = i.tree.tree("find", t);
        return a;
    }
    d.fn.menutree = function(i, e) {
        if (typeof i == "string") {
            var t = d.fn.menutree.methods[i];
            return t(this, e);
        }
        i = i || {};
        return this.each(function() {
            var e = d.data(this, "menutree");
            if (e) {
                d.extend(e.options, i);
            } else {
                var t = a(this);
                d.data(this, "menutree", {
                    panel: t.panel,
                    subpanel: t.subpanel,
                    options: d.extend({}, d.fn.menutree.defaults, d.fn.menutree.parseOptions(this), i)
                });
                e = d.data(this, "menutree");
            }
            if (e.options.collapsible && !e.options.title) {
                e.options.title = "导航菜单";
            }
            r(this);
            o(this);
            l(this);
            n(this);
        });
    };
    d.fn.menutree.methods = {
        options: function(e) {
            return d.data(e[0], "menutree").options;
        },
        getTree: function(e) {
            return d.data(e[0], "menutree").tree;
        },
        selectById: function(e, t) {
            e.each(function() {
                v(this, t);
            });
        },
        findNode: function(e, t) {
            return g(e[0], t);
        }
    };
    d.fn.menutree.parseOptions = function(e) {
        var t = d('<div class="menutree-default-width"></div>').appendTo("body");
        var i = t.width();
        t.remove();
        t = d('<div class="menutree-default-min-width"></div>').appendTo("body");
        var a = t.width();
        t.remove();
        var n = d(e);
        return d.extend({
            width: i,
            minwidth: a
        }, d.fn.combo.parseOptions(e), d.parser.parseOptions(e, [ "width", "height", "prompt", {
            fit: "boolean"
        } ]));
    };
    d.fn.menutree.defaults = d.extend({}, d.fn.tree.defaults, {
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

(function(d) {
    d.parser.plugins.push("inputclearbtn");
    function a(e) {
        var t = d.data(e, "inputclearbtn");
        var i = t.options;
        var a = d(e);
        if (a.hasClass("searchbox-f")) {
            a.next().find("input").addClass("inputclearbtn-f");
        } else if (a.hasClass("triggerbox-f")) {
            a.next().find("input").addClass("inputclearbtn-f");
        } else if (a.hasClass("combo-f")) {
            a.next().find("input").addClass("inputclearbtn-f");
        } else if (a.hasClass("filebox-f")) {
            a.next().find("input").addClass("inputclearbtn-f");
        } else {
            a.addClass("inputclearbtn-f");
        }
        var n = d(".z-q-clearbtn");
        if (n.length == 0) {
            n = d('<span class="z-q-clearbtn"><i class="z-q-clearbtnicon">&nbsp;</i></span>').appendTo("body");
            d(document.body).delegate("input.inputclearbtn-f", "mouseenter.inputclearbtn focus.inputclearbtn", function(e) {
                if ("" !== e.target.value) {
                    var r = d(".z-q-clearbtn");
                    if (r.length == 0) {
                        r = d('<span class="z-q-clearbtn"><i class="z-q-clearbtnicon">&nbsp;</i></span>').appendTo("body");
                    }
                    var o = e.target;
                    var s = d(o);
                    var t = s.outerWidth();
                    var i = s.outerHeight();
                    var a = s.offset();
                    var n = a.left + t - 22;
                    var l = a.top + i / 2 - 8;
                    if (s.hasClass("comboq") || s.hasClass("validatebox-invalid")) {
                        n -= 22;
                    }
                    r.css({
                        top: l,
                        left: n,
                        display: "block",
                        fontSize: "10px",
                        position: "absolute"
                    });
                    r.bind("click.inputclearbtn", function(e) {
                        var t = o, i = "";
                        if (s.hasClass("searchbox-text")) {
                            t = d(o).parent().prev()[0];
                            i = "searchbox";
                        }
                        if (s.hasClass("triggerbox-text")) {
                            t = d(o).parent().prev()[0];
                            i = "triggerbox";
                        }
                        if (d(o).hasClass("numberbox-f")) {
                            t = o;
                            i = "numberbox";
                        }
                        if (s.hasClass("combo-text")) {
                            t = d(o).parent().prev()[0];
                            if (d(t).hasClass("datetimebox-f")) {
                                i = "datetimebox";
                            } else if (d(t).hasClass("datebox-f")) {
                                i = "datebox";
                            } else if (d(t).hasClass("combobox-f")) {
                                i = "combobox";
                            } else {
                                i = "combo";
                            }
                        }
                        var a = d.data(t, "inputclearbtn");
                        if (a) {
                            var n = a.options;
                            if (n.onClearBefore) {
                                n.onClearBefore.call(t, s.val());
                            }
                        }
                        if (i != "") {
                            if (i == "combo") {
                                d.fn[i].methods.clear(d(t));
                            } else {
                                d.fn[i].methods.setValue(d(t), "");
                            }
                        } else {
                            s.val("");
                            s.focus();
                        }
                        r.hide();
                        if (n && n.onClearAfter) {
                            n.onClearAfter.call(o, s.val());
                        }
                    });
                }
            }).delegate("input.inputclearbtn-f", "mouseleave.inputclearbtn blur.inputclearbtn", function(e) {
                if (d(e.toElement).hasClass("z-q-clearbtn") || d(e.toElement).hasClass("z-q-clearbtnicon")) {
                    return;
                }
                var t = d(".z-q-clearbtn");
                if (t.length > 0) {
                    t.hide();
                    t.unbind(".inputclearbtn");
                }
            });
        }
    }
    d.fn.inputclearbtn = function(t, e) {
        if (typeof t == "string") {
            var i = d.fn.inputclearbtn.methods[t];
            if (i) {
                return i(this, e);
            } else {
                return this.inputclearbtn(t, e);
            }
        }
        t = t || {};
        return this.each(function() {
            var e = d.data(this, "inputclearbtn");
            if (e) {
                d.extend(e.options, t);
            } else {
                d.data(this, "inputclearbtn", {
                    options: d.extend({}, d.fn.inputclearbtn.parseOptions(this), t)
                });
            }
            a(this);
        });
    };
    d.fn.inputclearbtn.methods = {
        options: function(e) {
            return d.data(e[0], "inputclearbtn").options;
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
    d.fn.inputclearbtn.parseOptions = function(e) {
        return d.extend({}, d.parser.parseOptions(e));
    };
    d.fn.inputclearbtn.defaults = d.extend({}, {
        clearCls: "default",
        clearBtnRight: 10,
        clearBtnTop: 20,
        onClearBefore: null,
        onClearAfter: null
    });
})(jQuery);

(function(r) {
    function i(e) {
        var t = r.data(e, "label");
        var i = t.options;
        var a = r(e);
        var n = a.text();
        if (!i.notTrans) {
            n = r.hisui.getTrans(n);
            a.text(n);
        }
        a.addClass("f-label");
        if (i.styleCss != "") a.addClass(i.styleCss);
        if (i.required) a.addClass("required-label");
    }
    r.fn.label = function(t, e) {
        if (typeof t == "string") {
            return r.fn.label.methods[t](this, e);
        }
        t = t || {};
        return this.each(function() {
            var e = r.data(this, "label");
            if (e) {
                r.extend(e.options, t);
            } else {
                r.data(this, "label", {
                    options: r.extend({}, r.fn.label.defaults, r.fn.label.parseOptions(this), t)
                });
            }
            i(this);
        });
    };
    r.fn.label.methods = {
        options: function(e) {
            return r.data(e[0], "label").options;
        }
    };
    r.fn.label.parseOptions = function(e) {
        var t = r(e);
        return r.extend({}, r.parser.parseOptions(e, [ "text", "styleCss", "styleCss", "required", "refInputId", "notTrans" ]));
    };
    r.fn.label.defaults = {
        styleCss: "r-label",
        required: false,
        refInputId: null,
        notTrans: false
    };
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

(function(e, o) {
    var t = {};
    o.fn.validatebox.defaults.tipOptions.onShow = function() {
        o(this).tooltip("tip").addClass("tooltip-validatebox-invalid");
    };
    o.fn.combo.defaults.width = 177;
    o.fn.combo.defaults.height = o.hisui.getStyleCodeConfigValue("inputHeight");
    o.fn.combobox.defaults.height = o.hisui.getStyleCodeConfigValue("inputHeight");
    o.fn.combotree.defaults.height = o.hisui.getStyleCodeConfigValue("inputHeight");
    o.fn.combogrid.defaults.height = o.hisui.getStyleCodeConfigValue("inputHeight");
    o.fn.datebox.defaults.height = o.hisui.getStyleCodeConfigValue("inputHeight");
    o.fn.datetimebox.defaults.height = o.hisui.getStyleCodeConfigValue("inputHeight");
    o.fn.tabs.defaults.tabHeight = o.hisui.getStyleCodeConfigValue("tabHeight");
    o.fn.filebox.defaults.height = o.hisui.getStyleCodeConfigValue("inputHeight");
    var s = {
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
    var i = [ "draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "numberspinner", "timespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog", "checkbox", "radio", "switchbox", "filebox", "popover", "comboq", "lookup", "keywords", "triggerbox", "layoutq", "dateboxq", "timeboxq" ];
    o.each(i, function(e, r) {
        t[r] = function(e, t) {
            if (!e) return;
            var i = o(e);
            if ("undefined" != typeof t) {
                i[r](t);
            }
            var a = o.extend({
                jdata: i.data(r)
            }, {
                jqselector: e
            });
            function n() {}
            if (s[r] && s[r].superui && s[s[r].superui] && s[s[r].superui].superui) {
                o.each(o.fn[s[s[r].superui].superui].methods, function(e, i) {
                    a[e] = function() {
                        var e = o(this.jqselector);
                        Array.prototype.splice.call(arguments, 0, 0, e);
                        var t = i.apply(e, arguments);
                        return t;
                    };
                });
            }
            if (s[r] && s[r].superui) {
                o.each(o.fn[s[r].superui].methods, function(e, i) {
                    a[e] = function() {
                        var e = o(this.jqselector);
                        Array.prototype.splice.call(arguments, 0, 0, e);
                        var t = i.apply(e, arguments);
                        return t;
                    };
                });
            }
            o.each(o.fn[r].methods, function(e, i) {
                a[e] = function() {
                    var e = o(this.jqselector);
                    Array.prototype.splice.call(arguments, 0, 0, e);
                    var t = i.apply(e, arguments);
                    return t;
                };
            });
            return a;
        };
    });
    e.$HUI = t;
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