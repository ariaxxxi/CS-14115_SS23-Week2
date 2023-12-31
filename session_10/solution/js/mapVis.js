/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */


class MapVis {

    // constructor method to initialize Timeline object
    constructor(parentElement, dataTopographic, covidData, usaData) {
        this.parentElement = parentElement;
        this.dataTopographic = dataTopographic;
        this.covidData = covidData;
        this.usaData = usaData;
        this.displayData = [];

        // parse date method
        this.parseDate = d3.timeParse("%m/%d/%Y");

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.colors = d3.scaleLinear().range(["#FFFFFF", "#136D70"])

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title')
            .attr('id', 'map-title')
            .append('text')
            .text('Map View')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');

        // add color legend
        vis.legend = vis.svg.append("g")
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.width / 2}, ${vis.height - 20})`)

        vis.legendScale = d3.scaleOrdinal()
            .range([0, vis.width / 4])


        vis.legendAxisGroup = vis.legend.append("g")
            .attr("class", "axis axis--legend");

        // color gradient
        vis.linearGradient = vis.legend.append('defs').append('linearGradient')
            .attr('id', "grad3")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%")

        vis.linearGradient.append('stop')
            .attr("offset", "0%")
            .style("stop-color", "#ffffff")
            .style("stop-opacity", "1")

        vis.linearGradient.append('stop')
            .attr("offset", "100%")
            .style("stop-color", "#136D70")
            .style("stop-opacity", "1")

        vis.legend
            .append('rect')
            .attr('width', vis.width / 4)
            .attr('height', 20)
            .attr('x', 0)
            .attr('y', -20)
            .attr('fill', "url(#grad3)")

        // tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip')


        // solution for geometry that that isn't projected, yet, e.g. 'states-10m.json'
        /*vis.projection = d3.geoAlbersUsa().scale(700).translate([250, 200])
        vis.path = d3.geoPath(vis.projection);*/

        // solutions for a map that already fits a 975×610 like 'counties-albers-10m.json'
        vis.viewpoint = {'width': 975, 'height': 610};
        vis.zoom = vis.width / vis.viewpoint.width;

        // adjust map position
        vis.map = vis.svg.append("g")
            .attr("class", "states")
            .attr('transform', `scale(${vis.zoom} ${vis.zoom})`);

        // path generator
        vis.path = d3.geoPath();

        // draw states
        vis.states = vis.map.selectAll("path")
            .data(topojson.feature(vis.dataTopographic, vis.dataTopographic.objects.states).features)
            .enter().append("path")
            .attr("d", vis.path)
            .attr('class', 'state')
            .attr("fill", 'transparent')
            .attr("stroke", 'black')
            .attr("stroke-width", 1);


        // having initialized the map, move on to wrangle data
        this.wrangleData();
    }

    wrangleData() {
        let vis = this

        // check out the data
        // console.log(tableObject.covidData)
        // console.log(tableObject.usaData)

        // first, filter according to selectedTimeRange, init empty array
        let filteredData = [];

        // if there is a region selected
        if (selectedTimeRange.length !== 0) {
            //console.log('region selected', vis.selectedTimeRange, vis.selectedTimeRange[0].getTime() )

            // iterate over all rows the csv (dataFill)
            vis.covidData.forEach(row => {
                // and push rows with proper dates into filteredData
                if (selectedTimeRange[0].getTime() <= vis.parseDate(row.submission_date).getTime() && vis.parseDate(row.submission_date).getTime() <= selectedTimeRange[1].getTime()) {
                    filteredData.push(row);
                }
            });
        } else {
            filteredData = vis.covidData;
        }

        // prepare covid data by grouping all rows by state
        let covidDataByState = Array.from(d3.group(filteredData, d => d.state), ([key, value]) => ({key, value}))

        // have a look
        // console.log(covidDataByState)

        // init final data structure in which both data sets will be merged into
        vis.displayData = []

        // merge
        covidDataByState.forEach(state => {

            // get full state name
            let stateName = nameConverter.getFullName(state.key)

            // init counters
            let newCasesSum = 0;
            let newDeathsSum = 0;
            let population = 0;

            // look up population for the state in the census data set
            vis.usaData.forEach(row => {
                if (row.state === stateName) {
                    population += +row["2020"].replaceAll(',', '');
                }
            })

            // calculate new cases by summing up all the entries for each state
            state.value.forEach(entry => {
                newCasesSum += +entry['new_case'];
                newDeathsSum += +entry['new_death'];
            });

            // populate the final data structure
            vis.displayData.push(
                {
                    state: stateName,
                    population: population,
                    absCases: newCasesSum,
                    absDeaths: newDeathsSum,
                    relCases: (newCasesSum / population * 100),
                    relDeaths: (newDeathsSum / population * 100)
                }
            )
        })

        console.log('final data structure', vis.displayData);

        vis.updateVis()

    }

    updateVis() {
        let vis = this;

        // update domains
        vis.colors.domain([0, d3.max(vis.displayData, d => d[selectedCategory])]);
        vis.legendScale.domain([0, d3.max(vis.displayData, d => d[selectedCategory])]);
        vis.radiusScale = d3.scaleLinear()
            .domain([0, d3.max(vis.displayData, d => d.absCases)])
            .range([0, 30]);

        //
        vis.legendAxis = d3.axisBottom()
            .scale(vis.legendScale)
            .tickFormat(function (d) {
                if (selectedCategory === 'relCases' || selectedCategory === 'relDeaths') {
                    return d3.format(".3")(d) + "%";
                } else {
                    if (d === 0) {
                        return 0
                    } else {
                        return d3.format(".3s")(d)
                    }

                }
            })


        // update axis
        vis.legendAxisGroup
            .transition()
            .duration(400)
            .call(vis.legendAxis);

        // draw states
        vis.states
            .on('mouseover', function (event, d) {

                // store currently hovered State in variable selectedState
                selectedState = d.properties.name;

                // get state data
                let stateData = {}
                vis.displayData.forEach(state => {
                    if (d.properties.name === state.state) {
                        stateData = state;
                    }
                });

                // update brush, i.e. show new brush layer
                myBrushVis.wrangleDataResponsive();

                // update color of hovered state
                d3.select(this)
                    .attr('fill', 'rgb(255,129,129)')
                    .style('opacity', 1)

                // update color also
                d3.select("." + selectedState)
                    .attr('fill', 'rgb(255,129,129)')
                    .style('opacity', 1)

                // update tooltip
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                        <div style=" border-radius: 5px; background: whitesmoke; padding: 20px; box-shadow:4px 4px 8px 4px rgba(184,184,184,0.32)">
                            <h4 style="font-size:16px;font-family: Avenir">${stateData.state}<h4>
                            <p style="font-size:10px;font-family: Avenir"> Population: ${stateData.population}</p>
                            <p style="font-size:10px;font-family: Avenir"> Cases (absolute): ${stateData.absCases}</p>
                            <p style="font-size:10px;font-family: Avenir"> Deaths (absolute): ${stateData.absDeaths}</p>
                            <p style="font-size:10px;font-family: Avenir"> Cases (relative): ${stateData.relCases.toFixed(2)}%</p>
                            <p style="font-size:10px;font-family: Avenir"> Deaths (relative): ${stateData.relDeaths.toFixed(2)}%</p>
                        </div>`);
            })
            .on('mouseout', function (event, d) {

                let tmpState = d.properties.name;

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0 + "px")
                    .style("top", 0 + "px")

                // reset selectedState
                selectedState = '';
                myBrushVis.wrangleDataResponsive();


                let color;

                d3.select(this)
                    .attr("fill", function () {
                        vis.displayData.forEach(state => {
                            if (tmpState === state.state) {
                                color = vis.colors(state[selectedCategory]);
                            }
                        });
                        return color;
                    })
                    .attr('stroke', 'rgb(14,15,85)')
                    .attr('stroke-width', 1)
                    .style('opacity', 1)

                // update color also
                d3.select("." + tmpState)
                    .attr('stroke-width', .1)
                    .attr('stoke', '#000000')
                    .attr('fill', color)
                    .style('opacity', 1)
            })
            .transition()
            .duration(400)
            .attr("fill", function (d) {
                let tmpState = d.properties.name;
                let color;
                vis.displayData.forEach(state => {
                    if (tmpState === state.state) {
                        color = vis.colors(state[selectedCategory]);
                    }
                });
                return color

            })
            .attr('stroke', 'rgb(14,15,85)')
            .attr("stroke-width", 1)
            .attr('opacity', 1)

        let circles = vis.svg.selectAll('circle').data(topojson.feature(vis.dataTopographic, vis.dataTopographic.objects.states).features)

           circles.enter().append('circle')
               .merge(circles)
               .attr("r", function(d) {
                   let tmpState = d.properties.name;
                   let radius;
                   vis.displayData.forEach(state => {
                       if (tmpState === state.state ) {
                           radius = vis.radiusScale(state.absCases)
                       }
                   });
                   return radius})
               .attr("cx", d => vis.path.centroid(d)[0]*vis.zoom)
               .attr("cy", d => vis.path.centroid(d)[1]*vis.zoom)
               .attr("fill", "rgb(255,129,129)")
               .attr('opacity',0.7)

    }


}