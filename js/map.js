// نقشه صفحه اصلی — Leaflet؛ زیرنقشه پیش‌فرض: نقشه مرجع جئورفرنس‌شده (تقریبی)
const map = L.map("map").setView([33.5667, 68.45], 6);
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" });
const ref = L.imageOverlay("assets/reference-map-cropped.jpg", REF_BOUNDS, { opacity: 0.95 }).addTo(map);
L.control.layers({ "نقشه مدرن": osm, "نقشه مرجع بیهقی": ref }, {}, { position: "bottomright" }).addTo(map);
map.fitBounds(REF_BOUNDS);

const panel = document.getElementById("map-panel");
PLACES.forEach(function (p) {
  const icon = L.divIcon({ className: "", html: '<div class="tile-marker"></div>', iconSize: [22, 22], iconAnchor: [11, 11] });
  const m = L.marker([p.lat, p.lng], { icon: icon }).addTo(map);
  m.bindTooltip(p.name, { permanent: true, direction: "top", offset: [0, -14] });
  m.on("click", function () {
    map.flyTo([p.lat, p.lng], 9, { duration: 1.2 });
    panel.classList.add("open");
  });
});
document.getElementById("open-ghazna").addEventListener("click", function () {
  const p = PLACES[0];
  map.flyTo([p.lat, p.lng], 9, { duration: 1.2 });
  panel.classList.add("open");
});
document.getElementById("close-panel").addEventListener("click", function () { panel.classList.remove("open"); });
