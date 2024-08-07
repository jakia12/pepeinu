jQuery(window).on("elementor/frontend/init", function () {
  elementorFrontend.hooks.addAction(
    "frontend/element_ready/wts-gmap.default",
    function (e) {
      map = (function (a) {
        $wrapper = e.find(".eae-markers");
        var t = $wrapper.data("zoom"),
          n = a.find(".marker"),
          i = $wrapper.data("style"),
          r =
            ($wrapper.data("scroll"),
            {
              zoom: t,
              center: new google.maps.LatLng(0, 0),
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: i,
            }),
          s = new google.maps.Map(a[0], r);
        return (
          (s.markers = []),
          n.each(function () {
            !(function (a, t) {
              var n = $wrapper.data("animate");
              $wrapper.data("show-info-window-onload");
              $wrapper = e.find(".eae-markers");
              var i = new google.maps.LatLng(
                a.attr("data-lat"),
                a.attr("data-lng")
              );
              if (((icon_img = a.attr("data-icon")), "" != icon_img))
                var r = {
                  url: a.attr("data-icon"),
                  scaledSize: new google.maps.Size(
                    a.attr("data-icon-size"),
                    a.attr("data-icon-size")
                  ),
                };
              var s = new google.maps.Marker({
                position: i,
                map: t,
                icon: r,
                animation: google.maps.Animation.DROP,
              });
              "animate-yes" == n &&
                "yes" != a.data("info-window") &&
                s.setAnimation(google.maps.Animation.BOUNCE);
              "animate-yes" == n &&
                google.maps.event.addListener(s, "click", function () {
                  s.setAnimation(null);
                });
              if ((t.markers.push(s), a.html())) {
                var d = new google.maps.InfoWindow({ content: a.html() });
                "yes" == a.data("info-window") && d.open(t, s),
                  google.maps.event.addListener(s, "click", function () {
                    d.open(t, s);
                  });
              }
              "animate-yes" == n &&
                google.maps.event.addListener(d, "closeclick", function () {
                  s.setAnimation(google.maps.Animation.BOUNCE);
                });
            })(jQuery(this), s);
          }),
          (function (e, a) {
            var t = new google.maps.LatLngBounds();
            jQuery.each(e.markers, function (e, a) {
              var n = new google.maps.LatLng(
                a.position.lat(),
                a.position.lng()
              );
              t.extend(n);
            }),
              1 == e.markers.length
                ? (e.setCenter(t.getCenter()), e.setZoom(a))
                : e.fitBounds(t);
          })(s, t),
          s
        );
      })(e.find(".eae-markers"));
    }
  ),
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/global",
      function (e) {
        var a,
          t,
          n,
          i,
          r,
          s,
          d,
          o = [],
          l = [],
          c = e.children(".eae-section-bs").children(".eae-section-bs-inner");
        c &&
          c.data("eae-bg-slider") &&
          ((slider_images = c.data("eae-bg-slider")),
          (a = c.data("eae-bg-slider-transition")),
          (t = c.data("eae-bg-slider-animation")),
          (i =
            ("yes" == (n = c.data("eae-bg-custom-overlay")) ||
              c.data("eae-bg-slider-overlay"),
            eae_editor.plugin_url +
              "assets/lib/vegas/overlays/" +
              c.data("eae-bg-slider-overlay"))),
          (r = c.data("eae-bg-slider-cover")),
          (s = c.data("eae-bs-slider-delay")),
          (d = c.data("eae-bs-slider-timer")),
          "undefined" != typeof slider_images &&
            ((o = slider_images.split(",")),
            jQuery.each(o, function (e, a) {
              var t = [];
              (t.src = a), l.push(t);
            }),
            c.vegas({
              slides: l,
              transition: a,
              animation: t,
              overlay: i,
              cover: r,
              delay: s,
              timer: d,
              init: function () {
                "yes" == n &&
                  c.children(".vegas-overlay").css("background-image", "");
              },
            })));
      }
    );
});
var isEditMode = !1,
  breakpoints = eae.breakpoints,
  popupInstance = [];
