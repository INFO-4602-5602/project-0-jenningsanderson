function partTwo(d_idx){

  //Hide all variables inside this function so it doesn't affect other plots
  d3.csv(datasets[d_idx].path,function(data){
    //Using https://bl.ocks.org/mbostock/3885304 as starting "block" ... :)
    var height  = 300,
        width   = 400,
        padding = {top: 10, right: 10, bottom: 30, left: 30},
        margin  = 5,
        svgX = d3.select("#barchart").append("svg:svg")
          .attr("id", "svgX")
          .attr("width", width)
          .attr("height",height)
          .attr('class','white');
        svgY = d3.select("#barchart").append("svg:svg")
          .attr("id", "svgY")
          .attr("width", width)
          .attr("height",height)
          .attr('class','white');

    // Get the data into working form
    data.forEach(function(d,idx){
      d.x = +d.x;
      d.y = +d.y;
      d.idx = idx;
    })

    var xScale = d3.scale.linear()
        .domain([0,data.length])
        .range([padding.left+margin, width-padding.right-margin])

    var X_yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d){return d.x})])
        .range([height - padding.bottom-margin, padding.top+margin])

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    var xAxisG = svgX.append("g")
        .attr('class','x axis')
        .attr('transform','translate(0, '+ (height - padding.bottom) +")")
        .call(xAxis)

    var X_yAxis = d3.svg.axis()
        .scale(X_yScale)
        .orient("left")
        .ticks(5);

    var X_yAsisG = svgX.append("g")
        .attr('class','y axis')
        .attr('transform','translate('+ padding.left +",0)")
        .call(X_yAxis)

    svgX.append("g").selectAll(".bar")
     .data(data)
       .enter().append("rect")
        .attr("class", "bar")
        .style("fill","steelblue")
        .attr("id",function(d) { return "svgX-"+d.idx})
        .attr("x", function(d) { return xScale(d.idx); })
        .attr("y", function(d) { return X_yScale(d.x) })
        .attr("height", function(d) { return height - padding.bottom - margin - X_yScale(d.x); })
        .attr("width", 20)
        .on('mouseover',function(d){
          this.style = "fill: red;"
          d3.selectAll("rect#svgY-"+d.idx).style("fill","red")
            // .attr("fill","yellow")
        })
        .on('mouseout',function(d){
          this.style = "fill: steelblue;"
          d3.selectAll("rect#svgY-"+d.idx).style("fill","steelblue")
        })

    //Now the second one

    var Y_yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d){return d.x})])
        .range([height - padding.bottom-margin, padding.top+margin])

    var Y_xAxisG = svgY.append("g")
        .attr('class','axis')
        .attr('transform','translate(0, '+ (height - padding.bottom) +")")
        .call(xAxis)

    var Y_yAxis = d3.svg.axis()
        .scale(Y_yScale)
        .orient("left")
        .ticks(5);

    var Y_yAsisG = svgY.append("g")
        .attr('class','axis')
        .attr('transform','translate('+ padding.left +",0)")
        .call(Y_yAxis)

    svgY.append("g").selectAll(".bar")
     .data(data)
       .enter().append("rect")
        .attr("class", "bar")
        .style("fill","steelblue")
        .attr("id",function(d) { return "svgY-"+d.idx})
        .attr("x", function(d) { return xScale(d.idx); })
        .attr("y", function(d) { return Y_yScale(d.y) })
        .attr("height", function(d) { return height - padding.bottom - margin - Y_yScale(d.y); })
        .attr("width", 20)
        .on('mouseover',function(d){
          this.style = "fill: red;"
          d3.selectAll("rect#svgX-"+d.idx).style("fill","red")
            // .attr("fill","yellow")
        })
        .on('mouseout',function(d){
          this.style = "fill: steelblue;"
          d3.selectAll("rect#svgX-"+d.idx).style("fill","steelblue")
        })

    svgX.append("text")
      .attr('transform','translate('+ (width/2) + ', '+ (padding.top+5) +")")
      .attr('class','label')
      .text("X-Values");

    svgY.append("text")
      .attr('transform','translate('+ (width/2) + ', '+ (padding.top+5) +")")
      .attr('class','label')
      .text("Y-Values");

    document.getElementById("chooser").addEventListener('change',function(e){
      console.log(this.value)
      d3.csv(datasets[this.value].path,function(new_data){
        // Get the data into working form
        new_data.forEach(function(d,idx){
          d.x = +d.x;
          d.y = +d.y;
        })

        svgX = d3.select("#svgX")

        // Update scale domains
        X_yScale.domain([0, d3.max(new_data, function(d) {
           return d.x; })]);

        var bars = svgX.selectAll('rect') // Select elements
          .data(new_data)
          .transition()
          .duration(500)
          .attr("y", function(d) { return X_yScale(d.x) })
          .attr("height", function(d) { return height - padding.bottom - margin - X_yScale(d.x); })

          // Update Y Axis
          svgX.select(".y.axis")
            .transition()
            .duration(1000)
            .call(X_yAxis);

        svgY = d3.select("#svgY")

        // Update scale domains
        Y_yScale.domain([0, d3.max(new_data, function(d) {
           return d.x; })]);

        var bars = svgY.selectAll('rect') // Select elements
          .data(new_data)
          .transition()
          .duration(500)
          .attr("y", function(d) { return Y_yScale(d.y) })
          .attr("height", function(d) { return height - padding.bottom - margin - Y_yScale(d.y); })

          // Update Y Axis
          svgY.select(".y.axis")
            .transition()
            .duration(1000)
            .call(Y_yAxis);
      });
    })
  })
}
