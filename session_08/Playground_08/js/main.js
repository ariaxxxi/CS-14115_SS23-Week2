let data = [
    { month: "May", sales: 6900 },
    { month: "June", sales: 14240 },
    { month: "July", sales: 25000 },
    { month: "August", sales: 17500 }
];

let width = 400
let height = 400

let svg = d3.select("#chart-area")
            .append('svg')
            .attr('width',width)
            .attr('height',height)

let max = d3.max( data, d => {return d.sales} )
let min = d3.min( data, d => {return d.sales} )

let radiusScale = d3.scaleLinear()
                .domain([0, max])
                .range([ 3, 50 ])

let xScale = d3.scaleLinear()
                .domain([0,max])
                .range([0,width])

let circles = svg.selectAll(".circle")
            .data(data)

circles.enter()
    .append("circle")
    .attr('cx',d => xScale(d.sales))
    .attr('cy',200)
    .attr('r', d => radiusScale(d.sales) )
    .attr('fill','lightblue')
    .attr('stroke','blue')

// svg.append('circle')
//     .attr('cx',200)
//     .attr('cy',200)
//     .attr('r',50)
//     .attr('fill','blue')
