$(window).load(function() {
    var chartWidth=800;
            var chartHeight=600;
            var chartMargin={top: 40, left: 50, right: 40, bottom: 40};
            var chartInnerHeight=chartHeight-chartMargin.top-chartMargin.bottom;
            var chartInnerWidth=chartWidth-chartMargin.left-chartMargin.right;
var xScale=d3.scale.linear()
                    .range([0,chartInnerWidth]);
            var yScale=d3.scale.linear()
                    .range([chartInnerHeight,0]);
    var xAxis=d3.svg.axis()
                    .tickSize(10)
                    .scale(xScale)
                    .orient("bottom");
    var yAxis=d3.svg.axis()
                .scale(yScale)
                .tickSize(10)
                .orient("left");
    var chart=d3.select("#canvas");
    
 chart
                    .attr("width",chartWidth)
                    .attr("height",chartHeight)
                    .append("g")
                    .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");
;
var xAxisGroup=chart.append("g")
                .attr("class","x axis")
                .attr("transform","translate(" +chartMargin.left  
                      + ","
                      + (chartInnerHeight+chartMargin.top) + ")");
xAxisGroup.append("text")
  .attr("class", "label")
  .attr("x", chartInnerWidth)
  .attr("y", -6)
  .style("text-anchor", "end");
  var yAxisGroup=chart.append("g")
            .attr("class","y axis")
                .attr("transform","translate(" +chartMargin.left  
                      + ","
                      + (chartMargin.top) + ")");
    yAxisGroup.append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end");
    function render_graph(){
           var xVar = d3.select('#sel-x').node().value;
    var yVar = d3.select('#sel-y').node().value;
var mpg_min = $('#mpg-min').val();
    var mpg_max = $('#mpg-max').val();
       dataf = data.filter(function(d,i){
    return d.mpg>=mpg_min && d.mpg<=mpg_max;
    }); 
    xScale.domain([0,d3.max(data, function(d) { return +d[xVar]; })]).nice();

    yScale.domain([0,d3.max(data, function(d) { return +d[yVar]; })]).nice();
    xAxisGroup.call(xAxis);

    yAxisGroup.call(yAxis);

  

    xAxisGroup.select("text").text(xVar);

    yAxisGroup.select("text").text(yVar);

        var selection = chart.selectAll(".dot")
                        .data(dataf);
                selection.enter()
                        .append("circle")
                        .attr("class","dot");
                        selection.exit().remove();
                           
                            
                selection.exit().remove();
                selection
                        .attr("r",3.0)
                        .attr("cx",function(d){ return xScale(d[xVar])})
                        .attr("cy",function(d){ return yScale(d[yVar])})
                        .on("mouseenter",function(d,i){
                                
                                d3.select("#hovered").text(d["name"]);
                                
                              })
                            .on("mouseleave",function(d,i){
                                d3.select("#hovered").text("Hover to see Car name");
                              });

    }

    var data=null;
    function dropdown_render(header){

    $('#sel-x').empty();
    $('#sel-y').empty();
    $.each(header, function(i, p) {
        if(p == 'name' || p == 'origin'){ return;}
        $('#sel-x').append($('<option></option>').val(p).html(p));
        $('#sel-y').append($('<option></option>').val(p).html(p));
   });

    }
    d3.csv("car.csv", function(csv) {
        var headers = d3.keys(csv[0]);
        dropdown_render(headers);
        csv.forEach(function(row) {
        
        csv.name = row.name;

        csv.origin = row.origin;

        csv["model.year"] = +row["model.year"];

        csv.mpg = +row.mpg;

        csv.cylinders = +row.cylinders;

        csv.displacement = +row.displacement;

        csv.horsepower = +row.horsepower;

        csv.weight = +row.weight;

        csv.acceleration = +row.acceleration;

    });
            data=csv;
            
            render_graph(); 
                
              });
            
   $("#update").click(function(){
    
   render_graph();
    
   });
     $("select").change(function(){   
   render_graph();
 });
    
   });

 