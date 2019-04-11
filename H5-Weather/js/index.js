!function () {
    function e(e) {
        n(this, e), this.render()
    }

    var t = function (e) {
        var t = document.getElementsByTagName("head")[0] || document.documentElement,
            n = document.createElement("script"), a = !1;
        n.src = e, n.charset = "utf-8", n.onerror = n.onload = n.onreadystatechange = function () {
            a || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (a = !0, t.removeChild(n))
        }, t.insertBefore(n, t.firstChild)
    }, n = function (e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }, a = function (e, t) {
        return n(document.createElement(e), t)
    }, r = function (e) {
        return e = e || window.event, e.target || e.srcElement
    }, o = function (e) {
        return e = e || window.event, e.which || e.keyCode || e.charCode
    }, l = function (e) {
        e = e || window.event, e.preventDefault && e.preventDefault() || (e.returnValue = !1), e.stopPropagation && e.stopPropagation()
    }, s = function (e, t) {
        return new RegExp("(?:^|\\s)" + t + "(?:\\s|$)", "i").test(e.className)
    }, i = function (e, t) {
        s(e, t) || (e.className = (e.className + " " + t).replace(/^\s+|\s+$/g, ""))
    }, c = function (e, t) {
        s(e, t) && (e.className = e.className.replace(new RegExp("(?:\\s|^)" + t + "(?:\\s|$)", "i"), " ").replace(/^\s+|\s+$/g, ""))
    }, d = function (e, t, n) {
        do {
            if (e.tagName == t) return e
        } while (e != n && (e = e.parentNode));
        return null
    }, u = function (e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
    }, f = function (e, t, n) {
        var a = e.split("://");
        a.shift();
        var r = parseInt(b.width) - 15 * t.length - 5 - (n ? 16 : 29) - 15, o = a.join("");
        return "/" == o.charAt(o.length - 1) && (o = o.substr(0, o.length - 1)), 7 * o.length > r && (o = o.substr(0, Math.floor(r / 7) - 2) + ".."), o
    }, h = function (e) {
        return !!(e.length > 3 || e.length > 1 && /[\u4e00-\u9fa5]/.test(e))
    }, m = /msie/i.test(navigator.userAgent), v = null;
    e.prototype = {
        width: 0,
        oText: null,
        itemsData: null,
        oneData: null,
        oMenu: null,
        oWrap: null,
        oOne: null,
        selectedIndex: -2,
        filteredValue: "",
        filteringValue: "",
        acValue: "",
        closed: !1,
        show: function () {
            this.oText.value && this.oMenu.childNodes.length && (this.oWrap.style.display = "")
        },
        hide: function () {
            "function" == typeof this.beforeHide && this.beforeHide(), this.oWrap.style.display = "none"
        },
        refreshOne: function () {
            var e = this, t = e.oneData;
            if (t) {
                if (!t.__isItemsDataRendered) {
                    var n = [];
                    if (t.h) {
                        var a = t.s || t.q, r = !1;
                        n.push('<a href="', t.h, '" target="_blank">'), t.f && (n.push('<img src="', t.f, '" >'), r = !0), n.push("<b>", a, "</b>"), r || n.push('<<span class="tag_site">\u5b98\u7f51</span>>'), n.push('<span class="site_url">', f(t.h, a, r), "</span></a>")
                    }
                    e.oOne.innerHTML = n.join("").replace(/(<\w+)/g, '$1 unselectable="on"'), t.__isItemsDataRendered = !0
                }
            } else e.oOne.innerHTML = ""
        },
        refreshItems: function () {
            var e = this, t = e.itemsData;
            if (t && !t.__isItemsDataRendered) {
                for (var n = [], a = 0; a < t.length; a++) n.push('<li ac_index="' + a + '" acValue="' + t[a][0].replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '">' + t[a][1] + "</li>");
                e.oMenu.innerHTML = n.join("").replace(/(<\w+)/g, '$1 unselectable="on"'), e.oMenu.setAttribute("ac_word", e.query), t.length ? e.show() : e.hide(), e.filteredValue = e.filteringValue, e.acValue = "", e.selectedIndex = -2, c(e.oOne, "selected"), t.__isItemsDataRendered = !0;
                var r = document.getElementById("provided-by");
                r.style.position = "static", r.style.position = "absolute"
            }
        },
        setSelectedIndex: function (e, t) {
            var n = this, a = n.oMenu.childNodes;
            if (a.length) if (n.selectedIndex > -1 && c(a[n.selectedIndex], "selected"), c(n.oOne, "selected"), (e = (e + a.length + 2) % (a.length + 2)) == a.length) n.acValue = n.oText.value = n.filteringValue, e = -2; else if (e == a.length + 1) {
                if (!n.oOne.innerHTML) return n.setSelectedIndex(-2 - n.selectedIndex, t), !1;
                n.acValue = n.oText.value = n.oOne.getElementsByTagName("b")[0].innerHTML, i(n.oOne, "selected"), e = -1
            } else n.acValue = n.oText.value = a[e].getAttribute("acValue"), i(a[e], "selected"); else e = -2;
            n.selectedIndex = e, n.afterSetSelectedIndex && n.afterSetSelectedIndex()
        },
        render: function () {
            function e(e) {
                t.closed || t.show(), clearInterval(t._refreshTimer), t._refreshTimer = setInterval(function () {
                    if (b) return !1;
                    var e = f.value, n = e.indexOf("?");
                    -1 != n && (e = e.substr(0, n)), e ? t.closed || (e != t.filteredValue && e != t.filteringValue && e != t.acValue && (t.filteringValue = e, t.refreshData()), t.itemsData && t.refreshItems(), v && t.refreshOne()) : (t.acValue = t.filteringValue = t.filteredValue = "", t.hide(), t.closed = !1)
                }, 100)
            }

            var t = this;
            if (!t._rendered) {
                t._rendered = !0;
                var n = '<div class="ac_wrap_inner"><div class="ac_menu_ctn"><div id="ac_one"></div><ul class="ac_menu"></ul></div><div id="provided-by" class=ac_toolbar>\u7531360\u641c\u7d22\u63d0\u4f9b</div></div>';
                (/msie[ \/os]*6\./gi.test(navigator.userAgent) || document.getElementsByName("qvod-close").length > 0) && (n = '<iframe class="ac_bgIframe" frameBorder="0"></iframe>' + n);
                var s = a("div", {className: "ac_wrap", innerHTML: n.replace(/(<\w+)/g, '$1 unselectable="on"')}),
                    f = t.oText, h = t.oPos || f;
                h.parentNode.insertBefore(s, h);
                var g = t.oMenu = s.getElementsByTagName("ul")[0], p = t.oOne = document.getElementById("ac_one");
                f.setAttribute("autoComplete", "off");
                var x = t.oText.getAttribute("suggestWidth") || h.offsetWidth + "px";
                m ? s.style.width = x : s.style.minWidth = x, s.style.top = h.offsetHeight + "px", s.style.left = h.offsetLeft + "px", t.oWrap = s, t.width = x, t.hide(), u(t.oText, "dblclick", function (e) {
                    t.show()
                }), u(t.oText, "keydown", function (e) {
                    var n = o(e), a = 0;
                    switch (n) {
                        case 40:
                            a = 1;
                            break;
                        case 38:
                            a = -1;
                            break;
                        case 27:
                            t.closed || (t.hide(), t.closed = !0, l(e));
                            break;
                        case 13:
                            if (-1 == t.selectedIndex) {
                                l(e);
                                var r = t.oOne.getElementsByTagName("a")[0];
                                return r.click(), r.focus(), !1
                            }
                    }
                    a && f.value && (l(e), "none" == s.style.display ? (t.show(), t.closed = !1) : t.setSelectedIndex(t.selectedIndex + a))
                }), u(t.oText, "focus", e), u(t.oText, "blur", function (e) {
                    t.hide(), clearInterval(t._refreshTimer)
                });
                var b, I;
                s.onmousedown = function (e) {
                    l(e), clearTimeout(I), b = !0, I = setTimeout(function () {
                        b = !1
                    }, 2e3)
                }, g.onclick = function (e) {
                    var n = r(e), a = d(n, "LI", g);
                    if (a) {
                        f.blur(), setTimeout(function () {
                            f.focus()
                        }, 10);
                        for (var o = 0, l = a, s = f.value; l = l.previousSibling;) o++;
                        t.setSelectedIndex(o, !0), t.closed = !0, t.hide(), clearInterval(t._refreshTimer), t.onselectitem && t.onselectitem({
                            index: parseInt(a.getAttribute("ac_index"), 10),
                            word: a.getAttribute("acvalue"),
                            inputValue: s
                        })
                    }
                }, g.onmouseover = function (e) {
                    var n = r(e), a = d(n, "LI", g);
                    a && (t.enableHoverState ? i(a, "hover") : (t.selectedIndex > -1 && c(t.oMenu.childNodes[t.selectedIndex], "selected"), i(a, "selected"), t.selectedIndex = parseInt(a.getAttribute("ac_index"))))
                }, g.onmouseout = function (e) {
                    var n = r(e), a = d(n, "LI", g);
                    a && (t.enableHoverState ? c(a, "hover") : c(a, "selected"))
                }, p.onclick = function (e) {
                    var n = r(e);
                    d(n, "A", p) && (f.blur(), t.hide(), clearInterval(t._refreshTimer), t.setSelectedIndex(-1, !0))
                }, p.onmouseover = function (e) {
                    i(t.oOne, "selected"), t.selectedIndex > -1 && c(t.oMenu.childNodes[t.selectedIndex], "selected"), t.selectedIndex = -1
                }, p.onmouseout = function (e) {
                    c(t.oOne, "selected")
                }, s.onmouseout = function (e) {
                    t.enableHoverState || (t.selectedIndex > -1 ? c(t.oMenu.childNodes[t.selectedIndex], "selected") : -1 == t.selectedIndex && c(t.oOne, "selected"), t.selectedIndex = -2)
                }, document.activeElement === t.oText && e()
            }
        }
    };
    var g = null, p = {}, x = {}, b = null, I = function (e, n) {
        b.dataAdapter && !n && (e = b.dataAdapter(e));
        for (var a = [], r = e.s || [], o = g.value, l = 0, s = r.length; l < s; l++) {
            var i = r[l], c = i;
            o && 0 === c.toLowerCase().indexOf(o.toLowerCase()) && (c = c.substr(0, o.length) + "<b>" + c.substr(o.length) + "</b>"), i && a.push([i, c])
        }
        if (b.query = e.q, b.itemsData = a, e.q && (p[e.q] = e), v && r[0]) {
            var c = r[0], d = x[c], u = x[o];
            u ? u.msg ? w(u, !0) : h(o) && d ? w(d, !0) : w(u, !0) : (o.length > 1 && t(h(o) ? v + "&q1=" + encodeURIComponent(o) + "&q2=" + encodeURIComponent(c) : v + "&q1=" + encodeURIComponent(o) + "&q2=%20"), x[o] = {})
        }
    }, w = function (e, t) {
        b.oneAdapter && !t && (e = b.oneAdapter(e), e.msg && e.msg.Host && window.AC_ONE_SHOW && window.AC_ONE_SHOW(e.msg.Host));
        var n = e && e.msg || {};
        n.Query && n.Query != g.value && n.Query != b.itemsData[0][1] || (b.oneData = {
            h: n.Host,
            f: n.Favicon,
            s: n.SiteName,
            q: n.Query
        }), n && n.Query && (x[n.Query] = e)
    }, y = function (a) {
        a = n(a, {
            alignElement: a.alignElement || a.inputElement,
            urlPrefix: a.urlPrefix || "http://sug.so.360.cn/suggest/word?callback=suggest_so&encodein=utf-8&encodeout=utf-8&word=",
            enableHoverState: !!a.hasOwnProperty("enableHoverState") && a.enableHoverState
        });
        var r = a.urlPrefix.match(/callback=(\w+)/)[1];
        if (window[r] = I, a.urlOne && /callback=(\w+)/.test(a.urlOne)) {
            v = a.urlOne;
            var o = RegExp.$1;
            window[o] = w
        }
        g = a.inputElement, b = window.cb = new e({
            oText: g,
            oPos: a.alignElement,
            enableHoverState: a.enableHoverState,
            dataAdapter: a.dataAdapter,
            oneAdapter: a.oneAdapter,
            beforeHide: a.beforeHide || function () {
            },
            afterSetSelectedIndex: a.afterSetSelectedIndex || function () {
            },
            onselectitem: function (e) {
                if (!a.beforeSelectItem || !1 !== a.beforeSelectItem(e)) for (var t = g.form.elements, n = 0; n < t.length; n++) if ("submit" == t[n].type) return void t[n].click()
            },
            refreshData: function () {
                var e = g.value, n = p[e];
                n ? I(n, !0) : t(a.urlPrefix + encodeURIComponent(e))
            }
        })
    };
    window.createSuggest = y
}();