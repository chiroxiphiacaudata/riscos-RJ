/////////////////
///add basemap///
/////////////////

var bounds = new L.LatLngBounds(new L.LatLng(-23.3, -44.4), new L.LatLng(-22.3, -42.8));

var map = L.map('map').setView([-22.884468, -43.247325], 12);
L.tileLayer('./{z}/{x}/{y}.jpg', {
  minZoom: 11,
  maxZoom: 14,
  tms: false,
  maxBounds: bounds,
  attribution: 'IBGE, OpenStreetMap, NASA SRTM, Fogo Cruzado, Disque-Denúncia, GENI-UFF, NEV-USP, PistaNews',
}).addTo(map);

map.removeControl(map.zoomControl);

L.control.zoom({
  position: 'bottomleft'
}).addTo(map);

map.setMaxBounds(bounds);
