console.log('10.1');

var m = {t:50,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = document.getElementById('canvas').clientHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', w + m.l + m.r)
    .attr('height', h + m.t + m.b)
    .append('g').attr('class','plot')
    .attr('transform','translate('+ m.l+','+ m.t+')');

//Mapping specific functions

//Projection
var projection = d3.geoMercator();
    
//Geopath
var pathGenerator = d3.geoPath()
    .projection(projection); 

console.log(pathGenerator);

d3.json('../data/world-50m.json',dataloaded);

function dataloaded(err, data){
    console.log(data); //This is a Topojson data
    console.log(topojson.feature(data,data.objects.countries)); //This is the converted GeoJSON data of countries

  var countries = topojson.feature(data,data.objects.countries);
  console.log(countries.features);

  projection.fitExtent([[0,0],[w,h]],countries);

  var worldMap = plot.selectAll('.countries')
      .data(countries.features)
      .enter()
      .append('path').attr('class','countries')
      .attr('d',pathGenerator)
      .style('fill','rgb(200,200,200)')
      .style('stroke-width','1px')
      .style('stroke','white');


}