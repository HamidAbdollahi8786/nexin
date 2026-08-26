/* ============================================================
   NEXIN — منطق اصلی صفحات
   رندر محتوا از داده‌های مرکزی + تعامل‌ها + ظهور هنگام اسکرول
   ============================================================ */

   (function () {
    "use strict";
  
    var DATA = window.NEXIN;
    if (!DATA) return;
    var url = DATA.url;
  
    var FA = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    function toFa(n) {
      return String(n)
        .split("")
        .map(function (d) {
          return FA[+d] !== undefined ? FA[+d] : d;
        })
        .join("");
    }
    function fa2(n) {
      return toFa(String(n).length < 2 ? "0" + n : String(n));
    }
  
    /* آدرس تصویر: لینک کامل باشد همان، وگرنه نسبی به مسیر پایه */
    function img(path) {
      return /^https?:\/\//.test(path) ? path : DATA.base + path;
    }
  
    /* ---------- آیکون خدمات ---------- */
    var serviceIcons = {
      "web-development":
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="M2.5 9h19"/><path d="M5.5 6.6h.01M8 6.6h.01M10.5 6.6h.01"/></svg>',
      "ui-ux":
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"/><circle cx="11" cy="11" r="2"/></svg>',
      maintenance:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="4"/><path d="m5.2 5.2 4 4M14.8 14.8l4 4M18.8 5.2l-4 4M9.2 14.8l-4 4"/></svg>',
      "backend-api":
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3.5" width="18" height="7" rx="2"/><rect x="3" y="13.5" width="18" height="7" rx="2"/><path d="M6.5 7h.01M6.5 17h.01"/><path d="M17.5 7h-5M17.5 17h-5"/></svg>',
      wordpress:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5c3 2.8 4.3 6 4.3 9.5S15 18.7 12 21.5c-3-2.8-4.3-6-4.3-9.5S9 5.3 12 2.5Z"/></svg>',
    };
  
    var ic = {
      arrow:
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
      check:
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4.5 12.5 5 5 10-11"/></svg>',
      cross:
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
      external:
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>',
      mail:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6.5L21 7"/></svg>',
      phone:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2A17.9 17.9 0 0 1 3 5.2 2 2 0 0 1 5 3Z"/></svg>',
      telegram:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.4 18.8 19c-.2 1-.8 1.2-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9L18.4 6c.4-.3-.1-.5-.6-.2L7 12.6l-4.6-1.4c-1-.3-1-1 .2-1.5L20.5 3c.8-.3 1.6.2 1.4 1.4Z"/></svg>',
      whatsapp:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.6-1.3.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1 2.2-.3 3.6a11.4 11.4 0 0 0 4.6 4.5c1.7.8 2.7.8 3.6.6.6-.1 1.5-.7 1.7-1.3.2-.6.2-1.2.1-1.3 0-.2-.2-.2-.4-.3Z"/></svg>',
      instagram:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>',
    };
  
    /* ---------- ظهور هنگام اسکرول ---------- */
    function initReveal() {
      var items = document.querySelectorAll("[data-reveal]");
      if (!("IntersectionObserver" in window)) {
        items.forEach(function (el) {
          el.classList.add("is-in");
        });
        return;
      }
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
      );
      items.forEach(function (el) {
        io.observe(el);
      });
    }
  
    /* ---------- تصویرسازی پروژه‌ها ---------- */
    var projectIllu = {
      "project-1":
        '<div class="w-illu w-illu-dash">' +
        '  <div class="wi-panel wi-side"><span></span><span></span><span></span><span></span></div>' +
        '  <div class="wi-panel wi-main">' +
        '    <div class="wi-bars"><i style="--h:45%"></i><i style="--h:70%"></i><i style="--h:55%"></i><i style="--h:85%"></i><i style="--h:40%"></i><i style="--h:60%"></i><i style="--h:50%"></i></div>' +
        '    <div class="wi-rows"><b></b><b></b><b></b></div>' +
        "  </div>" +
        "</div>",
      "project-2":
        '<div class="w-illu w-illu-phone">' +
        '  <div class="wi-phone">' +
        '    <div class="wi-notch"></div>' +
        '    <div class="wi-screen">' +
        '      <div class="wi-avatar"></div>' +
        '      <div class="wi-block"></div>' +
        '      <div class="wi-block short"></div>' +
        '      <div class="wi-chips"><i></i><i></i></div>' +
        "    </div>" +
        "  </div>" +
        "</div>",
      "project-3":
        '<div class="w-illu w-illu-shop">' +
        '  <div class="wi-grid">' +
        '    <div class="wi-tile"><i></i><span></span><span class="s"></span></div>' +
        '    <div class="wi-tile"><i></i><span></span><span class="s"></span></div>' +
        '    <div class="wi-tile accent"><i></i><span></span><span class="s"></span></div>' +
        '    <div class="wi-tile"><i></i><span></span><span class="s"></span></div>' +
        '    <div class="wi-tile"><i></i><span></span><span class="s"></span></div>' +
        '    <div class="wi-tile accent"><i></i><span></span><span class="s"></span></div>' +
        "  </div>" +
        "</div>",
      "project-4":
        '<div class="w-illu w-illu-board">' +
        '  <div class="wi-cols">' +
        '    <div class="wi-col"><em></em><b></b><b class="s"></b></div>' +
        '    <div class="wi-col"><em></em><b></b><b></b><b class="s"></b></div>' +
        '    <div class="wi-col"><em></em><b class="s"></b></div>' +
        "  </div>" +
        "</div>",
    };
  
    /* ---------- کارت پروژه ---------- */
    function projectCard(p, i, layout) {
      var visual;
      if (p.coverImage) {
        /* آماده‌ی عکس واقعی — فقط coverImage را در data.js عوض کن */
        visual =
          '<span class="w-visual has-photo">' +
          '  <img class="w-photo" src="' + img(p.coverImage) + '" alt="' + p.title + '" loading="lazy">' +
          "</span>";
      } else {
        visual =
          '<span class="w-visual">' +
          (projectIllu[p.id] || projectIllu["project-1"]) +
          "</span>";
      }
      return (
        '<a class="work-card ' + layout + '" href="' + url("projects/" + p.id + ".html") + '" data-reveal>' +
        visual +
        '  <span class="w-info">' +
        '    <span class="w-more" aria-hidden="true">' + ic.arrow + "</span>" +
        '    <span class="w-copy">' +
        '      <span class="w-cat">' + p.category + "</span>" +
        '      <span class="w-title">' + p.title + "</span>" +
        '      <span class="w-desc">' + p.shortDescription + "</span>" +
        "    </span>" +
        "  </span>" +
        "</a>"
      );
    }
  
    /* ---------- صفحه اصلی: خدمات ---------- */
    function renderHomeServices() {
      var list = document.getElementById("svcList");
      var preview = document.getElementById("svcPreview");
      if (!list || !preview) return;
  
      list.innerHTML = DATA.services
        .map(function (s, i) {
          var num = String(i + 1).length < 2 ? "0" + (i + 1) : String(i + 1);
          return (
            '<a class="svc-row" href="' + url("services/" + s.slug + ".html") + '" data-svc="' + i + '">' +
            '  <span class="svc-left">' +
            '    <span class="svc-num" dir="ltr">' + num + "</span>" +
            '    <span class="svc-body"><span class="svc-title">' + s.title + "</span></span>" +
            "  </span>" +
            '  <span class="svc-arr" aria-hidden="true">' + ic.arrow + "</span>" +
            "</a>"
          );
        })
        .join("");
  
      var illu = {
        "web-development":
          '<div class="illu illu-web">' +
          '  <div class="illu-win">' +
          '    <div class="illu-bar"><i></i><i></i><i></i></div>' +
          '    <div class="illu-body">' +
          '      <div class="illu-nav"></div>' +
          '      <div class="illu-hero"></div>' +
          '      <div class="illu-cols"><span></span><span></span><span></span></div>' +
          "    </div>" +
          "  </div>" +
          "</div>",
        "ui-ux":
          '<div class="illu illu-ux">' +
          '  <div class="illu-board">' +
          '    <div class="illu-tile"><span></span><span></span><i></i></div>' +
          '    <div class="illu-tile"><span></span><span></span><i></i></div>' +
          '    <div class="illu-tile"><span></span><span></span><i></i></div>' +
          '    <div class="illu-tile"><span></span><span></span><i></i></div>' +
          '    <div class="illu-tile"><span></span><span></span><i></i></div>' +
          '    <div class="illu-tile"><span></span><span></span><i></i></div>' +
          "  </div>" +
          "</div>",
        maintenance:
          '<div class="illu illu-maint">' +
          '  <div class="illu-ring"></div>' +
          '  <div class="illu-ring r2"></div>' +
          '  <div class="illu-core"></div>' +
          '  <div class="illu-dots"><i></i><i></i><i></i><i></i></div>' +
          "</div>",
        "backend-api":
          '<div class="illu illu-code">' +
          '  <div class="illu-term">' +
          '    <div class="illu-bar"><i></i><i></i><i></i></div>' +
          '    <div class="illu-lines">' +
          '      <span><em></em><b style="width:55%"></b></span>' +
          '      <span><em></em><b style="width:70%"></b></span>' +
          '      <span><em></em><b style="width:40%"></b></span>' +
          '      <span><em></em><b style="width:62%"></b></span>' +
          '      <span><em></em><b style="width:48%"></b></span>' +
          "    </div>" +
          "  </div>" +
          "</div>",
        wordpress:
          '<div class="illu illu-wp">' +
          '  <div class="illu-win">' +
          '    <div class="illu-bar"><i></i><i></i><i></i></div>' +
          '    <div class="illu-body">' +
          '      <div class="illu-header"></div>' +
          '      <div class="illu-post"><span></span><span></span><span class="short"></span></div>' +
          '      <div class="illu-post"><span></span><span></span><span class="short"></span></div>' +
          "    </div>" +
          "  </div>" +
          "</div>",
      };
  
      preview.innerHTML =
        DATA.services
          .map(function (s, i) {
            return (
              '<div class="pv" data-pv="' + i + '">' +
              '  <div class="pv-illu">' + (illu[s.slug] || "") + "</div>" +
              '  <div class="pv-meta">' +
              "    <h3>" + s.title + "</h3>" +
              '    <div class="pv-row">' +
              "      <p>" + s.line + "</p>" +
              '      <a class="pv-link" href="' + url("services/" + s.slug + ".html") + '">مشاهده‌ی خدمت ' + ic.arrow + "</a>" +
              '    </div>' +
              "  </div>" +
              "</div>"
            );
          })
          .join("");
  
      var rows = list.querySelectorAll(".svc-row");
      var pvs = preview.querySelectorAll(".pv");
  
      function activate(i) {
        rows.forEach(function (r, ri) {
          r.classList.toggle("is-on", ri === i);
        });
        pvs.forEach(function (p, pi) {
          p.classList.toggle("is-on", pi === i);
        });
      }
  
      rows.forEach(function (row) {
        var i = +row.getAttribute("data-svc");
        row.addEventListener("mouseenter", function () {
          activate(i);
        });
        row.addEventListener("focusin", function () {
          activate(i);
        });
      });
  
      activate(1);
    }
  
    /* ---------- صفحه اصلی: نمونه‌کارهای منتخب ---------- */
    function renderHomeWorks() {
      var grid = document.getElementById("workGrid");
      if (!grid) return;
      /* رهام و تیک‌بان از صفحه‌ی اصلی حذف شده‌اند */
      var homeProjects = DATA.projects.filter(function (p) {
        return p.id !== "project-1" && p.id !== "project-4";
      });
      /* هر دو کارت هم‌اندازه (نیم‌عرض) */
      var layouts = ["wc-a", "wc-b"];
      grid.innerHTML = homeProjects
        .map(function (p, i) {
          return projectCard(p, i, layouts[i] || "wc-a");
        })
        .join("");
    }
  
    /* ---------- صفحه نمونه‌کارها ---------- */
    function renderPortfolio() {
      var grid = document.getElementById("portfolioGrid");
      if (!grid) return;
      /* همه کارت‌ها یک اندازه — بدون مدل کوچک */
      grid.innerHTML = DATA.projects
        .map(function (p, i) {
          return projectCard(p, i, "wc-equal");
        })
        .join("");
  
      var count = document.getElementById("portfolioCount");
      if (count) count.textContent = toFa(DATA.projects.length) + " پروژه";
    }
  
    /* ---------- صفحه فهرست خدمات ---------- */
    function renderServicesIndex() {
      var list = document.getElementById("servicesList");
      if (!list) return;
      list.innerHTML = DATA.services
        .map(function (s, i) {
          return (
            '<a class="srv-row" href="' + url("services/" + s.slug + ".html") + '" data-reveal style="--d:' + i * 40 + 'ms">' +
            '  <span class="srv-num">' + (String(i + 1).length < 2 ? "0" + (i + 1) : String(i + 1)) + "</span>" +
            '  <span><span class="srv-title">' + s.title + "</span>" +
            '  <span class="srv-sum">' + s.summary + "</span></span>" +
            '  <span class="srv-code">' + s.code + "</span>" +
            '  <span class="w-more srv-arr" aria-hidden="true">' + ic.arrow + "</span>" +
            "</a>"
          );
        })
        .join("");
    }
  
    /* ---------- صفحه جزئیات خدمت ---------- */
    function renderServicePage() {
      var mount = document.querySelector("[data-service-page]");
      if (!mount) return;
      var slug = document.body.getAttribute("data-service");
      var s = DATA.services.filter(function (x) {
        return x.slug === slug;
      })[0];
      if (!s) return;
  
      var others = DATA.services
        .map(function (x) {
          return (
            '<a href="' + url("services/" + x.slug + ".html") + '"' +
            (x.slug === slug ? ' class="is-current" aria-current="page"' : "") +
            ">" + x.title +
            '<span aria-hidden="true">' + (x.slug === slug ? "" : ic.arrow) + "</span></a>"
          );
        })
        .join("");
  
      var steps = s.process
        .map(function (st, i) {
          return (
            '<div class="step" data-n="' + String(i + 1).padStart(2, '0') + '"><h3>' + st.t + "</h3><p>" + st.d + "</p></div>"
          );
        })
        .join("");
  
      var benefits = s.benefits
        .map(function (b) {
          return "<li>" + ic.check + "<span>" + b + "</span></li>";
        })
        .join("");
  
      var deliverables = s.deliverables
        .map(function (d) {
          return "<li>" + ic.check + "<span>" + d + "</span></li>";
        })
        .join("");
  
      mount.innerHTML =
        '<section class="page-hero">' +
        '  <div class="container sd-hero-grid">' +
        '    <div class="sd-copy">' +
        '      <nav class="crumbs" aria-label="مسیر صفحه">' +
        '        <a href="' + url("index.html") + '">خانه</a>' + ic.arrow +
        '        <a href="' + url("services.html") + '">خدمات</a>' + ic.arrow +
        "        <span>" + s.title + "</span>" +
        "      </nav>" +
        '      <p class="sec-label">' + s.code + "</p>" +
        "      <h1 class=\"page-title\">" + s.title + "</h1>" +
        '      <p class="sd-lead">' + s.heroLead + "</p>" +
        '      <div class="sd-actions">' +
        '        <a class="btn btn-primary" href="' + url("contact.html") + '">درخواست خدمت ' + ic.arrow + "</a>" +
        '        <a class="btn btn-ghost" href="' + url("portfolio.html") + '">مشاهده نمونه‌کارها</a>' +
        "      </div>" +
        "    </div>" +
        '    <aside class="sd-aside">' +
        '      <div class="sd-card" data-reveal>' +
        '        <div class="sd-card-head"><span class="sd-icon">' + serviceIcons[s.slug] + "</span>" +
        '        <span class="sd-code">' + s.code + " — NEXIN SERVICES</span></div>" +
        "        <h3>سایر خدمات</h3>" +
        '        <nav class="sd-others" aria-label="سایر خدمات">' + others + "</nav>" +
        "      </div>" +
        '      <div class="sd-mini-cta" data-reveal style="--d:90ms">' +
        "        <h4>مشاوره‌ی اولیه رایگان است</h4>" +
        "        <p>اگر مطمئن نیستید این خدمت برای شما مناسب است یا خیر، سی دقیقه گفتگو کافی است.</p>" +
        '        <a class="btn btn-primary btn-sm" href="' + url("contact.html") + '">شروع گفتگو</a>' +
        "      </div>" +
        "    </aside>" +
        "  </div>" +
        "</section>" +
        '<div class="container sd-body">' +
        '  <section class="sd-sec" data-reveal>' +
        "    <h2 class=\"h2\">چرا به این خدمت نیاز دارید؟</h2>" +
        '    <div class="duo">' +
        '      <div class="panel panel-ch"><h3>' + ic.cross + " مسئله</h3><p>" + s.challenge + "</p></div>" +
        '      <div class="panel panel-sol"><h3>' + ic.check + " راه‌حل نکسین</h3><p>" + s.solution + "</p></div>" +
        "    </div>" +
        "  </section>" +
        '  <section class="sd-sec" data-reveal>' +
        "    <h2 class=\"h2\">چه چیزی به دست می‌آورید؟</h2>" +
        '    <ul class="checks">' + benefits + "</ul>" +
        "  </section>" +
        '  <section class="sd-sec" data-reveal>' +
        "    <h2 class=\"h2\">روند کار ما</h2>" +
        '    <div class="steps">' + steps + "</div>" +
        "  </section>" +
        '  <section class="sd-sec" data-reveal>' +
        "    <h2 class=\"h2\">در پایان، چه دریافت می‌کنید؟</h2>" +
        '    <div class="deliver">' +
        '      <div class="deliver-head"><h3>فهرست تحویلی‌های پروژه</h3><span class="mono">DELIVERABLES</span></div>' +
        '      <ul class="checks">' + deliverables + "</ul>" +
        "    </div>" +
        "  </section>" +
        '  <section data-reveal>' +
        '    <div class="cta-mini">' +
        "      <div><h3>آماده‌اید پروژه‌ی «" + s.title + "» را شروع کنیم؟</h3>" +
        "      <p>فرم نیست، صف نیست؛ مستقیم با خود تیم صحبت می‌کنید.</p></div>" +
        '      <a class="btn btn-primary" href="' + url("contact.html") + '">درخواست خدمت ' + ic.arrow + "</a>" +
        "    </div>" +
        "  </section>" +
        "</div>";
    }
  
    /* ---------- صفحه جزئیات پروژه ---------- */
    function renderProjectPage() {
      var mount = document.querySelector("[data-project-page]");
      if (!mount) return;
      var id = document.body.getAttribute("data-project");
      var list = DATA.projects;
      var idx = -1;
      list.forEach(function (p, i) {
        if (p.id === id) idx = i;
      });
      if (idx === -1) return;
      var p = list[idx];

  
      mount.innerHTML =
        '<section class="page-hero">' +
        '  <div class="container pd-hero-grid">' +
        '    <div class="pd-copy">' +
        '      <nav class="crumbs" aria-label="مسیر صفحه">' +
        '        <a href="' + url("index.html") + '">خانه</a>' + ic.arrow +
        '        <a href="' + url("portfolio.html") + '">نمونه‌کارها</a>' + ic.arrow +
        "        <span>" + p.title + "</span>" +
        "      </nav>" +
        '      <span class="pd-chip">' + p.category + "</span>" +
        "      <h1 class=\"page-title\">" + p.title + "</h1>" +
        '      <p class="page-lead">' + p.shortDescription + "</p>" +
        '      <dl class="pd-meta">' +
        "        <div><dt>دسته‌بندی</dt><dd>" + p.category + "</dd></div>" +
        "        <div><dt>سال اجرا</dt><dd>" + p.year + "</dd></div>" +
        "        <div><dt>کارفرما</dt><dd>" + p.client + "</dd></div>" +
        "        <div><dt>محدوده‌ی همکاری</dt><dd>" + p.scope + "</dd></div>" +
        "      </dl>" +
        "    </div>" +
    (p.liveUrl
          ? '<a href="' + p.liveUrl + '" target="_blank" rel="noopener" style="display:block;text-decoration:none;color:inherit">' +
            '    <figure class="pd-cover kenburns">' +
            '      <img src="' + img(p.coverImage) + '" alt="' + p.title + '">' +
            '    </figure>' +
            '  </a>' +
            '  <div style="margin-top:16px;text-align:center" data-reveal>' +
            '    <a class="btn btn-primary pd-live" href="' + p.liveUrl + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">مشاهده\u200cی سایت <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5c3 2.8 4.3 6 4.3 9.5S15 18.7 12 21.5c-3-2.8-4.3-6-4.3-9.5S9 5.3 12 2.5Z"/></svg></a>' +
            '  </div>'
          : '    <figure class="pd-cover kenburns" data-reveal="scale">' +
            '      <img src="' + img(p.coverImage) + '" alt="' + p.title + '">' +
            '    </figure>' +
            '  <div style="margin-top:16px" data-reveal>' +
            '    <a class="btn btn-ghost" href="' + url('contact.html') + '">برای دریافت لینک پروژه تماس بگیرید ' + ic.arrow + '</a>' +
            '  </div>') +
        "  </div>" +
        "</section>" +
        '<div class="container pd-body">' +
        '  <section class="pd-sec" data-reveal>' +
        '    <p class="big">' + p.description + "</p>" +
        "  </section>" +
        '  <section class="pd-duo">' +
        '    <div class="panel panel-ch" data-reveal><h3>' + ic.cross + " چالش</h3><p>" + p.challenge + "</p></div>" +
        '    <div class="panel panel-sol" data-reveal style="--d:90ms"><h3>' + ic.check + " هدف</h3><p>" + p.goal + "</p></div>" +
        "  </section>" +
        '  <section class="pd-result" data-reveal>' +
        "    <p>" + p.result + "</p>" +
        "  </section>" +
        "</div>";
    }
  
    /* ---------- صفحه تماس ---------- */
    function renderContact() {
      var mount = document.getElementById("channels");
      if (!mount) return;
      var s = DATA.site;
  
      var channels = [
        { icon: ic.mail, title: "ایمیل", hint: "پاسخ در کمتر از یک روز کاری", val: s.email, href: "mailto:" + s.email, ext: false },
        { icon: ic.phone, title: "تماس تلفنی", hint: "موبایل — تماس مستقیم با تیم", val: s.phoneDisplay1, href: s.phoneLink1, ext: false },
        { icon: ic.phone, title: "تماس تلفنی", hint: "موبایل — تماس مستقیم با تیم", val: s.phoneDisplay2, href: s.phoneLink2, ext: false },
        { icon: ic.telegram, title: "تلگرام", hint: "گفتگوی سریع و غیررسمی", val: s.telegram, href: s.telegramUrl, ext: true },
        { icon: ic.whatsapp, title: "واتس‌اپ", hint: "ارسال پیام یا تماس صوتی", val: s.whatsappDisplay, href: s.whatsappUrl, ext: true },
        { icon: ic.instagram, title: "اینستاگرام", hint: "پشت‌صحنه‌ی پروژه‌ها و استودیو", val: s.instagram, href: s.instagramUrl, ext: true },
      ];
  
      mount.innerHTML = channels
        .map(function (c, i) {
          return (
            '<a class="ch-row" href="' + c.href + '"' +
            (c.ext ? ' target="_blank" rel="noopener"' : "") +
            ' data-reveal style="--d:' + i * 50 + 'ms">' +
            '  <span class="ch-icon">' + c.icon + "</span>" +
            '  <span><span class="ch-title">' + c.title + "</span><br>" +
            '  <span class="ch-hint">' + c.hint + "</span></span>" +
            '  <span class="ch-val">' + c.val + "</span>" +
            '  <span class="ch-arr" aria-hidden="true">' + ic.arrow + "</span>" +
            "</a>"
          );
        })
        .join("");
    }
  
    /* ---------- اجرا ---------- */
    renderHomeServices();
    renderHomeWorks();
    renderPortfolio();
    renderServicesIndex();
    renderServicePage();
    renderProjectPage();
    renderContact();
    initReveal();
  })();