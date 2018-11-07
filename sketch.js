//****************************** VARIABLEN ******************************************/

var data = [];
var ready = false;

var projection = null;

//******************************SETUP FUNKTION******************************************/
function setup() {
  createCanvas(1920, 1080);

  projection = d3.geoMercator() //Projektionsart, Auflistung von Projektionen:https://github.com/d3/d3-geo#projections
    .center([8.541694, 47.3768866]) //Zürich
    .translate([width / 2, height / 2]) //Screen Position des Kartenmittelpunktes
    .scale(2000);
  
  d3.csv("flights.csv", function (d) {

    return {
      
      von: d.Von,
      von_lat: +d.Von_Lat,
      von_lng: +d.Von_Lng,
      nach: d.Nach,
      nach_lat: +d.Nach_Lat,
      nach_lng: +d.Nach_Lng,
      abflug: +d.Abflug,
      ankunft: +d.Ankunft,
      flugzeit: +d.Flugzeit,
      fluggesellschaft: d.Fluggesellschaft,
      preis: +d.Preis
    };

  }).then(function (csv) {
    data = csv;
    ready = true;

    console.log(data);

  });

}
//****************************** Draw FUNKTION ******************************************/

function draw() {
  if (!ready) {
    background(255, 0, 0);
    return;
  } else {
    background(255);
  }

  stroke(0);
  fill(0, 100);
  for (var i = 0; i < data.length; i++) {
    var nach_lng = data[i].nach_lng;
    var nach_lat = data[i].nach_lat;
    var von_lng =data[i].von_lng;
    var von_lat = data[i].von_lat;
    var pos_1 = projection([nach_lng, nach_lat]);
    ellipse(pos_1[0], pos_1[1], 10, 10);
    var pos_2 = projection([von_lng, von_lat]);
    rect(pos_2[0], pos_2[1], 6, 6);
    line(pos_1[0], pos_1[1], pos_2[0], pos_2[1]);
  
  }



} 
