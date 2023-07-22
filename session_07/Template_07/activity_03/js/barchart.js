
/*****************************************/
/*   DRAW BAR CHART - ALREADY COMPLETE   */
/*****************************************/

// CHART AREA

let margin = {top: 40, right: 20, bottom: 40, left: 90},
	width = 800 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;


let svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// AXIS 




function renderBarChart(data) {

	// Check array length (top 5 attractions)
	if(data.length > 5){
		errorMessage("Max 5 rows");
		return;
	}

	// Check object properties
	if(!data[0].hasOwnProperty("Visitors") || !data[0].hasOwnProperty("Location") || !data[0].hasOwnProperty("Category")) {
		errorMessage("The Object properties are not correct! An attraction should include at least: 'Visitors', 'Location', 'Category'");
		return;
	}

	//define scales
	let xScale = d3.scaleBand()
		.range([0, width])
		.domain(data.map( d => d.Location))
		.paddingInner(0.1);

	let yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.Visitors)])
		.range([height, 0]);

	//draw axis
	let xAxis = d3.axisBottom()
		.scale(xScale)
		.tickFormat(function(d) { return shortenString(d, 20); });

	let yAxis = d3.axisLeft()
		.scale(yScale);

	let xAxisGroup = svg.append("g")
		.attr("class", "x-axis axis");

	let yAxisGroup = svg.append("g")
		.attr("class", "y-axis axis");



	// ---- DRAW BARS ----
	let bars = svg.selectAll(".bar")
		.data(data)

	// console.log(bars)

	bars.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", d => xScale(d.Location))
		.attr("y", d => yScale(d.Visitors))
		.attr("height", d => (height - yScale(d.Visitors)))
		.attr("width", xScale.bandwidth())
		.on("mouseover", function(event, d) {

			//Get this bar's x/y values, then augment for the tooltip
			let xPosition = margin.left + parseFloat(d3.select(this).attr("x"))+ xScale.bandwidth() ;
			let yPosition = margin.top +  yScale(d.Visitors/2);

			//Update the tooltip position and value
			d3.select("#tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px")
				.select("#value")
				.text(d.Visitors);


			//Show the tooltip
			d3.select("#tooltip").classed("hidden", false);
		})
		.on("mouseout", function(d) {

			//Hide the tooltip
			d3.select("#tooltip").classed("hidden", true);
		});


	// ---- DRAW AXIS	----
	xAxisGroup = svg.select(".x-axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	yAxisGroup = svg.select(".y-axis")
		.call(yAxis);

	svg.select("text.axis-title").remove();
	svg.append("text")
		.attr("class", "axis-title")
		.attr("x", -5)
		.attr("y", -15)
		.attr("dy", ".1em")
		.style("text-anchor", "end")
		.text("Annual Visitors");
}


function errorMessage(message){
	console.log(message);
}

function shortenString(content, maxLength){
	// Trim the string to the maximum length
	let trimmedString = content.substr(0, maxLength);

	// Re-trim if we are in the middle of a word
	trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

	return trimmedString;
}

