// ============================================================
// اسکریپت صفحه پرونده پژوهشی شهر (فعلاً: غزنه)
// داده‌ها به‌طور کامل از js/data.js خوانده می‌شوند.
// ============================================================
(function () {
  if (typeof PLACES === "undefined") return;

  const placeId = document.body.dataset.placeId || "ghazna";
  const place = PLACES.find(function (p) { return p.id === placeId; }) || PLACES[0];

  function badgeHTML(typeKey, customLabel) {
    const info = ATLAS_CONFIG.evidenceTypes[typeKey] || ATLAS_CONFIG.evidenceTypes.historical;
    return '<span class="badge ' + info.badgeClass + '">' + (customLabel || info.label) + '</span>';
  }

  // ۱. عنوان و زیرعنوان
  const titleEl = document.getElementById("place-title");
  const subEl = document.getElementById("place-subtitle");
  if (titleEl) titleEl.textContent = place.name;
  if (subEl) subEl.textContent = place.pageSubtitle;

  // ۲. جدول شناسنامه مکان
  const idTableBody = document.getElementById("identity-tbody");
  if (idTableBody) {
    idTableBody.innerHTML = place.identityRows.map(function (row) {
      return (
        '<tr>' +
          '<td>' + row.field + '</td>' +
          '<td>' + row.value + '</td>' +
          '<td>' + badgeHTML(row.evidenceType) + '</td>' +
          '<td>' + row.certainty + '<div class="src-note" style="margin-top:2px">' + row.source + '</div></td>' +
        '</tr>'
      );
    }).join("");
  }

  // ۳. جایگاه در تاریخ بیهقی
  const contextEl = document.getElementById("beyhaqi-context");
  if (contextEl) {
    const blocks = place.beyhaqiContext.map(function (item) {
      return (
        '<div style="margin-bottom:14px">' +
          '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">' +
            '<h3 style="margin:0">' + item.title + '</h3>' +
            badgeHTML(item.evidenceType) +
          '</div>' +
          '<p class="body">' + item.body + '</p>' +
          '<div class="src-note">منبع: ' + item.source + '</div>' +
        '</div>'
      );
    }).join("");

    const statusBox =
      '<div class="note-box note-review">' +
        '<strong>شواهد مستقیم متن تاریخ بیهقی:</strong> ' +
        badgeHTML("review", place.textualEvidenceStatus.badge) +
        '<p class="body" style="margin-top:6px">' + place.textualEvidenceStatus.text + '</p>' +
      '</div>';

    contextEl.innerHTML = blocks + statusBox;
  }

  // ۴. خط زمانی تعاملی با فیلتر دوره‌ای
  const tlList = document.getElementById("place-timeline");
  if (tlList) {
    tlList.innerHTML = place.timeline.map(function (ev) {
      const liClass = ev.period === "later" ? "tl-later" : (ev.period === "pre" ? "tl-pre" : "tl-beyhaqi");
      const periodBadgeClass = ev.period === "beyhaqi" ? "badge-text" : (ev.period === "later" ? "badge-later" : "badge-hist");
      return (
        '<li class="' + liClass + '" data-period="' + ev.period + '">' +
          '<div class="tl-row">' +
            '<span class="when">' + ev.yearLabel + '</span>' +
            '<span class="badge ' + periodBadgeClass + '">' + ev.periodLabel + '</span>' +
          '</div>' +
          '<div class="what">' + ev.title + '</div>' +
          '<div class="tl-src">منبع: ' + ev.source + '</div>' +
        '</li>'
      );
    }).join("");

    document.querySelectorAll(".filter-btn[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const f = btn.dataset.filter;
        document.querySelectorAll(".filter-btn[data-filter]").forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        tlList.querySelectorAll("li").forEach(function (li) {
          const match = f === "all" || li.dataset.period === f;
          li.classList.toggle("hidden", !match);
        });
      });
    });
  }

  // ۵. شخصیت‌های تاریخی مرتبط
  const peopleEl = document.getElementById("place-people");
  if (peopleEl) {
    peopleEl.innerHTML = place.figures.map(function (fig) {
      return (
        '<article class="person-card">' +
          '<h3>' + fig.name + '</h3>' +
          '<p><strong>جایگاه:</strong> ' + fig.role + '</p>' +
          '<p>' + fig.relation + '</p>' +
          '<div class="person-meta">' +
            badgeHTML(fig.evidenceType) +
            '<span class="badge badge-review">' + fig.textualNote + '</span>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  // ۶. ملاحظات پژوهشی مهم
  const caveatsEl = document.getElementById("place-caveats");
  if (caveatsEl) {
    caveatsEl.innerHTML = place.caveats.map(function (c) {
      return (
        '<li class="caveat-item">' +
          '<div class="caveat-top">' +
            '<span class="caveat-title">' + c.title + '</span>' +
            '<span class="badge ' + c.badgeClass + '">' + c.tag + '</span>' +
          '</div>' +
          '<div>' + c.detail + '</div>' +
        '</li>'
      );
    }).join("");
  }

  // ۷. منابع پایه
  const sourcesEl = document.getElementById("place-sources");
  if (sourcesEl && typeof ATLAS_SOURCES !== "undefined") {
    sourcesEl.innerHTML = ATLAS_SOURCES.map(function (s) {
      return '<li><strong>' + s.title + '</strong> — ' + s.role + '</li>';
    }).join("");
  }

  // ۸. نقشه تعاملی اختصاصی غزنه درون صفحه پرونده
  const inlineMapEl = document.getElementById("ghazna-map");
  if (inlineMapEl && typeof L !== "undefined") {
    const pMap = L.map("ghazna-map", { scrollWheelZoom: false }).setView([place.lat, place.lng], 7);
    const osm = L.tileLayer(ATLAS_CONFIG.osmUrl, { maxZoom: 18, attribution: ATLAS_CONFIG.osmAttribution });
    let ref = L.imageOverlay(ATLAS_CONFIG.refMapUrl, ATLAS_CONFIG.refMapBounds, { opacity: 0.92 }).addTo(pMap);

    ref.on("error", function () {
      if (ref._url !== ATLAS_CONFIG.refMapFallbackUrl) {
        pMap.removeLayer(ref);
        ref = L.imageOverlay(ATLAS_CONFIG.refMapFallbackUrl, ATLAS_CONFIG.refMapBounds, { opacity: 0.92 }).addTo(pMap);
      }
    });

    const textLayer = L.layerGroup().addTo(pMap);
    const geoLayer = L.layerGroup().addTo(pMap);

    const icon = L.divIcon({
      className: "",
      html: '<div class="tile-marker"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
    L.marker([place.lat, place.lng], { icon: icon })
      .addTo(textLayer)
      .bindTooltip(place.name + " — " + place.coordsDisplay, { permanent: true, direction: "top", offset: [0, -14] });

    const geoIcon = L.divIcon({
      className: "",
      html: '<div class="geo-ring-marker"></div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });
    L.marker([place.lat, place.lng], { icon: geoIcon, interactive: false }).addTo(geoLayer);

    document.querySelectorAll('input[name="inline-base"]').forEach(function (r) {
      r.addEventListener("change", function () {
        if (r.value === "ref") {
          if (pMap.hasLayer(osm)) pMap.removeLayer(osm);
          inlineMapEl.classList.remove("sepia");
          if (!pMap.hasLayer(ref)) ref.addTo(pMap);
        } else {
          if (pMap.hasLayer(ref)) pMap.removeLayer(ref);
          if (!pMap.hasLayer(osm)) osm.addTo(pMap);
          inlineMapEl.classList.toggle("sepia", r.value === "sepia");
        }
      });
    });

    const chkText = document.getElementById("inline-layer-text");
    const chkGeo = document.getElementById("inline-layer-geo");
    if (chkText) {
      chkText.addEventListener("change", function () {
        if (chkText.checked) textLayer.addTo(pMap);
        else pMap.removeLayer(textLayer);
      });
    }
    if (chkGeo) {
      chkGeo.addEventListener("change", function () {
        if (chkGeo.checked) geoLayer.addTo(pMap);
        else pMap.removeLayer(geoLayer);
      });
    }
  }

  // ۹. ظاهرشدن تدریجی کارت‌ها
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (e) { e.classList.add("visible"); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (x.isIntersecting) {
          x.target.classList.add("visible");
          io.unobserve(x.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }
})();
