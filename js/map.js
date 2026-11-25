// نقشه صفحه اصلی — Leaflet؛ زیرنقشه پیش‌فرض: نقشه مرجع جئورفرنس‌شده (تقریبی)
const map = L.map("map").setView([33.5667, 68.45], 6);
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" });
const ref = L.imageOverlay("assets/reference-map-cropped.jpg", REF_BOUNDS, { opacity: 0.95 }).addTo(map);
map.fitBounds(REF_BOUNDS);

/* ---------- جابه‌جایی لایه‌ها (مرجع / مدرن / مدرن سپیا) ---------- */
const mapEl = document.getElementById("map");
function setBaseLayer(kind) {
  if (kind === "ref") {
    if (map.hasLayer(osm)) map.removeLayer(osm);
    mapEl.classList.remove("sepia");
    if (!map.hasLayer(ref)) ref.addTo(map);
  } else {
    if (map.hasLayer(ref)) map.removeLayer(ref);
    if (!map.hasLayer(osm)) osm.addTo(map);
    mapEl.classList.toggle("sepia", kind === "sepia");
  }
}
document.querySelectorAll('input[name="baselayer"]').forEach(function (r) {
  r.addEventListener("change", function () { setBaseLayer(r.value); });
});

/* ---------- پنل تب‌دار ---------- */
const panel = document.getElementById("map-panel");
document.querySelectorAll(".tab").forEach(function (t) {
  t.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
    document.querySelectorAll(".tab-pane").forEach(function (x) { x.classList.remove("active"); });
    t.classList.add("active");
    document.getElementById(t.dataset.tab).classList.add("active");
  });
});
function openPanel(tabId) {
  if (tabId) {
    document.querySelectorAll(".tab").forEach(function (x) { x.classList.toggle("active", x.dataset.tab === tabId); });
    document.querySelectorAll(".tab-pane").forEach(function (x) { x.classList.toggle("active", x.id === tabId); });
  }
  panel.classList.add("open");
}
document.getElementById("close-panel").addEventListener("click", function () { panel.classList.remove("open"); });

/* ---------- نشان‌ها ---------- */
PLACES.forEach(function (p) {
  const icon = L.divIcon({ className: "", html: '<div class="tile-marker"></div>', iconSize: [22, 22], iconAnchor: [11, 11] });
  const m = L.marker([p.lat, p.lng], { icon: icon }).addTo(map);
  m.bindTooltip(p.name, { permanent: true, direction: "top", offset: [0, -14] });
  m.on("click", function () {
    map.flyTo([p.lat, p.lng], 9, { duration: 1.2 });
    openPanel("tab-place");
  });
});
document.getElementById("open-ghazna").addEventListener("click", function () {
  const p = PLACES[0];
  map.flyTo([p.lat, p.lng], 9, { duration: 1.2 });
  openPanel("tab-place");
});

/* ---------- صفحه ورود (اسپلش) ---------- */
const splash = document.getElementById("splash");
document.getElementById("enter-atlas").addEventListener("click", function () {
  splash.classList.add("hide");
  setTimeout(function () { splash.style.display = "none"; }, 650);
});

/* ---------- نوار زمان ---------- */
const EVENTS = [
  { year: 977,  label: "۹۷۷ میلادی — غزنه پایتخت غزنویان شد" },
  { year: 998,  label: "۹۹۸ تا ۱۰۳۰ میلادی — سلطنت سلطان محمود غزنوی" },
  { year: 1030, label: "۱۰۳۰ میلادی — آغاز سلطنت سلطان مسعود اول؛ دوره روایت بخش بازمانده تاریخ بیهقی" },
  { year: 1031, label: "۱۰۳۱ میلادی — سیل غزنه" },
  { year: 1041, label: "۱۰۴۱ میلادی — پایان سلطنت سلطان مسعود اول" }
];
const tlRange = document.getElementById("tl-range");
const tlLabel = document.getElementById("tl-label");
tlRange.addEventListener("input", function () {
  const y = parseInt(tlRange.value, 10);
  let best = EVENTS[0];
  EVENTS.forEach(function (e) { if (Math.abs(e.year - y) < Math.abs(best.year - y)) best = e; });
  tlLabel.textContent = best.label;
});
