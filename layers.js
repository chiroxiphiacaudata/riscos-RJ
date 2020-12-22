/////////////////
///layer style///
/////////////////

var areas_risco = {
  "color": "#ff0000",
  "weight": 1,
  "opacity": 0.5,
  "fillOpacity": 0
}

var subs = {
  "color": "#0099CC",
  "weight": 1,
  "opacity": 0.5,
  "fillOpacity": 0
}

var oper = {
  "radius": 2,
  "fillColor": "#fff",
  "color": "#000000",
  "weight": 1,
  "opacity": 1,
  "fillOpacity": .1
}

function getColor(fac_name) {
  return fac_name == "Comando Vermelho" ? '#ff5668' :
    fac_name == "Terceiro Comando Puro" ? '#68bbaf' :
    fac_name == "Amigo dos amigos" ? '#616161' :
    fac_name == "Milicia" ? '#2685c4' :
    fac_name == "Em disputa" ? '#c7a1ba' :
    '#e7c90b';
}

function style(feature) {
  return {
    color: getColor(feature.properties.fac_name),
    weight: 1,
    opacity: 1,
    fillColor: 'white',
    dashArray: '2',
    fillOpacity: 0.2
  };
}

//////////////////////////////
///oneachfeature conditions///
//////////////////////////////

function onEachFeature(feature, layer) {
  //console.log(feature.properties.GEO_BATER);
  layer.bindPopup("Codigo</br><b>Base Territorial Estatística de Área Risco - BATER</b> :  " + feature.properties.GEO_BATER + "</br></br>" + "<b>População em áreas de risco</b></br>Número de moradorxs : " + feature.properties.TOT +
    "</br></br>Branca : " + feature.properties.P_BRANC + " %</br>Preta : " + feature.properties.P_PRET + " %</br>Amarela : " + feature.properties.P_AMAR + " %</br>Parda : " + feature.properties.P_PARD + " %</br>Indígena : " + feature.properties
    .P_INDI + " %</br>");
}

function sublabel(feature, layer) {
  //console.log(feature.properties.GEO_BATER);
  layer.bindPopup("<b>Aglomerado subnormal</b></br>Número de moradorxs : " + feature.properties.TOTAL +
    "</br></br>Branca : " + feature.properties.pBRANCA + " %</br>Preta : " + feature.properties.pPRETA + " %</br>Amarela : " + feature.properties.pAMARELA + " %</br>Parda : " + feature.properties.pPARDA + " %</br>Indígena : " + feature.properties
    .pINDIO + " %</br>");
}

function operacoeslabel(feature, layer) {
  layer.bindPopup("Ocorrência</br><b>FOGO CRUZADO</b> :  " + feature.properties.id_ocorren + "</br></br>" + "Local :</br>" + "<b>" + feature.properties.local_ocor + "</b>" +
    "</br>Data : " + feature.properties.data_ocorr + " </br></br>Mortes Civis : " + feature.properties.qtd_morto_ + " </br>Mortes Agentes : " + feature.properties.qtd_mort_1 + " </br>Feridos Civis : " + feature.properties.qtd_ferido +
    " </br>Feridos Agentes : " + feature.properties
    .qtd_feri_1 + " </br>");
}

function facoeslabel(feature, layer) {
  layer.bindPopup("Grupo armado:</br><b>" + feature.properties.fac_name + "</b></br></br>" + "Local :</br>" + feature.properties.Name + "</b></br>");
}

//////////////////
///group layers///
//////////////////

var operacoesl = L.layerGroup();
var subl = L.layerGroup();
var baterl = L.layerGroup();
var facoesl = L.layerGroup();

////////////////
///add layers///
////////////////

$.getJSON("./data/operacoes-policiais.geojson", function(feature) {

  var operacoes = L.geoJson(feature, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, oper);
    },
    onEachFeature: operacoeslabel
  }).addTo(operacoesl);

});


$.getJSON("./data/areas-risco.geojson", function(feature) {

  var bater = L.geoJson(feature, {
    style: areas_risco,
    onEachFeature: onEachFeature
  }).addTo(baterl);

});


$.getJSON("./data/areas-precarias.geojson", function(feature) {

  var sub = L.geoJson(feature, {
    style: subs,
    onEachFeature: sublabel
  }).addTo(subl);

});


$.getJSON("./data/facoes-armadas.geojson", function(feature) {

  var operacoes = L.geoJson(feature, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, oper);
    },
    style: style,
    onEachFeature: facoeslabel
  }).addTo(facoesl);

});

////////////////////
///control layers///
////////////////////

var overlay = {
  "área passível de ser atingida por fenômenos ou processos naturais": baterl,
  "Tiroteios que deixaram civis e/ou agentes de segurança mortos e/ou feridos": operacoesl,
  "Grupos armados pelo domínio territorial": facoesl,
  "Áreas afetadas por condições socioeconômicas, de saneamento e de moradia mais precárias": subl
};

var control = L.control.layers(overlay, null, {
  collapsed: false
});
control.addTo(map);

////////
///UX///
////////

// Call the getContainer routine.
var htmlObject = control.getContainer();
// Get the desired parent node.
var a = document.getElementById('legend');
// Finally append that node to the new parent.
function setParent(el, newParent) {
  newParent.appendChild(el);
}
setParent(htmlObject, a);

baterl.addTo(map)
//operacoesl.addTo(map)
//facoesl.addTo(map)

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
