function partFive(){
  var padding = {top: 10, right: 10, bottom: 30, left: 30},
    margin  = 5

  var sm = {height: 250, width: 300}

  //Hardcoding the scales so that the axis are all the same.
  var xScale = d3.scale.linear()
      .domain([0,20])
      .range([padding.left+margin, sm.width-padding.right-margin])

  var yScale = d3.scale.linear()
      .domain([0, 15])
      .range([sm.height - padding.bottom-margin, padding.top+margin])

  datasets.forEach(function(item, idx){
    d3.csv(item.path, function(data){

      data.forEach(function(d,idx){
        d.x = +d.x;
        d.y = +d.y;
        d.idx = idx*1.6+3; //Artificially
      })

      var svg = d3.select("#sm_"+(idx+1))
          svg.attr("width",  sm.width)
          svg.attr("height", sm.height)
          svg.attr("class","white")

      var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .ticks(5);

      var xAsisG = svg.append("g")
          .attr('class','axis')
          .attr('transform','translate(0, '+ (sm.height - padding.bottom) +")")
          .call(xAxis)

      var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(5);

      var yAsisG = svg.append("g")
          .attr('class','axis')
          .attr('transform','translate('+ padding.left +",0)")
          .call(yAxis)

      point = svg.selectAll('.point') // Select elements
        .data(data);		// Bind data to elements

      point.enter().append('svg:circle');	// Create new elements if needed

      // Update our selection
      point
        .attr('class', 'point')									// Give it a class
        .attr('cx', function(d) { return xScale(d.x); })	// x-coordinate
        .attr('cy', function(d) { return yScale(d.y); })	// y-coordinate
        .style('fill','green')
        .attr('r', 0)
        .attr('r', 5);

      var xLabel = svg.append("text")
        .attr('class','label')
        .attr('transform','translate('+ (sm.width/2) + ', '+ (padding.top+5) +")")
        .text(item.title)

      var regLine = linearRegression(data)

      var line = d3.svg.line()
        .x(function(d) { return xScale(d.idx); })
        .y(function(d) { return yScale(regLine(d.idx)); });

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "salmon")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line);
    })
  })
}

//Credit to: http://trentrichardson.com/2010/04/06/compute-linear-regressions-in-javascript/
function linearRegression(data){
  var lr = {};
      n = data.length,
      sum_x = 0,
      sum_y = 0,
      sum_xy = 0,
      sum_xx = 0,
      sum_yy = 0;

  for (var i = 0; i < data.length; i++) {
    sum_x += data[i].x;
    sum_y += data[i].y;
    sum_xy += (data[i].x*data[i].y);
    sum_xx += (data[i].x*data[i].x);
    sum_yy += (data[i].y*data[i].y);
  }

  lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr['intercept'] = (sum_y - lr.slope * sum_x)/n;

  //This works, I did not expect this to work, that is awesome.
  return function(x){
      return lr.intercept + lr.slope*x
    };
};
