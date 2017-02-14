function partTwo(d_idx){
  //Hide all variables inside this function so it doesn't affect other plots
  d3.csv(datasets[d_idx].path,function(data){
    // Get the data into working form
    data.forEach(function(d,idx){
      d.x = +d.x;
      d.idx = idx;
    })

    //Using https://bl.ocks.org/mbostock/3885304 as starting "block" ... :)
    var height  = 400,
        width   = 600,
        padding = {top: 10, right: 10, bottom: 30, left: 30},
        margin  = 10,
        svg = d3.select("#barchart").append("svg:svg")
          .attr("width", width)
          .attr("height",height);

    var xScale = d3.scale.linear()
        .domain([0,data.length])
        .range([padding.left+margin, width-padding.right-margin])

    var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d){return d.x})])
        .range([height - padding.bottom-margin, padding.top+margin])

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    var xAsisG = svg.append("g")
        .attr('class','axis')
        .attr('transform','translate(0, '+ (height - padding.bottom) +")")
        .call(xAxis)

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var yAsisG = svg.append("g")
        .attr('class','axis')
        .attr('transform','translate('+ padding.left +",0)")
        .call(yAxis)

    svg.append("g").selectAll(".bar")
     .data(data)
       .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.idx); })
        .attr("y", function(d) { return yScale(d.x) })
        .attr("height", function(d) { return height - padding.bottom - margin - yScale(d.x); })
        .attr("width", 20)


    document.getElementById("chooser").addEventListener('change',function(e){
      console.log(this.value)
      d3.csv(datasets[this.value].path,function(new_data){
        // Get the data into working form
        new_data.forEach(function(d,idx){
          d.x = +d.x;
        })

        svg = d3.select("#barchart svg")

        // Update scale domains
        yScale.domain([0, d3.max(new_data, function(d) {
           return d.x; })]);

        var bars = svg.selectAll('rect') // Select elements
          .data(new_data)
          .transition()
          .duration(500)
          .attr("y", function(d) { return yScale(d.x) })
          .attr("height", function(d) { return height - padding.bottom - margin - yScale(d.x); })

          // Update Y Axis
          svg.select("#yaxis")
            .transition()
            .duration(1000)
            .call(yAxis);

      });
    })
  })
}
