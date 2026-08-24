/* ============================================================
   NEXIN — ناوبری
   تزریق هدر و فوتر به همه‌ی صفحات + منوی موبایل
   ============================================================ */

   (function () {
    "use strict";
  
    var DATA = window.NEXIN;
    if (!DATA) return;
  
    /* ---------- محاسبه‌ی مسیر پایه (برای صفحات داخل پوشه‌ها) ---------- */
    var segments = window.location.pathname.split("/").filter(Boolean);
    var depth = Math.max(0, segments.length - 1);
    var base = depth === 0 ? "./" : "../";
    DATA.base = base;
    DATA.url = function (href) {
      return base + href;
    };
  
    var fileName = segments.length ? segments[segments.length - 1] : "index.html";
  
    function isActive(href) {
      var target = href.split("/").pop();
      if (target === "index.html") {
        return fileName === "index.html" || fileName === "";
      }
      return href === fileName;
    }
  
    /* ---------- آیکون‌ها ---------- */
    var icons = {
      arrow:
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
      mail:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6.5L21 7"/></svg>',
      phone:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2A17.9 17.9 0 0 1 3 5.2 2 2 0 0 1 5 3Z"/></svg>',
      pin:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
      telegram:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.4 18.8 19c-.2 1-.8 1.2-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9L18.4 6c.4-.3-.1-.5-.6-.2L7 12.6l-4.6-1.4c-1-.3-1-1 .2-1.5L20.5 3c.8-.3 1.6.2 1.4 1.4Z"/></svg>',
      whatsapp:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.6-1.3.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1 2.2-.3 3.6a11.4 11.4 0 0 0 4.6 4.5c1.7.8 2.7.8 3.6.6.6-.1 1.5-.7 1.7-1.3.2-.6.2-1.2.1-1.3 0-.2-.2-.2-.4-.3Z"/></svg>',
      instagram:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>',
      logo:
        '<img src="' + DATA.base + 'images/logo.png" alt="لوگوی نکسین" width="38" height="38" style="border-radius:10px;object-fit:cover;">',
    };
  
    /* ---------- هدر ---------- */
    function renderHeader() {
      var mount = document.querySelector("[data-header]");
      if (!mount) return;
  
      var links = DATA.nav
        .map(function (item) {
          return (
            '<a href="' +
            DATA.url(item.href) +
            '"' +
            (isActive(item.href) ? ' class="is-active" aria-current="page"' : "") +
            ">" +
            item.label +
            "</a>"
          );
        })
        .join("");
  
      var mLinks = DATA.nav
        .map(function (item, i) {
          return (
            '<a href="' +
            DATA.url(item.href) +
            '"' +
            (isActive(item.href) ? ' class="is-active" aria-current="page"' : "") +
            '><span class="m-num">۰' +
            (i + 1) +
            "</span>" +
            item.label +
            "</a>"
          );
        })
        .join("");
  
      mount.innerHTML =
        '<header class="site-header" id="site-header">' +
        '  <div class="container hd-in">' +
        '    <a class="logo" href="' + DATA.url("index.html") + '" aria-label="نکسین — صفحه اصلی">' +
        '      <span class="logo-mark">' + icons.logo + "</span>" +
        '      <span class="logo-word"><strong>' + DATA.site.name + "</strong><span>" + DATA.site.latin + "®</span></span>" +
        "    </a>" +
        '    <nav class="main-nav" aria-label="ناوبری اصلی"><ul>' + links + "</ul></nav>" +
        '    <a class="btn btn-primary btn-sm hd-cta" href="' + DATA.url("contact.html") + '">شروع پروژه</a>' +
        '    <button class="burger" aria-label="باز و بسته کردن منو" aria-expanded="false" aria-controls="mobile-nav">' +
        "      <span></span><span></span>" +
        "    </button>" +
        "  </div>" +
        "</header>" +
        '<div class="m-nav" id="mobile-nav" aria-hidden="true">' +
        '  <nav class="m-links" aria-label="ناوبری موبایل">' + mLinks + "</nav>" +
        '  <div class="m-foot">' +
        "  </div>" +
        "</div>";
  
      bindHeader();
    }
  
    function bindHeader() {
      var header = document.getElementById("site-header");
      var burger = document.querySelector(".burger");
      var mnav = document.getElementById("mobile-nav");
  
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
  
      function setMenu(open) {
        burger.setAttribute("aria-expanded", String(open));
        mnav.classList.toggle("is-open", open);
        mnav.setAttribute("aria-hidden", String(!open));
        document.body.style.overflow = open ? "hidden" : "";
      }
  
      burger.addEventListener("click", function () {
        setMenu(burger.getAttribute("aria-expanded") !== "true");
      });
  
      mnav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          setMenu(false);
        });
      });
  
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
          setMenu(false);
          burger.focus();
        }
      });
    }
  
    /* ---------- فوتر ---------- */
    function renderFooter() {
      var mount = document.querySelector("[data-footer]");
      if (!mount) return;
  
      var quick = DATA.nav
        .map(function (item) {
          return '<li><a href="' + DATA.url(item.href) + '">' + item.label + "</a></li>";
        })
        .join("");
  
      var services = DATA.services
        .map(function (s) {
          return '<li><a href="' + DATA.url("services/" + s.slug + ".html") + '">' + s.title + "</a></li>";
        })
        .join("");
  
      var s = DATA.site;
  
      mount.innerHTML =
        '<footer class="site-footer">' +
        '  <div class="container">' +
        '    <div class="ft-grid">' +
        '      <div class="ft-brand">' +
        '        <a class="logo" href="' + DATA.url("index.html") + '" aria-label="نکسین — صفحه اصلی">' +
        '          <span class="logo-mark">' + icons.logo + "</span>" +
        '          <span class="logo-word"><strong>' + s.name + "</strong><span>" + s.latin + "®</span></span>" +
        "        </a>" +
        '        <p class="ft-desc">' + s.description + "</p>" +
        '        <div class="ft-social">' +
        '          <a href="' + s.telegramUrl + '" target="_blank" rel="noopener" aria-label="تلگرام نکسین">' + icons.telegram + "</a>" +
        '          <a href="' + s.whatsappUrl + '" target="_blank" rel="noopener" aria-label="واتس‌اپ نکسین">' + icons.whatsapp + "</a>" +
        '          <a href="' + s.instagramUrl + '" target="_blank" rel="noopener" aria-label="اینستاگرام نکسین">' + icons.instagram + "</a>" +
        '          <a href="mailto:' + s.email + '" aria-label="ایمیل نکسین">' + icons.mail + "</a>" +
        "        </div>" +
        "      </div>" +
        '      <div class="ft-col"><h4 class="ft-title">دسترسی سریع</h4><ul class="ft-list">' + quick + "</ul></div>" +
        '      <div class="ft-col"><h4 class="ft-title">خدمات</h4><ul class="ft-list">' + services + "</ul></div>" +
        '      <div class="ft-col"><h4 class="ft-title">تماس</h4><ul class="ft-contact">' +
        '        <li>' + icons.mail + ' <a class="ltr" href="mailto:' + s.email + '">' + s.email + "</a></li>" +
        '        <li>' + icons.phone + ' <a class="ltr" href="' + s.phoneLink + '">' + s.phoneDisplay + "</a></li>" +
        '        <li>' + icons.telegram + ' <a class="ltr" href="' + s.telegramUrl + '" target="_blank" rel="noopener">' + s.telegram + "</a></li>" +
        '        <li>' + icons.pin + " <span>" + s.city + "</span></li>" +
        "      </ul></div>" +
        "    </div>" +
        '    <div class="ft-bottom">' +
        '      <p>© <span data-year></span> استودیو ' + s.name + " — تمامی حقوق محفوظ است.</p>" +
        '      <p class="mono">NEXIN SOFTWARE STUDIO</p>' +
        "    </div>" +
        "  </div>" +
        "</footer>";
  
      /* سال شمسی */
      var yearEl = mount.querySelector("[data-year]");
      if (yearEl) {
        try {
          yearEl.textContent = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());
        } catch (e) {
          yearEl.textContent = "۱۴۰۴";
        }
      }
    }
  
    renderHeader();
    renderFooter();
  })();