/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */




class MapVis {

    //####################################################################################################
    // TODO | Task MapVis-2 : Set up the constructor method for class architecture
    // We have initiated this constructor method, try to complete it according to how we do it in dataTable.js
    constructor(p) {


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

        //####################################################################################################
        //  TODO | Task MapVis-3 : Append a new SVG area with D3







        //####################################################################################################
        //  TODO | Task MapVis-4 : Draw the map








    }

//####################################################################################################
//  TODO | Task MapVis-5 : Define wrangleData() method
    wrangleData(){
        let vis = this


        vis.updateMap()
    }




    updateMap(){
        let vis = this
        //####################################################################################################
        //  TODO | Task MapVis-7 : Add color variation to the map





    }
}