// ============================================================
// نقشه تعاملی صفحه اصلی اطلس جغرافیایی تاریخ بیهقی
// تفکیک نقشه پایه از لایه‌های پژوهشی + نوار زمان تفکیک‌شده
// ============================================================
(function () {
  if (typeof L === "undefined" || typeof PLACES === "undefined") return;

  const ghazna = PLACES[0];
  const mapEl = document.getElementById("map");

  // راه‌اندازی نقشه Leaflet
  const map = L.map("map", { zoomControl: true }).setView([ghazna.lat, ghazna.lng], 6);

  // ۱. لایه‌های نقشه پایه (Base Maps)
  const osmLayer = L.tileLayer(ATLAS_CONFIG.osmUrl, {
    maxZoom: 18,
    attribution: ATLAS_CONFIG.osmAttribution
  });

  let refLayer = L.imageOverlay(ATLAS_CONFIG.refMapUrl, ATLAS_CONFIG.refMapBounds, {
    opacity: 0.92,
    interactive: false
  }).addTo(map);

  // مدیریت خطای بارگذاری مسیر نقشه برش‌خورده و جایگزینی خودکار با نسخه کامل
  refLayer.on("error", function () {
    if (refLayer._url !== ATLAS_CONFIG.refMapFallbackUrl) {
      map.removeLayer(refLayer);
      refLayer = L.imageOverlay(ATLAS_CONFIG.refMapFallbackUrl, ATLAS_CONFIG.refMapBounds, {
        opacity: 0.92,
        interactive: false
      }).addTo(map);
    }
  });

  map.fitBounds(ATLAS_CONFIG.refMapBounds);

  // ۲. لایه‌های پژوهشی (Research Layers — جدا از نقشه پایه)
  const textualPlacesLayer = L.layerGroup().addTo(map);
  const contemporaryGeoLayer = L.layerGroup().addTo(map);

  // افزودن نشان مکان‌های مستند در متن
  PLACES.forEach(function (p) {
    const icon = L.divIcon({
      className: "",
      html: '<div class="tile-marker" title="' + p.name + '"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
    const marker = L.marker([p.lat, p.lng], { icon: icon }).addTo(textualPlacesLayer);
    marker.bindTooltip(p.name + " (داده پایه تأییدشده)", {
      permanent: true,
      direction: "top",
      offset: [0, -14]
    });
    marker.on("click", function () {
      focusPlace(p);
    });

    // لایه تطبیق جغرافیایی معاصر (حلقه نقطه‌چین سرمه‌ای برای موقعیت امروزی)
    const geoIcon = L.divIcon({
      className: "",
      html: '<div class="geo-ring-marker" title="موقعیت معاصر: ' + p.modernLocation + '"></div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });
    const geoMarker = L.marker([p.lat, p.lng], { icon: geoIcon, interactive: false }).addTo(contemporaryGeoLayer);
    geoMarker.setZIndexOffset(-100);
  });

  // کنترل تعویض نقشه پایه
  const opacityBox = document.getElementById("ref-opacity-wrap");
  const opacityInput = document.getElementById("ref-opacity");
  const opacityVal = document.getElementById("ref-opacity-val");

  function setBaseLayer(kind) {
    if (kind === "ref") {
      if (map.hasLayer(osmLayer)) map.removeLayer(osmLayer);
      mapEl.classList.remove("sepia");
      if (!map.hasLayer(refLayer)) refLayer.addTo(map);
      refLayer.setOpacity(parseFloat(opacityInput.value));
      opacityBox.style.display = "block";
    } else if (kind === "overlay") {
      if (!map.hasLayer(osmLayer)) osmLayer.addTo(map);
      if (!map.hasLayer(refLayer)) refLayer.addTo(map);
      mapEl.classList.remove("sepia");
      refLayer.setOpacity(parseFloat(opacityInput.value));
      opacityBox.style.display = "block";
    } else {
      if (map.hasLayer(refLayer)) map.removeLayer(refLayer);
      if (!map.hasLayer(osmLayer)) osmLayer.addTo(map);
      mapEl.classList.toggle("sepia", kind === "sepia");
      opacityBox.style.display = "none";
    }
  }

  document.querySelectorAll('input[name="baselayer"]').forEach(function (r) {
    r.addEventListener("change", function () {
      setBaseLayer(r.value);
    });
  });

  if (opacityInput) {
    opacityInput.addEventListener("input", function () {
      const val = parseFloat(opacityInput.value);
      refLayer.setOpacity(val);
      opacityVal.textContent = Math.round(val * 100) + "٪";
    });
  }

  // کنترل لایه‌های پژوهشی
  const toggleTextual = document.getElementById("layer-textual");
  const toggleContemporary = document.getElementById("layer-contemporary");

  if (toggleTextual) {
    toggleTextual.addEventListener("change", function () {
      if (toggleTextual.checked) textualPlacesLayer.addTo(map);
      else map.removeLayer(textualPlacesLayer);
    });
  }

  if (toggleContemporary) {
    toggleContemporary.addEventListener("change", function () {
      if (toggleContemporary.checked) contemporaryGeoLayer.addTo(map);
      else map.removeLayer(contemporaryGeoLayer);
    });
  }

  // ۳. رندر پویا برای تب پرونده در سایدبار
  const panel = document.getElementById("map-panel");
  const placeContainer = document.getElementById("tab-place-content");

  function renderPlaceSummary(p) {
    if (!placeContainer) return;
    placeContainer.innerHTML =
      '<h2>' + p.name + ' <span style="font-family:Vazirmatn,sans-serif;font-size:13px;color:var(--muted)">(' + p.alternativeNames.join(" / ") + ')</span></h2>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">' +
        '<span class="badge badge-hist">منبع تاریخی تأییدشده</span>' +
        '<span class="badge badge-geo">تطبیق جغرافیایی معاصر</span>' +
      '</div>' +
      '<table class="info">' +
        '<tr><td>موقعیت امروزی</td><td>' + p.modernLocation + '</td></tr>' +
        '<tr><td>مختصات</td><td dir="ltr" style="text-align:right">' + p.coordsDisplay + '</td></tr>' +
        '<tr><td>ارتفاع تقریبی</td><td>' + p.elevation + '</td></tr>' +
        '<tr><td>فاصله از کابل</td><td>' + p.distanceFromKabul + '</td></tr>' +
        '<tr><td>جایگاه تاریخی</td><td>' + p.shortRole + '</td></tr>' +
      '</table>' +
      '<p class="src-note">منبع پایه: Encyclopaedia Iranica، مدخل ḠAZNĪ</p>' +
      '<div class="note-box note-review" style="margin-top:10px;padding:10px 12px;font-size:12px">' +
        '<strong>وضعیت شواهد مستقیم متن:</strong> <span class="badge badge-review">نیازمند بررسی</span> — استخراج نقل‌قول‌ها و شماره صفحات چاپ فیاض در دست انجام است.' +
      '</div>' +
      '<div class="btns"><a class="btn btn-primary" href="' + p.slug + '">مشاهده پرونده پژوهشی غزنه</a></div>';
  }
  renderPlaceSummary(ghazna);

  // مدیریت تب‌های سایدبار
  function activateTab(tabId) {
    document.querySelectorAll(".tab").forEach(function (x) {
      const isActive = x.dataset.tab === tabId;
      x.classList.toggle("active", isActive);
      x.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    document.querySelectorAll(".tab-pane").forEach(function (x) {
      x.classList.toggle("active", x.id === tabId);
    });
  }

  document.querySelectorAll(".tab").forEach(function (t) {
    t.addEventListener("click", function () {
      activateTab(t.dataset.tab);
    });
  });

  function openPanel(tabId) {
    if (tabId) activateTab(tabId);
    panel.classList.add("open");
  }

  function focusPlace(p) {
    renderPlaceSummary(p);
    map.flyTo([p.lat, p.lng], 8, { duration: 1.1 });
    openPanel("tab-place");
  }

  document.getElementById("close-panel").addEventListener("click", function () {
    panel.classList.remove("open");
  });

  document.getElementById("open-ghazna").addEventListener("click", function () {
    focusPlace(ghazna);
  });

  const openLayersBtn = document.getElementById("open-layers-btn");
  if (openLayersBtn) {
    openLayersBtn.addEventListener("click", function () {
      openPanel("tab-layers");
    });
  }

  // ۴. بستن و بازکردن کادر معرفی (بهبود ویژه نمایشگر موبایل)
  const introBox = document.getElementById("map-intro");
  const introToggle = document.getElementById("map-intro-toggle");
  const introClose = document.getElementById("close-intro");

  function hideIntro() {
    introBox.classList.add("collapsed");
    introToggle.classList.add("show");
  }
  function showIntro() {
    introBox.classList.remove("collapsed");
    introToggle.classList.remove("show");
  }
  if (introClose) introClose.addEventListener("click", hideIntro);
  if (introToggle) introToggle.addEventListener("click", showIntro);

  // ۵. صفحه ورود (اسپلش) — فقط یک بار در هر نشست نمایش داده می‌شود
  const splash = document.getElementById("splash");
  if (splash) {
    if (sessionStorage.getItem("beyhaqi_atlas_entered") === "1") {
      splash.style.display = "none";
    } else {
      document.getElementById("enter-atlas").addEventListener("click", function () {
        sessionStorage.setItem("beyhaqi_atlas_entered", "1");
        splash.classList.add("hide");
        setTimeout(function () { splash.style.display = "none"; }, 600);
      });
    }
  }

  // ۶. نوار خط زمانی تعاملی (گسسته روی ۶ رویداد تأییدشده از ۹۷۷ تا ۱۲۲۱)
  const events = ghazna.timeline;
  const tlRange = document.getElementById("tl-range");
  const tlLabel = document.getElementById("tl-label");
  const tlPeriodBadge = document.getElementById("tl-period-badge");
  const tlMarksContainer = document.getElementById("tl-marks");

  if (tlRange && tlMarksContainer) {
    tlRange.min = 0;
    tlRange.max = events.length - 1;
    tlRange.step = 1;
    tlRange.value = 2; // آغاز روی دوره بیهقی (۱۰۳۰–۱۰۴۱)

    tlMarksContainer.innerHTML = events.map(function (ev, idx) {
      return '<span data-idx="' + idx + '">' + ev.yearSort + '</span>';
    }).join("");

    function updateTimeline(idx) {
      const ev = events[idx] || events[0];
      tlLabel.textContent = ev.yearLabel + " — " + ev.title;
      tlPeriodBadge.textContent = ev.periodLabel;
      tlPeriodBadge.className = "badge " + (ev.period === "beyhaqi" ? "badge-text" : (ev.period === "later" ? "badge-later" : "badge-hist"));
      tlMarksContainer.querySelectorAll("span").forEach(function (sp) {
        sp.classList.toggle("active-mark", parseInt(sp.dataset.idx, 10) === idx);
      });
    }

    tlRange.addEventListener("input", function () {
      updateTimeline(parseInt(tlRange.value, 10));
    });

    updateTimeline(2);
  }
})();