!(function (e) {
  e(window).on("elementor/frontend/init", function () {
    var a = function (e, a) {
        function t(e) {
          ($icons = a(document).find(e).find(".eae-ic-icon-wrap")),
            window.innerWidth < 767
              ? $icons.each(function (e, t) {
                  a(t).css("top", a(t).height() / 2 + 8 + "px"),
                    a(t)
                      .next(".eae-info-circle-item__content-wrap")
                      .css("padding-top", a(t).height() / 2 + 8 + "px");
                })
              : $icons.each(function (e, t) {
                  a(t).css("margin-left", -0.5 * a(t).outerWidth()),
                    a(t).css("margin-top", -0.5 * a(t).outerHeight()),
                    ($a = (function (e) {
                      return (
                        (e = ((e - 90) * Math.PI) / 180),
                        { x: 50 + 45 * Math.cos(e), y: 50 + 45 * Math.sin(e) }
                      );
                    })($angle)),
                    ($b = 360 / $icons.length),
                    a(t).css("left", $a.x + "%"),
                    a(t).css("top", $a.y + "%"),
                    ($angle += $b);
                });
        }
        ($wrap_class = ".elementor-element-" + e.data("id")),
          ($angle = 0),
          t(e);
        var n = null;
        function i() {
          "yes" == e.find(".eae-info-circle").data("autoplay") &&
            (n = setInterval(r, $autoplayDuration));
        }
        function r() {
          e.find(".eae-active").next().length > 0
            ? e
                .find(".eae-active")
                .next()
                .addClass("eae-active")
                .siblings()
                .removeClass("eae-active")
            : e
                .find(".eae-info-circle-item")
                .eq(0)
                .addClass("eae-active")
                .siblings()
                .removeClass("eae-active");
        }
        ($autoplayDuration = e.find(".eae-info-circle").data("delay")),
          i(),
          e.find(".eae-ic-icon-wrap").hover(
            function () {
              clearInterval(n);
            },
            function () {
              i();
            }
          ),
          e.find(".eae-info-circle-item").length > 0 &&
            a(e.find(".eae-info-circle-item")[0]).addClass("eae-active"),
          e.find(".eae-ic-icon-wrap").on("click", function () {
            e.find(".eae-info-circle-item").removeClass("eae-active"),
              a(this).parent().addClass("eae-active");
          }),
          e.hasClass("eae-mouseenter-yes") &&
            e.find(".eae-ic-icon-wrap").on("mouseenter", function () {
              e.find(".eae-info-circle-item").removeClass("eae-active"),
                a(this).parent().addClass("eae-active");
            }),
          window.addEventListener("resize", t.bind(this, $wrap_class));
      },
      t = function (e, a) {
        function t() {
          var t = e.find(".eae-timline-progress-bar"),
            n = e.find(".eae-timeline-item"),
            i = e.find(".eae-timeline");
          const r = i.data("top-offset");
          var s = a(i).height(),
            d =
              a(n).last().find(".eae-tl-icon-wrapper").offset().top -
              a(n[0]).parent().offset().top,
            o = e.find(".eae-tl-icon-wrapper");
          a(t).css(
            "top",
            a(n[0]).find(".eae-tl-icon-wrapper").offset().top -
              a(n[0]).parent().offset().top
          ),
            a(t).css("bottom", s - d),
            a(t).css("left", o.eq(0)[0].offsetLeft + o.eq(0).width() / 2),
            a(t).css("display", "block"),
            n.each(function (e, t) {
              new Waypoint({
                element: a(t),
                handler: function (e) {
                  "down" == e
                    ? a(t).addClass("eae-tl-item-focused")
                    : a(t).removeClass("eae-tl-item-focused");
                },
                offset: r,
              });
            });
        }
        t(),
          window.addEventListener("resize", t),
          window.addEventListener("scroll", function () {
            e.find(".eae-timline-progress-bar");
            const t = e.find(".eae-timeline").data("top-offset");
            e
              .find(".eae-pb-inner-line")
              .css(
                "height",
                a(window).scrollTop() - e.find(".eae-timeline").offset().top + t
              ),
              e
                .find(".eae-pb-inner-line")
                .css(
                  "max-height",
                  e.find(".eae-pb-inner-line").parent().height()
                );
          });
      };
    function n(e, a, t) {
      var n = new Date();
      n.setTime(n.getTime() + 60 * t * 60 * 1e3);
      var i = "expires=" + n.toUTCString();
      document.cookie = e + "=" + a + ";" + i + ";path=/";
    }
    function i(e) {
      for (
        var a = e + "=",
          t = decodeURIComponent(document.cookie).split(";"),
          n = 0;
        n < t.length;
        n++
      ) {
        for (var i = t[n]; " " == i.charAt(0); ) i = i.substring(1);
        if (0 == i.indexOf(a)) return i.substring(a.length, i.length);
      }
      return "";
    }
    var r = function (e, a) {
        ($is_rtl = jQuery("body").hasClass("rtl")),
          ($wrapper = e.find(".eae-progress-bar"));
        $wrapper.attr("data-skill");
        var t = $wrapper.attr("data-value"),
          n = $wrapper.attr("data-skin"),
          i = $wrapper.find(".eae-pb-bar-skill"),
          r = $wrapper.find(".eae-pb-bar-value"),
          s = $wrapper.find(".eae-pb-bar"),
          d = $wrapper.find(".eae-pb-bar-inner");
        "skin1" === n && a(d).attr("style", "width : " + t + "%"),
          "skin2" === n && a(d).attr("style", "width : " + t + "%"),
          "skin3" === n &&
            (a(r).addClass("eae-pb-bar-value--aligned-value"),
            $is_rtl
              ? a(r).attr("style", "right :" + t + "%")
              : a(r).attr("style", "left :" + t + "%"),
            a(d).attr("style", "width :" + t + "%")),
          "skin4" === n &&
            (a(r).addClass("eae-pb-bar-value--aligned-value"),
            $is_rtl
              ? a(r).attr("style", "right :" + t + "%")
              : a(r).attr("style", "left :" + t + "%"),
            a(d).attr("style", "width :" + t + "%"),
            a(s).addClass("eae-pb-bar--no-overflow")),
          "skin5" === n &&
            (a(r).addClass("eae-pb-bar-value--aligned-value"),
            $is_rtl
              ? a(r).attr("style", "right :" + t + "%")
              : a(r).attr("style", "left :" + t + "%"),
            a(d).attr("style", "width :" + t + "%")),
          $wrapper.each(function (e, t) {
            new Waypoint({
              element: t,
              skill_value: a(t).find(".eae-pb-bar-skill"),
              valueElem: a(t).find(".eae-pb-bar-value"),
              prgBar: a(t).find(".eae-pb-bar-bar"),
              prgInner: a(t).find(".eae-pb-bar-inner"),
              handler: function (e) {
                "down" == e &&
                  (a(r).hasClass("js-animated") || a(r).addClass("js-animated"),
                  a(d).hasClass("js-animated") || a(d).addClass("js-animated"),
                  a(i).hasClass("js-animated") || a(i).addClass("js-animated"));
              },
              offset: "bottom-in-view",
            });
          });
      },
      s = function (e, a) {
        var t = e.find(".eae-content-switcher-wrapper"),
          n = (e.data("id"), t.find(".eae-content-switch-button"));
        n.each(function (e, i) {
          a(this).on("click", function (e) {
            e.preventDefault();
            let i = a(this).find(".eae-content-switch-label");
            if (!a(this).hasClass("active")) {
              a(n).removeClass("active");
              let e = a(i).attr("id");
              a(this).addClass("active");
              var r = a(t).find(".eae-cs-content-section");
              a(r).removeClass("active");
              let s = a(t).find(".eae-content-section-" + e);
              a(s).addClass("active");
            }
          });
        });
      },
      d = function (e, a) {
        let t = e.find(".eae-content-switcher-wrapper"),
          n = (e.data("id"), t.find(".eae-cs-switch-label")),
          i = t.find(".eae-content-switch-label.primary-label");
        const r = a(i).attr("item_id");
        let s = t.find(".eae-content-switch-label.secondary-label");
        const d = a(s).attr("item_id");
        let o = t.find(".eae-cs-content-section.eae-content-section-" + r),
          l = t.find(".eae-cs-content-section.eae-content-section-" + d);
        a(n).on("click", function (e) {
          a(this).find("input.eae-content-toggle-switch").is(":checked")
            ? (s.addClass("active"),
              l.addClass("active"),
              i.removeClass("active"),
              o.removeClass("active"))
            : (i.addClass("active"),
              o.addClass("active"),
              s.removeClass("active"),
              l.removeClass("active"));
        });
      };
    e.fn.EAEHoverDirection = function (a) {
      var t = e.extend({ inaccuracy: 30, speed: 200 }, a);
      this.find(".overlay").css({ top: -9999999 }),
        this.mouseenter(function (a) {
          (container = e(this)),
            (overlay = container.find(".overlay")),
            (parentOffset = container.offset()),
            (relX = a.pageX - parentOffset.left),
            (relY = a.pageY - parentOffset.top),
            overlay.css({
              top: 0,
              left: 0,
              width: container.width(),
              height: container.height(),
            }),
            relX > container.width() - t.inaccuracy
              ? overlay.css({ top: 0, left: container.width() })
              : relX < t.inaccuracy
              ? overlay.css({ top: 0, left: -container.width() })
              : relY > container.height() - t.inaccuracy
              ? overlay.css({ top: container.width(), left: 0 })
              : relY < t.inaccuracy &&
                overlay.css({ top: -container.width(), left: 0 }),
            overlay.animate({ top: 0, left: 0 }, t.speed);
        }),
        this.mouseleave(function (a) {
          (container = e(this)),
            (overlay = container.find(".overlay")),
            (parentOffset = container.offset()),
            (relX = a.pageX - parentOffset.left),
            (relY = a.pageY - parentOffset.top),
            relX <= 0 &&
              overlay.animate({ top: 0, left: -container.width() }, t.speed),
            relX >= container.width() &&
              overlay.animate({ top: 0, left: container.width() }, t.speed),
            relY <= 0 &&
              overlay.animate({ left: 0, top: -container.height() }, t.speed),
            relY >= container.height() &&
              overlay.animate({ left: 0, top: container.height() }, t.speed);
        });
    };
    let o = function (e, a) {
      const t = e.find(".eae-chart-outer-container"),
        n = (e.data("id"), e.find("#eae-chart-canvas"));
      let i = t.data("settings");
      new Chart(n, i);
    };
    const l = function (e, a, t = null, n) {
        let i = {},
          r = [],
          s = ".elementor-element-" + a + " .eae-swiper-container",
          d = elementorFrontend.config.responsive.activeBreakpoints;
        const o = {
            slidesPerView: "slidesPerView",
            slidesPerGroup: "slidesPerGroup",
            spaceBetween: "spaceBetween",
          },
          l = ".elementor-element-" + a;
        if (null !== t) {
          a = t.data("id");
          s =
            l +
            ' .eae-swiper-container[data-eae-slider-id="' +
            t.find(".swiper-container").data("eae-slider-id") +
            '"]';
        }
        if ("yes" === n.data("show-thumbnail")) {
          (i = (function (e, a, t, n) {
            let i = {};
            const r = {};
            if (e.hasOwnProperty("mobile"))
              for (const e in a) t.hasOwnProperty(e) && (i[e] = t[e].mobile);
            return (
              n &&
                Object.keys(n).map((e) => {
                  const a = parseInt(n[e]);
                  "desktop" === e && (e = "default");
                  const i = parseInt(t.spaceBetween[e]),
                    s = parseInt(t.slidesPerView[e]);
                  r[a - 1] = { spaceBetween: i, slidesPerView: s };
                }),
              (i.breakpoints = r),
              (i.direction = "horizontal"),
              (i.watchSlidesVisibility = !0),
              (i.watchSlidesProgress = !0),
              (i.freeMode = !0),
              (i.slideToClickedSlide = !0),
              i
            );
          })(d, o, n.data("thumb-settings"), e.breakpoints_value)),
            (i.el = jQuery(
              ".elementor-element-" + a + " .eae-thumb-container"
            ));
        }
        if (void 0 === e) return !1;
        if (
          ((r = {
            direction: e.direction,
            speed: e.speed,
            autoHeight: e.autoHeight,
            autoplay: e.autoplay,
            effect: e.effect,
            loop: e.loop,
            zoom: e.zoom,
            wrapperClass: "eae-swiper-wrapper",
            slideClass: "eae-swiper-slide",
            observer: !0,
            observeParents: !0,
          }),
          d.hasOwnProperty("mobile"))
        )
          for (const a in o) e.hasOwnProperty(a) && (r[a] = e[a].mobile);
        e.loop &&
          e.hasOwnProperty("slidersPerView") &&
          document.querySelectorAll(l + " .eae-swiper-slide").length <
            e.slidesPerView.tablet &&
          (r.loop = !1);
        const f = {};
        if (
          (e.hasOwnProperty("breakpoints_value") &&
            Object.keys(e.breakpoints_value).map((a) => {
              const t = parseInt(e.breakpoints_value[a]);
              "desktop" === a && (a = "default");
              const n = parseInt(e.spaceBetween[a]),
                i = parseInt(e.slidesPerView[a]),
                r = parseInt(e.slidesPerGroup[a]);
              f[t - 1] = {
                spaceBetween: n,
                slidesPerView: i,
                slidesPerGroup: r,
              };
            }),
          (r.breakpoints = f),
          (r.keyboard = "yes" === e.keyboard && {
            enabled: !0,
            onlyInViewport: !0,
          }),
          "yes" === e.navigation &&
            (r.navigation = {
              nextEl: l + " .eae-swiper-button-next",
              prevEl: l + " .eae-swiper-button-prev",
            }),
          "" !== e.ptype &&
            (r.pagination = {
              el: l + " .eae-swiper-pagination",
              type: e.ptype,
              clickable: e.clickable,
            }),
          "yes" == e.scrollbar &&
            (r.scrollbar = { el: l + " .eae-swiper-scrollbar", hide: !0 }),
          (r.thumbs = { swiper: i }),
          "undefined" == typeof Swiper)
        ) {
          new (0, elementorFrontend.utils.swiper)(jQuery(s), r).then((t) => {
            let n = t;
            c(n);
            const i = e.pause_on_hover;
            "yes" == i && e.autoplay && p(n, i, a);
          });
        } else {
          const t = new Swiper(
            ".elementor-element-" + a + " .eae-swiper-container",
            r
          );
          c(t);
          const n = e.pause_on_hover;
          "yes" == n && p(t, n, a);
        }
        jQuery(".elementor-element-" + a + " .eae-swiper-container").css(
          "visibility",
          "visible"
        );
      },
      c = function (e) {
        e.length > 0
          ? e.forEach(function (a) {
              a.on("slideChangeTransitionStart", function () {
                a.$wrapperEl.find(".ae-featured-bg-yes").each(function () {
                  if ("none" == jQuery(this).css("background-image")) {
                    let e = jQuery(this).attr("data-ae-bg");
                    jQuery(this).css("background-image", "url(" + e + ")");
                  }
                }),
                  a.$wrapperEl.find(".ae-bg-color-yes").each(function () {
                    let e = jQuery(this).attr("data-ae-bg-color");
                    "rgba(0, 0, 0, 0)" ===
                      jQuery(this).css("background-color") &&
                      jQuery(this).css("background-color", e);
                  }),
                  a.$wrapperEl
                    .find(".swiper-slide-duplicate")
                    .find(".elementor-invisible")
                    .each(function () {
                      elementorFrontend.elementsHandler.runReadyTrigger(
                        jQuery(this)
                      );
                    }),
                  a.$wrapperEl
                    .find(".swiper-slide")
                    .find(".animated")
                    .each(function () {
                      elementorFrontend.elementsHandler.runReadyTrigger(
                        jQuery(this)
                      );
                    });
              }),
                a.on("click", function () {
                  const a = e.clickedSlide;
                  if (void 0 === a) return;
                  const t = a.querySelector(".ae-link-yes");
                  if (null !== t && 0 != t.length) {
                    void 0 !== jQuery(t).data("ae-url") &&
                      (jQuery(t).data("ae-url") &&
                      jQuery(t).hasClass("ae-new-window-yes")
                        ? window.open(jQuery(t).data("ae-url"))
                        : (location.href = jQuery(t).data("ae-url")));
                  }
                }),
                a.init();
            })
          : (e.on("slideChangeTransitionStart", function () {
              e.$wrapperEl.find(".ae-featured-bg-yes").each(function () {
                if ("none" == jQuery(this).css("background-image")) {
                  let e = jQuery(this).attr("data-ae-bg");
                  jQuery(this).css("background-image", "url(" + e + ")");
                }
              }),
                e.$wrapperEl.find(".ae-bg-color-yes").each(function () {
                  let e = jQuery(this).attr("data-ae-bg-color");
                  "rgba(0, 0, 0, 0)" === jQuery(this).css("background-color") &&
                    jQuery(this).css("background-color", e);
                }),
                e.$wrapperEl
                  .find(".swiper-slide-duplicate")
                  .find(".elementor-invisible")
                  .each(function () {
                    elementorFrontend.elementsHandler.runReadyTrigger(
                      jQuery(this)
                    );
                  }),
                e.$wrapperEl
                  .find(".swiper-slide")
                  .find(".animated")
                  .each(function () {
                    elementorFrontend.elementsHandler.runReadyTrigger(
                      jQuery(this)
                    );
                  });
            }),
            e.on("click", function () {
              const a = e.clickedSlide;
              if (void 0 === a) return;
              const t = a.querySelector(".ae-link-yes");
              if (null !== t && 0 != t.length) {
                void 0 !== jQuery(t).data("ae-url") &&
                  (jQuery(t).data("ae-url") &&
                  jQuery(t).hasClass("ae-new-window-yes")
                    ? window.open(jQuery(t).data("ae-url"))
                    : (location.href = jQuery(t).data("ae-url")));
              }
            }),
            e.init());
      },
      p = function (e, a, t) {
        jQuery(".elementor-element-" + t + " .eae-swiper-container").hover(
          function () {
            e.autoplay.stop();
          },
          function () {
            e.autoplay.start();
          }
        );
      };
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/wts-ab-image.default",
      function (e, a) {
        e.find(".eae-img-comp-container")
          .imagesLoaded()
          .done(function () {
            (ab_style = e.find(".eae-img-comp-container").data("ab-style")),
              (slider_pos = e
                .find(".eae-img-comp-container")
                .data("slider-pos")),
              "horizontal" === ab_style
                ? ((separator_width = parseInt(
                    e.find(".eae-img-comp-overlay").css("border-right-width")
                  )),
                  (function (e) {
                    var a, t;
                    (a = e.find(".eae-img-comp-overlay")),
                      (t = ((t = a.width()) * slider_pos) / 100),
                      (function (a) {
                        var n,
                          i,
                          r,
                          s = 0;
                        function d(e) {
                          e.preventDefault(),
                            (s = 1),
                            window.addEventListener("mousemove", l),
                            n.addEventListener("touchmove", c);
                        }
                        function o() {
                          s = 0;
                        }
                        function l(e) {
                          var t;
                          if (0 == s) return !1;
                          (t = (function (e) {
                            var t;
                            return (
                              (e = e || window.event),
                              (t = a.getBoundingClientRect()),
                              e.pageX - t.left
                            );
                          })(e)) < 0 && (t = 0),
                            t > i && (t = i),
                            p(t);
                        }
                        function c(e) {
                          var t;
                          if (0 == s) return !1;
                          (t = (function (e) {
                            var t;
                            return (
                              (t = a.getBoundingClientRect()),
                              e.changedTouches[0].clientX - t.left
                            );
                          })(e)) < 0 && (t = 0),
                            t > i && (t = i),
                            p(t);
                        }
                        function p(e) {
                          (a.style.width = e + "px"),
                            (n.style.left =
                              a.offsetWidth -
                              n.offsetWidth / 2 -
                              separator_width / 2 +
                              "px");
                        }
                        (i = a.offsetWidth),
                          (r = a.offsetHeight),
                          (a.style.width = t + "px"),
                          ((n = (n = e.find(
                            ".eae-img-comp-slider"
                          ))[0]).style.top = r / 2 - n.offsetHeight / 2 + "px"),
                          (n.style.left =
                            t - n.offsetWidth / 2 - separator_width / 2 + "px"),
                          e.hasClass("elementor-element-edit-mode") ||
                            (n.addEventListener("mousedown", d),
                            window.addEventListener("mouseup", o),
                            n.addEventListener("touchstart", d),
                            window.addEventListener("touchstop", o));
                      })(a[0]);
                  })(e))
                : ((separator_width = parseInt(
                    e.find(".eae-img-comp-overlay").css("border-bottom-width")
                  )),
                  (function (e) {
                    var a;
                    (a = e.find(".eae-img-comp-overlay")),
                      (start_pos = a.height()),
                      (start_pos = (start_pos * slider_pos) / 100),
                      (function (a) {
                        var t,
                          n,
                          i,
                          r = 0;
                        function s(e) {
                          e.preventDefault(),
                            (r = 1),
                            window.addEventListener("mousemove", o),
                            t.addEventListener("touchmove", l);
                        }
                        function d() {
                          r = 0;
                        }
                        function o(e) {
                          var t;
                          if (0 == r) return !1;
                          (t = (function (e) {
                            var t,
                              n = 0;
                            return (
                              (e = e || window.event),
                              (t = a.getBoundingClientRect()),
                              (n = e.pageY - t.top),
                              (n -= window.pageYOffset)
                            );
                          })(e)) < 0 && (t = 0),
                            t > i && (t = i),
                            c(t);
                        }
                        function l(e) {
                          var t;
                          if (0 == r) return !1;
                          (t = (function (e) {
                            var t;
                            return (
                              (t = a.getBoundingClientRect()),
                              e.changedTouches[0].clientY - t.top
                            );
                          })(e)) < 0 && (t = 0),
                            t > i && (t = i),
                            c(t);
                        }
                        function c(e) {
                          (a.style.height = e + "px"),
                            (t.style.top =
                              a.offsetHeight -
                              t.offsetHeight / 2 -
                              separator_width / 2 +
                              "px");
                        }
                        (n = a.offsetWidth),
                          (i = a.offsetHeight),
                          (a.style.height = start_pos + "px"),
                          ((t = (t = e.find(
                            ".eae-img-comp-slider"
                          ))[0]).style.top =
                            start_pos -
                            t.offsetHeight / 2 -
                            separator_width / 2 +
                            "px"),
                          (t.style.left = n / 2 - t.offsetWidth / 2 + "px"),
                          e.hasClass("elementor-element-edit-mode") ||
                            (t.addEventListener("mousedown", s),
                            window.addEventListener("mouseup", d),
                            t.addEventListener("touchstart", s),
                            window.addEventListener("touchstop", d));
                      })(a[0]);
                  })(e));
          });
      }
    ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/global",
        function (e, a) {
          e.hasClass("eae-particle-yes") &&
            ((id = e.data("id")),
            (element_type = e.data("element_type")),
            (pdata = e.data("eae-particle")),
            (pdata_wrapper = e.find(".eae-particle-wrapper").data("eae-pdata")),
            "undefined" != typeof pdata && "" != pdata
              ? e.find(".eae-section-bs").length > 0
                ? (e
                    .find(".eae-section-bs")
                    .after(
                      '<div class="eae-particle-wrapper" id="eae-particle-' +
                        id +
                        '"></div>'
                    ),
                  particlesJS("eae-particle-" + id, pdata))
                : ("column" == element_type
                    ? e.prepend(
                        '<div class="eae-particle-wrapper" id="eae-particle-' +
                          id +
                          '"></div>'
                      )
                    : e.prepend(
                        '<div class="eae-particle-wrapper " id="eae-particle-' +
                          id +
                          '"></div>'
                      ),
                  particlesJS("eae-particle-" + id, pdata))
              : "undefined" != typeof pdata_wrapper &&
                "" != pdata_wrapper &&
                (element_type,
                e.prepend(
                  '<div class="eae-particle-wrapper eae-particle-area" id="eae-particle-' +
                    id +
                    '"></div>'
                ),
                particlesJS("eae-particle-" + id, JSON.parse(pdata_wrapper))));
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/global",
        function (e, a) {
          if (e.hasClass("eae-animated-gradient-yes"))
            if (
              ((id = e.data("id")),
              (color = e.data("color")),
              (angle = e.data("angle")),
              e.hasClass("elementor-element-edit-mode"))
            )
              (color = e.find(".animated-gradient").data("color")),
                (angle = e.find(".animated-gradient").data("angle")),
                (gradient_color_editor =
                  "linear-gradient(" + angle + "," + color + ")"),
                e.prepend(
                  '<div class="animated-gradient" style="background-image : ' +
                    gradient_color_editor +
                    ' "></div>'
                );
            else {
              var t = "linear-gradient(" + angle + "," + color + ")";
              e.css("background-image", t);
            }
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/wts-modal-popup.default",
        function (e, a) {
          $preview_modal = e.find(".eae-popup-wrapper").data("preview-modal");
          var t = e.find(".eae-popup-wrapper").data("effect");
          ($close_btn_type = e
            .find(".eae-popup-wrapper")
            .data("close-button-type")),
            ($close_btn = e.find(".eae-popup-wrapper").data("close-btn")),
            "icon" == $close_btn_type
              ? ($close_btn_html =
                  '<i class="eae-close ' + $close_btn + '"> </i>')
              : ($close_btn_html =
                  '<svg class="eae-close" style="-webkit-mask: url(' +
                  $close_btn +
                  "); mask: url(" +
                  $close_btn +
                  '); "></svg>');
          var n = e.find(".eae-popup-container"),
            i = n.attr("id");
          (popupInstance[i] = n.find(".eae-popup-content").html()),
            n.find(".eae-popup-content").html(""),
            e
              .find(".eae-popup-wrapper .eae-popup-link")
              .on("click", function () {
                n.find(".eae-popup-content").html(popupInstance[n.attr("id")]);
              }),
            ($magnific = e.find(".eae-popup-link").eaePopup({
              type: "inline",
              disableOn: 0,
              key: null,
              midClick: !1,
              mainClass:
                "eae-popup eae-popup-" +
                e.find(".eae-popup-link").data("id") +
                " eae-wrap-" +
                e.find(".eae-popup-link").data("ctrl-id"),
              preloader: !0,
              focus: "",
              closeOnContentClick: !1,
              closeOnBgClick: !0,
              closeBtnInside: e.find(".eae-popup-wrapper").data("close-in-out"),
              showCloseBtn: !0,
              enableEscapeKey: !1,
              modal: !1,
              alignTop: !1,
              removalDelay: 200,
              prependTo: null,
              fixedContentPos: !0,
              fixedBgPos: "auto",
              overflowY: "auto",
              closeMarkup: $close_btn_html,
              tClose: "Close (Esc)",
              tLoading: "Loading...",
              autoFocusLast: !0,
              callbacks: {
                beforeOpen: function () {
                  "" != t &&
                    (this.st.mainClass =
                      "eae-popup eae-popup-" +
                      e.find(".eae-popup-link").data("id") +
                      " eae-wrap-" +
                      e.find(".eae-popup-link").data("ctrl-id") +
                      " mfp-" +
                      t);
                },
                open: function () {
                  var a = e.find(".eae-popup-link").data("id"),
                    t = jQuery(".eae-popup-" + a + " .elementor-widget-wrap");
                  t.find(".elementor-section").each(function () {
                    elementorFrontend.elementsHandler.runReadyTrigger(
                      jQuery(this)
                    );
                  }),
                    t.find(".elementor-column").each(function () {
                      elementorFrontend.elementsHandler.runReadyTrigger(
                        jQuery(this)
                      );
                    }),
                    t.find(".elementor-widget").each(function () {
                      elementorFrontend.elementsHandler.runReadyTrigger(
                        jQuery(this)
                      );
                    });
                },
                close: function () {
                  n.find(".eae-popup-content").html("");
                },
              },
            })),
            "yes" == $preview_modal &&
              e.hasClass("elementor-element-edit-mode") &&
              e.find(".eae-popup-link").click();
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/wts-testimonial-slider.default",
        function (e, a) {
          if (e.find(".eae-grid-wrapper").hasClass("eae-masonry-yes")) {
            var t = e.find(".eae-grid").masonry({});
            t.imagesLoaded().progress(function () {
              t.masonry("layout");
            });
          }
          if (e.find(".eae-layout-carousel").length) {
            (outer_wrapper = e.find(".eae-swiper-outer-wrapper")),
              (wid = e.data("id")),
              (wclass = ".elementor-element-" + wid);
            var n = outer_wrapper.data("direction"),
              i = outer_wrapper.data("speed"),
              r = outer_wrapper.data("autoplay"),
              s = outer_wrapper.data("duration"),
              d = outer_wrapper.data("effect"),
              o = outer_wrapper.data("space"),
              l = outer_wrapper.data("loop");
            l = "yes" == l;
            var c = outer_wrapper.data("slides-per-view"),
              p = outer_wrapper.data("slides-per-group"),
              f = outer_wrapper.data("ptype"),
              m = outer_wrapper.data("navigation"),
              u = outer_wrapper.data("clickable"),
              h = outer_wrapper.data("keyboard"),
              w = outer_wrapper.data("scrollbar");
            (adata = {
              direction: n,
              effect: d,
              spaceBetween: o.desktop,
              loop: l,
              speed: i,
              slidesPerView: c.desktop,
              slidesPerGroup: p.desktop,
              observer: !0,
              mousewheel: { invert: !0 },
              breakpoints: {
                1024: {
                  spaceBetween: o.tablet,
                  slidesPerView: c.tablet,
                  slidesPerGroup: p.tablet,
                },
                767: {
                  spaceBetween: o.mobile,
                  slidesPerView: c.mobile,
                  slidesPerGroup: p.mobile,
                },
              },
            }),
              "fade" == d && (adata.fadeEffect = { crossFade: !1 }),
              (adata.autoplay = "yes" == r && {
                delay: s,
                disableOnInteraction: !1,
              }),
              "yes" == m &&
                (adata.navigation = {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }),
              "" != f &&
                (adata.pagination = { el: ".swiper-pagination", type: f }),
              "bullets" == f &&
                "yes" == u &&
                (adata.pagination = {
                  el: ".swiper-pagination",
                  clickable: !0,
                  type: f,
                }),
              "yes" == w &&
                (adata.scrollbar = { el: ".swiper-scrollbar", draggable: !0 }),
              "yes" == h &&
                (adata.keyboard = { enabled: !0, onlyInViewport: !0 }),
              0 == l &&
                (adata.autoplay = {
                  delay: s,
                  stopOnLastSlide: !0,
                  disableOnInteraction: !1,
                }),
              (window.mswiper = new Swiper(
                ".elementor-element-" +
                  wid +
                  " .eae-swiper-outer-wrapper .swiper-container",
                adata
              )),
              a(
                ".elementor-element-" +
                  wid +
                  " .eae-swiper-outer-wrapper .swiper-container"
              ).css("visibility", "visible");
          }
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-info-circle.skin1",
        a
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-info-circle.skin2",
        a
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-info-circle.skin3",
        a
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-info-circle.skin4",
        a
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-timeline.skin1",
        t
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-timeline.skin2",
        t
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-timeline.skin3",
        t
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-timeline.skin4",
        t
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-evergreen-timer.skin1",
        function (e, a) {
          var t = e.find(".eae-evergreen-wrapper").data("egtime"),
            r = e.find(".eae-evergreen-wrapper").data("egt-expire"),
            s = e.find(".eae-evergreen-wrapper").data("element-type"),
            d = "eae-" + e.find(".eae-evergreen-wrapper").data("id"),
            o = "eae-temp-" + e.find(".eae-evergreen-wrapper").data("id"),
            l = e.find(".eae-evergreen-wrapper").data("actions"),
            c = e.find(".eae-evergreen-wrapper").data("unqid"),
            p = new Date().getTime();
          if (!e.hasClass("elementor-element-edit-mode"))
            if ("countdown" === s) {
              (u = new Date(t)), (t = u.getTime());
              var f = "expires=" + u.toUTCString();
              document.cookie = o + "=" + u.getTime() + ";" + f + ";path=/";
            } else {
              var m = i(d),
                u = "";
              if ("" !== m) {
                (u = new Date(parseInt(m))).setSeconds(
                  u.getSeconds() +
                    e.find(".eae-evergreen-wrapper").data("egtime")
                ),
                  (t = u.getTime());
                var h = new Date(parseInt(m));
                h.setTime(h.getTime() + 60 * r * 60 * 1e3);
                var w = "expires=" + h.toUTCString();
                document.cookie = d + "=" + m + ";" + w + ";path=/";
                var g = new Date(parseInt(m));
                g.setTime(
                  g.getTime() +
                    1e3 * e.find(".eae-evergreen-wrapper").data("egtime")
                );
                f = "expires=" + g.toUTCString();
                t - p > 0 &&
                  (document.cookie = o + "=" + m + ";" + f + ";path=/");
              } else {
                (temp_date = t),
                  (u = new Date()).setSeconds(
                    u.getSeconds() +
                      e.find(".eae-evergreen-wrapper").data("egtime")
                  ),
                  (t = u.getTime()),
                  n(d, new Date().getTime(), r);
                var v = new Date();
                v.setTime(v.getTime() + 1e3 * temp_date);
                var y = "expires=" + v.toUTCString();
                document.cookie =
                  o + "=" + new Date().getTime() + ";" + y + ";path=/";
              }
            }
          if (!e.hasClass("elementor-element-edit-mode") && t - p < 0)
            return (
              l.length > 0 &&
                l.forEach(function (t) {
                  "redirect" === t &&
                    (($url = e
                      .find(".eae-evergreen-wrapper")
                      .data("redirected-url")),
                    "" !== a.trim($url) && (window.location.href = $url1)),
                    "hide" === t &&
                      (e.hasClass("elementor-element-edit-mode") ||
                        (e.find("#eaeclockdiv").css("display", "none"),
                        e.find(".egt-title").css("display", "none"))),
                    "message" === t &&
                      e.find(".eae-egt-message").css("display", "block"),
                    "hide_parent" === t &&
                      (e.hasClass("elementor-element-edit-mode") ||
                        (($p_secs = e.closest("section")),
                        $p_secs.css("display", "none")));
                }),
              (days = "00"),
              (hours = "00"),
              (minutes = "00"),
              (seconds = "00"),
              e
                .find("." + c)
                .find("#eaedivDays")
                .html(days),
              e
                .find("." + c)
                .find("#eaedivHours")
                .html(hours.slice(-2)),
              e
                .find("." + c)
                .find("#eaedivMinutes")
                .html(minutes.slice(-2)),
              void e
                .find("." + c)
                .find("#eaedivSeconds")
                .html(seconds.slice(-2))
            );
          e.hasClass("elementor-element-edit-mode") &&
            ("countdown" === s
              ? ((u = new Date(t)), (t = u.getTime()))
              : ((u = new Date()).setSeconds(
                  u.getSeconds() +
                    e.find(".eae-evergreen-wrapper").data("egtime")
                ),
                (t = u.getTime())));
          var b = setInterval(function () {
            var n = new Date().getTime(),
              i = t - n,
              r = 0,
              s = 0,
              d = 0,
              o = 0;
            i > 0
              ? ((r = Math.floor(i / 864e5)),
                (s = "0" + Math.floor((i % 864e5) / 36e5)),
                (d = "0" + Math.floor((i % 36e5) / 6e4)),
                (o = "0" + Math.floor((i % 6e4) / 1e3)))
              : (l.length > 0 &&
                  (e.hasClass("elementor-element-edit-mode") ||
                    l.forEach(function (t) {
                      "redirect" === t &&
                        (($url1 = e
                          .find(".eae-evergreen-wrapper")
                          .data("redirected-url")),
                        "" !== a.trim($url1) && (window.location.href = $url1)),
                        "hide" === t &&
                          (e.find("#eaeclockdiv").css("display", "none"),
                          e.find(".egt-title").css("display", "none")),
                        "message" === t &&
                          e.find(".eae-egt-message").css("display", "block"),
                        "hide_parent" === t &&
                          (e.hasClass("elementor-element-edit-mode") ||
                            (($p_secs = e.closest("section")),
                            $p_secs.css("display", "none")));
                    })),
                clearInterval(b),
                (r = "0"),
                (s = "00"),
                (d = "00"),
                (o = "00")),
              r < 10 && (r = "0" + r),
              e
                .find("." + c)
                .find("#eaedivDays")
                .html(r),
              e
                .find("." + c)
                .find("#eaedivHours")
                .html(s.slice(-2)),
              e
                .find("." + c)
                .find("#eaedivMinutes")
                .html(d.slice(-2)),
              e
                .find("." + c)
                .find("#eaedivSeconds")
                .html(o.slice(-2));
          }, 1e3);
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-evergreen-timer.skin2",
        function (e, a) {
          var t = e.find(".eae-evergreen-wrapper").data("egtime"),
            r = e.find(".eae-evergreen-wrapper").data("egt-expire"),
            s = e.find(".eae-evergreen-wrapper").data("element-type"),
            d = "eae-" + e.find(".eae-evergreen-wrapper").data("id"),
            o = "eae-temp-" + e.find(".eae-evergreen-wrapper").data("id"),
            l = e.find(".eae-evergreen-wrapper").data("actions"),
            c = e.find(".eae-evergreen-wrapper").data("unqid"),
            p = new Date().getTime();
          if (!e.hasClass("elementor-element-edit-mode"))
            if ("countdown" === s) {
              (u = new Date(t)), (t = u.getTime());
              var f = "expires=" + u.toUTCString();
              document.cookie = o + "=" + u.getTime() + ";" + f + ";path=/";
            } else {
              var m = i(d),
                u = "";
              if ("" !== m) {
                (u = new Date(parseInt(m))).setSeconds(
                  u.getSeconds() +
                    e.find(".eae-evergreen-wrapper").data("egtime")
                ),
                  (t = u.getTime());
                var h = new Date(parseInt(m));
                h.setTime(h.getTime() + 60 * r * 60 * 1e3);
                var w = "expires=" + h.toUTCString();
                document.cookie = d + "=" + m + ";" + w + ";path=/";
                var g = new Date(parseInt(m));
                g.setTime(
                  g.getTime() +
                    1e3 * e.find(".eae-evergreen-wrapper").data("egtime")
                );
                f = "expires=" + g.toUTCString();
                t - p > 0 &&
                  (document.cookie = o + "=" + m + ";" + f + ";path=/");
              } else {
                (temp_date = t),
                  (u = new Date()).setSeconds(
                    u.getSeconds() +
                      e.find(".eae-evergreen-wrapper").data("egtime")
                  ),
                  (t = u.getTime()),
                  n(d, new Date().getTime(), r);
                var v = new Date();
                v.setTime(v.getTime() + 1e3 * temp_date);
                var y = "expires=" + v.toUTCString();
                document.cookie =
                  o + "=" + new Date().getTime() + ";" + y + ";path=/";
              }
            }
          if (!e.hasClass("elementor-element-edit-mode") && t - p < 0)
            return void (
              l.length > 0 &&
              l.forEach(function (t) {
                "redirect" === t &&
                  (($url = e
                    .find(".eae-evergreen-wrapper")
                    .data("redirected-url")),
                  "" !== a.trim($url) && (window.location.href = $url)),
                  "hide" === t &&
                    (e
                      .find("." + c)
                      .find(".timer-container")
                      .css("display", "none"),
                    e
                      .find("." + c)
                      .find(".egt-title")
                      .css("display", "none")),
                  "message" === t &&
                    e
                      .find("." + c)
                      .find(".eae-egt-message")
                      .css("display", "block"),
                  "hide_parent" === t &&
                    (e.hasClass("elementor-element-edit-mode") ||
                      (($p_secs = e.closest("section")),
                      $p_secs.css("display", "none")));
              })
            );
          e.hasClass("elementor-element-edit-mode") &&
            ("countdown" === s
              ? ((u = new Date(t)), (t = u.getTime()))
              : ((u = new Date()).setSeconds(
                  u.getSeconds() +
                    e.find(".eae-evergreen-wrapper").data("egtime")
                ),
                (t = u.getTime())));
          var b = setInterval(function () {
            var n = new Date().getTime(),
              i = t - n,
              r = Math.floor(i / 864e5),
              s = Math.floor((i % 864e5) / 36e5),
              d = Math.floor((i % 36e5) / 6e4),
              o = Math.floor((i % 6e4) / 1e3);
            if (
              (e
                .find("." + c)
                .find("#eaeulSec1")
                .find(".flip-clock-active")
                .removeClass("flip-clock-active"),
              e
                .find("." + c)
                .find("#eaeulSec1")
                .find(".flip-clock-before")
                .removeClass("flip-clock-before"),
              e
                .find("." + c)
                .find("#eaeulSec")
                .find(".flip-clock-active")
                .removeClass("flip-clock-active"),
              e
                .find("." + c)
                .find("#eaeulSec")
                .find(".flip-clock-before")
                .removeClass("flip-clock-before"),
              i < 0)
            )
              return (
                clearInterval(b),
                void (
                  l.length > 0 &&
                  l.forEach(function (t) {
                    "redirect" === t &&
                      (e.hasClass("elementor-element-edit-mode") ||
                        (($url1 = e
                          .find(".eae-evergreen-wrapper")
                          .data("redirected-url")),
                        "" !== a.trim($url1) &&
                          (window.location.href = $url1))),
                      "hide" === t &&
                        (e.hasClass("elementor-element-edit-mode") ||
                          (e
                            .find("." + c)
                            .find(".timer-container")
                            .css("display", "none"),
                          e
                            .find("." + c)
                            .find(".egt-title")
                            .css("display", "none"))),
                      "message" === t &&
                        (e.hasClass("elementor-element-edit-mode") ||
                          e
                            .find("." + c)
                            .find(".eae-egt-message")
                            .css("display", "block")),
                      "hide_parent" === t &&
                        (e.hasClass("elementor-element-edit-mode") ||
                          (($p_secs = e.closest("section")),
                          $p_secs.css("display", "none")));
                  })
                )
              );
            if (2 === a.trim(o).length) {
              var p = "#eaeulSec1 li:eq( " + a.trim(o).charAt(1) + " )",
                f = "#eaeulSec li:eq( " + a.trim(o).charAt(0) + " )";
              e
                .find("." + c)
                .find(p)
                .next().length > 0
                ? (e
                    .find("." + c)
                    .find(p)
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find(p)
                    .next()
                    .addClass("flip-clock-before"))
                : (e
                    .find("." + c)
                    .find("#eaeulSec1 li:last-child")
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find("#eaeulSec1 li:first-child")
                    .addClass("flip-clock-before")),
                e
                  .find("." + c)
                  .find(f)
                  .next().length > 0
                  ? (e
                      .find("." + c)
                      .find(f)
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find(f)
                      .next()
                      .addClass("flip-clock-before"))
                  : (e
                      .find("." + c)
                      .find("#eaeulSec li:last-child")
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find("#eaeulSec li:first-child")
                      .addClass("flip-clock-before"));
            } else {
              (p = "#eaeulSec1 li:eq( " + a.trim(o).charAt(0) + " )"),
                (f = "#eaeulSec li:eq( 0 )");
              e
                .find("." + c)
                .find(p)
                .next().length > 0
                ? (e
                    .find("." + c)
                    .find(p)
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find(p)
                    .next()
                    .addClass("flip-clock-before"))
                : (e
                    .find("." + c)
                    .find("#eaeulSec1 li:last-child")
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find("#eaeulSec1 li:first-child")
                    .addClass("flip-clock-before")),
                e
                  .find("." + c)
                  .find(f)
                  .next().length > 0
                  ? (e
                      .find("." + c)
                      .find(f)
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find(f)
                      .next()
                      .addClass("flip-clock-before"))
                  : (e
                      .find("." + c)
                      .find("#eaeulSec li:last-child")
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find("#eaeulSec li:first-child")
                      .addClass("flip-clock-before"));
            }
            if (
              (e
                .find("." + c)
                .find("#eaeulMin1")
                .find(".flip-clock-active")
                .removeClass("flip-clock-active"),
              e
                .find("." + c)
                .find("#eaeulMin1")
                .find(".flip-clock-before")
                .removeClass("flip-clock-before"),
              e
                .find("." + c)
                .find("#eaeulMin")
                .find(".flip-clock-active")
                .removeClass("flip-clock-active"),
              e
                .find("." + c)
                .find("#eaeulMin")
                .find(".flip-clock-before")
                .removeClass("flip-clock-before"),
              2 == a.trim(d).length)
            ) {
              (p = "#eaeulMin1 li:eq( " + a.trim(d).charAt(1) + " )"),
                (f = "#eaeulMin li:eq( " + a.trim(d).charAt(0) + " )");
              e
                .find("." + c)
                .find(p)
                .next().length > 0
                ? (e
                    .find("." + c)
                    .find(p)
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find(p)
                    .next()
                    .addClass("flip-clock-before"))
                : (e
                    .find("." + c)
                    .find("#eaeulMin1 li:last-child")
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find("#eaeulMin1 li:first-child")
                    .addClass("flip-clock-before")),
                e
                  .find("." + c)
                  .find(f)
                  .next().length > 0
                  ? (e
                      .find("." + c)
                      .find(f)
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find(f)
                      .next()
                      .addClass("flip-clock-before"))
                  : (e
                      .find("." + c)
                      .find("#eaeulMin li:last-child")
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find("#eaeulMin li:first-child")
                      .addClass("flip-clock-before"));
            } else {
              (p = "#eaeulMin1 li:eq( " + a.trim(d).charAt(0) + " )"),
                (f = "#eaeulMin li:eq( 0 )");
              e
                .find("." + c)
                .find(p)
                .next().length > 0
                ? (e
                    .find("." + c)
                    .find(p)
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find(p)
                    .next()
                    .addClass("flip-clock-before"))
                : (e
                    .find("." + c)
                    .find("#eaeulMin1 li:last-child")
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find("#eaeulMin1 li:first-child")
                    .addClass("flip-clock-before")),
                e
                  .find("." + c)
                  .find(f)
                  .next().length > 0
                  ? (e
                      .find("." + c)
                      .find(f)
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find(f)
                      .next()
                      .addClass("flip-clock-before"))
                  : (e
                      .find("." + c)
                      .find("#eaeulMin li:last-child")
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find("#eaeulMin li:first-child")
                      .addClass("flip-clock-before"));
            }
            if (
              (e
                .find("." + c)
                .find("#eaeulHour1")
                .find(".flip-clock-active")
                .removeClass("flip-clock-active"),
              e
                .find("." + c)
                .find("#eaeulHour1")
                .find(".flip-clock-before")
                .removeClass("flip-clock-before"),
              e
                .find("." + c)
                .find("#eaeulHour")
                .find(".flip-clock-active")
                .removeClass("flip-clock-active"),
              e
                .find("." + c)
                .find("#eaeulHour")
                .find(".flip-clock-before")
                .removeClass("flip-clock-before"),
              2 == a.trim(s).length)
            ) {
              (p = "#eaeulHour1 li:eq( " + a.trim(s).charAt(1) + " )"),
                (f = "#eaeulHour li:eq( " + a.trim(s).charAt(0) + " )");
              e
                .find("." + c)
                .find(p)
                .next().length > 0
                ? (e
                    .find("." + c)
                    .find(p)
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find(p)
                    .next()
                    .addClass("flip-clock-before"))
                : (e
                    .find("." + c)
                    .find("#eaeulHour1 li:last-child")
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find("#eaeulHour1 li:first-child")
                    .addClass("flip-clock-before")),
                e
                  .find("." + c)
                  .find(f)
                  .next().length > 0
                  ? (e
                      .find("." + c)
                      .find(f)
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find(f)
                      .next()
                      .addClass("flip-clock-before"))
                  : (e
                      .find("." + c)
                      .find("#eaeulHour li:last-child")
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find("#eaeulHour li:first-child")
                      .addClass("flip-clock-before"));
            } else {
              (p = "#eaeulHour1 li:eq( " + a.trim(s).charAt(0) + " )"),
                (f = "#eaeulHour li:eq( 0 )");
              e
                .find("." + c)
                .find(p)
                .next().length > 0
                ? (e
                    .find("." + c)
                    .find(p)
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find(p)
                    .next()
                    .addClass("flip-clock-before"))
                : (e
                    .find("." + c)
                    .find("#eaeulHour1 li:last-child")
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find("#eaeulHour li:first-child")
                    .addClass("flip-clock-before")),
                e
                  .find("." + c)
                  .find(f)
                  .next().length > 0
                  ? (e
                      .find("." + c)
                      .find(f)
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find(f)
                      .next()
                      .addClass("flip-clock-before"))
                  : (e
                      .find("." + c)
                      .find("#eaeulHour li:last-child")
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find("#eaeulHour li:first-child")
                      .addClass("flip-clock-before"));
            }
            if (
              (e
                .find("." + c)
                .find("#eaeulDay1")
                .find(".flip-clock-active")
                .removeClass("flip-clock-active"),
              e
                .find("." + c)
                .find("#eaeulDay1")
                .find(".flip-clock-before")
                .removeClass("flip-clock-before"),
              e
                .find("." + c)
                .find("#eaeulDay")
                .find(".flip-clock-active")
                .removeClass("flip-clock-active"),
              e
                .find("." + c)
                .find("#eaeulDay")
                .find(".flip-clock-before")
                .removeClass("flip-clock-before"),
              2 == a.trim(r).length)
            ) {
              (p = "#eaeulDay1 li:eq( " + a.trim(r).charAt(1) + " )"),
                (f = "#eaeulDay li:eq( " + a.trim(r).charAt(0) + " )");
              e
                .find("." + c)
                .find(p)
                .next().length > 0
                ? (e
                    .find("." + c)
                    .find(p)
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find(p)
                    .next()
                    .addClass("flip-clock-before"))
                : (e
                    .find("." + c)
                    .find("#eaeulDay1 li:last-child")
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find("#eaeulDay1 li:first-child")
                    .addClass("flip-clock-before")),
                e
                  .find("." + c)
                  .find(f)
                  .next().length > 0
                  ? (e
                      .find("." + c)
                      .find(f)
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find(f)
                      .next()
                      .addClass("flip-clock-before"))
                  : (e
                      .find("." + c)
                      .find("#eaeulDay li:last-child")
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find("#eaeulDay li:first-child")
                      .addClass("flip-clock-before"));
            } else {
              (p = "#eaeulDay1 li:eq( " + a.trim(r).charAt(0) + " )"),
                (f = "#eaeulDay li:eq( 0 )");
              e
                .find("." + c)
                .find(p)
                .next().length > 0
                ? (e
                    .find("." + c)
                    .find(p)
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find(p)
                    .next()
                    .addClass("flip-clock-before"))
                : (e
                    .find("." + c)
                    .find("#eaeulDay1 li:last-child")
                    .addClass("flip-clock-active"),
                  e
                    .find("." + c)
                    .find("#eaeulDay li:first-child")
                    .addClass("flip-clock-before")),
                e
                  .find("." + c)
                  .find(f)
                  .next().length > 0
                  ? (e
                      .find("." + c)
                      .find(f)
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find(f)
                      .next()
                      .addClass("flip-clock-before"))
                  : (e
                      .find("." + c)
                      .find("#eaeulDay li:last-child")
                      .addClass("flip-clock-active"),
                    e
                      .find("." + c)
                      .find("#eaeulDay li:first-child")
                      .addClass("flip-clock-before"));
            }
          }, 1e3);
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-evergreen-timer.skin3",
        function (e, a) {
          var t,
            r = e.find(".eae-evergreen-wrapper").data("egtime"),
            s = e.find(".eae-evergreen-wrapper").data("egt-expire"),
            d = e.find(".eae-evergreen-wrapper").data("element-type"),
            o = "eae-" + e.find(".eae-evergreen-wrapper").data("id"),
            l = "eae-temp-" + e.find(".eae-evergreen-wrapper").data("id"),
            c = e.find(".eae-evergreen-wrapper").data("actions"),
            p = e.find(".eae-evergreen-wrapper").data("days"),
            f = e.find(".eae-evergreen-wrapper").data("hours"),
            m = e.find(".eae-evergreen-wrapper").data("mins"),
            u = e.find(".eae-evergreen-wrapper").data("seconds"),
            h = e.find(".eae-evergreen-wrapper").data("unqid"),
            w = new Date().getTime();
          if (!e.hasClass("elementor-element-edit-mode"))
            if ("countdown" === d) {
              (y = new Date(r)), (r = y.getTime());
              var g = "expires=" + y.toUTCString();
              document.cookie = l + "=" + y.getTime() + ";" + g + ";path=/";
            } else {
              var v = i(o),
                y = "";
              if ("" !== v) {
                (y = new Date(parseInt(v))).setSeconds(
                  y.getSeconds() +
                    e.find(".eae-evergreen-wrapper").data("egtime")
                ),
                  (r = y.getTime());
                var b = new Date(parseInt(v));
                b.setTime(b.getTime() + 60 * s * 60 * 1e3);
                var k = "expires=" + b.toUTCString();
                document.cookie = o + "=" + v + ";" + k + ";path=/";
                var C = new Date(parseInt(v));
                C.setTime(
                  C.getTime() +
                    1e3 * e.find(".eae-evergreen-wrapper").data("egtime")
                );
                g = "expires=" + C.toUTCString();
                r - w > 0 &&
                  (document.cookie = l + "=" + v + ";" + g + ";path=/");
              } else {
                (temp_date = r),
                  (y = new Date()).setSeconds(
                    y.getSeconds() +
                      e.find(".eae-evergreen-wrapper").data("egtime")
                  ),
                  (r = y.getTime()),
                  n(o, new Date().getTime(), s);
                var _ = new Date();
                _.setTime(_.getTime() + 1e3 * temp_date);
                var T = "expires=" + _.toUTCString();
                document.cookie =
                  l + "=" + new Date().getTime() + ";" + T + ";path=/";
              }
            }
          if (!e.hasClass("elementor-element-edit-mode")) {
            var x = D(r);
            if (parseInt(x.all) < 1) {
              if (
                c.length > 0 &&
                (c.forEach(function (a) {
                  "redirect" === a &&
                    (e.hasClass("elementor-element-edit-mode") ||
                      (($url = e
                        .find(".eae-evergreen-wrapper")
                        .data("redirected-url")),
                      "" !== $url && (window.location.href = $url))),
                    "hide_parent" === a &&
                      (e.hasClass("elementor-element-edit-mode") ||
                        (($p_secs = e.closest("section")),
                        $p_secs.css("display", "none"))),
                    "hide" === a &&
                      (e.find("#timer").css("display", "none"),
                      e.find(".egt-title").css("display", "none"),
                      e.find(".desc").css("display", "none")),
                    "message" === a &&
                      e.find(".eae-egt-message").css("display", "block");
                }),
                1 === c.length && ("" === c[0] || "message" === c[0]))
              ) {
                var $ = e.find("." + h).find("#timer")[0];
                "yes" === p &&
                  ($.innerHTML =
                    "<span class='egt-time eae-time-wrapper'><div>00</div></span>"),
                  "yes" === f &&
                    ("yes" === p
                      ? a($).append(
                          "<span class='egt-time eae-time-wrapper'><div>00</div></span>"
                        )
                      : ($.innerHTML =
                          "<span class='egt-time eae-time-wrapper'><div>00</div></span>")),
                  "yes" === m &&
                    ("yes" === p || "yes" === f
                      ? a($).append(
                          "<span class='egt-time eae-time-wrapper'><div>00</div></span>"
                        )
                      : ($.innerHTML =
                          "<span class='egt-time eae-time-wrapper'><div>00</div></span>")),
                  "yes" === u &&
                    ("yes" === p || "yes" === f || "yes" === m
                      ? a($).append(
                          "<span class='egt-time eae-time-wrapper'><div>00</div></span>"
                        )
                      : ($.innerHTML =
                          "<span class='egt-time eae-time-wrapper'><div>00</div></span>"));
              }
              return;
            }
          }
          function D(e) {
            var a = r - new Date();
            return {
              days: Math.floor(a / 864e5),
              hours: "0" + Math.floor((a / 36e5) % 24),
              minutes: "0" + Math.floor((a / 6e4) % 60),
              seconds: "0" + Math.floor((a / 1e3) % 60),
              all: a,
            };
          }
          function S(e) {
            e.classList.add("fade"),
              setTimeout(function () {
                e.classList.remove("fade");
              }, 700);
          }
          e.hasClass("elementor-element-edit-mode") &&
            ("countdown" === d
              ? ((y = new Date(r)), (r = y.getTime()))
              : ((y = new Date()).setSeconds(
                  y.getSeconds() +
                    e.find(".eae-evergreen-wrapper").data("egtime")
                ),
                (r = y.getTime()))),
            D(r).all > 1 &&
              (t = setInterval(function () {
                var n = e.find("." + h).find("#timer")[0],
                  i = D(r);
                "yes" === p &&
                  (i.days < 10 && (i.days = "0" + i.days),
                  (n.innerHTML =
                    "<span class='egt-time eae-time-wrapper'><div>" +
                    i.days +
                    "</div></span>")),
                  "yes" === f &&
                    ("yes" === p
                      ? a(n).append(
                          "<span class='egt-time eae-time-wrapper'><div>" +
                            i.hours.slice(-2) +
                            "</div></span>"
                        )
                      : (n.innerHTML =
                          "<span class='egt-time eae-time-wrapper'><div>" +
                          i.hours.slice(-2) +
                          "</div></span>")),
                  "yes" === m &&
                    ("yes" === p || "yes" === f
                      ? a(n).append(
                          "<span class='egt-time eae-time-wrapper'><div>" +
                            i.minutes.slice(-2) +
                            "</div></span>"
                        )
                      : (n.innerHTML =
                          "<span class='egt-time eae-time-wrapper'><div>" +
                          i.minutes.slice(-2) +
                          "</div></span>")),
                  "yes" === u &&
                    ("yes" === p || "yes" === f || "yes" === m
                      ? a(n).append(
                          "<span class='egt-time eae-time-wrapper'><div>" +
                            i.seconds.slice(-2) +
                            "</div></span>"
                        )
                      : (n.innerHTML =
                          "<span class='egt-time eae-time-wrapper'><div>" +
                          i.seconds.slice(-2) +
                          "</div></span>"));
                var s = n.getElementsByTagName("span");
                "yes" === p &&
                  59 == i.hours &&
                  59 == i.minutes &&
                  59 == i.seconds &&
                  S(s[0]),
                  "yes" === f &&
                    ("yes" === p
                      ? 59 == i.minutes && 59 == i.seconds && S(s[1])
                      : 59 == i.minutes && 59 == i.seconds && S(s[0])),
                  "yes" === m &&
                    ("yes" === p
                      ? "yes" === f
                        ? 59 == i.seconds && S(s[2])
                        : 59 == i.seconds && S(s[1])
                      : "yes" === f
                      ? 59 == i.seconds && S(s[1])
                      : 59 == i.seconds && S(s[0])),
                  "yes" === u &&
                    ("yes" === p
                      ? "yes" === f
                        ? "yes" === m && S(s[3])
                        : S("yes" === m ? s[2] : s[1])
                      : "yes" === f
                      ? "yes" === m && S(s[2])
                      : S("yes" === m ? s[1] : s[0])),
                  i.all <= 1 &&
                    (clearInterval(t),
                    "yes" === p &&
                      (n.innerHTML =
                        "<span class='egt-time eae-time-wrapper'><div>00</div></span>"),
                    "yes" === f &&
                      ("yes" === p
                        ? a(n).append(
                            "<span class='egt-time eae-time-wrapper'><div>00</div></span>"
                          )
                        : (n.innerHTML =
                            "<span class='egt-time eae-time-wrapper'><div>00</div></span>")),
                    "yes" === m &&
                      ("yes" === p || "yes" === f
                        ? a(n).append(
                            "<span class='egt-time eae-time-wrapper'><div>00</div></span>"
                          )
                        : (n.innerHTML =
                            "<span class='egt-time eae-time-wrapper'><div>00</div></span>")),
                    "yes" === u &&
                      ("yes" === p || "yes" === f || "yes" === m
                        ? a(n).append(
                            "<span class='egt-time eae-time-wrapper'><div>00</div></span>"
                          )
                        : (n.innerHTML =
                            "<span class='egt-time eae-time-wrapper'><div>00</div></span>")),
                    e.hasClass("elementor-element-edit-mode") ||
                      (c.length > 0 &&
                        c.forEach(function (a) {
                          "redirect" === a &&
                            (($url1 = e
                              .find(".eae-evergreen-wrapper")
                              .data("redirected-url")),
                            "" !== $url1 && (window.location.href = $url1)),
                            "hide" === a &&
                              (e.find("#timer").css("display", "none"),
                              e.find(".egt-title").css("display", "none"),
                              e.find(".desc").css("display", "none")),
                            "message" === a &&
                              e
                                .find(".eae-egt-message")
                                .css("display", "block"),
                            "hide_parent" === a &&
                              (($p_secs = e.closest("section")),
                              $p_secs.css("display", "none"));
                        })));
              }, 1e3));
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-comparisontable.default",
        function (e, a) {
          a(e.find(".eae-ct-heading")[0]).addClass("active"),
            e.find("ul").on("click", "li", function () {
              var t = a(this).index() + 2;
              e.find("tr").find("td:not(:eq(0))").hide(),
                e.find("td:nth-child(" + t + ")").css("display", "table-cell"),
                e.find("tr").find("th:not(:eq(0))").hide(),
                e.find("li").removeClass("active"),
                a(this).addClass("active");
            });
          var t = window.matchMedia("(min-width: 767px)");
          function n(a) {
            a.matches
              ? e.find(".sep").attr("colspan", 5)
              : e.find(".sep").attr("colspan", 2);
          }
          t.addListener(n), n(t);
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-progress-bar.skin1",
        r
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-progress-bar.skin2",
        r
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-progress-bar.skin3",
        r
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-progress-bar.skin4",
        r
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-progress-bar.skin5",
        r
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-filterableGallery.default",
        function (e, a) {
          var t = e.find(".eae-fg-wrapper"),
            n = e.data("id"),
            i = t.attr("data-maxtilt"),
            r = t.attr("data-perspective"),
            s = t.attr("data-speed"),
            d = t.attr("data-tilt-axis"),
            o = t.attr("data-glare"),
            l = parseInt(t.attr("data-overlay-speed"));
          if (((d = "x" === d ? "y" : "y" === d ? "x" : "both"), "yes" === o))
            var c = t.attr("data-max-glare");
          o = "yes" === o;
          var p = a(".elementor-element-" + n + " .eae-fg-image"),
            f = t.hasClass("masonry-yes") ? "masonry" : "fitRows";
          p.outerHeight();
          (adata = {
            percentPosition: !0,
            animationOptions: { duration: 750, easing: "linear", queue: !1 },
          }),
            "fitRows" === f && (adata.layoutMode = "fitRows"),
            "masonry" === f &&
              (adata.masonry = {
                columnWidth: ".eae-gallery-item",
                horizontalOrder: !0,
              }),
            e.hasClass("eae-show-all-yes") ||
              (e.find(".eae-gallery-filter a").first().addClass("current"),
              (adata.filter = e
                .find(".eae-gallery-filter a")
                .first()
                .attr("data-filter")));
          var m = p.isotope(adata);
          m.imagesLoaded().progress(function () {
            m.isotope("layout");
          }),
            e.find(".eae-tilt-yes") &&
              ((atilt = {
                maxTilt: i,
                perspective: r,
                easing: "linear",
                scale: 1,
                speed: s,
                disableAxis: d,
                transition: !0,
                reset: !0,
                glare: o,
                maxGlare: c,
              }),
              e.find(".el-tilt").tilt(atilt)),
            a(".elementor-element-" + n + " .eae-gallery-filter a").on(
              "click",
              function () {
                e.find(".eae-gallery-filter .current").removeClass("current"),
                  a(this).addClass("current");
                var t = a(this).attr("data-filter");
                adata.filter = t;
                var n = p.isotope(adata);
                return (
                  n.imagesLoaded().progress(function () {
                    if ((n.isotope("layout"), isEditMode)) return !1;
                    e.find(".eae-tilt-yes") &&
                      (e.find(".el-tilt").tilt(atilt),
                      e.find(".el-tilt").tilt.reset.call(e.find(".el-tilt")));
                  }),
                  !1
                );
              }
            ),
            t.hasClass("eae-hover-direction-effect") ||
              e.find(".eae-gallery-item-inner").hover(function () {
                a(this).find(".eae-grid-overlay").addClass("animated");
              }),
            t.hasClass("eae-hover-direction-effect") &&
              (e.find(".eae-gallery-item-inner").hover(function () {
                a(this).find(".eae-grid-overlay").addClass("overlay");
              }),
              t
                .find(".eae-gallery-item-inner")
                .EAEHoverDirection({ speed: l }));
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-content-switcher.skin1",
        s
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-content-switcher.skin2",
        s
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-content-switcher.skin3",
        d
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-content-switcher.skin4",
        d
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/global",
        function (e, a) {
          isEditMode ||
            (e.data("wts-url") &&
              "yes" == e.data("wts-link") &&
              e.on("click", function (a) {
                e.data("wts-url") && "yes" == e.data("wts-new-window")
                  ? window.open(e.data("wts-url"))
                  : (location.href = e.data("wts-url"));
              }));
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-thumbgallery.default",
        function (e, a) {
          let t;
          (swiper_outer_wrapper = e.find(".eae-swiper-outer-wrapper")),
            (wid = e.data("id")),
            (wClass = ".elementor-element-" + wid),
            (thumb_outer_wrapper = e.find(".eae-gallery-thumbs"));
          let n = swiper_outer_wrapper.data("swiper-settings"),
            i = swiper_outer_wrapper.data("slides-per-view"),
            r = swiper_outer_wrapper.data("space");
          const s = eae.breakpoints;
          let d = {};
          (d[s.lg - 1] = { slidesPerView: i.desktop, spaceBetween: r.desktop }),
            (d[s.md - 1] = { slidesPerView: i.tablet, spaceBetween: r.tablet });
          const o = eae.breakpoints;
          let l = {};
          if (
            ((l[o.lg - 1] = { spaceBetween: n.spaceBetween.desktop }),
            (l[o.md - 1] = { spaceBetween: n.spaceBetween.tablet }),
            (sliderData = {
              direction: "horizontal",
              effect: n.effect,
              keyboard: { enabled: n.keyboard },
              spaceBetween: n.spaceBetween.mobile,
              breakpoints: l,
              speed: n.speed,
              loop: "yes" === n.loop,
              thumbs: {
                swiper: {
                  el: wClass + " .eae-gallery-thumbs",
                  direction: "horizontal",
                  spaceBetween: r.mobile,
                  slidesPerView: i.mobile,
                  navigation: {
                    nextEl: wClass + " .eae-swiper-button-next",
                    prevEl: wClass + " .eae-swiper-button-prev",
                  },
                  speed: n.speed,
                  loop: "yes" === n.loop,
                  freeMode: !0,
                  watchSlidesVisibility: !0,
                  watchSlidesProgress: !0,
                  breakpoints: d,
                  slideToClickedSlide: !0,
                },
              },
            }),
            void 0 !== n.autoplay &&
              (sliderData.thumbs.swiper.autoplay = {
                delay: n.autoplay.duration,
                disableOnInteraction: n.autoplay.disableOnInteraction,
                reverseDirection: n.autoplay.reverseDirection,
              }),
            "yes" == n.navigation &&
              (sliderData.navigation = {
                nextEl: wClass + " .eae-swiper-button-next",
                prevEl: wClass + " .eae-swiper-button-prev",
              }),
            "" !== n.pagination &&
              (sliderData.pagination = {
                type: n.pagination,
                el: wClass + " .swiper-pagination",
                clickable: n.clickable,
              }),
            void 0 !== n.autoplay &&
              (sliderData.autoplay = {
                delay: n.autoplay.duration,
                disableOnInteraction: n.autoplay.disableOnInteraction,
                reverseDirection: n.autoplay.reverseDirection,
              }),
            "undefined" == typeof Swiper)
          ) {
            new (0, elementorFrontend.utils.swiper)(
              jQuery(
                ".elementor-element-" +
                  wid +
                  " .eae-swiper-outer-wrapper .eae-swiper-container"
              ),
              sliderData
            ).then((e) => {
              t = e;
            });
          } else
            (window.sswiper = new Swiper(
              ".elementor-element-" +
                wid +
                " .eae-swiper-outer-wrapper .eae-swiper-container",
              sliderData
            )),
              a(
                ".elementor-element-" +
                  wid +
                  " .eae-swiper-outer-wrapper .eae-swiper-container"
              ).css("visibility", "visible");
          if (void 0 !== n.autoplay) {
            "yes" == n.autoplay.pauseOnHover &&
              jQuery(wClass + " .eae-swiper-container").hover(
                function () {
                  t.autoplay.stop(), t.thumbs.swiper.autoplay.stop();
                },
                function () {
                  t.autoplay.start(), t.thumbs.swiper.autoplay.start();
                }
              );
          }
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-chart.bar",
        o
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-chart.horizontalBar",
        o
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-chart.line",
        o
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-data-table.default",
        function (e, a) {
          const t = e.find(".eae-table"),
            n = e.find(".eae-table-container");
          (lottie_class = e.find(".eae-lottie")),
            (settings = t.data("settings")),
            lottie_class.each(function () {
              let e = a(this).data("lottie-settings"),
                t = lottie.loadAnimation({
                  container: document.getElementById(e.id),
                  path: e.url,
                  renderer: "svg",
                  loop: e.loop,
                });
              1 == e.reverse && t.setDirection(-1);
            }),
            !0 === settings.sort
              ? ((head_class = a(
                  ".eae-table thead tr:not(:last-child)"
                ).addClass("eae-sort__ignoreRow")),
                t.tablesorter({ sortReset: !1, sortRestart: !0 }))
              : (head_class = a(
                  ".eae-table thead tr:not(:last-child)"
                ).removeClass("eae-sort__ignoreRow")),
            settings.search &&
              n.find("#eae-searchable").keyup(function () {
                (_this = this),
                  t.find(".eae-table__body tr").each(function () {
                    -1 ===
                    a(this)
                      .text()
                      .toLowerCase()
                      .indexOf(a(_this).val().toLowerCase())
                      ? a(this).addClass("eae-table-search-hide")
                      : a(this).removeClass("eae-table-search-hide");
                  });
              });
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/CfStyler.default",
        function (e, a) {
          if (
            e.hasClass("elementor-element-edit-mode") &&
            a("#error-field-hidden").hasClass("validation-field-box")
          ) {
            e.find(".wpcf7-validates-as-required")
              .parent()
              .append("<p class='error-field'>The field is required.</p>");
          }
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-anythingcarousel.default",
        function (e, a) {
          const t = e.find(".eae-swiper-outer-wrapper"),
            n = e.data("id"),
            i = t.data("swiper-settings");
          l(i, n, e, t);
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/wts-content-ticker.default",
        function (e) {
          let a = e.data("id"),
            t = e.find(".swiper");
          swiper_outer = e.find(".eae-content-ticker-wrapper");
          let n = swiper_outer.data("swiper"),
            i = {};
          if (
            ((i = {
              effect: n.effect,
              loop: n.loop,
              speed: n.speed,
              slidesPerView: 1,
              spaceBetween: 30,
              fadeEffect: { crossFade: !0 },
            }),
            null != n.autoplayDuration &&
              (i.autoplay = {
                delay: n.autoplayDuration,
                disableOnInteraction: !0,
              }),
            0 != n.keyboardControl && (i.keyboard = { enabled: !0 }),
            "yes" === n.arrows &&
              (i.navigation = {
                nextEl: ".eae-navigation-icon-wrapper .eae-swiper-button-next",
                prevEl: ".eae-navigation-icon-wrapper .eae-swiper-button-prev",
              }),
            "null" != n.direction &&
              "slide" == n.effect &&
              (i.direction = n.direction),
            "undefined" == typeof Swiper)
          ) {
            new (0, elementorFrontend.utils.swiper)(jQuery(t), i).then((e) => {
              let t = e;
              "true" == n.pauseOnHover &&
                jQuery(
                  ".elementor-element-" +
                    a +
                    " .eae-content-ticker-content-wrapper"
                ).hover(
                  function () {
                    t.autoplay.stop();
                  },
                  function () {
                    t.autoplay.start();
                  }
                );
            });
          }
        }
      ),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/eae-radial-charts.default",
        function (e) {
          const a = e.find(".eae-radial-chart-container"),
            t = e.find(".eae-radial-chart");
          let n = a.data("chart");
          "polarArea" == n.type &&
            "true" == n.enablePercentage &&
            (n.options.scales.r.ticks.callback = function (e, a, t) {
              return e + "%";
            }),
            t.each(function (e, a) {
              new Waypoint({
                element: a,
                handler: function (e) {
                  "down" == e &&
                    (a.classList.contains("trigger") ||
                      (a.classList.add("trigger"), new Chart(t, n)));
                },
                offset: "bottom-in-view",
              });
            });
        }
      );
  });
})(jQuery);
