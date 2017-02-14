//Adding transitions from: http://bl.ocks.org/enjalot/1429426

function partThree(d_idx){
  d3.csv(datasets[d_idx].path,function(data){
    // Get the data into working form
    data.forEach(function(d,idx){
      d.x = +d.x;
      d.y = +d.y;
    })

    var height  = 300,
        width   = 400,
        padding = {top: 10, right: 10, bottom: 30, left: 30},
        margin  = 5,
        svg = d3.select("#scatterplot").append("svg:svg")
          .attr("width", width)
          .attr("height",height)
          .attr("class",'white')

    var xScale = d3.scale.linear()
          .domain([0,d3.max(data, function(d){return d.x})])
          .range([padding.left+margin, width-padding.right-margin])

    var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d){return d.y})])
        .range([height - padding.bottom-margin, padding.top+margin])

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    var xAsisG = svg.append("g")
        .attr('class','axis')
        .attr('id','xaxis')
        .attr('transform','translate(0, '+ (height - padding.bottom) +")")
        .call(xAxis)

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var yAsisG = svg.append("g")
        .attr('class','axis')
        .attr('id','yaxis')
        .attr('transform','translate('+ padding.left +",0)")
        .call(yAxis)

    point = svg.selectAll('.point') // Select elements
      .data(data);		              // Bind data to elements

    point.enter().append('svg:circle');	// Create new elements if needed

    // Update our selection
    point
      .attr('class', 'point')									// Give it a class
      .attr('cx', function(d) { return xScale(d.x); })	// x-coordinate
      .attr('cy', function(d) { return yScale(d.y); })	// y-coordinate
      .style('fill','green')
      .attr('r', 0)
      .attr('r', 8);

    point.append('svg:title')									// tooltip
      .text(function(d) { return `(${d.x},${d.y})` });


    //Part 4: Interaction
    point.on("click",function(d){
      document.getElementById("scatterLabel").innerHTML = `x: ${d.x}, y: ${d.y}`
    });

    point.on("mouseover",function(d){
      this.style = "fill: red;"
    });

    point.on("mouseout",function(d){
      this.style = "fill: green;"
    });

    //Add the event listener here (so that it has access to all the variables...)
    // Reference to: http://bl.ocks.org/WilliamQLiu/bd12f73d0b79d70bfbae
    document.getElementById("chooser").addEventListener('change',function(e){
      document.getElementById("scatterLabel").innerHTML = "Click on a Point"
      d3.csv(datasets[this.value].path,function(new_data){
        // Get the data into working form
        new_data.forEach(function(d,idx){
          d.x = +d.x;
          d.y = +d.y;
        })

        svg = d3.select("#scatterPlot svg")

        // Update scale domains
        xScale.domain([0, d3.max(new_data, function(d) {
           return d.x; })]);
        yScale.domain([0, d3.max(new_data, function(d) {
           return d.y; })]);

        var point = svg.selectAll('circle') // Select elements
          .data(new_data)
          .transition()
          .duration(500)
          .attr("cx", function(d) {
              return xScale(d.x);  // Circle's X
          })
          .attr("cy", function(d) {
              return yScale(d.y);  // Circle's Y
          })

          // Update X Axis
          svg.select("#xaxis")
            .transition()
            .duration(1000)
            .call(xAxis);

          // Update Y Axis
          svg.select("#yaxis")
            .transition()
            .duration(1000)
            .call(yAxis);

      });
    })
  })
}
