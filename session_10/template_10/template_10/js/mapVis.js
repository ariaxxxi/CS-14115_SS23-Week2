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

        // vis.colors = d3.scaleLinear().range(["#FFFFFF", "#136D70"])

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.viewpoint = {'width': 975, 'height': 610};
        vis.zoom = vis.width / vis.viewpoint.width;

        // adjust map position
        vis.map = vis.svg.append("g") // group will contain all state paths
            .attr("class", "states")
            .attr('transform', `scale(${vis.zoom} ${vis.zoom})`);

        vis.path = d3.geoPath();

        vis.states = vis.map.selectAll('path')
            .data(topojson.feature(vis.dataTopographic, vis.dataTopographic.objects.states).features)
            .enter()
            .append('path')
            .attr('d',vis.path)
            .attr('fill','red')

        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip')


        vis.wrangleData()
    }

    wrangleData() {
        let vis = this

        // check out the data
        // console.log(vis.covidData)
        // console.log(vis.usaData)

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
        vis.stateInfo = []

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
            vis.stateInfo.push(
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

        console.log('final data structure for my map', vis.stateInfo);

        vis.updateMap()

    }

    updateMap() {
        let vis = this

        let color = ''

        let maxN = d3.max(vis.stateInfo, d => d[selectedCategory])

        vis.colorScale = d3.scaleLinear()
            .domain([0, maxN])
            .range(['#FFFFFF', '#136D70'])



        vis.states
            .on('mouseover', function (event, d) {

                selectedState = d.properties.name

                //get state data from mouseover
                let stateData = {}
                vis.stateInfo.forEach(stateDict => {
                    if (selectedState === stateDict.state){
                        stateData = stateDict
                    }
                })

                myBrushVis.wrangleDataResponsive();

                //update color
                d3.select(this)
                    .attr('fill','darkblue')

                d3.select("." + selectedState)
                    .attr('fill','darkblue')

                //show tooltip
                vis.tooltip
                    .style('opacity',1)
                    .style('left',event.pageX +20 + "px")
                    .style('top', event.pageY + "px")
                    .html(`
                        <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                            <h3>${stateData.state}<h3>
                            <h4> Population: ${stateData.population}</h4>
                            <h4> Cases (absolute): ${stateData.absCases}</h4>
                            <h4> Deaths (absolute): ${stateData.absDeaths}</h4>
                            <h4> Cases (relative): ${stateData.relCases.toFixed(2)}%</h4>
                            <h4> Deaths (relative): ${stateData.relDeaths.toFixed(2)}%</h4>
                    </div>`);

            })
            .on('mouseout', function (event, d) {

                //
                let tmpState = d.properties.name
                //update color

                vis.tooltip
                    .style('opacity',0)
                    .style('left',0+"px")
                    .style('top',0+"px")

                selectedState = " "
                myBrushVis.wrangleDataResponsive();

                let color

                d3.select(this)
                    .attr('fill',d => {
                        vis.stateInfo.forEach(stateDict =>{
                            if (tmpState === stateDict.state){
                                color = vis.colorScale(stateDict[selectedCategory])
                            }
                        })
                        return color
                    })

                d3.select("."+tmpState)
                    .attr('fill',color)


            })
            .attr('fill',d => {
                let color
                vis.stateInfo.forEach(stateDict =>{
                    if (d.properties.name === stateDict.state){
                        color = vis.colorScale(stateDict[selectedCategory])
                    }
                })
                return color
            })




    }
}